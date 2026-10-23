/* home-security-card — cameras + Ring alarm page, matches home-panel-card styling */
/* the shared pop-up host is defined in hpc-pops.js */
const HSC_CSS = `.sr{position:relative;background:var(--bg);height:calc(100vh - var(--header-height,56px));min-height:640px;padding:18px 18px 18px;box-sizing:border-box;display:flex;flex-direction:column}
.sh{display:flex;align-items:center;gap:12px;margin:0 4px 14px}.sh h1{font-size:28px;font-weight:700;letter-spacing:-.02em;margin:0;line-height:1.1}.sh .c{font-size:14px;color:var(--sub);font-weight:500}.sh .c.warn{color:#d97706;font-weight:600}
.sg{display:flex;flex-direction:column;gap:14px;flex:1;min-height:0}
.scams{padding:14px 16px 16px;flex:1;min-height:0;display:flex;flex-direction:column}.scams .head{margin-bottom:10px}
.sgrid{flex:1;min-height:0;grid-auto-rows:minmax(0,1fr);display:grid;grid-template-columns:repeat(var(--cols,4),minmax(0,1fr));gap:12px}[hidden]{display:none !important}
.sgrid .cam{min-height:0}.sgrid .cam.big{grid-column:span 2;grid-row:span 2}
.sgrid .cam .nm{font-size:13px;left:12px;bottom:10px}.sgrid .cam.big .nm{font-size:15px}
.sgrid .cam .live{position:absolute;left:10px;top:10px;background:#e5484d;color:#fff;font-size:10px;font-weight:700;letter-spacing:.05em;padding:3px 8px;border-radius:999px}
.sside{flex:0 0 auto;display:grid;grid-template-columns:1.15fr 1fr 1.5fr .95fr;gap:14px;align-items:stretch}.sside>*{min-width:0}
.sside .alarm{cursor:default;justify-content:space-between}.sside .alarm .aseg button{padding:12px 4px;font-size:15px}.sside .alarm .aseg button ha-icon{--mdc-icon-size:20px}
.sside .alarm .as{font-size:20px}.sside .alarm .ash{width:44px;height:44px}.sside .alarm .ash ha-icon{--mdc-icon-size:24px}
.sbox{padding:12px 14px}.sbox .lbl{display:block;margin-bottom:8px}.sbox .agrid{grid-template-columns:1fr;margin-top:0;gap:8px}.sbox .asr{padding:8px 12px;cursor:pointer}
.sbox .asr ha-icon{--mdc-icon-size:20px}.sbox .agrid.two{grid-template-columns:1fr 1fr}.sbox .asr>div{min-width:0}.sbox .asr .nm,.sbox .asr .ds{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.slast{font-size:12px;color:var(--sub);margin-top:2px}
@media (max-width:1000px){.sside{grid-template-columns:1fr 1fr}.sgrid{--cols:3 !important}}
@media (min-width:601px) and (max-width:760px){.sr{height:auto;min-height:0}.sgrid{--cols:2 !important;grid-auto-rows:auto;flex:0 0 auto}.sgrid .cam{aspect-ratio:16/9}.sgrid .cam.big{grid-row:auto;grid-column:auto}.scams{flex:0 0 auto}}
@media (max-width:600px){.sr{height:auto;min-height:0;padding:12px}.sh h1{font-size:24px}.sh{flex-wrap:wrap;gap:4px 10px}.sgrid{--cols:2 !important;grid-auto-rows:120px;flex:0 0 auto}.sgrid .cam.big{grid-row:span 2}.sside{grid-template-columns:1fr}.scams{flex:0 0 auto}}`;
const hscEsc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const hscAgo = t => { const s = (Date.now() - new Date(t)) / 1000; if (!isFinite(s)) return ''; if (s < 60) return 'now'; if (s < 3600) return Math.floor(s / 60) + 'm ago'; if (s < 86400) return Math.floor(s / 3600) + 'h ago'; return Math.floor(s / 86400) + 'd ago'; };
const hscHm = d => { d = new Date(d); if (isNaN(d)) return ''; const h = d.getHours(), m = d.getMinutes(); return (h % 12 || 12) + ':' + String(m).padStart(2, '0') + ' ' + (h < 12 ? 'am' : 'pm'); };
class HomeSecurityCard extends HTMLElement {
  setConfig(c) {
    if (!c || !c.alarm) throw new Error('home-security-card: "alarm" is required');
    this._c = Object.assign({ title: 'Security', sun: 'sun.sun', cameras: [] }, c);
  }
  getCardSize() { return 12; }
  connectedCallback() { this._camT = setInterval(() => this._snap(), (this._c && this._c.refresh || 10) * 1000); this._minT = setInterval(() => { this._sig = null; this._update(); }, 60000); if (this._root) this._snap(); }
  disconnectedCallback() { clearInterval(this._camT); clearInterval(this._minT); }
  set hass(h) {
    this._hass = h;
    if (!this._root) this._build();
    this._host.hass = h;
    const md = this._c.dark_mode || 'sun', sn = h.states[this._c.sun], td = !!(h.themes && h.themes.darkMode);
    this.classList.toggle('dark', md === 'dark' || (md === 'sun' ? (sn ? sn.state === 'below_horizon' : td) : md !== 'light' && td));
    this._update();
  }
  _st(id) { return this._hass && this._hass.states[id]; }
  _build() {
    const s = this.attachShadow({ mode: 'open' });
    const N = this._c.cameras.length, feat = this._c.featured !== undefined ? this._c.featured : N >= 3 && N % 2 === 1, cols = feat ? (N - 1) / 2 + 2 : N <= 8 ? Math.max(1, Math.ceil(N / 2)) : Math.ceil(N / 3);
    const cams = this._c.cameras.map((c, i) => `<div class="cam${i === 0 && feat ? ' big' : ''}" data-act="cam" data-i="${i}"><img id="ci${i}" alt=""><div class="off" id="co${i}" hidden>Unavailable</div>
      <span class="live" id="cl${i}" hidden>MOTION</span><span class="ago" id="ca${i}" hidden></span><span class="nm">${hscEsc(c.name || c.entity)}</span><span class="play"><ha-icon icon="mdi:play"></ha-icon></span></div>`).join('');
    const u = this._c.cameras_logo === undefined ? 'https://brands.home-assistant.io/unifiprotect/icon.png' : this._c.cameras_logo;
    s.innerHTML = `<style>${window.__HPC_CSS || ''}</style><style>${HSC_CSS}</style><div class="sr">
      <div class="sh">${window.__hpcBack(this._c)}<h1>${hscEsc(this._c.title)}</h1><span class="c" id="sum"></span></div>
      <div class="sg"><div class="card scams"><div class="head"><span class="chd">${u ? `<img src="${hscEsc(u)}" alt="" onerror="this.style.display='none'">` : ''}<span class="lbl">Cameras</span></span></div><div class="sgrid" style="--cols:${cols}">${cams}</div></div>
        <div class="sside" id="side"><div class="card alarm" id="alarm"></div></div></div>
      <home-popup-host id="host"></home-popup-host></div>`;
    this._root = s; this._$ = id => s.getElementById(id);
    const H = this._$('host'); H.setConfig({ cameras: this._c.cameras, cameras_logo: this._c.cameras_logo, alarm: this._c.alarm, sun: this._c.sun, dark_mode: this._c.dark_mode }); this._host = H;
    s.addEventListener('click', e => this._click(e));
    this._snap();
  }
  _snap() {
    if (!this._root || !this._hass) return;
    this._c.cameras.forEach((c, i) => {
      const e = this._st(c.entity); if (!e || !e.attributes.entity_picture || e.state === 'unavailable') return;
      const url = e.attributes.entity_picture + (e.attributes.entity_picture.includes('?') ? '&' : '?') + '_=' + Date.now();
      const im = new Image(); im.onload = () => { const t = this._$('ci' + i); if (t) t.src = url; }; im.src = url;
    });
  }
  _alInfo() {
    const A = this._c.alarm, e = this._st(A.entity); if (!e) return null;
    const a = e.attributes, s = e.state;
    const M = { disarmed: ['Disarmed', 'mdi:shield-off-outline', 'disarmed'], armed_home: ['Armed · Home', 'mdi:shield-home', 'home'], armed_away: ['Armed · Away', 'mdi:shield-lock', 'away'],
      armed_night: ['Armed · Night', 'mdi:shield-moon', 'home'], arming: ['Arming' + (a.exitSecondsLeft ? ' · ' + a.exitSecondsLeft + 's' : '…'), 'mdi:shield-sync', 'wait'],
      pending: ['Entry delay' + (a.entrySecondsLeft ? ' · ' + a.entrySecondsLeft + 's' : ''), 'mdi:shield-alert', 'wait'], triggered: ['ALARM TRIGGERED', 'mdi:alarm-light', 'trig'], unavailable: ['Unavailable', 'mdi:shield-off', 'disarmed'] };
    const [label, icon, cls] = M[s] || [s, 'mdi:shield', 'disarmed'];
    const nm = x => x.name || ((this._st(x.entity) || { attributes: {} }).attributes.friendly_name || x.entity).trim();
    const open = (A.doors || []).filter(x => (this._st(x.entity) || {}).state === 'on').map(nm);
    const moving = (A.motion || []).filter(x => (this._st(x.entity) || {}).state === 'on').map(nm);
    const low = (A.batteries || []).map(id => this._st(id)).filter(b => b && !isNaN(parseFloat(b.state)) && parseFloat(b.state) <= (A.low_battery || 25));
    const mode = s === 'armed_away' ? 'away' : s === 'armed_home' || s === 'armed_night' ? 'home' : s === 'disarmed' ? 'disarm' : '';
    return { a, s, label, icon, cls, open, moving, low, mode, nm };
  }
  _update() {
    if (!this._root || !this._hass) return;
    const A = this._c.alarm, ids = [A.entity, ...(A.doors || []).map(x => x.entity), ...(A.motion || []).map(x => x.entity), ...(A.batteries || []), ...this._c.cameras.flatMap(c => [c.entity, c.motion])];
    const sig = JSON.stringify(ids.map(id => { const e = id && this._st(id); return e && [e.state, e.last_changed, id === A.entity ? e.attributes : 0]; })) + (this._conf || '');
    if (sig === this._sig) return; this._sig = sig;
    this._c.cameras.forEach((c, i) => {
      const e = this._st(c.entity), mo = c.motion && this._st(c.motion), a = this._$('ca' + i), l = this._$('cl' + i);
      this._$('co' + i).hidden = !!(e && e.state !== 'unavailable');
      const on = mo && mo.state === 'on'; l.hidden = !on;
      if (mo && mo.state !== 'unavailable' && !on) { a.hidden = false; a.textContent = hscAgo(mo.last_changed); } else a.hidden = true;
    });
    const i = this._alInfo(), el = this._$('alarm'), sum = this._$('sum');
    if (!i) { el.className = 'card alarm'; el.innerHTML = '<div class="lbl">Alarm</div><div class="ad">Alarm not found</div>'; return; }
    const warn = i.open.length || i.s === 'triggered';
    sum.className = 'c' + (warn ? ' warn' : ''); sum.textContent = i.label + (i.open.length ? ' · ' + i.open.length + ' open' : '') + (i.moving.length ? ' · motion in ' + i.moving.join(', ') : '');
    el.className = 'card alarm st-' + i.cls;
    const u = A.logo === undefined ? 'https://brands.home-assistant.io/ring/icon.png' : A.logo;
    const who = (by, t) => by && by !== 'Unknown' ? hscEsc(by) + (t ? ' · ' + (new Date(t).toDateString() === new Date().toDateString() ? hscHm(t) : new Date(t).getDate() + '/' + (new Date(t).getMonth() + 1) + ' ' + hscHm(t)) : '') : '';
    const last = i.s === 'disarmed' ? who(i.a.DisarmedBy, i.a.DisarmedTime) : who(i.a.ArmedBy, i.a.ArmedTime);
    const b = (m, ic, t) => `<button class="${i.mode === m ? 'sel' : ''}${this._conf === m ? ' conf' : ''}" data-act="arm" data-m="${m}"><ha-icon icon="${ic}"></ha-icon>${this._conf === m ? 'Tap to confirm' : t}</button>`;
    el.innerHTML = `<div class="at"><div class="ash"><ha-icon icon="${i.icon}"></ha-icon></div><div class="ax"><div class="lbl">${hscEsc(A.name || 'Alarm')}</div><div class="as">${hscEsc(i.label)}</div>
      ${last ? `<div class="slast">${i.s === 'disarmed' ? 'Disarmed by ' : 'Armed by '}${last}</div>` : ''}</div>${u ? `<img src="${hscEsc(u)}" alt="" style="width:34px;height:34px;object-fit:contain;align-self:flex-start" onerror="this.style.display='none'">` : ''}</div>
      <div class="aseg">${b('disarm', 'mdi:shield-off-outline', 'Off')}${b('home', 'mdi:home', 'Home')}${b('away', 'mdi:walk', 'Away')}</div>`;
    const row = (x, kind) => { const e = this._st(x.entity), on = e && e.state === 'on';
      const ds = !e || e.state === 'unavailable' ? 'Unavailable' : (kind === 'door' ? (on ? 'Open' : 'Closed') : (on ? 'Motion now' : 'Clear')) + (e.last_changed ? ' · ' + hscAgo(e.last_changed) : '');
      return `<div class="asr${on ? ' on' : ''}" data-act="more" data-id="${hscEsc(x.entity)}"><ha-icon icon="${kind === 'door' ? (on ? 'mdi:door-open' : 'mdi:door-closed') : (on ? 'mdi:motion-sensor' : 'mdi:motion-sensor-off')}"></ha-icon><div><div class="nm">${hscEsc(i.nm(x))}</div><div class="ds">${hscEsc(ds)}</div></div></div>`; };
    const box = (t, inner, two) => `<div class="card sbox"><span class="lbl">${t}</span><div class="agrid${two ? ' two' : ''}">${inner}</div></div>`;
    const lists = ((A.doors || []).length ? box('Doors' + (i.open.length ? ' · ' + i.open.length + ' open' : ''), A.doors.map(x => row(x, 'door')).join('')) : '')
      + ((A.motion || []).length ? box('Motion', A.motion.map(x => row(x, 'motion')).join(''), 1) : '')
      + box(i.low.length ? 'Low batteries' : 'Batteries', i.low.length ? i.low.map(b => `<div class="asr lowb" data-act="more" data-id="${hscEsc(b.entity_id)}"><ha-icon icon="mdi:battery-low"></ha-icon><div><div class="nm">${hscEsc((b.attributes.friendly_name || b.entity_id).replace(/\s*Battery$/i, '').trim())}</div><div class="ds">${Math.round(parseFloat(b.state))}% battery</div></div></div>`).join('') : '<div class="asr"><ha-icon icon="mdi:battery-check" style="color:#22a06b"></ha-icon><div><div class="nm">All OK</div><div class="ds">No low batteries</div></div></div>');
    const side = this._$('side'); while (side.children.length > 1) side.lastElementChild.remove(); side.insertAdjacentHTML('beforeend', lists);
  }
  _arm(m) {
    const i = this._alInfo(); if (!i || (m === i.mode && this._conf !== m)) return;
    const needCode = i.a.code_format != null && (m === 'disarm' || i.a.code_arm_required);
    if (needCode) { this._conf = null; this._sig = null; this._update(); this._host.open('pin', m); return; }
    if (m === 'disarm' && this._conf !== 'disarm') { this._conf = 'disarm'; clearTimeout(this._confT); this._confT = setTimeout(() => { this._conf = null; this._sig = null; this._update(); }, 4000); this._sig = null; this._update(); return; }
    this._conf = null; clearTimeout(this._confT); this._sig = null;
    this._hass.callService('alarm_control_panel', m === 'disarm' ? 'alarm_disarm' : m === 'home' ? 'alarm_arm_home' : 'alarm_arm_away', { entity_id: this._c.alarm.entity });
    this._update();
  }
  _click(e) {
    const path = e.composedPath(); if (path.includes(this._host)) return;
    const t = path.find(n => n.dataset && n.dataset.act); if (!t) return;
    const act = t.dataset.act;
    if (act === 'hback') { window.__hpcGoBack(); return; }
    if (act === 'more') this._host._more(t.dataset.id);
    else if (act === 'cam') this._host.open('cam', +t.dataset.i);
    else if (act === 'arm') this._arm(t.dataset.m);
  }
}
customElements.whenDefined('home-popup-host').then(() => { if (!customElements.get('home-security-card')) customElements.define('home-security-card', HomeSecurityCard); });
window.customCards = window.customCards || [];
window.customCards.push({ type: 'home-security-card', name: 'Home Security Card', description: 'Cameras and alarm page' });
