const fs = require('fs');
let code = fs.readFileSync('src/components/ManagementHighlights.tsx', 'utf-8');

code = code.replace(
  "    </div>\n      <TrendModal isOpen={isTrendModalOpen} onClose={() => setIsTrendModalOpen(false)} />\n    </div>\n  );\n}",
  "      <TrendModal isOpen={isTrendModalOpen} onClose={() => setIsTrendModalOpen(false)} />\n    </div>\n  );\n}"
);

fs.writeFileSync('src/components/ManagementHighlights.tsx', code);
