import React, { useState } from 'react';
import { 
  ScanLine, CheckCircle2, AlertTriangle, 
  Code2, Copy, Check, Sparkles, ShoppingCart, Square, CheckSquare, Download, Box
} from 'lucide-react';
import { downloadTextFile, CAD_DXF_TEMPLATES, BOMS_CSV } from '../utils/fileDownloader';

interface SampleImpression {
  id: string;
  title: string;
  type: string;
  healthyPercentage: number;
  status: 'approved' | 'rejected' | 'warning';
  flaws: { name: string; location: string; severity: string }[];
  bgGradient: string;
  accentColor: string;
}

export const ImpressionScannerSection: React.FC = () => {
  const [selectedSample, setSelectedSample] = useState<string>('sample1');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<SampleImpression | null>(null);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [photoViewMode, setPhotoViewMode] = useState<'full' | 'exploded' | 'inUse'>('full');

  // Shopping list items
  const [itemsChecked, setItemsChecked] = useState<Record<string, boolean>>({
    box1: false,
    box2: false,
    box3: false,
    box4: false,
  });

  const toggleCheck = (id: string) => {
    setItemsChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const sampleImpressions: Record<string, SampleImpression> = {
    sample1: {
      id: 'sample1',
      title: 'قالب سیلیکونی دندان ۶ (آفست بالا)',
      type: 'پوتی و واش سیلیکونی A-Silicone',
      healthyPercentage: 96,
      status: 'approved',
      flaws: [
        { name: 'میکروحباب در ناحیه کام', location: 'بافت نرم انتهایی', severity: 'بسیار جزئی (قابل چشم‌پوشی)' }
      ],
      bgGradient: 'from-[#1a5c5a]/40 to-[#0b0c15]',
      accentColor: '#44d4cf'
    },
    sample2: {
      id: 'sample2',
      title: 'قالب آلژینات فک پایین با حباب تراش',
      type: 'آلژینات کرومیک زرد',
      healthyPercentage: 68,
      status: 'rejected',
      flaws: [
        { name: 'حباب هوای بزرگ (Void)', location: 'مارجین خط تراش دندان ۶ پایین راست', severity: 'بسیار بحرانی' },
        { name: 'کشیدگی آلژینات (Drag)', location: 'ناحیه لبی دندان نیش', severity: 'متوسط' }
      ],
      bgGradient: 'from-[#d45d78]/30 to-[#0b0c15]',
      accentColor: '#e88598'
    },
    sample3: {
      id: 'sample3',
      title: 'قالب ایمپلنت چند واحدی (پوتی واش)',
      type: 'C-Silicone خمیری',
      healthyPercentage: 82,
      status: 'warning',
      flaws: [
        { name: 'عدم شفافیت مارجین', location: 'دیواره داخلی ایمپرشن پین ۳', severity: 'نیاز به بررسی دستی دکتر' }
      ],
      bgGradient: 'from-[#e8a44f]/30 to-[#0b0c15]',
      accentColor: '#e8a44f'
    }
  };

  const handleStartAnalysis = () => {
    setIsAnalyzing(true);
    setAnalysisResult(null);
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisResult(sampleImpressions[selectedSample]);
    }, 2500);
  };

  const pythonCode = `"""
DentLab AI - Impression Quality Analyzer (OpenCV & YOLOv8)
Light Box Hardware: 30x30 cm Plexi Lightbox with CRI>95 LED Array
Camera: USB HD Macro Camera (1080p, 60fps)
Detects: Air Bubbles (Voids), Material Drag Lines, Margin Blurs
"""

import cv2
import numpy as np
from ultralytics import YOLO

# Load Trained DentLab Impression Quality Model
model = YOLO('models/dentlab_impression_yolov8.pt')

def analyze_dental_impression(image_path):
    # Read frame from USB Lightbox Camera
    img = cv2.imread(image_path)
    if img is None:
        raise ValueError("Could not access Lightbox Camera feed!")

    # Preprocess image: White Balance & Contrast Adjustment
    lab = cv2.cvtColor(img, cv2.COLOR_BGR2LAB)
    l, a, b = cv2.split(lab)
    clahe = cv2.createCLAHE(clipLimit=3.0, tileGridSize=(8,8))
    cl = clahe.apply(l)
    limg = cv2.merge((cl,a,b))
    enhanced_img = cv2.cvtColor(limg, cv2.COLOR_LAB2BGR)

    # Run AI Defect Detection (YOLO Inference)
    results = model(enhanced_img, conf=0.45)
    
    bubble_count = 0
    drag_count = 0
    flaws_list = []

    for r in results:
        boxes = r.boxes
        for box in boxes:
            cls_id = int(box.cls[0])
            confidence = float(box.conf[0])
            label = model.names[cls_id]
            
            x1, y1, x2, y2 = map(int, box.xyxy[0])
            
            # Draw visual bounding box (Red for critical flaws)
            color = (0, 0, 255) if label in ['bubble_margin', 'drag_tear'] else (0, 255, 255)
            cv2.rectangle(img, (x1, y1), (x2, y2), color, 2)
            cv2.putText(img, f"{label} {confidence:.2f}", (x1, y1 - 10),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.5, color, 2)

            if 'bubble' in label:
                bubble_count += 1
            if 'drag' in label:
                drag_count += 1

    # Quality Health Index Calculation
    health_score = max(0, 100 - (bubble_count * 15 + drag_count * 10))
    is_acceptable = health_score >= 85

    return {
        "health_score": health_score,
        "is_acceptable": is_acceptable,
        "bubble_count": bubble_count,
        "drag_count": drag_count,
        "annotated_image": img
    }

if __name__ == "__main__":
    result = analyze_dental_impression("test_impression_sample.jpg")
    print(f"Impression Quality Health Index: {result['health_score']}%")
    print(f"Approved for Lab Send: {result['is_acceptable']}")
`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(pythonCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="space-y-12 pb-12">
      {/* Header Banner */}
      <div className="rounded-3xl glass-card border border-[#e8a44f]/30 p-8 lg:p-10 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-80 h-80 bg-[#e8a44f]/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e8a44f]/10 border border-[#e8a44f]/30 text-[#e8a44f] text-xs font-bold mb-4">
              <ScanLine className="w-4 h-4" />
              پروژه شماره ۲ — صفر درصد تحریم و نرم‌افزار خالص
            </div>
            <h1 className="text-3xl lg:text-4xl font-black text-[#f6f5f0] mb-3">
              اسکنر و جعبه هوشمند کنترل کیفیت قالب (AI Impression Quality Checker)
            </h1>
            <p className="text-sm text-[#8a8a92] max-w-2xl leading-relaxed">
              جایگزین اسکنرهای ۵۰۰۰ دلاری ۳D با یک باکس نورانی ۳۰x۳۰ پلکسی و نرم‌افزار هوش مصنوعی. دندانپزشک قالب خمیری را در باکس می‌گذارد و ظرف ۵ ثانیه حباب‌ها، پارگی‌ها و عدم شفافیت خط تراش با رنگ قرمز روی موبایل مشخص می‌شود.
            </p>
          </div>
          <div className="bg-white/[0.03] border border-white/[0.08] p-4 rounded-2xl text-center shrink-0 min-w-[200px]">
            <p className="text-[11px] text-[#8a8a92] mb-1">مدل درآمدی مطب‌ها</p>
            <p className="text-2xl font-black text-[#e8a44f]">اشتراک ماهانه</p>
            <p className="text-[10px] text-[#44d4cf] mt-1">۴۰۰,۰۰۰ تومان/مطب | ۲۰۰ مطب = ۸۰ م/ماه سود</p>
          </div>
        </div>
      </div>

      {/* Main Interactive Demo Grid */}
      <div className="grid lg:grid-cols-12 gap-8">
        {/* Hardware Procurement & Sample Selector (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Light Box Materials */}
          <div className="glass-card rounded-3xl p-6 border border-white/[0.08]">
            <div className="flex items-center gap-3 mb-4">
              <ShoppingCart className="w-5 h-5 text-[#e8a44f]" />
              <div>
                <h2 className="text-base font-bold text-[#f6f5f0]">قطعات کارگاهی لایت باکس (کمتر از ۵۰۰ هزار تومان)</h2>
                <p className="text-xs text-[#8a8a92]">تهیه از پامنار و پاساژ امجد</p>
              </div>
            </div>

            <div className="space-y-2.5 text-xs mb-4">
              {[
                { id: 'box1', title: 'باکس مکعبی ۳۰x۳۰ سانتی‌متر پلکسی دو جداره مات', market: 'پامنار (برش لیزری)', price: '۲۸0,000 تومان' },
                { id: 'box2', title: 'نوار LED SMD 5630 با شاخص نور CRI>95', market: 'امجد / لاله‌زار', price: '۹۵,۰۰۰ تومان' },
                { id: 'box3', title: 'پایه نوسانی نگهدارنده دوربین/موبایل', market: 'بازار چارسو / پاساژ علاءالدین', price: '۱۲۰,۰۰0 تومان' },
                { id: 'box4', title: 'کارت کالیبراسیون وایت‌بالانس مات', market: 'چاپ فوتو گرافیک پامنار', price: '۱۵,۰۰۰ تومان' },
              ].map((item) => (
                <div
                  key={item.id}
                  onClick={() => toggleCheck(item.id)}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    itemsChecked[item.id] ? 'bg-[#e8a44f]/10 border-[#e8a44f]/40 text-[#f6f5f0]' : 'bg-white/[0.02] border-white/[0.05] text-[#8a8a92]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {itemsChecked[item.id] ? <CheckSquare className="w-4 h-4 text-[#e8a44f]" /> : <Square className="w-4 h-4 text-[#8a8a92]" />}
                    <span className={itemsChecked[item.id] ? 'line-through text-[#e8a44f]' : ''}>{item.title}</span>
                  </div>
                  <span className="font-bold text-[#e8a44f] text-[10px]">{item.price}</span>
                </div>
              ))}
            </div>

            {/* Quick CAD & BOM Download Actions */}
            <div className="pt-3 border-t border-white/[0.06] flex gap-2">
              <button
                onClick={() => downloadTextFile('Impression_Lightbox_Cut.dxf', CAD_DXF_TEMPLATES.impressionBox, 'text/plain;charset=utf-8')}
                className="flex-1 py-2 px-3 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-[#e8a44f] text-[#e8a44f] text-[11px] font-bold flex items-center justify-center gap-1.5 transition"
              >
                <Download className="w-3.5 h-3.5" />
                <span>دانلود DXF برش پلکسی</span>
              </button>
              <button
                onClick={() => downloadTextFile('BOM_ImpressionBox_Tehran.csv', BOMS_CSV.impressionScanner, 'text/csv;charset=utf-8')}
                className="py-2 px-3 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-[#44d4cf] text-[#44d4cf] text-[11px] font-bold flex items-center justify-center gap-1.5 transition"
              >
                <Download className="w-3.5 h-3.5" />
                <span>دانلود BOM</span>
              </button>
            </div>
          </div>

          {/* Real Generated Industrial Photo with Standalone vs Exploded Switcher */}
          <div className="glass-card rounded-3xl p-5 border border-white/[0.08] space-y-3">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <span className="text-xs font-bold text-[#f6f5f0]">گالری استودیویی تصاویر محصول</span>
              
              {/* Photo Mode Pills */}
              <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-white/10 text-[10px]">
                <button
                  onClick={() => setPhotoViewMode('full')}
                  className={`px-2 py-1 rounded-lg font-bold transition ${
                    photoViewMode === 'full' ? 'bg-[#e8a44f] text-[#0b0c15]' : 'text-[#8a8a92] hover:text-white'
                  }`}
                >
                  بدنه کامل
                </button>
                <button
                  onClick={() => setPhotoViewMode('exploded')}
                  className={`px-2 py-1 rounded-lg font-bold transition ${
                    photoViewMode === 'exploded' ? 'bg-[#44d4cf] text-[#0b0c15]' : 'text-[#8a8a92] hover:text-white'
                  }`}
                >
                  نمای انفجاری
                </button>
                <button
                  onClick={() => setPhotoViewMode('inUse')}
                  className={`px-2 py-1 rounded-lg font-bold transition ${
                    photoViewMode === 'inUse' ? 'bg-[#e88598] text-[#0b0c15]' : 'text-[#8a8a92] hover:text-white'
                  }`}
                >
                  محیط کار
                </button>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-white/10 h-52 relative group img-shimmer">
              <img
                src={
                  photoViewMode === 'full' ? '/images/full_impression_box.jpg' :
                  photoViewMode === 'exploded' ? '/images/exploded_impression_box.jpg' :
                  '/images/impression_scanner.jpg'
                }
                alt="AI Impression Scanner Photo"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute bottom-2 right-2 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-lg text-[9px] text-[#e8a44f] font-mono border border-white/10">
                {photoViewMode === 'full' && 'تصویر کامل لایت‌باکس ۳۰x۳۰cm'}
                {photoViewMode === 'exploded' && 'نمای انفجاری تفکیک شش دیواره پلکسی و دوربین HD'}
                {photoViewMode === 'inUse' && 'تصویر آنالیز زنده قالب خمیری در مطب'}
              </span>
            </div>
          </div>

          {/* Physical Lightbox Visual Assembly Render */}
          <div className="glass-card rounded-3xl p-5 border border-white/[0.08] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-[#f6f5f0]">
                <Box className="w-4 h-4 text-[#e8a44f]" />
                نمای شماتیک و اجزای فیزیکی لایت‌باکس پلکسی
              </div>
              <span className="text-[10px] text-[#e8a44f] font-bold">CRI &gt; 95 Lightbox</span>
            </div>
            
            <div className="p-4 rounded-2xl bg-[#030408] border border-white/[0.1] flex flex-col items-center justify-center">
              <svg viewBox="0 0 240 140" className="w-full max-w-xs drop-shadow-lg">
                {/* Acrylic Frosted Cube Box Frame */}
                <rect x="30" y="20" width="180" height="100" rx="8" fill="#121422" stroke="#e8a44f" strokeWidth="2" />
                <rect x="36" y="26" width="168" height="88" rx="4" fill="#181a29" stroke="#334155" strokeWidth="1" />
                {/* Dual White LED Strips Left & Right */}
                <line x1="42" y1="30" x2="42" y2="110" stroke="#fef08a" strokeWidth="4" strokeLinecap="round" />
                <line x1="198" y1="30" x2="198" y2="110" stroke="#fef08a" strokeWidth="4" strokeLinecap="round" />
                {/* USB Macro Camera Ring Top Center */}
                <rect x="100" y="20" width="40" height="12" rx="3" fill="#334155" stroke="#44d4cf" strokeWidth="1.5" />
                <circle cx="120" cy="26" r="4" fill="#0284c7" stroke="#38bdf8" strokeWidth="1" />
                {/* Dental Tray Impression Placement in Bottom Center */}
                <path d="M 85,90 C 85,60 155,60 155,90 Z" fill="#b45309" opacity="0.8" stroke="#d97706" strokeWidth="2" />
                <path d="M 95,85 C 95,68 145,68 145,85" fill="none" stroke="#fef08a" strokeWidth="1.5" strokeDasharray="2 2" />
                {/* Annotations */}
                <text x="120" y="15" fill="#44d4cf" fontSize="7" fontWeight="bold" textAnchor="middle">USB 1080p MACRO CAMERA</text>
                <text x="120" y="80" fill="#fef2f2" fontSize="7" fontWeight="bold" textAnchor="middle"> قالی سیلیکونی / آلژیناتی</text>
                <text x="42" y="122" fill="#e8a44f" fontSize="6" textAnchor="middle">SMD LED CRI&gt;95</text>
                <text x="198" y="122" fill="#e8a44f" fontSize="6" textAnchor="middle">SMD LED CRI&gt;95</text>
              </svg>
            </div>
          </div>

          {/* Impression Samples Selection */}
          <div className="glass-card rounded-3xl p-6 border border-white/[0.08]">
            <h3 className="text-sm font-bold text-[#f6f5f0] mb-3">انتخاب نمونه قالب برای آنالیز AI:</h3>
            <div className="space-y-2.5">
              {Object.values(sampleImpressions).map((sample) => (
                <button
                  key={sample.id}
                  onClick={() => {
                    setSelectedSample(sample.id);
                    setAnalysisResult(null);
                  }}
                  className={`w-full p-3.5 rounded-2xl border text-right transition-all flex items-center justify-between ${
                    selectedSample === sample.id
                      ? 'bg-[#e8a44f]/15 border-[#e8a44f]/40 text-[#f6f5f0] shadow-md'
                      : 'bg-white/[0.02] border-white/[0.05] text-[#8a8a92] hover:bg-white/[0.05]'
                  }`}
                >
                  <div>
                    <p className="font-bold text-xs text-[#f6f5f0]">{sample.title}</p>
                    <p className="text-[10px] text-[#8a8a92] mt-0.5">{sample.type}</p>
                  </div>
                  <span className="text-[10px] px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08]">
                    تست نمونه #{sample.id.replace('sample', '')}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Live Impression Visual Analyzer (7 Cols) */}
        <div className="lg:col-span-7 glass-card rounded-3xl p-6 lg:p-8 border border-[#e8a44f]/20 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-[#e8a44f]" />
                <div>
                  <h3 className="text-lg font-bold text-[#f6f5f0]">آنالیزور بینایی ماشین (Computer Vision)</h3>
                  <p className="text-xs text-[#8a8a92]">تشخیص خودکار حباب، پارگی و خطوط تراش مارجین</p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-[#e8a44f]/10 border border-[#e8a44f]/30 text-[#e8a44f] text-xs font-mono font-bold">
                YOLOv8 Active
              </span>
            </div>

            {/* Display Analysis Stage */}
            <div className="bg-[#07080d] border border-white/[0.1] rounded-2xl p-6 mb-6 min-h-[260px] flex flex-col items-center justify-center relative overflow-hidden">
              {isAnalyzing ? (
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 rounded-full border-4 border-[#e8a44f] border-t-transparent animate-spin mx-auto" />
                  <p className="text-xs font-bold text-[#e8a44f] animate-pulse">در حال استخراج ویژگی‌های مورفولوژیک قالب خمیری...</p>
                  <p className="text-[10px] text-[#8a8a92]">الگوریتم پردازش تصویر در حال فیلترکردن نویز نوری باکس</p>
                </div>
              ) : analysisResult ? (
                <div className="w-full space-y-4">
                  {/* Result Metric Header */}
                  <div className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/[0.08]">
                    <div>
                      <p className="text-[10px] text-[#8a8a92]">شاخص صحت سلامت قالب</p>

                      <p className="text-3xl font-black font-mono" style={{ color: analysisResult.accentColor }}>
                        {analysisResult.healthyPercentage}٪
                      </p>
                    </div>
                    <div>
                      {analysisResult.status === 'approved' && (
                        <span className="px-3 py-1.5 rounded-xl bg-[#44d4cf]/20 border border-[#44d4cf]/40 text-[#44d4cf] text-xs font-bold flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4" />
                          قالب تایید شد (ارسال به لابراتوار)
                        </span>
                      )}
                      {analysisResult.status === 'rejected' && (
                        <span className="px-3 py-1.5 rounded-xl bg-[#d45d78]/20 border border-[#d45d78]/40 text-[#e88598] text-xs font-bold flex items-center gap-1.5">
                          <AlertTriangle className="w-4 h-4" />
                          قالب رد شد (نیاز به قالب‌گیری مجدد)
                        </span>
                      )}
                      {analysisResult.status === 'warning' && (
                        <span className="px-3 py-1.5 rounded-xl bg-[#e8a44f]/20 border border-[#e8a44f]/40 text-[#e8a44f] text-xs font-bold flex items-center gap-1.5">
                          <AlertTriangle className="w-4 h-4" />
                          نیاز به بررسی دقیق دندانپزشک
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Bounding Box Simulation Graphic */}
                  <div className="p-4 rounded-2xl bg-white/[0.01] border border-white/[0.05]">
                    <p className="text-xs font-bold text-[#f6f5f0] mb-2">نقاط عیب شناسایی شده توسط AI:</p>
                    <div className="space-y-2">
                      {analysisResult.flaws.map((flaw, i) => (
                        <div key={i} className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[#d45d78]" />
                            <span className="font-semibold text-[#f6f5f0]">{flaw.name}</span>
                            <span className="text-[10px] text-[#8a8a92]">({flaw.location})</span>
                          </div>
                          <span className="text-[10px] text-[#e8a44f] font-mono">{flaw.severity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center p-6 space-y-3">
                  <ScanLine className="w-12 h-12 text-[#8a8a92] mx-auto opacity-50" />
                  <p className="text-xs text-[#8a8a92]">یک نمونه قالب را انتخاب کرده و دکمه آنالیز را فشار دهید</p>
                </div>
              )}
            </div>
          </div>

          <button
            disabled={isAnalyzing}
            onClick={handleStartAnalysis}
            className={`w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#e8a44f] to-[#f0c878] text-[#0b0c15] font-extrabold text-xs flex items-center justify-center gap-2 hover:brightness-110 transition shadow-lg ${
              isAnalyzing ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <ScanLine className="w-4 h-4" />
            شروع آنالیز ۵ ثانیه‌ای تصویر قالب
          </button>
        </div>
      </div>

      {/* Source Code Python OpenCV */}
      <div className="glass-card rounded-3xl p-6 lg:p-8 border border-white/[0.08]">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <Code2 className="w-6 h-6 text-[#e8a44f]" />
            <div>
              <h2 className="text-xl font-bold text-[#f6f5f0]">کد سورس کامل پایتون OpenCV + YOLOv8</h2>
              <p className="text-xs text-[#8a8a92]">الگوریتم پردازش تصویر دندانپزشکی و فیلتر کنتراست CLAHE</p>
            </div>
          </div>
          <button
            onClick={handleCopyCode}
            className="px-4 py-2 rounded-xl bg-white/[0.04] border border-white/[0.1] hover:bg-[#e8a44f]/10 hover:border-[#e8a44f]/30 text-[#e8a44f] text-xs font-bold flex items-center gap-2 transition"
          >
            {copiedCode ? <Check className="w-4 h-4 text-[#e8a44f]" /> : <Copy className="w-4 h-4" />}
            <span>{copiedCode ? 'کد کپی شد!' : 'کپی سورس پایتون'}</span>
          </button>
        </div>

        <div className="bg-[#05060a] border border-white/[0.08] rounded-2xl p-4 font-mono text-xs text-[#ebeae3] overflow-x-auto max-h-[350px] leading-relaxed dir-ltr">
          <pre>{pythonCode}</pre>
        </div>
      </div>
    </div>
  );
};
