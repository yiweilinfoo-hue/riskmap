import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronRight,
  ChevronLeft,
  Maximize,
  X, 
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


const RiskCard: React.FC<{ item: RiskItem, isExpanded: boolean, toggleExpand: (id: number) => void, triggerToast: (msg: string) => void }> = ({ item, isExpanded, toggleExpand, triggerToast }) => {
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

export function RiskList({ items, selectedNode, onSelectNode }: RiskListProps) {
  // Store expanded card IDs
  const [expandedIds, setExpandedIds] = useState<Record<number, boolean>>({});
  // Domain selection (人的管理 vs 供应商管理)
  const [activeDomain, setActiveDomain] = useState<'人的管理' | '供应商管理'>('人的管理');
  const [viewAllModalCol, setViewAllModalCol] = useState<string | null>(null);
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
                ? 'bg-white text-blue-600 shadow-sm' 
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
                
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setViewAllModalCol(col)}
                    className="text-xs text-slate-500 hover:text-slate-800 transition-colors cursor-pointer flex items-center gap-1 opacity-70 hover:opacity-100"
                  >
                    <Maximize size={12} className="text-slate-400" />
                    全屏
                  </button>
                </div>
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
                              <RiskCard key={item.id} item={item} isExpanded={isExpanded} toggleExpand={toggleExpand} triggerToast={triggerToast} />
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

      {/* View All Modal */}
      <AnimatePresence>
        {viewAllModalCol && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm cursor-pointer"
              onClick={() => setViewAllModalCol(null)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-[90vw] lg:max-w-6xl max-h-[85vh] bg-white rounded-2xl shadow-xl flex flex-col overflow-hidden border border-slate-200"
            >
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50 flex-shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                    <BookOpen size={16} />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-800">{viewAllModalCol} - 全部明细条例</h2>
                    <p className="text-xs text-slate-500">当前阶段下所有管控条例及风险点的完整清单</p>
                  </div>
                </div>
                <button 
                  onClick={() => setViewAllModalCol(null)}
                  className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 flex items-center justify-center text-slate-500 transition-colors cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6 bg-slate-100/60">
                <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                  {Object.keys(columnData[viewAllModalCol] || {}).map(group => (
                    <div key={group} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm flex flex-col break-inside-avoid">
                      <div className="px-5 py-4 border-b border-slate-100 font-bold text-slate-800 text-base flex items-center gap-2">
                        {group}
                      </div>
                      <div className="p-4">
                        <div className="grid gap-3 grid-cols-1">
                          {columnData[viewAllModalCol][group].map(item => {
                            const isExpanded = !!expandedIds[item.id];
                            return (
                              <RiskCard key={item.id} item={item} isExpanded={isExpanded} toggleExpand={toggleExpand} triggerToast={triggerToast} />
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

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
