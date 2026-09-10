# Analyse de données statistiques

Projet Quarto du cours **Analyse de données statistiques**. Il contient le site public, six emplacements de sessions théoriques, six emplacements de travaux pratiques et les ressources distribuées aux étudiants.

La session 2, **Concepts de base de probabilité et de statistique**, est intégrée dans `cours/session-02/`. Les autres pages sont des emplacements provisoires.

## Préparer l'environnement local

Avec Conda :

```powershell
conda env create -f environment.yml
conda activate analyse-donnees
```

Ou dans un environnement Python existant :

```powershell
python -m pip install -r requirements-site.txt
```

Quarto doit également être installé pour rendre le site. Typst est fourni avec Quarto.

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

## Publication

Le workflow `.github/workflows/publish.yml` construit le site et le publie automatiquement avec GitHub Pages à chaque envoi sur la branche `main`. Il n’est pas nécessaire de versionner `_site/` ni de créer une branche `gh-pages`.

## Règles du dépôt public

- Ne jamais ajouter de corrigé, de donnée confidentielle ou de secret.
- Éviter les jeux de données volumineux.
- Employer des chemins relatifs dans les carnets.
- Tester `quarto render` avant toute publication importante.
- Conserver les carnets étudiants hors de la liste `project.render` : ils sont distribués comme ressources, sans être exécutés pendant la construction du site.
