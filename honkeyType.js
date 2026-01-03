const timeBtn = document.getElementById("timeBtn");
const wordBtn = document.getElementById("wordBtn");
const container = document.getElementById("extended");
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
