const fs = require('fs');
let code = fs.readFileSync('src/components/RiskList.tsx', 'utf-8');

const regex = /<div className="bg-slate-50 px-4 py-2\.5 border-b border-slate-200 font-bold text-slate-700 text-sm flex items-center gap-2">[\s\S]*?(?=\s*<\/div>\s*<\/div>\s*\}\)\}\s*<\/div>\s*<\/div>\s*<\/motion\.div>)/;

const newContent = `
                      <div className="bg-slate-50 px-4 py-2.5 border-b border-slate-200 font-bold text-slate-700 text-sm flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div>
                        {group}
                      </div>
                      <div className="p-4 bg-slate-50/50">
                        <div className="grid gap-3 grid-cols-1 md:grid-cols-2">
                          {columnData[viewAllModalCol][group].map(item => {
                            const isExpanded = !!expandedIds[item.id];
                            return (
                              <RiskCard key={item.id} item={item} isExpanded={isExpanded} toggleExpand={toggleExpand} triggerToast={triggerToast} />
                            );
                          })}
                        </div>
                      </div>`;

if (regex.test(code)) {
    code = code.replace(regex, newContent);
    fs.writeFileSync('src/components/RiskList.tsx', code);
    console.log("Success");
} else {
    console.log("Pattern not matched");
}
