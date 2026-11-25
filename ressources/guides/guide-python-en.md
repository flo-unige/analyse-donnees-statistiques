# Syntax and reading code

## Assignment, calls and attributes

```python
values = [10, 20, 30]
count = len(values)
print(count)
```

The first line creates the list `values`, then `len(values)` counts its elements and assigns 3 to `count`. Finally, `print(count)` displays that result.

| Pattern | How to read it |
| --- | --- |
| `name = expression` | Python evaluates the expression on the right and assigns its result to the name on the left, replacing its previous value if necessary. |
| `function(...)` | Parentheses call a function, so `len(values)` passes the list to `len` and returns its length. |
| `object.method(...)` | The dot accesses an operation attached to an object, and the parentheses call it. Here, `object` stands for an existing list, table or result. |
| `object.attribute` | The dot reads stored information without making a call, so there are no parentheses. For example, a pandas table's `.shape` gives its dimensions. |
| `round(18.567, ndigits=1)` | The number is supplied by position and `ndigits` is supplied by name, with `=` attaching the value 1 to this option. |
| `# comment` | Python ignores the rest of the line, and lines beginning with `#|` can contain page formatting options for Quarto. |

## Parentheses, brackets and quotes

| Syntax | Meaning |
| --- | --- |
| `(...)` | Parentheses contain call arguments, group calculations such as `(10 + 20) / 2`, or hold tuples such as `(0, 1)`. |
| `[...]` | Brackets create a list or select elements from an object, depending on what precedes them. |
| `{...}` | Braces create a dictionary, or insert a result inside text prefixed with `f`. |
| `"name"` or `'name'` | Quotation marks identify text, whereas `name` without them refers to a variable whose spelling and capitalisation must match. |
| `,` and `.` | A comma separates elements or arguments, while a dot marks decimals such as `18.5` or accesses methods and attributes. |

## Cells and display in Jupyter

Cells use variables that have already been created, so you must run an edited cell again for its changes to take effect. `print(...)` displays values and `display(...)` preserves table formatting, while an object alone on the last line is also displayed. The **Packages and imports** section lists the imports needed by the examples, and each later page defines its own example data.

# Object types and common functions

## Value types

| Example | Meaning |
| --- | --- |
| `18`, `18.5`, `"A"`, `True`, `False` | These values have the types `int`, `float`, `str` and `bool`, which `type(...)` identifies. |
| `None`, `np.nan` | `None` marks an absent result, while `np.nan` represents a missing numerical value. |

A pandas `DataFrame` holds a table and a `Series` holds a column, while a NumPy array holds values that can be processed together.

## Lists and dictionaries

```python
values = [10, 20, 30]
item = {"name": "A", "value": 10}
```

| Syntax | Meaning |
| --- | --- |
| `values[0]`, `values[1]`, `values[2]` | These select 10, 20 and 30 because indexing starts at zero. |
| `values[1] = 25` | This replaces the second element with 25. |
| `values[0:2]` | This selects positions 0 and 1, stopping before the end position 2. |
| `item["name"]` | The key `"name"` retrieves its associated value `"A"`. |
| `first, second = 10, 20` | Values are assigned to names in order, so `first` receives 10 and `second` receives 20. |

## Operators and common functions

| Syntax | Meaning |
| --- | --- |
| `+`, `-`, `*`, `/` | These add, subtract, multiply and divide numbers, while `"A" + "B"` joins text into `"AB"`. |
| `==`, `<`, `<=`, `>`, `>=` | Comparisons return `True` or `False`, with `==` checking equality and `=` assigning a value. |
| `len(values)`, `min(values)`, `max(values)` | These return the element count, minimum and maximum, and `sorted(values)` returns a sorted list. |
| `round(18.567, ndigits=1)` | `ndigits=1` sets rounding to one decimal place. |

## Text and display

```python
number = 18.567
print(f"Value: {number:.2f}")
```

