/* home-room-card — room-by-room phone dashboard in the home panel's design.
   One card, two modes:
   - home:  config has `rooms` (list of floors) → chips, greeting, shortcuts, people, room tiles
   - room:  config has `room` → chips with back, temperature/humidity graphs, every device in the room */
const HRC_CSS = `:host{display:block}.rc .rheat .ht2{height:150px;box-sizing:border-box}
.root.rc{height:auto;min-height:calc(100vh - var(--header-height,56px));overflow:visible;padding:12px 12px calc(28px + env(safe-area-inset-bottom));gap:0}
.rc .rcw{display:flex;flex-direction:column;gap:10px;max-width:640px;margin:0 auto;width:100%}
.rc .chips{display:flex;gap:4px;justify-content:safe center;flex-wrap:nowrap;overflow-x:auto;scrollbar-width:none;margin:0 -12px;padding:2px 8px 4px}.rc .chips::-webkit-scrollbar{display:none}
.rc .chips>.chip{flex:0 0 auto;display:inline-flex;align-items:center;gap:4px;height:36px;padding:0 10px 0 7px;border-radius:18px;border:1px solid var(--line);background:var(--card);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);box-shadow:var(--shadow);color:var(--text);font:inherit;font-size:12.5px;font-weight:600;cursor:pointer;white-space:nowrap}
.rc .chips>.chip ha-icon{--mdc-icon-size:18px}.rc .chips>.chip.ic{padding:0;width:36px;justify-content:center}
.rc .hello{padding:16px 18px;font-size:20px;font-weight:700;letter-spacing:-.01em}.rc .hello small{display:block;font-size:13px;font-weight:500;color:var(--sub);margin-top:3px}
.rc .rtitle{padding:4px 6px 0}.rc .rtitle h1{margin:0;font-size:28px;font-weight:700;letter-spacing:-.02em;line-height:1.15}.rc .rtitle div{font-size:13px;color:var(--sub);font-weight:500;margin-top:3px}
.rc .sec{font-size:17px;font-weight:700;letter-spacing:-.01em;margin:14px 6px 0}
.rc .g2{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.rc .g4{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px}.rc .g2>*,.rc .g4>*{min-width:0}
.rc .mc2{padding:12px;display:flex;flex-direction:column;gap:10px;cursor:pointer;min-width:0;position:relative;overflow:hidden}
.rc .mrow{display:flex;align-items:center;gap:12px;min-width:0}
.rc .msh{width:42px;height:42px;border-radius:50%;flex:0 0 auto;display:flex;align-items:center;justify-content:center;background:rgba(var(--rgb,138,143,152),.2);color:rgb(var(--rgb,138,143,152))}.rc .msh ha-icon{--mdc-icon-size:22px}
.rc .mx{min-width:0;flex:1}.rc .mp{font-size:14px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.rc .ms{font-size:12px;color:var(--sub);margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.rc .mctl{display:flex;align-items:center;gap:8px}.rc .mctl button{flex:1;height:40px;border:0;border-radius:12px;background:var(--card2);color:var(--text);display:flex;align-items:center;justify-content:center;cursor:pointer;padding:0;font:inherit;font-weight:600}.rc .mctl button ha-icon{--mdc-icon-size:20px}.rc .mctl .tv{flex:1.2;text-align:center;font-size:18px;font-weight:700}
.rc .mbr{position:absolute;left:0;bottom:0;height:4px;background:rgb(var(--rgb));opacity:.75;border-radius:0 2px 2px 0}
.rc .na{opacity:.5}
.rc .vt{align-items:center;text-align:center;padding:14px 8px 12px;gap:8px}.rc .lt4{gap:8px}.rc .lt4 .vt{padding:13px 6px 11px;gap:7px}.rc .lt4 .mp{font-size:12px;font-weight:700;line-height:1.2;white-space:normal;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;overflow-wrap:anywhere;min-height:2.4em;max-width:100%}.rc .lt4 .ms{font-size:11px;margin-top:-4px}.rc .lt4 .mbr{height:3px}.rc .vt .msh{width:46px;height:46px}.rc .vt .mp{font-size:13px}
.rc .pc{align-items:center;text-align:center;padding:16px 10px 14px;gap:8px}.rc .pc .av{position:relative;width:60px;height:60px}.rc .pc .av img,.rc .pc .av span.ph{width:60px;height:60px;border-radius:50%;object-fit:cover;background:var(--card2);display:flex;align-items:center;justify-content:center;font-size:22px;font-weight:700;color:var(--sub)}
.rc .pc .bdg{position:absolute;right:-2px;top:-2px;width:22px;height:22px;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;border:2px solid var(--card)}.rc .pc .bdg ha-icon{--mdc-icon-size:13px}.rc .pc .mp{font-size:15px}
.rc .rt.lit .msh{background:rgba(240,138,36,.22);color:#f08a24}
.rc .gc{padding:12px 14px 0;gap:2px;overflow:hidden}.rc .gc .gh{display:flex;justify-content:space-between;align-items:flex-start;gap:6px}.rc .gc .gh .mp{color:var(--sub);font-weight:600;font-size:13px}.rc .gc .gh ha-icon{--mdc-icon-size:20px;color:var(--sub)}
.rc .gc .gv{font-size:30px;font-weight:600;letter-spacing:-.02em}.rc .gc .gv small{font-size:14px;color:var(--sub);font-weight:500;margin-left:3px}.rc .gc svg{display:block;width:calc(100% + 28px);margin:6px -14px 0;height:58px}
.rc .mh.heating{background:rgba(255,234,222,.9)}:host(.dark) .rc .mh.heating{background:rgba(92,52,36,.75)}.rc .mh .mctl .pw{flex:0 0 40px;border-radius:50%;color:var(--sub)}.rc .mh.on .mctl .pw{background:#f06a3c;color:#fff}.rc .mh.off .mctl button:not(.pw),.rc .mh.off .mctl .tv{opacity:.4;pointer-events:none}
.rc .sn.on{background:rgba(229,72,77,.12)}.rc .sn.on.mo{background:rgba(240,164,58,.14)}
.rc .md{gap:12px}.rc .md .art{width:48px;height:48px;border-radius:12px;object-fit:cover;flex:0 0 auto;background:var(--card2);display:flex;align-items:center;justify-content:center;color:var(--sub)}.rc .md .art ha-icon{--mdc-icon-size:24px}
.rc .md .mctl button{flex:0 0 40px;border-radius:50%}.rc .md .mctl .pp{background:var(--text);color:#fff}:host(.dark) .rc .md .mctl .pp{color:#111}.rc .md .mctl input{flex:1;min-width:0;accent-color:var(--accent)}.rc .md .mctl ha-icon.vi{--mdc-icon-size:20px;color:var(--sub);flex:0 0 auto}
.rc .md.art2{color:#fff;border-color:transparent;background:#222}.rc .md.art2 .bg{position:absolute;inset:0;background-size:cover;background-position:center;filter:blur(18px) saturate(1.2);transform:scale(1.3);opacity:.7}.rc .md.art2::before{content:"";position:absolute;inset:0;background:rgba(0,0,0,.45)}.rc .md.art2>*:not(.bg){position:relative}.rc .md.art2 .ms{color:rgba(255,255,255,.75)}.rc .md.art2 .mctl button{background:rgba(255,255,255,.2);color:#fff}.rc .md.art2 .mctl .pp{background:#fff;color:#111}.rc .md.art2 .mctl input{accent-color:#fff}.rc .md.art2 .mctl ha-icon.vi{color:rgba(255,255,255,.8)}
.rc .md.off .mctl{opacity:.4;pointer-events:none}
.rc .cams{flex:0 0 auto;padding:0;background:none;border:0;box-shadow:none;backdrop-filter:none;-webkit-backdrop-filter:none}.rc .cams .head{display:none}
.rc .camgrid{display:grid;grid-template-columns:1fr;grid-template-rows:none;grid-auto-rows:210px;gap:10px;flex:0 0 auto}.rc .camgrid .cam,.rc .camgrid .cam.big{grid-column:auto;grid-row:auto;min-height:0}
.rc .vac,.rc .carc{flex:0 0 auto}.rc .carc.multi{padding:12px 14px;gap:10px}
@media (min-width:600px){.rc .camgrid{grid-template-columns:1fr 1fr}}`;
customElements.whenDefined('home-panel-card').then(() => {
  if (customElements.get('home-room-card')) return;
  const Base = customElements.get('home-panel-card');
  const E = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const RGB = { yellow: '245,166,35', orange: '240,106,60', green: '34,160,107', red: '229,72,77', blue: '59,130,246', amber: '217,119,6', grey: '138,143,152', purple: '168,85,247' };
  const WXI = { 'clear-night': 'mdi:weather-night', cloudy: 'mdi:weather-cloudy', fog: 'mdi:weather-fog', partlycloudy: 'mdi:weather-partly-cloudy', pouring: 'mdi:weather-pouring', rainy: 'mdi:weather-rainy', snowy: 'mdi:weather-snowy', 'snowy-rainy': 'mdi:weather-snowy-rainy', sunny: 'mdi:weather-sunny', windy: 'mdi:weather-windy', 'windy-variant': 'mdi:weather-windy-variant', lightning: 'mdi:weather-lightning', 'lightning-rainy': 'mdi:weather-lightning-rainy', hail: 'mdi:weather-hail', exceptional: 'mdi:alert-circle-outline' };
  const WXL = { 'clear-night': 'Clear', cloudy: 'Cloudy', fog: 'Fog', partlycloudy: 'Partly cloudy', pouring: 'Heavy rain', rainy: 'Rain', snowy: 'Snow', 'snowy-rainy': 'Sleet', sunny: 'Sunny', windy: 'Windy', 'windy-variant': 'Windy', lightning: 'Thunder', 'lightning-rainy': 'Thunderstorms', hail: 'Hail', exceptional: 'Warning' };
  const AGO = t => { const s = (Date.now() - new Date(t)) / 1000; if (!isFinite(s)) return ''; if (s < 60) return 'now'; if (s < 3600) return Math.floor(s / 60) + 'm ago'; if (s < 86400) return Math.floor(s / 3600) + 'h ago'; return Math.floor(s / 86400) + 'd ago'; };
  const NUM = x => x != null && x !== '' && !isNaN(parseFloat(x)) ? parseFloat(x) : null;
  const ids = list => (list || []).map(x => typeof x === 'string' ? { entity: x } : x);
  class HomeRoomCard extends Base {
    setConfig(c) {
      if (!c || (!c.rooms && !c.room)) throw new Error('home-room-card: "rooms" (home view) or "room" (room view) is required');
      const r = c.room || {};
      super.setConfig(Object.assign({}, c, {
        weather: c.weather || 'weather.none',
        cameras: c.room ? ids(r.cameras) : [],
        media_players: c.room ? (r.media || []).map(m => typeof m === 'string' ? m : m.entity) : (c.media_players || []),
        cars: c.room ? r.cars || [] : c.cars || [], vacuum: c.room ? r.vacuum || null : null, doorbell: c.room ? r.doorbell || null : null,
        heating: c.room && r.climate ? [{ entity: r.climate, name: r.climate_name || c.room.name }] : [], lights: [], calendars: c.calendars || [], tfl_lines: c.tfl_lines || [], energy: null, world_clocks: c.world_clocks || []
      }));
      this._mode = c.rooms ? 'home' : 'room'; this._hist = {}; this._histAt = 0;
    }
    getCardSize() { return 20; }
    _build() {
      this._built = true;
      const c = this._c, s = this.attachShadow({ mode: 'open' }), r = c.room || {};
      const body = this._mode === 'home' ? `
        <div class="chips" id="chips"></div>
        <div class="card hello" id="hello"></div>
        <div class="g4" id="nav"></div>
        ${(c.calendars || []).length ? '<div class="card cal" id="cal" data-act="cal"></div>' : ''}
        ${(c.people || []).length ? '<div class="g2" id="ppl2"></div>' : ''}
        <div id="floors"></div>` : `
        <div class="chips" id="chips"></div>
        <div class="rtitle"><h1>${E(r.name || 'Room')}</h1><div id="rsub"></div></div>
        ${r.temperature || r.humidity ? '<div class="g2" id="graphs"></div>' : ''}
        ${c.cameras.length ? '<div class="sec">Cameras</div><div class="card cams"><div class="camgrid" id="camgrid"></div></div>' : ''}
        <div class="sec" id="devh">Devices</div>
        ${r.climate ? '<div class="heat rheat" id="heat"></div>' : ''}
        ${(r.lights || []).length ? '<div class="g4 lt4" id="lts"></div>' : ''}
        ${(r.switches || []).length ? '<div class="g2" id="sws"></div>' : ''}
        ${(r.sensors || []).length ? '<div class="g2" id="sns"></div>' : ''}
        ${(r.values || []).length ? '<div class="g2" id="vals"></div>' : ''}
        ${c.vacuum ? '<div class="card vac" id="vac" data-act="vac"></div>' : ''}
        ${this._cars.length ? `<div class="card carc${this._cars.length > 1 ? ' multi' : ''}" id="car"${this._cars.length > 1 ? '' : ' data-act="car" data-i="0"'}></div>` : ''}
        ${c.media_players.length ? '<div id="mds" style="display:flex;flex-direction:column;gap:10px"></div>' : ''}`;
      s.innerHTML = `<style>${window.__HPC_CSS || ''}</style><style>${window.__HPC_CSS2 || ''}</style><style>${HRC_CSS}</style><div class="root rc"><div class="rcw">${body}</div>
        <div class="ov" id="wxov" data-act="closebg"><div class="pop" id="wxpop"></div></div>
        <div class="ov npov" id="npov"></div>
        <div class="ov" id="calov"><div class="pop" id="calpop"></div></div><div class="ov" id="clkov"><div class="pop" id="clkpop"></div></div><div class="ov" id="tflov" data-act="closebg"><div class="pop" id="tflpop"></div></div><div class="ov" id="enov"><div class="pop" id="enpop"></div></div>
        <div class="ov" id="carov" data-act="closebg"><div class="pop" id="carpop"></div></div>
        <div class="ov" id="alov" data-act="closebg"><div class="pop apop" id="alpop"></div></div>
        <div class="ov" id="vacov" data-act="closebg"><div class="pop" id="vacpop"></div></div>
        <div class="ov camov" id="camov" data-act="closebg"><div class="pop" id="campop"></div></div>
        <div class="ov" id="pplov" data-act="closebg"><div class="pop" id="pplpop"></div></div>
        <div class="ov" id="pinov" data-act="closebg"><div class="pop" id="pinpop"></div></div>
        <div class="ov dbov" id="dbov"></div></div>`;
      this._$ = id => s.getElementById(id);
      if (c.cameras.length) this._buildCams();
      s.addEventListener('click', e => this._click(e));
      s.addEventListener('input', e => { const v = e.composedPath()[0]; if (v && v.dataset && v.dataset.search) { clearTimeout(this._sT); const q = v.value; this._sT = setTimeout(() => { if (q.trim().length >= 2 || !q.trim()) this._search(q); }, 600); } });
      s.addEventListener('change', e => this._chg(e.composedPath()[0]));
      s.addEventListener('pointerdown', e => this._down(e));
      s.addEventListener('pointerup', e => this._up(e));
      s.addEventListener('pointerleave', () => clearTimeout(this._holdT));
      s.addEventListener('pointercancel', () => clearTimeout(this._holdT));
    }
    _buildCams() {
      const g = this._$('camgrid');
      g.innerHTML = this._c.cameras.map((c, i) => `<div class="cam" data-act="${this._c.doorbell && this._c.doorbell.camera === c.entity ? 'door' : 'cam'}" data-id="${E(c.entity)}" data-i="${i}">
        <img id="ci${i}" alt=""><div class="off" id="co${i}" hidden>Unavailable</div><span class="ago" id="ca${i}" hidden></span><span class="nm">${E(c.name || c.entity)}</span><span class="play"><ha-icon icon="mdi:play"></ha-icon></span></div>`).join('');
    }
    _updateCams() {
      this._c.cameras.forEach((c, i) => {
        const e = this._st(c.entity), mo = c.motion && this._st(c.motion), a = this._$('ca' + i); if (!a) return;
        this._$('co' + i).hidden = !!(e && e.state !== 'unavailable');
        if (mo && mo.state !== 'unavailable') { a.hidden = false; a.textContent = mo.state === 'on' ? 'Motion now' : AGO(mo.last_changed); } else a.hidden = true;
      });
      if (!this._camInit) { this._camInit = true; this._refreshCams(); }
      if (this._camOn) this._camMotion();
    }
    _refreshCams() {
      if (!this._built || !this._hass) return;
      this._c.cameras.forEach((c, i) => {
        const e = this._st(c.entity); if (!e || !e.attributes.entity_picture || e.state === 'unavailable') return;
        const url = e.attributes.entity_picture + (e.attributes.entity_picture.includes('?') ? '&' : '?') + '_=' + Date.now();
        const im = new Image(); im.onload = () => { const t = this._$('ci' + i); if (t) t.src = url; }; im.src = url;
      });
    }
    _tick() {
      if (!this._built) return;
      if (this._npOpen) this._renderNp();
      if (this._clkOpen) this._tickWorld();
      const sec = new Date().getSeconds();
      if (sec === 0) { this._update(true); if (!this._pop || Date.now() - this._pop.at > 1800000) this._fetchPop(); }
      if (sec % 5 === 0) this._mdProg();
    }
    /* ---------- data ---------- */
    _watch() {
      const c = this._c, r = c.room || {}, out = [c.sun, c.weather, c.alarm && c.alarm.entity];
      if (this._mode === 'home') { (c.people || []).forEach(p => out.push(p.tracker, p.person, p.geocoded)); this._cars.forEach(k => out.push(k.battery, k.charging, k.power)); (c.rooms || []).forEach(f => (f.rooms || []).forEach(x => out.push(x.temperature, ...ids(x.lights).map(l => l.entity)))); }
      else { out.push(r.temperature, r.humidity, r.climate, ...ids(r.lights).map(l => l.entity), ...ids(r.switches).map(l => l.entity), ...ids(r.sensors).map(l => l.entity), ...ids(r.values).map(l => l.entity), ...c.media_players, ...c.cameras.flatMap(x => [x.entity, x.motion])); }
      return out.filter(Boolean);
    }
    _update(force) {
      if (!this._built || !this._hass) return;
      if (force) this._sig = {};
      const sg = JSON.stringify(this._watch().map(id => { const e = this._st(id); if (!e) return 0; const a = e.attributes; return [e.state, e.last_changed, a.brightness, a.rgb_color, a.temperature, a.current_temperature, a.hvac_action, a.media_title, a.entity_picture, a.volume_level, a.latitude]; })) + JSON.stringify(this._pend || {});
      if (sg !== this._sig.main) { this._sig.main = sg; this._render(); }
      if (this._wxOpen) { const w = this._st(this._c.weather), ps = JSON.stringify([w && w.state, w && w.attributes, (this._daily || []).map(d => d.datetime), (this._hourly || []).length]); if (ps !== this._sig.wxp) { this._sig.wxp = ps; this._renderWxPop(); } }
      if (this._alOpen) { const a = this._st(this._c.alarm.entity), as = JSON.stringify(a && [a.state, a.attributes]) + this._alConf; if (as !== this._sig.alp) { this._sig.alp = as; this._renderAlarmPop(); } }
      if (this._pplOpen != null && sg !== this._sig.pplp) { this._sig.pplp = sg; this._renderPeoplePop(); }
      if (this._cars.length) { const vs = JSON.stringify(this._cars.map(k => Object.keys(k).map(x => { const e = typeof k[x] === 'string' && this._st(k[x]); return e && [e.state, e.last_updated]; }))); if (vs !== this._sig.car) { this._sig.car = vs; this._renderCar(); if (this._carOpen) this._renderCarPop(); } }
      if (this._c.vacuum) { const V = this._c.vacuum, vs = JSON.stringify([V.entity, V.mode, V.state, V.error].map(id => { const e = id && this._st(id); return e && [e.state, e.attributes.fan_speed]; })); if (vs !== this._sig.vac) { this._sig.vac = vs; this._renderVac(); if (this._vacOpen) this._renderVacPop(); } }
      if (this._c.cameras.length) { const cs = JSON.stringify(this._c.cameras.map(c => { const e = this._st(c.entity), mo = c.motion && this._st(c.motion); return [e && e.state, mo && mo.state, mo && mo.last_changed]; })); if (cs !== this._sig.cams) { this._sig.cams = cs; this._updateCams(); } }
      if (this._npOpen) this._renderNp();
      if (this._mode === 'room' && Date.now() - this._histAt > 600000) this._fetchHist();
    }
    _fetchHist() {
      const r = this._c.room || {}, want = [r.temperature, r.humidity].filter(Boolean); if (!want.length || !this._hass.callWS) return;
      this._histAt = Date.now();
      this._hass.callWS({ type: 'history/history_during_period', start_time: new Date(Date.now() - 86400000).toISOString(), end_time: new Date().toISOString(), entity_ids: want, minimal_response: true, no_attributes: true, significant_changes_only: false })
        .then(res => { want.forEach(id => { this._hist[id] = ((res && res[id]) || []).map(x => [((x.lu || x.lc) * 1000) || Date.parse(x.last_updated || x.last_changed), NUM(x.s ?? x.state)]).filter(x => x[1] != null); }); this._renderGraphs(); })
        .catch(() => { this._histAt = Date.now() - 540000; });
    }
    /* ---------- shared pieces ---------- */
    _chips(back) {
      const c = this._c, out = [];
      if (back) out.push('<button class="chip ic" data-act="rback" title="Back"><ha-icon icon="mdi:arrow-left"></ha-icon></button>');
      if (c.alarm) { const i = this._alInfo(); if (i) { const col = i.cls === 'disarmed' ? RGB.green : i.cls === 'home' || i.cls === 'wait' ? RGB.amber : RGB.red; out.push(`<button class="chip" data-act="alarm"><ha-icon icon="${i.icon}" style="color:rgb(${col})"></ha-icon><span>${E(({ disarmed: 'Off', armed_home: 'Home', armed_away: 'Away', armed_night: 'Night', arming: 'Arming', pending: 'Entry', triggered: 'ALARM', unavailable: '—' })[i.s] || i.label)}</span></button>`); } }
      (c.tfl_lines || []).forEach(id => {
        const l = this._tfl && (this._tfl.lines || []).find(x => x.id === id), t = this._tflInfo(id, l), col = { ok: RGB.green, minor: RGB.amber, bad: RGB.red, idle: RGB.grey }[t.cls] || RGB.grey;
        const lc = { bakerloo: '#B36305', central: '#E32017', circle: '#FFD300', district: '#00782A', 'hammersmith-city': '#F3A9BB', jubilee: '#A0A5A9', metropolitan: '#9B0056', northern: '#000000', piccadilly: '#003688', victoria: '#0098D4', 'waterloo-city': '#95CDBA', elizabeth: '#6950A1' }[id] || '#8a8f98';
        const word = !this._tfl ? (this._tflErr ? 'No status' : '…') : t.w ? ({ 'Good Service': 'Good', 'Minor Delays': 'Delays', 'Severe Delays': 'Severe', 'Part Suspended': 'Part susp.', 'Part Closure': 'Part closed', 'Planned Closure': 'Closed', 'Reduced Service': 'Reduced' }[t.w.statusSeverityDescription] || t.w.statusSeverityDescription) : '—';
        out.push(`<button class="chip" data-act="tfl"><span style="width:14px;height:14px;border-radius:50%;background:${lc};box-shadow:0 0 0 3px rgba(${col},.35);flex:0 0 auto"></span><span style="color:rgb(${col})">${E(word)}</span></button>`);
      });
      if (this._mode === 'home' && this._cars.length) {
        const cs = this._cars.map((_, i) => this._carInfo(i)), soc = cs.map(x => x.soc).filter(v => v != null), lo = soc.length ? Math.min(...soc) : null, chg = cs.some(x => x.charging);
        const col = lo == null ? RGB.grey : lo < 20 ? RGB.red : lo < 50 ? RGB.amber : RGB.green;
        out.push(`<button class="chip" data-act="car" data-i="0"><ha-icon icon="${chg ? 'mdi:car-electric' : 'mdi:car'}" style="color:rgb(${col})"></ha-icon><span>${cs.map(x => `<span${x.charging ? ' style="color:rgb(' + RGB.green + ')"' : ''}>${x.soc != null ? Math.round(x.soc) + '%' : '—'}</span>`).join(' · ')}</span></button>`);
      }
      if ((c.calendars || []).length) {
        const now = new Date(), eod = new Date(now); eod.setHours(24, 0, 0, 0); const n = this._events ? this._events.filter(e => e.f > now && e.s < eod).length : null;
        out.push(`<button class="chip" data-act="cal"><ha-icon icon="mdi:calendar-today" style="color:rgb(${n ? RGB.purple : RGB.grey})"></ha-icon><span>${n == null ? '…' : n}</span></button>`);
      }
      const w = this._st(c.weather); if (w) out.push(`<button class="chip" data-act="wx"><ha-icon icon="${WXI[w.state] || 'mdi:weather-cloudy'}" style="color:rgb(${RGB.blue})"></ha-icon><span>${Math.round(w.attributes.temperature)}°</span></button>`);
      return out.join('');
    }
    _renderCal() { this._renderTfl(); if (this._$ && this._$('cal')) Base.prototype._renderCal.call(this); else if (this._calOpen) this._renderCalPop(); }
    _renderTfl() { if (this._built && this._hass && this._$('chips')) this._$('chips').innerHTML = this._chips(this._mode === 'room'); }
    _val(id, digits) { const e = id && this._st(id), v = e && NUM(e.state); return v == null ? null : (digits != null ? v.toFixed(digits) : Math.round(v)); }
    _render() { if (this._mode === 'home') this._renderHome(); else this._renderRoom(); }
    /* ---------- home view ---------- */
    _renderHome() {
      const c = this._c, $ = this._$;
      $('chips').innerHTML = this._chips(false);
      const h = new Date().getHours(), n = c.name || (this._hass.user && this._hass.user.name ? this._hass.user.name.split(' ')[0] : '');
      const lit = (c.rooms || []).flatMap(f => (f.rooms || []).flatMap(r => ids(r.lights).map(l => l.entity))).filter((id, i, a) => a.indexOf(id) === i && (this._st(id) || {}).state === 'on').length;
      $('hello').innerHTML = `${h < 5 ? 'Hello' : h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening'}${n ? ', ' + E(n) : ''}!<small>${lit ? lit + (lit === 1 ? ' light is on' : ' lights are on') : 'All lights are off'}</small>`;
      const nav = c.shortcuts || [{ name: 'Energy', icon: 'mdi:lightning-bolt', color: 'orange', path: 'energy' }, { name: 'Lights', icon: 'mdi:lightbulb', color: 'yellow', path: 'lights' }, { name: 'Security', icon: 'mdi:shield-home', color: 'red', path: 'security' }, { name: 'Sound', icon: 'mdi:speaker', color: 'green', path: 'music' }];
      $('nav').innerHTML = nav.map(x => `<div class="card mc2 vt" data-act="rnav" data-p="${E(x.path)}" style="--rgb:${RGB[x.color] || x.color || RGB.grey}"><span class="msh"><ha-icon icon="${E(x.icon)}"></ha-icon></span><div class="mp">${E(x.name)}</div></div>`).join('');
      if ($('ppl2')) $('ppl2').innerHTML = c.people.map((_, i) => { const x = this._pInfo(i), t = x.p.tracker && this._st(x.p.tracker), home = t && t.state === 'home', unk = !t || /unknown|unavailable/.test(t.state);
        return `<div class="card mc2 pc" data-act="ppl" data-i="${i}"><div class="av">${x.pic ? `<img src="${E(x.pic)}" alt="">` : `<span class="ph">${E((x.name || '?').charAt(0))}</span>`}<span class="bdg" style="background:${home ? '#22a06b' : unk ? '#8a8f98' : '#3b82f6'}"><ha-icon icon="${home ? 'mdi:home' : unk ? 'mdi:help' : 'mdi:map-marker'}"></ha-icon></span></div><div><div class="mp">${E(x.name)}</div><div class="ms">${E(x.where)}</div></div></div>`; }).join('');
      $('floors').innerHTML = (c.rooms || []).map(f => `<div class="sec">${E(f.name)}</div><div class="g2" style="margin-top:10px">${(f.rooms || []).map(r => {
        const on = ids(r.lights).filter(l => (this._st(l.entity) || {}).state === 'on').length, t = this._val(r.temperature, 1);
        const sub = [t != null ? t + '°' : '', on ? on + ' on' : ''].filter(Boolean).join(' · ') || (ids(r.lights).length ? 'Lights off' : '');
        return `<div class="card mc2 rt${on ? ' lit' : ''}" data-act="rnav" data-p="${E(r.path)}"><div class="mrow"><span class="msh"><ha-icon icon="${E(r.icon || 'mdi:door')}"></ha-icon></span><div class="mx"><div class="mp">${E(r.name)}</div>${sub ? `<div class="ms">${E(sub)}</div>` : ''}</div></div></div>`; }).join('')}</div>`).join('');
    }
    /* ---------- room view ---------- */
    _renderRoom() {
      const c = this._c, r = c.room, $ = this._$;
      $('chips').innerHTML = this._chips(true);
      const lts = ids(r.lights), on = lts.filter(l => (this._st(l.entity) || {}).state === 'on').length, t = this._val(r.temperature, 1);
      $('rsub').textContent = [t != null ? t + '°' : '', lts.length ? (on ? on + ' of ' + lts.length + ' lights on' : 'Lights off') : ''].filter(Boolean).join(' · ');
      this._renderGraphs();
      this._renderHeat();
      if ($('lts')) $('lts').innerHTML = lts.map(l => this._lightCard(l)).join('');
      if ($('sws')) $('sws').innerHTML = ids(r.switches).map(x => this._switchCard(x)).join('');
      if ($('sns')) $('sns').innerHTML = ids(r.sensors).map(x => this._sensorCard(x)).join('');
      if ($('vals')) $('vals').innerHTML = ids(r.values).map(x => this._valueCard(x)).join('');
      if ($('mds')) $('mds').innerHTML = (r.media || []).map(m => this._mediaCard(typeof m === 'string' ? { entity: m } : m)).join('');
      if ($('devh')) $('devh').hidden = !(r.climate || lts.length || (r.switches || []).length || (r.sensors || []).length || (r.values || []).length || c.vacuum || this._cars.length || c.media_players.length);
    }
    _renderGraphs() {
      const el = this._$ && this._$('graphs'), r = this._c.room || {}; if (!el) return;
      const g = (id, name, icon, unit, col) => { if (!id) return ''; const e = this._st(id), v = e && NUM(e.state), pts = (this._hist[id] || []).concat(v != null ? [[Date.now(), v]] : []);
        let path = ''; if (pts.length > 1) { const t0 = Date.now() - 86400000, vs = pts.map(p => p[1]), lo = Math.min(...vs), hi = Math.max(...vs), sp = (hi - lo) || 1;
          path = pts.map((p, i) => `${i ? 'L' : 'M'}${((Math.max(t0, p[0]) - t0) / 86400000 * 300).toFixed(1)} ${(54 - (p[1] - lo) / sp * 44).toFixed(1)}`).join(''); }
        return `<div class="card mc2 gc" data-act="more" data-id="${E(id)}"><div class="gh"><div class="mp">${E(name)}</div><ha-icon icon="${icon}"></ha-icon></div><div class="gv">${v != null ? (unit === '%' ? Math.round(v) : v.toFixed(1)) : '—'}<small>${unit}</small></div>
          <svg viewBox="0 0 300 58" preserveAspectRatio="none">${path ? `<path d="${path}L300 58L0 58Z" fill="${col}" opacity=".14"/><path d="${path}" fill="none" stroke="${col}" stroke-width="2.5" vector-effect="non-scaling-stroke" stroke-linejoin="round"/>` : ''}</svg></div>`; };
      el.innerHTML = g(r.temperature, 'Temperature', 'mdi:thermometer', '°C', '#f06a3c') + g(r.humidity, 'Humidity', 'mdi:water-percent', '%', '#3b82f6');
    }
    _climCard(id, name) {
      const e = this._st(id), p = this._pend || {};
      if (!e) return `<div class="card mc2 mh off"><div class="mrow"><span class="msh"><ha-icon icon="mdi:thermostat"></ha-icon></span><div class="mx"><div class="mp">${E(name || id)}</div><div class="ms">Not found</div></div></div></div>`;
      const a = e.attributes, on = e.state !== 'off' && e.state !== 'unavailable', heating = on && a.hvac_action === 'heating', tgt = on ? (p[id] ?? a.temperature) : null;
      const cur = a.current_temperature != null ? Number(a.current_temperature).toFixed(1) + '°' : '—', st = e.state === 'unavailable' ? 'Unavailable' : !on ? 'Off' : heating ? 'Heating' : 'Idle';
      return `<div class="card mc2 mh ${on ? 'on' : 'off'}${heating ? ' heating' : ''}" data-act="more" data-id="${E(id)}" style="--rgb:${heating ? RGB.orange : on ? RGB.amber : RGB.grey}">
        <div class="mrow"><span class="msh"><ha-icon icon="${heating ? 'mdi:fire' : on ? 'mdi:thermostat' : 'mdi:thermostat-off'}"></ha-icon></span><div class="mx"><div class="mp">${E(name || a.friendly_name || id)}</div><div class="ms">${E(st)} · ${cur} now${a.current_humidity != null ? ' · ' + Math.round(a.current_humidity) + '%' : ''}</div></div></div>
        <div class="mctl"><button class="pw" data-act="hpw" data-id="${E(id)}"><ha-icon icon="mdi:power"></ha-icon></button><button data-act="hdn" data-id="${E(id)}"><ha-icon icon="mdi:minus"></ha-icon></button><span class="tv">${tgt != null ? tgt + '°' : '—'}</span><button data-act="hup" data-id="${E(id)}"><ha-icon icon="mdi:plus"></ha-icon></button></div></div>`;
    }
    _lightCard(l) {
      const e = this._st(l.entity), on = e && e.state === 'on', b = e && e.attributes.brightness, na = !e || e.state === 'unavailable', pct = on && b ? Math.max(1, Math.round(b / 2.55)) : on ? 100 : 0;
      const st = !e ? 'Missing' : na ? 'Unavailable' : on ? (b ? pct + '%' : 'On') : 'Off', rgb = on && e.attributes.rgb_color ? e.attributes.rgb_color.join(',') : RGB.yellow;
      return `<div class="card mc2 vt ml${na ? ' na' : ''}" data-light="${E(l.entity)}" style="--rgb:${on ? rgb : RGB.grey}"><span class="msh"><ha-icon icon="${E(l.icon || (on ? 'mdi:lightbulb' : 'mdi:lightbulb-outline'))}"></ha-icon></span><div class="mp">${E(l.name || (e && e.attributes.friendly_name) || l.entity)}</div><div class="ms">${st}</div>${on ? `<i class="mbr" style="width:${pct}%"></i>` : ''}</div>`;
    }
    _switchCard(x) {
      const e = this._st(x.entity), on = e && e.state === 'on', na = !e || e.state === 'unavailable', pw = x.power && this._val(x.power, 1);
      return `<div class="card mc2${na ? ' na' : ''}" data-act="rsw" data-id="${E(x.entity)}" style="--rgb:${on ? RGB[x.color] || RGB.green : RGB.grey}"><div class="mrow"><span class="msh"><ha-icon icon="${E(x.icon || (on ? 'mdi:power-plug' : 'mdi:power-plug-off'))}"></ha-icon></span><div class="mx"><div class="mp">${E(x.name || (e && e.attributes.friendly_name) || x.entity)}</div><div class="ms">${!e ? 'Missing' : na ? 'Unavailable' : on ? 'On' + (pw != null ? ' · ' + pw + ' ' + (this._st(x.power).attributes.unit_of_measurement || '') : '') : 'Off'}</div></div></div></div>`;
    }
    _sensorCard(x) {
      const e = this._st(x.entity), on = e && e.state === 'on', na = !e || e.state === 'unavailable', dc = (e && e.attributes.device_class) || x.device_class || '';
      const mo = /motion|occupancy|presence|sound|vibration/.test(dc) || x.kind === 'motion', door = /door|window|opening|garage/.test(dc), alarmish = /smoke|gas|carbon_monoxide|moisture|safety|problem/.test(dc) || x.kind === 'alert';
      const word = na ? 'Unavailable' : mo ? (on ? 'Motion' : 'Clear') : door ? (on ? 'Open' : 'Closed') : alarmish ? (on ? 'Detected' : 'Clear') : (on ? 'On' : 'Off');
      const icon = x.icon || (mo ? (on ? 'mdi:motion-sensor' : 'mdi:motion-sensor-off') : door ? (on ? 'mdi:door-open' : 'mdi:door-closed') : alarmish ? 'mdi:alert-circle-outline' : 'mdi:checkbox-blank-circle-outline');
      return `<div class="card mc2 sn${on ? ' on' : ''}${mo ? ' mo' : ''}${na ? ' na' : ''}" data-act="more" data-id="${E(x.entity)}" style="--rgb:${on ? (mo ? RGB.amber : RGB.red) : RGB.grey}"><div class="mrow"><span class="msh"><ha-icon icon="${E(icon)}"></ha-icon></span><div class="mx"><div class="mp">${E(x.name || (e && e.attributes.friendly_name) || x.entity)}</div><div class="ms">${E(word)}${e && !na && e.last_changed ? ' · ' + AGO(e.last_changed) : ''}</div></div></div></div>`;
    }
    _valueCard(x) {
      const e = this._st(x.entity), v = e ? e.state : null, n = NUM(v), u = e && e.attributes.unit_of_measurement || '';
      const low = x.low != null && n != null && n <= x.low;
      const txt = !e ? 'Missing' : n != null ? (Math.abs(n) < 100 && n % 1 ? n.toFixed(1) : Math.round(n)) + (u ? (u === '%' ? '%' : ' ' + u) : '') : String(v).replace(/_/g, ' ').replace(/^./, s => s.toUpperCase());
      return `<div class="card mc2" data-act="more" data-id="${E(x.entity)}" style="--rgb:${low ? RGB.red : RGB[x.color] || RGB.blue}"><div class="mrow"><span class="msh"><ha-icon icon="${E(x.icon || 'mdi:information-outline')}"></ha-icon></span><div class="mx"><div class="mp">${E(x.name || (e && e.attributes.friendly_name) || x.entity)}</div><div class="ms"${low ? ' style="color:#e5484d;font-weight:600"' : ''}>${E(txt)}</div></div></div></div>`;
    }
    _mediaCard(m) {
      const e = this._st(m.entity), name = m.name || (e && e.attributes.friendly_name) || m.entity;
      if (!e) return `<div class="card mc2 md off"><div class="mrow"><span class="art"><ha-icon icon="mdi:speaker-off"></ha-icon></span><div class="mx"><div class="mp">${E(name)}</div><div class="ms">Not found</div></div></div></div>`;
      const a = e.attributes, live = e.state === 'playing' || e.state === 'paused', playing = e.state === 'playing', na = /unavailable|off/.test(e.state), ctl = live ? (this._ctl(e) || e) : e;
      const sub = na ? (e.state === 'off' ? 'Off' : 'Unavailable') : live ? [a.media_title, a.media_artist].filter(Boolean).join(' · ') || (playing ? 'Playing' : 'Paused') : 'Idle';
      const vol = Math.round(((ctl.attributes.volume_level) || 0) * 100), art = live && a.entity_picture;
      return `<div class="card mc2 md${art ? ' art2' : ''}${na ? ' off' : ''}" data-act="rmd" data-id="${E(m.entity)}">${art ? `<div class="bg" style="background-image:url('${E(a.entity_picture)}')"></div>` : ''}
        <div class="mrow">${art ? `<img class="art" src="${E(a.entity_picture)}" alt="">` : `<span class="art"><ha-icon icon="${E(m.icon || (a.device_class === 'tv' ? 'mdi:television' : 'mdi:speaker'))}"></ha-icon></span>`}<div class="mx"><div class="mp">${E(name)}</div><div class="ms">${E(sub)}</div></div></div>
        <div class="mctl" data-act="noop"><ha-icon class="vi" icon="mdi:volume-${vol < 1 ? 'off' : vol < 50 ? 'medium' : 'high'}"></ha-icon><input type="range" min="0" max="100" value="${vol}" data-vol="${E(ctl.entity_id)}">
          <button data-act="rmc" data-svc="media_previous_track" data-id="${E(ctl.entity_id)}"><ha-icon icon="mdi:skip-previous"></ha-icon></button><button class="pp" data-act="rmc" data-svc="media_play_pause" data-id="${E(ctl.entity_id)}"><ha-icon icon="${playing ? 'mdi:pause' : 'mdi:play'}"></ha-icon></button><button data-act="rmc" data-svc="media_next_track" data-id="${E(ctl.entity_id)}"><ha-icon icon="mdi:skip-next"></ha-icon></button></div></div>`;
    }
    _mdProg() {}
    _click(e) {
      const path = e.composedPath(), t = path.find(n => n.dataset && n.dataset.act), act = t && t.dataset.act;
      if (act === 'rback') { if (history.length > 1) history.back(); else this._nav(''); return; }
      if (act === 'rnav') { this._nav(t.dataset.p); return; }
      if (act === 'rsw') { this._hass.callService('homeassistant', 'toggle', { entity_id: t.dataset.id }); return; }
      if (act === 'rmc') { this._hass.callService('media_player', t.dataset.svc, { entity_id: t.dataset.id }); return; }
      if (act === 'rmd') { this._npPref = t.dataset.id; this._npEntity = t.dataset.id; this._npOpenUp(); return; }
      if (act === 'noop') return;
      super._click(e);
    }
    _nav(p) {
      const base = '/' + location.pathname.split('/').filter(Boolean)[0];
      const to = !p ? base : p.startsWith('/') ? p : base + '/' + p;
      history.pushState(null, '', to); window.dispatchEvent(new CustomEvent('location-changed'));
    }
  }
  customElements.define('home-room-card', HomeRoomCard);
});
window.customCards = window.customCards || [];
window.customCards.push({ type: 'home-room-card', name: 'Home Room Card', description: 'Room-by-room phone dashboard (home view and room views)' });
