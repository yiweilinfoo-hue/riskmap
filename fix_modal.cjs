const fs = require('fs');
let code = fs.readFileSync('src/components/TrendModal.tsx', 'utf-8');

code = code.replace(
  "formatter={(value) => [\\`\\${value}分\\`, '人员风险健康度']}",
  "formatter={(value) => [`${value}分`, '人员风险健康度']}"
);

fs.writeFileSync('src/components/TrendModal.tsx', code);
