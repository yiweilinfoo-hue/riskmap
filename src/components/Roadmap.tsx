import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Users, Building2, AlertTriangle, CheckCircle, BookOpen } from 'lucide-react';
import { riskData } from '../data';

export function Roadmap({ selectedNode, onSelectNode }: { selectedNode: string | null, onSelectNode: (node: string | null) => void }) {
  const timelineNodes = [
    { id: '招聘入职', domain: '人的管理', color: 'blue', ring: 'ring-blue-100/50', border: 'border-blue-300', text: 'text-blue-700' },
    { id: '在职', domain: '人的管理', color: 'blue', ring: 'ring-blue-100/50', border: 'border-blue-300', text: 'text-blue-700' },
    { id: '离职', domain: '人的管理', color: 'blue', ring: 'ring-blue-100/50', border: 'border-blue-300', text: 'text-blue-700' },
    { id: '引入', domain: '供应商管理', color: 'indigo', ring: 'ring-indigo-100/50', border: 'border-indigo-300', text: 'text-indigo-700' },
    { id: '合作', domain: '供应商管理', color: 'indigo', ring: 'ring-indigo-100/50', border: 'border-indigo-300', text: 'text-indigo-700' },
    { id: '退出', domain: '供应商管理', color: 'indigo', ring: 'ring-indigo-100/50', border: 'border-indigo-300', text: 'text-indigo-700' },
  ];

  const totalRisks = riskData.length;
  const onlineTotal = riskData.filter(i => i.isOnline).length;
  const onlineExceptions = riskData.filter(i => i.isOnline && !!i.exceptionMsg).length;
  const offlineControlled = riskData.filter(i => !i.isOnline).length;

  const nodeIndex = timelineNodes.findIndex(n => n.id === selectedNode);

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex flex-col gap-6">
      
      {/* Stats Section - Separated by Dimensions */}
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Dimension 1: 整体盘点 */}
        <div className="bg-[#e8ecf4] rounded-lg p-4 shadow-sm border border-blue-50 flex items-center gap-4 min-w-[160px]">
          <div className="flex flex-col">
            <span className="text-[11px] text-blue-500 font-bold tracking-wider mb-1">总体分布</span>
            <span className="text-sm text-gray-700 font-medium">风险总数</span>
          </div>
          <div className="text-3xl font-bold text-blue-900 ml-auto">{totalRisks}</div>
        </div>
        
        {/* Dimension 3: 异常告警 */}
        <div className="bg-[#fde8e8] rounded-lg p-4 shadow-sm border border-red-100 flex items-center gap-4 min-w-[200px] relative overflow-hidden">
          <div className="absolute right-0 top-0 text-red-500/10 transform translate-x-2 -translate-y-2">
            <AlertTriangle size={80} />
          </div>
          <div className="flex flex-col z-10">
            <span className="text-[11px] text-red-500 font-bold tracking-wider mb-1">风险告警</span>
            <span className="text-sm text-red-800 font-medium">线上异常</span>
          </div>
          <div className="text-3xl font-bold text-red-600 ml-auto z-10">{onlineExceptions}</div>
        </div>

        {/* Dimension 2: 管控方式 */}
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 flex items-center justify-around flex-1 relative">
          <span className="absolute top-2 left-3 text-[11px] text-gray-400 font-bold tracking-wider">管控方式</span>
          
          <div className="flex items-center gap-3 mt-2">
            <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center">
              <CheckCircle size={16} className="text-green-600" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-gray-500">已线上化</span>
              <span className="text-xl font-bold text-green-700">{onlineTotal}</span>
            </div>
          </div>
          
          <div className="w-px h-8 bg-gray-100 mt-2"></div>
          
          <div className="flex items-center gap-3 mt-2">
            <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center">
              <BookOpen size={16} className="text-gray-500" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-gray-500">线下管控</span>
              <span className="text-xl font-bold text-gray-700">{offlineControlled}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Roadmap Section */}
      <div className="flex-1 flex flex-col">
        <div className="text-sm font-bold text-gray-800 mb-4">风险管理路线图</div>
        
        {/* Mobile Layout (< lg) */}
        <div className="lg:hidden flex flex-col gap-4 relative pl-8 py-2">
          {/* Vertical Dashed Connecting Line */}
          <div className="absolute left-[18px] top-0 bottom-0 w-0.5 border-l-2 border-dashed border-slate-300 opacity-60 z-0"></div>
          
          {timelineNodes.map((node) => {
            const items = riskData.filter(d => d.category1 === node.domain && d.category2 === node.id);
            const total = items.length;
            const exceptions = items.filter(d => d.isOnline && !!d.exceptionMsg).length;
            const isSelected = selectedNode === node.id;

            return (
              <div 
                key={node.id} 
                className={`flex items-start gap-4 p-3.5 rounded-xl border transition-all duration-300 cursor-pointer relative z-10 ${
                  isSelected 
                    ? 'bg-white border-indigo-200 shadow-md ring-1 ring-indigo-100' 
                    : 'bg-white/80 border-slate-100 hover:bg-white hover:shadow-sm'
                }`}
                onClick={() => onSelectNode(isSelected ? null : node.id)}
              >
                {/* Floating Node Button on the left line */}
                <div className="absolute -left-[28px] top-1/2 -translate-y-1/2 z-20">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center bg-white border-2 shadow-sm transition-all duration-300 ${
                    isSelected 
                      ? 'border-indigo-600 ring-4 ring-indigo-100 bg-indigo-600 text-white' 
                      : exceptions > 0 
                        ? 'border-red-400 text-red-600 ring-4 ring-red-50 bg-red-50' 
                        : node.color === 'blue' 
                          ? 'border-blue-300 text-blue-700 ring-4 ring-blue-50/50' 
                          : 'border-indigo-300 text-indigo-700 ring-4 ring-indigo-50/50'
                  }`}>
                    <span className="font-bold text-xs">{total}</span>
                  </div>
                </div>

                {/* Text Details on the right */}
                <div className="flex-1 flex flex-col gap-1 relative">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      node.color === 'blue' ? 'bg-blue-50 text-blue-600' : 'bg-indigo-50 text-indigo-600'
                    }`}>
                      {node.domain}
                    </span>
                    <span className="text-sm font-bold text-gray-800">{node.id}</span>
                    
                    {exceptions > 0 && (
                      <span className="ml-auto inline-flex items-center gap-1 text-[10px] font-semibold text-red-600 bg-red-50 px-1.5 py-0.5 rounded border border-red-100 animate-pulse">
                        <AlertTriangle size={10} /> {exceptions} 项异常
                      </span>
                    )}

                    {isSelected && (
                      <span className="ml-auto text-sm animate-bounce text-indigo-500">
                        <CheckCircle size={14} />
                      </span>
                    )}
                  </div>
                  
                  <div className="text-xs text-gray-400">
                    包含 {total} 个风险布防规则，点击展开下方明细
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Desktop Layout (>= lg) */}
        <div className="hidden lg:block relative bg-slate-50/50 rounded-2xl pt-12 pb-6 px-6 border border-slate-200 mt-6">
          
          {/* Background dashed borders */}
          <div className="absolute inset-x-6 top-10 bottom-6 flex gap-6 pointer-events-none z-0">
            <div className="flex-1 border border-dashed border-indigo-200 bg-indigo-50/10 rounded-xl relative">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-1 bg-white border border-indigo-100 rounded-full text-xs font-bold text-indigo-700 shadow-sm whitespace-nowrap">
                <Users size={14} />
                <span>人的风险管理</span>
              </div>
            </div>
            <div className="flex-1 border border-dashed border-slate-200 bg-slate-50/30 rounded-xl relative">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-1 bg-white border border-slate-200 rounded-full text-xs font-bold text-slate-700 shadow-sm whitespace-nowrap">
                <Building2 size={14} />
                <span>供应商风险管理</span>
              </div>
            </div>
          </div>

          {/* Nodes Grid with SVG path and active person indicator */}
          <div className="grid grid-cols-6 gap-0 relative pt-20 pb-4">
            
            {/* Dashed Connecting Track Line */}
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
                  stroke="#3f51b5" 
                  strokeWidth="3" 
                  strokeDasharray="6 6"
                  initial={{ x2: "0%" }}
                  animate={{ x2: `${(nodeIndex / 5) * 100}%` }}
                  transition={{ type: 'spring', stiffness: 100, damping: 15 }}
                />
              )}
            </svg>

            {/* Animated Walking/Running Person */}
            {nodeIndex !== -1 && (
              <motion.div
                key="activePerson"
                className="absolute z-20 -translate-x-1/2 flex flex-col items-center pointer-events-none"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ 
                  left: `${8.33 + nodeIndex * 16.66}%`,
                  top: '38px',
                  opacity: 1,
                  scale: 1
                }}
                transition={{ type: 'spring', stiffness: 150, damping: 15 }}
              >
                {/* Visual bubble */}
                <div className="bg-[#3f51b5] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-md flex items-center gap-1 border border-blue-400/20 whitespace-nowrap animate-pulse">
                  <CheckCircle size={10} />
                  <span>当前环节</span>
                </div>
                {/* Pointer */}
                <div className="w-1.5 h-1.5 bg-[#3f51b5] rotate-45 -mt-1 shadow-xs"></div>
              </motion.div>
            )}

            {timelineNodes.map((node, idx) => {
              const items = riskData.filter(d => d.category1 === node.domain && d.category2 === node.id);
              const total = items.length;
              const exceptions = items.filter(d => d.isOnline && !!d.exceptionMsg).length;
              const isSelected = selectedNode === node.id;

              return (
                <div key={node.id} className="col-span-1 flex flex-col items-center relative group">
                  {/* Exception Warning Tooltip */}
                  {exceptions > 0 && (
                    <div className="absolute -top-11 whitespace-nowrap bg-[#fde8e8] text-red-600 border border-red-200 text-[10px] px-2 py-1 rounded-md flex items-center shadow-sm font-semibold z-20 animate-bounce">
                      <AlertTriangle size={11} className="mr-1 text-red-500" />
                      {exceptions} 项异常
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#fde8e8] border-b border-r border-red-200 rotate-45"></div>
                    </div>
                  )}

                  {/* Node Interactive Circle */}
                  <button
                    onClick={() => onSelectNode(isSelected ? null : node.id)}
                    className={`w-12 h-12 rounded-full flex items-center justify-center bg-white border shadow-sm transition-all duration-300 hover:scale-110 cursor-pointer relative z-10 ${
                      isSelected 
                        ? 'border-indigo-600 bg-indigo-600 text-white shadow-md' 
                        : exceptions > 0 
                          ? 'border-red-400 text-red-600 bg-red-50/50' 
                          : 'border-slate-300 text-slate-700 hover:border-slate-400 hover:text-slate-900'
                    }`}
                  >
                    <span className="font-bold text-sm">{total}</span>
                  </button>

                  {/* Stage Title */}
                  <span className={`mt-4 text-xs font-bold px-3.5 py-1.5 rounded-full transition-all duration-300 border ${
                    isSelected 
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm' 
                      : 'text-slate-600 bg-white border-slate-200/60 group-hover:bg-slate-50 group-hover:text-slate-900 group-hover:border-slate-300'
                  }`}>
                    {node.id}
                  </span>
                  
                  {/* Visual pointer under selected node */}
                  {isSelected && (
                    <div className="absolute -bottom-4 w-3 h-3 bg-indigo-600 rotate-45 rounded-xs shadow-sm z-20"></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
