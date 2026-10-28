/* home-glass-card — dark "glass" wall-tablet panel: greeting + status tiles, alert pills, today ticker,
   then a 4-column grid of People, Security, Doors & sensors, Calendar, Rooms, Weather, Radar,
   Home vs outside, Home energy, Car and Music. Built on home-panel-card, so every tap opens the panel's own pop-ups. */
const HGC_CSS = `:host{display:block}
.root.qgl{--gt:#e8edf5;--gs:#8b95a7;--gd:#5f6b7d;--gl:rgba(255,255,255,.07);--gc:rgba(255,255,255,.035);--gc2:rgba(255,255,255,.055);
--green:34,197,94;--amber:245,158,11;--red:239,68,68;--blue:59,130,246;--teal:20,184,166;--purple:168,85,247;--grey:139,149,167;--orange:249,115,22;
background:radial-gradient(1100px 620px at 92% 108%,rgba(16,185,129,.17),transparent 62%),radial-gradient(900px 520px at -5% -10%,rgba(59,130,246,.10),transparent 60%),linear-gradient(180deg,#0c1322,#090e18);
color:var(--gt);height:auto;min-height:calc(100vh - var(--header-height,56px));overflow:visible;padding:12px 16px 14px;display:flex;flex-direction:column;gap:10px;
font-family:"Inter","SF Pro Display",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;font-variant-numeric:tabular-nums}
.qgl .ov{position:fixed}.qgl [hidden]{display:none !important}
.qgl button{font:inherit;color:inherit}
.qgl .qbx{background:linear-gradient(180deg,rgba(255,255,255,.05),rgba(255,255,255,.022));border:1px solid var(--gl);border-radius:16px;box-shadow:0 10px 30px rgba(0,0,0,.25),inset 0 1px 0 rgba(255,255,255,.04)}
.qgl .qin{background:var(--gc);border:1px solid rgba(255,255,255,.06);border-radius:12px}
.qgl .qib{width:30px;height:30px;border-radius:9px;flex:0 0 auto;display:flex;align-items:center;justify-content:center;background:rgba(var(--c,var(--grey)),.16);color:rgb(var(--c,var(--grey)))}.qgl .qib ha-icon{--mdc-icon-size:18px}
.qgl .qib.qsm{width:24px;height:24px;border-radius:7px}.qgl .qib.qsm ha-icon{--mdc-icon-size:15px}
.qgl .qk{font-size:10px;font-weight:700;letter-spacing:.09em;text-transform:uppercase;color:var(--gs)}
.qgl .qs{font-size:11.5px;color:var(--gs);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.qgl .qok{color:rgb(var(--green))}.qgl .qwarn{color:rgb(var(--amber))}.qgl .qbad{color:rgb(var(--red))}
/* header */
.qgl .qhd{display:flex;align-items:center;gap:16px;flex:0 0 auto;padding:2px 2px 0}
.qgl .qhd h1{margin:0;font-size:28px;font-weight:800;letter-spacing:-.02em;line-height:1.1}.qgl .qhd .qht{font-size:13px;color:var(--gs);font-weight:600;margin-top:4px}.qgl .qhd .qht b{color:var(--gt);font-weight:700}
.qgl .qnav{margin-left:auto;display:flex;gap:6px;padding:5px;border-radius:14px}
.qgl .qnav button{width:38px;height:38px;border-radius:10px;border:1px solid transparent;background:none;display:flex;align-items:center;justify-content:center;cursor:pointer;color:rgb(var(--c,var(--grey)))}
.qgl .qnav button.qsel{background:rgba(var(--blue),.2);border-color:rgba(var(--blue),.45);color:#93c5fd}.qgl .qnav ha-icon{--mdc-icon-size:20px}
/* status tiles */
.qgl .qstats{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px;flex:0 0 auto}
.qgl .qst{display:flex;align-items:center;gap:10px;padding:10px 12px;min-width:0;cursor:pointer;border-radius:13px}
.qgl .qst.qhi{background:linear-gradient(180deg,rgba(var(--c),.16),rgba(var(--c),.07));border-color:rgba(var(--c),.5)}
.qgl .qst .qv{font-size:17px;font-weight:800;letter-spacing:-.01em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;line-height:1.15}.qgl .qst .qv small{font-size:12px;font-weight:600;color:var(--gs);margin-left:2px}
.qgl .qst .qx{min-width:0}.qgl .qst .qk{margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
/* pills + ticker */
.qgl .qstrip{display:flex;flex-direction:column;gap:8px;flex:0 0 auto;min-width:0}
.qgl .qpills{display:flex;gap:6px;flex-wrap:wrap}.qgl .qpills:empty{display:none}
.qgl .qpl{display:inline-flex;align-items:center;gap:6px;height:28px;padding:0 10px 0 4px;border-radius:9px;font-size:12px;font-weight:700;cursor:pointer;background:rgba(var(--c),.1);border:1px solid rgba(var(--c),.3)}
.qgl .qpl .qib{width:20px;height:20px;border-radius:6px;background:rgba(var(--c),.9);color:#0c1322}.qgl .qpl .qib ha-icon{--mdc-icon-size:13px}.qgl .qpl span{font-size:9.5px;letter-spacing:.08em;text-transform:uppercase;color:var(--gs);font-weight:700}
.qgl .qtick{display:flex;align-items:center;height:36px;padding:0 6px;border-radius:12px;overflow:hidden;min-width:0}
.qgl .qtick>div{display:flex;align-items:center;gap:7px;padding:0 12px;font-size:12px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:var(--gt);border-left:1px solid var(--gl);min-width:0;cursor:pointer}
.qgl .qtick>div:first-child{border-left:0}.qgl .qtick>div.qgrow{flex:1 1 auto}.qgl .qtick ha-icon{--mdc-icon-size:16px;flex:0 0 auto}.qgl .qtick .qtg{background:rgba(255,255,255,.07);border-radius:7px;padding:3px 8px;font-size:11px;font-weight:700}
.qgl .qtick b{font-weight:800}.qgl .qtick .qdim{color:var(--gs);font-weight:600}
/* main grid */
.qgl .qmain{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));grid-template-rows:repeat(3,minmax(200px,1fr));gap:10px;flex:1 1 auto;min-height:0}
.qgl .qsec{padding:11px 12px;display:flex;flex-direction:column;gap:8px;min-width:0;min-height:0;overflow:hidden;position:relative}
.qgl .qsh{display:flex;align-items:center;gap:8px;flex:0 0 auto;min-width:0}.qgl .qsh .qk{color:var(--gt);font-size:10.5px;white-space:nowrap}.qgl .qsh .qr{margin-left:auto;font-size:11.5px;font-weight:700;color:var(--gs);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:flex;align-items:center;gap:8px;min-width:0}
.qgl .qsh .qsx{font-size:11px;color:var(--gs);font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0}
.qgl .qchev{width:26px;height:26px;border-radius:50%;flex:0 0 auto;border:1px solid var(--gl);background:var(--gc);display:flex;align-items:center;justify-content:center;cursor:pointer;color:var(--gs)}.qgl .qchev ha-icon{--mdc-icon-size:16px}
.qgl .qspan2{grid-column:span 2}
.qgl .qlab{font-size:9.5px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--gd);margin:2px 0 -3px}
/* people */
.qgl .qpps{display:flex;flex-direction:column;gap:7px;flex:1 1 auto;min-height:0;justify-content:center}
.qgl .qperson{flex:0 1 auto;min-height:0;padding:9px 10px;display:flex;align-items:center;gap:10px;cursor:pointer}
.qgl .qpt{display:flex;align-items:center;gap:10px;min-width:0;flex:1 1 auto}
.qgl .qav{position:relative;width:42px;height:42px;flex:0 0 auto}.qgl .qav img,.qgl .qav span.qph{width:42px;height:42px;border-radius:50%;object-fit:cover;display:flex;align-items:center;justify-content:center;background:#1f2937;font-weight:800;font-size:16px;color:var(--gs);box-shadow:0 0 0 2px rgb(var(--c,var(--grey)))}
.qgl .qav i{position:absolute;right:-2px;bottom:-2px;width:14px;height:14px;border-radius:50%;background:rgb(var(--c,var(--grey)));border:2.5px solid #111827}
.qgl .qpn{font-size:14px;font-weight:800}.qgl .qpt .qs b{color:rgb(var(--c,var(--grey)));font-weight:700}
.qgl .qpm{display:grid;grid-template-columns:repeat(3,46px);gap:4px;flex:0 0 auto}
.qgl .qpm>div{display:flex;flex-direction:column;align-items:center;gap:1px;padding:4px 0;border-radius:9px;background:rgba(255,255,255,.035);min-width:0}
.qgl .qpm ha-icon{--mdc-icon-size:15px;color:rgb(var(--c,var(--grey)))}.qgl .qpm b{font-size:12.5px;font-weight:800;white-space:nowrap}.qgl .qpm span{font-size:9px;color:var(--gd);font-weight:700;letter-spacing:.06em;text-transform:uppercase}
/* security */
.qgl .qarow{display:flex;align-items:center;gap:10px;padding:8px 10px;cursor:pointer;flex:0 0 auto}.qgl .qarow .qnm{font-size:13px;font-weight:800}.qgl .qarow .qx{min-width:0;flex:1}
.qgl .qmodes{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:6px;flex:0 0 auto}
.qgl .qmodes button{height:46px;border-radius:11px;border:1px solid rgba(255,255,255,.06);background:var(--gc);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;cursor:pointer;font-size:11px;font-weight:700;color:var(--gs)}
.qgl .qmodes button ha-icon{--mdc-icon-size:18px}.qgl .qmodes button.qsel{background:rgba(var(--blue),.18);border-color:rgba(var(--blue),.6);color:#bfdbfe}.qgl .qmodes button.qconf{background:rgba(var(--red),.2);border-color:rgba(var(--red),.6);color:#fecaca}
.qgl .qcams{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:6px;flex:1 1 auto;min-height:54px}
.qgl .qcam{position:relative;border-radius:11px;overflow:hidden;background:#0b0f17;cursor:pointer;border:1px solid rgba(255,255,255,.06);min-height:0}
.qgl .qcam img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}.qgl .qcam .qnm{position:absolute;left:6px;bottom:5px;font-size:10.5px;font-weight:700;padding:2px 7px;border-radius:6px;background:rgba(0,0,0,.55);backdrop-filter:blur(6px)}
.qgl .qcam .qago{position:absolute;right:6px;top:5px;font-size:10px;font-weight:700;padding:2px 6px;border-radius:6px;background:rgba(0,0,0,.55)}.qgl .qcam .qoff{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:11px;color:var(--gs)}.qgl .qcam .qplay{display:none}
/* doors & sensors */
.qgl .qdgrid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:5px}
.qgl .qdt{display:flex;align-items:center;gap:7px;padding:4px 7px;min-width:0;cursor:pointer;height:34px}.qgl .qdt .qx{min-width:0;flex:1;display:flex;flex-direction:column}.qgl .qdt .qnm{font-size:11.5px;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;line-height:1.2}.qgl .qdt .qs{font-size:10px;line-height:1.2}
.qgl .qdt.qon{background:linear-gradient(180deg,rgba(var(--c),.2),rgba(var(--c),.08));border-color:rgba(var(--c),.55)}.qgl .qdt.qon .qs{color:rgb(var(--c))}
.qgl .qacts{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:6px;margin-top:auto;flex:0 0 auto}
.qgl .qacts button{height:34px;border-radius:11px;border:1px solid rgba(255,255,255,.07);background:var(--gc2);display:flex;align-items:center;justify-content:center;gap:7px;cursor:pointer;font-size:12px;font-weight:700;min-width:0;white-space:nowrap;overflow:hidden}
.qgl .qacts button ha-icon{--mdc-icon-size:17px;color:rgb(var(--c,var(--amber)));flex:0 0 auto}.qgl .qacts button.qrun{border-color:rgba(var(--green),.5);background:rgba(var(--green),.12)}.qgl .qacts button.qerr{border-color:rgba(var(--red),.5);background:rgba(var(--red),.12)}
/* calendar */
.qgl .qevs{display:flex;flex-direction:column;gap:6px;flex:1 1 auto;min-height:0;overflow:hidden}
.qgl .qev{display:flex;align-items:center;gap:10px;padding:6px 8px;min-width:0;flex:0 0 auto}
.qgl .qev .qdd{width:36px;flex:0 0 auto;text-align:center;line-height:1;padding:4px 0;border-radius:8px;background:rgba(var(--c),.14)}.qgl .qev .qdd b{display:block;font-size:16px;font-weight:800;color:rgb(var(--c))}.qgl .qev .qdd span{font-size:8.5px;font-weight:800;letter-spacing:.08em;color:var(--gs)}
.qgl .qev .qx{min-width:0;flex:1}.qgl .qev .qt{font-size:12.5px;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.qgl .qev .qs i{display:inline-block;width:6px;height:6px;border-radius:50%;background:rgb(var(--c));margin-right:5px;vertical-align:1px}
.qgl .qev.qlive{border-color:rgba(var(--green),.5)}.qgl .qnone{font-size:12px;color:var(--gs);padding:10px 2px}
/* rooms */
.qgl .qrooms{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));grid-auto-rows:minmax(0,1fr);gap:7px;flex:1 1 auto;min-height:0}
.qgl .qrm{display:flex;align-items:center;gap:9px;padding:6px 8px;min-width:0;min-height:0;cursor:pointer;position:relative}.qgl .qrm .qtx{min-width:0;flex:1 1 auto}
.qgl .qrm .qnm{font-size:12.5px;font-weight:800;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.qgl .qrm .qs{font-size:11px}
.qgl .qrm.qlit{background:linear-gradient(180deg,rgba(var(--amber),.13),rgba(var(--amber),.04));border-color:rgba(var(--amber),.35)}
.qgl .qbb{width:28px;height:28px;border-radius:50%;border:1px solid rgba(255,255,255,.08);background:rgba(255,255,255,.04);display:flex;align-items:center;justify-content:center;cursor:pointer;color:var(--gs);flex:0 0 auto}.qgl .qbb ha-icon{--mdc-icon-size:16px}
.qgl .qbb.qon{background:rgba(var(--amber),.9);border-color:transparent;color:#1a1204}
.qgl .qrm .qht{display:inline-flex;align-items:center;gap:2px;font-size:10.5px;font-weight:700;color:rgb(var(--orange))}.qgl .qrm .qht ha-icon{--mdc-icon-size:13px}
/* weather */
.qgl .qwnow{display:flex;align-items:center;gap:12px;flex:0 0 auto;cursor:pointer}.qgl .qwnow ha-icon.qbig{--mdc-icon-size:44px}
.qgl .qwnow .qtv{font-size:34px;font-weight:800;letter-spacing:-.03em;line-height:1}.qgl .qwnow .qtv sup{font-size:16px;font-weight:700;vertical-align:top;margin-left:1px}
.qgl .qwnow .qcd{font-size:13px;font-weight:800}.qgl .qwnow .qs{font-size:11px}
.qgl .qhrs{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:4px;flex:0 0 auto}.qgl .qhrs>div,.qgl .qdys>div{display:flex;flex-direction:column;align-items:center;gap:1px;padding:4px 0;border-radius:9px;background:rgba(255,255,255,.03);min-width:0}
.qgl .qhrs span,.qgl .qdys span{font-size:9.5px;font-weight:700;color:var(--gs)}.qgl .qhrs b,.qgl .qdys b{font-size:12px;font-weight:800}.qgl .qhrs ha-icon,.qgl .qdys ha-icon{--mdc-icon-size:17px}
.qgl .qdys{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:4px;flex:1 1 auto;min-height:0;max-height:76px}.qgl .qdys>div{justify-content:center}.qgl .qdys small{font-size:10px;color:var(--gs);font-weight:700}.qgl .qdys em{font-style:normal;font-size:9px;color:#60a5fa;font-weight:700}
/* radar */
.qgl .qrad{flex:1 1 auto;min-height:0;border-radius:12px;overflow:hidden;position:relative;background:#0b1018;border:1px solid rgba(255,255,255,.06)}
.qgl .qrad iframe{position:absolute;inset:0;width:100%;height:100%;border:0;pointer-events:none}.qgl .qrad .qcov{position:absolute;inset:0;cursor:pointer}
/* chart */
.qgl .qhvo{display:flex;align-items:flex-end;gap:18px;flex:0 0 auto}.qgl .qhvo .qk i{display:inline-block;width:7px;height:7px;border-radius:50%;margin-right:5px;vertical-align:1px}
.qgl .qhvo .qv{font-size:24px;font-weight:800;letter-spacing:-.02em;line-height:1.1}.qgl .qhvo .qdl{margin-left:auto;text-align:right}.qgl .qhvo .qdl b{font-size:14px;font-weight:800;display:block}.qgl .qhvo .qdl span{font-size:10.5px;color:var(--gs)}
.qgl .qchart{flex:1 1 auto;min-height:50px;position:relative}.qgl .qchart svg{position:absolute;inset:0;width:100%;height:100%;overflow:visible}
.qgl .qxax{display:flex;justify-content:space-between;font-size:9.5px;font-weight:700;color:var(--gd);flex:0 0 auto}
/* energy */
.qgl .qflow{flex:1 1 auto;min-height:84px;position:relative;cursor:pointer}.qgl .qflow svg{position:absolute;inset:0;width:100%;height:100%}
.qgl .qflow .qln{fill:none;stroke:rgba(255,255,255,.1);stroke-width:2}.qgl .qflow .qfl{fill:none;stroke-width:2.4;stroke-linecap:round;stroke-dasharray:2 9;animation:gfl var(--sp,1.6s) linear infinite}
@keyframes gfl{to{stroke-dashoffset:-22}}
.qgl .qnd{position:absolute;transform:translate(-50%,-50%);border-radius:50%;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;background:#0f1726;border:2px solid rgb(var(--c));box-shadow:0 0 18px rgba(var(--c),.25);line-height:1.05}
.qgl .qnd ha-icon{--mdc-icon-size:16px;color:rgb(var(--c))}.qgl .qnd b{font-size:12px;font-weight:800}.qgl .qnd span{font-size:8.5px;color:var(--gs);font-weight:700;letter-spacing:.04em}
.qgl .qnd.qhome{width:66px;height:66px}.qgl .qnd.qhome b{font-size:14px}.qgl .qnd.qsm{width:56px;height:56px}
.qgl .qnlab{position:absolute;transform:translate(-50%,0);font-size:9px;font-weight:800;letter-spacing:.08em;color:var(--gs);white-space:nowrap}
.qgl .qebx{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:6px;flex:0 0 auto}.qgl .qebx>div{padding:6px 8px;min-width:0}.qgl .qebx b{display:block;font-size:14px;font-weight:800}.qgl .qebx .qs{font-size:10px}
/* car */
.qgl .qchero{display:flex;align-items:center;gap:8px;flex:1 1 auto;min-height:0;cursor:pointer;position:relative}
.qgl .qchero .qsoc{font-size:34px;font-weight:800;letter-spacing:-.03em;line-height:1}.qgl .qchero .qsoc sup{font-size:16px;vertical-align:top}.qgl .qchero .qs{margin-top:3px}
.qgl .qchero .qcx{flex:0 0 auto;position:relative;z-index:1}.qgl .qchero img{position:absolute;right:-14px;top:50%;transform:translateY(-50%);width:62%;max-height:100%;object-fit:contain;filter:drop-shadow(0 12px 14px rgba(0,0,0,.5))}
.qgl .qbars{display:flex;flex-direction:column;gap:6px;flex:0 0 auto}.qgl .qbar{display:grid;grid-template-columns:auto minmax(0,1fr) auto;align-items:center;gap:8px;font-size:11px;font-weight:700;cursor:pointer}
.qgl .qbar ha-icon{--mdc-icon-size:15px;color:rgb(var(--c))}.qgl .qbar .qtr{height:7px;border-radius:4px;background:rgba(255,255,255,.07);overflow:hidden}.qgl .qbar .qtr i{display:block;height:100%;border-radius:4px;background:linear-gradient(90deg,rgba(var(--c),.75),rgb(var(--c)))}.qgl .qbar span{color:var(--gs);white-space:nowrap}
.qgl .qcbt{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:6px;flex:0 0 auto}.qgl .qcbt>div{height:30px;border-radius:10px;display:flex;align-items:center;justify-content:center;gap:6px;font-size:11.5px;font-weight:700;border:1px solid rgba(255,255,255,.06);background:var(--gc);white-space:nowrap;overflow:hidden}
.qgl .qcbt ha-icon{--mdc-icon-size:16px}.qgl .qcbt .qg{color:rgb(var(--green));border-color:rgba(var(--green),.4);background:rgba(var(--green),.1)}.qgl .qcbt .qa{color:rgb(var(--amber));border-color:rgba(var(--amber),.4);background:rgba(var(--amber),.1)}
/* music */
.qgl .qmsc{display:flex;align-items:center;gap:12px;flex:1 1 auto;min-height:0;cursor:pointer}
.qgl .qvin{width:min(96px,38%);aspect-ratio:1;border-radius:50%;flex:0 0 auto;position:relative;background:repeating-radial-gradient(circle at 50% 50%,#111 0 2px,#1b1b1b 2px 3px);box-shadow:0 8px 20px rgba(0,0,0,.5),0 0 0 2px #222}
.qgl .qvin .qlb{position:absolute;inset:30%;border-radius:50%;background:#f59e0b center/cover;box-shadow:0 0 0 2px rgba(0,0,0,.4)}.qgl .qvin .qlb::after{content:"";position:absolute;inset:42%;border-radius:50%;background:#0c1322}
.qgl .qvin.qspin{animation:gsp 4s linear infinite}@keyframes gsp{to{transform:rotate(360deg)}}
.qgl .qmsc .qx{min-width:0;flex:1}.qgl .qmsc .qt{font-size:14px;font-weight:800;line-height:1.2;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}.qgl .qmsc .qs{margin-top:3px}
.qgl .qmct{display:flex;align-items:center;justify-content:center;gap:12px;flex:0 0 auto}.qgl .qmct button{width:36px;height:36px;border-radius:50%;border:1px solid rgba(255,255,255,.08);background:var(--gc2);display:flex;align-items:center;justify-content:center;cursor:pointer}.qgl .qmct button ha-icon{--mdc-icon-size:20px}
.qgl .qmct button.qpp{width:44px;height:44px;background:rgb(var(--amber));color:#1a1204;border:0}.qgl .qmct.qdis{opacity:.35;pointer-events:none}
.qgl .qmbar{height:4px;border-radius:2px;background:rgba(255,255,255,.08);overflow:hidden;flex:0 0 auto}.qgl .qmbar i{display:block;height:100%;width:0;background:rgb(var(--amber));border-radius:2px}
/* wide / landscape tablet */
@media (min-width:1100px){.qgl .qstats{grid-template-columns:repeat(8,minmax(0,1fr))}.qgl .qstrip{flex-direction:row;align-items:center}.qgl .qstrip .qtick{flex:1 1 auto}.qgl .qpills{flex-wrap:nowrap;flex:0 0 auto}}
@media (min-width:1100px) and (min-height:760px){.root.qgl{height:calc(100vh - var(--header-height,56px));overflow:hidden}.qgl .qdys em{display:none}}
@media (max-width:1099px){.qgl .qmain{grid-template-columns:repeat(2,minmax(0,1fr));grid-template-rows:none;grid-auto-rows:minmax(230px,auto)}.qgl .qmain>.qspan2{grid-column:span 2}.qgl .qtick>div.qopt{display:none}.qgl .qrooms{grid-auto-rows:58px}.qgl .qdys{max-height:none}}
@media (max-width:560px){.qgl .qmain{grid-template-columns:1fr}.qgl .qmain>.qspan2{grid-column:auto}.qgl .qstats{grid-template-columns:repeat(2,minmax(0,1fr))}.qgl .qnav{display:none}.qgl .qrooms{grid-template-columns:repeat(2,minmax(0,1fr))}}`;
customElements.whenDefined('home-panel-card').then(() => {
  if (customElements.get('home-glass-card')) return;
  const Base = customElements.get('home-panel-card');
  const E = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const P2 = n => String(n).padStart(2, '0');
  const T12 = d => { d = new Date(d); if (isNaN(d)) return '—'; const h = d.getHours(), m = d.getMinutes(); return (h % 12 || 12) + ':' + P2(m) + ' ' + (h < 12 ? 'am' : 'pm'); };
  const TS = d => { const h = d.getHours(), m = d.getMinutes(); return (h % 12 || 12) + (m ? ':' + P2(m) : '') + (h < 12 ? 'am' : 'pm'); };
  const HS = h => (h % 12 || 12) + (h < 12 ? 'am' : 'pm');
  const AGO = t => { const s = (Date.now() - new Date(t)) / 1000; if (!isFinite(s)) return '—'; if (s < 60) return 'now'; if (s < 3600) return Math.floor(s / 60) + 'm'; if (s < 86400) return Math.floor(s / 3600) + 'h'; return Math.floor(s / 86400) + 'd'; };
  const NUM = x => x != null && x !== '' && !isNaN(parseFloat(x)) ? parseFloat(x) : null;
  const R0 = v => v == null || isNaN(v) ? '—' : Math.round(Number(v));
  const R1 = v => v == null || isNaN(v) ? '—' : (Math.round(Number(v) * 10) / 10).toFixed(1);
  const GBP = v => v == null || isNaN(v) ? '—' : '£' + Number(v).toFixed(2);
  const DOW = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], DOWL = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], MONL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const RGB = { green: '34,197,94', amber: '245,158,11', red: '239,68,68', blue: '59,130,246', teal: '20,184,166', purple: '168,85,247', grey: '139,149,167', orange: '249,115,22', yellow: '250,204,21' };
  const HEX = h => { const m = /^#?([0-9a-f]{6})$/i.exec(String(h || '')); if (!m) return RGB.blue; const n = parseInt(m[1], 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255].join(','); };
  const WXI = { 'clear-night': 'mdi:weather-night', cloudy: 'mdi:weather-cloudy', fog: 'mdi:weather-fog', partlycloudy: 'mdi:weather-partly-cloudy', pouring: 'mdi:weather-pouring', rainy: 'mdi:weather-rainy', snowy: 'mdi:weather-snowy', 'snowy-rainy': 'mdi:weather-snowy-rainy', sunny: 'mdi:weather-sunny', windy: 'mdi:weather-windy', 'windy-variant': 'mdi:weather-windy-variant', lightning: 'mdi:weather-lightning', 'lightning-rainy': 'mdi:weather-lightning-rainy', hail: 'mdi:weather-hail', exceptional: 'mdi:alert-circle-outline' };
  const WXL = { 'clear-night': 'Clear', cloudy: 'Cloudy', fog: 'Fog', partlycloudy: 'Partly cloudy', pouring: 'Heavy rain', rainy: 'Rain', snowy: 'Snow', 'snowy-rainy': 'Sleet', sunny: 'Sunny', windy: 'Windy', 'windy-variant': 'Windy', lightning: 'Thunder', 'lightning-rainy': 'Thunderstorms', hail: 'Hail', exceptional: 'Warning' };
  const WXC = c => c === 'sunny' ? '#fbbf24' : c === 'clear-night' ? '#a5b4fc' : c === 'partlycloudy' ? '#fcd34d' : /rain|pour/.test(c || '') ? '#60a5fa' : /snow|hail/.test(c || '') ? '#e0f2fe' : /lightning/.test(c || '') ? '#facc15' : '#cbd5e1';
  const WI = (c, sz, cls) => `<ha-icon${cls ? ` class="${cls}"` : ''} icon="${WXI[c] || 'mdi:weather-cloudy'}" style="color:${WXC(c)}${sz ? ';--mdc-icon-size:' + sz + 'px' : ''}"></ha-icon>`;
  const IB = (icon, col, sm) => `<span class="qib${sm ? ' qsm' : ''}" style="--c:${RGB[col] || col}"><ha-icon icon="${icon}"></ha-icon></span>`;
  const DIST = (a, b, c, d) => { const r = x => x * Math.PI / 180, R = 6371; const x = Math.sin(r(c - a) / 2) ** 2 + Math.cos(r(a)) * Math.cos(r(c)) * Math.sin(r(d - b) / 2) ** 2; return 2 * R * Math.asin(Math.sqrt(x)); };

  class HomeGlassCard extends Base {
    setConfig(c) {
      super.setConfig(Object.assign({ dark_mode: 'dark', tfl_lines: [] }, c));
      this._g = { hist: null, histAt: 0, out: null, outAt: 0 };
    }
    getCardSize() { return 20; }
    _fetchTfl() {}
    _renderTfl() {}
    _renderHeat() {}
    _renderLights() { this._renderMusic(); if (this._npOpen) this._renderNp(); }
    /* ---------- skeleton ---------- */
    _build() {
      this._built = true;
      const c = this._c, s = this.attachShadow({ mode: 'open' });
      const sec = (id, cls, act) => `<div class="qbx qsec${cls ? ' ' + cls : ''}" id="${id}"${act ? ` data-act="${act}"` : ''}></div>`;
      s.innerHTML = `<style>${window.__HPC_CSS || ''}</style><style>${window.__HPC_CSS2 || ''}</style><style>${HGC_CSS}</style><div class="root qgl">
        <div class="qhd"><div><h1 id="hello"></h1><div class="qht" id="htime"></div></div><div class="qbx qnav" id="nav"></div></div>
        <div class="qstats" id="stats"></div>
        <div class="qstrip"><div class="qpills" id="pills"></div><div class="qbx qtick" id="tick"></div></div>
        <div class="qmain">
          ${sec('g-ppl')}${sec('g-sec')}${sec('g-door')}${sec('g-cal')}
          ${sec('g-rooms', 'qspan2')}${sec('g-wx')}${sec('g-rad')}
          ${sec('g-hvo')}${sec('g-en')}${sec('g-car')}${sec('g-mus')}
        </div>
        <div class="ov" id="wxov" data-act="closebg"><div class="pop" id="wxpop"></div></div>
        <div class="ov npov" id="npov"></div>
        <div class="ov" id="calov" data-act="closebg"><div class="pop wide" id="calpop"></div></div>
        <div class="ov" id="clkov" data-act="closebg"><div class="pop" id="clkpop"></div></div>
        <div class="ov" id="tflov" data-act="closebg"><div class="pop" id="tflpop"></div></div>
        <div class="ov" id="carov" data-act="closebg"><div class="pop" id="carpop"></div></div>
        <div class="ov" id="enov" data-act="closebg"><div class="pop" id="enpop"></div></div>
        <div class="ov" id="alov" data-act="closebg"><div class="pop apop" id="alpop"></div></div>
        <div class="ov" id="vacov" data-act="closebg"><div class="pop" id="vacpop" style="width:min(92%,560px)"></div></div>
        <div class="ov camov" id="camov" data-act="closebg"><div class="pop" id="campop"></div></div>
        <div class="ov" id="pplov" data-act="closebg"><div class="pop" id="pplpop" style="width:min(92%,720px)"></div></div>
        <div class="ov" id="pinov" data-act="closebg"><div class="pop" id="pinpop" style="width:min(92%,360px)"></div></div>
        <div class="ov dbov" id="dbov"></div>
      </div>`;
      this._$ = id => s.getElementById(id);
      this._sec(); this._buildCams(); this._renderNav(); this._renderRadar();
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
    _hdr(icon, col, title, right, act) { return `<div class="qsh">${IB(icon, col, 1)}<span class="qk">${E(title)}</span><span class="qr" id="${right}"></span>${act ? `<button class="qchev" data-act="${act}"><ha-icon icon="mdi:chevron-right"></ha-icon></button>` : ''}</div>`; }
    _sec() {
      const $ = this._$, c = this._c, set = (id, h) => { const el = $(id); if (el) el.innerHTML = h; };
      set('g-ppl', this._hdr('mdi:account-group', 'teal', 'People', 'pplr') + '<div class="qpps" id="ppls"></div>');
      set('g-sec', this._hdr('mdi:shield-home', 'green', 'Security', 'secr') + `<div class="qin qarow" data-act="alarm" id="arow"></div><div class="qmodes" id="modes"></div><div class="qcams" id="camgrid"></div>`);
      set('g-door', this._hdr('mdi:door', 'amber', 'Doors & sensors', 'doorr') + '<div id="doors" style="display:flex;flex-direction:column;gap:7px;min-height:0;overflow:hidden"></div><div class="qacts" id="dacts"></div>');
      set('g-cal', this._hdr('mdi:calendar-month', 'blue', 'Calendar', 'calr', 'cal') + '<div class="qevs" id="evs"></div>');
      set('g-rooms', this._hdr('mdi:floor-plan', 'amber', 'Rooms', 'roomr', c.lights_path ? 'golights' : '') + '<div class="qrooms" id="rooms"></div>');
      set('g-wx', this._hdr('mdi:weather-partly-cloudy', 'yellow', 'Weather', 'wxr', 'wx') + '<div id="wxb" style="display:flex;flex-direction:column;gap:8px;flex:1 1 auto;min-height:0"></div>');
      set('g-rad', this._hdr('mdi:radar', 'blue', 'Rain radar', 'radr') + '<div class="qrad" id="rad"></div>');
      set('g-hvo', this._hdr('mdi:home-thermometer', 'orange', 'Home vs outside', 'hvor') + '<div class="qhvo" id="hvo"></div><div class="qchart" id="hvc"></div><div class="qxax"><span>48h ago</span><span>24h</span><span>Now</span></div>');
      set('g-en', this._hdr('mdi:lightning-bolt', 'green', 'Home energy', 'enr', c.energy ? 'en' : '') + '<div class="qflow" id="flow" data-act="en"></div><div class="qebx" id="ebx"></div>');
      set('g-car', this._hdr('mdi:car-electric', 'blue', (this._cars[0] && this._cars[0].name) || 'Car', 'carr', this._cars.length ? 'car' : '') + '<div class="qchero" id="chero" data-act="car" data-i="0"></div><div class="qbars" id="cbars"></div><div class="qcbt" id="cbt"></div>');
      set('g-mus', this._hdr('mdi:music', 'purple', 'Music', 'musr', c.media_players.length ? 'np' : '') + '<div class="qmsc" id="music" data-act="np"></div><div class="qmbar"><i id="mbar"></i></div><div class="qmct" id="mct"></div>');
    }
    _renderNav() {
      const nav = this._c.nav || [], el = this._$('nav'); if (!el) return;
      if (!nav.length) { el.style.display = 'none'; return; }
      const here = location.pathname;
      el.innerHTML = nav.map(n => `<button class="${here === n.path || (n.path && here.endsWith(n.path)) ? 'qsel' : ''}" data-act="nav" data-path="${E(n.path)}" style="--c:${RGB[n.color] || RGB.grey}" title="${E(n.name || '')}"><ha-icon icon="${E(n.icon || 'mdi:circle')}"></ha-icon></button>`).join('');
    }
    _renderRadar() {
      const el = this._$('rad'); if (!el || !this._hass) return;
      if (this._radarSet) return; this._radarSet = true;
      const cf = this._hass.config || {}, lat = (this._c.radar && this._c.radar.lat) || cf.latitude || 51.5, lon = (this._c.radar && this._c.radar.lon) || cf.longitude || 0, z = (this._c.radar && this._c.radar.zoom) || 8;
      const url = (this._c.radar && this._c.radar.url) || `https://www.rainviewer.com/map.html?loc=${lat},${lon},${z}&oFa=0&oC=1&oU=0&oCS=1&oF=0&oAP=1&c=3&o=83&lm=1&layer=radar&sm=1&sn=1`;
      el.innerHTML = `<iframe loading="lazy" referrerpolicy="no-referrer" src="${E(url)}"></iframe><div class="qcov" data-act="wx"></div>`;
    }
    /* ---------- cameras (base refresh/motion helpers reuse ci/co/ca ids) ---------- */
    _buildCams() {
      const g = this._$('camgrid'); if (!g) return;
      const cams = this._c.cameras.slice(0, 3);
      g.style.gridTemplateColumns = `repeat(${Math.max(1, Math.min(cams.length, 2))},minmax(0,1fr))`;
      g.innerHTML = cams.map((c, i) => `<div class="qcam" data-act="${this._c.doorbell && this._c.doorbell.camera === c.entity ? 'door' : 'cam'}" data-i="${i}"${i > 1 ? ' style="display:none"' : ''}>
        <img id="ci${i}" alt=""><div class="qoff" id="co${i}" hidden></div><span class="qago" id="ca${i}" hidden></span><span class="qnm">${E(c.name || c.entity)}</span></div>`).join('');
    }
    /* ---------- clock ---------- */
    _tick() {
      if (!this._built) return;
      const d = new Date(), s = d.getSeconds(), hr = d.getHours();
      const nm = this._c.name || (this._hass && this._hass.user && this._hass.user.name) || '';
      const g = hr < 5 ? 'Good night' : hr < 12 ? 'Good morning' : hr < 18 ? 'Good afternoon' : 'Good evening';
      const h1 = this._$('hello'), ht = this._$('htime');
      if (h1) h1.textContent = g + (nm ? ', ' + nm.split(' ')[0] : '');
      if (ht) ht.innerHTML = `<b>${T12(d)}</b> · ${DOWL[d.getDay()]} ${d.getDate()} ${MONL[d.getMonth()]}`;
      if (this._npOpen) this._renderNp();
      this._musicProg();
      if (s === 0) { this._sig.cams = null; this._renderCal(); this._update(); if (!this._pop || Date.now() - this._pop.at > 1800000) this._fetchPop(); if (!this._en || Date.now() - this._en.at > 1800000) this._fetchEnergy(); this._fetchHist(); }
    }
    /* ---------- update loop ---------- */
    _ent(id) { return id && this._st(id); }
    _sg(key, ids, extra) {
      const sg = JSON.stringify(ids.map(id => { const e = this._ent(id); return e && [e.state, e.last_changed, e.attributes.current_temperature, e.attributes.temperature, e.attributes.hvac_action, e.attributes.media_title, e.attributes.entity_picture]; })) + (extra || '');
      if (sg === this._sig[key]) return false; this._sig[key] = sg; return true;
    }
    _update(force) {
      if (!this._built || !this._hass) return;
      if (force) this._sig = {};
      const c = this._c, A = c.alarm || {}, k = c.energy || {}, rooms = c.rooms || [], min = Math.floor(Date.now() / 60000);
      const w = this._st(c.weather), sun = this._st(c.sun);
      const lights = rooms.flatMap(r => (r.lights || []).map(l => typeof l === 'string' ? l : l.entity));
      const doors = (A.doors || []).map(x => x.entity), motion = (A.motion || []).map(x => x.entity);
      const temps = rooms.flatMap(r => [r.temperature, r.humidity, r.climate]).filter(Boolean);
      const heat = c.heating.map(z => z.entity);
      const en = [k.live_power, k.live_rate, k.today_electricity, k.today_electricity_cost, k.today_gas, k.today_gas_cost].filter(Boolean);
      const updates = Object.keys(this._hass.states).filter(id => id.startsWith('update.') && this._hass.states[id].state === 'on');
      const V = c.vacuum || {}, vac = [V.entity, V.state, V.error, V.mode].filter(Boolean);
      if (this._sg('stats', [...lights, ...doors, A.entity, ...heat, ...en, ...temps], updates.join() + min)) this._renderStats();
      if (this._sg('pills', [...(A.batteries || []), ...vac], updates.join() + JSON.stringify(this._offline()))) this._renderPills();
      if (this._sg('tick', [c.weather, ...en], JSON.stringify((this._events || []).slice(0, 3).map(e => e.title)) + min)) this._renderTick();
      if ((c.people || []).length && this._sg('ppl', c.people.flatMap(p => [p.tracker, p.battery, p.battery_state, p.person]), String(min))) { this._renderPeople(); if (this._pplOpen != null) this._renderPeoplePop(); }
      if (c.alarm && this._sg('alarm', [A.entity, ...doors, ...motion, ...(A.batteries || [])], (this._alConf || '') + min)) { this._renderAlarm(); if (this._alOpen) this._renderAlarmPop(); }
      if (this._sg('doors', [...doors, ...motion, ...vac, c.doorbell && c.doorbell.trigger], String(min))) { this._renderDoors(); if (this._vacOpen) this._renderVacPop(); }
      if (this._sg('rooms', [...lights, ...temps], '')) this._renderRooms();
      const wsig = JSON.stringify([w && w.state, w && w.attributes, sun && sun.state, (this._hourly || []).length && this._hourly[0].datetime, (this._daily || []).length && this._daily[0].datetime, this._sig.tin, this._pop && this._pop.at]);
      if (wsig !== this._sig.wx) { this._sig.wx = wsig; this._renderWx(); }
      if (this._wxOpen) { const ps = wsig + JSON.stringify((this._daily || []).map(d => d.datetime)); if (ps !== this._sig.wxp) { this._sig.wxp = ps; this._renderWxPop(); } }
      if (c.energy && this._sg('en', en, '')) { if ((k.today_electricity || k.today_gas) && this._en && Date.now() - this._en.at > 300000) this._fetchEnergy(); else { this._renderEnergy(); if (this._enOpen) this._renderEnergyPop(); } }
      if (this._sg('hvo', rooms.map(r => r.temperature).filter(Boolean), String(this._g.histAt) + this._g.outAt + (w && w.attributes.temperature))) this._renderHvo();
      if (this._cars.length) { const ids = this._cars.flatMap(x => Object.keys(x).map(f => typeof x[f] === 'string' && /^[a-z_]+\.[a-z0-9_]+$/.test(x[f]) ? x[f] : null)).filter(Boolean);
        if (this._sg('car', ids, '')) { this._renderCar(); if (this._carOpen) this._renderCarPop(); } }
      if (this._sg('mus', c.media_players, JSON.stringify(this._npPick()))) this._renderLights();
      const csig = JSON.stringify(c.cameras.map(x => { const e = this._st(x.entity), mo = x.motion && this._st(x.motion); return [e && e.state, mo && mo.last_changed]; }));
      if (csig !== this._sig.cams) { this._sig.cams = csig; this._updateCams(); }
      if (!this._radarSet) this._renderRadar();
      if (!this._g.histAt) this._fetchHist();
    }
    _offline() {
      if (this._offAt && Date.now() - this._offAt < 60000) return this._off;
      const ids = new Set(), walk = v => { if (typeof v === 'string') { if (/^(light|switch|sensor|binary_sensor|climate|camera|media_player|lock|vacuum|alarm_control_panel|device_tracker)\.[a-z0-9_]+$/.test(v)) ids.add(v); } else if (Array.isArray(v)) v.forEach(walk); else if (v && typeof v === 'object') Object.values(v).forEach(walk); };
      walk(this._c);
      this._off = [...ids].filter(id => { const e = this._st(id); return e && e.state === 'unavailable'; }); this._offAt = Date.now();
      return this._off;
    }
    /* ---------- header tiles ---------- */
    _inside() {
      const v = (this._c.rooms || []).map(r => NUM((this._st(r.temperature) || {}).state)).filter(x => x != null);
      const t = v.length ? v.reduce((a, b) => a + b, 0) / v.length : null; this._sig.tin = t; return t;
    }
    _renderStats() {
      const c = this._c, el = this._$('stats'); if (!el) return;
      const L = this._enLive && c.energy ? this._enLive() : null;
      const rooms = c.rooms || [], lights = rooms.flatMap(r => (r.lights || []).map(l => typeof l === 'string' ? l : l.entity));
      const on = lights.filter(id => (this._st(id) || {}).state === 'on').length;
      const al = c.alarm ? this._alInfo() : null;
      const hz = c.heating.map(z => this._st(z.entity)).filter(Boolean), heating = hz.filter(e => e.attributes.hvac_action === 'heating').length;
      const tin = this._inside();
      const kw = L && L.p != null ? L.p / 1000 : null;
      const tile = (icon, col, v, k, act, hi, extra) => `<div class="qbx qst${hi ? ' qhi' : ''}" style="--c:${RGB[col]}" ${act}>${IB(icon, col)}<div class="qx"><div class="qv">${v}</div><div class="qk">${k}</div></div>${extra || ''}</div>`;
      el.innerHTML = [
        tile('mdi:transmission-tower-import', kw != null && kw >= 3 ? 'red' : 'green', kw != null ? (kw < 1 ? Math.round(kw * 1000) + '<small>W</small>' : kw.toFixed(2) + '<small>kW</small>') : '—', 'Importing now', 'data-act="en"', kw != null),
        tile('mdi:lightning-bolt', 'blue', L && L.e != null ? R1(L.e) + '<small>kWh</small>' : '—', 'Electric today', 'data-act="en"'),
        tile('mdi:fire', 'orange', L && L.g != null ? R1(L.g) + '<small>kWh</small>' : '—', 'Gas today', 'data-act="en"'),
        tile('mdi:currency-gbp', 'teal', L && L.cost != null ? GBP(L.cost) : '—', 'Spent today' + (L && L.phs ? ' · ' + L.phs : ''), 'data-act="en"'),
        tile('mdi:lightbulb-group', 'amber', on ? on + ' on' : 'All off', 'Lights', `data-act="golights"`, on > 0),
        tile(al && al.open.length ? 'mdi:door-open' : 'mdi:door-closed-lock', al && al.open.length ? 'orange' : 'grey', al ? (al.open.length ? al.open.length + ' open' : 'All closed') : '—', 'Doors', 'data-act="alarm"', al && al.open.length),
        tile(al ? al.icon : 'mdi:shield-outline', al && al.s !== 'disarmed' ? (al.s === 'triggered' ? 'red' : 'green') : 'blue', al ? E(al.label.replace('Armed · ', 'Armed ')) : '—', 'Alarm', 'data-act="alarm"', al && al.s === 'triggered'),
        tile('mdi:radiator', heating ? 'orange' : 'purple', heating ? heating + ' heating' : (tin != null ? R1(tin) + '°' : 'Idle'), heating && tin != null ? 'Heating · ' + R1(tin) + '° inside' : 'Inside avg', c.heating[0] ? `data-act="more" data-id="${E(c.heating[0].entity)}"` : '', heating > 0)
      ].join('');
    }
    _renderPills() {
      const el = this._$('pills'); if (!el) return;
      const al = this._c.alarm ? this._alInfo() : null, off = this._offline(), v = this._c.vacuum ? this._vInfo() : null;
      const upd = Object.keys(this._hass.states).filter(id => id.startsWith('update.') && this._hass.states[id].state === 'on');
      const pill = (icon, col, n, t, act) => `<div class="qpl" style="--c:${RGB[col]}" ${act}>${IB(icon, col)}${n}<span>${t}</span></div>`;
      el.innerHTML = [
        al && al.low.length && pill('mdi:battery-alert-variant-outline', 'amber', al.low.length, 'low batter' + (al.low.length === 1 ? 'y' : 'ies'), 'data-act="alarm"'),
        off.length && pill('mdi:lan-disconnect', 'orange', off.length, 'offline', `data-act="more" data-id="${E(off[0])}"`),
        v && v.err && pill('mdi:robot-vacuum-alert', 'red', E(v.name), E(v.err), 'data-act="vac"'),
        upd.length && pill('mdi:package-up', 'blue', upd.length, 'update' + (upd.length === 1 ? '' : 's'), 'data-act="nav" data-path="/config/updates"'),
        !(al && al.low.length) && !off.length && !upd.length && !(v && v.err) && pill('mdi:check-all', 'green', '', 'All systems OK', '')
      ].filter(Boolean).join('');
    }
    _renderTick() {
      const el = this._$('tick'); if (!el) return;
      const L = this._c.energy ? this._enLive() : null, w = this._st(this._c.weather), now = new Date();
      const nx = (this._events || []).filter(e => e.f > now && !e.allDay)[0] || (this._events || []).filter(e => e.f > now)[0];
      const when = e => { const t = new Date(); t.setHours(0, 0, 0, 0); const x = new Date(e.s); x.setHours(0, 0, 0, 0); const n = Math.round((x - t) / 86400000);
        const day = n <= 0 ? (e.s <= now && !e.allDay ? 'now' : 'today') : n === 1 ? 'tomorrow' : n < 7 ? DOWL[x.getDay()] : x.getDate() + ' ' + MON[x.getMonth()]; return day + (e.allDay || (e.s <= now) ? '' : ' ' + TS(e.s)); };
      el.innerHTML = `<div data-act="en"><span class="qtg">Today</span>${L ? `<ha-icon icon="mdi:lightning-bolt" style="color:rgb(${RGB.blue})"></ha-icon><b>${R1(L.e)} kWh</b><span class="qdim">electric</span>${L.g != null ? `<ha-icon icon="mdi:fire" style="color:rgb(${RGB.orange})"></ha-icon><b>${R1(L.g)} kWh</b><span class="qdim">gas</span>` : ''}` : '<span class="qdim">No energy data</span>'}</div>
        ${L && L.cost != null ? `<div class="qopt" data-act="en"><ha-icon icon="mdi:currency-gbp" style="color:rgb(${RGB.teal})"></ha-icon><b>${GBP(L.cost)}</b><span class="qdim">spent</span></div>` : ''}
        <div class="qgrow" data-act="cal"><ha-icon icon="mdi:calendar-clock" style="color:rgb(${RGB.blue})"></ha-icon>${nx ? `<b style="overflow:hidden;text-overflow:ellipsis">${E(nx.title)}</b><span class="qdim">${E(when(nx))}</span>` : '<span class="qdim">Nothing coming up</span>'}</div>
        ${w ? `<div data-act="wx">${WI(w.state, 16)}<b>${E(WXL[w.state] || w.state)} ${R0(w.attributes.temperature)}°</b></div>` : ''}`;
    }
    /* ---------- people ---------- */
    _renderPeople() {
      const el = this._$('ppls'), r = this._$('pplr'); if (!el) return;
      const cf = this._hass.config || {}, ps = (this._c.people || []).map((_, i) => this._pInfo(i));
      const home = ps.filter(x => (this._st(x.p.tracker) || {}).state === 'home').length;
      if (r) r.textContent = `${home} home · ${ps.length - home} out`;
      el.innerHTML = ps.map((x, i) => {
        const t = this._st(x.p.tracker), isHome = t && t.state === 'home', col = isHome ? RGB.green : t && t.state !== 'not_home' && !/unknown|unavailable/.test(t.state) ? RGB.blue : RGB.grey;
        const km = x.lat != null && cf.latitude != null ? DIST(cf.latitude, cf.longitude, x.lat, x.lon) : null;
        const dist = km == null ? '—' : (this._c.distance_unit || 'mi') === 'km' ? (km < 10 ? km.toFixed(1) : Math.round(km)) : (km * .621371 < 10 ? (km * .621371).toFixed(1) : Math.round(km * .621371));
        const bc = x.lvl == null ? RGB.grey : x.lvl < 20 ? RGB.red : x.lvl < 50 ? RGB.amber : RGB.green;
        return `<div class="qin qperson" data-act="ppl" data-i="${i}" style="--c:${col}"><div class="qpt"><div class="qav">${x.pic ? `<img src="${E(x.pic)}" alt="">` : `<span class="qph">${E((x.name || '?').charAt(0))}</span>`}<i></i></div>
          <div style="min-width:0"><div class="qpn">${E(x.name)}</div><div class="qs"><b>${E(x.where)}</b>${t && t.last_changed ? ' · since ' + T12(t.last_changed) : ''}</div></div></div>
          <div class="qpm"><div style="--c:${bc}"><ha-icon icon="${x.chg ? 'mdi:battery-charging' : 'mdi:battery-' + (x.lvl == null ? 'unknown' : x.lvl >= 90 ? 'high' : x.lvl >= 40 ? 'medium' : 'low')}"></ha-icon><b>${x.lvl != null ? x.lvl + '%' : '—'}</b><span>Batt</span></div>
          <div><ha-icon icon="mdi:map-marker-distance"></ha-icon><b>${isHome ? '0' : dist}</b><span>${E(this._c.distance_unit || 'mi')}</span></div>
          <div><ha-icon icon="mdi:update"></ha-icon><b>${x.upd ? AGO(x.upd) : '—'}</b><span>Seen</span></div></div></div>`;
      }).join('');
    }
    /* ---------- security ---------- */
    _renderAlarm() {
      const i = this._alInfo(), row = this._$('arow'), m = this._$('modes'), r = this._$('secr'); if (!row) return;
      if (!i) { row.innerHTML = '<div class="qs">Alarm not found</div>'; return; }
      const col = i.s === 'triggered' ? 'red' : i.s === 'disarmed' ? 'grey' : i.cls === 'wait' ? 'amber' : 'green';
      if (r) r.innerHTML = `<span class="${i.s === 'triggered' ? 'qbad' : i.s === 'disarmed' ? '' : 'qok'}">${E(i.label)}</span>`;
      const det = i.open.length ? i.open.join(', ') + ' open' : i.moving.length ? 'Motion · ' + i.moving.join(', ') : 'All doors closed';
      row.innerHTML = `${IB(i.icon, col)}<div class="qx"><div class="qnm">${E(this._c.alarm.name || 'Alarm')}</div><div class="qs${i.open.length ? ' qwarn' : ''}">${E(i.label)} · ${E(det)}</div></div><ha-icon icon="mdi:chevron-right" style="color:var(--gs)"></ha-icon>`;
      const b = (mode, ic, t) => `<button class="${i.mode === mode ? 'qsel' : ''}${this._alConf === mode ? ' qconf' : ''}" data-act="arm" data-m="${mode}"><ha-icon icon="${ic}"></ha-icon>${this._alConf === mode ? 'Confirm' : t}</button>`;
      m.innerHTML = b('disarm', 'mdi:shield-off-outline', 'Off') + b('home', 'mdi:home-lock', 'Home') + b('away', 'mdi:shield-lock', 'Away');
    }
    _renderDoors() {
      const A = this._c.alarm || {}, el = this._$('doors'), r = this._$('doorr'), acts = this._$('dacts'); if (!el) return;
      const nm = x => x.name || ((this._st(x.entity) || { attributes: {} }).attributes.friendly_name || x.entity);
      const tile = (x, kind) => { const e = this._st(x.entity), on = e && e.state === 'on', na = !e || e.state === 'unavailable';
        const col = kind === 'door' ? 'orange' : 'amber', icon = kind === 'door' ? (on ? 'mdi:door-open' : 'mdi:door-closed') : (on ? 'mdi:motion-sensor' : 'mdi:motion-sensor-off');
        const st = na ? 'Unavailable' : kind === 'door' ? (on ? 'Open' : 'Closed') : (on ? 'Motion' : 'Clear · ' + AGO(e.last_changed));
        return `<div class="qin qdt${on ? ' qon' : ''}" style="--c:${RGB[col]}" data-act="more" data-id="${E(x.entity)}">${IB(icon, on ? col : 'grey', 1)}<div class="qx"><div class="qnm">${E(nm(x))}</div><div class="qs">${st}</div></div></div>`; };
      const open = (A.doors || []).filter(x => (this._st(x.entity) || {}).state === 'on').length, mov = (A.motion || []).filter(x => (this._st(x.entity) || {}).state === 'on').length;
      if (r) r.innerHTML = open ? `<span class="qwarn">${open} open</span>` : mov ? `<span class="qwarn">Motion</span>` : '<span class="qok">All closed</span>';
      const mo = [...(A.motion || [])].sort((a, b) => ((this._st(b.entity) || {}).state === 'on') - ((this._st(a.entity) || {}).state === 'on')).slice(0, this._c.motion_items || 2);
      el.innerHTML = `<div class="qdgrid">${(A.doors || []).map(x => tile(x, 'door')).join('')}${mo.map(x => tile(x, 'motion')).join('')}</div>`;
      const v = this._c.vacuum ? this._vInfo() : null, d = this._c.doorbell;
      const va = !v ? '' : v.s === 'cleaning' ? `<button class="qrun" data-act="vac"><ha-icon icon="mdi:robot-vacuum" style="color:rgb(${RGB.green})"></ha-icon>${E(v.name)} · Cleaning</button>`
        : `<button class="${v.cls === 'err' ? 'qerr' : ''}" data-act="vac"><ha-icon icon="${v.icon}" style="color:rgb(${v.cls === 'err' ? RGB.red : RGB.teal})"></ha-icon>${E(v.name)} · ${E(v.label.replace(' · charging', ''))}</button>`;
      acts.innerHTML = va + (d ? `<button data-act="door"><ha-icon icon="mdi:doorbell-video"></ha-icon>${E(d.name || 'Front door')}</button>` : '');
      if (!va && !d) acts.style.display = 'none';
    }
    /* ---------- calendar ---------- */
    _renderCal() {
      const el = this._$('evs'), r = this._$('calr'); if (!el) return;
      if (!this._events) { el.innerHTML = '<div class="qnone">Loading…</div>'; return; }
      const now = new Date(), t0 = new Date(now); t0.setHours(0, 0, 0, 0); const eod = new Date(t0); eod.setDate(eod.getDate() + 1);
      const live = this._events.filter(e => e.f > now), today = live.filter(e => e.s < eod).length;
      if (r) r.textContent = today ? today + ' today' : 'Free today';
      const dl = e => { const x = new Date(e.s); x.setHours(0, 0, 0, 0); const n = Math.round((x - t0) / 86400000); return n <= 0 ? 'Today' : n === 1 ? 'Tomorrow' : n < 7 ? DOWL[x.getDay()] : DOW[x.getDay()] + ' ' + x.getDate() + ' ' + MON[x.getMonth()]; };
      const items = live.slice(0, this._c.calendar_items || 5);
      el.innerHTML = items.length ? items.map(e => { const d = e.s < t0 ? now : e.s, isLive = !e.allDay && e.s <= now, col = HEX(this._calColor(e.ci));
        return `<div class="qin qev${isLive ? ' qlive' : ''}" style="--c:${col}" data-act="cal"><div class="qdd"><b>${d.getDate()}</b><span>${MON[d.getMonth()].toUpperCase()}</span></div>
          <div class="qx"><div class="qt">${E(e.title)}</div><div class="qs"><i></i>${isLive ? 'Now' : dl(e)}${e.allDay ? ' · All day' : ' · ' + TS(e.s)} · ${E(this._c.calendars[e.ci].name || '')}</div></div></div>`; }).join('')
        : '<div class="qnone">Nothing in the next two weeks</div>';
      requestAnimationFrame(() => { const H = el.clientHeight; [...el.children].forEach(n => { n.style.visibility = n.offsetTop - el.offsetTop + n.offsetHeight > H + 1 ? 'hidden' : ''; }); });
      if (this._calOpen) this._renderCalPop();
      if (this._built) this._renderTick();
    }
    /* ---------- rooms ---------- */
    _roomLights(r) { return (r.lights || []).map(l => typeof l === 'string' ? l : l.entity); }
    _renderRooms() {
      const el = this._$('rooms'), hr = this._$('roomr'), rooms = this._c.rooms || []; if (!el) return;
      let tot = 0;
      el.innerHTML = rooms.map((r, i) => {
        const ls = this._roomLights(r), on = ls.filter(id => (this._st(id) || {}).state === 'on').length; tot += on;
        const t = NUM((this._st(r.temperature) || {}).state), h = NUM((this._st(r.humidity) || {}).state), cl = this._st(r.climate);
        const ct = t != null ? t : cl ? NUM(cl.attributes.current_temperature) : null, heating = cl && cl.attributes.hvac_action === 'heating';
        const sub = [ct != null ? R1(ct) + '°' : '', h != null ? Math.round(h) + '%' : '', on ? on + ' on' : ls.length ? 'Lights off' : ''].filter(Boolean).join(' · ');
        return `<div class="qin qrm${on ? ' qlit' : ''}" data-act="room" data-i="${i}">${IB(r.icon || 'mdi:door', on ? 'amber' : 'grey')}
          <div class="qtx"><div class="qnm">${E(r.name)}</div><div class="qs">${heating ? `<span class="qht"><ha-icon icon="mdi:fire"></ha-icon>${R0(cl.attributes.temperature)}°</span> ` : ''}${E(sub || '—')}</div></div>${ls.length ? `<button class="qbb${on ? ' qon' : ''}" data-act="rtog" data-i="${i}"><ha-icon icon="${on ? 'mdi:lightbulb-on' : 'mdi:lightbulb-outline'}"></ha-icon></button>` : ''}</div>`;
      }).join('');
      if (hr) hr.innerHTML = tot ? `<span class="qwarn">${tot} light${tot === 1 ? '' : 's'} on</span>` : 'All lights off';
    }
    /* ---------- weather ---------- */
    _renderWx() {
      const el = this._$('wxb'), r = this._$('wxr'), w = this._st(this._c.weather); if (!el) return;
      if (!w) { el.innerHTML = '<div class="qnone">Weather unavailable</div>'; return; }
      const a = w.attributes, d = this._daily || [], h = (this._hourly || []).filter(x => typeof x.temperature === 'number'), tin = this._inside();
      if (r) r.textContent = `${R0(a.humidity)}% humidity${a.wind_speed != null ? ' · ' + R0(a.wind_speed) + ' ' + (a.wind_speed_unit || '') : ''}`;
      const hi = d[0] ? d[0].temperature : null, lo = d[0] ? d[0].templow : null;
      el.innerHTML = `<div class="qwnow" data-act="wx">${WI(w.state, 0, 'big')}<div><div class="qtv">${R0(a.temperature)}<sup>°</sup></div></div><div style="min-width:0"><div class="qcd">${E(WXL[w.state] || w.state)}</div>
          <div class="qs">H ${R0(hi)}° · L ${R0(lo)}°${tin != null ? ` · Inside ${R1(tin)}°` : ''}</div></div></div>
        <div class="qhrs" data-act="wx">${h.slice(0, 6).map((x, i) => `<div><span>${i === 0 ? 'Now' : HS(new Date(x.datetime).getHours())}</span>${WI(x.condition)}<b>${R0(x.temperature)}°</b></div>`).join('') || '<div class="qnone" style="grid-column:1/-1">Loading forecast…</div>'}</div>
        <div class="qdys" data-act="wx">${d.slice(0, 5).map((x, i) => { const mm = NUM(x.precipitation); return `<div><span>${i === 0 ? 'Today' : DOW[new Date(x.datetime).getDay()]}</span>${WI(x.condition)}<b>${R0(x.temperature)}° <small>${R0(x.templow)}°</small></b>${mm ? `<em>${Math.round(mm * 10) / 10}mm</em>` : ''}</div>`; }).join('')}</div>`;
      const rr = this._$('radr');
      if (rr) { const nx = (this._hourly || []).slice(0, 3).map(x => this._popAt(x)).filter(v => v != null), mx = nx.length ? Math.max(...nx) : null;
        const wet = (this._hourly || []).slice(0, 3).some(x => (NUM(x.precipitation) || 0) > 0);
        rr.innerHTML = mx == null ? '' : `<span class="${mx >= 50 || wet ? 'qwarn' : 'qok'}">${mx >= 20 || wet ? 'Rain ' + mx + '% next 3h' : 'Dry next 3h'}</span>`; }
    }
    /* ---------- home vs outside ---------- */
    _fetchHist() {
      if (!this._hass || this._g.busy) return;
      if (this._g.histAt && Date.now() - this._g.histAt < 900000) return;
      const ids = (this._c.rooms || []).map(r => r.temperature).filter(Boolean); if (!ids.length) return;
      this._g.busy = true;
      const end = new Date(), start = new Date(end - 48 * 3600000);
      const cf = this._hass.config || {};
      const inside = this._hass.callWS({ type: 'history/history_during_period', start_time: start.toISOString(), end_time: end.toISOString(), entity_ids: ids, minimal_response: true, no_attributes: true, significant_changes_only: false })
        .then(res => { this._g.hist = ids.map(id => ((res && res[id]) || []).map(x => [x.lu != null ? x.lu * 1000 : Date.parse(x.last_updated || x.last_changed), NUM(x.s != null ? x.s : x.state)]).filter(p => p[1] != null && isFinite(p[0])).sort((a, b) => a[0] - b[0])); })
        .catch(() => { this._g.hist = this._g.hist || null; });
      const outside = cf.latitude == null ? Promise.resolve() : fetch(`https://api.open-meteo.com/v1/forecast?latitude=${cf.latitude}&longitude=${cf.longitude}&hourly=temperature_2m&past_days=2&forecast_days=1&timezone=UTC`)
        .then(r => r.ok ? r.json() : null).then(j => { if (j && j.hourly) { this._g.out = j.hourly.time.map((t, i) => [Date.parse(t + ':00Z'), j.hourly.temperature_2m[i]]).filter(p => p[1] != null); this._g.outAt = Date.now(); } }).catch(() => {});
      Promise.all([inside, outside]).finally(() => { this._g.busy = false; this._g.histAt = Date.now(); this._update(); });
    }
    _renderHvo() {
      const el = this._$('hvo'), ch = this._$('hvc'), r = this._$('hvor'); if (!el) return;
      const tin = this._inside(), w = this._st(this._c.weather), now = Date.now(), t0 = now - 48 * 3600000;
      const N = 97, xs = [...Array(N)].map((_, i) => t0 + i * 1800000);
      const at = (ser, t) => { let v = null; for (const p of ser) { if (p[0] <= t) v = p[1]; else break; } return v != null ? v : (ser[0] && ser[0][0] - t < 3 * 3600000 ? ser[0][1] : null); };
      const hs = this._g.hist || [], home = xs.map(t => { const v = hs.map(s => at(s, t)).filter(x => x != null); return v.length ? v.reduce((a, b) => a + b, 0) / v.length : null; });
      const os = this._g.out || [], lin = t => { for (let i = 1; i < os.length; i++) if (os[i][0] >= t) { const [a, va] = os[i - 1], [b, vb] = os[i]; return t < a ? null : va + (vb - va) * (t - a) / (b - a); } return null; };
      const out = xs.map(lin);
      const oNow = w && NUM(w.attributes.temperature) != null ? NUM(w.attributes.temperature) : out.filter(x => x != null).slice(-1)[0];
      if (home.length && tin != null) home[N - 1] = tin; if (oNow != null) out[N - 1] = oNow;
      if (r) r.textContent = 'Last 48 hours';
      const dl = tin != null && oNow != null ? tin - oNow : null;
      el.innerHTML = `<div><div class="qk"><i style="background:rgb(${RGB.blue})"></i>Home</div><div class="qv">${R1(tin)}°</div></div>
        <div><div class="qk"><i style="background:rgb(${RGB.amber})"></i>Outside</div><div class="qv">${R1(oNow)}°</div></div>
        ${dl != null ? `<div class="qdl"><b class="${dl >= 0 ? 'qok' : 'qwarn'}">${dl >= 0 ? '+' : ''}${R1(dl)}°</b><span>${dl >= 0 ? 'warmer' : 'colder'} inside</span></div>` : ''}`;
      const all = [...home, ...out].filter(x => x != null);
      if (all.length < 4) { ch.innerHTML = '<div class="qnone">Collecting history…</div>'; return; }
      const lo = Math.floor(Math.min(...all) - 1), hi = Math.ceil(Math.max(...all) + 1), W = 300, H = 100;
      const Y = v => (H - (v - lo) / (hi - lo) * H).toFixed(1), X = i => (i / (N - 1) * W).toFixed(1);
      const path = arr => { let d = '', pen = false; arr.forEach((v, i) => { if (v == null) { pen = false; return; } d += (pen ? 'L' : 'M') + X(i) + ',' + Y(v); pen = true; }); return d; };
      const area = arr => { const f = arr.findIndex(v => v != null), l = arr.length - 1 - [...arr].reverse().findIndex(v => v != null); if (f < 0) return ''; return path(arr.map((v, i) => i < f || i > l ? null : v == null ? arr.slice(0, i).filter(x => x != null).pop() : v)) + `L${X(l)},${H}L${X(f)},${H}Z`; };
      const mid = [lo, (lo + hi) / 2, hi].map(v => `<line x1="0" x2="${W}" y1="${Y(v)}" y2="${Y(v)}" stroke="rgba(255,255,255,.06)" stroke-dasharray="2 4"/><text x="${W}" y="${+Y(v) - 2}" text-anchor="end" font-size="8" fill="#5f6b7d" font-weight="700">${Math.round(v)}°</text>`).join('');
      ch.innerHTML = `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none"><defs><linearGradient id="gh" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="rgb(${RGB.blue})" stop-opacity=".35"/><stop offset="1" stop-color="rgb(${RGB.blue})" stop-opacity="0"/></linearGradient>
        <linearGradient id="go" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="rgb(${RGB.amber})" stop-opacity=".28"/><stop offset="1" stop-color="rgb(${RGB.amber})" stop-opacity="0"/></linearGradient></defs>${mid}
        <path d="${area(out)}" fill="url(#go)"/><path d="${area(home)}" fill="url(#gh)"/>
        <path d="${path(out)}" fill="none" stroke="rgb(${RGB.amber})" stroke-width="1.8" vector-effect="non-scaling-stroke" stroke-linejoin="round"/>
        <path d="${path(home)}" fill="none" stroke="rgb(${RGB.blue})" stroke-width="2.2" vector-effect="non-scaling-stroke" stroke-linejoin="round"/></svg>`;
    }
    /* ---------- energy ---------- */
    _renderEnergy() {
      const fl = this._$('flow'), bx = this._$('ebx'), r = this._$('enr'); if (!fl) return;
      const L = this._c.energy ? this._enLive() : null;
      if (!L) { fl.innerHTML = '<div class="qnone">No energy meter configured</div>'; return; }
      if (r) r.innerHTML = L.phs ? `<span class="qok">${E(L.phs)}</span>` : '';
      const kw = L.p != null ? L.p / 1000 : null, sp = kw ? Math.max(.45, 2.4 - Math.min(kw, 6) * .32) : 0;
      const ec = kw == null ? RGB.grey : kw < 1 ? RGB.green : kw < 3 ? RGB.amber : RGB.red;
      fl.innerHTML = `<svg viewBox="0 0 300 100" preserveAspectRatio="none">
          <path class="qln" d="M45,46 L150,46"/><path class="qln" d="M255,46 L150,46"/>
          ${kw ? `<path class="qfl" style="stroke:rgb(${ec});--sp:${sp.toFixed(2)}s" d="M45,46 L150,46"/>` : ''}
          ${L.g ? `<path class="qfl" style="stroke:rgb(${RGB.orange});--sp:2.6s" d="M255,46 L150,46"/>` : ''}</svg>
        <div class="qnd qsm" style="left:15%;top:46%;--c:${ec}"><ha-icon icon="mdi:transmission-tower"></ha-icon><b>${kw == null ? '—' : kw < 1 ? Math.round(kw * 1000) + 'W' : kw.toFixed(2) + 'kW'}</b></div>
        <div class="qnd qhome" style="left:50%;top:46%;--c:${RGB.blue}"><ha-icon icon="mdi:home-lightning-bolt-outline"></ha-icon><b>${R1(L.e)}</b><span>kWh</span></div>
        <div class="qnd qsm" style="left:85%;top:46%;--c:${RGB.orange}"><ha-icon icon="mdi:fire"></ha-icon><b>${R1(L.g)}</b><span>kWh</span></div>
        <div class="qnlab" style="left:15%;bottom:0">GRID NOW</div><div class="qnlab" style="left:50%;bottom:0">ELECTRIC TODAY</div><div class="qnlab" style="left:85%;bottom:0">GAS TODAY</div>`;
      bx.innerHTML = `<div class="qin"><div class="qk">Electric</div><b>${GBP(L.ec)}</b><div class="qs">${R1(L.e)} kWh${L.rate != null ? ' · ' + (L.rate < 1 ? Math.round(L.rate * 100) + 'p' : '£' + L.rate.toFixed(2)) : ''}</div></div>
        <div class="qin"><div class="qk">Gas</div><b>${GBP(L.gc)}</b><div class="qs">${R1(L.g)} kWh</div></div>
        <div class="qin"><div class="qk">Total</div><b class="qok">${GBP(L.cost)}</b><div class="qs">${this._en && this._en.mtd && this._en.mtd.n ? GBP(this._en.mtd.ec + this._en.mtd.gc) + ' this month' : 'today'}</div></div>`;
    }
    /* ---------- car ---------- */
    _renderCar() {
      const h = this._$('chero'), b = this._$('cbars'), bt = this._$('cbt'), r = this._$('carr'); if (!h) return;
      if (!this._cars.length) { h.innerHTML = '<div class="qnone">No car configured</div>'; return; }
      const c = this._carInfo(0), s = this._carStatus(c);
      const sc = v => v == null ? RGB.grey : v < 20 ? RGB.red : v < 50 ? RGB.amber : RGB.green;
      if (r) r.innerHTML = `<span class="${c.charging ? 'qok' : c.err ? 'qbad' : ''}">${E(c.charging ? 'Charging' : c.label)}</span>`;
      h.innerHTML = `<div class="qcx"><div class="qsoc">${c.soc != null ? Math.round(c.soc) : '—'}<sup>%</sup></div><div class="qs">${c.range != null ? Math.round(c.range) + ' ' + c.unit + ' range' : '—'}</div>
        ${c.charging && c.endT ? `<div class="qs qok">Full by ${T12(c.endT)}</div>` : ''}</div>${c.img ? `<img src="${E(c.img)}" alt="" onerror="this.style.display='none'">` : ''}`;
      b.innerHTML = this._cars.map((_, i) => { const x = this._carInfo(i);
        return `<div class="qbar" style="--c:${sc(x.soc)}" data-act="car" data-i="${i}"><ha-icon icon="${x.charging ? 'mdi:battery-charging' : 'mdi:battery-high'}"></ha-icon><div class="qtr"><i style="width:${x.soc || 0}%"></i></div><span>${this._cars.length > 1 ? E(x.name) + ' · ' : ''}${x.soc != null ? Math.round(x.soc) + '%' : '—'}${x.range != null ? ' · ' + Math.round(x.range) + ' ' + x.unit : ''}</span></div>`; }).join('');
      const plugged = c.charging || (/plug/i.test(c.label) && !/not/i.test(c.label)) || /charged/i.test(c.label);
      bt.innerHTML = `<div class="${c.locked ? 'qg' : c.locked === false ? 'qa' : ''}" data-act="car" data-i="0"><ha-icon icon="${c.locked ? 'mdi:lock' : 'mdi:lock-open-variant'}"></ha-icon>${c.locked == null ? 'Doors —' : c.locked ? 'Locked' : 'Unlocked'}</div>
        <div class="${c.charging ? 'qg' : plugged ? 'qg' : ''}" data-act="car" data-i="0"><ha-icon icon="${s.icon}"></ha-icon>${c.charging ? 'Charging' : plugged ? 'Plugged in' : 'Unplugged'}</div>`;
    }
    /* ---------- music ---------- */
    _renderMusic() {
      const el = this._$('music'), ct = this._$('mct'), r = this._$('musr'); if (!el) return;
      const p = this._npPick(), e = p && this._st(p[0]);
      if (!e) {
        if (r) r.textContent = '';
        el.innerHTML = `<div class="qvin"><div class="qlb" style="background:#334155"></div></div><div class="qx"><div class="qt">Nothing playing</div><div class="qs">Tap to start Spotify or Sonos</div></div>`;
        ct.className = 'qmct qdis'; ct.innerHTML = '<button><ha-icon icon="mdi:skip-previous"></ha-icon></button><button class="qpp"><ha-icon icon="mdi:play"></ha-icon></button><button><ha-icon icon="mdi:skip-next"></ha-icon></button>';
        const bar = this._$('mbar'); if (bar) bar.style.width = '0'; return;
      }
      const a = e.attributes, playing = e.state === 'playing', ctl = this._ctl(e);
      if (r) r.innerHTML = `<span style="color:rgb(${RGB.purple})">${E((ctl || e).attributes.friendly_name || '')}</span>`;
      el.innerHTML = `<div class="qvin${playing ? ' qspin' : ''}"><div class="qlb"${a.entity_picture ? ` style="background-image:url('${E(a.entity_picture)}')"` : ''}></div></div>
        <div class="qx"><div class="qk" style="color:${playing ? 'rgb(' + RGB.green + ')' : 'var(--gs)'}">${playing ? 'Now playing' : 'Paused'}</div><div class="qt">${E(a.media_title || '')}</div><div class="qs">${E(a.media_artist || a.media_album_name || '')}</div></div>`;
      ct.className = 'qmct' + (ctl ? '' : ' qdis');
      ct.innerHTML = `<button data-act="mp" data-svc="media_previous_track"><ha-icon icon="mdi:skip-previous"></ha-icon></button><button class="qpp" data-act="mp" data-svc="media_play_pause"><ha-icon icon="${playing ? 'mdi:pause' : 'mdi:play'}"></ha-icon></button><button data-act="mp" data-svc="media_next_track"><ha-icon icon="mdi:skip-next"></ha-icon></button>`;
      this._musicProg();
    }
    /* ---------- taps ---------- */
    _go(path) { if (!path) return; history.pushState(null, '', path); window.dispatchEvent(new CustomEvent('location-changed')); }
    _click(e) {
      const path = e.composedPath(), t = path.find(n => n.dataset && n.dataset.act);
      const act = t && t.dataset.act;
      if (act === 'nav') return this._go(t.dataset.path);
      if (act === 'golights') { if (this._c.lights_path) this._go(this._c.lights_path); return; }
      if (act === 'rtog') { const r = (this._c.rooms || [])[+t.dataset.i]; if (!r) return; const ls = this._roomLights(r), on = ls.some(id => (this._st(id) || {}).state === 'on');
        this._hass.callService('light', on ? 'turn_off' : 'turn_on', { entity_id: ls }); return; }
      if (act === 'room') { const r = (this._c.rooms || [])[+t.dataset.i]; if (!r) return; const ls = this._roomLights(r);
        if (r.climate) return this._more(r.climate); if (ls.length === 1) return this._more(ls[0]); if (r.temperature) return this._more(r.temperature); if (this._c.lights_path) this._go(this._c.lights_path); return; }
      return super._click(e);
    }
  }
  customElements.define('home-glass-card', HomeGlassCard);
  window.customCards = window.customCards || [];
  window.customCards.push({ type: 'home-glass-card', name: 'Home Glass Card', description: 'Dark glass wall-tablet panel' });
});
