const fs = require('fs');
let code = fs.readFileSync('src/components/RiskList.tsx', 'utf-8');

const oldBlock = `          {item.level && (
            <span className={\`px-1.5 py-0.5 rounded text-xs font-semibold flex-shrink-0 border \${
              item.level === '高' ? 'bg-red-50 text-red-600 border-red-100' :
              item.level === '中' ? 'bg-orange-50 text-orange-600 border-orange-100' :
              'bg-slate-50 text-slate-500 border-slate-200'
            }\`}>
              {item.level}风险
            </span>
          )}`;

const newBlock = `          {item.level && (
            <span className="px-1.5 py-0.5 rounded text-xs font-semibold flex-shrink-0 border bg-slate-100 text-slate-600 border-slate-200">
              规则等级：{item.level}
            </span>
          )}`;

if (code.includes(oldBlock)) {
  code = code.replace(oldBlock, newBlock);
  fs.writeFileSync('src/components/RiskList.tsx', code);
  console.log("Replaced successfully");
} else {
  console.log("Could not find block to replace");
}
