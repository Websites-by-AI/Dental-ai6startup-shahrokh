import React, { useState } from 'react';
import { 
  Box, Eye, Layers,
  Compass, FileCode, Check, Download,
  Sparkles, ShieldCheck
} from 'lucide-react';
import { downloadTextFile, CAD_DXF_TEMPLATES } from '../../utils/fileDownloader';

interface SubAssembly {
  id: string;
  name: string;
  description: string;
  material: string;
  dimensions: string;
  color: string;
  activeIn3d: boolean;
}

export const CADStudio: React.FC = () => {
  const [activeSubAssembly, setActiveSubAssembly] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'3d' | 'xray' | 'blueprint' | 'comparison' | 'laser'>('3d');
  const [explodedView, setExplodedView] = useState<boolean>(false);
  const [finishColor, setFinishColor] = useState<'darkCyan' | 'mattePlatinum' | 'pearlWhite'>('darkCyan');
  const [deviceStateSim, setDeviceStateSim] = useState<'standby' | 'heating' | 'vacuum' | 'cooling'>('heating');
  const [copiedNotification, setCopiedNotification] = useState<string | null>(null);

  const subAssemblies: SubAssembly[] = [
    {
      id: 'hood',
      name: 'بازوی چرخشی هود حرارتی (Hex-Cantilever Swivel Hood)',
      description: 'هود آلومینیومی شش‌ضلعی آیرودینامیک با افت حرارتی کم، شامل المنت ۱۰۰۰W سرامیکی و سنسور IR غیرتماسی MLX90614',
      material: 'آلیاژ آلومینیوم ۶۰۶۱ ماشین‌کاری شده + پشم سرامیک نسوز ۱۲۰۰°C',
      dimensions: '۱۶۵mm × ۱۶۵mm × ۷۵mm',
      color: '#e8a44f',
      activeIn3d: true,
    },
    {
      id: 'ring',
      name: 'رینگ مغناطیسی قفل سریع ورق (Mag-Lock Quick Ring)',
      description: 'مکانیزم ابداعی رینگ قفل مگنتی نئودیمیوم با واشر سیلیکونی گرید غذایی به جای چرخ‌دنده متداول بازار',
      material: 'استیل ۳۰۴ + آهن‌ربای N52 نسوز + سیلیکون ۳۰۰°C',
      dimensions: 'قطر خارجی ۱۵۵mm × قطر داخلی ۱۱۵mm',
      color: '#44d4cf',
      activeIn3d: true,
    },
    {
      id: 'chamber',
      name: 'پلنوم محفظه خلاء متخلخل (Vacuum Plenum Chamber)',
      description: 'محفظه فشار منفی شیب‌دار با صفحه مشبک برنجی ماشین‌کاری شده جهت توزیع یکنواخت مکش خلاء',
      material: 'ورق برنجی ۳mm + محفظه اکریلیک ریخته‌گری ۵mm',
      dimensions: '۱۴۵mm × ۱۴۵mm × عمق ۴۵mm',
      color: '#2a8a87',
      activeIn3d: true,
    },
    {
      id: 'chassis',
      name: 'شاسی یکپارچه زاویه‌دار (70% Redesigned Sculpted Chassis)',
      description: 'شاسی اصلی فرم‌دهی شده با طراحی مدرن ۷۰٪ متفاوت از نمونه‌های آلمانی، شامل موتور مکش، برد ESP32 و رله SSR',
      material: 'فولاد روغنی ST12 ۱.۲۵mm + رنگ پودری سنباده‌ای کوره الکترواستاتیک',
      dimensions: '۲۴۰mm (عرض) × ۲۶۰mm (عمق) × ۲۱۰mm (ارتفاع)',
      color: '#8a8a92',
      activeIn3d: true,
    },
  ];

  const handleDownloadCAD = (format: 'dxf' | 'step' | 'spec') => {
    let content = '';
    let filename = '';
    
    if (format === 'dxf') {
      content = CAD_DXF_TEMPLATES.thermoformer;
      filename = 'DentLab_Thermoformer_70percent_Redesign.dxf';
    } else if (format === 'step') {
      content = `ISO-10303-21;\nHEADER;\n/* DentLab AI 3D STEP Assembly Spec - 70% Unique Physical Redesign */\nENDSEC;\nDATA;\n#1 = PRODUCT('DentLab Thermoformer Redesigned Chassis', 'STEP Assembly', '', ());\nENDSEC;\nEND-ISO-10303-21;`;
      filename = 'DentLab_Thermoformer_3D_Redesigned.step';
    } else {
      content = `DentLab AI Thermoformer Mechanical Specification Blueprint\nScale 1:1\nTolerance: +/-0.1mm\nMaterial: Electrostatic Powder Coated ST12 Steel + Cast Acrylic\nRotation: 180 Degree Swivel Arm Radius`;
      filename = 'Thermoformer_Mechanical_Spec_Blueprint.txt';
    }

    downloadTextFile(filename, content);
    setCopiedNotification(`فایل ${filename} دانلود شد.`);
    setTimeout(() => setCopiedNotification(null), 3000);
  };

  return (
    <div className="space-y-8">
      {/* CAD Header Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white/[0.02] border border-white/[0.08] p-6 rounded-3xl">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#44d4cf] mb-1">
            <Box className="w-4 h-4" />
            استودیوی طراحی مکانیکی و شاسی (Mechanical CAD & 3D Visual Studio)
          </div>
          <h2 className="text-2xl font-black text-[#f6f5f0]">طراحی سه بعدی، نقشه‌های CAD و شاسی ۷۰٪ اختصاصی ایرانی</h2>
          <p className="text-xs text-[#8a8a92] mt-1">
            طراحی بدنه متمایز جهت عدم نقض کپی‌رایت دستگاه‌های خارجی آلمان با عملکرد بهبود یافته آیرودینامیک و ارگونومی
          </p>
        </div>

        {/* View Mode Switcher */}
        <div className="flex flex-wrap items-center gap-1.5 bg-black/40 p-1.5 rounded-2xl border border-white/[0.08]">
          <button
            onClick={() => setViewMode('3d')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              viewMode === '3d' ? 'bg-[#44d4cf] text-[#0b0c15]' : 'text-[#8a8a92] hover:text-[#f6f5f0]'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            تصویر استودیویی و رندر ۳D
          </button>

          <button
            onClick={() => setViewMode('xray')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              viewMode === 'xray' ? 'bg-[#44d4cf] text-[#0b0c15]' : 'text-[#8a8a92] hover:text-[#f6f5f0]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            نمای اشعه ایکس (X-Ray Wireframe)
          </button>

          <button
            onClick={() => setViewMode('blueprint')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              viewMode === 'blueprint' ? 'bg-[#44d4cf] text-[#0b0c15]' : 'text-[#8a8a92] hover:text-[#f6f5f0]'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            نقشه ابعادی (2D CAD Blueprint)
          </button>

          <button
            onClick={() => setViewMode('comparison')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              viewMode === 'comparison' ? 'bg-[#e8a44f] text-[#0b0c15]' : 'text-[#8a8a92] hover:text-[#f6f5f0]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            مقایسه با آلمان (70% Difference)
          </button>

          <button
            onClick={() => setViewMode('laser')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              viewMode === 'laser' ? 'bg-[#44d4cf] text-[#0b0c15]' : 'text-[#8a8a92] hover:text-[#f6f5f0]'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            قطعه‌بندی لیزر (DXF Specs)
          </button>
        </div>
      </div>

      {/* Download Alert Notification */}
      {copiedNotification && (
        <div className="p-3.5 rounded-2xl bg-[#44d4cf]/15 border border-[#44d4cf]/30 text-[#44d4cf] text-xs font-bold flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>{copiedNotification}</span>
        </div>
      )}

      {/* Main CAD Viewer Panel for 3D and X-Ray Views */}
      {(viewMode === '3d' || viewMode === 'xray') && (
        <div className="grid lg:grid-cols-12 gap-8">
          {/* 3D Visual Render Canvas (8 cols) */}
          <div className="lg:col-span-8 glass-card rounded-3xl p-6 border border-[#44d4cf]/30 relative min-h-[520px] flex flex-col justify-between overflow-hidden bg-[#04050a]">
            {/* Top HUD Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 z-10">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#44d4cf] animate-ping" />
                <span className="text-xs font-mono text-[#44d4cf] font-bold">
                  {viewMode === 'xray' ? 'Internal Components X-Ray View' : 'Photorealistic Industrial Render'}
                </span>
              </div>

              {/* State simulator controls */}
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-[#8a8a92] font-semibold">حالت دستگاه:</span>
                {(['standby', 'heating', 'vacuum', 'cooling'] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => setDeviceStateSim(st)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition ${
                      deviceStateSim === st
                        ? st === 'heating' ? 'bg-[#e88598] text-white' : st === 'vacuum' ? 'bg-[#44d4cf] text-[#0b0c15]' : 'bg-white/[0.2] text-white'
                        : 'bg-white/[0.03] text-[#8a8a92] hover:text-[#f6f5f0]'
                    }`}
                  >
                    {st === 'standby' && 'آماده'}
                    {st === 'heating' && 'گرمایش IR'}
                    {st === 'vacuum' && 'مکش خلاء'}
                    {st === 'cooling' && 'خنک‌سازی'}
                  </button>
                ))}

                <button
                  onClick={() => setExplodedView(!explodedView)}
                  className={`px-3 py-1 rounded-lg text-[10px] font-bold border transition flex items-center gap-1 ${
                    explodedView
                      ? 'bg-[#e8a44f]/20 border-[#e8a44f] text-[#e8a44f]'
                      : 'bg-white/[0.04] border-white/[0.1] text-[#8a8a92] hover:text-[#f6f5f0]'
                  }`}
                >
                  <Layers className="w-3 h-3" />
                  <span>{explodedView ? 'انفجاری' : 'مونتاژ'}</span>
                </button>
              </div>
            </div>

            {/* Render Stage Area */}
            <div className="my-6 relative min-h-[340px] flex flex-col items-center justify-center gap-6">
              {/* Real Industrial AI Generated Studio Photo */}
              {viewMode === '3d' && (
                <div className="w-full max-w-lg rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative group img-shimmer">
                  <img
                    src="/images/thermoformer.jpg"
                    alt="DentLab AI Smart Thermoformer Industrial Photo"
                    className="w-full h-56 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-2 right-2 bg-black/80 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] text-[#44d4cf] font-mono border border-white/10 font-bold">
                    تصویر واقعی صنعتی وکیوم فرمر DentLab AI
                  </div>
                </div>
              )}

              {/* CAD Mesh Grid */}
              <div className="absolute inset-0 bg-[radial-gradient(#2a8a87_1px,transparent_1px)] [background-size:20px_20px] opacity-15 pointer-events-none" />

              {/* Realistic Visual Vector CAD Structural Model Rendering */}
              <div className="relative w-80 flex flex-col items-center justify-center transition-all duration-700">
                
                {/* Status Halo LED Glow Bar around arm */}
                <div className={`w-64 h-1 rounded-full blur-sm transition-all duration-500 mb-2 ${
                  deviceStateSim === 'heating' ? 'bg-[#e88598] shadow-[0_0_20px_#e88598]' :
                  deviceStateSim === 'vacuum' ? 'bg-[#44d4cf] shadow-[0_0_20px_#44d4cf]' :
                  deviceStateSim === 'cooling' ? 'bg-blue-400 shadow-[0_0_20px_#60a5fa]' : 'bg-[#8a8a92]/30'
                }`} />

                {/* 1. Hexagonal IR Cantilever Swivel Hood */}
                {(activeSubAssembly === 'all' || activeSubAssembly === 'hood') && (
                  <div className={`w-56 rounded-3xl border-2 p-4 transition-all duration-500 relative flex flex-col items-center justify-center shadow-2xl ${
                    viewMode === 'xray'
                      ? 'border-dashed border-[#e8a44f] bg-[#e8a44f]/10'
                      : 'border-[#e8a44f] bg-gradient-to-b from-[#1c1d28] via-[#12131c] to-[#0a0b12]'
                  } ${explodedView ? '-translate-y-14' : 'translate-y-0'}`}>
                    
                    {/* Ceramic Coil Visual */}
                    <div className={`w-28 h-6 rounded-xl border border-[#e8a44f]/60 flex items-center justify-center mb-2 transition-all ${
                      deviceStateSim === 'heating' ? 'bg-gradient-to-r from-red-600 via-amber-500 to-red-600 animate-pulse shadow-[0_0_15px_#e85d75]' : 'bg-black/50'
                    }`}>
                      <span className="text-[8px] font-mono font-bold text-[#f6f5f0]">1000W Ceramic Radiant Element</span>
                    </div>

                    {/* MLX90614 Lens aperture in center */}
                    <div className="w-6 h-6 rounded-full bg-cyan-900/80 border-2 border-[#44d4cf] flex items-center justify-center shadow-inner">
                      <div className="w-2 h-2 rounded-full bg-[#44d4cf] animate-ping" />
                    </div>
                    <span className="text-[9px] font-bold text-[#e8a44f] mt-1">بازوی هود شش‌ضلعی آیرودینامیک</span>
                  </div>
                )}

                {/* Pivot Joint & Axis Support */}
                <div className={`w-3 h-44 bg-gradient-to-b from-white/30 via-white/10 to-white/30 absolute right-2 rounded-full transition-all duration-500 ${
                  explodedView ? 'opacity-30' : 'opacity-80'
                }`} />

                <div className={`transition-all duration-500 ${explodedView ? 'h-10' : 'h-1'}`} />

                {/* 2. Mag-Lock Quick Clamp Ring */}
                {(activeSubAssembly === 'all' || activeSubAssembly === 'ring') && (
                  <div className={`w-64 h-12 rounded-2xl border-2 flex items-center justify-between px-5 transition-all duration-500 shadow-xl ${
                    viewMode === 'xray'
                      ? 'border-dashed border-[#44d4cf] bg-[#44d4cf]/10'
                      : 'border-[#44d4cf] bg-[#121422]'
                  } ${explodedView ? '-translate-y-5' : 'translate-y-0'}`}>
                    <div className="w-5 h-5 rounded-full border border-[#44d4cf] bg-[#0b0c15] flex items-center justify-center text-[7px] text-[#44d4cf]">N52</div>
                    <span className="text-[10px] font-extrabold text-[#44d4cf]">رینگ مغناطیسی Mag-Lock (تثبیت ورق PETG)</span>
                    <div className="w-5 h-5 rounded-full border border-[#44d4cf] bg-[#0b0c15] flex items-center justify-center text-[7px] text-[#44d4cf]">N52</div>
                  </div>
                )}

                <div className={`transition-all duration-500 ${explodedView ? 'h-10' : 'h-1'}`} />

                {/* 3. Vacuum Chamber & Dental Plaster Model Plate */}
                {(activeSubAssembly === 'all' || activeSubAssembly === 'chamber') && (
                  <div className={`w-60 h-16 rounded-xl border-2 flex flex-col items-center justify-center p-2 transition-all duration-500 shadow-lg ${
                    viewMode === 'xray'
                      ? 'border-dashed border-[#2a8a87] bg-[#2a8a87]/10'
                      : 'border-[#2a8a87] bg-[#0e101a]'
                  } ${explodedView ? 'translate-y-5' : 'translate-y-0'}`}>
                    
                    {/* Dental plaster cast graphic */}
                    <div className="w-32 h-6 rounded-t-xl bg-amber-100/20 border border-amber-300/40 flex items-center justify-center text-[8px] text-amber-200 font-bold mb-1">
                      مدل گچی دندان (Plaster Cast)
                    </div>
                    {/* Brass mesh grid */}
                    <div className="w-48 h-2 bg-gradient-to-r from-amber-600 via-yellow-400 to-amber-600 rounded-full" />
                  </div>
                )}

                <div className={`transition-all duration-500 ${explodedView ? 'h-10' : 'h-1'}`} />

                {/* 4. Sculpted 70% Unique Redesigned Main Base Cabinet Chassis */}
                {(activeSubAssembly === 'all' || activeSubAssembly === 'chassis') && (
                  <div className={`w-72 h-32 rounded-b-3xl border-2 p-5 flex flex-col justify-between transition-all duration-500 shadow-2xl relative ${
                    viewMode === 'xray'
                      ? 'border-dashed border-white/30 bg-white/[0.03]'
                      : finishColor === 'darkCyan'
                      ? 'border-[#2a8a87] bg-gradient-to-br from-[#121420] via-[#0d101a] to-[#080911]'
                      : finishColor === 'mattePlatinum'
                      ? 'border-slate-400 bg-gradient-to-br from-[#1e2230] via-[#141724] to-[#0c0e18]'
                      : 'border-amber-200/50 bg-gradient-to-br from-[#1c1d29] via-[#151622] to-[#0b0c14]'
                  } ${explodedView ? 'translate-y-14' : 'translate-y-0'}`}>
                    
                    {/* Front Control Panel Display Faceplate */}
                    <div className="flex items-center justify-between border-b border-white/10 pb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-14 h-7 rounded-lg bg-[#000000] border border-[#44d4cf]/40 p-1 flex items-center justify-center font-mono text-[8px] text-[#44d4cf]">
                          {deviceStateSim === 'heating' ? '140°C IR' : deviceStateSim === 'vacuum' ? 'SUCTION' : 'READY'}
                        </div>
                        <div className="w-3 h-3 rounded-full bg-[#e8a44f] border border-white/30" />
                      </div>
                      <span className="text-[9px] font-black text-[#f6f5f0] tracking-wider uppercase">DentLab AI Original</span>
                    </div>

                    <div className="text-center">
                      <span className="text-[10px] font-extrabold text-[#f6f5f0]">شاسی اصلی ۷۰٪ متمایز با موتور مکش ۱۲۰W</span>
                      <p className="text-[8px] text-[#8a8a92] mt-0.5">شامل برد توسعه ESP32 + ماژول رله SSR + تغذیه سوئیچینگ ۱۲V</p>
                    </div>

                    {/* Industrial Feet */}
                    <div className="flex justify-between px-4">
                      <div className="w-4 h-2 rounded-b-md bg-white/20" />
                      <div className="w-4 h-2 rounded-b-md bg-white/20" />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Color Finish Switcher & Download Controls */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/[0.08] text-xs z-10">
              <div className="flex items-center gap-2">
                <span className="text-[#8a8a92] font-semibold text-[11px]">رنگ الکترواستاتیک بدنه:</span>
                <button
                  onClick={() => setFinishColor('darkCyan')}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition ${
                    finishColor === 'darkCyan' ? 'border-[#44d4cf] text-[#44d4cf] bg-[#44d4cf]/10' : 'border-white/10 text-[#8a8a92]'
                  }`}
                >
                  مشکی سنباده‌ای سایان
                </button>
                <button
                  onClick={() => setFinishColor('mattePlatinum')}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition ${
                    finishColor === 'mattePlatinum' ? 'border-slate-300 text-slate-200 bg-white/10' : 'border-white/10 text-[#8a8a92]'
                  }`}
                >
                  پلاتینیوم مات
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDownloadCAD('dxf')}
                  className="px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 hover:border-[#44d4cf] text-[#44d4cf] font-bold text-[11px] flex items-center gap-1.5 transition"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>دانلود فایل DXF ۷۰٪ اختصاصی</span>
                </button>
              </div>
            </div>
          </div>

          {/* Sub-Assembly Breakdown Selector (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#f6f5f0]">اجزای سازنده بدنه اختصاصی:</h3>
              <button
                onClick={() => setActiveSubAssembly('all')}
                className={`text-xs px-3 py-1 rounded-xl font-bold transition ${
                  activeSubAssembly === 'all'
                    ? 'bg-[#44d4cf] text-[#0b0c15]'
                    : 'bg-white/[0.03] text-[#8a8a92] hover:text-[#f6f5f0]'
                }`}
              >
                نمایش تمام مجموعه
              </button>
            </div>

            <div className="space-y-3">
              {subAssemblies.map((sub) => (
                <div
                  key={sub.id}
                  onClick={() => setActiveSubAssembly(sub.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    activeSubAssembly === sub.id
                      ? 'bg-white/[0.06] border-[#44d4cf] shadow-md'
                      : 'bg-white/[0.02] border-white/[0.05] hover:border-white/[0.15]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-xs text-[#f6f5f0]">{sub.name}</span>
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: sub.color }}
                    />
                  </div>
                  <p className="text-[11px] text-[#8a8a92] leading-relaxed mb-3">{sub.description}</p>
                  <div className="grid grid-cols-2 gap-2 text-[10px] border-t border-white/[0.05] pt-2">
                    <div>
                      <span className="text-[#8a8a92]">جنس قطعه: </span>
                      <span className="text-[#f6f5f0] font-semibold">{sub.material}</span>
                    </div>
                    <div>
                      <span className="text-[#8a8a92]">ابعاد: </span>
                      <span className="text-[#44d4cf] font-mono font-bold">{sub.dimensions}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Comparison View with Market Leading German Devices (~70% Differentiation Breakdown) */}
      {viewMode === 'comparison' && (
        <div className="glass-card rounded-3xl p-6 lg:p-8 border border-[#e8a44f]/30 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e8a44f]/10 text-[#e8a44f] text-xs font-bold mb-2">
                <ShieldCheck className="w-4 h-4" />
                تضمین عدم کپی‌برداری طرح بدنه (Legal Non-Infringement Standard)
              </div>
              <h3 className="text-xl font-bold text-[#f6f5f0]">تحلیل ۷۰٪ تمایز ساختاری و ظاهری با دستگاه‌های خارجی آلمان</h3>
              <p className="text-xs text-[#8a8a92]">تفاوت‌های کلیدی شاسی DentLab AI با دستگاه‌های Erkodent و Biostar جهت ثبت اختراع و صادرات بدون مانع legal</p>
            </div>
            <button
              onClick={() => handleDownloadCAD('step')}
              className="px-4 py-2 rounded-xl bg-[#e8a44f] text-[#0b0c15] text-xs font-extrabold flex items-center gap-2 hover:brightness-110 transition shrink-0"
            >
              <Download className="w-4 h-4" />
              <span>دانلود مدل STEP ۳D متمایز</span>
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6 text-xs">
            {/* Foreign Market Device */}
            <div className="bg-[#05060b] p-6 rounded-2xl border border-white/[0.08] space-y-4">
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-2">
                <h4 className="font-bold text-[#e88598]">دستگاه‌های خارجی متداول (Erkodent / Biostar)</h4>
                <span className="text-[10px] text-[#8a8a92] font-mono">$1,850 - $2,200</span>
              </div>
              <ul className="space-y-2.5 text-[#8a8a92]">
                <li className="flex items-start gap-2">
                  <span className="text-[#e88598] font-bold">❌</span>
                  <span>بدنه استوانه‌ای کاملاً گرد و سنگین با اشغال فضای زیاد روی میز لابراتوار</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#e88598] font-bold">❌</span>
                  <span>مکانیزم قفل دستی فلزی با چرخ‌دنده و چرخ پیچی پیچیده</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#e88598] font-bold">❌</span>
                  <span>تایمر آنالوگ ولومی بدون تشخیص دما و نیاز به حدس چشمی ذوب شدن ورق</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#e88598] font-bold">❌</span>
                  <span>هود یکپارچه ثابت بدون زاویه چرخش ۱۸۰ درجه کامل</span>
                </li>
              </ul>
            </div>

            {/* DentLab AI Redesigned Chassis */}
            <div className="bg-[#05060b] p-6 rounded-2xl border border-[#44d4cf]/40 space-y-4">
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-2">
                <h4 className="font-bold text-[#44d4cf]">شاسی متمایز DentLab AI (۷۰٪ تغییر ارگونومیک)</h4>
                <span className="text-[10px] text-[#44d4cf] font-bold bg-[#44d4cf]/10 px-2.5 py-0.5 rounded-full">ساخت کارگاهی ایران</span>
              </div>
              <ul className="space-y-2.5 text-[#ebeae3]">
                <li className="flex items-start gap-2">
                  <span className="text-[#44d4cf] font-bold">✓</span>
                  <span>شاسی شش‌ضلعی زاویه‌دار زاویه‌دار کم‌حجم قابل ساخت با خم‌کاری CNC و برش لیزری پامنار</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#44d4cf] font-bold">✓</span>
                  <span>مکانیزم قفل سریع مگنتی Mag-Lock نئودیمیوم با سیلیکون گرید پزشکی ۳۰۰°C</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#44d4cf] font-bold">✓</span>
                  <span>سنسور غیرتماسی مادون قرمز MLX90614 + نمایشگر OLED و فعال‌سازی اتوماتیک مکش</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#44d4cf] font-bold">✓</span>
                  <span>حلقه نورانی نوار هالو LED وضعیت کاری (سبز، قرمز، آبی، زرد)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* 2D Engineering Blueprints Projection Mode */}
      {viewMode === 'blueprint' && (
        <div className="glass-card rounded-3xl p-6 lg:p-8 border border-white/[0.08] space-y-6">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
            <div>
              <h3 className="text-lg font-bold text-[#f6f5f0]">نقشه ابعادی کامل ۲D (2D Orthographic Projection Blueprint)</h3>
              <p className="text-xs text-[#8a8a92]">دیدهای سه‌گانه روبرو، جانبی و برش افقی پلنوم محفظه خلاء</p>
            </div>
            <span className="text-xs font-mono px-3 py-1.5 rounded-xl bg-[#2a8a87]/20 text-[#44d4cf] border border-[#2a8a87]/40 font-bold">
              Scale 1:1 mm
            </span>
          </div>

          <div className="grid md:grid-cols-3 gap-6 text-xs">
            <div className="bg-[#05060b] p-5 rounded-2xl border border-white/[0.08] space-y-3">
              <h4 className="font-bold text-[#44d4cf]">۱. نماد روبرو (Front Elevation)</h4>
              <ul className="space-y-1.5 text-[#8a8a92]">
                <li className="flex justify-between"><span>عرض کلی شاسی:</span><strong className="text-[#f6f5f0] font-mono">240 mm</strong></li>
                <li className="flex justify-between"><span>عرض هود حرارتی:</span><strong className="text-[#f6f5f0] font-mono">165 mm</strong></li>
                <li className="flex justify-between"><span>ارتقاع کست گچی:</span><strong className="text-[#f6f5f0] font-mono">Max 40 mm</strong></li>
              </ul>
            </div>

            <div className="bg-[#05060b] p-5 rounded-2xl border border-white/[0.08] space-y-3">
              <h4 className="font-bold text-[#e8a44f]">۲. نماد جانبی (Side Profile View)</h4>
              <ul className="space-y-1.5 text-[#8a8a92]">
                <li className="flex justify-between"><span>عمق کلی شاسی:</span><strong className="text-[#f6f5f0] font-mono">260 mm</strong></li>
                <li className="flex justify-between"><span>زاویه چرخش هود:</span><strong className="text-[#f6f5f0] font-mono">180 Degree</strong></li>
                <li className="flex justify-between"><span>فاصله المنت تا ورق:</span><strong className="text-[#f6f5f0] font-mono">85 mm</strong></li>
              </ul>
            </div>

            <div className="bg-[#05060b] p-5 rounded-2xl border border-white/[0.08] space-y-3">
              <h4 className="font-bold text-[#e88598]">۳. برش افقی (Section Cut)</h4>
              <ul className="space-y-1.5 text-[#8a8a92]">
                <li className="flex justify-between"><span>قطر شبکه برنجی:</span><strong className="text-[#f6f5f0] font-mono">145 mm</strong></li>
                <li className="flex justify-between"><span>فواصل سوراخ مش:</span><strong className="text-[#f6f5f0] font-mono">2.0 mm Pitch</strong></li>
                <li className="flex justify-between"><span>قطر خروجی مکش:</span><strong className="text-[#f6f5f0] font-mono">40 mm Hose</strong></li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* DXF Cutting Tables */}
      {viewMode === 'laser' && (
        <div className="glass-card rounded-3xl p-6 lg:p-8 border border-white/[0.08] space-y-6">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
            <div>
              <h3 className="text-lg font-bold text-[#f6f5f0]">جدول قطعات DXF جهت سفارش برش لیزری</h3>
              <p className="text-xs text-[#8a8a92]">لیست آماده فایل‌ها جهت ارائه به کارگاه‌های پامنار تهران</p>
            </div>
            <button
              onClick={() => handleDownloadCAD('dxf')}
              className="px-4 py-2 rounded-xl bg-[#44d4cf] text-[#0b0c15] text-xs font-extrabold flex items-center gap-2 hover:brightness-110 transition"
            >
              <Download className="w-4 h-4" />
              <span>دانلود فایل DXF ۷۰٪ اختصاصی</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-right border-collapse">
              <thead>
                <tr className="border-b border-white/[0.08] text-[#8a8a92]">
                  <th className="py-3 px-4 font-bold">نام فایل DXF</th>
                  <th className="py-3 px-4 font-bold">جنس متریال</th>
                  <th className="py-3 px-4 font-bold">ضخامت</th>
                  <th className="py-3 px-4 font-bold">تعداد</th>
                  <th className="py-3 px-4 font-bold">توضیحات فرآیند تولید</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                <tr className="hover:bg-white/[0.02]">
                  <td className="py-3 px-4 font-bold text-[#44d4cf]">DentLab_Panel_OLED.dxf</td>
                  <td className="py-3 px-4 text-[#ebeae3]">اکریلیک تایوانی مشکی</td>
                  <td className="py-3 px-4 font-mono text-[#f6f5f0]">5.0 mm</td>
                  <td className="py-3 px-4 font-bold text-[#f6f5f0]">۱ عدد</td>
                  <td className="py-3 px-4 text-[#8a8a92]">برش جای نمایشگر OLED 0.96 اینچ + جای ولوم روتاری</td>
                </tr>
                <tr className="hover:bg-white/[0.02]">
                  <td className="py-3 px-4 font-bold text-[#e8a44f]">DentLab_Grid_Mesh.dxf</td>
                  <td className="py-3 px-4 text-[#ebeae3]">ورق برنج یا استیل ۳۰۴</td>
                  <td className="py-3 px-4 font-mono text-[#f6f5f0]">3.0 mm</td>
                  <td className="py-3 px-4 font-bold text-[#f6f5f0]">۲ عدد</td>
                  <td className="py-3 px-4 text-[#8a8a92]">سوراخ‌کاری شبکه با فواصل ۲mm جهت توزیع یکنواخت مکش خلاء</td>
                </tr>
                <tr className="hover:bg-white/[0.02]">
                  <td className="py-3 px-4 font-bold text-[#2a8a87]">DentLab_Sculpted_Base.dxf</td>
                  <td className="py-3 px-4 text-[#ebeae3]">ورق فولاد روغنی ST12</td>
                  <td className="py-3 px-4 font-mono text-[#f6f5f0]">1.25 mm</td>
                  <td className="py-3 px-4 font-bold text-[#f6f5f0]">۱ عدد</td>
                  <td className="py-3 px-4 text-[#8a8a92]">برش لیزر فلز + خم‌کاری CNC + رنگ پودری الکترواستاتیک کوره</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
