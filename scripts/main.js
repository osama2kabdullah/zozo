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

const caseSlides = [
  {
    id: "heatable-hoodie",
    category: "beauty",
    title: "HEAT HOODY",
    stats: { sales: "$188K+ SALES", cvr: "+20% CVR", aov: "+6% AOV" },
    bullets: [
      "Data-Driven Iteration After Launch",
      "Buy Box And Offer Structure To Reduce Friction",
      "Optimized 1-Pack, 2-Pack, And 3-Pack Options",
      "Product Storytelling Communication",
    ],
    before: {
      webp: "images/case-studies/heatable-hoodie-before.webp",
      fallback: "images/case-studies/heatable-hoodie-before.png",
      width: 300,
      height: 3077,
      alt: "HEAT HOODY storefront before redesign",
    },
    after: {
      webp: "images/case-studies/heatable-hoodie-after.webp",
      fallback: "images/case-studies/heatable-hoodie-after.png",
      width: 300,
      height: 3077,
      alt: "HEAT HOODY storefront after redesign",
    },
  },
  {
    id: "herbies-oregano",
    category: "supplements",
    title: "HERBIES OREGANO+",
    stats: null,
    bullets: ["Additional case-study results are not included in the supplied Figma frame."],
    before: {
      webp: "images/case-studies/herbies-oregano-before.webp",
      fallback: "images/case-studies/herbies-oregano-before.png",
      width: 300,
      height: 3529,
      alt: "Herbies Oregano+ storefront before redesign",
    },
    after: {
      webp: "images/case-studies/herbies-oregano-after.webp",
      fallback: "images/case-studies/herbies-oregano-after.png",
      width: 300,
      height: 1590,
      alt: "Herbies Oregano+ storefront after redesign",
    },
  },
  {
    id: "zimms-olive-oil",
    category: "food",
    title: "ZIMMS ORGANICS",
    stats: null,
    bullets: ["Additional case-study results are not included in the supplied Figma frame."],
    before: {
      webp: "images/case-studies/zimms-olive-oil-before.webp",
      fallback: "images/case-studies/zimms-olive-oil-before.png",
      width: 300,
      height: 3750,
      alt: "Zimms Organics olive oil storefront before redesign",
    },
    after: {
      webp: "images/case-studies/zimms-olive-oil-after.webp",
      fallback: "images/case-studies/zimms-olive-oil-after.png",
      width: 300,
      height: 3069,
      alt: "Zimms Organics olive oil storefront after redesign",
    },
  },
  {
    id: "healthy-dog-club",
    category: "pets",
    title: "HEALTHY DOG CLUB",
    stats: null,
    bullets: ["Additional case-study results are not included in the supplied Figma frame."],
    before: {
      webp: "images/case-studies/healthy-dog-club-before.webp",
      fallback: "images/case-studies/healthy-dog-club-before.png",
      width: 300,
      height: 2920,
      alt: "Healthy Dog Club storefront before redesign",
    },
    after: {
      webp: "images/case-studies/healthy-dog-club-after.webp",
      fallback: "images/case-studies/healthy-dog-club-after.png",
      width: 300,
      height: 3069,
      alt: "Healthy Dog Club storefront after redesign",
    },
  },
  {
    id: "maju-black-seed-oil",
    category: "supplements",
    title: "MAJU BLACK SEED OIL",
    stats: null,
    bullets: ["Additional case-study results are not included in the supplied Figma frame."],
    before: {
      webp: "images/case-studies/maju-black-seed-oil-before.webp",
      fallback: "images/case-studies/maju-black-seed-oil-before.png",
      width: 300,
      height: 3069,
      alt: "Maju Black Seed Oil storefront before redesign",
    },
    after: {
      webp: "images/case-studies/maju-black-seed-oil-after.webp",
      fallback: "images/case-studies/maju-black-seed-oil-after.png",
      width: 300,
      height: 2765,
      alt: "Maju Black Seed Oil storefront after redesign",
    },
  },
  {
    id: "cyperglow",
    category: "beauty",
    title: "CYPERGLOW",
    stats: null,
    bullets: ["Additional case-study results are not included in the supplied Figma frame."],
    before: {
      webp: "images/case-studies/cyperglow-before.webp",
      fallback: "images/case-studies/cyperglow-before.png",
      width: 300,
      height: 3077,
      alt: "CyperGlow storefront before redesign",
    },
    after: {
      webp: "images/case-studies/cyperglow-after.webp",
      fallback: "images/case-studies/cyperglow-after.png",
      width: 300,
      height: 2847,
      alt: "CyperGlow storefront after redesign",
    },
  },
];
const caseCategories = {
  all: "all case studies",
  supplements: "supplements case studies",
  food: "food and beverage case studies",
  beauty: "beauty and fashion case studies",
  pets: "pet case studies",
};
const caseSection = document.querySelector(".case-studies");
const caseFilters = document.querySelector(".case-filters");
const caseDots = document.querySelector(".case-dots");
const caseLayout = document.querySelector("[data-case-carousel]");
const caseVisuals = document.querySelector("[data-case-visuals]");
const filterStatus = document.querySelector("[data-filter-status]");
const caseState = { category: "all", slideId: "heatable-hoodie" };
const preloadedCaseImages = new Set();
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const idle = window.requestIdleCallback?.bind(window) ?? ((callback) => window.setTimeout(callback, 150));

