/* Video.js 8: lecteur du cours, sans lecture automatique. */
(() => {
  'use strict';
  document.querySelectorAll('video[data-cours-video]').forEach((element) => {
    const container = element.closest('.cours-video');
    const notice = container.querySelector('.cours-video-erreur');
    const retry = container.querySelector('.cours-video-reessayer');
    const source = element.querySelector('source').getAttribute('src');
    if (typeof window.videojs !== 'function') {
      notice.hidden = false;
      retry.hidden = true;
      return;
    }
    const player = window.videojs(element, {
      controls: true,
      autoplay: false,
      preload: 'metadata',
      fluid: true,
      responsive: true,
      aspectRatio: '16:9',
      language: 'fr',
      textTrackSettings: false,
      playbackRates: [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2],
      controlBar: { skipButtons: { backward: 5, forward: 5 } },
      html5: { nativeTextTracks: false },
    });
    const playerElement = player.el();
    playerElement.setAttribute('tabindex', '0');
    // Limiter les raccourcis au lecteur. Les menus et le volume gardent
    // leurs propres commandes ; la barre de progression avance aussi de 5 s.
    const seekWithArrow = (event) => {
      if (!['ArrowLeft', 'ArrowRight'].includes(event.key)
          || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey
          || event.defaultPrevented
          || event.target.closest('input, textarea, select, [contenteditable="true"], .vjs-menu, .vjs-volume-panel')) return;
      const duration = player.duration();
      if (!Number.isFinite(duration) || duration <= 0) return;
      event.preventDefault();
      event.stopPropagation();
      const offset = event.key === 'ArrowRight' ? 5 : -5;
      player.currentTime(Math.max(0, Math.min(duration, player.currentTime() + offset)));
      player.userActive(true);
    };
    playerElement.addEventListener('keydown', seekWithArrow, true);
    player.on('dispose', () => playerElement.removeEventListener('keydown', seekWithArrow, true));
    player.on('error', () => { notice.hidden = false; });
    player.on('loadedmetadata', () => { notice.hidden = true; });
    retry.addEventListener('click', () => {
      const position = player.currentTime() || 0;
      const speed = player.playbackRate();
      player.one('loadedmetadata', () => {
        player.currentTime(position);
        player.playbackRate(speed);
      });
      // Repasser par Mediaserver obtient une nouvelle adresse de diffusion.
      player.src({ src: source, type: 'video/mp4' });
      player.load();
    });
  });
})();