The `f` prefix inserts the value inside braces, and the format after `:` controls its appearance. `:.2f` and `:.6f` show two and six decimal places, while `:.3g` and `:.4g` show three and four significant digits. `:.0%` and `:.1%` display a proportion as a percentage with zero or one decimal place, without changing the stored number.

# Packages and imports

## Imports and aliases

An import makes a package or function available in the current session. In `import pandas as pd`, `as` assigns the short name `pd`, so pandas functions can then be called with names such as `pd.DataFrame(...)`.

| Import | What it makes available |
| --- | --- |
| `import pandas as pd` | `pd` gives access to tables and data operations. |
| `import numpy as np` | `np` gives access to numerical calculations and random draws. |
| `import matplotlib.pyplot as plt` | `plt` gives access to figure creation and plotting functions. |
| `import seaborn as sns` | `sns` gives access to plots built from data columns. |
| `from scipy import stats` | `stats` gives access to statistical functions such as `stats.shapiro(...)`. |
| `from scipy.stats import norm` | `norm` can be used directly for calls such as `norm.cdf(...)`. |
| `from statsmodels.formula.api import ols` | `ols` receives a model formula and a data table. |
| `from statsmodels.stats.anova import anova_lm` | `anova_lm` returns an ANOVA table from a fitted model. |
| `from statsmodels.stats.multicomp import pairwise_tukeyhsd` | `pairwise_tukeyhsd` provides the Tukey comparison function. |
| `from matplotlib.ticker import ScalarFormatter, PercentFormatter` | These names provide the tick formatters used in the plotting examples. |
| `from IPython.display import display` | `display` shows objects and preserves table formatting. |

## Direct imports

`from scipy.stats import norm` selects `norm` from `scipy.stats`, so the call uses `norm.cdf(...)` directly. By contrast, `from scipy import stats` selects `stats`, so its functions are accessed through that name.

The names `pd`, `np`, `plt` and `sns` are aliases chosen in the import statements. Names such as `data`, `values` and `result` are variables created in the examples, and their contents depend on the assignments made to them.

## Execution order

Run the required imports before the examples that use them. The examples on other pages assume these imports are available, but their data and working variables are created on the page itself. You only need to import a package once in a running notebook session.

# Conditions, loops and functions

## Conditions

```python
number = 20
if number > 20:
    print("Above 20")
elif number == 20:
    print("Equal to 20")
else:
    print("Below 20")
```

Python checks the conditions in order and executes the first matching block, or the `else` block if none matches. A colon introduces each block and indentation identifies its lines. `and` requires both conditions to be true, `or` requires at least one, and `not` reverses a Boolean value.

## Loops and stored results

```python
values = [10, 20, 30]
results = []
for value in values:
    result = value * 2
    results.append({"value": value, "result": result})
```

`for` assigns each element to `value` and runs the indented lines. Each new assignment replaces `result`, while `.append(...)` adds a dictionary to `results`, so the list keeps all iterations. A loop indented inside another runs again on each outer iteration.

| Syntax | Meaning |
| --- | --- |
| `range(3)` | This produces 0, 1 and 2, excluding the end value. |
| `range(0, 6, 2)` | The arguments set start, end and step, producing 0, 2 and 4. |
| `for i in range(len(values)):` | This visits the list's indices, so `values[i]` retrieves the corresponding element inside the block. |

```python
count = 0
while count < 3:
    print(count)
    count = count + 1
```

`while` repeats the block while its condition is true, and the increment eventually brings `count` to 3, stopping this loop.

## Custom functions

```python
def double(number):
    return number * 2

result = double(10)
print(result)
```

`def` defines the function without running its body. Calling `double(10)` assigns 10 to its parameter `number`, then `return` sends 20 back to the caller and the assignment stores it in `result`.

# Pandas tables: selection

## Data input and table structure

```python
data = pd.DataFrame({
    "group": ["A", "B", "A"],
    "value": [10, None, 30],
    "date": ["01/02/2025", "02/02/2025", "03/02/2025"]
})
column = "value"
mask = data[column].notna()
```

