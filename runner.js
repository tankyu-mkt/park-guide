// パークランナー：公園を走って、ごみをひろい、障害物をよけるゲーム
const cv = document.getElementById("game");
const ctx = cv.getContext("2d");
const stage = document.getElementById("stage");
const overlay = document.getElementById("overlay");
const ovStart = document.getElementById("ovStart");
const ovOver = document.getElementById("ovOver");
const finalEl = document.getElementById("final");

const W = 600, H = 360, GROUND = H - 64;
const dpr = window.devicePixelRatio || 1;
cv.width = W * dpr;
cv.height = H * dpr;
ctx.scale(dpr, dpr);

const EMOJI = '"Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif';
const LITTER = ["🥤", "🍌", "🍾", "🥫"];
const mod = (a, n) => ((a % n) + n) % n;

let state = "ready"; // ready（はじまる前）/ playing / over
let player, things, particles, speed, dist, got, shake, spawnIn;
let scroll = 0, overAt = 0, last = 0, best = 0;
try { best = Number(localStorage.getItem("runnerBest")) || 0; } catch (e) {}

// 背景の木
const trees = [];
for (let i = 0; i < 8; i++) {
  trees.push({ x: i * 95 + Math.random() * 50, s: 34 + Math.random() * 20 });
}

function score() { return Math.floor(dist / 10) + got * 10; }

function reset() {
  player = { x: 80, y: GROUND, vy: 0 };
  things = [];
  particles = [];
  speed = 300; dist = 0; got = 0; shake = 0; spawnIn = 1;
}

function start() {
  reset();
  state = "playing";
  overlay.hidden = true;
}

function gameOver() {
  state = "over";
  overAt = performance.now();
  shake = 0.5;
  burst(player.x + 20, player.y - 30, "#ff7a59", 16);
  const s = score();
  if (s > best) {
    best = s;
    try { localStorage.setItem("runnerBest", best); } catch (e) {}
  }
  finalEl.textContent = "⭐ " + s + "　🏆 " + best;
  setTimeout(function () {
    if (state === "over") {
      ovStart.hidden = true;
      ovOver.hidden = false;
      overlay.hidden = false;
    }
  }, 350);
}

function burst(x, y, color, n) {
  for (let i = 0; i < n; i++) {
    const a = Math.random() * Math.PI * 2, v = 80 + Math.random() * 180;
    particles.push({ x: x, y: y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 80, life: 1, c: color });
  }
}

// 障害物・ハト・ごみを出す
function spawn() {
  const r = Math.random();
  if (r < 0.45) {
    things.push({ k: "barrier", x: W + 40, y: GROUND, w: 34, h: 44, e: "🚧" });
  } else if (r < 0.65 && speed > 360) {
    things.push({ k: "pigeon", x: W + 40, y: GROUND - 85, w: 34, h: 26, e: "🕊️", extra: 110 });
  } else {
    const high = Math.random() < 0.5;
    things.push({ k: "litter", x: W + 40, y: GROUND - (high ? 95 : 6), w: 30, h: 30,
                  e: LITTER[Math.floor(Math.random() * LITTER.length)] });
  }
  spawnIn = 0.85 + Math.random() * 0.9; // 飛びこえられる間隔をあける
}

const hit = (a, b) => a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;

function update(dt) {
  speed = Math.min(300 + dist / 40, 640);
  dist += speed * dt;
  scroll = dist;

  player.vy += 2300 * dt;
  player.y += player.vy * dt;
  if (player.y >= GROUND) { player.y = GROUND; player.vy = 0; }

  spawnIn -= dt;
  if (spawnIn <= 0) spawn();

  const pr = { x: player.x + 12, y: player.y - 54, w: 16, h: 52 };
  for (const t of things) {
    t.x -= (speed + (t.extra || 0)) * dt;
    const tr = { x: t.x + 4, y: t.y - t.h + 4, w: t.w - 8, h: t.h - 8 };
    if (!t.done && hit(pr, tr)) {
      if (t.k === "litter") {
        t.done = true;
        got++;
        burst(t.x + t.w / 2, t.y - t.h / 2, "#ffd84d", 10);
      } else {
        gameOver();
        return;
      }
    }
  }
  things = things.filter(t => !t.done && t.x > -60);
}

// ---- 絵をかく ----
function blob(x, y, rx, ry) {
  ctx.beginPath();
  ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
  ctx.fill();
}

function hills(color, base, amp, f, len) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(0, GROUND);
  for (let x = 0; x <= W; x += 8) {
    const p = (x + scroll * f) / len;
    ctx.lineTo(x, base - amp * Math.sin(p) - amp * 0.4 * Math.sin(p / 0.37));
  }
  ctx.lineTo(W, GROUND);
  ctx.closePath();
  ctx.fill();
}

function drawPlayer() {
  const x = player.x + 20, y = player.y, air = y < GROUND - 1;
  const sw = air ? 0.9 : Math.sin(dist / 14);
  ctx.fillStyle = "rgba(0,0,0,.18)";
  blob(x, GROUND + 4, Math.max(8, 20 - (GROUND - y) / 9), 5);
  ctx.save();
  ctx.translate(x, y);
  ctx.lineCap = "round";
  ctx.strokeStyle = "#2c3e50"; ctx.lineWidth = 7;           // 足
  ctx.beginPath();
  ctx.moveTo(0, -20); ctx.lineTo(sw * 14, -2);
  ctx.moveTo(0, -20); ctx.lineTo(-sw * 14, -2);
  ctx.stroke();
  ctx.strokeStyle = "#2f7d4f"; ctx.lineWidth = 14;           // からだ
  ctx.beginPath(); ctx.moveTo(0, -22); ctx.lineTo(3, -38); ctx.stroke();
  ctx.strokeStyle = "#f2c9a0"; ctx.lineWidth = 5;            // うで
  ctx.beginPath(); ctx.moveTo(2, -36); ctx.lineTo(2 - sw * 12, -26); ctx.stroke();
  ctx.fillStyle = "#f2c9a0"; blob(5, -50, 9, 9);             // 頭
  ctx.fillStyle = "#f2c94c";                                 // ぼうし
  ctx.beginPath(); ctx.arc(5, -52, 9, Math.PI, 0); ctx.fill();
  ctx.fillRect(5, -53, 13, 3);
  ctx.restore();
}

