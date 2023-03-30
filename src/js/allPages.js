// Define a function that initializes the page layout
function initializePageLayout() {
  // Find the banner element and get its height
  const banner = document.querySelector('[role="banner"]');
  const bannerHeight = banner.offsetHeight;

  // Set the top padding and margin for all scroll-offset elements
  const scrollOffsetEls = document.querySelectorAll('.scroll-offset');
  scrollOffsetEls.forEach(el => {
    el.style.paddingTop = `${bannerHeight}px`;
    el.style.marginTop = '-2em';
  });

  // Set the top margin for the body element
  document.body.style.marginTop = `${bannerHeight}px`;

  // Add the scroll-offset class to all main headings
  const headings = document.querySelectorAll('main h1, main h2, main h3, main h4, main h5, main h6');
  headings.forEach(heading => {
    heading.classList.add('scroll-offset');
  });
}

// Call the initializePageLayout function when the page finishes loading
window.addEventListener('load', initializePageLayout);