`data` is the example table, `column` stores a column name and `mask` marks rows with a present value. The file-reading examples below require files at the stated paths.

| Syntax | Meaning |
| --- | --- |
| `pd.read_csv("data.csv", encoding="utf-8")` | The path is relative to the working directory, and `encoding` selects character decoding, for example `"utf-8"` or `"cp1252"`. |
| `pd.read_excel("data.xlsx", sheet_name="Sheet1")` | The first argument supplies the workbook path and `sheet_name` selects its sheet. |
| `pd.DataFrame({...})` | The dictionary supplies column names and lists of values, or the argument can be a list of row dictionaries. |
| `data.head()`, `data.head(10)` | These request the first five or ten rows. |
| `data.columns`, `data.index`, `data.shape` | These give column names, row labels and dimensions, with `.shape[0]` counting rows and `.shape[1]` columns. |
| `data.keys()`, `data.columns.tolist()` | These return column names, with `.tolist()` converting them to a list. `data.columns = [...]` replaces names in order. |
| `data.select_dtypes(include="number")` | `include` selects numerical columns, while `exclude="number"` selects the others. |

## Selection, filters and conversions

| Syntax | Meaning |
| --- | --- |
| `data[column]`, `data["value"]` | The first uses the stored name and the second uses a literal name, both selecting one Series. |
| `data[["group", "value"]]` | The inner list selects several columns in a table. |
| `data[mask]`, `data.loc[mask, column]` | The mask selects rows, and the selector after the comma in `.loc` selects a column. |
| `data.loc[mask, column] = 20` | This replaces selected cells, while `data["value"] = ...` assigns a whole column. |
| `data["group"].isin(["A", "B"])` | `.isin(...)` checks membership, while `data[column].between(10, 30)` checks an interval including both bounds by default. |
| `(data[column] > 10) & mask` | `&` combines conditions row by row, with parentheses around comparisons. |
| `.isna()`, `.notna()`, `.dropna()` | On a Series or table, these mark missing values, mark present values or remove incomplete entries. `subset=["value"]` limits columns checked by `data.dropna(...)`. |
| `.copy()`, `.sort_values("date")` | On `data`, these return an independent copy or sort rows by date, while a Series uses `.sort_values()` alone. |
| `pd.to_datetime(data["date"], dayfirst=True)` | This converts the column to dates, preferring day before month. |

`data.T` swaps rows and columns. In `pd.Categorical(data["group"], categories=["A", "B"], ordered=True)`, `categories` sets the allowed labels and their order, and `ordered=True` enables ordered comparisons.

# Pandas tables: summaries

```python
data = pd.DataFrame({
    "group": ["A", "A", "B", "B"],
    "value": [10, 20, 20, 30],
    "name": ["X", "Y", "X", "X"]
})
values = data["value"]
```

Here, `values` is the numerical Series used in the summary calls.

## Descriptive statistics

| Syntax | Meaning |
| --- | --- |
| `values.mean()`, `.median()` | These return the mean and median of the Series. |
| `values.mode().tolist()` | `.mode()` returns the most frequent values and `.tolist()` puts them in a list. |
| `values.min()`, `.max()` | These return the minimum and maximum. |
| `values.quantile(0.25)` | The argument chooses the quantile, with `0.25` for the first quartile and `0.75` for the third. |
| `values.var(ddof=0)` | `ddof=0` uses the available value count as the variance divisor. |
| `values.var(ddof=1)`, `.std(ddof=1)` | These return variance and standard deviation, with `ddof=1` subtracting 1 from that divisor. |
| `values.describe()`, `.round(2)` | `.describe()` returns a summary and `.round(2)` rounds values to two decimals. On text columns, `.describe()` returns category information. |

## Counts and groups

