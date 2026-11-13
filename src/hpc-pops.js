/* home-panel pop-ups for lights, thermostats, sensors and batteries — patches home-panel-card (and everything built on it) */
const PXCSS = `.pxw{width:min(94%,760px)}.pxw.sm{width:min(94%,560px)}
.pxg{display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:10px;margin-top:14px}.pxg .blk{padding:10px 14px;border-radius:16px}.pxg .k{font-size:12px;color:var(--sub);font-weight:600}.pxg .v{font-size:18px;font-weight:600;margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.pxg .v small{font-size:12px;color:var(--sub);font-weight:500;margin-left:3px}
.pxsec{margin-top:18px}.pxsec>.lbl{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px}.pxsec>.lbl span{text-transform:none;letter-spacing:0;font-weight:500}
.pxbig{display:flex;align-items:baseline;gap:8px;margin-top:16px}.pxbig b{font-size:56px;font-weight:700;line-height:1;letter-spacing:-.02em}.pxbig small{font-size:16px;color:var(--sub);font-weight:500}
.pxr{-webkit-appearance:none;appearance:none;width:100%;height:58px;border-radius:18px;margin:0;background:var(--card2);outline:none;cursor:pointer;display:block}
.pxr::-webkit-slider-thumb{-webkit-appearance:none;width:10px;height:42px;border-radius:5px;background:#fff;box-shadow:0 1px 6px rgba(0,0,0,.3);margin-right:8px}.pxr::-moz-range-thumb{width:10px;height:42px;border-radius:5px;background:#fff;border:0;box-shadow:0 1px 6px rgba(0,0,0,.3)}
.pxr.ct{height:40px;border-radius:14px;background:linear-gradient(90deg,#ffa757,#ffd9b0 45%,#f4f6ff 75%,#cfe0ff)}.pxr.ct::-webkit-slider-thumb{height:30px}
.pxsw{display:flex;flex-wrap:wrap;gap:10px}.pxsw button{width:44px;height:44px;border-radius:50%;border:3px solid var(--card);box-shadow:0 0 0 1px var(--line);cursor:pointer;padding:0}.pxsw button.sel{box-shadow:0 0 0 3px var(--text)}
.pxbar{height:12px;border-radius:6px;background:var(--card2);overflow:hidden;margin-top:12px}.pxbar i{display:block;height:100%;border-radius:6px}
.pxtl{position:relative;height:34px;border-radius:10px;background:var(--card2);overflow:hidden}.pxtl i{position:absolute;top:0;bottom:0;border-radius:3px;min-width:3px}
.pxax{display:flex;justify-content:space-between;font-size:11px;color:var(--sub);font-weight:600;margin-top:5px}
.pxch{position:relative;height:150px}.pxch svg{position:absolute;inset:0;width:100%;height:100%;overflow:visible}.pxch .yl{position:absolute;left:0;font-size:11px;color:var(--sub);font-weight:600;transform:translateY(-50%);background:var(--card);padding-right:4px}
.pxev{display:flex;flex-direction:column;gap:6px;max-height:210px;overflow:auto}.pxev div{display:flex;align-items:center;gap:10px;background:var(--card2);border-radius:12px;padding:8px 12px;font-size:14px}.pxev div b{font-weight:600}.pxev div span{margin-left:auto;color:var(--sub);font-size:12px}.pxev i{width:8px;height:8px;border-radius:50%;flex:0 0 auto}
.pxst{display:flex;align-items:center;gap:16px;margin-top:16px;padding:16px 18px;border-radius:20px;background:var(--card2)}.pxst .ic{width:56px;height:56px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:var(--card);flex:0 0 auto}.pxst .ic ha-icon{--mdc-icon-size:30px}.pxst b{font-size:26px;font-weight:700;display:block}.pxst span{font-size:13px;color:var(--sub)}
.pxst.on{background:rgba(229,72,77,.12)}.pxst.on .ic{background:#e5484d;color:#fff}.pxst.on b{color:#e5484d}
.pxcl{display:grid;grid-template-columns:auto minmax(0,1fr);gap:22px;align-items:center;margin-top:14px}
.pxdial{position:relative;width:230px;height:210px}.pxdial svg{position:absolute;left:15px;top:0;width:200px;height:200px;overflow:visible}.pxdial .trk{fill:none;stroke:rgba(0,0,0,.08);stroke-width:12;stroke-linecap:round}:host(.dark) .pxdial .trk{stroke:rgba(255,255,255,.1)}
.pxdial .fil{fill:none;stroke-width:12;stroke-linecap:round}.pxdial .fil.dim{opacity:.45}.pxdial .knob{fill:#fff;stroke-width:4}.pxdial .cdot{fill:var(--text)}
.pxdial .c{position:absolute;left:0;right:0;top:58px;text-align:center;line-height:1}.pxdial .c b{font-size:46px;font-weight:600}.pxdial .c b small{font-size:20px;vertical-align:top}.pxdial .c div{font-size:14px;font-weight:600;color:var(--sub);margin-top:6px}.pxdial .c div.h{color:#e0592a}
.pxdial .pm{position:absolute;bottom:4px;width:46px;height:46px;border-radius:50%;border:0;background:var(--card2);color:var(--text);display:flex;align-items:center;justify-content:center;cursor:pointer}.pxdial .pm ha-icon{--mdc-icon-size:24px}.pxdial .pm.m{left:6px}.pxdial .pm.p{right:6px}.pxdial.off .pm{opacity:.35;pointer-events:none}
.pxw .vchips{margin-top:0}.pic.on{background:#f5a623;color:#fff}.pic.red{background:#e5484d;color:#fff}.pic.heat{background:#f06a3c;color:#fff}
.sch{border-radius:20px;background:var(--card2);padding:14px 14px 12px}.sch .shd{display:flex;align-items:center;gap:12px}.sch .shd>div{flex:1;min-width:0}.sch .shd b{display:block;font-size:15px;font-weight:600}.sch .shd span{display:block;font-size:12.5px;color:var(--sub);font-weight:500;margin-top:2px}
.sch .tg{width:52px;height:32px;border-radius:16px;border:0;background:rgba(120,120,128,.32);position:relative;cursor:pointer;flex:0 0 auto;padding:0}.sch .tg i{position:absolute;top:3px;left:3px;width:26px;height:26px;border-radius:50%;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,.3);transition:left .15s}.sch .tg.on{background:#34c759}.sch .tg.on i{left:23px}
.sch .sdays{display:grid;grid-template-columns:repeat(7,1fr);gap:6px;margin-top:14px}.sch .sdays button{height:36px;border:0;border-radius:12px;background:var(--card);color:var(--text);font:inherit;font-size:13px;font-weight:700;cursor:pointer;padding:0}.sch .sdays button.sel{background:var(--accent);color:#fff}.sch .sdays button.td{box-shadow:inset 0 0 0 2px var(--accent)}.sch .sdays button.sel.td{box-shadow:none}
.sch .sbar{position:relative;height:22px;border-radius:7px;background:var(--card);margin-top:12px;overflow:hidden}.sch .sbar i{position:absolute;top:0;bottom:0;background:#f06a3c;opacity:.85;border-radius:4px}.sch .sbar em{position:absolute;top:0;bottom:0;width:2px;background:var(--text);opacity:.6}
.sch .sax{display:flex;justify-content:space-between;font-size:10.5px;color:var(--sub);font-weight:600;margin-top:3px}
.sch .srows{display:flex;flex-direction:column;gap:8px;margin-top:12px}.sch .srow{display:flex;align-items:center;gap:8px;background:var(--card);border-radius:14px;padding:6px 6px 6px 10px}
.sch .srow select{font:inherit;font-size:15px;font-weight:600;color:var(--text);background:var(--card2);border:0;border-radius:10px;padding:7px 8px;min-width:0;color-scheme:light dark;-webkit-appearance:none;appearance:none;text-align:center;cursor:pointer;font-variant-numeric:tabular-nums}.sch .srow .to{color:var(--sub);font-weight:600}
.sch .stp{display:flex;align-items:center;gap:4px;margin-left:auto}.sch .stp b{min-width:46px;text-align:center;font-size:16px;font-weight:700;color:#f06a3c}.sch .stp button,.sch .sdl{width:32px;height:32px;border-radius:50%;border:0;background:var(--card2);color:var(--text);display:flex;align-items:center;justify-content:center;cursor:pointer;padding:0}.sch .stp button ha-icon,.sch .sdl ha-icon{--mdc-icon-size:18px}.sch .sdl{background:none;color:var(--sub)}
.sch .sempty{font-size:13px;color:var(--sub);text-align:center;padding:10px 0}.sch .sbtns{display:flex;flex-wrap:wrap;gap:8px;margin-top:12px}.sch .sbtns button{display:inline-flex;align-items:center;gap:6px;border:0;border-radius:999px;padding:8px 13px;font:inherit;font-size:13px;font-weight:600;background:var(--card);color:var(--text);cursor:pointer}.sch .sbtns button ha-icon{--mdc-icon-size:16px}
.sch .sbtns .pri{background:var(--accent);color:#fff}.sch .serr{color:#e5484d;font-size:13px;font-weight:600;margin-top:8px}.sch .sbk{display:flex;align-items:center;gap:8px;margin-top:12px;font-size:13px;color:var(--sub);font-weight:600}.sch .sbk .stp{margin-left:auto}.sch .sbk .stp b{color:var(--text)}
@media (max-width:640px){.sch .srow select{font-size:14px;padding:7px 6px}.sch .stp b{min-width:40px}}
@media (max-width:640px){.pxcl{grid-template-columns:1fr;justify-items:center}.pxcl>div:last-child{justify-self:stretch}.pxg{grid-template-columns:1fr 1fr}}`;
customElements.whenDefined('home-panel-card').then(() => {
  const Base = customElements.get('home-panel-card'), P = Base.prototype;
  if (P._pxOpen) return;
  const E = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const T = d => { d = new Date(d); if (isNaN(d)) return '—'; const h = d.getHours(), m = d.getMinutes(); return (h % 12 || 12) + ':' + String(m).padStart(2, '0') + ' ' + (h < 12 ? 'am' : 'pm'); };
  const AGO = t => { const s = (Date.now() - new Date(t)) / 1000; if (!isFinite(s)) return '—'; if (s < 60) return 'just now'; if (s < 3600) return Math.floor(s / 60) + 'm ago'; if (s < 86400) return Math.floor(s / 3600) + 'h ago'; return Math.floor(s / 86400) + 'd ago'; };
  const DUR = ms => { const s = Math.round(ms / 1000); return s < 60 ? s + 's' : s < 3600 ? Math.round(s / 60) + 'm' : Math.floor(s / 3600) + 'h ' + Math.round((s % 3600) / 60) + 'm'; };
  const DAYT = d => { d = new Date(d); const t = new Date(); return d.toDateString() === t.toDateString() ? T(d) : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][d.getDay()] + ' ' + T(d); };
  const NUM = x => x != null && x !== '' && !isNaN(parseFloat(x)) ? parseFloat(x) : null;
  const BIN = { door: ['Door', 'Open', 'Closed', 'mdi:door-open', 'mdi:door-closed', 'Opened'], window: ['Window', 'Open', 'Closed', 'mdi:window-open-variant', 'mdi:window-closed-variant', 'Opened'],
    garage_door: ['Garage door', 'Open', 'Closed', 'mdi:garage-open', 'mdi:garage', 'Opened'], opening: ['Sensor', 'Open', 'Closed', 'mdi:square-rounded-outline', 'mdi:square-rounded', 'Opened'],
    motion: ['Motion', 'Motion detected', 'Clear', 'mdi:motion-sensor', 'mdi:motion-sensor-off', 'Motion'], occupancy: ['Occupancy', 'Occupied', 'Clear', 'mdi:home-account', 'mdi:home-outline', 'Occupied'],
    presence: ['Presence', 'Home', 'Away', 'mdi:home-account', 'mdi:home-outline', 'Arrived'], moisture: ['Leak sensor', 'Wet', 'Dry', 'mdi:water-alert', 'mdi:water-off', 'Wet'],
    smoke: ['Smoke alarm', 'Smoke!', 'Clear', 'mdi:smoke-detector-alert', 'mdi:smoke-detector', 'Alarm'], vibration: ['Vibration', 'Vibration', 'Still', 'mdi:vibrate', 'mdi:vibrate-off', 'Vibration'] };
  const kind = e => { const d = e.entity_id.split('.')[0], a = e.attributes;
    if (d === 'light') return 'light'; if (d === 'climate') return 'clim'; if (d === 'binary_sensor') return 'bin';
    if (d === 'sensor' && NUM(e.state) != null) return a.device_class === 'battery' || (/battery/i.test(e.entity_id + (a.friendly_name || '')) && a.unit_of_measurement === '%') ? 'bat' : 'num';
    return null; };
  const oMore = P._more;
  P._more = function (id) { const e = this._st && this._st(id); if (e && kind(e)) return this._pxOpen(id); return oMore.call(this, id); };
  const desc = Object.getOwnPropertyDescriptor(P, 'hass');
  Object.defineProperty(P, 'hass', { configurable: true, get: desc.get, set(h) { desc.set.call(this, h); if (this._px) this._pxSync(); } });
  P._pxEl = function () {
    let ov = this.shadowRoot && this.shadowRoot.getElementById('pxov'); if (ov) return ov;
    const host = this.shadowRoot.querySelector('.hroot') || this.shadowRoot.querySelector('.root'); if (!host) return null;
    ov = document.createElement('div'); ov.className = 'ov'; ov.id = 'pxov'; ov.innerHTML = `<style>${PXCSS}</style><div class="pop pxw" id="pxpop"></div>`; host.appendChild(ov);
    ov.addEventListener('click', e => { e.stopPropagation(); this._pxClick(e, ov); });
    ov.addEventListener('pointerdown', e => e.stopPropagation()); ov.addEventListener('pointerup', e => e.stopPropagation());
    ov.addEventListener('input', e => { e.stopPropagation(); this._pxInput(e.composedPath()[0]); });
    ov.addEventListener('change', e => { e.stopPropagation(); this._pxChange(e.composedPath()[0]); });
    return ov;
  };
  P._pxOpen = function (id) {
    const ov = this._pxEl(); if (!ov) return oMore.call(this, id);
    this._px = { id, h: null, hAt: 0, sig: null }; this._pxRender(); ov.classList.add('open'); this._pxHist();
  };
  P._pxClose = function () { this._px = null; const ov = this.shadowRoot && this.shadowRoot.getElementById('pxov'); if (ov) ov.classList.remove('open'); };
  P._pxSync = function () {
    const p = this._px, e = p && this._st(p.id); if (!e) return;
    const sg = JSON.stringify([e.state, e.attributes, (this._pend || {})[p.id], this._pxXs(e)]);
    if (sg === p.sig || (p.hold && Date.now() - p.hold < 2500)) return;
    this._pxRender();
    if (Date.now() - p.hAt > 300000) this._pxHist();
  };
  P._pxHist = function () {
    const p = this._px, e = p && this._st(p.id); if (!e || !this._hass.callWS) return;
    const k = kind(e), hrs = k === 'bat' ? 168 : 24, id = p.id; p.hAt = Date.now();
    this._hass.callWS({ type: 'history/history_during_period', start_time: new Date(Date.now() - hrs * 3600000).toISOString(), end_time: new Date().toISOString(),
      entity_ids: [id], minimal_response: k !== 'clim', no_attributes: k !== 'clim', significant_changes_only: false })
      .then(r => { if (!this._px || this._px.id !== id) return; this._px.h = ((r && r[id]) || []).map(x => ({ t: ((x.lu || x.lc) * 1000) || Date.parse(x.last_updated || x.last_changed), s: x.s ?? x.state, a: x.a || x.attributes })); this._px.hrs = hrs; this._px.sig = null; this._pxRender(); })
      .catch(() => { if (this._px && this._px.id === id) { this._px.herr = true; this._px.sig = null; this._pxRender(); } });
  };
  P._pxRender = function () {
    const p = this._px, el = this.shadowRoot.getElementById('pxpop'), e = p && this._st(p.id); if (!el) return;
    if (!e) { el.innerHTML = this._ph('pxclose', this._pic('mdi:help'), 'Device', E(p ? p.id : ''), 'Not found'); return; }
    p.sig = JSON.stringify([e.state, e.attributes, (this._pend || {})[p.id], this._pxXs(e)]);
    const k = kind(e), sc = el.scrollTop;
    el.className = 'pop pxw' + (k === 'light' || k === 'bin' || k === 'bat' ? ' sm' : '');
    el.innerHTML = k === 'light' ? this._pxLight(e) : k === 'clim' ? this._pxClim(e) : k === 'bin' ? this._pxBin(e) : this._pxNum(e, k === 'bat');
    el.scrollTop = sc;
  };
  P._pxXs = function (e) { if (e.entity_id.split('.')[0] !== 'climate') return 0; const o = e.entity_id.split('.')[1], g = id => { const x = this._hass.states[id]; return x && x.state; }; return [g('input_boolean.' + o + '_follows_schedule'), g('input_number.heating_setback'), g('schedule.heating_' + o)]; };
  P._pxNm = function (e, strip) { let n = (e.attributes.friendly_name || e.entity_id).trim(); if (strip) n = n.replace(strip, '').trim() || n; return E(n); };
  P._pxActs = function (extra) { return `<div class="cacts">${extra || ''}<button data-px="more"><ha-icon icon="mdi:cog-outline"></ha-icon>More settings</button></div>`; };
  P._pxWait = function (txt) { const p = this._px; return p.herr ? `<div class="wxmsg">Couldn't load history</div>` : p.h ? '' : `<div class="wxmsg">${txt || 'Loading history…'}</div>`; };
  P._pxAxis = function (hrs) { const n = Date.now(); if (hrs > 48) { const D = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], o = []; for (let i = 7; i >= 0; i -= 2) o.push(i ? D[new Date(n - i * 86400000).getDay()] : 'Now'); return `<div class="pxax">${o.map(x => `<span>${x}</span>`).join('')}</div>`; }
    const o = []; for (let i = 24; i >= 0; i -= 6) o.push(i ? T(n - i * 3600000).replace(':00', '') : 'Now'); return `<div class="pxax">${o.map(x => `<span>${x}</span>`).join('')}</div>`; };
  /* line chart: series [{pts:[[t,v]], col, dash, step, fill}] */
  P._pxChart = function (series, hrs, unit, bands) {
    const t1 = Date.now(), t0 = t1 - hrs * 3600000, all = series.flatMap(s => s.pts.map(x => x[1])).filter(v => v != null);
    if (!all.length) return '<div class="wxmsg">No history yet</div>';
    let lo = Math.min(...all), hi = Math.max(...all); if (hi - lo < 1) { lo -= .5; hi += .5; } const pad = (hi - lo) * .12; lo -= pad; hi += pad;
    const X = t => ((Math.max(t0, t) - t0) / (t1 - t0) * 1000).toFixed(1), Y = v => (140 - (v - lo) / (hi - lo) * 140).toFixed(1);
    const path = s => { let d = '', pv = null; s.pts.forEach(([t, v], i) => { if (v == null) return; const x = X(t), y = Y(v); d += (d ? (s.step && pv != null ? `L${x} ${pv}L${x} ${y}` : `L${x} ${y}`) : `M${x} ${y}`); pv = y; }); if (d && pv != null) d += `L1000 ${pv}`; return d; };
    const bd = (bands || []).map(([a, b]) => `<rect x="${X(a)}" y="0" width="${Math.max(2, X(b) - X(a))}" height="140" fill="rgba(240,106,60,.13)"/>`).join('');
    const svg = series.map(s => { const d = path(s); if (!d) return ''; return (s.fill ? `<path d="${d}L1000 140L${X(s.pts.find(x => x[1] != null)[0])} 140Z" fill="${s.col}" opacity=".1"/>` : '')
      + `<path d="${d}" fill="none" stroke="${s.col}" stroke-width="2.5" vector-effect="non-scaling-stroke" stroke-linejoin="round"${s.dash ? ' stroke-dasharray="6 5"' : ''}/>`; }).join('');
    const fmt = v => (Math.abs(hi - lo) < 10 ? Math.round(v * 10) / 10 : Math.round(v)) + (unit || '');
    return `<div class="pxch"><svg viewBox="0 0 1000 140" preserveAspectRatio="none">${bd}<line x1="0" x2="1000" y1="140" y2="140" stroke="var(--line)"/>${svg}</svg>
      <span class="yl" style="top:${Y(hi - pad)}px">${fmt(hi - pad)}</span><span class="yl" style="top:${Y(lo + pad)}px">${fmt(lo + pad)}</span></div>${this._pxAxis(hrs)}`;
  };
  /* ---------- light ---------- */
  P._pxLight = function (e) {
    const a = e.attributes, on = e.state === 'on', na = e.state === 'unavailable', modes = a.supported_color_modes || [], dim = modes.some(m => m !== 'onoff');
    const ct = modes.includes('color_temp'), col = modes.some(m => ['hs', 'xy', 'rgb', 'rgbw', 'rgbww'].includes(m));
    const pct = on ? (a.brightness != null ? Math.max(1, Math.round(a.brightness / 2.55)) : 100) : 0, rgb = on && a.rgb_color ? `rgb(${a.rgb_color.join(',')})` : '#f5a623';
    const st = na ? 'Unavailable' : on ? (dim ? pct + '% brightness' : 'On') : 'Off';
    const fill = `background:linear-gradient(90deg,${rgb} ${pct}%,var(--card2) ${pct}%)`;
    const kmin = a.min_color_temp_kelvin || 2000, kmax = a.max_color_temp_kelvin || 6500, kv = a.color_temp_kelvin || Math.round((kmin + kmax) / 2);
    const SW = [[30, 90, '#ff9a1f'], [0, 0, '#fff4e5'], [0, 85, '#ff3b30'], [330, 70, '#ff4fa3'], [270, 75, '#9b5cff'], [220, 85, '#2f6bff'], [185, 80, '#19c3e6'], [120, 75, '#2ecc5a']];
    const hs = a.hs_color;
    return this._ph('pxclose', `<span class="pic${on ? ' on' : ''}" style="${on ? 'background:' + rgb : ''}"><ha-icon icon="${E(a.icon || (on ? 'mdi:lightbulb-on' : 'mdi:lightbulb-outline'))}"></ha-icon></span>`, 'Light', this._pxNm(e), st)
      + `<div class="pxbig"><b>${na ? '—' : on ? (dim ? pct + '%' : 'On') : 'Off'}</b><small>${on && a.color_mode === 'color_temp' && a.color_temp_kelvin ? a.color_temp_kelvin + 'K' : ''}</small></div>`
      + (dim && !na ? `<div class="pxsec"><div class="lbl">Brightness</div><input class="pxr" type="range" min="1" max="100" value="${pct || 1}" data-pxb="1" style="${fill}"></div>` : '')
      + (ct && !na ? `<div class="pxsec"><div class="lbl">Warmth <span>${kv}K</span></div><input class="pxr ct" type="range" min="${kmin}" max="${kmax}" step="50" value="${kv}" data-pxct="1"></div>` : '')
      + (col && !na ? `<div class="pxsec"><div class="lbl">Colour</div><div class="pxsw">${SW.map(([h, s, c]) => `<button style="background:${c}" class="${on && hs && a.color_mode !== 'color_temp' && Math.abs(hs[0] - h) < 8 && Math.abs(hs[1] - s) < 10 ? 'sel' : ''}" data-px="hs" data-h="${h}" data-s="${s}"></button>`).join('')}</div></div>` : '')
      + this._pxActs(na ? '' : `<button class="${on ? 'on' : ''}" data-px="ltog"><ha-icon icon="mdi:power"></ha-icon>${on ? 'Turn off' : 'Turn on'}</button>`);
  };
  /* ---------- thermostat ---------- */
  P._pxClim = function (e) {
    const a = e.attributes, p = this._pend || {}, on = e.state !== 'off' && e.state !== 'unavailable', heating = on && a.hvac_action === 'heating';
    const tgt = on ? (p[e.entity_id] ?? a.temperature) : null, cur = NUM(a.current_temperature), [lo, hi] = this._c.heating_range || [10, 30];
    const R = 80, C = 100, A0 = 135, SWP = 270, ang = v => A0 + SWP * (Math.min(hi, Math.max(lo, v)) - lo) / (hi - lo), pt = g => [C + R * Math.cos(g * Math.PI / 180), C + R * Math.sin(g * Math.PI / 180)];
    const arc = (s0, e0) => { const [x, y] = pt(s0), [u, v] = pt(e0); return `M${x.toFixed(1)} ${y.toFixed(1)}A${R} ${R} 0 ${e0 - s0 > 180 ? 1 : 0} 1 ${u.toFixed(1)} ${v.toFixed(1)}`; };
    const colr = heating ? '#f06a3c' : 'var(--sub)';
    let svg = `<path d="${arc(A0, A0 + SWP)}" class="trk"/>`;
    if (tgt != null) { const g = ang(tgt), [mx, my] = pt(g); svg += `<path d="${arc(A0, Math.max(A0 + .5, g))}" style="stroke:${colr}" class="fil${heating ? '' : ' dim'}"/><circle cx="${mx.toFixed(1)}" cy="${my.toFixed(1)}" r="10" class="knob" style="stroke:${colr}"/>`; }
    if (cur != null) { const [cx, cy] = pt(ang(cur)); svg += `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="4" class="cdot"/>`; }
    const st = e.state === 'unavailable' ? 'Unavailable' : !on ? 'Off' : heating ? 'Heating to ' + tgt + '°' : tgt != null ? 'Idle · set to ' + tgt + '°' : 'On';
    const ML = { heat: 'Heat', off: 'Off', auto: 'Schedule', heat_cool: 'Auto', cool: 'Cool', dry: 'Dry', fan_only: 'Fan' };
    const MI = { heat: 'mdi:fire', off: 'mdi:power', auto: 'mdi:calendar-clock', heat_cool: 'mdi:sun-snowflake-variant', cool: 'mdi:snowflake', dry: 'mdi:water-percent', fan_only: 'mdi:fan' };
    const hu = this._c.heating_logo === undefined ? 'https://brands.home-assistant.io/nest/icon.png' : this._c.heating_logo;
    const H = this._px.h || [], cp = H.map(x => [x.t, NUM(x.a && x.a.current_temperature)]), tp = H.map(x => [x.t, x.s === 'off' ? null : NUM(x.a && x.a.temperature)]);
    if (H.length) { cp.push([Date.now(), cur]); }
    const bands = []; let b0 = null; H.forEach(x => { const hh = x.a && x.a.hvac_action === 'heating'; if (hh && b0 == null) b0 = x.t; if (!hh && b0 != null) { bands.push([b0, x.t]); b0 = null; } }); if (b0 != null) bands.push([b0, Date.now()]);
    const heatMs = bands.reduce((s, [x, y]) => s + Math.max(0, y - Math.max(x, Date.now() - 86400000)), 0);
    const g = (k, v, u) => `<div class="blk"><div class="k">${k}</div><div class="v">${v}${u ? `<small>${u}</small>` : ''}</div></div>`;
    return this._ph('pxclose', this._plg(hu), 'Thermostat', this._pxNm(e), E(st))
      + `<div class="pxcl"><div class="pxdial${on ? '' : ' off'}"><svg viewBox="0 0 200 200">${svg}</svg><div class="c"><b>${cur != null ? cur.toFixed(1) : '—'}<small>°</small></b><div class="${heating ? 'h' : ''}">${tgt != null ? (heating ? '→ ' : 'Set ') + tgt + '°' : on ? 'On' : 'Off'}</div></div>
        <button class="pm m" data-px="cdn"><ha-icon icon="mdi:minus"></ha-icon></button><button class="pm p" data-px="cup"><ha-icon icon="mdi:plus"></ha-icon></button></div>
        <div><div class="lbl">Mode</div><div class="vchips" style="margin-top:8px">${(a.hvac_modes || ['heat', 'off']).map(m => `<button class="${e.state === m ? 'sel' : ''}" data-px="mode" data-m="${E(m)}"><ha-icon icon="${MI[m] || 'mdi:thermostat'}" style="--mdc-icon-size:16px;margin-right:4px"></ha-icon>${E(ML[m] || m)}</button>`).join('')}</div>
        ${(a.preset_modes || []).length ? `<div class="lbl" style="margin-top:14px">Preset</div><div class="vchips" style="margin-top:8px">${a.preset_modes.map(m => `<button class="${a.preset_mode === m ? 'sel' : ''}" data-px="preset" data-m="${E(m)}">${E(m.charAt(0).toUpperCase() + m.slice(1).replace(/_/g, ' '))}</button>`).join('')}</div>` : ''}
        <div class="pxg">${g('Now', cur != null ? cur.toFixed(1) + '°' : '—')}${g('Target', tgt != null ? tgt + '°' : '—')}${a.current_humidity != null ? g('Humidity', Math.round(a.current_humidity), '%') : ''}${g('Heating today', H.length ? DUR(heatMs) : '—')}</div></div></div>
      <div class="pxsec"><div class="lbl">Last 24 hours <span><span style="color:#3b82f6">●</span> Temperature &nbsp;<span style="color:#f06a3c">●</span> Target &nbsp;<span style="color:rgba(240,106,60,.5)">■</span> Heating</span></div>${H.length ? this._pxChart([{ pts: cp, col: '#3b82f6', fill: 1 }, { pts: tp, col: '#f06a3c', dash: 1, step: 1 }], 24, '°', bands) : this._pxWait()}</div>`
      + this._pxSched(e)
      + this._pxActs();
  };
  /* ---------- heating schedule (schedule.heating_<zone> + input_boolean.<zone>_follows_schedule) ---------- */
  const DK = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'], DL = ['M', 'T', 'W', 'T', 'F', 'S', 'S'], DN = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const HM = t => String(t || '').slice(0, 5), MIN = t => { const [h, m] = HM(t).split(':').map(Number); return h * 60 + (m || 0); };
  const QF = q => String(Math.floor(q / 4)).padStart(2, '0') + ':' + String(q % 4 * 15).padStart(2, '0');
  const TOPT = (a, z, v) => { let o = '', hit = false; for (let q = a; q <= z; q++) { const t = QF(q); if (t === v) hit = true; o += `<option${t === v ? ' selected' : ''}>${t}</option>`; } return (hit || !v ? '' : `<option selected>${v}</option>`) + o; };
  P._pxSchIds = function (e) { const o = e.entity_id.split('.')[1]; return { sid: 'schedule.heating_' + o, fid: 'input_boolean.' + o + '_follows_schedule', obj: 'heating_' + o }; };
  P._pxSchLoad = function () {
    const p = this._px; if (!p || p.sload || !this._hass.callWS) return; p.sload = 1;
    const ids = this._pxSchIds(this._st(p.id));
    this._hass.callWS({ type: 'schedule/list' }).then(list => { if (!this._px || this._px.id !== p.id) return; const it = (list || []).find(x => x.id === ids.obj);
      if (it) { p.sitem = it; p.sd = JSON.parse(JSON.stringify(DK.reduce((o, d) => (o[d] = (it[d] || []).map(b => ({ from: HM(b.from), to: HM(b.to), temp: (b.data && b.data.temp) != null ? +b.data.temp : 20 })), o), {}))); p.sdirty = false; }
      else p.serr = 'Schedule helper not found'; p.sig = null; this._pxRender(); })
      .catch(() => { if (this._px) { this._px.serr = "Couldn't load the schedule"; this._px.sig = null; this._pxRender(); } });
  };
  P._pxSched = function (e) {
    const ids = this._pxSchIds(e), se = this._st(ids.sid); if (!se) return '';
    const p = this._px, fe = this._st(ids.fid), fol = fe && fe.state === 'on', bk = NUM((this._st('input_number.heating_setback') || {}).state);
    if (p.sday == null) p.sday = (new Date().getDay() + 6) % 7;
    if (!p.sd) { this._pxSchLoad(); return `<div class="pxsec"><div class="lbl">Schedule</div><div class="sch"><div class="sempty">${E(p.serr || 'Loading schedule…')}</div></div></div>`; }
    const day = DK[p.sday], bl = (p.sd[day] || []).slice(), today = (new Date().getDay() + 6) % 7, nowM = new Date().getHours() * 60 + new Date().getMinutes();
    // next change today, for the status line
    let nxt = ''; if (fol) { const tb = (p.sd[DK[today]] || []).slice().sort((a, b) => MIN(a.from) - MIN(b.from)), cur = tb.find(b => MIN(b.from) <= nowM && nowM < MIN(b.to)), up = tb.find(b => MIN(b.from) > nowM);
      nxt = cur ? `${cur.temp}° until ${HM(cur.to) === '24:00' ? 'midnight' : HM(cur.to)}` : up ? `${bk != null ? bk + '° now · ' : ''}${up.temp}° from ${HM(up.from)}` : `${bk != null ? bk + '°' : 'Setback'} for the rest of today`; }
    const sub = !fe ? 'Switch missing: ' + E(ids.fid) : fol ? 'Following schedule · ' + E(nxt) : 'Off — the thermostat keeps its own settings';
    const bar = bl.map(b => { const a = MIN(b.from) / 14.4, z = MIN(b.to) / 14.4; return z > a ? `<i style="left:${a}%;width:${z - a}%"></i>` : ''; }).join('') + (p.sday === today ? `<em style="left:${nowM / 14.4}%"></em>` : '');
    const rows = bl.length ? bl.map((b, i) => `<div class="srow"><select data-sf="${i}">${TOPT(0, 95, b.from)}</select><span class="to">–</span><select data-st="${i}">${TOPT(1, 96, b.to)}</select>
        <div class="stp"><button data-px="stdn" data-i="${i}"><ha-icon icon="mdi:minus"></ha-icon></button><b>${b.temp}°</b><button data-px="stup" data-i="${i}"><ha-icon icon="mdi:plus"></ha-icon></button></div><button class="sdl" data-px="sdel" data-i="${i}" title="Remove"><ha-icon icon="mdi:trash-can-outline"></ha-icon></button></div>`).join('')
      : `<div class="sempty">No heating periods on ${DN[p.sday]} — stays at ${bk != null ? bk + '°' : 'setback'}</div>`;
    return `<div class="pxsec"><div class="lbl">Schedule <span>${E(DN[p.sday])}</span></div><div class="sch">
      <div class="shd"><div><b>Follow schedule</b><span>${sub}</span></div>${fe ? `<button class="tg${fol ? ' on' : ''}" data-px="sfollow" title="Follow schedule"><i></i></button>` : ''}</div>
      <div class="sdays">${DL.map((l, i) => `<button class="${i === p.sday ? 'sel' : ''}${i === today ? ' td' : ''}" data-px="sday" data-d="${i}" title="${DN[i]}">${l}</button>`).join('')}</div>
      <div class="sbar">${bar}</div><div class="sax"><span>00</span><span>06</span><span>12</span><span>18</span><span>24</span></div>
      <div class="srows">${rows}</div>
      <div class="sbtns"><button data-px="sadd"><ha-icon icon="mdi:plus"></ha-icon>Add period</button><button data-px="scopy" data-w="wk"><ha-icon icon="mdi:content-copy"></ha-icon>Copy to weekdays</button><button data-px="scopy" data-w="we"><ha-icon icon="mdi:content-copy"></ha-icon>Weekend</button><button data-px="scopy" data-w="all"><ha-icon icon="mdi:content-copy"></ha-icon>All days</button></div>
      ${bk != null ? `<div class="sbk"><ha-icon icon="mdi:thermometer-low" style="--mdc-icon-size:16px"></ha-icon>Between periods (all zones)<div class="stp"><button data-px="sbk" data-v="-0.5"><ha-icon icon="mdi:minus"></ha-icon></button><b>${bk}°</b><button data-px="sbk" data-v="0.5"><ha-icon icon="mdi:plus"></ha-icon></button></div></div>` : ''}
      ${p.serr ? `<div class="serr">${E(p.serr)}</div>` : ''}
      ${p.sdirty ? `<div class="sbtns"><button class="pri" data-px="ssave"><ha-icon icon="mdi:content-save-outline"></ha-icon>${p.ssaving ? 'Saving…' : 'Save schedule'}</button><button data-px="sundo">Discard changes</button></div>` : ''}
    </div></div>`;
  };
  P._pxSchSave = function () {
    const p = this._px, it = p && p.sitem; if (!it) return;
    const out = {}; let bad = '';
    DK.forEach((d, i) => { const bl = (p.sd[d] || []).map(b => ({ from: b.from + ':00', to: b.to + ':00', data: { temp: b.temp } })).sort((a, b) => MIN(a.from) - MIN(b.from));
      bl.forEach((b, j) => { if (MIN(b.to) <= MIN(b.from)) bad = bad || `${DN[i]} ${HM(b.from)}: end must be after start`; if (j && MIN(b.from) < MIN(bl[j - 1].to)) bad = bad || `${DN[i]}: periods overlap at ${HM(b.from)}`; });
      out[d] = bl; });
    if (bad) { p.serr = bad; p.sig = null; return this._pxRender(); }
    p.ssaving = 1; p.serr = null; p.sig = null; this._pxRender();
    this._hass.callWS(Object.assign({ type: 'schedule/update', schedule_id: it.id, name: it.name }, { icon: it.icon || 'mdi:calendar-clock' }, out))
      .then(r => { if (!this._px) return; this._px.sitem = r || it; this._px.sdirty = false; this._px.ssaving = 0; this._px.sig = null; this._pxRender(); })
      .catch(err => { if (!this._px) return; this._px.ssaving = 0; this._px.serr = "Couldn't save: " + ((err && err.message) || 'error'); this._px.sig = null; this._pxRender(); });
  };
  P._pxSchClick = function (act, t) {
    const p = this._px, e = this._st(p.id), ids = this._pxSchIds(e), d = DK[p.sday], bl = p.sd ? p.sd[d] : null, i = +t.dataset.i;
    if (act === 'sday') p.sday = +t.dataset.d;
    else if (act === 'sfollow') this._hass.callService('input_boolean', 'toggle', { entity_id: ids.fid });
    else if (act === 'sbk') { const v = NUM((this._st('input_number.heating_setback') || {}).state); if (v != null) this._hass.callService('input_number', 'set_value', { entity_id: 'input_number.heating_setback', value: Math.min(20, Math.max(10, v + +t.dataset.v)) }); }
    else if (!bl) return;
    else if (act === 'stup' || act === 'stdn') { bl[i].temp = Math.min(28, Math.max(10, bl[i].temp + (act === 'stup' ? .5 : -.5))); p.sdirty = true; }
    else if (act === 'sdel') { bl.splice(i, 1); p.sdirty = true; }
    else if (act === 'sadd') { const last = bl.slice().sort((a, b) => MIN(a.to) - MIN(b.to)).pop(), st = last ? Math.min(MIN(last.to) + 60, 22 * 60) : 7 * 60, en = Math.min(st + 120, 23 * 60 + 45);
      const f = m => String(Math.floor(m / 60)).padStart(2, '0') + ':' + String(m % 60).padStart(2, '0'); bl.push({ from: f(st), to: f(en), temp: last ? last.temp : 20 }); p.sdirty = true; }
    else if (act === 'scopy') { const tg = t.dataset.w === 'wk' ? [0, 1, 2, 3, 4] : t.dataset.w === 'we' ? [5, 6] : [0, 1, 2, 3, 4, 5, 6]; tg.forEach(k => { if (k !== p.sday) p.sd[DK[k]] = JSON.parse(JSON.stringify(bl)); }); p.sdirty = true; p.serr = null; }
    else if (act === 'ssave') return this._pxSchSave();
    else if (act === 'sundo') { p.sd = null; p.sload = 0; p.serr = null; p.sdirty = false; }
    p.sig = null; this._pxRender();
  };
  /* ---------- door / window / motion ---------- */
  P._pxBin = function (e) {
    const a = e.attributes, D = BIN[a.device_class] || ['Sensor', 'On', 'Off', 'mdi:checkbox-blank-circle', 'mdi:checkbox-blank-circle-outline', 'On'];
    const on = e.state === 'on', na = e.state === 'unavailable', H = this._px.h || [], t0 = Date.now() - 86400000;
    const segs = []; let s0 = null; H.forEach(x => { if (x.s === 'on' && s0 == null) s0 = x.t; if (x.s !== 'on' && s0 != null) { segs.push([s0, x.t]); s0 = null; } }); if (s0 != null) segs.push([s0, null]);
    const ev = segs.filter(([x]) => x >= t0 - 1000).reverse(), mot = /motion|occupancy|presence|vibration/.test(a.device_class || '');
    const col = mot ? '#f0a43a' : '#e5484d';
    const tl = segs.map(([x, y]) => { const l = Math.max(0, (x - t0) / 864e5 * 100), r = Math.min(100, ((y || Date.now()) - t0) / 864e5 * 100); return r > 0 ? `<i style="left:${l}%;width:${Math.max(.4, r - l)}%;background:${col}"></i>` : ''; }).join('');
    const stxt = na ? 'Unavailable' : (on ? D[1] : D[2]);
    const g = (k, v) => `<div class="blk"><div class="k">${k}</div><div class="v">${v}</div></div>`;
    const bat = this._pxBatFor(e);
    return this._ph('pxclose', `<span class="pic${on ? ' red' : ''}" style="${on && mot ? 'background:#f0a43a' : ''}"><ha-icon icon="${on ? D[3] : D[4]}"></ha-icon></span>`, D[0], this._pxNm(e), E(stxt) + (e.last_changed ? ' · ' + AGO(e.last_changed) : ''))
      + `<div class="pxst${on ? ' on' : ''}" style="${on && mot ? 'background:rgba(240,164,58,.14)' : ''}"><div class="ic" style="${on && mot ? 'background:#f0a43a' : ''}"><ha-icon icon="${on ? D[3] : D[4]}"></ha-icon></div><div><b style="${on && mot ? 'color:#d97706' : ''}">${E(stxt)}</b><span>${na ? '' : 'Since ' + DAYT(e.last_changed) + ' (' + AGO(e.last_changed) + ')'}</span></div></div>`
      + `<div class="pxg">${g(mot ? 'Events today' : 'Opened today', H.length ? ev.length : '—')}${g('Last ' + D[5].toLowerCase(), ev.length ? AGO(ev[0][0]) : H.length ? 'Not in 24h' : '—')}${bat != null ? g('Battery', bat + '%') : ''}</div>`
      + `<div class="pxsec"><div class="lbl">Last 24 hours</div>${H.length ? `<div class="pxtl">${tl}</div>${this._pxAxis(24)}` : this._pxWait()}</div>`
      + (ev.length ? `<div class="pxsec"><div class="lbl">Activity</div><div class="pxev">${ev.slice(0, 20).map(([x, y]) => `<div><i style="background:${col}"></i><b>${D[5]}</b> ${DAYT(x)}<span>${y ? 'for ' + DUR(y - x) : 'now'}</span></div>`).join('')}</div></div>` : '')
      + this._pxActs();
  };
  P._pxBatFor = function (e) {
    const base = e.entity_id.split('.')[1].replace(/_(contact|motion|occupancy|door|window|opening|sensor)$/, '');
    const b = this._hass.states['sensor.' + base + '_battery'] || this._hass.states['sensor.' + e.entity_id.split('.')[1] + '_battery'];
    return b && NUM(b.state) != null ? Math.round(NUM(b.state)) : null;
  };
  /* ---------- battery / numeric sensor ---------- */
  P._pxNum = function (e, bat) {
    const a = e.attributes, v = NUM(e.state), u = a.unit_of_measurement || '', H = this._px.h || [], hrs = this._px.hrs || (bat ? 168 : 24);
    const pts = H.map(x => [x.t, NUM(x.s)]).filter(x => x[1] != null); if (pts.length) pts.push([Date.now(), v]);
    const col = bat ? (v < 20 ? '#e5484d' : v < 50 ? '#f0a43a' : '#22a06b') : '#3b82f6';
    const vals = pts.map(x => x[1]), mn = vals.length ? Math.min(...vals) : null, mx = vals.length ? Math.max(...vals) : null;
    const fmt = x => x == null ? '—' : (Math.abs(x) < 100 && x % 1 ? Math.round(x * 10) / 10 : Math.round(x).toLocaleString('en-GB')), su = /^[a-z]{3,}$/i.test(u) ? ' ' + u : u;
    let left = null; if (bat && pts.length > 1) { const [tA, vA] = pts[0], drop = vA - v, days = (Date.now() - tA) / 864e5; if (drop > 0.5 && days > 0.5) left = v / (drop / days); }
    const g = (k, val) => `<div class="blk"><div class="k">${k}</div><div class="v">${val}</div></div>`;
    const ic = bat ? 'mdi:battery' + (v >= 95 ? '' : v < 10 ? '-outline' : '-' + Math.max(10, Math.round(v / 10) * 10)) : (a.icon || 'mdi:gauge');
    return this._ph('pxclose', `<span class="pic" style="color:${col}"><ha-icon icon="${E(ic)}"></ha-icon></span>`, bat ? 'Battery' : E(({ steps: 'Activity', bpm: 'Heart rate', kcal: 'Calories', kg: 'Body' })[u] || (a.device_class ? a.device_class.replace(/_/g, ' ').replace(/^./, c => c.toUpperCase()) : 'Sensor')), this._pxNm(e, bat ? /\s*battery(\s*level)?$/i : null), 'Updated ' + AGO(e.last_updated))
      + `<div class="pxbig"><b style="color:${bat ? col : 'var(--text)'}">${fmt(v)}</b><small>${E(u)}</small></div>` + (bat ? `<div class="pxbar"><i style="width:${Math.max(0, Math.min(100, v))}%;background:${col}"></i></div>` : '')
      + `<div class="pxg">${bat ? g('Status', v < 20 ? 'Replace soon' : v < 50 ? 'OK' : 'Good') + g('Estimated life', left == null ? (H.length ? 'Steady' : '—') : left > 365 ? 'Over a year' : left > 60 ? Math.round(left / 30) + ' months' : Math.round(left) + ' days') : g('Lowest', fmt(mn) + E(su)) + g('Highest', fmt(mx) + E(su))}${g(hrs > 48 ? '7 days ago' : '24h ago', pts.length ? fmt(pts[0][1]) + E(su) : '—')}</div>`
      + `<div class="pxsec"><div class="lbl">${hrs > 48 ? 'Last 7 days' : 'Last 24 hours'}</div>${H.length ? this._pxChart([{ pts, col, fill: 1 }], hrs, bat ? '%' : '') : this._pxWait()}</div>`
      + this._pxActs();
  };
  /* ---------- interaction ---------- */
  P._pxClick = function (ev, ov) {
    const path = ev.composedPath(), t = path.find(n => n.dataset && (n.dataset.px || n.dataset.act)), p = this._px;
    if (path[0] === ov) return this._pxClose();
    if (!t || !p) return;
    const act = t.dataset.px || t.dataset.act, id = p.id, h = this._hass;
    if (act === 'pxclose') this._pxClose();
    else if (act === 'more') { this._pxClose(); oMore.call(this, id); }
    else if (act === 'ltog') h.callService('light', 'toggle', { entity_id: id });
    else if (act === 'hs') h.callService('light', 'turn_on', { entity_id: id, hs_color: [+t.dataset.h, +t.dataset.s] });
    else if (act === 'cup' || act === 'cdn') { this._heatStep(id, act === 'cup' ? 1 : -1); p.sig = null; this._pxRender(); }
    else if (act === 'mode') h.callService('climate', 'set_hvac_mode', { entity_id: id, hvac_mode: t.dataset.m });
    else if (act === 'preset') h.callService('climate', 'set_preset_mode', { entity_id: id, preset_mode: t.dataset.m });
    else if (/^s(day|follow|bk|tup|tdn|del|add|copy|save|undo)$/.test(act)) this._pxSchClick(act, t);
  };
  P._pxInput = function (v) {
    if (!v || !this._px) return; this._px.hold = Date.now();
    if (v.dataset.pxb) { const e = this._st(this._px.id), rgb = e && e.attributes.rgb_color ? `rgb(${e.attributes.rgb_color.join(',')})` : '#f5a623'; v.style.background = `linear-gradient(90deg,${rgb} ${v.value}%,var(--card2) ${v.value}%)`; const b = this.shadowRoot.querySelector('#pxpop .pxbig b'); if (b) b.textContent = v.value + '%'; }
    if (v.dataset.pxct) { const s = v.parentNode.querySelector('.lbl span'); if (s) s.textContent = v.value + 'K'; }
  };
  P._pxChange = function (v) {
    if (!v || !this._px) return; this._px.hold = Date.now();
    if (v.dataset.pxb) this._hass.callService('light', 'turn_on', { entity_id: this._px.id, brightness_pct: +v.value });
    if (v.dataset.pxct) this._hass.callService('light', 'turn_on', { entity_id: this._px.id, color_temp_kelvin: +v.value });
    if ((v.dataset.sf || v.dataset.st) && this._px.sd && /^\d\d:\d\d$/.test(v.value)) { const p = this._px, b = p.sd[DK[p.sday]][+(v.dataset.sf || v.dataset.st)]; if (b) { b[v.dataset.sf ? 'from' : 'to'] = v.value.slice(0, 5); p.sdirty = true; p.serr = null; p.sig = null; this._pxRender(); } }
  };
  /* shared pop-up host used by the lights, security and energy pages */
  if (!customElements.get('home-popup-host')) customElements.define('home-popup-host', class extends Base {
    setConfig(c) { super.setConfig(Object.assign({ weather: 'weather.none' }, c)); }
    connectedCallback() {}
    disconnectedCallback() { if (this._built) { this._camClose(); this._pinClose(); } }
    _subscribe() {} _fetchPop() {} _fetchCal() {} _fetchTfl() {} _dbWatch() {}
    _fetchEnergy() { if (this._enOpen) super._fetchEnergy(); }
    _build() {
      this._built = true;
      const s = this.attachShadow({ mode: 'open' }), ov = (id, pid, st) => `<div class="ov" id="${id}" data-act="closebg"><div class="pop" id="${pid}"${st ? ` style="${st}"` : ''}></div></div>`; if (window.__hpcIosOn && window.__hpcIosIcons) window.__hpcIosIcons(this, s);
      s.innerHTML = `<style>${window.__HPC_CSS || ''}</style><style>${window.__HPC_CSS2 || ''}</style><style>:host{position:absolute;inset:0;z-index:6;pointer-events:none;display:block}@media (max-width:760px){:host{position:fixed !important}}.hroot{position:absolute;inset:0}.ov.open{pointer-events:auto}</style><div class="hroot">
        ${['wxov', 'calov', 'clkov', 'tflov', 'alov', 'pplov', 'vacov'].map(id => `<div class="ov" id="${id}"></div>`).join('')}
        ${ov('carov', 'carpop')}${ov('enov', 'enpop')}<div class="ov camov" id="camov" data-act="closebg"><div class="pop" id="campop"></div></div>${ov('pinov', 'pinpop', 'width:min(92%,360px)')}</div>`;
      this._$ = id => s.getElementById(id);
      s.addEventListener('click', e => this._click(e));
    }
    _tick() {}
    _update() {
      if (!this._built || !this._hass) return;
      if (this._camOn) this._camMotion();
      if (this._carOpen) { const k = this._cars[this._carIdx || 0] || {}, sg = JSON.stringify([window.__HPC_HVSIG(this), Object.keys(k).map(x => { const e = typeof k[x] === 'string' && this._st(k[x]); return e && [e.state, e.last_updated]; })]);
        if (sg !== this._carSg) { this._carSg = sg; this._renderCarPop(); } }
    }
    open(kind, i) {
      if (kind === 'cam') this._camOpen(i);
      else if (kind === 'car') { this._carIdx = i || 0; this._carOpen = true; this._carSg = null; this._renderCarPop(); this._$('carov').classList.add('open'); }
      else if (kind === 'en') { this._enOpen = true; this._renderEnergyPop(); this._$('enov').classList.add('open'); this._fetchEnergy(); }
      else if (kind === 'pin') this._pinShow(i);
    }
  });
});
