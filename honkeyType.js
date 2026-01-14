console.log("HonkeyType Hybrid JS loaded");

const wordList = [
  "moan",
  "arrogant",
  "messy",
  "mind",
  "fabulous",
  "polish",
  "foolish",
  "straw",
  "skate",
  "blue",
  "teaching",
  "coal",
  "blue-eyed",
  "ants",
  "short",
  "malicious",
  "gigantic",
  "disapprove",
  "uneven",
  "fantastic",
  "terrific",
  "feeble",
  "fat",
  "blade",
  "prick",
  "godly",
  "habitual",
  "argument",
  "sleepy",
  "crate",
  "motionless",
  "kiss",
  "screeching",
  "lonely",
  "industrious",
  "grouchy",
  "zippy",
  "cub",
  "volcano",
  "right",
  "uttermost",
  "tail",
  "fragile",
  "tip",
  "chew",
  "apologise",
  "pull",
  "report",
  "seashore",
  "planes",
  "momentous",
  "excuse",
  "gorgeous",
  "scold",
  "finicky",
  "flagrant",
  "pray",
  "bent",
  "surprise",
  "surround",
  "bump",
  "incandescent",
  "cooing",
  "belligerent",
  "tent",
  "scary",
  "salt",
  "nutritious",
  "alert",
  "board",
  "approve",
  "creature",
  "support",
  "basin",
  "coherent",
  "meek",
  "press",
  "railway",
  "happy",
  "place",
  "aware",
  "train",
  "light",
  "deer",
  "unhealthy",
  "wind",
  "existence",
  "shape",
  "sail",
  "flavor",
  "abiding",
  "aunt",
  "proud",
  "torpid",
  "money",
  "punishment",
  "copy",
  "mine",
  "allow",
  "perform",
  "rose",
  "drip",
  "bolt",
  "holiday",
  "tank",
  "things",
  "gifted",
  "advice",
  "flap",
  "dare",
  "collect",
  "phone",
  "pie",
  "itch",
  "slim",
  "self",
  "ultra",
  "chief",
  "political",
  "possess",
  "next",
  "sordid",
  "possible",
  "glamorous",
  "jail",
  "outstanding",
  "cherry",
  "haircut",
  "elated",
  "oceanic",
  "replace",
  "disagreeable",
  "undesirable",
  "wriggle",
  "meddle",
  "empty",
  "turkey",
  "hate",
  "wren",
  "cloudy",
  "steep",
  "key",
  "useful",
  "lie",
  "broken",
  "deceive",
  "zany",
  "temporary",
  "volatile",
  "bang",
  "roll",
  "pretend",
  "feeling",
  "rob",
  "well-to-do",
  "branch",
  "respect",
  "wacky",
  "groan",
  "evanescent",
  "friends",
  "deafening",
  "inquisitive",
  "repulsive",
  "expand",
  "raise",
  "hypnotic",
  "appear",
  "invention",
  "winter",
  "reply",
  "texture",
  "ubiquitous",
  "two",
  "anxious",
  "health",
  "bells",
  "fetch",
  "team",
  "skinny",
  "adhesive",
  "scintillating",
  "whistle",
  "blow",
  "tense",
  "prose",
  "decorate",
  "important",
  "town",
  "day",
  "change",
  "expansion",
  "naughty",
  "license",
  "arrive",
  "lying",
  "kettle",
  "building",
  "scarce",
  "retire",
];

let testduration = 60;
let words = [];
let currentWordIndex = 0;
let currentInput = "";
let startTime = null;
let timeLeft = testduration;
let correctChars = 0;
let totalChars = 0;
let completedWordsStatus = []; // Sledovanie správnosti slov pre spolužiakov štýl
let timeInterval = null;
const PLACEHOLDER = "\u200B";

const typingInput = document.getElementById("typingInput");
const wordsDisplay = document.getElementById("wordsDisplay");
const timeDisplay = document.getElementById("timeDisplay");
const wpmDisplay = document.getElementById("wpmDisplay");
const accuracyDisplay = document.getElementById("accuracyDisplay");
const hint = document.getElementById("hint");
const resultsView = document.getElementById("resultsView");
const testView = document.getElementById("testView");
const container = document.getElementById("extended");
const timeBtn = document.getElementById("timeBtn");
const wordBtn = document.getElementById("wordBtn");

function generateWords() {
  words = [];
  completedWordsStatus = [];
  for (let i = 0; i < 200; i++) {
    words.push(wordList[Math.floor(Math.random() * wordList.length)]);
    completedWordsStatus.push(null);
  }
  renderWords();
}

function renderWords() {
  wordsDisplay.innerHTML = "";
  const displayWords = words.slice(0, 50);

  displayWords.forEach((word, index) => {
    const wordSpan = document.createElement("span");

    if (index === currentWordIndex) {
      wordSpan.className = "word active";
      renderCurrentWord(wordSpan, word);
    } else if (index < currentWordIndex) {
      // Spolužiakov štýl pre hotové slová
      wordSpan.className = completedWordsStatus[index]
        ? "word correct-word"
        : "word incorrect-word";
      wordSpan.textContent = word;
    } else {
      wordSpan.className = "word";
      wordSpan.textContent = word;
    }
    wordsDisplay.appendChild(wordSpan);
    wordsDisplay.appendChild(document.createTextNode(" "));
  });
}

