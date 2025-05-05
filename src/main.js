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
  if (event.altKey && event.key === "Enter") {
    openDetails();
  } else if (event.altKey && event.key == "Backspace") {
    closeDetails();
  } else if (event.altKey && event.code === "KeyR") {
    clearCacheAndReload();
  } else if (event.altKey && event.code === "Slash") {
    showHelp((fromConsole = false));
  } else if (event.altKey && event.key === "c") {
    getLatestCommitMessage();
  } else if (event.altKey && event.key === "g") {
    window.open("https://github.com/AbnormalNormality/Alia", "_blank");
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

function showHelp(fromConsole = true) {
  console.log(
    `%cAlt+R%c
  Clear cache and reload
%cAlt+Enter%c
  Open all details
%cAlt+Backspace%c
  Close all details
%cAlt+/%c
  Show help message
%cAlt+C%c
  Show the latest commit
%cAlt+G%c
  Visit this pages repository`,
    "font-weight: bold;",
    "font-weight: unset;",
    "font-weight: bold;",
    "font-weight: unset;",
    "font-weight: bold;",
    "font-weight: unset;",
    "font-weight: bold;",
    "font-weight: unset;",
    "font-weight: bold;",
    "font-weight: unset;",
    "font-weight: bold;",
    "font-weight: unset;"
  );

  if (!fromConsole) {
    let key = "F12";

    const ua = navigator.userAgent;

    if (ua.includes("Firefox")) {
      key = "Ctrl+Shift+K";
    } else if (ua.includes("Edg")) {
      key = "Ctrl+Shift+I"; // Edge
    } else if (ua.includes("Chrome")) {
      key = "Ctrl+Shift+J"; // Chrome
    } else if (ua.includes("Safari") && !ua.includes("Chrome")) {
      key = "Cmd+Option+C"; // Safari on Mac
    }

    alert(`A help message has been issued via the console.
To open the console, try pressing ${key}.
To avoid this popup in the future, use showHelp() instead.`);
  }
}

async function getLatestCommitMessage() {
  const url =
    "https://api.github.com/repos/abnormalnormality/alia/commits/main";

  try {
    const response = await fetch(url);

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const data = await response.json();

    const isoDate = data.commit.author.date;
    const formattedDate = new Date(isoDate).toLocaleString("en-Au", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      timeZoneName: "shortGeneric",
    });

    author = data.commit.author;
    message = data.commit.message;

    console.log(`[${formattedDate}, ${author.name}]
 '${message}'`);
  } catch (error) {}
}

console.log(
  `Follow me on %cGitHub%c at https://github.com/AbnormalNormality!
Use %cAlt+/%c or %cshowHelp()%c to see listed keybinds.`,
  "font-weight: bold;",
  "font-weight: unset;",
  "font-weight: bold;",
  "font-weight: unset;",
  "font-weight: bold;",
  "font-weight: unset;"
);

document.querySelectorAll(".sort-children").forEach((list) => {
  const items = Array.from(list.children);

  const key = list.getAttribute("sorting-key") || "value";
  const order = list.getAttribute("sorting-order") || "ascending";

  const isDescending = ["descending", "reverse"].includes(order.toLowerCase());

  items.sort((a, b) => {
    const aValue = parseFloat(a.getAttribute(key));
    const bValue = parseFloat(b.getAttribute(key));

    return isDescending
      ? bValue - aValue // descending
      : aValue - bValue; // ascending
  });

  list.innerHTML = "";
  items.forEach((item) => list.appendChild(item));
});

const pages = {
  Homepage: "pages/index.html",
  Who: [
    "pages/who.html#who-am-i",
    {
      "Who - Who Am I?": "pages/who.html",
    },
  ],
  Music: [
    "pages/music.html",
    {
      "Music - Peter": "pages/music.html#peter",
    },
  ],
};

function buildContents() {
  const contentsElement = document.getElementById("contents");
  if (!contentsElement) return;

  let html = "<h2>Contents</h2><ul>";

  for (const [section, value] of Object.entries(pages)) {
    if (typeof value === "string") {
      html += `<li><a href="${value}">${section}</a></li>`;
    } else if (Array.isArray(value)) {
      const [mainLink, subItems] = value;
      html += `<li><a href="${mainLink}">${section}</a>`;
      html += "<ul>";
      for (const [subTitle, subLink] of Object.entries(subItems)) {
        html += `<li><a href="${subLink}">${subTitle}</a></li>`;
      }
      html += "</ul></li>";
    }
  }

  html += "</ul>";
  contentsElement.innerHTML = html;
}

document.addEventListener("DOMContentLoaded", buildContents);
