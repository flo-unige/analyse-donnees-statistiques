# Syntaxe et lecture du code

## Affectation et appels de fonctions

```python
valeurs = [10, 20, 30]
nombre = len(valeurs)
print(nombre)
```

On crée la liste `valeurs`, puis `len(valeurs)` compte ses éléments et donne ici 3. On calcule à droite du signe `=` et on associe le résultat au nom de gauche, donc `nombre` désigne ensuite 3 et `print(nombre)` l'affiche.

| Repère | Comment le lire |
| --- | --- |
| `nom = expression` | On associe le résultat à `nom`, en remplaçant sa valeur précédente s'il en avait déjà une. |
| `fonction(...)` | On appelle une fonction avec les arguments entre parenthèses, comme la liste dans `len(valeurs)`. |
| `valeurs.append(40)` | On appelle la méthode `append` de la liste, qui ajoute 40 à sa fin. |
| `tableau.shape` | Si `tableau` est un tableau pandas, on accède à ses dimensions sans parenthèses, car `shape` est un attribut. |
| `round(12.345, ndigits=1)` | Le nombre est fourni par sa position et l'argument nommé `ndigits=1` demande une décimale. |
| `# commentaire` | Python ignore le texte qui suit `#` et une ligne commençant par `#|` peut aussi régler la présentation d'un document. |

## Parenthèses, crochets et guillemets

| Syntaxe | Lecture |
| --- | --- |
| `(...)` | Les parenthèses contiennent les arguments d'un appel, regroupent un calcul comme `(10 + 20) / 2` ou forment un tuple comme `(0, 1)`. |
| `[...]` | Les crochets créent une liste ou sélectionnent des éléments, selon ce qui les précède. |
| `{...}` | Les accolades créent un dictionnaire ou délimitent une expression dans un texte précédé de `f`. |
| `"nom"` ou `'nom'` | Les guillemets délimitent du texte, tandis que `nom` sans guillemets désigne une variable dont l'orthographe et les majuscules doivent être respectées. |
| `,` et `.` | La virgule sépare les éléments ou les arguments, tandis que le point marque une décimale dans `12.5` ou donne accès à une méthode ou un attribut. |

## Cellules et affichage dans Jupyter

Une variable doit être définie par une cellule déjà exécutée avant de pouvoir être utilisée. Si on modifie cette cellule, on l'exécute à nouveau pour actualiser sa valeur. `print(...)` affiche du texte et `display(...)` présente notamment les tableaux avec leur mise en forme. Jupyter affiche aussi le résultat de la dernière expression d'une cellule.

# Types d'objets et fonctions courantes

## Types de valeurs

| Objet | Exemple et lecture |
| --- | --- |
| `int` | `12` est un nombre entier. |
| `float` | `12.5` est un nombre décimal, écrit avec un point. |
| `str` | `"bonjour"` est une chaîne de caractères. |
| `bool` | `True` et `False` sont les deux valeurs booléennes, qui correspondent à vrai et faux. |
| `type(12.5)` | La fonction renvoie le type de l'objet fourni, ici `float`. |
| `None` et `np.nan` | `None` indique l'absence de valeur et `np.nan` représente notamment une valeur numérique manquante. |

Un `DataFrame` pandas est un tableau avec des lignes et des colonnes, tandis qu'une `Series` correspond à une colonne ou à une suite de valeurs avec des étiquettes. Un tableau NumPy regroupe des valeurs sur lesquelles on peut effectuer des calculs.

## Listes et dictionnaires

```python
valeurs = [10, 20, 30]
objet = {"nom": "A", "valeur": 10}
```

| Syntaxe | Lecture |
| --- | --- |
| `valeurs[0]` et `valeurs[1]` | Les positions commencent à 0, donc on obtient respectivement 10 et 20. |
| `valeurs[1] = 25` | On remplace le deuxième élément par 25. |
| `valeurs[0:2]` | On sélectionne les positions 0 et 1, car la borne finale 2 est exclue. |
| `objet["nom"]` | On lit la valeur associée à la clé `"nom"`, ici `"A"`. |
| `a, b = 10, 20` | On associe les deux valeurs à deux noms, donc `a` vaut 10 et `b` vaut 20. |

## Opérateurs et fonctions courantes

