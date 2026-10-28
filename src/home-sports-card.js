/* home-sports-card — football page (your team, Premier League, Champions League) in the home panel style.
   Live data from ESPN's public site API (no key); club and competition crests come from ESPN's logo CDN. */
const HSP_CSS = `.spr{position:relative;background:var(--bg);height:calc(100vh - var(--header-height,56px));min-height:640px;padding:18px;box-sizing:border-box;display:flex;flex-direction:column}
.sph{display:flex;align-items:center;gap:12px;margin:0 4px 14px;flex-wrap:wrap}.sph h1{font-size:28px;font-weight:700;letter-spacing:-.02em;margin:0;line-height:1.1}.sph .upd{margin-left:auto;font-size:12px;color:var(--sub);font-weight:500}
.stabs{display:flex;background:var(--card);border-radius:999px;padding:4px;gap:2px;box-shadow:var(--shadow)}.stabs button{border:0;background:none;border-radius:999px;padding:7px 14px 7px 9px;font:inherit;font-size:13.5px;font-weight:600;color:var(--sub);cursor:pointer;display:flex;align-items:center;gap:8px;white-space:nowrap}
.stabs button img{width:22px;height:22px;object-fit:contain}.stabs button .s{display:none}.stabs button.sel{background:var(--accent);color:#fff}.stabs button.sel img.lg{filter:brightness(0) invert(1)}
.sgrid{flex:1;min-height:0;display:grid;grid-template-columns:minmax(0,1.15fr) minmax(0,1fr) minmax(0,.85fr);gap:14px}
.scol{display:flex;flex-direction:column;gap:14px;min-height:0;min-width:0}.scol>.card{padding:14px 16px;min-height:0;display:flex;flex-direction:column;overflow:hidden}
.scol>.card.grow{flex:1 1 0}.scol>.card .lst{flex:1;min-height:0;overflow-y:auto;scrollbar-width:none;margin:0 -6px;padding:0 6px}.scol>.card .lst::-webkit-scrollbar{display:none}
.shd{display:flex;align-items:center;gap:8px;margin-bottom:8px}.shd img{width:22px;height:22px;object-fit:contain}.shd .lbl{flex:1}.shd .cnt{font-size:11.5px;color:var(--sub);font-weight:600}
.mt{display:grid;grid-template-columns:70px minmax(0,1fr) 54px minmax(0,1fr) 22px;align-items:center;gap:8px;padding:7px 0;border-bottom:1px solid var(--line)}.mt:last-child{border-bottom:0}
.mt .when{font-size:11px;color:var(--sub);font-weight:600;line-height:1.25}.mt .when b{display:block;color:var(--text);font-size:11.5px}
.mt .tm{display:flex;align-items:center;gap:7px;min-width:0;font-size:13.5px;font-weight:600}.mt .tm.h{justify-content:flex-end;text-align:right}.mt .tm span{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.mt .tm img{width:24px;height:24px;object-fit:contain;flex:0 0 auto}.mt .tm.me span{color:var(--accent)}
.mt .sc{text-align:center;font-size:16px;font-weight:700;letter-spacing:-.01em;white-space:nowrap}.mt .sc.pre{font-size:12.5px;font-weight:600;color:var(--sub)}.mt .sc small{display:block;font-size:9.5px;font-weight:700;color:var(--sub);letter-spacing:.04em}
.mt .sc.live{color:#e5484d}.mt .sc.live small{color:#e5484d}.mt .cl{width:20px;height:20px;object-fit:contain;justify-self:end;opacity:.9}
.mt .res{justify-self:end;width:20px;height:20px;border-radius:6px;font-size:10.5px;font-weight:800;color:#fff;display:flex;align-items:center;justify-content:center}.res.W{background:#22a06b}.res.D{background:#8a8f98}.res.L{background:#e5484d}
.nx{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:10px;padding:4px 0 2px}.nx .t{display:flex;flex-direction:column;align-items:center;gap:6px;min-width:0;text-align:center;font-size:14px;font-weight:700}.nx .t img{width:58px;height:58px;object-fit:contain}.nx .t span{max-width:100%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.nx .mid{text-align:center}.nx .mid b{display:block;font-size:22px;font-weight:700;letter-spacing:-.02em}.nx .mid span{font-size:12px;color:var(--sub);font-weight:600}.nx .mid .cd{display:inline-block;margin-top:6px;background:rgba(240,138,36,.14);color:var(--accent);font-size:11.5px;font-weight:700;padding:3px 10px;border-radius:999px}
.tv{display:flex;align-items:center;justify-content:center;gap:7px;margin:8px auto 0;width:max-content;max-width:100%;background:var(--card2);border:1px solid var(--line);border-radius:999px;padding:4px 12px 4px 10px;font-size:12.5px;font-weight:700}.tv ha-icon{--mdc-icon-size:16px;color:var(--sub)}.tv span{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.tv i{width:8px;height:8px;border-radius:50%;flex:0 0 auto}
.nxv{font-size:11.5px;color:var(--sub);text-align:center;margin-top:6px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.tb{width:100%;border-collapse:collapse;font-size:12.5px}.tb th{position:sticky;top:0;background:var(--card);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);font-size:10px;font-weight:700;letter-spacing:.06em;color:var(--sub);text-align:center;padding:4px 2px 6px;z-index:1}.tb th.l{text-align:left}
.tb td{padding:5px 2px;text-align:center;border-top:1px solid var(--line);font-variant-numeric:tabular-nums}.tb td.ps{width:26px;font-weight:700;color:var(--sub);position:relative}.tb td.ps i{position:absolute;left:0;top:5px;bottom:5px;width:3px;border-radius:2px}
.tb td.tn{text-align:left}.tb td.tn div{display:flex;align-items:center;gap:7px;font-weight:600;min-width:0}.tb td.tn img{width:20px;height:20px;object-fit:contain;flex:0 0 auto}.tb td.tn span{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:120px}
.tb td.pt{font-weight:800}.tb tr.me td{background:rgba(240,138,36,.12)}.tb tr.me td.tn span{color:var(--accent)}.tb tr.me td:first-child{border-radius:8px 0 0 8px}.tb tr.me td:last-child{border-radius:0 8px 8px 0}
.lgd{display:flex;flex-wrap:wrap;gap:4px 12px;font-size:10.5px;color:var(--sub);margin-top:8px}.lgd span{display:flex;align-items:center;gap:5px}.lgd i{width:9px;height:9px;border-radius:3px;display:block}
.ld{display:grid;grid-template-columns:20px 26px minmax(0,1fr) auto;align-items:center;gap:8px;padding:6px 0;border-bottom:1px solid var(--line)}.ld:last-child{border-bottom:0}
.ld .rk{font-size:12px;font-weight:700;color:var(--sub);text-align:center}.ld img{width:24px;height:24px;object-fit:contain}.ld .nm{min-width:0}.ld .nm b{display:block;font-size:13.5px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.ld .nm span{font-size:11px;color:var(--sub)}
.ld .v{font-size:18px;font-weight:700;min-width:28px;text-align:right}.ld:first-child .v{color:var(--accent)}
.mt.clk{cursor:pointer;border-radius:10px;transition:background .15s}.mt.clk:hover,.mt.clk:active{background:rgba(127,127,127,.08)}
.mpop{width:min(94%,1120px);color:var(--text)}.mpop .x ha-icon{--mdc-icon-size:20px}
.mhd{display:flex;align-items:center;gap:12px;margin-right:52px}.mhd img{width:34px;height:34px;object-fit:contain}.mhd b{display:block;font-size:15px}.mhd span{font-size:12.5px;color:var(--sub)}
.msc{display:grid;grid-template-columns:1fr auto 1fr;align-items:start;gap:16px;margin:18px 0 16px}.mtm{display:flex;flex-direction:column;align-items:center;gap:6px;text-align:center;min-width:0}.mtm>img{width:72px;height:72px;object-fit:contain}.mtm>span{font-size:17px;font-weight:700}.mtm.me>span{color:var(--accent)}
.mgl{display:flex;flex-direction:column;gap:2px;margin-top:2px}.msg{display:flex;align-items:center;justify-content:center;gap:6px;font-size:12.5px;color:var(--sub);font-weight:500}.msg ha-icon{--mdc-icon-size:13px}.msg b{font-weight:700;color:var(--text)}
.mmid{text-align:center;padding-top:12px}.mmid b{display:block;font-size:46px;font-weight:700;letter-spacing:-.03em;line-height:1}.mmid b.live{color:#e5484d}.mmid em{display:block;font-style:normal;font-size:13px;font-weight:700;margin-top:6px}.mmid span{display:inline-block;margin-top:8px;font-size:11.5px;font-weight:700;color:var(--sub);background:var(--card2);border-radius:999px;padding:3px 10px}
.mgrid{display:grid;grid-template-columns:1fr 1fr 1.15fr;gap:12px}.card2b{background:var(--card2);border-radius:20px;padding:14px 16px;min-width:0}.card2b>.lbl{margin-bottom:10px}
i.bk{display:inline-block;width:10px;height:13px;border-radius:2px;flex:0 0 auto}i.bk.y{background:#f5c400}i.bk.r{background:#e5484d}
.tl{display:flex;align-items:center;gap:8px;padding:6px 0;border-bottom:1px solid var(--line);font-size:13px}.tl:last-child{border-bottom:0}.tl em{font-style:normal;font-weight:700;color:var(--sub);min-width:40px;font-size:12px}.tl ha-icon{--mdc-icon-size:16px;color:var(--sub)}.tl.g ha-icon{color:var(--text)}
.tl div{min-width:0}.tl b{font-weight:600}.tl small{display:block;color:var(--sub);font-size:11.5px}.tl.a{flex-direction:row-reverse;text-align:right}.tl.ht{justify-content:center;font-size:11px;font-weight:700;color:var(--sub);letter-spacing:.06em;text-transform:uppercase}
.mso{margin-top:10px;display:flex;flex-direction:column;gap:6px}.mso div{display:flex;align-items:center;gap:5px;font-size:12px;font-weight:600}.mso span{flex:1}.mso i{width:12px;height:12px;border-radius:50%}.mso i.y{background:#22a06b}.mso i.n{background:#e5484d}
.sb{margin-bottom:9px}.sbl{display:flex;justify-content:space-between;font-size:12.5px;margin-bottom:4px}.sbl span{color:var(--sub);font-weight:500}.sbl b{font-weight:700;min-width:36px}.sbl b:last-child{text-align:right}
.sbb{display:flex;gap:4px;height:6px}.sbb i{display:block;border-radius:3px;background:rgba(127,127,127,.25)}.sbb i.hi{background:var(--accent)}
.lus2{display:grid;grid-template-columns:1fr 1fr;gap:12px}.luh{display:flex;align-items:center;gap:6px;margin-bottom:6px;min-width:0}.luh img{width:20px;height:20px;object-fit:contain}.luh b{font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.luh span{margin-left:auto;font-size:11px;color:var(--sub);font-weight:600}.lut.me .luh b{color:var(--accent)}
.lp{display:flex;align-items:center;gap:6px;font-size:12px;padding:2.5px 0;min-width:0}.lp em{font-style:normal;width:18px;text-align:right;color:var(--sub);font-weight:700;font-size:11px;flex:0 0 auto}.lp span{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.lp ha-icon{--mdc-icon-size:13px;flex:0 0 auto}.lp .out{color:#e5484d}.lp .in{color:#22a06b}.lus{font-size:10.5px;font-weight:700;color:var(--sub);letter-spacing:.06em;text-transform:uppercase;margin:8px 0 2px}
@media (max-width:1000px){.mgrid{grid-template-columns:1fr 1fr}.mgrid>div:last-child{grid-column:1 / -1}}
@media (max-width:600px){.mgrid{grid-template-columns:1fr}.mmid b{font-size:36px}.mtm>img{width:54px;height:54px}.mtm>span{font-size:14px}.msc{gap:8px}}
.semp{color:var(--sub);font-size:13px;padding:14px 0;text-align:center}
@media (max-width:1000px){.sgrid{grid-template-columns:1fr 1fr}.scol.c3{grid-column:1 / -1;flex-direction:row}.scol.c3>.card{flex:1}.spr{height:auto}.scol>.card.grow{flex:0 0 auto}.scol>.card .lst{max-height:520px}}
@media (max-width:600px){.spr{padding:12px;min-height:0}.sph h1{font-size:24px}.stabs{width:100%;box-sizing:border-box}.stabs button{flex:1;justify-content:center}.stabs button .f{display:none}.stabs button .s{display:inline}.scol>.card .lst{max-height:none}.scol.c3>.card .lst{max-height:none}.stabs button{padding:6px 10px 6px 7px;font-size:12.5px}.sgrid{grid-template-columns:1fr}.scol.c3{flex-direction:column}.mt{grid-template-columns:52px minmax(0,1fr) 46px minmax(0,1fr) 20px}.mt .tm{font-size:12.5px}.mt .tm img{width:20px;height:20px}}`;
const hspE = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const HSP_B = 'https://site.api.espn.com/apis/site/v2/sports/soccer/', HSP_S = 'https://site.api.espn.com/apis/v2/sports/soccer/';
const HSP_LG = { 'eng.1': { name: 'Premier League', short: 'EPL', id: 23 }, 'uefa.champions': { name: 'Champions League', short: 'UCL', id: 2 }, 'eng.league_cup': { name: 'Carabao Cup', short: 'EFL', id: 41 }, 'eng.fa': { name: 'FA Cup', short: 'FA', id: 40 } };
const hspDay = d => { d = new Date(d); return d.getFullYear() + String(d.getMonth() + 1).padStart(2, '0') + String(d.getDate()).padStart(2, '0'); };
class HomeSportsCard extends HTMLElement {
  setConfig(c) {
    this._c = Object.assign({ title: 'Sports', team: '359', team_name: 'Arsenal', team_league: 'eng.1', sun: 'sun.sun', team_comps: ['eng.1', 'uefa.champions', 'eng.league_cup', 'eng.fa'] }, c);
    this._tab = this._tab || this._c.default_tab || 'team';
  }
  getCardSize() { return 12; }
  connectedCallback() { this._t = setInterval(() => { const live = this._d && this._d.live; if (!this._d || Date.now() - this._at > (live ? 60000 : 1800000)) this._fetch(); else this._render(); }, 30000); }
  disconnectedCallback() { clearInterval(this._t); }
  set hass(h) {
    const first = !this._hass; this._hass = h;
    if (!this._root) { this._build(); window.__hpcFit(this, this._root.querySelector('.spr'), 1380, 804); window.__hpcSwipe(this); }
    const md = this._c.dark_mode || 'sun', sn = h.states[this._c.sun], td = !!(h.themes && h.themes.darkMode);
    const dk = md === 'dark' || (md === 'sun' ? (sn ? sn.state === 'below_horizon' : td) : md !== 'light' && td);
    if (dk !== this._dark) { this._dark = dk; this.classList.toggle('dark', dk); if (this._d) this._render(); }
    const tv = this._c.tv_channel ? [this._c.tv_channel, this._c.tv_date].map(k => k && h.states[k] ? h.states[k].state : '').join('|') : '';
    if (tv !== this._tvk) { this._tvk = tv; if (this._d && !first) this._render(); }
    if (first) this._fetch();
  }
  _build() {
    const s = this.attachShadow({ mode: 'open' });
    s.innerHTML = `<style>${window.__HPC_CSS || ''}</style><style>${HSP_CSS}</style><div class="spr"><div class="sph">${window.__hpcBack(this._c)}<h1>${hspE(this._c.title)}</h1><div class="stabs" id="tabs"></div><span class="upd" id="upd"></span></div><div class="sgrid" id="g"></div><div class="ov" id="mov" data-act="closebg"><div class="pop mpop" id="mpop"></div></div></div>`;
    this._root = s; this._$ = id => s.getElementById(id);
    s.addEventListener('click', e => {
      const t = e.composedPath().find(n => n.dataset && n.dataset.act); if (!t) return;
      if (t.dataset.act === 'hback') { window.__hpcGoBack(); return; }
      if (t.dataset.act === 'tab') { this._tab = t.dataset.t; this._render(); }
      if (t.dataset.act === 'match') this._openMatch(t.dataset.id);
      if (t.dataset.act === 'mclose' || (t.dataset.act === 'closebg' && e.target === t)) this._$('mov').style.display = 'none';
    });
    this._render();
  }
  /* ---------- data ---------- */
  async _fetch() {
    if (this._busy) return; this._busy = true;
    const J = u => fetch(u).then(r => r.ok ? r.json() : null).catch(() => null), team = String(this._c.team);
    try {
      const [eSb, uSb, eSt, uSt, eStat, uStat] = await Promise.all([J(HSP_B + 'eng.1/scoreboard'), J(HSP_B + 'uefa.champions/scoreboard'), J(HSP_S + 'eng.1/standings'), J(HSP_S + 'uefa.champions/standings'), J(HSP_B + 'eng.1/statistics'), J(HSP_B + 'uefa.champions/statistics')]);
      const today = new Date(); today.setHours(0, 0, 0, 0);
      // Premier League: the league calendar lists every match day, so fetch the last 4 and the next 4
      const cal = ((eSb && eSb.leagues && eSb.leagues[0] && eSb.leagues[0].calendar) || []).filter(x => typeof x === 'string').map(x => x.slice(0, 10));
      const past = cal.filter(d => new Date(d + 'T12:00') < today).slice(-4), next = cal.filter(d => new Date(d + 'T12:00') >= today).slice(0, 4);
      const eDays = [...past, ...next].map(d => d.replace(/-/g, ''));
      // Champions League: matches are on Tuesdays and Wednesdays, so check those days three weeks either side
      const uDays = []; for (let i = -21; i <= 28; i++) { const d = new Date(today); d.setDate(d.getDate() + i); if (d.getDay() === 2 || d.getDay() === 3) uDays.push(hspDay(d)); }
      const comps = this._c.team_comps;
      const [eEv, uEv, tPast, tNext] = await Promise.all([
        Promise.all(eDays.map(d => J(HSP_B + 'eng.1/scoreboard?dates=' + d))),
        Promise.all(uDays.map(d => J(HSP_B + 'uefa.champions/scoreboard?dates=' + d))),
        Promise.all(comps.map(lg => J(HSP_B + lg + '/teams/' + team + '/schedule').then(j => ({ lg, j })))),
        Promise.all(comps.map(lg => J(HSP_B + lg + '/teams/' + team + '/schedule?fixture=true').then(j => ({ lg, j }))))]);
      const flat = (arr, lg) => arr.flatMap(j => ((j && j.events) || []).map(e => this._ev(e, lg)));
      const uniq = list => { const m = new Map(); list.forEach(e => e && m.set(e.id, e)); return [...m.values()].sort((a, b) => a.t - b.t); };
      const epl = uniq(flat(eEv, 'eng.1')), ucl = uniq(flat(uEv, 'uefa.champions'));
      const tm = uniq([...tPast, ...tNext].flatMap(({ lg, j }) => ((j && j.events) || []).map(e => this._ev(e, lg))));
      const live = [...epl, ...ucl, ...tm].some(e => e.state === 'in');
      this._d = { epl, ucl, tm, live, eTable: this._table(eSt), uTable: this._table(uSt), eLead: this._leaders(eStat), uLead: this._leaders(uStat), teamInfo: (tPast.find(x => x.lg === this._c.team_league) || {}).j };
      this._at = Date.now(); this._err = false;
    } catch (e) { this._err = true; }
    this._busy = false; this._render();
  }
  _logo(t) { const l = (t && (t.logo || (t.logos && t.logos[0] && t.logos[0].href))) || ''; return this._dark && l.includes('/500/') ? l.replace('/500/', '/500-dark/') : l; }
  _ev(e, lg) {
    const c = e.competitions && e.competitions[0]; if (!c) return null;
    const st = (e.status || c.status || {}), ty = st.type || {};
    const side = ha => { const x = c.competitors.find(k => k.homeAway === ha) || {}; const t = x.team || {}; const sc = x.score && typeof x.score === 'object' ? x.score.displayValue : x.score;
      return { id: String(t.id || x.id), name: t.shortDisplayName || t.displayName || t.name || '', logo: t.logo || (t.logos && t.logos[0] && t.logos[0].href) || '', score: sc, win: !!x.winner, pen: x.shootoutScore }; };
    return { id: e.id, t: Date.parse(e.date), lg, state: ty.state || 'pre', done: !!ty.completed, detail: ty.shortDetail || '', clock: st.displayClock || '', home: side('home'), away: side('away'), venue: (c.venue && c.venue.fullName) || '', tbd: e.timeValid === false };
  }
  _table(j) {
    const ch = j && j.children && j.children[0]; if (!ch) return null;
    const rows = ((ch.standings && ch.standings.entries) || []).map(e => { const s = {}; (e.stats || []).forEach(x => { s[x.name] = x; });
      const v = k => s[k] ? (s[k].displayValue ?? s[k].value) : '';
      return { id: String(e.team.id), name: e.team.shortDisplayName || e.team.displayName, logo: e.team.logos && e.team.logos[0] && e.team.logos[0].href, rank: +v('rank') || 0, p: v('gamesPlayed'), w: v('wins'), d: v('ties'), l: v('losses'), gd: v('pointDifferential'), pts: v('points'), note: e.note }; }).sort((a, b) => a.rank - b.rank);
    return { name: ch.name, rows };
  }
  _leaders(j) {
    const pick = n => (((j && j.stats) || []).find(x => x.name === n) || {}).leaders || [];
    const map = l => ({ id: l.athlete && l.athlete.id, name: l.athlete ? l.athlete.displayName : '', short: l.athlete ? l.athlete.shortName : '', team: l.athlete && l.athlete.team ? { id: String(l.athlete.team.id), name: l.athlete.team.shortDisplayName || l.athlete.team.displayName || l.athlete.team.name, logo: l.athlete.team.logos && l.athlete.team.logos[0] && l.athlete.team.logos[0].href } : {}, v: +l.value || 0,
      apps: ((l.athlete && l.athlete.statistics) || []).find(x => x.name === 'appearances') });
    return { goals: pick('goalsLeaders').map(map), assists: pick('assistsLeaders').map(map) };
  }
  /* ---------- render ---------- */
  _when(e) {
    const d = new Date(e.t), t0 = new Date(); t0.setHours(0, 0, 0, 0); const n = Math.round((new Date(d).setHours(0, 0, 0, 0) - t0) / 864e5);
    const day = n === 0 ? 'Today' : n === 1 ? 'Tomorrow' : n === -1 ? 'Yesterday' : d.toLocaleDateString('en-GB', { weekday: 'short' }) + ' ' + d.getDate() + ' ' + d.toLocaleDateString('en-GB', { month: 'short' });
    const tm = e.tbd ? 'TBC' : d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
    return { day, tm };
  }
  _match(e, me, pills) {
    const w = this._when(e), lg = HSP_LG[e.lg] || {}, live = e.state === 'in';
    const tm = (s, cls) => `<div class="tm ${cls}${me && s.id === me ? ' me' : ''}">${cls === 'h' ? `<span>${hspE(s.name)}</span><img src="${hspE(this._logo(s))}" alt="" loading="lazy" onerror="this.style.visibility='hidden'">` : `<img src="${hspE(this._logo(s))}" alt="" loading="lazy" onerror="this.style.visibility='hidden'"><span>${hspE(s.name)}</span>`}</div>`;
    const sc = e.state === 'pre' ? `<div class="sc pre">${w.tm}</div>` : `<div class="sc${live ? ' live' : ''}">${hspE(e.home.score ?? '')} – ${hspE(e.away.score ?? '')}<small>${live ? hspE(e.clock || 'LIVE') : /pen/i.test(e.detail) ? 'PENS' : /aet|extra/i.test(e.detail) ? 'AET' : 'FT'}</small></div>`;
    let tail = pills ? `<img class="cl" src="https://a.espncdn.com/i/leaguelogos/soccer/${this._dark ? '500-dark' : '500'}/${lg.id || 23}.png" alt="" title="${hspE(lg.name || '')}" onerror="this.style.visibility='hidden'">` : '<span></span>';
    if (pills && e.done && (e.home.id === me || e.away.id === me)) { const mine = e.home.id === me ? e.home : e.away, oth = mine === e.home ? e.away : e.home; const r = mine.win ? 'W' : oth.win ? 'L' : 'D'; tail = `<span class="res ${r}">${r}</span>`; }
    (this._evs = this._evs || {})[e.id] = e; const clk = e.state !== 'pre';
    return `<div class="mt${clk ? ' clk' : ''}"${clk ? ` data-act="match" data-id="${hspE(e.id)}"` : ''}><div class="when"><b>${hspE(w.day)}</b>${e.state === 'pre' ? '' : hspE(w.tm)}</div>${tm(e.home, 'h')}${sc}${tm(e.away, 'a')}${tail}</div>`;
  }
  _tv(e) {
    // UK TV channel for the next match, from sensors the dashboard config names (tv_date, tv_channel)
    const h = this._hass, c = this._c; if (!h || !c.tv_channel) return '';
    const ch = h.states[c.tv_channel], dt = c.tv_date && h.states[c.tv_date];
    if (!ch || !ch.state || /^(unknown|unavailable)$/.test(ch.state)) return '';
    if (dt) { const m = String(dt.state).match(/(\d{1,2})(?:st|nd|rd|th)?\s+([A-Za-z]+)\s+(\d{4})/); if (!m) return '';
      const d = new Date(m[1] + ' ' + m[2] + ' ' + m[3]), k = new Date(e.t); if (isNaN(d) || d.toDateString() !== k.toDateString()) return ''; }
    const n = ch.state, col = /sky/i.test(n) ? '#e4002b' : /tnt/i.test(n) ? '#ff3a1f' : /amazon|prime/i.test(n) ? '#00a8e1' : /bbc/i.test(n) ? '#1d1d1b' : /itv/i.test(n) ? '#0ae2a2' : /hbo|max/i.test(n) ? '#5822b4' : 'var(--accent)';
    return `<div class="tv"><ha-icon icon="mdi:television-classic"></ha-icon><span>${hspE(n)}</span><i style="background:${col}"></i></div>`;
  }
  /* ---------- match details pop-up ---------- */
  async _openMatch(id) {
    const e = this._evs && this._evs[id]; if (!e) return;
    const ov = this._$('mov'), pop = this._$('mpop'); this._mid = id; ov.style.display = 'flex';
    const c = this._mcache = this._mcache || {}, hit = c[id], fresh = hit && (e.state === 'post' || Date.now() - hit.at < 60000);
    pop.innerHTML = this._matchHtml(e, hit && hit.j); pop.scrollTop = 0;
    if (fresh) return;
    const j = await fetch(HSP_B + e.lg + '/summary?event=' + encodeURIComponent(id)).then(r => r.ok ? r.json() : null).catch(() => null);
    if (j) c[id] = { j, at: Date.now() };
    if (this._mid === id && ov.style.display !== 'none') pop.innerHTML = this._matchHtml(e, j, !j);
  }
  _matchHtml(e, j, failed) {
    const lg = HSP_LG[e.lg] || {}, me = String(this._c.team), dk = this._dark ? '500-dark' : '500', w = this._when(e), live = e.state === 'in';
    const im = (u, cls) => `<img${cls ? ` class="${cls}"` : ''} src="${hspE(u)}" alt="" onerror="this.style.visibility='hidden'">`;
    const hc = j && j.header && j.header.competitions && j.header.competitions[0], comp = ha => hc && (hc.competitors || []).find(x => x.homeAway === ha);
    const H = comp('home'), A = comp('away'), so = H && A && H.shootoutScore != null ? [H.shootoutScore, A.shootoutScore] : null;
    const hid = e.home.id, side = tid => String(tid) === hid ? 'h' : 'a';
    const status = live ? hspE(e.clock || 'LIVE') : /pen/i.test(e.detail) ? 'Full time · penalties' : /aet|extra/i.test(e.detail) ? 'Full time · after extra time' : 'Full time';
    const gi = j && j.gameInfo, venue = (gi && gi.venue && gi.venue.fullName) || e.venue, att = gi && gi.attendance;
    // goal scorers and red cards under each team
    const dets = (hc && hc.details) || [], nm = a => a ? (a.shortName || a.displayName) : '';
    const scor = t => dets.filter(d => (d.scoringPlay || d.redCard) && d.team && side(d.team.id) === t).map(d => {
      const p = d.participants && d.participants[0] && d.participants[0].athlete;
      return `<div class="msg${d.redCard ? ' rc' : ''}">${d.redCard ? '<i class="bk r"></i>' : '<ha-icon icon="mdi:soccer"></ha-icon>'}<span>${hspE(nm(p))}${d.penaltyKick ? ' (pen)' : ''}${d.ownGoal ? ' (og)' : ''}</span><b>${hspE(d.clock && d.clock.displayValue)}</b></div>`; }).join('');
    const tm = (s, t) => `<div class="mtm${s.id === me ? ' me' : ''}">${im(this._logo(s))}<span>${hspE(s.name)}</span><div class="mgl">${scor(t)}</div></div>`;
    let html = `<button class="x" data-act="mclose"><ha-icon icon="mdi:close"></ha-icon></button>
      <div class="mhd">${im(`https://a.espncdn.com/i/leaguelogos/soccer/${dk}/${lg.id || 23}.png`)}<div><b>${hspE((j && j.header && j.header.league && j.header.league.name) || lg.name || '')}</b><span>${hspE(new Date(e.t).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' }))} · ${hspE(w.tm)}${venue ? ' · ' + hspE(venue) : ''}${att ? ' · ' + Number(att).toLocaleString('en-GB') + ' fans' : ''}</span></div></div>
      <div class="msc">${tm(e.home, 'h')}<div class="mmid"><b class="${live ? 'live' : ''}">${hspE(e.home.score ?? '')} – ${hspE(e.away.score ?? '')}</b>${so ? `<em>${so[0]} – ${so[1]} on penalties</em>` : ''}<span>${status}</span></div>${tm(e.away, 'a')}</div>`;
    if (!j) return html + `<div class="semp">${failed ? "Couldn't load match details" : 'Loading match details…'}</div>`;
    // timeline
    const ico = { 'yellow-card': '<i class="bk y"></i>', 'red-card': '<i class="bk r"></i>', substitution: '<ha-icon icon="mdi:swap-vertical"></ha-icon>' };
    const ke = (j.keyEvents || []).filter(k => k.type && (/^goal|own-goal|penalty---scored/.test(k.type.type) || k.scoringPlay || ico[k.type.type] || k.type.type === 'halftime'));
    const tl = ke.map(k => {
      const ty = k.type.type, ps = (k.participants || []).map(p => p.athlete && (p.athlete.shortName || p.athlete.displayName)), t = k.team ? side(k.team.id) : '';
      if (ty === 'halftime') return `<div class="tl ht"><span>Half time</span></div>`;
      const goal = k.scoringPlay, i = goal ? '<ha-icon icon="mdi:soccer"></ha-icon>' : ico[ty] || '';
      const txt = ty === 'substitution' ? `<b>${hspE(ps[0] || '')}</b><small>on for ${hspE(ps[1] || '')}</small>` : goal ? `<b>${hspE(ps[0] || '')}</b>${ps[1] && !/own|penalty/.test(ty) ? `<small>assist ${hspE(ps[1])}</small>` : /penalty/.test(ty) ? '<small>penalty</small>' : /own/.test(ty) ? '<small>own goal</small>' : ''}` : `<b>${hspE(ps[0] || '')}</b>`;
      return `<div class="tl ${t}${goal ? ' g' : ''}"><em>${hspE(k.clock && k.clock.displayValue)}</em>${i}<div>${txt}</div></div>`; }).join('');
    // shoot-out
    const sh = Array.isArray(j.shootout) ? j.shootout : null;
    const shHtml = sh && sh.length ? `<div class="mso">${sh.map(t => `<div><span>${hspE(t.team)}</span>${(t.shots || []).map(x => `<i class="${x.didScore ? 'y' : 'n'}" title="${hspE(x.player)}"></i>`).join('')}</div>`).join('')}</div>` : '';
    // stats bars
    const bt = (j.boxscore && j.boxscore.teams) || [], st = (ti, n) => { const t = bt.find(x => side(x.team.id) === ti); const v = t && (t.statistics || []).find(x => x.name === n); return v ? +v.displayValue || 0 : null; };
    const rows = [['possessionPct', 'Possession', '%'], ['totalShots', 'Shots'], ['shotsOnTarget', 'On target'], ['wonCorners', 'Corners'], ['totalPasses', 'Passes'], ['passPct', 'Pass accuracy', 'pct'], ['saves', 'Saves'], ['foulsCommitted', 'Fouls'], ['offsides', 'Offsides'], ['yellowCards', 'Yellow cards'], ['redCards', 'Red cards']];
    const stats = rows.map(([k, l, u]) => { let a = st('h', k), b = st('a', k); if (a == null || b == null) return ''; if (k === 'redCards' && !a && !b) return '';
      const fa = u === 'pct' ? Math.round(a * 100) + '%' : a + (u || ''), fb = u === 'pct' ? Math.round(b * 100) + '%' : b + (u || ''), tot = a + b || 1;
      return `<div class="sb"><div class="sbl"><b>${fa}</b><span>${l}</span><b>${fb}</b></div><div class="sbb"><i class="${a >= b ? 'hi' : ''}" style="width:${a / tot * 100}%"></i><i class="${b >= a ? 'hi' : ''}" style="width:${b / tot * 100}%"></i></div></div>`; }).join('');
    // line-ups
    const lu = (j.rosters || []).map(r => { const pl = r.roster || [], xi = pl.filter(p => p.starter).sort((x, y) => (+x.formationPlace || 99) - (+y.formationPlace || 99)), subs = pl.filter(p => !p.starter && p.subbedIn);
      const row = p => `<div class="lp"><em>${hspE(p.jersey)}</em><span>${hspE(p.athlete.displayName)}</span>${p.subbedOut ? '<ha-icon class="out" icon="mdi:arrow-down"></ha-icon>' : ''}${p.subbedIn ? '<ha-icon class="in" icon="mdi:arrow-up"></ha-icon>' : ''}</div>`;
      return `<div class="lut${String(r.team.id) === me ? ' me' : ''}"><div class="luh">${im(this._logo(r.team.id === e.home.id ? e.home : r.team.id === e.away.id ? e.away : r.team))}<b>${hspE(r.team.shortDisplayName || r.team.displayName)}</b>${r.formation ? `<span>${hspE(r.formation)}</span>` : ''}</div>${xi.map(row).join('')}${subs.length ? `<div class="lus">Subs used</div>${subs.map(row).join('')}` : ''}</div>`; }).join('');
    return html + `<div class="mgrid"><div class="card2b"><div class="lbl">Timeline</div>${tl || '<div class="semp">No events</div>'}${shHtml}</div>
      <div class="card2b"><div class="lbl">Match stats</div>${stats || '<div class="semp">No stats</div>'}</div>
      <div class="card2b"><div class="lbl">Line-ups</div><div class="lus2">${lu || '<div class="semp">Not available</div>'}</div></div></div>`;
  }
  _tableCard(T, me, title, logo) {
    if (!T) return `<div class="card grow"><div class="shd">${logo}<span class="lbl">${hspE(title)}</span></div><div class="semp">${this._d ? 'Table not available' : 'Loading…'}</div></div>`;
    const notes = new Map(); T.rows.forEach(r => r.note && r.note.color && !notes.has(r.note.color) && notes.set(r.note.color, r.note.description));
    const rows = T.rows.map(r => `<tr class="${r.id === me ? 'me' : ''}"><td class="ps">${r.note && r.note.color ? `<i style="background:${hspE(r.note.color)}"></i>` : ''}${r.rank}</td><td class="tn"><div><img src="${hspE(this._logo(r))}" alt="" loading="lazy" onerror="this.style.visibility='hidden'"><span>${hspE(r.name)}</span></div></td><td>${hspE(r.p)}</td><td>${hspE(r.w)}</td><td>${hspE(r.d)}</td><td>${hspE(r.l)}</td><td>${hspE(r.gd)}</td><td class="pt">${hspE(r.pts)}</td></tr>`).join('');
    return `<div class="card grow"><div class="shd">${logo}<span class="lbl">${hspE(title)}</span><span class="cnt">${hspE(T.name || '')}</span></div>
      <div class="lst" id="tbl"><table class="tb"><thead><tr><th>#</th><th class="l">Team</th><th>P</th><th>W</th><th>D</th><th>L</th><th>GD</th><th>Pts</th></tr></thead><tbody>${rows}</tbody></table></div>
      ${notes.size ? `<div class="lgd">${[...notes].map(([c, d]) => `<span><i style="background:${hspE(c)}"></i>${hspE(d)}</span>`).join('')}</div>` : ''}</div>`;
  }
  _leadCard(list, title, unit, logo, showTeam) {
    const rows = list.slice(0, 10).map((p, i) => `<div class="ld"><span class="rk">${i + 1}</span><img src="${hspE(this._logo(p.team))}" alt="" loading="lazy" onerror="this.style.visibility='hidden'"><div class="nm"><b>${hspE(p.name)}</b><span>${hspE(showTeam ? p.team.name || '' : (p.apps ? p.apps.displayValue + ' apps' : ''))}</span></div><span class="v">${p.v}</span></div>`).join('');
    return `<div class="card grow"><div class="shd">${logo}<span class="lbl">${hspE(title)}</span><span class="cnt">${hspE(unit)}</span></div><div class="lst">${rows || `<div class="semp">${this._d ? 'No data yet' : 'Loading…'}</div>`}</div></div>`;
  }
  _render() {
    if (!this._root) return;
    const c = this._c, d = this._d, me = String(c.team), dk = this._dark ? '500-dark' : '500';
    const tLogo = `https://a.espncdn.com/i/teamlogos/soccer/${dk}/${me}.png`, lgLogo = id => `https://a.espncdn.com/i/leaguelogos/soccer/${dk}/${id}.png`;
    const img = (u, cls) => `<img${cls ? ` class="${cls}"` : ''} src="${hspE(u)}" alt="" onerror="this.style.visibility='hidden'">`;
    this._$('tabs').innerHTML = [['team', c.team_name, img(tLogo)], ['epl', 'Premier League', img(lgLogo(23), 'lg'), 'PL'], ['ucl', 'Champions League', img(lgLogo(2), 'lg'), 'UCL']]
      .map(([k, n, i, sh]) => `<button class="${this._tab === k ? 'sel' : ''}" data-act="tab" data-t="${k}">${i}<span class="f">${hspE(n)}</span><span class="s">${hspE(sh || n)}</span></button>`).join('');
    const ago = this._at ? Math.round((Date.now() - this._at) / 60000) : null;
    this._$('upd').textContent = this._err && !d ? "Couldn't load scores" : !d ? 'Loading…' : (d.live ? '● Live · ' : '') + (ago < 1 ? 'Updated just now' : 'Updated ' + ago + ' min ago');
    const now = Date.now(), g = this._$('g'), sc = g.querySelector('#tbl'), keep = sc && this._lastTab === this._tab ? sc.scrollTop : null;
    const res = (list, n) => list.filter(e => e.state !== 'pre').slice(-n).reverse(), fix = (list, n) => list.filter(e => e.state === 'pre' && e.t > now - 3 * 3600e3).slice(0, n);
    const listCard = (title, logo, items, empty, mine, pills) => `<div class="card grow"><div class="shd">${logo}<span class="lbl">${title}</span></div><div class="lst">${items.length ? items.map(e => this._match(e, mine, pills)).join('') : `<div class="semp">${d ? empty : 'Loading…'}</div>`}</div></div>`;
    let html;
    if (this._tab === 'team') {
      const tm = d ? d.tm : [], nx = tm.find(e => e.state === 'in') || fix(tm, 1)[0];
      let hero = '';
      if (nx) { const w = this._when(nx), lg = HSP_LG[nx.lg] || {}, live = nx.state === 'in', mins = Math.round((nx.t - now) / 60000);
        const cd = live ? `<span class="cd" style="background:rgba(229,72,77,.14);color:#e5484d">LIVE ${hspE(nx.clock)}</span>` : mins < 60 * 24 && mins > 0 ? `<span class="cd">Kick-off in ${mins >= 60 ? Math.floor(mins / 60) + 'h ' : ''}${mins % 60}m</span>` : '';
        hero = `<div class="card"><div class="shd">${img(lgLogo(lg.id || 23))}<span class="lbl">${live ? 'Live now' : 'Next match'}</span><span class="cnt">${hspE(lg.name || '')}</span></div>
          <div class="nx"><div class="t">${img(this._logo(nx.home))}<span>${hspE(nx.home.name)}</span></div><div class="mid">${live ? `<b>${hspE(nx.home.score)} – ${hspE(nx.away.score)}</b>` : `<b>${w.tm}</b>`}<span>${hspE(w.day)}</span><br>${cd}</div><div class="t">${img(this._logo(nx.away))}<span>${hspE(nx.away.name)}</span></div></div>
          ${nx.venue ? `<div class="nxv">${hspE(nx.venue)}</div>` : ''}${this._tv(nx)}</div>`; }
      const lead = (a, b) => { const m = new Map(); [...a, ...b].filter(p => p.team && p.team.id === me).forEach(p => { const x = m.get(p.id); if (x) x.v += p.v; else m.set(p.id, Object.assign({}, p)); }); return [...m.values()].sort((x, y) => y.v - x.v); };
      const G = d ? lead(d.eLead.goals, d.uLead.goals) : [], A = d ? lead(d.eLead.assists, d.uLead.assists) : [];
      html = `<div class="scol">${hero}${listCard('Results', img(tLogo), d ? res(tm, 8) : [], 'No results yet', me, true)}${listCard('Fixtures', img(tLogo), d ? fix(tm, 8).filter(e => e !== nx) : [], 'No fixtures scheduled', me, true)}</div>
        <div class="scol">${this._tableCard(d && d.eTable, me, 'Premier League table', img(lgLogo(23)))}</div>
        <div class="scol c3">${this._leadCard(G, 'Top scorers', 'PL + UCL goals', img(tLogo), false)}${this._leadCard(A, 'Top assists', 'PL + UCL assists', img(tLogo), false)}</div>`;
    } else {
      const k = this._tab === 'epl', list = d ? (k ? d.epl : d.ucl) : [], L = d ? (k ? d.eLead : d.uLead) : { goals: [], assists: [] }, lg = img(lgLogo(k ? 23 : 2));
      html = `<div class="scol">${listCard('Results', lg, res(list, 12), 'No recent results', me)}${listCard('Fixtures', lg, fix(list, 12), 'No upcoming fixtures', me)}</div>
        <div class="scol">${this._tableCard(d && (k ? d.eTable : d.uTable), me, k ? 'Premier League table' : 'Champions League table', lg)}</div>
        <div class="scol c3">${this._leadCard(L.goals, 'Top scorers', 'Goals', lg, true)}${this._leadCard(L.assists, 'Top assists', 'Assists', lg, true)}</div>`;
    }
    g.innerHTML = html; this._lastTab = this._tab;
    const t2 = g.querySelector('#tbl'); if (t2) { if (keep != null) t2.scrollTop = keep; else { const r = t2.querySelector('tr.me'); if (r && this._tab !== 'epl') t2.scrollTop = Math.max(0, r.offsetTop - t2.clientHeight / 2); } }
  }
}
if (!customElements.get('home-sports-card')) customElements.define('home-sports-card', HomeSportsCard);
window.customCards = window.customCards || [];
window.customCards.push({ type: 'home-sports-card', name: 'Home Sports Card', description: 'Football: your team, Premier League and Champions League' });
