'use strict';
(async function () {
  const heading = document.querySelector('h1');
  const figure = document.querySelector('img');
  const explanation = document.getElementById('explanation');
  const slider = document.getElementById('state');
  const value = document.getElementById('value');
  const play = document.getElementById('play');
  let timer = null;
  const resize = () => parent.postMessage({type: 'complement-height', height: Math.ceil(document.body.getBoundingClientRect().height)}, location.origin);
  try {
    const response = await fetch('complements.json');
    if (!response.ok) throw new Error('Chargement indisponible');
    const models = await response.json();
    const animation = new URLSearchParams(location.search).get('animation');
    const model = models[animation];
    const manualOnly = document.body.dataset.manualAnimation === animation;
    if (manualOnly) document.querySelector('.controls')?.remove();
    if (!model) throw new Error('Complément inconnu');
    heading.textContent = model.title;
    document.title = model.title;
    document.querySelector('label').textContent = model.control;
    slider.max = model.frames.length - 1;
    slider.value = model.default;
    const pause = () => { clearInterval(timer); timer = null; play.textContent = 'Lancer l’animation'; play.setAttribute('aria-pressed', 'false'); };
    play.textContent = 'Lancer l’animation';
    // Précharger les images suivantes pour une lecture sans clignotement.
    const preload = index => {
      for (const frame of model.frames.slice(index + 1, index + 6)) {
        const preview = new Image(); preview.src = frame.image;
      }
    };
    const show = () => {
      const index = Number(slider.value), frame = model.frames[index];
      figure.src = frame.image;
      figure.alt = frame.description;
      explanation.textContent = frame.description;
      value.textContent = `${index + 1} sur ${model.frames.length}`;
      slider.setAttribute('aria-valuetext', frame.label);
      preload(index);
      if (!manualOnly) {
        document.getElementById('previous').disabled = index === 0;
        document.getElementById('next').disabled = index === model.frames.length - 1;
      }
      resize();
    };
    slider.addEventListener('input', () => { pause(); show(); });
    if (!manualOnly) {
      document.getElementById('previous').onclick = () => { pause(); slider.value = Number(slider.value) - 1; show(); };
      document.getElementById('next').onclick = () => { pause(); slider.value = Number(slider.value) + 1; show(); };
      document.getElementById('reset').onclick = () => { pause(); slider.value = model.default; show(); };
      play.onclick = () => {
        if (timer) { pause(); return; }
        if (Number(slider.value) === model.frames.length - 1) slider.value = 0;
        show(); play.textContent = 'Pause'; play.setAttribute('aria-pressed', 'true');
        timer = setInterval(() => {
          slider.value = Number(slider.value) + 1; show();
          if (Number(slider.value) === model.frames.length - 1) pause();
        }, model.interval || 1600);
      };
      document.addEventListener('visibilitychange', () => { if (document.hidden) pause(); });
    }
    figure.addEventListener('load', resize);
    window.addEventListener('resize', resize);
    window.addEventListener('message', event => { if (event.origin === location.origin && event.data?.type === 'complement-measure') resize(); });
    new ResizeObserver(resize).observe(document.body);
    show();
  } catch (error) {
    explanation.textContent = 'Le complément ne peut pas être chargé. Consulter la figure statique dans le PDF.';
    document.querySelectorAll('button, input').forEach(control => { control.disabled = true; });
    console.error(error);
  }
})();
