/* home-lights-card — room-by-room lights page, matches home-panel-card styling */
const HLC_CSS = `.lr{position:relative;background:var(--bg);min-height:calc(100vh - var(--header-height,56px));padding:18px 18px 28px;box-sizing:border-box}
.lh{display:flex;align-items:center;gap:12px;margin:0 4px 16px}.lh h1{font-size:28px;font-weight:700;letter-spacing:-.02em;margin:0;line-height:1.1}.lh .c{font-size:14px;color:var(--sub);font-weight:500}
.ab{border:0;border-radius:999px;padding:8px 14px;font:inherit;font-size:13px;font-weight:600;background:var(--card);color:var(--text);cursor:pointer;display:inline-flex;align-items:center;gap:6px;flex:0 0 auto}.ab ha-icon{--mdc-icon-size:16px}.ab.on{background:var(--accent);color:#fff}.lh .ab{margin-left:auto}
.rooms{columns:4 290px;column-gap:16px}
.room{break-inside:avoid;display:inline-block;width:100%;margin-bottom:18px}
.rh{display:flex;align-items:center;gap:8px;margin:0 2px 8px;min-height:30px}.rh .ri{color:var(--sub);--mdc-icon-size:18px;flex:0 0 auto}.rh .rn{font-size:15px;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.rh .rc{font-size:12px;color:var(--sub);white-space:nowrap}
.rh .ab{margin-left:auto;padding:5px 11px;font-size:12px;background:var(--card2)}.rh .ab.on{background:var(--accent)}
.rt{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}
.rt.tl4{grid-template-columns:repeat(4,minmax(0,1fr));gap:8px}.rt .vt{display:flex;flex-direction:column;align-items:center;text-align:center;gap:7px;padding:13px 6px 11px;min-width:0;cursor:pointer;position:relative;overflow:hidden}
.rt .vt .msh{width:46px;height:46px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:rgba(var(--rgb),.2);color:rgb(var(--rgb))}.rt .vt .msh ha-icon{--mdc-icon-size:22px}
.rt .vt .n{font-size:12px;font-weight:700;line-height:1.2;max-width:100%;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;overflow-wrap:anywhere;min-height:2.4em;display:-webkit-box}.rt .vt .s{font-size:11px;color:var(--sub);margin-top:-4px;white-space:nowrap}.rt .vt.na{opacity:.5}
.rt .vt .br{position:absolute;left:0;bottom:0;height:3px;background:rgb(var(--rgb));opacity:.75}
.rt .tile{height:108px;box-sizing:border-box;display:flex;flex-direction:column;justify-content:space-between;padding:10px 12px;min-width:0}
.rt .tile .ic{width:30px;height:30px;flex:0 0 auto}.rt .tile .ic ha-icon{--mdc-icon-size:17px}.rt .tile .tx{min-width:0}
@media (min-width:601px) and (max-width:1000px){.rooms{columns:2 240px}.rt.tl4{grid-template-columns:repeat(3,minmax(0,1fr))}}
.rt .tile .n{margin-top:0;font-size:13px}.rt .tile .s{font-size:11px;margin-top:1px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.rt .tile.na{opacity:.5}`;
const hlcEsc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
class HomeLightsCard extends HTMLElement {
  setConfig(c) {
    if (!c || !Array.isArray(c.rooms)) throw new Error('home-lights-card: "rooms" is required');
    this._c = Object.assign({ title: 'Lights', sun: 'sun.sun' }, c); this._sig = null;
  }
  getCardSize() { return 12; }
  set hass(h) {
    this._hass = h;
    if (!this._root) { this._build(); window.__hpcFit(this, this._root, 1280, 0); }
    this._host.hass = h;
    const md = this._c.dark_mode || 'sun', sn = h.states[this._c.sun], td = !!(h.themes && h.themes.darkMode);
    this.classList.toggle('dark', md === 'dark' || (md === 'sun' ? (sn ? sn.state === 'below_horizon' : td) : md !== 'light' && td));
    const sig = JSON.stringify(this._all().map(id => { const e = h.states[id]; return e && [e.state, e.attributes.brightness, e.attributes.rgb_color]; }));
    if (sig !== this._sig) { this._sig = sig; this._render(); }
  }
  _all() { return this._c.rooms.flatMap(r => (r.lights || []).map(l => l.entity)); }
  _build() {
    const s = this.attachShadow({ mode: 'open' });
    s.innerHTML = `<style>${window.__HPC_CSS || ''}</style><style>${HLC_CSS}</style><div class="lr" id="lr"></div><home-popup-host id="host" style="position:fixed;inset:0;z-index:9"></home-popup-host>`;
    this._root = s.getElementById('lr'); this._host = s.getElementById('host'); this._host.setConfig({ sun: this._c.sun, dark_mode: this._c.dark_mode });
    s.addEventListener('click', e => this._click(e));
    s.addEventListener('pointerdown', e => { const t = e.composedPath().find(n => n.dataset && n.dataset.light); if (!t) return;
      this._held = false; clearTimeout(this._holdT); this._holdT = setTimeout(() => { this._held = true; this._host._more(t.dataset.light); }, 550); });
    ['pointerup', 'pointerleave', 'pointercancel'].forEach(ev => s.addEventListener(ev, () => clearTimeout(this._holdT)));
  }
  _fire(id) { this.dispatchEvent(new CustomEvent('hass-more-info', { detail: { entityId: id }, bubbles: true, composed: true })); }
  _render() {
    const h = this._hass, st = id => h.states[id], isOn = id => (st(id) || {}).state === 'on';
    const total = this._all().filter(isOn).length;
    const rooms = this._c.rooms.map((r, ri) => {
      const ids = (r.lights || []).map(l => l.entity), n = ids.filter(isOn).length, av = ids.filter(id => st(id) && st(id).state !== 'unavailable').length;
      const tiles = (r.lights || []).map(l => {
        const e = st(l.entity), on = e && e.state === 'on', b = e && e.attributes.brightness, na = !e || e.state === 'unavailable';
        const s = !e ? 'Missing' : na ? 'Unavailable' : on ? (b ? `On · ${Math.round(b / 2.55)}%` : 'On') : 'Off';
        if (this._c.layout === 'tiles') { const pct = on ? (b ? Math.max(1, Math.round(b / 2.55)) : 100) : 0, rgb = on ? (e.attributes.rgb_color ? e.attributes.rgb_color.join(',') : '245,166,35') : '138,143,152';
          return `<div class="card vt${na ? ' na' : ''}" data-light="${hlcEsc(l.entity)}" style="--rgb:${rgb}"><span class="msh"><ha-icon icon="${hlcEsc(l.icon || (on ? 'mdi:lightbulb' : 'mdi:lightbulb-outline'))}"></ha-icon></span><div class="n">${hlcEsc(l.name || (e && e.attributes.friendly_name) || l.entity)}</div><div class="s">${!e ? 'Missing' : na ? 'Unavailable' : on ? (b ? pct + '%' : 'On') : 'Off'}</div>${on ? `<i class="br" style="width:${pct}%"></i>` : ''}</div>`; }
        return `<div class="card tile${on ? ' on' : ''}${na ? ' na' : ''}" data-light="${hlcEsc(l.entity)}"><div class="ic"><ha-icon icon="${hlcEsc(l.icon || 'mdi:lightbulb-outline')}"></ha-icon></div>
          <div class="tx"><div class="n">${hlcEsc(l.name || (e && e.attributes.friendly_name) || l.entity)}</div><div class="s">${s}</div></div></div>`;
      }).join('');
      return `<div class="room"><div class="rh">${r.icon ? `<ha-icon class="ri" icon="${hlcEsc(r.icon)}"></ha-icon>` : ''}<span class="rn">${hlcEsc(r.name)}</span>
        <span class="rc">${n ? n + ' on' : ''}</span>${av > 1 || n ? `<button class="ab${n ? ' on' : ''}" data-act="room" data-i="${ri}">${n ? 'Turn off' : 'Turn on'}</button>` : ''}</div>
        <div class="rt${this._c.layout === 'tiles' ? ' tl4' : ''}">${tiles}</div></div>`;
    }).join('');
    this._root.innerHTML = `<div class="lh">${window.__hpcBack(this._c)}<h1>${hlcEsc(this._c.title)}</h1><span class="c">${total ? total + (total === 1 ? ' light on' : ' lights on') : 'All off'}</span>
      ${total ? '<button class="ab on" data-act="alloff"><ha-icon icon="mdi:lightbulb-group-off-outline"></ha-icon>All off</button>' : ''}</div><div class="rooms">${rooms}</div>`;
  }
  _click(e) {
    const path = e.composedPath(), h = this._hass; if (path.includes(this._host)) return;
    const lt = path.find(n => n.dataset && n.dataset.light);
    if (lt) { const x = h.states[lt.dataset.light]; if (!this._held && x && x.state !== 'unavailable') h.callService('light', 'toggle', { entity_id: lt.dataset.light }); this._held = false; return; }
    const t = path.find(n => n.dataset && n.dataset.act); if (!t) return;
    if (t.dataset.act === 'hback') { window.__hpcGoBack(); return; }
    const ok = id => h.states[id] && h.states[id].state !== 'unavailable';
    if (t.dataset.act === 'alloff') { const on = this._all().filter(id => (h.states[id] || {}).state === 'on'); if (on.length) h.callService('light', 'turn_off', { entity_id: on }); }
    else if (t.dataset.act === 'room') {
      const ids = (this._c.rooms[+t.dataset.i].lights || []).map(l => l.entity).filter(ok), on = ids.filter(id => h.states[id].state === 'on');
      if (on.length) h.callService('light', 'turn_off', { entity_id: on }); else if (ids.length) h.callService('light', 'turn_on', { entity_id: ids });
    }
  }
}
customElements.whenDefined('home-popup-host').then(() => { if (!customElements.get('home-lights-card')) customElements.define('home-lights-card', HomeLightsCard); });
window.customCards = window.customCards || [];
window.customCards.push({ type: 'home-lights-card', name: 'Home Lights Card', description: 'Room-by-room lights page' });
