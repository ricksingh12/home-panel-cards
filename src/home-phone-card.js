/* home-phone-card — the home panel for a phone, laid out Mushroom-style (status chips, compact rows) in the panel's design */
const HPH_CSS = `:host{display:block}
.root.ph{height:auto;min-height:calc(100vh - var(--header-height,56px));overflow:visible;padding:14px 12px calc(28px + env(safe-area-inset-bottom));gap:0}
.ph .phs{display:flex;flex-direction:column;gap:10px}
.ph .pht{padding:4px 4px 0}.ph .pht h1{margin:0;font-size:26px;font-weight:700;letter-spacing:-.02em;line-height:1.15}.ph .pht .s{font-size:14px;color:var(--sub);font-weight:500;margin-top:3px}
.ph .chips{display:flex;gap:8px;overflow-x:auto;scrollbar-width:none;margin:2px -12px 0;padding:4px 12px 6px;scroll-padding:12px}.ph .chips::-webkit-scrollbar{display:none}
.ph .chip{flex:0 0 auto;display:inline-flex;align-items:center;gap:6px;height:36px;padding:0 13px 0 9px;border-radius:18px;border:1px solid var(--line);background:var(--card);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);box-shadow:var(--shadow);color:var(--text);font:inherit;font-size:13px;font-weight:600;cursor:pointer;white-space:nowrap}
.ph .chip ha-icon{--mdc-icon-size:18px}.ph .chip img,.ph .chip .ini{width:22px;height:22px;border-radius:50%;object-fit:cover;background:var(--card2);display:inline-flex;align-items:center;justify-content:center;font-size:11px;color:var(--sub)}.ph .chip.warn{color:#e5484d}
.ph .sec{font-size:17px;font-weight:700;letter-spacing:-.01em;margin:14px 4px 0}
.ph .g2{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.ph .g2>*{min-width:0}
.ph .mc2{padding:12px;display:flex;flex-direction:column;gap:10px;cursor:pointer;min-width:0;position:relative;overflow:hidden}
.ph .mrow{display:flex;align-items:center;gap:12px;min-width:0}
.ph .msh{width:42px;height:42px;border-radius:50%;flex:0 0 auto;display:flex;align-items:center;justify-content:center;background:rgba(var(--rgb,138,143,152),.2);color:rgb(var(--rgb,138,143,152))}.ph .msh ha-icon{--mdc-icon-size:22px}
.ph .mx{min-width:0;flex:1}.ph .mp{font-size:14px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.ph .ms{font-size:12px;color:var(--sub);margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.ph .mctl{display:flex;align-items:center;gap:8px}.ph .mctl button{flex:1;height:38px;border:0;border-radius:12px;background:var(--card2);color:var(--text);display:flex;align-items:center;justify-content:center;cursor:pointer;padding:0;font:inherit;font-weight:600}.ph .mctl button ha-icon{--mdc-icon-size:20px}.ph .mctl .tv{flex:1.2;text-align:center;font-size:17px;font-weight:700}
.ph .mbr{position:absolute;left:0;bottom:0;height:4px;background:rgb(var(--rgb));opacity:.7;border-radius:0 2px 2px 0}
.ph .ml.na{opacity:.5}.ph .mh.off .mctl button:not(.pw),.ph .mh.off .mctl .tv{opacity:.4;pointer-events:none}.ph .mh.heating{background:rgba(255,234,222,.9)}:host(.dark) .ph .mh.heating{background:rgba(92,52,36,.75)}
.ph .mh .mctl{gap:6px}.ph .mh .mctl .pw{flex:0 0 38px;width:38px;border-radius:50%;color:var(--sub)}.ph .mh.on .mctl .pw{background:#f06a3c;color:#fff}.ph .mh .mctl .tv{flex:1;font-size:16px}
.ph .card.alarm{flex:0 0 auto}.ph .alarm .aseg button{padding:11px 4px}
.ph .cams{flex:0 0 auto;padding:0;background:none;border:0;box-shadow:none;backdrop-filter:none;-webkit-backdrop-filter:none}.ph .cams .head{display:none}
.ph .camgrid{display:grid;grid-auto-flow:column;grid-auto-columns:82%;grid-template-columns:none;grid-template-rows:180px;gap:10px;overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none;margin:0 -12px;padding:0 12px}.ph .camgrid::-webkit-scrollbar{display:none}.ph .camgrid .cam,.ph .camgrid .cam.big{grid-column:auto;grid-row:auto;scroll-snap-align:start;min-height:0}
.ph .mm{flex-direction:row;align-items:center;gap:12px}.ph .mm .art{width:52px;height:52px;border-radius:12px;object-fit:cover;flex:0 0 auto;background:var(--card2);display:flex;align-items:center;justify-content:center;color:var(--sub)}.ph .mm .mctl{flex:0 0 auto;gap:4px}.ph .mm .mctl button{width:38px;flex:0 0 38px;border-radius:50%}.ph .mm .mctl .pp{background:var(--text);color:var(--bg-solid,#fff)}:host(.dark) .ph .mm .mctl .pp{color:#111}.ph .mm .mbar{position:absolute;left:0;right:0;bottom:0;height:3px;background:var(--line)}.ph .mm .mbar i{display:block;height:100%;background:var(--accent)}
.ph .ppl{flex:0 0 auto;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;padding:0 !important;background:none;border:0;box-shadow:none;backdrop-filter:none;-webkit-backdrop-filter:none}
.ph .ppl .pp{background:var(--card);border:1px solid var(--line);border-radius:var(--r,22px);box-shadow:var(--shadow);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);padding:12px;gap:12px}.ph .ppl .pp+.pp{border-left:1px solid var(--line);padding-left:12px}.ph .ppl .pav{width:42px;height:42px}
.ph .carc{flex:0 0 auto}.ph .carc.multi{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;padding:0;background:none;border:0;box-shadow:none;backdrop-filter:none;-webkit-backdrop-filter:none}
.ph .carc.multi .crow{background:var(--card);border:1px solid var(--line);border-radius:var(--r,22px);box-shadow:var(--shadow);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);padding:12px;display:grid;grid-template-columns:auto 1fr;grid-template-rows:auto auto;gap:6px 10px;align-items:center}.ph .carc.multi .crow+.crow{padding-top:12px}
.ph .carc.multi .crow .clogo{width:30px;max-height:30px;grid-row:1}.ph .carc.multi .crow .cx{grid-column:1 / -1;grid-row:2;min-width:0}.ph .carc.multi .crow .cv{grid-column:2;grid-row:1;text-align:right}.ph .carc.multi .crow .cv b{font-size:20px}.ph .carc.multi .crow .cs{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.ph .card.en{height:186px;flex:0 0 auto;padding:12px 14px}.ph .vac{flex:0 0 auto}
.ph .card.wx{height:250px;flex:0 0 auto}.ph .cal,.ph .tfl{flex:0 0 auto}`;
customElements.whenDefined('home-panel-card').then(() => {
  if (customElements.get('home-phone-card')) return;
  const Base = customElements.get('home-panel-card');
  const E = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const RGB = { yellow: '245,166,35', orange: '240,106,60', green: '34,160,107', red: '229,72,77', blue: '59,130,246', amber: '217,119,6', grey: '138,143,152' };
  class HomePhoneCard extends Base {
    getCardSize() { return 30; }
    _build() {
      this._built = true;
      const c = this._c, s = this.attachShadow({ mode: 'open' }), sec = (t, id) => `<div class="sec"${id ? ` id="${id}"` : ''}>${t}</div>`;
      s.innerHTML = `<style>${window.__HPC_CSS || ''}</style><style>${window.__HPC_CSS2 || ''}</style><style>${HPH_CSS}</style><div class="root ph"><div class="phs">
        <div class="pht"><h1 id="phg"></h1><div class="s" id="phs"></div></div>
        <div class="chips" id="chips"></div>
        ${c.alarm || c.cameras.length ? sec('Security') : ''}
        ${c.alarm ? '<div class="card alarm" id="alarm" data-act="alarm"></div>' : ''}
        ${c.cameras.length ? '<div class="card cams"><div class="camgrid" id="camgrid"></div></div>' : ''}
        ${c.heating.length ? `${sec('Climate', 'sheat')}<div class="g2" id="heat"></div>` : ''}
        ${sec('Lights')}<div class="g2" id="lights"></div>
        ${c.media_players.length ? `${sec('Media')}<div class="card mc2 mm" id="music" data-act="np"></div>` : ''}
        ${(c.people || []).length || this._cars.length ? sec('Family &amp; cars') : ''}
        ${(c.people || []).length ? '<div class="card ppl" id="ppl"></div>' : ''}
        ${this._cars.length ? `<div class="card carc${this._cars.length > 1 ? ' multi' : ''}" id="car"${this._cars.length > 1 ? '' : ' data-act="car" data-i="0"'}></div>` : ''}
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
      if (c.cameras.length) this._buildCams();
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
    /* ---------- clock-free tick ---------- */
    _tick() {
      if (!this._built) return;
      const d = new Date(), h = d.getHours();
      const g = this._$('phg'), t = (h < 5 ? 'Good night' : h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening');
      const n = this._c.name || (this._hass && this._hass.user && this._hass.user.name ? this._hass.user.name.split(' ')[0] : '');
      const txt = t + (n ? ', ' + n : ''); if (g.textContent !== txt) g.textContent = txt;
      const w = this._st(this._c.weather), sub = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][d.getDay()] + ' ' + d.getDate() + ' ' + ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][d.getMonth()]
        + ' · ' + (h % 12 || 12) + ':' + String(d.getMinutes()).padStart(2, '0') + (h < 12 ? ' am' : ' pm') + (this._c.location ? ' · ' + this._c.location : '');
      const ps = this._$('phs'); if (ps.textContent !== sub) ps.textContent = sub;
      if (this._npOpen) this._renderNp();
      this._musicProg();
      if (this._clkOpen) this._tickWorld();
      if (d.getSeconds() === 0) { this._sig.cams = null; this._renderCal(); this._update(); if (!this._pop || Date.now() - this._pop.at > 1800000) this._fetchPop(); if (!this._en || Date.now() - this._en.at > 1800000) this._fetchEnergy(); }
    }
    _update(force) { super._update(force); this._renderChips(); }
    _renderEnergy() { super._renderEnergy(); this._chipSig = null; this._renderChips(); }
    /* ---------- status chips ---------- */
    _renderChips() {
      const el = this._$ && this._$('chips'); if (!el || !this._hass) return;
      const c = this._c, out = [], chip = (act, icon, txt, col, extra, cls) => out.push(`<button class="chip${cls ? ' ' + cls : ''}" data-act="${act}"${extra || ''}>${icon.startsWith('<') ? icon : `<ha-icon icon="${icon}"${col ? ` style="color:rgb(${col})"` : ''}></ha-icon>`}<span>${E(txt)}</span></button>`);
      if (c.alarm) { const i = this._alInfo(); if (i) { const col = i.cls === 'disarmed' ? RGB.green : i.cls === 'home' || i.cls === 'wait' ? RGB.amber : RGB.red; chip('alarm', i.icon, i.label.replace(' · ', ' '), col, '', i.cls === 'trig' ? 'warn' : ''); if (i.open.length) chip('alarm', 'mdi:door-open', i.open.length === 1 ? i.open[0] + ' open' : i.open.length + ' doors open', RGB.red, '', 'warn'); } }
      (c.people || []).forEach((_, i) => { const x = this._pInfo(i); chip('ppl', x.pic ? `<img src="${E(x.pic)}" alt="">` : `<span class="ini">${E((x.name || '?').charAt(0))}</span>`, x.where, '', ` data-i="${i}"`); });
      const w = this._st(c.weather); if (w) chip('wx', ({ 'clear-night': 'mdi:weather-night', cloudy: 'mdi:weather-cloudy', fog: 'mdi:weather-fog', partlycloudy: 'mdi:weather-partly-cloudy', pouring: 'mdi:weather-pouring', rainy: 'mdi:weather-rainy', snowy: 'mdi:weather-snowy', sunny: 'mdi:weather-sunny', windy: 'mdi:weather-windy', lightning: 'mdi:weather-lightning', 'lightning-rainy': 'mdi:weather-lightning-rainy' })[w.state] || 'mdi:weather-cloudy', Math.round(w.attributes.temperature) + (w.attributes.temperature_unit || '°'), RGB.blue);
      if (c.lights.length || c.lights_path !== false) { const lit = [...new Set([...(c.lights || []).map(l => l.entity)])].filter(id => (this._st(id) || {}).state === 'on').length;
        const all = Object.keys(this._hass.states).filter(id => id.startsWith('light.') && this._hass.states[id].state === 'on' && !this._hass.states[id].attributes.entity_id).length;
        chip('phnav', 'mdi:lightbulb-group', (all || lit) ? (all || lit) + ' on' : 'Lights off', (all || lit) ? RGB.yellow : RGB.grey, ' data-p="lights"'); }
      if (c.heating.length) { const hn = c.heating.filter(z => { const e = this._st(z.entity); return e && e.attributes.hvac_action === 'heating'; }).length; chip('phscroll', 'mdi:radiator', hn ? hn + ' heating' : 'Heating idle', hn ? RGB.orange : RGB.grey, ' data-s="sheat"'); }
      this._cars.forEach((_, i) => { const x = this._carInfo(i); chip('car', x.charging ? 'mdi:battery-charging' : 'mdi:car-electric', x.name + (x.soc != null ? ' ' + Math.round(x.soc) + '%' : ''), x.soc == null ? RGB.grey : x.soc < 20 ? RGB.red : x.soc < 50 ? RGB.amber : RGB.green, ` data-i="${i}"`); });
      if (c.energy && this._en && this._en.days.length) { const t = this._enSum('ec') + this._enSum('gc'); if (t) chip('en', 'mdi:lightning-bolt', '£' + t.toFixed(0) + ' · 7 days', RGB.amber); }
      const html = out.join(''); if (html !== this._chipSig) { this._chipSig = html; el.innerHTML = html; }
    }
    /* ---------- climate: Mushroom-style thermostat cards ---------- */
    _renderHeat() {
      const el = this._$ && this._$('heat'); if (!el) return;
      const p = this._pend || {};
      el.innerHTML = this._c.heating.map(z => {
        const e = this._st(z.entity), nm = E(z.name || (e && e.attributes.friendly_name) || z.entity);
        if (!e) return `<div class="card mc2 mh off"><div class="mrow"><span class="msh"><ha-icon icon="mdi:thermostat"></ha-icon></span><div class="mx"><div class="mp">${nm}</div><div class="ms">Missing</div></div></div></div>`;
        const a = e.attributes, on = e.state !== 'off' && e.state !== 'unavailable', heating = on && a.hvac_action === 'heating', tgt = on ? (p[z.entity] ?? a.temperature) : null;
        const cur = a.current_temperature != null ? Number(a.current_temperature).toFixed(1) + '°' : '—';
        const st = e.state === 'unavailable' ? 'Unavailable' : !on ? 'Off' : heating ? 'Heating' : 'Idle';
        return `<div class="card mc2 mh ${on ? 'on' : 'off'}${heating ? ' heating' : ''}" data-act="more" data-id="${E(z.entity)}" style="--rgb:${heating ? RGB.orange : on ? RGB.amber : RGB.grey}">
          <div class="mrow"><span class="msh"><ha-icon icon="${heating ? 'mdi:fire' : on ? 'mdi:thermostat' : 'mdi:thermostat-off'}"></ha-icon></span><div class="mx"><div class="mp">${nm}</div><div class="ms">${cur} · ${E(st)}</div></div></div>
          <div class="mctl"><button class="pw" data-act="hpw" data-id="${E(z.entity)}"><ha-icon icon="mdi:power"></ha-icon></button><button data-act="hdn" data-id="${E(z.entity)}"><ha-icon icon="mdi:minus"></ha-icon></button><span class="tv">${tgt != null ? tgt + '°' : '—'}</span><button data-act="hup" data-id="${E(z.entity)}"><ha-icon icon="mdi:plus"></ha-icon></button></div></div>`;
      }).join('');
    }
    /* ---------- lights: Mushroom-style light cards ---------- */
    _renderLights() {
      const el = this._$('lights');
      if (el) el.innerHTML = this._c.lights.map(l => {
        const e = this._st(l.entity), on = e && e.state === 'on', b = e && e.attributes.brightness, na = !e || e.state === 'unavailable', pct = on && b ? Math.round(b / 2.55) : on ? 100 : 0;
        const st = !e ? 'Missing' : na ? 'Unavailable' : on ? (b ? pct + '%' : 'On') : 'Off', rgb = on && e.attributes.rgb_color ? e.attributes.rgb_color.join(',') : RGB.yellow;
        return `<div class="card mc2 ml${on ? ' on' : ''}${na ? ' na' : ''}" data-light="${E(l.entity)}" style="--rgb:${on ? rgb : RGB.grey}"><div class="mrow"><span class="msh"><ha-icon icon="${E(l.icon || (on ? 'mdi:lightbulb' : 'mdi:lightbulb-outline'))}"></ha-icon></span><div class="mx"><div class="mp">${E(l.name || (e && e.attributes.friendly_name) || l.entity)}</div><div class="ms">${st}</div></div></div>${on ? `<i class="mbr" style="width:${pct}%"></i>` : ''}</div>`;
      }).join('');
      this._renderMusic();
      if (this._npOpen) this._renderNp();
    }
    /* ---------- media: Mushroom-style player row ---------- */
    _renderMusic() {
      const el = this._$('music'); if (!el) return;
      const p = this._npPick(), e = p && this._st(p[0]);
      if (!e) { el.innerHTML = `<div class="art"><ha-icon icon="mdi:music-note"></ha-icon></div><div class="mx"><div class="mp">Nothing playing</div><div class="ms">Tap to choose music and speakers</div></div>`; return; }
      const a = e.attributes, playing = e.state === 'playing', ctl = this._ctl(e);
      el.innerHTML = `${a.entity_picture ? `<img class="art" src="${E(a.entity_picture)}" alt="">` : '<div class="art"><ha-icon icon="mdi:music-note"></ha-icon></div>'}
        <div class="mx"><div class="mp">${E(a.media_title || '')}</div><div class="ms">${E([a.media_artist, ctl && ctl.attributes.friendly_name].filter(Boolean).join(' · '))}</div></div>
        <div class="mctl"${ctl ? '' : ' style="opacity:.4;pointer-events:none"'}><button data-act="mp" data-svc="media_previous_track"><ha-icon icon="mdi:skip-previous"></ha-icon></button><button class="pp" data-act="mp" data-svc="media_play_pause"><ha-icon icon="${playing ? 'mdi:pause' : 'mdi:play'}"></ha-icon></button><button data-act="mp" data-svc="media_next_track"><ha-icon icon="mdi:skip-next"></ha-icon></button></div>
        <div class="mbar"><i id="mbar"></i></div>`;
      this._musicProg();
    }
    _click(e) {
      const t = e.composedPath().find(n => n.dataset && n.dataset.act);
      if (t && t.dataset.act === 'phnav') { const base = location.pathname.split('/').slice(0, 2).join('/'); history.pushState(null, '', base + '/' + t.dataset.p); window.dispatchEvent(new CustomEvent('location-changed')); return; }
      if (t && t.dataset.act === 'phscroll') { const s = this._$(t.dataset.s); if (s) s.scrollIntoView({ behavior: 'smooth', block: 'start' }); return; }
      super._click(e);
    }
  }
  customElements.define('home-phone-card', HomePhoneCard);
});
window.customCards = window.customCards || [];
window.customCards.push({ type: 'home-phone-card', name: 'Home Phone Card', description: 'Home panel laid out for a phone' });