| Syntax | Meaning |
| --- | --- |
| `values.value_counts()` | This counts each distinct value, excluding missing entries by default. |
| `values.nunique()`, `.unique()` | These count or retrieve distinct values, with `.nunique()` ignoring missing values by default and `.unique()` retaining them. |
| `data["group"].value_counts().reindex(["B", "A"], fill_value=0)` | The list sets index order, and `fill_value=0` fills labels newly added by `.reindex(...)`. |
| `data.groupby("group")["value"].agg(["count", "mean", "std"])` | This groups rows, selects a column and runs the calculations named in the list. `.describe()` can return a fuller group summary. |

On Boolean values, `.sum()` counts `True` entries and `.mean()` returns their proportion.

## Totals and proportions

```python
table = pd.crosstab(data["group"], data["name"])
totals = table.sum(axis=1)
proportions = table.div(totals, axis=0)
display((100 * proportions).round(1))
```

`pd.crosstab` uses its first argument for row categories and its second for column categories, then counts each combination.

| Syntax | Meaning |
| --- | --- |
| `table.sum(axis=1)` | `axis=1` adds across columns, returning one total per row. |
| `table.sum(axis=0)` | `axis=0` adds down rows, returning one total per column. |
| `table.div(totals, axis=0)` | `axis=0` matches the labels in `totals` to row labels, then divides each row by its matching total. |

# Calculations and random sampling

## Calculations, boundaries and conversions

```python
data = pd.DataFrame({"value": [10, 20, 30, 40]})
values = data["value"]
rng = np.random.default_rng(123)
```

The calculations below use `values`, while `data` supplies rows for sampling and `rng` supplies random draws.

| Syntax | Meaning |
| --- | --- |
| `np.sqrt(25)` | This returns the square root of its argument. |
| `np.linspace(0, 10, 11)` | The first two arguments set endpoints and the third requests 11 equally spaced values, including the endpoints. |
| `np.geomspace(1, 100, 21)` | This requests 21 values spaced on a logarithmic scale between the two endpoints. |
| `np.histogram_bin_edges(values, bins=20)` | `values` supplies the observations and `bins` sets the number of histogram bins. |
| `np.isfinite(values)` | This marks finite entries `True` and missing or infinite entries `False`. |
| `data.to_numpy()` | This extracts the values without row and column labels, and `.sum()` then adds all cells by default. |
| `(values > 10).all()` | `.all()` returns `True` only when every comparison is true, while `.mean()` gives the proportion of `True` values. |

## Generators and sampling

| Syntax | Meaning |
| --- | --- |
| `np.random.default_rng(123)` | The seed 123 initialises the generator, so the same seed and calls reproduce the same sequence. |
| `rng.random(100)` | This requests 100 uniform draws between 0 inclusive and 1 exclusive. |
| `rng.normal(loc=0, scale=1, size=50)` | `loc` sets the mean, `scale` sets the standard deviation and `size` sets the number of draws. |
| `rng.uniform(low=0, high=1, size=50)` | `low` and `high` set bounds and `size` sets the number of draws. |
| `data.sample(n=3, replace=False, random_state=123)` | `n` requests three rows, `replace=False` prevents selecting a row twice and `random_state` sets the seed. |

`rng.random(100) < 0.60` compares each draw with 0.60. Reusing `rng` continues its sequence, while recreating it with the same seed restarts that sequence.

## Normal distribution functions

```python
mean = 10
standard_deviation = 2
probability = (norm.cdf(12, mean, standard_deviation)
               - norm.cdf(8, mean, standard_deviation))
```

In `norm.cdf(bound, mean, standard_deviation)`, the first argument is the upper bound and the call returns its cumulative probability. In `norm.pdf(values, mean, standard_deviation)`, the first argument gives positions at which to calculate the density used for plotting. Both calls use the supplied mean and standard deviation.

# Plots: creation and plot types

## Create a figure

