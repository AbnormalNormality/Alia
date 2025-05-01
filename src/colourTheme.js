function updateModeDisplay() {
  const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  document.body.classList.toggle("dark-mode", isDark);
  document.body.classList.toggle("light-mode", !isDark);
}

updateModeDisplay();

window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", updateModeDisplay);