| Syntaxe | Lecture |
| --- | --- |
| `+`, `-`, `*`, `/` | On additionne, soustrait, multiplie ou divise, tandis que `+` assemble deux textes. |
| `==`, `<`, `<=`, `>`, `>=` | On compare des valeurs pour obtenir `True` ou `False`, avec `==` pour comparer une égalité et `=` pour affecter une valeur. |
| `and`, `or`, `not` | `and` demande deux conditions vraies et `or` au moins une, tandis que `not` inverse une condition. |
| `len(valeurs)`, `min(valeurs)`, `max(valeurs)` | On obtient la longueur, la plus petite valeur ou la plus grande. |
| `sorted(valeurs)` et `round(12.345, 2)` | On crée une liste triée ou on arrondit un nombre à deux décimales. |

## Texte et affichage

```python
nombre = 12.3456
print(f"Valeur : {nombre:.2f}")
```

Le préfixe `f` insère la valeur entre accolades et `:.2f` affiche deux décimales. `:.6f` en affiche six, tandis que `:.3g` et `:.4g` utilisent trois ou quatre chiffres significatifs. `:.0%` et `:.1%` affichent un pourcentage avec zéro ou une décimale.

# Packages et imports

## Imports et noms courts

Un package regroupe des fonctions et des objets que l'on rend disponibles avec `import`. Dans `import pandas as pd`, `as pd` donne le nom court `pd` au package et on écrit ensuite `pd.DataFrame(...)`.

Avec `from scipy import stats`, on importe directement `stats` depuis `scipy` et on peut écrire `stats.shapiro(...)`. Avec `from scipy.stats import norm`, on utilise directement `norm.cdf(...)`.

| Import | Nom utilisé ensuite |
| --- | --- |
| `import pandas as pd` | `pd` donne accès aux tableaux pandas et aux fonctions de lecture de fichiers. |
| `import numpy as np` | `np` donne accès aux calculs NumPy et aux générateurs aléatoires. |
| `import matplotlib.pyplot as plt` | `plt` donne accès aux fonctions de création et de présentation des graphiques. |
| `import seaborn as sns` | `sns` donne accès aux graphiques Seaborn. |
| `from scipy import stats` | `stats` donne accès aux fonctions statistiques de SciPy. |
| `from scipy.stats import norm` | `norm` donne accès aux fonctions associées à la loi normale. |
| `from statsmodels.formula.api import ols` | `ols` construit un modèle à partir d'une formule et d'un tableau. |
| `from statsmodels.stats.anova import anova_lm` | `anova_lm` produit un tableau d'ANOVA à partir d'un modèle ajusté. |
| `from statsmodels.stats.multicomp import pairwise_tukeyhsd` | `pairwise_tukeyhsd` effectue les comparaisons de Tukey. |
| `from IPython.display import display` | `display` affiche notamment un tableau avec sa mise en forme. |
| `from matplotlib.ticker import ScalarFormatter, PercentFormatter` | Ces deux noms règlent l'affichage des graduations numériques ou des pourcentages. |

## Imports et variables

Les noms courts `pd`, `np`, `plt` et `sns` désignent ici les packages importés. Les noms comme `tableau`, `valeurs` ou `resultat` désignent les objets que l'on crée ensuite. Par exemple, dans `tableau = pd.DataFrame(...)`, `pd.DataFrame` construit l'objet et `tableau` devient son nom.

Les imports doivent être exécutés avant les appels qui les utilisent et les majuscules doivent être respectées. Les exemples des rubriques suivantes supposent que ces imports ont été exécutés, puis définissent leurs petites données sur la même page.

# Conditions, boucles et fonctions

## Conditions

```python
nombre = 5
if nombre > 5:
    print("Plus grand")
elif nombre == 5:
    print("Egal")
else:
    print("Plus petit")
```

`if` teste la première condition, puis `elif` teste la suivante si la précédente est fausse. `else` s'exécute si aucune condition n'est vraie, donc cet exemple affiche `Egal`. Les deux-points annoncent un bloc et les lignes décalées vers la droite appartiennent à ce bloc.

## Boucles et listes de résultats

```python
valeurs = [10, 20, 30]
resultats = []
for valeur in valeurs:
    resultats.append(valeur * 2)
print(resultats)
```

`for` prend successivement chaque élément de `valeurs` et le nomme `valeur`. La liste vide `resultats` reçoit chaque résultat avec `append`, donc elle contient ensuite `[20, 40, 60]`. Une simple affectation au même nom à chaque passage ne conserverait que le dernier résultat.

