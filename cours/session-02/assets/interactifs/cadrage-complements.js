'use strict';
const complements = [...document.querySelectorAll('iframe.complement-animation')];
for (const frame of complements) {
  frame.addEventListener('load', () => frame.contentWindow.postMessage({type: 'complement-measure'}, location.origin));
}
window.addEventListener('message', event => {
  if (event.origin !== location.origin || event.data?.type !== 'complement-height') return;
  const frame = complements.find(frame => frame.contentWindow === event.source);
  if (frame && Number.isFinite(event.data.height)) frame.style.height = Math.max(400, event.data.height + 12) + 'px';
});
