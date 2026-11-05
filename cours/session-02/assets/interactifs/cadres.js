// Ajuste uniquement le cadre qui a envoyé le message, sans accès réseau.
document.querySelectorAll('iframe.session2-animation').forEach(frame => {
  const measure = () => frame.contentWindow.postMessage({type:'session2-measure'}, '*');
  frame.addEventListener('load', measure);
  measure();
});
window.addEventListener('message', event => {
  if (!event.data || event.data.type !== 'session2-height') return;
  document.querySelectorAll('iframe.session2-animation').forEach(frame => {
    if (event.source === frame.contentWindow && Number.isFinite(event.data.height)) {
      frame.style.height = Math.max(300, Math.min(2200, event.data.height + 8)) + 'px';
    }
  });
});
