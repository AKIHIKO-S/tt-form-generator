import { describe, it, expect } from 'vitest';
import { computeHmacHex, timingSafeEqual, verifyHmac } from '../src/hmac';

describe('hmac', () => {
  const secret = 'sekret';
  const body = '{"hello":"world"}';

  it('正しい署名を検証できる', async () => {
    const sig = await computeHmacHex(secret, body);
    expect(await verifyHmac(secret, body, sig)).toBe(true);
  });

  it('大文字・前後空白の署名も受け付ける', async () => {
    const sig = (await computeHmacHex(secret, body)).toUpperCase();
    expect(await verifyHmac(secret, body, `  ${sig}  `)).toBe(true);
  });

  it('body が改ざんされたら拒否する', async () => {
    const sig = await computeHmacHex(secret, body);
    expect(await verifyHmac(secret, body + 'x', sig)).toBe(false);
  });

  it('鍵が違えば拒否する', async () => {
    const sig = await computeHmacHex(secret, body);
    expect(await verifyHmac('other', body, sig)).toBe(false);
  });

  it('timingSafeEqual は長さ違いを false にする', () => {
    expect(timingSafeEqual('aa', 'aaa')).toBe(false);
    expect(timingSafeEqual('abc', 'abc')).toBe(true);
  });
});
