"use strict";

const cards = document.querySelectorAll(".collection-card");
const panel = document.getElementById("details-panel");
const panelTitle = document.getElementById("details-title");
const panelDescription = document.getElementById("details-description");
const filterButtons = document.querySelectorAll(".filter-button");
const visibleCount = document.getElementById("visible-count");
const initialTitle = panelTitle.textContent;
const initialDescription = panelDescription.textContent;

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

// Этап 4. Найдите кнопки фильтров.
// Показывайте подходящие карточки, обновляйте активную кнопку и счетчик.
// Учтите случай, когда новый фильтр скрывает выбранную карточку.

// Этап 5. Реализуйте случайный выбор среди видимых карточек.
// Затем реализуйте полный сброс интерфейса.

// Этап 6. Запускайте подготовленную CSS-анимацию через класс.
// Не дублируйте оформление в script.js.
