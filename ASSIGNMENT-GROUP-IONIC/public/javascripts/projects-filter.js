// public/javascripts/projects-filter.js
// =============================================================
// Client-side filtering logic for the Projects page.
// - Listens for clicks on Ionic <ion-chip> elements that have
//   the "filter-chip" class
// - Each chip has data-filter (category) and data-value (value)
// - Toggles filters and shows/hides projects accordingly
//
// This file is written in plain JavaScript so it works directly
// in the browser with no build step. Ionic web components are
// loaded via CDN in layout.hbs.
// =============================================================

(function() {
  // Find all project items on the page.
  const projectItems = document.querySelectorAll('.project-item');
  if (!projectItems.length) {
    // If there are no projects on the page, we quietly exit.
    return;
  }

  // Object to store active filters for each category.
  // - language: filters by data-languages
  // - concept:  filters by data-concepts
  // - type:     filters by data-type
  const activeFilters = {
    language: new Set(),
    concept: new Set(),
    type: new Set()
  };

  // Utility: split a data-* string into an array of trimmed values.
  function splitDataAttribute(value) {
    if (!value) return [];
    return value.split(',').map(v => v.trim());
  }

  // Utility: check whether a project "matches" a filter set
  // for a particular attribute (languages, concepts, type).
  function matchesFilterSet(itemValues, filterSet) {
    // If no filters are selected for that category, treat as "match all".
    if (!filterSet || filterSet.size === 0) return true;
    // If any selected filter value appears in the itemValues array,
    // this project matches for that category.
    return itemValues.some(v => filterSet.has(v));
  }

  // Apply the current active filters to all project items.
  function applyFilters() {
    projectItems.forEach(item => {
      const languages = splitDataAttribute(item.getAttribute('data-languages'));
      const concepts  = splitDataAttribute(item.getAttribute('data-concepts'));
      const types     = splitDataAttribute(item.getAttribute('data-type'));

      const languageMatch = matchesFilterSet(languages, activeFilters.language);
      const conceptMatch  = matchesFilterSet(concepts, activeFilters.concept);
      const typeMatch     = matchesFilterSet(types, activeFilters.type);

      // A project is visible only if it matches ALL active categories.
      const isVisible = languageMatch && conceptMatch && typeMatch;

      item.style.display = isVisible ? 'block' : 'none';
    });
  }

  // Find all filter chips.
  const chips = document.querySelectorAll('.filter-chip');
  chips.forEach(chip => {
    // Add a click handler to toggle the chip's active state.
    chip.addEventListener('click', () => {
      const category = chip.getAttribute('data-filter'); // language/concept/type
      const value = chip.getAttribute('data-value');

      if (!category || !value || !activeFilters[category]) {
        return;
      }

      // Visually toggle a CSS class for the chip.
      // Ionic chips respond nicely when you toggle a class like "chip-selected".
      chip.classList.toggle('chip-selected');

      if (activeFilters[category].has(value)) {
        // If already selected, remove from filter set.
        activeFilters[category].delete(value);
      } else {
        // Otherwise, add it.
        activeFilters[category].add(value);
      }

      // Re-apply filters whenever any chip changes.
      applyFilters();
    });
  });

  // Optional: initial call to ensure everything is visible on load.
  applyFilters();
})();
