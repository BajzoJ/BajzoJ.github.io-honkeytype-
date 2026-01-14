console.log("HonkeyType Hybrid JS loaded");

/* ============================================================
   1. ZOZNAM SLOV (Slovná zásoba)
   Pole reťazcov, z ktorého systém náhodne vyberá slová pre test.
   ============================================================ */
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
  "replace", "disagreeable", "undesirable", "wriggle", "meddle", "empty", "turkey",
  "hate", "wren", "cloudy", "steep", "key", "useful", "lie", "broken", "deceive",
  "zany", "temporary", "volatile", "bang", "roll", "pretend", "feeling", "rob",
  "well-to-do", "branch", "respect", "wacky", "groan", "evanescent", "friends",
  "deafening", "inquisitive", "repulsive", "expand", "raise", "hypnotic", "appear",
  "invention", "winter", "reply", "texture", "ubiquitous", "two", "anxious",
  "health", "bells", "fetch", "team", "skinny", "adhesive", "scintillating",
  "whistle", "blow", "tense", "prose", "decorate", "important", "town", "day",
  "change", "expansion", "naughty", "license", "arrive", "lying", "kettle",
  "building", "scarce", "retire",
];

/* ============================================================
   2. GLOBÁLNE PREMENNÉ (Stav aplikácie)
   Tieto hodnoty sledujú aktuálny stav tvojho testu.
   ============================================================ */
let testduration = 60;      // Základná dĺžka v sekundách
let words = [];             // Aktuálna sada vygenerovaných slov
let currentWordIndex = 0;   // Index slova, ktoré sa práve píše
let currentInput = "";      // Aktuálne napísané znaky v slove
let startTime = null;       // Timestamp začiatku testu
let timeLeft = testduration;// Odpočítavaný čas
let correctChars = 0;       // Počet správne napísaných znakov (pre WPM)
let totalChars = 0;         // Celkový počet znakov (pre presnosť)
let completedWordsStatus = []; // Ukladá true/false pre každé dokončené slovo
let timeInterval = null;    // Referencia na časovač (setInterval)
const PLACEHOLDER = "\u200B"; // Špeciálny znak, aby input nebol nikdy prázdny
let currentMode = "time";   // Mód: "time" (časový) alebo "words" (na počet slov)
let wordLimit = 30;         // Počet slov pre Words mód

/* ============================================================
   3. DOM ELEMENTY
   Prepojenie JS premenných s HTML prvkami na stránke.
   ============================================================ */
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
const settings = document.querySelector(".settings");

/* ============================================================
   4. FUNKCIA: generateWords()
   Vytvorí pole náhodných slov podľa zvoleného režimu.
   ============================================================ */
function generateWords() {
  words = [];
  completedWordsStatus = [];

  let wordAmount;
  // Ak sme v režime slov, vygenerujeme presný počet, inak 200 (pre časový mód)
  if(currentMode === "words"){
    wordAmount = wordLimit;
  } else {
    wordAmount = 200;
  }

  for(let i = 0; i < wordAmount; i++){
    // Náhodný výber z wordListu
    words.push(wordList[Math.floor(Math.random() * wordList.length)]);
    completedWordsStatus.push(null); // Pripravíme pole pre neskoršie hodnotenie
  }
  renderWords(); // Vykreslíme ich do trenažéra
}

/* ============================================================
   5. FUNKCIA: renderWords()
   Hlavná zobrazovacia funkcia. Vykresľuje slová v trenažéri.
   Používa dynamické orezanie (slice), aby sa slová posúvali.
   ============================================================ */
function renderWords() {
  wordsDisplay.innerHTML = "";

  // Výpočet okna zobrazenia (aby sa slová hýbali ako v riadku)
  let start = Math.max(0, currentWordIndex - 2);
  let end = start + 40; // Zobrazujeme naraz 40 slov
  const displayWords = words.slice(start, end);

  displayWords.forEach((word, index) => {
    let realIndex = start + index; // Prepočet na globálny index v poli 'words'
    const wordSpan = document.createElement("span");

    // Vetvenie podľa toho, v akom stave je slovo
    if (realIndex === currentWordIndex) {
      wordSpan.className = "word active"; // Slovo, ktoré práve píšeš
      renderCurrentWord(wordSpan, word);
    } else if (realIndex < currentWordIndex) {
      // Slová, ktoré si už prešla (správne = zelené, nesprávne = červené)
      wordSpan.className = completedWordsStatus[realIndex]
        ? "word correct-word"
        : "word incorrect-word";
      wordSpan.textContent = word;
    } else {
      wordSpan.className = "word"; // Slová v poradí
      wordSpan.textContent = word;
    }
    wordsDisplay.appendChild(wordSpan);
    wordsDisplay.appendChild(document.createTextNode(" ")); // Pridá medzeru medzi spany
  });
}

