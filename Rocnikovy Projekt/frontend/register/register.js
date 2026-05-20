const API = "http://localhost:3000/api/auth";

const regBtn = document.getElementById("reg-btn");
const loginBtn = document.getElementById("login-btn");

const regUsername = document.getElementById("reg-username");
const regPassword = document.getElementById("reg-password");
const regPasswordVerify = document.getElementById("reg-password-verify");

const loginUsername = document.getElementById("login-username");
const loginPassword = document.getElementById("login-password");

// Register
regBtn.addEventListener("click", async () => {
  const username = regUsername.value.trim();
  const password = regPassword.value;
  const passwordVerify = regPasswordVerify.value;

  if (!username || !password) return alert("Vyplň username a heslo");
  if (password !== passwordVerify) return alert("Heslá sa nezhodujú");

  const res = await fetch(`${API}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });

  const data = await res.json();

  if (data.ok) {
    alert(`Účet vytvorený! Vitaj, ${data.user.username}`);
  } else {
    alert(data.message || "Chyba pri registrácii");
  }
});

// Login
loginBtn.addEventListener("click", async () => {
  const username = loginUsername.value.trim();
  const password = loginPassword.value;

  if (!username || !password) return alert("Vyplň username a heslo");

  const res = await fetch(`${API}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });

  const data = await res.json();

  if (data.ok) {
    localStorage.setItem("token", data.token);
    localStorage.setItem("username", data.username);
    window.location.href = "../main/index.html";
  } else {
    alert(data.message || "Nesprávne údaje");
  }
});