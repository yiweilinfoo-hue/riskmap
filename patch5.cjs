const fs = require('fs');
let code = fs.readFileSync('src/components/Roadmap.tsx', 'utf-8');

const hookStr = `  const [activeDropdown, setActiveDropdown] = React.useState<string | null>(null);

  React.useEffect(() => {
    const handleClick = () => setActiveDropdown(null);
    if (activeDropdown) {
      setTimeout(() => document.addEventListener('click', handleClick), 10);
    }
    return () => document.removeEventListener('click', handleClick);
  }, [activeDropdown]);`;

code = code.replace("const [activeDropdown, setActiveDropdown] = React.useState<string | null>(null);", hookStr);

fs.writeFileSync('src/components/Roadmap.tsx', code);
