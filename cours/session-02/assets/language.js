/* Translate the shared site navigation on the English course page only.
   Quarto's own controls are translated by the page's lang: en metadata. */
(() => {
  // Keep the selected programming language when using the course navigation.
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  const isR = currentPage.endsWith('-r.html');
  if (isR) {
    document.querySelectorAll('.navbar-nav a, #quarto-sidebar a').forEach(link => {
      if (!/\/session-02\/(?:index(?:-en)?\.html)?$/.test(link.pathname)) return;
      link.setAttribute('href', currentPage);
      if (link.closest('#quarto-sidebar')) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      }
    });
  }
  if (!document.documentElement.lang.startsWith('en')) return;
  document.title = document.title.replace('Analyse de données statistiques', 'Statistical Data Analysis');
  const set = (selector, text) => document.querySelectorAll(selector)
    .forEach(element => { element.textContent = text; });
  set('.navbar-title', 'Statistical Data Analysis');
  set('.nav-footer-left', 'Statistical Data Analysis · University of Geneva');
  document.querySelectorAll('.navbar-nav a, .nav-footer a').forEach(link => {
    const label = link.querySelector('.menu-text') || link;
    const text = label.textContent.trim();
    if (['Accueil', 'Travaux pratiques', 'Ressources'].includes(text)) {
      label.textContent = { 'Accueil': 'Home', 'Travaux pratiques': 'Practical work', 'Ressources': 'Resources' }[text];
      const url = new URL(link.href);
      url.pathname = url.pathname.replace(/(?:index\.html)?$/, 'index-en.html');
      link.href = url.href;
    }
    if (text === 'Cours') {
      label.textContent = 'Course';
      link.setAttribute('href', currentPage);
    }
    if (text === 'Site créé avec Quarto') label.textContent = 'Built with Quarto';
  });
  const sessionTitles = {
    "1": "Introduction to the course. Programming principles in R or Python",
    "2": "Foundations of probability and statistics",
    "3": "Data visualisation",
    "4": "Inferential analyses: hypotheses and tests",
    "5": "Analysis of variance and experimental design",
    "6": "Statistical modelling: simple and multiple regression",
    "7": "Advanced statistical modelling: GLM, GAM, BRT…"
};
  document.querySelectorAll('#quarto-sidebar .menu-text, .pagination-link .nav-page-text')
    .forEach(label => {
      const session = label.textContent.match(/Session\s+(\d)/i)?.[1];
      if (!session) return;
      if (session === '2') {
        label.textContent = 'Session 2: Foundations of probability and statistics';
        const link = label.closest('a');
        link?.setAttribute('href', currentPage);
        link?.classList.add('active');
        link?.setAttribute('aria-current', 'page');
      } else {
        label.textContent = `Session ${session} - ${sessionTitles[session]}`;
        const link = label.closest('a');
        if (link) {
          const url = new URL(link.href);
          url.pathname = url.pathname.replace(/(?:index\.html)?$/, 'index-en.html');
          link.href = url.href;
        }
      }
    });
})();
