const fs = require('fs');
let code = fs.readFileSync('src/components/RiskList.tsx', 'utf-8');

const targetBlock = `        {/* Informational Subtext */}
        <div className="flex items-center gap-2 text-xs text-slate-500 bg-white border border-slate-200/60 px-3 py-1.5 rounded-lg shadow-3xs">
          <Sparkles size={13} className="text-blue-500 " />
          <span>点击大板块中对应的<strong>小卡片</strong>可展开查看具体的管控标准及化解要点</span>
        </div>`;

if (code.includes(targetBlock)) {
  code = code.replace(targetBlock, '');
  fs.writeFileSync('src/components/RiskList.tsx', code);
  console.log("Replaced successfully");
} else {
  console.log("Could not find block to replace");
}
