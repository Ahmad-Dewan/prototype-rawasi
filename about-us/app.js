/**
 * RAWASI — app.js
 * Tab navigation logic
 */

document.addEventListener('DOMContentLoaded', () => {

  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  // Map data-tab value → content section id
  const tabMap = {
    privacy: 'tab-privacy',
    'saudi-center': 'tab-saudi-center',
    faq: 'tab-faq',
    terms: 'tab-terms',
  };

  /**
   * Activate a tab by its data-tab key
   * @param {string} tabKey
   */
  function activateTab(tabKey) {
    // Update button states
    tabButtons.forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.tab === tabKey);
    });

    // Update content visibility
    tabContents.forEach((section) => {
      const isTarget = section.id === tabMap[tabKey];
      section.classList.toggle('active', isTarget);
    });
  }

  // Attach click handlers
  tabButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      activateTab(btn.dataset.tab);
    });
  });

  // Keyboard accessibility: Enter / Space to activate tab
  tabButtons.forEach((btn) => {
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        activateTab(btn.dataset.tab);
      }
    });
  });

});
