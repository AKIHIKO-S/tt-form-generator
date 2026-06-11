import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { api, ApiError } from './client.js';

/**
 * MCP サーバ。CLI と同一バイナリの `mcp` サブコマンドで起動する。
 *
 *  - 通信: ホストが spawn し stdio 越しに JSON-RPC。stdout は専有し、
 *          ログは stderr に出す（プロトコルを汚さない）。
 *  - 遅延認証: 起動時には認証しない。ツール呼び出しのたびにトークンを
 *          取得し、401/403 は client 側で一度だけ取り直して再試行する。
 *  - 読み取り専用: AI に公開するのは参照系のみ。変更系は一切公開しない。
 */

const log = (...a: unknown[]) => process.stderr.write(a.join(' ') + '\n');

const TOOLS = [
  {
    name: 'list_tournaments',
    description: '大会の一覧を返す（各大会の申込件数・合計参加料つき）。',
    inputSchema: { type: 'object', properties: {}, additionalProperties: false },
  },
  {
    name: 'list_submissions',
    description: '申込の一覧を返す。tournament で大会IDを指定して絞り込める。',
    inputSchema: {
      type: 'object',
      properties: {
        tournament: { type: 'string', description: '大会ID（例: yasaka）' },
        limit: { type: 'number', description: '最大件数（既定 100）' },
      },
      additionalProperties: false,
    },
  },
  {
    name: 'get_submission',
    description: '申込1件の詳細（明細つき）を返す。',
    inputSchema: {
      type: 'object',
      properties: { id: { type: 'number', description: '申込ID' } },
      required: ['id'],
      additionalProperties: false,
    },
  },
  {
    name: 'get_stats',
    description: '大会の集計（件数・合計参加料・区分別内訳）を返す。',
    inputSchema: {
      type: 'object',
      properties: { tournament: { type: 'string', description: '大会ID（省略時は全体）' } },
      additionalProperties: false,
    },
  },
] as const;

async function dispatch(name: string, args: Record<string, any>): Promise<unknown> {
  switch (name) {
    case 'list_tournaments':
      return api.tournaments();
    case 'list_submissions':
      return api.submissions(args.tournament, args.limit);
    case 'get_submission':
      return api.submission(Number(args.id));
    case 'get_stats':
      return api.stats(args.tournament);
    default:
      throw new Error(`unknown tool: ${name}`);
  }
}

export async function runMcpServer(): Promise<void> {
  const server = new Server(
    { name: 'kushiro-tt', version: '0.1.0' },
    { capabilities: { tools: {} } },
  );

  server.setRequestHandler(ListToolsRequestSchema, async () => ({ tools: TOOLS as any }));

  server.setRequestHandler(CallToolRequestSchema, async (req) => {
    const { name, arguments: args } = req.params;
    try {
      const result = await dispatch(name, args ?? {});
      return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    } catch (err) {
      const msg =
        err instanceof ApiError
          ? `API エラー (${err.status}): ${err.message}`
          : `エラー: ${String(err)}`;
      log(`[tool:${name}]`, msg);
      return { content: [{ type: 'text', text: msg }], isError: true };
    }
  });

  const transport = new StdioServerTransport();
  await server.connect(transport);
  log('kushiro-tt MCP server ready (stdio)');
}
