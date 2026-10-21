/* home-music-card — full-page Now Playing / Spotify / Speakers, reusing home-panel-card's music player */
const HMC_CSS = `.mroot{padding:0}.mroot .npov{border-radius:0}.npov .x{display:none}.npwrap{height:90%}.mroot .ov.npov{position:absolute}
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
      s.innerHTML = `<style>${window.__HPC_CSS || ''}</style><style>${window.__HPC_CSS2 || ''}</style><style>${HMC_CSS}</style><div class="root mroot"><div class="ov npov" id="npov"></div></div>`;
      this._$ = id => s.getElementById(id);
      s.addEventListener('click', e => this._click(e));
      s.addEventListener('input', e => { const v = e.composedPath()[0]; if (v && v.dataset && v.dataset.search) { clearTimeout(this._sT); const q = v.value; this._sT = setTimeout(() => { if (q.trim().length >= 2 || !q.trim()) this._search(q); }, 600); } });
      s.addEventListener('keydown', e => { const v = e.composedPath()[0]; if (v && v.dataset && v.dataset.search && e.key === 'Enter') { clearTimeout(this._sT); v.blur(); this._search(v.value); } });
      s.addEventListener('change', e => this._chg(e.composedPath()[0]));
    }
    _tick() { if (this._npOpen) this._renderNp(); }
    _update() {
      if (!this._built || !this._hass) return;
      this._npPick();
      if (!this._npOpen) this._npOpenUp(); else this._renderNp();
    }
    _click(e) {
      const t = e.composedPath().find(n => n.dataset && n.dataset.act);
      if (t && (t.dataset.act === 'closenp' || t.dataset.act === 'closebg')) return;
      super._click(e);
    }
  }
  customElements.define('home-music-card', HomeMusicCard);
});
window.customCards = window.customCards || [];
window.customCards.push({ type: 'home-music-card', name: 'Home Music Card', description: 'Full-page music player' });
