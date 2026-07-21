import re

with open('src/components/RiskList.tsx', 'r', encoding='utf-8') as f:
    code = f.read()

code = code.replace("const columns = allColumns;", "const columns = selectedNode ? [selectedNode] : allColumns;")

with open('src/components/RiskList.tsx', 'w', encoding='utf-8') as f:
    f.write(code)
