/* home-panel-card — iOS-style wall tablet panel for Home Assistant */
const ICON = {
  'clear-night': 'mdi:weather-night', cloudy: 'mdi:weather-cloudy', fog: 'mdi:weather-fog',
  hail: 'mdi:weather-hail', lightning: 'mdi:weather-lightning', 'lightning-rainy': 'mdi:weather-lightning-rainy',
  partlycloudy: 'mdi:weather-partly-cloudy', pouring: 'mdi:weather-pouring', rainy: 'mdi:weather-rainy',
  snowy: 'mdi:weather-snowy', 'snowy-rainy': 'mdi:weather-snowy-rainy', sunny: 'mdi:weather-sunny',
  windy: 'mdi:weather-windy', 'windy-variant': 'mdi:weather-windy-variant', exceptional: 'mdi:alert-circle-outline'
};
const LABEL = {
  'clear-night': 'Clear', cloudy: 'Cloudy', fog: 'Fog', hail: 'Hail', lightning: 'Thunder',
  'lightning-rainy': 'Thunderstorms', partlycloudy: 'Partly cloudy', pouring: 'Heavy rain', rainy: 'Rain',
  snowy: 'Snow', 'snowy-rainy': 'Sleet', sunny: 'Sunny', windy: 'Windy', 'windy-variant': 'Windy',
  exceptional: 'Warning'
};
/* colour weather icons (original artwork, drawn as inline SVG) */
const WXSVG = (() => {
  const D = '<defs><linearGradient id="hwS" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe066"/><stop offset="1" stop-color="#ffaa00"/></linearGradient>'
    + '<linearGradient id="hwC" gradientUnits="userSpaceOnUse" x1="0" y1="16" x2="0" y2="50"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#cfd8e4"/></linearGradient>'
    + '<linearGradient id="hwK" gradientUnits="userSpaceOnUse" x1="0" y1="16" x2="0" y2="50"><stop offset="0" stop-color="#b7c2d1"/><stop offset="1" stop-color="#7f8ca0"/></linearGradient>'
    + '<linearGradient id="hwM" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff6cc"/><stop offset="1" stop-color="#f3c94f"/></linearGradient>'
    + '<filter id="hwF" x="-20%" y="-20%" width="140%" height="150%"><feDropShadow dx="0" dy="1.5" stdDeviation="1.4" flood-color="#2b3a55" flood-opacity=".22"/></filter></defs>';
  const sun = (x, y, r) => { let o = ''; for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4, c = Math.cos(a), sn = Math.sin(a);
      o += `<line x1="${(x + c * (r + 4)).toFixed(1)}" y1="${(y + sn * (r + 4)).toFixed(1)}" x2="${(x + c * (r + 9)).toFixed(1)}" y2="${(y + sn * (r + 9)).toFixed(1)}"/>`; }
    return `<g stroke="#ffbf1f" stroke-width="3.6" stroke-linecap="round">${o}</g><circle cx="${x}" cy="${y}" r="${r}" fill="url(#hwS)"/>`; };
  const cloud = (g, t) => `<g fill="url(#${g})" filter="url(#hwF)"${t ? ` transform="${t}"` : ''}><circle cx="22" cy="38" r="10"/><circle cx="34" cy="30" r="14"/><circle cx="45" cy="37" r="10"/><rect x="12" y="37" width="43" height="13" rx="6.5"/></g>`;
  const up = 'translate(0,-8)';
  const drops = (xs, len) => `<g stroke="#3d9bff" stroke-width="3.6" stroke-linecap="round">${xs.map(x => `<line x1="${x}" y1="47" x2="${x - 3}" y2="${47 + len}"/>`).join('')}</g>`;
  const flakes = xs => `<g fill="#ffffff" stroke="#8fb0d8" stroke-width="1.4">${xs.map((x, i) => `<circle cx="${x}" cy="${i % 2 ? 57 : 50}" r="3"/>`).join('')}</g>`;
  const bolt = '<path d="M35 40 26 54h7l-4 10 12-15h-7l4-9z" fill="#ffcc1a" stroke="#f0a500" stroke-width="1.2" stroke-linejoin="round"/>';
  const moon = (x, y, k) => `<path transform="translate(${x},${y}) scale(${k})" d="M30 6a22 22 0 1 0 22 30 18 18 0 0 1-22-30z" fill="url(#hwM)" filter="url(#hwF)"/>`;
  const star = (x, y, r) => `<path d="M${x} ${y - r}l${r * .3} ${r * .7} ${r * .7} ${r * .3}-${r * .7} ${r * .3}-${r * .3} ${r * .7}-${r * .3}-${r * .7}-${r * .7}-${r * .3} ${r * .7}-${r * .3}z" fill="#ffe27a"/>`;
  const wind = '<g fill="none" stroke="#8fa3ba" stroke-width="3.8" stroke-linecap="round"><path d="M8 26h30a7 7 0 1 0-7-7"/><path d="M8 36h40a7 7 0 1 1-7 7"/><path d="M8 46h18"/></g>';
  const A = {
    sunny: sun(32, 32, 13),
    'clear-night': moon(4, 6, .95) + star(48, 14, 4) + star(54, 28, 2.6),
    partlycloudy: sun(23, 22, 10) + cloud('hwC', 'translate(5,8) scale(.9)'),
    cloudy: cloud('hwK', 'translate(14,-8) scale(.75)') + cloud('hwC', 'translate(-2,4)'),
    rainy: cloud('hwC', up) + drops([24, 34, 44], 9),
    pouring: cloud('hwK', up) + drops([20, 28, 36, 44], 13),
    lightning: cloud('hwK', up) + bolt,
    'lightning-rainy': cloud('hwK', up) + bolt + drops([20, 48], 9),
    snowy: cloud('hwC', up) + flakes([22, 32, 42]),
    'snowy-rainy': cloud('hwC', up) + drops([24, 44], 9) + flakes([34]),
    hail: cloud('hwK', up) + '<g fill="#eef5ff" stroke="#7fa6d6" stroke-width="1.4"><circle cx="22" cy="51" r="3.2"/><circle cx="33" cy="57" r="3.2"/><circle cx="44" cy="51" r="3.2"/></g>',
    fog: cloud('hwC', up) + '<g stroke="#9aa8ba" stroke-width="3.6" stroke-linecap="round"><line x1="12" y1="49" x2="52" y2="49"/><line x1="18" y1="57" x2="46" y2="57"/></g>',
    windy: wind,
    'windy-variant': cloud('hwC', 'translate(18,-6) scale(.6)') + wind,
    exceptional: '<path d="M32 8 58 54H6z" fill="#ffb020" stroke="#e08a00" stroke-width="2" stroke-linejoin="round"/><path d="M32 24v14" stroke="#fff" stroke-width="5" stroke-linecap="round"/><circle cx="32" cy="46" r="3" fill="#fff"/>'
  };
  return c => `<svg viewBox="3 3 58 58" width="100%" height="100%" aria-hidden="true">${D}${A[c] || A.cloudy}</svg>`;
})();
/* "feels like": the weather entity's apparent_temperature if it has one, else worked out from temperature, humidity and wind
   (wind chill at 10°C and below, the heat index from 27°C, Steadman's apparent temperature in between) */
const FEELS = (t, rh, w, wu) => {
  t = Number(t); if (t !== t) return null; rh = Number(rh); w = Number(w) || 0;
  const kmh = /m\/s/.test(wu || '') ? w * 3.6 : /mph/.test(wu || '') ? w * 1.609 : /kn/.test(wu || '') ? w * 1.852 : w;
  if (t <= 10 && kmh > 4.8) { const v = Math.pow(kmh, 0.16); return 13.12 + 0.6215 * t - 11.37 * v + 0.3965 * t * v; }
  if (rh !== rh) return t;
  if (t >= 27) { const f = t * 9 / 5 + 32, h = -42.379 + 2.04901523 * f + 10.14333127 * rh - .22475541 * f * rh - .00683783 * f * f - .05481717 * rh * rh + .00122874 * f * f * rh + .00085282 * f * rh * rh - .00000199 * f * f * rh * rh; return (h - 32) * 5 / 9; }
  const e = rh / 100 * 6.105 * Math.exp(17.27 * t / (237.7 + t)); return t + 0.33 * e - 0.70 * (kmh / 3.6) - 4.0;
};
const ICOL = c => c === 'sunny' ? '#f59e0b' : c === 'clear-night' ? '#8a9bbd'
  : /rain|pour|hail|light/.test(c || '') ? '#5b9bf0' : c === 'partlycloudy' ? '#f0a43a' : '#9aa6b5';
const WMO = (c, day = 1) => c === 0 ? (day ? 'sunny' : 'clear-night') : c <= 2 ? 'partlycloudy' : c === 3 ? 'cloudy' : c <= 48 ? 'fog'
  : c <= 55 ? 'rainy' : c <= 57 ? 'snowy-rainy' : c === 65 || c === 82 ? 'pouring' : c <= 65 || (c >= 80 && c <= 81) ? 'rainy' : c <= 67 ? 'snowy-rainy'
  : c <= 77 || c === 85 || c === 86 ? 'snowy' : c >= 95 ? 'lightning-rainy' : 'cloudy';
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const pad = n => String(n).padStart(2, '0');
const t12 = (h, m) => (h % 12 || 12) + ':' + pad(m) + ' ' + (h < 12 ? 'am' : 'pm');
const hs = h => (h % 12 || 12) + (h < 12 ? 'am' : 'pm');
const s12 = x => x && String(x).length >= 16 ? t12(+String(x).slice(11, 13), +String(x).slice(14, 16)) : '—';
// Google 'G' (from Home Assistant's brands repo), embedded so it shows even when the tablet can't reach GitHub
const HPC_GLOGO = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAANbklEQVR42s2af4xtVXXHP2vtfc69c997wAMEa1EiKkYQoz5FfiWPh2iUhlBLZqqgQatp09TGqMXammaY1jZGq7ExpUFrCIqAM41V0drWyLwRo8TywDbliT+iYqVU4Pnmzdy5P87Ze63+ce6dHzyGN4OYdic75+6bO/t8v2utvfb6McKTGD45GWRuLq+uL730eEI6D+dC4GXAczE/FdiBSMA9I7IC+rCJ/kgl3EsId1IO75LPf+3QZvtuZci2gE9Pq8zMGICDcPmFl5LDG8jySkSfhSo44A7mzXP1TQoa1qaBuTyIyH4TveUfO+W/TM3NZQdhelrG73nKCKyXjl9x4VWYvAvVPRCgdsgORgYEEcEfs7+oGwqoI+quQYNGIRbggpnf6yIfibfP3bwdbRyTgDuCgID7b513ISl+gBAvwgxSMkwcV8W12cvXbelrr3HRRgsScJrPLuqOGKjEolQ0YNkWMvxR+cXb7vbpaWVmxmXdTtsi4NOozNCYzNV7rqMu/oxUKEMbS1pxB1cwacD7Y7Z0AN1IYPx53feOmqNeFGXI5hXYn8Yv3PLhsbluRkI2NxmCzJH9qnN2s1NuhtZlLLtTBaOOAZM1hC5gIxKP1QJjAmEENIyIrH23gYhLFiHEoiTV1c2DoO/e+aLnPLqZJnRTyc+R/Z3P+3V+rb6DHVxGHtQUGUoLlBl0/QH1tTleb1CCjGQljSxl3ZqNaxGCu1tKdYpl643t2l8sMzPG5OTjYg2bmY3/5bNPpbCvUYRzGOSESNEgkQagjyTtug60NHgdRyQDBmKOGiI2PgsiKkebUQPF3F1FCCEES9Ubi9tv+bxPT6tcf70d04TcEa5DOO60FmL7oTyXX0iijpFhgGo063XPOkAWwA0XwzUicaRcGT3D2togiyZHVTTqyP5BdAzeQwhaV+ma1pdv/dSxvFHcsJpDZYbsH+//Ha3iXB6pajpFwSBvpLv+KaNzIRrQoAwtYel+sh5E/EFM+kjRNgnPcNEXIOEFoShLDJJ5dkFFRBrw6jGoVrkBf/eePYXMzdVP5GhWCfgsQabIftsJV9Pya/hFXTMRi8Y+fRO9uRGi0gqBnv2QZJ/Eiy/wla/fv5nXGLz2N88k1Zcj8a2xbL3AspGcrCKyCv6Lt37K9+wp5MCBekv3gE+PDvOLdpxMDP+J6Ul0BYZBGSgM47o5Mp+hZigCA1liEGaQ+ga5+T9W1l98PPzwmomecopvCD/2XtPOxw9/H5GZEIpdZu7DXL+lc/ttN/nevVEWFtKWb+JV6X9l58fYKW/nERIpRCqFodKQCGskBiGhRWRF7mbANXLDwYMNqL2RixeMGTa9fHx6Wtm/X8cAh1dMnhND56ZUVde3vnTr39+9Z0/xsi1Ifs0BOiqC+ULr2Vi8jyQtKoRahUqhkuagDqUh0deMtgJH9GtU8XXyoe8t+/TeyMxCfqIb8ygiIExOqszN5fm9e+O+hYW0PtbaOoF5ouwj+Z2dD7ND38UhT7hEEiPwujaHkgkh0OXfqNgn1/58ZXzh8STHGLTjIo+9QLZsQt9gF9L5AUFOZYCRUbJABpJALVCr4Qq1LDLML5W3LT4wNj1+yfFEocKxRuOFOhOXMCGnctiNKDpyj8226s0M7pQEFv098qYjD4w1x1Mwniz49W70NyhwSozs2gBvIt8mQJZMh0AvfYfXd2/0QGDfFiU/7bp3k5Dllx0LM+To80SD87VyQVDCSPoN8DUiE0CSj4pgPk/cstRmxBbA+BWNyEmtZ5E4g3qkzfURgDpkaUxnaIchfAmAi7cg/WlXZsRe/Bd+gba5MNfU+hRpwgXBqYNyU8TC87TwjtVNnDU+UavBoroxIQGTu2Tv8qGx2z3WS/aCLoARuKI4jvfQHcVuT9GhwaHqcW/E8+kUgibMITDOBsdEAk4LaNm3HYT9KNsxCWel7pHykHRU7PXk8ZsUaIBnxkw+JYhiSJM7jn8iTU7ujqgDIj+SjWn6Vl2kygi4PEUEHLIqAeHpUSztwBV3bQ6APDb5aP4iuR8e2b/zfz28gZWdE6KOcxo3nCYp2UhkdNqD8f9tiNCKaNFtBJ5X6Tm2auXmjeuoatsNwP7t1ZJ+pYpwcsyWHwk2SlzXhf4++soERwVUzljL2rcTbOHu5EbjWyDf/EjXHchNr26BpRiCPUCt4C7rgTcT8ohF5f5ywLl4e5eSC63YJngmbNWNegLPT+iFZFQM+XlE4w9ylXsh0KmzOCIyVojhJEe9Z1Tu5y9+kxNF+IX7utrbJuOUs1drcz/IQ+70mmSPU0R4LDAHE+c5EjjN86pdHPVTS2DOT8Xniem4eG9s6wuHfcxFNOOYOxknu5Oc3NlFOLzkbz79FXbT/Dxx31MUyD3eeP4Hl2eL1s5JeilFj/EoI1MEo+vCOVH2kaoDehelnJ0HbuamCcccapzKoQL6NSy5vMOn+fTcI2MT3IpL9UZX1x3D/g8inIWffsLicVUa7PMcCWJBgOAbOLgGxIyfnDDgZxHAlC9jvK02F8OpcYYOQxrwFYRhj1zu4iV3vEavmTrfbty6FsRH0P0YsVNkRnL+6E9fJ7tOPjktr2S0FcQTYoqO6k8OJhHxigMLM5IUoDus7lg8kh/WwsIAtxWHLtB1WHY4Ys4iLg/1zBajf+jWBZ65bx9pdvaJbXob/lA4e86f+zffb9VavTdZ13NIkjWRJZMl4eIby3zCVwF0fp548nksJfwzYQJWHOsBvRGJI+4surPopg9X7t3oJx0qZPbGedpTU+TJX56E8PEDkamp/Gix8n7f1T4z1UuWNWnWmixpdTrmGgi5x7IXDYHVpP6Bb3NGDuG+vlN2E9LHZQVYcafvTh9hCPSz5LBLQ7cXvnIcwyvffQH9PTfsKQ783oHEdjMrn1bmzhampvLOT+z/3VCedEPoeQ5WaswtiVYSc0m0kmgFwWJqtYqY+nz2398nr5+c9RBFsNlZwunn8qPvfItPdnbzByuHPfXEY9ecRhtCH6HvgaGE0F8OiZ3Fa/+rv/uO3/7qxDWffdWB7wMwvzey/2LjiSoL7sLcXGPQMpUBOp/54rWIfNAGS4aWKiDZm7tMXJspgohozpGIfGxDUj89Kmy97tWcvFzoff3AiYeHxgroigs9lJ4HVjyyRMkRb9O1Vk6dduhVrcPLXs60Q/z4XRfc1V8FOjsZeNrDAhc360cOOpNzxrr7o5j7xIsC7feH4oTLWcYktUXyDgm5RcwtQm6zqoVc5FbrxMDK8KsH/6T96nHCtOraZmcJU1Pkf/qmXh2O85v/Z8nrrkvRReh6wZIXHKFg2Ut6XjKgxUourY5tzRMd+ivhe7WXn3Tk9gf2/ev9mylg1+fee1KKExeYT1wl1r5Sit0FyzmLdYLkDpI6aO4QcotgbYpcEnLp0dpWSIdQ+bn3//HOe5j0wJzkDb551glTQv70ndwYT5Q3//dh6iUpiiUvWPaCrhf0KOl7i56XDGkxsLZXlGZlK+RWm2qZeujld5O378f8wUy5Yt5q43KqeesMrP18yh0nIx28C+RWljwRsAkkTSC5g+QOmtpEaxNzm5CKutV5RiGLi3/942uffi2zHphqos+jyutTc+hlL6cYPCTzwx163s+WytQjxu5I+g34FgNaDL3FkBbJS2oKS1Za1iLWxQS5KEcl8wLzAkzwusCHAa8xvHTyhLpPCLmNWBvJE81MO5DUIVibkMpUlE+LulLf3WFw0Q+/8Z3E7KQh4kd1aETws+7D3/JsBl33K4709KDuDHHgIQ09UHmkZjwLagoyBZlI9qhZQkwWPQ/MfLlOtlQlXx4klvvNczDIkisXNUVTQCtBKtAK3zAHeBiSpUrWjjHn5YeyrUz+8B1nDjlr0sfgH7dDs7CATzv6vmfRff4bWl8wDZekneUzlgdFXXmpA0oZUlJ7SaIk+ZhEQfISI4qLCqKKiCKqoCoy6mJIk+aNYzQZd7pGVZ3VbNBI0t4RMR7N/aXLDr3jpd9ldjbw9hfaMXtkM4JNzhJuuLT/4I8P6SXdnnxZji+LmkjtISePpEbqGIHsgUwzfQTCjwp9mvgWsab7JBkkgdTIOi0glbsME8eX0XzlxykdeuWRP7zgHmZnA1NTeVtt1mlHZ0YllNd8/fQ/78WJ9w3ChPZWilzRkpqWNlooqb0xJUdXcwloupLuuq5zGXCP4AG3iHsBVkJuu+eJjHSitk7CV+SfZSi/03vTlQ+tP7RPqtEto171K+bPuqguOh8YtjoXVnVJ1VervfDUEBFHsVUNjP7oKALSgPcAHt29MM/RkYlIezfWC4e0br+/f+VbPzry748r+W3/q8GkE+akKTie+fW9VyeKd6Zi4qVJ21SDQK7EXdTcmz6qyzhxGhMAXFcLNW5B0EIpJ3Bt4V1fdNtxEz0+Mph6709xF667TjhGv2BbOe56k2J6Wk975T2vrnL5htqKSwjxNC8LMPBkuHnzeUwAgRAgKBIEsmJDuk68xyk+x7D4h/7lf/XgVqT+pAmsaWMyzMlav+v4O6/arTmcb8ZFOC/BeZ7BqeJ0XKK6iQEDd30UlZ8AB93krqDFt5Zf9bffX7tJZwP33edso0vzv0BPUnZliduBAAAAAElFTkSuQmCC';
const hm = d => { d = new Date(d); return isNaN(d) ? '—' : t12(d.getHours(), d.getMinutes()); };
const ago = t => { const s = (Date.now() - new Date(t)) / 1000; if (!isFinite(s)) return ''; if (s < 60) return 'now';
  if (s < 3600) return Math.floor(s / 60) + 'm ago'; if (s < 86400) return Math.floor(s / 3600) + 'h ago'; return Math.floor(s / 86400) + 'd ago'; };
const mmss = s => { s = Math.max(0, Math.floor(s || 0)); return Math.floor(s / 60) + ':' + pad(s % 60); };
const r0 = v => (v === undefined || v === null || v === '') ? '—' : Math.round(Number(v));
const DOW = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const COMPASS = b => ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'][Math.round(((Number(b) || 0) % 360) / 45) % 8];

const CSS = `
:host{display:block;--bg:linear-gradient(160deg,#eef1f5,#dde3ea);--card:rgba(255,255,255,.72);--card2:rgba(255,255,255,.55);
--text:#1c1c1e;--sub:#8a8f98;--line:rgba(0,0,0,.06);--accent:#f08a24;--shadow:0 8px 30px rgba(30,40,60,.08);
font-family:-apple-system,BlinkMacSystemFont,"SF Pro Display","Inter","Segoe UI",Roboto,sans-serif;color:var(--text)}
:host(.dark){--bg:linear-gradient(160deg,#121418,#1b1f26);--card:rgba(40,44,52,.72);--card2:rgba(60,65,75,.5);
--text:#f2f2f7;--sub:#9aa0aa;--line:rgba(255,255,255,.07);--shadow:0 8px 30px rgba(0,0,0,.35)}
*{box-sizing:border-box}
.root{background:var(--bg);height:calc(100vh - var(--header-height,56px));min-height:620px;padding:18px;position:relative;overflow:hidden;display:flex;flex-direction:column}
.ttl{flex:0 0 auto;font-size:28px;font-weight:700;letter-spacing:-.02em;line-height:1.1;margin:0 4px 14px}
.grid{display:grid;grid-template-columns:minmax(260px,var(--lw,30%)) 1fr;gap:16px;flex:1 1 auto;min-height:0}
.left,.right{display:flex;flex-direction:column;gap:16px;min-height:0}
.card{background:var(--card);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border-radius:26px;box-shadow:var(--shadow);
border:1px solid rgba(255,255,255,.35)}
:host(.dark) .card{border-color:rgba(255,255,255,.06)}
.stats{display:grid;grid-template-columns:repeat(8,minmax(0,1fr));gap:10px;flex:0 0 auto;margin-bottom:14px}
.st{display:flex;align-items:center;gap:9px;padding:9px 10px;min-width:0;cursor:pointer;border-radius:20px;transition:background .2s}
.st .sti{width:32px;height:32px;border-radius:50%;flex:0 0 auto;display:flex;align-items:center;justify-content:center;background:rgba(var(--rgb),.15);color:rgb(var(--rgb))}.st .sti ha-icon{--mdc-icon-size:18px}
.st .sx{min-width:0}.st .sv{font-size:16px;font-weight:700;line-height:1.15;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;letter-spacing:-.01em}.st .sv small{font-size:11px;font-weight:500;color:var(--sub);margin-left:2px;text-transform:none;letter-spacing:0}
.st .sk{font-size:9.5px;font-weight:600;letter-spacing:.05em;text-transform:uppercase;color:var(--sub);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-top:1px}
.ewk{display:flex;gap:14px;font-size:12px;color:var(--sub);font-weight:600;margin-top:2px}.ewk span{display:flex;align-items:center;gap:5px}.ewk i{width:9px;height:9px;border-radius:3px;display:block}
.en .efh{display:flex;align-items:center;gap:8px;margin-bottom:2px}.efi{width:26px;height:26px;border-radius:8px;background:rgba(34,160,107,.14);color:#22a06b;display:flex;align-items:center;justify-content:center;flex:0 0 auto}.efi ha-icon{--mdc-icon-size:16px}.en .efh .lbl{flex:1;min-width:0;letter-spacing:.05em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.efr{font-size:13px;font-weight:700;white-space:nowrap}.en .efh .elogo{width:24px;height:24px;margin:0 -2px 0 2px;flex:0 0 auto}.efl{position:relative;flex:1 1 auto;min-height:80px}.efl svg{position:absolute;left:0;right:0;top:calc(50% - 38px);width:100%;height:60px}.efln{fill:none;stroke:var(--line);stroke-width:2}.effl{fill:none;stroke-width:2.6;stroke-linecap:round;stroke-dasharray:2 9;animation:efa var(--sp,1.6s) linear infinite}@keyframes efa{to{stroke-dashoffset:-22}}.efn{position:absolute;top:calc(50% - 8px);transform:translate(-50%,-50%);width:54px;height:54px;border-radius:50%;background:var(--card);border:2.5px solid rgb(var(--c));box-shadow:0 0 0 4px rgba(var(--c),.1);display:flex;flex-direction:column;align-items:center;justify-content:center;line-height:1.05;box-sizing:border-box}.efn.big{width:62px;height:62px}.efn ha-icon{--mdc-icon-size:14px;color:rgb(var(--c))}.efn b{font-size:11.5px;font-weight:700;white-space:nowrap;letter-spacing:-.02em}.efn.big b{font-size:15px}.efn span{font-size:8.5px;color:var(--sub);font-weight:600}.efn i{position:absolute;top:calc(100% + 13px);left:50%;transform:translateX(-50%);font-style:normal;font-size:8.5px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:var(--sub);white-space:nowrap}.efb{display:none;grid-template-columns:repeat(3,minmax(0,1fr));gap:6px;margin-top:6px}.efb>div{background:var(--card2);border-radius:12px;padding:7px 10px;min-width:0}.efb .k{display:block;font-size:10.5px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--sub)}.efb b{display:block;font-size:19px;font-weight:700;letter-spacing:-.01em;line-height:1.2}.efb small{display:block;font-size:11px;color:var(--sub);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.en .ok{color:#22a06b}.efs{font-size:11.5px;color:var(--sub);text-align:center;margin-top:4px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.efs b{color:var(--text);font-weight:700}.en .eft{display:none;font-style:normal}@container en (min-height:200px){.en .efb{display:grid;margin-top:14px}.en .efc{display:none}.en .eft{display:inline}}.efn.big i{top:calc(100% + 9px)}.en .efc{font-style:normal}.efn i .efc{color:var(--text)}.efs{display:none}
.card.wx{min-height:100px}.hvo{flex:0 1 auto;padding:12px 16px 10px;display:flex;flex-direction:column;cursor:pointer;min-height:0;overflow:hidden}.hvo .head{margin-bottom:4px}.hvr{font-size:11px;color:var(--sub);font-weight:600}.hvt{display:flex;align-items:flex-end;gap:18px}.hvt .k{font-size:10px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:var(--sub);display:flex;align-items:center;gap:5px}.hvt .k i{width:8px;height:8px;border-radius:50%;display:block}.hvt b{font-size:24px;font-weight:700;letter-spacing:-.02em;line-height:1.15}.hvd{margin-left:auto;text-align:right}.hvd b{font-size:15px;display:block}.hvd span{font-size:10.5px;color:var(--sub)}.hvc{position:relative;flex:1 1 74px;min-height:30px;max-height:74px;margin-top:6px}.hvc svg{position:absolute;inset:0;width:100%;height:100%}.hyl{position:absolute;right:0;font-size:9px;font-weight:700;color:var(--sub);line-height:12px;background:var(--card);padding-left:3px;border-radius:4px}.hvx{display:flex;justify-content:space-between;font-size:9.5px;font-weight:700;color:var(--sub);margin-top:3px}
@container side (max-height:420px){.side .music.big{padding:10px 14px;gap:12px}.side .music.big .mart{width:72px;height:72px;border-radius:12px}}@container side (max-height:390px){.side .alarm{padding:8px 12px;gap:6px}.side .alarm .lbl{display:none}.side .alarm .aseg button{padding:5px 4px}.side .alarm .ash{width:32px;height:32px}}@container en (max-height:128px){.en .efl{min-height:60px}.en .efn{width:44px;height:44px;border-width:2px}.en .efn.big{width:52px;height:52px}.en .efn ha-icon{display:none}.en .efn b{font-size:10.5px}.en .efn.big b{font-size:13px}.en .efn i{top:calc(100% + 15px);font-size:10.5px;letter-spacing:.04em}.en .efn.big i{top:calc(100% + 11px)}.en .efh{margin-bottom:0}}
.card.st.hi{background:rgba(var(--rgb),.13);box-shadow:inset 0 0 0 1px rgba(var(--rgb),.35),var(--shadow)}.st.hi .sti{background:rgb(var(--rgb));color:#fff}
@media (max-width:1000px){.stats{grid-template-columns:repeat(4,minmax(0,1fr))}}@media (max-width:600px){.stats{grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}}
.lbl{font-size:11px;letter-spacing:.09em;text-transform:uppercase;color:var(--sub);font-weight:600}
/* clock */
.clock{display:flex;align-items:center;gap:16px;padding:12px 18px;flex:0 0 auto;cursor:pointer}
.clocksvg{width:clamp(92px,10vw,122px);height:auto;flex:0 0 auto}.clock.dig{flex-direction:column;align-items:flex-start;justify-content:center;gap:4px;padding:14px 20px 16px}.dgt{display:flex;align-items:baseline;gap:6px;line-height:.95}.dgt #dtm{font-size:clamp(46px,5.4vw,66px);font-weight:600;letter-spacing:-.04em;font-variant-numeric:tabular-nums}.dgt b{font-weight:600;transition:opacity .3s}.dgt b.off{opacity:.25}.dgt .ap{font-size:clamp(16px,1.7vw,20px);font-weight:600;color:var(--sub)}.dgd{display:flex;gap:7px;align-items:baseline;font-size:clamp(15px,1.55vw,19px);font-weight:600;margin-top:2px}.dgd .d{color:var(--accent)}.dgs{align-self:stretch;height:3px;border-radius:2px;background:var(--line);margin-top:8px;overflow:hidden}.dgs i{display:block;height:100%;background:var(--accent);border-radius:2px;transition:width 1s linear}.clock.dig.dr{display:grid;grid-template-columns:auto 1fr;align-items:center;column-gap:14px;row-gap:0}.clock.dig.dr .dgd{flex-direction:column;align-items:flex-end;gap:2px;text-align:right;margin-top:0;justify-self:end}.clock.dig.dr .dgd .d{font-size:clamp(17px,1.8vw,22px)}.clock.dig.dr .dgd span:last-child{color:var(--sub);font-weight:500}.clock.dig.dr .dgs{grid-column:1 / -1;margin-top:10px}
.face{fill:none}.ticks line{stroke:var(--sub);stroke-width:.6;stroke-linecap:round}
.nums text{font-size:8.5px;fill:var(--text);font-weight:500}
.hand{stroke-linecap:round}.hand.h{stroke:var(--text);stroke-width:2.6}.hand.m{stroke:var(--text);stroke-width:1.8}
.hand.s{stroke:var(--accent);stroke-width:.9}.pin{fill:var(--accent)}
.date .top{font-size:clamp(18px,2vw,24px);font-weight:600;line-height:1.1}
.date .top .d{color:var(--accent);margin-right:.28em}.date .num{font-size:clamp(36px,4.2vw,52px);font-weight:600;line-height:1}
/* weather */
.wx{flex:1 1 162px;min-height:162px !important;padding:16px 18px;display:flex;flex-direction:column;cursor:pointer;min-height:0;overflow:hidden;position:relative}
.wx.sunny{background:linear-gradient(165deg,#bcd9f3 0%,#e7f0f8 55%,#fbf1e6 100%)}
.wx.cloud{background:linear-gradient(165deg,#c9d3df,#edf0f4)}
.wx.rain{background:linear-gradient(165deg,#a9b9cd,#e1e7ee)}
.wx.night{background:linear-gradient(165deg,#1f2b46,#3b4b6c);color:#f2f2f7}
:host(.dark) .wx.sunny{background:linear-gradient(165deg,#28496d,#22303f 60%,#3a3024)}
:host(.dark) .wx.cloud{background:linear-gradient(165deg,#36404d,#262b33)}
:host(.dark) .wx.rain{background:linear-gradient(165deg,#2c3a4d,#1f252e)}
.wx.night .lbl,.wx.night .cond{color:rgba(255,255,255,.7)}
.wx .row{display:flex;justify-content:space-between;align-items:flex-start}
.temp{font-size:clamp(44px,5vw,64px);font-weight:600;line-height:1;margin-top:6px}
.wx .temp{font-size:clamp(40px,4.4vw,56px);margin-top:4px}
.temp sup{font-size:.4em;font-weight:500;vertical-align:top;position:relative;top:.25em}
.wx ha-icon.big{--mdc-icon-size:54px}
.cond{color:var(--sub);font-size:14px;margin-top:6px}
.wx .cond{font-size:13px;margin-top:4px;display:flex;flex-wrap:wrap;align-items:center;gap:4px 10px}.wx .cond ha-icon{--mdc-icon-size:15px;color:var(--accent);margin-right:2px}.wx .cond span{display:inline-flex;align-items:center;white-space:nowrap}
.chart{margin-top:auto;padding-top:8px}
.hstrip{display:flex;gap:4px;overflow-x:auto;scrollbar-width:none;margin-top:6px;scroll-snap-type:x mandatory;-webkit-overflow-scrolling:touch}
.hstrip::-webkit-scrollbar{display:none}
.hc{flex:0 0 calc((100% - 20px) / 6);min-width:52px;scroll-snap-align:start;display:flex;flex-direction:column;align-items:center;gap:4px;padding:8px 0;border-radius:12px}
.hc.now{background:var(--card2)}
.hc .t{font-size:12px;color:var(--sub);font-weight:600}.hc ha-icon{--mdc-icon-size:26px}
.hc .v{font-size:16px;font-weight:600}.hc .p{font-size:11px;color:#3b82f6;font-weight:700;min-height:14px;white-space:nowrap;display:inline-flex;align-items:center;gap:1px}.hc .p ha-icon{--mdc-icon-size:11px}.hc .p.lo{opacity:.55}
.hc .mm{font-size:10px;color:var(--sub);min-height:12px;white-space:nowrap}.wx.night .hc .mm{color:rgba(255,255,255,.6)}
.wx.night .hc .t{color:rgba(255,255,255,.7)}.wx.night .hc .p{color:#8ec5ff}.wx.night .hc.now{background:rgba(255,255,255,.12)}
.wdays{display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin-top:10px;padding-top:10px;border-top:1px solid var(--line)}
.wd{display:flex;flex-direction:column;align-items:center;gap:2px;font-size:12px}.wd .n{color:var(--sub);font-weight:600}.wd ha-icon{--mdc-icon-size:24px}.wd .t{font-weight:600;font-size:13px}.wd .t small{color:var(--sub);font-weight:500;margin-left:4px}
.wx.night .wd .n,.wx.night .wd .t small{color:rgba(255,255,255,.7)}.wx.night .wdays{border-color:rgba(255,255,255,.14)}
.chart .empty2{font-size:13px;color:var(--sub);padding:14px 0}
.suns{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:10px}
.sun{background:var(--card2);border-radius:16px;padding:8px 12px;display:flex;align-items:center;gap:10px}
.sun ha-icon{--mdc-icon-size:20px;color:var(--accent)}.sun .lbl{text-transform:none;letter-spacing:0;font-weight:500}
.sun .t{font-size:17px;font-weight:600}
/* cameras */
.cams{flex:1 1 auto;padding:14px 16px 16px;display:flex;flex-direction:column;min-height:0}
.head{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;padding:0 4px}
.chd{display:flex;align-items:center;gap:8px}.chd img{width:26px;height:26px;object-fit:contain;display:block}
.pill{background:var(--card2);border:0;border-radius:999px;padding:7px 14px;font:inherit;font-size:13px;font-weight:500;color:var(--text);cursor:pointer}
.camgrid{flex:1;display:grid;grid-template-columns:1fr 1.25fr;grid-template-rows:1fr 1fr;gap:12px;min-height:0}
.cam{position:relative;border-radius:18px;overflow:hidden;background:#20242b;cursor:pointer}
.cam.big{grid-row:span 2}.cam:only-child{grid-column:span 2}
.cam img{width:100%;height:100%;object-fit:cover;display:block}
.cam .nm{position:absolute;left:14px;bottom:12px;color:#fff;font-weight:600;font-size:14px;text-shadow:0 1px 6px rgba(0,0,0,.6)}
.cam .ago{position:absolute;right:10px;top:10px;background:rgba(0,0,0,.45);color:#fff;font-size:11px;font-weight:600;padding:3px 9px;border-radius:999px;backdrop-filter:blur(8px)}.cam .ago.mo{background:rgba(229,72,77,.9)}.cam .ago.old{background:rgba(234,88,12,.85)}
.cam .play{position:absolute;right:12px;bottom:10px;width:30px;height:30px;border-radius:50%;background:rgba(255,255,255,.9);display:flex;align-items:center;justify-content:center;color:#111}
.cam .play ha-icon{--mdc-icon-size:18px}
.cam .off{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:#888;font-size:13px}
/* energy */
.toprow{display:flex;gap:12px;flex:1 1 auto;min-height:0}.toprow .cams{flex:1 1 auto;min-width:0}.tcol{flex:1 1 auto;min-width:0;min-height:0;display:flex;flex-direction:column;gap:16px}.tcol .cams{flex:1 1 auto;min-height:0}
.en{flex:0 0 clamp(220px,28%,320px);padding:14px 16px;display:flex;flex-direction:column;cursor:pointer;min-height:0;overflow:hidden}
.en .head{margin-bottom:4px;padding:0;align-items:flex-start}.en .elogo{width:34px;height:34px;object-fit:contain;flex:0 0 auto;margin:-4px -4px 0 0}.en .rng{font-size:11px;color:var(--sub);font-weight:600}
.etot{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:6px}
.etot .k{font-size:11px;color:var(--sub);display:flex;align-items:center;gap:5px;font-weight:600}.etot .k i{width:9px;height:9px;border-radius:3px;display:block}
.etot .v{font-size:20px;font-weight:600;line-height:1.2}.etot .v small{font-size:11px;color:var(--sub);font-weight:500;margin-left:3px}.etot .c{font-size:11px;color:var(--sub)}
.ech{flex:1 1 auto;min-height:80px;display:flex;flex-direction:column;margin-top:10px}
.ebars{flex:1 1 auto;display:flex;align-items:stretch;gap:6px;min-height:0;border-bottom:1px solid var(--line);background:repeating-linear-gradient(to top,transparent 0,transparent calc(25% - 1px),var(--line) calc(25% - 1px),var(--line) 25%)}
.ebd{flex:1;display:flex;align-items:flex-end;justify-content:center;gap:2px;min-width:0}
.ebd b{display:block;width:42%;max-width:22px;border-radius:4px 4px 0 0;min-height:2px;position:relative}
.ebd b span{position:absolute;bottom:100%;left:50%;transform:translateX(-50%);font-size:10px;font-weight:600;color:var(--sub);white-space:nowrap;margin-bottom:2px}
.exl{display:flex;gap:6px;margin-top:5px}.exl span{flex:1;text-align:center;font-size:10px;color:var(--sub);font-weight:600}
.ech.big{height:260px;flex:0 0 auto;margin-top:18px}.ech.big .ebd b{max-width:30px}.ech.big .exl span{font-size:12px}
.etab{width:100%;border-collapse:collapse;margin-top:18px;font-size:13px}.etab th{text-align:right;font-size:11px;color:var(--sub);font-weight:600;padding:6px 8px}.etab th:first-child,.etab td:first-child{text-align:left}
.etab td{text-align:right;padding:7px 8px;border-top:1px solid var(--line);font-variant-numeric:tabular-nums}.etab tr.tot td{font-weight:700}
.side{flex:0 0 var(--sw,clamp(260px,32%,380px));display:flex;flex-direction:column;gap:12px;min-height:0;min-width:0}
:is(.side,.hrow) .en{flex:1 1 0;min-height:140px;padding:12px 16px}:is(.side,.hrow) .en .etot .v{font-size:18px}:is(.side,.hrow) .en .ech{min-height:44px;margin-top:8px}
.side .music{flex:0 0 auto}
.music.big{padding:14px 16px;gap:16px}.music.big .mart{width:112px;height:112px;border-radius:16px}.music.big .mart ha-icon{--mdc-icon-size:44px}
.music.big .mn{font-size:18px;margin-top:4px}.music.big .ma{font-size:14px;margin-top:2px}.music.big .mc{gap:8px;margin-top:12px}
.music.big .mc button{width:40px;height:40px}.music.big .mc button ha-icon{--mdc-icon-size:22px}.music.big .mc .pp{width:48px;height:48px}.music.big .mc .pp ha-icon{--mdc-icon-size:26px}.music.big .mbar{height:4px}
.music.art{color:#fff;border-color:transparent;min-height:170px;align-items:flex-end;justify-content:flex-end;background:#222}
.music.art .mbg{position:absolute;inset:0;background-size:cover;background-position:center}
.music.art .mbg::after{content:"";position:absolute;inset:0;background:linear-gradient(to left,rgba(0,0,0,.82),rgba(0,0,0,.45) 55%,rgba(0,0,0,.05))}
.music.art .mi{position:relative;z-index:1;flex:0 1 auto;max-width:88%;text-align:right}.music.art .mc{justify-content:flex-end}.music.art .lbl,.music.art .ma{color:rgba(255,255,255,.82)}
.music.art .mc button{background:rgba(255,255,255,.22);color:#fff;backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px)}.music.art .mc .pp{background:#fff;color:#111}
.music.art .mbar{z-index:1;background:rgba(255,255,255,.25)}.music.art .mbar i{background:#fff}
.bottom .carc{flex:0 0 var(--sw,clamp(260px,32%,380px))}.bottom .carc.multi{gap:10px;padding:12px 16px}
.bottom .crow{gap:12px}.bottom .crow+.crow{padding-top:10px}.bottom .crow .clogo{width:36px;max-height:38px}.bottom .crow .cn{font-size:14px}
.bottom .crow .cv b{font-size:23px}.bottom .crow .cv small{font-size:12px}.bottom .crow .cs{font-size:12px}.bottom .crow .bbar{height:6px;margin:5px 0 4px}
/* lights */
.lights{display:flex;gap:12px;flex:0 0 auto}
.tile{flex:1 1 0;min-width:0;padding:14px 14px 12px;cursor:pointer;user-select:none;-webkit-user-select:none;transition:transform .12s,background .2s}
.tile:active{transform:scale(.97)}
.tile.on{background:rgba(255,246,236,.85)}
:host(.dark) .tile.on{background:rgba(80,62,40,.75)}
.tile .ic{width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:var(--card2);color:var(--sub)}
.tile.on .ic{background:var(--accent);color:#fff}
.tile .ic ha-icon{--mdc-icon-size:20px}
.tile .n{margin-top:14px;font-size:14px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.tile .s{font-size:12px;color:var(--sub);margin-top:2px}
.bottom{display:flex;gap:12px;flex:0 0 auto}.bottom .lights{flex:1 1 auto;min-width:0}
/* music */
.music{flex:0 0 clamp(220px,28%,320px);display:flex;align-items:center;gap:12px;padding:10px 12px;cursor:pointer;position:relative;overflow:hidden}
.music .mart{width:56px;height:56px;border-radius:12px;object-fit:cover;background:var(--card2);flex:0 0 auto;display:flex;align-items:center;justify-content:center;color:var(--sub)}
.music .mart ha-icon{--mdc-icon-size:24px}
.music .mi{flex:1;min-width:0}
.music .mn{font-size:14px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-top:2px}
.music .ma{font-size:12px;color:var(--sub);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-top:1px}
.music .mc{display:flex;gap:4px;margin-top:6px;align-items:center}
.music .mc button{width:30px;height:30px;border-radius:50%;border:0;background:var(--card2);color:var(--text);display:flex;align-items:center;justify-content:center;cursor:pointer}
.music .mc button ha-icon{--mdc-icon-size:18px}
.music .mc .pp{width:34px;height:34px;background:var(--accent);color:#fff}
.music .mc.dis{opacity:.35;pointer-events:none}
.music .mbar{position:absolute;left:0;right:0;bottom:0;height:3px;background:var(--line)}.music .mbar i{display:block;height:100%;width:0;background:var(--accent)}
/* tfl */
.tfl{flex:0 0 auto;padding:12px 16px;display:flex;align-items:center;gap:14px;cursor:pointer}.tfl .tlogo{width:42px;height:42px;flex:0 0 auto;object-fit:contain}.tfl .trows{flex:1;min-width:0;display:flex;flex-direction:column;gap:10px}
.tflhd{display:flex;align-items:center;gap:10px}.tflhd img{width:30px;height:30px;object-fit:contain}
.tl{display:flex;align-items:center;gap:12px;min-width:0}
.tl .ln{width:6px;height:34px;border-radius:3px;flex:0 0 auto}
.tl .tx{flex:1;min-width:0}
.tl .nm{font-size:14px;font-weight:600}
.tl .ds{font-size:12px;color:var(--sub);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-top:1px}
.tgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(290px,1fr));gap:10px;margin-top:16px}
.tgrid .tl{background:var(--card2);border-radius:16px;padding:10px 14px}.tgrid .tl .ds{white-space:normal}
.tl .bd{flex:0 0 auto;font-size:12px;font-weight:600;padding:4px 10px;border-radius:999px;white-space:nowrap}
.bd.ok{background:rgba(34,160,107,.14);color:#1a8a5a}
.bd.minor{background:rgba(240,138,36,.16);color:#c36a10}
.bd.bad{background:rgba(229,72,77,.15);color:#d23a3f}
.bd.idle{background:var(--card2);color:var(--sub)}
:host(.dark) .bd.ok{color:#4cc38a}:host(.dark) .bd.minor{color:#f5a54a}:host(.dark) .bd.bad{color:#ff6b70}
/* car */
.hrow{display:flex;gap:12px;flex:0 0 auto}.hrow .heat{flex:1 1 auto;min-width:0}
.carc{flex:0 0 clamp(220px,28%,320px);padding:12px 14px;display:flex;gap:12px;align-items:center;cursor:pointer;position:relative;overflow:hidden}
.carc .clogo{width:50px;height:auto;max-height:62px;flex:0 0 auto;object-fit:contain}
.carc.multi{flex-direction:column;align-items:stretch;justify-content:center;gap:8px;padding:10px 14px}
.crow{display:flex;align-items:center;gap:10px;cursor:pointer;min-width:0}.crow+.crow{border-top:1px solid var(--line);padding-top:8px}
.crow .clogo{width:30px;max-height:32px}.crow .cx{flex:1;min-width:0}
.crow .cn{font-size:13px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.crow .bbar{margin:4px 0 3px;height:5px}.crow .cs{font-size:11px}
.crow .cv{text-align:right;flex:0 0 auto}.crow .cv b{display:block;font-size:20px;font-weight:600;line-height:1.05}.crow .cv small{font-size:11px;color:var(--sub);white-space:nowrap}
:host(.dark) img.inv{filter:invert(1)}
.carhd{display:flex;align-items:center;gap:14px;margin-right:52px}.carhd .crest{width:42px;height:auto}.carhd .wm{height:16px;width:auto}:host(.dark) .carhd .wm{filter:invert(1)}
.carc .cx{flex:1;min-width:0}
.carc .soc{font-size:26px;font-weight:600;line-height:1.1}.carc .soc small{font-size:13px;color:var(--sub);font-weight:500;margin-left:6px}
.bbar{height:6px;border-radius:3px;background:var(--line);margin:6px 0;overflow:hidden}.bbar i{display:block;height:100%;border-radius:3px}
.carc .cs{font-size:12px;color:var(--sub);display:flex;align-items:center;gap:4px;white-space:nowrap;overflow:hidden}.carc .cs span{overflow:hidden;text-overflow:ellipsis}.carc .cs ha-icon{--mdc-icon-size:14px;flex:0 0 auto}
.cs.chg{color:#22a06b;font-weight:600}.cs.err{color:#d97706;font-weight:600}
.carhero{display:flex;align-items:center;gap:24px;margin-top:14px;flex-wrap:wrap}.carhero img{width:min(320px,100%);height:auto}.carhero .cimg{width:min(340px,100%);background-repeat:no-repeat;flex:0 0 auto}
.carhero .big{font-size:56px;font-weight:600;line-height:1}.carhero .big small{font-size:18px;color:var(--sub);font-weight:500;margin-left:8px}
.carhero .bbar{height:10px;width:min(320px,70vw)}
.cacts{display:flex;gap:10px;margin-top:16px;flex-wrap:wrap}
.cacts button{display:inline-flex;align-items:center;gap:8px;border:0;border-radius:999px;padding:10px 16px;font:inherit;font-size:14px;font-weight:600;background:var(--card2);color:var(--text);cursor:pointer}
.cacts button ha-icon{--mdc-icon-size:18px}.cacts button.on{background:var(--accent);color:#fff}
/* alarm */
.hrow .alarm{flex:0 0 clamp(260px,32%,380px);min-width:0}.hrow .en{flex:0 0 clamp(260px,32%,380px);min-width:0;min-height:0;align-self:stretch}.hrow .vac{flex:0 0 clamp(260px,32%,380px);min-width:0;align-self:stretch}.side .alarm{flex:0 0 auto}
.alarm{padding:12px 14px;display:flex;flex-direction:column;gap:8px;cursor:pointer;transition:background .2s}
.alarm .at{display:flex;align-items:center;gap:10px;min-width:0}
.alarm .ash{width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex:0 0 auto;background:var(--card2);color:var(--sub)}.alarm .ash ha-icon{--mdc-icon-size:20px}
.alarm .ax{flex:1;min-width:0}.alarm .as{font-size:17px;font-weight:600;line-height:1.15;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.alarm .ad{font-size:12px;color:var(--sub);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-top:1px}.alarm .ad.warn{color:#d97706;font-weight:600}
.aseg{display:flex;background:var(--card2);border-radius:999px;padding:3px;gap:2px}
.aseg button{flex:1;border:0;background:none;border-radius:999px;padding:7px 4px;font:inherit;font-size:13px;font-weight:600;color:var(--text);cursor:pointer;display:flex;align-items:center;justify-content:center;gap:4px;white-space:nowrap}
.aseg button ha-icon{--mdc-icon-size:16px}.aseg button.sel{background:var(--card);box-shadow:0 1px 4px rgba(0,0,0,.1)}.aseg button.conf{background:#e5484d;color:#fff}
.alarm.st-disarmed .ash{background:rgba(34,160,107,.15);color:#22a06b}
.alarm.st-home{background:rgba(255,239,214,.9)}.alarm.st-home .ash{background:#f0a43a;color:#fff}
.alarm.st-away{background:rgba(255,226,226,.9)}.alarm.st-away .ash{background:#e5484d;color:#fff}
.alarm.st-wait .ash{background:#f0a43a;color:#fff;animation:apulse 1.2s infinite}
.alarm.st-trig{background:#e5484d;color:#fff}.alarm.st-trig .ad,.alarm.st-trig .lbl{color:rgba(255,255,255,.85)}.alarm.st-trig .ash{background:#fff;color:#e5484d;animation:apulse .8s infinite}
:host(.dark) .alarm.st-home{background:rgba(90,66,30,.75)}:host(.dark) .alarm.st-away{background:rgba(96,36,36,.75)}
@keyframes apulse{50%{box-shadow:0 0 0 8px rgba(229,72,77,.25)}}
.apop .aseg{margin-top:16px;padding:4px}.apop .aseg button{padding:14px 6px;font-size:16px}.apop .aseg button ha-icon{--mdc-icon-size:22px}
.agrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:10px;margin-top:10px}
.asr{display:flex;align-items:center;gap:12px;background:var(--card2);border-radius:16px;padding:10px 14px}.asr ha-icon{--mdc-icon-size:22px;color:var(--sub)}
.asr .nm{font-size:14px;font-weight:600}.asr .ds{font-size:12px;color:var(--sub)}.asr.on ha-icon{color:#e5484d}.asr.on .ds{color:#e5484d;font-weight:600}.asr.lowb ha-icon,.asr.lowb .ds{color:#d97706}
.asec{margin-top:18px}
/* heating */
.heat{display:flex;gap:12px;flex:0 0 auto}
.ht{flex:1 1 0;min-width:0;padding:12px 14px;display:flex;flex-direction:column;gap:8px;cursor:pointer;transition:background .2s}
.ht.heating{background:rgba(255,234,222,.9)}
:host(.dark) .ht.heating{background:rgba(92,52,36,.75)}
.ht .top{display:flex;justify-content:space-between;align-items:flex-start;gap:8px}
.ht .n{font-size:13px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.ht .cur{font-size:26px;font-weight:600;line-height:1.1}.ht .cur small{font-size:12px;color:var(--sub);font-weight:500;margin-left:4px}
.ht .st{font-size:12px;color:var(--sub)}.ht.heating .st{color:#e0592a;font-weight:600}
.pw{width:32px;height:32px;flex:0 0 auto;border-radius:50%;border:0;background:var(--card2);color:var(--sub);display:flex;align-items:center;justify-content:center;cursor:pointer}
.ht .hr{display:flex;flex-direction:column;align-items:flex-end;gap:8px;flex:0 0 auto}.ht .hlogo{height:16px;width:auto;display:block}
.pw ha-icon{--mdc-icon-size:18px}.ht.on .pw{background:#f06a3c;color:#fff}
.tctl{display:flex;align-items:center;justify-content:space-between;background:var(--card2);border-radius:999px;padding:3px}
.tctl button{width:32px;height:32px;border-radius:50%;border:0;background:var(--card);color:var(--text);display:flex;align-items:center;justify-content:center;cursor:pointer}
.tctl button ha-icon{--mdc-icon-size:18px}.tctl .tg{font-size:15px;font-weight:600}
.ht.off .tctl{opacity:.45;pointer-events:none}
.tabs{display:inline-flex;background:var(--card2);border-radius:999px;padding:4px;gap:2px;flex-wrap:wrap}
.tabs button{border:0;background:none;font:inherit;font-size:14px;font-weight:500;color:var(--sub);padding:8px 16px;border-radius:999px;cursor:pointer}
.tabs button.sel{background:var(--card);color:var(--text);box-shadow:0 1px 4px rgba(0,0,0,.08)}
.wxmsg{padding:60px 0;text-align:center;color:var(--sub)}
/* world clock */
.wcg{display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:14px;margin-top:16px}
.wcc{background:var(--card2);border-radius:22px;padding:20px 16px;text-align:center;display:flex;flex-direction:column;align-items:center;gap:6px}
.wcc svg{width:min(140px,100%);height:auto;margin-bottom:6px}
.wcc .cn{font-size:16px;font-weight:600}.wcc .dt{font-size:28px;font-weight:600;line-height:1.1;font-variant-numeric:tabular-nums}
.wcc .of{font-size:12px;color:var(--sub)}
.wcc.home{outline:2px solid var(--accent);outline-offset:-2px}
.wcc.night{background:#1f2533;color:#f2f2f7}.wcc.night .of{color:rgba(255,255,255,.6)}
.wcc.night .nums text{fill:#f2f2f7}.wcc.night .ticks line{stroke:rgba(255,255,255,.45)}.wcc.night .hand.h,.wcc.night .hand.m{stroke:#f2f2f7}
/* calendar */
.cal{flex:0 0 auto;padding:14px 18px;cursor:pointer;overflow:hidden}
.cal::-webkit-scrollbar{display:none}
.cal .sec{margin-top:10px;padding-top:8px;border-top:1px solid var(--line)}
.cal .cnt{font-size:11px;color:var(--sub);font-weight:600}
.cal .head{margin-bottom:6px;padding:0}
.ev{display:grid;grid-template-columns:4px 1fr auto;gap:10px;align-items:center;padding:7px 0}
.ev i{width:4px;height:30px;border-radius:2px;display:block}
.ev .t{font-size:14px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.ev .w{font-size:12px;color:var(--sub);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.ev .when{font-size:12px;color:var(--sub);text-align:right;white-space:nowrap}
.ev .when b{display:block;color:var(--text);font-size:13px}
.empty{font-size:13px;color:var(--sub);padding:6px 0}
.agenda{margin-top:36px;display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:14px}
.agenda .blk .ev{padding:8px 0;border-bottom:1px solid var(--line)}.agenda .blk .ev:last-child{border:0}
.legend{display:flex;flex-wrap:wrap;gap:12px;margin-top:6px}
.legend span{font-size:12px;color:var(--sub);display:flex;align-items:center;gap:6px}
.legend i{width:9px;height:9px;border-radius:50%;display:block}
.pop.wide{width:min(96%,1240px)}
.cgrid{display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:8px;margin-top:14px}
.cwk{font-size:11px;color:var(--sub);font-weight:600;letter-spacing:.08em;text-transform:uppercase;grid-column:1/-1;margin-top:6px}
.cday{background:var(--card2);border-radius:14px;padding:8px;min-height:120px;max-height:210px;overflow-y:auto;scrollbar-width:none}
.cday::-webkit-scrollbar{display:none}
.cday.today{outline:2px solid rgba(34,160,107,.45);background:rgba(34,160,107,.08);outline-offset:-2px}
.cday.we{background:rgba(127,140,160,.10)}.cday.past{opacity:.5}
.cday .dh{display:flex;justify-content:space-between;align-items:baseline;font-size:11px;color:var(--sub);font-weight:600;margin-bottom:6px;text-transform:uppercase;letter-spacing:.05em}
.cday .dh b{font-size:17px;color:var(--text);letter-spacing:0}.cday.today .dh b{color:#1a8a5a}
.cday .none{font-size:11px;color:var(--sub);opacity:.6}
.chip{border-left:3px solid;border-radius:6px;padding:3px 6px;margin-bottom:4px;background:var(--card);font-size:12px;line-height:1.25}
.chip .ct{font-size:10px;color:var(--sub);font-weight:600}
.chip .tt{font-weight:600;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;word-break:break-word}
.chip.ad{color:#fff;border-left-width:0}.chip.ad .ct{color:rgba(255,255,255,.85)}
/* overlays */
.ov{position:absolute;inset:0;display:none;align-items:center;justify-content:center;z-index:5;background:rgba(120,130,145,.25);backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px)}
.ov.open{display:flex;animation:fade .2s ease}
@keyframes fade{from{opacity:0}to{opacity:1}}
.pop{width:min(92%,1000px);max-height:90%;overflow:auto;padding:22px;position:relative;background:var(--card);border-radius:28px;box-shadow:var(--shadow)}
.x{position:absolute;right:14px;top:14px;width:48px;height:48px;border-radius:50%;border:0;background:var(--card2);color:var(--text);cursor:pointer;display:flex;align-items:center;justify-content:center;z-index:2}
.wxp{display:grid;grid-template-columns:1.35fr 1fr;gap:18px;margin-top:16px}
.blk{background:var(--card2);border-radius:20px;padding:16px 18px}
.dets{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-top:10px}
.dets.d5{grid-template-columns:repeat(5,1fr)}.det .v{font-size:19px;font-weight:600;margin-top:4px}.det .v small{font-size:11px;color:var(--sub);font-weight:500}
.hrs{display:grid;grid-template-columns:repeat(8,1fr);text-align:center;margin-top:12px;gap:4px}
.hrs .t{font-size:12px;color:var(--sub)}.hrs ha-icon{--mdc-icon-size:22px;margin:8px 0}.hrs .v{font-weight:600}
.wk{display:flex;flex-direction:column}.wk .days{flex:1;display:flex;flex-direction:column;margin-top:6px}
.day{flex:1;display:grid;grid-template-columns:48px 44px 30px minmax(40px,1fr) 30px;align-items:center;gap:8px;padding:8px 0;border-bottom:1px solid var(--line);font-size:14px}
.day:last-child{border:0}.day .dn{font-weight:600}
.day .wi{display:flex;flex-direction:column;align-items:center;line-height:1}.day .wi ha-icon{--mdc-icon-size:22px}
.day .lo{color:var(--sub);text-align:right}.day .hi{font-weight:600}
.bar{height:5px;border-radius:3px;background:var(--line);position:relative}
.bar i{position:absolute;top:0;bottom:0;border-radius:3px;background:linear-gradient(90deg,#7fb2e5,#f2a24a)}
.pr{font-size:10px;color:#3b82f6;font-weight:600;margin-top:3px;white-space:nowrap}
/* now playing */
.ov.npov{background:#2a3036}
.npbg{position:absolute;inset:-40px;background-size:cover;background-position:center;filter:blur(50px) saturate(1.1);opacity:.55}
.npov::after{content:"";position:absolute;inset:0;background:rgba(20,24,30,.35)}
.npw{position:relative;z-index:1;display:flex;flex-direction:column;align-items:center;color:#fff;width:min(560px,90%)}
.npw .src{--mdc-icon-size:32px;margin-bottom:18px;opacity:.9}
.npw .art{width:min(42vh,340px);aspect-ratio:1;border-radius:18px;object-fit:cover;box-shadow:0 20px 50px rgba(0,0,0,.4);background:#444}
.npw .tt{font-size:26px;font-weight:600;margin-top:26px;text-align:center}
.npw .ar{font-size:15px;opacity:.75;margin-top:6px;text-align:center}
.prog{width:100%;margin-top:26px}.prog .b{height:5px;border-radius:3px;background:rgba(255,255,255,.25)}
.prog .b i{display:block;height:100%;border-radius:3px;background:#fff}
.prog .tm{display:flex;justify-content:space-between;font-size:11px;opacity:.7;margin-top:6px}
.ctl{display:flex;gap:48px;align-items:center;margin-top:20px}
.ctl button{background:none;border:0;color:#fff;cursor:pointer;padding:6px}
.ctl ha-icon{--mdc-icon-size:40px}.ctl .pp ha-icon{--mdc-icon-size:64px}
.npov .x{background:rgba(255,255,255,.18);color:#fff}
.spk{margin-top:14px;font-size:12px;opacity:.6}
.ctl.dis{opacity:.35;pointer-events:none}
.npwrap{position:relative;z-index:1;display:flex;gap:36px;width:min(1240px,94%);height:88%;align-items:center}
.npwrap .npw{flex:1 1 0;width:auto;min-width:0}.npw .art{width:min(36vh,300px)}.npw .art.idle{display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,.12)}.npw .art.idle ha-icon{--mdc-icon-size:72px;opacity:.6}
.nppanel{flex:0 0 min(460px,48%);height:100%;background:rgba(0,0,0,.3);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border-radius:24px;display:flex;flex-direction:column;overflow:hidden;color:#fff;position:relative}
.nptabs{display:flex;gap:6px;padding:12px 12px 6px}.nptabs button{flex:1;display:flex;align-items:center;justify-content:center;gap:6px;border:0;border-radius:999px;padding:10px 12px;font:inherit;font-size:14px;font-weight:600;background:rgba(255,255,255,.08);color:rgba(255,255,255,.75);cursor:pointer;white-space:nowrap;overflow:hidden}
.nptabs button.sel{background:rgba(255,255,255,.92);color:#111}.nptabs ha-icon{--mdc-icon-size:18px}.nptabs small{font-weight:500;opacity:.7;overflow:hidden;text-overflow:ellipsis}
.npbody{flex:1;display:flex;flex-direction:column;min-height:0}
.nphead{display:flex;align-items:center;gap:6px;padding:8px 16px;font-size:17px;font-weight:600;min-height:44px}.nphead .bk{border:0;background:rgba(255,255,255,.12);color:#fff;width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer}
.nphint{padding:10px 18px;font-size:13px;opacity:.7}.nphint .pill{margin-left:6px}
.nplist{flex:1;overflow-y:auto;padding:4px 8px 12px;scrollbar-width:none}.nplist::-webkit-scrollbar{display:none}
.li{display:flex;align-items:center;gap:12px;padding:8px;border-radius:14px;cursor:pointer}.li:active{background:rgba(255,255,255,.1)}
.li img,.li .ph{width:52px;height:52px;border-radius:10px;object-fit:cover;flex:0 0 auto;background:rgba(255,255,255,.1);display:flex;align-items:center;justify-content:center}.li .ph ha-icon{--mdc-icon-size:24px;opacity:.7}
.lx{flex:1;min-width:0}.lx .t,.sx .t{font-size:15px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.lx .s,.sx .s{font-size:12px;opacity:.6;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-top:2px}
.li .pl{width:38px;height:38px;border-radius:50%;border:0;background:#1db954;color:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer;flex:0 0 auto}.li .pl ha-icon{--mdc-icon-size:22px}.li .cv{opacity:.5}
.sp{display:flex;align-items:center;gap:10px;padding:10px 8px;border-radius:14px}.sp.on{background:rgba(255,255,255,.1)}.sp.na{opacity:.4}
.sp .chk{border:0;background:none;color:#fff;cursor:pointer;padding:2px;display:flex}.sp .chk ha-icon{--mdc-icon-size:28px}.sp.on .chk{color:#1db954}
.sx{flex:1;min-width:0;cursor:pointer}.sx small{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;background:rgba(255,255,255,.18);padding:2px 6px;border-radius:6px;margin-left:4px;vertical-align:middle}
.vol{display:flex;align-items:center;gap:6px;flex:0 0 40%}.vol ha-icon{--mdc-icon-size:18px;opacity:.7}.vol input{flex:1;accent-color:#fff;min-width:0}
.npsrch{display:flex;align-items:center;gap:8px;margin:6px 12px 2px;padding:0 12px;background:rgba(255,255,255,.12);border-radius:999px;height:42px}.npsrch ha-icon{--mdc-icon-size:20px;opacity:.7}
.npsrch input{flex:1;min-width:0;background:none;border:0;outline:0;color:#fff;font:inherit;font-size:15px}.npsrch input::placeholder{color:rgba(255,255,255,.55)}.npsrch input::-webkit-search-cancel-button{display:none}
.npsrch .clr{border:0;background:none;color:#fff;opacity:.7;cursor:pointer;display:flex;padding:0}.npres{flex:1;display:flex;flex-direction:column;min-height:0}
.pall{display:flex;align-items:center;justify-content:center;gap:8px;width:calc(100% - 16px);margin:2px 8px 8px;border:0;border-radius:999px;padding:11px;font:inherit;font-size:15px;font-weight:700;background:#1db954;color:#fff;cursor:pointer}.pall ha-icon{--mdc-icon-size:20px}
.sorts{display:flex;align-items:center;gap:6px;padding:2px 8px 8px;overflow-x:auto;scrollbar-width:none}.sorts::-webkit-scrollbar{display:none}.sorts ha-icon{--mdc-icon-size:18px;opacity:.6;flex:0 0 auto}
.sorts button{flex:0 0 auto;border:0;border-radius:999px;padding:6px 12px;font:inherit;font-size:13px;font-weight:600;background:rgba(255,255,255,.1);color:rgba(255,255,255,.8);cursor:pointer;white-space:nowrap}.sorts button.sel{background:rgba(255,255,255,.92);color:#111}
.sec2{font-size:11px;font-weight:700;letter-spacing:.09em;text-transform:uppercase;opacity:.55;padding:12px 8px 4px}
.ov.dbov{background:#000;z-index:9;backdrop-filter:none;flex-direction:column}
.dbvid{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:#000}.dbvid img,.dbvid .dbstream{width:100%;height:100%;object-fit:cover;display:block}.dbvid .dbstream{position:absolute;inset:0;--video-max-height:100%}.dbvid.fit img{object-fit:contain}
.dbvid .dbstream{--video-max-height:100vh}
.dbtop{position:absolute;left:0;right:0;top:0;display:flex;justify-content:space-between;align-items:flex-start;padding:18px 22px 40px;background:linear-gradient(rgba(0,0,0,.65),transparent);color:#fff;z-index:2}
.dbt{font-size:24px;font-weight:700}.dbs{font-size:14px;opacity:.85;margin-top:2px}
.dbx{width:44px;height:44px;border-radius:50%;border:0;background:rgba(255,255,255,.18);color:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer}
.dbbar{position:absolute;left:0;right:0;bottom:0;padding:40px 22px 22px;background:linear-gradient(transparent,rgba(0,0,0,.75));display:flex;flex-direction:column;align-items:center;gap:16px;z-index:2}
.dbq{display:flex;gap:8px;flex-wrap:wrap;justify-content:center}.dbq button{display:flex;align-items:center;gap:6px;border:0;border-radius:999px;padding:9px 14px;font:inherit;font-size:14px;font-weight:600;background:rgba(255,255,255,.16);color:#fff;cursor:pointer;backdrop-filter:blur(10px)}.dbq ha-icon{--mdc-icon-size:18px}
.dbctl{display:flex;align-items:center;gap:36px}
.dbsnd{display:flex;flex-direction:column;align-items:center;gap:6px;border:0;background:none;color:#fff;font:inherit;font-size:13px;font-weight:600;cursor:pointer}
.dbsnd ha-icon{--mdc-icon-size:28px;width:60px;height:60px;border-radius:50%;background:rgba(255,255,255,.18);display:flex;align-items:center;justify-content:center}.dbsnd.on ha-icon{background:#fff;color:#111}
.dbctl .dbsnd:last-child ha-icon{background:#e5484d}
.dbtalk{display:flex;flex-direction:column;align-items:center;gap:8px;border:0;background:none;color:#fff;font:inherit;font-size:14px;font-weight:700;cursor:pointer;touch-action:none;user-select:none;-webkit-user-select:none}
.dbtalk ha-icon{--mdc-icon-size:40px;width:96px;height:96px;border-radius:50%;background:#22a06b;display:flex;align-items:center;justify-content:center;box-shadow:0 8px 30px rgba(0,0,0,.4);transition:transform .15s}
.dbtalk.rec ha-icon{background:#e5484d;transform:scale(1.12);animation:dbp 1s infinite}@keyframes dbp{50%{box-shadow:0 0 0 18px rgba(229,72,77,.25)}}
.dbmsg{min-height:20px;font-size:14px;font-weight:600;color:#fff;opacity:0;transition:opacity .2s}.dbmsg.on{opacity:1}.dbmsg.err{color:#ffb4b6}
.nptoast{position:absolute;left:16px;right:16px;bottom:16px;background:#e5484d;color:#fff;padding:10px 14px;border-radius:12px;font-size:13px;font-weight:600}
@media (max-width:900px){.npwrap{flex-direction:column;height:auto;max-height:92%;overflow:auto}.nppanel{flex:0 0 auto;width:100%;height:60vh}}
@media (max-width:900px){.root{height:auto}.grid{grid-template-columns:1fr}.camgrid{min-height:420px}.lights{flex-wrap:wrap}.tile{flex:1 1 40%}
.wxp{grid-template-columns:1fr}.dets,.dets.d5{grid-template-columns:repeat(2,1fr)}.cgrid{grid-template-columns:repeat(2,minmax(0,1fr))}}
.hback{flex:0 0 auto;width:40px;height:40px;border-radius:50%;border:0;background:var(--card);color:var(--text);box-shadow:var(--shadow);display:inline-flex;align-items:center;justify-content:center;cursor:pointer;padding:0}.hback ha-icon{--mdc-icon-size:22px}.hback:active{transform:scale(.94)}.hback.float{position:absolute;top:12px;left:12px;z-index:20}
`;

const PINCSS = `.pt{font-size:20px;font-weight:700;margin-top:4px}.pdots{height:44px;display:flex;align-items:center;justify-content:center;font-size:34px;letter-spacing:10px;margin-top:12px}
.pdots.bad{color:#e5484d;animation:pshake .35s}@keyframes pshake{25%{transform:translateX(-8px)}75%{transform:translateX(8px)}}
.perr{min-height:18px;text-align:center;font-size:13px;font-weight:600;color:#e5484d}.perr.wait{color:var(--sub)}
.pgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:10px}
.pk{height:64px;border-radius:20px;border:0;background:var(--card2);color:var(--text);font:inherit;font-size:26px;font-weight:600;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:transform .08s}
.pdots{margin-top:16px}.pk:active{transform:scale(.94)}.pk ha-icon{--mdc-icon-size:26px}.pk.ok{background:#22a06b;color:#fff}.pk[disabled]{opacity:.4;pointer-events:none}`;
/* Scale a fixed tablet layout to the screen: the layout is designed at baseW x baseH and zoomed to fit wide screens (1100px+). */
window.__hpcFit = (host, root, baseW, baseH) => {
  if (!host || !root) return;
  const fb = host._c && Array.isArray(host._c.fit_base) ? host._c.fit_base : null; if (fb) { baseW = +fb[0] || baseW; if (baseH) baseH = +fb[1] || baseH; }
  const apply = () => {
    // Height comes from where the card actually starts (works when the HA header is hidden by kiosk mode);
    // landscape tablets from 900px wide get the fixed layout scaled to fit, phones keep the responsive layout.
    const vw = window.innerWidth, vh = window.innerHeight, r = host.getBoundingClientRect(), w = r.width || vw;
    const top = Math.max(0, r.top + (window.scrollY || 0)), avail = Math.max(400, vh - top);
    const on = w && !(host._c && host._c.fit === false) && (vw >= 1100 || (vw >= 900 && vw > vh * 1.1));
    const key = [vw, vh, Math.round(top), Math.round(w), on].join('|'); if (key === host.__hpcFitKey) return; host.__hpcFitKey = key;
    // Phones and narrow screens (1000px and under) use the stacked layout: let the page grow with its content.
    if (!on) { root.style.zoom = ''; if (baseH && vw > 1000) { root.style.height = avail + 'px'; root.style.minHeight = ''; } else { root.style.height = ''; root.style.minHeight = avail + 'px'; } return; }
    const z = Math.round(Math.min(1.8, Math.max(0.55, baseH ? Math.min(w / baseW, avail / baseH) : w / baseW)) * 100) / 100;
    root.style.zoom = z === 1 ? '' : z;
    if (baseH) { root.style.height = (avail / z) + 'px'; root.style.minHeight = '0'; } else { root.style.height = ''; root.style.minHeight = (avail / z) + 'px'; }
  };
  if (!host.__hpcFitOn) { host.__hpcFitOn = true; window.addEventListener('resize', () => requestAnimationFrame(apply)); setTimeout(apply, 400); setTimeout(apply, 1500); setInterval(() => { if (host.isConnected) apply(); }, 2000); }
  apply();
};
/* Swipe left/right anywhere on a page to move to the next/previous view of the dashboard (cards with swipe: true). */
/* Go back to the dashboard's first page after N minutes without a touch (cards with idle_return: N); on that page, close any open pop-up. */
window.__hpcIdle = (host) => {
  const c = host && host._c; if (!c || !c.idle_return) return;
  window.__hpcIdleHosts = window.__hpcIdleHosts || new Set(); window.__hpcIdleHosts.add(host);
  window.__hpcIdleMin = +c.idle_return || 5; if (c.idle_path) window.__hpcIdlePath = c.idle_path;
  if (window.__hpcIdleOn) return; window.__hpcIdleOn = true;
  let last = Date.now(); const poke = () => { last = Date.now(); };
  ['pointerdown', 'touchstart', 'keydown', 'wheel'].forEach(ev => window.addEventListener(ev, poke, { capture: true, passive: true }));
  const home = () => {
    if (window.__hpcIdlePath) return window.__hpcIdlePath;
    const seg = location.pathname.split('/').filter(Boolean); if (!seg.length) return null;
    try { const main = document.querySelector('home-assistant').shadowRoot.querySelector('home-assistant-main'), pl = main.shadowRoot.querySelector('ha-panel-lovelace'), root = pl.shadowRoot.querySelector('hui-root');
      const v = ((root.lovelace || pl.lovelace).config.views || [])[0]; return '/' + seg[0] + '/' + (v && v.path ? v.path : '0'); } catch (e) { return '/' + seg[0]; }
  };
  setInterval(() => {
    const hosts = [...window.__hpcIdleHosts].filter(h => h.isConnected); if (!hosts.length || Date.now() - last < window.__hpcIdleMin * 60000) return;
    last = Date.now();
    const to = home(); if (!to) return;
    if (location.pathname.replace(/\/$/, '') !== to.replace(/\/$/, '')) { history.pushState(null, '', to); window.dispatchEvent(new CustomEvent('location-changed')); return; }
    hosts.forEach(h => { try { const fake = a => ({ composedPath: () => [{ dataset: { act: a } }], target: null });
      if (h._npOpen && h.localName === 'home-panel-card') h._click(fake('closenp'));
      if (h.shadowRoot && h.shadowRoot.querySelector('.ov.open:not(.npov)')) h._click(fake('closebg')); } catch (e) {} });
  }, 15000);
};
/* Soft click when a tile, button or card is tapped (cards with tap_sound: true or a volume 0–1). Generated with Web Audio, no file. */
window.__hpcTap = (host) => {
  const c = host && host._c; if (!c || !c.tap_sound || host.__hpcTapOn) return; host.__hpcTapOn = true;
  const vol = typeof c.tap_sound === 'number' ? Math.max(0, Math.min(1, c.tap_sound)) : 0.35;
  host.addEventListener('pointerdown', e => {
    const path = e.composedPath(), hit = path.find(n => n instanceof Element && (n.dataset.act || n.dataset.light || n.dataset.t || n.tagName === 'BUTTON' || n.tagName === 'SELECT'));
    if (!hit || hit.dataset.act === 'closebg' && hit !== path[0]) return;
    if (path.some(n => n instanceof Element && n.tagName === 'INPUT')) return; // sliders stay quiet
    const now = performance.now(); if (now - (window.__hpcTapAt || 0) < 60) return; window.__hpcTapAt = now;
    try {
      const ctx = window.__hpcAudio = window.__hpcAudio || new (window.AudioContext || window.webkitAudioContext)();
      if (ctx.state === 'suspended') ctx.resume();
      const t = ctx.currentTime, o = ctx.createOscillator(), g = ctx.createGain(), f = ctx.createBiquadFilter();
      o.type = 'triangle'; o.frequency.setValueAtTime(1500, t); o.frequency.exponentialRampToValueAtTime(600, t + 0.03);
      f.type = 'lowpass'; f.frequency.value = 3200;
      g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + 0.002); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.045);
      o.connect(f); f.connect(g); g.connect(ctx.destination); o.start(t); o.stop(t + 0.05);
    } catch (err) {}
  }, { passive: true });
};
window.__hpcSwipe = (host) => {
  window.__hpcIdle(host); window.__hpcTap(host);
  if (!host || !host._c || !host._c.swipe) return;
  window.__hpcSwipeHosts = window.__hpcSwipeHosts || new Set(); window.__hpcSwipeHosts.add(host);
  if (window.__hpcSwipeOn) return; window.__hpcSwipeOn = true;
  let st = null;
  const views = () => {
    try { const main = document.querySelector('home-assistant').shadowRoot.querySelector('home-assistant-main'), pl = main.shadowRoot.querySelector('ha-panel-lovelace'), root = pl.shadowRoot.querySelector('hui-root');
      return ((root.lovelace || pl.lovelace).config.views || []).map((v, i) => ({ p: v.path || String(i), sub: !!v.subview })); } catch (e) { return null; }
  };
  const active = path => [...window.__hpcSwipeHosts].some(h => h.isConnected && path.includes(h));
  // the Music page shows its player in an always-open overlay (.npov): that one is the page itself, not a pop-up
  const blocked = path => { const music = path.some(n => n.localName === 'home-music-card'); return path.some(n => n instanceof Element && (n.matches('input,select,textarea,button.pm,[data-noswipe]') || (n.matches('.ov.open') && !(music && n.classList.contains('npov'))) || (n.scrollWidth > n.clientWidth + 4 && /(auto|scroll)/.test(getComputedStyle(n).overflowX)))); };
  window.addEventListener('touchstart', e => { const t = e.touches[0], path = e.composedPath(); st = e.touches.length === 1 && active(path) && !blocked(path) ? { x: t.clientX, y: t.clientY, t: Date.now() } : null; }, { passive: true });
  window.addEventListener('touchend', e => {
    if (!st) return; const t = e.changedTouches[0], dx = t.clientX - st.x, dy = t.clientY - st.y, dt = Date.now() - st.t; st = null;
    if (Math.abs(dx) < 90 || Math.abs(dx) < Math.abs(dy) * 2 || dt > 700) return;
    const vs = (views() || []).filter(v => !v.sub); if (vs.length < 2) return;
    const seg = location.pathname.split('/').filter(Boolean), cur = seg[1] || vs[0].p, i = vs.findIndex(v => v.p === cur); if (i < 0) return;
    const j = dx < 0 ? i + 1 : i - 1; if (j < 0 || j >= vs.length) return;
    history.pushState(null, '', '/' + seg[0] + '/' + vs[j].p); window.dispatchEvent(new CustomEvent('location-changed'));
  }, { passive: true });
};
window.__hpcBack = (c, cls) => c && c.back_button ? `<button class="hback${cls ? ' ' + cls : ''}" data-act="hback" title="Back"><ha-icon icon="mdi:arrow-left"></ha-icon></button>` : '';
window.__hpcGoBack = () => { if (history.length > 1) { history.back(); return; } const base = '/' + location.pathname.split('/').filter(Boolean)[0]; history.pushState(null, '', base); window.dispatchEvent(new CustomEvent('location-changed')); };
const PPLCSS = `.ppl{flex:0 0 auto;padding:12px 14px;display:grid;grid-template-columns:repeat(auto-fit,minmax(0,1fr));gap:10px}
.pp{display:flex;align-items:center;gap:10px;min-width:0;cursor:pointer}.pp+.pp{border-left:1px solid var(--line);padding-left:10px}
.pav{width:38px;height:38px;border-radius:50%;object-fit:cover;flex:0 0 auto;background:var(--card2);display:flex;align-items:center;justify-content:center;font-weight:700;color:var(--sub)}
.px{flex:1;min-width:0}.px .pn{font-size:14px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.px .pl{font-size:12px;color:var(--sub);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-top:1px}.px .pl.old{color:#d97706}
.pb{display:inline-flex;align-items:center;gap:2px;font-size:12px;font-weight:700;margin-top:2px}.pb ha-icon{--mdc-icon-size:15px}
.pmap{width:100%;height:min(46vh,380px);border:0;border-radius:18px;margin-top:14px;background:var(--card2);display:block}
.pinfo{display:flex;flex-wrap:wrap;gap:8px 18px;margin-top:12px;font-size:13px;color:var(--sub)}.pinfo b{color:var(--text);font-weight:600}
.pwarn{margin-top:10px;font-size:13px;font-weight:600;color:#d97706;display:flex;gap:6px;align-items:center}.pwarn ha-icon{--mdc-icon-size:18px}
.pgo{display:inline-flex;align-items:center;gap:8px;margin-top:14px;border:0;border-radius:999px;padding:10px 16px;font:inherit;font-size:14px;font-weight:600;background:var(--accent);color:#fff;text-decoration:none}.pgo ha-icon{--mdc-icon-size:18px}
.pcol{flex:0 0 var(--sw,clamp(260px,32%,380px));display:flex;flex-direction:column;gap:12px;min-width:0}.pcol .carc{flex:1 1 auto !important}.pcol .carc.multi{padding:8px 14px;gap:6px}.pcol .crow+.crow{padding-top:6px}.pcol .crow .cv b{font-size:21px}.pcol .crow .bbar{margin:3px 0 2px}.pcol .ppl{padding:8px 12px !important}
.bottom .lights{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));grid-auto-rows:1fr;gap:12px}
.bottom .tile{display:flex;flex-direction:column;justify-content:space-between;gap:6px;padding:10px 12px;min-height:0;min-width:0}.bottom .tile .ic{width:30px;height:30px;flex:0 0 auto}.bottom .tile .ic ha-icon{--mdc-icon-size:17px}
.bottom .tile .tx{min-width:0;width:100%}.bottom .tile .n{margin-top:0;font-size:13px}.bottom .tile .s{font-size:11px;margin-top:1px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.pcol .ppl{padding:10px 12px;gap:8px}.pcol .pp+.pp{padding-left:8px}.pcol .pav{width:34px;height:34px}
:is(.side,.hrow) .en{min-height:104px;padding:10px 14px}:is(.side,.hrow) .en .ech{min-height:30px;margin-top:6px}:is(.side,.hrow) .en .etot{margin-top:2px}:is(.side,.hrow) .en .etot .v{font-size:16px}:is(.side,.hrow) .en .elogo{width:28px;height:28px}
.vac{flex:0 0 auto;padding:8px 10px 8px 12px;display:flex;align-items:center;gap:10px;cursor:pointer;min-width:0}
.vic{width:36px;height:36px;border-radius:50%;background:var(--card2);color:var(--sub);display:flex;align-items:center;justify-content:center;flex:0 0 auto}.vic ha-icon{--mdc-icon-size:20px}
.vac.run .vic,.vhd.run .vic{background:#22a06b;color:#fff}.vac.err .vic,.vhd.err .vic{background:#e5484d;color:#fff}.vac.ret .vic,.vhd.ret .vic{background:#3b82f6;color:#fff}
.vac .vic{width:32px;height:32px}.vac .vb button{width:32px;height:32px}.vac .vx{flex:1;min-width:0}.vac .vn{font-size:14px;font-weight:600}.vac .vs{font-size:12px;color:var(--sub);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-top:1px}.vac.err .vs{color:#e5484d;font-weight:600}
.net{flex:0 0 auto;padding:8px 12px 26px;display:flex;align-items:center;gap:10px;cursor:pointer;min-width:0;position:relative;overflow:hidden}.net>:not(svg){position:relative;z-index:1}.net .nic{width:32px;height:32px;border-radius:50%;background:rgba(59,130,246,.14);color:#3b82f6;display:flex;align-items:center;justify-content:center;flex:0 0 auto}.net .nic ha-icon{--mdc-icon-size:18px}.net.off .nic{background:rgba(229,72,77,.14);color:#e5484d}.net .nx{flex:0 0 auto;min-width:0}.net .nn{font-size:14px;font-weight:600}.net .ns{font-size:12px;color:var(--sub);white-space:nowrap;margin-top:1px}.net .nt{font-weight:700;color:var(--text)}.net .nt.g{color:#1a8a5a}.net .nt.a{color:#c27c0e}.net .nt.r{color:#d93636}:host(.dark) .net .nt.g{color:#4cc38a}:host(.dark) .net .nt.a{color:#f0b429}:host(.dark) .net .nt.r{color:#ff6b6b}.net.off .ns{color:#e5484d;font-weight:600}.net .nv{display:flex;gap:6px;margin-left:auto;flex:0 0 auto;text-align:left}.net .nv>div{background:var(--card2);border-radius:12px;padding:4px 9px;min-width:0}.net .nv span{justify-content:flex-start !important}.net .nv b{display:block;font-size:15px;font-weight:700;letter-spacing:-.01em;white-space:nowrap;font-variant-numeric:tabular-nums}.net .nv b small{font-size:10px;color:var(--sub);font-weight:600;margin-left:1px}.net .nv span{display:flex;align-items:center;justify-content:flex-end;gap:2px;font-size:10px;font-weight:700;letter-spacing:.05em;text-transform:uppercase;color:var(--sub)}.net .nv span ha-icon{--mdc-icon-size:12px}.net .nv .dn span ha-icon{color:#22a06b}.net .nv .up span ha-icon{color:#3b82f6}.net svg{position:absolute;left:0;right:0;bottom:2px;width:100%;height:20px;pointer-events:none;z-index:0;opacity:.6}.net svg .sa{fill:rgba(34,160,107,.10);stroke:none}.net svg .sd{fill:none;stroke:#22a06b;stroke-width:1.8;stroke-linejoin:round;stroke-linecap:round}.net svg .su{fill:none;stroke:#3b82f6;stroke-width:1.4;stroke-linejoin:round;stroke-linecap:round;opacity:.75}
.vb{display:flex;gap:6px;flex:0 0 auto}.vb button{width:34px;height:34px;border-radius:50%;border:0;background:var(--card2);color:var(--text);display:flex;align-items:center;justify-content:center;cursor:pointer;padding:0}.vb button ha-icon{--mdc-icon-size:18px}.vb button.go{background:#22a06b;color:#fff}
.vhd{display:flex;align-items:center;gap:12px}.vhd .vic{width:52px;height:52px}.vhd .vic ha-icon{--mdc-icon-size:28px}
.vsec{margin-top:18px}.vchips{display:flex;flex-wrap:wrap;gap:8px;margin-top:8px}.vchips button{border:0;border-radius:999px;padding:9px 15px;background:var(--card2);color:var(--text);font:inherit;font-size:14px;font-weight:600;cursor:pointer}.vchips button.sel{background:var(--accent);color:#fff}
.vacts{display:grid;grid-template-columns:repeat(auto-fit,minmax(0,1fr));gap:10px;margin-top:18px}.vacts button{height:54px;border:0;border-radius:16px;background:var(--card2);color:var(--text);font:inherit;font-size:15px;font-weight:600;display:flex;align-items:center;justify-content:center;gap:8px;cursor:pointer}.vacts button.go{background:#22a06b;color:#fff}
.vacts button.stop{background:#e5484d;color:#fff}
.vacts button.warn{background:rgba(229,72,77,.12);color:#e5484d}
.ngrid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px;margin-top:16px}
.ngrid>div{background:var(--card2);border-radius:16px;padding:12px 14px;min-width:0}
.ngrid span{display:flex;align-items:center;gap:3px;font-size:10.5px;font-weight:700;letter-spacing:.05em;text-transform:uppercase;color:var(--sub)}
.ngrid span ha-icon{--mdc-icon-size:13px}
.ngrid .dn span ha-icon{color:#22a06b}
.ngrid .up span ha-icon{color:#3b82f6}
.ngrid b{display:block;margin-top:4px;font-size:22px;font-weight:700;letter-spacing:-.01em;white-space:nowrap;font-variant-numeric:tabular-nums}
.ngrid b small{font-size:12px;color:var(--sub);font-weight:600;margin-left:2px}
.nspark{height:74px;margin-top:12px;background:var(--card2);border-radius:16px;padding:10px 12px}
.nspark svg{width:100%;height:100%;display:block}
.nspark .sd{fill:none;stroke:#22a06b;stroke-width:1.8;stroke-linejoin:round;stroke-linecap:round;vector-effect:non-scaling-stroke}
.nspark .su{fill:none;stroke:#3b82f6;stroke-width:1.4;stroke-linejoin:round;stroke-linecap:round;opacity:.75;vector-effect:non-scaling-stroke}
.nnote{margin-top:10px;font-size:12.5px;color:var(--sub);text-align:center}
.ngrid em{display:block;margin-top:2px;font-style:normal;font-size:11.5px;color:var(--sub);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.ngrid em i{font-style:normal;font-weight:700}.ngrid .qg{color:#22a06b}.ngrid .qa{color:#d97706}.ngrid .qr{color:#e5484d}
.nwrap{display:grid;grid-template-columns:minmax(0,1.15fr) minmax(0,1fr);gap:12px;margin-top:12px}
.ncol{display:flex;flex-direction:column;gap:12px;min-width:0}
.nbox{background:var(--card2);border-radius:18px;padding:14px 16px}
.nbh{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:8px}
.nbh b{font-size:14px;font-weight:700}.nbh>span{font-size:12px;color:var(--sub);font-weight:600}
.nch{width:100%;height:110px;display:block}
.nch .bd{fill:#22a06b;opacity:.85}.nch .bu{fill:#3b82f6}
.nax{display:flex;justify-content:space-between;font-size:10.5px;color:var(--sub);font-weight:600;margin-top:4px}
.nlg{display:flex;align-items:center;gap:6px;font-size:11.5px;color:var(--sub);margin-top:8px;font-weight:600}
.nlg i{width:10px;height:10px;border-radius:3px;display:inline-block}.nlg .ld{background:#22a06b}.nlg .lu{background:#3b82f6;margin-left:8px}
.nchips{display:flex;flex-wrap:wrap;gap:6px}
.nchips span{display:flex;align-items:center;gap:5px;background:var(--card2);border-radius:999px;padding:7px 10px;font-size:12px;font-weight:600;white-space:nowrap}
.nchips ha-icon{--mdc-icon-size:16px;color:var(--sub)}
.ntabs{display:flex;background:var(--card);border-radius:999px;padding:3px;gap:2px}
.ntabs button{border:0;background:none;font:inherit;font-size:12px;font-weight:700;color:var(--sub);padding:6px 11px;border-radius:999px;cursor:pointer}
.ntabs button.sel{background:var(--text);color:var(--card)}
.ndr{display:grid;grid-template-columns:20px minmax(0,1fr) auto;gap:10px;align-items:center;padding:7px 0}
.nrk{font-size:12px;font-weight:700;color:var(--sub);text-align:center}
.nrn{display:flex;align-items:baseline;gap:6px;min-width:0}
.nrn span{font-size:14px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.nsh2{display:block;font-size:11px;font-weight:600;color:var(--sub);white-space:nowrap;margin-top:1px}
.nsh{font-style:normal;font-size:11px;font-weight:600;color:var(--sub);white-space:nowrap}
.nin{display:flex;gap:10px;align-items:flex-start;padding:6px 0;font-size:13px;line-height:1.35}
.nin ha-icon{--mdc-icon-size:18px;color:var(--sub);flex:0 0 auto;margin-top:1px}
.nin b{font-weight:700}
.nlive{font-style:normal;font-size:11px;font-weight:700;color:#22a06b;white-space:nowrap}
.ndb{height:6px;border-radius:3px;background:rgba(127,127,127,.18);margin-top:5px;overflow:hidden}
.ndb i{display:block;height:100%;border-radius:3px;background:linear-gradient(90deg,#22a06b,#3b82f6)}
.ndr>b{font-size:15px;font-weight:700;font-variant-numeric:tabular-nums;white-space:nowrap}.ndr>b small{font-size:11px;color:var(--sub);margin-left:1px}
.ndev .nnote{text-align:left;margin-top:6px}
.nempty{height:60px}
@media (max-width:760px){.nwrap{grid-template-columns:1fr}.ngrid{grid-template-columns:repeat(2,minmax(0,1fr))}}.vacts ha-icon{--mdc-icon-size:20px}
.vlogo{width:26px;height:26px;border-radius:7px;object-fit:cover;flex:0 0 auto}.vhd .vlogo{width:40px;height:40px;border-radius:10px;margin:0 52px 0 auto;align-self:flex-start}
:is(.side,.hrow) .en{min-height:84px;padding:8px 14px}:is(.side,.hrow) .en .head{margin-bottom:0}:is(.side,.hrow) .en .etot .v{font-size:15px}:is(.side,.hrow) .en .etot .c{font-size:10px}:is(.side,.hrow) .en .ech{min-height:24px;margin-top:4px}.side .vac{flex:0 0 auto}
.wx{container-type:size;container-name:wx}.wx2t{display:flex;justify-content:space-between;align-items:flex-start;gap:8px;flex:0 0 auto}.wx2m{min-width:0}.wx2r{display:flex;align-items:center;gap:12px;margin-top:2px}.wx2 .temp{font-size:clamp(40px,4.4vw,54px);font-weight:600;letter-spacing:-.03em;line-height:1;margin:0}.wx2 .temp sup{font-size:.45em;vertical-align:top;margin-left:1px;font-weight:600}.wx2c{display:flex;flex-direction:column;min-width:0;line-height:1.25}.wx2c b{font-size:15px;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.wx2c span{font-size:12.5px;color:var(--sub);font-weight:600;white-space:nowrap}.wx2c .wx2f{color:var(--text);opacity:.8}.wx.night .wx2c span{color:rgba(255,255,255,.7)}.wx2 .cond{margin-top:6px;font-size:12.5px;font-weight:600;gap:0 12px;color:var(--sub);flex-wrap:wrap;height:18px;line-height:18px;overflow:hidden;flex:0 0 auto}.wx2 .cond ha-icon{color:var(--sub)}.wx.night.wx2 .cond ha-icon{color:rgba(255,255,255,.65)}.wx2 .cond .wx2rain{color:#2563eb}.wx2 .cond .wx2rain ha-icon{color:#2563eb}.wx.night.wx2 .cond .wx2rain,.wx.night.wx2 .cond .wx2rain ha-icon,:host(.dark) .wx2 .cond .wx2rain,:host(.dark) .wx2 .cond .wx2rain ha-icon{color:#8ec5ff}.wx2s{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:4px;margin-top:auto;padding-top:6px;flex:0 0 auto}.wx2h{display:flex;flex-direction:column;align-items:center;gap:2px;padding:5px 0 4px;border-radius:12px;min-width:0}.wx2h.now{background:var(--card2)}.wx.night .wx2h.now{background:rgba(255,255,255,.12)}.wx2h .t{font-size:11.5px;color:var(--sub);font-weight:700}.wx.night .wx2h .t{color:rgba(255,255,255,.7)}.wx2h ha-icon{--mdc-icon-size:21px}.wx2h .v{font-size:15px;font-weight:700}.wx2h .p{font-size:10.5px;font-weight:700;color:#3b82f6;min-height:13px}.wx.night .wx2h .p{color:#8ec5ff}@container wx (max-height:200px){.wx2 .temp{font-size:38px}.wx2h ha-icon{--mdc-icon-size:20px}.wx2h{padding:4px 0 3px;gap:2px}.wx2 .cond{margin-top:4px}}@container wx (max-height:125px){.wx2s{display:none}}.wx .chart{flex:0 0 auto}
@container wx (max-height:332px){.wdays{display:none}}
@container wx (max-height:242px){.wx .row .temp{font-size:38px;margin-top:0}.wx .row ha-icon{--mdc-icon-size:42px !important}.hc .mm{display:none}.hc{padding:5px 0;gap:2px}.chart{padding-top:4px}.hstrip{margin-top:2px}}
@container wx (max-height:172px){.hc .p{display:none}.wx .cond{margin-top:2px}.hc ha-icon{--mdc-icon-size:22px}}
@container wx (max-height:142px){.wx .row .temp{font-size:32px}.wx .row ha-icon{--mdc-icon-size:34px !important}.hc .t{font-size:11px}.hc .v{font-size:14px}.hc ha-icon{--mdc-icon-size:18px}}
@container wx (max-height:92px){.chart{display:none}}
.en{container-type:size;container-name:en}.ea-h{display:flex;align-items:center;gap:8px}.ea-h .lbl{flex:1;min-width:0}.ea-r{display:inline-flex;align-items:center;gap:3px;font-size:11px;font-weight:700;padding:3px 8px;border-radius:999px;background:var(--card2);color:var(--sub);white-space:nowrap}.ea-r ha-icon{--mdc-icon-size:13px}.ea-r.lo{background:rgba(34,160,107,.14);color:#15803d}.ea-r.hi{background:rgba(229,72,77,.12);color:#c2353a}:host(.dark) .ea-r.lo{color:#4ade80}:host(.dark) .ea-r.hi{color:#fca5a5}.ea-n{display:flex;align-items:baseline;gap:5px;margin-top:2px}.ea-n b{font-size:30px;font-weight:700;letter-spacing:-.03em;line-height:1;font-variant-numeric:tabular-nums}.ea-n span{font-size:13px;font-weight:600;color:var(--sub)}.ea-n em{margin-left:auto;font-style:normal;font-size:12px;font-weight:600;color:var(--sub)}.ea-b{height:6px;border-radius:3px;background:var(--card2);margin-top:7px;overflow:hidden}.ea-b i{display:block;height:100%;border-radius:3px;background:linear-gradient(90deg,#22a06b,#eab308 55%,#e5484d);transition:width .6s}.ea-s{display:flex;justify-content:space-between;font-size:9.5px;font-weight:600;color:var(--sub);margin-top:2px}.ea-m{flex:1 1 auto;display:flex;flex-direction:column;justify-content:center;min-height:0}.ea-t{display:grid;grid-template-columns:repeat(auto-fit,minmax(0,1fr));gap:6px;padding-top:6px;flex:0 0 auto}@container en (min-height:230px){.ea-n b{font-size:46px}.ea-n span{font-size:16px}.ea-b{height:10px;border-radius:5px;margin-top:12px}.ea-b i{border-radius:5px}.ea-t b{font-size:18px}}.ea-t>div{background:var(--card2);border-radius:12px;padding:6px 8px;min-width:0}.ea-t .k{display:flex;align-items:center;gap:3px;font-size:10px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;color:var(--sub);white-space:nowrap}.ea-t .k ha-icon{--mdc-icon-size:12px}.ea-t b{display:block;font-size:16px;font-weight:700;letter-spacing:-.01em;line-height:1.25;font-variant-numeric:tabular-nums}.ea-t small{display:block;font-size:10.5px;color:var(--sub);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.ea-t .tot{background:rgba(34,160,107,.12)}.ea-t .tot b{color:#15803d}:host(.dark) .ea-t .tot b{color:#4ade80}.en:has(.ea-h){display:flex;flex-direction:column}@container en (max-height:150px){.ea-s{display:none}.ea-n b{font-size:24px}.ea-t small{display:none}.ea-b{margin-top:5px}}@container en (max-height:110px){.ea-b{display:none}}:is(.side,.hrow) .en{padding:9px 14px;min-height:74px}.side{container-type:size;container-name:side}:is(.side,.hrow) .en .head{align-items:center;margin-bottom:2px}:is(.side,.hrow) .en .head .lbl{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}:is(.side,.hrow) .en .elogo{width:24px;height:24px;margin:0}
.etot.e3{grid-template-columns:1fr 1fr auto;gap:6px;align-items:end}.etc{text-align:right;padding-left:8px;border-left:1px solid var(--line)}.etc .k{justify-content:flex-end}.etc .v{color:var(--accent);font-weight:700}
.etot .k i.lvd,.dets i.lvd{border-radius:50%;animation:lvp 1.6s infinite}@keyframes lvp{50%{opacity:.3}}:is(.side,.hrow) .en .etot{margin-top:0}
@container en (max-height:96px){.en .ech{display:none}}
@container en (max-height:66px){.en .etot .c{display:none}}
@container side (max-height:340px){.music.big{padding:10px 14px;gap:12px}.music.big .mart{width:76px;height:76px;border-radius:12px}.music.art{min-height:120px}.music.big .mn{font-size:16px;margin-top:2px}.music.big .mc{margin-top:6px}.music.big .mc button{width:34px;height:34px}.music.big .mc .pp{width:40px;height:40px}}
.cal{padding:12px 16px}.cal .head{margin-bottom:4px}.cal .empty{padding:4px 0;font-size:13px}.cwk7{display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:4px;margin:2px 0 6px}.cwd{border:0;background:transparent;font:inherit;color:var(--text);border-radius:12px;padding:5px 0 6px;display:flex;flex-direction:column;align-items:center;gap:1px;cursor:pointer;min-width:0}.cwd .cwn{font-size:10.5px;font-weight:700;letter-spacing:.05em;text-transform:uppercase;color:var(--sub)}.cwd b{font-size:17px;font-weight:700;line-height:1.15;font-variant-numeric:tabular-nums}.cwd.td b{color:#1a8a5a}.cwd.sel{background:var(--card2)}.cwd.sel.td{background:rgba(34,160,107,.14);color:#1a8a5a}.cwd.sel.td b,.cwd.sel.td .cwn{color:#1a8a5a}.cwp{display:flex;gap:2px;height:6px;margin-top:2px}.cwp i{width:6px;height:6px;border-radius:50%;display:block}.cwd.sel.td .cwp i{box-shadow:none}:host(.dark) .cwd.td b,:host(.dark) .cwd.sel.td b,:host(.dark) .cwd.sel.td .cwn{color:#4cc38a}.cwl{border-top:1px solid var(--line);padding-top:2px}.cwe{display:grid;grid-template-columns:52px 3px minmax(0,1fr);align-items:center;gap:9px;padding:5px 0;border-bottom:1px solid var(--line);min-width:0}.cwe:last-child{border:0}.cwe .tm{font-size:12px;color:var(--sub);font-weight:600;white-space:nowrap;text-align:right}.cwe.live .tm{color:#22a06b}.cwe i{width:3px;height:22px;border-radius:2px;display:block}.cwx{min-width:0;display:flex;flex-direction:column}.cwx .t{font-size:14px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.cwx .s{font-size:11px;color:var(--sub);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.cwm{font-size:11px;color:var(--sub);font-weight:600;padding:4px 0 0 61px}
.ev2{display:grid;grid-template-columns:auto 3px minmax(0,1fr);align-items:center;gap:9px;padding:6px 0;border-bottom:1px solid var(--line);min-width:0}.ev2:last-child{border:0}
.ev2 .tm{font-size:12px;color:var(--sub);font-weight:600;width:116px;white-space:nowrap;overflow:hidden}.ev2 .tm b{color:var(--text);font-weight:700;margin-right:4px}
.ev2 i{width:3px;height:18px;border-radius:2px;display:block}.ev2 .t{font-size:14px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.ev2 .w{display:none}.ev2.live .tm{color:#22a06b}
.cdiv{font-size:11px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--sub);margin-top:8px;padding:6px 0 2px;border-top:1px solid var(--line)}
.ht2{flex:1 1 0;min-width:0;padding:8px 8px 6px;display:flex;flex-direction:column;align-items:center;position:relative;cursor:pointer;transition:background .2s}
.ht2.heating{background:rgba(255,234,222,.9)}:host(.dark) .ht2.heating{background:rgba(92,52,36,.75)}
.ht2.tb{align-items:stretch;padding:10px 10px 10px 11px;gap:0}.tbh{display:flex;align-items:center;gap:4px;min-width:0;margin-right:-2px}.tbh .hl2{margin-left:0;flex:0 0 auto}.tbn{flex:1;min-width:0;font-size:12.5px;letter-spacing:-.01em;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.ht2.tb .hpw{flex:0 0 auto;width:30px;height:30px}.ht2.tb .hpw ha-icon{--mdc-icon-size:18px}.ht2.tb:not(.on) .hpw{background:var(--card2);color:var(--sub)}.tbv{font-size:32px;font-weight:600;letter-spacing:-.03em;line-height:1;margin-top:8px;font-variant-numeric:tabular-nums}.tbv small{font-size:16px;vertical-align:top;margin-left:1px;color:var(--sub)}.tbs{font-size:11px;font-weight:600;color:var(--sub);margin-top:4px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.ht2.tb.heating .tbs,.ht2.tb.heating .tbv small{color:#e0592a}.tbc{display:flex;align-items:center;justify-content:space-between;margin-top:auto;padding-top:8px;gap:6px}.tbb{width:32px;height:32px;border-radius:50%;border:0;padding:0;background:var(--card2);color:var(--text);display:flex;align-items:center;justify-content:center;cursor:pointer}.tbb ha-icon{--mdc-icon-size:18px}.ht2.tb.heating .tbb{background:rgba(240,106,60,.16);color:#c2410c}:host(.dark) .ht2.tb.heating .tbb{color:#fdba74}.tbt{font-size:15px;font-weight:700;font-variant-numeric:tabular-nums}.ht2.tb.heating .tbt{color:#e0592a}.ht2.tb.off .tbb{opacity:.35;pointer-events:none}.ht2.tb.off .tbt{color:var(--sub)}
.htop{position:absolute;top:6px;left:6px;right:6px;display:flex;justify-content:space-between;align-items:center;height:24px;pointer-events:none}.htop>*{pointer-events:auto}.hl2{height:16px;width:16px;object-fit:contain;display:block;margin-left:3px}
.hpw{width:32px;height:32px;border-radius:50%;border:0;padding:0;background:var(--card2);color:var(--sub);display:flex;align-items:center;justify-content:center;cursor:pointer}.hpw ha-icon{--mdc-icon-size:19px}.ht2.on .hpw{background:#f06a3c;color:#fff}
.hn{font-size:13px;font-weight:600;max-width:calc(100% - 36px);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-top:2px;line-height:20px}
.hdial{position:relative;width:84px;height:76px;margin-top:2px}.hdial svg{position:absolute;left:0;top:0;width:84px;height:84px;overflow:visible}
.hdial .trk{fill:none;stroke:var(--line);stroke-width:6;stroke-linecap:round}:host(.dark) .hdial .trk{stroke:rgba(255,255,255,.1)}.hdial .trk{stroke:rgba(0,0,0,.08)}
.hdial .fil{fill:none;stroke-width:6;stroke-linecap:round}.hdial .fil.dim{opacity:.45}.hdial .knob{fill:#fff;stroke-width:2.5}.hdial .cdot{fill:var(--text)}
.hc2{position:absolute;left:0;right:0;top:23px;text-align:center;line-height:1}.hc2 .htv{font-size:18px;font-weight:600}.hc2 .htv small{font-size:10px;vertical-align:top}
.hc2 .hs{font-size:10.5px;font-weight:600;color:var(--sub);margin-top:3px;white-space:nowrap}.ht2.heating .hc2 .hs{color:#e0592a}.hc2 .hh{font-size:10px;color:var(--sub);margin-top:8px}
.hb{position:absolute;bottom:8px;width:30px;height:30px;border-radius:50%;border:0;padding:0;background:var(--card2);color:var(--text);display:flex;align-items:center;justify-content:center;cursor:pointer}.hb ha-icon{--mdc-icon-size:18px}.hb.m{left:8px}.hb.p{right:8px}.ht2.off .hb{opacity:.35;pointer-events:none}
.music .mc .vb2{opacity:.75}.music .mc .vb2 ha-icon{--mdc-icon-size:18px}.music .mc{gap:6px;flex-wrap:nowrap}.music .mc button{flex:0 0 auto;width:30px !important;height:30px !important}.music .mc .pp{width:38px !important;height:38px !important}.music .mc .vb2{width:28px !important;height:28px !important}.music .mc.mvs{gap:6px;align-items:center}.music .mc.mvs input{flex:1;min-width:40px;accent-color:var(--accent)}.music.art .mc.mvs input{accent-color:#fff}
.npvol{display:flex;align-items:center;gap:12px;width:min(440px,92%);margin-top:20px}.npvol input{flex:1;min-width:0;accent-color:#fff;height:28px}
.npvol button{width:38px;height:38px;flex:0 0 auto;border-radius:50%;border:0;background:rgba(255,255,255,.16);color:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer}.npvol button ha-icon{--mdc-icon-size:20px}
.npvol span{font-size:12px;opacity:.8;width:36px;text-align:right;font-variant-numeric:tabular-nums}
.camov .pop{width:min(94%,1120px)}.camov .tflhd img{width:30px;height:30px;object-fit:contain}.camov .tabs{margin-top:12px}
.cvid{position:relative;margin-top:12px;border-radius:18px;overflow:hidden;background:#111;aspect-ratio:16/9;max-height:62vh;width:100%}
.cvid img,.cvid .cstream{position:absolute;inset:0;width:100%;height:100%;object-fit:contain;display:block}
.clive{position:absolute;left:12px;top:12px;display:flex;align-items:center;gap:6px;background:rgba(0,0,0,.5);color:#fff;font-size:11px;font-weight:700;letter-spacing:.06em;padding:4px 10px;border-radius:999px;backdrop-filter:blur(8px)}.clive i{width:7px;height:7px;border-radius:50%;background:#e5484d;display:block;animation:apulse 1.6s infinite}
.cmo{position:absolute;right:12px;top:12px;background:rgba(0,0,0,.5);color:#fff;font-size:12px;font-weight:600;padding:4px 10px;border-radius:999px;backdrop-filter:blur(8px)}.cmo:empty{display:none}.cmo.on{background:#e5484d}
.phd{display:flex;align-items:center;gap:12px;margin-right:60px;min-height:44px}.wxs{display:inline-block;width:var(--mdc-icon-size,24px);height:var(--mdc-icon-size,24px);flex:0 0 auto;vertical-align:middle;line-height:0}.wxs svg{display:block;overflow:visible}.x.xmap{right:72px;width:auto;padding:0 14px 0 11px;border-radius:999px;gap:6px;font:inherit;font-size:13px;font-weight:600}.x ha-icon{--mdc-icon-size:28px}.x.xmap ha-icon{--mdc-icon-size:18px}.xmap~.phd{margin-right:162px}.tmap{margin-top:12px;height:min(68vh,640px);overflow:auto;border-radius:18px;background:#fff;-webkit-overflow-scrolling:touch}.tmap img{display:block;width:100%;height:100%;object-fit:contain;cursor:zoom-in}.tmap.z img{width:220%;height:auto;max-width:none;object-fit:initial;cursor:zoom-out}.phx{min-width:0}.phd .lbl{margin:0}.pti{font-size:22px;font-weight:700;line-height:1.15;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.psub{font-size:13px;color:var(--sub);margin-top:2px}.psub:empty{display:none}
.plg{width:36px;height:36px;object-fit:contain;flex:0 0 auto;border-radius:8px}:host(.dark) .plg.inv{filter:invert(1)}.phd .pav{width:40px;height:40px;flex:0 0 auto}
.pic{width:42px;height:42px;border-radius:50%;background:var(--card2);color:var(--sub);display:flex;align-items:center;justify-content:center;flex:0 0 auto}.pic ha-icon{--mdc-icon-size:22px}
.pop .phd+.tabs{margin-top:14px}.pop .tabs+*{margin-top:12px}.pop>.cacts,.pop .vacts:last-child{margin-top:16px}.ast-trig{color:#e5484d}.ast-away{color:#e5484d}.ast-home{color:#d97706}.ast-disarmed{color:#22a06b}
.pop .phd+.carhero,.pop .phd+.pmap,.pop .phd+.aseg,.pop .phd+.verr,.pop .phd+.vsec,.pop .phd+.wcg,.pop .phd+.dets,.pop .phd+.tgrid{margin-top:16px}
.verr{margin-top:12px;font-size:14px;font-weight:600;color:#e5484d;display:flex;gap:6px;align-items:center}
:host(:not(.dark)) .ov.npov{background:#eef1f5}:host(:not(.dark)) .npov::after{background:rgba(255,255,255,.5)}:host(:not(.dark)) .npbg{opacity:.5}:host(:not(.dark)) .npw{color:#14181d}:host(:not(.dark)) .npw .art{box-shadow:0 18px 44px rgba(0,0,0,.18)}:host(:not(.dark)) .npw .art.idle{background:rgba(0,0,0,.06)}:host(:not(.dark)) .prog .b{background:rgba(0,0,0,.12)}:host(:not(.dark)) .prog .b i{background:#14181d}:host(:not(.dark)) .ctl button{color:#14181d}:host(:not(.dark)) .npvol button{background:rgba(0,0,0,.07);color:#14181d}:host(:not(.dark)) .npvol input{accent-color:#14181d}:host(:not(.dark)) .nppanel{background:rgba(255,255,255,.66);color:#14181d;box-shadow:0 10px 40px rgba(0,0,0,.08)}:host(:not(.dark)) .nptabs button{background:rgba(0,0,0,.05);color:rgba(20,24,29,.7)}:host(:not(.dark)) .nptabs button.sel{background:#14181d;color:#fff}:host(:not(.dark)) .nphead .bk{background:rgba(0,0,0,.07);color:#14181d}:host(:not(.dark)) .li:active{background:rgba(0,0,0,.05)}:host(:not(.dark)) .li img,:host(:not(.dark)) .li .ph{background:rgba(0,0,0,.06)}:host(:not(.dark)) .sp.on{background:rgba(0,0,0,.05)}:host(:not(.dark)) .sp .chk{color:#14181d}:host(:not(.dark)) .sp.on .chk{color:#1db954}:host(:not(.dark)) .sx .t small{background:rgba(0,0,0,.08)}:host(:not(.dark)) .vol input{accent-color:#14181d}:host(:not(.dark)) .npsrch{background:rgba(0,0,0,.06)}:host(:not(.dark)) .npsrch input{color:#14181d}:host(:not(.dark)) .npsrch input::placeholder{color:rgba(20,24,29,.45)}:host(:not(.dark)) .npsrch .clr{color:#14181d}:host(:not(.dark)) .sorts button{background:rgba(0,0,0,.06);color:rgba(20,24,29,.8)}:host(:not(.dark)) .sorts button.sel{background:#14181d;color:#fff}:host(:not(.dark)) .npov .x{background:rgba(0,0,0,.08);color:#14181d}
@media (max-width:600px){.ov{position:fixed;align-items:flex-end;padding:0}.ov .pop{width:100% !important;max-width:100%;max-height:88vh;border-radius:26px 26px 0 0;padding:20px 16px calc(20px + env(safe-area-inset-bottom));box-sizing:border-box}.ov.npov,.ov.dbov{align-items:stretch}.ov.camov{align-items:center;padding:8px;box-sizing:border-box}.ov.camov .pop{border-radius:26px;max-height:calc(100dvh - 16px);padding:18px 14px}.ov.camov .cvid{margin-left:-14px;margin-right:-14px;width:auto;border-radius:0;aspect-ratio:4/3;max-height:70dvh}.ov.camov .cvid img,.ov.camov .cvid .cstream{object-fit:cover}.pop .tabs{max-width:100%;overflow-x:auto;flex-wrap:nowrap;scrollbar-width:none}.pop .tabs::-webkit-scrollbar{display:none}.pop .tabs button{flex:0 0 auto;padding:8px 13px}.pop .dets,.pop .dets.d5{grid-template-columns:1fr 1fr}.pop .wxp{grid-template-columns:1fr}.pop .wcg{grid-template-columns:1fr 1fr}.pop .agrid,.pop .tgrid{grid-template-columns:1fr}.pop .cgrid{grid-template-columns:1fr 1fr}.pop .carhero{grid-template-columns:1fr}.pop .etab{font-size:12px}.pop .pti{font-size:20px}}`;
class HomePanelCard extends HTMLElement {
  setConfig(c) {
    if (!c || !c.weather) throw new Error('home-panel-card: "weather" is required');
    this._c = Object.assign({ location: 'Home', sun: 'sun.sun', cameras: [], lights: [], media_players: [], calendars: [], heating: [], tfl_lines: [], car: null, energy: null, cameras_path: '', world_clocks: [{ name: 'New Delhi', tz: 'Asia/Kolkata', lat: 28.6139, lon: 77.209 }, { name: 'Dubai', tz: 'Asia/Dubai', lat: 25.2048, lon: 55.2708 }, { name: 'Toronto', tz: 'America/Toronto', lat: 43.6532, lon: -79.3832 }] }, c);
    this._cars = this._c.cars || (this._c.car ? [this._c.car] : []);
    this._sig = {};
  }
  getCardSize() { return 14; }
  set hass(h) {
    const first = !this._hass;
    this._hass = h;
    if (!this._built) { this._build(); if (this.localName === 'home-panel-card' || this.localName === 'home-music-card') window.__hpcFit(this, this.shadowRoot.querySelector('.root'), 1380, 804); window.__hpcSwipe(this); }
    { const md = this._c.dark_mode || 'sun', sn = h.states[this._c.sun], td = !!(h.themes && h.themes.darkMode);
      this.classList.toggle('dark', md === 'dark' || (md === 'sun' ? (sn ? sn.state === 'below_horizon' : td) : md !== 'light' && td)); }
    if (first || this._conn !== h.connection) this._subscribe();
    if (first) { this._fetchCal(); this._fetchTfl(); this._fetchPop(); this._fetchEnergy(); this._fetchHvo(); }
    this._dbWatch(first);
    this._update();
  }
  connectedCallback() {
    this._tickT = setInterval(() => this._tick(), 1000);
    this._camT = setInterval(() => this._refreshCams(), 10000);
    this._calT = setInterval(() => this._fetchCal(), 300000);
    this._tflT = setInterval(() => this._fetchTfl(), 120000);
    if (this._built) { this._tick(); this._refreshCams(); }
  }
  disconnectedCallback() {
    if (this._dbOpenNow) this._dbClose();
    clearInterval(this._tickT); clearInterval(this._camT); clearInterval(this._calT); clearInterval(this._tflT);
    this._unsub();
  }
  _unsub() {
    (this._subs || []).forEach(p => Promise.resolve(p).then(u => u && u()).catch(() => {}));
    this._subs = []; this._conn = null;
  }
  _subscribe() {
    this._unsub();
    const h = this._hass; if (!h || !h.connection) return;
    this._conn = h.connection;
    const sub = type => h.connection.subscribeMessage(ev => {
      if (type === 'hourly') this._hourly = ev.forecast || []; else this._daily = ev.forecast || [];
      this._update(true);
    }, { type: 'weather/subscribe_forecast', forecast_type: type, entity_id: this._c.weather }).catch(() => null);
    this._subs = [sub('hourly'), sub('daily')];
  }
  _build() {
    this._built = true;
    const s = this.attachShadow({ mode: 'open' });
    s.innerHTML = `<style>${CSS}</style><style>${PPLCSS}</style><div class="root"${this._rootStyle()}>
      ${this._c.title ? `<div class="ttl">${esc(this._c.title)}</div>` : ''}
      ${this._c.stats !== false ? '<div class="stats" id="stats"></div>' : ''}
      <div class="grid">
        <div class="left">
          ${this._c.clock_style === 'digital' ? '<div class="card clock dig' + (this._c.clock_date === 'right' ? ' dr' : '') + '" data-act="clk"><div class="dgt"><span id="dtm"></span><span class="ap" id="dap"></span></div><div class="dgd"><span class="d" id="ddw"></span><span id="ddt"></span></div><div class="dgs"><i id="dsec"></i></div></div>' : `<div class="card clock" data-act="clk">${this._clockSvg()}<div class="date"><div class="top"><span class="d" id="dow"></span><span id="mon"></span></div><div class="num" id="dnum"></div></div></div>`}
          ${this._c.calendars.length ? '<div class="card cal" id="cal" data-act="cal"></div>' : ''}
          ${this._c.tfl_lines.length ? '<div class="card tfl" id="tfl" data-act="tfl"></div>' : ''}
          <div class="card wx" id="wx" data-act="wx"></div>
          ${(this._c.inside_temperatures || []).length ? '<div class="card hvo" id="hvo" data-act="wx"></div>' : ''}
        </div>
        <div class="right">
          <div class="toprow"><div class="tcol"><div class="card cams"><div class="head"><span class="chd">${(u => u ? `<img src="${esc(u)}" alt="" onerror="this.style.display='none'">` : '')(this._c.cameras_logo === undefined ? 'https://brands.home-assistant.io/unifiprotect/icon.png' : this._c.cameras_logo)}<span class="lbl">Cameras</span></span>
            ${this._c.cameras_path ? '<button class="pill" data-act="allcams">All cameras ›</button>' : ''}</div>
            <div class="camgrid" id="camgrid"></div></div>${this._c.heating.length ? '<div class="hrow"><div class="heat" id="heat"></div></div>' : ''}</div>${this._c.media_players.length || this._c.energy || this._c.alarm || this._c.vacuum || this._c.internet ? `<div class="side">${this._c.internet ? `<div class="card net" id="net" data-act="net"></div>` : ''}${this._c.energy ? '<div class="card en" id="en" data-act="en"></div>' : ''}${this._c.alarm ? '<div class="card alarm" id="alarm" data-act="alarm"></div>' : ''}${this._c.media_players.length ? '<div class="card music big" id="music" data-act="np"></div>' : ''}${this._c.vacuum ? '<div class="card vac" id="vac" data-act="vac"></div>' : ''}</div>` : ''}</div>
          <div class="bottom"><div class="lights" id="lights"></div>${(this._c.people || []).length ? '<div class="pcol"><div class="card ppl" id="ppl"></div>' : ''}${this._cars.length ? `<div class="card carc${this._cars.length > 1 ? ' multi' : ''}" id="car"${this._cars.length > 1 ? '' : ' data-act="car" data-i="0"'}></div>` : ''}${(this._c.people || []).length ? '</div>' : ''}</div>
        </div>
      </div>
      <div class="ov" id="wxov" data-act="closebg"><div class="pop" id="wxpop"></div></div>
      <div class="ov npov" id="npov"></div>
      <div class="ov" id="calov" data-act="closebg"><div class="pop wide" id="calpop"></div></div>
      <div class="ov" id="clkov" data-act="closebg"><div class="pop" id="clkpop"></div></div>
      <div class="ov" id="tflov" data-act="closebg"><div class="pop" id="tflpop"></div></div>
      <div class="ov" id="carov" data-act="closebg"><div class="pop" id="carpop"></div></div>
      <div class="ov" id="enov" data-act="closebg"><div class="pop" id="enpop"></div></div>
      <div class="ov" id="alov" data-act="closebg"><div class="pop apop" id="alpop"></div></div>
      <div class="ov" id="vacov" data-act="closebg"><div class="pop" id="vacpop" style="width:min(92%,560px)"></div></div>${this._c.internet ? '<div class="ov" id="netov" data-act="closebg"><div class="pop" id="netpop" style="width:min(94%,940px)"></div></div>' : ''}
      <div class="ov camov" id="camov" data-act="closebg"><div class="pop" id="campop"></div></div>
      <div class="ov" id="pplov" data-act="closebg"><div class="pop" id="pplpop" style="width:min(92%,720px)"></div></div>
      <div class="ov" id="pinov" data-act="closebg"><div class="pop" id="pinpop" style="width:min(92%,360px)"></div></div>
      <div class="ov dbov" id="dbov"></div>
    </div>`;
    this._$ = id => s.getElementById(id);
    this._buildCams();
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
  _clockSvg(p = '') {
    let n = '', t = '';
    for (let i = 1; i <= 12; i++) { const a = i * Math.PI / 6; n += `<text x="${(50 + 37 * Math.sin(a)).toFixed(2)}" y="${(50 - 37 * Math.cos(a) + 3).toFixed(2)}" text-anchor="middle">${i}</text>`; }
    for (let i = 0; i < 60; i++) { const a = i * Math.PI / 30, r2 = i % 5 ? 44.5 : 43;
      t += `<line x1="${(50 + 47 * Math.sin(a)).toFixed(2)}" y1="${(50 - 47 * Math.cos(a)).toFixed(2)}" x2="${(50 + r2 * Math.sin(a)).toFixed(2)}" y2="${(50 - r2 * Math.cos(a)).toFixed(2)}"/>`; }
    return `<svg viewBox="0 0 100 100" class="clocksvg"><g class="ticks">${t}</g><g class="nums">${n}</g>
      <line id="${p}hh" x1="50" y1="50" x2="50" y2="27" class="hand h"/><line id="${p}mh" x1="50" y1="50" x2="50" y2="14" class="hand m"/>
      <line id="${p}sh" x1="50" y1="57" x2="50" y2="11" class="hand s"/><circle cx="50" cy="50" r="2.3" class="pin"/></svg>`;
  }
  _tick() {
    if (!this._built) return;
    if (this._camAt) this._camBadges();
    const d = new Date(), s = d.getSeconds(), m = d.getMinutes() + s / 60, h = (d.getHours() % 12) + m / 60;
    if (this._c.clock_style === 'digital') {
      const hr = d.getHours() % 12 || 12, mm = String(d.getMinutes()).padStart(2, '0');
      this._$('dtm').innerHTML = hr + '<b class="' + (s % 2 ? 'off' : '') + '">:</b>' + mm; this._$('dap').textContent = d.getHours() < 12 ? 'am' : 'pm';
      this._$('ddw').textContent = d.toLocaleDateString('en-GB', { weekday: 'long' }); this._$('ddt').textContent = d.getDate() + ' ' + d.toLocaleDateString('en-GB', { month: 'long' });
      this._$('dsec').style.width = (s / 59 * 100) + '%';
    } else {
      this._$('hh').setAttribute('transform', `rotate(${h * 30} 50 50)`);
      this._$('mh').setAttribute('transform', `rotate(${m * 6} 50 50)`);
      this._$('sh').setAttribute('transform', `rotate(${s * 6} 50 50)`);
      this._$('dow').textContent = DOW[d.getDay()]; this._$('mon').textContent = MON[d.getMonth()];
      this._$('dnum').textContent = d.getDate();
    }
    if (this._npOpen) this._renderNp();
    this._musicProg();
    if (this._clkOpen) this._tickWorld();
    if (s === 0) { this._sig.cams = null; this._renderCal(); this._update(); this._fetchHvo(); if (!this._pop || Date.now() - this._pop.at > 1800000) this._fetchPop(); if (!this._en || Date.now() - this._en.at > 1800000) this._fetchEnergy(); }
  }
  _st(id) { return this._hass && this._hass.states[id]; }
  _ph(close, logo, lbl, title, sub) { return `<button class="x" data-act="${close}"><ha-icon icon="mdi:close"></ha-icon></button><div class="phd">${logo || ''}<div class="phx"><div class="lbl">${lbl}</div><div class="pti">${title}</div>${sub ? `<div class="psub">${sub}</div>` : ''}</div></div>`; }
  _plg(u, inv) { return u ? `<img class="plg${inv ? ' inv' : ''}" src="${esc(u)}" alt="" onerror="this.style.display='none'">` : ''; }
  _pic(icon) { return `<span class="pic"><ha-icon icon="${icon}"></ha-icon></span>`; }
  _update(force) {
    if (!this._built || !this._hass) return;
    if (force) this._sig = {};
    const w = this._st(this._c.weather), sun = this._st(this._c.sun);
    const wsig = JSON.stringify([w && w.state, w && w.attributes, sun && sun.state, (this._hourly || []).length && this._hourly[0].datetime]);
    if (wsig !== this._sig.wx) { this._sig.wx = wsig; this._renderWx(); }
    if (this._wxOpen) { const ps = wsig + JSON.stringify((this._daily || []).map(d => d.datetime)); if (ps !== this._sig.wxp) { this._sig.wxp = ps; this._renderWxPop(); } }
    const lsig = JSON.stringify(this._c.lights.map(l => { const e = this._st(l.entity); return e && [e.state, e.attributes.brightness]; }))
      + JSON.stringify(this._npPick());
    if (lsig !== this._sig.lights) { this._sig.lights = lsig; this._renderLights(); }
    if (this._c.stats !== false) { const k = this._c.energy || {}, A = this._c.alarm || {}, ssig = JSON.stringify([k.live_power, k.live_rate, k.today_electricity, k.today_electricity_cost, k.today_gas, k.today_gas_cost, A.entity, ...(A.doors || []).map(d => d.entity), ...this._c.lights.map(l => l.entity), ...this._c.heating.map(z => z.entity)].map(id => { const e = id && this._st(id); return e && [e.state, e.attributes.hvac_action, e.attributes.current_temperature]; })); if (ssig !== this._sig.stats) { this._sig.stats = ssig; this._renderStats(); } }
    if (this._c.energy) { const k = this._c.energy, esig = JSON.stringify([k.live_power, k.live_rate, k.today_electricity, k.today_electricity_cost, k.today_gas, k.today_gas_cost].map(id => { const e = id && this._st(id); return e && [e.state, e.last_updated]; })); if (esig !== this._sig.enl) { this._sig.enl = esig; if ((k.today_electricity || k.today_gas) && this._en && Date.now() - this._en.at > 300000) this._fetchEnergy(); else { this._renderEnergy(); if (this._enOpen) this._renderEnergyPop(); } } }
    const hsig = JSON.stringify(this._c.heating.map(z => { const e = this._st(z.entity); return e && [e.state, e.attributes.current_temperature, e.attributes.temperature, e.attributes.hvac_action, e.attributes.current_humidity]; })) + JSON.stringify(this._pend || {});
    if (hsig !== this._sig.heat) { this._sig.heat = hsig; this._renderHeat(); }
    if ((this._c.inside_temperatures || []).length) { const w = this._st(this._c.weather), hs = JSON.stringify([...this._c.inside_temperatures.map(id => (this._st(id) || {}).state), w && w.attributes.temperature]); if (hs !== this._sig.hvo) { this._sig.hvo = hs; this._renderHvo(); } }
    const csig = JSON.stringify(this._c.cameras.map(c => { const e = this._st(c.entity), mo = c.motion && this._st(c.motion); return [e && e.state, mo && mo.last_changed]; }));
    if (csig !== this._sig.cams) { this._sig.cams = csig; this._updateCams(); }
    if ((this._c.people || []).length) { const psig = JSON.stringify(this._c.people.map(p => [p.tracker, p.battery, p.battery_state, p.geocoded, p.permission].map(id => { const e = id && this._st(id); return e && [e.state, e.last_updated, e.attributes.latitude]; }))) + Math.floor(Date.now() / 60000);
      if (psig !== this._sig.ppl) { this._sig.ppl = psig; this._renderPeople(); if (this._pplOpen != null) this._renderPeoplePop(); } }
    if (this._c.vacuum) { const V = this._c.vacuum, vsg = JSON.stringify([V.entity, V.mode, V.state, V.error].map(id => { const e = id && this._st(id); return e && [e.state, e.attributes.fan_speed]; }));
      if (vsg !== this._sig.vac) { this._sig.vac = vsg; this._renderVac(); if (this._vacOpen) this._renderVacPop(); } }
    if (this._c.internet) { const N = this._c.internet, nsg = JSON.stringify([N.download, N.upload, N.latency, N.block, N.clients, N.uptime].map(id => { const e = id && this._st(id); return e && [e.state, e.last_updated]; }));
      if (nsg !== this._sig.net) { this._sig.net = nsg; this._netSample(); this._renderNet(); if (this._netOpen) this._renderNetPop(); } }
    if (this._c.alarm) { const A = this._c.alarm, ids = [A.entity, ...(A.doors || []).map(x => x.entity), ...(A.motion || []).map(x => x.entity), ...(A.batteries || [])];
      const asig = JSON.stringify(ids.map(id => { const e = this._st(id); return e && [e.state, e.last_changed, id === A.entity ? e.attributes : 0]; })) + (this._alConf || '') + Math.floor(Date.now() / 60000);
      if (asig !== this._sig.alarm) { this._sig.alarm = asig; this._renderAlarm(); if (this._alOpen) this._renderAlarmPop(); } }
    if (this._cars.length) { const vsig = JSON.stringify(this._cars.map(k => Object.keys(k).map(x => { const e = typeof k[x] === 'string' && this._st(k[x]); return e && [e.state, e.last_updated, e.attributes.entity_picture]; })));
      if (vsig !== this._sig.car) { this._sig.car = vsig; this._renderCar(); if (this._carOpen) this._renderCarPop(); } }
  }
  /* ---------- weather ---------- */
  _wxClass(w, sun) {
    if (sun && sun.state === 'below_horizon') return 'night';
    const c = w && w.state;
    if (c === 'sunny' || c === 'partlycloudy') return 'sunny';
    if (/rain|pour|hail|light|snow/.test(c || '')) return 'rain';
    return 'cloud';
  }
  _icon(c, size) { return `<span class="wxs"${size ? ` style="--mdc-icon-size:${size}px"` : ''}>${WXSVG(c)}</span>`; }
  _renderWx() {
    const w = this._st(this._c.weather), sun = this._st(this._c.sun), el = this._$('wx');
    if (!w) { el.innerHTML = '<div class="lbl">Weather unavailable</div>'; return; }
    const a = w.attributes, u = a.temperature_unit || '°C';
    el.className = 'card wx wx2 ' + this._wxClass(w, sun);
    const now = new Date(), dly = this._daily || [], td = dly.find(x => new Date(x.datetime).toDateString() === now.toDateString()) || dly[0];
    const hrs = (this._hourly || []).filter(x => typeof x.temperature === 'number' && new Date(x.datetime) > new Date(now.getTime() - 3600000));
    const hi = td && td.temperature != null ? td.temperature : hrs.length ? Math.max(...hrs.slice(0, 18).map(x => x.temperature)) : null;
    const lo = td && td.templow != null ? td.templow : hrs.length ? Math.min(...hrs.slice(0, 18).map(x => x.temperature)) : null;
    const ws = a.wind_speed, wu = a.wind_speed_unit || 'km/h', feels = a.apparent_temperature != null ? a.apparent_temperature : FEELS(a.temperature, a.humidity, ws, wu);
    // next sun event only
    let sunEv = '';
    if (sun) { const nr = new Date(sun.attributes.next_rising), ns = new Date(sun.attributes.next_setting), up = sun.state === 'above_horizon';
      sunEv = `<span><ha-icon icon="${up ? 'mdi:weather-sunset-down' : 'mdi:weather-sunset-up'}"></ha-icon>${hm(up ? ns : nr)}</span>`; }
    // first wet hour in the next 12
    const wet = hrs.slice(0, 12).find(x => (Number(x.precipitation) || 0) > 0.05 || (this._popAt(x) ?? 0) >= 50 || /rain|pour|snow|hail|lightning/.test(x.condition || ''));
    const rainNow = /rain|pour|snow|hail|lightning/.test(w.state);
    const rain = rainNow ? 'Rain now' : wet ? 'Rain from ' + hs(new Date(wet.datetime).getHours()) : '';
    // next 12 hours, every 2 hours
    const pts = hrs.filter((x, i) => i % 2 === 0).slice(0, 6);
    const prs = pts.map(x => this._popAt(x)), anyP = prs.some(p => p != null && p >= 20);
    const strip = pts.length ? `<div class="wx2s">${pts.map((x, i) => { const pr = prs[i];
      return `<div class="wx2h${i === 0 ? ' now' : ''}"><span class="t">${i === 0 ? 'Now' : hs(new Date(x.datetime).getHours())}</span>${this._icon(x.condition)}<span class="v">${r0(x.temperature)}°</span>${anyP ? `<span class="p">${pr != null && pr >= 20 ? pr + '%' : ''}</span>` : ''}</div>`; }).join('')}</div>` : '<div class="empty2">Loading forecast…</div>';
    el.innerHTML = `<div class="wx2t"><div class="wx2m"><div class="lbl">${esc(this._c.location)}</div>
        <div class="wx2r"><span class="temp">${r0(a.temperature)}<sup>°</sup></span><span class="wx2c"><b>${esc(LABEL[w.state] || w.state)}</b><span>${hi != null ? 'H ' + r0(hi) + '° · L ' + r0(lo) + '°' : ''}</span>${feels != null ? `<span class="wx2f">Feels like ${r0(feels)}°</span>` : ''}</span></div></div>
        ${this._icon(w.state, 46)}</div>
      <div class="cond">${ws != null ? `<span><ha-icon icon="mdi:weather-windy"></ha-icon>${r0(ws)} ${esc(wu)}</span>` : ''}${rain ? `<span class="wx2rain"><ha-icon icon="mdi:umbrella"></ha-icon>${rain}</span>` : sunEv}<span class="wx2hu"><ha-icon icon="mdi:water-percent"></ha-icon>${r0(a.humidity)}%</span></div>
      ${strip}`;
  }
  _fetchPop() {
    const c = this._hass && this._hass.config; if (!c || c.latitude == null || this._popBusy) return;
    this._popBusy = true;
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${c.latitude}&longitude=${c.longitude}&hourly=precipitation_probability&timezone=UTC&forecast_days=3`)
      .then(r => { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(j => { const map = {}, H = j.hourly || {}; (H.time || []).forEach((t, i) => { map[t.slice(0, 13)] = H.precipitation_probability[i]; });
        this._pop = { at: Date.now(), map }; this._update(true); })
      .catch(() => { this._pop = { at: Date.now() - 1500000, map: (this._pop && this._pop.map) || {} }; })
      .finally(() => { this._popBusy = false; });
  }
  _popAt(x) {
    if (x.precipitation_probability != null) return Math.round(x.precipitation_probability);
    const m = this._pop && this._pop.map, d = new Date(x.datetime); if (!m || isNaN(d)) return null;
    const v = m[d.toISOString().slice(0, 13)]; return v == null ? null : Math.round(v);
  }
  _strip(h) {
    const p = h.slice(0, 24).filter(x => typeof x.temperature === 'number');
    if (!p.length) return '<div class="empty2">Loading forecast…</div>';
    const unit = (this._st(this._c.weather) || { attributes: {} }).attributes.precipitation_unit || 'mm';
    return `<div class="hstrip">${p.map((x, i) => {
      const mm = Number(x.precipitation) || 0, pr = this._popAt(x);
      return `<div class="hc ${i === 0 ? 'now' : ''}"><span class="t">${i === 0 ? 'Now' : hs(new Date(x.datetime).getHours())}</span>
        ${this._icon(x.condition)}<span class="v">${r0(x.temperature)}°</span>
        <span class="p ${pr != null && pr < 20 ? 'lo' : ''}">${pr != null ? `<ha-icon icon="mdi:water"></ha-icon>${pr}%` : ''}</span>
        <span class="mm">${mm > 0 ? (Math.round(mm * 10) / 10) + esc(unit) : ''}</span></div>`;
    }).join('')}</div>`;
  }
  _homeModel() {
    const w = this._st(this._c.weather), sun = this._st(this._c.sun); if (!w) return null;
    const a = w.attributes, d = this._daily || [], h = this._hourly || [];
    return { time: hm(new Date()), temp: a.temperature, unit: a.temperature_unit || '°C', cond: w.state, hum: a.humidity, feels: a.apparent_temperature,
      wind: a.wind_speed, windU: a.wind_speed_unit || '', bear: a.wind_bearing, uv: a.uv_index, cloud: a.cloud_coverage, dew: a.dew_point,
      press: a.pressure, pressU: a.pressure_unit || '', precU: a.precipitation_unit || 'mm',
      rise: sun ? hm(sun.attributes.next_rising) : '—', set: sun ? hm(sun.attributes.next_setting) : '—',
      hourly: h.filter((_, i) => i % 3 === 0).slice(0, 8).map((x, i) => ({ t: i === 0 ? 'Now' : hs(new Date(x.datetime).getHours()), c: x.condition, v: x.temperature, p: this._popAt(x) })),
      daily: d.slice(0, 7).map((x, i) => ({ n: i === 0 ? 'Today' : DOW[new Date(x.datetime).getDay()], c: x.condition, lo: x.templow ?? x.temperature, hi: x.temperature, rain: x.precipitation })) };
  }
  _omModel(j) {
    const c = j.current || {}, cu = j.current_units || {}, H = j.hourly || {}, D = j.daily || {};
    const loc = new Date(Date.now() + (j.utc_offset_seconds || 0) * 1000).toISOString();
    let i0 = (H.time || []).findIndex(t => t.slice(0, 13) === loc.slice(0, 13)); if (i0 < 0) i0 = 0;
    const hourly = []; for (let k = 0; k < 8 && i0 + k * 3 < (H.time || []).length; k++) { const i = i0 + k * 3;
      hourly.push({ t: k === 0 ? 'Now' : hs(+String(H.time[i]).slice(11, 13)), c: WMO(H.weather_code[i], H.is_day ? H.is_day[i] : 1), v: H.temperature_2m[i], p: H.precipitation_probability ? H.precipitation_probability[i] : null }); }
    return { time: s12(loc), temp: c.temperature_2m, unit: cu.temperature_2m || '°C', cond: WMO(c.weather_code, c.is_day ?? 1), hum: c.relative_humidity_2m, feels: c.apparent_temperature,
      wind: c.wind_speed_10m, windU: cu.wind_speed_10m || 'km/h', bear: c.wind_direction_10m, uv: c.uv_index, cloud: c.cloud_cover, dew: c.dew_point_2m,
      press: c.pressure_msl, pressU: cu.pressure_msl || 'hPa', precU: (j.daily_units || {}).precipitation_sum || 'mm',
      rise: s12((D.sunrise || [])[0]), set: s12((D.sunset || [])[0]), hourly,
      daily: (D.time || []).slice(0, 7).map((t, i) => ({ n: i === 0 ? 'Today' : DOW[new Date(t + 'T00:00:00Z').getUTCDay()], c: WMO(D.weather_code[i]),
        lo: D.temperature_2m_min[i], hi: D.temperature_2m_max[i], rain: D.precipitation_sum ? D.precipitation_sum[i] : 0 })) };
  }
  _fetchCity(i) {
    const z = this._c.world_clocks[i - 1]; this._om = this._om || {};
    const c = this._om[i]; if (c && (c.loading || (c.at && Date.now() - c.at < 900000))) return;
    this._om[i] = { loading: true };
    const q = `latitude=${z.lat}&longitude=${z.lon}&timezone=auto&forecast_days=7&wind_speed_unit=kmh`
      + '&current=temperature_2m,apparent_temperature,relative_humidity_2m,dew_point_2m,weather_code,cloud_cover,pressure_msl,wind_speed_10m,wind_direction_10m,uv_index,is_day'
      + '&hourly=temperature_2m,weather_code,is_day,precipitation_probability&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,sunrise,sunset';
    fetch('https://api.open-meteo.com/v1/forecast?' + q).then(r => { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(j => { this._om[i] = { at: Date.now(), m: this._omModel(j) }; })
      .catch(() => { this._om[i] = { err: true, at: Date.now() - 840000 }; })
      .finally(() => { if (this._wxOpen && this._wxLoc === i) this._renderWxPop(); });
  }
  _renderWxPop() {
    const el = this._$('wxpop'), li = this._wxLoc || 0, cities = this._c.world_clocks.filter(z => z.lat != null);
    const names = [this._c.location, ...this._c.world_clocks.map(z => z.name)];
    const tabs = `<div class="tabs">${names.map((n, i) => (i === 0 || this._c.world_clocks[i - 1].lat != null)
      ? `<button class="${i === li ? 'sel' : ''}" data-act="wxloc" data-i="${i}">${esc(n)}</button>` : '').join('')}</div>`;
    let m;
    const hd = mm => this._ph('closewx', mm ? `<span class="pic wxi">${this._icon(mm.cond, 26)}</span>` : this._pic('mdi:weather-partly-cloudy'), 'Weather', esc(names[li]), mm ? esc(mm.time + ' · ' + (LABEL[mm.cond] || mm.cond)) : '') + (cities.length ? tabs : '');
    let head = hd(null);
    if (li === 0) m = this._homeModel();
    else { const c = (this._om || {})[li];
      if (!c || !c.m) { if (!c || !c.err) this._fetchCity(li);
        el.innerHTML = head + `<div class="wxmsg">${c && c.err ? `Couldn't load the weather for ${esc(names[li])}. <button class="pill" data-act="wxloc" data-i="${li}" data-retry="1">Try again</button>` : 'Loading…'}</div>`; return; }
      m = c.m; if (Date.now() - c.at > 900000) this._fetchCity(li); }
    if (!m) { el.innerHTML = head + '<div class="wxmsg">Weather unavailable</div>'; return; }
    head = hd(m);
    const det = (k, v, unit) => `<div class="blk det" style="padding:10px 12px"><div class="lbl" style="text-transform:none;letter-spacing:0">${k}</div><div class="v">${v}${unit ? ` <small>${unit}</small>` : ''}</div></div>`;
    const hrs = m.hourly.map(x => `<div><div class="t">${x.t}</div>${this._icon(x.c)}<div class="v">${r0(x.v)}°</div><div class="pr" style="font-size:11px">${x.p != null ? Math.round(x.p) + '%' : ''}</div></div>`).join('');
    const days = m.daily, lo = Math.min(...days.map(x => x.lo)), hi = Math.max(...days.map(x => x.hi)), span = (hi - lo) || 1, today = days[0] || {};
    const rows = days.map(x => {
      const rain = x.rain ? (Math.round(x.rain * 10) / 10) + esc(m.precU) : '';
      return `<div class="day"><div class="dn">${x.n}</div>
        <div class="wi">${this._icon(x.c)}${rain ? `<span class="pr">${rain}</span>` : ''}</div>
        <span class="lo">${r0(x.lo)}°</span><div class="bar"><i style="left:${(x.lo - lo) / span * 100}%;right:${100 - (x.hi - lo) / span * 100}%"></i></div>
        <span class="hi">${r0(x.hi)}°</span></div>`;
    }).join('');
    el.innerHTML = head + `
      <div class="wxp"><div>
        <div class="blk"><div class="row" style="display:flex;justify-content:space-between"><div>
          <div class="lbl">${esc(names[li])} · ${m.time}</div>
          <div class="temp">${r0(m.temp)}<sup>${esc(m.unit)}</sup></div>
          <div class="cond" style="color:var(--text);font-size:16px">${esc(LABEL[m.cond] || m.cond)}</div>
          <div class="cond">${(f => f != null ? 'Feels like ' + r0(f) + '° · ' : '')(m.feels != null ? m.feels : FEELS(m.temp, m.hum, m.wind, m.windU))}High ${r0(today.hi)}° · Low ${r0(today.lo)}°</div></div>${this._icon(m.cond, 72)}</div></div>
        <div class="dets">${det('Humidity', r0(m.hum), '%')}${det('Wind', r0(m.wind), esc(m.windU + ' ' + COMPASS(m.bear)))}
          ${det('UV index', r0(m.uv))}${det('Cloud cover', r0(m.cloud), '%')}${det('Dew point', r0(m.dew) + '°')}
          ${det('Pressure', r0(m.press), esc(m.pressU))}${det('Sunrise', m.rise)}${det('Sunset', m.set)}</div>
        <div class="blk" style="margin-top:10px"><div class="lbl">Next 24 hours</div><div class="hrs">${hrs}</div></div>
      </div><div class="blk wk"><div class="lbl">This week</div><div class="days">${rows || '<div class="cond">Loading…</div>'}</div></div></div>`;
  }
  /* ---------- world clock ---------- */
  _zones() {
    const home = (this._hass && this._hass.config && this._hass.config.time_zone) || Intl.DateTimeFormat().resolvedOptions().timeZone;
    return [{ name: this._c.location || 'Home', tz: home, home: true }, ...this._c.world_clocks];
  }
  _wall(tz, d) {
    const o = {}; new Intl.DateTimeFormat('en-GB', { timeZone: tz, hourCycle: 'h23', year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })
      .formatToParts(d).forEach(x => { o[x.type] = x.value; });
    return { y: +o.year, mo: +o.month, d: +o.day, h: +o.hour % 24, m: +o.minute, s: +o.second, ms: Date.UTC(+o.year, +o.month - 1, +o.day, +o.hour % 24, +o.minute, +o.second) };
  }
  _renderWorld() {
    this._$('clkpop').innerHTML = this._ph('closeclk', this._pic('mdi:earth'), 'Clock', 'World clock', this._zones().length + ' time zones') + `<div class="wcg">${this._zones().map((z, i) =>
        `<div class="wcc ${z.home ? 'home' : ''}" id="wc${i}">${this._clockSvg('w' + i)}<div class="cn">${esc(z.name)}</div><div class="dt" id="wt${i}"></div><div class="of" id="wo${i}"></div></div>`).join('')}</div>`;
    this._tickWorld();
  }
  _tickWorld() {
    const now = new Date(), zs = this._zones(), base = this._wall(zs[0].tz, now);
    zs.forEach((z, i) => {
      const w = this._wall(z.tz, now), card = this._$('wc' + i); if (!card) return;
      const m = w.m + w.s / 60, h = (w.h % 12) + m / 60;
      this._$('w' + i + 'hh').setAttribute('transform', `rotate(${h * 30} 50 50)`);
      this._$('w' + i + 'mh').setAttribute('transform', `rotate(${m * 6} 50 50)`);
      this._$('w' + i + 'sh').setAttribute('transform', `rotate(${w.s * 6} 50 50)`);
      this._$('wt' + i).textContent = t12(w.h, w.m);
      card.classList.toggle('night', w.h < 6 || w.h >= 19);
      const diff = Math.round((w.ms - base.ms) / 60000), dd = Math.round((Date.UTC(w.y, w.mo - 1, w.d) - Date.UTC(base.y, base.mo - 1, base.d)) / 86400000);
      const day = dd === 0 ? 'Today' : dd > 0 ? 'Tomorrow' : 'Yesterday';
      const off = diff === 0 ? (z.home ? 'Home' : 'Same time') : (diff > 0 ? '+' : '−') + Math.floor(Math.abs(diff) / 60) + 'h' + (Math.abs(diff) % 60 ? ' ' + (Math.abs(diff) % 60) + 'm' : '');
      this._$('wo' + i).textContent = z.home ? 'Home · ' + day : day + ' · ' + off;
    });
  }
  /* ---------- heating ---------- */
  _renderHeat() {
    const el = this._$ && this._$('heat'); if (!el) return;
    const p = this._pend || {}, hu = this._c.heating_logo === undefined ? HPC_GLOGO : this._c.heating_logo;
    const hl = hu ? `<img class="hl2" src="${esc(hu)}" alt="" onerror="this.style.display='none'">` : '<span></span>';
    const [lo, hi] = this._c.heating_range || [10, 30], R = 35, C = 42, A0 = 135, SW = 270;
    const ang = v => A0 + SW * (Math.min(hi, Math.max(lo, v)) - lo) / (hi - lo), pt = g => [C + R * Math.cos(g * Math.PI / 180), C + R * Math.sin(g * Math.PI / 180)];
    const arc = (s0, e0) => { const [x, y] = pt(s0), [u, v] = pt(e0); return `M${x.toFixed(1)} ${y.toFixed(1)}A${R} ${R} 0 ${e0 - s0 > 180 ? 1 : 0} 1 ${u.toFixed(1)} ${v.toFixed(1)}`; };
    el.innerHTML = this._c.heating.map(z => {
      const e = this._st(z.entity), nm = esc(z.name || (e && e.attributes.friendly_name) || z.entity);
      if (!e) return `<div class="card ht2 off"><div class="htop">${hl}</div><div class="hn">${nm}</div><div class="hs" style="margin-top:20px">Missing</div></div>`;
      const a = e.attributes, on = e.state !== 'off' && e.state !== 'unavailable', heating = on && a.hvac_action === 'heating';
      const tgt = on ? (p[z.entity] ?? a.temperature) : null, cur = a.current_temperature != null ? Number(a.current_temperature) : null;
      const col = heating ? '#f06a3c' : 'var(--sub)';
      let svg = `<path d="${arc(A0, A0 + SW)}" class="trk"/>`;
      if (tgt != null) { const g = ang(tgt), [mx, my] = pt(g); svg += `<path d="${arc(A0, Math.max(A0 + 0.5, g))}" style="stroke:${col}" class="fil${heating ? '' : ' dim'}"/><circle cx="${mx.toFixed(1)}" cy="${my.toFixed(1)}" r="5" class="knob" style="stroke:${col}"/>`; }
      if (cur != null) { const [cx, cy] = pt(ang(cur)); svg += `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="2" class="cdot"/>`; }
      const st = e.state === 'unavailable' ? 'Unavailable' : !on ? 'Off' : heating ? 'Heating' : 'Idle';
      return `<div class="card ht2 tb ${on ? 'on' : 'off'}${heating ? ' heating' : ''}" data-act="more" data-id="${esc(z.entity)}">
        <div class="tbh">${hl}<span class="tbn">${nm}</span><button class="hpw" data-act="hpw" data-id="${esc(z.entity)}" title="${on ? 'Turn off' : 'Turn on'}"><ha-icon icon="${heating ? 'mdi:fire' : 'mdi:power'}"></ha-icon></button></div>
        <div class="tbv">${cur != null ? cur.toFixed(1) : '—'}<small>°</small></div>
        <div class="tbs">${st}${a.current_humidity != null ? ' · ' + r0(a.current_humidity) + '%' : ''}</div>
        <div class="tbc"><button class="tbb" data-act="hdn" data-id="${esc(z.entity)}" title="Lower"><ha-icon icon="mdi:minus"></ha-icon></button><span class="tbt">${tgt != null ? tgt + '°' : on ? 'On' : 'Off'}</span><button class="tbb" data-act="hup" data-id="${esc(z.entity)}" title="Raise"><ha-icon icon="mdi:plus"></ha-icon></button></div></div>`;
    }).join('');
  }
  _heatStep(id, dir) {
    const e = this._st(id); if (!e || e.state === 'off') return;
    const a = e.attributes, step = a.target_temp_step || 0.5;
    this._pend = this._pend || {}; this._pendT = this._pendT || {};
    const cur = this._pend[id] ?? a.temperature ?? a.current_temperature ?? 20;
    const nv = Math.min(a.max_temp ?? 32, Math.max(a.min_temp ?? 5, Math.round((cur + dir * step) / step) * step));
    this._pend[id] = nv; this._update();
    clearTimeout(this._pendT[id]);
    this._pendT[id] = setTimeout(() => {
      this._hass.callService('climate', 'set_temperature', { entity_id: id, temperature: nv })
        .finally(() => setTimeout(() => { if (this._pend[id] === nv) { delete this._pend[id]; this._update(); } }, 2500));
    }, 1000);
  }
  /* ---------- car ---------- */
  _carInfo(i) {
    const k = this._cars[i || 0], st = id => id && this._st(id), num = id => { const e = st(id); return e && !isNaN(parseFloat(e.state)) ? parseFloat(e.state) : null; };
    const mi = (k.range_unit || 'mi') === 'mi';
    const dist = id => { const e = st(id), v = num(id); if (v == null) return null; const u = e.attributes.unit_of_measurement; return mi && u === 'km' ? v * 0.621371 : !mi && u === 'mi' ? v / 0.621371 : v; };
    const soc = num(k.battery), cs = st(k.charging), raw = cs ? cs.state : '', pw = num(k.power), ends = st(k.ends);
    const L = { charging: 'Charging', instant_charging: 'Charging', initialising: 'Starting charge', charging_completed: 'Fully charged', completed: 'Fully charged',
      charging_error: 'Charging error', error: 'Charging error', not_charging: 'Not charging', off: 'Not plugged in', not_plugged: 'Not plugged in',
      plugged_locked: 'Plugged in', plugged_unlocked: 'Plugged in', plugged_in: 'Plugged in', unplugged: 'Not plugged in', standby: 'Plugged in · waiting' };
    const charging = /charging$/.test(raw) && raw !== 'not_charging' && raw !== 'charging_error' || raw === 'initialising' || (pw || 0) > 0;
    const label = L[raw] || (raw && raw !== 'unknown' && raw !== 'unavailable' ? raw.replace(/_/g, ' ').replace(/^./, c => c.toUpperCase()) : '—');
    const endT = ends && ends.state && !/unknown|unavailable/.test(ends.state) ? new Date(ends.state) : null;
    const be = st(k.battery), img = st(k.image), ue = st(k.updated), lk = st(k.lock);
    const locked = lk ? (lk.entity_id.startsWith('binary_sensor.') ? lk.state === 'off' : lk.state === 'locked') : null;
    const upd = ue && !/unknown|unavailable/.test(ue.state) ? ue.state : be ? be.last_updated : null;
    return { soc, range: dist(k.range), unit: mi ? 'mi' : 'km', label, charging, err: /error/.test(raw), pw, endT: endT && !isNaN(endT) ? endT : null,
      target: num(k.target), mileage: dist(k.mileage), lock: lk, locked, climate: st(k.climate), img: (img && img.attributes.entity_picture) || k.image_url || null,
      upd, name: k.name || 'Car', inv: !!k.invert_logo,
      crest: k.logo === undefined ? 'https://brands.home-assistant.io/porscheconnect/icon.png' : k.logo, wordmark: k.wordmark === undefined ? 'https://brands.home-assistant.io/porscheconnect/logo.png' : k.wordmark };
  }
  _socCol(v) { return v == null ? 'var(--sub)' : v < 20 ? '#e5484d' : v < 50 ? '#f0a43a' : '#22a06b'; }
  _carStatus(c) {
    if (c.charging) return { cls: 'chg', icon: 'mdi:battery-charging', txt: ['Charging', c.pw ? Math.round(c.pw * 10) / 10 + ' kW' : '', c.endT ? 'full by ' + hm(c.endT) : ''].filter(Boolean).join(' · ') };
    return { cls: c.err ? 'err' : '', icon: c.err ? 'mdi:alert-circle-outline' : /plug/i.test(c.label) && !/not/i.test(c.label) ? 'mdi:power-plug' : 'mdi:power-plug-off-outline', txt: c.label };
  }
  _renderCar() {
    const el = this._$ && this._$('car'); if (!el) return;
    const logo = (c, cls) => c.crest ? `<img class="${cls}${c.inv ? ' inv' : ''}" src="${esc(c.crest)}" alt="" onerror="this.style.display='none'">` : '';
    if (this._cars.length > 1) {
      el.innerHTML = this._cars.map((_, i) => { const c = this._carInfo(i), s = this._carStatus(c);
        return `<div class="crow" data-act="car" data-i="${i}">${logo(c, 'clogo')}<div class="cx"><div class="cn">${esc(c.name)}</div>
          <div class="bbar"><i style="width:${c.soc || 0}%;background:${this._socCol(c.soc)}"></i></div>
          <div class="cs ${s.cls}"><ha-icon icon="${s.icon}"></ha-icon><span>${esc(s.txt)}</span></div></div>
          <div class="cv"><b>${c.soc != null ? Math.round(c.soc) + '%' : '—'}</b><small>${c.range != null ? Math.round(c.range) + ' ' + c.unit : ''}</small></div></div>`; }).join('');
      return;
    }
    const c = this._carInfo(0), s = this._carStatus(c);
    el.innerHTML = `${logo(c, 'clogo')}<div class="cx"><div class="lbl">${esc(c.name)}</div>
      <div class="soc">${c.soc != null ? Math.round(c.soc) + '%' : '—'}<small>${c.range != null ? Math.round(c.range) + ' ' + c.unit : ''}</small></div>
      <div class="bbar"><i style="width:${c.soc || 0}%;background:${this._socCol(c.soc)}"></i></div>
      <div class="cs ${s.cls}"><ha-icon icon="${s.icon}"></ha-icon><span>${esc(s.txt)}</span></div></div>`;
  }
  _renderCarPop() {
    const i = this._carIdx || 0, el = this._$('carpop'), c = this._carInfo(i), s = this._carStatus(c), k = this._cars[i];
    const det = (t, v, u) => `<div class="blk det" style="padding:10px 12px"><div class="lbl" style="text-transform:none;letter-spacing:0">${t}</div><div class="v">${v}${u ? ` <small>${u}</small>` : ''}</div></div>`;
    const clim = c.climate && c.climate.state === 'on', locked = c.locked, climCtl = k.climate && k.climate.startsWith('switch.');
    const lt = k.location && this._st(k.location), lla = lt && lt.attributes.latitude, llo = lt && lt.attributes.longitude, lhas = lla != null && llo != null, lq = lhas ? `${lla},${llo}` : '';
    const lzone = !lt ? null : lt.state === 'home' ? 'Home' : lt.state === 'not_home' ? 'Away' : /unknown|unavailable/.test(lt.state) ? 'Unknown' : lt.state.replace(/_/g, ' ').replace(/^./, x => x.toUpperCase());
    const lmap = this._carMap && lhas;
    const ctabs = this._cars.length > 1 ? `<div class="tabs">${this._cars.map((x, j) => `<button class="${j === i ? 'sel' : ''}" data-act="car" data-i="${j}">${esc(x.name || 'Car')}</button>`).join('')}</div>` : '';
    el.innerHTML = this._ph('closecar', this._plg(c.crest, c.inv), 'Car', esc(c.name), esc(s.txt)) + ctabs + `
      <div class="carhero">${c.img ? (k.image_crop && k.image_size ? (() => { const [x0, y0, x1, y1] = String(k.image_crop).split(/[\s,]+/).map(Number), [W, H] = String(k.image_size).split(/[\s,]+/).map(Number), cw = x1 - x0, ch = y1 - y0;
        return `<div class="cimg" style="aspect-ratio:${cw}/${ch};background-image:url('${esc(c.img)}');background-size:${(W / cw * 100).toFixed(2)}% auto;background-position:${(W > cw ? x0 / (W - cw) * 100 : 0).toFixed(2)}% ${(H > ch ? y0 / (H - ch) * 100 : 0).toFixed(2)}%"></div>`; })()
        : `<img src="${esc(c.img)}" alt="" onerror="this.style.display='none'">`) : ''}<div>
        <div class="big">${c.soc != null ? Math.round(c.soc) + '%' : '—'}<small>${c.range != null ? Math.round(c.range) + ' ' + c.unit + ' range' : ''}</small></div>
        <div class="bbar"><i style="width:${c.soc || 0}%;background:${this._socCol(c.soc)}"></i></div>
        <div class="cs ${s.cls}" style="font-size:14px;display:flex;align-items:center;gap:6px"><ha-icon icon="${s.icon}" style="--mdc-icon-size:18px"></ha-icon>${esc(s.txt)}</div></div></div>
      <div class="dets" style="margin-top:16px">${[k.target && det('Charge limit', c.target != null ? Math.round(c.target) : '—', '%'), k.power && det('Charging power', c.pw != null ? Math.round(c.pw * 10) / 10 : '—', 'kW'),
        k.ends && det('Full by', c.endT ? hm(c.endT) : '—'), k.lock && det('Doors', c.lock ? (locked ? 'Locked' : 'Unlocked') : '—'),
        k.mileage && det('Mileage', c.mileage != null ? Math.round(c.mileage).toLocaleString('en-GB') : '—', c.unit), k.climate && det('Climate', c.climate ? (clim ? 'On' : 'Off') : '—'),
        k.location && det('Parked', lzone ? esc(lzone) : '—'), det('Last update', c.upd ? hm(c.upd) : '—'), det('Updated', c.upd ? ago(c.upd) : '—')].filter(Boolean).join('')}</div>
      <div class="cacts">${climCtl ? `<button class="${clim ? 'on' : ''}" data-act="carclim"><ha-icon icon="mdi:fan"></ha-icon>${clim ? 'Stop climate' : 'Start climate'}</button>` : ''}
        ${lhas ? `<button class="${lmap ? 'on' : ''}" data-act="carloc"><ha-icon icon="mdi:map-marker"></ha-icon>${lmap ? 'Hide map' : 'Where is it?'}</button>` : ''}
        ${k.refresh ? '<button data-act="carref"><ha-icon icon="mdi:refresh"></ha-icon>Update from car</button>' : ''}</div>
      ${lmap ? `<iframe class="pmap" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://maps.google.com/maps?q=${lq}&z=16&output=embed"></iframe>
        <div class="pinfo"><span>Parked <b>${esc(lzone)}</b></span><span>Location from <b>${esc(lt.last_updated ? ago(lt.last_updated) : '—')}</b></span></div>
        <div class="cacts"><a class="pgo" href="https://www.google.com/maps/search/?api=1&query=${lq}" target="_blank" rel="noopener"><ha-icon icon="mdi:google-maps"></ha-icon>Open in Google Maps</a></div>` : ''}`;
  }
  /* ---------- people ---------- */
  _pInfo(i) {
    const p = this._c.people[i], st = id => id && this._st(id), t = st(p.tracker), pe = st(p.person), b = st(p.battery), bs = st(p.battery_state), g = st(p.geocoded), pm = st(p.permission);
    const lvl = b && !isNaN(parseFloat(b.state)) ? Math.round(parseFloat(b.state)) : null, chg = bs && /charging|full/i.test(bs.state) && !/not/i.test(bs.state);
    const lat = t && t.attributes.latitude, lon = t && t.attributes.longitude, s = t ? t.state : 'unknown';
    const zone = s === 'home' ? 'Home' : s === 'not_home' ? 'Away' : /unknown|unavailable/.test(s) ? 'Unknown' : s.replace(/_/g, ' ').replace(/^./, c => c.toUpperCase());
    const addr = g && !/unknown|unavailable/.test(g.state) ? g.state.split('\n').filter(Boolean) : [];
    const where = s === 'not_home' && addr.length ? addr.slice(0, 2).join(', ') : zone;
    const upd = t ? t.last_updated : null, old = upd ? Date.now() - new Date(upd) > 6 * 3600000 : false;
    const limited = pm && /when in use|never|denied/i.test(pm.state);
    return { p, name: p.name || (pe && pe.attributes.friendly_name) || p.tracker, pic: pe && pe.attributes.entity_picture, lvl, chg, lat, lon, where, addr, upd, old, limited, acc: t && t.attributes.gps_accuracy };
  }
  _pBat(x) {
    if (x.lvl == null) return '';
    const col = x.lvl < 20 ? '#e5484d' : x.lvl < 50 ? '#f0a43a' : '#22a06b', ic = x.chg ? 'mdi:battery-charging' : 'mdi:battery-' + (x.lvl >= 95 ? 'high' : x.lvl >= 50 ? 'medium' : 'low');
    return `<span class="pb" style="color:${col}"><ha-icon icon="${ic}"></ha-icon>${x.lvl}%</span>`;
  }
  _pAv(x, sz) { return x.pic ? `<img class="pav" src="${esc(x.pic)}" alt=""${sz ? ` style="width:${sz}px;height:${sz}px"` : ''}>` : `<span class="pav"${sz ? ` style="width:${sz}px;height:${sz}px"` : ''}>${esc((x.name || '?').charAt(0))}</span>`; }
  _renderPeople() {
    const el = this._$ && this._$('ppl'); if (!el) return;
    el.innerHTML = this._c.people.map((_, i) => { const x = this._pInfo(i);
      return `<div class="pp" data-act="ppl" data-i="${i}">${this._pAv(x)}<div class="px"><div class="pn">${esc(x.name)}</div>
        <div class="pl${x.old ? ' old' : ''}">${esc(x.where)}${x.upd ? ' · ' + ago(x.upd) : ''}</div>${this._pBat(x)}</div></div>`; }).join('');
  }
  _renderPeoplePop() {
    const el = this._$('pplpop'), i = this._pplOpen || 0, x = this._pInfo(i); if (!el) return;
    const tabs = this._c.people.length > 1 ? `<div class="tabs">${this._c.people.map((_, j) => `<button class="${j === i ? 'sel' : ''}" data-act="ppl" data-i="${j}">${esc(this._pInfo(j).name)}</button>`).join('')}</div>` : '';
    const has = x.lat != null && x.lon != null, q = has ? `${x.lat},${x.lon}` : '';
    const fe = (this._c.people[i] || {}).find, fb = fe && this._st(fe) && !/unavailable/.test(this._st(fe).state), sent = this._pFindAt && this._pFindAt[i] && Date.now() - this._pFindAt[i] < 8000;
    const when = x.upd ? (new Date(x.upd).toDateString() === new Date().toDateString() ? 'today ' + hm(x.upd) : new Date(x.upd).getDate() + ' ' + MON[new Date(x.upd).getMonth()] + ' ' + hm(x.upd)) + ' (' + ago(x.upd) + ')' : '—';
    el.innerHTML = this._ph('closeppl', this._pAv(x, 40), 'Location', esc(x.name), esc(x.where)) + tabs + `
      ${has ? `<iframe class="pmap" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://maps.google.com/maps?q=${q}&z=15&output=embed"></iframe>` : '<div class="wxmsg">No location shared yet</div>'}
      <div class="pinfo"><span>Last location <b>${esc(when)}</b></span>${x.addr.length ? `<span>Address <b>${esc(x.addr.slice(0, 3).join(', '))}</b></span>` : ''}${x.acc ? `<span>Accuracy <b>±${Math.round(x.acc)} m</b></span>` : ''}${x.lvl != null ? `<span>Battery <b>${x.lvl}%${x.chg ? ' · charging' : ''}</b></span>` : ''}</div>
      ${x.limited ? '<div class="pwarn"><ha-icon icon="mdi:map-marker-alert-outline"></ha-icon>Location is only shared while the Home Assistant app is open on this phone, so it may be out of date.</div>' : x.old ? '<div class="pwarn"><ha-icon icon="mdi:clock-alert-outline"></ha-icon>This location is more than 6 hours old.</div>' : ''}
      ${has || fb ? `<div class="cacts">${fb ? `<button class="${sent ? 'on' : ''}" data-act="pfind" data-i="${i}"${sent ? ' disabled' : ''}><ha-icon icon="${sent ? 'mdi:check' : 'mdi:volume-high'}"></ha-icon>${sent ? 'Playing sound on ' + esc(x.name) + "'s phone" : 'Find my phone'}</button>` : ''}${has ? `<a class="pgo" href="https://www.google.com/maps/search/?api=1&query=${q}" target="_blank" rel="noopener"><ha-icon icon="mdi:google-maps"></ha-icon>Open in Google Maps</a>` : ''}</div>` : ''}`;
  }
  /* ---------- vacuum ---------- */
  _vInfo() {
    const V = this._c.vacuum, e = this._st(V.entity); if (!e) return null;
    const op = V.state && this._st(V.state), er = V.error && this._st(V.error), md = V.mode && this._st(V.mode);
    const s = e.state, ops = op ? op.state : '', err = er && !/no_error|unknown|unavailable/.test(er.state) ? er.state.replace(/_/g, ' ').replace(/^./, c => c.toUpperCase()) : '';
    const L = { cleaning: 'Cleaning', paused: 'Paused', returning: 'Returning to dock', idle: 'Idle', error: 'Error', unavailable: 'Unavailable', docked: ops === 'charging' ? 'Docked · charging' : 'Docked' };
    const label = err || L[s] || s.replace(/_/g, ' ').replace(/^./, c => c.toUpperCase());
    const cls = err || s === 'error' ? 'err' : s === 'cleaning' ? 'run' : s === 'returning' ? 'ret' : '';
    const icon = s === 'cleaning' ? 'mdi:robot-vacuum' : s === 'returning' ? 'mdi:home-import-outline' : err || s === 'error' ? 'mdi:robot-vacuum-alert' : 'mdi:robot-vacuum';
    return { e, s, label, cls, icon, err, mode: md && md.state, modes: (md && md.attributes.options) || [], name: V.name || e.attributes.friendly_name || 'Vacuum' };
  }
  _vLogo() { const u = this._c.vacuum.logo === undefined ? 'https://raw.githubusercontent.com/home-assistant/brands/master/custom_integrations/dreame_vacuum/icon.png' : this._c.vacuum.logo;
    return u ? `<img class="vlogo" src="${esc(u)}" alt="" onerror="this.style.display='none'">` : ''; }
  _renderVac() {
    const el = this._$ && this._$('vac'); if (!el) return;
    const v = this._vInfo();
    if (!v) { el.className = 'card vac'; el.innerHTML = '<div class="vic"><ha-icon icon="mdi:robot-vacuum"></ha-icon></div><div class="vx"><div class="vn">Vacuum</div><div class="vs">Not found</div></div>'; return; }
    el.className = 'card vac ' + v.cls;
    const b = (svc, ic, go) => `<button class="${go ? 'go' : ''}" data-act="vcmd" data-svc="${svc}"><ha-icon icon="${ic}"></ha-icon></button>`;
    const btns = v.s === 'cleaning' ? b('pause', 'mdi:pause') + b('return_to_base', 'mdi:home-import-outline')
      : v.s === 'paused' ? b('start', 'mdi:play', 1) + b('return_to_base', 'mdi:home-import-outline')
      : v.s === 'returning' ? b('pause', 'mdi:pause') : b('start', 'mdi:play', 1);
    el.innerHTML = `<div class="vic"><ha-icon icon="${v.icon}"></ha-icon></div><div class="vx"><div class="vn">${esc(v.name)}</div><div class="vs">${esc(v.label)}${v.mode && !v.err ? ' · ' + esc(v.mode) : ''}</div></div><div class="vb">${btns}</div>${this._vLogo()}`;
  }
  _netVal(id) { const e = id && this._st(id); if (!e) return null; const v = parseFloat(e.state); if (isNaN(v)) return null;
    const u = (e.attributes.unit_of_measurement || 'Mbit/s').toLowerCase(); return u.startsWith('kbit') ? v / 1000 : u.startsWith('gbit') ? v * 1000 : u.startsWith('bit') ? v / 1e6 : v; }
  // fill the card's speed graph from the last 30 minutes of history, so it shows straight after a page load
  _netSeed() {
    const H = this._hass, N = this._c.internet; if (this._netSeeded || !H || !H.callWS || !N || !N.download) return; this._netSeeded = true;
    const ids = [N.download, N.upload].filter(Boolean), end = Date.now(), start = end - 30 * 60e3;
    H.callWS({ type: 'history/history_during_period', start_time: new Date(start).toISOString(), end_time: new Date(end).toISOString(), entity_ids: ids, minimal_response: true, no_attributes: true, significant_changes_only: false })
      .then(r => {
        const conv = (id, v) => { const e = this._st(id), u = ((e && e.attributes.unit_of_measurement) || 'Mbit/s').toLowerCase(); return u.startsWith('kbit') ? v / 1000 : u.startsWith('gbit') ? v * 1000 : u.startsWith('bit') ? v / 1e6 : v; };
        const ser = id => ((r && r[id]) || []).map(x => ({ t: (x.lu || x.last_updated || 0) * (x.lu ? 1000 : 1) || Date.parse(x.last_updated), v: parseFloat(x.s != null ? x.s : x.state) })).filter(x => !isNaN(x.v) && x.t).sort((a, b) => a.t - b.t);
        const D = ser(N.download), U = N.upload ? ser(N.upload) : [];
        if (D.length < 2 && U.length < 2) return;
        const at = (S, t) => { let v = null; for (const x of S) { if (x.t > t) break; v = x.v; } return v; }, pts = [];
        for (let i = 0; i < 60; i++) { const t = start + (i + 1) * 30e3, d = at(D, t), u = at(U, t); if (d != null || u != null) pts.push({ t, d: d == null ? null : conv(N.download, d), u: u == null ? null : conv(N.upload, u) }); }
        const live = (this._netH || []).filter(p => p.t > end); this._netH = pts.concat(live).slice(-60); this._renderNet();
      }).catch(() => {});
  }
  _netSample() { const N = this._c.internet, d = this._netVal(N.download), u = this._netVal(N.upload); if (d == null && u == null) return;
    const h = this._netH || (this._netH = []), now = Date.now(); if (h.length && now - h[h.length - 1].t < 4000) h[h.length - 1] = { t: now, d, u }; else h.push({ t: now, d, u });
    while (h.length > 60) h.shift(); }
  _netFmt(v) { if (v == null) return '—'; return v >= 1000 ? (v / 1000).toFixed(2) + '<small>Gbps</small>' : v >= 100 ? Math.round(v) + '<small>Mbps</small>' : v >= 10 ? v.toFixed(1) + '<small>Mbps</small>' : v >= 1 ? v.toFixed(2) + '<small>Mbps</small>' : Math.round(v * 1000) + '<small>kbps</small>'; }
  _renderNet() {
    const el = this._$ && this._$('net'); if (!el) return;
    const N = this._c.internet, d = this._netVal(N.download), u = this._netVal(N.upload), le = N.latency && this._st(N.latency), lat = le ? parseFloat(le.state) : NaN;
    const bl = this._netBlocked() === true, off = bl || (d == null && u == null);
    this._netSeed();
    const h = this._netH || [], mx = Math.max(1, ...h.map(p => Math.max(p.d || 0, p.u || 0)));
    const line = k => h.length > 1 ? h.map((p, i) => `${(i / (h.length - 1) * 100).toFixed(1)},${(28 - (p[k] || 0) / mx * 26).toFixed(1)}`).join(' ') : '';
    // live speed graph drawn faintly behind the card's content, along its bottom edge
    const spark = h.length > 1 ? `<svg viewBox="0 0 100 30" preserveAspectRatio="none"><polygon class="sa" points="0,30 ${line('d')} 100,30"/><polyline class="su" points="${line('u')}" vector-effect="non-scaling-stroke"/><polyline class="sd" points="${line('d')}" vector-effect="non-scaling-stroke"/></svg>` : '<svg viewBox="0 0 100 30" preserveAspectRatio="none"><polyline class="sd" points="0,28 100,28" vector-effect="non-scaling-stroke"/></svg>';
    this._netFetch(); // today's usage (refreshed at most every 5 minutes)
    const F = this._netF, tot = F && !F.err ? F.dl + F.ul : 0, tday = tot ? this._netMB(tot).replace(/<small>/g, ' ').replace(/<[^>]+>/g, '') : null;
    const ratio = tot && F.avg ? tot / F.avg : null, tl = ratio == null ? '' : ratio <= 0.9 ? 'g' : ratio <= 1.2 ? 'a' : 'r';
    const ttl = ratio == null ? '' : ` title="${Math.round(ratio * 100)}% of a typical day by this time"`;
    el.className = 'card net' + (off ? ' off' : '');
    el.innerHTML = `<div class="nic"><ha-icon icon="${off ? 'mdi:web-off' : 'mdi:web'}"></ha-icon></div><div class="nx"><div class="nn">${esc(N.name || 'Internet')}</div><div class="ns">${bl ? 'Paused' : off ? 'Offline' : !isNaN(lat) ? Math.round(lat) + (tday ? ' ms' : ' ms ping') : 'Online'}${tday ? ` · <span class="nt ${tl}"${ttl}>${tday} today</span>` : ''}</div></div>${spark}
      <div class="nv"><div class="dn"><span><ha-icon icon="mdi:arrow-down"></ha-icon>Down</span><b>${this._netFmt(d)}</b></div><div class="up"><span><ha-icon icon="mdi:arrow-up"></ha-icon>Up</span><b>${this._netFmt(u)}</b></div></div>`;
  }
  _rootStyle() {
    // left_width / side_width: percentages of the full panel width
    const pc = v => { const m = /^(\d+(?:\.\d+)?)%$/.exec(String(v || '')); return m ? +m[1] : null; };
    const lw = pc(this._c.left_width), sw = pc(this._c.side_width), out = [];
    if (lw != null) out.push(`--lw:${lw}%`);
    if (sw != null) out.push(`--sw:${(sw / (100 - (lw != null ? lw : 30)) * 100).toFixed(2)}%`);
    return out.length ? ` style="${out.join(';')}"` : '';
  }

  _netBlocked() { const b = this._c.internet && this._c.internet.block, e = b && this._st(b); return e ? e.state === 'on' : null; }
  _netClients() {
    const N = this._c.internet, H = this._hass, ents = H.entities || {}, devs = H.devices || {};
    if (this._netCl && this._netClAt === ents) return this._netCl;
    const skip = new Set([N.download, N.upload].filter(Boolean)), wanDev = N.download && ents[N.download] && ents[N.download].device_id;
    const ex = (N.exclude || []).map(x => String(x).toLowerCase()), names = N.names || {}, by = {};
    Object.values(ents).forEach(e => { const m = e.entity_id.match(/^sensor\.(?:.*_)?(rx|tx)(?:_\d+)?$/);
      if (!m || e.platform !== 'unifi' || skip.has(e.entity_id) || !e.device_id || e.device_id === wanDev || e.hidden || e.disabled_by) return;
      (by[e.device_id] = by[e.device_id] || {})[m[1]] = e.entity_id; });
    this._netCl = Object.entries(by).map(([d, x]) => { const dv = devs[d] || {}; const mac = ((dv.connections || []).find(c => c[0] === 'mac') || [])[1] || '', mf = String(dv.manufacturer || '').replace(/\b(Technologies|Technology|Electronics|Interactive Entertainment|Inc\.?|Ltd\.?|Co\.?|Corporation|Corp\.?|LLC|GmbH|,)\b/gi, '').replace(/[,.]/g, ' ').replace(/\s+/g, ' ').trim();
      const nm = names[x.rx] || names[x.tx] || names[d] || names[mac] || dv.name_by_user || dv.name || ((mf ? mf + ' device' : 'Unknown device') + (mac ? ' (' + mac.slice(-5) + ')' : ''));
      return { dev: d, rx: x.rx, tx: x.tx, name: nm }; })
      .filter(c => !ex.includes(String(c.name).toLowerCase()) && !ex.includes(c.rx) && !ex.includes(c.tx));
    this._netClAt = ents; return this._netCl;
  }
  _netMBs(id) { const e = id && this._st(id); if (!e) return 0; const v = parseFloat(e.state); if (!isFinite(v) || v <= 0) return 0; return v * this._netUF(e); }
  _netUF(e) { const u = ((e && e.attributes.unit_of_measurement) || 'MB/s'); return /bit/i.test(u) ? (/^k/i.test(u) ? 1 / 8000 : /^g/i.test(u) ? 1000 / 8 : /^m/i.test(u) ? 1 / 8 : 1 / 8e6) : /^k/i.test(u) ? 0.001 : /^g/i.test(u) ? 1000 : /^b/i.test(u) ? 1e-6 : 1; }
  _netFetch(force) {
    const H = this._hass; if (!H || !H.callWS || this._netBusy) return; const now = Date.now();
    if (!force && this._netF && now - this._netF.at < 300000) return; this._netBusy = true;
    const N = this._c.internet, cl = this._netClients(), mid = new Date(); mid.setHours(0, 0, 0, 0);
    const ids = cl.flatMap(c => [c.rx, c.tx]).filter(Boolean), wan = [N.download, N.upload].filter(Boolean), end = new Date().toISOString();
    const q = (sid, st, period, types) => sid.length ? H.callWS({ type: 'recorder/statistics_during_period', start_time: st, end_time: end, statistic_ids: sid, period, types }) : Promise.resolve({});
    const ts = v => typeof v === 'number' ? v : Date.parse(v);
    const used = (rows, f) => (rows || []).reduce((t, r) => { const s = ts(r.start), e = r.end != null ? ts(r.end) : s + 300000; return t + (r.mean > 0 ? r.mean * f * (e - s) / 1000 : 0); }, 0);
    const wk = new Date(mid); wk.setDate(wk.getDate() - 7);
    Promise.all([q(ids, mid.toISOString(), '5minute', ['mean']), q(wan, new Date(now - 24 * 3600e3).toISOString(), 'hour', ['mean', 'max']), q(wan, mid.toISOString(), '5minute', ['mean']), q(wan, wk.toISOString(), 'hour', ['mean']).catch(() => ({}))])
      .then(([a, b, c, w]) => {
        const f = id => this._netUF(this._st(id));
        const dev = cl.map(x => ({ ...x, mb: used(a[x.rx], f(x.rx)) + used(a[x.tx], f(x.tx)) })).filter(x => x.mb > 0.05).sort((p, r) => r.mb - p.mb);
        const dl = used(c[N.download], f(N.download)), ul = used(c[N.upload], f(N.upload));
        const up = {}; (b[N.upload] || []).forEach(r => { up[ts(r.start)] = r; });
        const hours = (b[N.download] || []).map(r => { const t = ts(r.start), u = up[t] || {}; return { t, d: (r.mean || 0) * f(N.download) * 8, dm: (r.max || r.mean || 0) * f(N.download) * 8, u: (u.mean || 0) * f(N.upload) * 8 }; });
        // typical usage by this time of day over the previous 7 days (days with data only)
        const sofar = now - mid.getTime(), byDay = {};
        [N.download, N.upload].forEach(id => (w[id] || []).forEach(r => {
          const s0 = ts(r.start), e0 = r.end != null ? ts(r.end) : s0 + 3600e3, d0 = new Date(s0); d0.setHours(0, 0, 0, 0);
          if (d0.getTime() >= mid.getTime()) return;
          const cut = d0.getTime() + sofar, part = Math.max(0, Math.min(e0, cut) - s0);
          if (r.mean > 0 && part > 0) byDay[d0.getTime()] = (byDay[d0.getTime()] || 0) + r.mean * f(id) * part / 1000;
        }));
        const days = Object.values(byDay).filter(v => v > 1), avg = days.length >= 2 ? days.reduce((t, v) => t + v, 0) / days.length : null;
        this._netF = { at: Date.now(), dev, dl, ul, hours, avg, avgDays: days.length };
      })
      .catch(() => { this._netF = { at: Date.now(), err: 1, dev: [], hours: [] }; })
      .finally(() => { this._netBusy = false; this._renderNet(); if (this._netOpen) this._renderNetPop(); });
  }
  _netMB(mb) { return mb >= 1024 ? (mb / 1024).toFixed(mb >= 10240 ? 1 : 2) + '<small>GB</small>' : mb >= 10 ? Math.round(mb) + '<small>MB</small>' : mb >= 1 ? mb.toFixed(1) + '<small>MB</small>' : Math.round(mb * 1024) + '<small>KB</small>'; }
  _renderNetPop() {
    const el = this._$ && this._$('netpop'); if (!el) return;
    const N = this._c.internet, d = this._netVal(N.download), u = this._netVal(N.upload), le = N.latency && this._st(N.latency), lat = le ? parseFloat(le.state) : NaN;
    const bl = this._netBlocked(), off = d == null && u == null, F = this._netF, tab = this._netTab || 'today';
    const q = isNaN(lat) ? null : lat < 20 ? ['Excellent', 'g'] : lat < 40 ? ['Good', 'g'] : lat < 80 ? ['Fair', 'a'] : ['Poor', 'r'];
    const sub = bl ? 'Internet is paused for the whole house' : off ? 'Offline' : 'Online' + (q ? ' · ' + q[0].toLowerCase() + ' connection' : '');
    const st = id => { const e = id && this._st(id); return e && !/unknown|unavailable/.test(e.state) ? e : null; };
    const cl = st(N.clients), up = st(N.uptime), cpu = st(N.cpu), mem = st(N.memory);
    const upTxt = up ? (() => { const s = (Date.now() - Date.parse(up.state)) / 1000; if (!isFinite(s) || s < 0) return null; const dd = Math.floor(s / 86400), hh = Math.floor(s % 86400 / 3600); return dd ? dd + 'd ' + hh + 'h' : hh + 'h ' + Math.floor(s % 3600 / 60) + 'm'; })() : null;
    const tile = (k, v, sm, cls) => `<div class="${cls || ''}"><span>${k}</span><b>${v}</b>${sm ? `<em>${sm}</em>` : ''}</div>`;
    const tiles = [
      tile('<ha-icon icon="mdi:arrow-down"></ha-icon>Download', this._netFmt(d), 'right now', 'dn'),
      tile('<ha-icon icon="mdi:arrow-up"></ha-icon>Upload', this._netFmt(u), 'right now', 'up'),
      tile('Ping', !isNaN(lat) ? Math.round(lat) + '<small>ms</small>' : '—', q ? `<i class="q${q[1]}">${q[0]}</i>` : ''),
      tile('Internet today', F && !F.err && (F.dl || F.ul) ? this._netMB(F.dl + F.ul) : '—', F && !F.err && (F.dl || F.ul) ? '↓ ' + this._netMB(F.dl).replace(/<[^>]+>/g, ' ').trim() + ' · ↑ ' + this._netMB(F.ul).replace(/<[^>]+>/g, ' ').trim() : '')];
    // 24h chart
    const hs = F && F.hours || [], hmax = Math.max(1, ...hs.map(h => Math.max(h.d, h.u)));
    const pk = hs.reduce((m, h) => h.dm > (m ? m.dm : -1) ? h : m, null), hh = t => String(new Date(t).getHours()).padStart(2, '0') + ':00';
    const bw = 100 / Math.max(24, hs.length);
    const bars = hs.map((h, i) => { const x = i * bw, hd = h.d / hmax * 52, hu = h.u / hmax * 52; return `<rect class="bd" x="${(x + bw * .12).toFixed(2)}" y="${(56 - hd).toFixed(2)}" width="${(bw * .76).toFixed(2)}" height="${Math.max(hd, .6).toFixed(2)}" rx=".8"/><rect class="bu" x="${(x + bw * .3).toFixed(2)}" y="${(56 - hu).toFixed(2)}" width="${(bw * .4).toFixed(2)}" height="${Math.max(hu, .4).toFixed(2)}" rx=".6"/>`; }).join('');
    const chart = `<div class="nbox"><div class="nbh"><b>Last 24 hours</b><span>${pk && pk.dm > 0 ? 'Peak ' + this._netFmt(pk.dm).replace(/<[^>]+>/g, ' ').trim() + ' at ' + hh(pk.t) : F ? (F.err ? "Couldn't load history" : 'No history yet') : 'Loading…'}</span></div>
      ${hs.length ? `<svg class="nch" viewBox="0 0 100 60" preserveAspectRatio="none">${bars}</svg><div class="nax"><span>${hh(hs[0].t)}</span><span>${hh(hs[Math.floor(hs.length / 2)].t)}</span><span>Now</span></div><div class="nlg"><i class="ld"></i>Download <i class="lu"></i>Upload</div>` : '<div class="nempty"></div>'}</div>`;
    const chips = [cl && ['mdi:devices', esc(cl.state) + ' devices online'], upTxt && ['mdi:router-network', 'Router up ' + upTxt], cpu && ['mdi:cpu-64-bit', 'CPU ' + Math.round(+cpu.state) + '%'], mem && ['mdi:memory', 'Memory ' + Math.round(+mem.state) + '%']].filter(Boolean);
    const health = chips.length ? `<div class="nchips">${chips.map(c => `<span><ha-icon icon="${c[0]}"></ha-icon>${c[1]}</span>`).join('')}</div>` : '';
    // devices
    const live = this._netClients().map(c => ({ ...c, now: (this._netMBs(c.rx) + this._netMBs(c.tx)) * 8 })), liveBy = {}; live.forEach(c => { liveBy[c.dev] = c.now; });
    let rows, note;
    if (tab === 'now') { const L = live.filter(c => c.now >= 0.01).sort((a, b) => b.now - a.now).slice(0, 8), mx = Math.max(.01, ...L.map(c => c.now));
      rows = L.map((c, i) => this._netRow(i, c.name, this._netFmt(c.now), c.now / mx, '')); note = L.length ? live.filter(c => c.now >= 0.1).length + ' devices active right now' : 'Nothing is using much data right now'; }
    else { const L = (F && F.dev || []).slice(0, 8), mx = Math.max(.01, ...L.map(c => c.mb)), tot = (F && F.dev || []).reduce((t, c) => t + c.mb, 0);
      rows = L.map((c, i) => this._netRow(i, c.name, this._netMB(c.mb), c.mb / mx, (liveBy[c.dev] || 0) >= 0.5 ? `<i class="nlive">${this._netFmt(liveBy[c.dev]).replace(/<[^>]+>/g, ' ').trim()} now</i>` : tot ? `<i class="nsh">${Math.round(c.mb / tot * 100)}%</i>` : ''));
      note = !F ? 'Working out today\'s usage…' : F.err ? "Couldn't load usage history" : L.length ? 'Since midnight · includes traffic inside the house (casting, Sonos, streaming between devices), so it can add up to more than Internet today' : 'No usage recorded yet today'; }
    const ins = [], hsT = hs.filter(h => h.t >= new Date().setHours(0, 0, 0, 0)), act = live.filter(c => c.now >= 0.1).length;
    if (F && F.dev && F.dev.length) { const tot = F.dev.reduce((t, c) => t + c.mb, 0), top = F.dev[0]; ins.push(['mdi:crown-outline', `<b>${esc(top.name)}</b> has moved the most data today – ${this._netMB(top.mb).replace(/<[^>]+>/g, ' ').trim()}, ${Math.round(top.mb / tot * 100)}% of all device traffic`]); }
    if (hsT.length > 1) { const bz = hsT.reduce((m, h) => h.d > m.d ? h : m, hsT[0]), avg = hsT.reduce((t, h) => t + h.d, 0) / hsT.length; ins.push(['mdi:chart-timeline-variant', `Busiest hour today was <b>${hh(bz.t)}</b> · average download ${this._netFmt(avg).replace(/<[^>]+>/g, ' ').trim()}`]); }
    ins.push(['mdi:access-point-network', act ? `<b>${act}</b> device${act === 1 ? ' is' : 's are'} using the internet right now` : 'Nothing is using much internet right now']);
    if (q && q[1] !== 'g') ins.push(['mdi:alert-outline', `Ping is ${Math.round(lat)} ms – video calls and gaming may lag`]);
    const glance = `<div class="nbox"><div class="nbh"><b>At a glance</b></div>${ins.map(x => `<div class="nin"><ha-icon icon="${x[0]}"></ha-icon><span>${x[1]}</span></div>`).join('')}</div>`;
    const devs = `<div class="nbox ndev"><div class="nbh"><div><b>Top devices</b><span class="nsh2">Wi-Fi &amp; network traffic</span></div><div class="ntabs"><button class="${tab === 'today' ? 'sel' : ''}" data-act="nettab" data-t="today">Today</button><button class="${tab === 'now' ? 'sel' : ''}" data-act="nettab" data-t="now">Right now</button></div></div>${rows.join('') || '<div class="nempty"></div>'}<div class="nnote">${note}</div></div>`;
    let btn = '';
    if (N.block) btn = bl
      ? `<div class="vacts"><button class="go" data-act="netgo"><ha-icon icon="mdi:web"></ha-icon>Turn internet back on</button></div><div class="nnote">Wi-Fi and the home network still work. Only the internet is blocked.</div>`
      : this._netArm
        ? `<div class="vacts"><button class="stop" data-act="netstop"><ha-icon icon="mdi:alert-outline"></ha-icon>Tap again to stop all internet</button></div><div class="nnote">Every device in the house will lose internet until you turn it back on here.</div>`
        : `<div class="vacts"><button class="warn" data-act="netstop"><ha-icon icon="mdi:web-off"></ha-icon>Stop all internet</button></div>`;
    el.innerHTML = this._ph('closenet', this._pic(bl ? 'mdi:web-off' : 'mdi:web'), 'Network', esc(N.name || 'Internet'), sub)
      + (bl ? '<div class="verr"><ha-icon icon="mdi:web-off"></ha-icon>Internet is switched off</div>' : '')
      + `<div class="ngrid">${tiles.join('')}</div><div class="nwrap"><div class="ncol">${chart}${glance}${health}</div><div class="ncol">${devs}</div></div>${btn}`;
  }
  _netRow(i, name, val, frac, extra) { return `<div class="ndr"><span class="nrk">${i + 1}</span><div class="nrx"><div class="nrn"><span>${esc(name)}</span>${extra || ''}</div><div class="ndb"><i style="width:${Math.max(3, Math.round(frac * 100))}%"></i></div></div><b>${val}</b></div>`; }
  _renderVacPop() {
    const el = this._$('vacpop'), v = this._vInfo(), V = this._c.vacuum; if (!el) return;
    const vu = V.logo === undefined ? 'https://raw.githubusercontent.com/home-assistant/brands/master/custom_integrations/dreame_vacuum/icon.png' : V.logo;
    const head = this._ph('closevac', this._plg(vu), esc(V.model || 'Robot vacuum'), esc(v ? v.name : V.name || 'Vacuum'), v ? esc(v.label) : '');
    if (!v) { el.innerHTML = head + '<div class="wxmsg">Vacuum not found</div>'; return; }
    const act = (svc, ic, t, go) => `<button class="${go ? 'go' : ''}" data-act="vcmd" data-svc="${svc}"><ha-icon icon="${ic}"></ha-icon>${t}</button>`;
    const acts = (v.s === 'cleaning' ? act('pause', 'mdi:pause', 'Pause') : act('start', 'mdi:play', v.s === 'paused' ? 'Resume' : 'Start cleaning', 1))
      + (v.s === 'docked' ? '' : act('return_to_base', 'mdi:home-import-outline', 'Dock')) + (v.s === 'cleaning' || v.s === 'paused' ? act('stop', 'mdi:stop', 'Stop') : '');
    const rooms = V.rooms || [];
    el.innerHTML = head + `${v.err ? `<div class="verr"><ha-icon icon="mdi:alert-circle-outline"></ha-icon>${esc(v.err)}</div>` : ''}
      ${v.modes.length ? `<div class="vsec"><div class="lbl">Cleaning mode</div><div class="vchips">${v.modes.map(m => `<button class="${m === v.mode ? 'sel' : ''}" data-act="vmode" data-m="${esc(m)}">${esc(m)}</button>`).join('')}</div></div>` : ''}
      ${rooms.length ? `<div class="vsec"><div class="lbl">Clean a room</div><div class="vchips">${rooms.map((r, i) => `<button data-act="vroom" data-i="${i}">${esc(r.name || r.area)}</button>`).join('')}</div></div>` : ''}
      <div class="vacts">${acts}</div>`;
  }
  /* ---------- alarm ---------- */
  _renderStats() {
    const el = this._$ && this._$('stats'); if (!el) return;
    const c = this._c, L = c.energy ? this._enLive() : null, RG = { green: '34,160,107', blue: '59,130,246', orange: '240,106,60', teal: '14,165,164', amber: '217,119,6', grey: '138,143,152', purple: '168,85,247', red: '229,72,77' };
    const on = (c.lights || []).filter(l => (this._st(l.entity) || {}).state === 'on').length;
    const al = c.alarm ? this._alInfo() : null;
    const hz = (c.heating || []).map(z => this._st(z.entity)).filter(Boolean), heating = hz.filter(e => e.attributes.hvac_action === 'heating').length;
    const tv = hz.map(e => parseFloat(e.attributes.current_temperature)).filter(v => isFinite(v)), tin = tv.length ? tv.reduce((a, b) => a + b, 0) / tv.length : null;
    const kw = L && L.p != null ? L.p / 1000 : null, r1 = v => (Math.round(v * 10) / 10).toFixed(1);
    const tile = (icon, col, v, k, act, hi) => `<div class="card st${hi ? ' hi' : ''}" style="--rgb:${RG[col]}" ${act}><span class="sti"><ha-icon icon="${icon}"></ha-icon></span><div class="sx"><div class="sv">${v}</div><div class="sk">${k}</div></div></div>`;
    const out = [];
    if (L) out.push(
      tile('mdi:transmission-tower-import', kw == null ? 'grey' : kw >= 3 ? 'red' : kw >= 1 ? 'amber' : 'green', kw != null ? (kw < 1 ? Math.round(kw * 1000) + '<small>W</small>' : kw.toFixed(2) + '<small>kW</small>') : '—', 'Using now', 'data-act="en"', kw != null && kw >= 3),
      tile('mdi:lightning-bolt', 'blue', L.e != null ? r1(L.e) + '<small>kWh</small>' : '—', 'Electric today', 'data-act="en"'),
      tile('mdi:fire', 'orange', L.g != null ? r1(L.g) + '<small>kWh</small>' : '—', 'Gas today', 'data-act="en"'),
      tile('mdi:currency-gbp', 'teal', L.cost != null ? '£' + L.cost.toFixed(2) : '—', L.phs ? 'Spent · ' + L.phs : 'Spent today', 'data-act="en"'));
    if ((c.lights || []).length) out.push(tile('mdi:lightbulb-group', on ? 'amber' : 'grey', on ? on + ' on' : 'All off', 'Lights', 'data-act="golights"', on > 0));
    if (al) out.push(
      tile(al.open.length ? 'mdi:door-open' : 'mdi:door-closed-lock', al.open.length ? 'orange' : 'green', al.open.length ? al.open.length + ' open' : 'All closed', 'Doors', 'data-act="alarm"', al.open.length > 0),
      tile(al.icon, al.cls === 'trig' ? 'red' : al.cls === 'away' ? 'red' : al.cls === 'home' || al.cls === 'wait' ? 'amber' : 'green', esc(al.label.replace('Armed · ', '')), 'Alarm', 'data-act="alarm"', al.cls === 'trig'));
    if (hz.length) out.push(tile(heating ? 'mdi:fire' : 'mdi:thermometer', heating ? 'orange' : 'purple', heating ? heating + ' heating' : tin != null ? r1(tin) + '°' : '—', heating ? (tin != null ? r1(tin) + '° inside' : 'Heating') : 'Inside avg', `data-act="more" data-id="${esc(c.heating[0].entity)}"`, heating > 0));
    el.innerHTML = out.join('');
    el.style.gridTemplateColumns = out.length && out.length !== 8 && matchMedia('(min-width:1001px)').matches ? `repeat(${out.length},minmax(0,1fr))` : '';
  }
  /* ---------- home vs outside ---------- */
  _fetchHvo() {
    const ids = this._c.inside_temperatures || []; if (!ids.length || !this._hass || !this._hass.callWS) return;
    const H = this._hv = this._hv || {}; if (H.busy || (H.at && Date.now() - H.at < 900000)) return;
    H.busy = true; const end = new Date(), start = new Date(end - 48 * 3600000), cf = this._hass.config || {};
    const inside = this._hass.callWS({ type: 'history/history_during_period', start_time: start.toISOString(), end_time: end.toISOString(), entity_ids: ids, minimal_response: true, no_attributes: true, significant_changes_only: false })
      .then(res => { H.hist = ids.map(id => ((res && res[id]) || []).map(x => [x.lu != null ? x.lu * 1000 : Date.parse(x.last_updated || x.last_changed), parseFloat(x.s != null ? x.s : x.state)]).filter(q => isFinite(q[1]) && isFinite(q[0])).sort((a, b) => a[0] - b[0])); }).catch(() => {});
    const lat = this._c.latitude ?? cf.latitude, lon = this._c.longitude ?? cf.longitude;
    const outside = lat == null ? Promise.resolve() : fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m&past_days=2&forecast_days=1&timezone=UTC`)
      .then(r => r.ok ? r.json() : null).then(j => { if (j && j.hourly) H.out = j.hourly.time.map((t, i) => [Date.parse(t + ':00Z'), j.hourly.temperature_2m[i]]).filter(q => q[1] != null); }).catch(() => {});
    Promise.all([inside, outside]).finally(() => { H.busy = false; H.at = Date.now(); this._renderHvo(); });
  }
  _renderHvo() {
    const el = this._$ && this._$('hvo'); if (!el) return;
    const H = this._hv || {}, ids = this._c.inside_temperatures || [], num = v => { const x = parseFloat(v); return isFinite(x) ? x : null; };
    const cur = ids.map(id => num((this._st(id) || {}).state)).filter(v => v != null), tin = cur.length ? cur.reduce((a, b) => a + b, 0) / cur.length : null;
    const w = this._st(this._c.weather), now = Date.now(), t0 = now - 48 * 3600000, N = 97, xs = [...Array(N)].map((_, i) => t0 + i * 1800000);
    const at = (ser, t) => { let v = null; for (const q of ser) { if (q[0] <= t) v = q[1]; else break; } return v != null ? v : (ser[0] && ser[0][0] - t < 3 * 3600000 ? ser[0][1] : null); };
    const hs = H.hist || [], home = xs.map(t => { const v = hs.map(q => at(q, t)).filter(x => x != null); return v.length ? v.reduce((a, b) => a + b, 0) / v.length : null; });
    const os = H.out || [], lin = t => { for (let i = 1; i < os.length; i++) if (os[i][0] >= t) { const [a, va] = os[i - 1], [b, vb] = os[i]; return t < a ? null : va + (vb - va) * (t - a) / (b - a); } return null; };
    const out = xs.map(lin), oNow = w && num(w.attributes.temperature) != null ? num(w.attributes.temperature) : out.filter(x => x != null).slice(-1)[0];
    if (tin != null) home[N - 1] = tin; if (oNow != null) out[N - 1] = oNow;
    const r1 = v => v == null ? '—' : (Math.round(v * 10) / 10).toFixed(1), dl = tin != null && oNow != null ? tin - oNow : null, CH = '59,130,246', CO = '240,164,58';
    const all = [...home, ...out].filter(x => x != null);
    let svg = '<div class="empty">Collecting history…</div>';
    if (all.length >= 4) {
      const lo = Math.floor(Math.min(...all) - 1), hi = Math.ceil(Math.max(...all) + 1), W = 300, HH = 100, Y = v => (HH - (v - lo) / (hi - lo) * HH).toFixed(1), X = i => (i / (N - 1) * W).toFixed(1);
      const path = arr => { let d = '', pen = false; arr.forEach((v, i) => { if (v == null) { pen = false; return; } d += (pen ? 'L' : 'M') + X(i) + ',' + Y(v); pen = true; }); return d; };
      const area = arr => { const f = arr.findIndex(v => v != null), l = arr.length - 1 - [...arr].reverse().findIndex(v => v != null); if (f < 0) return ''; return path(arr.map((v, i) => i < f || i > l ? null : v == null ? arr.slice(0, i).filter(x => x != null).pop() : v)) + `L${X(l)},${HH}L${X(f)},${HH}Z`; };
      const grid = [lo, (lo + hi) / 2, hi].map(v => `<line x1="0" x2="${W}" y1="${Y(v)}" y2="${Y(v)}" stroke="var(--line)" stroke-dasharray="2 4" vector-effect="non-scaling-stroke"/>`).join('');
      svg = `<svg viewBox="0 0 ${W} ${HH}" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="hvh" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="rgb(${CH})" stop-opacity=".22"/><stop offset="1" stop-color="rgb(${CH})" stop-opacity="0"/></linearGradient><linearGradient id="hvo2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="rgb(${CO})" stop-opacity=".22"/><stop offset="1" stop-color="rgb(${CO})" stop-opacity="0"/></linearGradient></defs>${grid}
        <path d="${area(out)}" fill="url(#hvo2)"/><path d="${area(home)}" fill="url(#hvh)"/><path d="${path(out)}" fill="none" stroke="rgb(${CO})" stroke-width="2" vector-effect="non-scaling-stroke" stroke-linejoin="round"/><path d="${path(home)}" fill="none" stroke="rgb(${CH})" stroke-width="2.4" vector-effect="non-scaling-stroke" stroke-linejoin="round"/></svg>
        <span class="hyl" style="top:0">${hi}°</span><span class="hyl" style="bottom:0">${lo}°</span>`;
    }
    el.innerHTML = `<div class="head"><span class="lbl">Home vs outside</span><span class="hvr">Last 48 hours</span></div>
      <div class="hvt"><div><div class="k"><i style="background:rgb(${CH})"></i>Home</div><b>${r1(tin)}°</b></div><div><div class="k"><i style="background:rgb(${CO})"></i>Outside</div><b>${r1(oNow)}°</b></div>
      ${dl != null ? `<div class="hvd"><b style="color:${dl >= 0 ? '#22a06b' : '#3b82f6'}">${dl >= 0 ? '+' : ''}${r1(dl)}°</b><span>${dl >= 0 ? 'warmer' : 'colder'} inside</span></div>` : ''}</div>
      <div class="hvc">${svg}</div><div class="hvx"><span>48h ago</span><span>24h</span><span>Now</span></div>`;
  }
  _alInfo() {
    const A = this._c.alarm, e = this._st(A.entity); if (!e) return null;
    const a = e.attributes, s = e.state;
    const M = { disarmed: ['Disarmed', 'mdi:shield-off-outline', 'disarmed'], armed_home: ['Armed · Home', 'mdi:shield-home', 'home'], armed_away: ['Armed · Away', 'mdi:shield-lock', 'away'],
      armed_night: ['Armed · Night', 'mdi:shield-moon', 'home'], arming: ['Arming' + (a.exitSecondsLeft ? ' · ' + a.exitSecondsLeft + 's' : '…'), 'mdi:shield-sync', 'wait'],
      pending: ['Entry delay' + (a.entrySecondsLeft ? ' · ' + a.entrySecondsLeft + 's' : ''), 'mdi:shield-alert', 'wait'], triggered: ['ALARM TRIGGERED', 'mdi:alarm-light', 'trig'],
      unavailable: ['Unavailable', 'mdi:shield-off', 'disarmed'] };
    const [label, icon, cls] = M[s] || [s, 'mdi:shield', 'disarmed'];
    const nm = (x, def) => x.name || ((this._st(x.entity) || { attributes: {} }).attributes.friendly_name || def || x.entity).trim();
    const open = (A.doors || []).filter(x => (this._st(x.entity) || {}).state === 'on').map(x => nm(x));
    const moving = (A.motion || []).filter(x => (this._st(x.entity) || {}).state === 'on').map(x => nm(x));
    const low = (A.batteries || []).map(id => this._st(id)).filter(b => b && !isNaN(parseFloat(b.state)) && parseFloat(b.state) <= (A.low_battery || 25));
    const mode = s === 'armed_away' ? 'away' : s === 'armed_home' || s === 'armed_night' ? 'home' : s === 'disarmed' ? 'disarm' : '';
    return { e, a, s, label, icon, cls, open, moving, low, mode, nm };
  }
  _alLogo(sz) {
    const u = this._c.alarm.logo === undefined ? 'https://brands.home-assistant.io/ring/icon.png' : this._c.alarm.logo;
    return u ? `<img src="${esc(u)}" alt="" style="width:${sz}px;height:${sz}px;object-fit:contain;flex:0 0 auto;align-self:flex-start;margin-left:auto" onerror="this.style.display='none'">` : '';
  }
  _alSeg() {
    const i = this._alInfo(), c = this._alConf;
    const b = (m, ic, t) => `<button class="${i.mode === m ? 'sel' : ''}${c === m ? ' conf' : ''}" data-act="arm" data-m="${m}"><ha-icon icon="${ic}"></ha-icon>${c === m ? 'Tap to confirm' : t}</button>`;
    return `<div class="aseg">${b('disarm', 'mdi:shield-off-outline', 'Off')}${b('home', 'mdi:home', 'Home')}${b('away', 'mdi:walk', 'Away')}</div>`;
  }
  _renderAlarm() {
    const el = this._$ && this._$('alarm'); if (!el) return;
    const i = this._alInfo();
    if (!i) { el.className = 'card alarm'; el.innerHTML = '<div class="lbl">Alarm</div><div class="ad">Alarm not found</div>'; return; }
    el.className = 'card alarm st-' + i.cls;
    const det = i.s === 'triggered' ? 'Open the Ring app or tap to disarm' : i.open.length ? i.open.join(', ') + (i.open.length === 1 ? ' is open' : ' are open')
      : i.moving.length ? 'Motion: ' + i.moving.join(', ') : i.low.length ? i.low.length + ' low batter' + (i.low.length === 1 ? 'y' : 'ies') : 'All doors closed';
    el.innerHTML = `<div class="at"><div class="ash"><ha-icon icon="${i.icon}"></ha-icon></div><div class="ax"><div class="lbl">${esc(this._c.alarm.name || 'Alarm')}</div>
      <div class="as">${esc(i.label)}</div><div class="ad${i.open.length || (!i.moving.length && i.low.length) ? ' warn' : ''}">${esc(det)}</div></div>${this._alLogo(30)}</div>${this._alSeg()}`;
  }
  _renderAlarmPop() {
    const el = this._$('alpop'), i = this._alInfo(), A = this._c.alarm; if (!el) return;
    const au = A.logo === undefined ? 'https://brands.home-assistant.io/ring/icon.png' : A.logo;
    if (!i) { el.innerHTML = this._ph('closeal', this._plg(au), esc(A.name || 'Alarm'), 'Not found') + '<div class="wxmsg">Alarm not found</div>'; return; }
    const row = (x, kind) => { const e = this._st(x.entity), on = e && e.state === 'on';
      const ds = !e || e.state === 'unavailable' ? 'Unavailable' : kind === 'door' ? (on ? 'Open' : 'Closed') + (e.last_changed ? ' · ' + ago(e.last_changed) : '') : (on ? 'Motion now' : 'Clear') + (e.last_changed ? ' · ' + ago(e.last_changed) : '');
      return `<div class="asr${on ? ' on' : ''}" data-act="more" data-id="${esc(x.entity)}"><ha-icon icon="${kind === 'door' ? (on ? 'mdi:door-open' : 'mdi:door-closed') : (on ? 'mdi:motion-sensor' : 'mdi:motion-sensor-off')}"></ha-icon><div><div class="nm">${esc(i.nm(x))}</div><div class="ds">${esc(ds)}</div></div></div>`; };
    const who = (by, t) => by && by !== 'Unknown' ? esc(by) + (t ? ' · ' + (new Date(t).toDateString() === new Date().toDateString() ? hm(t) : new Date(t).getDate() + ' ' + MON[new Date(t).getMonth()] + ' ' + hm(t)) : '') : '';
    const la = who(i.a.ArmedBy, i.a.ArmedTime), ld = who(i.a.DisarmedBy, i.a.DisarmedTime);
    el.innerHTML = this._ph('closeal', this._plg(au), esc(A.name || 'Alarm'), `<span class="ast-${i.cls}">${esc(i.label)}</span>`, (la ? 'Last armed by ' + la : '') + (la && ld ? ' · ' : '') + (ld ? 'Last disarmed by ' + ld : '')) + `
      ${this._alSeg()}
      ${(A.doors || []).length ? `<div class="asec"><div class="lbl">Doors &amp; windows${i.open.length ? ' · ' + i.open.length + ' open' : ''}</div><div class="agrid">${A.doors.map(x => row(x, 'door')).join('')}</div></div>` : ''}
      ${(A.motion || []).length ? `<div class="asec"><div class="lbl">Motion</div><div class="agrid">${A.motion.map(x => row(x, 'motion')).join('')}</div></div>` : ''}
      ${i.low.length ? `<div class="asec"><div class="lbl">Low batteries</div><div class="agrid">${i.low.map(b => `<div class="asr lowb" data-act="more" data-id="${esc(b.entity_id)}"><ha-icon icon="mdi:battery-low"></ha-icon><div><div class="nm">${esc((b.attributes.friendly_name || b.entity_id).replace(/\s*Battery$/i, '').trim())}</div><div class="ds">${Math.round(parseFloat(b.state))}% battery</div></div></div>`).join('')}</div></div>` : ''}`;
  }
  _alNeedCode(m) { const i = this._alInfo(); return !!(i && i.a.code_format != null && (m === 'disarm' || i.a.code_arm_required)); }
  _pinShow(m) { this._pin = { m, v: '', err: '', busy: false }; this._renderPin(); this._$('pinov').classList.add('open'); this._pinIdle(); }
  _pinIdle() { clearTimeout(this._pinT); this._pinT = setTimeout(() => this._pinClose(), 30000); }
  _pinClose() { clearTimeout(this._pinT); this._pin = null; this._byp = null; const o = this._$('pinov'); if (o) o.classList.remove('open'); }
  _renderPin() {
    const p = this._pin, el = this._$('pinpop'); if (!p || !el) return;
    const act = p.m === 'disarm' ? 'disarm' : p.m === 'home' ? 'arm in Home mode' : 'arm in Away mode';
    const k = d => `<button class="pk" data-act="pind" data-d="${d}"${p.busy ? ' disabled' : ''}>${d}</button>`;
    el.innerHTML = `<style>${PINCSS}</style>${this._ph('pinx', this._plg(this._c.alarm.logo === undefined ? 'https://brands.home-assistant.io/ring/icon.png' : this._c.alarm.logo), esc(this._c.alarm.name || 'Alarm'), 'Enter code', 'to ' + act)}
      <div class="pdots${p.err ? ' bad' : ''}">${p.v ? '•'.repeat(p.v.length) : '&nbsp;'}</div><div class="perr${p.busy ? ' wait' : ''}">${esc(p.busy ? 'Checking…' : p.err)}</div>
      <div class="pgrid">${[1, 2, 3, 4, 5, 6, 7, 8, 9].map(k).join('')}<button class="pk" data-act="pinb"${p.busy ? ' disabled' : ''}><ha-icon icon="mdi:backspace-outline"></ha-icon></button>${k(0)}<button class="pk ok" data-act="pinok"${p.v && !p.busy ? '' : ' disabled'}><ha-icon icon="mdi:check"></ha-icon></button></div>`;
  }
  async _pinGo() {
    const p = this._pin; if (!p || !p.v || p.busy) return;
    const A = this._c.alarm, m = p.m, svc = m === 'disarm' ? 'alarm_disarm' : m === 'home' ? 'alarm_arm_home' : 'alarm_arm_away';
    const okState = s => m === 'disarm' ? s === 'disarmed' : m === 'home' ? /^(armed_home|armed_night|arming)$/.test(s) : /^(armed_away|arming)$/.test(s);
    p.busy = true; p.err = ''; this._renderPin(); clearTimeout(this._pinT);
    const fail = msg => { if (this._pin !== p) return; p.busy = false; p.v = ''; p.err = msg; this._renderPin(); this._pinIdle(); };
    try { await this._hass.callService('alarm_control_panel', svc, { entity_id: A.entity, code: p.v }, undefined, false); }
    catch (e) { return fail(/code/i.test((e && e.message) || '') ? 'Incorrect code. Try again.' : "Couldn't reach the alarm. Try again."); }
    for (let n = 0; n < 16; n++) { const e = this._st(A.entity); if (e && okState(e.state)) { if (this._pin === p) this._pinClose(); return; } await new Promise(r => setTimeout(r, 500)); }
    fail('Code not accepted. Try again.');
  }
  /* Ring won't arm with open doors or offline sensors unless they are bypassed: find them and ask first */
  _alBypassList() {
    const H = this._hass, ents = (H && H.entities) || {}, devs = (H && H.devices) || {}, all = Object.values(ents), out = [];
    all.forEach(e => {
      if (!/^select\..*bypass_mode(_\d+)?$/.test(e.entity_id) || !e.device_id) return;
      const sel = this._st(e.entity_id); if (!sel || /unavailable|unknown/.test(sel.state)) return;
      const sib = all.filter(x => x.device_id === e.device_id);
      const info = sib.find(x => /^sensor\..*_info(_\d+)?$/.test(x.entity_id)), ie = info && this._st(info.entity_id);
      const main = sib.find(x => /^binary_sensor\./.test(x.entity_id) && !/tamper/.test(x.entity_id)), me = main && this._st(main.entity_id);
      const off = !!(ie && (ie.attributes.commStatus === 'error' || ie.state === 'error')), flat = !!(ie && ie.attributes.batteryStatus === 'failed');
      const dc = (me && me.attributes.device_class) || '', isDoor = /door|window|opening|garage/.test(dc), open = isDoor && me.state === 'on';
      if (!off && !open) return;
      const dv = devs[e.device_id] || {}, base = String(dv.name_by_user || dv.name || (me && me.attributes.friendly_name) || e.entity_id).trim();
      const name = isDoor ? (/door|window/i.test(base) ? base : base + ' door') : dc === 'motion' ? base + ' motion sensor' : base;
      const opts = sel.attributes.options || [];
      out.push({ sel: e.entity_id, prev: sel.state, name, why: open ? 'Open' : flat ? 'Offline · flat battery' : 'Offline', icon: open ? 'mdi:door-open' : 'mdi:battery-alert-variant-outline', opt: opts.includes('Always') ? 'Always' : opts[opts.length - 1] });
    });
    return out;
  }
  _alBypassCheck(m) {
    if (m === 'disarm' || !this._$ || !this._$('pinov')) return false;
    const list = this._alBypassList(); if (!list.length) return false;
    clearTimeout(this._pinT); this._pin = null; this._byp = { m, list, busy: false, err: '' }; this._renderByp(); this._$('pinov').classList.add('open'); return true;
  }
  _renderByp() {
    const b = this._byp, el = this._$('pinpop'); if (!b || !el) return; const A = this._c.alarm || {}, n = b.list.length;
    el.innerHTML = `<style>.bylist{display:flex;flex-direction:column;gap:8px;margin-top:14px}.byr{display:flex;gap:12px;align-items:center;background:var(--card2);border-radius:14px;padding:10px 12px}.byr ha-icon{color:#d97706;--mdc-icon-size:22px;flex:0 0 auto}.byr .nm{font-weight:600;font-size:14px}.byr .ds{font-size:12px;color:var(--sub);margin-top:1px}.bynote{margin:12px 2px 0;font-size:12.5px;color:var(--sub);line-height:1.35}.bynote.bad{color:#e5484d;font-weight:600}.byacts{display:grid;grid-template-columns:1fr 1.4fr;gap:10px;margin-top:14px}.byacts button{border:0;border-radius:14px;padding:13px 10px;font:inherit;font-weight:700;font-size:14px;background:var(--card2);color:var(--text);cursor:pointer}.byacts button.go{background:#22a06b;color:#fff}.byacts button[disabled]{opacity:.6}</style>`
      + this._ph('pinx', this._plg(A.logo === undefined ? 'https://brands.home-assistant.io/ring/icon.png' : A.logo), esc(A.name || 'Alarm'), 'Bypass sensors?', `${n} sensor${n === 1 ? ' needs' : 's need'} bypassing to arm in ${b.m === 'home' ? 'Home' : 'Away'} mode`)
      + `<div class="bylist">${b.list.map(x => `<div class="byr"><ha-icon icon="${x.icon}"></ha-icon><div><div class="nm">${esc(x.name)}</div><div class="ds">${esc(x.why)}</div></div></div>`).join('')}</div>
      <div class="bynote${b.err ? ' bad' : ''}">${esc(b.err || 'Bypassed sensors are ignored until the alarm is next disarmed. Everything else stays protected.')}</div>
      <div class="byacts"><button data-act="pinx"${b.busy ? ' disabled' : ''}>Cancel</button><button class="go" data-act="bypgo"${b.busy ? ' disabled' : ''}>${b.busy ? 'Arming…' : 'Bypass &amp; arm'}</button></div>`;
  }
  async _bypGo() {
    const b = this._byp; if (!b || b.busy) return; b.busy = true; b.err = ''; this._renderByp();
    const H = this._hass, A = this._c.alarm, wait = ms => new Promise(r => setTimeout(r, ms));
    const set = (x, o) => H.callService('select', 'select_option', { entity_id: x.sel, option: o }).catch(() => {});
    await Promise.all(b.list.map(x => set(x, x.opt)));
    for (let k = 0; k < 12; k++) { if (b.list.every(x => { const e = this._st(x.sel); return e && e.state === x.opt; })) break; await wait(300); }
    try { await H.callService('alarm_control_panel', b.m === 'home' ? 'alarm_arm_home' : 'alarm_arm_away', { entity_id: A.entity }); } catch (e) {}
    let ok = false; for (let k = 0; k < 24; k++) { const e = this._st(A.entity); if (e && /^(arming|armed_)/.test(e.state)) { ok = true; break; } await wait(500); }
    await Promise.all(b.list.map(x => set(x, x.prev)));
    if (this._byp !== b) return;
    if (ok) this._pinClose(); else { b.busy = false; b.err = "Ring still couldn't arm. Check the sensors in the Ring app."; this._renderByp(); }
  }
  _alWatch(m) {
    if (m === 'disarm') return; clearTimeout(this._alWT); const A = this._c.alarm;
    this._alWT = setTimeout(() => { const e = this._st(A.entity); if (e && e.state === 'disarmed' && this._toast) this._toast("Ring couldn't arm – a sensor may need bypassing in the Ring app"); }, 12000);
  }
  _alArm(m) {
    const i = this._alInfo(); if (!i) return;
    if (m === i.mode && this._alConf !== m) return;
    if (this._alNeedCode(m)) { this._alConf = null; clearTimeout(this._alConfT); this._pinShow(m); this._update(); return; }
    if (m === 'disarm' && this._alConf !== 'disarm') { this._alConf = 'disarm'; clearTimeout(this._alConfT); this._alConfT = setTimeout(() => { this._alConf = null; this._update(); }, 4000); this._update(); return; }
    this._alConf = null; clearTimeout(this._alConfT);
    const svc = m === 'disarm' ? 'alarm_disarm' : m === 'home' ? 'alarm_arm_home' : 'alarm_arm_away';
    if (this._alBypassCheck(m)) { this._update(); return; }
    this._hass.callService('alarm_control_panel', svc, { entity_id: this._c.alarm.entity });
    this._alWatch(m);
    this._update();
  }
  /* ---------- energy ---------- */
  _fetchEnergy() {
    const k = this._c.energy; if (!k || !this._hass || this._enBusy) return;
    const ids = [k.electricity, k.gas, k.electricity_cost, k.gas_cost, k.today_electricity, k.today_gas, k.today_electricity_cost, k.today_gas_cost].filter(Boolean);
    const st = new Date(); st.setHours(0, 0, 0, 0); st.setDate(st.getDate() - 12);
    const ms = new Date(); ms.setHours(0, 0, 0, 0); ms.setDate(1); if (ms < st) st.setTime(+ms);
    this._enBusy = true;
    this._hass.callWS({ type: 'recorder/statistics_during_period', start_time: st.toISOString(), end_time: new Date().toISOString(), statistic_ids: ids, period: 'day', types: ['change'] })
      .then(r => {
        const map = {}, put = (id, f) => ((r && r[id]) || []).forEach(x => { const d = new Date(x.start); d.setHours(0, 0, 0, 0); const key = +d;
          (map[key] = map[key] || { d }); if (x.change != null) map[key][f] = (map[key][f] || 0) + x.change; });
        put(k.electricity, 'e'); put(k.gas, 'g'); put(k.electricity_cost, 'ec'); put(k.gas_cost, 'gc');
        if (k.today_electricity || k.today_gas) {
          const lv = {}, putL = (id, f) => id && ((r && r[id]) || []).forEach(x => { const d = new Date(x.start); d.setHours(0, 0, 0, 0); const key = +d; (lv[key] = lv[key] || {}); if (x.change != null) lv[key][f] = (lv[key][f] || 0) + x.change; });
          putL(k.today_electricity, 'e'); putL(k.today_gas, 'g'); putL(k.today_electricity_cost, 'ec'); putL(k.today_gas_cost, 'gc');
          const t0 = new Date(); t0.setHours(0, 0, 0, 0); const num = id => { const e = id && this._hass.states[id], v = e ? parseFloat(e.state) : NaN; return isFinite(v) ? v : null; };
          const now = { e: num(k.today_electricity), g: num(k.today_gas), ec: num(k.today_electricity_cost), gc: num(k.today_gas_cost) };
          lv[+t0] = Object.assign(lv[+t0] || {}, ...Object.keys(now).filter(f => now[f] != null).map(f => ({ [f]: now[f] })));
          Object.keys(lv).forEach(t => { const o = map[t]; if (!o || (o.e == null && o.g == null)) map[t] = Object.assign({ d: new Date(+t), live: true }, lv[t]); });
          if (map[+t0] && map[+t0].live) map[+t0].today = true;
        }
        const keys = Object.keys(map).map(Number).filter(t => map[t].e != null || map[t].g != null).sort((a, b) => a - b);
        const last = keys.length ? new Date(keys[keys.length - 1]) : null, days = [];
        if (last) { const w0 = new Date(); w0.setHours(0, 0, 0, 0); w0.setDate(w0.getDate() - ((w0.getDay() + 6) % 7));
          for (let i = 0; i < 7; i++) { const d = new Date(w0); d.setDate(d.getDate() + i); d.setHours(0, 0, 0, 0); days.push(map[+d] || { d }); } }
        const mtd = { e: 0, g: 0, ec: 0, gc: 0, n: 0, from: ms, to: null };
        keys.filter(t => t >= +ms && !map[t].today).forEach(t => { const x = map[t]; ['e', 'g', 'ec', 'gc'].forEach(f => { mtd[f] += x[f] || 0; }); mtd.n++; mtd.to = x.d; });
        this._en = { at: Date.now(), days, mtd }; this._enErr = false;
      }).catch(() => { this._enErr = true; this._en = this._en || null; })
      .finally(() => { this._enBusy = false; this._renderEnergy(); if (this._enOpen) this._renderEnergyPop(); });
  }
  _enLogo(cls) {
    const u = this._c.energy.logo === undefined ? 'https://raw.githubusercontent.com/home-assistant/brands/master/custom_integrations/octopus_energy/icon.png' : this._c.energy.logo;
    return u ? `<img class="${cls}" src="${esc(u)}" alt="" onerror="this.style.display='none'">` : '';
  }
  _enSum(f) { return ((this._en && this._en.days) || []).reduce((a, x) => a + (x[f] || 0), 0); }
  _enBars(big) {
    const days = this._en.days, max = Math.max(1, ...days.map(x => Math.max(x.e || 0, x.g || 0)));
    const CE = this._c.energy.electricity_color || '#3b82f6', CG = this._c.energy.gas_color || '#f0a43a';
    const bar = (v, c, lv) => `<b style="height:${v != null ? Math.max(1.5, v / max * 88) : 0}%;background:${c};${v == null ? 'opacity:0' : lv ? 'opacity:.45' : ''}">${big && v != null ? `<span>${Math.round(v)}</span>` : ''}</b>`;
    return `<div class="ech${big ? ' big' : ''}"><div class="ebars">${days.map(x => `<div class="ebd">${bar(x.e, CE, x.live)}${bar(x.g, CG, x.live)}</div>`).join('')}</div>
      <div class="exl">${days.map(x => `<span>${DOW[x.d.getDay()]}${big ? ' ' + x.d.getDate() : ''}</span>`).join('')}</div></div>`;
  }
  _enRange() { const d = this._en.days; if (!d.length) return ''; const a = d[0].d, b = d[d.length - 1].d; return `${a.getDate()} ${MON[a.getMonth()]} – ${b.getDate()} ${MON[b.getMonth()]}`; }
  _enLive() {
    const k = this._c.energy || {}, n = id => { const e = id && this._st(id), v = e ? parseFloat(e.state) : NaN; return isFinite(v) ? v : null; };
    if (!k.live_power && !k.today_electricity && !k.today_gas) return null;
    const L = { p: n(k.live_power), e: n(k.today_electricity), ec: n(k.today_electricity_cost), g: n(k.today_gas), gc: n(k.today_gas_cost) };
    const pe = k.live_power && this._st(k.live_power); L.at = pe && pe.last_updated;
    L.cost = L.ec != null || L.gc != null ? (L.ec || 0) + (L.gc || 0) : null;
    L.col = L.p == null ? 'var(--sub)' : L.p < 1000 ? '#22a06b' : L.p < 3000 ? '#d97706' : '#e5484d';
    L.pw = L.p == null ? '—' : L.p < 1000 ? Math.round(L.p) + '<small>W</small>' : (L.p / 1000).toFixed(L.p < 10000 ? 2 : 1) + '<small>kW</small>';
    L.rate = n(k.live_rate); L.ph = L.p != null && L.rate != null ? L.p / 1000 * L.rate : null;
    L.phs = L.ph == null ? '' : L.ph < 1 ? Math.round(L.ph * 100) + 'p/hr' : '£' + L.ph.toFixed(2) + '/hr';
    return L;
  }
  _renderEnergy() {
    const el = this._$ && this._$('en'); if (!el) return;
    const k = this._c.energy, CE = k.electricity_color || '#3b82f6', CG = k.gas_color || '#f0a43a', L = this._enLive();
    if (L) {
      const kw = L.p != null ? L.p / 1000 : null, sp = kw ? Math.max(.45, 2.4 - Math.min(kw, 6) * .32) : 0;
      const gc = kw == null ? '138,143,152' : kw < 1 ? '34,160,107' : kw < 3 ? '217,119,6' : '229,72,77', r1 = v => v == null ? '—' : (Math.round(v * 10) / 10).toFixed(1), gbp = v => v == null ? '—' : '£' + v.toFixed(2);
      const mo = this._en && this._en.mtd && this._en.mtd.n ? this._en.mtd.ec + this._en.mtd.gc + (L.cost || 0) : null, gas = k.gas || k.today_gas;
      const rate = L.rate != null ? (L.rate < 1 ? (Math.round(L.rate * 1000) / 10).toString().replace(/\.0$/, '') + 'p' : '£' + L.rate.toFixed(2)) : '';
      // rate window: when the current rate ends and what comes next
      const re = k.live_rate && this._st(k.live_rate), rEnd = re && re.attributes.end ? new Date(re.attributes.end) : null;
      const nx = k.next_rate ? parseFloat((this._st(k.next_rate) || {}).state) : NaN;
      const cheap = L.rate != null && (isFinite(nx) ? L.rate < nx : L.rate < 0.15), dear = L.rate != null && isFinite(nx) && L.rate > nx;
      const pill = rate ? `<span class="ea-r${cheap ? ' lo' : dear ? ' hi' : ''}"><ha-icon icon="${cheap ? 'mdi:weather-night' : 'mdi:lightning-bolt'}"></ha-icon>${cheap ? 'Off-peak ' : dear ? 'Peak ' : ''}${rate}${rEnd && rEnd > new Date() ? ' · to ' + hm(rEnd).replace(/\s+/g, '') : ''}</span>` : '';
      const mx = Number(k.max_power) || 10, pct = kw == null ? 0 : Math.min(100, kw / mx * 100);
      el.innerHTML = `<div class="head efh ea-h"><span class="lbl">Now</span>${pill}${this._enLogo('elogo')}</div>
        <div class="ea-m"><div class="ea-n"><b style="color:rgb(${gc})">${kw == null ? '—' : kw < 1 ? Math.round(kw * 1000) : kw.toFixed(2)}</b><span>${kw != null && kw < 1 ? 'W' : 'kW'}</span>${L.phs ? `<em>≈ ${L.phs.replace('/hr', ' / hr')}</em>` : ''}</div>
        <div class="ea-b"><i style="width:${pct.toFixed(1)}%;background-size:${pct > 0 ? (10000 / pct).toFixed(0) : 100}% 100%"></i></div><div class="ea-s"><span>0</span><span>${mx} kW</span></div></div>
        <div class="ea-t"><div><span class="k"><ha-icon icon="mdi:lightning-bolt" style="color:${CE}"></ha-icon>Electric</span><b>${gbp(L.ec)}</b><small>${r1(L.e)} kWh</small></div>${gas ? `<div><span class="k"><ha-icon icon="mdi:fire" style="color:${CG}"></ha-icon>Gas</span><b>${gbp(L.gc)}</b><small>${r1(L.g)} kWh</small></div>` : ''}<div class="tot"><span class="k"><ha-icon icon="mdi:currency-gbp"></ha-icon>Total</span><b>${gbp(L.cost)}</b><small>${mo != null ? gbp(mo) + ' month' : 'today'}</small></div></div>`;
      return;
    }
    if (L && this._c.stats !== false && this._en && this._en.days.length) {
      const wk = this._enSum('ec') + this._enSum('gc'), wkh = this._enSum('e') + this._enSum('g');
      el.innerHTML = `<div class="head"><div class="lbl">Energy · This week${wk ? ' £' + wk.toFixed(2) : ''}</div>${this._enLogo('elogo')}</div>
        <div class="ewk"><span><i style="background:${CE}"></i>Electricity ${Math.round(this._enSum('e'))} kWh</span>${k.gas || k.today_gas ? `<span><i style="background:${CG}"></i>Gas ${Math.round(this._enSum('g'))} kWh</span>` : ''}</div>
        ${this._enBars(false)}`;
      return;
    }
    if (L) {
      const td = (lbl, c, kwh, cost) => `<div><div class="k"><i style="background:${c}"></i>${lbl}</div><div class="v">${kwh != null ? kwh.toFixed(1) : '—'}<small>kWh</small></div><div class="c">${cost != null ? '£' + cost.toFixed(2) : ''}</div></div>`;
      el.innerHTML = `<div class="head"><div class="lbl">Energy · Today${L.cost != null ? ' £' + L.cost.toFixed(2) : ''}</div>${this._enLogo('elogo')}</div>
        <div class="etot e3">${td('Electricity', CE, L.e, L.ec)}${k.today_gas || k.gas ? td('Gas', CG, L.g, L.gc) : '<div></div>'}<div class="etc"><div class="k"><i class="lvd" style="background:${L.col}"></i>Now</div><div class="v" style="color:${L.col}">${L.pw}</div><div class="c">${L.phs || (L.at ? hm(L.at) : '')}</div></div></div>
        ${this._en && this._en.days.length ? this._enBars(false) : ''}`;
      return;
    }
    if (!this._en || !this._en.days.length) { el.innerHTML = `<div class="head"><span class="lbl">Energy</span>${this._enLogo('elogo')}</div><div class="empty">${this._enErr ? "Couldn't load energy data" : this._en ? 'No energy data yet' : 'Loading…'}</div>`; return; }
    const tot = (lbl, c, kwh, cost) => `<div><div class="k"><i style="background:${c}"></i>${lbl}</div><div class="v">${Math.round(kwh)}<small>kWh</small></div>${cost ? `<div class="c">£${cost.toFixed(2)}</div>` : ''}</div>`;
    const hasC = k.electricity_cost || k.gas_cost, TC = this._enSum('ec') + this._enSum('gc');
    el.innerHTML = `<div class="head"><div class="lbl">Energy · ${this._enRange()}</div>${this._enLogo('elogo')}</div>
      <div class="etot${hasC ? ' e3' : ''}">${tot('Electricity', CE, this._enSum('e'), k.electricity_cost && this._enSum('ec'))}${k.gas ? tot('Gas', CG, this._enSum('g'), k.gas_cost && this._enSum('gc')) : ''}${hasC ? `<div class="etc"><div class="k">This week</div><div class="v">£${TC.toFixed(2)}</div><div class="c">${this._enSum('e') + this._enSum('g') ? Math.round(this._enSum('e') + this._enSum('g')) + ' kWh' : ''}</div></div>` : ''}</div>
      ${this._enBars(false)}`;
  }
  _renderEnergyPop() {
    const el = this._$('enpop'), k = this._c.energy, CE = k.electricity_color || '#3b82f6', CG = k.gas_color || '#f0a43a';
    const head = this._ph('closeen', this._enLogo('plg'), 'Energy', this._enLive() ? 'Today and this week' : 'This week', this._en && this._en.days.length ? this._enRange() + (this._en.days.some(x => x.live) ? '' : ' · Octopus data usually arrives a day or two late') : '');
    if (!this._en || !this._en.days.length) { el.innerHTML = head + `<div class="wxmsg">${this._enErr ? "Couldn't load energy data" : 'Loading…'}</div>`; return; }
    const E = this._enSum('e'), G = this._enSum('g'), EC = this._enSum('ec'), GC = this._enSum('gc'), n = this._en.days.filter(x => x.e != null || x.g != null).length || 1;
    const det = (t, v, u, sub) => `<div class="blk det" style="padding:10px 12px"><div class="lbl" style="text-transform:none;letter-spacing:0">${t}</div><div class="v">${v}${u ? ` <small>${u}</small>` : ''}</div>${sub ? `<div class="cond" style="margin-top:2px;font-size:12px">${sub}</div>` : ''}</div>`;
    const f = v => v != null ? (Math.round(v * 10) / 10).toFixed(1) : '—', m = v => v != null ? '£' + v.toFixed(2) : '—';
    const L = this._enLive();
    const liveRow = L ? `<div class="lbl" style="margin-top:16px">Right now</div><div class="dets" style="margin-top:8px">
        ${det(`<span style="display:inline-flex;align-items:center;gap:6px"><i class="lvd" style="width:8px;height:8px;border-radius:50%;display:inline-block;background:${L.col}"></i>Using now</span>`, `<span style="color:${L.col}">${L.p == null ? '—' : L.p < 1000 ? Math.round(L.p) : (L.p / 1000).toFixed(2)}</span>`, L.p == null ? '' : L.p < 1000 ? 'W' : 'kW', [L.phs, L.rate != null ? (L.rate * 100).toFixed(1) + 'p/kWh' : ''].filter(Boolean).join(' · ') || (L.at ? 'at ' + hm(L.at) : ''))}
        ${det('Electricity today', L.e != null ? f(L.e) : '—', 'kWh', L.ec != null ? m(L.ec) : '')}
        ${k.today_gas ? det('Gas today', L.g != null ? f(L.g) : '—', 'kWh', L.gc != null ? m(L.gc) : '') : ''}
        ${det('Today so far', L.cost != null ? m(L.cost) : '—', '', (L.e != null || L.g != null ? f((L.e || 0) + (L.g || 0)) + ' kWh · ' : '') + 'incl. standing')}</div>
      <div class="lbl" style="margin-top:18px">This week</div>` : '';
    el.innerHTML = head + liveRow + `
      <div class="legend" style="margin-top:14px"><span><i style="background:${CE}"></i>Electricity</span>${k.gas ? `<span><i style="background:${CG}"></i>Gas</span>` : ''}${this._en.days.some(x => x.live) ? '<span>Paler bars: live Home Mini readings, until Octopus confirms them</span>' : ''}</div>
      <div class="dets d5" style="margin-top:12px">${det('Electricity', Math.round(E), 'kWh', k.electricity_cost ? m(EC) + ' · ' + f(E / n) + ' kWh/day' : f(E / n) + ' kWh/day')}
        ${k.gas ? det('Gas', Math.round(G), 'kWh', k.gas_cost ? m(GC) + ' · ' + f(G / n) + ' kWh/day' : f(G / n) + ' kWh/day') : ''}
        ${k.electricity_cost || k.gas_cost ? det('Total cost', m(EC + GC), '', 'this week so far · incl. standing charges') : ''}
        ${(k.electricity_cost || k.gas_cost) && this._en.mtd ? (() => { const t = this._en.mtd; return det('Month to date', t.n ? m(t.ec + t.gc) : '—', '', t.n ? `1–${t.to.getDate()} ${MON[t.to.getMonth()]} · ${Math.round(t.e + t.g)} kWh` : 'No data this month yet'); })() : ''}${det('Busiest day', (() => { const b = this._en.days.slice().sort((a, c) => ((c.e || 0) + (c.g || 0)) - ((a.e || 0) + (a.g || 0)))[0]; return DOW[b.d.getDay()] + ' ' + b.d.getDate(); })(), '')}</div>
      ${this._enBars(true)}
      <table class="etab"><tr><th>Day</th><th>Electricity</th>${k.electricity_cost ? '<th>£</th>' : ''}${k.gas ? '<th>Gas</th>' : ''}${k.gas_cost ? '<th>£</th>' : ''}${k.electricity_cost && k.gas_cost ? '<th>Total £</th>' : ''}</tr>
        ${this._en.days.filter(x => +x.d <= new Date().setHours(0, 0, 0, 0)).map(x => `<tr><td>${DOW[x.d.getDay()]} ${x.d.getDate()} ${MON[x.d.getMonth()]}${x.live ? (+x.d === new Date().setHours(0, 0, 0, 0) ? ' <small>so far</small>' : ' <small>live</small>') : ''}</td><td>${f(x.e)} kWh</td>${k.electricity_cost ? `<td>${m(x.ec)}</td>` : ''}${k.gas ? `<td>${f(x.g)} kWh</td>` : ''}${k.gas_cost ? `<td>${m(x.gc)}</td>` : ''}${k.electricity_cost && k.gas_cost ? `<td><b>${x.ec == null && x.gc == null ? '—' : m((x.ec || 0) + (x.gc || 0))}</b></td>` : ''}</tr>`).join('')}
        <tr class="tot"><td>Total</td><td>${f(E)} kWh</td>${k.electricity_cost ? `<td>${m(EC)}</td>` : ''}${k.gas ? `<td>${f(G)} kWh</td>` : ''}${k.gas_cost ? `<td>${m(GC)}</td>` : ''}${k.electricity_cost && k.gas_cost ? `<td>${m(EC + GC)}</td>` : ''}</tr></table>`;
  }
  /* ---------- tfl ---------- */
  _fetchTfl() {
    const ids = this._c.tfl_lines; if (!ids.length || this._tflBusy) return;
    this._tflBusy = true;
    fetch('https://api.tfl.gov.uk/Line/' + ids.map(encodeURIComponent).join(',') + '/Status')
      .then(r => { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(j => { this._tfl = { at: Date.now(), lines: j || [] }; this._tflErr = false; })
      .catch(() => { this._tflErr = true; })
      .finally(() => { this._tflBusy = false; this._renderTfl(); });
  }
  _fetchTflAll() {
    if (this._tflAllBusy || (this._tflAll && Date.now() - this._tflAll.at < 120000)) return;
    this._tflAllBusy = true;
    fetch('https://api.tfl.gov.uk/Line/Mode/tube,elizabeth-line,dlr,overground/Status')
      .then(r => { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(j => { this._tflAll = { at: Date.now(), lines: j || [] }; this._tflAllErr = false; })
      .catch(() => { this._tflAllErr = true; })
      .finally(() => { this._tflAllBusy = false; if (this._tflOpen) this._renderTflPop(); });
  }
  _tflInfo(id, l) {
    const ss = (l && l.lineStatuses) || [], rank = x => x.statusSeverity === 10 ? 99 : x.statusSeverity === 20 ? 98 : x.statusSeverity;
    const w = ss.slice().sort((a, b) => rank(a) - rank(b))[0], sev = w ? w.statusSeverity : null;
    const cls = sev == null ? 'idle' : [10, 18, 19].includes(sev) ? 'ok' : sev === 20 ? 'idle' : [1, 2, 3, 4, 5, 6, 11, 16].includes(sev) ? 'bad' : 'minor';
    const reason = ss.map(x => x.reason).filter(Boolean).filter((r, i, a) => a.indexOf(r) === i).map(r => r.replace(/^[^:]{0,40}:\s*/, '')).join(' ');
    return { w, sev, cls, reason, rank: w ? rank(w) : 100, name: l ? l.name : id.charAt(0).toUpperCase() + id.slice(1) };
  }
  _tflRow(id, l, sub) {
    const COL = { bakerloo: '#B36305', central: '#E32017', circle: '#FFD300', district: '#00782A', 'hammersmith-city': '#F3A9BB', jubilee: '#A0A5A9',
      metropolitan: '#9B0056', northern: '#000000', piccadilly: '#003688', victoria: '#0098D4', 'waterloo-city': '#95CDBA', elizabeth: '#6950A1', dlr: '#00A4A7',
      liberty: '#5D6061', lioness: '#FAA61A', mildmay: '#0077AD', suffragette: '#5BB972', weaver: '#823A62', windrush: '#ED1B00' };
    const t = this._tflInfo(id, l), n = t.name;
    const label = /line|dlr|elizabeth/i.test(n) || ['liberty', 'lioness', 'mildmay', 'suffragette', 'weaver', 'windrush'].includes(id) ? n : n + ' line';
    return `<div class="tl"><i class="ln" style="background:${COL[id] || 'var(--sub)'};${id === 'northern' ? 'box-shadow:0 0 0 1px rgba(255,255,255,.25)' : ''}"></i><div class="tx">
      <div class="nm">${esc(label)}</div>${t.reason || sub ? `<div class="ds">${esc(t.reason || sub)}</div>` : ''}</div>
      <span class="bd ${t.cls}">${esc(t.w ? t.w.statusSeverityDescription : '—')}</span></div>`;
  }
  _renderTfl() {
    const el = this._$ && this._$('tfl'); if (!el) return;
    const byId = {}; ((this._tfl && this._tfl.lines) || []).forEach(l => { byId[l.id] = l; });
    const upd = this._tfl ? (this._tflErr ? "Couldn't update · " : 'Updated ') + hm(this._tfl.at) : this._tflErr ? "Couldn't load status" : 'Loading…';
    el.innerHTML = this._tflLogo('tlogo') + `<div class="trows">${this._c.tfl_lines.map(id => this._tflRow(id, byId[id], upd)).join('')}</div>`;
  }
  _tflLogo(cls) {
    const u = this._c.tfl_logo === undefined ? 'https://brands.home-assistant.io/london_underground/icon.png' : this._c.tfl_logo;
    return u ? `<img class="${cls}" src="${esc(u)}" alt="" onerror="this.style.display='none'">` : '';
  }
  _tubeMapLoad() {
    // The map picture lives in Home Assistant, not in this public repo: a URL in the card config (tfl_map_image),
    // or a picture uploaded to Media → My media (tfl_map_media, default tube-map.png in the top folder).
    if (this._c.tfl_map_image) return Promise.resolve(this._c.tfl_map_image);
    const id = this._c.tfl_map_media || 'media-source://media_source/local/tube-map.png', W = window.__hpcTube = window.__hpcTube || {};
    if (W[id]) return W[id];
    // find the picture: the configured/default name first, otherwise any image in My media named like "tube" or "map"
    const find = () => this._hass.callWS({ type: 'media_source/browse_media', media_content_id: id.replace(/\/[^/]*$/, '') }).then(r => {
      const kids = (r.children || []).filter(c => c.media_class === 'image' || /\.(png|jpe?g|webp|gif)$/i.test(c.title || ''));
      const want = id.split('/').pop().toLowerCase();
      const hit = kids.find(c => (c.title || '').toLowerCase() === want) || kids.find(c => /tube|map|tfl|underground/i.test(c.title || '')) || (kids.length === 1 ? kids[0] : null);
      if (!hit) { this._tubeFiles = kids.map(c => c.title); throw new Error('not found'); }
      return hit.media_content_id; }).catch(e => { if (e && e.message === 'not found') throw e; return id; });
    return W[id] = find().then(mid => this._hass.callWS({ type: 'media_source/resolve_media', media_content_id: mid, expires: 300 }))
      .then(r => fetch(r.url)).then(r => { if (!r.ok) throw new Error(r.status); return r.blob(); }).then(b => URL.createObjectURL(b))
      .catch(e => { delete W[id]; throw e; });
  }
  _renderTubeMap(el, btn) {
    el.innerHTML = btn + this._ph('closetfl', this._tflLogo('plg'), 'London transport', 'Tube map', 'Tap the map to zoom in or out') + '<div class="tmap" id="tmap"><div class="wxmsg">Loading map…</div></div>';
    this._tubeMapLoad().then(src => {
      const box = this._$('tmap'); if (!box || !this._tflMap) return;
      box.innerHTML = `<img src="${src}" alt="Tube map">`;
      const im = box.firstChild;
      im.addEventListener('click', ev => {
        const r = im.getBoundingClientRect(), fx = (ev.clientX - r.left) / r.width, fy = (ev.clientY - r.top) / r.height;
        box.classList.toggle('z');
        if (box.classList.contains('z')) requestAnimationFrame(() => { box.scrollLeft = fx * im.offsetWidth - box.clientWidth / 2; box.scrollTop = fy * im.offsetHeight - box.clientHeight / 2; });
      });
    }).catch(() => { const box = this._$('tmap'), f = this._tubeFiles; if (box) box.innerHTML = `<div class="wxmsg">Couldn't find the Tube map picture. Upload it to Media → My media with "tube" or "map" in its name.${f && f.length ? `<br><small>Pictures found there: ${f.map(esc).join(', ')}</small>` : ''} <button class="pill" data-act="tflmap">Try again</button></div>`; });
  }
  _renderTflPop() {
    const el = this._$('tflpop'), d = this._tflAll;
    const lines0 = d ? d.lines : [], bad0 = lines0.filter(l => this._tflInfo(l.id, l).cls !== 'ok').length;
    const mapBtn = this._tflMap ? `<button class="x xmap" data-act="tflstatus" title="Line status"><ha-icon icon="mdi:format-list-bulleted"></ha-icon><span>Status</span></button>` : `<button class="x xmap" data-act="tflmap" title="Tube map"><ha-icon icon="mdi:map-outline"></ha-icon><span>Map</span></button>`;
    if (this._tflMap) { this._renderTubeMap(el, mapBtn); return; }
    const head = mapBtn + this._ph('closetfl', this._tflLogo('plg'), 'London transport', 'Line status', d ? (bad0 ? bad0 + (bad0 === 1 ? ' line with issues' : ' lines with issues') : 'Good service on all lines') + ' · ' + (this._tflAllErr ? "Couldn't update · " : 'Updated ') + hm(d.at) : '');
    if (!d) { el.innerHTML = head + `<div class="wxmsg">${this._tflAllErr ? "Couldn't load TfL status. <button class=\"pill\" data-act=\"tflretry\">Try again</button>" : 'Loading…'}</div>`; return; }
    const lines = d.lines.slice().sort((a, b) => (this._tflInfo(a.id, a).rank - this._tflInfo(b.id, b).rank) || a.name.localeCompare(b.name));
    const bad = lines.filter(l => this._tflInfo(l.id, l).cls !== 'ok').length;
    el.innerHTML = head + `
      <div class="tgrid">${lines.map(l => this._tflRow(l.id, l)).join('')}</div>`;
  }
  /* ---------- calendar ---------- */
  _calColor(i) { const c = this._c.calendars[i]; return c.color || ['#f08a24', '#3b82f6', '#22a06b', '#a855f7', '#e5484d', '#0ea5a4', '#d97706', '#64748b'][i % 8]; }
  async _fetchCal() {
    if (!this._hass || !this._c.calendars.length) return;
    const st = new Date(); st.setHours(0, 0, 0, 0); st.setDate(st.getDate() - (st.getDay() + 6) % 7); // from Monday of this week
    const en = new Date(st); en.setDate(en.getDate() + 15);
    const q = `?start=${encodeURIComponent(st.toISOString())}&end=${encodeURIComponent(en.toISOString())}`;
    const res = await Promise.all(this._c.calendars.map((c, i) => this._hass.callApi('GET', `calendars/${c.entity}${q}`)
      .then(evs => (evs || []).map(e => {
        const allDay = !!(e.start && e.start.date && !e.start.dateTime);
        const s = allDay ? new Date(e.start.date + 'T00:00:00') : new Date(e.start.dateTime || e.start);
        const f = allDay ? new Date(e.end.date + 'T00:00:00') : new Date(e.end.dateTime || e.end);
        return { title: e.summary || '(No title)', loc: e.location || '', s, f, allDay, ci: i };
      })).catch(() => [])));
    this._events = res.flat().filter(e => !isNaN(e.s)).sort((a, b) => (a.s - b.s) || (b.allDay - a.allDay));
    this._renderCal();
  }
  _dayLbl(d) {
    const t = new Date(); t.setHours(0, 0, 0, 0); const x = new Date(d); x.setHours(0, 0, 0, 0);
    const n = Math.round((x - t) / 86400000);
    return n === 0 ? 'Today' : n === 1 ? 'Tomorrow' : n < 7 ? ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][x.getDay()] : DOW[x.getDay()] + ' ' + x.getDate() + ' ' + MON[x.getMonth()];
  }
  _evRow(e, showDay) {
    const name = this._c.calendars[e.ci].name || '', now = new Date(), live = !e.allDay && e.s <= now && e.f > now;
    const ts = d => { const h = d.getHours(), m = d.getMinutes(); return (h % 12 || 12) + (m ? ':' + pad(m) : '') + (h < 12 ? 'am' : 'pm'); };
    const dl = d => { const t = new Date(); t.setHours(0, 0, 0, 0); const x = new Date(d); x.setHours(0, 0, 0, 0); const n = Math.round((x - t) / 86400000); return n <= 0 ? 'Today' : n === 1 ? 'Tomorrow' : n < 7 ? DOW[x.getDay()] : x.getDate() + ' ' + MON[x.getMonth()]; };
    const time = live ? 'Now' : e.allDay ? 'All day' : ts(e.s);
    return `<div class="ev2${live ? ' live' : ''}"><span class="tm">${showDay ? `<b>${dl(e.s)}</b>` : ''}${time}</span><i style="background:${this._calColor(e.ci)}"></i><span class="t">${esc(e.title)}</span><span class="w">${esc(name)}</span></div>`;
  }
  _renderCal() {
    const el = this._$ && this._$('cal'); if (!el) return;
    if (!this._events) { el.innerHTML = '<div class="head"><span class="lbl">This week</span></div><div class="empty">Loading…</div>'; return; }
    const now = new Date(), t0 = new Date(now); t0.setHours(0, 0, 0, 0);
    // a tapped day falls back to today after 2 minutes, or when the day it was picked on has passed
    if (this._calDay && (Date.now() - (this._calDayAt || 0) > 120000 || this._calDayOf !== t0.getTime())) this._calDay = 0;
    const sel = this._calDay || 0, cap = Math.max(2, (this._c.calendar_items || 4) - 1);
    const days = [...Array(7)].map((_, i) => { const ds = new Date(t0); ds.setDate(ds.getDate() + i); const de = new Date(ds); de.setDate(de.getDate() + 1);
      return { ds, de, evs: this._events.filter(e => e.s < de && e.f > ds && (i || e.f > now)) }; });
    const strip = days.map((d, i) => { const cis = [...new Set(d.evs.map(e => e.ci))].slice(0, 4);
      return `<button class="cwd${i === sel ? ' sel' : ''}${i === 0 ? ' td' : ''}" data-act="calday" data-i="${i}"><span class="cwn">${DOW[d.ds.getDay()]}</span><b>${d.ds.getDate()}</b><span class="cwp">${cis.map(ci => `<i style="background:${this._calColor(ci)}"></i>`).join('')}</span></button>`; }).join('');
    const d = days[sel], timed = d.evs.filter(e => !e.allDay).sort((a, b) => a.s - b.s), allDay = d.evs.filter(e => e.allDay);
    const bdays = allDay.filter(e => /birthday/i.test(e.title)), rest = allDay.filter(e => !/birthday/i.test(e.title));
    const ts = x => { const h = x.getHours(), m = x.getMinutes(); return (h % 12 || 12) + (m ? ':' + pad(m) : '') + (h < 12 ? 'am' : 'pm'); };
    const row = (tm, ci, title, sub, live) => `<div class="cwe${live ? ' live' : ''}"><span class="tm">${tm}</span><i style="background:${this._calColor(ci)}"></i><span class="cwx"><span class="t">${esc(title)}</span>${sub ? `<span class="s">${esc(sub)}</span>` : ''}</span></div>`;
    const rows = [...timed.map(e => { const lv = e.s <= now && e.f > now; return row(lv ? 'Now' : ts(e.s), e.ci, e.title, e.loc ? e.loc.split(',')[0] : '', lv); }),
      ...rest.map(e => row('All day', e.ci, e.title)),
      ...(bdays.length > 1 ? [row('All day', bdays[0].ci, bdays.map(e => e.title.replace(/'s\s+birthday|\s+birthday/i, '').trim()).join(', ') + ' · birthdays')] : bdays.map(e => row('All day', e.ci, e.title)))];
    const shown = rows.slice(0, cap), more = rows.length - shown.length;
    const label = sel === 0 ? 'Today' : sel === 1 ? 'Tomorrow' : DOW[d.ds.getDay()] + ' ' + d.ds.getDate() + ' ' + MON[d.ds.getMonth()];
    el.innerHTML = `<div class="head"><span class="lbl">This week</span><span class="cnt">${label}${rows.length ? ' · ' + rows.length + (rows.length === 1 ? ' event' : ' events') : ''}</span></div><div class="cwk7">${strip}</div>` +
      `<div class="cwl">${shown.length ? shown.join('') + (more > 0 ? `<div class="cwm">+${more} more</div>` : '') : `<div class="empty">${sel === 0 ? 'Nothing else today' : 'Nothing planned'}</div>`}</div>`;
    if (this._calOpen) this._renderCalPop();
  }
  _renderCalPop() {
    const el = this._$('calpop'), now = new Date(), t0 = new Date(now); t0.setHours(0, 0, 0, 0);
    const m0 = new Date(t0); m0.setDate(m0.getDate() - (m0.getDay() + 6) % 7); // Monday of this week
    const ti = Math.round((t0 - m0) / 86400000); // today's position in the fortnight
    const evs = this._events || [];
    const legend = this._c.calendars.map((c, i) => `<span><i style="background:${this._calColor(i)}"></i>${esc(c.name || c.entity)}</span>`).join('');
    let cells = '', total = 0;
    for (let i = 0; i < 14; i++) {
      const ds = new Date(m0); ds.setDate(ds.getDate() + i); const de = new Date(ds); de.setDate(de.getDate() + 1);
      if (i === 7) cells += '<div class="cwk">Next week</div>';
      const past = i < ti, list = evs.filter(e => e.s < de && e.f > ds && (past || e.f > now)).sort((a, b) => (b.allDay - a.allDay) || (a.s - b.s));
      if (!past) total += list.filter(e => e.s >= ds || i === ti).length;
      const chips = list.map(e => {
        const col = this._calColor(e.ci), multi = !e.allDay && e.s < ds;
        const when = e.allDay ? 'All day' : multi ? 'Until ' + hm(e.f) : hm(e.s) + (e.f - e.s < 86400000 ? ' – ' + hm(e.f) : '');
        return e.allDay ? `<div class="chip ad" style="background:${col}"><div class="tt">${esc(e.title)}</div></div>`
          : `<div class="chip" style="border-color:${col}"><div class="ct">${when}</div><div class="tt">${esc(e.title)}</div></div>`;
      }).join('');
      const dow = ds.getDay();
      cells += `<div class="cday ${i === ti ? 'today' : ''} ${past ? 'past' : ''} ${dow === 0 || dow === 6 ? 'we' : ''}"><div class="dh"><span>${i === ti ? 'Today' : i === ti + 1 ? 'Tomorrow' : DOW[dow]}</span><b>${ds.getDate()}</b></div>
        ${chips || '<div class="none">Free</div>'}</div>`;
    }
    const end = new Date(m0); end.setDate(end.getDate() + 13);
    el.innerHTML = this._ph('closecal', this._pic('mdi:calendar-month'), 'Calendar', 'This week & next', `${m0.getDate()} ${MON[m0.getMonth()]} – ${end.getDate()} ${MON[end.getMonth()]} · ${total} event${total === 1 ? '' : 's'}`) + `
      <div class="legend" style="margin-top:14px">${legend}</div>
      <div class="cgrid">${this._events ? cells : '<div class="empty">Loading…</div>'}</div>`;
  }
  /* ---------- cameras ---------- */
  _buildCams() {
    const g = this._$('camgrid');
    g.innerHTML = this._c.cameras.slice(0, 3).map((c, i) =>
      `<div class="cam ${i === 0 && this._c.cameras.length > 1 ? 'big' : ''}" data-act="${this._c.doorbell && this._c.doorbell.camera === c.entity ? 'door' : 'cam'}" data-id="${esc(c.entity)}" data-i="${i}">
        <img id="ci${i}" alt=""><div class="off" id="co${i}" hidden></div>
        <span class="ago" id="ca${i}" hidden></span><span class="nm">${esc(c.name || c.entity)}</span>
        <span class="play"><ha-icon icon="mdi:play"></ha-icon></span></div>`).join('');
    if (this._c.cameras.length < 3) g.style.gridTemplateRows = '1fr';
  }
  _updateCams() {
    this._c.cameras.slice(0, 3).forEach((c, i) => {
      const e = this._st(c.entity), mo = c.motion && this._st(c.motion), a = this._$('ca' + i);
      this._$('co' + i).hidden = !!(e && e.state !== 'unavailable');
    });
    this._camBadges();
    if (!this._camInit) { this._camInit = true; this._refreshCams(); }
    if (this._camOn) this._camMotion();
  }
  _refreshCams() {
    if (!this._built || !this._hass) return;
    this._c.cameras.slice(0, 3).forEach((c, i) => {
      const e = this._st(c.entity); if (!e || !e.attributes.entity_picture || e.state === 'unavailable') return;
      const url = e.attributes.entity_picture + (e.attributes.entity_picture.includes('?') ? '&' : '?') + '_=' + Date.now();
      const im = new Image(); im.onload = () => { const t = this._$('ci' + i); if (t) t.src = url; (this._camAt || (this._camAt = []))[i] = Date.now(); this._camBadges(); }; im.src = url;
    });
  }
  _camBadges() {
    if (!this._built) return;
    this._c.cameras.slice(0, 3).forEach((c, i) => {
      const a = this._$('ca' + i); if (!a) return;
      const e = this._st(c.entity), mo = c.motion && this._st(c.motion), at = this._camAt && this._camAt[i];
      if (mo && mo.state === 'on') { a.hidden = false; a.textContent = 'Motion now'; a.classList.add('mo'); return; }
      a.classList.remove('mo');
      if (!e || e.state === 'unavailable' || !at) { a.hidden = true; return; }
      const sec = Math.max(0, Math.round((Date.now() - at) / 1000));
      a.hidden = false; a.textContent = sec < 5 ? 'Just now' : sec < 60 ? sec + 's ago' : sec < 3600 ? Math.floor(sec / 60) + 'm ago' : Math.floor(sec / 3600) + 'h ago';
      a.classList.toggle('old', sec >= 60);
    });
  }
  _camOpen(i) {
    const c = this._c.cameras[i]; if (!c) return;
    this._camClose(true); this._camIdx = i;
    const isDoor = this._c.doorbell && this._c.doorbell.camera === c.entity;
    const tabs = this._c.cameras.length > 1 ? `<div class="tabs">${this._c.cameras.map((x, j) => `<button class="${j === i ? 'sel' : ''}" data-act="camtab" data-i="${j}">${esc(x.name || x.entity)}</button>`).join('')}</div>` : '';
    const u = this._c.cameras_logo === undefined ? 'https://brands.home-assistant.io/unifiprotect/icon.png' : this._c.cameras_logo;
    this._$('campop').innerHTML = this._ph('closecam', this._plg(u), 'Cameras', esc(c.name || c.entity), isDoor ? 'Doorbell camera' : 'Live view') + `
      ${tabs}<div class="cvid" id="cvid"><img id="cvimg" alt=""><span class="clive"><i></i>LIVE</span><span class="cmo" id="cmo"></span></div>
      <div class="cacts">${isDoor ? '<button data-act="camdoor"><ha-icon icon="mdi:microphone"></ha-icon>Talk at the door</button>' : ''}${this._c.cameras_path ? '<button data-act="camfull"><ha-icon icon="mdi:cctv"></ha-icon>All cameras</button>' : ''}<button data-act="more" data-id="${esc(c.entity)}"><ha-icon icon="mdi:dots-horizontal"></ha-icon>More</button></div>`;
    this._$('camov').classList.add('open'); this._camOn = true;
    this._camMotion();
    const snap = () => { const e = this._st(c.entity), im = this._$('cvimg'); if (!e || !e.attributes.entity_picture || !im) return;
      const url = e.attributes.entity_picture + (e.attributes.entity_picture.includes('?') ? '&' : '?') + '_=' + Date.now(), n = new Image(); n.onload = () => { const t = this._$('cvimg'); if (t) t.src = url; }; n.src = url; this._camMotion(); };
    snap(); this._camSnapT = setInterval(snap, 2000);
    const tok = this._camTok = (this._camTok || 0) + 1;
    (async () => {
      try {
        if (!customElements.get('ha-camera-stream') && window.loadCardHelpers) {
          const h = await window.loadCardHelpers(); h.createCardElement({ type: 'picture-entity', entity: c.entity, camera_view: 'live' });
          await Promise.race([customElements.whenDefined('ha-camera-stream'), new Promise(r => setTimeout(r, 4000))]);
        }
        const box = this._$('cvid'); if (!customElements.get('ha-camera-stream') || tok !== this._camTok || !box) return;
        const v = document.createElement('ha-camera-stream');
        v.hass = this._hass; v.stateObj = this._st(c.entity); v.muted = true; v.controls = false; v.allowExoPlayer = true; v.className = 'cstream';
        box.insertBefore(v, box.firstChild); this._camV = v;
        setTimeout(() => { if (this._camV === v && tok === this._camTok) { clearInterval(this._camSnapT); const im = this._$('cvimg'); if (im) im.style.display = 'none'; } }, 2500);
      } catch (e) { /* keep snapshots */ }
    })();
  }
  _camMotion() {
    const c = this._c.cameras[this._camIdx], el = this._$('cmo'); if (!c || !el) return;
    const mo = c.motion && this._st(c.motion);
    el.textContent = mo && mo.state !== 'unavailable' ? (mo.state === 'on' ? 'Motion now' : 'Motion ' + ago(mo.last_changed)) : '';
    el.classList.toggle('on', !!(mo && mo.state === 'on'));
  }
  _camClose(keep) {
    clearInterval(this._camSnapT); this._camTok = (this._camTok || 0) + 1; this._camV = null;
    const v = this._$ && this._$('cvid'); if (v) v.innerHTML = '';
    if (!keep) { this._camOn = false; const o = this._$ && this._$('camov'); if (o) o.classList.remove('open'); }
  }
  /* ---------- lights + mini player ---------- */
  _npPick() {
    const ps = this._c.media_players.map(id => this._st(id)).filter(Boolean);
    const ok = e => (e.attributes.supported_features || 0) & 16385;
    const p = (this._npPref && ps.find(e => e.entity_id === this._npPref && (e.state === 'playing' || e.state === 'paused'))) || ps.find(e => e.state === 'playing' && ok(e)) || ps.find(e => e.state === 'playing')
      || (this._npEntity && ps.find(e => e.entity_id === this._npEntity && e.state === 'paused'));
    if (p) this._npEntity = p.entity_id;
    return p ? [p.entity_id, p.state, p.attributes.media_title, p.attributes.entity_picture] : null;
  }
  _renderLights() {
    const tiles = this._c.lights.map(l => {
      const e = this._st(l.entity), on = e && e.state === 'on', b = e && e.attributes.brightness;
      const st = !e ? 'Missing' : e.state === 'unavailable' ? 'Unavailable' : on ? (b ? `On · ${Math.round(b / 2.55)}%` : 'On') : 'Off';
      return `<div class="card tile ${on ? 'on' : ''}" data-light="${esc(l.entity)}"><div class="ic"><ha-icon icon="${esc(l.icon || 'mdi:lightbulb-outline')}"></ha-icon></div>
        <div class="tx"><div class="n">${esc(l.name || (e && e.attributes.friendly_name) || l.entity)}</div><div class="s">${st}</div></div></div>`;
    }).join('');
    this._$('lights').innerHTML = tiles;
    this._renderMusic();
    if (this._npOpen) this._renderNp();
  }
  _renderMusic() {
    const el = this._$('music'); if (!el) return;
    const p = this._npPick(), e = p && this._st(p[0]);
    if (!e) { el.classList.add('idle'); el.classList.remove('art');
      el.innerHTML = `<div class="mart"><ha-icon icon="mdi:music-note"></ha-icon></div><div class="mi"><div class="lbl">Music</div><div class="mn">Nothing playing</div><div class="ma">Start music from Spotify or Sonos</div></div>`; return; }
    el.classList.remove('idle');
    const a = e.attributes, playing = e.state === 'playing', ctl = this._ctl(e);
    el.classList.toggle('art', !!a.entity_picture);
    el.innerHTML = `${a.entity_picture ? `<div class="mbg" style="background-image:url('${esc(a.entity_picture)}')"></div>` : '<div class="mart"><ha-icon icon="mdi:music-note"></ha-icon></div>'}
      <div class="mi"><div class="lbl">${playing ? 'Now playing' : 'Paused'}${ctl ? ' · ' + esc(ctl.attributes.friendly_name || '') : ''}</div>
        <div class="mn">${esc(a.media_title || '')}</div><div class="ma">${esc(a.media_artist || '')}</div>
        ${this._mvol && ctl ? (() => { const g = this._gvol(), lv = g ? Math.round(g.lvl * 100) : 0; return `<div class="mc mvs" data-act="noop"><button data-act="vol" data-d="-1"><ha-icon icon="mdi:volume-minus"></ha-icon></button><input type="range" min="0" max="100" value="${lv}" data-gvol="1"><button data-act="vol" data-d="1"><ha-icon icon="mdi:volume-plus"></ha-icon></button></div>`; })()
        : `<div class="mc${ctl ? '' : ' dis'}"><button data-act="mp" data-svc="media_previous_track"><ha-icon icon="mdi:skip-previous"></ha-icon></button>
          <button class="pp" data-act="mp" data-svc="media_play_pause"><ha-icon icon="${playing ? 'mdi:pause' : 'mdi:play'}"></ha-icon></button>
          <button data-act="mp" data-svc="media_next_track"><ha-icon icon="mdi:skip-next"></ha-icon></button><button class="vb2" data-act="mvol"><ha-icon icon="mdi:volume-high"></ha-icon></button></div>`}</div>
      <div class="mbar"><i id="mbar"></i></div>`;
    this._musicProg();
  }
  _musicProg() {
    const bar = this._$ && this._$('mbar'), e = this._npEntity && this._st(this._npEntity); if (!bar || !e) return;
    const a = e.attributes, dur = a.media_duration || 0; let pos = a.media_position || 0;
    if (e.state === 'playing' && a.media_position_updated_at) pos += (Date.now() - new Date(a.media_position_updated_at)) / 1000;
    bar.style.width = dur ? Math.min(100, pos / dur * 100) + '%' : '0';
  }
  _ctl(e) {
    if (!e) return null;
    const ok = x => (x.attributes.supported_features || 0) & 16385, a = e.attributes;
    if (ok(e)) return e;
    return this._c.media_players.map(id => this._st(id)).find(x => x && x !== e && ok(x) && x.state !== 'off' && x.state !== 'unavailable'
      && (x.attributes.friendly_name === a.source || (a.media_title && x.attributes.media_title === a.media_title))) || null;
  }
  _speakers() {
    return (this._c.speakers || this._c.media_players).filter(id => !/^media_player\.spotify/.test(id)).map(id => this._st(id)).filter(e => e && ((e.attributes.supported_features || 0) & 512));
  }
  _npOpenUp() {
    const e = this._npEntity && this._st(this._npEntity), spk = this._speakers().map(x => x.entity_id);
    if (!this._outs || !this._outs.length || !this._outs.every(id => spk.includes(id))) {
      const lead = e && spk.includes(e.entity_id) ? e.entity_id : spk[0];
      const g = lead ? (this._st(lead).attributes.group_members || [lead]) : [];
      this._outs = lead ? [lead, ...g.filter(m => m !== lead && spk.includes(m))] : [];
    }
    this._npOpen = true; this._npKey = null; this._npTab = this._npTab || 'lib'; this._spkSig = null;
    const ov = this._$('npov');
    ov.innerHTML = `<div class="npbg" id="npbg"></div><button class="x" data-act="closenp"><ha-icon icon="mdi:close"></ha-icon></button>
      <div class="npwrap"><div class="npw" id="npmain"></div><div class="nppanel"><div class="nptabs" id="nptabs"></div><div class="npbody" id="npbody"></div></div></div>`;
    ov.classList.add('open');
    this._renderNp(); this._renderNpPanel();
    if (!this._lib) this._browse(null);
  }
  _renderNp() {
    const ov = this._$('npov'), main = this._$('npmain'); if (!main) return;
    const e = this._npEntity && this._st(this._npEntity);
    const a = e ? e.attributes : {}, playing = e && e.state === 'playing', live = e && (e.state === 'playing' || e.state === 'paused');
    let pos = a.media_position || 0;
    if (playing && a.media_position_updated_at) pos += (Date.now() - new Date(a.media_position_updated_at)) / 1000;
    const dur = a.media_duration || 0, pct = dur ? Math.min(100, pos / dur * 100) : 0;
    const key = [e && e.entity_id, live, a.media_title, a.entity_picture, playing, JSON.stringify(a.group_members || [])].join('|');
    if (key !== this._npKey) {
      this._npKey = key;
      const ctl = live && this._ctl(e), src = e && /spotify/i.test((a.source || '') + e.entity_id) ? 'mdi:spotify' : 'mdi:speaker';
      const nm = id => { const x = this._st(id); return x ? x.attributes.friendly_name || id : id; };
      const where = live && ctl ? (ctl.attributes.group_members || [ctl.entity_id]).map(nm).join(' + ') : '';
      this._$('npbg').style.backgroundImage = live && a.entity_picture ? `url('${esc(a.entity_picture)}')` : 'none';
      main.innerHTML = live ? `<ha-icon class="src" icon="${src}"></ha-icon>
        ${a.entity_picture ? `<img class="art" src="${esc(a.entity_picture)}" alt="">` : '<div class="art"></div>'}
        <div class="tt">${esc(a.media_title || 'Nothing playing')}</div>
        <div class="ar">${esc([a.media_artist, a.media_album_name].filter(Boolean).join(' · '))}</div>
        <div class="prog"><div class="b"><i id="npbar"></i></div><div class="tm"><span id="npcur"></span><span>${dur ? mmss(dur) : ''}</span></div></div>
        <div class="ctl${ctl ? '' : ' dis'}"><button data-act="mp" data-svc="media_previous_track"><ha-icon icon="mdi:skip-previous"></ha-icon></button>
        <button class="pp" data-act="mp" data-svc="media_play_pause"><ha-icon icon="${playing ? 'mdi:pause' : 'mdi:play'}"></ha-icon></button>
        <button data-act="mp" data-svc="media_next_track"><ha-icon icon="mdi:skip-next"></ha-icon></button></div>
        ${ctl ? `<div class="npvol"><button data-act="vol" data-d="-1"><ha-icon icon="mdi:volume-minus"></ha-icon></button><input type="range" min="0" max="100" id="npgvol" data-gvol="1"><button data-act="vol" data-d="1"><ha-icon icon="mdi:volume-plus"></ha-icon></button><span id="npgvl"></span></div>` : ''}
        <div class="spk">${ctl ? 'Playing on ' + esc(where) : 'Use the Spotify app to control this'}</div>`
        : `<ha-icon class="src" icon="mdi:spotify"></ha-icon><div class="art idle"><ha-icon icon="mdi:music-note"></ha-icon></div>
        <div class="tt">Nothing playing</div><div class="ar">Pick something from Spotify and choose your speakers</div>`;
    }
    const bar = this._$('npbar'), cur = this._$('npcur');
    if (bar) bar.style.width = pct + '%';
    if (cur) cur.textContent = dur ? mmss(pos) : '';
    const gv = this._$('npgvol'), g = gv && this._gvol();
    if (g && this.shadowRoot.activeElement !== gv && !(this._gvT && Date.now() - this._gvT < 2500)) { gv.value = Math.round(g.lvl * 100); this._$('npgvl').textContent = Math.round(g.lvl * 100) + '%'; }
    if (this._npTab === 'spk') { const sg = JSON.stringify(this._speakers().map(x => [x.entity_id, x.state, x.attributes.volume_level, x.attributes.group_members, x.attributes.media_title])) + this._outs.join();
      if (sg !== this._spkSig && !(this.shadowRoot.activeElement && this.shadowRoot.activeElement.dataset.vol)) this._renderNpPanel(); }
  }
  _renderNpPanel() {
    const tabs = this._$('nptabs'), body = this._$('npbody'); if (!tabs) return;
    const nm = id => { const x = this._st(id); return x ? x.attributes.friendly_name || id : id; };
    const outs = (this._outs || []).map(nm);
    tabs.innerHTML = `<button class="${this._npTab === 'lib' ? 'sel' : ''}" data-act="nptab" data-t="lib"><ha-icon icon="mdi:spotify"></ha-icon>Spotify</button>
      <button class="${this._npTab === 'spk' ? 'sel' : ''}" data-act="nptab" data-t="spk"><ha-icon icon="mdi:speaker-multiple"></ha-icon>Speakers${outs.length ? ` <small>${esc(outs.length > 1 ? outs[0] + ' +' + (outs.length - 1) : outs[0])}</small>` : ''}</button>`;
    if (this._npTab === 'spk') {
      const spk = this._speakers();
      this._spkSig = JSON.stringify(spk.map(x => [x.entity_id, x.state, x.attributes.volume_level, x.attributes.group_members, x.attributes.media_title])) + this._outs.join();
      body.innerHTML = `<div class="nphint">Choose where music plays. Tap more than one to play everywhere together.</div><div class="nplist">${spk.map(x => {
        const on = this._outs.includes(x.entity_id), a = x.attributes, lead = this._outs[0] === x.entity_id && this._outs.length > 1;
        const st = x.state === 'playing' ? 'Playing' + (a.media_title ? ' · ' + a.media_title : '') : x.state === 'paused' ? 'Paused' : x.state === 'unavailable' ? 'Unavailable' : 'Idle';
        return `<div class="sp${on ? ' on' : ''}${x.state === 'unavailable' ? ' na' : ''}"><button class="chk" data-act="spk" data-id="${esc(x.entity_id)}"><ha-icon icon="${on ? 'mdi:check-circle' : 'mdi:circle-outline'}"></ha-icon></button>
          <div class="sx" data-act="spk" data-id="${esc(x.entity_id)}"><div class="t">${esc(a.friendly_name || x.entity_id)}${lead ? ' <small>main</small>' : ''}</div><div class="s">${esc(st)}</div></div>
          <div class="vol"><ha-icon icon="mdi:volume-${(a.volume_level || 0) < .01 ? 'off' : (a.volume_level || 0) < .5 ? 'medium' : 'high'}"></ha-icon><input type="range" min="0" max="100" value="${Math.round((a.volume_level || 0) * 100)}" data-vol="${esc(x.entity_id)}"></div></div>`; }).join('') || '<div class="nphint">No speakers found</div>'}</div>`;
      return;
    }
    const spx = this._spxEnt();
    if (!this._$('npres')) body.innerHTML = (spx ? `<div class="npsrch"><ha-icon icon="mdi:magnify"></ha-icon><input type="search" placeholder="Search songs, playlists, albums" data-search="1" value="${esc(this._sq || '')}" enterkeyhint="search"><button class="clr" data-act="sclear"${this._sq ? '' : ' hidden'}><ha-icon icon="mdi:close-circle"></ha-icon></button></div>` : '') + '<div class="npres" id="npres"></div>';
    this._renderLib();
  }
  _spxEnt() { return this._c.spotifyplus || Object.keys(this._hass.states).find(id => /^media_player\.spotifyplus/.test(id)); }
  _renderLib() {
    const body = this._$('npres'); if (!body) return;
    if (this._sq) return this._renderSearch(body);
    const L = this._lib, stack = this._libStack || [];
    const head = `<div class="nphead">${stack.length > 1 ? '<button class="bk" data-act="libback"><ha-icon icon="mdi:chevron-left"></ha-icon></button>' : ''}<span>${esc(L && L.title ? L.title : 'Spotify')}</span></div>`;
    if (!L || this._libBusy) { body.innerHTML = head + `<div class="nphint">${this._libErr ? `Couldn't load your music. <button class="pill" data-act="libretry">Try again</button>` : 'Loading…'}</div>`; return; }
    const kids = L.children || [], so = L.sortable ? (this._libSort || 'def') : 'def', cmp = (a, b) => String(a || '').localeCompare(String(b || ''), undefined, { sensitivity: 'base' });
    const view = this._libView(L, so);
    const sorts = L.sortable ? `<div class="sorts"><ha-icon icon="mdi:sort"></ha-icon>${[['def', L.playall ? 'Playlist order' : 'Default'], ['added', 'Recently added'], ['title', 'Title'], ['artist', 'Artist']].map(([k, t]) => `<button class="${so === k ? 'sel' : ''}" data-act="lsort" data-s="${k}">${t}</button>`).join('')}</div>` : '';
    body.innerHTML = head + `<div class="nplist">${L.playall ? `<button class="pall" data-act="libplayall"><ha-icon icon="mdi:play"></ha-icon>Play all · ${kids.length} songs</button>` : ''}${sorts}${view.map(([c, i]) => {
      const th = c.thumbnail, sub = c.sub || (c.media_class ? c.media_class.charAt(0).toUpperCase() + c.media_class.slice(1) : '');
      return `<div class="li" data-act="${c.can_expand ? 'libopen' : c.can_play ? 'libplay' : ''}" data-i="${i}">
        ${th ? `<img ${/^\/api\//.test(th) && !/^\/api\/brands/.test(th) ? `data-sign="${esc(th)}"` : `src="${esc(th)}"`} alt="" loading="lazy">` : `<span class="ph"><ha-icon icon="${c.can_expand ? 'mdi:folder-music' : 'mdi:music-note'}"></ha-icon></span>`}
        <div class="lx"><div class="t">${esc(c.title)}</div>${sub ? `<div class="s">${esc(sub)}</div>` : ''}</div>
        ${c.can_play ? `<button class="pl" data-act="libplay" data-i="${i}"><ha-icon icon="mdi:play"></ha-icon></button>` : c.can_expand ? '<ha-icon class="cv" icon="mdi:chevron-right"></ha-icon>' : ''}</div>`; }).join('') || '<div class="nphint">Nothing here</div>'}</div>`;
    body.querySelectorAll('img[data-sign]').forEach(im => this._signed(im.dataset.sign).then(u => { if (u) im.src = u; }));
  }
  _libView(L, so) {
    // the list as shown: [item, original index] in the chosen sort order
    const cmp = (a, b) => String(a || '').localeCompare(String(b || ''), undefined, { sensitivity: 'base' });
    const view = ((L && L.children) || []).map((c, i) => [c, i]);
    if (so === 'added') view.sort((a, b) => (b[0].added || 0) - (a[0].added || 0) || a[1] - b[1]);
    else if (so === 'title') view.sort((a, b) => cmp(a[0].title, b[0].title));
    else if (so === 'artist') view.sort((a, b) => cmp(a[0].sub, b[0].sub) || cmp(a[0].title, b[0].title));
    return view;
  }
  _search(q) {
    q = (q || '').trim(); this._sq = q;
    const clr = this.shadowRoot.querySelector('.npsrch .clr'); if (clr) clr.hidden = !q;
    if (!q) { this._sres = null; this._renderLib(); return; }
    const spx = this._spxEnt(), tok = this._sTok = (this._sTok || 0) + 1;
    this._sBusy = true; this._sErr = false; this._renderLib();
    this._hass.callService('spotifyplus', 'search_all', { entity_id: spx, criteria: q, criteria_type: 'track,playlist,album', limit_total: 8 }, undefined, false, true)
      .then(r => { if (tok !== this._sTok) return; const R = (r && r.response && r.response.result) || {};
        this._sres = { tracks: (R.tracks && R.tracks.items) || [], playlists: (R.playlists && R.playlists.items) || [], albums: (R.albums && R.albums.items) || [] }; })
      .catch(() => { if (tok === this._sTok) this._sErr = true; })
      .finally(() => { if (tok === this._sTok) { this._sBusy = false; this._renderLib(); } });
  }
  _renderSearch(body) {
    if (this._sBusy) { body.innerHTML = '<div class="nphint">Searching…</div>'; return; }
    if (this._sErr || !this._sres) { body.innerHTML = `<div class="nphint">Couldn't search Spotify. <button class="pill" data-act="sretry">Try again</button></div>`; return; }
    const R = this._sres, img = x => x.image_url || (x.images && x.images.length ? x.images[x.images.length > 1 ? 1 : 0].url : '') || (x.album && x.album.image_url) || '';
    const row = (x, k, i, sub) => `<div class="li" data-act="splay" data-k="${k}" data-i="${i}">${img(x) ? `<img src="${esc(img(x))}" alt="">` : '<span class="ph"><ha-icon icon="mdi:music-note"></ha-icon></span>'}
      <div class="lx"><div class="t">${esc(x.name)}</div><div class="s">${esc(sub)}</div></div><button class="pl" data-act="splay" data-k="${k}" data-i="${i}"><ha-icon icon="mdi:play"></ha-icon></button></div>`;
    const by = x => (x.artists || []).map(a => a.name).join(', ');
    const sec = (t, k, list, sub) => list.length ? `<div class="sec2">${t}</div>` + list.map((x, i) => row(x, k, i, sub(x))).join('') : '';
    const html = sec('Songs', 'tracks', R.tracks, by) + sec('Playlists', 'playlists', R.playlists, x => 'Playlist' + (x.owner && x.owner.display_name ? ' · ' + x.owner.display_name : '')) + sec('Albums', 'albums', R.albums, x => 'Album · ' + by(x));
    body.innerHTML = `<div class="nplist">${html || '<div class="nphint">No results</div>'}</div>`;
  }
  async _fullList(item) {
    const spx = this._spxEnt(), id = item.media_content_id || ''; if (!spx || !/^spotify:\/\//.test(id)) return null;
    const pre = (id.match(/^spotify:\/\/[^/]+/) || [])[0], m = id.match(/spotify:(playlist|album):(\w+)/);
    const call = (svc, data) => this._hass.callService('spotifyplus', svc, Object.assign({ entity_id: spx }, data), undefined, false, true).then(r => (r && r.response && r.response.result) || {});
    const pages = async (svc, data, max) => {
      const first = await call(svc, Object.assign({ limit: 50, offset: 0 }, data)); let items = first.items || [];
      const total = Math.min(first.total || items.length, max), offs = []; for (let o = 50; o < total; o += 50) offs.push(o);
      for (let i = 0; i < offs.length; i += 6) { const rs = await Promise.all(offs.slice(i, i + 6).map(o => call(svc, Object.assign({ limit: 50, offset: o }, data)).catch(() => ({ items: [] })))); rs.forEach(r => { items = items.concat(r.items || []); }); }
      return { items, total: first.total || items.length };
    };
    const pic = imgs => imgs && imgs.length ? (imgs[1] || imgs[0]).url : '';
    const trk = (t, th, ad) => ({ title: t.name, media_class: 'track', sub: (t.artists || []).map(a => a.name).join(', '), added: ad ? Date.parse(ad) || 0 : 0, can_play: true, can_expand: false,
      thumbnail: pic(t.album && t.album.images) || t.image_url || th || '', media_content_id: 'https://open.spotify.com/track/' + String(t.uri).split(':').pop(), media_content_type: 'music' });
    const title = item.title || 'Spotify';
    try {
      if (m && m[1] === 'playlist') {
        const r = await pages('get_playlist_items', { playlist_id: m[2], fields: 'total,next,items(added_at,track(name,uri,type,artists(name),album(images)))' }, 5000);
        const ch = (r.items || []).filter(x => x && x.track && x.track.uri && x.track.type === 'track').map(x => trk(x.track, null, x.added_at));
        return { title, total: r.total, children: ch, media_content_id: id, media_content_type: item.media_content_type, playall: { media_content_id: id, media_content_type: item.media_content_type }, sortable: true };
      }
      if (m && m[1] === 'album') {
        const r = await pages('get_album_tracks', { album_id: m[2] }, 500);
        return { title, total: r.total, media_content_id: id, media_content_type: item.media_content_type, playall: { media_content_id: id, media_content_type: item.media_content_type },
          children: (r.items || []).filter(t => t && t.uri).map(t => trk(t, item.thumbnail)) };
      }
      if (/\/current_user_saved_tracks$/.test(id)) {
        const r = await pages('get_track_favorites', {}, 5000);
        return { title, media_content_id: id, media_content_type: item.media_content_type, sortable: true, children: (r.items || []).filter(x => x && x.track && x.track.uri).map(x => trk(x.track, null, x.added_at)) };
      }
      if (/\/current_user_playlists$/.test(id) && pre) {
        const r = await call('get_playlist_favorites', { limit_total: 200 });
        return { title, media_content_id: id, media_content_type: item.media_content_type, children: (r.items || []).filter(x => x && x.id).map(x => ({ title: x.name, media_class: 'playlist',
          sub: 'Playlist' + (x.tracks && x.tracks.total ? ' · ' + x.tracks.total + ' songs' : ''), can_play: true, can_expand: true, thumbnail: x.image_url || pic(x.images),
          media_content_id: pre + '/spotify:playlist:' + x.id, media_content_type: 'spotify://playlist' })) };
      }
    } catch (err) { return null; }
    return null;
  }
  _signed(path) {
    this._sigCache = this._sigCache || {};
    if (!this._sigCache[path]) this._sigCache[path] = this._hass.callWS({ type: 'auth/sign_path', path, expires: 86400 }).then(r => r.path).catch(() => null);
    return this._sigCache[path];
  }
  async _browse(item, push = true) {
    const ent = (this._outs || [])[0]; if (!ent) { this._libErr = true; this._renderNpPanel(); return; }
    this._libBusy = true; this._libErr = false; this._renderNpPanel();
    const msg = { type: 'media_player/browse_media', entity_id: ent };
    if (item) { msg.media_content_id = item.media_content_id; msg.media_content_type = item.media_content_type; }
    try {
      let fl = item && await this._fullList(item); if (fl && !(fl.children || []).length) fl = null;
      let r = fl || await this._hass.callWS(msg);
      if (!item) {
        let sp = (r.children || []).find(c => c.can_expand && (/^spotify/.test(c.media_content_type || '') || /spotify/i.test(c.title))), n = 0;
        while (sp && n++ < 3) { const r2 = await this._hass.callWS({ type: 'media_player/browse_media', entity_id: ent, media_content_id: sp.media_content_id, media_content_type: sp.media_content_type });
          r = r2; sp = (r2.children || []).length === 1 && r2.children[0].can_expand ? r2.children[0] : null; }
        if (n) r = Object.assign({}, r, { title: 'Your Spotify' });
        this._libStack = [];
      }
      if (push) (this._libStack = this._libStack || []).push({ media_content_id: r.media_content_id, media_content_type: r.media_content_type, title: r.title });
      if (item && (this._libStack || []).length === 1) r = Object.assign({}, r, { title: 'Your Spotify' });
      this._lib = r;
    } catch (err) { this._libErr = true; }
    this._libBusy = false; this._renderNpPanel();
  }
  async _playItem(it, at) {
    const outs = this._outs || [], lead = outs[0]; if (!lead || !it) return;
    this._qTok = (this._qTok || 0) + 1;
    const L = this._lib, le0 = this._st(lead), tap = at != null ? it : null;
    const so = L && L.sortable ? (this._libSort || 'def') : 'def';
    if (so !== 'def' && L && (it === L.playall || (tap && (tap.media_class === 'track' || tap.media_content_type === 'music')))) return this._playShown(L, so, it === L.playall ? null : at);
    // Tapping one song inside a playlist/album: queue the whole list, then jump to that song (Sonos queue).
    // Playing a playlist/album itself (or anything outside a song list) just starts it.
    const jump = !!(tap && (tap.media_content_type === 'music' || tap.media_class === 'track' || /track/.test(tap.media_content_id || '')) && L && L.playall && le0 && 'queue_size' in le0.attributes && (L.children || []).length === L.total);
    if (jump) it = Object.assign({}, L.playall);
    const sm = String(it.media_content_id || '').match(/spotify:(playlist|album|track):(\w+)$/);
    if (sm) it = { media_content_id: 'https://open.spotify.com/' + sm[1] + '/' + sm[2], media_content_type: sm[1] === 'track' ? 'music' : sm[1] };
    const h = this._hass, le = this._st(lead), cur = (le && le.attributes.group_members) || [lead], nm = (le && le.attributes.friendly_name) || 'the speaker';
    this._toast('Starting on ' + nm + (outs.length > 1 ? ' +' + (outs.length - 1) : '') + '…');
    this._npEntity = lead; this._npPref = lead; this._npKey = null;
    try {
      const drop = cur.filter(m => m !== lead && !outs.includes(m)), add = outs.slice(1).filter(m => !cur.includes(m));
      await Promise.all(drop.map(m => h.callService('media_player', 'unjoin', { entity_id: m })));
      if (add.length) await h.callService('media_player', 'join', { entity_id: lead, group_members: add });
      await h.callService('media_player', 'play_media', { entity_id: lead, media_content_id: it.media_content_id, media_content_type: it.media_content_type });
      if (jump) {
        const qs = () => { const x = this._st(lead); return x ? x.attributes.queue_size || 0 : 0; }, slp = ms => new Promise(r => setTimeout(r, ms));
        for (let n = 0; n < 20 && qs() <= at; n++) await slp(250);
        let ok = false;
        if (qs() > at) for (let n = 0; n < 3 && !ok; n++) { try { await h.callService('sonos', 'play_queue', { entity_id: lead, queue_position: at }, undefined, false); ok = true; } catch (e) { await slp(600); } }
        if (!ok) await h.callService('media_player', 'play_media', { entity_id: lead, media_content_id: tap.media_content_id, media_content_type: 'music' });
      }
    } catch (err) { this._toast("Couldn't play that on " + nm); }
  }
  async _playShown(L, so, at) {
    // A sorted playlist view: start the chosen song (or the top one) straight away, then queue the songs below it
    // in the order they are shown, so "next" always goes down the list as you see it.
    const outs = this._outs || [], lead = outs[0], h = this._hass; if (!lead) return;
    const view = this._libView(L, so).map(v => v[0]).filter(c => c.can_play);
    let i = at == null ? 0 : view.findIndex(c => c === (L.children || [])[at]); if (i < 0) i = 0;
    const list = view.slice(i, i + 150).map(c => { const m = String(c.media_content_id || '').match(/(?:track[:/])(\w+)/); return m ? 'https://open.spotify.com/track/' + m[1] : c.media_content_id; }).filter(Boolean);
    if (!list.length) return;
    const le = this._st(lead), cur = (le && le.attributes.group_members) || [lead], nm = (le && le.attributes.friendly_name) || 'the speaker';
    const tok = this._qTok = (this._qTok || 0) + 1;
    this._toast('Starting on ' + nm + (outs.length > 1 ? ' +' + (outs.length - 1) : '') + '…');
    this._npEntity = lead; this._npPref = lead; this._npKey = null;
    try {
      const drop = cur.filter(m => m !== lead && !outs.includes(m)), add = outs.slice(1).filter(m => !cur.includes(m));
      await Promise.all(drop.map(m => h.callService('media_player', 'unjoin', { entity_id: m })));
      if (add.length) await h.callService('media_player', 'join', { entity_id: lead, group_members: add });
      await h.callService('media_player', 'play_media', { entity_id: lead, media_content_id: list[0], media_content_type: 'music', enqueue: 'replace' });
    } catch (e) { this._toast("Couldn't play that on " + nm); return; }
    for (const u of list.slice(1)) {
      if (tok !== this._qTok) return; // something else was played: stop adding
      try { await h.callService('media_player', 'play_media', { entity_id: lead, media_content_id: u, media_content_type: 'music', enqueue: 'add' }); } catch (e) { /* skip songs Sonos can't add */ }
    }
  }
  _chg(v) {
    if (!v || !v.dataset) return;
    if (v.dataset.vol) this._hass.callService('media_player', 'volume_set', { entity_id: v.dataset.vol, volume_level: +v.value / 100 });
    else if (v.dataset.gvol) { this._gvT = Date.now(); if (this._mvol) this._mvolArm(); const l = this._$('npgvl'); if (l) l.textContent = v.value + '%'; this._gvolSet(+v.value / 100); }
  }
  _mvolArm() { clearTimeout(this._mvolT); this._mvolT = setTimeout(() => { this._mvol = false; this._renderMusic(); }, 8000); }
  _gvol() {
    const e = this._npEntity && this._st(this._npEntity), c = e && this._ctl(e); if (!c) return null;
    const ids = (c.attributes.group_members || [c.entity_id]).filter(id => this._st(id));
    return { ids: ids.length ? ids : [c.entity_id], lvl: c.attributes.volume_level || 0 };
  }
  _gvolSet(v) { const g = this._gvol(); if (g) g.ids.forEach(id => this._hass.callService('media_player', 'volume_set', { entity_id: id, volume_level: v })); }
  _gvolStep(d) {
    const g = this._gvol(); if (!g) return; this._gvT = 0;
    g.ids.forEach(id => { const x = this._st(id), v = (x && x.attributes.volume_level) || 0; this._hass.callService('media_player', 'volume_set', { entity_id: id, volume_level: Math.max(0, Math.min(1, Math.round((v + d) * 100) / 100)) }); });
  }
  _toggleSpk(id) {
    const outs = (this._outs || []).slice(), i = outs.indexOf(id), h = this._hass;
    const lead = outs[0], le = lead && this._st(lead), live = le && (le.state === 'playing' || le.state === 'paused');
    if (i >= 0) {
      if (outs.length === 1) return;
      outs.splice(i, 1);
      if (live) h.callService('media_player', 'unjoin', { entity_id: id }).catch(() => {});
      if (id === lead) { this._npEntity = outs[0]; this._npPref = outs[0]; }
    } else {
      outs.push(id);
      if (live) h.callService('media_player', 'join', { entity_id: lead, group_members: [id] }).catch(() => this._toast("Couldn't add that speaker"));
    }
    this._outs = outs; this._renderNpPanel();
  }
  _toast(t) {
    const b = this._$('npbody'); if (!b) return;
    const d = document.createElement('div'); d.className = 'nptoast'; d.textContent = t; b.appendChild(d); setTimeout(() => d.remove(), 4000);
  }
  /* ---------- doorbell ---------- */
  _dbWatch(first) {
    const d = this._c.doorbell; if (!d) return;
    const b = d.trigger && this._st(d.trigger), ev = d.event && this._st(d.event);
    const bs = b && b.state, es = ev && ev.state;
    if (!first && ((bs === 'on' && this._dbB !== 'on') || (es && this._dbE !== undefined && es !== this._dbE && !/unknown|unavailable/.test(es)))) this._dbOpen(true);
    this._dbB = bs; this._dbE = es;
  }
  async _dbOpen(ring) {
    const d = this._c.doorbell, ov = this._$('dbov'); if (!d || !ov) return;
    this._dbRing = ring ? new Date() : this._dbRing && this._dbOpenNow ? this._dbRing : null;
    if (!this._dbOpenNow) {
      this._dbOpenNow = true; this._dbMuted = true;
      const replies = d.replies || ['Coming now', 'Please leave it at the door', 'Sorry, we can\'t come to the door right now'];
      ov.innerHTML = `<div class="dbvid" id="dbvid"><img id="dbimg" alt=""></div>
        <div class="dbtop"><div><div class="dbt">${esc(d.name || 'Front door')}</div><div class="dbs" id="dbs"></div></div>
          <button class="dbx" data-act="dbclose"><ha-icon icon="mdi:close"></ha-icon></button></div>
        <div class="dbbar">
          <div class="dbq">${replies.map((r, i) => `<button data-act="dbsay" data-i="${i}"><ha-icon icon="mdi:message-reply-text-outline"></ha-icon>${esc(r)}</button>`).join('')}</div>
          <div class="dbctl">
            <button class="dbsnd" id="dbsnd" data-act="dbsnd"><ha-icon icon="mdi:volume-off"></ha-icon><span>Listen</span></button>
            <button class="dbtalk" id="dbtalk"><ha-icon icon="mdi:microphone"></ha-icon><span>Hold to talk</span></button>
            <button class="dbsnd" data-act="dbclose"><ha-icon icon="mdi:phone-hangup"></ha-icon><span>Close</span></button>
          </div>
          <div class="dbmsg" id="dbmsg"></div>
        </div>`;
      ov.classList.add('open');
      const tb = this._$('dbtalk');
      const down = e => { e.preventDefault(); this._dbTalkStart(); }, up = e => { e.preventDefault(); this._dbTalkStop(); };
      tb.addEventListener('pointerdown', down); tb.addEventListener('pointerup', up); tb.addEventListener('pointerleave', up); tb.addEventListener('pointercancel', up);
      tb.addEventListener('contextmenu', e => e.preventDefault());
      this._dbStream();
    }
    this._dbStatus();
    this._dbPoke();
  }
  _dbStatus() {
    const el = this._$('dbs'); if (!el) return;
    el.textContent = this._dbRing ? 'Someone rang the doorbell · ' + hm(this._dbRing) : 'Live view';
  }
  _dbPoke() {
    clearTimeout(this._dbT);
    const secs = (this._c.doorbell && this._c.doorbell.timeout) || 120;
    this._dbT = setTimeout(() => { if (!this._dbRec) this._dbClose(); else this._dbPoke(); }, secs * 1000);
  }
  async _dbStream() {
    const d = this._c.doorbell, box = this._$('dbvid'), img = this._$('dbimg'), cam = this._st(d.camera), fit = d.fit === 'contain' ? 'contain' : 'cover';
    if (box) box.classList.toggle('fit', fit === 'contain');
    const snap = () => { const c = this._st(d.camera); if (!c || !c.attributes.entity_picture || !this._$('dbimg')) return;
      const u = c.attributes.entity_picture + '&_=' + Date.now(), im = new Image(); im.onload = () => { const t = this._$('dbimg'); if (t) t.src = u; }; im.src = u; };
    snap(); clearInterval(this._dbSnapT); this._dbSnapT = setInterval(snap, 1500);
    try {
      if (!customElements.get('ha-camera-stream') && window.loadCardHelpers) {
        const h = await window.loadCardHelpers(); h.createCardElement({ type: 'picture-entity', entity: d.camera, camera_view: 'live' });
        await Promise.race([customElements.whenDefined('ha-camera-stream'), new Promise(r => setTimeout(r, 4000))]);
      }
      if (!customElements.get('ha-camera-stream') || !this._dbOpenNow || !cam) return;
      const v = document.createElement('ha-camera-stream');
      v.hass = this._hass; v.stateObj = this._st(d.camera); v.muted = true; v.controls = false; v.allowExoPlayer = true; v.className = 'dbstream';
      v.fitMode = fit; v.setAttribute('fit-mode', fit);
      box.appendChild(v); this._dbV = v;
      // Older HA builds ignore fit-mode: reach into the player's shadow DOM and size the <video> ourselves.
      const fill = (n, k) => { if (!n || k > 6) return; const r = n.shadowRoot || n; r.querySelectorAll && r.querySelectorAll('video,img').forEach(x => { x.style.objectFit = fit; x.style.width = '100%'; x.style.height = '100%'; x.style.maxHeight = 'none'; });
        r.querySelectorAll && r.querySelectorAll('*').forEach(c => { if (c.shadowRoot) { c.style.height = '100%'; c.style.display = 'block'; fill(c, k + 1); } }); };
      [400, 1200, 2500, 5000].forEach(t => setTimeout(() => { if (this._dbV === v) fill(v, 0); }, t));
      setTimeout(() => { if (this._dbV === v) { clearInterval(this._dbSnapT); if (img) img.style.display = 'none'; } }, 2500);
    } catch (e) { /* keep snapshots */ }
  }
  _dbMsg(t, err) {
    const m = this._$('dbmsg'); if (!m) return;
    m.textContent = t || ''; m.className = 'dbmsg' + (err ? ' err' : '') + (t ? ' on' : '');
    clearTimeout(this._dbMsgT); if (t) this._dbMsgT = setTimeout(() => { m.className = 'dbmsg'; }, 5000);
  }
  async _dbSay(text) {
    const d = this._c.doorbell, sp = d.speaker; if (!sp) return this._dbMsg('No doorbell speaker set up', true);
    this._dbPoke(); this._dbMsg('Saying “' + text + '”…');
    const h = this._hass, tries = d.tts_entity ? [['tts', 'speak', { entity_id: d.tts_entity, media_player_entity_id: sp, message: text }]]
      : [['tts', d.tts_service || 'google_translate_say', Object.assign({ entity_id: sp, message: text }, d.tts_language ? { language: d.tts_language } : {})], ['tts', 'cloud_say', { entity_id: sp, message: text }]];
    for (const [dm, sv, data] of tries) { try { await h.callService(dm, sv, data); return this._dbMsg('Said “' + text + '”'); } catch (e) { } }
    this._dbMsg("Couldn't send that message", true);
  }
  async _dbTalkStart() {
    const d = this._c.doorbell, tb = this._$('dbtalk'); this._dbPoke();
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia || !window.MediaRecorder)
      return this._dbMsg(window.isSecureContext ? 'This browser can’t record audio' : 'Talking needs the panel opened over https (secure address)', true);
    if (this._dbRec) return;
    try {
      this._dbMic = this._dbMic && this._dbMic.active ? this._dbMic : await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } });
      const type = ['audio/webm;codecs=opus', 'audio/webm', 'audio/mp4', 'audio/ogg'].find(t => MediaRecorder.isTypeSupported && MediaRecorder.isTypeSupported(t)) || '';
      const rec = new MediaRecorder(this._dbMic, type ? { mimeType: type } : undefined), chunks = [];
      rec.ondataavailable = e => { if (e.data && e.data.size) chunks.push(e.data); };
      rec.onstop = () => this._dbSend(new Blob(chunks, { type: rec.mimeType || type || 'audio/webm' }));
      rec.start(); this._dbRec = rec; this._dbRecAt = Date.now();
      if (tb) { tb.classList.add('rec'); tb.querySelector('span').textContent = 'Talking… release to send'; }
      if (this._dbV && this._dbMuted === false) this._dbV.muted = true;
    } catch (e) { this._dbMsg('Microphone access was blocked', true); }
  }
  _dbTalkStop() {
    const rec = this._dbRec, tb = this._$('dbtalk'); if (!rec) return;
    this._dbRec = null; if (tb) { tb.classList.remove('rec'); tb.querySelector('span').textContent = 'Hold to talk'; }
    if (Date.now() - this._dbRecAt < 600) { rec.onstop = null; try { rec.stop(); } catch (e) { } return this._dbMsg('Hold the button while you speak'); }
    try { rec.stop(); } catch (e) { }
    if (this._dbV && this._dbMuted === false) setTimeout(() => { if (this._dbV) this._dbV.muted = false; }, 400);
  }
  async _dbSend(blob) {
    const d = this._c.doorbell, sp = d.speaker; if (!sp || !blob.size) return;
    this._dbMsg('Sending to the door…');
    const ext = /mp4/.test(blob.type) ? 'm4a' : /ogg/.test(blob.type) ? 'ogg' : 'webm', fd = new FormData();
    fd.append('media_content_id', 'media-source://media_source/local/.'); fd.append('file', blob, 'doorbell-talk-' + Date.now() + '.' + ext);
    try {
      const r = await this._hass.fetchWithAuth('/api/media_source/local_source/upload', { method: 'POST', body: fd });
      if (!r.ok) throw new Error(r.status);
      const id = (await r.json()).media_content_id;
      await this._hass.callService('media_player', 'play_media', { entity_id: sp, media_content_id: id, media_content_type: 'music' });
      this._dbMsg('Sent');
      setTimeout(() => this._hass.callWS({ type: 'media_source/local_source/remove', media_content_id: id }).catch(() => {}), 90000);
    } catch (e) { this._dbMsg("Couldn't send your voice to the doorbell", true); }
  }
  _dbClose() {
    clearTimeout(this._dbT); clearInterval(this._dbSnapT);
    if (this._dbRec) { this._dbRec.onstop = null; try { this._dbRec.stop(); } catch (e) { } this._dbRec = null; }
    if (this._dbMic) { this._dbMic.getTracks().forEach(t => t.stop()); this._dbMic = null; }
    this._dbV = null; this._dbOpenNow = false; this._dbRing = null;
    const ov = this._$('dbov'); if (ov) { ov.classList.remove('open'); ov.innerHTML = ''; }
  }
  /* ---------- interaction ---------- */
  _fire(type, detail) { this.dispatchEvent(new CustomEvent(type, { detail, bubbles: true, composed: true })); }
  _more(id) { this._fire('hass-more-info', { entityId: id }); }
  _down(e) {
    const t = e.composedPath().find(n => n.dataset && n.dataset.light); if (!t) return;
    this._held = false; clearTimeout(this._holdT);
    this._holdT = setTimeout(() => { this._held = true; this._more(t.dataset.light); }, 550);
  }
  _up() { clearTimeout(this._holdT); }
  _click(e) {
    const path = e.composedPath();
    const lt = path.find(n => n.dataset && n.dataset.light);
    if (lt) { if (!this._held) this._hass.callService('light', 'toggle', { entity_id: lt.dataset.light }); this._held = false; return; }
    const t = path.find(n => n.dataset && n.dataset.act); if (!t) return;
    const act = t.dataset.act;
    if (act === 'closebg' && t !== path[0]) return;
    if (act === 'wxloc') { this._wxLoc = +t.dataset.i; if (t.dataset.retry && this._om) delete this._om[this._wxLoc]; this._renderWxPop(); return; }
    if (act === 'wx') { this._wxLoc = 0; this._wxOpen = true; this._sig.wxp = null; this._$('wxov').classList.add('open'); this._update(); }
    else if (act === 'closewx' || act === 'closebg' || act === 'closecal' || act === 'closeclk' || act === 'closetfl' || act === 'closecar' || act === 'closeen' || act === 'closeal' || act === 'closeppl' || act === 'closevac' || act === 'closenet' || act === 'closecam') { this._camClose(); this._netOpen = false; this._netArm = false; { const no = this._$('netov'); if (no) no.classList.remove('open'); } if ((this._pin || this._byp) && this._$('pinov').classList.contains('open')) { this._pinClose(); return; } this._alOpen = false; this._vacOpen = false; this._pplOpen = null; this._wxOpen = false; this._calOpen = false; this._clkOpen = false; this._tflOpen = false; this._tflMap = false; this._carOpen = false; this._enOpen = false; ['wxov', 'calov', 'clkov', 'tflov', 'carov', 'enov', 'alov', 'pplov', 'vacov'].forEach(id => this._$(id).classList.remove('open')); }
    else if (act === 'clk') { this._clkOpen = true; this._renderWorld(); this._$('clkov').classList.add('open'); }
    else if (act === 'calday') { const t0 = new Date(); t0.setHours(0, 0, 0, 0); this._calDay = +t.dataset.i; this._calDayAt = Date.now(); this._calDayOf = t0.getTime(); this._renderCal(); }
    else if (act === 'cal') { this._calOpen = true; this._renderCalPop(); this._$('calov').classList.add('open'); this._fetchCal(); }
    else if (act === 'allcams') { history.pushState(null, '', this._c.cameras_path); window.dispatchEvent(new CustomEvent('location-changed')); }
    else if (act === 'hup' || act === 'hdn') this._heatStep(t.dataset.id, act === 'hup' ? 1 : -1);
    else if (act === 'hpw') { const e = this._st(t.dataset.id); if (e) this._hass.callService('climate', 'set_hvac_mode', { entity_id: t.dataset.id, hvac_mode: e.state === 'off' ? 'heat' : 'off' }); }
    else if (act === 'more') this._more(t.dataset.id);
    else if (act === 'door') this._dbOpen(false);
    else if (act === 'cam' || act === 'camtab') this._camOpen(+t.dataset.i);
    else if (act === 'camfull') { this._camClose(); history.pushState(null, '', this._c.cameras_path); window.dispatchEvent(new CustomEvent('location-changed')); }
    else if (act === 'camdoor') { this._camClose(); this._dbOpen(false); }
    else if (act === 'dbclose') this._dbClose();
    else if (act === 'dbsay') { const d = this._c.doorbell, r = (d.replies || ['Coming now', 'Please leave it at the door', 'Sorry, we can\'t come to the door right now'])[+t.dataset.i]; if (r) this._dbSay(r); }
    else if (act === 'dbsnd') { this._dbPoke(); this._dbMuted = !this._dbMuted; if (this._dbV) this._dbV.muted = this._dbMuted; t.innerHTML = this._dbMuted ? '<ha-icon icon="mdi:volume-off"></ha-icon><span>Listen</span>' : '<ha-icon icon="mdi:volume-high"></ha-icon><span>Mute</span>'; t.classList.toggle('on', !this._dbMuted); }
    else if (act === 'tfl') { this._tflOpen = true; this._renderTflPop(); this._$('tflov').classList.add('open'); this._fetchTflAll(); this._fetchTfl(); }
    else if (act === 'carloc') { this._carMap = !this._carMap; this._renderCarPop(); }
    else if (act === 'car') { if (+(t.dataset.i || 0) !== (this._carIdx || 0) || !this._carOpen) this._carMap = false; this._carIdx = +(t.dataset.i || 0); this._carOpen = true; this._renderCarPop(); this._$('carov').classList.add('open'); }
    else if (act === 'carclim') { const k = this._cars[this._carIdx || 0].climate, e = this._st(k); if (e) this._hass.callService('switch', e.state === 'on' ? 'turn_off' : 'turn_on', { entity_id: k }); }
    else if (act === 'carref') { this._hass.callService('button', 'press', { entity_id: this._cars[this._carIdx || 0].refresh }); t.textContent = 'Requested…'; }
    else if (act === 'arm') this._alArm(t.dataset.m);
    else if (act === 'net') { this._netOpen = true; this._netArm = false; this._netTab = 'today'; this._renderNetPop(); this._$('netov').classList.add('open'); this._netFetch();
      clearInterval(this._netTick); this._netTick = setInterval(() => { if (!this._netOpen) { clearInterval(this._netTick); return; } if (this._netTab === 'now') this._renderNetPop(); this._netFetch(); }, 3000); }
    else if (act === 'nettab') { this._netTab = t.dataset.t; this._renderNetPop(); }
    else if (act === 'netstop') { const N = this._c.internet; if (!N || !N.block) return; clearTimeout(this._netArmT);
      if (!this._netArm) { this._netArm = true; this._netArmT = setTimeout(() => { this._netArm = false; if (this._netOpen) this._renderNetPop(); }, 5000); this._renderNetPop(); }
      else { this._netArm = false; this._hass.callService('switch', 'turn_on', { entity_id: N.block }); t.innerHTML = '<ha-icon icon="mdi:timer-sand"></ha-icon>Stopping…'; } }
    else if (act === 'netgo') { const N = this._c.internet; if (N && N.block) { this._hass.callService('switch', 'turn_off', { entity_id: N.block }); t.innerHTML = '<ha-icon icon="mdi:timer-sand"></ha-icon>Turning back on…'; } }
    else if (act === 'vac') { this._vacOpen = true; this._renderVacPop(); this._$('vacov').classList.add('open'); }
    else if (act === 'vcmd') this._hass.callService('vacuum', t.dataset.svc, { entity_id: this._c.vacuum.entity });
    else if (act === 'vmode') this._hass.callService('select', 'select_option', { entity_id: this._c.vacuum.mode, option: t.dataset.m });
    else if (act === 'vroom') { const r = (this._c.vacuum.rooms || [])[+t.dataset.i]; if (r) this._hass.callService('vacuum', 'clean_area', { entity_id: this._c.vacuum.entity, cleaning_area_id: [r.area] }); }
    else if (act === 'pfind') { const j = +t.dataset.i, fe = (this._c.people[j] || {}).find; if (fe) { this._hass.callService('button', 'press', { entity_id: fe }); (this._pFindAt = this._pFindAt || {})[j] = Date.now(); this._renderPeoplePop(); setTimeout(() => { if (this._pplOpen === j) this._renderPeoplePop(); }, 8100); } }
    else if (act === 'ppl') { this._pplOpen = +t.dataset.i; this._renderPeoplePop(); this._$('pplov').classList.add('open'); }
    else if (act === 'pind') { const p = this._pin; if (p && !p.busy && p.v.length < 12) { p.v += t.dataset.d; p.err = ''; this._renderPin(); this._pinIdle(); } }
    else if (act === 'pinb') { const p = this._pin; if (p && !p.busy) { p.v = p.v.slice(0, -1); p.err = ''; this._renderPin(); this._pinIdle(); } }
    else if (act === 'pinok') this._pinGo();
    else if (act === 'pinx') this._pinClose();
    else if (act === 'bypgo') this._bypGo();
    else if (act === 'alarm') { this._alOpen = true; this._renderAlarmPop(); this._$('alov').classList.add('open'); }
    else if (act === 'golights') { const p = this._c.lights_path || location.pathname.split('/').filter(Boolean)[0] + '/lights'; history.pushState(null, '', p.startsWith('/') ? p : '/' + p); window.dispatchEvent(new CustomEvent('location-changed')); }
    else if (act === 'en') { this._enOpen = true; this._renderEnergyPop(); this._$('enov').classList.add('open'); this._fetchEnergy(); }
    else if (act === 'tflmap' || act === 'tflstatus') { this._tflMap = act === 'tflmap'; this._renderTflPop(); }
    else if (act === 'tflretry') { this._tflAllErr = false; this._renderTflPop(); this._fetchTflAll(); }
    else if (act === 'np') this._npOpenUp();
    else if (act === 'closenp') { this._npOpen = false; this._$('npov').classList.remove('open'); }
    else if (act === 'nptab') { this._npTab = t.dataset.t; const b = this._$('npbody'); if (b) b.innerHTML = ''; this._renderNpPanel(); }
    else if (act === 'spk') this._toggleSpk(t.dataset.id);
    else if (act === 'libopen') { const it = this._lib && this._lib.children[+t.dataset.i]; if (it) this._browse(it); }
    else if (act === 'libplay') { const it = this._lib && this._lib.children[+t.dataset.i]; if (it) this._playItem(it, +t.dataset.i); }
    else if (act === 'libback') { const st = this._libStack || []; if (st.length > 1) { st.pop(); this._browse(st[st.length - 1], false); } }
    else if (act === 'lsort') { this._libSort = t.dataset.s; this._renderLib(); const l = this.shadowRoot.querySelector('#npres .nplist'); if (l) l.scrollTop = 0; }
    else if (act === 'libplayall') { if (this._lib && this._lib.playall) this._playItem(this._lib.playall); }
    else if (act === 'libretry') { this._lib = null; this._browse(null); }
    else if (act === 'sclear') { const i = this.shadowRoot.querySelector('input[data-search]'); if (i) i.value = ''; this._search(''); }
    else if (act === 'sretry') this._search(this._sq);
    else if (act === 'splay') { const x = this._sres && (this._sres[t.dataset.k] || [])[+t.dataset.i]; if (x) this._playItem({ media_content_id: (x.external_urls && x.external_urls.spotify) || x.uri, media_content_type: x.type === 'track' ? 'music' : x.type }); }
    else if (act === 'vol') { this._gvolStep(+t.dataset.d * 0.05); if (this._mvol) this._mvolArm(); }
    else if (act === 'mvol') { this._mvol = !this._mvol; if (this._mvol) this._mvolArm(); else clearTimeout(this._mvolT); this._renderMusic(); }
    else if (act === 'mp' && this._npEntity) { const c = this._ctl(this._st(this._npEntity)); if (c) this._hass.callService('media_player', t.dataset.svc, { entity_id: c.entity_id }); }
  }
}
if (!customElements.get('home-panel-card')) customElements.define('home-panel-card', HomePanelCard);
window.customCards = window.customCards || [];
window.customCards.push({ type: 'home-panel-card', name: 'Home Panel Card', description: 'iOS-style wall tablet panel' });
