/* Animations autonomes, sans bibliothèque ni accès réseau.
 * Toutes les valeurs sont fictives. La graine fixe rend les exemples reproductibles.
 * Les calculs sont séparés du dessin pour permettre leur vérification.
 */
(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const kind = new URLSearchParams(location.search).get('animation') || 'echantillonnage';
  const blue = '#146b85', orange = '#aa4b18', teal = '#167868';
  const fmt = (x, digits = 1) => x.toLocaleString('fr-FR', {minimumFractionDigits:digits,maximumFractionDigits:digits});
  const mean = xs => xs.reduce((a,b)=>a+b,0)/xs.length;
  function random(seed) { return () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0)/4294967296; }; }
  function shuffled(xs, rng) { const a=xs.slice(); for(let i=a.length-1;i>0;i--){const j=Math.floor(rng()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a; }
  const values = [1,2,3,3,4,5,6,7,14];
  const population = Array.from({length:60},(_,i)=>({id:i,route:i%10>=7, value:i%10>=7?[7,8,9][Math.floor(i/10)%3]:[1,2,3][Math.floor(i/10)%3]}));
  const accessible = population.filter(p=>p.route);
  function histogram(xs,bins){const width=16/bins,counts=Array(bins).fill(0);xs.forEach(v=>counts[Math.min(bins-1,Math.floor(v/width))]++);return counts;}
  function cumulative(xs){let total=0;return xs.map((v,i)=>(total+=v)/(i+1));}
  // Export limité aux données et calculs pour les contrôles reproductibles.
  window.Session2Model={mean,random,shuffled,values,population,accessible,histogram,cumulative};
  const ns='http://www.w3.org/2000/svg';
  function el(tag,attrs={},text){const node=document.createElementNS(ns,tag);Object.entries(attrs).forEach(([k,v])=>node.setAttribute(k,v));if(text!==undefined)node.textContent=text;return node;}
  function add(svg,tag,attrs,text){const n=el(tag,attrs,text);svg.append(n);return n;}
  function svgFor(host,height,label){const width=Math.max(260,Math.round(host.getBoundingClientRect().width));const svg=el('svg',{viewBox:`0 0 ${width} ${height}`,class:'chart',role:'img','aria-label':label});host.replaceChildren(svg);return {svg,width};}
  function line(s,x1,y1,x2,y2,attrs={}){return add(s,'line',{x1,y1,x2,y2,...attrs});}
  function text(s,x,y,t,attrs={}){return add(s,'text',{x,y,...attrs},t);}
  function axis(s,w,h,maxX,maxY){const x=v=>48+v/maxX*(w-66),y=v=>h-42-v/maxY*(h-72);[0,maxY/2,maxY].forEach(v=>{line(s,48,y(v),w-18,y(v),{class:'grid'});text(s,39,y(v)+4,fmt(v,Number.isInteger(v)?0:1),{'text-anchor':'end'});});line(s,48,30,48,h-42,{class:'axis'});line(s,48,h-42,w-18,h-42,{class:'axis'});return{x,y};}
  let position=0,maximum=1,timer=null,draw=()=>{},step=1;
  const stop=()=>{clearInterval(timer);timer=null;$('play').textContent='▶ Lire';};
  function update(){ $('progress').value=position;$('next').disabled=position>=maximum;draw();sendHeight(); }
  function setPosition(v){position=Math.min(maximum,Math.max(0,v));if(position===maximum)stop();update();}
  $('play').onclick=()=>{if(timer){stop();return;}if(position>=maximum)position=0;$('play').textContent='Ⅱ Pause';timer=setInterval(()=>setPosition(position+step),kind==='histogramme'?1000:kind==='echantillonnage'?850:500);};
  $('next').onclick=()=>{stop();setPosition(position+step);};
  $('reset').onclick=()=>{stop();setPosition(0);};
  $('progress').oninput=e=>{stop();setPosition(Number(e.target.value));};
  document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();});
  function config(title,intro,max,alternative){$('title').textContent=title;$('intro').textContent=intro;maximum=max;$('progress').max=max;$('alternative').textContent=alternative;document.title=title;}

  if(kind==='echantillonnage'){
    config('Choisir des sites : qui a une chance d’être observé ?',
      'Deux équipes choisissent chacune 15 sites dans la même population de 60 sites. Comparez les sites entourés au fil des tirages.',15,
      'La population comprend 42 sites éloignés de la route et 18 sites proches de la route. À gauche, chaque site peut être tiré au sort, sans remise. À droite, seuls les 18 sites proches de la route sont éligibles. Les deux échantillons ont la même taille, mais celui de droite exclut systématiquement 42 sites. Un tirage aléatoire peut lui aussi être déséquilibré par hasard ; il ne garantit pas une composition exactement identique à celle de la population.');
    const rng=random(20260908),orders=[shuffled(population,rng).slice(0,15),shuffled(accessible,rng).slice(0,15)];
    $('visual').innerHTML='<div class="legend"><span><i class="swatch"></i> Site éloigné</span><span><i class="swatch road"></i> Site proche de la route</span><span>Contour épais = site sélectionné</span></div><div class="panels"><section class="panel"><h2>1. Tirage dans toute la population</h2><p class="sub">Les 60 sites peuvent être sélectionnés.</p><div id="map-all"></div><p class="stat" id="count-all"></p></section><section class="panel"><h2>2. Tirage près de la route</h2><p class="sub">Seuls les 18 sites à droite sont éligibles.</p><div id="map-road"></div><p class="stat" id="count-road"></p></section></div>';
    draw=()=>{
      ['all','road'].forEach((key,k)=>{
        const selected=new Set(orders[k].slice(0,position).map(p=>p.id));
        const {svg,width:w}=svgFor($('map-'+key),230,`${position} sites sélectionnés ${k?'près de la route':'dans toute la population'}`);
        const gap=(w-36)/10,yy=r=>43+r*26,xx=c=>18+(c+.5)*gap;
        add(svg,'rect',{x:xx(7)-gap*.5,y:23,width:gap*3,height:169,fill:'#fff0df',rx:5});
        population.forEach(p=>{const x=xx(p.id%10),y=yy(Math.floor(p.id/10)),chosen=selected.has(p.id);const attrs={fill:p.route?orange:blue,opacity:chosen?1:k&&!p.route?.18:.38,stroke:chosen?'#183442':'none','stroke-width':3};const n=p.route?add(svg,'rect',{x:x-5,y:y-5,width:10,height:10,...attrs}):add(svg,'circle',{cx:x,cy:y,r:5,...attrs});n.append(el('title',{},`Site ${p.id+1} — ${p.route?'proche':'éloigné'}${chosen?' — sélectionné':''}`));if(chosen)text(svg,x,y+3,'✓',{'text-anchor':'middle',fill:'#fff',style:'fill:white;font-size:9px;font-weight:bold'});});
        text(svg,xx(8),213,'ROUTE',{'text-anchor':'middle',class:'small'});
        const near=orders[k].slice(0,position).filter(p=>p.route).length;
        $('count-'+key).textContent=`${position} sélectionnés : ${position-near} éloignés · ${near} proches`;
      });
      $('progress-label').textContent=`${position} / 15 sites par équipe`;
      $('message').textContent=position===0?'Au départ, les populations sont identiques. Ce qui change, c’est la liste des sites qui peuvent entrer dans l’échantillon.':position<15?'À droite, aucun site éloigné ne peut être sélectionné. Ajouter des observations dans cette zone ne donne aucune information directe sur les sites exclus.':'Même taille, couverture différente : 15 observations ne suffisent pas à garantir un bon échantillon. À gauche, la composition varie par hasard ; à droite, l’exclusion des sites éloignés est systématique.';
    };
  } else if(kind==='histogramme'){
    config('Un histogramme se construit observation par observation',
      'Chaque pastille représente l’une des 9 mesures du fil rouge. Faites-les descendre dans leur classe, puis changez la largeur des classes.',9,
      'Les concentrations sont 1, 2, 3, 3, 4, 5, 6, 7 et 14 mg/L. Avec 4 classes de largeur 4 mg/L, les effectifs sont 4, 4, 0 et 1. Avec 8 classes de largeur 2 mg/L, ils sont 1, 3, 2, 2, 0, 0, 0 et 1. Une valeur située sur une frontière entre dans la classe de droite. La hauteur compte les observations ; la somme des effectifs reste 9.');
    $('options').innerHTML='<label for="bins">Découpage <select id="bins"><option value="4">4 classes · largeur 4 mg/L</option><option value="8">8 classes · largeur 2 mg/L</option></select></label>';
    $('visual').innerHTML='<p class="data-values">Valeurs inchangées : <strong>1 · 2 · 3 · 3 · 4 · 5 · 6 · 7 · 14 mg/L</strong></p><div id="hist"></div><p class="stat" id="hist-count"></p>';
    let bins=4,previousBins=0,structure=null;
    $('bins').onchange=e=>{stop();bins=Number(e.target.value);update();};
    draw=()=>{
      const host=$('hist'),width=Math.max(260,Math.round(host.getBoundingClientRect().width));
      if(!structure||structure.width!==width||previousBins!==bins){
        const oldPositions=structure?structure.dots.map(dot=>({x:dot.getAttribute('cx'),y:dot.getAttribute('cy')})):null;
        const {svg,width:w}=svgFor(host,350,'Construction de l’histogramme des neuf concentrations');
        const x=v=>44+v/16*(w-60),y=v=>292-v*36;
        text(svg,44,20,'Mesures à classer');
        text(svg,44,109,'Effectif');
        for(let n=0;n<=4;n++){line(svg,44,y(n),w-16,y(n),{class:'grid'});text(svg,34,y(n)+4,String(n),{'text-anchor':'end'});}
        const bars=[];for(let b=0;b<bins;b++){
          bars.push(add(svg,'rect',{x:x(b*16/bins)+1,y:y(0),width:(w-60)/bins-2,height:0,fill:'#d7eaf0',class:'bar'}));
          line(svg,x(b*16/bins),120,x(b*16/bins),298,{stroke:'#a4bbc6','stroke-dasharray':'3 4'});
        }
        const ticks=w<400?[0,4,8,12,16]:Array.from({length:bins+1},(_,i)=>i*16/bins);
        ticks.forEach(v=>text(svg,x(v),316,String(v),{'text-anchor':'middle'}));
        text(svg,(w+30)/2,343,'Concentration (mg/L)',{'text-anchor':'middle'});
        const dots=values.map((v,i)=>add(svg,'circle',{cx:oldPositions?.[i].x??44+i*(w-64)/8,cy:oldPositions?.[i].y??56,r:7,fill:blue,class:'dot'}));
        const labels=values.map((v,i)=>text(svg,44+i*(w-64)/8,81,String(v),{'text-anchor':'middle',class:'small'}));
        const counts=Array.from({length:bins},(_,b)=>text(svg,x((b+.5)*16/bins),y(0)-12,'',{'text-anchor':'middle'}));
        structure={svg,width:w,x,y,bars,dots,labels,counts};previousBins=bins;
        // Enregistrer les positions précédentes avant le déplacement vers les nouvelles classes.
        svg.getBoundingClientRect();
      }
      const {x,y,bars,dots,labels,counts}=structure,occupancy=Array(bins).fill(0);
      values.forEach((v,i)=>{const classified=i<position,b=Math.min(bins-1,Math.floor(v/(16/bins)));let targetX=44+i*(width-64)/8,targetY=56;if(classified){occupancy[b]++;targetX=x((b+.5)*16/bins);targetY=y(occupancy[b]-.5);}dots[i].setAttribute('cx',targetX);dots[i].setAttribute('cy',targetY);dots[i].setAttribute('fill',i===position-1?orange:blue);labels[i].setAttribute('opacity',classified?.3:1);});
      occupancy.forEach((count,b)=>{bars[b].setAttribute('y',y(count));bars[b].setAttribute('height',292-y(count));counts[b].setAttribute('y',y(count)-10);counts[b].textContent=count?String(count):'';});
      $('hist-count').textContent=`${position} classées + ${9-position} à classer = 9 observations`;
      $('progress-label').textContent=`${position} / 9 observations classées`;
      $('message').textContent=position===0?'Les nombres du haut sont les mesures. Les frontières verticales définissent les classes. « Avancer » classe une mesure à la fois.':position<9?`La mesure ${values[position-1]} mg/L rejoint la classe [${Math.floor(values[position-1]/(16/bins))*(16/bins)} ; ${(Math.floor(values[position-1]/(16/bins))+1)*(16/bins)}[. Chaque pastille ajoutée fait monter la barre d’une unité.`:`Les 9 mesures sont classées. Avec ${bins} classes, les effectifs sont ${histogram(values,bins).join(', ')}. Changez le découpage : les mêmes mesures se regroupent autrement, sans ajout ni suppression.`;
    };
  } else {
    config('Plus de mesures : une moyenne plus stable… mais de quoi ?',
      'On mesure des sites tirés au sort avec remise. Suivez d’abord la moyenne de toute la population, puis affichez une sélection limitée aux sites proches de la route.',1000,
      'Dans cette population fictive, 42 sites éloignés ont une moyenne de 2 mg/L et 18 sites proches une moyenne de 8 mg/L. La moyenne des 60 sites est donc 3,8 mg/L. Des tirages indépendants, uniformes et avec remise dans toute la population donnent une moyenne cumulée qui tend vers 3,8 mg/L. Des tirages restreints aux sites proches tendent vers 8 mg/L. La stabilisation n’efface pas le biais de sélection. Les fluctuations peuvent temporairement augmenter : le rapprochement n’est pas monotone.');
    $('options').innerHTML='<label><input type="checkbox" id="show-bias"> Comparer avec une sélection près de la route</label><button type="button" id="new-draw">Autre tirage</button>';
    $('visual').innerHTML='<div id="mean-build"></div><div id="mean-chart"></div><div class="legend"><span><i class="line"></i> Tirage dans tous les sites</span><span id="bias-legend" hidden><i class="line dashed"></i> Tirage près de la route</span><span>Pointillés gris : moyenne cible = 3,8 mg/L</span></div><p id="mean-count" class="stat"></p>';
    let seed=271828,seqA,seqB,avgA,avgB;
    function sample(){const rng=random(seed);seqA=Array.from({length:1000},()=>population[Math.floor(rng()*60)].value);seqB=Array.from({length:1000},()=>accessible[Math.floor(rng()*18)].value);avgA=cumulative(seqA);avgB=cumulative(seqB);}
    sample();
    $('show-bias').onchange=()=>update();
    $('new-draw').onclick=()=>{stop();seed++;sample();setPosition(0);};
    // Une mesure à la fois au début ; ensuite l’étudiant peut accélérer avec le curseur.
    const milestones=[0,1,2,3,4,5,6,7,8,9,10,15,20,30,50,75,100,150,200,300,400,600,800,1000];
    $('next').onclick=()=>{stop();setPosition(milestones.find(n=>n>position)??1000);};
    $('play').onclick=()=>{if(timer){stop();return;}if(position>=maximum)position=0;$('play').textContent='Ⅱ Pause';timer=setInterval(()=>setPosition(milestones.find(n=>n>position)??1000),900);};
    draw=()=>{
      const bias=$('show-bias').checked,n=position;
      $('bias-legend').hidden=!bias;
      const build=$('mean-build');build.className='data-values';
      build.textContent=n===0?'Aucune mesure pour le moment. Lancez la lecture pour construire la première moyenne.':n<=5?`Moyenne après ${n} mesure${n>1?'s':''} : (${seqA.slice(0,n).join(' + ')}) ÷ ${n} = ${fmt(avgA[n-1],2)} mg/L`:`Somme des ${n} mesures ÷ ${n} = ${fmt(avgA[n-1],2)} mg/L. Dernière mesure : ${seqA[n-1]} mg/L.`;
      const {svg,width:w}=svgFor($('mean-chart'),300,'Moyennes cumulées et moyenne cible de 3,8 mg/L');
      // Zoom initial sur 20 observations ; changement d’échelle annoncé explicitement.
      const maxX=n<=20?20:n<=100?100:1000,{x,y}=axis(svg,w,300,maxX,10);
      text(svg,48,17,'Moyenne cumulée (mg/L)');
      [0,maxX/2,maxX].forEach(v=>text(svg,x(v),279,String(v),{'text-anchor':'middle'}));
      text(svg,w/2+10,298,'Nombre de mesures',{'text-anchor':'middle'});
      line(svg,x(0),y(3.8),x(maxX),y(3.8),{stroke:'#526670','stroke-width':2,'stroke-dasharray':'5 5'});
      if(bias)line(svg,x(0),y(8),x(maxX),y(8),{stroke:orange,'stroke-width':1,'stroke-dasharray':'2 5',opacity:.6});
      function curve(arr,color,dash){if(!n)return;const path=arr.slice(0,n).map((v,i)=>`${i?'L':'M'}${x(i+1).toFixed(2)},${y(v).toFixed(2)}`).join(' ');add(svg,'path',{d:path,stroke:color,'stroke-width':2.5,fill:'none',...(dash?{'stroke-dasharray':'6 4'}:{})});add(svg,'circle',{cx:x(n),cy:y(arr[n-1]),r:5,fill:color});}
      curve(avgA,blue,false);if(bias)curve(avgB,orange,true);
      $('mean-count').textContent=n?`Tous les sites : ${fmt(avgA[n-1],2)} mg/L${bias?` · Près de la route : ${fmt(avgB[n-1],2)} mg/L`:''}`:'Cible : 3,8 mg/L';
      $('progress-label').textContent=`${n} mesures · axe horizontal de 0 à ${maxX}`;
      $('message').textContent=n===0?'Ici, un site peut être tiré plusieurs fois : les tirages sont indépendants et suivent toujours la même règle. Les valeurs sont fictives.':n<=5?'Au début, chaque nouvelle mesure pèse beaucoup. Observez le calcul au-dessus du graphique : une mesure et une moyenne sont deux choses différentes.':n<=20?'La moyenne fluctue. Elle ne se rapproche pas forcément de la cible à chaque nouvelle mesure. Le graphique montre ici les 20 premières mesures.':bias?'Les deux moyennes se stabilisent autour de cibles différentes : 3,8 mg/L pour tous les sites, 8 mg/L pour les sites proches. Plus de mesures ne corrige pas la sélection.':`L’axe horizontal va maintenant jusqu’à ${maxX} mesures. À mesure que n grandit, chaque mesure pèse moins dans la moyenne. « Autre tirage » montre que le chemin peut varier.`;
    };
  }
  function sendHeight(){if(window.parent!==window)window.parent.postMessage({type:'session2-height',animation:kind,height:Math.ceil(document.documentElement.getBoundingClientRect().height)},'*');}
  window.addEventListener('message',event=>{if(event.source===window.parent&&event.data?.type==='session2-measure')sendHeight();});
  let previousWidth=0;
  new ResizeObserver(entries=>{const w=entries[0].contentRect.width;if(Math.abs(w-previousWidth)>1){previousWidth=w;update();}else sendHeight();}).observe($('animation'));
  update();
})();
