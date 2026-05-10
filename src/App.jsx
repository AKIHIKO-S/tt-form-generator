import React, { useState, useMemo } from 'react';
import { tournaments } from './data/tournaments';
import { generateExcel, downloadBlob } from './lib/excel';
import {
  ChevronLeft, ChevronRight, Trophy, Download, Plus, Trash2,
  FileSpreadsheet, AlertCircle, Sparkles
} from 'lucide-react';

// ---------- Helpers ----------
function buildStepsForTournament(t) {
  if (!t) return [];
  const steps = [
    { kind: 'team_info' },
  ];
  if ((t.team_info.coaches || []).length > 0) {
    steps.push({ kind: 'coaches' });
  }
  for (const ev of t.events) {
    steps.push({ kind: 'event', eventId: ev.id });
  }
  for (const ex of t.extras || []) {
    steps.push({ kind: 'extra', extraId: ex.id });
  }
  steps.push({ kind: 'review' });
  return steps;
}

function emptyEntry(event) {
  const e = { category: event.categories?.[0]?.name || '' };
  event.fields.forEach(f => { e[f.key] = ''; });
  return e;
}

// ---------- Step Components ----------
function TournamentPicker({ onPick }) {
  return (
    <div>
      <div className="text-center mb-8">
        <Trophy className="w-16 h-16 mx-auto text-emerald-500 mb-4" />
        <h1 className="text-3xl font-bold text-gray-800">卓球大会 申込フォーム</h1>
        <p className="mt-2 text-gray-600">出場する大会を選んでください</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tournaments.map(t => (
          <button
            key={t.id}
            onClick={() => onPick(t.id)}
            className="text-left bg-white rounded-xl border border-gray-200 hover:border-emerald-500 hover:shadow-lg transition p-5"
          >
            <div className="font-bold text-gray-800 whitespace-pre-line">{t.name}</div>
            <div className="mt-2 text-sm text-gray-500 truncate">{t.description}</div>
            <div className="mt-3 flex flex-wrap gap-1">
              {t.events.map(ev => (
                <span key={ev.id} className="text-xs px-2 py-0.5 rounded bg-emerald-50 text-emerald-700">
                  {ev.title.split('（')[0]}
                </span>
              ))}
              {(t.extras || []).map(ex => (
                <span key={ex.id} className="text-xs px-2 py-0.5 rounded bg-orange-50 text-orange-700">
                  {ex.id === 'bento' ? 'お弁当' : '懇親会'}
                </span>
              ))}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function TeamInfoStep({ tournament, value, onChange }) {
  const handle = (k) => (e) => onChange({ ...value, [k]: e.target.value });
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">団体情報</h2>
        <p className="mt-1 text-sm text-gray-500 whitespace-pre-line">{tournament.name}</p>
      </div>
      <Field label="団体名" required>
        <input
          type="text" value={value.team_name || ''} onChange={handle('team_name')}
          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          placeholder="例: 釧路市役所卓球部"
        />
      </Field>
      <Field label="申込責任者" required>
        <input
          type="text" value={value.responsible || ''} onChange={handle('responsible')}
          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          placeholder="例: 山田 太郎"
        />
      </Field>
      <Field label="連絡先（電話番号）" required>
        <input
          type="tel" value={value.phone || ''} onChange={handle('phone')}
          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          placeholder="例: 0154-00-0000"
        />
      </Field>
    </div>
  );
}

function CoachesStep({ tournament, value, onChange }) {
  const coaches = tournament.team_info.coaches || [];
  const handle = (key) => (e) => onChange({ ...value, coaches: { ...(value.coaches || {}), [key]: e.target.value } });
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">引率・顧問・コーチ</h2>
        <p className="mt-1 text-sm text-gray-500">該当する役職に氏名を入力してください（任意）</p>
      </div>
      {coaches.map((c) => {
        const k = `coach_${c.row}_${c.col}`;
        return (
          <Field key={k} label={c.label}>
            <input
              type="text" value={value.coaches?.[k] || ''} onChange={handle(k)}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </Field>
        );
      })}
    </div>
  );
}

function EventStep({ event, entries, onChange }) {
  const [draft, setDraft] = useState(emptyEntry(event));
  const cats = event.categories || [];

  const addEntry = () => {
    if (!draft.category) { alert('区分を選択してください'); return; }
    const hasAnyName = event.fields.some(f =>
      (f.key.startsWith('name') || f.key.startsWith('member') || f.key === 'team')
      && draft[f.key]?.trim()
    );
    if (!hasAnyName) { alert('氏名（またはチーム名）を入力してください'); return; }
    onChange([...(entries || []), draft]);
    setDraft(emptyEntry(event));
  };

  const removeEntry = (idx) => onChange(entries.filter((_, i) => i !== idx));

  const total = useMemo(() => {
    if (!cats.length) return null;
    return (entries || []).reduce((sum, e) => {
      const c = cats.find(c => c.name === e.category);
      return sum + (c?.fee || 0);
    }, 0);
  }, [entries, cats]);

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <FileSpreadsheet className="w-6 h-6 text-emerald-500" />
          <h2 className="text-2xl font-bold text-gray-800">{event.title}</h2>
        </div>
        <p className="mt-1 text-sm text-gray-500">
          この種目への出場者を追加してください。出場しない場合は何も追加せず「次へ」。
        </p>
      </div>

      {(entries || []).length > 0 && (
        <div className="border rounded-xl overflow-hidden">
          <div className="bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700">
            登録済み: {entries.length}件
            {total !== null && <span className="ml-2 text-emerald-700">合計 ¥{total.toLocaleString()}</span>}
          </div>
          <ul className="divide-y">
            {entries.map((e, i) => (
              <li key={i} className="px-4 py-2 flex items-center justify-between">
                <div className="text-sm">
                  <span className="inline-block bg-emerald-100 text-emerald-800 text-xs px-2 py-0.5 rounded mr-2">{e.category}</span>
                  {event.fields.map(f => e[f.key] && (
                    <span key={f.key} className="mr-2">
                      <span className="text-gray-400 text-xs">{f.label}:</span> {e[f.key]}
                    </span>
                  ))}
                </div>
                <button onClick={() => removeEntry(i)} className="text-red-500 hover:text-red-700 p-1">
                  <Trash2 className="w-4 h-4" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="bg-emerald-50/40 rounded-xl border-2 border-dashed border-emerald-200 p-5 space-y-4">
        <div className="flex items-center gap-2">
          <Plus className="w-5 h-5 text-emerald-600" />
          <span className="font-medium text-emerald-800">
            {(entries || []).length + 1}件目を追加
          </span>
        </div>
        {cats.length > 0 ? (
          <Field label="区分" required>
            <select
              value={draft.category}
              onChange={(e) => setDraft({ ...draft, category: e.target.value })}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
            >
              {cats.map(c => (
                <option key={c.name} value={c.name}>
                  {c.name}{c.fee ? ` （¥${c.fee.toLocaleString()}）` : ''}
                </option>
              ))}
            </select>
          </Field>
        ) : (
          <Field label="区分">
            <input
              type="text" value={draft.category}
              onChange={(e) => setDraft({ ...draft, category: e.target.value })}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="例: 男子"
            />
          </Field>
        )}
        {event.fields.map(f => (
          <Field key={f.key} label={f.label}>
            {f.type === 'select' ? (
              <select
                value={draft[f.key] || ''}
                onChange={(e) => setDraft({ ...draft, [f.key]: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
              >
                <option value="">選択してください</option>
                {(f.options || []).map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            ) : (
              <input
                type="text"
                value={draft[f.key] || ''}
                onChange={(e) => setDraft({ ...draft, [f.key]: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            )}
          </Field>
        ))}
        <button
          onClick={addEntry}
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-lg py-2.5 transition flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" /> この内容で追加
        </button>
      </div>
    </div>
  );
}

function ExtraStep({ extra, names, onChange }) {
  const [draft, setDraft] = useState('');
  const addName = () => {
    if (!draft.trim()) return;
    onChange([...(names || []), draft.trim()]);
    setDraft('');
  };
  const total = (names?.length || 0) * (extra.price || 0);
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">
          {extra.id === 'bento' ? 'お弁当注文' : '懇親会申込'}
        </h2>
        <p className="mt-1 text-sm text-gray-500">{extra.title}（@¥{extra.price?.toLocaleString()}）</p>
        <p className="mt-1 text-sm text-gray-500">申込しない場合は空のまま「次へ」。</p>
      </div>

      {(names || []).length > 0 && (
        <div className="border rounded-xl overflow-hidden">
          <div className="bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700">
            {names.length}名 / 合計 ¥{total.toLocaleString()}
          </div>
          <ul className="divide-y">
            {names.map((n, i) => (
              <li key={i} className="px-4 py-2 flex items-center justify-between">
                <span>{i + 1}. {n}</span>
                <button onClick={() => onChange(names.filter((_, j) => j !== i))} className="text-red-500 p-1">
                  <Trash2 className="w-4 h-4" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="bg-emerald-50/40 rounded-xl border-2 border-dashed border-emerald-200 p-5 space-y-3">
        <Field label="氏名">
          <input
            type="text" value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addName(); } }}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="氏名を入力してEnter or 追加ボタン"
          />
        </Field>
        <button
          onClick={addName}
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-lg py-2.5 transition flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" /> 追加
        </button>
      </div>
    </div>
  );
}

function ReviewStep({ tournament, formData, onDownload, downloading }) {
  const entryCount = Object.values(formData.eventEntries || {}).reduce((s, arr) => s + arr.length, 0);
  const extraCount = Object.values(formData.extraEntries || {}).reduce((s, arr) => s + arr.length, 0);
  const grandTotal = useMemo(() => {
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
  }, [tournament, formData]);

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-emerald-500" />
          <h2 className="text-2xl font-bold text-gray-800">確認とダウンロード</h2>
        </div>
        <p className="mt-1 text-sm text-gray-500">入力内容を確認し、Excelをダウンロードしてください。</p>
      </div>

      <div className="bg-white border rounded-xl p-5 space-y-3">
        <div className="font-medium text-gray-800 whitespace-pre-line">{tournament.name}</div>
        <div className="text-sm">
          <span className="text-gray-500">団体名:</span> {formData.teamInfo.team_name || '—'}<br />
          <span className="text-gray-500">申込責任者:</span> {formData.teamInfo.responsible || '—'}<br />
          <span className="text-gray-500">連絡先:</span> {formData.teamInfo.phone || '—'}
        </div>
      </div>

      {tournament.events.map(ev => {
        const entries = formData.eventEntries?.[ev.id] || [];
        if (!entries.length) return null;
        return (
          <div key={ev.id} className="bg-white border rounded-xl p-5">
            <div className="font-medium text-gray-800">{ev.title}（{entries.length}件）</div>
            <ul className="mt-2 text-sm text-gray-700 space-y-1">
              {entries.map((e, i) => (
                <li key={i}>{i + 1}. [{e.category}] {ev.fields.map(f => e[f.key]).filter(Boolean).join(' / ')}</li>
              ))}
            </ul>
          </div>
        );
      })}

      {(tournament.extras || []).map(ex => {
        const names = formData.extraEntries?.[ex.id] || [];
        if (!names.length) return null;
        return (
          <div key={ex.id} className="bg-white border rounded-xl p-5">
            <div className="font-medium text-gray-800">
              {ex.id === 'bento' ? 'お弁当' : '懇親会'}（{names.length}名）
            </div>
            <div className="mt-2 text-sm text-gray-700">{names.join('、')}</div>
          </div>
        );
      })}

      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-5">
        <div className="flex justify-between items-center">
          <div>
            <div className="text-sm text-gray-600">参加料 合計</div>
            <div className="text-3xl font-bold text-emerald-700">¥{grandTotal.toLocaleString()}</div>
          </div>
          <div className="text-sm text-gray-600 text-right">
            <div>出場: {entryCount}件</div>
            {extraCount > 0 && <div>その他: {extraCount}名</div>}
          </div>
        </div>
      </div>

      <button
        onClick={onDownload}
        disabled={downloading}
        className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-300 text-white font-bold rounded-xl py-4 transition flex items-center justify-center gap-2 text-lg shadow-lg"
      >
        <Download className="w-6 h-6" />
        {downloading ? '生成中...' : 'Excel申込用紙をダウンロード'}
      </button>
    </div>
  );
}

function Field({ label, required, children }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children}
    </div>
  );
}

// ---------- Main App ----------
export default function App() {
  const [tournamentId, setTournamentId] = useState(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [formData, setFormData] = useState({
    teamInfo: { team_name: '', responsible: '', phone: '', coaches: {} },
    eventEntries: {},
    extraEntries: {},
  });
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState('');

  const tournament = tournaments.find(t => t.id === tournamentId);
  const steps = useMemo(() => buildStepsForTournament(tournament), [tournament]);

  const handlePickTournament = (id) => {
    setTournamentId(id);
    setStepIndex(0);
    setFormData({
      teamInfo: { team_name: '', responsible: '', phone: '', coaches: {} },
      eventEntries: {},
      extraEntries: {},
    });
    setError('');
  };

  const handleReset = () => {
    setTournamentId(null);
    setStepIndex(0);
    setError('');
  };

  const goNext = () => setStepIndex(i => Math.min(i + 1, steps.length - 1));
  const goPrev = () => {
    if (stepIndex === 0) {
      handleReset();
    } else {
      setStepIndex(i => i - 1);
    }
  };

  const handleDownload = async () => {
    setDownloading(true);
    setError('');
    try {
      const blob = await generateExcel(tournament, formData);
      const safe = (formData.teamInfo.team_name || 'team').replace(/[\/\\?%*:|"<>]/g, '_');
      const tname = tournament.name.split('\n')[0].replace(/[\/\\?%*:|"<>]/g, '_').slice(0, 30);
      downloadBlob(blob, `${tname}_${safe}.xlsx`);
    } catch (e) {
      console.error(e);
      setError(`Excel生成エラー: ${e.message}`);
    } finally {
      setDownloading(false);
    }
  };

  if (!tournament) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <TournamentPicker onPick={handlePickTournament} />
          <footer className="mt-12 text-center text-xs text-gray-400">
            釧路卓球協会 卓球大会 申込フォーム生成ツール
          </footer>
        </div>
      </div>
    );
  }

  const step = steps[stepIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <div className="flex justify-between text-xs text-gray-500 mb-1.5">
            <span className="truncate">{tournament.name.split('\n')[0]}</span>
            <span>{stepIndex + 1} / {steps.length}</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 transition-all"
              style={{ width: `${((stepIndex + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur rounded-2xl shadow-xl p-6 md:p-8">
          {step.kind === 'team_info' && (
            <TeamInfoStep
              tournament={tournament}
              value={formData.teamInfo}
              onChange={(v) => setFormData(d => ({ ...d, teamInfo: v }))}
            />
          )}
          {step.kind === 'coaches' && (
            <CoachesStep
              tournament={tournament}
              value={formData.teamInfo}
              onChange={(v) => setFormData(d => ({ ...d, teamInfo: v }))}
            />
          )}
          {step.kind === 'event' && (() => {
            const ev = tournament.events.find(e => e.id === step.eventId);
            return (
              <EventStep
                key={ev.id}
                event={ev}
                entries={formData.eventEntries[step.eventId] || []}
                onChange={(entries) => setFormData(d => ({
                  ...d,
                  eventEntries: { ...d.eventEntries, [step.eventId]: entries }
                }))}
              />
            );
          })()}
          {step.kind === 'extra' && (() => {
            const ex = tournament.extras.find(x => x.id === step.extraId);
            return (
              <ExtraStep
                key={ex.id}
                extra={ex}
                names={formData.extraEntries[step.extraId] || []}
                onChange={(names) => setFormData(d => ({
                  ...d,
                  extraEntries: { ...d.extraEntries, [step.extraId]: names }
                }))}
              />
            );
          })()}
          {step.kind === 'review' && (
            <ReviewStep
              tournament={tournament}
              formData={formData}
              onDownload={handleDownload}
              downloading={downloading}
            />
          )}

          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm flex items-start gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <div className="mt-8 flex justify-between gap-3">
            <button
              onClick={goPrev}
              className="px-5 py-2.5 rounded-lg border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium flex items-center gap-1.5"
            >
              <ChevronLeft className="w-4 h-4" />
              {stepIndex === 0 ? '大会選択へ戻る' : '戻る'}
            </button>
            {step.kind !== 'review' ? (
              <button
                onClick={goNext}
                className="px-5 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-medium flex items-center gap-1.5"
              >
                次へ <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleReset}
                className="px-5 py-2.5 rounded-lg border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium"
              >
                最初から
              </button>
            )}
          </div>
        </div>

        <footer className="mt-8 text-center text-xs text-gray-400">
          釧路卓球協会 卓球大会 申込フォーム
        </footer>
      </div>
    </div>
  );
}
