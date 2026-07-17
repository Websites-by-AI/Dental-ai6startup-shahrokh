import React, { useState } from 'react';
import { 
  Palette, Code2, Copy, Check, Sparkles, Sliders, ArrowLeft, Download
} from 'lucide-react';
import { downloadTextFile, CAD_DXF_TEMPLATES } from '../utils/fileDownloader';

export const ShadeMatchingSection: React.FC = () => {
  const [isCalibrated, setIsCalibrated] = useState<boolean>(false);
  const [selectedSample, setSelectedSample] = useState<'A1' | 'A2' | 'A3' | 'B1' | 'BL1'>('A2');
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [photoViewMode, setPhotoViewMode] = useState<'fullKit' | 'clinicalApp'>('fullKit');

  const vitaShades = {
    A1: { code: 'A1', hexUncalibrated: '#e8dbba', hexCalibrated: '#f2e8cf', lab: 'L:82 a:1.2 b:14.5', desc: 'دندان روشن و شفاف' },
    A2: { code: 'A2', hexUncalibrated: '#d8c49e', hexCalibrated: '#e5d3b3', lab: 'L:78 a:1.8 b:18.2', desc: 'پرکاربردترین رنگ طبیعی ایرانیان' },
    A3: { code: 'A3', hexUncalibrated: '#c4aa7d', hexCalibrated: '#d6be95', lab: 'L:73 a:2.4 b:21.0', desc: 'دندان گرم زرد گندمی' },
    B1: { code: 'B1', hexUncalibrated: '#f0e3c5', hexCalibrated: '#f9f0da', lab: 'L:85 a:0.8 b:12.1', desc: 'بلیچینگ و کامپوزیت سفید' },
    BL1: { code: 'BL1', hexUncalibrated: '#fbf5e6', hexCalibrated: '#ffffff', lab: 'L:92 a:0.2 b:6.0', desc: 'سفید هالیوودی (Super Bleach)' },
  };

  const current = vitaShades[selectedSample];

  const pythonShadeCode = `"""
DentLab AI - 18% Gray Card White Balance Calibration & VITA Shade Matcher
Hardware: Any Smartphone Camera + $0.20 Printed 18% Neutral Gray Card
Replaces: $1,200 VITA Easyshade Handheld Device
"""

import cv2
import numpy as np

# Standard VITA Classical Shade Spectrum Database (CIELAB Space)
VITA_LAB_DATABASE = {
    "A1": (82.1, 1.2, 14.5),
    "A2": (78.3, 1.8, 18.2),
    "A3": (73.5, 2.4, 21.0),
    "A3.5": (70.1, 3.1, 23.4),
    "B1": (85.2, 0.8, 12.1),
    "B2": (81.0, 1.4, 15.8),
    "BL1": (92.4, 0.2, 6.0)
}

def calibrate_white_balance_with_graycard(img_bgr, graycard_bbox):
    """
    Normalizes ambient dental clinic yellow light using the 18% gray card reference.
    """
    x, y, w, h = graycard_bbox
    gray_region = img_bgr[y:y+h, x:x+w]
    
    # Calculate average B, G, R values of the 18% gray card
    avg_b = np.mean(gray_region[:, :, 0])
    avg_g = np.mean(gray_region[:, :, 1])
    avg_r = np.mean(gray_region[:, :, 2])
    
    # Neutral Gray Target value = 128
    target = 128.0
    scale_b = target / avg_b if avg_b > 0 else 1.0
    scale_g = target / avg_g if avg_g > 0 else 1.0
    scale_r = target / avg_r if avg_r > 0 else 1.0

    # Apply scaling to whole image
    calibrated_img = img_bgr.astype(np.float32)
    calibrated_img[:, :, 0] *= scale_b
    calibrated_img[:, :, 1] *= scale_g
    calibrated_img[:, :, 2] *= scale_r
    
    return np.clip(calibrated_img, 0, 255).astype(np.uint8)

def match_vita_shade(tooth_roi_bgr):
    # Convert tooth ROI to CIELAB Color Space
    tooth_lab = cv2.cvtColor(tooth_roi_bgr, cv2.COLOR_BGR2LAB)
    mean_l = np.mean(tooth_lab[:, :, 0]) * (100.0 / 255.0)
    mean_a = np.mean(tooth_lab[:, :, 1]) - 128.0
    mean_b = np.mean(tooth_lab[:, :, 2]) - 128.0

    # Find closest VITA code using Delta E (Euclidean distance in CIELAB)
    best_match = None
    min_delta_e = float('inf')

    for shade_code, (ref_l, ref_a, ref_b) in VITA_LAB_DATABASE.items():
        delta_e = np.sqrt((mean_l - ref_l)**2 + (mean_a - ref_a)**2 + (mean_b - ref_b)**2)
        if delta_e < min_delta_e:
            min_delta_e = delta_e
            best_match = shade_code

    return best_match, min_delta_e
`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(pythonShadeCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="space-y-12 pb-12">
      {/* Header Banner */}
      <div className="rounded-3xl glass-card border border-[#c9a96e]/30 p-8 lg:p-10 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-80 h-80 bg-[#c9a96e]/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c9a96e]/10 border border-[#c9a96e]/30 text-[#e8bf82] text-xs font-bold mb-4">
              <Palette className="w-4 h-4" />
              پروژه شماره ۴ — تطبیق رنگ VITA
            </div>
            <h1 className="text-3xl lg:text-4xl font-black text-[#f6f5f0] mb-3">
              اپ تطبیق رنگ دندان با کارت کالیبراسیون طوسی (VITA AI Matcher)
            </h1>
            <p className="text-sm text-[#8a8a92] max-w-2xl leading-relaxed">
              کپی برداری مستقیم از دستگاه ۱۲۰۰ دلاری <strong className="text-[#f6f5f0]">VITA Easyshade</strong>. با استفاده از یک کارت خاکستری ۱۸٪ با هزینه ۱۰ هزار تومان، اثر زردی نور مطب حذف شده و کد رنگ دقیق VITA (مثل A2 یا A3) استخراج می‌گردد.
            </p>
          </div>
          <div className="bg-white/[0.03] border border-white/[0.08] p-4 rounded-2xl text-center shrink-0 min-w-[200px]">
            <p className="text-[11px] text-[#8a8a92] mb-1">مدل درآمدی مطب/لابراتوار</p>
            <p className="text-2xl font-black text-[#e8bf82]">۷۰۰٪ سود</p>
            <p className="text-[10px] text-[#44d4cf] mt-1">SaaS ماهانه بدون هزینه سخت‌افزار</p>
          </div>
        </div>
      </div>

      {/* Interactive White Balance Calibration Simulator */}
      <div className="glass-card rounded-3xl p-6 lg:p-8 border border-[#c9a96e]/20">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-xl font-bold text-[#f6f5f0] flex items-center gap-2">
              <Sliders className="w-5 h-5 text-[#e8bf82]" />
              شبیه‌ساز حذف زردی نور مطب و تشخیص کد VITA
            </h2>
            <p className="text-xs text-[#8a8a92] mt-1">تفاوت تصویر قبل و بعد از کالیبراسیون با کارت ۱۸٪ طوسی</p>
          </div>

          <button
            onClick={() => setIsCalibrated(!isCalibrated)}
            className={`px-5 py-2.5 rounded-2xl font-bold text-xs flex items-center gap-2 transition shadow-lg ${
              isCalibrated
                ? 'bg-[#44d4cf] text-[#0b0c15]'
                : 'bg-white/[0.05] border border-white/[0.1] text-[#e8bf82] hover:bg-white/[0.1]'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>{isCalibrated ? 'کالیبراسیون کارت طوسی فعال است' : 'اعمال کالیبراسیون وایت‌بالانس AI'}</span>
          </button>
        </div>

        {/* Shade Codes Selector */}
        <div className="grid grid-cols-5 gap-2 mb-8">
          {(['A1', 'A2', 'A3', 'B1', 'BL1'] as const).map((code) => (
            <button
              key={code}
              onClick={() => setSelectedSample(code)}
              className={`p-3 rounded-2xl border text-center transition-all ${
                selectedSample === code
                  ? 'bg-[#c9a96e]/20 border-[#c9a96e] text-[#f6f5f0] font-bold shadow-md'
                  : 'bg-white/[0.02] border-white/[0.06] text-[#8a8a92] hover:text-[#f6f5f0]'
              }`}
            >
              <p className="text-sm font-black">{code}</p>
              <p className="text-[9px] opacity-70 mt-0.5 hidden sm:block">{vitaShades[code].desc}</p>
            </button>
          ))}
        </div>

        {/* Real Generated Product Photo with Photo Mode Switcher */}
        <div className="p-4 rounded-2xl bg-[#030408] border border-white/10 mb-6 flex flex-col md:flex-row items-center gap-6">
          <div className="w-full md:w-1/2 h-56 rounded-xl overflow-hidden border border-white/10 relative group img-shimmer shrink-0">
            <img
              src={photoViewMode === 'fullKit' ? '/images/full_shade_kit.jpg' : '/images/shade_matching.jpg'}
              alt="VITA Shade AI Calibration Graycard Photo"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-2 left-2 flex items-center gap-1 bg-black/80 backdrop-blur-md p-1 rounded-xl border border-white/10 text-[9px]">
              <button
                onClick={() => setPhotoViewMode('fullKit')}
                className={`px-2 py-0.5 rounded-lg font-bold transition ${
                  photoViewMode === 'fullKit' ? 'bg-[#e8bf82] text-[#0b0c15]' : 'text-[#8a8a92] hover:text-white'
                }`}
              >
                کیت کامل پکیج
              </button>
              <button
                onClick={() => setPhotoViewMode('clinicalApp')}
                className={`px-2 py-0.5 rounded-lg font-bold transition ${
                  photoViewMode === 'clinicalApp' ? 'bg-[#44d4cf] text-[#0b0c15]' : 'text-[#8a8a92] hover:text-white'
                }`}
              >
                عکس کاربری در مطب
              </button>
            </div>
            <span className="absolute bottom-2 right-2 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-lg text-[9px] text-[#e8bf82] font-mono border border-white/10">
              {photoViewMode === 'fullKit' ? 'تصویر کیت کامل کارت طوسی ۱۸٪ + پایه تبلت' : 'استفاده واقعی با دوربین موبایل'}
            </span>
          </div>
          <div className="space-y-2 text-xs">
            <h4 className="font-bold text-sm text-[#f6f5f0]">استفاده واقعی از کارت ۱۸٪ طوسی در مطب</h4>
            <p className="text-[#8a8a92] leading-relaxed">
              دندانپزشک کارت مقاوم در برابر اتوکلاو را کنار دندان بیمار قرار داده و با اپلیکیشن موبایل عکس می‌گیرد. سیستم با خواندن مرجع طوسی، تمام خطاهای زردی یونیت و پنجره مطب را کالیبره کرده و کد طیف رنگ VITA را نمایش می‌دهد.
            </p>
          </div>
        </div>

        {/* Comparison Display Box */}
        <div className="grid md:grid-cols-2 gap-6 bg-[#07080d] p-6 rounded-2xl border border-white/[0.08]">
          {/* Visual Swatch & Graycard Illustration */}
          <div className="flex flex-col items-center justify-between p-6 rounded-2xl border border-white/[0.08] relative overflow-hidden"
            style={{ backgroundColor: isCalibrated ? current.hexCalibrated : current.hexUncalibrated }}>
            
            {/* Visual Vector SVG Graphic Card for 18% Graycard */}
            <div className="w-full max-w-[200px] mb-4">
              <svg viewBox="0 0 200 120" className="w-full h-auto drop-shadow-md">
                {/* Graycard Synthetic Plate */}
                <rect x="20" y="10" width="160" height="100" rx="8" fill="#808080" stroke="#404040" strokeWidth="2" />
                {/* White Calibration Target Square */}
                <rect x="35" y="25" width="40" height="35" rx="3" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
                <text x="55" y="45" fill="#000000" fontSize="7" fontWeight="bold" textAnchor="middle">100% W</text>
                {/* 18% Neutral Gray Square */}
                <rect x="80" y="25" width="40" height="35" rx="3" fill="#808080" stroke="#f6f5f0" strokeWidth="1" />
                <text x="100" y="45" fill="#ffffff" fontSize="7" fontWeight="bold" textAnchor="middle">18% GRAY</text>
                {/* Black Square */}
                <rect x="125" y="25" width="40" height="35" rx="3" fill="#171717" stroke="#404040" strokeWidth="1" />
                <text x="145" y="45" fill="#ffffff" fontSize="7" fontWeight="bold" textAnchor="middle">0% BLK</text>
                {/* VITA Shade Code Printed on Card */}
                <rect x="35" y="72" width="130" height="25" rx="4" fill="#1e293b" opacity="0.9" />
                <text x="100" y="88" fill="#e8bf82" fontSize="9" fontWeight="black" textAnchor="middle" fontFamily="monospace">DentLab VITA Shade Calibration Card</text>
              </svg>
            </div>

            <div className="bg-[#0b0c15]/90 backdrop-blur-md px-4 py-2 rounded-xl text-center border border-white/[0.2] w-full">
              <p className="text-[10px] text-[#8a8a92]">کد استخراج شده VITA</p>
              <p className="text-2xl font-black text-[#44d4cf] font-mono">{current.code}</p>
              <p className="text-[10px] text-[#ebeae3] font-mono">{current.lab}</p>
            </div>

            {!isCalibrated && (
              <span className="absolute top-3 right-3 text-[10px] px-2.5 py-1 rounded-full bg-[#d45d78]/80 text-white font-bold">
                دارای خطای نور مطب (Uncalibrated)
              </span>
            )}
            {isCalibrated && (
              <span className="absolute top-3 right-3 text-[10px] px-2.5 py-1 rounded-full bg-[#44d4cf]/90 text-[#0b0c15] font-bold">
                کالیبره‌شده با کارت طوسی
              </span>
            )}
          </div>

          {/* Details & Direct Lab Order */}
          <div className="space-y-4 flex flex-col justify-between">
            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <p className="text-[10px] text-[#8a8a92]">توضیحات طیف رنگ دندان:</p>
                <p className="font-bold text-[#f6f5f0] mt-0.5">{current.desc}</p>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <p className="text-[10px] text-[#8a8a92]">وضعیت خطای Delta E:</p>
                <p className="font-bold text-[#44d4cf] mt-0.5">ΔE = {isCalibrated ? '۰.۲ (عالی و دقیق)' : '۴.۸ (غیرقابل قبول)'}</p>
              </div>
            </div>

            <button className="w-full py-3 rounded-xl bg-white/[0.04] border border-white/[0.1] text-[#e8bf82] font-bold text-xs flex items-center justify-center gap-2 hover:bg-white/[0.08] transition">
              <span>ارسال مستقیم فایل ۳D و فرم سفارش به لابراتوار</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Code Snippet */}
      <div className="glass-card rounded-3xl p-6 lg:p-8 border border-white/[0.08]">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <Code2 className="w-6 h-6 text-[#c9a96e]" />
            <div>
              <h2 className="text-xl font-bold text-[#f6f5f0]">کد سورس پایتون الگوریتم White Balance + CIELAB Delta E</h2>
              <p className="text-xs text-[#8a8a92]">فرمول استاندارد کالیبراسیون و انطباق طیف رنگ دندانپزشکی</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => downloadTextFile('vita_shade_cielab_matcher.py', pythonShadeCode, 'text/plain;charset=utf-8')}
              className="px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/[0.1] hover:bg-[#c9a96e]/10 hover:border-[#c9a96e]/30 text-[#e8bf82] text-xs font-bold flex items-center gap-1.5 transition"
            >
              <Download className="w-4 h-4" />
              <span>دانلود اسکریپت .py</span>
            </button>
            <button
              onClick={() => downloadTextFile('VITA_GrayCard_Print.dxf', CAD_DXF_TEMPLATES.shadeCard, 'text/plain;charset=utf-8')}
              className="px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/[0.1] hover:bg-[#44d4cf]/10 hover:border-[#44d4cf]/30 text-[#44d4cf] text-xs font-bold flex items-center gap-1.5 transition"
            >
              <Download className="w-4 h-4" />
              <span>دانلود DXF کارت طوسی</span>
            </button>
            <button
              onClick={handleCopyCode}
              className="px-4 py-2 rounded-xl bg-white/[0.04] border border-white/[0.1] hover:bg-[#c9a96e]/10 hover:border-[#c9a96e]/30 text-[#e8bf82] text-xs font-bold flex items-center gap-2 transition"
            >
              {copiedCode ? <Check className="w-4 h-4 text-[#e8bf82]" /> : <Copy className="w-4 h-4" />}
              <span>{copiedCode ? 'کد کپی شد!' : 'کپی الگوریتم'}</span>
            </button>
          </div>
        </div>

        <div className="bg-[#05060a] border border-white/[0.08] rounded-2xl p-4 font-mono text-xs text-[#ebeae3] overflow-x-auto max-h-[300px] leading-relaxed dir-ltr">
          <pre>{pythonShadeCode}</pre>
        </div>
      </div>
    </div>
  );
};
