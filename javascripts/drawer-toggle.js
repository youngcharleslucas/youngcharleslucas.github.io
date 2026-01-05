/**
 * Desktop Sidebar Toggle with localStorage Persistence
 * Only active on screens >= 1220px (76.25em)
 */

(function() {
  // Only run on desktop viewports
  function isDesktop() {
    return window.matchMedia('(min-width: 76.25em)').matches;
  }

  // Get checkbox element
  const drawerToggle = document.getElementById('__drawer');
  if (!drawerToggle) return;

  // Storage key
  const STORAGE_KEY = 'md-drawer-state-desktop';

  // Restore saved state on page load
  function restoreDrawerState() {
    if (!isDesktop()) return; // Only apply on desktop

    const savedState = localStorage.getItem(STORAGE_KEY);

    if (savedState !== null) {
      drawerToggle.checked = savedState === 'open';
    } else {
      // Default: open on desktop
      drawerToggle.checked = true;
      localStorage.setItem(STORAGE_KEY, 'open');
    }
  }

  // Save state when checkbox changes
  function saveDrawerState() {
    if (!isDesktop()) return; // Only save on desktop

    const state = drawerToggle.checked ? 'open' : 'closed';
    localStorage.setItem(STORAGE_KEY, state);
  }

  // Initialize on page load
  restoreDrawerState();

  // Listen for changes
  drawerToggle.addEventListener('change', saveDrawerState);

  // Handle viewport resize (reset on mobile)
  let resizeTimeout;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
      if (!isDesktop() && !drawerToggle.checked) {
        drawerToggle.checked = false;
      }
    }, 150);
  });
})();
