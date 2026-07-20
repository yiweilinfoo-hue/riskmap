const fs = require('fs');
let code = fs.readFileSync('src/data.ts', 'utf-8');

// Replace all occurrences of the duplicated headers
code = code.replace(/import \{ RiskItem \} from '\.\/types';\s*const rawData = `/g, '');

// Prepend the correct header once
code = "import { RiskItem } from './types';\n\nconst rawData = `" + code;

fs.writeFileSync('src/data.ts', code);
