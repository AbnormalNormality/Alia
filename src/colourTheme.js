function updateModeDisplay() {
  const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  document.querySelectorAll(".lightOnly").forEach((el) => {
    el.style.display = isDark ? "none" : "";
  });

  document.querySelectorAll(".darkOnly").forEach((el) => {
    el.style.display = isDark ? "" : "none";
  });
}

updateModeDisplay();

window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", updateModeDisplay);
