const fs = require('fs');
let code = fs.readFileSync('src/components/Roadmap.tsx', 'utf-8');

code = code.replace(
  "import { Users, Building2, AlertTriangle, CheckCircle, BookOpen } from 'lucide-react';",
  "import { Users, Building2, AlertTriangle, CheckCircle, BookOpen, ChevronDown, ChevronUp } from 'lucide-react';"
);

const tooltipRegex = /\{\/\* Exception Warning Tooltip \*\/\}\s*\{exceptions > 0 && \([\s\S]*?<div className="absolute -bottom-1[^>]+><\/div>\s*<\/div>\s*\)\}/;

const newTooltip = `                  {/* Exception Warning Tooltip */}
                  {exceptions > 0 && (() => {
                    const exceptionItems = items.filter(d => d.isOnline && !!d.exceptionMsg);
                    const isExpanded = activeDropdown === node.id;
                    const showExpandButton = exceptions > 3;
                    const visibleItems = isExpanded ? exceptionItems : exceptionItems.slice(0, 3);

                    return (
                    <div 
                      className="absolute bottom-[calc(100%+12px)] left-1/2 -translate-x-1/2 bg-white border border-red-200 rounded-lg shadow-xl z-30 flex flex-col w-[220px] transition-all duration-300 cursor-default"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="bg-[#fde8e8] text-red-600 px-2.5 py-1.5 rounded-t-lg flex items-center justify-between border-b border-red-100">
                        <div className="flex items-center">
                          <AlertTriangle size={12} className="mr-1 text-red-500 shrink-0" />
                          <span className="whitespace-nowrap font-bold text-xs">{exceptions} 项异常</span>
                        </div>
                      </div>
                      
                      <div className={\`flex flex-col \${isExpanded ? 'max-h-[220px] overflow-y-auto scrollbar-thin scrollbar-thumb-red-200' : ''}\`}>
                        {visibleItems.map((item, idx) => (
                          <div key={item.id} className="px-2.5 py-2 border-b border-slate-50 last:border-0 flex flex-col gap-1 hover:bg-slate-50/80">
                             <span className="font-bold text-slate-700 text-[11px] truncate" title={item.name}>{item.name}</span>
                             <span className="text-red-500 text-[10px] bg-red-50 px-1.5 py-0.5 rounded w-fit break-words whitespace-normal leading-tight border border-red-100">{item.exceptionMsg}</span>
                          </div>
                        ))}
                      </div>

                      {showExpandButton && (
                        <div 
                           className="bg-slate-50 text-slate-500 text-[10px] font-medium py-1.5 text-center cursor-pointer hover:bg-slate-100 hover:text-slate-700 rounded-b-lg border-t border-slate-100 flex items-center justify-center gap-1 transition-colors"
                           onClick={(e) => {
                             e.stopPropagation();
                             setActiveDropdown(isExpanded ? null : node.id);
                           }}
                        >
                           {isExpanded ? (
                             <>收起 <ChevronUp size={12} /></>
                           ) : (
                             <>展开其余 {exceptions - 3} 项 <ChevronDown size={12} /></>
                           )}
                        </div>
                      )}

                      <div className={\`absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 border-b border-r border-red-200 rotate-45 z-[-1] \${showExpandButton ? 'bg-slate-50' : 'bg-white'}\`}></div>
                    </div>
                  );
                  })()}`;

if (tooltipRegex.test(code)) {
    code = code.replace(tooltipRegex, newTooltip);
    fs.writeFileSync('src/components/Roadmap.tsx', code);
    console.log("Success");
} else {
    console.log("Failed to match tooltip");
}
