import re

with open('src/components/Roadmap.tsx', 'r', encoding='utf-8') as f:
    code = f.read()

old_click = """                                      onSelectNode(node.id);
                                      setTimeout(() => {
                                        const el = document.getElementById(`risk-card-${item.id}`);
                                        if (el) {
                                          const y = el.getBoundingClientRect().top + window.scrollY - 150;
                                          window.scrollTo({ top: y, behavior: 'smooth' });
                                          el.classList.add('ring-4', 'ring-red-400');
                                          setTimeout(() => el.classList.remove('ring-4', 'ring-red-400'), 2000);
                                        }
                                      }, 300);"""

new_click = """                                      onSelectNode(node.id);
                                      setTimeout(() => {
                                        window.dispatchEvent(new CustomEvent('scrollToRiskCard', { detail: item.id }));
                                      }, 50);"""

if old_click in code:
    code = code.replace(old_click, new_click)
else:
    print("Warning: old_click not found in Roadmap.tsx")

with open('src/components/Roadmap.tsx', 'w', encoding='utf-8') as f:
    f.write(code)