```python
data = pd.DataFrame({"group": ["A", "A", "B", "B"],
                     "value": [1, 3, 2, 4], "x": [1, 2, 3, 4]})
x = data["x"]
y = data["value"]
fig, ax = plt.subplots(figsize=(6, 3))
ax.hist(y, bins=3)
ax.set(xlabel="Value", ylabel="Count")
plt.tight_layout()
plt.show()
```

`plt.subplots(...)` returns a figure and plotting area, and `figsize` sets width and height in inches. Calls through `plt` use the current area, while calls through `ax` use that specific area. `plt.figure(...)` also creates a figure. `plt.tight_layout()` adjusts spacing and `plt.show()` displays the figures, while `fig.tight_layout()` adjusts a specific figure.

## Plot types

| Syntax | Meaning |
| --- | --- |
| `plt.hist(y)`, `ax.hist(y)` | The argument supplies the values displayed in a histogram. |
| `ax.bar(["A", "B"], [10, 20])` | The first list gives categories and the second gives bar heights. |
| `plt.scatter(x, y)`, `ax.scatter(x, y)` | `x` and `y` give the coordinates of each point. |
| `plt.plot(x, y, "o-")`, `ax.plot(...)` | The format selects circles and a solid line, while `"s--"` selects squares and a dashed line. |
| `plt.hist2d(x, y, bins=3)` | `bins` sets the grid, and `plt.colorbar(label="Count")` adds its labelled colour scale. |
| `sns.boxplot(data=data, x="group", y="value")` | `data` supplies the table and `x` and `y` select grouping and value columns. |
| `sns.violinplot(...)`, `sns.stripplot(...)` | With the same `data`, `x` and `y`, these draw violins or individual points by group. |
| `sns.scatterplot(data=data, x="x", y="value")` | Column names select the point coordinates, whereas `ax.scatter` receives their values directly. |
| `ax.fill_between(x, y)` | These coordinates define the curve whose area is filled down to zero. |
| `ax.axvline(2)`, `plt.axhline(0)` | The argument sets the position of a vertical or horizontal reference line. |
| `stats.probplot(y, dist="norm", plot=plt)` | `y` supplies values, `dist` selects the reference distribution and `plot` requests a QQ plot. |

## Colours and parameters

`bins` accepts a count or a list of boundaries, and `density` selects counts (`False`) or densities (`True`). `color` and `edgecolor` set fill and outline, while `alpha` sets opacity from 0 to 1. `s` controls marker area in `scatter` and `size` controls marker size in `stripplot`. `linewidth` sets thickness, `linestyle="--"` selects dashes and `cmap="Blues"` selects a colour palette.

# Plots: formatting

## Groups and subplots

```python
groups = [[1, 2, 3], [2, 4, 5]]
fig, ax = plt.subplots()
boxes = ax.boxplot(groups, patch_artist=True)
boxes["boxes"][0].set_facecolor("blue")
boxes["boxes"][0].set_alpha(0.7)
table = pd.DataFrame({"A": [0.4, 0.6], "B": [0.6, 0.4]})
```

`groups` supplies one list per box, `patch_artist=True` allows filling, and `boxes["boxes"][0]` selects the first box for colour and opacity changes. `table` supplies the values for the stacked-bar call below.

| Syntax | Meaning |
| --- | --- |
| `plt.subplots(1, 2, sharex=True)` | The first two arguments set rows and columns, while `sharex` shares their x scale. Assign the result to `fig, axes` and use `axes[0]` or `axes[1]`. |
| `plt.subplot(3, 3, 1)` | The first two arguments define the grid and the third selects a cell, starting at 1. |
| `right = ax.twinx()` | This creates a second plotting area with its own y axis and the same x axis. |
| `table.plot.bar(stacked=True, rot=0)` | `stacked` stacks columns within each bar and `rot` sets label rotation. |

