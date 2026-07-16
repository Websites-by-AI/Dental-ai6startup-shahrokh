import React from 'react';
import { Sparkles, Cpu, ScanLine, Package, Palette, ShieldCheck, Home } from 'lucide-react';

export type TabType = 'overview' | 'thermoformer' | 'impression' | 'autoclave' | 'shade' | 'export';

interface NavbarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'overview' as TabType, label: 'نمای کلی ۴ طرح', icon: Home, badge: 'رومیز و پولساز' },
    { id: 'thermoformer' as TabType, label: '۱. وکیوم فرمر هوشمند', icon: Cpu, badge: 'پرفروش‌ترین' },
    { id: 'impression' as TabType, label: '۲. جعبه کنترل قالب', icon: ScanLine, badge: 'صفر تحریم' },
    { id: 'autoclave' as TabType, label: '۳. لاگر اتوکلاو QR', icon: Package, badge: 'تاییدیه مطب' },
    { id: 'shade' as TabType, label: '۴. تطبیق رنگ دندان', icon: Palette, badge: 'اشتراکی' },
    { id: 'export' as TabType, label: 'راهنمای صادرات به اروپا', icon: ShieldCheck, badge: 'CE Lab Device' },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#0b0c15]/80 border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveTab('overview')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2a8a87] via-[#44d4cf] to-[#e8a44f] p-[1px] shadow-[0_0_20px_rgba(68,212,207,0.3)]">
            <div className="w-full h-full bg-[#0b0c15] rounded-[11px] flex items-center justify-center group-hover:bg-transparent transition-colors">
              <Sparkles className="w-5 h-5 text-[#44d4cf] group-hover:text-[#0b0c15] transition-colors" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base sm:text-lg text-[#f6f5f0] tracking-tight">DentLab AI</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#44d4cf]/15 text-[#44d4cf] border border-[#44d4cf]/30 font-semibold">
                Class I Lab Devices
              </span>
            </div>
            <p className="text-[11px] text-[#8a8a92] hidden sm:block">نقشه راه ساخت ۴ تجهیزات کارگاهی درآمدزا + کدهای ESP32 و AI</p>
          </div>
        </div>

        {/* Tab Selector */}
        <nav className="hidden lg:flex items-center gap-1 bg-white/[0.03] p-1.5 rounded-2xl border border-white/[0.06]">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-300 flex items-center gap-2 ${
                  isActive
                    ? 'text-[#0b0c15] bg-gradient-to-r from-[#44d4cf] to-[#2a8a87] font-bold shadow-[0_0_15px_rgba(68,212,207,0.3)]'
                    : 'text-[#8a8a92] hover:text-[#f6f5f0] hover:bg-white/[0.04]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#0b0c15]' : 'text-[#8a8a92]'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Action badge */}
        <div className="flex items-center gap-2">
          <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-[#e8a44f] bg-[#e8a44f]/10 border border-[#e8a44f]/20 px-3 py-1.5 rounded-xl font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#e8a44f] animate-ping" />
            صادرات آسان بدون MDR
          </span>
        </div>
      </div>

      {/* Mobile Horizontal Bar */}
      <div className="lg:hidden flex overflow-x-auto gap-2 px-4 py-2 border-t border-white/[0.04] no-scrollbar">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 whitespace-nowrap ${
                isActive
                  ? 'bg-[#44d4cf] text-[#0b0c15] font-bold'
                  : 'bg-white/[0.03] text-[#8a8a92] border border-white/[0.06]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};
