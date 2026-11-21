/* Additional features: (1) mobile menu, (2) theme switcher,
   (3) filterable projects, (4) back-to-top, (5) native FAQ accordions. */
'use strict';

const menuButton = document.querySelector('#menu-toggle');
const navigation = document.querySelector('#primary-navigation');
const themeButton = document.querySelector('#theme-toggle');
const themeIcon = document.querySelector('#theme-icon');
const filterButtons = document.querySelectorAll('[data-filter]');
const projectCards = document.querySelectorAll('[data-category]');
const filterStatus = document.querySelector('#filter-status');
const backToTop = document.querySelector('#back-to-top');

function closeMenu() {
  navigation.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open menu');
}
menuButton.addEventListener('click', () => {
  const opening = menuButton.getAttribute('aria-expanded') !== 'true';
  navigation.classList.toggle('is-open', opening);
  menuButton.setAttribute('aria-expanded', String(opening));
  menuButton.setAttribute('aria-label', opening ? 'Close menu' : 'Open menu');
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  themeIcon.textContent = theme === 'dark' ? '☀' : '☾';
  themeButton.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
  try { localStorage.setItem('portfolio-theme', theme); } catch (_) { /* storage optional */ }
}
let savedTheme = 'light';
try { savedTheme = localStorage.getItem('portfolio-theme') === 'dark' ? 'dark' : 'light'; } catch (_) { /* storage optional */ }
setTheme(savedTheme);
themeButton.addEventListener('click', () => setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'));

filterButtons.forEach(button => button.addEventListener('click', () => {
  const activeFilter = button.dataset.filter;
  filterButtons.forEach(item => {
    const isActive = item === button;
    item.classList.toggle('is-active', isActive);
    item.setAttribute('aria-pressed', String(isActive));
  });
  let visible = 0;
  projectCards.forEach(card => {
    const show = activeFilter === 'all' || card.dataset.category === activeFilter;
    card.hidden = !show;
    if (show) visible += 1;
  });
  filterStatus.textContent = `Showing ${visible} ${visible === 1 ? 'project' : 'projects'}`;
}));

function updateBackToTop() { backToTop.classList.toggle('visible', window.scrollY > 550); }
window.addEventListener('scroll', updateBackToTop, { passive: true });
updateBackToTop();
document.querySelector('#year').textContent = String(new Date().getFullYear());
