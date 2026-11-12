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
    const labels = { 'Accueil': 'Home', 'Cours': 'Course', 'Travaux pratiques': 'Practical work', 'Ressources': 'Resources', 'Données': 'Data' };
    if (!labels[text] && !link.classList.contains('navbar-brand')) return;
    if (labels[text]) label.textContent = labels[text];
    const url = new URL(link.href);
    url.pathname = url.pathname.replace(/(?:index\.html)?$/, 'index-en.html');
    link.href = url.href;
  });
  const setSessionTitle = (label, session, title) => {
    const number = document.createElement('strong');
    number.textContent = `Session ${session}`;
    label.replaceChildren(number, document.createTextNode(` - ${title}`));
  };
  const sessionTitles = {
    "1": "Introduction to the course. Programming principles in R or Python",
    "2": "Foundations of probability and statistics",
    "3": "Data visualisation",
    "4": "Inferential analyses: hypotheses and tests",
    "5": "Analysis of variance and experimental design",
    "6": "Statistical modelling: simple and multiple regression",
    "7": "Advanced statistical modelling: GLM, GAM, BRT…"
};
  document.querySelectorAll('#quarto-sidebar a, .pagination-link').forEach(link => {
    const label = link.querySelector('.menu-text, .nav-page-text') || link;
    const match = label.textContent.match(/Session\s+(\d+)/i);
    if (match && sessionTitles[match[1]]) {
      setSessionTitle(label, match[1], sessionTitles[match[1]]);
    } else if (label.textContent.trim() === 'Travaux pratiques') {
      label.textContent = 'Practical work';
    }
    if (/\/(?:cours|tp)\//.test(link.pathname)) {
      const url = new URL(link.href);
      url.pathname = url.pathname.replace(/(?:index\.html)?$/, 'index-en.html');
      link.href = url.href;
      if (link.closest('#quarto-sidebar') && url.pathname === location.pathname) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      }
    }
  });
})();
