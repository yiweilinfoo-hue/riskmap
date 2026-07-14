import re

with open("src/components/RiskList.tsx", "r") as f:
    content = f.read()

card_def = """
function RiskCard({ item, isExpanded, toggleExpand, triggerToast }: { item: RiskItem, isExpanded: boolean, toggleExpand: (id: number) => void, triggerToast: (msg: string) => void }) {
  const hasException = item.isOnline && !!item.exceptionMsg;
  return (
    <div
      onClick={() => toggleExpand(item.id)}
      className={`bg-white hover:bg-blue-50/30 border border-slate-200 rounded-2xl p-4 shadow-sm transition-all duration-300 flex flex-col gap-3 cursor-pointer select-none relative group/card ${
        isExpanded 
          ? 'border-blue-300 shadow-md ring-4 ring-blue-50/50' 
          : 'hover:border-blue-300 hover:shadow-md'
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 flex-wrap">
          {hasException && (
            <span className="inline-flex items-center gap-0.5 text-xs font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded border border-red-200/80 animate-pulse">
              <AlertTriangle size={10} className="text-red-500 shrink-0" />
              <span>{item.exceptionMsg}</span>
            </span>
          )}
        </div>
        <div className="w-6 h-6 rounded-md bg-[#e6efff]/80 text-blue-600 flex items-center justify-center shadow-3xs select-none">
          <Layers size={12} />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex items-start justify-between gap-2">
          <h4 className="text-sm font-bold text-slate-700 leading-snug group-hover/card:text-slate-900 transition-colors">
            {item.name}
          </h4>
          {item.level && (
            <span className={`px-1.5 py-0.5 rounded text-xs font-semibold flex-shrink-0 border ${
              item.level === '高' ? 'bg-red-50 text-red-600 border-red-100' :
              item.level === '中' ? 'bg-orange-50 text-orange-600 border-orange-100' :
              'bg-slate-50 text-slate-500 border-slate-200'
            }`}>
              {item.level}风险
            </span>
          )}
        </div>
        <span className="text-xs text-slate-400 font-medium select-none mt-[-2px]">
          {item.riskCategory}
        </span>
      </div>
      <div className="flex items-center justify-between border-t border-slate-200/40 pt-2.5 mt-0.5 text-xs font-medium">
        {item.isOnline ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              triggerToast(`正在跳转到 [${item.name}] 的对应明细报表页面...`);
            }}
            className="text-blue-600 hover:text-blue-700 font-bold flex items-center gap-0.5 hover:underline transition-all py-0.5 cursor-pointer bg-blue-50/50 px-2 py-0.5 rounded-md border border-blue-100"
          >
            查看 <ChevronRight size={11} />
          </button>
        ) : (
          <button
            disabled
            className="text-gray-300 font-medium flex items-center gap-0.5 cursor-not-allowed py-0.5 bg-slate-100/80 px-2 py-0.5 rounded-md border border-slate-200/40"
            title="此项为线下管控模式，无在线统计报表"
          >
            查看 <ChevronRight size={11} />
            <span className="text-[9px] text-slate-400 font-normal ml-0.5">线下</span>
          </button>
        )}
        <span className="text-slate-400 group-hover/card:text-slate-600 transition-colors flex items-center gap-0.5 font-semibold">
          {isExpanded ? '收起' : '详情'}
          <ChevronDown size={11} className={`transition-transform duration-200 ${isExpanded ? 'rotate-180 text-blue-600' : ''}`} />
        </span>
      </div>
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="overflow-hidden relative z-20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="pt-3 pb-1 flex flex-col gap-2.5 text-xs border-t border-dashed border-slate-200 mt-2 text-slate-600">
              <div className="leading-relaxed">
                <span className="font-bold text-slate-800">风险管控的标准：</span>
                {item.controlStandard || '暂无'}
              </div>
              <div className="leading-relaxed">
                <span className="font-bold text-slate-800">风险化解要点/方法：</span>
                {item.resolutionPoints || '暂无'}
              </div>
              <div className="leading-relaxed">
                <span className="font-bold text-slate-800">风险闭环标准：</span>
                {item.closedLoopStandard || '暂无'}
              </div>
              <div className="leading-relaxed border-t border-slate-100 pt-1.5 mt-0.5">
                <span className="font-bold text-slate-800">接口人工号：</span>
                {item.contactId !== '-' ? item.contactId : '暂无'}
              </div>
              <div className="leading-relaxed">
                <span className="font-bold text-slate-800">接口人：</span>
                {item.contactPerson || '暂无'}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
"""

content = content.replace("export function RiskList", card_def + "\nexport function RiskList")

card_invocation = """                              <RiskCard key={item.id} item={item} isExpanded={isExpanded} toggleExpand={toggleExpand} triggerToast={triggerToast} />"""

pattern = r"(<div\s+key=\{item\.id\}\s+onClick=\{\(\) => toggleExpand\(item\.id\)\}.*?</div>\s*</AnimatePresence>\s*</div>)"

# This regex might be hard because of nested divs.
