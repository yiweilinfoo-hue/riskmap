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
for line in raw_data.strip('\n').split('\n'):
    parts = line.split('\t')
    if len(parts) >= 14:
        domain = parts[1].strip()
        phase = parts[2].strip()
        name = parts[5].strip()
        
        key = (domain, phase, name)
        
        key_found = key
        if key not in updates:
            for k in updates:
                if k[2] == name:
                    key_found = k
                    break

        if key_found in updates:
            u = updates[key_found]
            parts[6] = u['level']
            # we need to escape newlines or leave them if rawData is backticks
            # However, newlines in backticks will break the line-by-line split we do above.
            # wait, if we put literal newlines, it will break our split. 
            # We should replace newlines with a special character or '\\n'.
            parts[8] = u['control_std'].replace('\n', '\\n')
            parts[9] = u['res_pts'].replace('\n', '\\n')
            parts[10] = u['close_std'].replace('\n', '\\n')
            parts[11] = u['contact_person']
            parts[12] = u['contact_id']
            if not parts[11] or parts[11] == '/' or parts[11] == '-': parts[11] = '用工组接口人'
            if not parts[12] or parts[12] == '/' or parts[12] == '-': parts[12] = '-'

    new_lines.append('\t'.join(parts))

new_raw_data = '\n'.join(new_lines)
new_content = content[:match.start(1)] + new_raw_data + content[match.end(1):]

with open('src/data.ts', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Updated data.ts correctly")
