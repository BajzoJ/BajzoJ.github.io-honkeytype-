(function() {
    const savedTheme = localStorage.getItem("theme") || "light";
    const mainStyle = document.getElementById("style");
    const regStyle = document.getElementById("regStyle");

    if (savedTheme === "dark") {
        if (mainStyle) mainStyle.href = "honkeyTypeDark.css";
        if (regStyle) regStyle.href = "registerDark.css";
    }
})();

document.addEventListener("DOMContentLoaded", function() {
    const savedTheme = localStorage.getItem("theme") || "light";
    applyTheme(savedTheme);

    const colorBtn = document.getElementById("colorBtn");
    if (colorBtn) {
        colorBtn.addEventListener("click", function() {
            const currentTheme = localStorage.getItem("theme") || "light";
            const newTheme = (currentTheme === "light") ? "dark" : "light";
            localStorage.setItem("theme", newTheme);
            applyTheme(newTheme);
        });
    }
});

function applyTheme(theme) {
    const mainStyle = document.getElementById("style");
    const regStyle = document.getElementById("regStyle");
    const colBtn = document.getElementById("colorBtn");

    if (theme === "dark") {
        if (mainStyle) mainStyle.href = "honkeyTypeDark.css";
        if (regStyle) regStyle.href = "registerDark.css";
        if (colBtn) colBtn.innerHTML = "light mode";
    } else {
        if (mainStyle) mainStyle.href = "honkeyType.css";
        if (regStyle) regStyle.href = "register.css";
        if (colBtn) colBtn.innerHTML = "dark mode";
    }
}
