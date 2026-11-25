# Guide de lecture Python

Les sources `guide-python-fr.md` et `guide-python-en.md` donnent une page PDF par titre de niveau 1 et un signet par sous-rubrique. Elles sont organisées par thème, restent parallèles et couvrent uniquement les syntaxes réellement présentes dans les cours et TP des sessions 1 à 4. Les noms et les exemples sont neutres et compréhensibles sans les données du cours. Les rubriques ne sont pas numérotées et le guide ne contient pas d'index.

## Génération

Depuis la racine du dépôt, dans un environnement Python avec `reportlab` et `pypdf` :

```sh
python scripts/build_python_guide.py
```

Les PDF sont écrits dans `ressources/fichiers/` et utilisent Arial pour tout le contenu, y compris le code. Le script recherche cette police dans le dossier des polices Windows ou dans `msttcorefonts` sous Linux et ne lance aucun exemple pédagogique. Les PDF sont prêts à être versionnés, donc la publication Quarto ne dépend pas de ReportLab.

## Mise à jour

1. Lire les nouveaux blocs Python du cours et du TP étudiant, hors corrigés.
2. Ajouter seulement les fonctions, méthodes et syntaxes effectivement utilisées ; expliquer les arguments employés.
3. Actualiser les deux langues et conserver les rubriques thématiques avec leurs signets.
4. Mettre à jour la date et la portée, puis régénérer les PDF.
5. Vérifier toutes les pages rendues et les liens des deux pages Ressources.

## Corpus de la version 1

- Cours 1 à 4 : pages Python françaises et anglaises ; la session 1 ne contient pas de bloc Python dans le cours.
- TP1 : `Session1_decouverte_Python_FR.ipynb` et son équivalent anglais.
- TP2 : `Session2_TP_Python_FR.ipynb` et son équivalent anglais.
- TP3 : `Session3_TP_Python_FR.ipynb` et son équivalent anglais.
- TP4 : `Session4_TP_Python_FR.ipynb`, version finalisée le 25 novembre 2026 dans la préparation locale de la session 4, et sa traduction anglaise.

Les formulations ont été vérifiées contre les sources pédagogiques. Les sémantiques sensibles (`DataFrame.div`, `ttest_ind`, `chi2_contingency`) ont aussi été confrontées aux documentations officielles pandas et SciPy.
