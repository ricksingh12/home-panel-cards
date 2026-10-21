# Home Panel Cards

Custom Lovelace cards for Rick's wall-tablet Home Assistant dashboard (`dashboard-dashboard`).

- Edit files in `src/`, then run `python3 build.py` to regenerate `dist/home-panel-cards.js`. Never edit `dist/` by hand.
- `src/home-panel-card.js` holds the main panel plus two inline style sheets (`CSS` and `PPLCSS`); the build turns these into `window.__HPC_CSS` / `window.__HPC_CSS2`, which the other cards also use.
- `src/hpc-pops.js` patches the panel prototype with the light/thermostat/sensor/battery pop-ups and defines `home-popup-host`, which the lights, security and energy pages embed to show the panel's pop-ups.
- Deploy: commit, push to `main`, then in Home Assistant run HACS → Home Panel Cards → Redownload (repository id 1428671163). The dashboard resource is `/hacsfiles/home-panel-cards/home-panel-cards.js`.
- Card configuration (entity IDs etc.) lives in the dashboard config in Home Assistant, not in this repo. Keep it that way: the repo is public.
