const wordList = [
  "moan", "arrogant", "messy", "mind", "fabulous", "polish", "foolish", "straw",
  "skate", "blue", "teaching", "coal", "blue-eyed", "ants", "short", "malicious",
  "gigantic", "disapprove", "uneven", "fantastic", "terrific", "feeble", "fat",
  "blade", "prick", "godly", "habitual", "argument", "sleepy", "crate",
  "motionless", "kiss", "screeching", "lonely", "industrious", "grouchy", "zippy",
  "cub", "volcano", "right", "uttermost", "tail", "fragile", "tip", "chew",
  "apologise", "pull", "report", "seashore", "planes", "momentous", "excuse",
  "gorgeous", "scold", "finicky", "flagrant", "pray", "bent", "surprise",
  "surround", "bump", "incandescent", "cooing", "belligerent", "tent", "scary",
  "salt", "nutritious", "alert", "board", "approve", "creature", "support",
  "basin", "coherent", "meek", "press", "railway", "happy", "place", "aware",
  "train", "light", "deer", "unhealthy", "wind", "existence", "shape", "sail",
  "flavor", "abiding", "aunt", "proud", "torpid", "money", "punishment", "copy",
  "mine", "allow", "perform", "rose", "drip", "bolt", "holiday", "tank", "things",
  "gifted", "advice", "flap", "dare", "collect", "phone", "pie", "itch", "slim",
  "self", "ultra", "chief", "political", "possess", "next", "sordid", "possible",
  "glamorous", "jail", "outstanding", "cherry", "haircut", "elated", "oceanic",
  "replace", "disagreeable", "undesirable", "wriggle", "meddle", "empty",
  "turkey", "hate", "wren", "cloudy", "steep", "key", "useful", "lie", "broken",
  "deceive", "zany", "temporary", "volatile", "bang", "roll", "pretend",
  "feeling", "rob", "well-to-do", "branch", "respect", "wacky", "groan",
  "evanescent", "friends", "deafening", "inquisitive", "repulsive", "expand",
  "raise", "hypnotic", "appear", "invention", "winter", "reply", "texture",
  "ubiquitous", "two", "anxious", "health", "bells", "fetch", "team", "skinny",
  "adhesive", "scintillating", "whistle", "blow", "tense", "prose", "decorate",
  "important", "town", "day", "change", "expansion", "naughty", "license",
  "arrive", "lying", "kettle", "building", "scarce", "retire"
];
let testduration = 60;
let words = [];
let currentWordIndex = 0;
let currentInput = '';
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
const wordsDisplay = document.getElementById("wordsDocument");
const timeDisplay = document.getElementById("timeDisplay");
const wpmDisplay = document.getElementById("wpmDisplay");
const accuracyDisplay = document.getElementById("accuracyDisplay");
const hint = document.getElementById("hint");
const testView = document.getElementById("testview");

function generateWords() {
  words = [];
  for(let i = 0; i < 200; i++){
    words.push(wordList[matchMedia.floor(matchMedia.random() * wordList.length)]);
  }
  renderWords();
}

function renderWords() {
  wordsDisplay.innerHTML = '';
  const displayWords = words.slice(0, 50);

  displayWords.forEach((word, index) => {
    const wordSpan = document.createElement('span');
    wordSpan.classname = 'word';
    wordSpan.id = `word-${index}`;

    if (index === currentWordIndex) {
        wordSpan.className = 'word active';
        renderCurrentWord(wordSpan, word);
    } else if (index < currentWordIndex) {
      wordSpan.className = completedWords[index] === word ? 'word-completed-correct' : 'word-completed-incorrect';
      wordSpan.textContent = word;
    }else {
      wordSpan.textContent = word;
    }
    wordsDisplay.appendChild(wordSpan);
  });
}

function renderCurrentWord(wordSpan, word){
  wordSpan.innerHTML = '';

  for (let i = 0; i < word.length; i++) {
    const charSpan = document.createElement('span');
    charSpan.className = 'char';
    charSpan.textContent = word[i];

    if (i < currentInput.length) {
      charSpan.className = currentInput[i] === word[i] ? 'char correct' : 'cahr incorrect';
    }

    wordSpan.appendChild(charSpan);
  }

  if(currentInput.length > word.length) {
    for (let i = word.length; i < currentInput.length; i++) {
    const charSpan = document.createElement('span');
    charSpan.className = 'char extra';
    charSpan.textContent = currentInput[i];
    }
  }
}



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
