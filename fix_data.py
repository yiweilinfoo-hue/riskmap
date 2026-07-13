import re

with open('src/data.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace any \n literal in the JS parsing code to replace \\n with actual newline.
content = content.replace("const [id, c1, c2, rc, rg, name, level, online, cs, rp, cls, cp, cid, exc] = line.split('\\t');", 
    "const [id, c1, c2, rc, rg, name, level, online, cs, rp, cls, cp, cid, exc] = line.split('\\t').map(s => s ? s.replace(/\\\\n/g, '\\n') : s);")

# We need to change the backslash n in rawData from \n to \\n so JS doesn't resolve it to newline.
match = re.search(r'const rawData = `(.*?)`;\n\nexport const riskData', content, flags=re.DOTALL)
if match:
    raw_data = match.group(1)
    # The current rawData has literal \n (backslash n). Let's change it to \\n (two backslashes n).
    # Wait! In python, replacing r'\n' with r'\\n' will do the trick.
    new_raw = re.sub(r'(?<!\\)\\n', r'\\\\n', raw_data)
    content = content[:match.start(1)] + new_raw + content[match.end(1):]
    with open('src/data.ts', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Fixed data.ts")
else:
    print("Not found")

