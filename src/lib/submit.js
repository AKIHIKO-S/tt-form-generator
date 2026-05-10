import { GAS_ENDPOINT, FALLBACK_EMAIL } from '../config';

/** Compute total fee for a tournament submission. */
export function computeTotal(tournament, formData) {
  let total = 0;
  for (const ev of tournament.events) {
    const entries = formData.eventEntries?.[ev.id] || [];
    for (const e of entries) {
      const c = ev.categories?.find(c => c.name === e.category);
      if (c?.fee) total += c.fee;
    }
  }
  for (const ex of tournament.extras || []) {
    const names = formData.extraEntries?.[ex.id] || [];
    total += names.length * (ex.price || 0);
  }
  return total;
}

/** Build a flat array of rows ready for spreadsheet insertion. */
export function buildRows(tournament, formData) {
  const submittedAt = new Date().toISOString();
  const rows = [];
  const baseHeader = {
    submitted_at: submittedAt,
    tournament_id: tournament.id,
    tournament_name: tournament.name.replace(/\n/g, ' '),
    team_name: formData.teamInfo.team_name,
    responsible: formData.teamInfo.responsible,
    phone: formData.teamInfo.phone,
  };

  // Coaches
  const coaches = formData.teamInfo.coaches || {};
  baseHeader.coach1 = '';
  baseHeader.coach2 = '';
  baseHeader.coach3 = '';
  const coachValues = Object.values(coaches).filter(Boolean);
  coachValues.forEach((v, i) => { baseHeader[`coach${i + 1}`] = v; });

  // Event entries
  for (const ev of tournament.events) {
    const entries = formData.eventEntries?.[ev.id] || [];
    for (const e of entries) {
      const cat = ev.categories?.find(c => c.name === e.category);
      const row = {
        ...baseHeader,
        event_kind: 'event',
        event_id: ev.id,
        event_title: ev.title.replace(/\n/g, ' '),
        category: e.category,
        fee: cat?.fee || 0,
      };
      for (const f of ev.fields) {
        row[f.key] = e[f.key] || '';
      }
      rows.push(row);
    }
  }

  // Extras
  for (const ex of tournament.extras || []) {
    const names = formData.extraEntries?.[ex.id] || [];
    for (const name of names) {
      rows.push({
        ...baseHeader,
        event_kind: 'extra',
        event_id: ex.id,
        event_title: ex.id === 'bento' ? 'お弁当' : '懇親会',
        category: ex.id,
        fee: ex.price || 0,
        name,
      });
    }
  }

  return rows;
}

/** Submit form data. Returns { ok, mode, message }. */
export async function submitApplication(tournament, formData) {
  const total = computeTotal(tournament, formData);
  const payload = {
    tournament_id: tournament.id,
    tournament_name: tournament.name,
    submitted_at: new Date().toISOString(),
    total,
    team_info: formData.teamInfo,
    event_entries: formData.eventEntries,
    extra_entries: formData.extraEntries,
    rows: buildRows(tournament, formData),
  };

  if (GAS_ENDPOINT) {
    try {
      const res = await fetch(GAS_ENDPOINT, {
        method: 'POST',
        // GAS web app expects text/plain to avoid preflight
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json().catch(() => ({}));
      if (data.ok === false) throw new Error(data.error || 'GAS returned error');
      return { ok: true, mode: 'gas', message: '申込を受け付けました' };
    } catch (e) {
      console.error('GAS submission failed:', e);
      return { ok: false, mode: 'gas', message: `送信エラー: ${e.message}`, payload };
    }
  }

  // mailto fallback
  const body = formatMailBody(tournament, formData, total);
  const subject = `【申込】${tournament.name.replace(/\n/g, ' ')} / ${formData.teamInfo.team_name || ''}`;
  const mailto = `mailto:${encodeURIComponent(FALLBACK_EMAIL)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = mailto;
  return { ok: true, mode: 'mailto', message: 'メーラーを開きました。メールを送信してください。' };
}

function formatMailBody(tournament, formData, total) {
  const ti = formData.teamInfo;
  const lines = [
    `大会名: ${tournament.name.replace(/\n/g, ' ')}`,
    `団体名: ${ti.team_name}`,
    `申込責任者: ${ti.responsible}`,
    `連絡先: ${ti.phone}`,
  ];
  const coaches = Object.values(ti.coaches || {}).filter(Boolean);
  if (coaches.length) lines.push(`引率: ${coaches.join(' / ')}`);
  lines.push('');

  for (const ev of tournament.events) {
    const entries = formData.eventEntries?.[ev.id] || [];
    if (!entries.length) continue;
    lines.push(`■ ${ev.title.replace(/\n/g, ' ')}（${entries.length}件）`);
    entries.forEach((e, i) => {
      const fields = ev.fields.map(f => e[f.key]).filter(Boolean).join(' / ');
      lines.push(`  ${i + 1}. [${e.category}] ${fields}`);
    });
    lines.push('');
  }
  for (const ex of tournament.extras || []) {
    const names = formData.extraEntries?.[ex.id] || [];
    if (!names.length) continue;
    lines.push(`■ ${ex.id === 'bento' ? 'お弁当' : '懇親会'}（${names.length}名）`);
    lines.push(`  ${names.join('、')}`);
    lines.push('');
  }
  lines.push(`合計参加料: ¥${total.toLocaleString()}`);
  return lines.join('\n');
}
