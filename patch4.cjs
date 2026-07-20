const fs = require('fs');
let code = fs.readFileSync('src/components/Roadmap.tsx', 'utf-8');

code = code.replace(
  "export function Roadmap({ selectedNode, onSelectNode }: { selectedNode: string | null, onSelectNode: (node: string | null) => void }) {",
  "export function Roadmap({ selectedNode, onSelectNode }: { selectedNode: string | null, onSelectNode: (node: string | null) => void }) {\n  const [activeDropdown, setActiveDropdown] = React.useState<string | null>(null);"
);

// We want to replace the tooltip rendering part.
const tooltipRegex = /\{\/\* Exception Warning Tooltip \*\/\}\s*\{exceptions > 0 && \([\s\S]*?<div className="absolute -bottom-1[^>]+><\/div>\s*<\/div>\s*\)\}/;

const newTooltip = `                  {/* Exception Warning Tooltip */}
                  {exceptions > 0 && (
                    <div 
                      className="absolute -top-11 bg-[#fde8e8] text-red-600 border border-red-200 text-xs px-2 py-1 rounded-md flex items-center shadow-sm font-semibold z-20 cursor-pointer hover:bg-red-100 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveDropdown(activeDropdown === node.id ? null : node.id);
                      }}
                    >
                      <AlertTriangle size={11} className="mr-1 text-red-500 shrink-0" />
                      <span className="whitespace-nowrap">{exceptions} 项异常</span>
                      
                      {/* Dropdown list of exceptions */}
                      <AnimatePresence>
                        {activeDropdown === node.id && (
                          <motion.div 
                            initial={{ opacity: 0, y: -5, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -5, scale: 0.95 }}
                            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-max max-w-[280px] bg-white border border-red-100 shadow-xl rounded-lg overflow-hidden flex flex-col z-50 cursor-default"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <div className="bg-red-50 px-3 py-2 border-b border-red-100 font-bold text-slate-800 flex justify-between items-center">
                              <span>异常事项清单</span>
                              <div 
                                className="w-5 h-5 rounded hover:bg-red-100 flex items-center justify-center cursor-pointer text-slate-500 hover:text-slate-700"
                                onClick={() => setActiveDropdown(null)}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                              </div>
                            </div>
                            <div className="max-h-[160px] overflow-y-auto p-1 scrollbar-thin scrollbar-thumb-red-200">
                              {items.filter(d => d.isOnline && !!d.exceptionMsg).map(item => (
                                <div key={item.id} className="px-3 py-2 hover:bg-slate-50 border-b border-slate-50 last:border-0 rounded flex flex-col gap-1 transition-colors">
                                  <span className="font-bold text-slate-700 text-xs truncate" title={item.name}>{item.name}</span>
                                  <span className="text-red-500 text-[10px] bg-red-50 px-1.5 py-0.5 rounded w-fit border border-red-100 break-words whitespace-normal">{item.exceptionMsg}</span>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#fde8e8] border-b border-r border-red-200 rotate-45"></div>
                    </div>
                  )}`;

if (tooltipRegex.test(code)) {
    code = code.replace(tooltipRegex, newTooltip);
    fs.writeFileSync('src/components/Roadmap.tsx', code);
    console.log("Success");
} else {
    console.log("Failed to match tooltip");
}
