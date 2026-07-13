import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronRight, 
  ChevronDown, 
  AlertTriangle, 
  BookOpen, 
  CheckCircle, 
  FileText, 
  Settings, 
  ShieldCheck, 
  ExternalLink, 
  Layers, 
  User, 
  Activity, 
  ArrowRight,
  ShieldAlert,
  Sliders,
  Sparkles,
  Building2
} from 'lucide-react';
import { RiskItem } from '../types';

interface RiskListProps {
  items: RiskItem[];
  selectedNode: string | null;
  onSelectNode: (node: string | null) => void;
}

// Icons removed for cleaner UI
const getGroupIcon = (group: string) => {
  return <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>;
};

export function RiskList({ items, selectedNode, onSelectNode }: RiskListProps) {
  // Store expanded card IDs
  const [expandedIds, setExpandedIds] = useState<Record<number, boolean>>({});
  // Domain selection (人的管理 vs 供应商管理)
  const [activeDomain, setActiveDomain] = useState<'人的管理' | '供应商管理'>('人的管理');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Trigger floating alert toast
  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => {
      setToastMsg(null);
    }, 3000);
  };

  // Sync active domain tab when a node is selected from the top roadmap
  useEffect(() => {
    if (selectedNode) {
      if (['招聘入职', '在职', '离职'].includes(selectedNode)) {
        setActiveDomain('人的管理');
      } else if (['引入', '合作', '退出'].includes(selectedNode)) {
        setActiveDomain('供应商管理');
      }
    }
  }, [selectedNode]);

  const toggleExpand = (id: number) => {
    setExpandedIds(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Determine active columns based on domain
  const allColumns = activeDomain === '人的管理' 
    ? ['招聘入职', '在职', '离职'] 
    : ['引入', '合作', '退出'];

  const columns = selectedNode ? [selectedNode] : allColumns;

  // Categorize and filter items for rendering
  const columnData = useMemo(() => {
    const data: Record<string, Record<string, RiskItem[]>> = {};
    
    columns.forEach(col => {
      data[col] = {};
      // Filter items belonging to this column
      const colItems = items.filter(item => item.category2 === col);
      
      // Group them by riskGroup
      colItems.forEach(item => {
        if (!data[col][item.riskGroup]) {
          data[col][item.riskGroup] = [];
        }
        data[col][item.riskGroup].push(item);
      });
    });
    
    return data;
  }, [items, columns]);

  return (
    <div className="flex flex-col gap-6 relative">
      {/* Top Controller Bar - Domain Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4 relative z-10">
        {/* Domain Segment Tabs */}
        <div className="flex bg-slate-100 p-1 rounded-xl w-fit border border-slate-200/55 shadow-inner">
          <button
            onClick={() => {
              setActiveDomain('人的管理');
              onSelectNode(null); // Clear node selection to show all
            }}
            className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-bold transition-all cursor-pointer ${
              activeDomain === '人的管理' 
                ? 'bg-white text-[#3f51b5] shadow-sm' 
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50/50'
            }`}
          >
            <User size={16} />
            人的风险管理
          </button>
          <button
            onClick={() => {
              setActiveDomain('供应商管理');
              onSelectNode(null); // Clear node selection to show all
            }}
            className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-bold transition-all cursor-pointer ${
              activeDomain === '供应商管理' 
                ? 'bg-white text-indigo-600 shadow-sm' 
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50/50'
            }`}
          >
            <Building2 size={16} />
            供应商风险管理
          </button>
        </div>

        {/* Informational Subtext */}
        <div className="flex items-center gap-2 text-xs text-slate-500 bg-white border border-slate-200/60 px-3 py-1.5 rounded-lg shadow-3xs">
          <Sparkles size={13} className="text-blue-500 animate-pulse" />
          <span>点击大板块中对应的<strong>小卡片</strong>可展开查看具体的管控标准及化解要点</span>
        </div>
      </div>

      {/* Lifecycle Dashboard Grid (Matching "丰盾云台" screen) */}
      <div className={`grid grid-cols-1 ${columns.length === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-1 max-w-4xl mx-auto w-full'} gap-6 relative z-10`}>
        {columns.map(col => {
          const colGroups = (columnData[col] || {}) as Record<string, RiskItem[]>;
          const groupKeys = Object.keys(colGroups);
          const isColSelected = selectedNode === col;

          // Compute total items inside this column
          const totalColItemsCount = Object.values(colGroups).reduce((acc, curr) => acc + curr.length, 0);

          return (
            <div
              key={col}
              className={`bg-white/90 border rounded-3xl p-5 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col min-h-[550px] max-h-[780px] overflow-hidden backdrop-blur-xs ${
                isColSelected 
                  ? 'border-[#3f51b5] ring-2 ring-[#3f51b5]/15 shadow-md shadow-[#3f51b5]/5' 
                  : 'border-slate-200/80'
              }`}
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 flex-shrink-0">
                <div className="flex items-center gap-2">
                  <div className={`w-2.5 h-2.5 rounded-full ${
                    col === '在职' || col === '合作' ? 'bg-amber-500' : col === '离职' || col === '退出' ? 'bg-red-500' : 'bg-blue-500'
                  }`} />
                  <h3 className="text-base font-bold text-slate-800">{col}</h3>
                  <span className="text-xs text-slate-400 font-mono bg-slate-100 px-1.5 py-0.5 rounded">
                    {totalColItemsCount} 项
                  </span>
                </div>
                
                {isColSelected && (
                  <span className="text-[10px] font-bold text-[#3f51b5] bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                    当前选择
                  </span>
                )}
              </div>

              {/* Column Body - Grouped list of cards */}
              <div className={`overflow-y-auto flex-1 pr-1.5 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent mt-3.5 pb-4 ${
                columns.length === 1 ? 'columns-1 md:columns-2 lg:columns-2 gap-6' : 'flex flex-col gap-5'
              }`}>
                {groupKeys.length > 0 ? (
                  groupKeys.map(group => {
                    const groupItems = colGroups[group] || [];
                    return (
                      <div key={group} className={`flex flex-col gap-2 ${columns.length === 1 ? 'break-inside-avoid mb-6' : ''}`}>
                        {/* Sub-Group Header */}
                        <div className="text-xs font-bold text-slate-400 flex items-center gap-1.5 uppercase tracking-wider select-none sticky top-0 bg-white/95 py-1 z-10 backdrop-blur-xs mt-1">
                          <div className="flex items-center gap-1.5">
                            {getGroupIcon(group)}
                          </div>
                          <span>{group}</span>
                        </div>

                        {/* Cards under this Sub-Group */}
                        <div className="grid gap-2.5 grid-cols-1">
                          {groupItems.map(item => {
                            const isExpanded = !!expandedIds[item.id];
                            const hasException = item.isOnline && !!item.exceptionMsg;

                            return (
                              <div
                                key={item.id}
                                onClick={() => toggleExpand(item.id)}
                                className={`bg-gradient-to-r from-slate-50/80 to-slate-50/40 hover:from-[#f0f4ff]/70 hover:to-[#f0f4ff]/40 border rounded-2xl p-4 shadow-3xs transition-all duration-300 flex flex-col gap-3 cursor-pointer select-none relative group/card border-slate-100/90 ${
                                  isExpanded 
                                    ? 'from-[#f0f4ff]/90 to-[#f0f4ff]/60 border-blue-200 shadow-sm shadow-blue-50' 
                                    : 'hover:border-blue-200/50 hover:shadow-2xs'
                                }`}
                              >
                                {/* Card Top Row: Badges, warnings and icon */}
                                <div className="flex items-center justify-between gap-2">
                                  <div className="flex items-center gap-1.5 flex-wrap">
                                    {/* Exclamation Badge for Exceptions (Requirement 3) */}
                                    {hasException && (
                                      <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded border border-red-200/80 animate-pulse">
                                        <AlertTriangle size={10} className="text-red-500 shrink-0" />
                                        <span>{item.exceptionMsg}</span>
                                      </span>
                                    )}
                                  </div>

                                  {/* Stylized hexagon logo icon representing the node */}
                                  <div className="w-6 h-6 rounded-md bg-[#e6efff]/80 text-[#3f51b5] flex items-center justify-center shadow-3xs select-none">
                                    <Layers size={12} />
                                  </div>
                                </div>

                                {/* Card Middle Row: Risk Scenario Title */}
                                <div className="flex flex-col gap-1">
                                  <div className="flex items-start justify-between gap-2">
                                    <h4 className="text-[13px] font-bold text-slate-700 leading-snug group-hover/card:text-slate-900 transition-colors">
                                      {item.name}
                                    </h4>
                                    {item.level && (
                                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold flex-shrink-0 border ${
                                        item.level === '高' ? 'bg-red-50 text-red-600 border-red-100' :
                                        item.level === '中' ? 'bg-orange-50 text-orange-600 border-orange-100' :
                                        'bg-slate-50 text-slate-500 border-slate-200'
                                      }`}>
                                        {item.level}风险
                                      </span>
                                    )}
                                  </div>
                                  <span className="text-[10px] text-slate-400 font-medium select-none mt-[-2px]">
                                    {item.riskCategory}
                                  </span>
                                </div>

                                {/* Card Bottom Row: Action and Expand State */}
                                <div className="flex items-center justify-between border-t border-slate-200/40 pt-2.5 mt-0.5 text-[11px] font-medium">
                                  {/* Redirection/Jump Button (Requirement 2) */}
                                  {item.isOnline ? (
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        triggerToast(`正在跳转到 [${item.name}] 的对应明细报表页面...`);
                                      }}
                                      className="text-[#3f51b5] hover:text-[#303f9f] font-bold flex items-center gap-0.5 hover:underline transition-all py-0.5 cursor-pointer bg-blue-50/50 px-2 py-0.5 rounded-md border border-blue-100"
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

                                  {/* Trigger Accordion Expand */}
                                  <span className="text-slate-400 group-hover/card:text-slate-600 transition-colors flex items-center gap-0.5 font-semibold">
                                    {isExpanded ? '收起' : '详情'}
                                    <ChevronDown size={11} className={`transition-transform duration-200 ${isExpanded ? 'rotate-180 text-[#3f51b5]' : ''}`} />
                                  </span>
                                </div>

                                {/* Inner Details Panel (Accordion) */}
                                <AnimatePresence initial={false}>
                                  {isExpanded && (
                                    <motion.div
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: 'auto', opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      transition={{ duration: 0.2, ease: 'easeInOut' }}
                                      className="overflow-hidden relative z-20"
                                      onClick={(e) => e.stopPropagation()} // Prevent double trigger
                                    >
                                      <div className="pt-3 pb-1 flex flex-col gap-2.5 text-[11px] border-t border-dashed border-slate-200 mt-2 text-slate-600">
                                        
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
                          })}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="py-12 text-center text-slate-400 flex flex-col items-center justify-center flex-1">
                    <Activity size={24} className="text-slate-300 mb-2 animate-pulse" />
                    <p className="text-xs">无符合条件的布防内容</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Modern Notification Toast */}
      <AnimatePresence>
        {toastMsg && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 bg-[#1e293b] text-white px-4 py-3.5 rounded-2xl shadow-xl border border-slate-700/50 flex items-center gap-3 text-xs md:text-sm font-semibold max-w-[340px] md:max-w-[420px]"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-ping"></div>
            <span>{toastMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
