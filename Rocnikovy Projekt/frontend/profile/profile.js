const API = "http://localhost:3000/api";

const username = localStorage.getItem("username");

if (!username) {
  window.location.href = "../register/register.html";
}

document.getElementById("profile-username").textContent = username;

document.getElementById("logout-btn").addEventListener("click", () => {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  window.location.href = "../main/index.html";
});

async function loadProfile() {
  const res = await fetch(`${API}/profile?username=${username}`);
  const data = await res.json();

  if (!data.ok) {
    document.getElementById("tests-body").innerHTML = "<tr><td colspan='5'>Chyba pri načítaní</td></tr>";
    return;
  }

  const joined = new Date(data.user.created_at).toLocaleDateString("sk-SK");
  document.getElementById("profile-joined").textContent = joined;

  const tbody = document.getElementById("tests-body");
  if (data.tests.length === 0) {
    tbody.innerHTML = "<tr><td colspan='5'>Zatiaľ žiadne testy</td></tr>";
    return;
  }

  tbody.innerHTML = data.tests.map(t => `
    <tr>
      <td>${t.wpm}</td>
      <td>${t.raw_wpm}</td>
      <td>${t.accuracy}%</td>
      <td>${t.chars}</td>
      <td>${new Date(t.date).toLocaleDateString("sk-SK")}</td>
    </tr>
  `).join("");
}

loadProfile();