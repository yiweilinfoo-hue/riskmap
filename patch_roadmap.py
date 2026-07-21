import re

with open('src/components/Roadmap.tsx', 'r', encoding='utf-8') as f:
    code = f.read()

# 1. 风险管理路线图变更为“风险管理概览”
code = code.replace("风险管理路线图", "风险管理概览")

# 2. 两个大块不需要链接
old_svg = """            {/* Dashed Connecting Track Line */}
            <svg className="absolute left-[8.33%] right-[8.33%] top-[100px] h-2 w-[83.33%] pointer-events-none z-0" overflow="visible">
              {/* Background Gray Dashed Line */}
              <line 
                x1="0%" 
                y1="50%" 
                x2="100%" 
                y2="50%" 
                stroke="#cbd5e1" 
                strokeWidth="3" 
                strokeDasharray="6 6"
              />
              {/* Active Animated Indigo Dashed Line */}
              {nodeIndex !== -1 && (
                <motion.line 
                  x1="0%" 
                  y1="50%" 
                  x2={`${(nodeIndex / 5) * 100}%`} 
                  y2="50%" 
                  stroke="#2563EB" 
                  strokeWidth="3" 
                  strokeDasharray="6 6"
                  initial={{ x2: "0%" }}
                  animate={{ x2: `${(nodeIndex / 5) * 100}%` }}
                  transition={{ type: 'spring', stiffness: 100, damping: 15 }}
                />
              )}
            </svg>"""

new_svg = """            {/* Dashed Connecting Track Line */}
            <svg className="absolute left-[8.33%] right-[8.33%] top-[100px] h-2 w-[83.33%] pointer-events-none z-0" overflow="visible">
              {/* Background Gray Dashed Line - Part 1 */}
              <line 
                x1="0%" 
                y1="50%" 
                x2="40%" 
                y2="50%" 
                stroke="#cbd5e1" 
                strokeWidth="3" 
                strokeDasharray="6 6"
              />
              {/* Background Gray Dashed Line - Part 2 */}
              <line 
                x1="60%" 
                y1="50%" 
                x2="100%" 
                y2="50%" 
                stroke="#cbd5e1" 
                strokeWidth="3" 
                strokeDasharray="6 6"
              />
              {/* Active Animated Indigo Dashed Line */}
              {nodeIndex !== -1 && (
                <>
                  <motion.line 
                    x1="0%" 
                    y1="50%" 
                    x2={`${Math.min((nodeIndex / 5) * 100, 40)}%`} 
                    y2="50%" 
                    stroke="#2563EB" 
                    strokeWidth="3" 
                    strokeDasharray="6 6"
                    initial={{ x2: "0%" }}
                    animate={{ x2: `${Math.min((nodeIndex / 5) * 100, 40)}%` }}
                    transition={{ type: 'spring', stiffness: 100, damping: 15 }}
                  />
                  {nodeIndex >= 3 && (
                    <motion.line 
                      x1="60%" 
                      y1="50%" 
                      x2={`${(nodeIndex / 5) * 100}%`} 
                      y2="50%" 
                      stroke="#2563EB" 
                      strokeWidth="3" 
                      strokeDasharray="6 6"
                      initial={{ x2: "60%" }}
                      animate={{ x2: `${(nodeIndex / 5) * 100}%` }}
                      transition={{ type: 'spring', stiffness: 100, damping: 15 }}
                    />
                  )}
                </>
              )}
            </svg>"""

if old_svg in code:
    code = code.replace(old_svg, new_svg)
else:
    print("WARNING: Could not find old_svg in Roadmap.tsx")


# Also need to fix mobile dashed line
old_mobile_line = """          {/* Vertical Dashed Connecting Line */}
          <div className="absolute left-[18px] top-0 bottom-0 w-0.5 border-l-2 border-dashed border-slate-300 opacity-60 z-0"></div>"""

# On mobile there are 6 nodes, so the gap between index 2 and index 3 should be empty.
# We can just replace the single line with two lines absolute positioned.
# Since it's flex gap-4, we can instead put the lines conditionally inside the items, or just use absolute top to bottom.
new_mobile_line = """          {/* Vertical Dashed Connecting Line */}
          <div className="absolute left-[18px] top-[24px] h-[35%] w-0.5 border-l-2 border-dashed border-slate-300 opacity-60 z-0"></div>
          <div className="absolute left-[18px] bottom-[24px] h-[35%] w-0.5 border-l-2 border-dashed border-slate-300 opacity-60 z-0"></div>"""

if old_mobile_line in code:
    code = code.replace(old_mobile_line, new_mobile_line)

with open('src/components/Roadmap.tsx', 'w', encoding='utf-8') as f:
    f.write(code)
