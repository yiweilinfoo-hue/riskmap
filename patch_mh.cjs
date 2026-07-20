const fs = require('fs');
let code = fs.readFileSync('src/components/ManagementHighlights.tsx', 'utf-8');

code = code.replace(
  /bg-indigo-600/g,
  "bg-blue-600"
).replace(
  /gap-5/g,
  "gap-4"
).replace(
  /font-medium text-slate-700/g,
  "font-bold text-slate-700"
);

fs.writeFileSync('src/components/ManagementHighlights.tsx', code);
