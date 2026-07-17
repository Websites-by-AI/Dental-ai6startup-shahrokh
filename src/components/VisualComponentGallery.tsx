import React, { useState } from 'react';
import { ShoppingCart, MapPin, Download, CheckCircle, Info } from 'lucide-react';
import { downloadTextFile, BOMS_CSV } from '../utils/fileDownloader';

export interface VisualPart {
  id: string;
  ref: string;
  nameFa: string;
  nameEn: string;
  specs: string;
  marketLocation: string;
  approxPriceFa: string;
  approxPriceUsd: string;
  category: 'electronics' | 'heating' | 'optics' | 'mechanical' | 'consumables';
  svgIllustration: React.ReactNode;
  detailsList: string[];
}

export const VISUAL_PARTS_DATABASE: Record<string, VisualPart> = {
  esp32: {
    id: 'esp32',
    ref: 'U1',
    nameFa: 'برد میکروکنترلر ESP32-WROOM-32D',
    nameEn: 'ESP32-WROOM-32 Microcontroller Development Board',
    specs: '30 Pins, Dual-Core 240MHz, Wi-Fi 802.11 b/g/n & Bluetooth BLE 4.2',
    marketLocation: 'پاساژ امجد - طبقه همکف (آفتاب رایانه / نادکو)',
    approxPriceFa: '۲۱۰,۰۰۰ تومان',
    approxPriceUsd: '$4.50',
    category: 'electronics',
    detailsList: [
      'پردازنده دو هسته‌ای 32 بیتی Tensilica Xtensa LX6',
      'حافظه ۴ مگابایت Flash + حافظه 520KB SRAM',
      'پشتیبانی مستقیم از گذرگاه‌های I2C, SPI, UART و PWM',
      'پین‌های استفاده شده: SDA=GPIO21, SCL=GPIO22, SSR=GPIO23, Relay=GPIO19'
    ],
    svgIllustration: (
      <svg viewBox="0 0 200 120" className="w-full h-auto drop-shadow-xl">
        {/* PCB Board Base */}
        <rect x="20" y="10" width="160" height="100" rx="6" fill="#1b4d3e" stroke="#2a8a87" strokeWidth="2" />
        {/* Gold Dual Pin Headers */}
        <g fill="#e8a44f">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map(i => (
            <React.Fragment key={i}>
              <rect x={26 + i * 10} y="14" width="4" height="6" rx="1" />
              <rect x={26 + i * 10} y="100" width="4" height="6" rx="1" />
            </React.Fragment>
          ))}
        </g>
        {/* ESP-WROOM-32 Metal Shield Module */}
        <rect x="50" y="28" width="80" height="60" rx="3" fill="#94a3b8" stroke="#cbd5e1" strokeWidth="2" />
        <rect x="55" y="33" width="70" height="50" rx="1" fill="#cbd5e1" opacity="0.4" />
        {/* ESP Logo / Text */}
        <text x="90" y="52" fill="#0f172a" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="monospace">ESP-WROOM-32</text>
        <text x="90" y="64" fill="#334155" fontSize="6" textAnchor="middle" fontFamily="monospace">CE FCC 211-161007</text>
        {/* PCB Antenna Gold Zigzag Line */}
        <path d="M 135 32 L 145 32 L 145 42 L 150 42 L 150 32 L 155 32" stroke="#e8a44f" strokeWidth="2" fill="none" />
        {/* Micro-USB Port */}
        <rect x="20" y="48" width="12" height="24" rx="2" fill="#64748b" stroke="#e2e8f0" strokeWidth="1" />
        <rect x="18" y="53" width="4" height="14" rx="1" fill="#1e293b" />
        {/* CP2102 USB Bridge Chip */}
        <rect x="36" y="52" width="10" height="16" fill="#0f172a" stroke="#475569" strokeWidth="1" />
        {/* LED Indicators */}
        <circle cx="48" cy="24" r="3" fill="#22c55e" />
        <circle cx="48" cy="96" r="3" fill="#ef4444" />
      </svg>
    )
  },

  mlx90614: {
    id: 'mlx90614',
    ref: 'S1',
    nameFa: 'سنسور غیرتماسی مادون قرمز MLX90614 (GY-906)',
    nameEn: 'MLX90614 Non-Contact Infrared Temperature Sensor Module',
    specs: 'I2C Interface, 3.3V Logic, Target Range: -70°C to +380°C, FOV 35°',
    marketLocation: 'پاساژ امجد - طبقه اول (فروشگاه نادکو / جوان الکترونیک)',
    approxPriceFa: '۱۶۰,۰۰۰ تومان',
    approxPriceUsd: '$12.90',
    category: 'optics',
    detailsList: [
      'سنسور ترموپیل مادون قرمز کالیبره‌شده کارخانه‌ای با الگوریتم DSP داخلی',
      'زاویه دید محدود ۳۵ درجه (Field of View) ایده‌آل برای خواندن مرکز ورق PETG',
      'دقت اندازه‌گیری ±0.5°C در دمای ذوب پلاستیک',
      'اتصال آسان ۴ سیمه: VCC (3.3V), GND, SCL (GPIO22), SDA (GPIO21)'
    ],
    svgIllustration: (
      <svg viewBox="0 0 200 120" className="w-full h-auto drop-shadow-xl">
        {/* Blue GY-906 Breakout PCB */}
        <rect x="40" y="15" width="120" height="90" rx="8" fill="#1d4ed8" stroke="#3b82f6" strokeWidth="2" />
        {/* 4 Pin Holes */}
        <g fill="#0f172a" stroke="#e8a44f" strokeWidth="1.5">
          <circle cx="58" cy="30" r="4" />
          <circle cx="58" cy="50" r="4" />
          <circle cx="58" cy="70" r="4" />
          <circle cx="58" cy="90" r="4" />
        </g>
        <g fill="#e2e8f0" fontSize="7" fontWeight="bold">
          <text x="68" y="32">VIN (3.3V)</text>
          <text x="68" y="52">GND</text>
          <text x="68" y="72">SCL</text>
          <text x="68" y="92">SDA</text>
        </g>
        {/* MLX90614 Metal TO-39 Can Sensor Header */}
        <circle cx="125" cy="60" r="28" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="3" />
        <circle cx="125" cy="60" r="22" fill="#e2e8f0" stroke="#64748b" strokeWidth="1.5" />
        {/* Optical Filter Lens Window */}
        <circle cx="125" cy="60" r="14" fill="#0284c7" opacity="0.8" />
        <circle cx="122" cy="57" r="4" fill="#ffffff" opacity="0.6" />
        {/* Text */}
        <text x="125" y="102" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">MLX90614 GY-906</text>
      </svg>
    )
  },

  ssr40a: {
    id: 'ssr40a',
    ref: 'SSR1',
    nameFa: 'رله حالت جامد صنعتی SSR 40A AC (FoTek SSR-40DA)',
    nameEn: 'FoTek SSR-40DA Solid State Relay Module',
    specs: 'Control: 3-32V DC, Load: 240V AC 40A, Zero-Cross Switching Trigger',
    marketLocation: 'لاله‌زار جنوبی - پاساژ الکتریک / خیابان اکباتان',
    approxPriceFa: '۱۴۰,۰۰۰ تومان',
    approxPriceUsd: '$8.50',
    category: 'electronics',
    detailsList: [
      'سوئیچینگ کاملاً بی‌صدا و بدون جرقه‌زنی بدون قطعه مکانیکی',
      'ایزولاسیون نوری (Optocoupler Isolation) بین ورودی میکرو و خروجی برق شهر',
      'پایه آلومینیومی ضخیم خنک‌کننده Heat sink جهت دفع حرارت تا ۴۰ آمپر',
      'نمایشگر LED سرخ رنگ خروجی در هنگام فعال بودن المنت'
    ],
    svgIllustration: (
      <svg viewBox="0 0 200 120" className="w-full h-auto drop-shadow-xl">
        {/* SSR Main Dark Grey Block */}
        <rect x="30" y="10" width="140" height="100" rx="8" fill="#262626" stroke="#525252" strokeWidth="2" />
        {/* Aluminum Heatsink Base Plate Layer */}
        <rect x="25" y="20" width="150" height="80" rx="4" fill="#a3a3a3" stroke="#d4d4d4" strokeWidth="1" opacity="0.3" />
        {/* Screw Terminals AC Output Top */}
        <rect x="45" y="18" width="30" height="18" rx="3" fill="#404040" stroke="#a3a3a3" strokeWidth="1" />
        <circle cx="60" cy="27" r="4" fill="#d4d4d4" />
        <rect x="125" y="18" width="30" height="18" rx="3" fill="#404040" stroke="#a3a3a3" strokeWidth="1" />
        <circle cx="140" cy="27" r="4" fill="#d4d4d4" />
        {/* Screw Terminals DC Input Bottom */}
        <rect x="45" y="84" width="30" height="18" rx="3" fill="#404040" stroke="#a3a3a3" strokeWidth="1" />
        <circle cx="60" cy="93" r="4" fill="#d4d4d4" />
        <rect x="125" y="84" width="30" height="18" rx="3" fill="#404040" stroke="#a3a3a3" strokeWidth="1" />
        <circle cx="140" cy="93" r="4" fill="#d4d4d4" />
        {/* Red Faceplate Label */}
        <rect x="42" y="42" width="116" height="38" rx="4" fill="#dc2626" />
        <text x="100" y="56" fill="#ffffff" fontSize="10" fontWeight="extrabold" textAnchor="middle">FOTEK SSR-40DA</text>
        <text x="100" y="68" fill="#fef2f2" fontSize="7" textAnchor="middle">INPUT 3-32VDC  |  OUTPUT 240VAC 40A</text>
        {/* Red LED Status Light */}
        <circle cx="145" cy="61" r="3" fill="#ef4444" stroke="#ffffff" strokeWidth="1" />
      </svg>
    )
  },

  ceramicHeater: {
    id: 'ceramicHeater',
    ref: 'H1',
    nameFa: 'المنت تابشی مادون قرمز ۱۰۰۰W سرامیکی',
    nameEn: '1000W Curved Ceramic Infrared Radiant Heating Element',
    specs: '220V AC 1000W, Curved Concave Ceramic, Wave Range 2-10 µm',
    marketLocation: 'لاله‌زار جنوبی - بورس المنت‌های صنعتی و کوره',
    approxPriceFa: '۱۸۰,۰۰۰ تومان',
    approxPriceUsd: '$18.00',
    category: 'heating',
    detailsList: [
      'بدنه سرامیکی مقاومت بالا در برابر شوک حرارتی تا ۸۰۰ درجه سانتی‌گراد',
      'سیم‌پیچ داخلی آلیاژ کروم-نیکل (Kanthal A1) فوق‌العاده بادوام',
      'تابش طول موج متوسط مادون قرمز ایده‌آل برای جذب سریع در ترموپلاستیک PETG',
      'ارسال حرارت یکنواخت به سطح ۱۲۰×۱۲۰ میلی‌متر ورق دندانپزشکی'
    ],
    svgIllustration: (
      <svg viewBox="0 0 200 120" className="w-full h-auto drop-shadow-xl">
        {/* Curved White Ceramic Body Block */}
        <path d="M 30,30 Q 100,10 170,30 L 160,90 Q 100,75 40,90 Z" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="3" />
        {/* Heating Spiral Coils (Glazed Pattern) */}
        <path d="M 45,42 Q 100,28 155,42" stroke="#f97316" strokeWidth="3" fill="none" />
        <path d="M 48,55 Q 100,42 152,55" stroke="#ea580c" strokeWidth="3" fill="none" />
        <path d="M 52,68 Q 100,56 148,68" stroke="#f97316" strokeWidth="3" fill="none" />
        {/* Metal Terminals & Mounting Bolts */}
        <rect x="75" y="85" width="12" height="22" rx="2" fill="#64748b" stroke="#334155" strokeWidth="1" />
        <rect x="113" y="85" width="12" height="22" rx="2" fill="#64748b" stroke="#334155" strokeWidth="1" />
        <text x="100" y="115" fill="#f6f5f0" fontSize="8" fontWeight="bold" textAnchor="middle">1000W Curved Ceramic IR</text>
      </svg>
    )
  },

  vacuumMotor: {
    id: 'vacuumMotor',
    ref: 'M1',
    nameFa: 'موتور وکیوم توربینی ۱۲۰۰W جاروبرقی سطلی',
    nameEn: '1200W Heavy Duty Bypass Vacuum Turbine Motor',
    specs: '220V 50Hz, Dual Stage Fan Impeller, Negative Suction >22 KPa',
    marketLocation: 'میدان امام خمینی - پاساژ بورس قطعات جاروبرقی و صنعتی',
    approxPriceFa: '۸۵۰,۰۰۰ تومان',
    approxPriceUsd: '$45.00',
    category: 'mechanical',
    detailsList: [
      'موتور توربینی قدرتمند با توان مکش منفی ۲۲ کیلوپاسکال جهت تخلیه آنی هوا',
      'پروانه آلومینیومی دو طبقه برای فرم‌گیری دقیق ورق PETG روی پیچیدگی‌های دندان',
      'سیم‌پیچ تمام مس (Full Copper Winding) با طول عمر بالا',
      'دارای مجرای خروجی هوای مجزا (Bypass Cooling) جهت جلوگیری از داغ شدن موتور'
    ],
    svgIllustration: (
      <svg viewBox="0 0 200 120" className="w-full h-auto drop-shadow-xl">
        {/* Cylindrical Metal Turbine Housing */}
        <rect x="50" y="35" width="100" height="70" rx="12" fill="#475569" stroke="#94a3b8" strokeWidth="3" />
        {/* Top Suction Intake Mouth Ring */}
        <ellipse cx="100" cy="35" rx="35" ry="12" fill="#334155" stroke="#cbd5e1" strokeWidth="2" />
        <circle cx="100" cy="35" r="18" fill="#0f172a" stroke="#64748b" strokeWidth="2" />
        {/* Fan Blades Inside Intake */}
        <line x1="85" y1="35" x2="115" y2="35" stroke="#38bdf8" strokeWidth="3" />
        <line x1="100" y1="22" x2="100" y2="48" stroke="#38bdf8" strokeWidth="3" />
        {/* Motor Winding Copper Lines Indication */}
        <rect x="65" y="55" width="70" height="35" rx="4" fill="#b45309" stroke="#d97706" strokeWidth="1.5" opacity="0.8" />
        <text x="100" y="75" fill="#fef3c7" fontSize="8" fontWeight="black" textAnchor="middle">1200W HIGH VACUUM TURBINE</text>
        {/* Air Vent Outlets Bottom */}
        <line x1="60" y1="95" x2="75" y2="95" stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round" />
        <line x1="85" y1="95" x2="100" y2="95" stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round" />
        <line x1="110" y1="95" x2="125" y2="95" stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round" />
      </svg>
    )
  },

  petgSheets: {
    id: 'petgSheets',
    ref: 'SHT1',
    nameFa: 'ورق شفاف دندانپزشکی PETG (ضخامت ۱.۰ میلی‌متر)',
    nameEn: 'Orthodontic Dental PETG Clear Thermoforming Sheets 1.0mm',
    specs: '120x120mm Square or 125mm Round, Medical Grade Biocompatible PETG',
    marketLocation: 'بازار پامنار - بورس پلاستیک / تجهیزات ارتودنسی',
    approxPriceFa: '۲۵,۰۰۰ تومان per sheet',
    approxPriceUsd: '$0.85',
    category: 'consumables',
    detailsList: [
      'سازگاری کامل با بافت دهان و استاندارد زیستی Biocompatible ISO 10993',
      'شفافیت اپتیکی ۱۰۰٪ ایده‌آل برای ساخت الاینر ارتودنسی شفاف و نایت‌گارد',
      'نقطه شیشه‌ای شدن (Glass Transition Temperature) در حدود ۱۳۵°C تا ۱۴۰°C',
      'پوشش محافظ دو طرفه پلاستیکی جهت جلوگیری از خط و خش قبل از گرمایش'
    ],
    svgIllustration: (
      <svg viewBox="0 0 200 120" className="w-full h-auto drop-shadow-xl">
        {/* Stack of Clear PETG Plastic Sheets */}
        <rect x="45" y="25" width="110" height="80" rx="8" fill="#38bdf8" opacity="0.2" stroke="#0284c7" strokeWidth="2" />
        <rect x="40" y="20" width="110" height="80" rx="8" fill="#7dd3fc" opacity="0.3" stroke="#38bdf8" strokeWidth="2" />
        <rect x="35" y="15" width="110" height="80" rx="8" fill="#e0f2fe" opacity="0.5" stroke="#bae6fd" strokeWidth="2.5" />
        {/* Dental Arch Impression Trace Graphic on sheet */}
        <path d="M 60,75 C 60,35 120,35 120,75" fill="none" stroke="#0284c7" strokeWidth="2" strokeDasharray="3 3" />
        <circle cx="90" cy="40" r="3" fill="#0284c7" />
        <circle cx="75" cy="50" r="3" fill="#0284c7" />
        <circle cx="105" cy="50" r="3" fill="#0284c7" />
        {/* Protective Blue Peel Foil Corner */}
        <path d="M 125,15 L 145,15 L 145,35 Z" fill="#0284c7" />
        <text x="90" y="88" fill="#0369a1" fontSize="8" fontWeight="bold" textAnchor="middle">PETG 1.0mm CLEAR SHEET</text>
      </svg>
    )
  }
};