```python
compteur = 0
while compteur < 3:
    print(compteur)
    compteur = compteur + 1
```

`while` répète le bloc tant que la condition est vraie. On augmente ici `compteur` de 1 à chaque passage et la boucle s'arrête lorsqu'il atteint 3.

| Syntaxe | Lecture |
| --- | --- |
| `range(3)` | On parcourt les entiers 0, 1 et 2. |
| `range(debut, fin, pas)` | On part de `debut`, on avance de `pas` et on s'arrête avant `fin`. |
| `for i in range(len(valeurs)):` | On parcourt les positions de la liste et `valeurs[i]` donne l'élément correspondant. |
| Boucles imbriquées | Une boucle placée dans une autre s'exécute entièrement à chaque passage de la boucle extérieure. |
| `resultats.append({"valeur": 10})` | On ajoute un dictionnaire à une liste, ce qui permet de conserver plusieurs informations dans chaque élément. |

## Fonctions personnalisées

```python
def doubler(nombre):
    return nombre * 2

resultat = doubler(5)
print(resultat)
```

`def` définit la fonction et `nombre` est le nom de son paramètre. L'appel `doubler(5)` lui fournit 5 et `return` renvoie 10, que l'on associe à `resultat` avant de l'afficher.

# Tableaux pandas : sélection

## Chargement et structure du tableau

```python
tableau = pd.DataFrame({
    "groupe": ["A", "B", "A"],
    "valeur": [10, None, 30],
    "date": ["01/01/2026", "02/01/2026", "03/01/2026"]})
colonne = "valeur"
valeurs = tableau[colonne].dropna()
```

`pd.DataFrame` crée un tableau dont les clés du dictionnaire nomment les colonnes et les listes fournissent leurs valeurs. `colonne` contient le nom `"valeur"`, donc la dernière ligne sélectionne cette colonne puis retire ses valeurs manquantes.

| Syntaxe | Lecture |
| --- | --- |
| `pd.read_csv("donnees.csv", encoding="utf-8")` | On lit le fichier indiqué avec l'encodage `utf-8`. `encoding="cp1252"` indique un autre encodage. |
| `pd.read_excel("donnees.xlsx", sheet_name="Feuille1")` | On lit la feuille nommée `Feuille1` du fichier Excel. |
| `tableau.head()` ou `tableau.head(10)` | On affiche les cinq premières lignes ou les dix premières. |
| `tableau.columns`, `tableau.index`, `tableau.shape` | On obtient les noms des colonnes, les étiquettes des lignes ou les dimensions. `shape[0]` donne le nombre de lignes et `shape[1]` le nombre de colonnes. |
| `tableau.keys()` ou `tableau.columns.tolist()` | On obtient les noms des colonnes, avec une liste pour `tolist()`. |
| `tableau.columns = ["groupe", "valeur", "date"]` | On remplace tous les noms des colonnes dans leur ordre actuel. |
| `tableau.select_dtypes(include="number")` | On sélectionne les colonnes numériques, tandis que `exclude="number"` les exclut. |

## Sélection, filtres et conversions

Dans les expressions suivantes, `masque` désigne une condition par ligne, comme `tableau["groupe"] == "A"`, et `colonne` contient un nom de colonne.

| Syntaxe | Lecture |
| --- | --- |
| `tableau["valeur"]` et `tableau[["groupe", "valeur"]]` | Une paire de crochets sélectionne une colonne, tandis qu'une liste entre crochets conserve un tableau. |
| `tableau[masque]` et `tableau.loc[masque, colonne]` | On conserve les lignes vraies, puis `.loc` sélectionne aussi la colonne. Ce sont des sélecteurs entre crochets. |
| `tableau.loc[masque, colonne] = 0` | On remplace seulement les cellules sélectionnées, tandis que `tableau[colonne] = 0` remplace toute la colonne. |
| `tableau["groupe"].isin(["A", "B"])` | On repère les valeurs appartenant à la liste. `tableau["valeur"].between(10, 30)` inclut les deux bornes. |
| `(condition1) & (condition2)` | On combine deux conditions par élément en gardant leurs parenthèses. |
| `.isna()`, `.notna()`, `.dropna(subset=["valeur"])` | On repère les valeurs manquantes ou présentes, ou on retire les lignes manquantes dans la colonne indiquée. |
| `tableau.copy()` et `tableau.sort_values("date")` | On crée une copie ou on trie les lignes selon la date. Sur une colonne, `valeurs.sort_values()` trie ses valeurs. |
| `pd.to_datetime(tableau["date"], dayfirst=True)` | On convertit le texte en dates en lisant d'abord le jour. |

