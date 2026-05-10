import React, { useState, useEffect, useRef } from 'react';
import { Settings, Trophy, Code, FileText, Copy, Check, Download, Plus, Trash2, Eye, ChevronRight, ChevronLeft, Palette, AlertCircle, FileSpreadsheet, Sparkles, Receipt, BookOpen } from 'lucide-react';

export default function App() {
  const [step, setStep] = useState(1);
  const [outputTab, setOutputTab] = useState('preview');
  const [copied, setCopied] = useState('');
  const previewRef = useRef(null);

  // ========== 大会テンプレート ==========
  const TEMPLATES = {
    kaichohai: {
      name: '会長杯 / 高校釧根支部オープン',
      description: '団体戦＋シングルス（一般・高校・中学・小学）',
      config: {
        title: '会長杯 / 高校釧根支部オープン',
        organizer: '釧路卓球協会',
        date: '2026年5月3日（土・祝）',
        venue: 'ウインドヒルくしろスーパーアリーナ',
        deadline: '2026年4月20日',
        notice: '当日、開会式前までに本部席へ参加費を納入してください。\nゼッケンの着用をお願いします。',
        theme: 'navy',
        hasTeam: true,
        hasSingles: true,
        hasDoubles: false
      },
      categories: [
        { id: 1, type: 'team', division: '一般', gender: 'male', fee: 3000, minMembers: 4, maxMembers: 8, enabled: true },
        { id: 2, type: 'team', division: '一般', gender: 'female', fee: 3000, minMembers: 4, maxMembers: 8, enabled: true },
        { id: 3, type: 'team', division: '高校', gender: 'male', fee: 2000, minMembers: 4, maxMembers: 8, enabled: true },
        { id: 4, type: 'team', division: '高校', gender: 'female', fee: 2000, minMembers: 4, maxMembers: 8, enabled: true },
        { id: 5, type: 'team', division: '中学', gender: 'male', fee: 2000, minMembers: 4, maxMembers: 8, enabled: true },
        { id: 6, type: 'team', division: '中学', gender: 'female', fee: 2000, minMembers: 4, maxMembers: 8, enabled: true },
        { id: 7, type: 'singles', division: '一般', gender: 'male', fee: 700, enabled: true },
        { id: 8, type: 'singles', division: '一般', gender: 'female', fee: 700, enabled: true },
        { id: 9, type: 'singles', division: '高校', gender: 'male', fee: 700, enabled: true },
        { id: 10, type: 'singles', division: '高校', gender: 'female', fee: 700, enabled: true },
        { id: 11, type: 'singles', division: '中学', gender: 'male', fee: 500, enabled: true },
        { id: 12, type: 'singles', division: '中学', gender: 'female', fee: 500, enabled: true },
        { id: 13, type: 'singles', division: '小学', gender: 'male', fee: 500, enabled: true },
        { id: 14, type: 'singles', division: '小学', gender: 'female', fee: 500, enabled: true }
      ]
    },
    kokusupo: {
      name: '国スポ予選（少年の部）',
      description: 'シングルスのみ・男女2区分',
      config: {
        title: '国スポ（少年の部）釧路地区予選',
        organizer: '釧路卓球協会',
        date: '令和8年5月6日',
        venue: '',
        deadline: '',
        notice: '推薦選手を含む参加可。学年・備考欄に必要事項を記入してください。',
        theme: 'forest',
        hasTeam: false,
        hasSingles: true,
        hasDoubles: false
      },
      categories: [
        { id: 1, type: 'singles', division: '少年', gender: 'male', fee: 500, enabled: true },
        { id: 2, type: 'singles', division: '少年', gender: 'female', fee: 500, enabled: true }
      ]
    },
    yasaka: {
      name: 'ヤサカ杯（シングルス＋ダブルス）',
      description: 'シングルス8区分＋ダブルス7区分',
      config: {
        title: '第52回ヤサカ杯',
        organizer: '釧路卓球協会',
        date: '2026年6月13日',
        venue: '',
        deadline: '',
        notice: '参加料は、大会当日の開会式前(午前8時15分～8時45分の間)に受付（ステージ左側）でお支払いください。\n今大会は無観客試合とさせていただきます。選手・顧問・コーチ以外は入場、観戦、応援不可。',
        theme: 'cherry',
        hasTeam: false,
        hasSingles: true,
        hasDoubles: true
      },
      categories: [
        { id: 1, type: 'singles', division: '一般', gender: 'male', fee: 700, enabled: true },
        { id: 2, type: 'singles', division: '一般', gender: 'female', fee: 700, enabled: true },
        { id: 3, type: 'singles', division: '高校', gender: 'male', fee: 500, enabled: true },
        { id: 4, type: 'singles', division: '高校', gender: 'female', fee: 500, enabled: true },
        { id: 5, type: 'singles', division: '中学', gender: 'male', fee: 500, enabled: true },
        { id: 6, type: 'singles', division: '中学', gender: 'female', fee: 500, enabled: true },
        { id: 7, type: 'singles', division: '小学', gender: 'male', fee: 500, enabled: true },
        { id: 8, type: 'singles', division: '小学', gender: 'female', fee: 500, enabled: true },
        { id: 9, type: 'doubles', division: 'ミックス', gender: 'mixed', fee: 1000, enabled: true },
        { id: 10, type: 'doubles', division: '一般', gender: 'male', fee: 1000, enabled: true },
        { id: 11, type: 'doubles', division: '一般', gender: 'female', fee: 1000, enabled: true },
        { id: 12, type: 'doubles', division: '高校', gender: 'male', fee: 800, enabled: true },
        { id: 13, type: 'doubles', division: '高校', gender: 'female', fee: 800, enabled: true },
        { id: 14, type: 'doubles', division: '中学', gender: 'male', fee: 800, enabled: true },
        { id: 15, type: 'doubles', division: '中学', gender: 'female', fee: 800, enabled: true }
      ]
    }
  };

  // ========== 状態 ==========
  const [selectedTemplate, setSelectedTemplate] = useState('kaichohai');
  const [config, setConfig] = useState(TEMPLATES.kaichohai.config);
  const [categories, setCategories] = useState(TEMPLATES.kaichohai.categories);

  const themes = {
    navy:    { primary: '0f172a', secondary: '1e3a5f', accent: '0ea5e9', name: 'Navy' },
    forest:  { primary: '064e3b', secondary: '047857', accent: '10b981', name: 'Forest' },
    cherry:  { primary: '7f1d1d', secondary: 'b91c1c', accent: 'dc2626', name: 'Cherry' },
    ocean:   { primary: '0c4a6e', secondary: '0369a1', accent: '0ea5e9', name: 'Ocean' },
    violet:  { primary: '4c1d95', secondary: '6d28d9', accent: '8b5cf6', name: 'Violet' },
    sunset:  { primary: 'c2410c', secondary: 'ea580c', accent: 'f59e0b', name: 'Sunset' }
  };

  const applyTemplate = (key) => {
    setSelectedTemplate(key);
    setConfig(TEMPLATES[key].config);
    setCategories(TEMPLATES[key].categories);
  };

  const updateCategory = (id, key, value) => {
    setCategories(categories.map(c => c.id === id ? { ...c, [key]: value } : c));
  };

  const toggleCategory = (id) => {
    setCategories(categories.map(c => c.id === id ? { ...c, enabled: !c.enabled } : c));
  };

  const enabledCategories = categories.filter(c => c.enabled);

  // ========== HTML生成 ==========
  const generateHTML = () => {
    const t = themes[config.theme];
    const cats = enabledCategories;
    const escapeHtml = (s) => String(s||'').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
    const escapeJs = (s) => String(s||'').replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n');

    const catData = cats.map(c => ({
      id: c.id,
      type: c.type,
      division: c.division,
      gender: c.gender,
      fee: c.fee,
      minMembers: c.minMembers || 4,
      maxMembers: c.maxMembers || 8,
      label: `${c.gender === 'mixed' ? 'ミックス' : c.gender === 'male' ? '男子' : '女子'}${c.type === 'team' ? '団体戦' : c.type === 'doubles' ? 'ダブルス' : 'シングルス'}（${c.division}）`
    }));

    const grouped = {
      team_male:    cats.filter(c => c.type === 'team' && c.gender === 'male'),
      team_female:  cats.filter(c => c.type === 'team' && c.gender === 'female'),
      singles_male: cats.filter(c => c.type === 'singles' && c.gender === 'male'),
      singles_female: cats.filter(c => c.type === 'singles' && c.gender === 'female'),
      doubles_mixed: cats.filter(c => c.type === 'doubles' && c.gender === 'mixed'),
      doubles_male: cats.filter(c => c.type === 'doubles' && c.gender === 'male'),
      doubles_female: cats.filter(c => c.type === 'doubles' && c.gender === 'female')
    };

    const renderCatGroup = (catList, kind) => {
      if (catList.length === 0) return '';
      const colors = {
        male: { accent: '2563eb', bg: 'eff6ff', text: '1e40af', tagBg: 'dbeafe' },
        female: { accent: 'ec4899', bg: 'fdf2f8', text: 'be185d', tagBg: 'fce7f3' },
        mixed: { accent: '7c3aed', bg: 'f5f3ff', text: '5b21b6', tagBg: 'ede9fe' }
      };
      const c = colors[kind];
      const icon = kind === 'male' ? '♂' : kind === 'female' ? '♀' : '⚥';
      const label = kind === 'male' ? '男子' : kind === 'female' ? '女子' : 'ミックス';

      let html = `<div style="background:#${c.bg};padding:8px 14px;font-size:13px;font-weight:700;color:#${c.text};border-bottom:1px solid #e2e8f0;display:flex;align-items:center;gap:6px;">`;
      html += `<span style="font-size:14px;">${icon}</span> ${label}</div><div style="padding:8px 14px;">`;
      catList.forEach(cat => {
        const typeLabel = cat.type === 'team' ? '団体戦' : cat.type === 'doubles' ? 'ダブルス' : 'シングルス';
        html += `<label style="display:flex;align-items:center;gap:10px;padding:8px 0;cursor:pointer;">`;
        html += `<input type="checkbox" class="cat-check" data-cat-id="${cat.id}" data-fee="${cat.fee}" data-type="${cat.type}" data-min="${cat.minMembers||4}" data-max="${cat.maxMembers||8}" data-label="${typeLabel}（${cat.division}）" style="width:18px;height:18px;accent-color:#${c.accent};cursor:pointer;-webkit-appearance:checkbox;">`;
        html += `<span style="flex:1;display:flex;justify-content:space-between;align-items:center;">`;
        html += `<span style="font-size:14px;font-weight:600;">${cat.division}の部</span>`;
        html += `<span style="font-size:12px;font-weight:700;color:#${c.text};background:#${c.tagBg};padding:3px 10px;border-radius:12px;">¥${cat.fee.toLocaleString()}</span>`;
        html += `</span></label>`;
      });
      html += `</div>`;
      return html;
    };

    const teamSection = (grouped.team_male.length + grouped.team_female.length) > 0 ? `
  <div style="margin-bottom:18px;">
    <div style="background:linear-gradient(90deg,#fbbf24,#f59e0b);padding:10px 14px;border-radius:8px 8px 0 0;color:#fff;font-size:14px;font-weight:700;display:flex;align-items:center;gap:8px;">
      <span style="font-size:16px;">🏆</span> 団体戦
    </div>
    <div style="border:1.5px solid #fbbf24;border-top:none;border-radius:0 0 8px 8px;overflow:hidden;">
      ${renderCatGroup(grouped.team_male, 'male')}
      ${grouped.team_male.length > 0 && grouped.team_female.length > 0 ? '<div style="border-top:1px solid #fde68a;"></div>' : ''}
      ${renderCatGroup(grouped.team_female, 'female')}
    </div>
  </div>` : '';

    const singlesSection = (grouped.singles_male.length + grouped.singles_female.length) > 0 ? `
  <div style="margin-bottom:18px;">
    <div style="background:linear-gradient(90deg,#6366f1,#8b5cf6);padding:10px 14px;border-radius:8px 8px 0 0;color:#fff;font-size:14px;font-weight:700;display:flex;align-items:center;gap:8px;">
      <span style="font-size:16px;">🏓</span> シングルス
    </div>
    <div style="border:1.5px solid #8b5cf6;border-top:none;border-radius:0 0 8px 8px;overflow:hidden;">
      ${renderCatGroup(grouped.singles_male, 'male')}
      ${grouped.singles_male.length > 0 && grouped.singles_female.length > 0 ? '<div style="border-top:1px solid #c4b5fd;"></div>' : ''}
      ${renderCatGroup(grouped.singles_female, 'female')}
    </div>
  </div>` : '';

    const doublesSection = (grouped.doubles_mixed.length + grouped.doubles_male.length + grouped.doubles_female.length) > 0 ? `
  <div>
    <div style="background:linear-gradient(90deg,#059669,#10b981);padding:10px 14px;border-radius:8px 8px 0 0;color:#fff;font-size:14px;font-weight:700;display:flex;align-items:center;gap:8px;">
      <span style="font-size:16px;">👥</span> ダブルス
    </div>
    <div style="border:1.5px solid #10b981;border-top:none;border-radius:0 0 8px 8px;overflow:hidden;">
      ${renderCatGroup(grouped.doubles_mixed, 'mixed')}
      ${grouped.doubles_mixed.length > 0 && (grouped.doubles_male.length + grouped.doubles_female.length) > 0 ? '<div style="border-top:1px solid #6ee7b7;"></div>' : ''}
      ${renderCatGroup(grouped.doubles_male, 'male')}
      ${grouped.doubles_male.length > 0 && grouped.doubles_female.length > 0 ? '<div style="border-top:1px solid #6ee7b7;"></div>' : ''}
      ${renderCatGroup(grouped.doubles_female, 'female')}
    </div>
  </div>` : '';

    return `<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${escapeHtml(config.title)} 申込フォーム</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;600;700;900&family=Zen+Maru+Gothic:wght@500;700;900&display=swap" rel="stylesheet">
</head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:'Noto Sans JP','Hiragino Kaku Gothic ProN',Meiryo,sans-serif;-webkit-text-size-adjust:100%;">

<div id="ttApp" style="max-width:780px;margin:0 auto;padding:20px;color:#0f172a;line-height:1.6;">

<form id="ttForm" autocomplete="off" style="background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.06);">

<div style="background:linear-gradient(135deg,#${t.primary},#${t.secondary} 60%,#${t.accent});padding:32px 24px;text-align:center;color:#fff;position:relative;overflow:hidden;">
  <div style="position:absolute;top:-30px;right:-30px;width:120px;height:120px;background:rgba(255,255,255,0.08);border-radius:50%;"></div>
  <div style="position:absolute;bottom:-20px;left:-20px;width:80px;height:80px;background:rgba(255,255,255,0.05);border-radius:50%;"></div>
  <div style="font-size:11px;letter-spacing:3px;color:rgba(255,255,255,0.7);margin-bottom:6px;position:relative;z-index:1;">TABLE TENNIS ENTRY</div>
  <h1 style="font-family:'Zen Maru Gothic','Noto Sans JP',sans-serif;font-size:22px;font-weight:900;margin:0 0 6px 0;text-shadow:0 2px 8px rgba(0,0,0,0.2);position:relative;z-index:1;">🏓 ${escapeHtml(config.title)}</h1>
  ${config.date || config.venue ? `<div style="font-size:12px;background:rgba(255,255,255,0.15);display:inline-block;padding:5px 14px;border-radius:14px;margin-top:8px;position:relative;z-index:1;">📅 ${escapeHtml(config.date || '')}${config.date && config.venue ? '　' : ''}${escapeHtml(config.venue || '')}</div>` : ''}
</div>

<div style="padding:24px;">

${config.notice ? `<div style="background:#fffbeb;border-left:4px solid #f59e0b;padding:12px 14px;border-radius:6px;font-size:12px;color:#78350f;margin-bottom:20px;line-height:1.7;">${escapeHtml(config.notice).replace(/\n/g,'<br>')}</div>` : ''}

<div style="margin-bottom:24px;">
  <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px;padding-bottom:10px;border-bottom:2px solid #e2e8f0;">
    <span style="background:#${t.primary};color:#fff;width:26px;height:26px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;flex-shrink:0;">1</span>
    <span style="font-size:15px;font-weight:700;color:#${t.primary};">団体・代表者情報</span>
  </div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
    <div style="grid-column:1/-1;">
      <label style="display:block;font-size:12px;font-weight:600;color:#475569;margin-bottom:5px;">団体名・所属 <span style="color:#ef4444;">*</span></label>
      <input type="text" id="f_org" required placeholder="例：釧路卓球クラブ" style="width:100%;padding:10px 14px;border:1.5px solid #cbd5e1;border-radius:8px;font-size:14px;font-family:inherit;background:#fff;outline:none;box-sizing:border-box;-webkit-appearance:none;appearance:none;">
    </div>
    <div>
      <label style="display:block;font-size:12px;font-weight:600;color:#475569;margin-bottom:5px;">代表者氏名 <span style="color:#ef4444;">*</span></label>
      <input type="text" id="f_rep" required placeholder="佐藤 太郎" style="width:100%;padding:10px 14px;border:1.5px solid #cbd5e1;border-radius:8px;font-size:14px;font-family:inherit;background:#fff;outline:none;box-sizing:border-box;-webkit-appearance:none;appearance:none;">
    </div>
    <div>
      <label style="display:block;font-size:12px;font-weight:600;color:#475569;margin-bottom:5px;">電話番号 <span style="color:#ef4444;">*</span></label>
      <input type="tel" id="f_phone" required placeholder="090-1234-5678" style="width:100%;padding:10px 14px;border:1.5px solid #cbd5e1;border-radius:8px;font-size:14px;font-family:inherit;background:#fff;outline:none;box-sizing:border-box;-webkit-appearance:none;appearance:none;">
    </div>
    <div style="grid-column:1/-1;">
      <label style="display:block;font-size:12px;font-weight:600;color:#475569;margin-bottom:5px;">メールアドレス <span style="color:#ef4444;">*</span></label>
      <input type="email" id="f_email" required placeholder="example@mail.com" style="width:100%;padding:10px 14px;border:1.5px solid #cbd5e1;border-radius:8px;font-size:14px;font-family:inherit;background:#fff;outline:none;box-sizing:border-box;-webkit-appearance:none;appearance:none;">
    </div>
  </div>
</div>

<div style="margin-bottom:24px;">
  <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px;padding-bottom:10px;border-bottom:2px solid #e2e8f0;">
    <span style="background:#${t.primary};color:#fff;width:26px;height:26px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;flex-shrink:0;">2</span>
    <span style="font-size:15px;font-weight:700;color:#${t.primary};">参加種目を選択</span>
  </div>
  <div style="background:#eff6ff;border-left:3px solid #3b82f6;padding:8px 12px;border-radius:6px;font-size:12px;color:#1e40af;margin-bottom:14px;">💡 複数カテゴリの同時申込が可能です</div>
${teamSection}${singlesSection}${doublesSection}
</div>

<div id="playerArea" style="margin-bottom:24px;display:none;">
  <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px;padding-bottom:10px;border-bottom:2px solid #e2e8f0;">
    <span style="background:#${t.primary};color:#fff;width:26px;height:26px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;flex-shrink:0;">3</span>
    <span style="font-size:15px;font-weight:700;color:#${t.primary};">選手情報入力</span>
  </div>
  <div id="playerForms"></div>
</div>

<div id="feeBar" style="display:none;padding:14px 20px;background:linear-gradient(90deg,#${t.primary},#${t.secondary});color:#fff;border-radius:10px;margin-bottom:16px;">
  <div style="display:flex;justify-content:space-between;align-items:center;">
    <span style="font-size:13px;font-weight:600;">合計参加費</span>
    <span id="feeAmt" style="font-family:'Zen Maru Gothic',sans-serif;font-size:24px;font-weight:900;color:#fef3c7;">¥0</span>
  </div>
  <div style="font-size:11px;color:rgba(255,255,255,0.7);margin-top:4px;">※当日、開会式前までに本部席へ納入してください</div>
</div>

<div id="errorBox" style="display:none;background:#fef2f2;border:1px solid #fecaca;color:#7f1d1d;padding:12px 14px;border-radius:8px;margin-bottom:14px;font-size:13px;"></div>

<button type="submit" id="submitBtn" style="display:block;width:100%;background:linear-gradient(135deg,#${t.primary},#${t.secondary});color:#fff;border:none;padding:16px;border-radius:10px;font-size:15px;font-weight:700;cursor:pointer;font-family:inherit;letter-spacing:1px;box-shadow:0 4px 12px #${t.primary}40;-webkit-appearance:none;appearance:none;">この内容で申込む</button>
${config.deadline ? `<div style="text-align:center;font-size:11px;color:#64748b;margin-top:10px;">📌 申込締切：${escapeHtml(config.deadline)}</div>` : ''}

</div>
</form>

<div id="loading" style="display:none;text-align:center;padding:60px 24px;background:#fff;border-radius:16px;margin-top:20px;">
  <div style="width:40px;height:40px;border:4px solid #e2e8f0;border-top-color:#${t.primary};border-radius:50%;margin:0 auto 16px;animation:ttSpin 0.8s linear infinite;-webkit-animation:ttSpin 0.8s linear infinite;"></div>
  <div style="font-size:15px;font-weight:600;color:#0f172a;">送信中です...</div>
</div>

<div id="success" style="display:none;text-align:center;padding:40px 24px;background:linear-gradient(180deg,#f0fdf4,#fff);border-radius:16px;margin-top:20px;">
  <div style="width:64px;height:64px;background:#10b981;border-radius:50%;margin:0 auto 16px;display:flex;align-items:center;justify-content:center;font-size:32px;color:#fff;">✓</div>
  <div style="font-size:20px;font-weight:700;color:#0f172a;margin-bottom:8px;">申込を受け付けました</div>
  <div style="font-size:13px;color:#64748b;margin-bottom:6px;">確認メールをお送りしました</div>
  <div id="successFee" style="font-family:'Zen Maru Gothic',sans-serif;font-size:22px;font-weight:900;color:#0f172a;margin:16px 0;"></div>
  <button onclick="ttReset()" style="background:#${t.primary};color:#fff;border:none;padding:12px 32px;border-radius:8px;font-size:14px;font-weight:600;cursor:pointer;font-family:inherit;-webkit-appearance:none;appearance:none;">続けて申込む</button>
</div>

</div>

<style>
@keyframes ttSpin{to{transform:rotate(360deg)}}
@-webkit-keyframes ttSpin{to{-webkit-transform:rotate(360deg)}}
#ttApp input:focus,#ttApp select:focus{border-color:#${t.accent}!important;box-shadow:0 0 0 3px #${t.accent}25!important;}
#submitBtn:hover{opacity:0.9;transform:translateY(-1px);box-shadow:0 6px 18px #${t.primary}55;}
@media(max-width:600px){#ttApp input,#ttApp textarea,#ttApp select{font-size:16px!important;}#ttApp{padding:10px;}}
</style>

<script>
(function(){
'use strict';
var GAS_URL = 'YOUR_GAS_WEB_APP_URL_HERE';
var CATEGORIES = ${JSON.stringify(catData)};

var checks = document.querySelectorAll('.cat-check');
for (var i = 0; i < checks.length; i++) {
  checks[i].addEventListener('change', renderPlayers);
}

function renderPlayers() {
  var area = document.getElementById('playerArea');
  var forms = document.getElementById('playerForms');
  forms.innerHTML = '';
  var checked = document.querySelectorAll('.cat-check:checked');
  if (checked.length === 0) { area.style.display = 'none'; updateFee(); return; }
  area.style.display = 'block';

  for (var i = 0; i < checked.length; i++) {
    var el = checked[i];
    var catId = parseInt(el.getAttribute('data-cat-id'));
    var cat = null;
    for (var c = 0; c < CATEGORIES.length; c++) if (CATEGORIES[c].id === catId) { cat = CATEGORIES[c]; break; }
    if (!cat) continue;

    var isMixed = cat.gender === 'mixed';
    var isMale = cat.gender === 'male';
    var bColor = isMixed ? '7c3aed' : isMale ? '3b82f6' : 'ec4899';
    var bgColor = isMixed ? 'f5f3ff' : isMale ? 'eff6ff' : 'fdf2f8';
    var headerBg = isMixed ? 'linear-gradient(90deg,#6d28d9,#7c3aed)' : isMale ? 'linear-gradient(90deg,#2563eb,#3b82f6)' : 'linear-gradient(90deg,#db2777,#ec4899)';

    var card = document.createElement('div');
    card.style.cssText = 'margin-bottom:14px;border:1.5px solid #' + bColor + ';border-radius:10px;overflow:hidden;';
    var header = document.createElement('div');
    header.style.cssText = 'background:' + headerBg + ';padding:10px 14px;color:#fff;font-size:14px;font-weight:700;';
    header.textContent = '📝 ' + cat.label;
    card.appendChild(header);
    var body = document.createElement('div');
    body.style.cssText = 'padding:14px;background:#' + bgColor + ';';

    if (cat.type === 'team') {
      var teamDiv = document.createElement('div');
      teamDiv.style.cssText = 'margin-bottom:12px;';
      teamDiv.innerHTML = '<label style="display:block;font-size:12px;font-weight:600;color:#475569;margin-bottom:5px;">チーム名 <span style="color:#ef4444;">*</span></label>' +
        '<input type="text" class="team-name" data-cat-id="' + catId + '" required placeholder="例：' + cat.division + 'A" style="width:100%;padding:10px 14px;border:1.5px solid #cbd5e1;border-radius:8px;font-size:14px;font-family:inherit;background:#fff;outline:none;box-sizing:border-box;-webkit-appearance:none;appearance:none;">';
      body.appendChild(teamDiv);
      var note = document.createElement('div');
      note.style.cssText = 'font-size:11px;color:#64748b;margin-bottom:8px;';
      note.textContent = '※' + cat.minMembers + '名以上' + cat.maxMembers + '名以内で登録';
      body.appendChild(note);
      for (var m = 0; m < cat.maxMembers; m++) {
        body.appendChild(makePlayerRow(catId, m + 1, m < cat.minMembers, bColor));
      }
    } else if (cat.type === 'doubles') {
      // ダブルス：ペア入力
      var pairList = document.createElement('div');
      pairList.className = 'pair-list';
      pairList.setAttribute('data-cat-id', catId);
      addDoublesRow(pairList, catId, 1, true, bColor);
      body.appendChild(pairList);
      var addBtn = document.createElement('button');
      addBtn.type = 'button';
      addBtn.style.cssText = 'margin-top:8px;background:#' + bColor + ';color:#fff;border:none;padding:8px 16px;border-radius:6px;font-size:12px;font-weight:600;cursor:pointer;font-family:inherit;-webkit-appearance:none;appearance:none;';
      addBtn.textContent = '+ ペアを追加';
      addBtn.setAttribute('data-cat-id', catId);
      addBtn.setAttribute('data-color', bColor);
      addBtn.addEventListener('click', function() {
        var cid = parseInt(this.getAttribute('data-cat-id'));
        var cl = this.getAttribute('data-color');
        var list = document.querySelector('.pair-list[data-cat-id="' + cid + '"]');
        var rows = list.querySelectorAll('.pair-row');
        addDoublesRow(list, cid, rows.length + 1, false, cl);
        updateFee();
      });
      body.appendChild(addBtn);
    } else {
      // シングルス
      var listDiv = document.createElement('div');
      listDiv.className = 'singles-list';
      listDiv.setAttribute('data-cat-id', catId);
      listDiv.appendChild(makePlayerRow(catId, 1, true, bColor));
      body.appendChild(listDiv);
      var addBtnS = document.createElement('button');
      addBtnS.type = 'button';
      addBtnS.style.cssText = 'margin-top:8px;background:#' + bColor + ';color:#fff;border:none;padding:8px 16px;border-radius:6px;font-size:12px;font-weight:600;cursor:pointer;font-family:inherit;-webkit-appearance:none;appearance:none;';
      addBtnS.textContent = '+ 選手を追加';
      addBtnS.setAttribute('data-cat-id', catId);
      addBtnS.setAttribute('data-color', bColor);
      addBtnS.addEventListener('click', function() {
        var cid = parseInt(this.getAttribute('data-cat-id'));
        var cl = this.getAttribute('data-color');
        var list = document.querySelector('.singles-list[data-cat-id="' + cid + '"]');
        var rows = list.querySelectorAll('.player-row');
        var r = makePlayerRow(cid, rows.length + 1, false, cl);
        list.appendChild(r);
        updateFee();
      });
      body.appendChild(addBtnS);
    }
    card.appendChild(body);
    forms.appendChild(card);
  }
  updateFee();
}

function makePlayerRow(catId, num, required, color) {
  var row = document.createElement('div');
  row.className = 'player-row';
  row.style.cssText = 'display:flex;align-items:center;gap:8px;margin-bottom:6px;';
  var n = document.createElement('div');
  n.style.cssText = 'width:24px;height:24px;background:#' + color + ';color:#fff;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;flex-shrink:0;';
  n.textContent = num;
  row.appendChild(n);
  var inp = document.createElement('input');
  inp.type = 'text';
  inp.className = 'player-name';
  inp.setAttribute('data-cat-id', catId);
  inp.placeholder = '選手名' + num;
  if (required) inp.required = true;
  inp.style.cssText = 'flex:1;padding:8px 12px;border:1.5px solid #cbd5e1;border-radius:6px;font-size:14px;font-family:inherit;background:#fff;outline:none;-webkit-appearance:none;appearance:none;';
  inp.addEventListener('input', updateFee);
  row.appendChild(inp);
  if (!required) {
    var del = document.createElement('button');
    del.type = 'button';
    del.style.cssText = 'width:28px;height:28px;background:#fee2e2;color:#dc2626;border:none;border-radius:50%;cursor:pointer;font-size:14px;font-weight:700;flex-shrink:0;-webkit-appearance:none;appearance:none;';
    del.textContent = '×';
    del.addEventListener('click', function() { this.parentElement.remove(); updateFee(); });
    row.appendChild(del);
  }
  return row;
}

function addDoublesRow(container, catId, num, required, color) {
  var row = document.createElement('div');
  row.className = 'pair-row';
  row.style.cssText = 'background:#fff;border:1px solid #cbd5e1;border-radius:8px;padding:10px;margin-bottom:8px;';
  row.innerHTML = '<div style="font-size:11px;color:#64748b;margin-bottom:6px;font-weight:700;">ペア ' + num + '</div>' +
    '<div style="display:flex;gap:6px;margin-bottom:6px;align-items:center;">' +
      '<div style="width:20px;height:20px;background:#' + color + ';color:#fff;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;flex-shrink:0;">1</div>' +
      '<input type="text" class="pair-name1" data-cat-id="' + catId + '" placeholder="選手1" ' + (required ? 'required' : '') + ' style="flex:1;padding:6px 10px;border:1.5px solid #cbd5e1;border-radius:6px;font-size:13px;font-family:inherit;background:#fff;outline:none;-webkit-appearance:none;appearance:none;">' +
      '<input type="text" class="pair-team1" data-cat-id="' + catId + '" placeholder="所属1（任意）" style="flex:1;padding:6px 10px;border:1.5px solid #cbd5e1;border-radius:6px;font-size:13px;font-family:inherit;background:#fff;outline:none;-webkit-appearance:none;appearance:none;">' +
    '</div>' +
    '<div style="display:flex;gap:6px;align-items:center;">' +
      '<div style="width:20px;height:20px;background:#' + color + ';color:#fff;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;flex-shrink:0;">2</div>' +
      '<input type="text" class="pair-name2" data-cat-id="' + catId + '" placeholder="選手2" ' + (required ? 'required' : '') + ' style="flex:1;padding:6px 10px;border:1.5px solid #cbd5e1;border-radius:6px;font-size:13px;font-family:inherit;background:#fff;outline:none;-webkit-appearance:none;appearance:none;">' +
      '<input type="text" class="pair-team2" data-cat-id="' + catId + '" placeholder="所属2（任意）" style="flex:1;padding:6px 10px;border:1.5px solid #cbd5e1;border-radius:6px;font-size:13px;font-family:inherit;background:#fff;outline:none;-webkit-appearance:none;appearance:none;">' +
      (required ? '' : '<button type="button" class="pair-del" style="width:24px;height:24px;background:#fee2e2;color:#dc2626;border:none;border-radius:50%;cursor:pointer;font-size:13px;font-weight:700;flex-shrink:0;-webkit-appearance:none;appearance:none;">×</button>') +
    '</div>';
  if (!required) {
    setTimeout(function() {
      var del = row.querySelector('.pair-del');
      if (del) del.addEventListener('click', function() { row.remove(); updateFee(); });
    }, 0);
  }
  setTimeout(function() {
    var inputs = row.querySelectorAll('input.pair-name1, input.pair-name2');
    for (var i = 0; i < inputs.length; i++) inputs[i].addEventListener('input', updateFee);
  }, 0);
  container.appendChild(row);
}

function updateFee() {
  var total = 0;
  var checked = document.querySelectorAll('.cat-check:checked');
  for (var i = 0; i < checked.length; i++) {
    var catId = parseInt(checked[i].getAttribute('data-cat-id'));
    var cat = null;
    for (var c = 0; c < CATEGORIES.length; c++) if (CATEGORIES[c].id === catId) { cat = CATEGORIES[c]; break; }
    if (!cat) continue;
    if (cat.type === 'team') {
      total += cat.fee;
    } else if (cat.type === 'doubles') {
      var pairs = document.querySelectorAll('.pair-row[data-cat-id], .pair-list[data-cat-id="' + catId + '"] .pair-row');
      var count = 0;
      var rows = document.querySelectorAll('.pair-list[data-cat-id="' + catId + '"] .pair-row');
      for (var r = 0; r < rows.length; r++) {
        var n1 = rows[r].querySelector('.pair-name1');
        var n2 = rows[r].querySelector('.pair-name2');
        if (n1 && n2 && n1.value.trim() && n2.value.trim()) count++;
      }
      total += cat.fee * Math.max(count, 1);
    } else {
      var inputs = document.querySelectorAll('.player-name[data-cat-id="' + catId + '"]');
      var count = 0;
      for (var j = 0; j < inputs.length; j++) if (inputs[j].value.trim()) count++;
      total += cat.fee * Math.max(count, 1);
    }
  }
  var bar = document.getElementById('feeBar');
  if (total > 0) {
    bar.style.display = 'block';
    document.getElementById('feeAmt').textContent = '¥' + total.toLocaleString();
  } else {
    bar.style.display = 'none';
  }
}

document.getElementById('ttForm').addEventListener('submit', function(e) {
  e.preventDefault();
  var errBox = document.getElementById('errorBox');
  errBox.style.display = 'none';
  var checked = document.querySelectorAll('.cat-check:checked');
  if (checked.length === 0) {
    errBox.textContent = '参加種目を1つ以上選択してください';
    errBox.style.display = 'block';
    return;
  }
  var entries = [];
  var totalFee = 0;
  for (var c = 0; c < checked.length; c++) {
    var catId = parseInt(checked[c].getAttribute('data-cat-id'));
    var cat = null;
    for (var ci = 0; ci < CATEGORIES.length; ci++) if (CATEGORIES[ci].id === catId) { cat = CATEGORIES[ci]; break; }
    if (!cat) continue;
    var entry = {
      type: cat.type === 'team' ? '団体戦' : cat.type === 'doubles' ? 'ダブルス' : 'シングルス',
      division: cat.division,
      gender: cat.gender === 'mixed' ? 'ミックス' : cat.gender === 'male' ? '男子' : '女子',
      label: cat.label, fee: cat.fee, teamName: '', players: [], pairs: []
    };
    if (cat.type === 'team') {
      var tn = document.querySelector('.team-name[data-cat-id="' + catId + '"]');
      entry.teamName = tn ? tn.value.trim() : '';
      if (!entry.teamName) {
        errBox.textContent = cat.label + ' のチーム名を入力してください';
        errBox.style.display = 'block'; return;
      }
      var ms = document.querySelectorAll('.player-name[data-cat-id="' + catId + '"]');
      for (var mi = 0; mi < ms.length; mi++) if (ms[mi].value.trim()) entry.players.push(ms[mi].value.trim());
      if (entry.players.length < cat.minMembers) {
        errBox.textContent = cat.label + ' のメンバーを' + cat.minMembers + '名以上入力してください';
        errBox.style.display = 'block'; return;
      }
      totalFee += cat.fee;
    } else if (cat.type === 'doubles') {
      var pRows = document.querySelectorAll('.pair-list[data-cat-id="' + catId + '"] .pair-row');
      for (var pr = 0; pr < pRows.length; pr++) {
        var n1 = pRows[pr].querySelector('.pair-name1').value.trim();
        var n2 = pRows[pr].querySelector('.pair-name2').value.trim();
        var t1 = pRows[pr].querySelector('.pair-team1').value.trim();
        var t2 = pRows[pr].querySelector('.pair-team2').value.trim();
        if (n1 && n2) entry.pairs.push({ name1: n1, name2: n2, team1: t1, team2: t2 });
      }
      if (entry.pairs.length === 0) {
        errBox.textContent = cat.label + ' のペアを1組以上入力してください';
        errBox.style.display = 'block'; return;
      }
      totalFee += cat.fee * entry.pairs.length;
    } else {
      var pls = document.querySelectorAll('.player-name[data-cat-id="' + catId + '"]');
      for (var pi = 0; pi < pls.length; pi++) if (pls[pi].value.trim()) entry.players.push(pls[pi].value.trim());
      if (entry.players.length === 0) {
        errBox.textContent = cat.label + ' の選手名を入力してください';
        errBox.style.display = 'block'; return;
      }
      totalFee += cat.fee * entry.players.length;
    }
    entries.push(entry);
  }

  var payload = {
    timestamp: new Date().toISOString(),
    title: '${escapeJs(config.title)}',
    organization: document.getElementById('f_org').value.trim(),
    representative: document.getElementById('f_rep').value.trim(),
    phone: document.getElementById('f_phone').value.trim(),
    email: document.getElementById('f_email').value.trim(),
    entries: entries, totalFee: totalFee
  };

  document.getElementById('ttForm').style.display = 'none';
  document.getElementById('loading').style.display = 'block';
  var done = function() {
    document.getElementById('loading').style.display = 'none';
    document.getElementById('successFee').textContent = '合計参加費: ¥' + totalFee.toLocaleString();
    document.getElementById('success').style.display = 'block';
  };

  if (GAS_URL && GAS_URL.indexOf('YOUR_GAS') < 0) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', GAS_URL, true);
    xhr.setRequestHeader('Content-Type', 'text/plain;charset=UTF-8');
    xhr.onreadystatechange = function() { if (xhr.readyState === 4) done(); };
    xhr.onerror = done;
    try { xhr.send(JSON.stringify(payload)); } catch(err) { done(); }
  } else {
    setTimeout(done, 800);
  }
});

window.ttReset = function() {
  document.getElementById('ttForm').reset();
  document.getElementById('ttForm').style.display = 'block';
  document.getElementById('success').style.display = 'none';
  document.getElementById('playerArea').style.display = 'none';
  document.getElementById('playerForms').innerHTML = '';
  document.getElementById('feeBar').style.display = 'none';
};
})();
</` + `script>
</body>
</html>`;
  };

  // ========== GAS生成（集計表対応・領収書強化版） ==========
  const generateGAS = () => {
    const escapeJs = (s) => String(s||'').replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n');
    const cats = enabledCategories;

    return `/**
 * =====================================================
 * ${config.title}
 * 卓球大会 申込受付＆運営システム v2.0
 * =====================================================
 *
 * 機能：
 * - フォーム自動受信→申込データ蓄積
 * - カテゴリ別名簿シート自動生成
 * - 横軸集計表（団体名×種目クロス集計）自動生成
 * - 重複チェック
 * - 領収書一括作成（チームごと自動集計）
 * - 任意領収書発行（手動入力）
 *
 * 【設置手順】
 * 1. Googleスプレッドシートを新規作成
 * 2. 拡張機能 → Apps Script を開いてこのコードを貼り付け
 * 3. initializeSystem() を実行（権限承認）
 * 4. デプロイ → ウェブアプリ → URL取得
 * 5. フォームHTMLの GAS_URL に貼り付け
 */

var CONFIG = {
  TOURNAMENT_NAME: '${escapeJs(config.title)}',
  ORGANIZER: '${escapeJs(config.organizer)}',
  DATE: '${escapeJs(config.date)}',
  VENUE: '${escapeJs(config.venue)}',
  ADMIN_EMAIL: ''
};

// カテゴリ定義（集計表の列順）
var CATEGORIES = ${JSON.stringify(cats.map(c => {
  const genderJP = c.gender === 'mixed' ? 'ミックス' : c.gender === 'male' ? '男子' : '女子';
  const genderShort = c.gender === 'mixed' ? 'ミックス' : c.gender === 'male' ? '男' : '女';
  const typeShort = c.type === 'team' ? '団体' : c.type === 'doubles' ? 'D' : 'S';
  return {
    type: c.type === 'team' ? '団体戦' : c.type === 'doubles' ? 'ダブルス' : 'シングルス',
    division: c.division,
    gender: genderJP,
    fee: c.fee,
    shortLabel: c.division + genderShort + typeShort
  };
}), null, 2)};

var SHEETS = {
  RAW: '申込データ',
  CROSS: '集計表',
  ROSTER: '選手名簿',
  DUPLICATE: '重複チェック',
  RECEIPT_AUTO: '領収書（自動）',
  RECEIPT_MANUAL: '領収書（任意発行）'
};

// ==================== メニュー ====================
function onOpen() {
  SpreadsheetApp.getUi().createMenu('🏓 大会運営')
    .addItem('📋 初期設定（初回のみ）', 'initializeSystem')
    .addSeparator()
    .addItem('📊 集計表・名簿を再生成', 'regenerateAll')
    .addItem('🔍 重複チェック', 'runDuplicateCheck')
    .addSeparator()
    .addItem('🧾 領収書を一括作成（チーム別）', 'generateAutoReceipts')
    .addItem('📝 任意領収書を発行', 'showManualReceiptDialog')
    .addToUi();
}

// ==================== 初期化 ====================
function initializeSystem() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var raw = getOrCreate(ss, SHEETS.RAW);

  if (raw.getLastRow() === 0) {
    var headers = ['受付番号', '受付日時', '団体名', '代表者', '電話番号', 'メール',
                   '種目', 'カテゴリ', '性別', 'チーム名'];
    for (var p = 1; p <= 8; p++) headers.push('選手' + p);
    headers.push('参加費', '入金確認');
    raw.appendRow(headers);
    raw.getRange(1, 1, 1, headers.length)
      .setBackground('#0f172a').setFontColor('#ffffff').setFontWeight('bold')
      .setHorizontalAlignment('center');
    raw.setFrozenRows(1);
    raw.setRowHeight(1, 32);
  }

  // 集計表シート
  createCrossSheet(ss);
  // 名簿シート
  createRosterSheet(ss);
  // 重複チェック
  getOrCreate(ss, SHEETS.DUPLICATE);
  // 任意領収書
  createManualReceiptSheet(ss);

  SpreadsheetApp.getUi().alert(
    '✅ 初期設定が完了しました\\n\\n' +
    '次の手順：\\n' +
    '1. デプロイ → 新しいデプロイ → ウェブアプリ\\n' +
    '2. 表示されたURLをコピー\\n' +
    '3. フォームHTMLの GAS_URL に貼り付け'
  );
}

// ==================== POST受信 ====================
function doPost(e) {
  var lock = LockService.getScriptLock();
  try { lock.waitLock(30000); } catch(err) {
    return jsonResp({ status: 'error', message: 'busy' });
  }
  try {
    var data = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var raw = ss.getSheetByName(SHEETS.RAW);
    if (!raw) { initializeSystem(); raw = ss.getSheetByName(SHEETS.RAW); }
    var ts = Utilities.formatDate(new Date(), 'Asia/Tokyo', 'yyyy/MM/dd HH:mm:ss');
    var entries = data.entries || [];

    for (var i = 0; i < entries.length; i++) {
      var entry = entries[i];
      var rowNum = raw.getLastRow();
      var entryId = 'E-' + Utilities.formatDate(new Date(), 'Asia/Tokyo', 'yyyyMMdd') + '-' + ('000' + rowNum).slice(-4);

      if (entry.type === 'ダブルス') {
        // ダブルスはペアごとに行を作る
        var pairs = entry.pairs || [];
        for (var pi = 0; pi < pairs.length; pi++) {
          var pair = pairs[pi];
          var row = [
            entryId + '-' + (pi + 1), ts,
            data.organization || '', data.representative || '',
            data.phone || '', data.email || '',
            entry.type, entry.division, entry.gender,
            (pair.team1 || pair.team2) ? (pair.team1 + '/' + pair.team2) : ''
          ];
          row.push(pair.name1 || '');
          row.push(pair.name2 || '');
          for (var p = 0; p < 6; p++) row.push('');
          row.push(entry.fee);
          row.push('');
          raw.appendRow(row);
        }
      } else {
        var row = [
          entryId, ts,
          data.organization || '', data.representative || '',
          data.phone || '', data.email || '',
          entry.type || '', entry.division || '', entry.gender || '',
          entry.teamName || ''
        ];
        var players = entry.players || [];
        for (var p = 0; p < 8; p++) row.push(players[p] || '');
        var fee = entry.fee || 0;
        if (entry.type === 'シングルス') fee = fee * players.length;
        row.push(fee);
        row.push('');
        raw.appendRow(row);
      }
    }

    regenerateAll();
    try { sendConfirmEmail(data); } catch(me) { Logger.log(me); }
    lock.releaseLock();
    return jsonResp({ status: 'success' });
  } catch(err) {
    lock.releaseLock();
    Logger.log(err);
    return jsonResp({ status: 'error', message: err.toString() });
  }
}

function doGet() { return jsonResp({ status: 'ok', service: CONFIG.TOURNAMENT_NAME }); }
function jsonResp(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

// ==================== 集計表（横軸クロス） ====================
function createCrossSheet(ss) {
  var sheet = getOrCreate(ss, SHEETS.CROSS);
  sheet.clear();

  // タイトル
  var totalCols = 2 + CATEGORIES.length + 1; // No, 団体名, ...各カテゴリ, 合計
  sheet.getRange(1, 1, 1, totalCols).merge();
  sheet.getRange(1, 1).setValue(CONFIG.TOURNAMENT_NAME)
    .setFontSize(15).setFontWeight('bold').setFontColor('#0f172a')
    .setHorizontalAlignment('center');
  sheet.setRowHeight(1, 32);

  sheet.getRange(2, 1, 1, totalCols).merge();
  sheet.getRange(2, 1).setValue(CONFIG.DATE + '　' + CONFIG.VENUE)
    .setFontSize(10).setFontColor('#64748b').setHorizontalAlignment('center');

  // ヘッダー（複数行）
  var typeRow = ['No', '団体名'];
  var subRow = ['', ''];
  var feeRow = ['', ''];
  var lastType = '';
  var typeStartCol = 0;
  var typeMergeRanges = [];

  for (var i = 0; i < CATEGORIES.length; i++) {
    var c = CATEGORIES[i];
    if (c.type !== lastType) {
      if (typeStartCol > 0) {
        typeMergeRanges.push({ start: typeStartCol, end: 2 + i, type: lastType });
      }
      typeStartCol = 3 + i;
      lastType = c.type;
    }
    typeRow.push(i === 0 || c.type !== CATEGORIES[i-1].type ? c.type : '');
    subRow.push(c.shortLabel);
    feeRow.push(c.fee);
  }
  typeMergeRanges.push({ start: typeStartCol, end: 2 + CATEGORIES.length, type: lastType });
  typeRow.push('合計');
  subRow.push('');
  feeRow.push('');

  sheet.getRange(4, 1, 1, totalCols).setValues([typeRow]);
  sheet.getRange(5, 1, 1, totalCols).setValues([subRow]);
  sheet.getRange(6, 1, 1, totalCols).setValues([feeRow]);

  // 種目セルをマージ
  for (var m = 0; m < typeMergeRanges.length; m++) {
    var range = typeMergeRanges[m];
    if (range.end > range.start) {
      sheet.getRange(4, range.start, 1, range.end - range.start + 1).merge();
    }
  }
  // No と 団体名 を3行マージ
  sheet.getRange(4, 1, 3, 1).merge();
  sheet.getRange(4, 2, 3, 1).merge();
  // 合計を3行マージ
  sheet.getRange(4, totalCols, 3, 1).merge();

  // ヘッダースタイル
  sheet.getRange(4, 1, 3, totalCols)
    .setBackground('#1e3a5f').setFontColor('#ffffff').setFontWeight('bold')
    .setHorizontalAlignment('center').setVerticalAlignment('middle');
  sheet.getRange(6, 3, 1, CATEGORIES.length).setNumberFormat('¥#,##0').setFontSize(10);

  sheet.setColumnWidth(1, 40);
  sheet.setColumnWidth(2, 160);
  for (var ci = 0; ci < CATEGORIES.length; ci++) sheet.setColumnWidth(3 + ci, 75);
  sheet.setColumnWidth(totalCols, 90);
  sheet.setRowHeight(4, 28);
  sheet.setRowHeight(5, 24);
  sheet.setRowHeight(6, 22);
  sheet.setFrozenRows(6);
  sheet.setFrozenColumns(2);
}

function regenerateAll() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  updateCrossSheet(ss);
  updateRosterSheet(ss);
}

function updateCrossSheet(ss) {
  var sheet = ss.getSheetByName(SHEETS.CROSS);
  if (!sheet) { createCrossSheet(ss); sheet = ss.getSheetByName(SHEETS.CROSS); }

  var raw = ss.getSheetByName(SHEETS.RAW);
  if (!raw || raw.getLastRow() <= 1) return;

  var data = raw.getDataRange().getValues();
  // データを団体名でグルーピング
  var orgMap = {}; // org => { catKey => count }
  for (var i = 1; i < data.length; i++) {
    var org = data[i][2];
    if (!org) continue;
    var type = data[i][6];
    var div = data[i][7];
    var gender = data[i][8];

    if (!orgMap[org]) orgMap[org] = {};

    // カテゴリにマッチするか確認
    for (var ci = 0; ci < CATEGORIES.length; ci++) {
      var cat = CATEGORIES[ci];
      if (cat.type === type && cat.division === div && cat.gender === gender) {
        // 件数カウント
        if (type === '団体戦') {
          orgMap[org][ci] = (orgMap[org][ci] || 0) + 1;
        } else if (type === 'ダブルス') {
          orgMap[org][ci] = (orgMap[org][ci] || 0) + 1;
        } else {
          // シングルス：選手数を数える
          var count = 0;
          for (var p = 10; p <= 17; p++) if (data[i][p]) count++;
          orgMap[org][ci] = (orgMap[org][ci] || 0) + count;
        }
        break;
      }
    }
  }

  // 既存データをクリア
  var lastRow = sheet.getLastRow();
  if (lastRow >= 7) {
    sheet.getRange(7, 1, lastRow - 6, 2 + CATEGORIES.length + 1).clear();
  }

  // 団体名でソート
  var orgs = Object.keys(orgMap).sort();
  var totalCols = 2 + CATEGORIES.length + 1;

  var totalsByCol = {};
  for (var c = 0; c < CATEGORIES.length; c++) totalsByCol[c] = 0;
  var grandTotal = 0;

  for (var oi = 0; oi < orgs.length; oi++) {
    var org = orgs[oi];
    var row = [oi + 1, org];
    var rowFee = 0;
    for (var ci = 0; ci < CATEGORIES.length; ci++) {
      var count = orgMap[org][ci] || 0;
      row.push(count > 0 ? count : '');
      rowFee += count * CATEGORIES[ci].fee;
      totalsByCol[ci] += count;
    }
    row.push(rowFee);
    grandTotal += rowFee;

    var rowNum = 7 + oi;
    sheet.getRange(rowNum, 1, 1, totalCols).setValues([row]);
    if (oi % 2 === 1) sheet.getRange(rowNum, 1, 1, totalCols).setBackground('#f1f5f9');
    sheet.getRange(rowNum, totalCols).setNumberFormat('¥#,##0').setFontWeight('bold');
    sheet.setRowHeight(rowNum, 22);
  }

  // 合計行
  var sumRow = 7 + orgs.length + 1;
  var sumRowData = ['', '合計'];
  for (var ci = 0; ci < CATEGORIES.length; ci++) sumRowData.push(totalsByCol[ci] || 0);
  sumRowData.push(grandTotal);
  sheet.getRange(sumRow, 1, 1, totalCols).setValues([sumRowData]);
  sheet.getRange(sumRow, 1, 1, totalCols)
    .setBackground('#fef3c7').setFontWeight('bold').setHorizontalAlignment('center');
  sheet.getRange(sumRow, totalCols).setNumberFormat('¥#,##0');

  // ボーダー
  if (orgs.length > 0) {
    sheet.getRange(7, 1, orgs.length, totalCols)
      .setBorder(true, true, true, true, true, true, '#cbd5e1', SpreadsheetApp.BorderStyle.SOLID);
  }
  sheet.getRange(sumRow, 1, 1, totalCols)
    .setBorder(true, true, true, true, true, true, '#94a3b8', SpreadsheetApp.BorderStyle.SOLID);
}

// ==================== 選手名簿シート ====================
function createRosterSheet(ss) {
  var sheet = getOrCreate(ss, SHEETS.ROSTER);
  sheet.clear();

  sheet.getRange(1, 1, 1, 7).merge();
  sheet.getRange(1, 1).setValue(CONFIG.TOURNAMENT_NAME + ' 選手名簿')
    .setFontSize(15).setFontWeight('bold').setFontColor('#0f172a')
    .setHorizontalAlignment('center');
  sheet.setRowHeight(1, 32);

  var headers = ['No', '申込団体', '区分', 'チーム名/組', '氏名', '所属', '備考'];
  sheet.getRange(3, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(3, 1, 1, headers.length)
    .setBackground('#1e3a5f').setFontColor('#ffffff').setFontWeight('bold')
    .setHorizontalAlignment('center');
  sheet.setRowHeight(3, 28);
  sheet.setFrozenRows(3);

  sheet.setColumnWidth(1, 50);
  sheet.setColumnWidth(2, 140);
  sheet.setColumnWidth(3, 110);
  sheet.setColumnWidth(4, 130);
  sheet.setColumnWidth(5, 130);
  sheet.setColumnWidth(6, 130);
  sheet.setColumnWidth(7, 100);
}

function updateRosterSheet(ss) {
  var sheet = ss.getSheetByName(SHEETS.ROSTER);
  if (!sheet) { createRosterSheet(ss); sheet = ss.getSheetByName(SHEETS.ROSTER); }

  var raw = ss.getSheetByName(SHEETS.RAW);
  if (!raw || raw.getLastRow() <= 1) return;

  var data = raw.getDataRange().getValues();
  var lastRow = sheet.getLastRow();
  if (lastRow >= 4) sheet.getRange(4, 1, lastRow - 3, 7).clear();

  var rosterRows = [];
  var no = 0;
  for (var i = 1; i < data.length; i++) {
    var org = data[i][2];
    var type = data[i][6];
    var div = data[i][7];
    var gender = data[i][8];
    var teamName = data[i][9];
    var divLabel = div + gender;

    if (type === '団体戦') {
      // 1選手1行
      for (var p = 10; p <= 17; p++) {
        var name = data[i][p];
        if (!name) continue;
        no++;
        rosterRows.push([no, org, type + '・' + divLabel, teamName, name, org, '']);
      }
    } else if (type === 'ダブルス') {
      // ダブルスはペアで1行＋選手2人を別行（または1行に統合）
      var name1 = data[i][10];
      var name2 = data[i][11];
      var teams = (teamName || '').split('/');
      no++;
      rosterRows.push([no, org, type + '・' + divLabel, 'ペア' + i, name1, teams[0] || org, '']);
      no++;
      rosterRows.push([no, org, type + '・' + divLabel, 'ペア' + i, name2, teams[1] || org, '']);
    } else {
      // シングルス
      for (var p = 10; p <= 17; p++) {
        var name = data[i][p];
        if (!name) continue;
        no++;
        rosterRows.push([no, org, type + '・' + divLabel, '', name, org, '']);
      }
    }
  }

  if (rosterRows.length > 0) {
    sheet.getRange(4, 1, rosterRows.length, 7).setValues(rosterRows);
    for (var r = 0; r < rosterRows.length; r++) {
      if (r % 2 === 1) sheet.getRange(4 + r, 1, 1, 7).setBackground('#f1f5f9');
    }
    sheet.getRange(4, 1, rosterRows.length, 7)
      .setBorder(true, true, true, true, true, true, '#cbd5e1', SpreadsheetApp.BorderStyle.SOLID);
  }
}

// ==================== 重複チェック ====================
function runDuplicateCheck() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var raw = ss.getSheetByName(SHEETS.RAW);
  if (!raw || raw.getLastRow() <= 1) {
    SpreadsheetApp.getUi().alert('申込データがありません'); return;
  }
  var data = raw.getDataRange().getValues();
  var map = {};
  for (var i = 1; i < data.length; i++) {
    var org = data[i][2];
    for (var p = 10; p <= 17; p++) {
      var name = data[i][p];
      if (!name) continue;
      var key = String(name).trim();
      if (!map[key]) map[key] = [];
      map[key].push({ org: org, cat: data[i][6] + ' ' + data[i][8] + ' ' + data[i][7] });
    }
  }
  var dup = ss.getSheetByName(SHEETS.DUPLICATE);
  if (!dup) dup = ss.insertSheet(SHEETS.DUPLICATE);
  dup.clear();
  dup.appendRow(['選手名', '登録回数', '所属', '種目（カンマ区切り）']);
  formatHeader(dup, 1, 4, '#dc2626');

  var count = 0;
  for (var n in map) {
    if (map[n].length > 1) {
      var cats = map[n].map(function(x) { return x.cat; }).join(' / ');
      dup.appendRow([n, map[n].length, map[n][0].org, cats]);
      count++;
    }
  }
  if (count === 0) {
    dup.getRange(2, 1, 1, 4).merge();
    dup.getRange(2, 1).setValue('重複なし ✓').setFontColor('#10b981').setHorizontalAlignment('center');
  }
  for (var c = 1; c <= 4; c++) dup.setColumnWidth(c, c === 1 ? 130 : c === 4 ? 350 : 130);
  SpreadsheetApp.getUi().alert('重複チェック完了：' + count + '件');
  ss.setActiveSheet(dup);
}

// ==================== 領収書（自動・チーム別一括） ====================
function generateAutoReceipts() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var raw = ss.getSheetByName(SHEETS.RAW);
  if (!raw || raw.getLastRow() <= 1) {
    SpreadsheetApp.getUi().alert('申込データがありません'); return;
  }
  var data = raw.getDataRange().getValues();
  var byOrg = {};
  for (var i = 1; i < data.length; i++) {
    var org = data[i][2];
    if (!byOrg[org]) byOrg[org] = { rep: data[i][3], total: 0, items: {} };
    byOrg[org].total += data[i][18] || 0;
    var key = data[i][6] + ' ' + data[i][8] + '（' + data[i][7] + '）';
    byOrg[org].items[key] = (byOrg[org].items[key] || 0) + 1;
  }

  var r = ss.getSheetByName(SHEETS.RECEIPT_AUTO);
  if (!r) r = ss.insertSheet(SHEETS.RECEIPT_AUTO);
  r.clear();

  var row = 1;
  var num = 1;
  var today = Utilities.formatDate(new Date(), 'Asia/Tokyo', 'yyyy年M月d日');

  for (var org in byOrg) {
    var info = byOrg[org];
    drawReceipt(r, row, 'R-' + ('000' + num).slice(-4), today, org, info.total, info.items);
    row += 12;
    num++;
  }

  r.setColumnWidth(1, 70);
  r.setColumnWidth(2, 110);
  r.setColumnWidth(3, 110);
  r.setColumnWidth(4, 90);
  r.setColumnWidth(5, 90);

  SpreadsheetApp.getUi().alert((num - 1) + '件の領収書を作成しました');
  ss.setActiveSheet(r);
}

function drawReceipt(sheet, startRow, num, date, recipient, amount, items) {
  // タイトル
  sheet.getRange(startRow, 1, 1, 5).merge();
  sheet.getRange(startRow, 1).setValue('領　収　書')
    .setFontSize(20).setFontWeight('bold').setHorizontalAlignment('center')
    .setFontColor('#0f172a');
  sheet.setRowHeight(startRow, 40);

  // 番号と日付
  sheet.getRange(startRow + 1, 1).setValue('No.').setFontWeight('bold').setHorizontalAlignment('right');
  sheet.getRange(startRow + 1, 2).setValue(num);
  sheet.getRange(startRow + 1, 4, 1, 2).merge();
  sheet.getRange(startRow + 1, 4).setValue(date).setHorizontalAlignment('right');

  // 宛名
  sheet.getRange(startRow + 2, 1, 1, 5).merge();
  sheet.getRange(startRow + 2, 1).setValue(recipient + '　様')
    .setFontSize(15).setFontWeight('bold')
    .setBorder(false, false, true, false, false, false, '#0f172a', SpreadsheetApp.BorderStyle.SOLID);
  sheet.setRowHeight(startRow + 2, 32);

  // 金額
  sheet.getRange(startRow + 3, 1).setValue('金額').setFontWeight('bold').setVerticalAlignment('middle');
  sheet.getRange(startRow + 3, 2, 1, 4).merge();
  sheet.getRange(startRow + 3, 2).setValue(amount).setNumberFormat('¥#,##0')
    .setFontSize(20).setFontWeight('bold').setFontColor('#dc2626')
    .setBorder(true, true, true, true, false, false, '#dc2626', SpreadsheetApp.BorderStyle.SOLID);
  sheet.setRowHeight(startRow + 3, 38);

  // 但し書き
  sheet.getRange(startRow + 4, 1).setValue('但し').setFontWeight('bold');
  sheet.getRange(startRow + 4, 2, 1, 4).merge();
  sheet.getRange(startRow + 4, 2).setValue(CONFIG.TOURNAMENT_NAME + ' 参加費として');

  // 内訳
  if (items) {
    sheet.getRange(startRow + 5, 1).setValue('内訳').setFontWeight('bold').setVerticalAlignment('top');
    var detailLines = [];
    for (var k in items) {
      detailLines.push(k + '：' + items[k] + '件');
    }
    sheet.getRange(startRow + 5, 2, 1, 4).merge();
    sheet.getRange(startRow + 5, 2).setValue(detailLines.join('\\n'))
      .setFontSize(9).setFontColor('#475569').setVerticalAlignment('top').setWrap(true);
    sheet.setRowHeight(startRow + 5, 50);
  }

  sheet.getRange(startRow + 6, 1, 1, 5).merge();
  sheet.getRange(startRow + 6, 1).setValue('上記正に領収いたしました')
    .setHorizontalAlignment('center').setFontColor('#475569');

  sheet.getRange(startRow + 7, 3, 1, 3).merge();
  sheet.getRange(startRow + 7, 3).setValue(CONFIG.ORGANIZER)
    .setFontWeight('bold').setHorizontalAlignment('right').setFontSize(13);

  // 区切り線（点線）
  sheet.getRange(startRow + 9, 1, 1, 5).merge();
  sheet.getRange(startRow + 9, 1).setValue('- - - - - - - - キリトリ - - - - - - - -')
    .setHorizontalAlignment('center').setFontColor('#cbd5e1').setFontSize(9);
}

// ==================== 任意領収書（手動入力） ====================
function createManualReceiptSheet(ss) {
  var sheet = getOrCreate(ss, SHEETS.RECEIPT_MANUAL);
  sheet.clear();

  // タイトル
  sheet.getRange(1, 1, 1, 5).merge();
  sheet.getRange(1, 1).setValue('📝 任意領収書 入力エリア')
    .setFontSize(15).setFontWeight('bold').setFontColor('#0f172a')
    .setHorizontalAlignment('center')
    .setBackground('#fef3c7');
  sheet.setRowHeight(1, 32);

  // 説明
  sheet.getRange(2, 1, 1, 5).merge();
  sheet.getRange(2, 1).setValue('下の入力欄に必要事項を入力してから、メニュー → 「📝 任意領収書を発行」を実行してください')
    .setFontSize(10).setFontColor('#64748b').setHorizontalAlignment('center');

  // 入力欄
  sheet.getRange(4, 1).setValue('団体名・宛名').setFontWeight('bold').setBackground('#f1f5f9');
  sheet.getRange(4, 2, 1, 4).merge().setBackground('#fffbeb')
    .setBorder(true, true, true, true, false, false, '#f59e0b', SpreadsheetApp.BorderStyle.SOLID);
  sheet.setRowHeight(4, 32);

  sheet.getRange(5, 1).setValue('金額').setFontWeight('bold').setBackground('#f1f5f9');
  sheet.getRange(5, 2, 1, 4).merge().setBackground('#fffbeb')
    .setNumberFormat('¥#,##0')
    .setBorder(true, true, true, true, false, false, '#f59e0b', SpreadsheetApp.BorderStyle.SOLID);
  sheet.setRowHeight(5, 32);

  sheet.getRange(6, 1).setValue('但し書き').setFontWeight('bold').setBackground('#f1f5f9').setVerticalAlignment('top');
  sheet.getRange(6, 2, 1, 4).merge().setValue(CONFIG.TOURNAMENT_NAME + ' 参加費として').setBackground('#fffbeb')
    .setBorder(true, true, true, true, false, false, '#f59e0b', SpreadsheetApp.BorderStyle.SOLID);
  sheet.setRowHeight(6, 32);

  sheet.getRange(7, 1).setValue('発行日').setFontWeight('bold').setBackground('#f1f5f9');
  sheet.getRange(7, 2, 1, 4).merge().setBackground('#fffbeb').setValue(new Date()).setNumberFormat('yyyy年m月d日')
    .setBorder(true, true, true, true, false, false, '#f59e0b', SpreadsheetApp.BorderStyle.SOLID);
  sheet.setRowHeight(7, 32);

  sheet.getRange(8, 1).setValue('No.').setFontWeight('bold').setBackground('#f1f5f9');
  sheet.getRange(8, 2, 1, 4).merge().setValue('M-0001').setBackground('#fffbeb')
    .setBorder(true, true, true, true, false, false, '#f59e0b', SpreadsheetApp.BorderStyle.SOLID);

  // 領収書プレビューエリア
  sheet.getRange(11, 1, 1, 5).merge();
  sheet.getRange(11, 1).setValue('▼ 領収書プレビュー（メニュー実行で更新）')
    .setFontSize(11).setFontColor('#64748b');

  sheet.setColumnWidth(1, 130);
  for (var c = 2; c <= 5; c++) sheet.setColumnWidth(c, 110);
}

function showManualReceiptDialog() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEETS.RECEIPT_MANUAL);
  if (!sheet) { createManualReceiptSheet(ss); sheet = ss.getSheetByName(SHEETS.RECEIPT_MANUAL); }

  // 入力値取得
  var recipient = sheet.getRange(4, 2).getValue();
  var amount = sheet.getRange(5, 2).getValue();
  var note = sheet.getRange(6, 2).getValue() || (CONFIG.TOURNAMENT_NAME + ' 参加費として');
  var date = sheet.getRange(7, 2).getValue();
  var num = sheet.getRange(8, 2).getValue() || 'M-0001';

  if (!recipient) {
    SpreadsheetApp.getUi().alert('団体名・宛名を入力してください'); return;
  }
  if (!amount || amount <= 0) {
    SpreadsheetApp.getUi().alert('金額を入力してください'); return;
  }

  var dateStr = (date instanceof Date)
    ? Utilities.formatDate(date, 'Asia/Tokyo', 'yyyy年M月d日')
    : String(date);

  // プレビューエリアをクリア
  var lastRow = sheet.getLastRow();
  if (lastRow >= 12) sheet.getRange(12, 1, lastRow - 11, 5).clear();

  drawReceipt(sheet, 13, num, dateStr, recipient, amount, null);
  // 但し書きを上書き
  sheet.getRange(13 + 4, 2).setValue(note);

  ss.setActiveSheet(sheet);
  SpreadsheetApp.getUi().alert('✅ 領収書を発行しました\\n\\n13行目以降に領収書プレビューを表示しています');
}

// ==================== メール ====================
function sendConfirmEmail(data) {
  if (!data.email) return;
  var body = (data.organization || '') + ' ' + (data.representative || '') + ' 様\\n\\n';
  body += CONFIG.TOURNAMENT_NAME + ' へのお申込みありがとうございます。\\n';
  body += '以下の内容で受け付けました。\\n\\n';
  body += '━━━━━━━━━━━━━━━\\n';
  var entries = data.entries || [];
  for (var i = 0; i < entries.length; i++) {
    var e = entries[i];
    body += '■ ' + e.label;
    if (e.teamName) body += '（' + e.teamName + '）';
    body += '\\n';
    if (e.pairs && e.pairs.length > 0) {
      for (var p = 0; p < e.pairs.length; p++) {
        body += '  ペア' + (p+1) + ': ' + e.pairs[p].name1 + ' / ' + e.pairs[p].name2 + '\\n';
      }
    } else {
      var ps = e.players || [];
      for (var p = 0; p < ps.length; p++) body += '  ' + (p + 1) + '. ' + ps[p] + '\\n';
    }
    body += '\\n';
  }
  body += '━━━━━━━━━━━━━━━\\n';
  body += '合計: ¥' + (data.totalFee || 0).toLocaleString() + '\\n';
  body += '※当日、開会式前までに本部席へ納入してください\\n\\n';
  if (CONFIG.DATE) body += '日時: ' + CONFIG.DATE + '\\n';
  if (CONFIG.VENUE) body += '会場: ' + CONFIG.VENUE + '\\n\\n';
  body += CONFIG.ORGANIZER;

  MailApp.sendEmail({
    to: data.email,
    subject: '【' + CONFIG.TOURNAMENT_NAME + '】申込受付完了',
    body: body
  });
}

// ==================== ユーティリティ ====================
function getOrCreate(ss, name) {
  var s = ss.getSheetByName(name);
  if (!s) s = ss.insertSheet(name);
  return s;
}

function formatHeader(sheet, row, cols, color) {
  sheet.getRange(row, 1, 1, cols)
    .setBackground(color).setFontColor('#ffffff').setFontWeight('bold')
    .setHorizontalAlignment('center');
  sheet.setRowHeight(row, 30);
}
`;
  };

  // プレビュー更新
  useEffect(() => {
    if (step === 5 && outputTab === 'preview' && previewRef.current) {
      previewRef.current.srcdoc = generateHTML();
    }
  }, [step, outputTab, config, categories]);

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(key);
      setTimeout(() => setCopied(''), 1500);
    });
  };

  const downloadFile = (filename, content) => {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const t = themes[config.theme];

  return (
    <div className="min-h-screen p-3 md:p-6" style={{ background: 'linear-gradient(135deg, #f1f5f9 0%, #e0f2fe 100%)' }}>
      <div className="max-w-5xl mx-auto">

        <div className="rounded-2xl p-6 md:p-8 mb-5 relative overflow-hidden text-white shadow-xl"
             style={{ background: `linear-gradient(135deg, #${t.primary}, #${t.secondary} 60%, #${t.accent})` }}>
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10"></div>
          <div className="absolute -bottom-8 -left-8 w-28 h-28 rounded-full bg-amber-300/15"></div>
          <div className="relative z-10">
            <div className="text-xs tracking-widest text-white/60 mb-1">TABLE TENNIS · TOURNAMENT SYSTEM v2.0</div>
            <h1 className="text-2xl md:text-3xl font-black mb-1 flex items-center gap-2">
              🏓 卓球大会 申込フォーム生成ツール
            </h1>
            <p className="text-sm text-white/80">エクセル集計表をWebフォーム＋自動集計＋領収書発行に置き換え</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-1.5 mb-4 flex gap-1 shadow-sm overflow-x-auto">
          {[
            { n: 1, label: 'テンプレ', icon: BookOpen },
            { n: 2, label: '基本情報', icon: Settings },
            { n: 3, label: 'カテゴリ', icon: Trophy },
            { n: 4, label: 'デザイン', icon: Palette },
            { n: 5, label: '出力', icon: Code }
          ].map(s => (
            <button key={s.n} onClick={() => setStep(s.n)}
              className={`flex-1 min-w-fit px-3 md:px-4 py-2.5 rounded-lg text-xs md:text-sm font-semibold flex items-center justify-center gap-1.5 transition-all whitespace-nowrap ${
                step === s.n ? 'text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'
              }`}
              style={step === s.n ? { background: `linear-gradient(135deg, #${t.primary}, #${t.secondary})` } : {}}>
              <s.icon size={14} />
              <span className="hidden sm:inline">{s.n}.</span>{s.label}
            </button>
          ))}
        </div>

        {/* STEP 1: テンプレート選択 */}
        {step === 1 && (
          <div className="bg-white rounded-xl p-5 md:p-7 shadow-sm">
            <h2 className="text-base font-bold text-slate-900 mb-1 flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs">1</span>
              大会テンプレートを選択
            </h2>
            <p className="text-xs text-slate-500 mb-5">過去の集計表から復元した3つのテンプレートから選んでください。後から自由に変更できます。</p>

            <div className="space-y-3">
              {Object.entries(TEMPLATES).map(([key, tpl]) => (
                <button key={key} onClick={() => applyTemplate(key)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                    selectedTemplate === key ? 'border-slate-900 bg-slate-50 shadow-md' : 'border-slate-200 hover:border-slate-400'
                  }`}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="font-bold text-slate-900 mb-1 flex items-center gap-2">
                        <FileSpreadsheet size={16} className="text-blue-600"/>
                        {tpl.name}
                      </div>
                      <div className="text-xs text-slate-500 mb-2">{tpl.description}</div>
                      <div className="flex flex-wrap gap-1.5">
                        {tpl.config.hasTeam && <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">団体戦</span>}
                        {tpl.config.hasSingles && <span className="text-xs bg-violet-100 text-violet-800 px-2 py-0.5 rounded-full">シングルス</span>}
                        {tpl.config.hasDoubles && <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">ダブルス</span>}
                        <span className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full">{tpl.categories.filter(c => c.enabled).length}カテゴリ</span>
                      </div>
                    </div>
                    {selectedTemplate === key && <Check size={20} className="text-emerald-600 flex-shrink-0"/>}
                  </div>
                </button>
              ))}
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded-lg text-xs text-blue-900 mt-5">
              💡 テンプレートを変えると、基本情報とカテゴリが上書きされます
            </div>

            <NextButton onClick={() => setStep(2)} themeColor={t.primary} />
          </div>
        )}

        {/* STEP 2: 基本情報 */}
        {step === 2 && (
          <div className="bg-white rounded-xl p-5 md:p-7 shadow-sm">
            <h2 className="text-base font-bold text-slate-900 mb-1 flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs">2</span>
              大会基本情報
            </h2>
            <p className="text-xs text-slate-500 mb-5">大会名・会場・問い合わせ先などを入力してください</p>

            <div className="space-y-4">
              <Field label="大会名" required>
                <input type="text" value={config.title} onChange={e => setConfig({...config, title: e.target.value})}
                  className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"/>
              </Field>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Field label="主催団体">
                  <input type="text" value={config.organizer} onChange={e => setConfig({...config, organizer: e.target.value})}
                    className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"/>
                </Field>
                <Field label="開催日">
                  <input type="text" value={config.date} onChange={e => setConfig({...config, date: e.target.value})}
                    className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"/>
                </Field>
                <Field label="会場">
                  <input type="text" value={config.venue} onChange={e => setConfig({...config, venue: e.target.value})}
                    className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"/>
                </Field>
                <Field label="申込締切">
                  <input type="text" value={config.deadline} onChange={e => setConfig({...config, deadline: e.target.value})}
                    className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"/>
                </Field>
              </div>
              <Field label="注意事項・大会の説明">
                <textarea value={config.notice} onChange={e => setConfig({...config, notice: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"/>
              </Field>
            </div>

            <div className="flex justify-between mt-6">
              <BackButton onClick={() => setStep(1)} />
              <NextButton onClick={() => setStep(3)} themeColor={t.primary} />
            </div>
          </div>
        )}

        {/* STEP 3: カテゴリ */}
        {step === 3 && (
          <div className="bg-white rounded-xl p-5 md:p-7 shadow-sm">
            <h2 className="text-base font-bold text-slate-900 mb-1 flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs">3</span>
              種目・カテゴリ設定
            </h2>
            <p className="text-xs text-slate-500 mb-4">使用する種目をチェック、参加費を調整してください</p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded-lg text-xs text-blue-900 mb-5">
              💡 選択中：<strong>{TEMPLATES[selectedTemplate].name}</strong>（{enabledCategories.length}カテゴリ有効）
            </div>

            {/* 団体戦 */}
            {categories.some(c => c.type === 'team') && (
              <div className="mb-5">
                <div className="bg-gradient-to-r from-amber-400 to-amber-500 text-white px-4 py-2.5 rounded-t-lg font-bold text-sm flex items-center gap-2">
                  <Trophy size={16}/> 団体戦
                </div>
                <div className="border border-amber-400 border-t-0 rounded-b-lg overflow-hidden">
                  {[...new Set(categories.filter(c => c.type === 'team').map(c => c.division))].map(div => (
                    <div key={`team-${div}`} className="border-b last:border-b-0 border-slate-200">
                      <div className="bg-slate-50 px-4 py-1.5 text-xs font-bold text-slate-600">{div}の部</div>
                      {categories.filter(c => c.type === 'team' && c.division === div).map(c => (
                        <CatRow key={c.id} cat={c} onUpdate={updateCategory} onToggle={toggleCategory}/>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* シングルス */}
            {categories.some(c => c.type === 'singles') && (
              <div className="mb-5">
                <div className="bg-gradient-to-r from-violet-500 to-purple-500 text-white px-4 py-2.5 rounded-t-lg font-bold text-sm flex items-center gap-2">
                  🏓 シングルス
                </div>
                <div className="border border-violet-500 border-t-0 rounded-b-lg overflow-hidden">
                  {[...new Set(categories.filter(c => c.type === 'singles').map(c => c.division))].map(div => (
                    <div key={`singles-${div}`} className="border-b last:border-b-0 border-slate-200">
                      <div className="bg-slate-50 px-4 py-1.5 text-xs font-bold text-slate-600">{div}の部</div>
                      {categories.filter(c => c.type === 'singles' && c.division === div).map(c => (
                        <CatRow key={c.id} cat={c} onUpdate={updateCategory} onToggle={toggleCategory}/>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ダブルス */}
            {categories.some(c => c.type === 'doubles') && (
              <div>
                <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-4 py-2.5 rounded-t-lg font-bold text-sm flex items-center gap-2">
                  👥 ダブルス
                </div>
                <div className="border border-emerald-500 border-t-0 rounded-b-lg overflow-hidden">
                  {[...new Set(categories.filter(c => c.type === 'doubles').map(c => c.division))].map(div => (
                    <div key={`doubles-${div}`} className="border-b last:border-b-0 border-slate-200">
                      <div className="bg-slate-50 px-4 py-1.5 text-xs font-bold text-slate-600">{div}の部</div>
                      {categories.filter(c => c.type === 'doubles' && c.division === div).map(c => (
                        <CatRow key={c.id} cat={c} onUpdate={updateCategory} onToggle={toggleCategory}/>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-between mt-6">
              <BackButton onClick={() => setStep(2)}/>
              <NextButton onClick={() => setStep(4)} themeColor={t.primary}/>
            </div>
          </div>
        )}

        {/* STEP 4: デザイン */}
        {step === 4 && (
          <div className="bg-white rounded-xl p-5 md:p-7 shadow-sm">
            <h2 className="text-base font-bold text-slate-900 mb-1 flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs">4</span>
              デザイン設定
            </h2>
            <p className="text-xs text-slate-500 mb-5">フォームのテーマカラーを選択してください</p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {Object.entries(themes).map(([key, th]) => (
                <button key={key} onClick={() => setConfig({...config, theme: key})}
                  className={`p-3 rounded-xl border-2 transition-all text-left ${
                    config.theme === key ? 'border-slate-900 shadow-md scale-105' : 'border-slate-200 hover:border-slate-400'
                  }`}>
                  <div className="h-12 rounded-lg mb-2 shadow-sm"
                    style={{ background: `linear-gradient(135deg, #${th.primary}, #${th.secondary} 60%, #${th.accent})` }}></div>
                  <div className="text-xs font-bold text-slate-800">{th.name}</div>
                </button>
              ))}
            </div>

            <div className="flex justify-between mt-6">
              <BackButton onClick={() => setStep(3)}/>
              <NextButton onClick={() => setStep(5)} themeColor={t.primary} label="出力する"/>
            </div>
          </div>
        )}

        {/* STEP 5: 出力 */}
        {step === 5 && (
          <div className="bg-white rounded-xl p-5 md:p-7 shadow-sm">
            <h2 className="text-base font-bold text-slate-900 mb-1 flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs">5</span>
              生成結果
            </h2>
            <p className="text-xs text-slate-500 mb-4">下のタブから各コードをコピーまたはダウンロードしてください</p>

            <div className="flex gap-1 border-b-2 border-slate-200 mb-4 overflow-x-auto">
              {[
                { key: 'preview', label: 'プレビュー', icon: Eye },
                { key: 'html', label: 'フォームHTML', icon: FileText },
                { key: 'gas', label: 'GASコード', icon: Code },
                { key: 'guide', label: '設置手順', icon: AlertCircle }
              ].map(o => (
                <button key={o.key} onClick={() => setOutputTab(o.key)}
                  className={`px-3 md:px-4 py-2.5 text-xs md:text-sm font-semibold flex items-center gap-1.5 border-b-2 -mb-0.5 whitespace-nowrap transition-colors ${
                    outputTab === o.key ? 'text-slate-900 border-slate-900' : 'text-slate-500 border-transparent hover:text-slate-800'
                  }`}>
                  <o.icon size={14}/>{o.label}
                </button>
              ))}
            </div>

            {outputTab === 'preview' && (
              <div className="bg-slate-50 rounded-xl p-3 border border-dashed border-slate-300">
                <iframe ref={previewRef} className="w-full h-[600px] border-0 rounded-lg bg-white shadow-sm"/>
              </div>
            )}

            {outputTab === 'html' && (
              <div>
                <div className="flex gap-2 mb-3 flex-wrap">
                  <button onClick={() => copyToClipboard(generateHTML(), 'html')}
                    className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${copied === 'html' ? 'bg-emerald-500 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>
                    {copied === 'html' ? <><Check size={14}/>コピー済み</> : <><Copy size={14}/>HTMLをコピー</>}
                  </button>
                  <button onClick={() => downloadFile('form.html', generateHTML())}
                    className="px-4 py-2 rounded-lg text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 flex items-center gap-1.5 transition-colors">
                    <Download size={14}/>form.html
                  </button>
                </div>
                <pre className="bg-slate-900 text-slate-200 p-4 rounded-lg text-[11px] leading-relaxed max-h-[500px] overflow-auto font-mono whitespace-pre-wrap break-all">{generateHTML()}</pre>
              </div>
            )}

            {outputTab === 'gas' && (
              <div>
                <div className="flex gap-2 mb-3 flex-wrap">
                  <button onClick={() => copyToClipboard(generateGAS(), 'gas')}
                    className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${copied === 'gas' ? 'bg-emerald-500 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>
                    {copied === 'gas' ? <><Check size={14}/>コピー済み</> : <><Copy size={14}/>GASをコピー</>}
                  </button>
                  <button onClick={() => downloadFile('Code.gs', generateGAS())}
                    className="px-4 py-2 rounded-lg text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 flex items-center gap-1.5 transition-colors">
                    <Download size={14}/>Code.gs
                  </button>
                </div>
                <pre className="bg-slate-900 text-slate-200 p-4 rounded-lg text-[11px] leading-relaxed max-h-[500px] overflow-auto font-mono whitespace-pre-wrap break-all">{generateGAS()}</pre>
              </div>
            )}

            {outputTab === 'guide' && (
              <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <AlertCircle size={18} className="text-blue-500"/>設置手順
                </h3>
                <ol className="space-y-3 text-sm text-slate-700 mb-6">
                  <li className="flex gap-3"><span className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center">1</span>
                    <div><strong>Googleスプレッドシートを新規作成</strong></div></li>
                  <li className="flex gap-3"><span className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center">2</span>
                    <div><strong>拡張機能 → Apps Script を開く</strong><div className="text-xs text-slate-500 mt-1">「GASコード」タブの内容を全て貼り付けて保存</div></div></li>
                  <li className="flex gap-3"><span className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center">3</span>
                    <div><strong>initializeSystem() を実行</strong><div className="text-xs text-slate-500 mt-1">関数セレクタで選んで▶実行 → 権限承認</div></div></li>
                  <li className="flex gap-3"><span className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center">4</span>
                    <div><strong>デプロイ → ウェブアプリ</strong><div className="text-xs text-slate-500 mt-1">実行ユーザー：自分／アクセス権：全員 → URLをコピー</div></div></li>
                  <li className="flex gap-3"><span className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center">5</span>
                    <div><strong>フォームHTMLにURLを貼付</strong><div className="text-xs text-slate-500 mt-1"><code className="bg-slate-200 px-1 rounded">YOUR_GAS_WEB_APP_URL_HERE</code> を Step 4 のURLに置換</div></div></li>
                  <li className="flex gap-3"><span className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center">6</span>
                    <div><strong>Webサイトに設置</strong><div className="text-xs text-slate-500 mt-1">Jimdo: HTMLウィジェットに貼付け</div></div></li>
                </ol>

                <h4 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2"><Sparkles size={14} className="text-amber-500"/>自動生成されるシート（エクセル集計表に対応）</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs mb-5">
                  <Card title="📥 申込データ" desc="フォームから受信した生データ"/>
                  <Card title="📊 集計表" desc="団体名×種目クロス集計（横軸）"/>
                  <Card title="📝 選手名簿" desc="全選手を一覧化"/>
                  <Card title="🔍 重複チェック" desc="同一選手の複数登録を検出"/>
                  <Card title="🧾 領収書（自動）" desc="チームごとに一括発行・印刷可"/>
                  <Card title="📝 領収書（任意発行）" desc="金額・宛名を自由入力で発行"/>
                </div>

                <h4 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2"><Receipt size={14} className="text-emerald-500"/>2種類の領収書発行</h4>
                <div className="space-y-2 mb-2">
                  <div className="bg-white p-3 rounded-lg border-l-4 border-blue-500">
                    <div className="font-bold text-sm text-slate-900">🧾 自動領収書（チーム別一括）</div>
                    <div className="text-xs text-slate-600 mt-1">「🏓 大会運営 → 🧾 領収書を一括作成（チーム別）」を実行すると、申込データから団体ごとに参加費を集計し、内訳付き領収書を全件まとめて発行</div>
                  </div>
                  <div className="bg-white p-3 rounded-lg border-l-4 border-amber-500">
                    <div className="font-bold text-sm text-slate-900">📝 任意領収書（手動入力）</div>
                    <div className="text-xs text-slate-600 mt-1">「📝 領収書（任意発行）」シートに金額・宛名を入力し、メニューから「📝 任意領収書を発行」でその場で領収書を生成</div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-between mt-6">
              <BackButton onClick={() => setStep(4)}/>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({ label, required, children }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-600 mb-1.5">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

function CatRow({ cat, onUpdate, onToggle }) {
  const isMixed = cat.gender === 'mixed';
  const isMale = cat.gender === 'male';
  const labelColor = isMixed ? 'text-violet-700' : isMale ? 'text-blue-700' : 'text-pink-700';
  const bgColor = isMixed ? 'bg-violet-50' : isMale ? 'bg-blue-50' : 'bg-pink-50';
  const genderLabel = isMixed ? '⚥ ミックス' : isMale ? '♂ 男子' : '♀ 女子';

  return (
    <div className={`px-4 py-2.5 flex items-center gap-3 ${cat.enabled ? bgColor : 'bg-white opacity-60'} transition-colors flex-wrap`}>
      <input type="checkbox" checked={cat.enabled} onChange={() => onToggle(cat.id)}
        className="w-4 h-4 rounded cursor-pointer"/>
      <div className={`text-xs font-bold ${labelColor} w-20 flex-shrink-0`}>{genderLabel}</div>
      <div className="flex-1 flex items-center gap-2 text-xs flex-wrap min-w-0">
        <span className="text-slate-500">参加費</span>
        <input type="number" value={cat.fee}
          onChange={e => onUpdate(cat.id, 'fee', parseInt(e.target.value) || 0)}
          disabled={!cat.enabled}
          className="w-20 px-2 py-1 border border-slate-300 rounded text-right disabled:bg-slate-100"/>
        <span className="text-slate-500">円</span>
        {cat.type === 'team' && (
          <>
            <span className="text-slate-300 mx-1">|</span>
            <span className="text-slate-500">人数</span>
            <input type="number" value={cat.minMembers}
              onChange={e => onUpdate(cat.id, 'minMembers', parseInt(e.target.value) || 1)}
              disabled={!cat.enabled}
              className="w-12 px-2 py-1 border border-slate-300 rounded text-right disabled:bg-slate-100"/>
            <span className="text-slate-400">〜</span>
            <input type="number" value={cat.maxMembers}
              onChange={e => onUpdate(cat.id, 'maxMembers', parseInt(e.target.value) || 1)}
              disabled={!cat.enabled}
              className="w-12 px-2 py-1 border border-slate-300 rounded text-right disabled:bg-slate-100"/>
            <span className="text-slate-500">名</span>
          </>
        )}
      </div>
    </div>
  );
}

function NextButton({ onClick, themeColor, label = '次へ' }) {
  return (
    <button onClick={onClick}
      className="ml-auto flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-white text-sm font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
      style={{ background: `#${themeColor}` }}>
      {label} <ChevronRight size={16}/>
    </button>
  );
}

function BackButton({ onClick }) {
  return (
    <button onClick={onClick}
      className="flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-slate-200 text-slate-700 text-sm font-semibold hover:bg-slate-300 transition-colors">
      <ChevronLeft size={16}/>戻る
    </button>
  );
}

function Card({ title, desc }) {
  return (
    <div className="bg-white p-2.5 rounded-lg">
      <strong className="text-slate-900">{title}</strong>
      <div className="text-slate-500 text-[11px]">{desc}</div>
    </div>
  );
}
