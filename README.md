# Home Panel Cards

Custom Home Assistant cards for a wall-mounted tablet dashboard (Lenovo Tab P12).

| Card | Page |
|---|---|
| `custom:home-panel-card` | Main panel – clock, calendar, TfL, weather, cameras, music, energy, vacuum, heating, alarm, lights, people, cars |
| `custom:home-lights-card` | Room-by-room lights |
| `custom:home-security-card` | Cameras and Ring alarm |
| `custom:home-energy-card` | Energy use, Octopus rates, thermostats, cars |
| `custom:home-music-card` | Full-page Spotify / Sonos player |
| `custom:home-glass-card` | Dark "glass" panel – greeting, status tiles, alert pills, today ticker, people, security, doors, calendar, rooms, weather, rain radar, home vs outside, energy flow, car, music |

Light/dark mode follows sunrise and sunset. Tapping a device opens a matching pop-up (lights, thermostats, door/window/motion sensors, batteries, cameras, cars, energy, alarm).

The card code holds no secrets or entity IDs – those live in the dashboard configuration in Home Assistant.

## Layout

- `src/` – the source for each card (edit these)
- `build.py` – combines everything into `dist/home-panel-cards.js`
- `dist/home-panel-cards.js` – the single file Home Assistant loads

## Updating

1. Edit files in `src/`
2. `python3 build.py`
3. Commit and push
4. In Home Assistant: HACS → Home Panel Cards → Redownload, then refresh the tablet

## Installing

HACS → ⋮ → Custom repositories → add this repository as type **Dashboard**, then download it.
The dashboard resource is `/hacsfiles/home-panel-cards/home-panel-cards.js` (JavaScript module).
