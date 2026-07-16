import React, { useState } from 'react';
import { 
  Box, Eye, Layers, Maximize2, Move,
  Compass, ShieldAlert, FileCode
} from 'lucide-react';

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
  const [viewMode, setViewMode] = useState<'3d' | 'blueprint' | 'laser'>('3d');
  const [explodedView, setExplodedView] = useState<boolean>(false);

  const subAssemblies: SubAssembly[] = [
    {
      id: 'hood',
      name: 'هود چرخشی هیتینگ (Swivel IR Hood)',
      description: 'هود آلومینیومی بازتابنده حرارت دارای المنت ۱۰۰۰ وات سرامیکی و سنسور مادون قرمز غیرتماسی MLX90614 در مرکز',
      material: 'ورق آلومینیوم فرم‌دهی شده ۱.۵mm + نوار عایق نسوز نسوز سرامیکی',
      dimensions: 'قطر ۱۶۰mm × ارتفاع ۸۰mm',
      color: '#e8a44f',
      activeIn3d: true,
    },
    {
      id: 'clamp',
      name: 'مکانیزم گیره دوگانه قفل سریع (Quick-Lock Ring)',
      description: 'رینگ فولادی قفل‌شونده با اهرم بادامکی جهت تثبیت محکم ورق PETG به اندازه ۱۲۰×۱۲۰mm یا دایره ۱۲۵mm',
      material: 'استیل ۳۰۴ ضدزنگ با واشر سیلیکونی گرید غذایی 300°C',
      dimensions: 'قطر خارجی ۱۵۰mm × قطر داخلی ۱۱۰mm',
      color: '#44d4cf',
      activeIn3d: true,
    },
    {
      id: 'chamber',
      name: 'محفظه وکیوم و صفحه مشبک برنجی (Vacuum Chamber)',
      description: 'محفظه فشار منفی دارای توری متخلخل برنجی جهت توزیع یکنواخت مکش زیر مدل گچی دندان',
      material: 'اکریلیک ۵mm شفاف تایوانی / آلیاژ برنج ۳mm',
      dimensions: '۱۴۰×۱۴۰mm × عمق ۴۰mm',
      color: '#2a8a87',
      activeIn3d: true,
    },
    {
      id: 'base',
      name: 'شاسی اصلی و باکس پاور (Main Steel Base Chassis)',
      description: 'باکس محفظه زیرین خنک‌شونده شامل موتور مکش ۱۲۰۲ وات، برد PCB اصلی ESP32، منبع تغذیه ۱۲V و رله SSR',
      material: 'ورق فولادی روغنی ۱.۲5mm با رنگ الکترواستاتیک کوره مشکی سنباده‌ای',
      dimensions: '۲۴۰mm (عرض) × ۲۶۰mm (عمق) × ۲۰۰mm (ارتفاع)',
      color: '#8a8a92',
      activeIn3d: true,
    },
  ];

  return (
    <div className="space-y-8">
      {/* CAD Header Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white/[0.02] border border-white/[0.08] p-5 rounded-3xl">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#44d4cf] mb-1">
            <Box className="w-4 h-4" />
            استودیوی طراحی مکانیکی و شاسی (CAD & Mechanical Design Studio)
          </div>
          <h2 className="text-xl font-bold text-[#f6f5f0]">طراحی سه بعدی و نقشه ساخت بدنه وکیوم فرمر</h2>
          <p className="text-xs text-[#8a8a92]">قابل ساخت با برش لیزر اکریلیک، CNC و ورق‌کاری آهنی در تهران</p>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-1.5 bg-black/40 p-1.5 rounded-2xl border border-white/[0.08]">
          <button
            onClick={() => setViewMode('3d')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              viewMode === '3d' ? 'bg-[#44d4cf] text-[#0b0c15]' : 'text-[#8a8a92] hover:text-[#f6f5f0]'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            شبیه‌ساز سه بعدی (3D Render)
          </button>
          <button
            onClick={() => setViewMode('blueprint')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              viewMode === 'blueprint' ? 'bg-[#44d4cf] text-[#0b0c15]' : 'text-[#8a8a92] hover:text-[#f6f5f0]'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            نقشه فنی مهندسی (Dimensions)
          </button>
          <button
            onClick={() => setViewMode('laser')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              viewMode === 'laser' ? 'bg-[#44d4cf] text-[#0b0c15]' : 'text-[#8a8a92] hover:text-[#f6f5f0]'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            نقشه برش لیزر (DXF Specs)
          </button>
        </div>
      </div>

      {/* Main CAD Viewer Panel */}
      {viewMode === '3d' && (
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Interactive 3D Assembly Stage (8 cols) */}
          <div className="lg:col-span-8 glass-card rounded-3xl p-6 border border-[#44d4cf]/20 relative min-h-[480px] flex flex-col justify-between overflow-hidden bg-[#05060b]">
            {/* Control HUD Bar */}
            <div className="flex items-center justify-between z-10">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#44d4cf] animate-ping" />
                <span className="text-xs font-mono text-[#44d4cf] font-bold">CAD Render v2.4 — Thermoformer Unit</span>
              </div>
              <button
                onClick={() => setExplodedView(!explodedView)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition flex items-center gap-1.5 ${
                  explodedView
                    ? 'bg-[#e8a44f]/20 border-[#e8a44f] text-[#e8a44f]'
                    : 'bg-white/[0.04] border-white/[0.1] text-[#8a8a92] hover:text-[#f6f5f0]'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>{explodedView ? 'نمای انفجاری (Exploded View Active)' : 'نمای مونتاژ شده (Assembled)'}</span>
              </button>
            </div>

            {/* Visual Mechanical Graphic Assembly */}
            <div className="my-8 relative h-80 flex items-center justify-center">
              {/* Outer Grid lines for CAD feel */}
              <div className="absolute inset-0 bg-[radial-gradient(#2a8a87_1px,transparent_1px)] [background-size:16px_16px] opacity-15 pointer-events-none" />

              {/* Exploded / Assembled Mechanical Render */}
              <div className="relative w-72 flex flex-col items-center justify-center transition-all duration-700">
                
                {/* 1. IR Heating Hood Top Assembly */}
                {(activeSubAssembly === 'all' || activeSubAssembly === 'hood') && (
                  <div className={`w-48 h-20 rounded-t-full border-2 border-[#e8a44f] bg-gradient-to-b from-[#e8a44f]/20 to-transparent flex flex-col items-center justify-center transition-all duration-500 shadow-[0_0_25px_rgba(232,164,79,0.2)] ${
                    explodedView ? '-translate-y-12' : 'translate-y-0'
                  }`}>
                    <div className="w-6 h-3 rounded-t-sm bg-[#e8a44f] mb-1" />
                    <span className="text-[10px] font-bold text-[#e8a44f]">هود المنت ۱۰۰۰W + سنسور IR</span>
                    <span className="text-[8px] text-[#8a8a92]">MLX90614 Non-Contact Sensor</span>
                  </div>
                )}

                {/* Vertical Support Arm Axis */}
                <div className={`w-2 h-40 bg-white/[0.15] absolute right-4 transition-all duration-500 rounded-full ${
                  explodedView ? 'opacity-40' : 'opacity-80'
                }`} />

                {/* Gap in exploded view */}
                <div className={`transition-all duration-500 ${explodedView ? 'h-8' : 'h-1'}`} />

                {/* 2. PETG Sheet Clamping Ring Mechanism */}
                {(activeSubAssembly === 'all' || activeSubAssembly === 'clamp') && (
                  <div className={`w-56 h-10 rounded-2xl border-2 border-[#44d4cf] bg-[#44d4cf]/10 flex items-center justify-between px-4 transition-all duration-500 shadow-[0_0_20px_rgba(68,212,207,0.15)] ${
                    explodedView ? '-translate-y-4' : 'translate-y-0'
                  }`}>
                    <div className="w-4 h-4 rounded-full border border-[#44d4cf] bg-[#0b0c15]" />
                    <span className="text-[10px] font-bold text-[#44d4cf]">رینگ و اهرم بادامکی نگهدارنده ورق PETG</span>
                    <div className="w-4 h-4 rounded-full border border-[#44d4cf] bg-[#0b0c15]" />
                  </div>
                )}

                <div className={`transition-all duration-500 ${explodedView ? 'h-8' : 'h-1'}`} />

                {/* 3. Vacuum Chamber & Brass Grid Mesh */}
                {(activeSubAssembly === 'all' || activeSubAssembly === 'chamber') && (
                  <div className={`w-52 h-12 border-2 border-[#2a8a87] bg-[#2a8a87]/20 flex flex-col items-center justify-center rounded-lg transition-all duration-500 ${
                    explodedView ? 'translate-y-4' : 'translate-y-0'
                  }`}>
                    <div className="w-36 h-2 bg-gradient-to-r from-yellow-600/60 via-amber-400/80 to-yellow-600/60 rounded-full mb-1" />
                    <span className="text-[10px] font-bold text-[#44d4cf]">توری مشبک برنجی + محفظه خلاء</span>
                  </div>
                )}

                <div className={`transition-all duration-500 ${explodedView ? 'h-8' : 'h-1'}`} />

                {/* 4. Base Chassis Box */}
                {(activeSubAssembly === 'all' || activeSubAssembly === 'base') && (
                  <div className={`w-64 h-28 rounded-b-3xl border-2 border-white/[0.2] bg-[#12131a] p-4 flex flex-col justify-between transition-all duration-500 ${
                    explodedView ? 'translate-y-12' : 'translate-y-0'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-6 rounded bg-[#44d4cf]/20 border border-[#44d4cf]/40 flex items-center justify-center text-[8px] font-mono text-[#44d4cf]">
                        OLED UI
                      </div>
                      <div className="w-4 h-4 rounded-full bg-[#e8a44f]" />
                    </div>
                    <div className="text-center">
                      <span className="text-[10px] font-bold text-[#f6f5f0]">شاسی اصلی و موتور مکش ۱۲۰W</span>
                      <p className="text-[8px] text-[#8a8a92]">شامل برد ESP32 + پاور ۱۲V + رله SSR 40A</p>
                    </div>
                    <div className="flex justify-around">
                      <div className="w-3 h-2 rounded bg-white/[0.2]" />
                      <div className="w-3 h-2 rounded bg-white/[0.2]" />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Controls */}
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs pt-4 border-t border-white/[0.08] text-[#8a8a92] z-10">
              <div className="flex items-center gap-2">
                <Move className="w-4 h-4 text-[#44d4cf]" />
                <span>نمای سه بعدی قابل تفکیک به اجزای سازنده</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[10px] px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/[0.08]">
                  مقیاس 1:1 میلیمتر
                </span>
                <span className="text-[10px] px-2.5 py-1 rounded-full bg-[#44d4cf]/10 text-[#44d4cf] font-bold border border-[#44d4cf]/30">
                  فرمت فایل: STEP / IGES / DXF
                </span>
              </div>
            </div>
          </div>

          {/* Sub-Assembly Breakdown Selector (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#f6f5f0]">تفکیک قطعات بدنه:</h3>
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

      {/* Engineering Dimensions Blueprint Mode */}
      {viewMode === 'blueprint' && (
        <div className="glass-card rounded-3xl p-6 lg:p-8 border border-white/[0.08] space-y-6">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
            <div>
              <h3 className="text-lg font-bold text-[#f6f5f0]">نقشه ابعادی دقیق ساخت شاسی و هود حرارتی</h3>
              <p className="text-xs text-[#8a8a92]">اندازه‌گذاری کامل بر حسب میلی‌متر مطابق استانداردهای ساخت صنعتی</p>
            </div>
            <span className="text-xs font-mono px-3 py-1.5 rounded-xl bg-[#2a8a87]/20 text-[#44d4cf] border border-[#2a8a87]/40">
              Tolerance: ±0.1mm
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-6 text-xs">
            <div className="bg-[#05060b] p-6 rounded-2xl border border-white/[0.08] space-y-4">
              <h4 className="font-bold text-[#e8a44f] flex items-center gap-2">
                <Maximize2 className="w-4 h-4" />
                ۱. ابعاد هود حرارتی چرخشی (IR Hood Assembly)
              </h4>
              <ul className="space-y-2 text-[#8a8a92]">
                <li className="flex justify-between py-1 border-b border-white/[0.04]">
                  <span>قطر بیرونی هود:</span>
                  <strong className="text-[#f6f5f0] font-mono">160.0 mm</strong>
                </li>
                <li className="flex justify-between py-1 border-b border-white/[0.04]">
                  <span>فاصله المنت حرارتی تا ورق پلاستیک:</span>
                  <strong className="text-[#44d4cf] font-mono">85.0 mm (بهینه برای گرمایش یکنواخت)</strong>
                </li>
                <li className="flex justify-between py-1 border-b border-white/[0.04]">
                  <span>محل قرارگیری سنسور IR MLX90614:</span>
                  <strong className="text-[#f6f5f0] font-mono">مرکز هود با زاویه دید FOV 35°</strong>
                </li>
                <li className="flex justify-between py-1">
                  <span>شعاع دوران بازوی هود:</span>
                  <strong className="text-[#f6f5f0] font-mono">180° چرخش افقی جهت دسترسی آسان</strong>
                </li>
              </ul>
            </div>

            <div className="bg-[#05060b] p-6 rounded-2xl border border-white/[0.08] space-y-4">
              <h4 className="font-bold text-[#44d4cf] flex items-center gap-2">
                <Maximize2 className="w-4 h-4" />
                ۲. ابعاد شاسی مکعبی زیرین (Base Cabinet Chassis)
              </h4>
              <ul className="space-y-2 text-[#8a8a92]">
                <li className="flex justify-between py-1 border-b border-white/[0.04]">
                  <span>عرض کلی شاسی:</span>
                  <strong className="text-[#f6f5f0] font-mono">240.0 mm</strong>
                </li>
                <li className="flex justify-between py-1 border-b border-white/[0.04]">
                  <span>عمق شاسی:</span>
                  <strong className="text-[#f6f5f0] font-mono">260.0 mm</strong>
                </li>
                <li className="flex justify-between py-1 border-b border-white/[0.04]">
                  <span>ارتفاع باکس زیرین:</span>
                  <strong className="text-[#f6f5f0] font-mono">200.0 mm</strong>
                </li>
                <li className="flex justify-between py-1">
                  <span>دهانه خروجی هوای موتور وکیوم:</span>
                  <strong className="text-[#f6f5f0] font-mono">قطر 40mm با فیلتر اسفنجی نسوز</strong>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* DXF Laser Cut Specifications Mode */}
      {viewMode === 'laser' && (
        <div className="glass-card rounded-3xl p-6 lg:p-8 border border-white/[0.08] space-y-6">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
            <div>
              <h3 className="text-lg font-bold text-[#f6f5f0]">جدول برش لیزری کارگاهی (Laser Cutting DXF Table)</h3>
              <p className="text-xs text-[#8a8a92]">لیست قطعات قابل تحویل به کارگاه‌های برش لیزری پامنار یا خیابان فتح</p>
            </div>
            <span className="text-xs px-3 py-1.5 rounded-xl bg-[#e8a44f]/20 text-[#e8a44f] border border-[#e8a44f]/40 font-bold">
              فرمت فایل خروجی: CAD AutoCAD .DXF
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-right border-collapse">
              <thead>
                <tr className="border-b border-white/[0.08] text-[#8a8a92]">
                  <th className="py-3 px-4 font-bold">نام قطعه DXF</th>
                  <th className="py-3 px-4 font-bold">جنس متریال</th>
                  <th className="py-3 px-4 font-bold">ضخامت</th>
                  <th className="py-3 px-4 font-bold">تعداد</th>
                  <th className="py-3 px-4 font-bold">توضیحات فرآیند تولید</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                <tr className="hover:bg-white/[0.02]">
                  <td className="py-3 px-4 font-bold text-[#44d4cf]">Panel_Front_Display.dxf</td>
                  <td className="py-3 px-4 text-[#ebeae3]">اکریلیک تایوانی مشکی</td>
                  <td className="py-3 px-4 font-mono text-[#f6f5f0]">5.0 mm</td>
                  <td className="py-3 px-4 font-bold text-[#f6f5f0]">۱ عدد</td>
                  <td className="py-3 px-4 text-[#8a8a92]">برش جای نمایشگر OLED 0.96 اینچ + ولوم روتاری encoder</td>
                </tr>
                <tr className="hover:bg-white/[0.02]">
                  <td className="py-3 px-4 font-bold text-[#e8a44f]">Vacuum_Grid_Plates.dxf</td>
                  <td className="py-3 px-4 text-[#ebeae3]">ورق برنج یا استیل ۳۰۴</td>
                  <td className="py-3 px-4 font-mono text-[#f6f5f0]">3.0 mm</td>
                  <td className="py-3 px-4 font-bold text-[#f6f5f0]">۲ عدد</td>
                  <td className="py-3 px-4 text-[#8a8a92]">سوراخ‌کاری شبکه با فواصل ۲mm جهت توزیع یکنواخت مکش خلاء</td>
                </tr>
                <tr className="hover:bg-white/[0.02]">
                  <td className="py-3 px-4 font-bold text-[#2a8a87]">Base_Box_Folding.dxf</td>
                  <td className="py-3 px-4 text-[#ebeae3]">ورق فولاد روغنی ST12</td>
                  <td className="py-3 px-4 font-mono text-[#f6f5f0]">1.25 mm</td>
                  <td className="py-3 px-4 font-bold text-[#f6f5f0]">۱ عدد</td>
                  <td className="py-3 px-4 text-[#8a8a92]">برش لیزر فلز + خم‌کاری CNC + رنگ پودری الکترواستاتیک کوره</td>
                </tr>
                <tr className="hover:bg-white/[0.02]">
                  <td className="py-3 px-4 font-bold text-[#e88598]">Clamping_Ring_Upper.dxf</td>
                  <td className="py-3 px-4 text-[#ebeae3]">آلومینیوم آنودایز شده</td>
                  <td className="py-3 px-4 font-mono text-[#f6f5f0]">4.0 mm</td>
                  <td className="py-3 px-4 font-bold text-[#f6f5f0]">۱ عدد</td>
                  <td className="py-3 px-4 text-[#8a8a92]">رینگ قفل‌کننده ورق با واشر سیلیکونی گرید غذایی نسوز</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Safety Alert Banner */}
      <div className="p-5 rounded-2xl bg-[#44d4cf]/10 border border-[#44d4cf]/20 flex items-start gap-3.5 text-xs">
        <ShieldAlert className="w-5 h-5 text-[#44d4cf] shrink-0 mt-0.5" />
        <div>
          <p className="font-bold text-[#f6f5f0] mb-0.5">الزامات مکانیکی و حرارتی ایمنی کارگاهی:</p>
          <p className="text-[#8a8a92]">
            حتماً در فاصله بین المنت حرارتی ۱۰۰۰ وات و شاسی الکترونیکی، یک لایه پشم سرامیک نسوز ۱۰ میلی‌متری قرار دهید تا گرما به برد ESP32 و رله‌های SSR منتقل نشود.
          </p>
        </div>
      </div>
    </div>
  );
};
