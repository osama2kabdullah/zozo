const previewDialog = document.querySelector(".preview-dialog");
const openPreviewButton = document.querySelector("[data-open-preview]");
const closePreviewButton = document.querySelector("[data-close-preview]");

if (previewDialog instanceof HTMLDialogElement) {
  openPreviewButton?.addEventListener("click", () => {
    previewDialog.showModal();
  });

  closePreviewButton?.addEventListener("click", () => {
    previewDialog.close();
  });

  previewDialog.addEventListener("click", (event) => {
    if (event.target === previewDialog) {
      previewDialog.close();
    }
  });
}

const categoryNames = {
  all: "all",
  supplements: "supplements",
  food: "food and beverage",
  beauty: "beauty and fashion",
  pets: "pet",
};
const categories = Object.keys(categoryNames);
const filterButtons = [...document.querySelectorAll("[data-case-category]")];
const categoryTabs = [...document.querySelectorAll(".case-filter[data-case-category]")];
const caseDots = [...document.querySelectorAll(".case-dots [data-case-category]")];
const caseLayout = document.querySelector("[data-case-carousel]");
const caseEmpty = document.querySelector("[data-case-empty]");
const filterStatus = document.querySelector("[data-filter-status]");
let activeDot = 0;

function setCaseCategory(category, dotIndex) {
  if (!categories.includes(category)) {
    return;
  }

  filterButtons.forEach((button) => {
    const selected = button.dataset.caseCategory === category;

    if (button.matches(".case-filter")) {
      button.classList.toggle("is-active", selected);
      button.setAttribute("aria-pressed", String(selected));
    }
  });

  if (dotIndex !== undefined) {
    activeDot = dotIndex;
  } else {
    const matchingDot = caseDots.findIndex((dot) => dot.dataset.caseCategory === category);
    activeDot = matchingDot === -1 ? 0 : matchingDot;
  }

  caseDots.forEach((dot, index) => {
    const selected = index === activeDot;
    dot.classList.toggle("is-active", selected);
    dot.setAttribute("aria-current", String(selected));
  });

  const hasFeaturedCase = category === "all" || category === "beauty";
  if (caseLayout instanceof HTMLElement) {
    caseLayout.hidden = !hasFeaturedCase;
  }
  if (caseEmpty instanceof HTMLElement) {
    caseEmpty.hidden = hasFeaturedCase;
  }
  if (filterStatus instanceof HTMLElement) {
    filterStatus.textContent = hasFeaturedCase
      ? `Showing ${categoryNames[category]} case studies.`
      : `No featured case study is available in the ${categoryNames[category]} category yet.`;
  }
}

categoryTabs.forEach((button) => {
  button.addEventListener("click", () => {
    const category = button.dataset.caseCategory;
    if (category) {
      setCaseCategory(category);
    }
  });
});

caseDots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    const category = dot.dataset.caseCategory;
    if (category) {
      setCaseCategory(category, index);
    }
  });
});

document.querySelectorAll("[data-case-step]").forEach((button) => {
  button.addEventListener("click", () => {
    const direction = Number(button.dataset.caseStep);
    if (!Number.isFinite(direction) || direction === 0) {
      return;
    }

    const nextDot = (activeDot + direction + caseDots.length) % caseDots.length;
    const category = caseDots[nextDot]?.dataset.caseCategory;
    if (category) {
      setCaseCategory(category, nextDot);
    }
  });
});

document.querySelectorAll(".faq-list details").forEach((item) => {
  item.addEventListener("toggle", () => {
    const summary = item.querySelector("summary");
    if (summary) {
      summary.setAttribute("aria-expanded", String(item.open));
    }
  });
});