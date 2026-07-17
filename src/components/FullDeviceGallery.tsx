import React, { useState } from 'react';
import { Eye, Box, Maximize2, Sparkles, CheckCircle2, ChevronRight, ChevronLeft, Layers, Cpu, ScanLine, Package, Palette, Download } from 'lucide-react';
import { downloadTextFile, CAD_DXF_TEMPLATES } from '../utils/fileDownloader';

export const FULL_DEVICES = [
  {
    id: 'thermoformer',
    num: '1',
    title: 'دستگاه وکیوم فرمر هوشمند رومیزی',
    subtitle: 'AI Smart Dental Thermoforming Unit',
    fullImage: '/images/full_thermoformer.jpg',
    explodedImage: '/images/exploded_thermoformer.jpg',
    actionImage: '/images/thermoformer.jpg',
    dxfKey: 'thermoformer' as const,
    dimensions: '۲۴۰mm (عرض) × ۲۶۰mm (عمق) × ۲۱۰mm (ارتفاع)',
    weight: '۴.۸ کیلوگرم',
    materials: 'ورق فولاد روغنی ST12 + خم‌کاری CNC + اکریلیک ۵mm تایوانی + آلومینیوم ۶۰۶۱',
    power: '۲۲۰V AC / ۱۰ مبار - المنت ۱۰۰۰W + موتور وکیوم ۱۲۰W',
    designHighlight: 'شاسی شش‌ضلعی زاویه‌دار (۷۰٪ متمایز از Erkodent آلمان)، هود چرخشی ۱۸۰ درجه، رینگ مغناطیسی Mag-Lock و هالو LED دور بازو',
    icon: Cpu,
    accentColor: '#44d4cf',
    badge: 'پولسازترین تجهیزات کارگاهی',
  },
  {
    id: 'impression',
    num: '2',
    title: 'باکس نور و اسکنر کیفیت قالب دندان',
    subtitle: 'AI Dental Impression Lightbox Device',
    fullImage: '/images/full_impression_box.jpg',
    explodedImage: '/images/exploded_impression_box.jpg',
    actionImage: '/images/impression_scanner.jpg',
    dxfKey: 'impressionBox' as const,
    dimensions: '۳۰۰mm (عرض) × ۳۰۰mm (عمق) × ۲۵۰mm (ارتفاع)',
    weight: '۱.۸ کیلوگرم',
    materials: 'پلکسی‌گلاس دو جداره ۵mm مات شیری + لنز اپتیکی + پایه آلومینیومی دوربین',
    power: '۱۲V DC ۵A - نوار LED SMD ۵۶۳۰ با کلوین کالیبره CRI>95',
    designHighlight: 'محفظه لایت‌باکس مکعبی ایزوله نور با دوربین مایکرو 1080p فوق‌عریض و الگوریتم بینایی ماشین YOLOv8 روی موبایل',
    icon: ScanLine,
    accentColor: '#e8a44f',
    badge: 'صفر تحریم و نرم‌افزار خالص',
  },
  {
    id: 'autoclave',
    num: '3',
    title: 'دستگاه لاگر اتوکلاو و پرینتر برچسب استریل',
    subtitle: 'Autoclave Cycle Tracker & Thermal QR Device',
    fullImage: '/images/full_autoclave_logger.jpg',
    explodedImage: '/images/autoclave_logger.jpg',
    actionImage: '/images/autoclave_logger.jpg',
    dxfKey: 'autoclaveLogger' as const,
    dimensions: '۱۴۰mm (عرض) × ۱۲۰mm (عمق) × ۸۰mm (ارتفاع)',
    weight: '۸۵۰ گرم',
    materials: 'باکس صنعتی ABS ریل DIN + پرینتر حرارتی ۲ اینچی TTL چسبدار',
    power: '۱۲V DC ۲A + کابل شیلددار ترموکوپل K ضدزنگ تا ۴۰۰°C',
    designHighlight: 'پاسخگویی به الزامات استریل جدید اروپا MDR، چاپ آنی QR چسبدار حاوی تاریخ انقضا و نام ابزار روی پاکت',
    icon: Package,
    accentColor: '#e88598',
    badge: 'تاییدیه بهداشت و بازرسی مطب',
  },
  {
    id: 'shade',
    num: '4',
    title: 'کیت کالیبراسیون و اپ تطبیق رنگ VITA',
    subtitle: 'VITA Shade AI Matcher & Graycard Kit',
    fullImage: '/images/full_shade_kit.jpg',
    explodedImage: '/images/full_shade_kit.jpg',
    actionImage: '/images/shade_matching.jpg',
    dxfKey: 'shadeCard' as const,
    dimensions: 'کارت: ۸۵mm × ۵۵mm | پایه تبلت: ۱۵۰mm × ۱۲۰mm',
    weight: '۳۵۰ گرم',
    materials: 'پلی‌کربنات سنباده‌ای مات ضد خش و مقاوم در برابر اتوکلاو',
    power: 'بدون نیاز به برق - تغذیه نرم‌افزاری با دوربین موبایل/تبلت',
    designHighlight: 'کارت طوسی ۱۸٪ با متریال سینتتیک کالیبره شده + مدل پایتون CIELAB Delta-E جهت حذف کامل نور زرد یونیت',
    icon: Palette,
    accentColor: '#e8bf82',
    badge: 'درآمد ماهیانه مستمر SaaS',
  },
];