/* ============================================================
   6. FUNKCIA: renderCurrentWord()
   Detailne vykresľuje písmená vnútri aktívneho slova.
   Umožňuje vizuálnu spätnú väzbu (zelené/červené písmená).
   ============================================================ */
function renderCurrentWord(wordSpan, word) {
  wordSpan.innerHTML = "";
  for (let i = 0; i < word.length; i++) {
    const charSpan = document.createElement("span");
    charSpan.className = "char";
    charSpan.textContent = word[i];
    
    // Porovnanie tvojho vstupu s predlohou písmeno po písmene
    if (i < currentInput.length) {
      charSpan.className =
        currentInput[i] === word[i] ? "char correct" : "char incorrect";
    }
    wordSpan.appendChild(charSpan);
  }
  
  // Logika pre "extra" písmená (ak napíšeš dlhšie slovo než treba)
  if (currentInput.length > word.length) {
    for (let i = word.length; i < currentInput.length; i++) {
      const charSpan = document.createElement("span");
      charSpan.className = "char extra";
      charSpan.textContent = currentInput[i];
      wordSpan.appendChild(charSpan);
    }
  }
}

/* ============================================================
   7. FUNKCIA: updateStats()
   Prepočítava štatistiky v reálnom čase počas testu.
   ============================================================ */
function updateStats() {
  // Výpočet uplynutého času v minútach
  const timeElapsed = (testduration - timeLeft) / 60;
  // WPM (Words Per Minute) - rátame 5 znakov ako jedno slovo
  const wpm = timeElapsed > 0 ? Math.round(correctChars / 5 / timeElapsed) : 0;
  // Accuracy (Presnosť) - pomer správnych znakov k všetkým
  const accuracy =
    totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 100;

  wpmDisplay.textContent = wpm;
  accuracyDisplay.textContent = accuracy + "%";
}

/* ============================================================
   8. FUNKCIA: startTimer()
   Spúšťa odpočítavanie času a volá aktualizáciu štatistík.
   ============================================================ */
function startTimer() {
  if (timeInterval || currentMode === "words") return; // Zabezpečí, aby nebežalo viac časovačov naraz
  timeInterval = setInterval(() => {
    timeLeft--;
    timeDisplay.textContent = timeLeft + "s";
    updateStats();
    if (timeLeft <= 0) endTest(); // Zastavenie pri nule
  }, 1000);
}

/* ============================================================
   9. FUNKCIA: endTest()
   Ukončí test, zablokuje vstup a zobrazí výslednú tabuľku.
   Tu je tá "polka kódu", ktorú si predtým spomínala.
   ============================================================ */

function endTest() {
  clearInterval(timeInterval);
  typingInput.disabled = true;

  // Ak sme v móde slov, čas vypočítame z reálneho času od štartu po teraz
  let timeElapsed;
  if (currentMode === "words") {
    timeElapsed = (Date.now() - startTime) / 60000; // v minútach
  } else {
    timeElapsed = (testduration - timeLeft) / 60; // v minútach
  }
  const wpm = timeElapsed > 0 ? Math.round(correctChars / 5 / timeElapsed) : 0;
  const rawWpm = timeElapsed > 0 ? Math.round(totalChars / 5 / timeElapsed) : 0;
  const accuracy =
    totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 100;

  // Vyplnenie všetkých ID pre výsledkovú tabuľku (WPM, Raw, Acc, Chars)
  const ids = [
    "finalWpm", "resWpm", "finalAccuracy", "resAccuracy",
    "finalRawWpm", "resRaw", "finalChars", "resChars"
  ];
  const vals = [
    wpm, wpm, accuracy + "%", accuracy + "%",
    rawWpm, rawWpm, totalChars, totalChars
  ];

  // Dynamické zapísanie hodnôt do HTML
  ids.forEach((id, i) => {
    const el = document.getElementById(id);
    if (el) el.textContent = vals[i];
  });

  resultsView.classList.remove("hidden"); // Zobrazenie výsledkov
  testView.classList.add("hidden");       // Skrytie písania
  if(settings) settings.classList.add("hidden"); // Skrytie nastavení
}

/* ============================================================
   10. FUNKCIA: restartTest()
   Resetuje všetky premenné a pripraví trenažér na nový štart.
   ============================================================ */
