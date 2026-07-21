import re

with open('src/components/RiskList.tsx', 'r', encoding='utf-8') as f:
    code = f.read()

# Add event listener for "scrollToRiskCard"
event_code = """
  React.useEffect(() => {
    const handleScrollEvent = (e: CustomEvent) => {
      const id = e.detail;
      setExpandedIds(prev => ({ ...prev, [id]: true }));
      setTimeout(() => {
        const el = document.getElementById(`risk-card-${id}`);
        if (el) {
          const y = el.getBoundingClientRect().top + window.scrollY - 150;
          window.scrollTo({ top: y, behavior: 'smooth' });
          el.classList.add('ring-4', 'ring-blue-400');
          setTimeout(() => el.classList.remove('ring-4', 'ring-blue-400'), 2000);
        }
      }, 50);
    };
    window.addEventListener('scrollToRiskCard' as any, handleScrollEvent);
    return () => window.removeEventListener('scrollToRiskCard' as any, handleScrollEvent);
  }, []);
"""

# Insert it before the other useEffect
code = code.replace("  // Scroll to column when selectedNode changes", event_code + "\n  // Scroll to column when selectedNode changes")

with open('src/components/RiskList.tsx', 'w', encoding='utf-8') as f:
    f.write(code)
