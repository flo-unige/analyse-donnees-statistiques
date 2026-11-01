'use strict';
(async () => {
  const english = document.documentElement.lang === 'en';
  const t = (fr, en) => english ? en : fr;
  const el = id => document.getElementById(id);
  const size = el('size'), coverage = el('coverage'), chart = el('chart');
  const fmt = n => n.toLocaleString(english ? 'en-GB' : 'fr-CH', {minimumFractionDigits: 2, maximumFractionDigits: 2});
  let model;
  const resize = () => parent.postMessage({type: 'complement-height', height: Math.ceil(document.body.getBoundingClientRect().height)}, location.origin);
  const svg = (tag, attrs, text) => {
    const node = document.createElementNS('http://www.w3.org/2000/svg', tag);
    for (const [key, value] of Object.entries(attrs)) node.setAttribute(key, value);
    if (text !== undefined) node.textContent = text;
    chart.append(node);
    return node;
  };
  const draw = (means, policy) => {
    const width = Math.max(260, chart.getBoundingClientRect().width);
    const left = 25, right = width - 25, x = value => left + value / 14 * (right - left);
    chart.setAttribute('viewBox', `0 0 ${width} 210`);
    chart.replaceChildren();
    svg('title', {id: 'chart-label'}, t('Moyennes de 100 échantillons de concentrations en nitrates', 'Mean nitrate concentrations from 100 samples'));
    svg('desc', {id: 'chart-description'}, t(`Échantillons de ${size.value} sites. Moyenne du bassin : 5 mg/L. Moyenne des sites accessibles : ${fmt(policy.poolMean)} mg/L. La hauteur des points sert seulement à les distinguer.`, `Samples of ${size.value} sites. Basin mean: 5 mg/L. Mean of accessible sites: ${fmt(policy.poolMean)} mg/L. The vertical position of the points is only used to separate them.`));
    svg('rect', {x: left, y: 15, width: right-left, height: 140, fill: '#f5f8fa'});
    for (let tick = 0; tick <= 14; tick += 2) {
      svg('line', {x1: x(tick), x2: x(tick), y1: 15, y2: 155, stroke: '#dbe3e8'});
      svg('text', {x: x(tick), y: 177, 'text-anchor': 'middle', 'font-size': 12, fill: '#354a57'}, tick);
    }
    svg('line', {x1: x(policy.poolMean), x2: x(policy.poolMean), y1: 15, y2: 155, stroke: '#ae4b22', 'stroke-width': 2, 'stroke-dasharray': '2 4'});
    svg('line', {x1: x(5), x2: x(5), y1: 15, y2: 155, stroke: '#243743', 'stroke-width': 2, 'stroke-dasharray': '6 4'});
    const y = index => 85 + ((index * 7 % 17) - 8) * 7;
    means.forEach((mean, index) => svg('circle', {cx: x(mean), cy: y(index), r: 3.6, fill: '#176880', opacity: .6}));
    svg('text', {x: width / 2, y: 201, 'text-anchor': 'middle', 'font-size': 12, fill: '#354a57'}, t('Moyenne des nitrates (mg/L)', 'Mean nitrate concentration (mg/L)'));
  };
  const show = () => {
    if (!model) return;
    const n = Number(size.value), ix = model.sizes.indexOf(n);
    const policy = model.policies.find(p => p.coverage === Number(coverage.value));
    const means = policy.trials.map(t => t.totals[ix] / n);
    const availableFar = policy.available - model.nearCount;
    el('size-value').textContent = n;
    size.setAttribute('aria-valuetext', t(`${n} sites observés`, `${n} observed sites`));
    el('far-available').textContent = t(`${availableFar} site${availableFar > 1 ? 's' : ''} accessible${availableFar > 1 ? 's' : ''} sur 300`, `${availableFar} of 300 sites accessible`);
    el('far-zone').classList.toggle('excluded', availableFar < 300);
    el('coverage-summary').textContent = t(`${policy.available} sites peuvent être tirés parmi les 900 sites du bassin. ${900 - policy.available} restent exclus, quelle que soit la taille choisie pour l’échantillon.`, `${policy.available} of the 900 sites in the basin can be selected. ${900 - policy.available} remain excluded, whatever sample size you choose.`);
    el('pool-legend').textContent = t(`Moyenne des sites accessibles : ${fmt(policy.poolMean)} mg/L`, `Mean of accessible sites: ${fmt(policy.poolMean)} mg/L`);
    el('interpretation').textContent = policy.coverage === 100
      ? t('Tous les sites ont maintenant une chance d’être sélectionnés. Les moyennes des campagnes fluctuent autour de 5 mg/L et se regroupent généralement davantage quand l’effectif augmente. Un résultat particulier peut rester au-dessus ou au-dessous de 5 mg/L, sans que cela démontre un biais.', 'Every site now has a chance of being selected. The campaign means fluctuate around 5 mg/L and generally cluster more tightly as the sample size grows. An individual result can still lie above or below 5 mg/L without demonstrating bias.')
      : t(`Les campagnes fluctuent autour de ${fmt(policy.poolMean)} mg/L, la moyenne des sites accessibles, alors que celle du bassin vaut 5 mg/L. Augmenter l’effectif resserre généralement les résultats autour de cette valeur décalée. Pour réduire le biais de couverture, il faut aussi modifier l’accès aux secteurs exclus.`, `The campaign means fluctuate around ${fmt(policy.poolMean)} mg/L, the mean of accessible sites, while the basin mean is 5 mg/L. Increasing the sample size generally makes results cluster more tightly around this shifted value. Reducing coverage bias also requires changing access to the excluded areas.`);
    draw(means, policy);
    resize();
  };
  try {
    const response = await fetch('biais-echantillon.json');
    if (!response.ok) throw new Error('Simulation indisponible');
    model = await response.json();
    document.querySelectorAll('input, select, button').forEach(control => control.disabled = false);
    size.addEventListener('input', show);
    coverage.addEventListener('change', () => { size.value = size.min; show(); });
    let lastWidth = 0;
    new ResizeObserver(() => {
      const width = chart.getBoundingClientRect().width;
      if (Math.abs(width - lastWidth) > 1) { lastWidth = width; show(); }
      else resize();
    }).observe(document.body);
    window.addEventListener('message', event => { if (event.origin === location.origin && event.data?.type === 'complement-measure') resize(); });
    el('error').hidden = true;
    show();
  } catch (error) {
    el('error').hidden = false;
    console.error(error);
    resize();
  }
})();
