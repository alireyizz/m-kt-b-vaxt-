/**
 * Məktəbdən Qaçış — Paper Airplane School Escape Mini-Game
 * Smooth, responsive canvas game with school aesthetic, sound blips & touch ergonomics
 */

(function () {
  'use strict';

  const $ = (s) => document.querySelector(s);
  const modal = $('#gameModal');
  const canvas = $('#gameCanvas');
  if (!modal || !canvas) return;

  const ctx = canvas.getContext('2d');

  let running = false;
  let started = false;
  let over = false;
  let score = 0;
  let best = Number(localStorage.getItem('schoolGameBest') || 0);
  let raf = 0;
  let last = 0;
  let spawn = 0;
  let vy = 0;
  let y = 200;
  let speed = 240;
  let pipes = [];
  let particles = [];
  let clouds = [];
  let lastFocusedElement = null;

  const text = {
    az: {
      game: 'Oyun',
      score: 'Xal',
      best: 'Rekord',
      title: 'Məktəbdən Qaçış',
      over: 'Təyyarə yerə endi!',
      restart: 'Yenidən oyna',
      help: 'Space / klik / toxunma ilə kağız təyyarəni uçur.',
      tapToStart: 'Uçuş üçün toxun və ya Space bas',
      close: 'Oyunu bağla'
    },
    en: {
      game: 'Game',
      score: 'Score',
      best: 'Best',
      title: 'School Escape',
      over: 'Flight Ended!',
      restart: 'Play Again',
      help: 'Press Space / click / tap to steer the paper plane.',
      tapToStart: 'Tap or press Space to fly',
      close: 'Close game'
    },
    ru: {
      game: 'Игра',
      score: 'Очки',
      best: 'Рекорд',
      title: 'Побег из школы',
      over: 'Полёт завершён!',
      restart: 'Играть снова',
      help: 'Пробел / клик / касание поднимает бумажный самолёт.',
      tapToStart: 'Нажмите Пробел или коснитесь экрана',
      close: 'Закрыть игру'
    }
  };

  // Optional subtle Web Audio sound generator (no external files)
  let audioCtx = null;
  function playSound(type) {
    try {
      if (!audioCtx) {
        const AudioClass = window.AudioContext || window.webkitAudioContext;
        if (AudioClass) audioCtx = new AudioClass();
      }
      if (!audioCtx || audioCtx.state === 'suspended') {
        audioCtx?.resume();
      }
      if (!audioCtx) return;

      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);

      const now = audioCtx.currentTime;
      if (type === 'flap') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.exponentialRampToValueAtTime(540, now + 0.08);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
      } else if (type === 'score') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(587.33, now); // D5
        osc.frequency.setValueAtTime(880, now + 0.07); // A5
        gain.gain.setValueAtTime(0.09, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
        osc.start(now);
        osc.stop(now + 0.16);
      } else if (type === 'hit') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(160, now);
        osc.frequency.exponentialRampToValueAtTime(60, now + 0.15);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        osc.start(now);
        osc.stop(now + 0.15);
      }
    } catch (_) {
      // Audio autoplay policy or device restrictions handled silently
    }
  }

  function getLang() {
    return localStorage.getItem('schoolLang') || 'az';
  }

  function ui() {
    const t = text[getLang()] || text.az;
    const gameLabel = document.querySelector('[data-game-label]');
    if (gameLabel) gameLabel.textContent = t.game;
    if ($('#gameScoreLabel')) $('#gameScoreLabel').textContent = t.score;
    if ($('#gameBestLabel')) $('#gameBestLabel').textContent = t.best;
    if ($('#gameTitle')) $('#gameTitle').textContent = t.title;
    if ($('#gameOverTitle')) $('#gameOverTitle').textContent = t.over;
    if ($('#gameRestart')) $('#gameRestart').textContent = t.restart;
    if ($('#gameFinalLabel')) $('#gameFinalLabel').textContent = t.score;
    if ($('#gameHelp')) $('#gameHelp').textContent = t.help;
    if ($('#gameBest')) $('#gameBest').textContent = best;
    if ($('#gameClose')) {
      $('#gameClose').setAttribute('aria-label', t.close);
      $('#gameClose').setAttribute('title', t.close);
    }
  }

  function resize() {
    const r = canvas.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) return;
    const d = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(r.width * d);
    canvas.height = Math.round(r.height * d);
    ctx.setTransform(d, 0, 0, d, 0, 0);

    // Re-seed clouds if empty
    if (clouds.length === 0) {
      for (let i = 0; i < 6; i++) {
        clouds.push({
          x: Math.random() * r.width,
          y: 20 + Math.random() * (r.height * 0.4),
          r: 18 + Math.random() * 16,
          speed: 15 + Math.random() * 20
        });
      }
    }
  }

  function W() {
    return canvas.getBoundingClientRect().width;
  }
  function H() {
    return canvas.getBoundingClientRect().height;
  }

  function reset() {
    score = 0;
    vy = 0;
    y = H() * 0.42;
    pipes = [];
    particles = [];
    spawn = 0;
    speed = 240;
    over = false;
    running = true;
    started = false;

    if ($('#gameScore')) $('#gameScore').textContent = 0;
    if ($('#gameOverlay')) $('#gameOverlay').classList.remove('show');

    last = performance.now();
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(loop);
  }

  function flap() {
    if (!running) {
      reset();
      return;
    }
    if (over) {
      reset();
      return;
    }

    if (!started) {
      started = true;
      last = performance.now();
    }

    vy = -400;
    playSound('flap');

    // Add trailing paper dust puff
    const px = W() * 0.22;
    for (let i = 0; i < 4; i++) {
      particles.push({
        x: px - 18,
        y: y + (Math.random() * 8 - 4),
        vx: -(Math.random() * 60 + 40),
        vy: (Math.random() * 40 - 20),
        life: 0.35,
        maxLife: 0.35,
        size: 3 + Math.random() * 3
      });
    }
  }

  function addPipe() {
    const h = H();
    const gap = Math.max(140, Math.min(170, h * 0.38));
    const minTop = 60;
    const maxTop = h - gap - 90;
    const top = minTop + Math.random() * Math.max(20, maxTop - minTop);
    pipes.push({
      x: W() + 40,
      top: top,
      gap: gap,
      passed: false,
      colorVariant: Math.floor(Math.random() * 3)
    });
  }

  function end() {
    if (over) return;
    running = false;
    over = true;
    playSound('hit');

    if (score > best) {
      best = score;
      localStorage.setItem('schoolGameBest', best);
      if ($('#gameBest')) $('#gameBest').textContent = best;
    }

    if ($('#gameFinalScore')) $('#gameFinalScore').textContent = score;
    if ($('#gameOverlay')) $('#gameOverlay').classList.add('show');
  }

  function draw() {
    const w = W();
    const h = H();
    if (w <= 0 || h <= 0) return;

    ctx.clearRect(0, 0, w, h);

    // 1. Soft sky gradient
    const sky = ctx.createLinearGradient(0, 0, 0, h);
    sky.addColorStop(0, '#a5dcf4');
    sky.addColorStop(0.65, '#d8eef8');
    sky.addColorStop(1, '#fceddf');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, w, h);

    // 2. Animated soft clouds
    ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
    for (const c of clouds) {
      ctx.beginPath();
      ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
      ctx.arc(c.x + c.r * 0.8, c.y - c.r * 0.3, c.r * 1.1, 0, Math.PI * 2);
      ctx.arc(c.x + c.r * 1.6, c.y, c.r * 0.8, 0, Math.PI * 2);
      ctx.fill();
    }

    // 3. School building background silhouette (warm slate/chalk tone)
    const schoolY = h - 28;
    ctx.fillStyle = 'rgba(100, 125, 140, 0.18)';
    // Main school hall
    ctx.fillRect(w * 0.55, schoolY - 75, w * 0.32, 75);
    // School clock tower
    ctx.fillRect(w * 0.67, schoolY - 118, 42, 118);
    // Triangle roof on tower
    ctx.beginPath();
    ctx.moveTo(w * 0.67 - 6, schoolY - 118);
    ctx.lineTo(w * 0.67 + 21, schoolY - 146);
    ctx.lineTo(w * 0.67 + 48, schoolY - 118);
    ctx.closePath();
    ctx.fill();
    // School windows
    ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
    for (let wx = w * 0.57; wx < w * 0.84; wx += 24) {
      ctx.fillRect(wx, schoolY - 60, 12, 16);
      ctx.fillRect(wx, schoolY - 35, 12, 16);
    }
    // Clock dial
    ctx.beginPath();
    ctx.arc(w * 0.67 + 21, schoolY - 96, 9, 0, Math.PI * 2);
    ctx.fill();

    // 4. Pipes (Themed as Wooden Bookcases / Locker stacks)
    const pipeWidth = 64;
    for (const p of pipes) {
      // Shelf colors
      const woodMain = '#cca87c';
      const woodTrim = '#ad8557';
      const bookBg = '#dfcbb0';

      // Top pipe
      ctx.fillStyle = woodMain;
      ctx.fillRect(p.x, 0, pipeWidth, p.top);
      ctx.fillStyle = bookBg;
      ctx.fillRect(p.x + 8, 8, pipeWidth - 16, Math.max(0, p.top - 20));
      // Shelf divider books
      ctx.fillStyle = 'rgba(70, 50, 30, 0.22)';
      for (let yy = 24; yy < p.top - 12; yy += 24) {
        ctx.fillRect(p.x + 10, yy, pipeWidth - 20, 3);
      }
      // Top cap trim
      ctx.fillStyle = woodTrim;
      ctx.fillRect(p.x - 4, p.top - 14, pipeWidth + 8, 14);

      // Bottom pipe
      const bTop = p.top + p.gap;
      const bHeight = h - bTop;
      ctx.fillStyle = woodMain;
      ctx.fillRect(p.x, bTop, pipeWidth, bHeight);
      ctx.fillStyle = bookBg;
      ctx.fillRect(p.x + 8, bTop + 14, pipeWidth - 16, Math.max(0, bHeight - 24));
      // Shelf divider books
      ctx.fillStyle = 'rgba(70, 50, 30, 0.22)';
      for (let yy = bTop + 30; yy < h - 20; yy += 24) {
        ctx.fillRect(p.x + 10, yy, pipeWidth - 20, 3);
      }
      // Bottom cap trim
      ctx.fillStyle = woodTrim;
      ctx.fillRect(p.x - 4, bTop, pipeWidth + 8, 14);
    }

    // 5. School yard ground
    ctx.fillStyle = '#6fa85b'; // soft grassy field
    ctx.fillRect(0, h - 28, w, 28);
    ctx.fillStyle = '#598f48';
    ctx.fillRect(0, h - 28, w, 4);

    // 6. Trail particles
    for (const part of particles) {
      const alpha = Math.max(0, part.life / part.maxLife);
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.7})`;
      ctx.beginPath();
      ctx.arc(part.x, part.y, part.size * alpha, 0, Math.PI * 2);
      ctx.fill();
    }

    // 7. Paper Airplane Player
    const px = w * 0.22;
    const py = y;
    ctx.save();
    ctx.translate(px, py);

    // Rotation angle based on vertical velocity
    const angle = !started ? 0 : Math.max(-0.45, Math.min(0.65, vy / 750));
    ctx.rotate(angle);

    // Plane Shadow
    ctx.shadowColor = 'rgba(25, 40, 50, 0.2)';
    ctx.shadowBlur = 8;
    ctx.shadowOffsetY = 4;

    // Main top wing (clean crisp white origami)
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.moveTo(-24, 2);
    ctx.lineTo(26, -6);
    ctx.lineTo(-4, 9);
    ctx.lineTo(22, 16);
    ctx.lineTo(-24, 7);
    ctx.closePath();
    ctx.fill();

    // Reset shadow
    ctx.shadowColor = 'transparent';

    // Outline
    ctx.strokeStyle = '#6e808a';
    ctx.lineWidth = 1.2;
    ctx.stroke();

    // Inner fold / crease
    ctx.fillStyle = '#e2ecf0';
    ctx.beginPath();
    ctx.moveTo(-24, 2);
    ctx.lineTo(-2, 2);
    ctx.lineTo(-4, 9);
    ctx.closePath();
    ctx.fill();

    // Center fold line
    ctx.strokeStyle = '#95a6af';
    ctx.beginPath();
    ctx.moveTo(-24, 2);
    ctx.lineTo(26, -6);
    ctx.stroke();

    ctx.restore();

    // 8. In-Game Live HUD Score
    if (started && running && !over) {
      ctx.font = '800 28px system-ui, -apple-system, sans-serif';
      ctx.fillStyle = 'rgba(29, 27, 24, 0.8)';
      ctx.textAlign = 'center';
      ctx.fillText(String(score), w * 0.5, 52);
    }

    // 9. Prompt badge when hovering before start
    if (running && !started && !over) {
      const t = text[getLang()] || text.az;
      ctx.save();
      ctx.font = '600 13px system-ui, -apple-system, BlinkMacSystemFont, sans-serif';
      ctx.textAlign = 'center';
      const promptStr = t.tapToStart;
      const tw = ctx.measureText(promptStr).width;
      const bw = tw + 28;
      const bh = 32;
      const bx = (w - bw) / 2;
      const by = h * 0.58;

      ctx.fillStyle = 'rgba(255, 255, 255, 0.94)';
      ctx.shadowColor = 'rgba(30, 40, 50, 0.15)';
      ctx.shadowBlur = 8;
      ctx.shadowOffsetY = 2;
      ctx.beginPath();
      if (ctx.roundRect) {
        ctx.roundRect(bx, by, bw, bh, 16);
      } else {
        ctx.rect(bx, by, bw, bh);
      }
      ctx.fill();

      ctx.shadowColor = 'transparent';
      ctx.strokeStyle = 'rgba(100, 130, 160, 0.28)';
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.fillStyle = '#1d2a35';
      ctx.fillText(promptStr, w * 0.5, by + 20);
      ctx.restore();
    }
  }

  function loop(now) {
    const dt = Math.min((now - last) / 1000, 0.033);
    last = now;

    if (running && !over) {
      // Cloud drift
      for (const c of clouds) {
        c.x -= c.speed * dt;
        if (c.x < -c.r * 2) {
          c.x = W() + c.r * 2;
          c.y = 20 + Math.random() * (H() * 0.4);
        }
      }

      if (!started) {
        // Idle gentle float before launch
        y = H() * 0.42 + Math.sin(now / 220) * 6;
        vy = 0;
      } else {
        // Active flight: Gravity & Velocity
        vy += 1050 * dt;
        y += vy * dt;
        spawn += dt;

        // Particle physics
        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          p.life -= dt;
          p.x += p.vx * dt;
          p.y += p.vy * dt;
          if (p.life <= 0) particles.splice(i, 1);
        }

        // Spawn pipes
        if (spawn > 1.55) {
          spawn = 0;
          addPipe();
          speed = Math.min(360, speed + 2.5);
        }

        // Update pipes
        const px = W() * 0.22;
        const pipeWidth = 64;

        for (const p of pipes) {
          p.x -= speed * dt;

          // Check if passed for score
          if (!p.passed && p.x + pipeWidth < px) {
            p.passed = true;
            score++;
            playSound('score');
            if ($('#gameScore')) $('#gameScore').textContent = score;
          }
        }

        // Clean offscreen pipes
        pipes = pipes.filter((p) => p.x > -100);

        // Boundary collision check
        const half = 14;
        const groundY = H() - 28;
        if (y - half < 0 || y + half > groundY) {
          end();
        }

        // Pipe obstacle collision check
        for (const p of pipes) {
          if (px + 18 > p.x && px - 18 < p.x + pipeWidth) {
            if (y - half < p.top || y + half > p.top + p.gap) {
              end();
              break;
            }
          }
        }
      }
    }

    draw();
    if (modal.classList.contains('open')) {
      raf = requestAnimationFrame(loop);
    }
  }

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    running = false;
    cancelAnimationFrame(raf);
    if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
      lastFocusedElement.focus();
    }
  }

  // Open Modal
  $('#gameBtn')?.addEventListener('click', () => {
    lastFocusedElement = document.activeElement;
    ui();
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    setTimeout(() => {
      resize();
      reset();
    }, 40);
  });

  // Close Modal
  $('#gameClose')?.addEventListener('click', closeModal);

  // Close on backdrop click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Restart Button
  $('#gameRestart')?.addEventListener('click', () => {
    resize();
    reset();
  });

  // Tap / Click controls
  canvas?.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    flap();
  });

  // Keyboard controls
  window.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('open')) return;

    if (e.code === 'Space') {
      e.preventDefault();
      flap();
    } else if (e.code === 'Enter' && over) {
      e.preventDefault();
      reset();
    } else if (e.code === 'Escape') {
      $('#gameClose')?.click();
    }
  });

  // Window resize
  window.addEventListener('resize', () => {
    if (modal.classList.contains('open')) {
      resize();
    }
  });

  // Language update listener
  window.addEventListener('schoolLangChange', () => {
    ui();
  });

  // Initial text setup
  ui();
})();
