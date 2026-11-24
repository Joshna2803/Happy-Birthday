const sheets = [...document.querySelectorAll(".sheet")];
const counter = document.getElementById("counter");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const dotsWrap = document.getElementById("dots");

let current = 0;

// Create page navigation dots
sheets.forEach((sheet, i) => {
  const dot = document.createElement("button");
  dot.className = "dot";
  dot.type = "button";
  dot.setAttribute("aria-label", `Go to page ${i + 1}`);
  dot.addEventListener("click", () => showSheet(i));
  dotsWrap.appendChild(dot);
});

// Show selected sheet
function showSheet(index) {
  current = Math.max(0, Math.min(index, sheets.length - 1));

  sheets.forEach((sheet, i) => {
    sheet.classList.toggle("active", i === current);
  });

  [...dotsWrap.children].forEach((dot, i) => {
    dot.classList.toggle("active", i === current);
  });

  const totalPages = String(sheets.length).padStart(2, "0");
  counter.textContent = `${String(current + 1).padStart(2, "0")} / ${totalPages}`;

  prevBtn.disabled = current === 0;
  nextBtn.disabled = current === sheets.length - 1;
  nextBtn.textContent = current === sheets.length - 1 ? "Finished" : "Next →";
}

// Bottom navigation
prevBtn.addEventListener("click", () => showSheet(current - 1));
nextBtn.addEventListener("click", () => showSheet(current + 1));

// Individual Next buttons inside each sheet
document.querySelectorAll(".sheet .next-btn").forEach(button => {
  button.addEventListener("click", () => {
    if (!button.disabled) {
      showSheet(current + 1);
    }
  });
});

// Keyboard navigation
document.addEventListener("keydown", event => {
  if (event.key === "ArrowRight") showSheet(current + 1);
  if (event.key === "ArrowLeft") showSheet(current - 1);
});

// Balloon interaction:
// Clicking a balloon pops it to show its message in place,
// closes any previously popped balloon, and lets you pop again & again!
const balloons = [...document.querySelectorAll(".balloon")];

balloons.forEach(balloon => {
  balloon.addEventListener("click", () => {
    const wasAlreadyPopped = balloon.classList.contains("popped");

    // Reset all balloons back to their balloon form
    balloons.forEach(b => b.classList.remove("popped"));

    // If this balloon wasn't already open, pop it open now
    if (!wasAlreadyPopped) {
      balloon.classList.add("popped");
    }
  });
});

// Birthday candle interaction: 5 wishes in a continuous loop
const wishes = [
  "I wish you endless happiness and reasons to smile every single day. ❤️",
  "I wish you huge success in everything you dream of and work toward. ✨",
  "I wish you good health, peace of mind, and boundless energy always. 🌸",
  "I wish you adventures that excite you and moments that warm your heart. 💖",
  "I wish you all the love in the world—today and every year ahead. 🎂"
];

let wishIndex = 0;
const wishBtn = document.getElementById("wish-btn");
const wishResponse = document.getElementById("wish-response");
const flame = document.querySelector(".flame");

wishBtn.addEventListener("click", () => {
  wishResponse.style.opacity = "0";

  setTimeout(() => {
    wishResponse.textContent = wishes[wishIndex];
    wishResponse.style.opacity = "1";
    wishIndex = (wishIndex + 1) % wishes.length;
  }, 120);

  flame.textContent = "✨";
  flame.classList.remove("sparkle-pop");
  void flame.offsetWidth;
  flame.classList.add("sparkle-pop");
});

// Envelope interaction (reveals the letter content when opened)
const envelope = document.getElementById("envelope");
const envelopeLabel = document.getElementById("envelope-label");
const envelopeNote = document.getElementById("envelope-note");
const revealedLetter = document.getElementById("revealed-letter");

envelope.addEventListener("click", () => {
  envelope.classList.add("opened");
  envelopeLabel.textContent = "Opened ♡";
  envelopeNote.textContent = "Surprise! You will always have a special place in my heart. ❤️";
  revealedLetter.hidden = false;
});

// Restart everything
document.getElementById("restart").addEventListener("click", () => {
  // Reset balloons
  balloons.forEach(balloon => {
    balloon.classList.remove("popped");
  });

  // Reset wishes & candle
  wishIndex = 0;
  wishResponse.textContent = "";
  flame.textContent = "🕯️";
  flame.classList.remove("sparkle-pop");

  // Reset envelope & hide letter
  envelope.classList.remove("opened");
  envelopeLabel.textContent = "Tap to open";
  envelopeNote.textContent = "There's something inside just for you.";
  revealedLetter.hidden = true;

  // Return to first sheet
  showSheet(0);
});

// Start website
showSheet(0);