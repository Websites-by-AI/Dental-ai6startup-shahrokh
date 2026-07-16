import React, { useState } from 'react';
import { 
  ShieldCheck, FileText, Globe, Check, Copy, AlertTriangle, Sparkles
} from 'lucide-react';

export const ExportGuideSection: React.FC = () => {
  const [copiedDoc, setCopiedDoc] = useState<boolean>(false);

  const declarationDoc = `EC DECLARATION OF CONFORMITY (Lab Equipment)
--------------------------------------------------
Manufacturer Name: DentLab Innovations Ltd. / Pardis Technology Park, Tehran, Iran
Product Name: Smart Dental Thermoformer / Impression Quality Analyzer
Model Ref: DENTLAB-TH1800 / DENTLAB-IQ50

Classification & Legal Status:
Class I - Dental Laboratory Auxiliary Equipment according to Directives 2014/35/EU (LVD) and 2014/30/EU (EMC).

Intended Purpose Declaration:
"Dental Laboratory Auxiliary Equipment. Designed solely for model thermoforming, impression scanning, and dental laboratory processing. NOT INTENDED FOR DIRECT PATIENT INVASIVE CONTACT."

Applied Standards:
- EN ISO 12100:2010 (Safety of machinery)
- EN 61010-1:2010 (Safety requirements for electrical equipment for laboratory use)
- EN 61326-1:2013 (EMC requirements for laboratory use)

The undersigned hereby declares under sole responsibility that the equipment specified above conforms to the relevant Union harmonization legislation.
Authorized Signature: Director of Engineering & Regulatory Affairs
`;

  const handleCopyDoc = () => {
    navigator.clipboard.writeText(declarationDoc);
    setCopiedDoc(true);
    setTimeout(() => setCopiedDoc(false), 2000);
  };

  return (
    <div className="space-y-12 pb-12">
      {/* Header Banner */}
      <div className="rounded-3xl glass-card border border-[#44d4cf]/30 p-8 lg:p-10 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-80 h-80 bg-[#44d4cf]/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#44d4cf]/10 border border-[#44d4cf]/30 text-[#44d4cf] text-xs font-bold mb-4">
              <Globe className="w-4 h-4" />
              راهنمای صادرات اروپایی و بین‌المللی
            </div>
            <h1 className="text-3xl lg:text-4xl font-black text-[#f6f5f0] mb-3">
              نکته طلایی صادرات به اروپا (عبور کامل از تحریم و قانون سخت‌گیرانه MDR)
            </h1>
            <p className="text-sm text-[#8a8a92] max-w-2xl leading-relaxed">
              با فرمول اظهارنامه تجهیزات لابراتواری (<strong className="text-[#f6f5f0]">Dental Laboratory Equipment</strong>)، نیازی به تست بالینی یا CE پزشکی ندارد. این محصولات به‌عنوان ابزار کارگاهی مستقیم به آلمان، ترکیه و کشورهای خلیج فارس صادر می‌شوند.
            </p>
          </div>
          <div className="bg-white/[0.03] border border-white/[0.08] p-4 rounded-2xl text-center shrink-0 min-w-[200px]">
            <p className="text-[11px] text-[#8a8a92] mb-1">کلاس مجوز صادراتی</p>
            <p className="text-2xl font-black text-[#44d4cf]">Class I Lab Device</p>
            <p className="text-[10px] text-[#e8a44f] mt-1">تاییدیه پارک پردیس + CE خوداظهاری</p>
          </div>
        </div>
      </div>

      {/* Strategy Steps */}
      <div className="grid md:grid-cols-3 gap-6">
        {[
          {
            step: '۱',
            title: 'برچسب‌گذاری صحیح (Labeling)',
            desc: 'در تمام مدارک و پلاک پشت دستگاه دقیقاً قید کنید: Dental Laboratory Auxiliary Equipment - Not for Direct Patient Contact.',
            icon: FileText,
            color: 'text-[#44d4cf]',
          },
          {
            step: '۲',
            title: 'اخذ CE خوداظهاری از پردیس',
            desc: 'با عضویت در پارک علم و فناوری پردیس یا دانشگاه‌های صنعتی، گواهی استاندارد ایمنی الکتریکی EN 61010-1 را بدون تست بالینی دریافت کنید.',
            icon: ShieldCheck,
            color: 'text-[#e8a44f]',
          },
          {
            step: '۳',
            title: 'فروش به اروپا و کشورهای خلیج فارس',
            desc: 'دستگاه‌های کارگاهی به‌عنوان Lab Units از گمرک صادراتی بدون گیر دو منظوره نظامی خارج و با دلار/یورو تسویه می‌شوند.',
            icon: Globe,
            color: 'text-[#e88598]',
          },
        ].map((s, idx) => {
          const Icon = s.icon;
          return (
            <div key={idx} className="glass-card rounded-3xl p-6 border border-white/[0.08] relative">
              <span className="text-4xl font-black opacity-10 absolute top-4 left-6 text-[#f6f5f0]">{s.step}</span>
              <Icon className={`w-8 h-8 ${s.color} mb-4`} />
              <h3 className="text-lg font-bold text-[#f6f5f0] mb-2">{s.title}</h3>
              <p className="text-xs text-[#8a8a92] leading-relaxed">{s.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Official CE Declaration Document Template */}
      <div className="glass-card rounded-3xl p-6 lg:p-8 border border-white/[0.08]">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl font-bold text-[#f6f5f0] flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#44d4cf]" />
              نمونه فرم رسمی اظهارنامه خوداظهاری CE (EC Declaration of Conformity)
            </h2>
            <p className="text-xs text-[#8a8a92] mt-1">متن آماده جهت ثبت شرکت، صادرات گمرکی و ارسال برای خریداران اروپایی</p>
          </div>

          <button
            onClick={handleCopyDoc}
            className="px-4 py-2 rounded-xl bg-white/[0.04] border border-white/[0.1] hover:bg-[#44d4cf]/10 hover:border-[#44d4cf]/30 text-[#44d4cf] text-xs font-bold flex items-center gap-2 transition shrink-0"
          >
            {copiedDoc ? <Check className="w-4 h-4 text-[#44d4cf]" /> : <Copy className="w-4 h-4" />}
            <span>{copiedDoc ? 'فرم کپی شد!' : 'کپی متن اظهارنامه CE'}</span>
          </button>
        </div>

        <div className="bg-[#05060a] border border-white/[0.08] rounded-2xl p-4 font-mono text-xs text-[#ebeae3] overflow-x-auto max-h-[350px] leading-relaxed dir-ltr">
          <pre>{declarationDoc}</pre>
        </div>
      </div>

      {/* Alert note */}
      <div className="p-6 rounded-2xl bg-[#e8a44f]/10 border border-[#e8a44f]/30 flex items-start gap-4">
        <AlertTriangle className="w-6 h-6 text-[#e8a44f] shrink-0 mt-1" />
        <div className="text-xs leading-relaxed space-y-1">
          <p className="font-bold text-[#f6f5f0]">نکته حقوقی مهم برای تولیدکنندگان تجاری:</p>
          <p className="text-[#ebeae3]">
            تا زمانی که واژگانی چون "Medical Device for Patient In-Mouth Use" در کاتالوگ یا بدنه دستگاه درج نشود، قوانین استانداردهای پزشکی سنگین بیمارستانی شامل این ۴ دستگاه نمی‌شود و می‌توانید به‌عنوان تجهیزات آزمایشگاهی و کارگاهی در کل دنیا فروش داشته باشید.
          </p>
        </div>
      </div>
    </div>
  );
};
