(() => {
  const DURATION = 20;
  const audio = document.getElementById("song-audio");
  const board = document.getElementById("piano-board");
  const lanes = [...document.querySelectorAll(".lane")];
  const startOverlay = document.getElementById("game-start-overlay");
  const startButton = document.getElementById("start-game");
  const scoreEl = document.getElementById("score");
  const timeEl = document.getElementById("time-left");
  const progress = document.getElementById("game-progress");
  const status = document.getElementById("game-status");
  const flash = document.getElementById("hit-flash");
  const countdown = document.getElementById("game-countdown");

  let running = false, score = 0, startAt = 0, raf = 0, scheduled = [], nextTile = 0;
  let gameStartAudioTime = 0, audioStarted = false;
  const activeTiles = [];

  /*
    BEAT MAP:
    The values are times in seconds relative to the beginning of the selected ~20s excerpt.
    This is a runnable placeholder beat map, not an analysis of the user's actual audio.
    Once the exact excerpt is chosen, edit this list to match the beats in audio.mp3.
    A tile is spawned early so it reaches the target zone at its beat time.
  */
  const BEAT_TIMES = [
    0.55, 1.18, 1.82, 2.47, 3.12, 3.77, 4.42, 5.07, 5.72, 6.37,
    7.02, 7.67, 8.32, 8.97, 9.62, 10.27, 10.92, 11.57, 12.22, 12.87,
    13.52, 14.17, 14.82, 15.47, 16.12, 16.77, 17.42, 18.07, 18.72, 19.37
  ];

  function makeSchedule() {
    const boardHeight = board.clientHeight;
    const targetY = boardHeight * 0.85;
    const tileHeight = 72;
    const travelDistance = targetY + tileHeight;
    const fallSpeed = 520; // pixels/second; visual speed only
    const travelTime = travelDistance / fallSpeed;
    return BEAT_TIMES.map((beat, i) => ({
      beat: Math.max(0.05, beat),
      spawn: Math.max(0, beat - travelTime),
      lane: (i * 7 + Math.floor(i / 3) * 2 + 1) % 4,
      hit: false,
      missed: false
    })).filter(item => item.beat <= DURATION);
  }

  function resetGame() {
    cancelAnimationFrame(raf);
    activeTiles.splice(0, activeTiles.length);
    lanes.forEach(lane => lane.replaceChildren());
    score = 0;
    scoreEl.textContent = "0";
    timeEl.textContent = DURATION.toFixed(1);
    progress.style.width = "0%";
    status.textContent = "Listen for the beat ♡";
    scheduled = makeSchedule();
    nextTile = 0;
  }

  function spawnTile(item) {
    const el = document.createElement("button");
    el.type = "button";
    el.className = "tile";
    el.setAttribute("aria-label", `Ô nhạc ở cột ${item.lane + 1}`);
    el.style.top = "-80px";
    el.addEventListener("pointerdown", e => {
      e.preventDefault();
      if (!running || item.hit || item.missed) return;
      const rect = el.getBoundingClientRect();
      const boardRect = board.getBoundingClientRect();
      const tileCenter = rect.top - boardRect.top + rect.height / 2;
      const targetY = board.clientHeight * 0.85;
      // Timing window: forgiving enough for a casual birthday mini-game.
      const remaining = Math.abs(tileCenter - targetY);
      if (remaining > 115) {
        status.textContent = "Follow the rhythm ♫";
        el.animate([{ opacity: 1 }, { opacity: .55 }, { opacity: 1 }], { duration: 180 });
        return;
      }
      item.hit = true;
      el.classList.add("hit");
      score += 10;
      scoreEl.textContent = String(score);
      status.textContent = "Nice! ♡";
      flash.classList.remove("flash");
      void flash.offsetWidth;
      flash.classList.add("flash");
      window.setTimeout(() => el.remove(), 100);
    });
    lanes[item.lane].appendChild(el);
    item.el = el;
    item.spawned = true;
    activeTiles.push(item);
  }

  function animate(now) {
    if (!running) return;
    const elapsed = (now - startAt) / 1000;
    const left = Math.max(0, DURATION - elapsed);
    timeEl.textContent = left.toFixed(1);
    progress.style.width = `${Math.min(100, elapsed / DURATION * 100)}%`;

    while (nextTile < scheduled.length && scheduled[nextTile].spawn <= elapsed) {
      spawnTile(scheduled[nextTile]);
      nextTile++;
    }

    const boardH = board.clientHeight;
    const travelDistance = boardH * 0.85 + 72;
    const fallSpeed = 520;
    activeTiles.forEach(item => {
      if (!item.el || item.hit || item.missed) return;
      const tileElapsed = elapsed - item.spawn;
      const y = -72 + tileElapsed * fallSpeed;
      item.el.style.top = `${y}px`;
      const center = y + 36;
      if (center > boardH * .85 + 80) {
        item.missed = true;
        item.el.classList.add("missed");
        item.el.disabled = true;
        status.textContent = "Keep going — you've got this!";
        window.setTimeout(() => item.el?.remove(), 250);
      }
    });

    if (elapsed >= DURATION) {
      finishGame();
      return;
    }
    raf = requestAnimationFrame(animate);
  }

  async function startGame() {
    if (running) return;
    resetGame();
    startOverlay.classList.add("hidden");
    running = true;
    startButton.disabled = true;
    status.textContent = "Play to the beat ♫";
    audio.currentTime = 0;
    audio.volume = 0.85;
    audioStarted = false;

    // Start audio and game from the same user action to keep the beat map aligned.
    try {
      await audio.play();
      audioStarted = true;
      gameStartAudioTime = audio.currentTime;
    } catch (err) {
      status.textContent = "Không phát được nhạc — kiểm tra file assets/music/audio.mp3.";
    }

    startAt = performance.now();
    if (!audioStarted) status.textContent = "Play along — audio unavailable";
    raf = requestAnimationFrame(animate);
  }

  function finishGame() {
    running = false;
    cancelAnimationFrame(raf);
    audio.pause();
    audio.currentTime = 0;
    activeTiles.forEach(item => item.el?.remove());
    lanes.forEach(lane => lane.replaceChildren());
    progress.style.width = "100%";
    status.textContent = `You made ${score} points! ♡`;
    startButton.disabled = false;
    startButton.textContent = "PLAY AGAIN ♡";
    startOverlay.querySelector("h2").textContent = "You did it, chị Linh!";
    startOverlay.querySelector("p").textContent = `Chị ghi được ${score} điểm. Nhưng món quà thật sự vẫn đang chờ phía sau nè.`;
    startOverlay.classList.remove("hidden");
    startButton.textContent = "CONTINUE TO MY NOTE →";
    startButton.onclick = () => {
      startButton.onclick = null;
      startButton.textContent = "LET'S PLAY ♡";
      startOverlay.querySelector("h2").textContent = "Ready, chị Linh?";
      startOverlay.querySelector("p").textContent = "Chạm vào ô đen khi nó đến vùng sáng. Let's play!";
      window.showScene("scene-song-note");
    };
  }

  startButton.addEventListener("click", () => {
    if (startButton.onclick) return;
    startGame();
  });
})();
