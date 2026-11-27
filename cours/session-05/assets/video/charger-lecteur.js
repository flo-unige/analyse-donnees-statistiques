/* Load the browser-global wrapper without interfering with Quarto's AMD loader. */
(() => {
  'use strict';
  const base = new URL('.', document.currentScript.src);
  const script = path => new Promise((resolve, reject) => {
    const element = document.createElement('script');
    element.src = new URL(path, base).href;
    element.onload = resolve;
    element.onerror = reject;
    document.head.append(element);
  });
  const load = script('vendor/videojs-8.23.8/video.global.min.js');
  load.then(async () => {
    if (!document.documentElement.lang.startsWith('en')) {
      await script('vendor/videojs-8.23.8/fr.js');
    }
    await script('lecteur.js');
  }).catch(error => {
    document.querySelectorAll('.cours-video-erreur').forEach(notice => {
      notice.hidden = false;
      const retry = notice.querySelector('button');
      retry.onclick = () => window.location.reload();
    });
    console.error('Course video player could not be loaded.', error);
  });
})();
