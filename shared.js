/* ══════════════════════════════════════════════════
   LoriBots – Shared Utilities (shared.js)
   Include this on every page BEFORE page-specific JS
══════════════════════════════════════════════════ */

/* ── THEME ── */
/* Read saved preference; default = light */
let isDark = localStorage.getItem('lb-theme') === 'dark';

function applyTheme() {
  document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  document.querySelectorAll('.thbtn').forEach(b => {
    b.innerHTML = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
  });
}

function toggleTheme() {
  isDark = !isDark;
  localStorage.setItem('lb-theme', isDark ? 'dark' : 'light');
  applyTheme();
}

/* Apply on every page load */
document.addEventListener('DOMContentLoaded', applyTheme);

/* ── TOAST ── */
function toast(msg, type = 'ok') {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.className = type === 'err' ? 'err show' : 'show';
  clearTimeout(el._t);
  el._t = setTimeout(() => el.className = '', 3000);
}

/* ── FILTER CHIPS ── */
function chip(el) {
  el.closest('.chips').querySelectorAll('.chip').forEach(c => c.classList.remove('on'));
  el.classList.add('on');
}

/* ── STAR RATING ── */
const rSt = {};
function setRating(id, v) {
  rSt[id] = v;
  document.querySelectorAll(`#sr-${id} .star`).forEach((s, i) => s.classList.toggle('lit', i < v));
}

/* ── FAKE FILE UPLOAD ── */
function fakeUp(el) {
  el.innerHTML = '✅ Uploaded';
  el.style.borderColor = 'var(--gl)';
  el.style.color = 'var(--gl)';
}

/* ── CHAT SEND MESSAGE ── */
function sendMsg() {
  const i = document.getElementById('ci');
  if (!i || !i.value.trim()) return;
  const m = document.getElementById('cm');
  const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  m.innerHTML += `<div><div class="msg me">${i.value}</div><div class="mt" style="text-align:right">${now}</div></div>`;
  i.value = '';
  m.scrollTop = m.scrollHeight;
}

/* ── MAP WIDGET ── */
function mapWidget(label) {
  return `
    <div class="mapbox">
      <div class="mgrid"></div>
      <div class="mroute"></div>
      <div class="mpin a"></div>
      <div class="mpin b"></div>
      <div class="mov">
        <div style="font-size:.8rem">🗺️</div>
        <div class="xs mu mt1">${label}</div>
        <div class="xs am mt1">● 23 km away · ETA 38 min</div>
      </div>
    </div>`;
}

/* ── CHAT WIDGET ── */
function chatWidget(name) {
  return `
    <div class="chatbox">
      <div class="ctop">💬 <span class="am">${name}</span>
        <span class="bdg bgg" style="margin-left:auto">Online</span>
      </div>
      <div class="cmsgs" id="cm">
        <div><div class="msg th">Hello, on my way to pickup. ETA 15 min.</div><div class="mt">09:15</div></div>
        <div><div class="msg me">Great! Gate open. Ask for Kefilwe.</div><div class="mt" style="text-align:right">09:17</div></div>
        <div><div class="msg th">Got it, thank you 👍</div><div class="mt">09:18</div></div>
      </div>
      <div class="cfoot">
        <input id="ci" placeholder="Type a message…" onkeydown="if(event.key==='Enter')sendMsg()"/>
        <button class="btn ba bsm" onclick="sendMsg()">Send</button>
      </div>
    </div>`;
}

/* ── KPI CARD ── */
function kpi(value, label, delta, up) {
  return `
    <div class="kpi">
      <div class="kv">${value}</div>
      <div class="kl">${label}</div>
      ${delta ? `<div class="kd ${up ? 'ku' : 'kdn'}">${up ? '↑' : '↓'} ${delta}</div>` : ''}
    </div>`;
}

/* ── BAR CHART ── */
function barChart(data) {
  return `<div class="bars">${data.map(d =>
    `<div class="barc">
      <div class="bar" style="height:${Math.round(d.v / d.mx * 72)}px"></div>
      <div class="barL">${d.l}</div>
    </div>`
  ).join('')}</div>`;
}

/* ── NOTIFICATION LIST ── */
function notifList() {
  const items = [
    { ic: '💰', msg: 'Your bid on Job #1039 was accepted.', t: '2 min ago', n: true },
    { ic: '📦', msg: 'New job posted: Curtainsider needed, Gaborone → Maun.', t: '14 min ago', n: true },
    { ic: '⭐', msg: '5-star review received from Bontle Express for Job #1038.', t: '1h ago', n: false },
    { ic: '💬', msg: 'New message from Oitshepile on Job #1042.', t: '2h ago', n: false },
    { ic: '✅', msg: 'Payment of P7,020 deposited for Job #1038.', t: 'Yesterday', n: false },
  ];
  return `<div style="border:1px solid var(--border);border-radius:var(--r);overflow:hidden;">
    ${items.map(n => `
      <div class="ni">
        ${n.n ? '<div class="ndot"></div>' : ''}
        <div class="nico">${n.ic}</div>
        <div class="nb"><p>${n.msg}</p><span>${n.t}</span></div>
      </div>`).join('')}
  </div>`;
}

/* ── CLOSE MODAL ON BACKDROP ── */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.ov').forEach(o =>
    o.addEventListener('click', e => { if (e.target === o) o.classList.remove('open'); })
  );
});
