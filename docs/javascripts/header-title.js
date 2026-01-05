/**
 * Custom header title formatter
 * Always displays: Young/{PageTitle}
 */

(function() {
  function updateHeaderTitle() {
    // Get the page title from the first h1 element or document title
    const h1 = document.querySelector('article h1');
    const pageTitle = h1 ? h1.textContent.trim() : document.title.replace('Charles Young', '').trim();

    // Get both header topic elements
    const topics = document.querySelectorAll('.md-header__topic');

    if (topics.length >= 2 && pageTitle) {
      // Format both topics to show "Young/{PageTitle}" with lighter page title
      topics.forEach(topic => {
        const ellipsis = topic.querySelector('.md-ellipsis');
        if (ellipsis) {
          ellipsis.innerHTML = `Young/<span class="header-page-title">${pageTitle}</span>`;
        }
      });
    }
  }

  // Run on page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateHeaderTitle);
  } else {
    updateHeaderTitle();
  }

  // Also run when navigating (for single-page navigation in Material for MkDocs)
  document.addEventListener('DOMContentLoaded', function() {
    const observer = new MutationObserver(updateHeaderTitle);
    const article = document.querySelector('article');

    if (article) {
      observer.observe(article, {
        childList: true,
        subtree: true
      });
    }
  });
})();