function filteredCaseSlides() {
  return caseState.category === "all"
    ? caseSlides
    : caseSlides.filter((slide) => slide.category === caseState.category);
}

function currentCaseSlide() {
  return caseSlides.find((slide) => slide.id === caseState.slideId) ?? caseSlides[0];
}

function renderCaseImage(side, imageData, eager = false) {
  const slot = caseLayout?.querySelector(`[data-case-image-slot="${side}"]`);
  const source = slot?.querySelector("source");
  const image = slot?.querySelector("img[data-case-image]");
  const fallbackMessage = slot?.querySelector(".case-image-fallback");
  if (!(source instanceof HTMLSourceElement) || !(image instanceof HTMLImageElement)) {
    return;
  }

  slot.dataset.autoScrolling = "false";
  slot.dataset.hoverPending = slot.dataset.hovered === "true" ? "true" : "false";
  image.style.transition = "none";
  image.style.transform = "translate3d(0, 0, 0)";
  image.style.willChange = "auto";
  image.dataset.fallbackAttempted = "false";
  image.dataset.fallbackSrc = imageData.fallback;
  image.width = imageData.width;
  image.height = imageData.height;
  image.alt = imageData.alt;
  image.hidden = false;
  image.loading = "eager";
  image.fetchPriority = eager ? "high" : "auto";
  source.srcset = imageData.webp;
  image.src = imageData.fallback;
  if (fallbackMessage) {
    fallbackMessage.hidden = true;
  }
}

function updateCaseCard(slide) {
  const title = document.querySelector("#case-card-title");
  const bullets = document.querySelector("[data-case-bullets]");
  if (title) {
    title.textContent = slide.title;
  }

  for (const [key, value] of Object.entries(slide.stats ?? {})) {
    const stat = document.querySelector(`[data-case-stat="${key}"]`);
    if (stat) {
      stat.textContent = value;
    }
  }
  if (!slide.stats) {
    document.querySelectorAll("[data-case-stat]").forEach((stat) => {
      const label = stat.dataset.caseStat?.toUpperCase();
      stat.textContent = `— ${label ?? ""}`.trim();
    });
  }

  bullets?.replaceChildren(...slide.bullets.map((copy) => {
    const item = document.createElement("li");
    item.textContent = copy;
    return item;
  }));
}

function renderCaseDots() {
  if (!caseDots) {
    return;
  }

  const fragment = document.createDocumentFragment();
  filteredCaseSlides().forEach((slide, index) => {
    const dot = document.createElement("button");
    const isCurrent = slide.id === caseState.slideId;
    dot.type = "button";
    dot.dataset.caseDotId = slide.id;
    dot.className = isCurrent ? "is-active" : "";
    dot.setAttribute("aria-label", `Go to case study ${index + 1}: ${slide.title}`);
    dot.setAttribute("aria-current", String(isCurrent));
    fragment.append(dot);
  });
  caseDots.replaceChildren(fragment);
}