export const FullDeviceGallery: React.FC = () => {
  const [activeDeviceIdx, setActiveDeviceIdx] = useState<number>(0);
  const [viewTab, setViewTab] = useState<'fullPhoto' | 'explodedPhoto' | 'actionPhoto'>('fullPhoto');
  const [zoomModalImage, setZoomModalImage] = useState<string | null>(null);

  const currentDev = FULL_DEVICES[activeDeviceIdx];

  const handleNext = () => {
    setActiveDeviceIdx((prev) => (prev + 1) % FULL_DEVICES.length);
  };

  const handlePrev = () => {
    setActiveDeviceIdx((prev) => (prev - 1 + FULL_DEVICES.length) % FULL_DEVICES.length);
  };

  return (
    <div className="glass-card rounded-3xl p-6 lg:p-8 border border-white/[0.08] space-y-8">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#44d4cf]/10 text-[#44d4cf] text-xs font-bold mb-2">
            <Eye className="w-4 h-4" />
            نمایش تصویر کلی و کامل تمام دستگاه‌ها (Full Device Product Showcase)
          </div>
          <h2 className="text-2xl font-black text-[#f6f5f0]">گالری تصویر کلی و صنعتی کامل ۴ دستگاه</h2>
          <p className="text-xs text-[#8a8a92] mt-1">
            مشاهده نمای کامل بدنه، شاسی، ابعاد و ظاهر فیزیکی دستگاه‌ها پیش از تولید کارگاهی
          </p>
        </div>

        {/* View Switcher: Full Body Photo vs Exploded Assembly View vs Clinical Photo */}
        <div className="flex items-center gap-1.5 bg-black/40 p-1.5 rounded-2xl border border-white/[0.08]">
          <button
            onClick={() => setViewTab('fullPhoto')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              viewTab === 'fullPhoto' ? 'bg-[#44d4cf] text-[#0b0c15]' : 'text-[#8a8a92] hover:text-[#f6f5f0]'
            }`}
          >
            <Box className="w-3.5 h-3.5" />
            تصویر کامل بدنه (Full Standalone)
          </button>
          <button
            onClick={() => setViewTab('explodedPhoto')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              viewTab === 'explodedPhoto' ? 'bg-[#e8a44f] text-[#0b0c15]' : 'text-[#8a8a92] hover:text-[#f6f5f0]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            نمای انفجاری تفکیک قطعات (Exploded)
          </button>
          <button
            onClick={() => setViewTab('actionPhoto')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              viewTab === 'actionPhoto' ? 'bg-[#e88598] text-[#0b0c15]' : 'text-[#8a8a92] hover:text-[#f6f5f0]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            محیط کارگاهی/مطب
          </button>
        </div>
      </div>

      {/* Device Selection Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {FULL_DEVICES.map((dev, idx) => {
          const DevIcon = dev.icon;
          const isActive = idx === activeDeviceIdx;
          return (
            <button
              key={dev.id}
              onClick={() => setActiveDeviceIdx(idx)}
              className={`p-3.5 rounded-2xl border transition-all text-right flex items-center gap-3 ${
                isActive
                  ? 'bg-white/[0.08] border-[#44d4cf] shadow-lg ring-1 ring-[#44d4cf]/50'
                  : 'bg-white/[0.02] border-white/[0.05] hover:border-white/[0.15]'
              }`}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: `${dev.accentColor}20`, border: `1px solid ${dev.accentColor}40` }}
              >
                <DevIcon className="w-5 h-5" style={{ color: dev.accentColor }} />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] text-[#8a8a92] block font-bold">دستگاه شماره {dev.num}</span>
                <p className="text-xs font-bold text-[#f6f5f0] truncate">{dev.title}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Interactive Showcase Workspace */}
      <div className="grid lg:grid-cols-12 gap-8 items-center bg-[#05060b] p-6 lg:p-8 rounded-3xl border border-white/[0.08]">
        {/* Left Col: High-Res Photo Display Frame (7 Cols) */}
        <div className="lg:col-span-7 space-y-4 relative group">
          <div className="relative rounded-2xl overflow-hidden border border-white/10 h-80 lg:h-96 bg-black shadow-2xl img-shimmer">
            <img
              src={
                viewTab === 'fullPhoto' ? currentDev.fullImage :
                viewTab === 'explodedPhoto' ? currentDev.explodedImage :
                currentDev.actionImage
              }
              alt={currentDev.title}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
            
            {/* Dark gradient overlay & badges */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c15] via-transparent to-transparent opacity-60" />
            
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <span className="text-xs px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-[#f6f5f0] border border-white/20 font-bold">
                {viewTab === 'fullPhoto' && 'تصویر کلی و تمام‌رخ بدنه کامل'}
                {viewTab === 'explodedPhoto' && 'نمای انفجاری تفکیک قطعات مهندسی (Exploded View)'}
                {viewTab === 'actionPhoto' && 'تصویر حین کار در آزمایشگاه'}
              </span>
            </div>

            {/* Click to Zoom Trigger */}
            <button
              onClick={() => setZoomModalImage(
                viewTab === 'fullPhoto' ? currentDev.fullImage :
                viewTab === 'explodedPhoto' ? currentDev.explodedImage :
                currentDev.actionImage
              )}
              className="absolute bottom-4 left-4 p-2.5 rounded-xl bg-black/80 text-[#44d4cf] border border-white/20 hover:bg-[#44d4cf] hover:text-[#0b0c15] transition shadow-lg flex items-center gap-1.5 text-xs font-bold"
            >
              <Maximize2 className="w-4 h-4" />
              <span>بزرگ‌نمایی فول‌اسکرین</span>
            </button>
          </div>

          {/* Quick Nav Arrows Below Image */}
          <div className="flex items-center justify-between text-xs text-[#8a8a92] pt-1">
            <button
              onClick={handlePrev}
              className="flex items-center gap-1 hover:text-[#44d4cf] transition font-bold"
            >
              <ChevronRight className="w-4 h-4" />
              <span>دستگاه قبلی</span>
            </button>
            <span className="font-mono text-[11px]">
              {activeDeviceIdx + 1} از {FULL_DEVICES.length}
            </span>
            <button
              onClick={handleNext}
              className="flex items-center gap-1 hover:text-[#44d4cf] transition font-bold"
            >
              <span>دستگاه بعدی</span>
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Col: Device Specifications & Design Highlights (5 Cols) */}
        <div className="lg:col-span-5 space-y-5 text-xs">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10" style={{ color: currentDev.accentColor }}>
                دستگاه شماره {currentDev.num}
              </span>
              <span className="text-[10px] font-bold text-[#e8a44f] bg-[#e8a44f]/10 px-2.5 py-0.5 rounded-full border border-[#e8a44f]/20">
                {currentDev.badge}
              </span>
            </div>
            <h3 className="text-2xl font-black text-[#f6f5f0] mb-1">{currentDev.title}</h3>
            <p className="text-xs text-[#8a8a92] font-mono">{currentDev.subtitle}</p>
          </div>

          {/* Technical Spec List */}
          <div className="space-y-2.5">
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
              <p className="text-[10px] text-[#8a8a92] mb-0.5">ابعاد کلی بدنه (Dimensions):</p>
              <p className="font-bold text-[#44d4cf] font-mono">{currentDev.dimensions}</p>
            </div>

            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
              <p className="text-[10px] text-[#8a8a92] mb-0.5">متریال‌های ساخت شاسی:</p>
              <p className="font-semibold text-[#f6f5f0]">{currentDev.materials}</p>
            </div>

            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
              <p className="text-[10px] text-[#8a8a92] mb-0.5">مشخصات تغذیه و توان مصرفی:</p>
              <p className="font-mono text-[#e8a44f] font-bold">{currentDev.power}</p>
            </div>

            <div className="p-3 rounded-xl bg-[#2a8a87]/10 border border-[#2a8a87]/30">
              <p className="text-[10px] text-[#44d4cf] font-bold mb-1 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#44d4cf]" />
                نوآوری و تمایز طراحی ظاهری ایرانی:
              </p>
              <p className="text-[#ebeae3] leading-relaxed text-[11px]">{currentDev.designHighlight}</p>
            </div>
          </div>

          {/* Direct Download CAD Button */}
          <button
            onClick={() => downloadTextFile(`CAD_FullSpec_${currentDev.id}.dxf`, CAD_DXF_TEMPLATES[currentDev.dxfKey], 'text/plain;charset=utf-8')}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#2a8a87] to-[#44d4cf] text-[#0b0c15] font-extrabold text-xs flex items-center justify-center gap-2 hover:brightness-110 transition shadow-lg"
          >
            <Download className="w-4 h-4" />
            <span>دانلود نقشه CAD کامل بدنه ({currentDev.id}.dxf)</span>
          </button>
        </div>
      </div>

      {/* Fullscreen Modal Image Zoom */}
      {zoomModalImage && (
        <div
          onClick={() => setZoomModalImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-fade-in cursor-pointer"
        >
          <div className="relative max-w-5xl w-full max-h-[90vh]">
            <img
              src={zoomModalImage}
              alt="Expanded Full Standalone Device Photo"
              className="w-full h-auto max-h-[85vh] object-contain rounded-2xl border border-white/20 shadow-2xl mx-auto"
            />
            <p className="text-center text-xs text-[#8a8a92] mt-3">برای بستن، هر جای صفحه کلیک کنید</p>
          </div>
        </div>
      )}
    </div>
  );
};
