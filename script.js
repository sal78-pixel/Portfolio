// Small progressive enhancements: mobile navigation and a remembered color theme.
document.body.classList.add('js-enabled');

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.site-nav');

if (menuButton && navigation) {
  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    menuButton.querySelector('.sr-only').textContent = isOpen ? 'Open navigation' : 'Close navigation';
    navigation.classList.toggle('is-open', !isOpen);
  });

  navigation.addEventListener('click', (event) => {
    if (event.target.closest('a')) {
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.querySelector('.sr-only').textContent = 'Open navigation';
      navigation.classList.remove('is-open');
    }
  });
}

const themeButton = document.querySelector('.theme-toggle');
if (themeButton) {
  let savedTheme = null;
  try {
    savedTheme = localStorage.getItem('portfolio-theme');
  } catch {
    // The theme control still works for this visit if local storage is unavailable.
  }
  if (savedTheme === 'dark') document.body.classList.add('dark');

  const updateThemeLabel = () => {
    const isDark = document.body.classList.contains('dark');
    themeButton.setAttribute('aria-pressed', String(isDark));
    themeButton.querySelector('.theme-label').textContent = isDark ? 'Light mode' : 'Dark mode';
  };
  updateThemeLabel();

  themeButton.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const theme = document.body.classList.contains('dark') ? 'dark' : 'light';
    try {
      localStorage.setItem('portfolio-theme', theme);
    } catch {
      // Keep the theme toggle functional when the browser blocks local storage.
    }
    updateThemeLabel();
  });
}
const projectCarousel = document.querySelector('[data-project-carousel]');
const projectCarouselControls = document.querySelector('[data-project-controls]');

if (projectCarousel && projectCarouselControls) {
  const previousProjectButton = projectCarouselControls.querySelector('[data-project-previous]');
  const nextProjectButton = projectCarouselControls.querySelector('[data-project-next]');
  const projectCards = [...projectCarousel.querySelectorAll('.project-card')];

  const updateProjectCarouselControls = () => {
    const maxScroll = projectCarousel.scrollWidth - projectCarousel.clientWidth;
    previousProjectButton.disabled = projectCarousel.scrollLeft <= 1;
    nextProjectButton.disabled = projectCarousel.scrollLeft >= maxScroll - 1;
  };

  const moveProjectCarousel = (direction) => {
    const cardStyle = getComputedStyle(projectCarousel);
    const gap = parseFloat(cardStyle.columnGap || cardStyle.gap) || 0;
    const distance = projectCards[0].getBoundingClientRect().width + gap;
    const left = projectCarousel.scrollLeft + direction * distance;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      projectCarousel.scrollLeft = left;
    } else {
      projectCarousel.scrollTo({ left, behavior: 'smooth' });
    }
  };

  if (projectCards.length > 1 && previousProjectButton && nextProjectButton) {
    projectCarouselControls.hidden = false;
    previousProjectButton.addEventListener('click', () => moveProjectCarousel(-1));
    nextProjectButton.addEventListener('click', () => moveProjectCarousel(1));
    projectCarousel.addEventListener('scroll', updateProjectCarouselControls, { passive: true });
    window.addEventListener('resize', updateProjectCarouselControls);
    updateProjectCarouselControls();
  }
}
