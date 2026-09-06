"use strict";

const noButton = document.querySelector("#no-button");
const yesButton = document.querySelector("#yes-button");
const replayButton = document.querySelector("#replay-button");
const statusMessage = document.querySelector("#playful-status");
const celebration = document.querySelector("#celebration");
const heartBurst = document.querySelector("#heart-burst");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

const playfulMessages = [
  "That button is feeling a little shy ✨",
  "It wandered off to admire the flowers 🌷",
  "A tiny detour—take all the time you need ♡",
  "That one has a playful mind of its own!",
  "Whoops, it is off on another little stroll."
];

let dodgeCount = 0;

function overlaps(first, second, padding = 20) {
  return !(
    first.right + padding < second.left ||
    first.left - padding > second.right ||
    first.bottom + padding < second.top ||
    first.top - padding > second.bottom
  );
}

function findSafePosition() {
  const margin = 12;
  const width = noButton.offsetWidth;
  const height = noButton.offsetHeight;
  const maxX = Math.max(margin, window.innerWidth - width - margin);
  const maxY = Math.max(margin, window.innerHeight - height - margin);
  const yesRect = yesButton.getBoundingClientRect();
  let fallback = { x: margin, y: margin };

  for (let attempt = 0; attempt < 60; attempt += 1) {
    const x = margin + Math.random() * (maxX - margin);
    const y = margin + Math.random() * (maxY - margin);
    const candidate = {
      left: x,
      top: y,
      right: x + width,
      bottom: y + height
    };

    fallback = { x, y };
    if (!overlaps(candidate, yesRect, 24)) {
      return fallback;
    }
  }

  const roomAbove = yesRect.top;
  const y = roomAbove > window.innerHeight - yesRect.bottom
    ? margin
    : maxY;
  return { x: fallback.x, y };
}

function dodgeNoButton(event) {
  if (event) {
    event.preventDefault();
  }

  if (!noButton.classList.contains("is-dodging")) {
    const current = noButton.getBoundingClientRect();
    noButton.classList.add("is-dodging");
    noButton.style.left = `${current.left}px`;
    noButton.style.top = `${current.top}px`;
  }

  const next = findSafePosition();
  noButton.style.left = `${next.x}px`;
  noButton.style.top = `${next.y}px`;
  statusMessage.textContent = playfulMessages[dodgeCount % playfulMessages.length];
  dodgeCount += 1;
}

function handleNoKeydown(event) {
  if (event.key !== "Enter" && event.key !== " ") {
    return;
  }

  dodgeNoButton(event);
  yesButton.focus();
}

function createHearts() {
  heartBurst.replaceChildren();

  if (reduceMotion.matches) {
    return;
  }

  for (let index = 0; index < 28; index += 1) {
    const heart = document.createElement("span");
    heart.className = "floating-heart";
    heart.textContent = index % 4 === 0 ? "♡" : "♥";
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.setProperty("--size", `${0.8 + Math.random() * 1.8}rem`);
    heart.style.setProperty("--duration", `${6 + Math.random() * 6}s`);
    heart.style.setProperty("--delay", `${Math.random() * -8}s`);
    heart.style.setProperty("--drift", `${-70 + Math.random() * 140}px`);
    heartBurst.append(heart);
  }
}

function celebrate(event) {
  event.preventDefault();
  document.body.classList.add("celebrated");
  window.history.replaceState(null, "", "#celebration");
  createHearts();
  celebration.scrollTop = 0;
  window.setTimeout(() => celebration.querySelector("h2").focus?.(), 0);
}

function resetProposal() {
  document.body.classList.remove("celebrated");
  heartBurst.replaceChildren();
  noButton.classList.remove("is-dodging");
  noButton.removeAttribute("style");
  statusMessage.textContent = "";
  dodgeCount = 0;
  window.history.replaceState(null, "", window.location.pathname + window.location.search);
  document.querySelector("#question-title").scrollIntoView({ block: "center" });
  yesButton.focus({ preventScroll: true });
}

noButton.addEventListener("pointerenter", dodgeNoButton);
noButton.addEventListener("pointerdown", dodgeNoButton);
noButton.addEventListener("click", dodgeNoButton);
noButton.addEventListener("keydown", handleNoKeydown);
yesButton.addEventListener("click", celebrate);
replayButton.addEventListener("click", resetProposal);

window.addEventListener("resize", () => {
  if (noButton.classList.contains("is-dodging")) {
    const next = findSafePosition();
    noButton.style.left = `${next.x}px`;
    noButton.style.top = `${next.y}px`;
  }
});

if (window.location.hash === "#celebration") {
  document.body.classList.add("celebrated");
  createHearts();
}
