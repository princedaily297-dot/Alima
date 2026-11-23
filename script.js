/* ==========================================
   MUSIC PLAYER
========================================== */
const music = document.getElementById("bgMusic");
const playBtn = document.getElementById("playBtn");

function toggleMusic() {
  if (music.paused) {
    music.play();
    playBtn.innerText = "❚❚ Pause";
  } else {
    music.pause();
    playBtn.innerText = "▶ Play";
  }
}

/* ==========================================
   LOVE LETTER
========================================== */
function showLoveLetter() {
  const letter = document.getElementById("hiddenLetter");
  letter.classList.toggle("show");
  const btn = document.querySelector(".love-btn");
  if (letter.classList.contains("show")) {
    btn.innerText = "Close Letter ✉️";
  } else {
    btn.innerText = "Open Letter 💌";
  }
}

/* ==========================================
   MEMORY MATCH GAME
========================================== */
const emojis = ["❤️", "🌹", "✨", "🧸", "🍫", "🌙"];
let memoryCards = [...emojis, ...emojis]; // Duplicate for pairs
let flippedCards = [];
let matchedPairs = 0;
let lockBoard = false;

// Shuffle function
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function initMemoryGame() {
  const grid = document.getElementById("memoryGame");
  grid.innerHTML = "";
  memoryCards = shuffle(memoryCards);
  flippedCards = [];
  matchedPairs = 0;
  lockBoard = false;
  document.getElementById("gameStatus").innerText = "";

  memoryCards.forEach((emoji, index) => {
    const card = document.createElement("div");
    card.classList.add("memory-card");
    card.dataset.emoji = emoji;
    card.dataset.index = index;
    card.innerText = "?"; // Hidden state
    card.addEventListener("click", flipCard);
    grid.appendChild(card);
  });
}

function flipCard() {
  if (lockBoard) return;
  if (this.classList.contains("flipped") || this.classList.contains("matched")) return;

  this.classList.add("flipped");
  this.innerText = this.dataset.emoji;
  flippedCards.push(this);

  if (flippedCards.length === 2) {
    checkMatch();
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;
  if (card1.dataset.emoji === card2.dataset.emoji) {
    card1.classList.add("matched");
    card2.classList.add("matched");
    matchedPairs++;
    flippedCards = [];
    
    if (matchedPairs === emojis.length) {
      document.getElementById("gameStatus").innerText = "You win! You're a perfect match! 💖";
      confettiBurst();
    }
  } else {
    lockBoard = true;
    setTimeout(() => {
      card1.classList.remove("flipped");
      card2.classList.remove("flipped");
      card1.innerText = "?";
      card2.innerText = "?";
      flippedCards = [];
      lockBoard = false;
    }, 1000);
  }
}

// Start the game
initMemoryGame();

/* ==========================================
   CHEER ME UP GAME
========================================== */
const gameCompliments = [
  "You are glowing today.", "You matter more than you know.",
  "You're doing better than you think.", "You are loved, deeply.",
  "The world is better with you in it.", "You're enough, exactly as you are.",
  "Someone is grateful for you today.", "Keep going. You're amazing."
];

let score = 0;
function tapHeart() {
  score++;
  document.getElementById("score").innerText = `Smiles: ${score}`;
  const random = gameCompliments[Math.floor(Math.random() * gameCompliments.length)];
  document.getElementById("compliment").innerText = random;
}

/* ==========================================
   FLOATING HEARTS MAGIC (Every tap)
========================================== */
document.body.addEventListener("click", function(e) {
  // Don't spawn hearts for buttons/inputs to avoid spam
  if(e.target.tagName === 'BUTTON' || e.target.tagName === 'INPUT') return;

  const heart = document.createElement("div");
  heart.classList.add("floating-heart");
  heart.innerText = ["❤️", "💖", "💕", "✨"][Math.floor(Math.random() * 4)];
  heart.style.left = e.clientX + "px";
  heart.style.top = e.clientY + "px";
  document.body.appendChild(heart);
  
  setTimeout(() => { heart.remove(); }, 1500);
});

// Small confetti effect when winning memory game
function confettiBurst() {
  for(let i=0; i<20; i++) {
    setTimeout(() => {
      const heart = document.createElement("div");
      heart.classList.add("floating-heart");
      heart.innerText = "🎉";
      heart.style.left = Math.random() * window.innerWidth + "px";
      heart.style.top = window.innerHeight / 2 + "px";
      document.body.appendChild(heart);
      setTimeout(() => heart.remove(), 1500);
    }, i * 50);
  }
}

/* ==========================================
   REASONS WALL & OPEN WHEN (From before)
========================================== */
const reasons = [
  "You have a heart that cares deeply.", "Your smile can change someone's whole day.",
  "You're resilient, even when things get hard.", "You make people feel comfortable being themselves.",
  "You have great taste (especially in views).", "You're smarter than you give yourself credit for.",
  "You bring peace into the lives of people around you.", "You never stop trying, and that's beautiful.",
  "Your laugh is genuinely the best sound.", "You're loved more than you realize."
];
const reasonsWall = document.getElementById("reasonsWall");
reasons.forEach((reason) => {
  const card = document.createElement("div");
  card.className = "reason-card";
  card.innerText = "Tap to reveal";
  card.onclick = () => {
    card.innerText = reason;
    card.classList.add("revealed");
    card.onclick = null; 
  };
  reasonsWall.appendChild(card);
});

const letters = [
  { title: "Open when you're sad", body: "I wish I could give you a massive hug right now. It's okay to feel sad. Let it out, take a deep breath, and remember that this feeling will pass. I'm always here." },
  { title: "Open when you miss home", body: "Home is the warmth you carry inside you. Canada is just where you are right now; home is where your heart is. A big piece of my heart is always with you." },
  { title: "Open when you can't sleep", body: "Put the phone down after this. Close your eyes and take a slow breath. You've done enough today. The world will wait for you to rest. Sweet dreams." },
  { title: "Open when you need a laugh", body: "Remember that time we laughed so hard we couldn't breathe? Go watch a funny video. Life isn't that serious—we have to laugh through it!" },
  { title: "Open when you're stressed", body: "Breathe. You are doing so much better than you think. Just pick one small thing to do today. You've survived 100% of your bad days so far." },
  { title: "Open when you feel alone", body: "Even though we are in different time zones, I am always just a message away. Distance means nothing when someone means everything. You are not alone." }
];
const lettersButtons = document.getElementById("lettersButtons");
const letterContent = document.getElementById("letterContent");
letters.forEach((letter) => {
  const btn = document.createElement("button");
  btn.className = "letter-btn";
  btn.innerText = letter.title.replace("Open when ", "");
  btn.onclick = () => {
    letterContent.innerHTML = `<h3>${letter.title}</h3><p>${letter.body}</p>`;
    letterContent.classList.remove("hidden");
  };
  lettersButtons.appendChild(btn);
});
