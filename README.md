# Analyse de données statistiques

Projet Quarto du cours **Analyse de données statistiques**. Il contient le site public, six emplacements de sessions théoriques, six emplacements de travaux pratiques et les ressources distribuées aux étudiants.

La session 2, **Concepts de base de probabilité et de statistique**, est intégrée dans `cours/session-02/`. Les autres pages sont des emplacements provisoires.

## Préparer l'environnement local

Le projet utilise trois outils séparés :

- **Quarto 1.10.18** pour construire le site ;
- **Conda** pour les calculs Python ;
- **renv** pour les calculs R.

Installez Quarto 1.10.18 indépendamment de Conda. La version requise est
contrôlée par `_quarto.yml` et utilisée également par GitHub Actions.

### Python

Avec Conda :

```powershell
conda env create -f environment.yml
conda activate analyse-donnees
```

Ou dans un environnement Python existant :

```powershell
python -m pip install -r requirements-site.txt
```

### R

Installez R, puis restaurez les bibliothèques du projet depuis la racine du
dépôt :

```powershell
Rscript -e "install.packages('renv', repos='https://cloud.r-project.org')"
Rscript -e "renv::restore()"
```

Le fichier `.Rprofile` active ensuite automatiquement `renv` dans le projet.
Typst est fourni avec Quarto.

## Prévisualiser et rendre

Depuis la racine du dépôt :

```powershell
quarto preview
```

Pour produire toutes les pages HTML et tous les PDF :

```powershell
quarto render
```

Le site local est créé dans `_site/`. Ce dossier est généré et n'est pas versionné.

Les documents Python et R doivent être rendus localement. Leurs résultats
sont enregistrés dans `_freeze/`, qui doit être versionné. GitHub peut ainsi
reconstruire le site sans installer Python, R ou leurs bibliothèques.

## Publication

Le workflow `.github/workflows/publish.yml` construit le site et le publie
automatiquement avec GitHub Pages à chaque envoi sur la branche `main`. Il ne
publie jamais une autre branche.

Le workflow `.github/workflows/preview.yml` construit les Pull Requests et les
branches lancées manuellement sans modifier le site public. Le site construit
est disponible comme artefact téléchargeable dans la page de l'exécution GitHub
Actions pendant sept jours.

Il n’est pas nécessaire de versionner `_site/` ni de créer une branche
`gh-pages`.

## Règles du dépôt public

- Ne jamais ajouter de corrigé, de donnée confidentielle ou de secret.
- Éviter les jeux de données volumineux.
- Employer des chemins relatifs dans les carnets.
- Tester `quarto render` avant toute publication importante.
- Conserver les carnets étudiants hors de la liste `project.render` : ils sont distribués comme ressources, sans être exécutés pendant la construction du site.
