/**
 * ローカルデモ用のクリック操作ダッシュボード（DEV_BYPASS のときだけ配信）。
 * Worker と同一オリジンで返すため CORS 不要。本番（DEV_BYPASS=false）では出さない。
 */
export const DASHBOARD_HTML = `<!doctype html>
<html lang="ja">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>釧路卓球協会 内部データ（デモ）</title>
<style>
  :root { --navy:#0f4c81; --accent:#7c3aed; --bg:#f5f7fa; --line:#e3e8ef; }
  * { box-sizing:border-box; }
  body { margin:0; font-family:system-ui,-apple-system,"Hiragino Kaku Gothic ProN",sans-serif;
         background:var(--bg); color:#1f2937; }
  header { background:var(--navy); color:#fff; padding:16px 20px; }
  header h1 { margin:0; font-size:18px; }
  header .sub { opacity:.8; font-size:12px; margin-top:2px; }
  .demo-badge { display:inline-block; background:#f59e0b; color:#3b2600; font-size:11px;
                font-weight:700; padding:2px 8px; border-radius:999px; margin-left:8px; }
  main { max-width:920px; margin:0 auto; padding:20px; }
  .cards { display:grid; grid-template-columns:repeat(3,1fr); gap:12px; margin-bottom:16px; }
  .card { background:#fff; border:1px solid var(--line); border-radius:12px; padding:16px; }
  .card .label { font-size:12px; color:#6b7280; }
  .card .value { font-size:26px; font-weight:700; color:var(--navy); margin-top:4px; }
  .toolbar { display:flex; gap:8px; flex-wrap:wrap; margin-bottom:14px; }
  button { font:inherit; border:1px solid var(--line); background:#fff; border-radius:8px;
           padding:8px 14px; cursor:pointer; }
  button.primary { background:var(--accent); color:#fff; border-color:var(--accent); font-weight:600; }
  button:active { transform:translateY(1px); }
  .tabs { display:flex; gap:4px; border-bottom:2px solid var(--line); margin-bottom:12px; }
  .tab { padding:8px 14px; cursor:pointer; border-bottom:2px solid transparent; margin-bottom:-2px; }
  .tab.active { border-color:var(--navy); color:var(--navy); font-weight:700; }
  table { width:100%; border-collapse:collapse; background:#fff; border:1px solid var(--line);
          border-radius:12px; overflow:hidden; }
  th,td { text-align:left; padding:10px 12px; border-bottom:1px solid var(--line); font-size:14px; }
  th { background:#f8fafc; color:#475569; font-weight:600; }
  tr:last-child td { border-bottom:0; }
  td.num, th.num { text-align:right; font-variant-numeric:tabular-nums; }
  .link { color:var(--accent); cursor:pointer; text-decoration:underline; }
  .flash { animation:flash 1.2s ease; }
  @keyframes flash { 0%{background:#fef9c3;} 100%{background:transparent;} }
  .panel { background:#fff; border:1px solid var(--line); border-radius:12px; padding:16px; margin-top:12px; }
  .muted { color:#6b7280; font-size:13px; }
  .pill { font-size:11px; background:#eef2ff; color:#3730a3; padding:2px 8px; border-radius:999px; }
</style>
</head>
<body>
<header>
  <h1>🏓 釧路卓球協会 内部データ <span class="demo-badge">DEMO / DEV_BYPASS</span></h1>
  <div class="sub">この画面は Cloudflare Access の内側に置く想定。本番では IdP 認証を通った役員だけが到達します。</div>
</header>
<main>
  <div class="cards">
    <div class="card"><div class="label">申込件数</div><div class="value" id="c-sub">–</div></div>
    <div class="card"><div class="label">合計参加料</div><div class="value" id="c-fee">–</div></div>
    <div class="card"><div class="label">団体数</div><div class="value" id="c-team">–</div></div>
  </div>

  <div class="toolbar">
    <button class="primary" onclick="addSample()">＋ サンプル申込を追加（取込をシミュレート）</button>
    <button onclick="loadAll()">↻ 更新</button>
    <span class="muted" id="status"></span>
  </div>

  <div class="tabs">
    <div class="tab active" data-tab="tournaments" onclick="switchTab('tournaments')">大会一覧</div>
    <div class="tab" data-tab="teams" onclick="switchTab('teams')">団体一覧</div>
    <div class="tab" data-tab="annual" onclick="switchTab('annual')">年間集計</div>
  </div>

  <div id="view"></div>
  <div id="drill"></div>
</main>

<script>
const api = (p, opts) => fetch(p, opts).then(r => r.json());
const yen = n => '¥' + Number(n||0).toLocaleString();
let tab = 'tournaments';

function setStatus(t){ document.getElementById('status').textContent = t; }

async function loadCards(){
  const { stats } = await api('/api/annual');
  document.getElementById('c-sub').textContent = stats.totals.submissions;
  document.getElementById('c-fee').textContent = yen(stats.totals.total_fee);
  document.getElementById('c-team').textContent = stats.totals.teams;
}

function table(headers, rows){
  const h = headers.map(x => '<th class="'+(x.num?'num':'')+'">'+x.label+'</th>').join('');
  const b = rows.map(r => '<tr>'+headers.map(x => '<td class="'+(x.num?'num':'')+'">'+r[x.key]+'</td>').join('')+'</tr>').join('');
  return '<table><thead><tr>'+h+'</tr></thead><tbody>'+b+'</tbody></table>';
}

async function render(){
  document.querySelectorAll('.tab').forEach(t => t.classList.toggle('active', t.dataset.tab===tab));
  const view = document.getElementById('view');
  document.getElementById('drill').innerHTML = '';
  if (tab==='tournaments'){
    const { tournaments } = await api('/api/tournaments');
    view.innerHTML = table(
      [{key:'tournament_name',label:'大会'},{key:'tournament_id',label:'ID'},
       {key:'submissions',label:'申込',num:1},{key:'fee',label:'合計参加料',num:1}],
      tournaments.map(t => ({...t, fee: yen(t.total_fee)})));
  } else if (tab==='teams'){
    const { teams } = await api('/api/teams');
    view.innerHTML = table(
      [{key:'name',label:'団体（クリックで詳細）'},{key:'submissions',label:'申込',num:1},{key:'fee',label:'合計参加料',num:1}],
      teams.map(t => ({...t, fee: yen(t.total_fee),
        name:'<span class="link" onclick="drill(\\''+encodeURIComponent(t.team_name)+'\\')">'+t.team_name+'</span>'})));
  } else {
    const { stats } = await api('/api/annual');
    view.innerHTML =
      '<div class="panel"><span class="pill">'+stats.period.label+'</span> '+
      '申込 '+stats.totals.submissions+' 件 / 合計 '+yen(stats.totals.total_fee)+'</div>'+
      '<h3>大会別</h3>'+ table(
        [{key:'tournament_name',label:'大会'},{key:'submissions',label:'申込',num:1},{key:'fee',label:'合計',num:1}],
        stats.by_tournament.map(t => ({...t, fee: yen(t.total_fee)})))+
      '<h3>団体別</h3>'+ table(
        [{key:'team_name',label:'団体'},{key:'submissions',label:'申込',num:1},{key:'fee',label:'合計',num:1}],
        stats.by_team.map(t => ({...t, fee: yen(t.total_fee)})));
  }
}

async function drill(nameEnc){
  const name = decodeURIComponent(nameEnc);
  const { team } = await api('/api/team?name='+encodeURIComponent(name));
  const rows = (team.submissions||[]).map(s => ({...s, fee: yen(s.total)}));
  document.getElementById('drill').innerHTML =
    '<div class="panel"><h3 style="margin-top:0">'+team.team_name+' の申込</h3>'+
    '<div class="muted">'+team.period.label+' ・ '+team.totals.submissions+' 件 ・ '+yen(team.totals.total_fee)+'</div><br>'+
    table([{key:'tournament_name',label:'大会'},{key:'submitted_at',label:'申込日時'},{key:'fee',label:'参加料',num:1}], rows)+'</div>';
}

async function addSample(){
  setStatus('取込中…');
  await api('/api/demo/seed', { method:'POST' });
  await loadAll();
  document.querySelectorAll('.card .value').forEach(e => { e.classList.remove('flash'); void e.offsetWidth; e.classList.add('flash'); });
  setStatus('新しい申込が届きました（数字が動きます）');
}

async function switchTab(t){ tab=t; await render(); }
async function loadAll(){ await loadCards(); await render(); }
loadAll();
</script>
</body>
</html>`;
