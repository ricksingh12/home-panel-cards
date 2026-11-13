/* home-health-card — family health page (Google Health / Fitbit sensors) in the home panel style.
   One column per person: steps hlring, activity, sleep, resting heart rate, optional body stats, device battery,
   and 7-day steps / sleep / heart-rate charts from Home Assistant long-term statistics. */
const HHL_CSS = `.hlr{position:relative;background:var(--bg);min-height:calc(100vh - var(--header-height,56px));padding:18px;box-sizing:border-box;display:flex;flex-direction:column}
.hlh{display:flex;align-items:center;gap:12px;margin:0 4px 14px}.hlh h1{font-size:28px;font-weight:700;letter-spacing:-.02em;margin:0;line-height:1.1}.hlh .upd{margin-left:auto;font-size:12px;color:var(--sub);font-weight:500;text-align:right}
.hlg{flex:1;display:grid;grid-template-columns:repeat(var(--n,2),minmax(0,1fr));gap:16px;min-height:0}
.hlcol{display:flex;flex-direction:column;gap:12px;min-width:0}
.hlph{display:flex;align-items:center;gap:12px;padding:2px 4px}.hlph .av{width:44px;height:44px;border-radius:50%;flex:0 0 auto;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:18px;overflow:hidden}.hlph .av img{width:100%;height:100%;object-fit:cover}
.hlph b{display:block;font-size:20px;font-weight:700;letter-spacing:-.01em}.hlph .dv{display:flex;align-items:center;gap:6px;font-size:12.5px;color:var(--sub);font-weight:500;margin-top:1px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.hlph .dv ha-icon{--mdc-icon-size:15px}
.hlact{display:grid;grid-template-columns:auto minmax(0,1fr);gap:18px;align-items:center;padding:16px 18px}
.hlring{position:relative;width:132px;height:132px}.hlring svg{width:100%;height:100%;transform:rotate(-90deg)}.hlring .tr{fill:none;stroke:var(--card2);stroke-width:13}.hlring .fl{fill:none;stroke-width:13;stroke-linecap:round;transition:stroke-dashoffset .6s}
.hlring .c{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center}.hlring .c b{font-size:28px;font-weight:700;letter-spacing:-.03em;line-height:1;font-variant-numeric:tabular-nums}.hlring .c span{font-size:11.5px;color:var(--sub);font-weight:600;margin-top:4px}
.hlst{display:grid;grid-template-columns:1fr 1fr;gap:10px 14px}.hlst div{min-width:0}.hlst span{display:flex;align-items:center;gap:5px;font-size:12px;color:var(--sub);font-weight:600;white-space:nowrap}.hlst span ha-icon{--mdc-icon-size:15px}.hlst b{display:block;font-size:21px;font-weight:700;letter-spacing:-.02em;margin-top:2px;font-variant-numeric:tabular-nums;white-space:nowrap}.hlst b small{font-size:12.5px;color:var(--sub);font-weight:600;margin-left:2px}
.hl2{display:grid;grid-template-columns:1.25fr 1fr;gap:12px}.hlc{padding:14px 16px;min-width:0}.hlc .lbl{display:flex;align-items:center;gap:6px;margin-bottom:6px}.hlc .lbl ha-icon{--mdc-icon-size:16px}
.hlbig{font-size:30px;font-weight:700;letter-spacing:-.03em;line-height:1.05;font-variant-numeric:tabular-nums}.hlbig small{font-size:14px;color:var(--sub);font-weight:600;margin:0 4px 0 2px}.hlsub{font-size:12.5px;color:var(--sub);font-weight:500;margin-top:4px}
.hlsb{display:flex;height:10px;border-radius:5px;overflow:hidden;background:var(--card2);margin-top:10px}.hlsb i{display:block;height:100%}.hlleg{display:flex;gap:12px;font-size:11.5px;color:var(--sub);font-weight:600;margin-top:6px}.hlleg span{display:flex;align-items:center;gap:5px}.hlleg i{width:8px;height:8px;border-radius:2px;display:block}
.hlch{padding:14px 16px 12px}.hlch .lbl{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px}.hlch .lbl span{text-transform:none;letter-spacing:0;font-weight:500}
.hlbars{display:grid;grid-template-columns:repeat(7,1fr);gap:7px;height:96px;align-items:end;position:relative}.hlbars .b{display:flex;flex-direction:column;align-items:center;justify-content:flex-end;height:100%;gap:4px;min-width:0}
.hlbars .b i{display:block;width:100%;max-width:30px;border-radius:7px 7px 3px 3px;min-height:3px}.hlbars .b em{font-style:normal;font-size:10.5px;color:var(--sub);font-weight:700}.hlbars .b em.t{color:var(--text)}.hlbars .b small{font-size:10px;color:var(--sub);font-weight:600;white-space:nowrap;font-variant-numeric:tabular-nums}
.hlbars .hlgl{position:absolute;left:0;right:0;border-top:1.5px dashed var(--sub);opacity:.45;pointer-events:none}.hlbars .hlgl span{position:absolute;right:0;top:-15px;font-size:10px;color:var(--sub);font-weight:700}
.hlnote{font-size:12px;color:var(--sub);text-align:center;padding:10px 0 2px}
.hlcta{padding:22px 20px;text-align:center;display:flex;flex-direction:column;align-items:center;gap:8px}.hlcta ha-icon{--mdc-icon-size:40px;color:var(--sub)}.hlcta b{font-size:17px}.hlcta span{font-size:13.5px;color:var(--sub);line-height:1.45;max-width:360px}
@media (max-width:760px){.hlr{padding:12px}.hlg{grid-template-columns:1fr;gap:22px}.hlh h1{font-size:24px}.hlring{width:116px;height:116px}.hlring .c b{font-size:24px}.hlact{gap:14px;padding:14px}.hlst b{font-size:18px}.hl2{grid-template-columns:1fr 1fr;gap:10px}.hlbig{font-size:24px}}`;
const hhE = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const HH_KEYS = { steps: 'steps', distance: 'distance', active_calories: 'active_calories', total_calories: 'total_calories', floors: 'floors', asleep: 'time_asleep', awake: 'time_awake', in_bed: 'time_in_bed', fall_asleep: 'time_to_fall_asleep', resting_hr: 'resting_heart_rate', weight: 'weight', body_fat: 'body_fat' };
class HomeHealthCard extends HTMLElement {
  setConfig(c) {
    this._c = Object.assign({ title: 'Health', sun: 'sun.sun', step_goal: 10000, sleep_goal: 8, show_body: true, people: [] }, c);
    this._ppl = (this._c.people || []).map(p => { const o = Object.assign({}, p), pre = p.prefix || (p.name ? 'sensor.' + p.name.toLowerCase().replace(/[^a-z0-9]+/g, '_') + '_' : '');
      Object.keys(HH_KEYS).forEach(k => { if (!o[k] && pre) o[k] = pre + HH_KEYS[k]; }); if (o.device && !o.battery) o.battery = o.device + '_battery'; if (o.device && !o.sync) o.sync = o.device + '_last_sync_time'; return o; });
  }
  getCardSize() { return 12; }
  connectedCallback() { this._t = setInterval(() => { if (Date.now() - (this._sAt || 0) > 1800000) this._fetch(); else this._render(); }, 60000); }
  disconnectedCallback() { clearInterval(this._t); }
  set hass(h) {
    const first = !this._hass; this._hass = h;
    if (!this._root) { this._build(); window.__hpcFit && window.__hpcFit(this, this._root.querySelector('.hlr'), 1380, 804); window.__hpcSwipe && window.__hpcSwipe(this); }
    const md = this._c.dark_mode || 'sun', sn = h.states[this._c.sun], td = !!(h.themes && h.themes.darkMode);
    const dk = md === 'dark' || (md === 'sun' ? (sn ? sn.state === 'below_horizon' : td) : md !== 'light' && td);
    if (dk !== this._dark) { this._dark = dk; this.classList.toggle('dark', dk); }
    const sig = JSON.stringify(this._ppl.map(p => Object.keys(p).map(k => { const e = typeof p[k] === 'string' && h.states[p[k]]; return e ? e.state : null; })));
    if (sig !== this._sig) { this._sig = sig; this._render(); }
    if (first) this._fetch();
  }
  _build() {
    const s = this.attachShadow({ mode: 'open' }); if (this._c.icons === 'ios' && window.__hpcIosIcons) window.__hpcIosIcons(this, s);
    s.innerHTML = `<style>${window.__HPC_CSS || ''}</style><style>${HHL_CSS}</style><div class="hlr"><div class="hlh">${window.__hpcBack ? window.__hpcBack(this._c) : ''}<h1>${hhE(this._c.title)}</h1><span class="upd" id="upd"></span></div><div class="hlg" id="g"></div></div>`;
    this._root = s; this._$ = id => s.getElementById(id);
    s.addEventListener('click', e => { const t = e.composedPath().find(n => n.dataset && n.dataset.act); if (!t) return;
      if (t.dataset.act === 'hback') return window.__hpcGoBack && window.__hpcGoBack();
      if (t.dataset.act === 'more') this.dispatchEvent(new CustomEvent('hass-more-info', { bubbles: true, composed: true, detail: { entityId: t.dataset.id } })); });
  }
  _st(id) { return id && this._hass ? this._hass.states[id] : null; }
  _num(id) { const e = this._st(id), v = e ? parseFloat(e.state) : NaN; return isFinite(v) ? v : null; }
  /* 7 days of daily statistics: steps/sleep/heart rate */
  async _fetch() {
    if (!this._hass || this._busy) return; this._busy = true; this._sAt = Date.now();
    const ids = this._ppl.flatMap(p => [p.steps, p.asleep, p.resting_hr]).filter(id => id && this._st(id));
    const st = new Date(); st.setHours(0, 0, 0, 0); st.setDate(st.getDate() - 6);
    try { this._stats = ids.length ? await this._hass.callWS({ type: 'recorder/statistics_during_period', start_time: st.toISOString(), period: 'day', statistic_ids: ids, types: ['max', 'mean', 'change'] }) : {}; }
    catch (e) { this._stats = this._stats || {}; }
    this._busy = false; this._render();
  }
  _days() { const o = []; for (let i = 6; i >= 0; i--) { const d = new Date(); d.setHours(0, 0, 0, 0); d.setDate(d.getDate() - i); o.push(d); } return o; }
  _series(id, pick) {
    const rows = (this._stats && this._stats[id]) || [], days = this._days(), today = days[6].getTime();
    return days.map(d => { const t = d.getTime(); if (t === today) return this._num(id);
      const r = rows.find(x => { const s = typeof x.start === 'number' ? x.start : Date.parse(x.start); return Math.abs(s - t) < 3 * 3600e3; });
      return r ? (r[pick] != null ? r[pick] : r.max != null ? r.max : r.mean) : null; });
  }
  _bars(vals, col, goal, fmt) {
    const days = this._days(), have = vals.filter(v => v != null), mx = Math.max(goal || 0, ...have, 1) * 1.08;
    const D = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    return `<div class="hlbars">${goal ? `<div class="hlgl" style="bottom:${(goal / mx * 72 + 21).toFixed(1)}px"><span>${hhE(fmt(goal))}</span></div>` : ''}${vals.map((v, i) => `<div class="b"><small>${v != null ? hhE(fmt(v)) : ''}</small><i style="height:${v != null ? Math.max(3, v / mx * 72) : 3}px;background:${v == null ? 'var(--card2)' : col};opacity:${goal && v != null && v < goal ? .55 : 1}"></i><em class="${i === 6 ? 't' : ''}">${i === 6 ? 'Today' : D[days[i].getDay()]}</em></div>`).join('')}</div>`
      + (have.length < 3 ? '<div class="hlnote">History builds up over the next few days</div>' : '');
  }
  _hm(h) { if (h == null) return '—'; const m = Math.round(h * 60); return `${Math.floor(m / 60)}<small>h</small>${String(m % 60).padStart(2, '0')}<small>m</small>`; }
  _ago(t) { const s = (Date.now() - Date.parse(t)) / 1000; if (!isFinite(s)) return ''; return s < 90 ? 'just now' : s < 3600 ? Math.round(s / 60) + 'm ago' : s < 86400 ? Math.round(s / 3600) + 'h ago' : Math.round(s / 86400) + 'd ago'; }
  _person(p, i) {
    const c = this._c, col = p.color || ['#3b82f6', '#a855f7', '#e5484d', '#22a06b'][i % 4], pe = this._st(p.person), pic = pe && pe.attributes.entity_picture;
    const head = (dv) => `<div class="hlph"><span class="av" style="background:${col}">${pic ? `<img src="${hhE(pic)}" alt="">` : hhE((p.name || '?').charAt(0))}</span><div style="min-width:0"><b>${hhE(p.name)}</b><div class="dv">${dv}</div></div></div>`;
    if (!this._st(p.steps)) return `<div class="hlcol">${head('Not linked yet')}<div class="card hlcta"><ha-icon icon="mdi:watch-variant"></ha-icon><b>Link ${hhE(p.name)}'s Fitbit</b><span>In Home Assistant go to Settings → Devices &amp; services → Google Health → Add entry, and sign in with ${hhE(p.name)}'s Google account. This page fills in automatically.</span></div></div>`;
    const steps = this._num(p.steps), goal = p.step_goal || c.step_goal, pct = steps != null ? Math.min(1, steps / goal) : 0, R = 56, L = 2 * Math.PI * R;
    const bat = this._num(p.battery), se = this._st(p.sync), dname = p.device_name || (p.device ? p.device.replace(/^sensor\./, '').replace(/_/g, ' ').replace(/\b\w/g, x => x.toUpperCase()) : '');
    const dv = dname ? `<ha-icon icon="mdi:watch-variant"></ha-icon>${hhE(dname)}${bat != null ? ' · ' + Math.round(bat) + '%' : ''}${se && !/unknown|unavailable/.test(se.state) ? ' · synced ' + this._ago(se.state) : ''}` : '';
    const v = (id, d) => { const x = this._num(id); return x == null ? '—' : d != null ? x.toFixed(d) : Math.round(x).toLocaleString('en-GB'); };
    const asl = this._num(p.asleep), awk = this._num(p.awake), bed = this._num(p.in_bed), sg = p.sleep_goal || c.sleep_goal;
    const rhr = this._num(p.resting_hr), rs = this._series(p.resting_hr, 'mean').filter(x => x != null), rAvg = rs.length > 1 ? rs.slice(0, -1).reduce((a, b) => a + b, 0) / (rs.length - 1) : null;
    const tot = (asl || 0) + (awk || 0) || 1, wt = this._num(p.weight), bf = this._num(p.body_fat);
    const sleepCol = '#7c6cff', stepCol = col;
    return `<div class="hlcol">${head(dv)}
      <div class="card hlact" data-act="more" data-id="${hhE(p.steps)}"><div class="hlring"><svg viewBox="0 0 132 132"><circle class="tr" cx="66" cy="66" r="${R}"/><circle class="fl" cx="66" cy="66" r="${R}" style="stroke:${pct >= 1 ? '#22a06b' : stepCol};stroke-dasharray:${L.toFixed(1)};stroke-dashoffset:${(L * (1 - pct)).toFixed(1)}"/></svg>
        <div class="c"><b>${steps != null ? Math.round(steps).toLocaleString('en-GB') : '—'}</b><span>${pct >= 1 ? 'Goal reached 🎉' : 'of ' + (goal >= 1000 ? (goal / 1000) + 'k' : goal) + ' steps'}</span></div></div>
        <div class="hlst"><div><span><ha-icon icon="mdi:map-marker-distance"></ha-icon>Distance</span><b>${v(p.distance, 1)}<small>km</small></b></div><div><span><ha-icon icon="mdi:fire"></ha-icon>Active</span><b>${v(p.active_calories)}<small>kcal</small></b></div>
          <div><span><ha-icon icon="mdi:stairs-up"></ha-icon>Floors</span><b>${v(p.floors)}</b></div><div><span><ha-icon icon="mdi:lightning-bolt-outline"></ha-icon>Total burn</span><b>${v(p.total_calories)}<small>kcal</small></b></div></div></div>
      <div class="hl2"><div class="card hlc" data-act="more" data-id="${hhE(p.asleep)}"><div class="lbl"><ha-icon icon="mdi:sleep" style="color:${sleepCol}"></ha-icon>Last night</div><div class="hlbig">${this._hm(asl)}</div>
          <div class="hlsub">${bed != null ? 'In bed ' + this._hm(bed).replace(/<\/?small>/g, '') : ''}${asl != null ? ' · ' + (asl >= sg ? 'goal met' : (Math.round((sg - asl) * 10) / 10) + 'h short') : ''}</div>
          <div class="hlsb"><i style="width:${(asl || 0) / tot * 100}%;background:${sleepCol}"></i><i style="width:${(awk || 0) / tot * 100}%;background:#f0a43a"></i></div><div class="hlleg"><span><i style="background:${sleepCol}"></i>Asleep</span><span><i style="background:#f0a43a"></i>Awake ${awk != null ? Math.round(awk * 60) + 'm' : ''}</span></div></div>
        <div class="card hlc" data-act="more" data-id="${hhE(p.resting_hr)}"><div class="lbl"><ha-icon icon="mdi:heart-pulse" style="color:#e5484d"></ha-icon>Resting HR</div><div class="hlbig">${rhr != null ? Math.round(rhr) : '—'}<small>bpm</small></div>
          <div class="hlsub">${rAvg != null && rhr != null ? (Math.abs(rhr - rAvg) < 1 ? 'Steady vs last week' : (rhr > rAvg ? '▲ ' : '▼ ') + Math.abs(Math.round(rhr - rAvg)) + ' vs 7-day avg') : 'Daily resting rate'}</div>
          ${c.show_body && (wt != null || bf != null) ? `<div class="hlsub" style="margin-top:10px"><b style="color:var(--text);font-weight:600">${wt != null ? (Math.round(wt * 10) / 10) + ' kg' : ''}</b>${bf != null ? ' · ' + (Math.round(bf * 10) / 10) + '% fat' : ''}</div>` : ''}</div></div>
      <div class="card hlch"><div class="lbl">Steps · 7 days <span>Goal ${goal.toLocaleString('en-GB')}</span></div>${this._bars(this._series(p.steps, 'max'), stepCol, goal, x => x >= 1000 ? (Math.round(x / 100) / 10) + 'k' : Math.round(x))}</div>
      <div class="card hlch"><div class="lbl">Sleep · 7 days <span>Goal ${sg}h</span></div>${this._bars(this._series(p.asleep, 'max'), sleepCol, sg, x => { const m = Math.round(x * 60); return Math.floor(m / 60) + ':' + String(m % 60).padStart(2, '0'); })}</div>
    </div>`;
  }
  _render() {
    if (!this._root || !this._hass) return;
    const g = this._$('g'); g.style.setProperty('--n', Math.max(1, this._ppl.length));
    g.innerHTML = this._ppl.map((p, i) => this._person(p, i)).join('');
    const now = new Date(); this._$('upd').textContent = now.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' });
  }
}
if (!customElements.get('home-health-card')) customElements.define('home-health-card', HomeHealthCard);
window.customCards = window.customCards || []; window.customCards.push({ type: 'home-health-card', name: 'Home Health', description: 'Family health page (Google Health / Fitbit) in the home panel style' });
