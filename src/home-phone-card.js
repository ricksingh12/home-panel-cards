/* home-phone-card — the home panel re-laid out as a single scrolling column for a phone */
const HPH_CSS = `:host{display:block}
.root.ph{height:auto;min-height:calc(100vh - var(--header-height,56px));overflow:visible;padding:12px 12px calc(24px + env(safe-area-inset-bottom));gap:12px}
.ph .phs{display:flex;flex-direction:column;gap:12px}
.ph .pht{display:flex;align-items:flex-end;justify-content:space-between;padding:6px 4px 2px}.ph .pht h1{margin:0;font-size:28px;font-weight:700;letter-spacing:-.02em;line-height:1.1}.ph .pht .s{font-size:13px;color:var(--sub);font-weight:500;margin-top:2px}
.ph .sec{font-size:12px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--sub);margin:10px 6px -4px}
.ph .clock{padding:12px 14px;gap:14px}.ph .clock .clocksvg{width:64px;height:64px;flex:0 0 auto}.ph .clock .date .num{font-size:34px}
.ph .two{display:grid;grid-template-columns:1fr 1fr;gap:12px}.ph .two>*{min-width:0}
.ph .card.wx{height:300px;flex:0 0 auto}
.ph .cams{flex:0 0 auto;padding:12px}.ph .camgrid{grid-template-columns:1fr 1fr;grid-template-rows:200px 120px;gap:8px}.ph .camgrid .cam.big{grid-column:1 / -1;grid-row:auto}.ph .camgrid .cam{min-height:0}
.ph .alarm{flex:0 0 auto}.ph .alarm .aseg button{padding:12px 4px}
.ph .heat{display:grid;grid-template-columns:1fr 1fr;gap:12px}.ph .heat .ht2{height:150px;box-sizing:border-box}
.ph .lights{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}.ph .lights .tile{height:96px;box-sizing:border-box;display:flex;flex-direction:column;justify-content:space-between;padding:10px 12px;min-width:0}.ph .lights .tile .ic{width:30px;height:30px}.ph .lights .tile .ic ha-icon{--mdc-icon-size:17px}.ph .lights .tile .n{margin-top:0;font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.ph .lights .tile .s{font-size:11px;margin-top:1px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.ph .music{flex:0 0 auto}.ph .music.big .mart{width:84px;height:84px}.ph .music.art{min-height:150px}
.ph .card.en{height:172px;flex:0 0 auto;padding:12px 14px}.ph .vac,.ph .ppl,.ph .carc{flex:0 0 auto}
.ph .carc.multi{padding:10px 14px;gap:8px}.ph .crow+.crow{padding-top:8px}
.ph .cal,.ph .tfl{flex:0 0 auto}`;
customElements.whenDefined('home-panel-card').then(() => {
  if (customElements.get('home-phone-card')) return;
  const Base = customElements.get('home-panel-card');
  const E = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  class HomePhoneCard extends Base {
    getCardSize() { return 30; }
    _build() {
      this._built = true;
      const c = this._c, s = this.attachShadow({ mode: 'open' }), sec = t => `<div class="sec">${t}</div>`;
      const camLogo = c.cameras_logo === undefined ? 'https://brands.home-assistant.io/unifiprotect/icon.png' : c.cameras_logo;
      s.innerHTML = `<style>${window.__HPC_CSS || ''}</style><style>${window.__HPC_CSS2 || ''}</style><style>${HPH_CSS}</style><div class="root ph"><div class="phs">
        <div class="pht"><div><h1 id="phg"></h1><div class="s">${E(c.location)}</div></div></div>
        <div class="card clock" data-act="clk">${this._clockSvg()}<div class="date"><div class="top"><span class="d" id="dow"></span><span id="mon"></span></div><div class="num" id="dnum"></div></div></div>
        ${c.alarm ? '<div class="card alarm" id="alarm" data-act="alarm"></div>' : ''}
        ${(c.people || []).length ? '<div class="card ppl" id="ppl"></div>' : ''}
        ${c.cameras.length ? `${sec('Cameras')}<div class="card cams"><div class="head"><span class="chd">${camLogo ? `<img src="${E(camLogo)}" alt="" onerror="this.style.display='none'">` : ''}<span class="lbl">Cameras</span></span>${c.cameras_path ? '<button class="pill" data-act="allcams">All cameras ›</button>' : ''}</div><div class="camgrid" id="camgrid"></div></div>` : ''}
        ${c.heating.length ? `${sec('Heating')}<div class="heat" id="heat"></div>` : ''}
        ${c.lights.length ? `${sec('Lights')}<div class="lights" id="lights"></div>` : '<div id="lights" hidden></div>'}
        ${c.media_players.length ? `${sec('Music')}<div class="card music big" id="music" data-act="np"></div>` : ''}
        ${this._cars.length ? `${sec(this._cars.length > 1 ? 'Cars' : 'Car')}<div class="card carc${this._cars.length > 1 ? ' multi' : ''}" id="car"${this._cars.length > 1 ? '' : ' data-act="car" data-i="0"'}></div>` : ''}
        ${c.energy || c.vacuum ? sec('Home') : ''}${c.energy ? '<div class="card en" id="en" data-act="en"></div>' : ''}${c.vacuum ? '<div class="card vac" id="vac" data-act="vac"></div>' : ''}
        ${sec('Today')}<div class="card wx" id="wx" data-act="wx"></div>
        ${c.calendars.length ? '<div class="card cal" id="cal" data-act="cal"></div>' : ''}
        ${c.tfl_lines.length ? '<div class="card tfl" id="tfl" data-act="tfl"></div>' : ''}
      </div>
      <div class="ov" id="wxov" data-act="closebg"><div class="pop" id="wxpop"></div></div>
      <div class="ov npov" id="npov"></div>
      <div class="ov" id="calov" data-act="closebg"><div class="pop wide" id="calpop"></div></div>
      <div class="ov" id="clkov" data-act="closebg"><div class="pop" id="clkpop"></div></div>
      <div class="ov" id="tflov" data-act="closebg"><div class="pop" id="tflpop"></div></div>
      <div class="ov" id="carov" data-act="closebg"><div class="pop" id="carpop"></div></div>
      <div class="ov" id="enov" data-act="closebg"><div class="pop" id="enpop"></div></div>
      <div class="ov" id="alov" data-act="closebg"><div class="pop apop" id="alpop"></div></div>
      <div class="ov" id="vacov" data-act="closebg"><div class="pop" id="vacpop"></div></div>
      <div class="ov camov" id="camov" data-act="closebg"><div class="pop" id="campop"></div></div>
      <div class="ov" id="pplov" data-act="closebg"><div class="pop" id="pplpop"></div></div>
      <div class="ov" id="pinov" data-act="closebg"><div class="pop" id="pinpop"></div></div>
      <div class="ov dbov" id="dbov"></div></div>`;
      this._$ = id => s.getElementById(id);
      if (c.cameras.length) this._buildCams(); else this._buildCams = () => {};
      s.addEventListener('click', e => this._click(e));
      s.addEventListener('input', e => { const v = e.composedPath()[0]; if (v && v.dataset && v.dataset.search) { clearTimeout(this._sT); const q = v.value; this._sT = setTimeout(() => { if (q.trim().length >= 2 || !q.trim()) this._search(q); }, 600); } });
      s.addEventListener('keydown', e => { const v = e.composedPath()[0]; if (v && v.dataset && v.dataset.search && e.key === 'Enter') { clearTimeout(this._sT); v.blur(); this._search(v.value); } });
      s.addEventListener('change', e => this._chg(e.composedPath()[0]));
      s.addEventListener('pointerdown', e => this._down(e));
      s.addEventListener('pointerup', e => this._up(e));
      s.addEventListener('pointerleave', () => clearTimeout(this._holdT));
      s.addEventListener('pointercancel', () => clearTimeout(this._holdT));
      this._tick();
    }
    _tick() {
      super._tick();
      const g = this._$ && this._$('phg'); if (!g) return;
      const h = new Date().getHours(), t = h < 5 ? 'Good night' : h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening';
      const n = this._c.name || (this._hass && this._hass.user && this._hass.user.name ? this._hass.user.name.split(' ')[0] : '');
      const txt = t + (n ? ', ' + n : ''); if (g.textContent !== txt) g.textContent = txt;
    }
    _updateCams() { if (this._c.cameras.length) super._updateCams(); }
    _refreshCams() { if (this._c.cameras.length) super._refreshCams(); }
  }
  customElements.define('home-phone-card', HomePhoneCard);
});
window.customCards = window.customCards || [];
window.customCards.push({ type: 'home-phone-card', name: 'Home Phone Card', description: 'Home panel laid out for a phone' });
