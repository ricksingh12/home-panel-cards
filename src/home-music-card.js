/* home-music-card — full-page Now Playing / Spotify / Speakers, reusing home-panel-card's music player */
const HMC_CSS = `.mroot .npwrap{width:min(1440px,96%);gap:20px}.mroot .npwrap .npw{flex:0 0 30%}.mroot .nppanel{flex:0 0 28%}
@media (min-width:601px){.mroot .npwrap .npw .art{width:min(94%,380px,50vh)}.mroot .npw .tt{font-size:22px;margin-top:20px}.mroot .npw .ctl{gap:30px}.mroot .npw .ctl ha-icon{--mdc-icon-size:34px}.mroot .npw .ctl .pp ha-icon{--mdc-icon-size:56px}}
.spkp{flex:1 1 0;min-width:0;height:100%;background:rgba(0,0,0,.3);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border-radius:24px;display:flex;flex-direction:column;overflow:hidden;color:#fff;position:relative;z-index:1}
.spkh{display:flex;align-items:baseline;gap:8px;padding:16px 18px 6px}.spkh b{font-size:17px;font-weight:600}.spkh span{font-size:12px;opacity:.65}
.spkl{flex:1;overflow-y:auto;padding:4px 10px 12px;scrollbar-width:none;display:flex;flex-direction:column;gap:6px}.spkl::-webkit-scrollbar{display:none}
.sr{display:grid;grid-template-columns:54px minmax(0,1fr) auto;grid-template-rows:auto auto;column-gap:12px;row-gap:6px;align-items:center;padding:9px 10px;border-radius:16px;background:rgba(255,255,255,.05);border:1.5px solid transparent}
.sr.on{background:rgba(255,255,255,.11)}.sr.sel{border-color:rgba(255,255,255,.55)}.sr.na{opacity:.45}
.sr .sa{grid-row:1 / span 2;width:54px;height:54px;border-radius:12px;background:rgba(255,255,255,.1);display:flex;align-items:center;justify-content:center;overflow:hidden;cursor:pointer;position:relative}
.sr .sa img{width:100%;height:100%;object-fit:cover}.sr .sa ha-icon{--mdc-icon-size:26px;opacity:.75}
.sr .sa .eq{position:absolute;right:4px;bottom:4px;width:16px;height:16px;border-radius:50%;background:#1db954;display:flex;align-items:center;justify-content:center}.sr .sa .eq ha-icon{--mdc-icon-size:11px;opacity:1;color:#fff}
.sr .si{min-width:0;cursor:pointer}.sr .sn{font-size:14.5px;font-weight:600;display:flex;align-items:center;gap:6px;min-width:0}.sr .sn span{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.sr .sn small{flex:0 0 auto;font-size:10.5px;font-weight:600;background:rgba(255,255,255,.14);border-radius:999px;padding:1px 7px;display:inline-flex;align-items:center;gap:3px}.sr .sn small ha-icon{--mdc-icon-size:12px}
.sr .ss{font-size:12px;opacity:.72;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-top:2px}
.sr .sc{display:flex;align-items:center;gap:2px}.sr .sc button,.sr .sv button{border:0;background:none;color:inherit;width:34px;height:34px;border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;padding:0}
.sr .sc button ha-icon{--mdc-icon-size:22px}.sr .sc .pp{background:rgba(255,255,255,.9);color:#111;width:38px;height:38px}.sr .sc .pp ha-icon{--mdc-icon-size:22px}.sr .sc.dis{opacity:.3;pointer-events:none}
.sr .sv{grid-column:2 / span 2;display:flex;align-items:center;gap:8px}.sr .sv button ha-icon{--mdc-icon-size:18px}.sr .sv input{flex:1;min-width:0;accent-color:#fff}.sr .sv em{font-style:normal;font-size:11px;opacity:.7;width:32px;text-align:right}
.sr .sb{height:3px;border-radius:2px;background:rgba(255,255,255,.18);margin-top:6px;overflow:hidden}.sr .sb i{display:block;height:100%;background:#fff;border-radius:2px}
:host(:not(.dark)) .spkp{background:rgba(255,255,255,.66);color:#14181d;box-shadow:0 10px 40px rgba(0,0,0,.08)}:host(:not(.dark)) .sr{background:rgba(0,0,0,.035)}:host(:not(.dark)) .sr.on{background:rgba(0,0,0,.07)}:host(:not(.dark)) .sr.sel{border-color:rgba(20,24,29,.5)}
:host(:not(.dark)) .sr .sa{background:rgba(0,0,0,.06)}:host(:not(.dark)) .sr .sn small{background:rgba(0,0,0,.07)}:host(:not(.dark)) .sr .sc .pp{background:#14181d;color:#fff}:host(:not(.dark)) .sr .sv input{accent-color:#14181d}:host(:not(.dark)) .sr .sb{background:rgba(0,0,0,.1)}:host(:not(.dark)) .sr .sb i{background:#14181d}
@media (max-width:1000px){.mroot .npwrap{flex-wrap:wrap;height:auto;overflow-y:auto;max-height:100%}.mroot .npwrap .npw{flex:1 1 100%}.spkp,.mroot .nppanel{flex:1 1 320px;height:520px}}
@media (max-width:600px){.mroot .npwrap{flex-direction:column;flex-wrap:nowrap;align-items:stretch}.mroot .npwrap .npw{flex:0 0 auto;width:100%}.spkp{flex:0 0 auto;width:100%;height:auto}.spkl{overflow:visible}.mroot .nppanel{flex:0 0 auto;width:100%}}
@media (min-width:601px){.mroot .npwrap .npw .art{width:min(66%,520px,64vh);border-radius:22px}}.mroot{padding:0}.mroot .npov{border-radius:0}.npov .x{display:none}.npwrap{height:90%}.mroot .ov.npov{position:absolute}
@media (max-width:600px){.root.mroot{height:auto;min-height:0;overflow:visible}.mroot .ov.npov{position:relative;min-height:calc(100vh - var(--header-height,56px));overflow:hidden;padding:12px 0 24px}.mroot .npwrap{height:auto;max-height:none;overflow:visible}.mroot .nppanel{height:70vh}}
:host(:not(.dark)) .ov.npov{background:#eef1f5}:host(:not(.dark)) .npov::after{background:rgba(255,255,255,.5)}:host(:not(.dark)) .npbg{opacity:.5}:host(:not(.dark)) .npw{color:#14181d}:host(:not(.dark)) .npw .art{box-shadow:0 18px 44px rgba(0,0,0,.18)}:host(:not(.dark)) .npw .art.idle{background:rgba(0,0,0,.06)}:host(:not(.dark)) .prog .b{background:rgba(0,0,0,.12)}:host(:not(.dark)) .prog .b i{background:#14181d}:host(:not(.dark)) .ctl button{color:#14181d}:host(:not(.dark)) .npvol button{background:rgba(0,0,0,.07);color:#14181d}:host(:not(.dark)) .npvol input{accent-color:#14181d}:host(:not(.dark)) .nppanel{background:rgba(255,255,255,.66);color:#14181d;box-shadow:0 10px 40px rgba(0,0,0,.08)}:host(:not(.dark)) .nptabs button{background:rgba(0,0,0,.05);color:rgba(20,24,29,.7)}:host(:not(.dark)) .nptabs button.sel{background:#14181d;color:#fff}:host(:not(.dark)) .nphead .bk{background:rgba(0,0,0,.07);color:#14181d}:host(:not(.dark)) .li:active{background:rgba(0,0,0,.05)}:host(:not(.dark)) .li img,:host(:not(.dark)) .li .ph{background:rgba(0,0,0,.06)}:host(:not(.dark)) .sp.on{background:rgba(0,0,0,.05)}:host(:not(.dark)) .sp .chk{color:#14181d}:host(:not(.dark)) .sp.on .chk{color:#1db954}:host(:not(.dark)) .sx .t small{background:rgba(0,0,0,.08)}:host(:not(.dark)) .vol input{accent-color:#14181d}:host(:not(.dark)) .npsrch{background:rgba(0,0,0,.06)}:host(:not(.dark)) .npsrch input{color:#14181d}:host(:not(.dark)) .npsrch input::placeholder{color:rgba(20,24,29,.45)}:host(:not(.dark)) .npsrch .clr{color:#14181d}:host(:not(.dark)) .sorts button{background:rgba(0,0,0,.06);color:rgba(20,24,29,.8)}:host(:not(.dark)) .sorts button.sel{background:#14181d;color:#fff}`;
customElements.whenDefined('home-panel-card').then(() => {
  if (customElements.get('home-music-card')) return;
  const Base = customElements.get('home-panel-card');
  class HomeMusicCard extends Base {
    setConfig(c) {
      if (!c || !(c.media_players || []).length) throw new Error('home-music-card: "media_players" is required');
      super.setConfig(Object.assign({ weather: 'weather.none' }, c));
    }
    getCardSize() { return 12; }
    connectedCallback() { this._tickT = setInterval(() => this._tick(), 1000); }
    disconnectedCallback() { clearInterval(this._tickT); }
    _subscribe() {}
    _fetchPop() {}
    _fetchCal() {}
    _fetchTfl() {}
    _fetchEnergy() {}
    _dbWatch() {}
    _build() {
      this._built = true;
      const s = this.attachShadow({ mode: 'open' });
      s.innerHTML = `<style>${window.__HPC_CSS || ''}</style><style>${window.__HPC_CSS2 || ''}</style><style>${HMC_CSS}</style><div class="root mroot">${window.__hpcBack(this._c, 'float')}<div class="ov npov" id="npov"></div></div>`;
      this._$ = id => s.getElementById(id);
      s.addEventListener('click', e => this._click(e));
      s.addEventListener('input', e => { const v = e.composedPath()[0]; if (v && v.dataset && v.dataset.search) { clearTimeout(this._sT); const q = v.value; this._sT = setTimeout(() => { if (q.trim().length >= 2 || !q.trim()) this._search(q); }, 600); } });
      s.addEventListener('keydown', e => { const v = e.composedPath()[0]; if (v && v.dataset && v.dataset.search && e.key === 'Enter') { clearTimeout(this._sT); v.blur(); this._search(v.value); } });
      s.addEventListener('change', e => this._chg(e.composedPath()[0]));
      s.addEventListener('input', e => { const v = e.composedPath()[0]; if (v && v.dataset && v.dataset.volb && v.nextElementSibling) v.nextElementSibling.textContent = v.value + '%'; });
    }
    _tick() { if (this._npOpen) { this._renderNp(); this._spkProg(); } }
    _npPick() {
      // on the Music page the big player follows the speaker picked in the list
      const e = this._sel && this._st(this._sel);
      if (e) { this._npEntity = e.entity_id; return [e.entity_id, e.state, e.attributes.media_title, e.attributes.entity_picture]; }
      return super._npPick();
    }
    _npOpenUp() {
      super._npOpenUp();
      const w = this.shadowRoot.querySelector('.npwrap'), main = this._$('npmain');
      if (w && main && !this._$('spkp')) { const d = document.createElement('div'); d.className = 'spkp'; d.id = 'spkp'; d.innerHTML = '<div class="spkh"><b>Speakers</b><span id="spkn"></span></div><div class="spkl" id="spkl"></div>'; main.after(d); }
      this._spkSig2 = null; this._renderSpk();
    }
    _spkAll() { return this._c.media_players.map(id => this._st(id)).filter(Boolean); }
    _renderSpk() {
      const box = this._$('spkl'); if (!box) return;
      const ae = this.shadowRoot.activeElement; if (ae && ae.dataset && ae.dataset.vol) return;
      const all = this._spkAll(), live = x => x.state === 'playing' || x.state === 'paused';
      const sig = JSON.stringify(all.map(x => { const a = x.attributes; return [x.entity_id, x.state, a.media_title, a.media_artist, a.entity_picture, a.volume_level, a.is_volume_muted, a.group_members, a.source]; })) + this._sel + this._npEntity;
      if (sig === this._spkSig2) return; this._spkSig2 = sig;
      const nm = id => { const x = this._st(id); return x ? x.attributes.friendly_name || id : id; };
      const playing = all.filter(x => x.state === 'playing').length;
      this._$('spkn').textContent = playing ? playing + ' playing' : 'Nothing playing';
      box.innerHTML = all.map(x => {
        const a = x.attributes, id = x.entity_id, pl = x.state === 'playing', lv = live(x), na = x.state === 'unavailable' || x.state === 'off';
        const spot = /^media_player\.spotify/.test(id), ctl = lv ? this._ctl(x) : (((a.supported_features || 0) & 16385) ? x : null);
        const g = (a.group_members || []).filter(m => m !== id && this._st(m));
        const st = na ? (x.state === 'off' ? 'Off' : 'Unavailable') : lv ? [a.media_title, a.media_artist].filter(Boolean).join(' · ') || (pl ? 'Playing' : 'Paused') : 'Idle';
        const src = spot && lv && a.source ? ' · on ' + a.source : '';
        const vol = Math.round((a.volume_level || 0) * 100), canVol = ((a.supported_features || 0) & 4) && !na;
        const sel = (this._sel || this._npEntity) === id;
        return `<div class="sr${pl ? ' on' : ''}${sel ? ' sel' : ''}${na ? ' na' : ''}">
          <div class="sa" data-act="ssel" data-id="${id}">${lv && a.entity_picture ? `<img src="${a.entity_picture.replace(/"/g, '&quot;')}" alt="">` : `<ha-icon icon="${spot ? 'mdi:spotify' : 'mdi:speaker'}"></ha-icon>`}${pl ? '<span class="eq"><ha-icon icon="mdi:volume-high"></ha-icon></span>' : ''}</div>
          <div class="si" data-act="ssel" data-id="${id}"><div class="sn"><span>${this._e(a.friendly_name || id)}</span>${g.length ? `<small><ha-icon icon="mdi:link-variant"></ha-icon>${this._e(nm(g[0]))}${g.length > 1 ? ' +' + (g.length - 1) : ''}</small>` : ''}</div>
            <div class="ss">${this._e(st + src)}</div>${lv ? `<div class="sb"><i data-pb="${id}"></i></div>` : ''}</div>
          <div class="sc${ctl && !na ? '' : ' dis'}"><button data-act="smp" data-id="${id}" data-svc="media_previous_track"><ha-icon icon="mdi:skip-previous"></ha-icon></button><button class="pp" data-act="smp" data-id="${id}" data-svc="media_play_pause"><ha-icon icon="${pl ? 'mdi:pause' : 'mdi:play'}"></ha-icon></button><button data-act="smp" data-id="${id}" data-svc="media_next_track"><ha-icon icon="mdi:skip-next"></ha-icon></button></div>
          ${canVol ? `<div class="sv"><button data-act="smute" data-id="${id}" title="Mute"><ha-icon icon="mdi:${a.is_volume_muted || vol === 0 ? 'volume-off' : vol < 50 ? 'volume-medium' : 'volume-high'}"></ha-icon></button><input type="range" min="0" max="100" value="${vol}" data-vol="${id}" data-volb="${id}"><em>${vol}%</em></div>` : ''}
        </div>`; }).join('');
      this._spkProg();
    }
    _e(t) { return String(t ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
    _spkProg() {
      const box = this._$('spkl'); if (!box) return;
      box.querySelectorAll('[data-pb]').forEach(i => { const e = this._st(i.dataset.pb); if (!e) return; const a = e.attributes, dur = a.media_duration || 0; let pos = a.media_position || 0;
        if (e.state === 'playing' && a.media_position_updated_at) pos += (Date.now() - new Date(a.media_position_updated_at)) / 1000; i.style.width = dur ? Math.min(100, pos / dur * 100) + '%' : '0'; });
    }
    _update() {
      if (!this._built || !this._hass) return;
      this._npPick();
      if (!this._npOpen) this._npOpenUp(); else { this._renderNp(); this._renderSpk(); }
    }
    _click(e) {
      const t = e.composedPath().find(n => n.dataset && n.dataset.act);
      if (t && t.dataset.act === 'hback') { window.__hpcGoBack(); return; }
      if (t && (t.dataset.act === 'closenp' || t.dataset.act === 'closebg')) return;
      if (t && t.dataset.act === 'ssel') { const id = t.dataset.id, x = this._st(id); this._sel = id; this._npPref = id; this._npEntity = id; this._npKey = null;
        if (x && !/^media_player\.spotify/.test(id) && this._speakers().some(s => s.entity_id === id)) { const g = (x.attributes.group_members || [id]).filter(m => m !== id && this._st(m)); this._outs = [id, ...g]; this._renderNpPanel(); }
        this._renderNp(); this._renderSpk(); return; }
      if (t && t.dataset.act === 'smp') { const x = this._st(t.dataset.id), c = x && ((x.state === 'playing' || x.state === 'paused') ? this._ctl(x) : x); if (c) this._hass.callService('media_player', t.dataset.svc, { entity_id: c.entity_id }); return; }
      if (t && t.dataset.act === 'smute') { const x = this._st(t.dataset.id); if (x) this._hass.callService('media_player', 'volume_mute', { entity_id: x.entity_id, is_volume_muted: !x.attributes.is_volume_muted }); return; }
      super._click(e);
    }
  }
  customElements.define('home-music-card', HomeMusicCard);
});
window.customCards = window.customCards || [];
window.customCards.push({ type: 'home-music-card', name: 'Home Music Card', description: 'Full-page music player' });