For Seaborn group plots, `order=["A", "B"]` sets group order and `hue="group"` assigns colours using the `group` column. In `sns.scatterplot`, `style="group"` assigns marker shapes. In `sns.stripplot`, `jitter=True` shifts points horizontally and `False` disables that shift. In `sns.violinplot`, `inner=None` hides the inner summary and `cut=0` stops at the observed extremes. For boxplots, `showfliers=False` hides outlier markers without removing data.

## Titles, ticks and legends

| Syntax | Meaning |
| --- | --- |
| `plt.xlabel(...)`, `plt.ylabel(...)`, `plt.title(...)` | The supplied text sets the current plot's labels and title. |
| `ax.set_xlabel(...)`, `ax.set_ylabel(...)`, `ax.set_title(...)` | These set the labels and title on `ax`, and `ax.set(...)` combines settings. |
| `ax.set(yticks=[0, 1, 2], ylim=(0, 3))` | `yticks` sets positions and `ylim` sets limits, also set by `plt.ylim((0, 3))`. |
| `plt.xticks(rotation=45)` | This rotates x labels, as does `ax.tick_params(axis="x", labelrotation=45)`. |
| `ax.set_xticks([1, 2], ["A", "B"])` | The lists supply tick positions and labels. |
| `ax.set_xscale("log")`, `ax.minorticks_off()` | These select a logarithmic x scale and hide minor ticks. |
| `plt.legend(...)`, `ax.legend(...)` | Plots supply entries through `label`, while `title`, `loc`, `fontsize` and `bbox_to_anchor` set the legend's title, position, text size and anchor. |

`ax.xaxis.set_major_formatter(ScalarFormatter())` formats numbers, while `ax.yaxis.set_major_formatter(PercentFormatter(1))` formats percentages with 1 displayed as 100%.

# Tests: normality and two groups

## Shapiro-Wilk and result attributes

```python
group_a = [10, 12, 11, 13, 15]
group_b = [14, 16, 15, 18, 17]
alpha = 0.05
result = stats.shapiro(group_a)
print(result.statistic)
print(result.pvalue)
```

`group_a` supplies the values passed to Shapiro-Wilk, and `result` stores its output. `.statistic` and `.pvalue` retrieve calculated information, so they are attributes without parentheses.

| Syntax | Meaning |
| --- | --- |
| `result.pvalue < alpha` | This compares the stored p-value with the threshold in `alpha` and returns `True` or `False`. |
| `stats.probplot(group_a, dist="norm", plot=plt)` | The first argument supplies values, `dist` selects a reference distribution and `plot=plt` requests the plot. |

The variable `alpha` holds a threshold here, while a plotting argument named `alpha` controls opacity.

## Student and Mann-Whitney

```python
t_result = stats.ttest_ind(group_a, group_b, equal_var=True)
interval = t_result.confidence_interval(confidence_level=0.95)
```

The first two arguments supply the groups, and `equal_var=True` selects the equal-variance calculation. The result's `.confidence_interval(...)` method then calculates an interval at the requested confidence level.

| Syntax | Meaning |
| --- | --- |
| `t_result.statistic`, `.pvalue`, `.df` | These retrieve the test statistic, p-value and degrees of freedom. |
| `confidence_level=0.95` | This argument requests a confidence level of 95%. |
| `interval.low`, `interval.high` | These retrieve the lower and upper bounds for the mean of group A minus the mean of group B. |

```python
rank_result = stats.mannwhitneyu(
    group_a, group_b, alternative="two-sided",
    method="asymptotic", use_continuity=True)
```

In this call, `alternative="two-sided"` selects the two-sided calculation, `method="asymptotic"` selects the approximation and `use_continuity=True` enables its continuity correction. The first two arguments still supply the groups, and `rank_result.statistic` and `rank_result.pvalue` retrieve the returned values.

# ANOVA and multiple comparisons

## OLS model and ANOVA table

```python
data = pd.DataFrame({
    "group": ["A", "A", "A", "B", "B", "B", "C", "C", "C"],
    "value": [1, 2, 4, 3, 5, 6, 5, 7, 9]
})
model = ols("value ~ C(group)", data=data).fit()
table = anova_lm(model, typ=1)
```

