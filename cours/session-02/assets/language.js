/* Translate the shared site navigation on the English course page only.
   Quarto's own controls are translated by the page's lang: en metadata. */
(() => {
  if (!document.documentElement.lang.startsWith('en')) return;
  document.title = document.title.replace('Analyse de données statistiques', 'Statistical Data Analysis');
  const set = (selector, text) => document.querySelectorAll(selector)
    .forEach(element => { element.textContent = text; });
  set('.navbar-title', 'Statistical Data Analysis');
  set('.nav-footer-left', 'Statistical Data Analysis · University of Geneva');
  document.querySelectorAll('.navbar-nav a, .nav-footer a').forEach(link => {
    const label = link.querySelector('.menu-text') || link;
    const text = label.textContent.trim();
    if (text === 'Accueil') label.textContent = 'Home (French)';
    if (text === 'Cours') {
      label.textContent = 'Course';
      link.setAttribute('href', 'index-en.html');
    }
    if (text === 'Site créé avec Quarto') label.textContent = 'Built with Quarto';
  });
  document.querySelectorAll('#quarto-sidebar .menu-text, .pagination-link .nav-page-text')
    .forEach(label => {
      const session = label.textContent.match(/Session\s+(\d)/i)?.[1];
      if (!session) return;
      if (session === '2') {
        label.textContent = 'Session 2: Foundations of probability and statistics';
        const link = label.closest('a');
        link?.setAttribute('href', 'index-en.html');
        link?.classList.add('active');
        link?.setAttribute('aria-current', 'page');
      } else {
        label.textContent = `Session ${session}: Under construction (French)`;
      }
    });
})();
