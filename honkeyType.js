const wordList = [
  "moan", "arrogant", "messy", "mind", "fabulous", "polish", "foolish", "straw", "skate", "blue",
  "teaching", "coal", "blue-eyed", "ants", "short", "malicious", "gigantic", "disapprove",
  "uneven", "fantastic", "terrific", "feeble", "fat", "blade", "prick", "godly",
  "habitual", "argument", "sleepy", "crate", "motionless", "kiss", "screeching", "lonely",
  "industrious", "grouchy", "zippy", "cub", "volcano", "right", "uttermost", "tail",
  "fragile", "tip", "chew", "apologise", "pull", "report", "seashore", "planes",
  "momentous", "excuse", "gorgeous", "scold", "finicky", "flagrant", "pray", "bent",
  "surprise", "surround", "bump", "incandescent", "cooing", "belligerent", "tent", "scary",
  "salt", "nutritious", "alert", "board", "approve", "creature", "support", "basin",
  "coherent", "meek", "press", "railway", "happy", "place", "aware", "train",
  "light", "deer", "unhealthy", "wind", "existence", "shape", "sail", "flavor",
  "abiding", "aunt", "proud", "torpid", "money", "punishment", "copy", "mine",
  "allow", "perform", "rose", "drip", "bolt", "holiday", "tank", "things",
  "gifted", "advice", "flap", "dare", "collect", "phone", "pie", "itch",
  "slim", "self", "ultra", "chief", "political", "possess", "next", "sordid",
  "possible", "glamorous", "jail", "outstanding", "cherry", "haircut", "elated", "oceanic",
  "replace", "disagreeable", "undesirable", "wriggle", "meddle", "empty", "turkey", "hate",
  "wren", "cloudy", "steep", "key", "useful", "lie", "broken", "deceive",
  "zany", "temporary", "volatile", "bang", "roll", "pretend", "feeling", "rob",
  "well-to-do", "branch", "respect", "wacky", "groan", "evanescent", "friends", "deafening",
  "inquisitive", "repulsive", "expand", "raise", "hypnotic", "appear", "invention", "winter",
  "reply", "texture", "ubiquitous", "two", "anxious", "health", "bells", "fetch",
  "team", "skinny", "adhesive", "scintillating", "whistle", "blow", "tense", "prose",
  "decorate", "important", "town", "day", "change", "expansion", "naughty", "license",
  "arrive", "lying", "kettle", "building","scarce", "retire", //200 slov
];
let testduration = 60;
let words = [];
let currentWordIndex = 0;
let currentInput = "";
let startTime = null;
let timeLeft = testduration;
let correctChars = 0;
let totalChars = 0;
let completedWords = [];
let timeInterval = null;

