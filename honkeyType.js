console.log("HonkeyType.js loaded successfully");

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
  for (let i = 0; i < 200; i++) {
    words.push(wordList[Math.floor(Math.random() * wordList.length)]);
  }
  renderWords();
}

function renderWords() {
  wordsDisplay.innerHTML = "";
  const displayWords = words.slice(0, 50);

  displayWords.forEach((word, index) => {
    const wordSpan = document.createElement("span");
    wordSpan.className = "word";

    if (index === currentWordIndex) {
      wordSpan.className = "word active";
      renderCurrentWord(wordSpan, word);
    } else if (index < currentWordIndex) {
      wordSpan.style.color = "#444";
      wordSpan.textContent = word;
    } else {
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
    timeDisplay.textContent = timeLeft;
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

  document.getElementById("finalWpm").textContent = wpm;
  document.getElementById("finalAccuracy").textContent = accuracy + "%";
  document.getElementById("finalRawWpm").textContent = rawWpm;
  document.getElementById("finalChars").textContent = totalChars;

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

  timeDisplay.textContent = timeLeft;
  wpmDisplay.textContent = 0;
  hint.textContent = "Start typing...";

  resultsView.classList.add("hidden");
  testView.classList.remove("hidden");

  generateWords();

  typingInput.disabled = false;
  typingInput.value = PLACEHOLDER;
  typingInput.focus();
  typingInput.setSelectionRange(1, 1);
}

function setDuration(dur, e) {
  testduration = dur;
  document
    .querySelectorAll(".submode-btn")
    .forEach((b) => b.classList.remove("active"));
  if (e && e.target) e.target.classList.add("active");
  restartTest();
}

typingInput.addEventListener("input", (e) => {
  if (!typingInput.value.startsWith(PLACEHOLDER)) {
    typingInput.value = PLACEHOLDER + typingInput.value;
    typingInput.setSelectionRange(
      typingInput.value.length,
      typingInput.value.length
    );
  }

  const cleanValue = typingInput.value.substring(1);

  if (!startTime && cleanValue.length > 0) {
    startTime = Date.now();
    startTimer();
  }

  if (cleanValue.endsWith(" ")) {
    const typedWord = cleanValue.trim();
    const targetWord = words[currentWordIndex];

    let wordCorrectChars = 0;
    if (typedWord === targetWord) {
      wordCorrectChars = targetWord.length;
    } else {
      for (let i = 0; i < Math.min(typedWord.length, targetWord.length); i++) {
        if (typedWord[i] === targetWord[i]) wordCorrectChars++;
      }
    }

    correctChars += wordCorrectChars;
    if (typedWord === targetWord) correctChars++;
    totalChars += typedWord.length + 1;

    currentWordIndex++;
    currentInput = "";
    typingInput.value = PLACEHOLDER;
    typingInput.setSelectionRange(1, 1);

    renderWords();
    updateStats();
    return;
  }

  currentInput = cleanValue;
  renderWords();
});

typingInput.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft" && typingInput.selectionStart <= 1) {
    e.preventDefault();
  }
});

document.addEventListener("click", () => {
  if (typingInput && !typingInput.disabled) {
    typingInput.focus();
  }
});

timeBtn.addEventListener("click", () => {
  timeBtn.classList.add("active");
  wordBtn.classList.remove("active");

  container.innerHTML = "";

  const times = [15, 30, 60];
  times.forEach((t) => {
    const btn = document.createElement("button");
    btn.textContent = t + "s";
    btn.className = "submode-btn" + (t === 60 ? " active" : "");
    btn.addEventListener("click", (e) => setDuration(t, e));
    container.appendChild(btn);
  });

  setDuration(60, null);
});

restartTest();

container.innerHTML = "";
[15, 30, 60].forEach((t) => {
  const btn = document.createElement("button");
  btn.textContent = t + "s";
  btn.className = "submode-btn" + (t === 60 ? " active" : "");
  btn.addEventListener("click", (e) => setDuration(t, e));
  container.appendChild(btn);
});