export const VisualComponentGallery: React.FC = () => {
  const [selectedPartId, setSelectedPartId] = useState<string>('esp32');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const currentPart = VISUAL_PARTS_DATABASE[selectedPartId] || VISUAL_PARTS_DATABASE.esp32;

  const partsList = Object.values(VISUAL_PARTS_DATABASE).filter(
    part => filterCategory === 'all' || part.category === filterCategory
  );

  return (
    <div className="glass-card rounded-3xl p-6 lg:p-8 border border-white/[0.08] space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#44d4cf]/10 text-[#44d4cf] text-xs font-bold mb-2">
            <ShoppingCart className="w-4 h-4" />
            گالری تصویری قطعات سخت‌افزاری و آدرس دقیق بازار تهران
          </div>
          <h2 className="text-2xl font-black text-[#f6f5f0]">تصویر قطعات اصلی، نقشه اتصالات و مشخصات خرید</h2>
          <p className="text-xs text-[#8a8a92] mt-1">
            مشاهده شکل واقعی قطعات الکترونیکی، مکانیکی و سنسورها با بورس فروش در بازار امجد، لاله‌زار و پامنار
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-1.5 bg-black/40 p-1.5 rounded-2xl border border-white/[0.08]">
          {[
            { id: 'all', label: 'همه قطعات' },
            { id: 'electronics', label: 'الکترونیک و بردها' },
            { id: 'optics', label: 'سنسور و اپتیک' },
            { id: 'heating', label: 'المنت و حرارتی' },
            { id: 'mechanical', label: 'موتور و مکانیک' },
            { id: 'consumables', label: 'ورق PETG' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilterCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                filterCategory === cat.id ? 'bg-[#44d4cf] text-[#0b0c15]' : 'text-[#8a8a92] hover:text-[#f6f5f0]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Parts Selection Cards (Left) & Active Inspector Card (Right) */}
      <div className="grid lg:grid-cols-12 gap-8">
        {/* Parts Thumbnail List (5 Cols) */}
        <div className="lg:col-span-5 space-y-3 max-h-[500px] overflow-y-auto pr-1">
          {partsList.map((part) => (
            <div
              key={part.id}
              onClick={() => setSelectedPartId(part.id)}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                selectedPartId === part.id
                  ? 'bg-white/[0.06] border-[#44d4cf] shadow-md'
                  : 'bg-white/[0.02] border-white/[0.05] hover:border-white/[0.15]'
              }`}
            >
              <div className="w-16 h-12 rounded-xl bg-black/40 p-1 flex items-center justify-center shrink-0 border border-white/10">
                {part.svgIllustration}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold text-[#44d4cf]">{part.ref}</span>
                  <h4 className="text-xs font-bold text-[#f6f5f0] truncate">{part.nameFa}</h4>
                </div>
                <p className="text-[10px] text-[#8a8a92] truncate mt-0.5">{part.marketLocation.split('-')[0]}</p>
              </div>
              <span className="text-[10px] font-black text-[#e8a44f] shrink-0">{part.approxPriceFa}</span>
            </div>
          ))}
        </div>

        {/* Active Part Inspector Detail Display (7 Cols) */}
        <div className="lg:col-span-7 glass-card rounded-3xl p-6 lg:p-8 border border-[#44d4cf]/30 flex flex-col justify-between bg-[#07080d]">
          <div className="space-y-6">
            {/* Visual Graphic Vector Illustration Box */}
            <div className="p-6 rounded-2xl bg-[#030408] border border-white/[0.1] relative overflow-hidden flex flex-col items-center justify-center min-h-[180px]">
              <div className="w-full max-w-xs transition-transform duration-300 hover:scale-105">
                {currentPart.svgIllustration}
              </div>
              <span className="absolute bottom-3 right-3 text-[10px] font-mono text-[#8a8a92] px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10">
                Ref Code: {currentPart.ref}
              </span>
            </div>

            {/* Title & Specifications */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-mono font-bold text-[#44d4cf]">{currentPart.ref} — Component Inspector</span>
                <span className="text-sm font-black text-[#e8a44f]">{currentPart.approxPriceFa} <span className="text-xs text-[#8a8a92]">({currentPart.approxPriceUsd})</span></span>
              </div>
              <h3 className="text-lg font-black text-[#f6f5f0]">{currentPart.nameFa}</h3>
              <p className="text-xs text-[#8a8a92] font-mono mt-0.5">{currentPart.nameEn}</p>
            </div>

            {/* Technical Bullet List */}
            <div className="space-y-2 text-xs">
              <p className="text-[10px] font-bold text-[#44d4cf] flex items-center gap-1">
                <Info className="w-3.5 h-3.5" />
                ویژگی‌های فنی و کاربرد در دستگاه:
              </p>
              <div className="space-y-1.5">
                {currentPart.detailsList.map((det, i) => (
                  <div key={i} className="flex items-start gap-2 text-[#ebeae3] p-2 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                    <CheckCircle className="w-3.5 h-3.5 text-[#44d4cf] shrink-0 mt-0.5" />
                    <span>{det}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tehran Sourcing Market */}
            <div className="p-3.5 rounded-xl bg-[#e8a44f]/10 border border-[#e8a44f]/30 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#e8a44f] shrink-0" />
                <span className="text-[#ebeae3]">محل خرید در تهران: <strong className="text-[#f6f5f0]">{currentPart.marketLocation}</strong></span>
              </div>
            </div>
          </div>

          {/* Download CSV BOM Action Button */}
          <div className="pt-4 border-t border-white/[0.08] mt-6">
            <button
              onClick={() => downloadTextFile('Tehran_BOM_Suppliers_List.csv', BOMS_CSV.thermoformer, 'text/csv;charset=utf-8')}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#2a8a87] to-[#44d4cf] text-[#0b0c15] font-extrabold text-xs flex items-center justify-center gap-2 hover:brightness-110 transition shadow-lg"
            >
              <Download className="w-4 h-4" />
              <span>دانلود فایل لیست کامل قطعات بازار همراه با آدرس بورس فروش (CSV)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
