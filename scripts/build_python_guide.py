"""Render the course's editable Markdown guides as paginated, searchable PDFs.

Run with a Python environment containing reportlab and pypdf. No code examples
are executed. The two source Markdown files deliberately use one # per page.
"""
from pathlib import Path
import argparse
import html
import json
import re

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, Preformatted,
    PageBreak, KeepInFrame,
)
from pypdf import PdfReader

PAPER_W, PAPER_H = A4
MARGIN = 41
WIDTH = PAPER_W - 2 * MARGIN
HEIGHT = PAPER_H - 126
INK = colors.HexColor('#243348')
ACCENT = colors.HexColor('#8b1e5a')
MUTED = colors.HexColor('#5a6979')
TEAL = colors.HexColor('#175d70')
PALE = colors.HexColor('#f0f5f8')


def fonts():
    directories = [Path('C:/Windows/Fonts'), Path('/usr/share/fonts/truetype/msttcorefonts')]
    root = next((p for p in directories if (p / 'arial.ttf').exists()), None)
    if root is None:
        raise FileNotFoundError('Arial is required to generate the Python guides.')
    for name, file in {'Body': 'arial.ttf', 'Body-Bold': 'arialbd.ttf',
                       'Body-Italic': 'ariali.ttf'}.items():
        pdfmetrics.registerFont(TTFont(name, str(root / file)))
    pdfmetrics.registerFontFamily('Body', normal='Body', bold='Body-Bold', italic='Body-Italic')


def inline(text):
    parts = re.split(r'(`[^`]+`)', text)
    result = []
    for part in parts:
        if part.startswith('`') and part.endswith('`'):
            result.append('<font name="Body" color="#175d70">' + html.escape(part[1:-1]) + '</font>')
        else:
            part = html.escape(part)
            part = re.sub(r'\*\*(.+?)\*\*', r'<b>\1</b>', part)
            part = re.sub(r'\[([^\]]+)\]\(#page-(\d+)\)', r'<link href="#page-\2" color="#8b1e5a">\1</link>', part)
            result.append(part)
    return ''.join(result)


def styles():
    return {
        'body': ParagraphStyle('Body', fontName='Body', fontSize=10.1, leading=13.6,
                               textColor=INK, spaceAfter=8, splitLongWords=True),
        'h2': ParagraphStyle('H2', fontName='Body-Bold', fontSize=12.3, leading=15.2,
                             textColor=ACCENT, spaceBefore=9, spaceAfter=7),
        'cell': ParagraphStyle('Cell', fontName='Body', fontSize=9.7, leading=12.3,
                               textColor=INK, splitLongWords=True),
        'head': ParagraphStyle('Head', fontName='Body-Bold', fontSize=9.5, leading=12.5,
                               textColor=colors.white),
        'code': ParagraphStyle('Code', fontName='Body', fontSize=9.5, leading=12.2,
                               textColor=TEAL, leftIndent=10, rightIndent=10,
                               spaceBefore=4, spaceAfter=5),
    }


def split_row(line):
    cells, current, in_code = [], [], False
    for char in line.strip()[1:-1]:
        if char == '`':
            in_code = not in_code
        if char == '|' and not in_code:
            cells.append(''.join(current).strip())
            current = []
        else:
            current.append(char)
    cells.append(''.join(current).strip())
    return cells


def parse_body(body, sty, page_number):
    lines = body.strip().splitlines()
    result, i, section = [], 0, 0
    while i < len(lines):
        line = lines[i].strip()
        if not line:
            i += 1
            continue
        if line.startswith('## '):
            section += 1
            anchor = f'<a name="page-{page_number}-section-{section}"/>'
            result.append(Paragraph(anchor + inline(line[3:]), sty['h2']))
            i += 1
        elif line.startswith('```'):
            i += 1
            code = []
            while i < len(lines) and not lines[i].strip().startswith('```'):
                code.append(lines[i])
                i += 1
            code = '\n'.join(code)
            for row in code.splitlines():
                if pdfmetrics.stringWidth(row, 'Body', 9.5) > WIDTH - 24:
                    raise ValueError('Code line too long: ' + row)
            block = Preformatted(code, sty['code'])
            box = Table([[block]], colWidths=[WIDTH], hAlign='LEFT')
            box.setStyle(TableStyle([
                ('BACKGROUND', (0, 0), (-1, -1), PALE),
                ('BOX', (0, 0), (-1, -1), .5, colors.HexColor('#d9e3e9')),
                ('LEFTPADDING', (0, 0), (-1, -1), 3),
                ('RIGHTPADDING', (0, 0), (-1, -1), 3),
                ('TOPPADDING', (0, 0), (-1, -1), 6),
                ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
            ]))
            result.extend([box, Spacer(1, 8)])
            i += 1
        elif line.startswith('|'):
            rows = []
            while i < len(lines) and lines[i].strip().startswith('|'):
                values = split_row(lines[i])
                if not all(re.fullmatch(r'[:\- ]+', v) for v in values):
                    rows.append(values)
                i += 1
            ncols = len(rows[0])
            assert all(len(row) == ncols for row in rows), rows
            syntax_fraction = .40 if page_number == 6 else .44
            widths = [WIDTH * syntax_fraction, WIDTH * (1 - syntax_fraction)] if ncols == 2 else [WIDTH / ncols] * ncols
            if ncols == 2 and rows[0][1] == 'Page':
                widths = [WIDTH * .85, WIDTH * .15]
            data = [[Paragraph(inline(v), sty['head' if r == 0 else 'cell']) for v in row]
                    for r, row in enumerate(rows)]
            table = Table(data, colWidths=widths, hAlign='LEFT')
            table.setStyle(TableStyle([
                ('BACKGROUND', (0, 0), (-1, 0), TEAL),
                ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, colors.HexColor('#f4f7f9')]),
                ('VALIGN', (0, 0), (-1, -1), 'TOP'),
                ('LEFTPADDING', (0, 0), (-1, -1), 7),
                ('RIGHTPADDING', (0, 0), (-1, -1), 7),
                ('TOPPADDING', (0, 0), (-1, -1), 3.5),
                ('BOTTOMPADDING', (0, 0), (-1, -1), 3.5),
                ('LINEBELOW', (0, 0), (-1, 0), .3, TEAL),
                ('LINEBELOW', (0, 1), (-1, -1), .25, colors.HexColor('#e1e7ec')),
            ]))
            result.extend([table, Spacer(1, 9)])
        else:
            para = [line]
            i += 1
            while i < len(lines) and lines[i].strip() and not lines[i].startswith(('#', '|', '```')):
                para.append(lines[i].strip())
                i += 1
            result.append(Paragraph(inline(' '.join(para)), sty['body']))
    return result


