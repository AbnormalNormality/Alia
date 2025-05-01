function openDetails() {
  const details = document.querySelectorAll("details");

  details.forEach((detail) => {
    detail.open = true;
  });
}

function closeDetails() {
  const details = document.querySelectorAll("details");

  details.forEach((detail) => {
    detail.open = false;
  });
}

function handleKeyRelease(event) {
  if (event.key === "Enter") {
    openDetails();
  } else if (event.key == "Backspace") {
    closeDetails();
  } else if (event.altKey && event.code === "KeyR") {
    clearCacheAndReload();
  }
}

document.addEventListener("keyup", handleKeyRelease);

function handleHashNavigation() {
  if (window.location.hash) {
    let hash = window.location.hash.substring(1);
    let targetElement = document.getElementById(hash);
    if (targetElement) {
      if (targetElement.tagName.toLowerCase() === "details") {
        targetElement.open = true;
      }

      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  }
}

handleHashNavigation();

window.addEventListener("hashchange", handleHashNavigation);

function clearCacheAndReload() {
  if ("caches" in window) {
    caches
      .keys()
      .then(function (names) {
        for (let name of names) {
          caches.delete(name);
        }
      })
      .then(function () {
        window.location.reload(true);
      });
  } else {
    window.location.reload(true);
  }
}
