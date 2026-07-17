import React from 'react';
import { 
  Cpu, ScanLine, Package, Palette, 
  TrendingUp, Zap, CheckCircle2,
  ArrowLeft, Lightbulb, Wrench
} from 'lucide-react';
import { TabType } from './Navbar';
import { AmazonPriceComparer } from './AmazonPriceComparer';
import { CADDownloadModal } from './CADDownloadModal';
import { FullDeviceGallery } from './FullDeviceGallery';

interface OverviewSectionProps {
  onSelectProject: (tab: TabType) => void;
}

export const OverviewSection: React.FC<OverviewSectionProps> = ({ onSelectProject }) => {
  const projects = [
    {
      id: 'thermoformer' as TabType,
      num: '1',
      title: 'دستگاه وکیوم فرمر هوشمند رومیزی',
      subtitle: 'Smart Lab Thermoformer Unit',
      originalDevice: 'Erkodent (آلمان) و Biostar ($1,800)',
      aiUpgrade: 'تنظیم اتوماتیک دما و زمان مکش با سنسور مادون قرمز MLX90614؛ جلوگیری کامل از سوختن ورق PETG',
      application: 'الاینر شفاف ارتودنسی، نایت‌گارد دندان‌قروچه، پلاک بلیچینگ',
      license: 'تجهیزات آزمایشگاهی (بدون نیاز به CE پزشکی و تست بالینی)',
      successRate: '92%',
      timeline: '۶ هفته',
      costLocal: '۶ تا ۸ میلیون تومان',
      saleLocal: '۲۸ تا ۳۸ میلیون تومان',
      saleGlobal: '۴۵۰ تا ۶۵۰ یورو',
      profitMargin: 'بالای ۳۰۰٪',
      icon: Cpu,
      color: 'from-[#2a8a87] to-[#44d4cf]',
      textColor: 'text-[#44d4cf]',
      borderColor: 'border-[#44d4cf]/30',
      badge: 'پولسازترین و پرتقاضاترین در بازار ایران',
      procurementLocation: 'لاله‌زار (المنت) + بازار پامنار (اکریلیک) + امجد (ESP32)',
      image: '/images/thermoformer.jpg',
    },
    {
      id: 'impression' as TabType,
      num: '2',
      title: 'جعبه نور + اپ کنترل کیفیت قالب دندان',
      subtitle: 'AI Impression Quality Checker',
      originalDevice: 'اسکنر ۳D لابراتواری 3Shape ($5,000)',
      aiUpgrade: 'تحلیل ۵ ثانیه‌ای تصویر قالب سیلیکونی/آلژیناتی، تشخیص حباب، کشیدگی و پارگی حاشیه تراش',
      application: 'بررسی سلامت قالب خمیری پیش از ارسال به لابراتوار و جلوگیری از دوباره‌کاری',
      license: 'فقط لایت باکس آزمایشگاهی + نرم‌افزار آموزشی (صفر تحریم)',
      successRate: '88%',
      timeline: '۴ هفته',
      costLocal: '۱۵ تا ۲۵ میلیون تومان (بیشترش هزینه نرم‌افزار)',
      saleLocal: 'اشتراک ماهی ۴۰۰ هزار تومان per مطب',
      saleGlobal: '$49 - $99 / ماهانه SaaS',
      profitMargin: 'بیش از ۵۰۰٪ (بدون استهلاک قطعه)',
      icon: ScanLine,
      color: 'from-[#e8a44f] to-[#f0c878]',
      textColor: 'text-[#e8a44f]',
      borderColor: 'border-[#e8a44f]/30',
      badge: 'صفر درصد تحریم و نرم‌افزار خالص',
      procurementLocation: 'چارسو / امجد (LED ۵۶۳۰) + Teachable Machine گوگل',
      image: '/images/impression_scanner.jpg',
    },
    {
      id: 'autoclave' as TabType,
      num: '3',
      title: 'لاگر هوشمند اتوکلاو + چاپگر QR استریل',
      subtitle: 'Autoclave Sterilization Logger & QR Tracker',
      originalDevice: '3M Comply SteriGage & Bowie Dick Logger',
      aiUpgrade: 'ثبت خودکار منحنی دما/فشار اتوکلاو، محاسبه زمان انقضای استریل و چاپ QR برچسب پک',
      application: 'ردیابی ابزار استریل مطب، تاییدیه بازرسی بهداشت و اتصال به اتوماسیون',
      license: 'اکسسوری جانبی مطب (خودش استریل کننده نیست)',
      successRate: '85%',
      timeline: '۵ هفته',
      costLocal: '۸ تا ۱۲ میلیون تومان',
      saleLocal: '۲۲ تا ۳۰ میلیون تومان',
      saleGlobal: '$350 - $500',
      profitMargin: '۲۵۰٪',
      icon: Package,
      color: 'from-[#d45d78] to-[#e88598]',
      textColor: 'text-[#d45d78]',
      borderColor: 'border-[#d45d78]/30',
      badge: 'مطابق الزامات بهداشتی جدید اروپا',
      procurementLocation: 'ترموکوپل K + پرینتر حرارتی ۲ اینچ نادکو/پاساژ امجد',
      image: '/images/autoclave_logger.jpg',
    },
    {
      id: 'shade' as TabType,
      num: '4',
      title: 'اپلیکیشن تطبیق رنگ دندان با کارت کالیبراسیون',
      subtitle: 'VITA Shade AI Matcher & GrayCard',
      originalDevice: 'دستگاه VITA Easyshade ($1,200)',
      aiUpgrade: 'حذف خطای نور مطب با کارت طوسی کالیبراسیون ۱۰ هزار تومانی + آنالیز طیف رنگ VITA Tooth Code',
      application: 'ارتباط بی‌نقص دندانپزشک و لابراتوار جهت ساخت روکش‌های کامپوزیت و سرامیک',
      license: 'نرم‌افزار ارتباطی و کالیبراسیون (بدون سخت‌افزار پیچیده)',
      successRate: '90%',
      timeline: '۴ هفته',
      costLocal: '۱۰ تا ۱۵ میلیون تومان',
      saleLocal: 'اشتراک ماهی ۳۰۰ هزار تومان per مطب',
      saleGlobal: '$29 - $59 / ماهانه SaaS',
      profitMargin: '۷۰۰٪',
      icon: Palette,
      color: 'from-[#c9a96e] to-[#e8bf82]',
      textColor: 'text-[#c9a96e]',
      borderColor: 'border-[#c9a96e]/30',
      badge: 'درآمد ماهیانه ثابت و مستمر',
      procurementLocation: 'چاپ فوتو گرافیک کارت خاکستری ۱۸٪ استاندارد + مدل AI Python',
      image: '/images/shade_matching.jpg',
    },
  ];

  return (
    <div className="space-[#0b0c15] text-[#f6f5f0] space-y-16 pb-16">
      {/* Dynamic Header Banner */}
      <div className="relative overflow-hidden rounded-3xl glass-card border border-white/[0.08] p-8 lg:p-12">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#44d4cf]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#e8a44f]/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#44d4cf]/10 border border-[#44d4cf]/20 text-[#44d4cf] text-xs font-bold mb-6">
            <Zap className="w-4 h-4" />
            نقشه راه کاملاً عملیاتی و کارگاهی برای مهندسان ایران
          </div>

          <h1 className="text-3xl sm:text-5xl font-black leading-tight tracking-tight mb-6">
            استراتژی ساخت تجهیزات <span className="bg-gradient-to-r from-[#44d4cf] via-[#2a8a87] to-[#e8a44f] bg-clip-text text-transparent">کمکی دندانپزشکی (Class I)</span>
          </h1>

          <p className="text-base sm:text-lg text-[#8a8a92] leading-relaxed mb-8">
            به جای ورود به سخت‌افزارهای پیچیده داخل دهانی (مثل ایمپلنت یا یونیت) که نیازمند مجوزهای طولانی کارآزمایی بالینی هستند، این ۴ طرح دقیقاً کپی برداری هوشمندانه از تجهیزات پرفروش خارجی با ارتقای هوش مصنوعی، قیمت ارزان و دریافت سریع تاییدیه <strong className="text-[#f6f5f0]">Class 1 Lab Device</strong> می‌باشند.
          </p>

          {/* Quick Pillar Highlights */}
          <div className="grid sm:grid-cols-4 gap-4 pt-4 border-t border-white/[0.06] mb-6">
            {[
              { title: 'بدون تست بالینی', desc: 'تجهیزات آزمایشگاه و مطب' },
              { title: 'صادرات بی‌دردسر', desc: 'برچسب Lab Equipment' },
              { title: 'قطعات در دسترس', desc: 'لاله‌زار، پامنار و امجد' },
              { title: 'زمان تا بازار کوتاه', desc: '۴ تا ۶ هفته نمونه اولیه' },
            ].map((p, idx) => (
              <div key={idx} className="bg-white/[0.02] border border-white/[0.05] p-3.5 rounded-2xl">
                <p className="text-xs font-bold text-[#44d4cf] mb-1">{p.title}</p>
                <p className="text-[11px] text-[#8a8a92]">{p.desc}</p>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-white/[0.06]">
            <CADDownloadModal />
          </div>
        </div>
      </div>

      {/* Full Device Photographic Gallery */}
      <FullDeviceGallery />

      {/* 4 Projects Grid */}
      <div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#f6f5f0]">لیست ۴ پروژه کارگاهی و پولساز</h2>
            <p className="text-sm text-[#8a8a92] mt-1">یک پروژه را برای مشاهده لیست قطعات بازار تهران، شبیه‌ساز زنده و کدهای کامپایل‌شده انتخاب کنید</p>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#8a8a92]">
            <Wrench className="w-4 h-4 text-[#e8a44f]" />
            آماده مونتاژ کارگاهی
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {projects.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.id}
                className={`group relative rounded-3xl glass-card border border-white/[0.08] p-6 lg:p-8 hover:border-white/[0.2] transition-all duration-300 flex flex-col justify-between`}
              >
                {/* Accent top gradient line */}
                <div className={`absolute top-0 right-8 left-8 h-[2px] bg-gradient-to-r ${p.color}`} />

                <div>
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${p.color} p-[1px] shadow-lg shrink-0`}>
                        <div className="w-full h-full bg-[#0b0c15] rounded-[15px] flex items-center justify-center">
                          <Icon className={`w-6 h-6 ${p.textColor}`} />
                        </div>
                      </div>
                      <div>
                        <span className="text-[11px] font-bold text-[#8a8a92] tracking-wider uppercase">پروژه #{p.num}</span>
                        <h3 className="text-xl font-bold text-[#f6f5f0] group-hover:text-[#44d4cf] transition-colors">{p.title}</h3>
                        <p className="text-xs text-[#8a8a92]">{p.subtitle}</p>
                      </div>
                    </div>
                    <span className={`text-[10px] px-2.5 py-1 rounded-full bg-white/[0.04] border ${p.borderColor} ${p.textColor} font-bold shrink-0`}>
                      موفقیت {p.successRate}
                    </span>
                  </div>

                  {/* Device Real Industrial Photo Preview */}
                  <div className="mb-5 rounded-2xl overflow-hidden border border-white/10 h-44 relative group img-shimmer">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c15] via-transparent to-transparent opacity-80" />
                    <span className="absolute bottom-3 right-3 text-[10px] px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md text-[#f6f5f0] border border-white/10 font-bold">
                      تصویر صنعتی واقعی دستگاه #{p.num}
                    </span>
                  </div>

                  {/* Badge */}
                  <div className="mb-5 inline-block">
                    <span className="text-xs px-3 py-1 rounded-xl bg-white/[0.03] border border-white/[0.06] text-[#e8a44f] font-semibold flex items-center gap-1.5">
                      <Lightbulb className="w-3.5 h-3.5" />
                      {p.badge}
                    </span>
                  </div>

                  {/* Comparison Details */}
                  <div className="space-y-3 text-xs leading-relaxed mb-6">
                    <div className="bg-white/[0.02] border border-white/[0.04] p-3 rounded-2xl">
                      <p className="text-[10px] text-[#8a8a92] mb-1 font-semibold">الگوبرداری از کدام دستگاه خارجی؟</p>
                      <p className="text-[#f6f5f0] font-bold">{p.originalDevice}</p>
                    </div>

                    <div className="bg-white/[0.02] border border-white/[0.04] p-3 rounded-2xl">
                      <p className="text-[10px] text-[#44d4cf] mb-1 font-semibold">ارتقا با هوش مصنوعی (ارزش افزوده اصلی):</p>
                      <p className="text-[#ebeae3]">{p.aiUpgrade}</p>
                    </div>

                    <div className="bg-white/[0.02] border border-white/[0.04] p-3 rounded-2xl">
                      <p className="text-[10px] text-[#8a8a92] mb-1 font-semibold">محل تهیه قطعات در تهران:</p>
                      <p className="text-[#e8a44f] font-medium">{p.procurementLocation}</p>
                    </div>
                  </div>

                  {/* Financial Stats Bar */}
                  <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-white/[0.02] border border-white/[0.05] mb-6 text-center">
                    <div>
                      <p className="text-[10px] text-[#8a8a92]">هزینه تولید</p>
                      <p className="text-xs font-bold text-[#f6f5f0] mt-0.5">{p.costLocal}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-[#8a8a92]">فروش ایران</p>
                      <p className="text-xs font-bold text-[#44d4cf] mt-0.5">{p.saleLocal}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-[#8a8a92]">فروش صادراتی</p>
                      <p className="text-xs font-bold text-[#e8a44f] mt-0.5">{p.saleGlobal}</p>
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <button
                  onClick={() => onSelectProject(p.id)}
                  className={`w-full py-3 px-4 rounded-2xl bg-gradient-to-r ${p.color} text-[#0b0c15] font-extrabold text-xs flex items-center justify-center gap-2 hover:brightness-110 transition shadow-lg`}
                >
                  <span>ورود به نقشه ساخت، شبیه‌ساز و دریافت کدهای پروژه #{p.num}</span>
                  <ArrowLeft className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Amazon vs Iran Price Comparison Breakdown */}
      <AmazonPriceComparer />

      {/* Full Matrix Comparison Table */}
      <div className="glass-card rounded-3xl p-6 lg:p-8 border border-white/[0.08]">
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="w-6 h-6 text-[#44d4cf]" />
          <div>
            <h3 className="text-xl font-bold text-[#f6f5f0]">جدول خلاصه مالی و عملیاتی ۴ طرح</h3>
            <p className="text-xs text-[#8a8a92]">دید جامع جهت تصمیم‌گیری سریع تیم فنی و سرمایه‌گذار</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-right border-collapse">
            <thead>
              <tr className="border-b border-white/[0.08] text-[#8a8a92]">
                <th className="py-3 px-4 font-bold">#</th>
                <th className="py-3 px-4 font-bold">عنوان دستگاه</th>
                <th className="py-3 px-4 font-bold">زمان تا نمونه اولیه</th>
                <th className="py-3 px-4 font-bold">سرمایه اولیه ساخت</th>
                <th className="py-3 px-4 font-bold">قیمت فروش ایران</th>
                <th className="py-3 px-4 font-bold">قیمت یورو / صادرات</th>
                <th className="py-3 px-4 font-bold text-left">حاشیه سود</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              <tr className="hover:bg-white/[0.02]">
                <td className="py-3.5 px-4 font-bold text-[#44d4cf]">1</td>
                <td className="py-3.5 px-4 font-bold text-[#f6f5f0]">وکیوم فرمر هوشمند</td>
                <td className="py-3.5 px-4 text-[#ebeae3]">۶ هفته</td>
                <td className="py-3.5 px-4 text-[#ebeae3]">۷۰ تا ۱۱۰ میلیون تومان</td>
                <td className="py-3.5 px-4 text-[#44d4cf] font-bold">۲۸ تا ۳۸ میلیون</td>
                <td className="py-3.5 px-4 text-[#e8a44f] font-bold">۴۵۰ تا ۶۵۰ یورو</td>
                <td className="py-3.5 px-4 text-left font-bold text-[#44d4cf]">۳۰۰٪+</td>
              </tr>
              <tr className="hover:bg-white/[0.02]">
                <td className="py-3.5 px-4 font-bold text-[#e8a44f]">2</td>
                <td className="py-3.5 px-4 font-bold text-[#f6f5f0]">جعبه کیفیت قالب AI</td>
                <td className="py-3.5 px-4 text-[#ebeae3]">۴ هفته</td>
                <td className="py-3.5 px-4 text-[#ebeae3]">۱۵ تا ۲۵ میلیون تومان</td>
                <td className="py-3.5 px-4 text-[#44d4cf] font-bold">اشتراک ۴۰۰ هزار/ماه</td>
                <td className="py-3.5 px-4 text-[#e8a44f] font-bold">$49 - $99 / ماه</td>
                <td className="py-3.5 px-4 text-left font-bold text-[#e8a44f]">۵۰۰٪+</td>
              </tr>
              <tr className="hover:bg-white/[0.02]">
                <td className="py-3.5 px-4 font-bold text-[#d45d78]">3</td>
                <td className="py-3.5 px-4 font-bold text-[#f6f5f0]">لاگر اتوکلاو + چاپ QR</td>
                <td className="py-3.5 px-4 text-[#ebeae3]">۵ هفته</td>
                <td className="py-3.5 px-4 text-[#ebeae3]">۲۰ تا ۳۰ میلیون تومان</td>
                <td className="py-3.5 px-4 text-[#44d4cf] font-bold">۲۲ تا ۳۰ میلیون</td>
                <td className="py-3.5 px-4 text-[#e8a44f] font-bold">$350 - $500</td>
                <td className="py-3.5 px-4 text-left font-bold text-[#d45d78]">۲۵۰٪</td>
              </tr>
              <tr className="hover:bg-white/[0.02]">
                <td className="py-3.5 px-4 font-bold text-[#c9a96e]">4</td>
                <td className="py-3.5 px-4 font-bold text-[#f6f5f0]">اپ تطبیق رنگ VITA</td>
                <td className="py-3.5 px-4 text-[#ebeae3]">۴ هفته</td>
                <td className="py-3.5 px-4 text-[#ebeae3]">۱۰ تا ۱۵ میلیون تومان</td>
                <td className="py-3.5 px-4 text-[#44d4cf] font-bold">اشتراک ۳۰۰ هزار/ماه</td>
                <td className="py-3.5 px-4 text-[#e8a44f] font-bold">$29 - $59 / ماه</td>
                <td className="py-3.5 px-4 text-left font-bold text-[#c9a96e]">۷۰۰٪+</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Direct recommendation banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-[#1a5c5a]/40 via-[#2a8a87]/20 to-[#0b0c15] border border-[#44d4cf]/20 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[#44d4cf] text-xs font-bold">
            <CheckCircle2 className="w-4 h-4" />
            پیشنهاد ویژه شروع فوری
          </div>
          <h4 className="text-xl font-bold text-[#f6f5f0]">پروژه‌های شماره ۱ (وکیوم هوشمند) و شماره ۲ (کنترل قالب) بیشترین بازار نقدی فعلی تهران را دارند!</h4>
          <p className="text-xs text-[#8a8a92]">تولیدکنندگان الاینر شفاف در تهران، مشهد و شیراز هم‌اکنون نقد خریدار این دو دستگاه هستند.</p>
        </div>
        <div className="flex flex-wrap gap-3 shrink-0">
          <button
            onClick={() => onSelectProject('thermoformer')}
            className="px-5 py-2.5 rounded-xl bg-[#44d4cf] text-[#0b0c15] font-bold text-xs hover:brightness-110 transition shadow-md"
          >
            مشاهده پروژه ۱ (وکیوم)
          </button>
          <button
            onClick={() => onSelectProject('impression')}
            className="px-5 py-2.5 rounded-xl bg-white/[0.05] border border-white/[0.1] text-[#f6f5f0] font-bold text-xs hover:bg-white/[0.1] transition"
          >
            مشاهده پروژه ۲ (قالب)
          </button>
        </div>
      </div>
    </div>
  );
};
