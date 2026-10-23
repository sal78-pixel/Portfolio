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
  const rotationProjectButton = projectCarouselControls.querySelector('[data-project-rotation]');
  const projectCards = [...projectCarousel.querySelectorAll('.project-card')];
  const reducedMotionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  let rotationTimer = null;
  let rotationPaused = reducedMotionPreference.matches;

  const updateProjectCarouselControls = () => {
    const maxScroll = projectCarousel.scrollWidth - projectCarousel.clientWidth;
    previousProjectButton.disabled = projectCarousel.scrollLeft <= 1;
    nextProjectButton.disabled = projectCarousel.scrollLeft >= maxScroll - 1;
  };

  const updateRotationControl = () => {
    const icon = rotationProjectButton.querySelector('span');
    icon.textContent = rotationPaused ? '▶' : 'Ⅱ';
    rotationProjectButton.setAttribute(
      'aria-label',
      rotationPaused ? 'Resume automatic carousel rotation' : 'Pause automatic carousel rotation'
    );
  };

  const getProjectStep = () => {
    const trackStyle = getComputedStyle(projectCarousel);
    const gap = parseFloat(trackStyle.columnGap || trackStyle.gap) || 0;
    return projectCards[0].getBoundingClientRect().width + gap;
  };

  const stopAutomaticRotation = () => {
    rotationPaused = true;
    window.clearInterval(rotationTimer);
    rotationTimer = null;
    updateRotationControl();
  };

  const startAutomaticRotation = () => {
    rotationPaused = false;
    window.clearInterval(rotationTimer);
    rotationTimer = window.setInterval(() => {
      if (document.hidden) return;
      const maxScroll = projectCarousel.scrollWidth - projectCarousel.clientWidth;
      const nextPosition = projectCarousel.scrollLeft >= maxScroll - 1
        ? 0
        : projectCarousel.scrollLeft + getProjectStep();

      if (reducedMotionPreference.matches) {
        projectCarousel.scrollLeft = nextPosition;
      } else {
        projectCarousel.scrollTo({ left: nextPosition, behavior: 'smooth' });
      }
    }, 6000);
    updateRotationControl();
  };

  const moveProjectCarousel = (direction) => {
    const left = projectCarousel.scrollLeft + direction * getProjectStep();
    if (reducedMotionPreference.matches) {
      projectCarousel.scrollLeft = left;
    } else {
      projectCarousel.scrollTo({ left, behavior: 'smooth' });
    }
  };

  if (projectCards.length > 1 && previousProjectButton && nextProjectButton && rotationProjectButton) {
    projectCarouselControls.hidden = false;
    previousProjectButton.addEventListener('click', () => {
      stopAutomaticRotation();
      moveProjectCarousel(-1);
    });
    nextProjectButton.addEventListener('click', () => {
      stopAutomaticRotation();
      moveProjectCarousel(1);
    });
    rotationProjectButton.addEventListener('click', () => {
      if (rotationPaused) startAutomaticRotation();
      else stopAutomaticRotation();
    });
    projectCarousel.addEventListener('pointerenter', stopAutomaticRotation);
    projectCarousel.addEventListener('focusin', stopAutomaticRotation);
    projectCarousel.addEventListener('scroll', updateProjectCarouselControls, { passive: true });
    window.addEventListener('resize', updateProjectCarouselControls);
    updateProjectCarouselControls();
    if (rotationPaused) updateRotationControl();
    else startAutomaticRotation();

    reducedMotionPreference.addEventListener('change', (event) => {
      if (event.matches) stopAutomaticRotation();
    });
  }
}