`tableau.T` échange lignes et colonnes. `pd.Categorical(tableau["groupe"], categories=["A", "B"], ordered=True)` définit des catégories ordonnées selon la liste fournie.

# Tableaux pandas : résumés

## Statistiques descriptives

```python
tableau = pd.DataFrame({
    "groupe": ["A", "A", "B", "B"],
    "valeur": [10, 20, 20, 40]})
valeurs = tableau["valeur"]
```

`valeurs` est la colonne numérique sur laquelle portent les méthodes suivantes.

| Méthode | Résultat |
| --- | --- |
| `valeurs.mean()`, `valeurs.median()` | On calcule la moyenne ou la médiane. |
| `valeurs.mode().tolist()` | On obtient la liste des valeurs les plus fréquentes. |
| `valeurs.min()`, `valeurs.max()` | On obtient la plus petite ou la plus grande valeur. |
| `valeurs.quantile(0.25)` | On calcule le quantile indiqué par une proportion comprise entre 0 et 1. |
| `valeurs.var(ddof=0)` | On calcule la variance en divisant par `n - ddof`, où `n` est le nombre de valeurs utilisées. |
| `valeurs.var(ddof=1)`, `valeurs.std(ddof=1)` | On calcule la variance ou l'écart-type avec `ddof=1`, qui est la valeur par défaut de ces méthodes pandas. |
| `valeurs.describe()`, `valeurs.round(2)` | On produit un résumé des valeurs ou on arrondit chaque valeur à deux décimales. |

## Effectifs et regroupements

| Méthode | Résultat |
| --- | --- |
| `valeurs.value_counts()` | On compte les occurrences de chaque valeur et on obtient une série d'effectifs. |
| `valeurs.nunique()`, `valeurs.unique()` | On compte les valeurs distinctes ou on les liste. `nunique()` exclut les valeurs manquantes par défaut et `unique()` peut les conserver. |
| `comptages.reindex(ordre, fill_value=0)` | Si `comptages` est une série d'effectifs et `ordre` une liste d'étiquettes, on impose cet ordre et on ajoute 0 pour les étiquettes absentes. |
| `tableau.groupby("groupe")["valeur"].agg( ["count", "mean", "std"])` | On regroupe les lignes par groupe, puis on calcule l'effectif, la moyenne et l'écart-type de la colonne sélectionnée. |

La comparaison `valeurs > 20` produit une série booléenne. Sa méthode `.sum()` compte les valeurs vraies et `.mean()` donne leur proportion, car `True` compte pour 1 et `False` pour 0.

## Totaux et proportions

```python
effectifs = pd.crosstab(tableau["groupe"], tableau["valeur"])
totaux = effectifs.sum(axis=1)
proportions = effectifs.div(totaux, axis=0)
display((100 * proportions).round(1))
```

`pd.crosstab` compte les combinaisons avec les groupes en lignes et les valeurs en colonnes. On calcule ensuite chaque total de ligne, puis on divise les effectifs par ce total et on affiche les pourcentages arrondis.

| Paramètre | Lecture |
| --- | --- |
| `sum(axis=1)` | On additionne les colonnes pour obtenir un total par ligne. |
| `sum(axis=0)` | On additionne les lignes pour obtenir un total par colonne. |
| `div(totaux, axis=0)` | On fait correspondre les étiquettes de `totaux` aux lignes avant de diviser. |

Pour une ligne contenant `[2, 3]`, le total vaut 5 et les proportions deviennent `[0.4, 0.6]`.

# Calculs et tirages aléatoires

## Calculs, bornes et conversions NumPy

Dans ce tableau, `valeurs` désigne une liste ou une colonne numérique et `tableau` un tableau pandas numérique.