const timeBtn = document.getElementById("timeBtn");
const wordBtn = document.getElementById("wordBtn");
const container = document.getElementById("extended");
const typingInput = document.getElementById("typingInput");
const wordsDisplay = document.getElementById("wordsDisplay");
const timeDisplay = document.getElementById("timeDisplay");
const wpmDisplay = document.getElementById("wpmDisplay");
const accuracyDisplay = document.getElementById("accuracyDisplay");
const hint = document.getElementById("hint");
const testView = document.getElementById("testview");
const resultsView = document.getElementById("resultsView");

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
    wordSpan.id = `word-${index}`;

    if (index === currentWordIndex) {
      wordSpan.className = "word active";
      renderCurrentWord(wordSpan, word);
    } else if (index < currentWordIndex) {
      wordSpan.className =
        completedWords[index] === word
          ? "word-completed-correct"
          : "word-completed-incorrect";
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

function startTimer() {
  if (timeInterval) return;

  timeInterval = setInterval(() => {
    timeLeft--;
    timeDisplay.textContent = timeLeft;

    if (timeLeft <= 0) {
      endTest();
    }

    updateStats();
  }, 1000);
}

function updateStats() {
  if (!startTime) return;

  const timeElapsed = (testduration - timeLeft) / 60;
  const wpm = timeElapsed > 0 ? Math.round(correctChars / 5 / timeElapsed) : 0;
  const accuracy =
    totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 100;

  wpmDisplay.textContent = wpm;
  accuracyDisplay.textContent = accuracy;
}

function endTest() {
  clearInterval(timeInterval);
  typingInput.disabled = true;

  const timeElapsed = (testduration - timeLeft) / 60;
  const wpm = timeElapsed > 0 ? Math.round(correctChars / 5 / timeElapsed) : 0;
  const rawWpm = timeElapsed > 0 ? Math.round(totalChars / 5 / timeElapsed) : 0;
  const accuracy =
    totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 100;

  showResults(wpm, accuracy, rawWpm);
}

function showResults(wpm, accuracy, rawWpm) {
  document.getElementById("finalWpm").textContent = wpm;
  document.getElementById("finalAccuracy").textContent = accuracy + "%";
  document.getElementById("finalRawWpm").textContent = rawWpm;
  document.getElementById("finalChars").textContent = totalChars;

  resultsView.classList.remove("hidden");
}

function restartTest() {
  currentWordIndex = 0;
  currentInput = "";
  startTime = null;
  timeLeft = testduration;
  correctChars = 0;
  totalChars = 0;
  completedWords = [];
  clearInterval(timeInterval);
  timeInterval = null;

  timeDisplay.textContent = testduration;
  wpmDisplay.textContent = "0";
  accuracyDisplay.textContent = "100" + "%";
  hint.textContent = "Start typing to begin the test";

  generateWords();

  typingInput.value = "";
  typingInput.disabled = false;
  typingInput.focus();

  resultsView.classList.add("hidden");
  testView.classList.remove("hidden");
}

function setDuration(duration, event) {
  testduration = duration;
  restartTest();

  document.querySelectorAll(".nav button").forEach((btn) => {
    btn.classList.remove("active");
  });
  event.target.classList.add("active");
}

typingInput.addEventListener("input", (e) => {
  const value = e.target.value;

  if (!startTime && value.length > 0) {
    startTime = Date.now();
    startTimer();
    hint.textContent = "";
  }

  currentInput = value;
  renderWords();
});

typingInput.addEventListener("keydown", (e) => {
  if (e.key === " ") {
    e.preventDefault();

    const currentWord = words[currentWordIndex];
    const typedWord = currentInput.trim();

    const charsTyped = typedWord.length;
    let charsCorrect = 0;

    if (typedWord === currentWord) {
      charsCorrect = currentWord.length;
    } else {
      for (let i = 0; i < Math.min(typedWord.length, currentWord.length); i++) {
        if (typedWord[i] === currentWord[i]) {
          charsCorrect++;
        }
      }
    }

    totalChars += charsTyped;
    correctChars += charsCorrect;
    completedWords.push(typedWord);
    currentWordIndex++;
    currentInput = "";
    typingInput.value = "";

    renderWords();
    updateStats();
  }
});

typingInput.addEventListener("blur", () => {
  if (!typingInput.disabled) {
    typingInput.focus();
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Tab") {
    e.preventDefault();
  }

  if (e.key === "Tab" && e.shiftKey === false) {
    const nextKey = new Promise((resolve) => {
      const handler = (evt) => {
        if (evt.key === "Enter") {
          evt.preventDefault();
          restartTest();
        }
        document.removeEventListener("keydown", handler);
        resolve();
      };
      document.addEventListener("keydown", handler);
      setTimeout(() => {
        document.removeEventListener("keydown", handler);
        resolve();
      }, 1000);
    });
  }
});

generateWords();
typingInput.focus();

timeBtn.addEventListener("click", () => {
  container.innerHTML = "";
  const quar = document.createElement("button");
  const half = document.createElement("button");
  const full = document.createElement("button");
  quar.textContent = "15s";
  half.textContent = "30s";
  full.textContent = "60s";
  container.appendChild(quar);
  container.appendChild(half);
  container.appendChild(full);
  document.getElementById("mode").style.marginBottom = "5px";
  quar.addEventListener("click", () => setDuration(15));
  half.addEventListener("click", () => setDuration(30));
  full.addEventListener("click", () => setDuration(60));
});
timeBtn.addEventListener("mouseover", () => {
  document.getElementById("timeBtn").style.background = "white";
});

wordBtn.addEventListener("click", () => {
  container.innerHTML = "";
  const quar = document.createElement("button");
  const half = document.createElement("button");
  const full = document.createElement("button");
  quar.textContent = "30w";
  half.textContent = "50w";
  full.textContent = "100w";
  container.appendChild(quar);
  container.appendChild(half);
  container.appendChild(full);
  document.getElementById("mode").style.marginBottom = "5px";
});
