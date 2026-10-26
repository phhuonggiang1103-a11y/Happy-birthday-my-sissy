(() => {
  const intro = document.getElementById("tarot-intro");
  const stage = document.getElementById("tarot-stage");
  const deck = document.getElementById("tarot-deck");
  const shuffleButton = document.getElementById("shuffle-deck");
  const status = document.getElementById("shuffle-status");
  const instruction = document.getElementById("tarot-instruction");
  const countEl = document.getElementById("selected-count");
  const revealButton = document.getElementById("reveal-cards");
  const results = document.getElementById("tarot-results");
  const revealed = document.getElementById("revealed-cards");
  const copyButton = document.getElementById("copy-cards");
  const copyStatus = document.getElementById("copy-status");
  const restart = document.getElementById("restart-tarot");

  // All 78 card records are embedded below so the spread works without fetching JSON.
  const cards = [{"id": "major-01", "name": "The Fool", "group": "Major Arcana", "keywords": "new beginnings, openness", "message": "A fresh start is possible when you let curiosity lead.", "image": "assets/tarot/cards/major-01.webp"}, {"id": "major-02", "name": "The Magician", "group": "Major Arcana", "keywords": "resourcefulness, action", "message": "You may already have more tools and abilities than you realize.", "image": "assets/tarot/cards/major-02.webp"}, {"id": "major-03", "name": "The High Priestess", "group": "Major Arcana", "keywords": "intuition, reflection", "message": "Make room for quiet reflection and listen to what matters to you.", "image": "assets/tarot/cards/major-03.webp"}, {"id": "major-04", "name": "The Empress", "group": "Major Arcana", "keywords": "care, creativity", "message": "Let care, creativity, and comfort have a place in your life.", "image": "assets/tarot/cards/major-04.webp"}, {"id": "major-05", "name": "The Emperor", "group": "Major Arcana", "keywords": "structure, boundaries", "message": "Clear boundaries and steady plans can support what you want to build.", "image": "assets/tarot/cards/major-05.webp"}, {"id": "major-06", "name": "The Hierophant", "group": "Major Arcana", "keywords": "learning, tradition", "message": "There may be value in a mentor, a lesson, or a tradition you choose.", "image": "assets/tarot/cards/major-06.webp"}, {"id": "major-07", "name": "The Lovers", "group": "Major Arcana", "keywords": "values, connection", "message": "Choose in a way that reflects your values and nurtures meaningful connection.", "image": "assets/tarot/cards/major-07.webp"}, {"id": "major-08", "name": "The Chariot", "group": "Major Arcana", "keywords": "direction, determination", "message": "Progress can come from choosing a direction and staying intentional.", "image": "assets/tarot/cards/major-08.webp"}, {"id": "major-09", "name": "Strength", "group": "Major Arcana", "keywords": "gentle courage, patience", "message": "Gentle courage can be just as powerful as force.", "image": "assets/tarot/cards/major-09.webp"}, {"id": "major-10", "name": "The Hermit", "group": "Major Arcana", "keywords": "solitude, insight", "message": "A little quiet time may help you hear your own thoughts.", "image": "assets/tarot/cards/major-10.webp"}, {"id": "major-11", "name": "Wheel of Fortune", "group": "Major Arcana", "keywords": "change, cycles", "message": "Change is part of life; stay flexible as a new cycle unfolds.", "image": "assets/tarot/cards/major-11.webp"}, {"id": "major-12", "name": "Justice", "group": "Major Arcana", "keywords": "fairness, accountability", "message": "Aim for honesty, fairness, and choices you can stand behind.", "image": "assets/tarot/cards/major-12.webp"}, {"id": "major-13", "name": "The Hanged Man", "group": "Major Arcana", "keywords": "pause, perspective", "message": "A pause may help you see a familiar situation differently.", "image": "assets/tarot/cards/major-13.webp"}, {"id": "major-14", "name": "Death", "group": "Major Arcana", "keywords": "transition, release", "message": "An ending can mark a transition and make room for something new.", "image": "assets/tarot/cards/major-14.webp"}, {"id": "major-15", "name": "Temperance", "group": "Major Arcana", "keywords": "balance, integration", "message": "Small, balanced adjustments may serve you better than extremes.", "image": "assets/tarot/cards/major-15.webp"}, {"id": "major-16", "name": "The Devil", "group": "Major Arcana", "keywords": "patterns, awareness", "message": "Notice habits or expectations that may be limiting your freedom.", "image": "assets/tarot/cards/major-16.webp"}, {"id": "major-17", "name": "The Tower", "group": "Major Arcana", "keywords": "truth, rebuilding", "message": "When something changes unexpectedly, focus on what can be rebuilt honestly.", "image": "assets/tarot/cards/major-17.webp"}, {"id": "major-18", "name": "The Star", "group": "Major Arcana", "keywords": "hope, renewal", "message": "Give yourself permission to hope and recover your sense of possibility.", "image": "assets/tarot/cards/major-18.webp"}, {"id": "major-19", "name": "The Moon", "group": "Major Arcana", "keywords": "uncertainty, imagination", "message": "When things feel unclear, move slowly and separate feelings from facts.", "image": "assets/tarot/cards/major-19.webp"}, {"id": "major-20", "name": "The Sun", "group": "Major Arcana", "keywords": "joy, vitality", "message": "Make space for simple joys and the people who help you feel alive.", "image": "assets/tarot/cards/major-20.webp"}, {"id": "major-21", "name": "Judgement", "group": "Major Arcana", "keywords": "reflection, renewal", "message": "Reflect on what you have learned and decide what you want to carry forward.", "image": "assets/tarot/cards/major-21.webp"}, {"id": "major-22", "name": "The World", "group": "Major Arcana", "keywords": "completion, wholeness", "message": "Recognize how far you have come and welcome the next chapter.", "image": "assets/tarot/cards/major-22.webp"}, {"id": "minor-wands-01", "name": "Ace of Wands", "group": "Minor Arcana · Wands", "keywords": "energy, creativity, initiative", "message": "Consider where your energy, creativity, or initiative could be put to good use.", "image": "assets/tarot/cards/minor-wands-01.webp"}, {"id": "minor-wands-02", "name": "Two of Wands", "group": "Minor Arcana · Wands", "keywords": "energy, creativity, initiative", "message": "Consider where your energy, creativity, or initiative could be put to good use.", "image": "assets/tarot/cards/minor-wands-02.webp"}, {"id": "minor-wands-03", "name": "Three of Wands", "group": "Minor Arcana · Wands", "keywords": "energy, creativity, initiative", "message": "Consider where your energy, creativity, or initiative could be put to good use.", "image": "assets/tarot/cards/minor-wands-03.webp"}, {"id": "minor-wands-04", "name": "Four of Wands", "group": "Minor Arcana · Wands", "keywords": "energy, creativity, initiative", "message": "Consider where your energy, creativity, or initiative could be put to good use.", "image": "assets/tarot/cards/minor-wands-04.webp"}, {"id": "minor-wands-05", "name": "Five of Wands", "group": "Minor Arcana · Wands", "keywords": "energy, creativity, initiative", "message": "Consider where your energy, creativity, or initiative could be put to good use.", "image": "assets/tarot/cards/minor-wands-05.webp"}, {"id": "minor-wands-06", "name": "Six of Wands", "group": "Minor Arcana · Wands", "keywords": "energy, creativity, initiative", "message": "Consider where your energy, creativity, or initiative could be put to good use.", "image": "assets/tarot/cards/minor-wands-06.webp"}, {"id": "minor-wands-07", "name": "Seven of Wands", "group": "Minor Arcana · Wands", "keywords": "energy, creativity, initiative", "message": "Consider where your energy, creativity, or initiative could be put to good use.", "image": "assets/tarot/cards/minor-wands-07.webp"}, {"id": "minor-wands-08", "name": "Eight of Wands", "group": "Minor Arcana · Wands", "keywords": "energy, creativity, initiative", "message": "Consider where your energy, creativity, or initiative could be put to good use.", "image": "assets/tarot/cards/minor-wands-08.webp"}, {"id": "minor-wands-09", "name": "Nine of Wands", "group": "Minor Arcana · Wands", "keywords": "energy, creativity, initiative", "message": "Consider where your energy, creativity, or initiative could be put to good use.", "image": "assets/tarot/cards/minor-wands-09.webp"}, {"id": "minor-wands-10", "name": "Ten of Wands", "group": "Minor Arcana · Wands", "keywords": "energy, creativity, initiative", "message": "Consider where your energy, creativity, or initiative could be put to good use.", "image": "assets/tarot/cards/minor-wands-10.webp"}, {"id": "minor-wands-11", "name": "Page of Wands", "group": "Minor Arcana · Wands", "keywords": "energy, creativity, initiative", "message": "Consider where your energy, creativity, or initiative could be put to good use.", "image": "assets/tarot/cards/minor-wands-11.webp"}, {"id": "minor-wands-12", "name": "Knight of Wands", "group": "Minor Arcana · Wands", "keywords": "energy, creativity, initiative", "message": "Consider where your energy, creativity, or initiative could be put to good use.", "image": "assets/tarot/cards/minor-wands-12.webp"}, {"id": "minor-wands-13", "name": "Queen of Wands", "group": "Minor Arcana · Wands", "keywords": "energy, creativity, initiative", "message": "Consider where your energy, creativity, or initiative could be put to good use.", "image": "assets/tarot/cards/minor-wands-13.webp"}, {"id": "minor-wands-14", "name": "King of Wands", "group": "Minor Arcana · Wands", "keywords": "energy, creativity, initiative", "message": "Consider where your energy, creativity, or initiative could be put to good use.", "image": "assets/tarot/cards/minor-wands-14.webp"}, {"id": "minor-cups-01", "name": "Ace of Cups", "group": "Minor Arcana · Cups", "keywords": "feelings, connection, compassion", "message": "Make space for emotional honesty, connection, and compassion.", "image": "assets/tarot/cards/minor-cups-01.webp"}, {"id": "minor-cups-02", "name": "Two of Cups", "group": "Minor Arcana · Cups", "keywords": "feelings, connection, compassion", "message": "Make space for emotional honesty, connection, and compassion.", "image": "assets/tarot/cards/minor-cups-02.webp"}, {"id": "minor-cups-03", "name": "Three of Cups", "group": "Minor Arcana · Cups", "keywords": "feelings, connection, compassion", "message": "Make space for emotional honesty, connection, and compassion.", "image": "assets/tarot/cards/minor-cups-03.webp"}, {"id": "minor-cups-04", "name": "Four of Cups", "group": "Minor Arcana · Cups", "keywords": "feelings, connection, compassion", "message": "Make space for emotional honesty, connection, and compassion.", "image": "assets/tarot/cards/minor-cups-04.webp"}, {"id": "minor-cups-05", "name": "Five of Cups", "group": "Minor Arcana · Cups", "keywords": "feelings, connection, compassion", "message": "Make space for emotional honesty, connection, and compassion.", "image": "assets/tarot/cards/minor-cups-05.webp"}, {"id": "minor-cups-06", "name": "Six of Cups", "group": "Minor Arcana · Cups", "keywords": "feelings, connection, compassion", "message": "Make space for emotional honesty, connection, and compassion.", "image": "assets/tarot/cards/minor-cups-06.webp"}, {"id": "minor-cups-07", "name": "Seven of Cups", "group": "Minor Arcana · Cups", "keywords": "feelings, connection, compassion", "message": "Make space for emotional honesty, connection, and compassion.", "image": "assets/tarot/cards/minor-cups-07.webp"}, {"id": "minor-cups-08", "name": "Eight of Cups", "group": "Minor Arcana · Cups", "keywords": "feelings, connection, compassion", "message": "Make space for emotional honesty, connection, and compassion.", "image": "assets/tarot/cards/minor-cups-08.webp"}, {"id": "minor-cups-09", "name": "Nine of Cups", "group": "Minor Arcana · Cups", "keywords": "feelings, connection, compassion", "message": "Make space for emotional honesty, connection, and compassion.", "image": "assets/tarot/cards/minor-cups-09.webp"}, {"id": "minor-cups-10", "name": "Ten of Cups", "group": "Minor Arcana · Cups", "keywords": "feelings, connection, compassion", "message": "Make space for emotional honesty, connection, and compassion.", "image": "assets/tarot/cards/minor-cups-10.webp"}, {"id": "minor-cups-11", "name": "Page of Cups", "group": "Minor Arcana · Cups", "keywords": "feelings, connection, compassion", "message": "Make space for emotional honesty, connection, and compassion.", "image": "assets/tarot/cards/minor-cups-11.webp"}, {"id": "minor-cups-12", "name": "Knight of Cups", "group": "Minor Arcana · Cups", "keywords": "feelings, connection, compassion", "message": "Make space for emotional honesty, connection, and compassion.", "image": "assets/tarot/cards/minor-cups-12.webp"}, {"id": "minor-cups-13", "name": "Queen of Cups", "group": "Minor Arcana · Cups", "keywords": "feelings, connection, compassion", "message": "Make space for emotional honesty, connection, and compassion.", "image": "assets/tarot/cards/minor-cups-13.webp"}, {"id": "minor-cups-14", "name": "King of Cups", "group": "Minor Arcana · Cups", "keywords": "feelings, connection, compassion", "message": "Make space for emotional honesty, connection, and compassion.", "image": "assets/tarot/cards/minor-cups-14.webp"}, {"id": "minor-swords-01", "name": "Ace of Swords", "group": "Minor Arcana · Swords", "keywords": "thought, clarity, communication", "message": "Seek clarity, communicate thoughtfully, and check assumptions.", "image": "assets/tarot/cards/minor-swords-01.webp"}, {"id": "minor-swords-02", "name": "Two of Swords", "group": "Minor Arcana · Swords", "keywords": "thought, clarity, communication", "message": "Seek clarity, communicate thoughtfully, and check assumptions.", "image": "assets/tarot/cards/minor-swords-02.webp"}, {"id": "minor-swords-03", "name": "Three of Swords", "group": "Minor Arcana · Swords", "keywords": "thought, clarity, communication", "message": "Seek clarity, communicate thoughtfully, and check assumptions.", "image": "assets/tarot/cards/minor-swords-03.webp"}, {"id": "minor-swords-04", "name": "Four of Swords", "group": "Minor Arcana · Swords", "keywords": "thought, clarity, communication", "message": "Seek clarity, communicate thoughtfully, and check assumptions.", "image": "assets/tarot/cards/minor-swords-04.webp"}, {"id": "minor-swords-05", "name": "Five of Swords", "group": "Minor Arcana · Swords", "keywords": "thought, clarity, communication", "message": "Seek clarity, communicate thoughtfully, and check assumptions.", "image": "assets/tarot/cards/minor-swords-05.webp"}, {"id": "minor-swords-06", "name": "Six of Swords", "group": "Minor Arcana · Swords", "keywords": "thought, clarity, communication", "message": "Seek clarity, communicate thoughtfully, and check assumptions.", "image": "assets/tarot/cards/minor-swords-06.webp"}, {"id": "minor-swords-07", "name": "Seven of Swords", "group": "Minor Arcana · Swords", "keywords": "thought, clarity, communication", "message": "Seek clarity, communicate thoughtfully, and check assumptions.", "image": "assets/tarot/cards/minor-swords-07.webp"}, {"id": "minor-swords-08", "name": "Eight of Swords", "group": "Minor Arcana · Swords", "keywords": "thought, clarity, communication", "message": "Seek clarity, communicate thoughtfully, and check assumptions.", "image": "assets/tarot/cards/minor-swords-08.webp"}, {"id": "minor-swords-09", "name": "Nine of Swords", "group": "Minor Arcana · Swords", "keywords": "thought, clarity, communication", "message": "Seek clarity, communicate thoughtfully, and check assumptions.", "image": "assets/tarot/cards/minor-swords-09.webp"}, {"id": "minor-swords-10", "name": "Ten of Swords", "group": "Minor Arcana · Swords", "keywords": "thought, clarity, communication", "message": "Seek clarity, communicate thoughtfully, and check assumptions.", "image": "assets/tarot/cards/minor-swords-10.webp"}, {"id": "minor-swords-11", "name": "Page of Swords", "group": "Minor Arcana · Swords", "keywords": "thought, clarity, communication", "message": "Seek clarity, communicate thoughtfully, and check assumptions.", "image": "assets/tarot/cards/minor-swords-11.webp"}, {"id": "minor-swords-12", "name": "Knight of Swords", "group": "Minor Arcana · Swords", "keywords": "thought, clarity, communication", "message": "Seek clarity, communicate thoughtfully, and check assumptions.", "image": "assets/tarot/cards/minor-swords-12.webp"}, {"id": "minor-swords-13", "name": "Queen of Swords", "group": "Minor Arcana · Swords", "keywords": "thought, clarity, communication", "message": "Seek clarity, communicate thoughtfully, and check assumptions.", "image": "assets/tarot/cards/minor-swords-13.webp"}, {"id": "minor-swords-14", "name": "King of Swords", "group": "Minor Arcana · Swords", "keywords": "thought, clarity, communication", "message": "Seek clarity, communicate thoughtfully, and check assumptions.", "image": "assets/tarot/cards/minor-swords-14.webp"}, {"id": "minor-pentacles-01", "name": "Ace of Pentacles", "group": "Minor Arcana · Pentacles", "keywords": "stability, resources, practical growth", "message": "Build steadily through practical choices, patience, and care for your resources.", "image": "assets/tarot/cards/minor-pentacles-01.webp"}, {"id": "minor-pentacles-02", "name": "Two of Pentacles", "group": "Minor Arcana · Pentacles", "keywords": "stability, resources, practical growth", "message": "Build steadily through practical choices, patience, and care for your resources.", "image": "assets/tarot/cards/minor-pentacles-02.webp"}, {"id": "minor-pentacles-03", "name": "Three of Pentacles", "group": "Minor Arcana · Pentacles", "keywords": "stability, resources, practical growth", "message": "Build steadily through practical choices, patience, and care for your resources.", "image": "assets/tarot/cards/minor-pentacles-03.webp"}, {"id": "minor-pentacles-04", "name": "Four of Pentacles", "group": "Minor Arcana · Pentacles", "keywords": "stability, resources, practical growth", "message": "Build steadily through practical choices, patience, and care for your resources.", "image": "assets/tarot/cards/minor-pentacles-04.webp"}, {"id": "minor-pentacles-05", "name": "Five of Pentacles", "group": "Minor Arcana · Pentacles", "keywords": "stability, resources, practical growth", "message": "Build steadily through practical choices, patience, and care for your resources.", "image": "assets/tarot/cards/minor-pentacles-05.webp"}, {"id": "minor-pentacles-06", "name": "Six of Pentacles", "group": "Minor Arcana · Pentacles", "keywords": "stability, resources, practical growth", "message": "Build steadily through practical choices, patience, and care for your resources.", "image": "assets/tarot/cards/minor-pentacles-06.webp"}, {"id": "minor-pentacles-07", "name": "Seven of Pentacles", "group": "Minor Arcana · Pentacles", "keywords": "stability, resources, practical growth", "message": "Build steadily through practical choices, patience, and care for your resources.", "image": "assets/tarot/cards/minor-pentacles-07.webp"}, {"id": "minor-pentacles-08", "name": "Eight of Pentacles", "group": "Minor Arcana · Pentacles", "keywords": "stability, resources, practical growth", "message": "Build steadily through practical choices, patience, and care for your resources.", "image": "assets/tarot/cards/minor-pentacles-08.webp"}, {"id": "minor-pentacles-09", "name": "Nine of Pentacles", "group": "Minor Arcana · Pentacles", "keywords": "stability, resources, practical growth", "message": "Build steadily through practical choices, patience, and care for your resources.", "image": "assets/tarot/cards/minor-pentacles-09.webp"}, {"id": "minor-pentacles-10", "name": "Ten of Pentacles", "group": "Minor Arcana · Pentacles", "keywords": "stability, resources, practical growth", "message": "Build steadily through practical choices, patience, and care for your resources.", "image": "assets/tarot/cards/minor-pentacles-10.webp"}, {"id": "minor-pentacles-11", "name": "Page of Pentacles", "group": "Minor Arcana · Pentacles", "keywords": "stability, resources, practical growth", "message": "Build steadily through practical choices, patience, and care for your resources.", "image": "assets/tarot/cards/minor-pentacles-11.webp"}, {"id": "minor-pentacles-12", "name": "Knight of Pentacles", "group": "Minor Arcana · Pentacles", "keywords": "stability, resources, practical growth", "message": "Build steadily through practical choices, patience, and care for your resources.", "image": "assets/tarot/cards/minor-pentacles-12.webp"}, {"id": "minor-pentacles-13", "name": "Queen of Pentacles", "group": "Minor Arcana · Pentacles", "keywords": "stability, resources, practical growth", "message": "Build steadily through practical choices, patience, and care for your resources.", "image": "assets/tarot/cards/minor-pentacles-13.webp"}, {"id": "minor-pentacles-14", "name": "King of Pentacles", "group": "Minor Arcana · Pentacles", "keywords": "stability, resources, practical growth", "message": "Build steadily through practical choices, patience, and care for your resources.", "image": "assets/tarot/cards/minor-pentacles-14.webp"}];
  const positions = [
    { label: "I · What to leave behind", prompt: "What can I release?" },
    { label: "II · What to welcome", prompt: "What can I welcome?" },
    { label: "III · Your guiding message", prompt: "What can guide me?" }
  ];
  let selected = [], shuffled = [];

  function secureRandomIndex(max) {
    if (window.crypto && window.crypto.getRandomValues) {
      const arr = new Uint32Array(1);
      window.crypto.getRandomValues(arr);
      const limit = Math.floor(0x100000000 / max) * max;
      let value = arr[0];
      while (value >= limit) {
        window.crypto.getRandomValues(arr);
        value = arr[0];
      }
      return value % max;
    }
    return Math.floor(Math.random() * max);
  }
  function shuffle(array) {
    const copy = array.slice();
    for (let i = copy.length - 1; i > 0; i--) {
      const j = secureRandomIndex(i + 1);
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function startShuffle() {
    selected = [];
    results.classList.add("hidden");
    intro.classList.add("hidden");
    stage.classList.remove("hidden");
    deck.replaceChildren();
    revealButton.classList.add("hidden");
    countEl.textContent = "0";
    instruction.textContent = "Choose three cards that call to you.";
    status.textContent = "Shuffling the deck…";
    shuffled = shuffle(cards);
    shuffleButton.disabled = true;
    let steps = 0;
    const timer = window.setInterval(() => {
      steps++;
      status.textContent = ["Shuffling the deck…", "Mixing the energies…", "The deck is ready ✦"][Math.min(2, Math.floor(steps / 3))];
      if (steps >= 8) {
        window.clearInterval(timer);
        shuffleButton.disabled = false;
        status.textContent = "The deck is ready ✦";
        renderDeck();
      }
    }, 160);
  }

  function renderDeck() {
    deck.replaceChildren();
    shuffled.forEach((card, index) => {
      const button = document.createElement("button");
      button.className = "tarot-card-back";
      button.type = "button";
      button.setAttribute("aria-label", `Chọn lá bài số ${index + 1}`);
      const pattern = document.createElement("span");
      pattern.textContent = "✦";
      button.appendChild(pattern);
      button.addEventListener("click", () => chooseCard(card, button));
      deck.appendChild(button);
    });
  }

  function chooseCard(card, button) {
    if (selected.some(item => item.id === card.id) || selected.length >= 3) return;
    selected.push(card);
    button.classList.add("selected");
    button.disabled = true;
    button.querySelector("span").textContent = ["☾", "✧", "✦"][selected.length - 1];
    countEl.textContent = String(selected.length);
    if (selected.length === 3) {
      instruction.textContent = "Your three cards are waiting to be revealed.";
      revealButton.classList.remove("hidden");
      [...deck.querySelectorAll("button:not(.selected)")].forEach(b => b.disabled = true);
    }
  }

  function revealCards() {
    stage.classList.add("hidden");
    results.classList.remove("hidden");
    revealed.replaceChildren();
    selected.forEach((card, index) => {
      const article = document.createElement("article");
      article.className = "revealed-card";
      article.style.animationDelay = `${index * 180}ms`;
      const art = document.createElement("div");
      art.className = "tarot-art";
      const img = document.createElement("img");
      img.src = card.image;
      img.alt = "";
      img.onerror = () => img.remove();
      const symbol = document.createElement("span");
      symbol.textContent = ["☾", "✦", "☼"][index];
      const label = document.createElement("small");
      label.textContent = "THE BIRTHDAY CHAPTER";
      art.append(img, symbol, label);
      const pos = document.createElement("div");
      pos.className = "card-position";
      pos.textContent = positions[index].label;
      const title = document.createElement("h3");
      title.textContent = card.name;
      const keywords = document.createElement("p");
      keywords.className = "card-keywords";
      keywords.textContent = card.keywords;
      const message = document.createElement("p");
      message.className = "card-keywords";
      message.textContent = card.message;
      article.append(art, pos, title, keywords, message);
      revealed.appendChild(article);
    });
    copyStatus.textContent = "";
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function copyCards() {
    const message = "Thông điệp tuổi mới của chị Linh ♡\n" + selected.map((card, i) =>
      `${i + 1}. ${positions[i].label}: ${card.name} — ${card.keywords}`
    ).join("\n") + "\n\ninbox Giang để có lời giải thông điệp tuổi mới nha bà ♡";
    try {
      await navigator.clipboard.writeText(message);
      copyStatus.textContent = "Đã sao chép! Gửi cho Giang nha ♡";
    } catch (err) {
      const textarea = document.createElement("textarea");
      textarea.value = message;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      const ok = document.execCommand("copy");
      textarea.remove();
      copyStatus.textContent = ok ? "Đã sao chép! Gửi cho Giang nha ♡" : "Không sao chép tự động được — em hãy chọn và sao chép tên ba lá.";
    }
  }

  function reset() {
    selected = [];
    stage.classList.add("hidden");
    results.classList.add("hidden");
    intro.classList.remove("hidden");
    deck.replaceChildren();
    revealButton.classList.add("hidden");
    copyStatus.textContent = "";
  }

  shuffleButton.addEventListener("click", startShuffle);
  revealButton.addEventListener("click", revealCards);
  copyButton.addEventListener("click", copyCards);
  restart.addEventListener("click", reset);
})();
