// Wait for content to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  initCollapsibleHeaders();
  
  // Also watch for any new content being added (for SPA navigation)
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.addedNodes.length) {
        initCollapsibleHeaders();
      }
    }
  });
  
  // Start observing the document
  observer.observe(document.body, { childList: true, subtree: true });
});

function initCollapsibleHeaders() {
  // Process only headers that haven't been initialized yet
  document.querySelectorAll('h2:not([data-collapsible]), h3:not([data-collapsible]), h4:not([data-collapsible]), h5:not([data-collapsible]), h6:not([data-collapsible])').forEach(header => {
    header.setAttribute('data-collapsible', 'true');
    
    // Create a wrapper for the header content if it doesn't exist
    const level = parseInt(header.tagName.charAt(1), 10);
    
    header.addEventListener('click', (e) => {
      // Prevent link clicks within headers from triggering collapse
      if (e.target.tagName === 'A') {
        e.stopPropagation();
        return;
      }
      
      header.classList.toggle('collapsed');
      let next = header.nextElementSibling;
      
      // Hide/show everything until the next header of same-or-higher level
      while (
        next && 
        !(next.tagName && next.tagName.match(/^H[1-6]$/) && parseInt(next.tagName.charAt(1), 10) <= level)
      ) {
        next.style.display = header.classList.contains('collapsed') ? 'none' : '';
        next = next.nextElementSibling;
      }
    });
  });
}
