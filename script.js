/* ==========================================
   CONTENT - EDIT HERE IF YOU WANT
========================================== */

// Reasons she is amazing
const reasons = [
  "You have a heart that cares deeply.",
  "Your smile can change someone's whole day.",
  "You're resilient, even when things get hard.",
  "You make people feel comfortable being themselves.",
  "You have great taste (especially in views).",
  "You're smarter than you give yourself credit for.",
  "You bring peace into the lives of people around you.",
  "You never stop trying, and that's beautiful.",
  "Your laugh is genuinely the best sound.",
  "You're loved more than you realize."
];

// Letters for different moods
const letters = [
  {
    title: "Open when you're sad",
    body: "I wish I could give you a massive hug right now. Whatever is going on, please remember that it's okay to feel sad. You don't always have to be strong. Let it out, take a deep breath, and remember that this feeling will pass. I'm always here for you, even from far away."
  },
  {
    title: "Open when you miss home",
    body: "Home isn't just a place—it's the warmth you carry inside you. It's the memories, the food, the laughs, and the people who love you. Canada is just where you are right now; home is where your heart is. And a big piece of my heart is always with you."
  },
  {
    title: "Open when you can't sleep",
    body: "Put the phone down after you read this. Close your eyes and take a slow, deep breath. You've done enough today. You don't have to figure everything out tonight. The world will wait for you to rest. Sweet dreams, Alima."
  },
  {
    title: "Open when you need a laugh",
    body: "Remember that time we laughed so hard we couldn't breathe? I still think about it randomly. Go watch a funny video, look at a silly meme, or text me something crazy. Life isn't that serious—we have to laugh through it. I miss your laugh!"
  },
  {
    title: "Open when you're stressed",
    body: "Breathe. Just pause for a second. You are doing so much better than you think. You don't have to do everything at once. Just pick one small thing to do today, and forget the rest for now. You've survived 100% of your bad days so far, you've got this one too."
  },
  {
    title: "Open when you feel alone",
    body: "Even though we are in different time zones, I am always just a message away. Distance means nothing when someone means everything. You are not a burden. You are not alone. I am here. Just text me."
  }
];

// Cool songs she'll love
const songs = [
  "Calm Down — Rema",
  "Essence — Wizkid ft. Tems",
  "Snooze — SZA",
  "Flowers — Miley Cyrus",
  "As It Was — Harry Styles",
  "Rush — Ayra Starr",
  "Die With A Smile — Lady Gaga & Bruno Mars",
  "Water — Tyla",
  "Golden — Harry Styles",
  "People — Libianca"
];

// Compliments for the game
const gameCompliments = [
  "You are glowing today.",
  "You matter more than you know.",
  "You're doing better than you think.",
  "You are loved, deeply.",
  "The world is better with you in it.",
  "You're enough, exactly as you are.",
  "Someone is grateful for you today.",
  "Keep going. You're amazing.",
  "You make life softer.",
  "Your energy is unmatched."
];

// Daily Dose data
const doseCompliments = [
  "You have a beautiful soul.",
  "You're more capable than you realize.",
  "Your kindness changes people.",
  "You're a good person, even on hard days.",
  "You bring light wherever you go."
];
const doseMemories = [
  "That time we laughed until we cried.",
  "The day we first met.",
  "Our deep late-night talks.",
  "That silly inside joke nobody else gets.",
  "The moment I knew you were special."
];
const doseSongs = [
  "Calm Down — Rema",
  "Snooze — SZA",
  "Rush — Ayra Starr",
  "Water — Tyla",
  "Golden — Harry Styles"
];
const doseQuotes = [
  "“She believed she could, so she did.”",
  "“You are enough, just as you are.”",
  "“Fall seven times, stand up eight.”",
  "“The best way out is always through.”",
  "“You are never too old to set another goal.”"
];

/* ==========================================
   BUILD REASONS WALL
========================================== */
const reasonsWall = document.getElementById("reasonsWall");
reasons.forEach((reason, i) => {
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

/* ==========================================
   BUILD OPEN WHEN LETTERS
========================================== */
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

/* ==========================================
   SONG OF THE DAY
========================================== */
let currentSongIndex = new Date().getDate() % songs.length;
const songDisplay = document.getElementById("songDisplay");

function displaySong() {
  songDisplay.innerText = songs[currentSongIndex];
}
displaySong();

function nextSong() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  displaySong();
}

/* ==========================================
   CHEER ME UP GAME
========================================== */
let score = 0;
const scoreEl = document.getElementById("score");
const complimentEl = document.getElementById("compliment");

function tapHeart() {
  score++;
  scoreEl.innerText = `Smiles: ${score}`;
  const random = gameCompliments[Math.floor(Math.random() * gameCompliments.length)];
  complimentEl.innerText = random;
}

/* ==========================================
   DAILY DOSE
========================================== */
function pick(arr, offset = 0) {
  const day = new Date().getDate() + offset;
  return arr[day % arr.length];
}

function refreshDose() {
  const offset = Math.floor(Math.random() * 100);
  document.getElementById("doseCompliment").innerText = pick(doseCompliments, offset);
  document.getElementById("doseMemory").innerText = pick(doseMemories, offset);
  document.getElementById("doseSong").innerText = pick(doseSongs, offset);
  document.getElementById("doseQuote").innerText = pick(doseQuotes, offset);
}
refreshDose();
