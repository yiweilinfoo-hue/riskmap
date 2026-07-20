import React, { useState, useMemo } from 'react';
import { Users, Building2, Search, AlertTriangle, CheckCircle, BookOpen, ChevronRight, ChevronDown, ArrowLeftRight, LayoutDashboard, CircleHelp, User, Calendar, Download, X } from 'lucide-react';
import { riskData } from './data';
import { RiskList } from './components/RiskList';
import { Roadmap } from './components/Roadmap';
import { ManagementHighlights } from './components/ManagementHighlights';

type Tab = '集团' | '业务区' | '分拨区';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('集团');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  
  // Filter logic
  const filteredData = useMemo(() => {
    return riskData.filter(item => {
      // 演示环境：不同组织层级展示相同的数据，支持对组织(责任人、编号)、名称、类别等全方位搜索
      const query = searchQuery.toLowerCase();
      const matchSearch = (item.name || '').toLowerCase().includes(query) || 
                          (item.riskCategory || '').toLowerCase().includes(query) ||
                          (item.riskGroup || '').toLowerCase().includes(query) ||
                          (item.contactPerson || '').toLowerCase().includes(query) ||
                          (item.contactId || '').toLowerCase().includes(query);
      return matchSearch;
    });
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col">
      {/* Top Navbar - 智策平台 Style */}
      <header className="bg-white border-b border-gray-200 flex items-center justify-between px-6 h-[56px] z-20 flex-shrink-0">
        <div className="flex items-center">
          {/* Logo */}
          <div className="flex items-center gap-2 mr-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#3B82F6"/>
              <path d="M2 7V17L12 22V12L2 7Z" fill="#2563EB"/>
              <path d="M22 7V17L12 22V12L22 7Z" fill="#1D4ED8"/>
            </svg>
            <span className="text-[18px] font-bold font-display text-slate-900 tracking-wide">智策平台</span>
          </div>
          
          <ArrowLeftRight size={16} className="text-gray-400 mx-4" />
          
          {/* Nav */}
          <nav className="flex items-center gap-7 text-[14px] font-medium ml-2">
            <div className="text-gray-700 hover:text-blue-600 cursor-pointer">智策首页</div>
            <div className="text-blue-600 flex items-center cursor-pointer">
              主题分析 <ChevronDown size={14} className="ml-1" />
            </div>
            <div className="text-gray-700 hover:text-blue-600 flex items-center cursor-pointer">
              数据服务 <ChevronDown size={14} className="ml-1" />
            </div>
            <div className="text-gray-700 hover:text-blue-600 flex items-center cursor-pointer">
              后台配置 <ChevronDown size={14} className="ml-1" />
            </div>
          </nav>
        </div>

        <div className="flex items-center gap-5 text-[14px] text-gray-700 font-medium">
          <div className="flex items-center cursor-pointer hover:text-blue-600">
            工具 <ChevronDown size={14} className="ml-1" />
          </div>
          <div className="cursor-pointer hover:text-blue-600">权限中心</div>
          <div className="cursor-pointer hover:text-blue-600">下载任务</div>
          <div className="w-px h-4 bg-gray-300 mx-1"></div>
          <div className="flex items-center gap-5 text-gray-600">
            <LayoutDashboard size={18} className="cursor-pointer hover:text-blue-600" />
            <CircleHelp size={18} className="cursor-pointer hover:text-blue-600" />
            <User size={18} className="cursor-pointer hover:text-blue-600" />
          </div>
        </div>
      </header>

      {/* Secondary Header - Page Title & Watermark */}
      <div className="bg-white border-b border-slate-200 flex items-center h-14 relative overflow-hidden flex-shrink-0">
        <div className="px-6 text-slate-900 text-[16px] font-display font-bold border-r border-slate-100 h-full flex items-center bg-white z-10 whitespace-nowrap">
          风险管理地图看板
        </div>
      </div>

      {/* Tabs & Filters Bar */}
      <div className="bg-white border-b border-slate-200 px-6 h-16 flex items-center justify-between sticky top-0 z-10 shadow-sm flex-shrink-0">
        {/* Tabs */}
        <div className="flex items-center gap-6 h-full text-[14px]">
          {(['集团', '业务区', '分拨区'] as Tab[]).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`h-full flex items-center border-b-[3px] transition-colors px-1 mt-[2px] ${
                activeTab === tab 
                  ? 'border-blue-600 text-blue-600 font-bold' 
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4 text-[13px]">
          <div className="flex items-center gap-2 text-gray-700">
            <span>时间:</span>
            <div className="flex items-center border border-slate-300 rounded px-3 py-1.5 bg-white w-[130px] justify-between cursor-pointer hover:border-gray-400">
              <span className="text-gray-600">2026年05月</span>
              <Calendar size={14} className="text-gray-400" />
            </div>
          </div>
          
          <div className="relative ml-2">
            <input
              type="text"
              className="pl-8 pr-3 py-1.5 border border-slate-300 rounded text-sm w-64 focus:outline-none focus:border-blue-500"
              placeholder="搜索组织..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search size={14} className="absolute left-2.5 top-2 text-gray-400" />
          </div>

          <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-1.5 rounded text-sm font-medium transition-colors ml-1 cursor-pointer">
            查询
          </button>

          <button className="flex items-center gap-1.5 text-blue-600 hover:text-blue-700 ml-4 font-medium cursor-pointer">
            <Download size={15} />
            图片下载
          </button>
        </div>
      </div>

      <main className="flex-1 p-6 lg:p-8 max-w-[1600px] mx-auto w-full flex flex-col gap-8">
        
        {/* Management Highlights Section */}
        <ManagementHighlights />
        
        {/* Roadmap Visualization (Now includes stats) */}
        <Roadmap selectedNode={selectedNode} onSelectNode={setSelectedNode} />



        {/* Always-visible card-based Dashboard */}
        <RiskList 
          items={filteredData} 
          selectedNode={selectedNode} 
          onSelectNode={setSelectedNode} 
        />

      </main>
    </div>
  );
}
