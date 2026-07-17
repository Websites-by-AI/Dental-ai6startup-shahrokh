import React, { useState } from 'react';
import { ShoppingBag, Sparkles, Download } from 'lucide-react';
import { downloadTextFile, BOMS_CSV } from '../utils/fileDownloader';

interface ComparisonData {
  deviceNum: number;
  title: string;
  originalOem: string;
  originalOemPriceAmazon: string;
  oemPriceUsd: number;
  dentLabIranProductionCostRial: string;
  dentLabIranCostUsd: number;
  dentLabIranSaleRial: string;
  dentLabIranSaleUsd: number;
  dentLabEuropeExportEuro: string;
  amazonListPriceUsd: number;
  profitMarginPercent: number;
  keyAdvantage: string;
  bomCsvKey: keyof typeof BOMS_CSV;
}

export const AmazonPriceComparer: React.FC = () => {
  const [selectedCurrency, setSelectedCurrency] = useState<'toman' | 'usd' | 'euro'>('toman');

  const comparisonDataList: ComparisonData[] = [
    {
      deviceNum: 1,
      title: 'وکیوم فرمر هوشمند رومیزی (Smart Lab Thermoformer)',
      originalOem: 'Erkodent Erkoform 3d motion / Scheu Biostar',
      originalOemPriceAmazon: '$1,850 - $2,200 (در آمازون و توزیع‌کنندگان اروپا)',
      oemPriceUsd: 1950,
      dentLabIranProductionCostRial: '۶,۰۰۰,۰۰۰ تا ۸,۰۰۰,۰۰۰ تومان',
      dentLabIranCostUsd: 120,
      dentLabIranSaleRial: '۲۸,۰۰۰,۰۰۰ تا ۳۸,۰۰۰,۰۰۰ تومان',
      dentLabIranSaleUsd: 550,
      dentLabEuropeExportEuro: '۴۵۰ - ۶۵۰ یورو',
      amazonListPriceUsd: 790,
      profitMarginPercent: 320,
      keyAdvantage: 'سنسور مادون قرمز MLX90614 مانع از سوختن ورق PETG می‌شود. تایمینگ ذوب اتوماتیک.',
      bomCsvKey: 'thermoformer',
    },
    {
      deviceNum: 2,
      title: 'جعبه نور + اپ کنترل کیفیت قالب (AI Impression Box)',
      originalOem: 'اسکنر لابراتواری 3Shape D2000 / Medit T710',
      originalOemPriceAmazon: '$5,200 - $8,500 (تجهیزات سنگین ۳D)',
      oemPriceUsd: 5200,
      dentLabIranProductionCostRial: '۱۵,۰۰۰,۰۰۰ تا ۲۵,۰۰۰,۰۰۰ تومان (هزینه اپ)',
      dentLabIranCostUsd: 350,
      dentLabIranSaleRial: 'اشتراک ۴۰۰,۰۰۰ تومان / ماهانه per مطب',
      dentLabIranSaleUsd: 8,
      dentLabEuropeExportEuro: '۴۹ - ۹۹ یورو / ماهانه SaaS',
      amazonListPriceUsd: 1200,
      profitMarginPercent: 500,
      keyAdvantage: 'صفر درصد استهلاک سخت‌افزار. تشخیص ۵ ثانیه‌ای حباب و پارگی با الگوریتم YOLOv8.',
      bomCsvKey: 'impressionScanner',
    },
    {
      deviceNum: 3,
      title: 'لاگر اتوکلاو + چاپگر QR استریل (Sterilization Logger)',
      originalOem: '3M Comply SteriGage & Bowie Dick Electronic Logger',
      originalOemPriceAmazon: '$850 - $1,200 (آمازون آمریکا)',
      oemPriceUsd: 950,
      dentLabIranProductionCostRial: '۸,۰۰۰,۰۰۰ تا ۱۲,۰۰۰,۰۰۰ تومان',
      dentLabIranCostUsd: 180,
      dentLabIranSaleRial: '۲۲,۰۰۰,۰۰۰ تا ۳۰,۰۰۰,۰۰۰ تومان',
      dentLabIranSaleUsd: 450,
      dentLabEuropeExportEuro: '۳۵۰ - ۵۰۰ یورو',
      amazonListPriceUsd: 490,
      profitMarginPercent: 250,
      keyAdvantage: 'چاپ اتوماتیک برچسب حرارتی ضدآب با QR-Code حاوی تاریخ انقضا و نام ابزار.',
      bomCsvKey: 'autoclaveLogger',
    },
    {
      deviceNum: 4,
      title: 'اپ تطبیق رنگ دندان با کارت طوسی (VITA Shade AI Matcher)',
      originalOem: 'VITA Easyshade V Handheld Spectrophotometer',
      originalOemPriceAmazon: '$1,250 - $1,480 (Amazon Business Medical)',
      oemPriceUsd: 1350,
      dentLabIranProductionCostRial: '۱۰,۰۰۰,۰۰۰ تومان (چاپ کارت خاکستری ۱۸٪)',
      dentLabIranCostUsd: 150,
      dentLabIranSaleRial: 'اشتراک ۳۰۰,۰۰۰ تومان / ماهانه per مطب',
      dentLabIranSaleUsd: 6,
      dentLabEuropeExportEuro: '۲۹ - ۵۹ یورو / ماهانه SaaS',
      amazonListPriceUsd: 290,
      profitMarginPercent: 700,
      keyAdvantage: 'حذف خطای نور زرد مطب با کارت طوسی ۱۰ هزار تومانی + فرمول انطباق CIELAB Delta-E.',
      bomCsvKey: 'shadeMatcher',
    },
  ];

  return (
    <div className="glass-card rounded-3xl p-6 lg:p-8 border border-white/[0.08] space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e8a44f]/10 text-[#e8a44f] text-xs font-bold mb-2">
            <ShoppingBag className="w-4 h-4" />
            تحلیل مقایسه‌ای قیمت‌های آمازون (Amazon Market Analysis) و بازار ایران
          </div>
          <h2 className="text-2xl font-black text-[#f6f5f0]">مقایسه قیمت دستگاه‌های تجاری آمازون با هزینه ساخت ایران</h2>
          <p className="text-xs text-[#8a8a92] mt-1">
            چگونه با ۵٪ تا ۱۰٪ قیمت نمونه خارجی برندهای اصلی، همان کیفیت را با هوش مصنوعی و ساخت کارگاهی ارائه دهیم؟
          </p>
        </div>

        {/* Currency Switcher */}
        <div className="flex items-center gap-1.5 bg-black/40 p-1.5 rounded-2xl border border-white/[0.08]">
          <button
            onClick={() => setSelectedCurrency('toman')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
              selectedCurrency === 'toman' ? 'bg-[#44d4cf] text-[#0b0c15]' : 'text-[#8a8a92] hover:text-[#f6f5f0]'
            }`}
          >
            تومان (بازار ایران)
          </button>
          <button
            onClick={() => setSelectedCurrency('usd')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
              selectedCurrency === 'usd' ? 'bg-[#e8a44f] text-[#0b0c15]' : 'text-[#8a8a92] hover:text-[#f6f5f0]'
            }`}
          >
            دلار ($ Amazon)
          </button>
          <button
            onClick={() => setSelectedCurrency('euro')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
              selectedCurrency === 'euro' ? 'bg-[#e88598] text-[#0b0c15]' : 'text-[#8a8a92] hover:text-[#f6f5f0]'
            }`}
          >
            یورو (€ صادرات EU)
          </button>
        </div>
      </div>

      {/* Comparison Cards Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {comparisonDataList.map((item) => (
          <div
            key={item.deviceNum}
            className="p-6 rounded-2xl bg-[#080911] border border-white/[0.08] flex flex-col justify-between hover:border-white/[0.2] transition"
          >
            <div>
              {/* Device Header */}
              <div className="flex items-start justify-between gap-3 mb-4">
                <div>
                  <span className="text-[10px] font-bold text-[#44d4cf] px-2 py-0.5 rounded-full bg-[#44d4cf]/10 border border-[#44d4cf]/30">
                    طرح شماره {item.deviceNum}
                  </span>
                  <h3 className="font-bold text-base text-[#f6f5f0] mt-1.5">{item.title}</h3>
                </div>
                <span className="text-xs font-black text-[#e8a44f] bg-[#e8a44f]/10 px-3 py-1 rounded-full border border-[#e8a44f]/20 shrink-0">
                  سود {item.profitMarginPercent}٪
                </span>
              </div>

              {/* Amazon / OEM Specs */}
              <div className="space-y-2 text-xs mb-6">
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                  <p className="text-[10px] text-[#8a8a92] mb-0.5">دستگاه معادل خارجی در آمازون (Amazon Brand):</p>
                  <p className="font-bold text-[#e88598]">{item.originalOem}</p>
                  <p className="text-[11px] text-[#8a8a92] font-mono mt-0.5">قیمت آمازون: {item.originalOemPriceAmazon}</p>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                  <p className="text-[10px] text-[#44d4cf] mb-0.5 font-bold">ارزش افزوده هوش مصنوعی ایرانی:</p>
                  <p className="text-[#ebeae3] leading-relaxed">{item.keyAdvantage}</p>
                </div>
              </div>

              {/* Financial Metrics */}
              <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] text-center mb-4 text-xs">
                <div>
                  <p className="text-[10px] text-[#8a8a92]">هزینه قطعات ایران</p>
                  <p className="font-bold text-[#f6f5f0] mt-0.5">
                    {selectedCurrency === 'toman' && item.dentLabIranProductionCostRial}
                    {selectedCurrency === 'usd' && `$${item.dentLabIranCostUsd}`}
                    {selectedCurrency === 'euro' && `€${Math.round(item.dentLabIranCostUsd * 0.92)}`}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-[#8a8a92]">فروش در ایران</p>
                  <p className="font-bold text-[#44d4cf] mt-0.5">
                    {selectedCurrency === 'toman' && item.dentLabIranSaleRial}
                    {selectedCurrency === 'usd' && `$${item.dentLabIranSaleUsd}`}
                    {selectedCurrency === 'euro' && `€${Math.round(item.dentLabIranSaleUsd * 0.92)}`}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-[#8a8a92]">صادرات صادراتی EU</p>
                  <p className="font-bold text-[#e8a44f] mt-0.5">{item.dentLabEuropeExportEuro}</p>
                </div>
              </div>
            </div>

            {/* Download BOM CSV Button */}
            <button
              onClick={() => downloadTextFile(`BOM_List_Device_${item.deviceNum}.csv`, BOMS_CSV[item.bomCsvKey], 'text/csv;charset=utf-8')}
              className="w-full py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-[#44d4cf] font-bold text-xs flex items-center justify-center gap-2 hover:bg-[#44d4cf]/10 hover:border-[#44d4cf]/30 transition"
            >
              <Download className="w-4 h-4" />
              <span>دانلود فایل لیست قطعات و قیمت‌های آمازون (BOM CSV)</span>
            </button>
          </div>
        ))}
      </div>

      {/* Strategic Callout */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-[#2a8a87]/20 via-[#e8a44f]/10 to-transparent border border-[#44d4cf]/30 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-xs">
          <Sparkles className="w-5 h-5 text-[#44d4cf] shrink-0" />
          <span className="text-[#ebeae3] leading-relaxed">
            به دلیل عدم وجود تست‌های سنگین بالینی MDR در کلاس I تجهیزات کمکی، محصول شما مستقیم در رقابت با دستگاه‌های $1,800 تا $5,000 آمازون برنده اصلی قیمت بازار خواهد بود.
          </span>
        </div>
      </div>
    </div>
  );
};
