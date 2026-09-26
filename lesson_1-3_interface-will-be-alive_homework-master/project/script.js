"use strict";

const cards = document.querySelectorAll(".collection-card");
const panel = document.getElementById("details-panel");
const panelTitle = document.getElementById("details-title");
const panelDescription = document.getElementById("details-description");
const filterButtons = document.querySelectorAll(".filter-button");
const visibleCount = document.getElementById("visible-count");
const initialTitle = panelTitle.textContent;
const initialDescription = panelDescription.textContent;
const randomButton = document.getElementById("random-button");
const resetButton = document.getElementById("reset-button");

function selectCard(card) {
  clearSelection();
  card.classList.add("collection-card--selected");
  card.setAttribute("aria-pressed", "true");
  panelTitle.textContent = card.dataset.title;
  panelDescription.textContent = card.dataset.description;
  panel.classList.add("details-panel--pulse");
}

cards.forEach((card) => {
  card.addEventListener("click", () => {
    selectCard(card);
  });
});

function clearSelection() {
  cards.forEach((item) => {
    item.classList.remove("collection-card--selected");
    item.setAttribute("aria-pressed", "false");
  });
  panelTitle.textContent = initialTitle;
  panelDescription.textContent = initialDescription;
}

function applyFilter(value) {
  filterButtons.forEach((btn) => {
    const isActive = btn.dataset.filter === value;
    btn.classList.toggle("filter-button--active", isActive);
    btn.setAttribute("aria-pressed", isActive ? "true" : "false");
  });

  let visible = 0;
  cards.forEach((card) => {
    const matches = value === "all" || card.dataset.category === value;
    card.classList.toggle("collection-card--hidden", !matches);
    if (matches) visible += 1;
  });

  visibleCount.textContent = visible;

  const selected = document.querySelector(".collection-card--selected");
  if (selected && selected.classList.contains("collection-card--hidden")) {
    clearSelection();
  }
}

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    applyFilter(btn.dataset.filter);
  });
});

function selectRandomCard() {
  const visibleCards = [...cards].filter(
    (card) => !card.classList.contains("collection-card--hidden")
  );

  if (visibleCards.length === 0) return;

  const current = document.querySelector(".collection-card--selected");
  const pool = visibleCards.filter((card) => card !== current);
  const finalPool = pool.length > 0 ? pool : visibleCards;
  const index = Math.floor(Math.random() * finalPool.length);

  selectCard(finalPool[index]);
}

randomButton.addEventListener("click", selectRandomCard);

function resetCollection() {
  applyFilter("all");
  clearSelection();
}

resetButton.addEventListener("click", resetCollection);

panel.addEventListener("animationend", () => {
  panel.classList.remove("details-panel--pulse");
});

function getVisibleCards() {
  return [...cards].filter(
    (card) => !card.classList.contains("collection-card--hidden")
  );
}

function moveSelection(direction) {
  const visible = getVisibleCards();
  if (visible.length === 0) return;

  const current = document.querySelector(".collection-card--selected");
  let index = current ? visible.indexOf(current) : -1;

  if (index === -1) {
    index = direction > 0 ? 0 : visible.length - 1;
  } else {
    index = (index + direction + visible.length) % visible.length;
  }

  const target = visible[index];
  selectCard(target);
  target.focus();
}

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") {
    event.preventDefault();
    moveSelection(1);
  } else if (event.key === "ArrowLeft") {
    event.preventDefault();
    moveSelection(-1);
  } else if (event.key === "Escape") {
    resetCollection();
  }
});