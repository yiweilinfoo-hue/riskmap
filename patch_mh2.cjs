const fs = require('fs');
let code = fs.readFileSync('src/components/ManagementHighlights.tsx', 'utf-8');

code = code.replace(
  "export function ManagementHighlights() {",
  "import { TrendModal } from './TrendModal';\n\nexport function ManagementHighlights() {"
);

code = code.replace(
  "const [isExpanded, setIsExpanded] = useState(true);",
  "const [isExpanded, setIsExpanded] = useState(true);\n  const [isTrendModalOpen, setIsTrendModalOpen] = useState(false);"
);

code = code.replace(
  "查看趋势 <ChevronRight size={12} />",
  "查看趋势 <ChevronRight size={12} />" // We will replace the span to add onClick
);

code = code.replace(
  '<span className="text-blue-500 text-xs ml-2 flex items-center cursor-pointer hover:underline font-normal">',
  '<span className="text-blue-500 text-xs ml-2 flex items-center cursor-pointer hover:underline font-normal" onClick={() => setIsTrendModalOpen(true)}>'
);

code = code.replace(
  "</div>\n  );\n}",
  "</div>\n      <TrendModal isOpen={isTrendModalOpen} onClose={() => setIsTrendModalOpen(false)} />\n    </div>\n  );\n}"
);

fs.writeFileSync('src/components/ManagementHighlights.tsx', code);
