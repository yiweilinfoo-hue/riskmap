import re

with open('src/components/RiskList.tsx', 'r', encoding='utf-8') as f:
    code = f.read()

old_scroll = """  // Scroll to column when selectedNode changes
  React.useEffect(() => {
    if (selectedNode) {
      // Small timeout to allow DOM to render and state to settle
      setTimeout(() => {
        const el = document.getElementById(`risk-col-${selectedNode}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    }
  }, [selectedNode]);"""

new_scroll = """  // Scroll to column when selectedNode changes
  React.useEffect(() => {
    if (selectedNode) {
      // Small timeout to allow DOM to render and state to settle
      setTimeout(() => {
        const el = document.getElementById(`risk-col-${selectedNode}`);
        if (el) {
          const y = el.getBoundingClientRect().top + window.scrollY - 120;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 150);
    }
  }, [selectedNode]);"""

if old_scroll in code:
    code = code.replace(old_scroll, new_scroll)
else:
    print("Warning: old_scroll not found in RiskList.tsx")

# And let's make sure columns are not hidden
code = code.replace("const columns = selectedNode ? [selectedNode] : allColumns;", "const columns = allColumns;")

with open('src/components/RiskList.tsx', 'w', encoding='utf-8') as f:
    f.write(code)