function renderCurrentWord(wordSpan, word) {
  wordSpan.innerHTML = "";
  for (let i = 0; i < word.length; i++) {
    const charSpan = document.createElement("span");
    charSpan.className = "char";
    charSpan.textContent = word[i];
    if (i < currentInput.length) {
      charSpan.className =
        currentInput[i] === word[i] ? "char correct" : "char incorrect";
    }
    wordSpan.appendChild(charSpan);
  }
  if (currentInput.length > word.length) {
    for (let i = word.length; i < currentInput.length; i++) {
      const charSpan = document.createElement("span");
      charSpan.className = "char extra";
      charSpan.textContent = currentInput[i];
      wordSpan.appendChild(charSpan);
    }
  }
}

function updateStats() {
  const timeElapsed = (testduration - timeLeft) / 60;
  const wpm = timeElapsed > 0 ? Math.round(correctChars / 5 / timeElapsed) : 0;
  const accuracy =
    totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 100;

  wpmDisplay.textContent = wpm;
  accuracyDisplay.textContent = accuracy + "%";
}

function startTimer() {
  if (timeInterval) return;
  timeInterval = setInterval(() => {
    timeLeft--;
    timeDisplay.textContent = timeLeft + "s";
    updateStats();
    if (timeLeft <= 0) endTest();
  }, 1000);
}

function endTest() {
  clearInterval(timeInterval);
  typingInput.disabled = true;

  const timeElapsed = (testduration - timeLeft) / 60;
  const wpm = timeElapsed > 0 ? Math.round(correctChars / 5 / timeElapsed) : 0;
  const rawWpm = timeElapsed > 0 ? Math.round(totalChars / 5 / timeElapsed) : 0;
  const accuracy =
    totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 100;

  // Vyplnenie oboch verzií výsledkov (pre istotu)
  const ids = [
    "finalWpm",
    "resWpm",
    "finalAccuracy",
    "resAccuracy",
    "finalRawWpm",
    "resRaw",
    "finalChars",
    "resChars",
  ];
  const vals = [
    wpm,
    wpm,
    accuracy + "%",
    accuracy + "%",
    rawWpm,
    rawWpm,
    totalChars,
    totalChars,
  ];

  ids.forEach((id, i) => {
    const el = document.getElementById(id);
    if (el) el.textContent = vals[i];
  });

  resultsView.classList.remove("hidden");
  testView.classList.add("hidden");
}

function restartTest() {
  clearInterval(timeInterval);
  timeInterval = null;
  startTime = null;
  timeLeft = testduration;
  currentWordIndex = 0;
  currentInput = "";
  correctChars = 0;
  totalChars = 0;

  timeDisplay.textContent = timeLeft + "s";
  wpmDisplay.textContent = 0;
  accuracyDisplay.textContent = "100%";
  hint.textContent = "Start typing...";

  resultsView.classList.add("hidden");
  testView.classList.remove("hidden");

  generateWords();

  typingInput.disabled = false;
  typingInput.value = PLACEHOLDER;
  typingInput.focus();
}

function setDuration(dur, e) {
  testduration = dur;
  document
    .querySelectorAll(".submode-btn")
    .forEach((b) => b.classList.remove("active"));
  if (e && e.target) e.target.classList.add("active");
  restartTest();
}

// Funkcia, ktorú si neskôr DOPLNÍŠ SAMA pre Words mód
function setWordCount(count, e) {
  console.log("Tu raz bude logika pre limit slov: " + count);
  // Tip pre teba: Budeš musieť zmeniť podmienku v startTimer alebo v input evente
}

typingInput.addEventListener("input", (e) => {
  if (!typingInput.value.startsWith(PLACEHOLDER)) {
    typingInput.value = PLACEHOLDER + typingInput.value;
  }

  const cleanValue = typingInput.value.substring(1);

  if (!startTime && cleanValue.length > 0) {
    startTime = Date.now();
    startTimer();
    hint.textContent = "";
  }

  if (cleanValue.endsWith(" ")) {
    const typedWord = cleanValue.trim();
    const targetWord = words[currentWordIndex];

    completedWordsStatus[currentWordIndex] = typedWord === targetWord;

    let wordCorrectChars = 0;
    for (let i = 0; i < Math.min(typedWord.length, targetWord.length); i++) {
      if (typedWord[i] === targetWord[i]) wordCorrectChars++;
    }

    correctChars += wordCorrectChars;
    if (typedWord === targetWord) correctChars++;
    totalChars += typedWord.length + 1;

    currentWordIndex++;
    currentInput = "";
    typingInput.value = PLACEHOLDER;

    renderWords();
    updateStats();
    return;
  }

  currentInput = cleanValue;
  renderWords();
});

// Ovládanie menu - Time
timeBtn.addEventListener("click", () => {
  timeBtn.classList.add("active");
  wordBtn.classList.remove("active");
  container.innerHTML = "";
  [15, 30, 60].forEach((t) => {
    const btn = document.createElement("button");
    btn.textContent = t + "s";
    btn.className = "submode-btn" + (t === testduration ? " active" : "");
    btn.addEventListener("click", (e) => setDuration(t, e));
    container.appendChild(btn);
  });
});

// Ovládanie menu - Words (Pripravené pre teba)
wordBtn.addEventListener("click", () => {
  wordBtn.classList.add("active");
  timeBtn.classList.remove("active");
  container.innerHTML = "";
  [10, 25, 50].forEach((w) => {
    const btn = document.createElement("button");
    btn.textContent = w + "w";
    btn.className = "submode-btn";
    btn.addEventListener("click", (e) => {
      document
        .querySelectorAll(".submode-btn")
        .forEach((b) => b.classList.remove("active"));
      e.target.classList.add("active");
      setWordCount(w, e);
    });
    container.appendChild(btn);
  });
});

// Spustenie pri načítaní
generateWords();
