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
.nxv{font-size:11.5px;color:var(--sub);text-align:center;margin-top:6px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.tb{width:100%;border-collapse:collapse;font-size:12.5px}.tb th{position:sticky;top:0;background:var(--card);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);font-size:10px;font-weight:700;letter-spacing:.06em;color:var(--sub);text-align:center;padding:4px 2px 6px;z-index:1}.tb th.l{text-align:left}
.tb td{padding:5px 2px;text-align:center;border-top:1px solid var(--line);font-variant-numeric:tabular-nums}.tb td.ps{width:26px;font-weight:700;color:var(--sub);position:relative}.tb td.ps i{position:absolute;left:0;top:5px;bottom:5px;width:3px;border-radius:2px}
.tb td.tn{text-align:left}.tb td.tn div{display:flex;align-items:center;gap:7px;font-weight:600;min-width:0}.tb td.tn img{width:20px;height:20px;object-fit:contain;flex:0 0 auto}.tb td.tn span{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:120px}
.tb td.pt{font-weight:800}.tb tr.me td{background:rgba(240,138,36,.12)}.tb tr.me td.tn span{color:var(--accent)}.tb tr.me td:first-child{border-radius:8px 0 0 8px}.tb tr.me td:last-child{border-radius:0 8px 8px 0}
.lgd{display:flex;flex-wrap:wrap;gap:4px 12px;font-size:10.5px;color:var(--sub);margin-top:8px}.lgd span{display:flex;align-items:center;gap:5px}.lgd i{width:9px;height:9px;border-radius:3px;display:block}
.ld{display:grid;grid-template-columns:20px 26px minmax(0,1fr) auto;align-items:center;gap:8px;padding:6px 0;border-bottom:1px solid var(--line)}.ld:last-child{border-bottom:0}
.ld .rk{font-size:12px;font-weight:700;color:var(--sub);text-align:center}.ld img{width:24px;height:24px;object-fit:contain}.ld .nm{min-width:0}.ld .nm b{display:block;font-size:13.5px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.ld .nm span{font-size:11px;color:var(--sub)}
.ld .v{font-size:18px;font-weight:700;min-width:28px;text-align:right}.ld:first-child .v{color:var(--accent)}
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
    if (first) this._fetch();
  }
  _build() {
    const s = this.attachShadow({ mode: 'open' });
    s.innerHTML = `<style>${window.__HPC_CSS || ''}</style><style>${HSP_CSS}</style><div class="spr"><div class="sph">${window.__hpcBack(this._c)}<h1>${hspE(this._c.title)}</h1><div class="stabs" id="tabs"></div><span class="upd" id="upd"></span></div><div class="sgrid" id="g"></div></div>`;
    this._root = s; this._$ = id => s.getElementById(id);
    s.addEventListener('click', e => {
      const t = e.composedPath().find(n => n.dataset && n.dataset.act); if (!t) return;
      if (t.dataset.act === 'hback') { window.__hpcGoBack(); return; }
      if (t.dataset.act === 'tab') { this._tab = t.dataset.t; this._render(); }
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
    return `<div class="mt"><div class="when"><b>${hspE(w.day)}</b>${e.state === 'pre' ? '' : hspE(w.tm)}</div>${tm(e.home, 'h')}${sc}${tm(e.away, 'a')}${tail}</div>`;
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
          ${nx.venue ? `<div class="nxv">${hspE(nx.venue)}</div>` : ''}</div>`; }
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
