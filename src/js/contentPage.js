// Define the functions
function updateReadingTime(wordsPerMinute = 200) {
  const readingTimeSpan = document.querySelector('#readingTime');
  if (readingTimeSpan) {
    const content = document.querySelector('main');
    const text = content.textContent.trim();
    const wordCount = text.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    readingTimeSpan.textContent = `${readingTime} min read`;
    return readingTime;
  }
}

function setActiveBreadcrumb() {
  const title = document.title.trim();
  const pageTitle = title.includes('|') ? title.split('|')[1].trim() : title;
  const activeBreadcrumb = document.querySelector('.breadcrumb-item.active');
  if (activeBreadcrumb) {
    activeBreadcrumb.textContent = pageTitle;
  }
}

function generateTOC() {
  const tocMenu = document.querySelector('#toc_menu');
  if (tocMenu) {
    const linksContainer = document.createElement('nav');
    linksContainer.classList.add('anchor-links');
    const headings = document.querySelectorAll('main section h1, main section h2, main section h3, main section h4, main section h5, main section h6');
    const headingLevels = {};
    headings.forEach(heading => {
      const level = parseInt(heading.tagName.charAt(1));
      const id = heading.id || heading.textContent.replace(/\s/g, '-').toLowerCase();
      const linkText = heading.textContent.length > 15 ? heading.textContent.substring(0, 15) + '...' : heading.textContent;
      const link = createLink(id, linkText);
      addLinkToLevel(headingLevels, level, link, linksContainer);
    });
    addLinksContainerToSidebarMenu(linksContainer);
    addClickEventListenerToFirstNavItem();
    setTabindexAttributeForNavLinks();
    const links = linksContainer.querySelectorAll('a');
    const scrollSpy = () => {
      const fromTop = window.scrollY + 80;
      links.forEach(link => {
        const section = document.querySelector(link.hash);
        if (section.offsetTop <= fromTop && section.offsetTop + section.offsetHeight > fromTop) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    };
    window.addEventListener('scroll', scrollSpy);
    scrollSpy();
  }
}

function createLink(id, linkText) {
  const link = document.createElement('a');
  link.textContent = linkText;
  link.href = `#${id}`;
  link.setAttribute('data-target', `#${id}`);
  link.classList.add('nav-link', 'text-truncate');
  return link;
}

function addLinkToLevel(headingLevels, level, link, linksContainer) {
  if (!headingLevels[level]) {
    const list = document.createElement('ul');
    list.classList.add('nav', 'nav-pills', 'flex-column');
    headingLevels[level] = list;
    linksContainer.appendChild(list);
  }
  const listItem = document.createElement('li');
  listItem.classList.add('nav-item');
  listItem.appendChild(link);
  headingLevels[level].appendChild(listItem);
}

function addLinksContainerToSidebarMenu(linksContainer) {
  const sidebarMenu = document.querySelector('#toc_menu');
  sidebarMenu.appendChild(linksContainer);
}

function addClickEventListenerToFirstNavItem() {
  const firstNavItem = document.querySelector('#toc_menu .nav-link:first-of-type');
  firstNavItem.addEventListener('click', event => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

function setTabindexAttributeForNavLinks() {
  const navLinks = document.querySelectorAll('#toc_menu .nav-link');
  navLinks.forEach(link => {
    link.setAttribute