function updateCaseFilterButtons() {
  caseFilters?.querySelectorAll("[data-case-category]").forEach((button) => {
    const isCurrent = button.dataset.caseCategory === caseState.category;
    button.classList.toggle("is-active", isCurrent);
    button.setAttribute("aria-pressed", String(isCurrent));
  });

  if (window.matchMedia("(max-width: 767px)").matches) {
    const activeButton = caseFilters?.querySelector(".case-filter.is-active");
    activeButton?.scrollIntoView({
      behavior: reducedMotion.matches ? "auto" : "smooth",
      block: "nearest",
      inline: "center",
    });
  }
}

function renderCaseSlide({ eager = false } = {}) {
  const slide = currentCaseSlide();
  renderCaseImage("before", slide.before, eager);
  renderCaseImage("after", slide.after, eager);
  updateCaseCard(slide);
  renderCaseDots();
  updateCaseFilterButtons();

  const visibleSlides = filteredCaseSlides();
  const position = visibleSlides.findIndex((item) => item.id === slide.id) + 1;
  if (filterStatus) {
    filterStatus.textContent = `Showing ${caseCategories[caseState.category]}: ${slide.title}, ${position} of ${visibleSlides.length}.`;
  }
}

function setCaseCategory(category) {
  if (!Object.hasOwn(caseCategories, category)) {
    return;
  }
  caseState.category = category;
  if (!filteredCaseSlides().some((slide) => slide.id === caseState.slideId)) {
    caseState.slideId = filteredCaseSlides()[0]?.id ?? caseSlides[0].id;
  }
  renderCaseSlide();
}

function navigateCaseSlide(direction) {
  const visibleSlides = filteredCaseSlides();
  const currentPosition = visibleSlides.findIndex((slide) => slide.id === caseState.slideId);
  const nextPosition = (currentPosition + direction + visibleSlides.length) % visibleSlides.length;
  caseState.slideId = visibleSlides[nextPosition].id;
  renderCaseSlide();
}

function preloadCaseSlide(slide) {
  if (!slide) {
    return;
  }
  [slide.before.webp, slide.after.webp].forEach((source) => {
    if (preloadedCaseImages.has(source)) {
      return;
    }
    preloadedCaseImages.add(source);
    const image = new Image();
    image.fetchPriority = "low";
    image.src = source;
  });
}

function preloadAdjacentCaseSlides() {
  const visibleSlides = filteredCaseSlides();
  const currentPosition = visibleSlides.findIndex((slide) => slide.id === caseState.slideId);
  preloadCaseSlide(visibleSlides[(currentPosition + 1) % visibleSlides.length]);
  preloadCaseSlide(visibleSlides[(currentPosition - 1 + visibleSlides.length) % visibleSlides.length]);
}

function startCaseImageScroll(slot) {
  if (reducedMotion.matches || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    return;
  }
  const image = slot.querySelector("img[data-case-image]");
  if (!(image instanceof HTMLImageElement)) {
    return;
  }
  if (!image.complete || !image.naturalWidth) {
    slot.dataset.hoverPending = "true";
    return;
  }

  const imageHeight = image.getBoundingClientRect().height;
  const scrollDistance = Math.max(0, imageHeight - slot.clientHeight);
  slot.dataset.hoverPending = "false";
  if (scrollDistance <= 0) {
    return;
  }

  slot.dataset.autoScrolling = "true";
  image.style.willChange = "transform";
  image.style.transition = `transform ${Math.min(24, Math.max(8, scrollDistance / 100))}s linear`;
  image.style.transform = `translate3d(0, -${scrollDistance}px, 0)`;
}

function resetCaseImageScroll(slot) {
  const image = slot.querySelector("img[data-case-image]");
  if (!(image instanceof HTMLImageElement)) {
    return;
  }
  const wasScrolling = slot.dataset.autoScrolling === "true";
  slot.dataset.autoScrolling = "false";
  slot.dataset.hoverPending = "false";
  image.style.transition = reducedMotion.matches ? "none" : "transform 350ms ease-out";
  image.style.transform = "translate3d(0, 0, 0)";
  image.style.willChange = "auto";
  if (!wasScrolling || reducedMotion.matches) {
    image.style.transition = "";
    return;
  }
  const clearTransition = () => {
    image.style.transition = "";
  };
  image.addEventListener("transitionend", clearTransition, { once: true });
  window.setTimeout(() => {
    if (slot.dataset.hovered !== "true") {
      clearTransition();
    }
  }, 400);
}