| Syntaxe | Lecture |
| --- | --- |
| `np.sqrt(9)` | On calcule la racine carrée du nombre, ici 3. |
| `np.linspace(0, 10, 11)` | On crée 11 valeurs régulièrement espacées entre 0 et 10, bornes incluses. |
| `np.geomspace(1, 100, 21)` | On crée 21 valeurs espacées selon un rapport constant entre 1 et 100. |
| `np.histogram_bin_edges(valeurs, bins=20)` | On calcule les bornes de 20 classes pour un histogramme. |
| `np.isfinite(valeurs)` | On repère les valeurs finies avec un résultat booléen par élément. |
| `tableau.to_numpy().sum()` | On convertit le tableau pandas en tableau NumPy, puis on additionne toutes ses cellules. |
| `condition.all()`, `condition.mean()` | Pour un tableau booléen `condition`, on vérifie que tout est vrai ou on calcule la proportion de valeurs vraies. |

## Générateurs et échantillonnage

```python
rng = np.random.default_rng(123)
valeurs = rng.random(5)
tableau = pd.DataFrame({"valeur": [10, 20, 30, 40]})
echantillon = tableau.sample(n=3, replace=False, random_state=123)
```

`rng` est un générateur initialisé avec la graine 123. Cette graine permet de reproduire la même suite en réinitialisant le générateur, puis en répétant les mêmes appels. Les appels successifs font avancer cette suite.

| Syntaxe | Arguments |
| --- | --- |
| `rng.random(5)` | On demande cinq nombres entre 0 inclus et 1 exclu. |
| `rng.normal(loc=0, scale=1, size=5)` | On demande cinq nombres avec une moyenne `loc=0` et un écart-type `scale=1`. |
| `rng.uniform(low=0, high=1, size=5)` | On demande cinq nombres entre la borne basse `low` et la borne haute `high`, normalement exclue. |
| `tableau.sample(n=3, replace=False, random_state=123)` | On tire trois lignes sans remise avec `replace=False`. `replace=True` autorise les répétitions et `random_state` fixe la graine de ce tirage. |

La comparaison `valeurs < 0.60` compare chaque nombre tiré à 0.60 et produit un tableau de `True` et `False`.

## Fonctions norm.cdf et norm.pdf

```python
moyenne, ecart_type = 0, 1
borne_basse, borne_haute = -1, 1
probabilite = (norm.cdf(borne_haute, moyenne, ecart_type)
              - norm.cdf(borne_basse, moyenne, ecart_type))
```

`norm.cdf(x, moyenne, ecart_type)` reçoit une borne `x`, une moyenne et un écart-type, puis renvoie la probabilité cumulée à cette borne. Le code soustrait les résultats aux deux bornes, tandis que `norm.pdf(0, moyenne, ecart_type)` reçoit les mêmes paramètres et renvoie la valeur de la densité au point 0.

# Graphiques : création et tracés

## Créer une figure

```python
valeurs = [1, 2, 2, 3, 4]
fig, ax = plt.subplots(figsize=(6, 3))
ax.hist(valeurs, bins=3)
ax.set(xlabel="Valeur", ylabel="Effectif")
plt.tight_layout()
plt.show()
```

`fig` désigne la figure entière et `ax` sa zone de tracé, tandis que `figsize=(6, 3)` fixe sa largeur et sa hauteur en pouces. Les appels avec `plt` utilisent la zone courante et ceux avec `ax` la zone désignée. Ici, on trace trois classes, on nomme les axes et on ajuste les marges avant d'afficher la figure. `plt.figure(...)` crée aussi une figure et `fig.tight_layout()` ajuste celle désignée.

## Types de graphiques

Dans ce tableau, `x` et `y` sont des suites de coordonnées et `valeurs` une suite de nombres. Les fonctions Seaborn reçoivent un tableau `tableau` contenant les colonnes nommées dans leurs arguments.

