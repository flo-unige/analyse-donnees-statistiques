/* Translate shared navigation while preserving deployment subpaths. */
(() => {
  if (!document.documentElement.lang.startsWith('en')) return;
  document.title = document.title.replace('Analyse de données statistiques', 'Statistical Data Analysis');
  const set = (selector, text) => document.querySelectorAll(selector)
    .forEach(element => { element.textContent = text; });
  set('.navbar-title', 'Statistical Data Analysis');
  set('.nav-footer-left', 'Statistical Data Analysis · University of Geneva');
  document.querySelectorAll('.navbar-nav a, .navbar-brand, .nav-footer a').forEach(link => {
    const label = link.querySelector('.menu-text') || link;
    const text = label.textContent.trim();
    if (text === 'Site créé avec Quarto') {
      label.textContent = 'Built with Quarto';
      return;
    }
    const labels = { 'Accueil': 'Home', 'Cours': 'Course', 'Travaux pratiques': 'Practical work', 'Ressources': 'Resources' };
    if (!labels[text] && !link.classList.contains('navbar-brand')) return;
    if (labels[text]) label.textContent = labels[text];
    const url = new URL(link.href);
    url.pathname = url.pathname.replace(/(?:index\.html)?$/, 'index-en.html');
    link.href = url.href;
  });
})();