def render(source, destination, language):
    text = source.read_text(encoding='utf-8')
    chunks = re.split(r'^# (.+)$', text, flags=re.M)
    pages = list(zip(chunks[1::2], chunks[2::2]))
    sty = styles()
    story = []
    metrics = []
    for number, (title, body) in enumerate(pages, 1):
        contents = parse_body(body, sty, number)
        box = KeepInFrame(WIDTH, HEIGHT - 12, contents, mode='shrink', hAlign='LEFT', vAlign='TOP')
        story.append(box)
        if number < len(pages):
            story.append(PageBreak())
        metrics.append((number, title, box))

    def page(canvas, doc):
        p = doc.page
        canvas.saveState()
        canvas.setTitle('Lire le code Python - Sessions 1 à 4' if language == 'fr' else 'Reading Python code - Sessions 1 to 4')
        canvas.setAuthor('Analyse de données statistiques - Université de Genève')
        canvas.setSubject('Guide de lecture Python - Cours et TP 1 à 4')
        canvas.setFillColor(MUTED)
        canvas.setFont('Body', 8.2)
        canvas.drawRightString(PAPER_W - MARGIN, PAPER_H - 30,
                              'Sessions 1 à 4' if language == 'fr' else 'Sessions 1 to 4')
        title = pages[p - 1][0]
        size = 19
        while pdfmetrics.stringWidth(title, 'Body-Bold', size) > WIDTH:
            size -= .5
        canvas.setFillColor(INK)
        canvas.setFont('Body-Bold', size)
        canvas.drawString(MARGIN, PAPER_H - 65, title)
        canvas.setStrokeColor(colors.HexColor('#d8e0e7'))
        canvas.line(MARGIN, 39, PAPER_W - MARGIN, 39)
        canvas.setFont('Body', 8)
        canvas.setFillColor(MUTED)
        canvas.drawRightString(PAPER_W - MARGIN, 25, f'{p} / {len(pages)}')
        canvas.bookmarkPage(f'page-{p}')
        canvas.addOutlineEntry(title, f'page-{p}', level=0)
        for section, heading in enumerate(re.findall(r'^## (.+)$', pages[p - 1][1], re.M), 1):
            canvas.addOutlineEntry(heading.replace('`', ''), f'page-{p}-section-{section}', level=1)
        canvas.restoreState()

    destination.parent.mkdir(parents=True, exist_ok=True)
    doc = SimpleDocTemplate(str(destination), pagesize=A4, leftMargin=MARGIN,
                            rightMargin=MARGIN, topMargin=85, bottomMargin=41,
                            title='Python - Sessions 1-4', pageCompression=1,
                            allowSplitting=0)
    doc.build(story, onFirstPage=page, onLaterPages=page)
    reader = PdfReader(destination)
    assert len(reader.pages) == len(pages)
    assert all(len(p.extract_text()) > 300 for p in reader.pages)
    result = []
    for num, title, box in metrics:
        scale = getattr(box, '_scale', 1)
        result.append({'page': num, 'title': title, 'scale': round(scale, 3)})
    return result


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--root', type=Path, default=Path(__file__).resolve().parents[1])
    args = parser.parse_args()
    fonts()
    for language in ('fr', 'en'):
        src = args.root / 'ressources' / 'guides' / f'guide-python-{language}.md'
        dst = args.root / 'ressources' / 'fichiers' / f'Guide_Python_{language.upper()}.pdf'
        print(json.dumps({'file': str(dst), 'pages': render(src, dst, language)}, ensure_ascii=False))


if __name__ == '__main__':
    main()
