// ---------- LIGHT / DARK THEME ----------

const themeButton = document.querySelector("#theme-toggle");

function applyTheme(useLightTheme) {
  // Add or remove the CSS class that changes the colors.
  document.body.classList.toggle("light-theme", useLightTheme);

  themeButton.textContent = useLightTheme
    ? "Switch to dark mode"
    : "Switch to light mode";

  themeButton.setAttribute("aria-pressed", String(useLightTheme));
}

if (themeButton) {
  // Start in dark mode unless a light-mode preference was saved.
  let savedTheme = null;

  try {
    savedTheme = localStorage.getItem("portfolio-theme");
  } catch {
    // Browser storage may be unavailable.
    // The theme button will still work.
  }

  applyTheme(savedTheme === "light");

  themeButton.addEventListener("click", () => {
    const useLightTheme =
      !document.body.classList.contains("light-theme");

    applyTheme(useLightTheme);

    // Remember the preference when browser storage is available.
    try {
      localStorage.setItem(
        "portfolio-theme",
        useLightTheme ? "light" : "dark"
      );
    } catch {
      // Saving the preference is optional.
    }
  });
}

// ---------- PROJECT FILTERS ----------

const filterButtons = document.querySelectorAll(
  "#projects [data-filter]"
);

const projectCards = document.querySelectorAll(
  "#projects article[data-category]"
);

const projectCount = document.querySelector("#project-count");

function filterProjects(selectedFilter) {
  let visibleCount = 0;

  projectCards.forEach((card) => {
    const matchesFilter =
      selectedFilter === "all" ||
      card.dataset.category === selectedFilter;

    // Hide cards that do not match the selected category.
    card.hidden = !matchesFilter;

    if (matchesFilter) {
      visibleCount++;
    }
  });

  filterButtons.forEach((button) => {
    const isSelected = button.dataset.filter === selectedFilter;

    button.setAttribute("aria-pressed", String(isSelected));
  });

  if (projectCount) {
    const label = visibleCount === 1 ? "project" : "projects";

    projectCount.textContent = `Showing ${visibleCount} ${label}`;
  }
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterProjects(button.dataset.filter);
  });
});

// Set the correct count when the page first opens.
filterProjects("all");