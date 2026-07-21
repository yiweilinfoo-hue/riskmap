import re

with open('src/components/Roadmap.tsx', 'r', encoding='utf-8') as f:
    code = f.read()

code = code.replace("存在风险未化解", "{exceptions} 项风险")

with open('src/components/Roadmap.tsx', 'w', encoding='utf-8') as f:
    f.write(code)
