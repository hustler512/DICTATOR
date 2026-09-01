from pathlib import Path

p = Path(r'C:\Users\PCc\OneDrive\Área de Trabalho\DICTATOR\DICTATOR.WEB\app.js')
text = p.read_text(encoding='utf-8')
old = "addEventListener('hashchange',()=>{panel('#page-menu',false);panel('#settings-panel',false);});"
new = "addEventListener('popstate',()=>{panel('#page-menu',false);panel('#settings-panel',false);});"
if old not in text:
    raise SystemExit('hash listener not found')
text = text.replace(old, new)
p.write_text(text, encoding='utf-8')
print('updated app.js')
