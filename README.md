# Analyse de données statistiques

## Version étudiante publiée

La branche `main` contient uniquement le cours validé de la **session 2**, avec ses quatre vidéos hébergées sur Mediaserver, leurs sous-titres, les animations, les données pédagogiques, les exemples Python et le PDF construit par Quarto.

Les sessions **1, 3, 4, 5 et 6** affichent « En construction ». La session 1 est assurée en classe. Aucun TP, carnet étudiant, archive de TP ou contenu préparatoire des autres sessions ne doit être ajouté à cette version avant validation.

Les travaux en préparation sont conservés dans des branches locales distinctes. Pour publier une prochaine session, intégrer uniquement ses contenus validés et ses ressources nécessaires, puis adapter la navigation et la liste des pages à construire. Ne pas fusionner une sauvegarde complète des brouillons dans `main`.

## Construire le site

Utiliser **Quarto 1.10.18**, puis l’environnement Conda défini dans `environment.yml` ou les dépendances de `requirements-site.txt`.

```powershell
conda activate analyse-donnees
quarto render
```

Les sorties Python sont conservées dans `_freeze/` et doivent accompagner les modifications validées. `_site/` est généré et ne doit pas être versionné.

Le workflow GitHub Pages publie uniquement les envois sur `main`. Il utilise les résultats déjà calculés, sans réexécuter Python :

```powershell
quarto render --profile ci --use-freezer
```

Avant publication, vérifier le site construit depuis un dossier `_site` neuf : session 2 complète en HTML et PDF, cinq pages en construction, aucun TP ni fichier des sessions en préparation, liens et animations fonctionnels.

## Vidéos de la session 2 : Video.js et sous-titres


La session 2 utilise un lecteur Video.js 8.23.8 autonome, conservé avec sa
licence dans `cours/session-02/assets/video/vendor/`. Cette version dispose
d'une distribution directement utilisable dans une page Quarto, sans outil de
compilation JavaScript. La vidéo reste sur Mediaserver ; aucun MP4 n'est ajouté
au dépôt. Les fichiers du lecteur et les sous-titres sont copiés dans `_site/`
grâce à l'entrée `cours/session-02/assets/video/**` de `_quarto.yml`.

1. Dans `cours/session-02/index.qmd`, la balise `<video>` remplace l'ancien
   `<iframe>`. Sa source est l'adresse de diffusion Mediaserver terminée par
   `?from_player=true`, observée dans le lecteur fourni par Mediaserver.
   Le serveur redirige vers une adresse signée temporaire : ne jamais copier
   cette adresse temporaire dans le dépôt. Cet endpoint doit être revérifié
   pour chaque média et si Mediaserver change son fonctionnement.
2. Les deux balises `<track>` référencent
   `assets/video/sous-titres/S2V1_1.fr.vtt` et `S2V1_1.en.vtt`.
   `srclang="fr"` / `srclang="en"` définissent les langues ; `label` définit
   leur nom dans le menu. Le français est activé par défaut.
3. Le fichier `assets/video/lecteur.js` initialise le lecteur avec
   `fluid: true`, `responsive: true`, `aspectRatio: '16:9'`, sans lecture
   automatique. `playbackRates` définit les vitesses de 0,5× à 2×.
   `controlBar.skipButtons` ajoute les boutons de recul et d'avance de 5 s.
   Les flèches gauche/droite font de même lorsque le focus est dans le lecteur,
   sauf dans les menus et le réglage du volume. Les déplacements restent
   compris entre le début et la fin de la vidéo, sans modifier la pause.
   `lecteur.css` conserve l'image entière avec `object-fit: contain`.
4. Les sous-titres sont affichés par Video.js (`nativeTextTracks: false`) et
   chargés depuis le même site que le cours. La balise vidéo n'utilise pas
   `crossorigin` : la redirection initiale de Mediaserver ne fournit pas les
   en-têtes nécessaires à cette requête, contrairement au stockage final.
   Ne pas remettre cet attribut sans retester la chaîne complète.
