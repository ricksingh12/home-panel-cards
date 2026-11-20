/* home-intercom-card — talk to any speaker in the house, in the home panel style.
   Hold (or tap) the talk button to record a voice message; it is saved to Home Assistant's media folder as a small WAV
   and played on the chosen speakers (Sonos speakers announce over what they are playing, then resume).
   Or type a message and it is spoken by the configured text-to-speech engine.
   Voice needs a secure (https) page and an admin user, because recording needs the browser microphone and the
   upload goes through Home Assistant's media upload; typed messages work everywhere.
   Config: { title, tts, volume (0..1, for speakers that announce), max_seconds, groups: [{ name, speakers: [{ entity, name, icon }] }] } */
const ICS = `.icr{position:relative;background:var(--bg);min-height:calc(100vh - var(--header-height,56px));padding:18px;box-sizing:border-box;display:flex;flex-direction:column}
.ich{display:flex;align-items:center;gap:12px;margin:0 4px 14px}.ich h1{font-size:28px;font-weight:700;letter-spacing:-.02em;margin:0;line-height:1.1}
.ich .ics{margin-left:auto;font-size:13px;color:var(--sub);font-weight:600;text-align:right}
.icg{flex:1;display:grid;grid-template-columns:minmax(0,1.35fr) minmax(0,1fr);gap:16px;min-height:0}
.icl{padding:16px 18px;display:flex;flex-direction:column;min-height:0;overflow:auto}
.icq{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px}.icq button{border:0;border-radius:999px;padding:8px 14px;font:inherit;font-size:13.5px;font-weight:600;background:var(--card2);color:var(--text);cursor:pointer}
.icq button.on{background:var(--accent);color:#fff}
.icgr{margin-top:8px}.icgr+.icgr{margin-top:16px}.icgr .lbl{display:flex;align-items:center;justify-content:space-between;margin:0 2px 8px}
.icgr .lbl button{border:0;background:none;color:var(--accent);font:inherit;font-size:12px;font-weight:700;cursor:pointer;padding:0;letter-spacing:0;text-transform:none}
.icsp{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:10px}
.icsk{display:flex;align-items:center;gap:10px;padding:11px 12px;border-radius:18px;background:var(--card2);cursor:pointer;min-width:0;border:2px solid transparent;transition:border-color .15s,background .15s;user-select:none}
.icsk .i{width:34px;height:34px;border-radius:50%;flex:0 0 auto;display:flex;align-items:center;justify-content:center;background:rgba(127,127,127,.14);color:var(--sub)}.icsk .i ha-icon{--mdc-icon-size:19px}
.icsk b{display:block;font-size:14px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.icsk span{display:block;font-size:11.5px;color:var(--sub);font-weight:500;margin-top:1px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.icsk>div{min-width:0;flex:1}.icsk .ck{width:20px;height:20px;border-radius:50%;border:2px solid var(--sub);opacity:.5;flex:0 0 auto;display:flex;align-items:center;justify-content:center}
.icsk.on{border-color:var(--accent)}.icsk.on .i{background:var(--accent);color:#fff}.icsk.on .ck{background:var(--accent);border-color:var(--accent);opacity:1}.icsk.on .ck::after{content:'';width:8px;height:4px;border:2px solid #fff;border-top:0;border-right:0;transform:translateY(-1px) rotate(-45deg)}
.icsk.off{opacity:.45;cursor:default}
.icr2{display:flex;flex-direction:column;gap:16px;min-height:0}
.ict{flex:1;padding:22px 20px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;text-align:center;min-height:0}
.icb{position:relative;width:190px;height:190px;border-radius:50%;border:0;background:var(--accent);color:#fff;cursor:pointer;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;font:inherit;box-shadow:0 14px 40px rgba(240,138,36,.35);touch-action:none;user-select:none;-webkit-user-select:none;transition:transform .12s,background .2s}
.icb ha-icon{--mdc-icon-size:64px}.icb b{font-size:15px;font-weight:700}.icb:active{transform:scale(.97)}
.icb.rec{background:#e5484d;box-shadow:0 14px 40px rgba(229,72,77,.4)}.icb.busy{background:var(--sub);box-shadow:none;cursor:default}.icb[disabled]{background:var(--card2);color:var(--sub);box-shadow:none;cursor:default}
.icb .rng{position:absolute;inset:-10px;border-radius:50%;border:4px solid #e5484d;opacity:0;transform:scale(var(--lv,1));transition:transform .08s}
.icb.rec .rng{opacity:.45}
.ictm{font-size:30px;font-weight:700;letter-spacing:-.02em;font-variant-numeric:tabular-nums;min-height:36px}
.ichint{font-size:13.5px;color:var(--sub);font-weight:500;line-height:1.45;max-width:360px}
.iccx{border:0;background:var(--card2);color:var(--text);border-radius:999px;padding:8px 16px;font:inherit;font-size:13px;font-weight:600;cursor:pointer}
.icm{padding:14px 16px;display:flex;flex-direction:column;gap:10px}
.icm .row{display:flex;gap:8px}.icm input{flex:1;min-width:0;border:0;border-radius:14px;padding:12px 14px;font:inherit;font-size:15px;background:var(--card2);color:var(--text);outline:none}
.icm .snd{border:0;border-radius:14px;padding:0 16px;background:var(--accent);color:#fff;font:inherit;font-weight:700;cursor:pointer;display:flex;align-items:center;gap:6px}.icm .snd ha-icon{--mdc-icon-size:18px}.icm .snd[disabled]{background:var(--card2);color:var(--sub);cursor:default}
.icv{display:flex;align-items:center;gap:10px;font-size:13px;color:var(--sub);font-weight:600}.icv input{flex:1;accent-color:var(--accent)}.icv ha-icon{--mdc-icon-size:18px}
.icst{font-size:13px;font-weight:600;min-height:18px;text-align:center}.icst.ok{color:#22a06b}.icst.err{color:#e5484d}
.icre{border:0;background:none;color:var(--accent);font:inherit;font-size:13px;font-weight:700;cursor:pointer;display:inline-flex;align-items:center;gap:5px;padding:0}.icre ha-icon{--mdc-icon-size:17px}
@media (max-width:760px){.icr{padding:12px}.icg{grid-template-columns:minmax(0,1fr)}.icl{overflow:visible}.icsp{grid-template-columns:repeat(2,minmax(0,1fr))}.icb{width:150px;height:150px}.icb ha-icon{--mdc-icon-size:52px}.ich h1{font-size:24px}}`;
const icE = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const IC_ANN = 1048576, IC_RATE = 16000;
/* 16-bit mono PCM WAV from Float32 chunks, resampled to 16 kHz, with a short silent lead-in so speakers do not clip the first word */
const icWav = (chunks, inRate) => {
  const n = chunks.reduce((a, c) => a + c.length, 0), all = new Float32Array(n); let o = 0; chunks.forEach(c => { all.set(c, o); o += c.length; });
  const ratio = inRate / IC_RATE, len = Math.floor(n / ratio), lead = Math.round(IC_RATE * 0.3), tot = lead + len;
  let peak = 0; for (let i = 0; i < n; i++) peak = Math.max(peak, Math.abs(all[i]));
  const gain = peak > 0.02 ? Math.min(4, 0.9 / peak) : 1;          /* gentle normalise so quiet speech is audible */
  const buf = new ArrayBuffer(44 + tot * 2), v = new DataView(buf), w = (p, s) => { for (let i = 0; i < s.length; i++) v.setUint8(p + i, s.charCodeAt(i)); };
  w(0, 'RIFF'); v.setUint32(4, 36 + tot * 2, true); w(8, 'WAVE'); w(12, 'fmt '); v.setUint32(16, 16, true); v.setUint16(20, 1, true); v.setUint16(22, 1, true);
  v.setUint32(24, IC_RATE, true); v.setUint32(28, IC_RATE * 2, true); v.setUint16(32, 2, true); v.setUint16(34, 16, true); w(36, 'data'); v.setUint32(40, tot * 2, true);
  for (let i = 0; i < len; i++) {                                     /* average each output sample's input window (cheap low-pass) */
    const a = Math.floor(i * ratio), b = Math.max(a + 1, Math.floor((i + 1) * ratio)); let s = 0; for (let j = a; j < b && j < n; j++) s += all[j];
    const x = Math.max(-1, Math.min(1, s / (b - a) * gain)); v.setInt16(44 + (lead + i) * 2, x < 0 ? x * 0x8000 : x * 0x7fff, true);
  }
  return new Blob([buf], { type: 'audio/wav' });
};
class HomeIntercomCard extends HTMLElement {
  setConfig(c) {
    this._c = Object.assign({ title: 'Intercom', sun: 'sun.sun', tts: null, volume: 0.5, max_seconds: 30, groups: [] }, c);
    this._all = (this._c.groups || []).flatMap(g => (g.speakers || []).map(s => typeof s === 'string' ? s : s.entity));
    let saved = null; try { saved = JSON.parse(localStorage.getItem('hpc-intercom-sel') || 'null'); } catch (e) {}
    this._sel = new Set((Array.isArray(saved) ? saved : this._grp(0)).filter(id => this._all.includes(id)));   /* first visit: the first group only */
    try { const v = parseFloat(localStorage.getItem('hpc-intercom-vol')); if (isFinite(v)) this._vol = v; } catch (e) {}
    if (this._vol == null) this._vol = this._c.volume;
  }
  getCardSize() { return 10; }
  disconnectedCallback() { this._stopRec(true); }
  set hass(h) {
    this._hass = h;
    if (!this._root) { this._build(); window.__hpcFit && window.__hpcFit(this, this._root.querySelector('.icr'), 1380, 804); window.__hpcSwipe && window.__hpcSwipe(this); }
    const md = this._c.dark_mode || 'sun', sn = h.states[this._c.sun], td = !!(h.themes && h.themes.darkMode);
    const dk = md === 'dark' || (md === 'sun' ? (sn ? sn.state === 'below_horizon' : td) : md !== 'light' && td);
    if (dk !== this._dark) { this._dark = dk; this.classList.toggle('dark', dk); }
    const sig = this._all.map(id => { const e = h.states[id]; return e ? e.state : '-'; }).join('|');
    if (sig !== this._sig) { this._sig = sig; this._renderSpk(); }
  }
  /* why voice cannot be used on this screen, or '' when it can */
  _voiceBlock() {
    if (!window.isSecureContext || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) return 'Voice needs a secure (https) connection to Home Assistant. This screen is on http, so type a message below instead.';
    if (this._hass && this._hass.user && !this._hass.user.is_admin) return 'Voice messages need an administrator login on this screen. You can still type a message below.';
    return '';
  }
  _build() {
    const s = this.attachShadow({ mode: 'open' }); if (this._c.icons === 'ios' && window.__hpcIosIcons) window.__hpcIosIcons(this, s);
    const vb = this._voiceBlock();
    s.innerHTML = `<style>${window.__HPC_CSS || ''}</style><style>${ICS}</style><div class="icr"><div class="ich">${window.__hpcBack ? window.__hpcBack(this._c) : ''}<h1>${icE(this._c.title)}</h1><span class="ics" id="cnt"></span></div>
      <div class="icg"><div class="card icl"><div class="icq" id="q"></div><div id="sp"></div></div>
      <div class="icr2"><div class="card ict"><button class="icb" id="talk" ${vb ? 'disabled' : ''} data-noswipe><span class="rng"></span><ha-icon icon="${vb ? 'mdi:microphone-off' : 'mdi:microphone'}"></ha-icon><b id="tl">${vb ? 'Voice unavailable' : 'Hold to talk'}</b></button>
        <div class="ictm" id="tm"></div><div class="ichint" id="hint">${vb ? icE(vb) : 'Hold the button while you speak and let go to send, or tap once to start and again to send. Speakers go back to their own volume afterwards.'}</div>
        <button class="iccx" id="cx" style="display:none">Cancel</button><div class="icst" id="st"></div><button class="icre" id="again" style="display:none"><ha-icon icon="mdi:replay"></ha-icon>Play last message again</button></div>
      <div class="card icm"><div class="lbl">Type a message</div><div class="row"><input id="msg" type="text" maxlength="300" placeholder="Dinner's ready!" enterkeyhint="send"><button class="snd" id="say"><ha-icon icon="mdi:send"></ha-icon>Say</button></div>
        <div class="icv"><ha-icon icon="mdi:volume-medium"></ha-icon><span>Message volume</span><input id="vol" type="range" min="0.1" max="1" step="0.05" value="${this._vol}" data-noswipe><span id="vv">${Math.round(this._vol * 100)}%</span></div></div></div></div></div>`;
    this._root = s; this._$ = id => s.getElementById(id);
    s.addEventListener('click', e => this._click(e));
    const b = this._$('talk');
    b.addEventListener('pointerdown', e => { if (b.disabled || this._busy) return; e.preventDefault(); try { b.setPointerCapture(e.pointerId); } catch (x) {}
      if (this._rec) { this._finish(); return; } this._downAt = Date.now(); this._startRec(); });
    const up = () => { if (!this._rec || !this._downAt) return; const held = Date.now() - this._downAt; this._downAt = 0; if (held > 600) this._finish(); else this._setTalk('rec', 'Tap to send'); };
    b.addEventListener('pointerup', up); b.addEventListener('pointercancel', up);
    b.addEventListener('contextmenu', e => e.preventDefault());
    this._$('msg').addEventListener('keydown', e => { if (e.key === 'Enter') this._say(); });
    this._$('vol').addEventListener('input', e => { this._vol = parseFloat(e.target.value); this._$('vv').textContent = Math.round(this._vol * 100) + '%'; try { localStorage.setItem('hpc-intercom-vol', String(this._vol)); } catch (x) {} });
  }
  _click(e) {
    const t = e.composedPath().find(n => n.dataset && n.dataset.act); const id = e.composedPath().find(n => n.id) || {};
    if (id.id === 'say') return this._say(); if (id.id === 'cx') return this._stopRec(true); if (id.id === 'again') return this._replay();
    if (!t) return; const a = t.dataset.act;
    if (a === 'hback') return window.__hpcGoBack && window.__hpcGoBack();
    if (a === 'spk') { const k = t.dataset.id; if (!this._ok(k)) return; this._sel.has(k) ? this._sel.delete(k) : this._sel.add(k); }
    else if (a === 'q') { const g = t.dataset.g; this._sel = new Set(g === 'none' ? [] : g === 'all' ? this._all.filter(x => this._ok(x)) : this._grp(+g).filter(x => this._ok(x))); }
    else if (a === 'gall') { const ids = this._grp(+t.dataset.g).filter(x => this._ok(x)), on = ids.every(x => this._sel.has(x)); ids.forEach(x => on ? this._sel.delete(x) : this._sel.add(x)); }
    else return;
    try { localStorage.setItem('hpc-intercom-sel', JSON.stringify([...this._sel])); } catch (x) {}
    this._renderSpk();
  }
  _grp(i) { const g = (this._c.groups || [])[i]; return g ? (g.speakers || []).map(s => typeof s === 'string' ? s : s.entity) : []; }
  _ok(id) { const e = this._hass && this._hass.states[id]; return !!e && e.state !== 'unavailable'; }
  _renderSpk() {
    if (!this._root || !this._hass) return; const h = this._hass, gs = this._c.groups || [];
    const live = [...this._sel].filter(id => this._ok(id));
    const allOk = this._all.filter(x => this._ok(x)), same = (a, b) => a.length === b.length && a.every(x => b.includes(x));
    this._$('q').innerHTML = [['all', 'Everywhere'], ...gs.map((g, i) => [String(i), g.name || 'Group ' + (i + 1)]), ['none', 'None']].map(([k, n]) => {
      const ids = k === 'all' ? allOk : k === 'none' ? [] : this._grp(+k).filter(x => this._ok(x)); return `<button data-act="q" data-g="${k}" class="${same(live, ids) && (k === 'none' || ids.length) ? 'on' : ''}">${icE(n)}</button>`; }).join('');
    this._$('sp').innerHTML = gs.map((g, gi) => {
      const sp = (g.speakers || []).map(x => typeof x === 'string' ? { entity: x } : x), ids = sp.map(x => x.entity), on = ids.filter(x => this._ok(x)).every(x => this._sel.has(x));
      return `<div class="icgr"><div class="lbl">${icE(g.name || '')}<button data-act="gall" data-g="${gi}">${on ? 'Clear' : 'Select all'}</button></div><div class="icsp">${sp.map(x => {
        const e = h.states[x.entity], ok = this._ok(x.entity), sel = ok && this._sel.has(x.entity), nm = x.name || (e && e.attributes.friendly_name) || x.entity;
        const st = !e ? 'Not found' : !ok ? 'Offline' : e.state === 'playing' ? (e.attributes.media_title ? 'Playing · ' + e.attributes.media_title : 'Playing') : e.state === 'off' ? 'Standby' : 'Ready';
        return `<div class="icsk${sel ? ' on' : ''}${ok ? '' : ' off'}" data-act="spk" data-id="${icE(x.entity)}"><span class="i"><ha-icon icon="${icE(x.icon || 'mdi:speaker')}"></ha-icon></span><div><b>${icE(nm)}</b><span>${icE(st)}</span></div><span class="ck"></span></div>`; }).join('')}</div></div>`; }).join('');
    this._$('cnt').textContent = live.length ? `${live.length} speaker${live.length === 1 ? '' : 's'} selected` : 'No speakers selected';
  }
  _setTalk(cls, label) { const b = this._$('talk'); b.className = 'icb' + (cls ? ' ' + cls : ''); this._$('tl').textContent = label; }
  _status(txt, cls) { const s = this._$('st'); s.textContent = txt || ''; s.className = 'icst' + (cls ? ' ' + cls : ''); clearTimeout(this._stT); if (txt && cls) this._stT = setTimeout(() => { s.textContent = ''; s.className = 'icst'; }, 8000); }
  async _startRec() {
    if (!this._targets().length) { this._downAt = 0; return this._status('Choose at least one speaker first', 'err'); }
    this._status('');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true, channelCount: 1 } });
      const ctx = new (window.AudioContext || window.webkitAudioContext)(); if (ctx.state === 'suspended') await ctx.resume();
      const src = ctx.createMediaStreamSource(stream), proc = ctx.createScriptProcessor(4096, 1, 1), chunks = [];
      proc.onaudioprocess = ev => { const d = ev.inputBuffer.getChannelData(0); chunks.push(new Float32Array(d)); let p = 0; for (let i = 0; i < d.length; i += 16) p = Math.max(p, Math.abs(d[i])); this._$('talk').style.setProperty('--lv', (1 + Math.min(1, p * 3) * 0.12).toFixed(3)); };
      src.connect(proc); proc.connect(ctx.destination);
      this._rec = { stream, ctx, src, proc, chunks, t0: Date.now() };
      this._setTalk('rec', this._downAt ? 'Release to send' : 'Tap to send'); this._$('cx').style.display = '';
      this._tick = setInterval(() => { const s = (Date.now() - this._rec.t0) / 1000; this._$('tm').textContent = `0:${String(Math.floor(s)).padStart(2, '0')}`; if (s >= this._c.max_seconds) this._finish(); }, 200);
    } catch (e) {
      this._downAt = 0; this._rec = null; this._setTalk('', 'Hold to talk');
      this._status(e && e.name === 'NotAllowedError' ? 'Microphone access was blocked. Allow it for this page in the browser or app settings.' : 'Could not start the microphone: ' + (e && e.message || e), 'err');
    }
  }
  _stopRec(cancel) {
    const r = this._rec; if (!r) return null; this._rec = null; clearInterval(this._tick);
    try { r.proc.disconnect(); r.src.disconnect(); } catch (e) {} r.stream.getTracks().forEach(t => t.stop()); const rate = r.ctx.sampleRate; r.ctx.close().catch(() => {});
    if (this._root) { this._$('tm').textContent = ''; this._$('cx').style.display = 'none'; this._$('talk').style.removeProperty('--lv'); if (cancel) this._setTalk('', 'Hold to talk'); }
    return cancel ? null : { chunks: r.chunks, rate, secs: (Date.now() - r.t0) / 1000 };
  }
  async _finish() {
    const r = this._stopRec(false); if (!r) return;
    if (r.secs < 0.6) { this._setTalk('', 'Hold to talk'); return this._status('Too short. Hold the button while you speak.', 'err'); }
    this._busy = true; this._setTalk('busy', 'Sending…');
    try {
      const blob = icWav(r.chunks, r.rate), name = `intercom-${new Date().toISOString().replace(/[-:]/g, '').replace(/\..*/, '')}.wav`;
      const fd = new FormData(); fd.append('media_content_id', 'media-source://media_source/local'); fd.append('file', new File([blob], name, { type: 'audio/wav' }));
      const res = await this._hass.fetchWithAuth('/api/media_source/local_source/upload', { method: 'POST', body: fd });
      if (!res.ok) throw new Error(res.status === 401 ? 'this login is not allowed to upload media' : 'upload failed (' + res.status + ')');
      const js = await res.json(); this._last = js.media_content_id || 'media-source://media_source/local/' + name;
      this._lastSecs = r.secs + 0.3; await this._play(this._last, 'Voice message', this._lastSecs); this._cleanup(name);
    } catch (e) { this._status('Could not send: ' + (e && e.message || e), 'err'); }
    this._busy = false; this._setTalk('', 'Hold to talk');
  }
  _targets() { return [...this._sel].filter(id => this._ok(id)); }
  async _play(mcid, what, secs) {
    const ids = this._targets(); if (!ids.length) { this._status('Choose at least one speaker first', 'err'); return false; }
    const h = this._hass, ann = ids.filter(id => (h.states[id].attributes.supported_features || 0) & IC_ANN), plain = ids.filter(id => !ann.includes(id));
    const base = { media_content_id: mcid, media_content_type: 'music' }, calls = [];
    if (ann.length) calls.push(h.callService('media_player', 'play_media', Object.assign({ entity_id: ann, announce: true, extra: { volume: this._vol } }, base)));
    /* speakers that cannot announce: set the message volume, play, then put their own volume back afterwards */
    this._restore = this._restore || {};
    plain.forEach(id => calls.push((async () => {
      const a = h.states[id].attributes, canVol = (a.supported_features || 0) & 4, prev = a.volume_level;
      if (canVol) { if (!this._restore[id] && prev != null) this._restore[id] = { v: prev }; clearTimeout((this._restore[id] || {}).t);
        try { await h.callService('media_player', 'volume_set', { entity_id: id, volume_level: this._vol }); } catch (e) {} }
      await h.callService('media_player', 'play_media', Object.assign({ entity_id: id }, base));
      const r = this._restore[id]; if (canVol && r) r.t = setTimeout(() => { delete this._restore[id]; this._hass.callService('media_player', 'volume_set', { entity_id: id, volume_level: r.v }).catch(() => {}); }, ((secs || 8) + 5) * 1000);
    })()));
    const rs = await Promise.allSettled(calls), bad = rs.filter(x => x.status === 'rejected');
    if (bad.length === rs.length) { this._status(`${what} failed: ${(bad[0].reason && bad[0].reason.message) || 'speakers did not respond'}`, 'err'); return false; }
    this._status(bad.length ? `${what} sent, but some speakers did not respond` : `${what} sent to ${ids.length} speaker${ids.length === 1 ? '' : 's'}`, bad.length ? 'err' : 'ok');
    this._$('again').style.display = this._last ? '' : 'none'; return true;
  }
  _replay() { if (this._last) this._play(this._last, 'Message', this._lastSecs); }
  async _say() {
    const inp = this._$('msg'), m = (inp.value || '').trim(); if (!m) return inp.focus();
    const eng = this._c.tts || Object.keys(this._hass.states).find(id => id.startsWith('tts.'));
    if (!eng) return this._status('No text-to-speech engine is set up in Home Assistant', 'err');
    const btn = this._$('say'); btn.disabled = true; this._status('Sending…');
    const mcid = `media-source://tts/${eng}?message=${encodeURIComponent(m)}&cache=false`;
    const est = m.split(/\s+/).length / 2.3 + 2, ok = await this._play(mcid, 'Message', est); btn.disabled = false; if (ok) { this._last = mcid; this._lastSecs = est; inp.value = ''; }
  }
  /* keep only the three newest voice clips in the media folder */
  async _cleanup(keep) {
    try {
      const r = await this._hass.callWS({ type: 'media_source/browse_media', media_content_id: 'media-source://media_source/local/.' });
      const old = (r.children || []).filter(c => /^intercom-\d{8}T\d{6}\.wav$/.test(c.title) && c.title !== keep).sort((a, b) => b.title.localeCompare(a.title)).slice(2);
      for (const c of old) await this._hass.callWS({ type: 'media_source/local_source/remove', media_content_id: c.media_content_id });
    } catch (e) {}
  }
}
if (!customElements.get('home-intercom-card')) customElements.define('home-intercom-card', HomeIntercomCard);
window.customCards = window.customCards || [];
window.customCards.push({ type: 'home-intercom-card', name: 'Home Intercom', description: 'Talk to any speaker in the house, or type a message to be spoken.' });