function draw() {
  ctx.save();
  if (shake > 0) ctx.translate((Math.random() - 0.5) * shake * 24, (Math.random() - 0.5) * shake * 24);

  // 空と太陽
  const sky = ctx.createLinearGradient(0, 0, 0, GROUND);
  sky.addColorStop(0, "#7ec8f5"); sky.addColorStop(1, "#e6f6ff");
  ctx.fillStyle = sky; ctx.fillRect(-20, -20, W + 40, H + 40);
  const sun = ctx.createRadialGradient(W - 100, 70, 8, W - 100, 70, 70);
  sun.addColorStop(0, "#fff6b0"); sun.addColorStop(0.35, "#ffe066"); sun.addColorStop(1, "rgba(255,224,102,0)");
  ctx.fillStyle = sun; ctx.fillRect(W - 170, 0, 140, 140);

  // 雲（ゆっくり）
  ctx.fillStyle = "rgba(255,255,255,.85)";
  for (let i = 0; i < 4; i++) {
    const x = mod(i * 200 - scroll * 0.06, W + 160) - 80, y = 50 + (i % 2) * 40;
    blob(x, y, 34, 13); blob(x + 20, y - 8, 22, 13); blob(x - 18, y - 4, 18, 10);
  }

  // 遠くの丘、近くの丘、木
  hills("#a8dcb5", GROUND - 50, 18, 0.15, 90);
  hills("#7cc795", GROUND - 22, 12, 0.3, 60);
  for (const t of trees) {
    const x = mod(t.x - scroll * 0.6, W + 120) - 60;
    ctx.font = t.s + "px " + EMOJI; ctx.textBaseline = "bottom"; ctx.textAlign = "center";
    ctx.fillText("🌳", x, GROUND + 2);
  }

  // 地面
  ctx.fillStyle = "#5fb27b"; ctx.fillRect(-20, GROUND, W + 40, H - GROUND + 20);
  ctx.fillStyle = "#4a9d66"; ctx.fillRect(-20, GROUND, W + 40, 8);
  ctx.fillStyle = "rgba(255,255,255,.13)";
  for (let i = 0; i < 12; i++) ctx.fillRect(mod(i * 60 - scroll, W + 60) - 60, GROUND + 18, 30, 8);

  // 障害物・ハト・ごみ
  ctx.textAlign = "left"; ctx.textBaseline = "bottom";
  for (const t of things) {
    ctx.font = t.h + "px " + EMOJI;
    const bob = t.k === "pigeon" ? Math.sin(dist / 10) * 4 : t.k === "litter" ? Math.sin(dist / 20 + t.x) * 3 : 0;
    ctx.fillText(t.e, t.x, t.y + 4 + bob);
  }

  drawPlayer();

  // きらきら
  for (const p of particles) {
    ctx.globalAlpha = Math.max(0, p.life);
    ctx.fillStyle = p.c;
    blob(p.x, p.y, 4, 4);
  }
  ctx.globalAlpha = 1;

  // 点数（⭐ いまのスコア　🏆 ベスト）
  ctx.font = "bold 22px sans-serif"; ctx.textBaseline = "alphabetic";
  ctx.fillStyle = "#1f2d27";
  ctx.textAlign = "left"; ctx.fillText("⭐ " + score(), 16, 34);
  ctx.textAlign = "right"; ctx.fillText("🏆 " + Math.max(best, score()), W - 16, 34);
  ctx.restore();
}

function frame(now) {
  const dt = Math.min((now - last) / 1000 || 0, 0.033);
  last = now;
  if (state === "playing") update(dt);
  else if (state === "ready") scroll += 50 * dt;
  for (const p of particles) { p.x += p.vx * dt; p.y += p.vy * dt; p.vy += 600 * dt; p.life -= dt * 2; }
  particles = particles.filter(p => p.life > 0);
  if (shake > 0) shake = Math.max(0, shake - dt * 1.5);
  draw();
  requestAnimationFrame(frame);
}

// ---- 操作：タップ / スペースキー / ↑キー ----
function action() {
  if (state === "ready") start();
  else if (state === "playing") { if (player.y >= GROUND - 2) player.vy = -820; }
  else if (performance.now() - overAt > 500) start();
}

function release() {
  if (state === "playing" && player.vy < -300) player.vy *= 0.45; // 短く押すと低いジャンプ
}

stage.addEventListener("pointerdown", function (e) { e.preventDefault(); action(); });
window.addEventListener("pointerup", release);
window.addEventListener("keydown", function (e) {
  if (e.code === "Space" || e.code === "ArrowUp") {
    e.preventDefault();
    if (!e.repeat) action();
  }
});
window.addEventListener("keyup", function (e) {
  if (e.code === "Space" || e.code === "ArrowUp") release();
});

reset();
requestAnimationFrame(frame);
