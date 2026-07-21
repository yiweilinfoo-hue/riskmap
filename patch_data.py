import re

with open('src/data.ts', 'r', encoding='utf-8') as f:
    code = f.read()

code = code.replace("系统风险告警", "存在风险未化解")
code = code.replace("风险情况记录", "存在风险未化解")

with open('src/data.ts', 'w', encoding='utf-8') as f:
    f.write(code)
