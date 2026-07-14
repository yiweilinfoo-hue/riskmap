const fs = require('fs');
let code = fs.readFileSync('src/components/RiskList.tsx', 'utf-8');

code = code.replace("function RiskCard({ item, isExpanded, toggleExpand, triggerToast }: { item: RiskItem, isExpanded: boolean, toggleExpand: (id: number) => void, triggerToast: (msg: string) => void }) {",
"const RiskCard: React.FC<{ item: RiskItem, isExpanded: boolean, toggleExpand: (id: number) => void, triggerToast: (msg: string) => void }> = ({ item, isExpanded, toggleExpand, triggerToast }) => {");

fs.writeFileSync('src/components/RiskList.tsx', code);
