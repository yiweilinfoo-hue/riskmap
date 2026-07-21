import re

with open('src/components/RiskList.tsx', 'r', encoding='utf-8') as f:
    code = f.read()

code = code.replace(
    "onClick={() => toggleExpand(item.id)}\n      className={`bg-white",
    "id={`risk-card-${item.id}`}\n      onClick={() => toggleExpand(item.id)}\n      className={`bg-white"
)

with open('src/components/RiskList.tsx', 'w', encoding='utf-8') as f:
    f.write(code)
