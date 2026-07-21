import re

with open('src/components/RiskList.tsx', 'r', encoding='utf-8') as f:
    code = f.read()

# Change columns to always show all columns
old_columns = "const columns = selectedNode ? [selectedNode] : allColumns;"
new_columns = """const columns = allColumns;

  // Scroll to column when selectedNode changes
  useEffect(() => {
    if (selectedNode) {
      // Small timeout to allow DOM to render and state to settle
      setTimeout(() => {
        const el = document.getElementById(`risk-col-${selectedNode}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    }
  }, [selectedNode]);
"""

if old_columns in code:
    code = code.replace(old_columns, new_columns)
else:
    print("WARNING: could not find old_columns")

# Add id to the column div
old_col_div = """            <div
              key={col}
              className={`bg-white/90 border rounded-3xl p-5 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col min-h-[550px] max-h-[780px] overflow-hidden backdrop-blur-xs ${"""

new_col_div = """            <div
              key={col}
              id={`risk-col-${col}`}
              className={`bg-white/90 border rounded-3xl p-5 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col min-h-[550px] max-h-[780px] overflow-hidden backdrop-blur-xs ${"""

if old_col_div in code:
    code = code.replace(old_col_div, new_col_div)
else:
    print("WARNING: could not find old_col_div")

# Let's double check if useEffect is imported, it probably is, but we're inside RiskList so React.useEffect might be safer or just use the existing `useState` import.
# The file probably has `import React, { useState, useMemo } from 'react';`
# Let's replace `useEffect` with `React.useEffect` in the code block just to be safe.
code = code.replace("useEffect(() => {", "React.useEffect(() => {")

with open('src/components/RiskList.tsx', 'w', encoding='utf-8') as f:
    f.write(code)
