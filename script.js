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
  const savedTheme = localStorage.getItem('portfolio-theme');
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
    localStorage.setItem('portfolio-theme', theme);
    updateThemeLabel();
  });
}