| Appel | Arguments principaux |
| --- | --- |
| `plt.hist(valeurs)` ou `ax.hist(valeurs)` | Les nombres fournis servent à construire l'histogramme. |
| `ax.bar(categories, effectifs)` | `categories` fournit les positions ou noms des barres et `effectifs` leurs hauteurs. |
| `plt.scatter(x, y)` ou `ax.scatter(x, y)` | Les deux suites donnent les coordonnées des points. |
| `plt.plot(x, y, "o-")` ou `ax.plot(...)` | Le troisième argument demande des ronds reliés par un trait, tandis que `"s--"` demande des carrés et des tirets. |
| `plt.hist2d(x, y, bins=20)` | `bins` fixe le nombre de classes sur chaque axe et `plt.colorbar(label="Effectif")` ajoute l'échelle de couleurs. |
| `sns.boxplot(data=tableau, x="groupe", y="valeur")` | `data` fournit le tableau, puis `x` et `y` nomment les colonnes pour les groupes et les valeurs. |
| `sns.violinplot(data=tableau, x="groupe", y="valeur")` | Les mêmes arguments produisent des violons. |
| `sns.stripplot(data=tableau, x="groupe", y="valeur")` | Les mêmes arguments affichent les valeurs par groupe sous forme de points. |
| `sns.scatterplot(data=tableau, x="valeur_x", y="valeur_y")` | Les deux colonnes fournissent les coordonnées du nuage de points. |
| `ax.fill_between(x, y, 0)` | On remplit l'espace entre les valeurs de `y` et 0 aux positions de `x`. |
| `ax.axvline(2)`, `plt.axhline(3)` | On ajoute une ligne verticale à 2 ou horizontale à 3. |
| `stats.probplot(valeurs, dist="norm", plot=plt)` | On fournit les valeurs, on choisit `"norm"` et on dessine le graphique quantile-quantile avec `plt`. |

## Couleurs et paramètres

`bins` reçoit un nombre de classes ou une liste de bornes, tandis que `density` choisit les effectifs avec `False` ou une densité avec `True`. `color` et `edgecolor` règlent le remplissage et le contour, puis `alpha` règle l'opacité entre 0 et 1. Dans `scatter`, `s` fixe l'aire des points et, dans `stripplot`, `size` fixe leur taille. `linewidth` et `linestyle` règlent l'épaisseur et le style des lignes, et `cmap` choisit une palette.

# Graphiques : mise en forme

## Groupes et sous-graphiques

```python
groupes = [[1, 2, 3], [2, 4, 6]]
fig, ax = plt.subplots()
boites = ax.boxplot(groupes, patch_artist=True)
boites["boxes"][0].set_facecolor("blue")
boites["boxes"][0].set_alpha(0.7)
plt.show()
```

La liste `groupes` contient deux listes de valeurs, donc `boxplot` crée deux boîtes. `patch_artist=True` permet de remplir les boîtes et `boites["boxes"][0]` sélectionne la première pour régler sa couleur et son opacité.

| Syntaxe | Lecture |
| --- | --- |
| `fig, axes = plt.subplots(1, 2, sharex=True)` | On crée une ligne de deux zones partageant l'axe horizontal, puis `axes[0]` et `axes[1]` les sélectionnent. |
| `plt.subplot(3, 3, i + 1)` | On sélectionne une case dans une grille de trois lignes et trois colonnes. Pour `i` allant de 0 à 8, `i + 1` donne les positions 1 à 9. |
| `droite = ax.twinx()` | On crée un second axe vertical partageant l'axe horizontal de `ax`. |
| `proportions.plot.bar(stacked=True, rot=0)` | Si `proportions` est un tableau numérique, on empile ses colonnes dans les barres et on garde les étiquettes sans rotation. |

Dans les graphiques Seaborn par groupe, `order=["A", "B"]` fixe l'ordre et `hue="groupe"` distingue les groupes par couleur. Avec `scatterplot`, `style="groupe"` distingue les marqueurs. Avec `stripplot`, `jitter=True` décale les points et `jitter=False` les aligne. Avec `boxplot`, `showfliers=False` masque les points extérieurs sans supprimer les données. Avec `violinplot`, `inner=None` retire le tracé intérieur et `cut=0` limite le tracé aux valeurs observées.

## Titres, graduations et légendes

| Syntaxe | Lecture |
| --- | --- |
| `plt.xlabel("Valeur")`, `plt.ylabel("Effectif")`, `plt.title("Graphique")` | Le texte fourni nomme les axes ou la figure courante. |
| `ax.set_xlabel(...)`, `ax.set_ylabel(...)`, `ax.set_title(...)` | On règle les mêmes textes sur la zone désignée. `ax.set(xlabel="Valeur", ylabel="Effectif")` regroupe plusieurs réglages. |
| `ax.set(yticks=[0, 1, 2], ylim=(0, 3))` | On fixe les graduations verticales et les limites. `plt.ylim(0, 3)` fixe aussi les limites verticales. |
| `plt.xticks(rotation=45)` | On tourne les étiquettes horizontales, comme avec `ax.tick_params(axis="x", labelrotation=45)`. |
| `ax.set_xticks([1, 2], ["A", "B"])` | On place les graduations aux positions 1 et 2 et on leur donne les étiquettes A et B. |
| `ax.set_xscale("log")`, `ax.minorticks_off()` | On passe l'axe horizontal en logarithmique ou on retire les graduations secondaires. |
| `plt.legend(...)` ou `ax.legend(...)` | `label` dans le tracé nomme une série, puis `title`, `loc`, `fontsize` et `bbox_to_anchor` règlent le titre, la position, la taille et le point d'ancrage de la légende. |

