/* home-energy-card — energy use, Octopus rates and cars page, matches home-panel-card styling */
/* the shared pop-up host is defined in hpc-pops.js */
const HEC_CSS = `.er{position:relative;background:var(--bg);height:calc(100vh - var(--header-height,56px));min-height:660px;padding:18px;box-sizing:border-box;display:flex;flex-direction:column}
.eh{display:flex;align-items:center;gap:12px;margin:0 4px 14px}.eh h1{font-size:28px;font-weight:700;letter-spacing:-.02em;margin:0;line-height:1.1}.eh .c{font-size:14px;color:var(--sub);font-weight:500}
.eg{flex:1;min-height:0;display:grid;grid-template-columns:minmax(0,2fr) minmax(0,1fr);grid-template-rows:minmax(0,1fr) auto auto;gap:14px}.eg>.heat,.eg>.hrow2{grid-column:1 / -1;min-height:128px}.eg .heat .ht2{height:132px;box-sizing:border-box}.hrow2{display:flex;gap:14px}.hrow2>.heat{flex:4 1 0;min-width:0}.lnd{flex:1.15 1 0;min-width:250px;height:132px;box-sizing:border-box;padding:10px 12px;display:flex;flex-direction:column;gap:6px;overflow:hidden}.lnd .lh{display:flex;align-items:center;justify-content:space-between;font-size:11px;font-weight:700;letter-spacing:.07em;color:var(--sub)}.lnd .lh em{font-style:normal;letter-spacing:0;font-weight:600;margin-left:8px}.lnd .llg{height:18px;width:auto;display:block;margin:-3px -2px -3px 0}:host(.dark) .lnd .llg{filter:brightness(0) invert(1);opacity:.85}.lap{flex:1;display:flex;align-items:center;gap:10px;min-height:0;cursor:pointer;border-radius:14px;padding:2px 4px;margin:0 -4px}.lap .li{width:36px;height:36px;border-radius:50%;flex:0 0 auto;display:flex;align-items:center;justify-content:center;background:rgba(var(--rgb),.16);color:rgb(var(--rgb))}.lap .li ha-icon{--mdc-icon-size:20px}.lap.run .li{animation:lvp 2s infinite}.lap .lt{flex:1;min-width:0}.lap .ln{font-size:14px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.lap .ls{font-size:11.5px;color:var(--sub);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.lap.run .ls{color:rgb(var(--rgb))}.lap .lr{text-align:right;flex:0 0 auto}.lap .lr b{display:block;font-size:16px;font-weight:600;line-height:1.1}.lap .lr small{font-size:11px;color:var(--sub)}
.euse{padding:14px 16px;display:flex;flex-direction:column;min-height:0}.euse .head{margin-bottom:2px}.euse .head img{width:30px;height:30px;object-fit:contain}
.ek{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px;margin-top:10px}.ek .blk{padding:10px 12px;border-radius:16px}.ek .lbl{text-transform:none;letter-spacing:0;display:flex;align-items:center;gap:6px}.ek .lbl i{width:9px;height:9px;border-radius:3px;display:block}
.ek .v{font-size:22px;font-weight:600;margin-top:2px}.ek .v small{font-size:12px;color:var(--sub);font-weight:500;margin-left:3px}.ek .s{font-size:12px;color:var(--sub);margin-top:1px}.ek .blk.tot .v{color:var(--accent)}
.euse .ech{flex:1 1 auto;min-height:100px;margin-top:14px}.euse .ech.mon{margin-top:14px}.euse .ech.mon .ebars,.euse .ech.mon .exl{gap:3px}.euse .ech.mon .ebd{gap:1px}.euse .ech.mon .ebd b{width:45%;border-radius:3px 3px 0 0}.euse .ech.mon .exl span{font-size:10px}
.ek .lbl i.lvd{border-radius:50%;animation:lvp 1.6s infinite}@keyframes lvp{50%{opacity:.3}}.ek .now .v{font-weight:700}.ek .s b{color:var(--text);font-weight:600}
.emsum{font-size:12px;color:var(--sub);margin-top:6px}.emsum b{color:var(--text)}
.eseg{margin-left:auto;margin-right:10px;display:flex;background:var(--card2);border-radius:999px;padding:2px}.eseg button{border:0;background:none;border-radius:999px;padding:5px 12px;font:inherit;font-size:12px;font-weight:600;color:var(--sub);cursor:pointer}.eseg button.sel{background:var(--card);color:var(--text);box-shadow:0 1px 3px rgba(0,0,0,.08)}.euse .ech .ebd b{max-width:30px}.euse .ech .exl span{font-size:11px}
.erate{padding:14px 16px;display:flex;flex-direction:column;gap:8px;min-height:0;overflow:hidden}
.rnow{display:flex;align-items:flex-end;gap:10px}.rnow .v{font-size:40px;font-weight:700;line-height:1}.rnow .v small{font-size:15px;color:var(--sub);font-weight:500;margin-left:4px}
.rpill{display:inline-flex;align-items:center;gap:4px;font-size:12px;font-weight:700;padding:3px 9px;border-radius:999px;margin-bottom:5px}.rpill.peak{background:rgba(229,72,77,.12);color:#e5484d}.rpill.cheap{background:rgba(34,160,107,.14);color:#22a06b}
.rsub{font-size:13px;color:var(--sub)}.rsub b{color:var(--text);font-weight:600}
.rday{flex:1 1 auto;min-height:44px;display:flex;flex-direction:column;margin-top:4px}.rday .lbl{margin-bottom:6px}
.rbars{flex:1;display:flex;align-items:flex-end;gap:1px;position:relative;border-bottom:1px solid var(--line)}.rbars b{flex:1;border-radius:2px 2px 0 0;min-height:2px;opacity:.85}.rbars b.past{opacity:.3}
.rbars .now{position:absolute;top:-4px;bottom:-4px;width:2px;background:var(--text);border-radius:1px}.rax{display:flex;justify-content:space-between;font-size:10px;color:var(--sub);font-weight:600;margin-top:4px}
.rlist{display:grid;grid-template-columns:1fr 1fr;gap:8px}.rlist .blk{padding:7px 12px;border-radius:14px}.rlist .k{font-size:11px;color:var(--sub);font-weight:600}.rlist .v{font-size:16px;font-weight:600;margin-top:1px}.rlist .v small{font-size:11px;color:var(--sub);font-weight:500;margin-left:2px}
.ecars{grid-column:1 / -1;display:grid;grid-template-columns:repeat(auto-fit,minmax(380px,1fr));gap:14px}
.ecar{padding:14px 16px;display:grid;grid-template-columns:minmax(150px,38%) minmax(0,1fr);grid-template-rows:auto 1fr;column-gap:16px;cursor:default}
.ecar .ch{grid-column:1 / -1;display:flex;align-items:center;gap:10px;margin-bottom:6px}.ecar .ch .crest{width:28px;height:28px;object-fit:contain}.ecar .ch .wm{height:13px;width:auto;opacity:.85}.ecar .ch .n+.wm{margin-left:auto}.ecar .ch .n{font-size:15px;font-weight:700}
:host(.dark) .ecar .ch .wm{filter:invert(1)}:host(.dark) .ecar img.inv{filter:invert(1)}
.ecar .pic{display:flex;align-items:center;justify-content:center;min-width:0;width:auto;height:auto;border-radius:0;background:none;flex:initial}.ecar .pic img{width:100%;max-height:118px;object-fit:contain}.ecar .pic .cimg{width:100%;background-repeat:no-repeat}
.ecar .info{min-width:0;display:flex;flex-direction:column}
.ecar .soc{font-size:38px;font-weight:600;line-height:1}.ecar .soc small{font-size:15px;color:var(--sub);font-weight:500;margin-left:6px}
.ecar .bbar{height:8px;margin:8px 0 6px}.ecar .cs{font-size:13px;color:var(--sub);display:flex;align-items:center;gap:5px}.ecar .cs ha-icon{--mdc-icon-size:16px}
.ecar .cd{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:6px 10px;margin-top:10px}.ecar .cd .k{font-size:11px;color:var(--sub);font-weight:600}.ecar .cd .v{font-size:14px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.ecar .ch .cacts{margin:0 0 0 auto;gap:8px;flex-wrap:nowrap}.ecar .ch .wm{margin-left:10px}.ecar .cacts button{padding:7px 12px;font-size:13px}.ecar .cacts button ha-icon{--mdc-icon-size:16px}
@media (max-width:1000px){.eg{grid-template-columns:1fr;grid-template-rows:auto}.er{height:auto}.ek{grid-template-columns:1fr 1fr}}
@media (max-width:600px){.er{padding:12px;min-height:0}.eh{flex-wrap:wrap;gap:4px 10px}.eh h1{font-size:24px}.euse .head{flex-wrap:wrap;gap:6px}.eseg{margin-left:0}.euse .ech{min-height:150px}.eg .heat{display:grid;grid-template-columns:1fr 1fr;gap:12px}.eg .heat .ht2{height:150px}.hrow2{flex-direction:column;gap:12px}.lnd{min-width:0;height:auto;min-height:132px}.ecars{grid-template-columns:1fr}.ecar{grid-template-columns:1fr}.ecar .ch{flex-wrap:wrap}.ecar .ch .cacts{order:3;margin:6px 0 0;width:100%}.ecar .pic img{max-height:140px}.rday{min-height:90px}}`;
const hecEsc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const hecHm = d => { d = new Date(d); if (isNaN(d)) return '—'; const h = d.getHours(), m = d.getMinutes(); return (h % 12 || 12) + ':' + String(m).padStart(2, '0') + ' ' + (h < 12 ? 'am' : 'pm'); };
const hecAgo = t => { const s = (Date.now() - new Date(t)) / 1000; if (!isFinite(s)) return '—'; if (s < 60) return 'now'; if (s < 3600) return Math.floor(s / 60) + 'm ago'; if (s < 86400) return Math.floor(s / 3600) + 'h ago'; return Math.floor(s / 86400) + 'd ago'; };
const HDOW = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], HMON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
class HomeEnergyCard extends HTMLElement {
  setConfig(c) {
    if (!c || !c.energy) throw new Error('home-energy-card: "energy" is required');
    this._c = Object.assign({ title: 'Energy', sun: 'sun.sun', cars: [], rates: {}, heating: [], appliances: [] }, c);
  }
  getCardSize() { return 12; }
  connectedCallback() { this._t = setInterval(() => { if (!this._en || Date.now() - this._en.at > 1800000) this._fetch(); this._sig = null; this._update(); }, 60000); }
  disconnectedCallback() { clearInterval(this._t); }
  set hass(h) {
    const first = !this._hass; this._hass = h;
    if (!this._root) { this._build(); window.__hpcFit(this, this._root.querySelector('.er'), 1280, 744); }
    this._host.hass = h;
    const md = this._c.dark_mode || 'sun', sn = h.states[this._c.sun], td = !!(h.themes && h.themes.darkMode);
    this.classList.toggle('dark', md === 'dark' || (md === 'sun' ? (sn ? sn.state === 'below_horizon' : td) : md !== 'light' && td));
    if (first) this._fetch();
    this._update();
  }
  _st(id) { return id && this._hass && this._hass.states[id]; }
  _build() {
    const s = this.attachShadow({ mode: 'open' });
    s.innerHTML = `<style>${window.__HPC_CSS || ''}</style><style>${window.__HPC_CSS2 || ''}</style><style>${HEC_CSS}</style><div class="er"><div class="eh">${window.__hpcBack(this._c)}<h1>${hecEsc(this._c.title)}</h1><span class="c" id="sum"></span></div>
      <div class="eg"><div class="card euse" id="use" data-act="enpop" style="cursor:pointer"></div><div class="card erate" id="rate"></div>${this._c.appliances.length ? `<div class="hrow2">${this._c.heating.length ? '<div class="heat" id="heat"></div>' : ''}<div class="card lnd" id="lnd"></div></div>` : this._c.heating.length ? '<div class="heat" id="heat"></div>' : ''}${this._c.cars.length ? `<div class="ecars">${this._c.cars.map((_, i) => `<div class="card ecar" id="car${i}" data-act="carpop" data-i="${i}" style="cursor:pointer"></div>`).join('')}</div>` : ''}</div><home-popup-host id="host"></home-popup-host></div>`;
    this._root = s; this._$ = id => s.getElementById(id);
    const H = this._$('host'); H.setConfig({ cars: this._c.cars, energy: this._c.energy, sun: this._c.sun, dark_mode: this._c.dark_mode, heating_logo: this._c.heating_logo, heating_range: this._c.heating_range }); this._host = H;
    s.addEventListener('click', e => this._click(e));
  }
  /* ---------- energy ---------- */
  _fetch() {
    const k = this._c.energy; if (!this._hass || this._busy) return;
    const ids = [k.electricity, k.gas, k.electricity_cost, k.gas_cost, k.today_electricity, k.today_gas, k.today_electricity_cost, k.today_gas_cost, ...this._c.appliances.map(x => x.energy)].filter(Boolean);
    const st = new Date(); st.setHours(0, 0, 0, 0); st.setDate(st.getDate() - 12);
    const ms = new Date(); ms.setHours(0, 0, 0, 0); ms.setDate(1); if (ms < st) st.setTime(+ms);
    this._busy = true;
    this._hass.callWS({ type: 'recorder/statistics_during_period', start_time: st.toISOString(), end_time: new Date().toISOString(), statistic_ids: ids, period: 'day', types: ['change'] })
      .then(r => {
        const map = {}, put = (id, f) => ((r && r[id]) || []).forEach(x => { const d = new Date(x.start); d.setHours(0, 0, 0, 0); const key = +d; (map[key] = map[key] || { d }); if (x.change != null) map[key][f] = (map[key][f] || 0) + x.change; });
        put(k.electricity, 'e'); put(k.gas, 'g'); put(k.electricity_cost, 'ec'); put(k.gas_cost, 'gc');
        if (k.today_electricity || k.today_gas) {
          const lv = {}, putL = (id, f) => id && ((r && r[id]) || []).forEach(x => { const d = new Date(x.start); d.setHours(0, 0, 0, 0); const key = +d; (lv[key] = lv[key] || {}); if (x.change != null) lv[key][f] = (lv[key][f] || 0) + x.change; });
          putL(k.today_electricity, 'e'); putL(k.today_gas, 'g'); putL(k.today_electricity_cost, 'ec'); putL(k.today_gas_cost, 'gc');
          const t0 = new Date(); t0.setHours(0, 0, 0, 0); const num = id => { const e = id && this._hass.states[id], v = e ? parseFloat(e.state) : NaN; return isFinite(v) ? v : null; };
          const now = { e: num(k.today_electricity), g: num(k.today_gas), ec: num(k.today_electricity_cost), gc: num(k.today_gas_cost) };
          lv[+t0] = Object.assign(lv[+t0] || {}, ...Object.keys(now).filter(f => now[f] != null).map(f => ({ [f]: now[f] })));
          Object.keys(lv).forEach(t => { const o = map[t]; if (!o || (o.e == null && o.g == null)) map[t] = Object.assign({ d: new Date(+t), live: true }, lv[t]); });
          if (map[+t0] && map[+t0].live) map[+t0].today = true;
        }
        const keys = Object.keys(map).map(Number).filter(t => map[t].e != null || map[t].g != null).sort((a, b) => a - b);
        const last = keys.length ? new Date(keys[keys.length - 1]) : null, days = [];
        if (last) { const w0 = new Date(); w0.setHours(0, 0, 0, 0); w0.setDate(w0.getDate() - ((w0.getDay() + 6) % 7));
          for (let i = 0; i < 7; i++) { const d = new Date(w0); d.setDate(d.getDate() + i); d.setHours(0, 0, 0, 0); days.push(map[+d] || { d }); } }
        const mtd = { e: 0, g: 0, ec: 0, gc: 0, n: 0, to: null };
        keys.filter(t => t >= +ms && !map[t].today).forEach(t => { const x = map[t]; ['e', 'g', 'ec', 'gc'].forEach(f => { mtd[f] += x[f] || 0; }); mtd.n++; mtd.to = x.d; });
        const month = [], today = new Date(); today.setHours(0, 0, 0, 0);
        for (let d = new Date(ms); d <= today; d.setDate(d.getDate() + 1)) { const x = new Date(d); month.push(map[+x] || { d: x }); }
        const w0 = new Date(); w0.setHours(0, 0, 0, 0); w0.setDate(w0.getDate() - 6);
        this._apE = this._c.appliances.map(x => { let wk = 0, mo = 0; ((x.energy && r && r[x.energy]) || []).forEach(z => { const t = new Date(z.start); if (z.change == null) return; if (t >= w0) wk += z.change; if (t >= ms) mo += z.change; }); return { wk, mo }; });
        this._en = { at: Date.now(), days, mtd, month }; this._err = false;
      }).catch(() => { this._err = true; })
      .finally(() => { this._busy = false; this._renderUse(); this._renderLnd(); });
  }
  _live() {
    const k = this._c.energy || {}, n = id => { const e = this._st(id), v = e ? parseFloat(e.state) : NaN; return isFinite(v) ? v : null; };
    if (!k.live_power && !k.today_electricity && !k.today_gas) return null;
    const L = { p: n(k.live_power), e: n(k.today_electricity), ec: n(k.today_electricity_cost), g: n(k.today_gas), gc: n(k.today_gas_cost) }, pe = this._st(k.live_power);
    L.at = pe && pe.last_updated; L.cost = L.ec != null || L.gc != null ? (L.ec || 0) + (L.gc || 0) : null;
    L.col = L.p == null ? 'var(--sub)' : L.p < 1000 ? '#22a06b' : L.p < 3000 ? '#d97706' : '#e5484d';
    L.word = L.p == null ? '' : L.p < 1000 ? 'Low' : L.p < 3000 ? 'Moderate' : 'High';
    L.pw = L.p == null ? '—' : L.p < 1000 ? Math.round(L.p) + '<small>W</small>' : (L.p / 1000).toFixed(L.p < 10000 ? 2 : 1) + '<small>kW</small>';
    L.rate = n(k.live_rate || (this._c.rates || {}).electricity_rate); L.ph = L.p != null && L.rate != null ? L.p / 1000 * L.rate : null;
    L.phs = L.ph == null ? '' : L.ph < 1 ? Math.round(L.ph * 100) + 'p/hr' : '£' + L.ph.toFixed(2) + '/hr';
    return L;
  }
  _renderLive() {
    const el = this._$ && this._$('elive'), L = this._live(), k = this._c.energy; if (!el || !L || !this._en) return;
    const m = v => '£' + v.toFixed(2), d = this._en.days, t = this._en.mtd, E = this._sum('e'), G = this._sum('g'), EC = this._sum('ec'), GC = this._sum('gc');
    const t0 = new Date(); t0.setHours(0, 0, 0, 0); const last = [...d].reverse().find(x => +x.d < +t0 && !x.live && (x.ec != null || x.gc != null || x.e != null));
    let cmp = '';
    if (last) { const y = new Date(); y.setHours(0, 0, 0, 0); y.setDate(y.getDate() - 1);
      cmp = (+last.d === +y ? 'Yesterday' : HDOW[last.d.getDay()]) + ' <b>' + (last.ec != null || last.gc != null ? m((last.ec || 0) + (last.gc || 0)) : Math.round((last.e || 0) + (last.g || 0)) + ' kWh') + '</b>'; }
    const kw = (e, g) => [e != null ? (e < 100 ? e.toFixed(1) : Math.round(e)) + ' elec' : '', k.gas || k.today_gas ? (g != null ? (g < 100 ? g.toFixed(1) : Math.round(g)) : '—') + ' gas' : ''].filter(Boolean).join(' · ') + ' kWh';
    const blk = (lbl, col, v, u, sub, cls, vs) => `<div class="blk${cls ? ' ' + cls : ''}"><div class="lbl">${col ? `<i${col.cls ? ` class="${col.cls}"` : ''} style="background:${col.c || col}"></i>` : ''}${lbl}</div><div class="v"${vs ? ` style="${vs}"` : ''}>${v}${u ? `<small>${u}</small>` : ''}</div><div class="s">${sub}</div></div>`;
    el.innerHTML = blk('Using now', { c: L.col, cls: 'lvd' }, L.pw, '', [L.phs, L.word].filter(Boolean).join(' · ') + (L.at ? ' · ' + hecHm(L.at) : ''), 'now', 'color:' + L.col)
      + blk('Today so far', '', L.cost != null ? m(L.cost) : '—', '', (L.e != null || L.g != null ? ((L.e || 0) + (L.g || 0)).toFixed(1) + ' kWh' : '') + (cmp ? ' · ' + cmp : ''), 'tot')
      + blk('This week', '', m(EC + GC), '', kw(E, G))
      + blk('Month to date', '', t.n ? m(t.ec + t.gc) : '—', '', t.n ? `1–${t.to.getDate()} ${HMON[t.to.getMonth()]} · ${Math.round(t.e + t.g)} kWh` : 'No data yet');
  }
  _sum(f) { return ((this._en && this._en.days) || []).reduce((a, x) => a + (x[f] || 0), 0); }
  _renderUse() {
    const el = this._$('use'), k = this._c.energy; if (!el) return;
    const CE = k.electricity_color || '#3b82f6', CG = k.gas_color || '#f0a43a';
    const lu = k.logo === undefined ? 'https://raw.githubusercontent.com/home-assistant/brands/master/custom_integrations/octopus_energy/icon.png' : k.logo;
    const logo = lu ? `<img src="${hecEsc(lu)}" alt="" onerror="this.style.display='none'">` : '';
    if (!this._en || !this._en.days.length) { el.innerHTML = `<div class="head"><span class="lbl">Energy use</span>${logo}</div><div class="wxmsg">${this._err ? "Couldn't load energy data" : this._en ? 'No energy data yet' : 'Loading…'}</div>`; return; }
    const d = this._en.days, a = d[0].d, b = d[d.length - 1].d, E = this._sum('e'), G = this._sum('g'), EC = this._sum('ec'), GC = this._sum('gc'), t = this._en.mtd;
    const m = v => '£' + v.toFixed(2), r = `${a.getDate()} ${HMON[a.getMonth()]} – ${b.getDate()} ${HMON[b.getMonth()]}`;
    const blk = (lbl, col, v, u, s, cls) => `<div class="blk${cls ? ' ' + cls : ''}"><div class="lbl">${col ? `<i style="background:${col}"></i>` : ''}${lbl}</div><div class="v">${v}${u ? `<small>${u}</small>` : ''}</div><div class="s">${s}</div></div>`;
    const mon = (this._view || 'month') === 'month' && (this._en.month || []).length, cd = mon ? this._en.month : d, few = cd.length <= 16;
    const lastM = mon ? [...cd].reverse().find(x => x.e != null || x.g != null) : null;
    const rng = mon ? `1 ${HMON[cd[0].d.getMonth()]} – ${(lastM || cd[cd.length - 1]).d.getDate()} ${HMON[cd[0].d.getMonth()]}` : r;
    const max = Math.max(1, ...cd.map(x => Math.max(x.e || 0, x.g || 0)));
    const bar = (v, c, lv) => `<b style="height:${v != null ? Math.max(1.5, v / max * 88) : 0}%;background:${c};${v == null ? 'opacity:0' : lv ? 'opacity:.45' : ''}">${v != null && few ? `<span>${Math.round(v)}</span>` : ''}</b>`;
    el.innerHTML = `<div class="head"><span class="lbl">Energy use · ${rng}</span><span class="eseg"><button class="${mon ? '' : 'sel'}" data-act="view" data-v="week">This week</button><button class="${mon ? 'sel' : ''}" data-act="view" data-v="month">This month</button></span>${logo}</div>
      <div class="legend"><span><i style="background:${CE}"></i>Electricity</span>${k.gas ? `<span><i style="background:${CG}"></i>Gas</span>` : ''}<span>${cd.some(x => x.live) ? 'Paler bars: live Home Mini readings, until Octopus confirms them' : 'Octopus data usually arrives a day or two late'}</span></div>
      ${this._live() ? '<div class="ek" id="elive"></div>' : `<div class="ek">${blk('Electricity', CE, Math.round(E), 'kWh', (k.electricity_cost ? m(EC) + ' · ' : '') + (E / (d.filter(x => x.e != null).length || 1)).toFixed(1) + ' kWh/day')}
        ${k.gas ? blk('Gas', CG, Math.round(G), 'kWh', (k.gas_cost ? m(GC) + ' · ' : '') + (G / (d.filter(x => x.g != null).length || 1)).toFixed(1) + ' kWh/day') : ''}
        ${blk('This week', '', m(EC + GC), '', Math.round(E + G) + ' kWh · incl. standing', 'tot')}
        ${blk('Month to date', '', t.n ? m(t.ec + t.gc) : '—', '', t.n ? `1–${t.to.getDate()} ${HMON[t.to.getMonth()]} · ${Math.round(t.e + t.g)} kWh` : 'No data yet')}</div>`}
      <div class="ech big${mon ? ' mon' : ''}"><div class="ebars">${cd.map(x => `<div class="ebd">${bar(x.e, CE, x.live)}${bar(x.g, CG, x.live)}</div>`).join('')}</div>
        <div class="exl">${cd.map(x => `<span>${mon ? (x.d.getDay() === 1 ? 'Mon ' : '') + x.d.getDate() : HDOW[x.d.getDay()] + ' ' + x.d.getDate() + (x.ec != null || x.gc != null ? ' · ' + m((x.ec || 0) + (x.gc || 0)) : '')}</span>`).join('')}</div>
        ${mon ? `<div class="emsum">${t.n ? `Daily average <b>${m((t.ec + t.gc) / t.n)}</b> · ${((t.e + t.g) / t.n).toFixed(1)} kWh/day` : ''}${t.n ? ` · on track for about <b>${m((t.ec + t.gc) / t.n * new Date(cd[0].d.getFullYear(), cd[0].d.getMonth() + 1, 0).getDate())}</b> this month` : ''}</div>` : ''}</div>`;
    this._renderLive();
    this._$('sum').textContent = `This week ${m(EC + GC)}` + (t.n ? ` · this month ${m(t.ec + t.gc)}` : '');
  }
  /* ---------- rates ---------- */
  _renderRate() {
    const el = this._$('rate'), R = this._c.rates; if (!el) return;
    const num = id => { const e = this._st(id); return e && !isNaN(parseFloat(e.state)) ? parseFloat(e.state) : null; };
    const p = v => v == null ? '—' : (Math.round(v * 1000) / 10).toString();
    const now = this._st(R.electricity_rate), nx = this._st(R.electricity_next), cur = num(R.electricity_rate), nxt = num(R.electricity_next);
    const avg = now && now.attributes.current_day_average_rate, lo = now && now.attributes.current_day_min_rate;
    const cheap = cur != null && lo != null && cur <= lo + 0.001;
    const pts = num(R.points);
    el.innerHTML = `<div class="head" style="margin-bottom:0"><span class="lbl">Electricity rate now</span></div>
      <div class="rnow"><div class="v">${p(cur)}<small>p/kWh</small></div>${cur != null ? `<span class="rpill ${cheap ? 'cheap' : 'peak'}">${cheap ? 'Off-peak' : 'Peak'}</span>` : ''}</div>
      <div class="rsub">${now && now.attributes.end ? `Until <b>${hecHm(now.attributes.end)}</b>` : ''}${nxt != null ? ` · then <b>${p(nxt)}p</b>${nx && nx.attributes.start && nx.attributes.end ? ` (${hecHm(nx.attributes.start)} – ${hecHm(nx.attributes.end)})` : ''}` : ''}</div>
      ${avg != null ? `<div class="rsub">Today's average <b>${p(avg)}p</b>${lo != null ? ` · cheapest <b>${p(lo)}p</b>` : ''}</div>` : ''}
      ${(() => { const ev = this._st(R.today_rates), rs = (ev && ev.attributes.rates) || []; if (rs.length < 4) return '';
        const vals = rs.map(x => +x.value_inc_vat), mx = Math.max(...vals), mn = Math.min(...vals), t0 = new Date(rs[0].start), t1 = new Date(rs[rs.length - 1].end), nowp = Math.min(100, Math.max(0, (Date.now() - t0) / (t1 - t0) * 100));
        return `<div class="rday"><span class="lbl">Today's rates</span><div class="rbars">${rs.map(x => { const v = +x.value_inc_vat; return `<b class="${new Date(x.end) < Date.now() ? 'past' : ''}" style="height:${mx > 0 ? Math.max(8, v / mx * 100) : 8}%;background:${v <= mn + 0.001 ? '#22a06b' : '#f0a43a'}"></b>`; }).join('')}<i class="now" style="left:${nowp}%"></i></div>
          <div class="rax"><span>12am</span><span>6am</span><span>12pm</span><span>6pm</span><span>12am</span></div></div>`; })()}
      <div class="rlist">${R.gas_rate ? `<div class="blk"><div class="k">Gas rate</div><div class="v">${p(num(R.gas_rate))}<small>p/kWh</small></div></div>` : ''}
        ${R.electricity_standing ? `<div class="blk"><div class="k">Elec standing</div><div class="v">${p(num(R.electricity_standing))}<small>p/day</small></div></div>` : ''}
        ${R.gas_standing ? `<div class="blk"><div class="k">Gas standing</div><div class="v">${p(num(R.gas_standing))}<small>p/day</small></div></div>` : ''}
        ${R.points ? `<div class="blk"><div class="k">Octoplus points</div><div class="v">${pts != null ? pts.toLocaleString('en-GB') : '—'}${pts != null ? `<small>≈ £${(pts / 800).toFixed(2)}</small>` : ''}</div></div>` : ''}</div>`;
  }
  /* ---------- laundry ---------- */
  _renderLnd() {
    const el = this._$ && this._$('lnd'); if (!el) return;
    const JOB = { wash: 'Washing', ai_wash: 'Washing', pre_wash: 'Pre-wash', rinse: 'Rinsing', ai_rinse: 'Rinsing', spin: 'Spinning', ai_spin: 'Spinning', drying: 'Drying', ai_drying: 'Drying', cooling: 'Cooling down', weight_sensing: 'Weighing load', wrinkle_prevent: 'Anti-crease', air_wash: 'Air wash', delay_wash: 'Delayed start', refreshing: 'Refreshing', sanitizing: 'Sanitising', finish: 'Finished', finished: 'Finished' };
    const num = id => { const e = this._st(id), v = e ? parseFloat(e.state) : NaN; return isFinite(v) ? v : null; };
    const left = ms => { const m = Math.max(0, Math.round(ms / 60000)); return m >= 60 ? Math.floor(m / 60) + 'h ' + String(m % 60).padStart(2, '0') + 'm' : m + ' min'; };
    const day = d => { const t = new Date(); t.setHours(0, 0, 0, 0); const x = new Date(d); x.setHours(0, 0, 0, 0); const n = Math.round((t - x) / 86400000); return n === 0 ? 'today' : n === 1 ? 'yesterday' : n < 7 ? HDOW[x.getDay()] : x.getDate() + ' ' + HMON[x.getMonth()]; };
    let tot = 0;
    const rows = this._c.appliances.map((a, i) => {
      const ms = this._st(a.state), st = ms ? ms.state : 'unavailable', job = (this._st(a.job) || {}).state, ce = this._st(a.completion), done = ce && Date.parse(ce.state);
      const run = st === 'run', pause = st === 'pause', w = num(a.power), E = this._apE && this._apE[i]; if (E) tot += E.wk;
      const dryer = /dry/i.test(a.name || a.state || ''), rgb = run ? (dryer ? '240,106,60' : '59,130,246') : pause ? '217,119,6' : '138,143,152';
      let sub, rt = '';
      if (st === 'unavailable' || !ms) sub = 'Unavailable';
      else if (run || pause) { sub = (pause ? 'Paused' : JOB[job] || 'Running') + (done && done > Date.now() ? ' · done ' + hecHm(done) : ''); rt = done && done > Date.now() ? `<b>${left(done - Date.now())}</b><small>left</small>` : w != null ? `<b>${Math.round(w)}</b><small>W</small>` : ''; }
      else { sub = done && done <= Date.now() ? 'Finished ' + day(done) + ' ' + hecHm(done) : 'Off'; rt = E ? `<b>${E.wk.toFixed(1)}</b><small>kWh · 7 days</small>` : ''; }
      return `<div class="lap${run ? ' run' : ''}" data-act="more" data-id="${hecEsc(a.power || a.state)}" style="--rgb:${rgb}"><span class="li"><ha-icon icon="${hecEsc(a.icon || (dryer ? 'mdi:tumble-dryer' : 'mdi:washing-machine'))}"></ha-icon></span><div class="lt"><div class="ln">${hecEsc(a.name || 'Appliance')}</div><div class="ls">${hecEsc(sub)}</div></div><div class="lr">${rt}</div></div>`;
    }).join('');
    const mo = (this._apE || []).reduce((s2, x) => s2 + x.mo, 0);
    const lu = this._c.laundry_logo === undefined ? 'https://raw.githubusercontent.com/home-assistant/brands/master/core_brands/samsung/logo.png' : this._c.laundry_logo;
    el.innerHTML = `<div class="lh"><span>LAUNDRY${this._apE ? `<em>${mo.toFixed(1)} kWh this month</em>` : ''}</span>${lu ? `<img class="llg" src="${hecEsc(lu)}" alt="" onerror="this.style.display='none'">` : ''}</div>${rows}`;
  }
  /* ---------- heating ---------- */
  _renderHeat() {
    const el = this._$ && this._$('heat'); if (!el) return;
    const p = this._pend || {}, hu = this._c.heating_logo === undefined ? 'https://brands.home-assistant.io/nest/logo.png' : this._c.heating_logo;
    const hl = hu ? `<img class="hl2" src="${hecEsc(hu)}" alt="" onerror="this.style.display='none'">` : '<span></span>';
    const [lo, hi] = this._c.heating_range || [10, 30], R = 35, C = 42, A0 = 135, SW = 270;
    const ang = v => A0 + SW * (Math.min(hi, Math.max(lo, v)) - lo) / (hi - lo), pt = g => [C + R * Math.cos(g * Math.PI / 180), C + R * Math.sin(g * Math.PI / 180)];
    const arc = (s0, e0) => { const [x, y] = pt(s0), [u, v] = pt(e0); return `M${x.toFixed(1)} ${y.toFixed(1)}A${R} ${R} 0 ${e0 - s0 > 180 ? 1 : 0} 1 ${u.toFixed(1)} ${v.toFixed(1)}`; };
    el.innerHTML = this._c.heating.map(z => {
      const e = this._st(z.entity), nm = hecEsc(z.name || (e && e.attributes.friendly_name) || z.entity);
      if (!e) return `<div class="card ht2 off"><div class="htop">${hl}</div><div class="hn">${nm}</div><div class="hs" style="margin-top:20px">Missing</div></div>`;
      const a = e.attributes, on = e.state !== 'off' && e.state !== 'unavailable', heating = on && a.hvac_action === 'heating';
      const tgt = on ? (p[z.entity] ?? a.temperature) : null, cur = a.current_temperature != null ? Number(a.current_temperature) : null;
      const col = heating ? '#f06a3c' : 'var(--sub)';
      let svg = `<path d="${arc(A0, A0 + SW)}" class="trk"/>`;
      if (tgt != null) { const g = ang(tgt), [mx, my] = pt(g); svg += `<path d="${arc(A0, Math.max(A0 + 0.5, g))}" style="stroke:${col}" class="fil${heating ? '' : ' dim'}"/><circle cx="${mx.toFixed(1)}" cy="${my.toFixed(1)}" r="5" class="knob" style="stroke:${col}"/>`; }
      if (cur != null) { const [cx, cy] = pt(ang(cur)); svg += `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="2" class="cdot"/>`; }
      const st = e.state === 'unavailable' ? 'Unavailable' : !on ? 'Off' : tgt == null ? 'On' : heating ? '→ ' + tgt + '°' : 'Set ' + tgt + '°';
      return `<div class="card ht2 ${on ? 'on' : 'off'}${heating ? ' heating' : ''}" data-act="more" data-id="${hecEsc(z.entity)}">
        <div class="htop">${hl}<button class="hpw" data-act="hpw" data-id="${hecEsc(z.entity)}"><ha-icon icon="mdi:power"></ha-icon></button></div>
        <div class="hn">${nm}</div>
        <div class="hdial"><svg viewBox="0 0 84 84">${svg}</svg><div class="hc2"><div class="htv">${cur != null ? cur.toFixed(1) : '—'}<small>°</small></div><div class="hs">${st}</div>${a.current_humidity != null ? `<div class="hh">${Math.round(a.current_humidity)}%</div>` : ''}</div></div>
        <button class="hb m" data-act="hdn" data-id="${hecEsc(z.entity)}"><ha-icon icon="mdi:minus"></ha-icon></button><button class="hb p" data-act="hup" data-id="${hecEsc(z.entity)}"><ha-icon icon="mdi:plus"></ha-icon></button></div>`;
    }).join('');
  }
  _heatStep(id, dir) {
    const e = this._st(id); if (!e || e.state === 'off') return;
    const a = e.attributes, step = a.target_temp_step || 0.5;
    this._pend = this._pend || {}; this._pendT = this._pendT || {};
    const cur = this._pend[id] ?? a.temperature ?? a.current_temperature ?? 20;
    const nv = Math.min(a.max_temp ?? 32, Math.max(a.min_temp ?? 5, Math.round((cur + dir * step) / step) * step));
    this._pend[id] = nv; this._update();
    clearTimeout(this._pendT[id]);
    this._pendT[id] = setTimeout(() => {
      this._hass.callService('climate', 'set_temperature', { entity_id: id, temperature: nv })
        .finally(() => setTimeout(() => { if (this._pend[id] === nv) { delete this._pend[id]; this._update(); } }, 2500));
    }, 1000);
  }
  /* ---------- cars ---------- */
  _carInfo(i) {
    const k = this._c.cars[i], st = id => this._st(id), num = id => { const e = st(id); return e && !isNaN(parseFloat(e.state)) ? parseFloat(e.state) : null; };
    const mi = (k.range_unit || 'mi') === 'mi';
    const dist = id => { const e = st(id), v = num(id); if (v == null) return null; const u = e.attributes.unit_of_measurement; return mi && u === 'km' ? v * 0.621371 : !mi && u === 'mi' ? v / 0.621371 : v; };
    const soc = num(k.battery), cs = st(k.charging), raw = cs ? cs.state : '', pw = num(k.power), ends = st(k.ends);
    const L = { charging: 'Charging', instant_charging: 'Charging', initialising: 'Starting charge', charging_completed: 'Fully charged', completed: 'Fully charged', charging_error: 'Charging error', error: 'Charging error',
      not_charging: 'Not charging', off: 'Not plugged in', not_plugged: 'Not plugged in', plugged_locked: 'Plugged in', plugged_unlocked: 'Plugged in', plugged_in: 'Plugged in', unplugged: 'Not plugged in', standby: 'Plugged in · waiting' };
    const charging = /charging$/.test(raw) && raw !== 'not_charging' && raw !== 'charging_error' || raw === 'initialising' || (pw || 0) > 0;
    const label = L[raw] || (raw && raw !== 'unknown' && raw !== 'unavailable' ? raw.replace(/_/g, ' ').replace(/^./, c => c.toUpperCase()) : '—');
    const endT = ends && ends.state && !/unknown|unavailable/.test(ends.state) ? new Date(ends.state) : null;
    const be = st(k.battery), img = st(k.image), ue = st(k.updated), lk = st(k.lock);
    const locked = lk ? (lk.entity_id.startsWith('binary_sensor.') ? lk.state === 'off' : lk.state === 'locked') : null;
    const upd = ue && !/unknown|unavailable/.test(ue.state) ? ue.state : be ? be.last_updated : null;
    return { k, soc, range: dist(k.range), unit: mi ? 'mi' : 'km', label, charging, err: /error/.test(raw), pw, endT: endT && !isNaN(endT) ? endT : null, target: num(k.target), mileage: dist(k.mileage),
      lock: lk, locked, climate: st(k.climate), img: (img && img.attributes.entity_picture) || k.image_url || null, upd, name: k.name || 'Car', inv: !!k.invert_logo,
      crest: k.logo === undefined ? 'https://brands.home-assistant.io/porscheconnect/icon.png' : k.logo, wordmark: k.wordmark === undefined ? 'https://brands.home-assistant.io/porscheconnect/logo.png' : k.wordmark };
  }
  _renderCar(i) {
    const el = this._$('car' + i); if (!el) return;
    const c = this._carInfo(i), k = c.k, col = c.soc == null ? 'var(--sub)' : c.soc < 20 ? '#e5484d' : c.soc < 50 ? '#f0a43a' : '#22a06b';
    const s = c.charging ? { cls: 'chg', icon: 'mdi:battery-charging', txt: ['Charging', c.pw ? Math.round(c.pw * 10) / 10 + ' kW' : '', c.endT ? 'full by ' + hecHm(c.endT) : ''].filter(Boolean).join(' · ') }
      : { cls: c.err ? 'err' : '', icon: c.err ? 'mdi:alert-circle-outline' : /plug/i.test(c.label) && !/not/i.test(c.label) ? 'mdi:power-plug' : 'mdi:power-plug-off-outline', txt: c.label };
    const clim = c.climate && c.climate.state === 'on', climCtl = k.climate && k.climate.startsWith('switch.');
    const pic = !c.img ? '' : k.image_crop && k.image_size ? (() => { const [x0, y0, x1, y1] = String(k.image_crop).split(/[\s,]+/).map(Number), [W, H] = String(k.image_size).split(/[\s,]+/).map(Number), cw = x1 - x0, ch = y1 - y0;
      return `<div class="cimg" style="aspect-ratio:${cw}/${ch};background-image:url('${hecEsc(c.img)}');background-size:${(W / cw * 100).toFixed(2)}% auto;background-position:${(W > cw ? x0 / (W - cw) * 100 : 0).toFixed(2)}% ${(H > ch ? y0 / (H - ch) * 100 : 0).toFixed(2)}%"></div>`; })()
      : `<img src="${hecEsc(c.img)}" alt="" onerror="this.style.display='none'">`;
    const det = [k.target && ['Charge limit', c.target != null ? Math.round(c.target) + '%' : '—'], k.ends && ['Full by', c.endT ? hecHm(c.endT) : '—'], k.lock && ['Doors', c.lock ? (c.locked ? 'Locked' : 'Unlocked') : '—'],
      k.mileage && ['Mileage', c.mileage != null ? Math.round(c.mileage).toLocaleString('en-GB') + ' ' + c.unit : '—'], k.climate && ['Climate', c.climate ? (clim ? 'On' : 'Off') : '—'], ['Updated', c.upd ? hecAgo(c.upd) : '—']].filter(Boolean).slice(0, 6);
    const acts = climCtl || k.refresh ? `<div class="cacts">${climCtl ? `<button class="${clim ? 'on' : ''}" data-act="clim" data-i="${i}"><ha-icon icon="mdi:fan"></ha-icon>${clim ? 'Stop climate' : 'Start climate'}</button>` : ''}${k.refresh ? `<button data-act="ref" data-i="${i}"><ha-icon icon="mdi:refresh"></ha-icon>Update</button>` : ''}</div>` : '';
    el.innerHTML = `<div class="ch">${c.crest ? `<img class="crest${c.inv ? ' inv' : ''}" src="${hecEsc(c.crest)}" alt="" onerror="this.style.display='none'">` : ''}<span class="n">${hecEsc(c.name)}</span>${acts}${c.wordmark ? `<img class="wm" src="${hecEsc(c.wordmark)}" alt="" onerror="this.style.display='none'">` : ''}</div>
      <div class="pic">${pic}</div><div class="info"><div class="soc">${c.soc != null ? Math.round(c.soc) + '%' : '—'}<small>${c.range != null ? Math.round(c.range) + ' ' + c.unit + ' range' : ''}</small></div>
      <div class="bbar"><i style="width:${c.soc || 0}%;background:${col}"></i></div><div class="cs ${s.cls}"><ha-icon icon="${s.icon}"></ha-icon><span>${hecEsc(s.txt)}</span></div>
      <div class="cd">${det.map(([a, b]) => `<div><div class="k">${a}</div><div class="v">${b}</div></div>`).join('')}</div>
      </div>`;
  }
  _update() {
    if (!this._root || !this._hass) return;
    const R = this._c.rates, ids = Object.values(R).concat(...this._c.cars.map(k => Object.values(k).filter(v => typeof v === 'string' && v.includes('.'))));
    const hsig = JSON.stringify(this._c.heating.map(z => { const e = this._st(z.entity); return e && [e.state, e.attributes]; })) + JSON.stringify(this._pend || {});
    if (hsig !== this._hsig) { this._hsig = hsig; this._renderHeat(); }
    const asig = JSON.stringify(this._c.appliances.map(a => [a.state, a.job, a.completion, a.power].map(id => { const e = this._st(id); return e && e.state; }))) + Math.floor(Date.now() / 60000);
    if (asig !== this._asig) { this._asig = asig; this._renderLnd(); }
    const k = this._c.energy, lsig = JSON.stringify([k.live_power, k.today_electricity, k.today_electricity_cost, k.today_gas, k.today_gas_cost].map(id => { const e = this._st(id); return e && [e.state, e.last_updated]; }));
    if (lsig !== this._lsig) { this._lsig = lsig; if (this._en && Date.now() - this._en.at > 300000) this._fetch(); else this._renderLive(); }
    const sig = JSON.stringify(ids.map(id => { const e = this._st(id); return e && [e.state, e.last_updated]; }));
    if (sig === this._sig) return; this._sig = sig;
    this._renderRate(); this._c.cars.forEach((_, i) => this._renderCar(i));
    if (!this._en) this._renderUse();
  }
  _click(e) {
    const path = e.composedPath(); if (path.includes(this._host)) return;
    const t = path.find(n => n.dataset && n.dataset.act); if (!t) return;
    if (t.dataset.act === 'hback') { window.__hpcGoBack(); return; }
    if (t.dataset.act === 'enpop') { this._host.open('en'); return; }
    if (t.dataset.act === 'carpop') { this._host.open('car', +t.dataset.i); return; }
    if (t.dataset.act === 'view') { this._view = t.dataset.v; this._renderUse(); return; }
    if (t.dataset.act === 'hup' || t.dataset.act === 'hdn') { this._heatStep(t.dataset.id, t.dataset.act === 'hup' ? 1 : -1); return; }
    if (t.dataset.act === 'hpw') { const e = this._st(t.dataset.id); if (e) this._hass.callService('climate', 'set_hvac_mode', { entity_id: t.dataset.id, hvac_mode: e.state === 'off' ? 'heat' : 'off' }); return; }
    if (t.dataset.act === 'more') { this._host._more(t.dataset.id); return; }
    const k = this._c.cars[+t.dataset.i]; if (!k) return;
    if (t.dataset.act === 'clim') { const x = this._st(k.climate); if (x) this._hass.callService('switch', x.state === 'on' ? 'turn_off' : 'turn_on', { entity_id: k.climate }); }
    else if (t.dataset.act === 'ref') { this._hass.callService('button', 'press', { entity_id: k.refresh }); t.lastChild.textContent = 'Requested…'; }
  }
}
customElements.whenDefined('home-popup-host').then(() => { if (!customElements.get('home-energy-card')) customElements.define('home-energy-card', HomeEnergyCard); });
window.customCards = window.customCards || [];
window.customCards.push({ type: 'home-energy-card', name: 'Home Energy Card', description: 'Energy, tariff and cars page' });