5. Pour tester, activer l'environnement Python du cours, puis lancer depuis
   la racine du dépôt : `quarto preview cours/session-02/index.qmd --to html`.
   Utiliser l'adresse HTTP locale indiquée, pas une ouverture `file:///`,
   qui peut bloquer le chargement des fichiers de sous-titres.
6. Lancer la vidéo, choisir Français / English / désactivés dans le menu
   des sous-titres, puis 1,5× dans le menu de vitesse. Vérifier aussi la
   recherche dans la vidéo, les boutons ±5 s, les flèches gauche/droite
   (y compris près du début et de la fin), le plein écran et une fenêtre étroite.

Le français provient du SRT révisé `S2V1_1.srt`, conservé intact hors du dépôt.
L'anglais est une traduction de ce texte, avec les mêmes 258 repères temporels ;
la numérotation d'origine saute 211, sans sous-titre ajouté artificiellement.
La copie anglaise éditable `S2V1_1.en.srt` accompagne les deux VTT. Les fichiers
VTT sont les fichiers effectivement lus par le site. Après une correction du
SRT anglais, régénérer son VTT depuis la racine du dépôt :

```powershell
python scripts/srt_vers_vtt.py cours/session-02/assets/video/sous-titres/S2V1_1.en.srt cours/session-02/assets/video/sous-titres/S2V1_1.en.vtt
```

Le même script permet de convertir le SRT français vers un fichier VTT distinct,
sans changer le SRT source. Ne pas confondre conversion de format et traduction.
Pour ajouter une autre vidéo, donner un identifiant unique à sa balise vidéo,
adapter la source et les deux pistes, puis reprendre les mêmes vérifications.
Les ressources du lecteur doivent aussi être chargées dans la nouvelle page.
Le PDF conserve le lien Mediaserver à la place du lecteur.

Les quatre vidéos de la session 2 utilisent maintenant ce même lecteur :

| Vidéo | Média UNIGE | Préfixe des sous-titres |
| --- | --- | --- |
| 1a | 315613 | `S2V1_1` |
| 1b | 315614 | `S2V1_2` |
| 2 | 315615 | `S2V2` |
| 3 | 315616 | `S2V3` |

Chaque vidéo possède deux pistes `.fr.vtt` / `.en.vtt` et une copie anglaise
éditable `.en.srt`. Les traductions conservent les identifiants et horaires des
repères français non vides : 220 pour 1b, 378 pour 2 et 315 pour 3.
Le repère 82 de `S2V1_2.srt` est vide (80 ms) : il est omis des deux VTT et
du SRT anglais. Les sources françaises restent intactes.

Quelques formulations orales ont été précisées dans les traductions anglaises :
la sample space contient les résultats possibles (1b, repères 28–29) ; la
convergence concerne les proportions, pas une égalité de nombres infinis
(1b, 57–59). La médiane n'est pas présentée comme exclusivement numérique
(2, 168–177), et les conditions de l'approximation normale sont rappelées
sans affirmer que toutes les erreurs s'annulent nécessairement (2, 309–326).
La correction par n − 1 concerne le biais de l'estimation de variance,
pas une mesure directe de l'incertitude (3, 158–181). Un changement d'origine,
et non une simple multiplication des unités, peut changer le coefficient
de variation (3, 229–231). Ces précisions ne modifient pas l'audio français.

Ce lecteur n'ajoute pas de protection d'accès : lors du test, l'adresse de
diffusion de ce média était accessible sans identifiants. Si une restriction
aux étudiant-es est nécessaire, vérifier les droits avec Mediaserver avant de
publier. Aucun mot de passe ni lien signé temporaire ne doit être placé ici.


## Règles du dépôt public

- Ne jamais ajouter de corrigé enseignant, de donnée confidentielle ou de secret.
- Garder les vidéos sources hors du dépôt. Les lecteurs utilisent Mediaserver.
- Ne pas publier les branches locales de préparation sans décision explicite.
