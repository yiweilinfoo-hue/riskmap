import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Megaphone, ShieldAlert, ChevronUp, ChevronDown, ChevronRight } from 'lucide-react';

import { TrendModal } from './TrendModal';

export function ManagementHighlights() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isTrendModalOpen, setIsTrendModalOpen] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-2">
      {/* Header */}
      <div className="px-5 py-3 flex items-center justify-between border-b border-gray-100 bg-[#f8fafc]">
        <div className="flex items-center gap-2 text-slate-800">
          <Megaphone size={18} className="text-[#f97316]" fill="#ffedd5" />
          <span className="font-bold text-base">管理要点</span>
        </div>
        
        <button className="flex items-center gap-1.5 text-blue-600 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer border border-blue-100">
          <ShieldAlert size={14} />
          <span>风险预警</span>
        </button>
      </div>

      {/* Content */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="p-5 bg-gradient-to-b from-[#f8fafc]/50 to-white relative">
              <button 
                onClick={() => setIsExpanded(false)}
                className="absolute top-4 right-5 flex items-center gap-1 text-xs text-blue-600 bg-blue-50/80 hover:bg-blue-100 px-2.5 py-1 rounded transition-colors cursor-pointer"
              >
                收起 <ChevronUp size={12} />
              </button>

              <div className="flex flex-col gap-4 text-sm text-slate-600 pr-20">
                {/* Section 1 */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-1 h-3.5 bg-blue-600 rounded-full"></div>
                    <span className="font-bold text-slate-800 text-[15px] flex items-center">
                      人员风险健康度 
                      <span className="text-blue-500 text-xs ml-2 flex items-center cursor-pointer hover:underline font-normal" onClick={() => setIsTrendModalOpen(true)}>
                        查看趋势 <ChevronRight size={12} />
                      </span>
                    </span>
                  </div>
                </div>

                {/* Section 2 */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-1 h-3.5 bg-blue-600 rounded-full"></div>
                    <span className="font-bold text-slate-800 text-[15px]">人事管理风险</span>
                  </div>
                  <ul className="list-disc pl-5 flex flex-col gap-1.5 marker:text-slate-400">
                    <li><span className="font-bold text-slate-700">人事风险模型预警数量连续3月前三的模型：</span> 一线长期不在岗、人脸不一致工单未处理、二线长期不在岗</li>
                    <li>预计总数量145883条，待改善数量10127条，改善率93.06% (对比上月下降-0.93%)</li>
                  </ul>
                </div>

                {/* Section 3 */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-1 h-3.5 bg-blue-600 rounded-full"></div>
                    <span className="font-bold text-slate-800 text-[15px]">供应商风险</span>
                  </div>
                  <ul className="list-disc pl-5 flex flex-col gap-1.5 marker:text-slate-400">
                    <li>业务外包：S级订单占比35.47%，环比1.00%；0条账单超返还周期未确定收益（潜在收益损失详见供应商风险报表）</li>
                  </ul>
                </div>

                {/* Section 4 */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-1 h-3.5 bg-blue-600 rounded-full"></div>
                    <span className="font-bold text-slate-800 text-[15px]">劳动争议风险</span>
                  </div>
                  <ul className="list-disc pl-5 flex flex-col gap-1.5 marker:text-slate-400">
                    <li>年度累计新发案件599起，(同比30.56%)，累计涉案金额12998.82万元，案件由主要以劳动薪酬类为主，占比38.44%。</li>
                    <li>年度累计结案125起；累计赔付204.89万元，（同比-5.76%），赔付比11.05%</li>
                  </ul>
                </div>

                {/* Section 5 */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-1 h-3.5 bg-blue-600 rounded-full"></div>
                    <span className="font-bold text-slate-800 text-[15px]">诉访风险</span>
                  </div>
                  <ul className="list-disc pl-5 flex flex-col gap-1.5 marker:text-slate-400">
                    <li><span className="font-bold text-slate-700">年累计数量、审计查实率及趋势：</span>年累计诉访691条，同比50条；年度累计审计查实率0%，同比-7%</li>
                    <li><span className="font-bold text-slate-700">年度累计诉访数量同比增加前10的场景：</span>工资发放(72条)、工伤/工亡(39条)、岗位调整(25条)、社保(22条)、工作安排(19条)、服务扣款(17条)、交通事故(17条)、辱骂同事(14条)、人证不一(13条)、骗取补贴(13条)</li>
                    <li><span className="font-bold text-slate-700">重点情形：</span>上访年度累计14条，同比增加7条；查实不雅类型年度累计1条，同比减少1条</li>
                    <li><span className="font-bold text-slate-700">诉访评价机制关注地区：</span>业务区为辽宁区(70分)、天津区(70分)、苏南区(70分)、鲁西区(90分)、河南区(90分)，分拨区为无</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isExpanded && (
        <div 
          className="px-5 py-2.5 bg-gradient-to-b from-[#f8fafc]/50 to-white flex justify-center border-t border-gray-50/50 cursor-pointer hover:bg-slate-50 transition-colors group"
          onClick={() => setIsExpanded(true)}
        >
          <div className="flex items-center gap-1.5 text-xs text-blue-500 font-medium group-hover:text-blue-600">
            展开详情 <ChevronDown size={14} className="group-hover:translate-y-0.5 transition-transform" />
          </div>
        </div>
      )}
      <TrendModal isOpen={isTrendModalOpen} onClose={() => setIsTrendModalOpen(false)} />
    </div>
  );
}
