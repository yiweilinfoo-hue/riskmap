import re

with open('src/components/Roadmap.tsx', 'r', encoding='utf-8') as f:
    code = f.read()

old_div = """                                  <div key={item.id} className="px-3 py-2 hover:bg-slate-50 border-b border-slate-50 last:border-0 rounded flex flex-col gap-1 transition-colors">"""

new_div = """                                  <div 
                                    key={item.id} 
                                    className="px-3 py-2 hover:bg-slate-50 border-b border-slate-50 last:border-0 rounded flex flex-col gap-1 transition-colors cursor-pointer"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      onSelectNode(node.id);
                                      setTimeout(() => {
                                        const el = document.getElementById(`risk-card-${item.id}`);
                                        if (el) {
                                          const y = el.getBoundingClientRect().top + window.scrollY - 150;
                                          window.scrollTo({ top: y, behavior: 'smooth' });
                                          el.classList.add('ring-4', 'ring-red-400');
                                          setTimeout(() => el.classList.remove('ring-4', 'ring-red-400'), 2000);
                                        }
                                      }, 300);
                                      setActiveDropdown(null);
                                    }}
                                  >"""

if old_div in code:
    code = code.replace(old_div, new_div)
else:
    print("Warning: old_div not found in Roadmap.tsx")

with open('src/components/Roadmap.tsx', 'w', encoding='utf-8') as f:
    f.write(code)
