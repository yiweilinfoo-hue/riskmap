import re
import csv

updates = {}
with open('updates.txt', 'r', encoding='utf-8') as f:
    reader = csv.reader(f, delimiter='\t', quotechar='"')
    for row in reader:
        if len(row) < 9: continue
        domain = row[0].strip()
        phase = row[1].strip()
        name = row[2].strip()
        level = row[3].strip()
        control_std = row[4].strip()
        res_pts = row[5].strip()
        close_std = row[6].strip()
        contact_id = row[7].strip()
        contact_person = row[8].strip()
        
        if name == '风险小项': continue
        
        updates[(domain, phase, name)] = {
            'level': level,
            'control_std': control_std,
            'res_pts': res_pts,
            'close_std': close_std,
            'contact_person': contact_person,
            'contact_id': contact_id
        }

with open('src/data.ts', 'r', encoding='utf-8') as f:
    content = f.read()

match = re.search(r'const rawData = `(.*?)`;\n\nexport const riskData', content, flags=re.DOTALL)
if not match:
    print("Cannot find rawData")
    exit(1)

raw_data = match.group(1)
new_lines = []

# Wait, `raw_data` is currently corrupted because `\n` is actually `\n` which might have been preserved as literal `\n` in python output, but JS sees it as newline.
# Wait, if `raw_data` is split by '\n', those injected `\n` caused it to split into multiple lines.
# We need to restore `src/data.ts` to its original state or re-parse carefully.
# Oh, the python script reads `src/data.ts`. Since the last python script wrote `\n` to `src/data.ts`, those lines now have a backslash and 'n', but `split('\n')` in python splits on REAL newlines!
# So `parts` doesn't get messed up in python?
# Let's see: `\n` in python string is a real newline. `\\n` in python string is backslash 'n'.
# The last python script did `replace('\n', '\\n')`. So it put backslash and 'n'.
# Then `split('\n')` in Python STILL worked on real newlines.
# But when JS executes it, `\\n` inside a backtick evaluates to a real newline!
# Wait, if JS evaluates `\n` to a real newline, then `.split('\n')` in JS splits on it!
# To prevent JS from evaluating `\n` to a real newline, we must write `\\n` in JS, which means `\\\\n` in python!