The formula names the response column before `~` and the grouping column after it. `C(group)` marks that column as categorical, and `data=` supplies the table. `ols(...)` prepares the model, `.fit()` fits it, and `anova_lm` returns its ANOVA table with `typ=1` selecting type I.

## Formulas and column names

```python
response_name = "measured value"
group_name = "group name"
named_data = data.copy()
named_data.columns = [group_name, response_name]
formula = f"Q({response_name!r}) ~ C(Q({group_name!r}))"
```

The variables supply column names and `.columns` assigns them in order. In the formula string, `!r` includes quotation marks, `Q(...)` handles names containing spaces and `C(...)` marks a categorical column. Pass this formula as `ols(formula, data=named_data).fit()` to fit the renamed table.

## Residuals, Tukey and Kruskal-Wallis

| Syntax | Meaning |
| --- | --- |
| `model.resid`, `model.fittedvalues` | These retrieve residuals and fitted values from the model above. |
| `stats.shapiro(model.resid)` | The argument supplies the residual values to Shapiro-Wilk. |

```python
result = pairwise_tukeyhsd(
    endog=data["value"], groups=data["group"], alpha=0.05)
print(result.summary())
```

`endog` supplies the values, `groups` supplies each value's group label and `alpha` sets the comparison threshold. Calling `.summary()` returns the table displayed by `print(...)`.

```python
result = stats.kruskal([1, 2, 4], [3, 5, 6], [5, 7, 9])
```

Each argument supplies one group of values, and the returned `result` provides `.statistic` and `.pvalue`. Groups stored in a list can instead be passed as `groups[0]`, `groups[1]` and so on, where `groups` denotes that list of groups.

# Chi-square test

## Counts and conditions

```python
data = pd.DataFrame({"group": ["A", "A", "A", "B", "B", "B"],
                     "name": ["X", "X", "Y", "X", "Y", "Y"]})
table = pd.crosstab(data["group"], data["name"])
expected = pd.DataFrame(
    stats.contingency.expected_freq(table),
    index=table.index, columns=table.columns)
conditions = ((expected.to_numpy() >= 1).all()
              and (expected.to_numpy() >= 5).mean() >= 0.80)
```

`pd.crosstab` counts combinations of its two input columns, then `expected_freq` receives that count table and returns expected counts. `index` and `columns` attach row and column labels to the returned values.

In `conditions`, `.to_numpy()` extracts the values and `>=` compares every entry with a number. `.all()` checks all comparisons, `.mean()` returns the proportion of `True` values and `and` combines the two Boolean results.

## Test parameters and Monte Carlo

```python
rng = np.random.default_rng(123)
if conditions:
    result = stats.chi2_contingency(table, correction=False)
else:
    simulation = stats.MonteCarloMethod(n_resamples=99999, rng=rng)
    result = stats.chi2_contingency(
        table, correction=False, method=simulation)
```

| Argument or attribute | Meaning |
| --- | --- |
| `table`, `correction=False` | The table supplies observation counts and `False` disables continuity correction. |
| `n_resamples=99999`, `rng=rng` | These set the simulation repetitions and random generator. The resulting configuration is passed through `method=simulation`. |
| `result.statistic`, `result.pvalue` | These retrieve the statistic and p-value after either branch. |

`if` runs the first branch when `conditions` is `True`, while `else` runs the simulation branch otherwise.

## Cramér's V calculation

```python
count = table.to_numpy().sum()
dimension = min(table.shape[0] - 1, table.shape[1] - 1)
value = np.sqrt(result.statistic / (count * dimension))
```

`.sum()` adds every cell, `.shape[0]` and `.shape[1]` give the row and column counts, and `min(...)` keeps the smaller count after subtracting 1. Finally, `np.sqrt(...)` takes the square root of the ratio and assigns it to `value`.
