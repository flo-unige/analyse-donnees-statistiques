"""Rebuild English animation frames and PDF figures without changing French assets.

Run from the repository with the course Python environment:
    python scripts/generate_session02_english_figures.py
The bias figure reads the existing simulation. The variance simulation uses
the same seed, data and calculations as the French generator, and checks each
rounded result against the French manifest before exporting anything.
"""
from pathlib import Path
import json
import re
import numpy as np
import pandas as pd
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / 'cours/session-02/assets/interactifs'
DEST = ASSETS / 'complements-en'
DEST.mkdir(exist_ok=True)
water = pd.read_csv(ROOT / 'cours/session-02/data/qualite_eau.csv')['nitrates_mg_l'].to_numpy()
population_variance = water.var(ddof=0)
sizes = list(range(2, 102))
rng = np.random.default_rng(20261025)
estimates = {n: (a.var(axis=1, ddof=0).mean(), a.var(axis=1, ddof=1).mean())
             for n in sizes for a in [rng.choice(water, size=(2000, n), replace=True)]}
french = json.loads((ASSETS / 'complements.json').read_text(encoding='utf-8'))['variance']
for n, frame in zip(sizes, french['frames'], strict=True):
    values = re.search(r'avec n : ([\d.]+).*avec n − 1 : ([\d.]+)', frame['description']).groups()
    assert [f'{v:.2f}' for v in estimates[n]] == [v.rstrip('.') for v in values], n

plt.rcParams.update({'font.size': 13, 'axes.spines.top': False,
                     'axes.spines.right': False, 'axes.titleweight': 'bold'})
def draw_variance(ax, n):
    bars = ax.bar(['Divide by n', 'Divide by n − 1'], estimates[n], color=['#a74729', '#245c79'])
    ax.bar_label(bars, fmt='%.2f', padding=3)
    ax.axhline(population_variance, color='black', linestyle='--',
               label=f'Population variance: {population_variance:.2f}')
    ax.set(ylim=(0, population_variance * 1.33), ylabel='Mean variance ((mg/L)²)',
           title=f'2,000 simulated samples\nn = {n} per sample')
    ax.legend(loc='upper center', fontsize=10)

frames = []
for i, n in enumerate(sizes):
    fig, ax = plt.subplots(figsize=(5.6, 4.8), layout='constrained')
    draw_variance(ax, n)
    name = f'variance-{i:02}.png'
    fig.savefig(DEST / name, dpi=140, facecolor='white')
    plt.close(fig)
    frames.append({'image': f'complements-en/{name}', 'label': f'{n} observations per sample',
                   'description': f'The nine concentrations in the file form a fictional population with mean 5 mg/L and variance {population_variance:.2f} (mg/L)². Samples are drawn independently with replacement. For n = {n}, the average variance is {estimates[n][0]:.2f} when dividing by n and {estimates[n][1]:.2f} when dividing by n − 1. The correction works on average, not necessarily for each individual sample.'})
fig, axes = plt.subplots(1, 2, figsize=(11.2, 4.8), layout='constrained')
for ax, n in zip(axes, [sizes[0], sizes[-1]]):
    draw_variance(ax, n)
fig.savefig(DEST / 'variance-statique.png', dpi=170, facecolor='white')
plt.close(fig)
manifest = {'variance': {'title': 'When does the correction matter?', 'control': 'Size of each sample',
                         'frames': frames, 'default': french['default'], 'interval': french['interval']}}
(ASSETS / 'complements-en.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding='utf-8')

model = json.loads((ASSETS / 'biais-echantillon.json').read_text(encoding='utf-8'))
plt.rcParams.update({'font.size': 11})
fig, axes = plt.subplots(2, 2, figsize=(10, 5.5), sharex=True, sharey=True, layout='constrained')
for row, policy in enumerate([model['policies'][0], model['policies'][2]]):
    color = '#ae4b22' if row == 0 else '#176880'
    for col, n in enumerate([10, 500]):
        ax = axes[row, col]
        ix = model['sizes'].index(n)
        means = np.array([t['totals'][ix] / n for t in policy['trials']])
        jitter = (np.arange(100) * 7 % 17 - 8) / 11
        ax.scatter(means, jitter, color=color, s=14, alpha=.7)
        ax.axvline(5, color='#20343e', linewidth=1.6, linestyle='--')
        ax.axvline(policy['poolMean'], color=color, linewidth=1, linestyle=':')
        ax.set(xlim=(0, 10), ylim=(-1, 1.1), yticks=[],
               title=f'{"Sites near roads only" if row == 0 else "All sites accessible"}\n{n} sites per sample')
        if row == 1:
            ax.set_xlabel('Mean nitrate concentration per sample (mg/L)')
fig.suptitle('100 fictional campaigns per scenario, sampled without replacement\nDark dashed line: mean of all 900 sites in the basin = 5 mg/L', fontsize=13)
fig.savefig(DEST / 'biais-echantillon-statique.png', dpi=170, facecolor='white')
plt.close(fig)
print('100 English variance frames and both PDF figures generated and checked.')