`ax.xaxis.set_major_formatter(ScalarFormatter())` affiche les graduations horizontales sous forme numérique. `ax.yaxis.set_major_formatter(PercentFormatter(1))` affiche les graduations verticales en pourcentage, avec 1 correspondant à 100 %.

# Tests : normalité et deux groupes

## Shapiro-Wilk et attributs du résultat

```python
valeurs_a = [1, 2, 3, 4, 5]
valeurs_b = [2, 3, 5, 6, 7]
test_normalite = stats.shapiro(valeurs_a)
print(test_normalite.statistic)
print(test_normalite.pvalue)
```

`stats.shapiro` reçoit la liste de valeurs à utiliser et renvoie un objet résultat. Son attribut `.statistic` contient la statistique du test et `.pvalue` sa p-value. Les deux attributs se lisent sans parenthèses.

| Expression | Lecture |
| --- | --- |
| `test_normalite.pvalue < alpha` | On compare la p-value à un seuil numérique nommé `alpha`, par exemple 0.05, et on obtient `True` ou `False`. |
| `stats.probplot(valeurs_a, dist="norm", plot=plt)` | On fournit la liste, on choisit `"norm"` et on transmet `plt` pour tracer le graphique quantile-quantile. |

Le nom `alpha` désigne ici un seuil, tandis que le paramètre `alpha` des fonctions graphiques règle l'opacité. C'est la fonction appelée qui détermine le sens d'un argument.

## Student et Mann-Whitney

```python
test_student = stats.ttest_ind(valeurs_a, valeurs_b,
                              equal_var=True)
intervalle = test_student.confidence_interval(
    confidence_level=0.95)
```

Les deux premiers arguments fournissent les valeurs des deux groupes. `equal_var=True` utilise une variance commune et `equal_var=False` sélectionne la variante de Welch.

| Attribut ou argument | Lecture |
| --- | --- |
| `test_student.statistic`, `test_student.pvalue` | On lit la statistique et la p-value calculées. |
| `test_student.df` | On lit les degrés de liberté renvoyés par le test. |
| `confidence_level=0.95` | On demande un intervalle au niveau 0.95. |
| `intervalle.low`, `intervalle.high` | On lit les bornes inférieure et supérieure de l'intervalle pour la différence des moyennes du premier groupe moins le second. |

```python
test_rangs = stats.mannwhitneyu(
    valeurs_a, valeurs_b, alternative="two-sided",
    method="asymptotic", use_continuity=True)
```

`alternative="two-sided"` demande un test bilatéral et `method="asymptotic"` choisit la méthode de calcul asymptotique. `use_continuity=True` active la correction de continuité pour cette méthode. Le résultat expose aussi `test_rangs.statistic` et `test_rangs.pvalue`.

# ANOVA et comparaisons multiples

## Modèle ols et tableau ANOVA

```python
tableau = pd.DataFrame({
    "groupe": ["A", "A", "A", "B", "B", "B", "C", "C", "C"],
    "valeur": [1, 2, 3, 2, 4, 6, 3, 5, 7]})
modele = ols("valeur ~ C(groupe)", data=tableau).fit()
resultat_anova = anova_lm(modele, typ=1)
```

`data=tableau` fournit les colonnes utilisées dans la formule. À gauche de `~`, `valeur` désigne la colonne à expliquer et, à droite, `C(groupe)` indique que `groupe` est traité comme une catégorie. `.fit()` ajuste le modèle, puis `anova_lm` reçoit ce modèle ajusté et `typ=1` choisit un tableau d'ANOVA de type I.

## Formules et noms de colonnes

```python
nom_valeur = "valeur mesurée"
nom_groupe = "groupe choisi"
formule = f"Q({nom_valeur!r}) ~ C(Q({nom_groupe!r}))"
```

