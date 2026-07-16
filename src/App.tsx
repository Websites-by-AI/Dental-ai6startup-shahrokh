import { useState } from 'react';
import { Navbar, TabType } from './components/Navbar';
import { OverviewSection } from './components/OverviewSection';
import { ThermoformerSection } from './components/ThermoformerSection';
import { ImpressionScannerSection } from './components/ImpressionScannerSection';
import { AutoclaveLoggerSection } from './components/AutoclaveLoggerSection';
import { ShadeMatchingSection } from './components/ShadeMatchingSection';
import { ExportGuideSection } from './components/ExportGuideSection';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  return (
    <div className="min-h-screen bg-[#0b0c15] text-[#f6f5f0] font-display flex flex-col justify-between selection:bg-[#44d4cf]/20 selection:text-[#f6f5f0]">
      {/* Mesh Orbs Background */}
      <div className="mesh-bg" aria-hidden="true">
        <div className="mesh-orb-1" />
        <div className="mesh-orb-2" />
        <div className="mesh-orb-3" />
      </div>

      <div>
        {/* Navigation Bar */}
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Main Content Area */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 relative z-10">
          {activeTab === 'overview' && (
            <OverviewSection onSelectProject={(tab) => setActiveTab(tab)} />
          )}

          {activeTab === 'thermoformer' && <ThermoformerSection />}

          {activeTab === 'impression' && <ImpressionScannerSection />}

          {activeTab === 'autoclave' && <AutoclaveLoggerSection />}

          {activeTab === 'shade' && <ShadeMatchingSection />}

          {activeTab === 'export' && <ExportGuideSection />}
        </main>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/[0.06] bg-[#07080d]/80 py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8a8a92]">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#f6f5f0]">DentLab AI</span>
            <span>— پلتفرم تخصصی ساخت تجهیزات کارگاهی دندانپزشکی (Class I)</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveTab('overview')}
              className="hover:text-[#44d4cf] transition"
            >
              نمای کلی ۴ طرح
            </button>
            <span>•</span>
            <button
              onClick={() => setActiveTab('export')}
              className="hover:text-[#e8a44f] transition"
            >
              راهنمای صادرات به اروپا
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