/**
 * FUNKCIA restartTest:
 * Tu bola chyba. Musíme jasne povedať, že ak sme v móde slov, 
 * displej musí brať 'wordLimit' a nie 'testduration'.
 */
function restartTest() {
  clearInterval(timeInterval);
  timeInterval = null;
  startTime = null;
  
  // Resetujeme čas na základnú dĺžku (napr. 60s)
  timeLeft = testduration; 

  currentWordIndex = 0;
  currentInput = "";
  correctChars = 0;
  totalChars = 0;

  // OPRAVA: Tu sa rozhodne, čo uvidíš v krúžku pri štarte
  if (currentMode === "words") {
    timeDisplay.textContent = wordLimit + "w"; // Ak sú to slová, ukáž limit (30, 50, 100)
  } else {
    timeDisplay.textContent = timeLeft + "s";  // Ak je to čas, ukáž sekundy (15, 30, 60)
  }

  wpmDisplay.textContent = 0;
  accuracyDisplay.textContent = "100%";
  hint.textContent = "Start typing...";

  resultsView.classList.add("hidden");
  testView.classList.remove("hidden"); // Skryjeme nastavenia počas testu

  generateWords(); // Vygeneruje správny počet slov podľa módu

  typingInput.disabled = false;
  typingInput.value = PLACEHOLDER;
  typingInput.focus();
}

/* ============================================================
   11. OVLÁDANIE MÓDOV (Time/Words)
   Funkcie, ktoré reagujú na kliknutia v hornom menu.
   ============================================================ */
function setDuration(dur, e) {
  testduration = dur;
  document.querySelectorAll(".submode-btn").forEach((b) => b.classList.remove("active"));
  if (e && e.target) e.target.classList.add("active");
  restartTest();
}

function setWordCount(count, e) {
  currentMode = "words";
  wordLimit = count;

  clearInterval(timeInterval);
  timeInterval = null;
// Opravený riadok v restartTest:
timeDisplay.textContent = (currentMode === "words") ? wordLimit + "w" : timeLeft + "s";
  restartTest();
}

/* ============================================================
   12. EVENT LISTENERY
   Sledujú tvoje písanie a klikanie na tlačidlá.
   ============================================================ */

// Sledovanie vstupu v inpute
typingInput.addEventListener("input", (e) => {
  if (!typingInput.value.startsWith(PLACEHOLDER)) {
    typingInput.value = PLACEHOLDER + typingInput.value;
  }

  const cleanValue = typingInput.value.substring(1);

  // Spustenie pri prvom písmene
  if (!startTime && cleanValue.length > 0) {
    startTime = Date.now();
    startTimer();
    hint.textContent = "";
  }

  // Ak stlačíš MEDZERU
  if (cleanValue.endsWith(" ")) {
    const typedWord = cleanValue.trim();
    const targetWord = words[currentWordIndex];

    completedWordsStatus[currentWordIndex] = typedWord === targetWord;

    // Logika pre rátanie správnych písmen (pre WPM)
    let wordCorrectChars = 0;
    for (let i = 0; i < Math.min(typedWord.length, targetWord.length); i++) {
      if (typedWord[i] === targetWord[i]) wordCorrectChars++;
    }

    correctChars += wordCorrectChars;
    if (typedWord === targetWord) correctChars++; // Pridá bod za medzeru
    totalChars += typedWord.length + 1;

    currentWordIndex++; // Posun na ďalšie slovo

    // Ukončenie v režime slov
    if(currentMode === "words" && currentWordIndex === wordLimit) {
        endTest();
        return;
    }

    currentInput = "";
    typingInput.value = PLACEHOLDER;
    renderWords();
    updateStats();
    return;
  }

  currentInput = cleanValue;
  renderWords();
});

// Ovládanie menu - Time (Sekundy)
timeBtn.addEventListener("click", () => {
  currentMode = "time";
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

// Ovládanie menu - Words (Slová)
wordBtn.addEventListener("click", () => {
  currentMode = "words";
  wordBtn.classList.add("active");
  timeBtn.classList.remove("active");
  container.innerHTML = "";
  [30, 50, 100].forEach((w) => {
    const btn = document.createElement("button");
    btn.textContent = w + "w";
    btn.className = "submode-btn";
    btn.addEventListener("click", (e) => {
      document.querySelectorAll(".submode-btn").forEach((b) => b.classList.remove("active"));
      e.target.classList.add("active");
      setWordCount(w, e);
    });
    container.appendChild(btn);
  });
});

// PRVOTNÉ NAŠTARTOVANIE
generateWords();
