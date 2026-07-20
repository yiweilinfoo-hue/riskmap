const fs = require('fs');
let code = fs.readFileSync('src/components/Roadmap.tsx', 'utf-8');

const tooltipRegex = /\{\/\* Exception Warning Tooltip \*\/\}\s*\{exceptions > 0 && \(\(\) => \{[\s\S]*?\}\)\(\)\}/;

const newTooltip = `                  {/* Exception Warning Tooltip */}
                  {exceptions > 0 && (() => {
                    const exceptionItems = items.filter(d => d.isOnline && !!d.exceptionMsg);
                    const isExpanded = activeDropdown === node.id;
                    
                    return (
                      <div className="absolute -top-11 z-30 flex flex-col items-center">
                        <div 
                          className={\`relative whitespace-nowrap bg-[#fde8e8] text-red-600 border border-red-200 text-xs px-2.5 py-1.5 rounded-md flex items-center shadow-sm font-semibold cursor-pointer hover:bg-red-100 transition-colors \${!isExpanded ? 'animate-bounce' : ''}\`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveDropdown(isExpanded ? null : node.id);
                          }}
                        >
                          <AlertTriangle size={12} className="mr-1.5 text-red-500 shrink-0" />
                          <span>{exceptions} 项异常</span>
                          {isExpanded ? <ChevronUp size={12} className="ml-1" /> : <ChevronDown size={12} className="ml-1" />}
                          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#fde8e8] border-b border-r border-red-200 rotate-45"></div>
                        </div>

                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div 
                              initial={{ opacity: 0, y: 0, scale: 0.95 }}
                              animate={{ opacity: 1, y: 10, scale: 1 }}
                              exit={{ opacity: 0, y: 0, scale: 0.95 }}
                              className="absolute top-full w-max max-w-[280px] min-w-[220px] bg-white border border-red-200 shadow-xl rounded-lg overflow-hidden flex flex-col cursor-default"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <div className="bg-red-50 px-3 py-2 border-b border-red-100 font-bold text-slate-800 flex justify-between items-center">
                                <span className="text-xs">异常事项明细</span>
                              </div>
                              <div className="max-h-[200px] overflow-y-auto scrollbar-thin scrollbar-thumb-red-200 p-1">
                                {exceptionItems.map(item => (
                                  <div key={item.id} className="px-3 py-2 hover:bg-slate-50 border-b border-slate-50 last:border-0 rounded flex flex-col gap-1 transition-colors">
                                    <span className="font-bold text-slate-700 text-xs truncate" title={item.name}>{item.name}</span>
                                    <span className="text-red-500 text-[10px] bg-red-50 px-1.5 py-0.5 rounded w-fit border border-red-100 break-words whitespace-normal leading-tight">{item.exceptionMsg}</span>
                                  </div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
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
