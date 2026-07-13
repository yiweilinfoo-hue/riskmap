import re

# Read updates
updates = {}
with open('updates.txt', 'r', encoding='utf-8') as f:
    for line in f:
        line = line.strip('\n') # don't strip spaces, keep tabs
        if not line: continue
        parts = line.split('\t')
        if len(parts) < 9: continue
        domain = parts[0].strip()
        phase = parts[1].strip()
        name = parts[2].strip()
        level = parts[3].strip()
        control_std = parts[4].strip()
        res_pts = parts[5].strip()
        close_std = parts[6].strip()
        contact_id = parts[7].strip()
        contact_person = parts[8].strip()
        
        # In case the table headers are present, skip
        if name == '风险小项': continue
        
        updates[(domain, phase, name)] = {
            'level': level,
            'control_std': control_std,
            'res_pts': res_pts,
            'close_std': close_std,
            'contact_person': contact_person,
            'contact_id': contact_id
        }

# Read data.ts
with open('src/data.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract the rawData block
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
        
        # also try just name
        key_found = key
        if key not in updates:
            for k in updates:
                if k[2] == name:
                    key_found = k
                    break

        if key_found in updates:
            u = updates[key_found]
            parts[6] = u['level']
            parts[8] = u['control_std']
            parts[9] = u['res_pts']
            parts[10] = u['close_std']
            parts[11] = u['contact_person']
            parts[12] = u['contact_id']
            # handle '无' or '-'
            if not parts[11] or parts[11] == '/' or parts[11] == '-': parts[11] = '用工组接口人'
            if not parts[12] or parts[12] == '/' or parts[12] == '-': parts[12] = '-'

    new_lines.append('\t'.join(parts))

new_raw_data = '\n'.join(new_lines)

new_content = content[:match.start(1)] + new_raw_data + content[match.end(1):]

with open('src/data.ts', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Updated data.ts")