Cet extrait construit seulement une chaîne de formule pour des colonnes dont les noms contiennent des espaces. `!r` insère chaque nom avec ses guillemets et `Q(...)` permet de conserver ce nom dans la formule. `C(...)` précise que la colonne de groupe est catégorielle. Pour utiliser cette formule dans `ols`, le tableau fourni doit contenir les colonnes `"valeur mesurée"` et `"groupe choisi"`.

## Résidus, Tukey et Kruskal-Wallis

| Expression | Lecture |
| --- | --- |
| `modele.resid` | On récupère les résidus du modèle ajusté. |
| `modele.fittedvalues` | On récupère les valeurs ajustées par le modèle. |
| `stats.shapiro(modele.resid)` | On transmet les résidus à la fonction `shapiro`. |

```python
test_tukey = pairwise_tukeyhsd(
    endog=tableau["valeur"], groups=tableau["groupe"], alpha=0.05)
print(test_tukey.summary())

test_kruskal = stats.kruskal([1, 2, 3], [2, 4, 6], [3, 5, 7])
```

Dans `pairwise_tukeyhsd`, `endog` fournit les valeurs, `groups` fournit une étiquette de groupe pour chaque valeur et `alpha` fixe le seuil utilisé par la fonction. `.summary()` produit le tableau des comparaisons entre groupes.

Dans `stats.kruskal`, chaque liste est un argument correspondant à un groupe. Le résultat fournit `test_kruskal.statistic` et `test_kruskal.pvalue`, qui contiennent la statistique et la p-value calculées.

# Test du chi-deux

## Effectifs et conditions

```python
tableau = pd.DataFrame({
    "groupe": ["A", "A", "B", "B"],
    "categorie": ["A", "B", "A", "B"]})
effectifs = pd.crosstab(tableau["groupe"], tableau["categorie"])
attendus = pd.DataFrame(
    stats.contingency.expected_freq(effectifs),
    index=effectifs.index, columns=effectifs.columns)
```

`pd.crosstab` compte les combinaisons avec `groupe` en lignes et `categorie` en colonnes. `expected_freq` reçoit ce tableau d'effectifs et renvoie les effectifs attendus calculés. `pd.DataFrame` en fait un tableau dont `index` et `columns` reprennent les étiquettes du tableau initial.

```python
conditions = ((attendus.to_numpy() >= 1).all()
              and (attendus.to_numpy() >= 5).mean() >= 0.80)
```

On convertit les cellules en tableau NumPy, puis `.all()` vérifie que toutes les comparaisons à 1 sont vraies. La seconde comparaison repère les cellules au moins égales à 5 et `.mean()` calcule leur proportion. `and` vérifie que les deux conditions sont satisfaites et associe ce résultat booléen à `conditions`.

## Paramètres du test et simulation

```python
rng = np.random.default_rng(123)
simulation = stats.MonteCarloMethod(n_resamples=99999, rng=rng)
if conditions:
    test = stats.chi2_contingency(effectifs, correction=False)
else:
    test = stats.chi2_contingency(
        effectifs, correction=False, method=simulation)
```

Le générateur `rng` est initialisé avec la graine 123 et transmis à l'objet `simulation`. Selon la valeur de `conditions`, on appelle ensuite l'une des deux variantes et on conserve son résultat sous le nom `test`.

| Argument ou attribut | Lecture |
| --- | --- |
| `effectifs` | Le premier argument contient des nombres d'observations, pas des pourcentages. |
| `correction=False` | On désactive la correction de continuité. |
| `n_resamples=99999` | On demande 99 999 répétitions pour la simulation. |
| `rng=rng` | On fournit le générateur aléatoire créé au début. |
| `method=simulation` | On transmet la configuration Monte-Carlo à la fonction du test. |
| `test.statistic`, `test.pvalue` | On lit la statistique et la p-value renvoyées. |

## V de Cramér

```python
nombre = effectifs.to_numpy().sum()
dimension = min(effectifs.shape[0] - 1, effectifs.shape[1] - 1)
v = np.sqrt(test.statistic / (nombre * dimension))
```

`nombre` additionne toutes les cellules. `shape[0]` et `shape[1]` donnent le nombre de lignes et de colonnes, puis `min` choisit la plus petite des deux valeurs diminuées de 1. On multiplie ce résultat par `nombre`, on divise la statistique par ce produit et `np.sqrt` calcule la racine carrée.
