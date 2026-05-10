import * as XLSX from 'xlsx';

const colLetter = (c) => XLSX.utils.encode_col(c - 1);
const addr = (col, row) => `${colLetter(col)}${row}`;

function setCell(ws, col, row, value) {
  if (value === undefined || value === null || value === '') return;
  const ref = addr(col, row);
  const existing = ws[ref] || {};
  ws[ref] = { ...existing, t: 's', v: String(value), w: String(value) };
  delete ws[ref].f;
}

function setNumberCell(ws, col, row, value) {
  if (value === undefined || value === null || value === '') return;
  const ref = addr(col, row);
  const existing = ws[ref] || {};
  ws[ref] = { ...existing, t: 'n', v: Number(value) };
  delete ws[ref].f;
}

export async function generateExcel(tournament, formData) {
  const base = import.meta.env.BASE_URL || '/';
  const url = `${base}templates/${tournament.file}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`テンプレート取得失敗: ${url}`);
  const buf = await res.arrayBuffer();
  const wb = XLSX.read(buf, { type: 'array', cellFormula: true, cellStyles: true, bookVBA: true });

  // ===== Team info sheet =====
  const tiSheet = wb.Sheets[tournament.team_info.sheet];
  if (tiSheet) {
    const ti = tournament.team_info;
    setCell(tiSheet, ti.cells.team_name.col, ti.cells.team_name.row, formData.teamInfo.team_name);
    setCell(tiSheet, ti.cells.responsible.col, ti.cells.responsible.row, formData.teamInfo.responsible);
    setCell(tiSheet, ti.cells.phone.col, ti.cells.phone.row, formData.teamInfo.phone);

    // Coaches
    (ti.coaches || []).forEach((c) => {
      const key = `coach_${c.row}_${c.col}`;
      const val = formData.teamInfo.coaches?.[key];
      if (val) setCell(tiSheet, c.col, c.row, val);
    });
  }

  // ===== Events =====
  for (const event of tournament.events) {
    const ws = wb.Sheets[event.sheet];
    if (!ws) continue;
    const entries = formData.eventEntries?.[event.id] || [];
    let row = event.start_row;
    for (const entry of entries) {
      if (row > event.end_row) break;
      // Write category
      setCell(ws, event.category_col, row, entry.category);
      // Write fields
      for (const f of event.fields) {
        const val = entry[f.key];
        if (val !== undefined && val !== '') {
          setCell(ws, f.col, row, val);
        }
      }
      row++;
    }
  }

  // ===== Extras =====
  for (const ex of tournament.extras || []) {
    const ws = wb.Sheets[ex.sheet];
    if (!ws) continue;
    const names = formData.extraEntries?.[ex.id] || [];
    let row = ex.start_row;
    for (const name of names) {
      if (row > ex.end_row) break;
      setCell(ws, ex.name_col, row, name);
      row++;
    }
  }

  // ===== Write to blob =====
  const out = XLSX.write(wb, { type: 'array', bookType: 'xlsx', cellStyles: true });
  return new Blob([out], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
}

export function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