caseFilters?.addEventListener("click", (event) => {
  const button = event.target instanceof Element
    ? event.target.closest("[data-case-category]")
    : null;
  if (button instanceof HTMLButtonElement) {
    setCaseCategory(button.dataset.caseCategory);
  }
});

caseDots?.addEventListener("click", (event) => {
  const dot = event.target instanceof Element
    ? event.target.closest("[data-case-dot-id]")
    : null;
  if (!(dot instanceof HTMLButtonElement)) {
    return;
  }
  const slide = filteredCaseSlides().find((item) => item.id === dot.dataset.caseDotId);
  if (slide) {
    caseState.slideId = slide.id;
    renderCaseSlide();
  }
});

caseLayout?.addEventListener("click", (event) => {
  const arrow = event.target instanceof Element
    ? event.target.closest("[data-case-step]")
    : null;
  if (arrow instanceof HTMLButtonElement) {
    navigateCaseSlide(Number(arrow.dataset.caseStep));
  }
});

caseLayout?.addEventListener("pointerenter", (event) => {
  const slot = event.target instanceof Element
    ? event.target.closest("[data-case-image-slot]")
    : null;
  if (slot instanceof HTMLElement) {
    slot.dataset.hovered = "true";
    startCaseImageScroll(slot);
  }
}, true);

caseLayout?.addEventListener("pointerleave", (event) => {
  const slot = event.target instanceof Element
    ? event.target.closest("[data-case-image-slot]")
    : null;
  if (slot instanceof HTMLElement) {
    slot.dataset.hovered = "false";
    resetCaseImageScroll(slot);
  }
}, true);

caseLayout?.querySelectorAll("[data-case-image-slot] img[data-case-image]").forEach((image) => {
  image.addEventListener("load", () => {
    const slot = image.closest("[data-case-image-slot]");
    const fallbackMessage = slot?.querySelector(".case-image-fallback");
    if (fallbackMessage) {
      fallbackMessage.hidden = true;
    }
    if (slot?.dataset.hoverPending === "true") {
      startCaseImageScroll(slot);
    }
  });

  image.addEventListener("error", () => {
    const source = image.closest("picture")?.querySelector("source");
    const fallbackMessage = image.closest("[data-case-image-slot]")?.querySelector(".case-image-fallback");
    if (image.dataset.fallbackAttempted !== "true" && source?.srcset) {
      image.dataset.fallbackAttempted = "true";
      source.removeAttribute("srcset");
      image.src = image.dataset.fallbackSrc;
      return;
    }
    if (fallbackMessage) {
      fallbackMessage.hidden = false;
    }
    image.hidden = true;
    console.error(`Unable to load case-study image: ${image.currentSrc || image.src}`);
  });
});

caseLayout?.querySelectorAll("[data-case-step]").forEach((button) => {
  button.addEventListener("mouseenter", preloadAdjacentCaseSlides, { passive: true });
  button.addEventListener("focus", preloadAdjacentCaseSlides, { passive: true });
});

let casePointerStart;
caseVisuals?.addEventListener("pointerdown", (event) => {
  if (event.pointerType === "touch") {
    casePointerStart = { x: event.clientX, y: event.clientY };
  }
}, { passive: true });

caseVisuals?.addEventListener("pointerup", (event) => {
  if (!casePointerStart || event.pointerType !== "touch") {
    return;
  }
  const deltaX = event.clientX - casePointerStart.x;
  const deltaY = event.clientY - casePointerStart.y;
  casePointerStart = undefined;
  if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY) * 1.2) {
    navigateCaseSlide(deltaX < 0 ? 1 : -1);
  }
}, { passive: true });

caseVisuals?.addEventListener("pointercancel", () => {
  casePointerStart = undefined;
}, { passive: true });

caseSection?.addEventListener("keydown", (event) => {
  if (event.target instanceof Element && event.target.matches("input, textarea, select, a, button")) {
    return;
  }
  if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
    event.preventDefault();
    navigateCaseSlide(event.key === "ArrowRight" ? 1 : -1);
  }
});

renderCaseSlide({ eager: true });
window.setTimeout(() => idle(preloadAdjacentCaseSlides), 1800);

document.querySelectorAll(".faq-list details").forEach((item) => {
  item.addEventListener("toggle", () => {
    const summary = item.querySelector("summary");
    if (summary) {
      summary.setAttribute("aria-expanded", String(item.open));
    }
  });
});