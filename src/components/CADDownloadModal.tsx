import React, { useState } from 'react';
import { 
  Download, FileCode, Layers, Box, Check, Cpu, ScanLine, Package, Palette, X
} from 'lucide-react';
import { downloadTextFile, CAD_DXF_TEMPLATES, GERBER_PCB_SPEC, BOMS_CSV } from '../utils/fileDownloader';

export const CADDownloadModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeDevice, setActiveDevice] = useState<'thermoformer' | 'impression' | 'autoclave' | 'shade'>('thermoformer');
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const deviceSpecs = {
    thermoformer: {
      name: 'وکیوم فرمر هوشمند رومیزی (AI Smart Thermoformer)',
      dxfKey: 'thermoformer' as const,
      bomKey: 'thermoformer' as const,
      dimensions: '۲۴۰mm × ۲۶۰mm × ۲۰۰mm',
      materials: 'ورق فولاد روغنی ST12 + اکریلیک ۵mm تایوانی + آلومینیوم آنودایز شده',
      icon: Cpu,
      color: 'text-[#44d4cf]',
      borderColor: 'border-[#44d4cf]/30',
      dxfFilename: 'Thermoformer_FullChassis_v2.4.dxf',
      stepFilename: 'Thermoformer_3D_Assembly.step',
    },
    impression: {
      name: 'جعبه نور کنترل کیفیت قالب (AI Impression Lightbox)',
      dxfKey: 'impressionBox' as const,
      bomKey: 'impressionScanner' as const,
      dimensions: '۳۰۰mm × ۳۰۰mm × ۲۵۰mm',
      materials: 'پلکسی دو جداره ۲mm مات شیری + پایه آلومینیومی دوربین HD',
      icon: ScanLine,
      color: 'text-[#e8a44f]',
      borderColor: 'border-[#e8a44f]/30',
      dxfFilename: 'Impression_Lightbox_Laser.dxf',
      stepFilename: 'Impression_Box_Assembly.step',
    },
    autoclave: {
      name: 'لاگر اتوکلاو و پرینتر QR استریل (Sterilization Data Logger)',
      dxfKey: 'autoclaveLogger' as const,
      bomKey: 'autoclaveLogger' as const,
      dimensions: '۱۴۰mm × ۱۲۰mm × ۸۰mm',
      materials: 'باکس پلاستیکی ABS صنعتی ریل DIN + پرینتر حرارتی TTL ۲ اینچ',
      icon: Package,
      color: 'text-[#e88598]',
      borderColor: 'border-[#e88598]/30',
      dxfFilename: 'Autoclave_Logger_Cabinet.dxf',
      stepFilename: 'Autoclave_Logger_Assembly.step',
    },
    shade: {
      name: 'اپ و کارت کالیبراسیون ۱۸٪ طوسی (VITA Shade GrayCard)',
      dxfKey: 'shadeCard' as const,
      bomKey: 'shadeMatcher' as const,
      dimensions: '۸۵mm × ۵۵mm (کارت اعتباری استاندارد)',
      materials: 'پلاستیک مات پلی‌کربنات سنباده‌ای با مقاومت اتوکلاو',
      icon: Palette,
      color: 'text-[#e8bf82]',
      borderColor: 'border-[#e8bf82]/30',
      dxfFilename: 'VITA_GrayCard_Format.dxf',
      stepFilename: 'GrayCard_Precision_Cad.step',
    },
  };

  const current = deviceSpecs[activeDevice];
  const Icon = current.icon;

  const handleDownloadFile = (type: 'dxf' | 'step' | 'gerber' | 'bom') => {
    let content = '';
    let filename = '';
    let mime = 'text/plain;charset=utf-8';

    if (type === 'dxf') {
      content = CAD_DXF_TEMPLATES[current.dxfKey];
      filename = current.dxfFilename;
    } else if (type === 'step') {
      content = `ISO-10303-21;\nHEADER;\n/* DentLab AI 3D STEP Specification Model for ${current.name} */\nENDSEC;\nDATA;\n#1 = PRODUCT('${current.name}', 'DentLab STEP Assembly', '', ());\nENDSEC;\nEND-ISO-10303-21;`;
      filename = current.stepFilename;
    } else if (type === 'gerber') {
      content = GERBER_PCB_SPEC;
      filename = `PCB_Gerber_${activeDevice}_Universal.gbr`;
    } else if (type === 'bom') {
      content = BOMS_CSV[current.bomKey];
      filename = `BOM_Suppliers_Tehran_${activeDevice}.csv`;
      mime = 'text/csv;charset=utf-8';
    }

    downloadTextFile(filename, content, mime);
    setDownloadSuccess(`فایل ${filename} با موفقیت دانلود شد!`);
    setTimeout(() => setDownloadSuccess(null), 3000);
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[#e8a44f] to-[#f0c878] text-[#0b0c15] font-extrabold text-xs flex items-center gap-2 hover:brightness-110 transition shadow-[0_0_20px_rgba(232,164,79,0.25)]"
      >
        <Download className="w-4 h-4" />
        <span>مرکز دانلود نقشه‌های CAD، فایل‌های DXF و Gerber قطعات</span>
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="glass-card rounded-3xl p-6 lg:p-8 border border-white/[0.1] max-w-3xl w-full max-h-[90vh] overflow-y-auto space-y-6 relative bg-[#0b0c15]">
            {/* Modal Close */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 left-6 p-2 rounded-xl bg-white/[0.04] text-[#8a8a92] hover:text-[#f6f5f0] hover:bg-white/[0.1] transition"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#44d4cf]/10 text-[#44d4cf] text-xs font-bold mb-2">
                <Box className="w-4 h-4" />
                دانلود فایل‌های اتوکد، برش لیزر و PCB
              </div>
              <h2 className="text-2xl font-black text-[#f6f5f0]">مرکز دریافت مستقیم فایل‌های مهندسی ساخت</h2>
              <p className="text-xs text-[#8a8a92] mt-1">
                دانلود مستقیم فایل‌های AutoCAD .DXF، فایل‌های سه بعدی .STEP، گربور برد PCB و لیست BOM قطعات
              </p>
            </div>

            {/* Device Switcher Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-black/40 p-1.5 rounded-2xl border border-white/[0.08]">
              {(['thermoformer', 'impression', 'autoclave', 'shade'] as const).map((dev) => {
                const spec = deviceSpecs[dev];
                const DevIcon = spec.icon;
                const isActive = activeDevice === dev;
                return (
                  <button
                    key={dev}
                    onClick={() => setActiveDevice(dev)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold transition flex flex-col items-center gap-1 ${
                      isActive
                        ? 'bg-[#44d4cf] text-[#0b0c15] shadow-md'
                        : 'text-[#8a8a92] hover:text-[#f6f5f0] hover:bg-white/[0.04]'
                    }`}
                  >
                    <DevIcon className="w-4 h-4" />
                    <span className="text-[10px] truncate">{spec.name.split(' ')[0]}</span>
                  </button>
                );
              })}
            </div>

            {/* Device Info Card */}
            <div className={`p-5 rounded-2xl bg-[#080911] border ${current.borderColor} space-y-3`}>
              <div className="flex items-center gap-3">
                <Icon className={`w-6 h-6 ${current.color}`} />
                <div>
                  <h3 className="font-bold text-sm text-[#f6f5f0]">{current.name}</h3>
                  <p className="text-xs text-[#8a8a92]">{current.dimensions}</p>
                </div>
              </div>
              <p className="text-xs text-[#ebeae3] bg-white/[0.02] p-3 rounded-xl border border-white/[0.04]">
                <strong className="text-[#8a8a92]">متریال‌های پیشنهادی ساخت: </strong>
                {current.materials}
              </p>
            </div>

            {/* Success Notification Alert */}
            {downloadSuccess && (
              <div className="p-3.5 rounded-2xl bg-[#44d4cf]/15 border border-[#44d4cf]/30 text-[#44d4cf] text-xs font-bold flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>{downloadSuccess}</span>
              </div>
            )}

            {/* Download Buttons Matrix */}
            <div className="grid sm:grid-cols-2 gap-4">
              <button
                onClick={() => handleDownloadFile('dxf')}
                className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-[#44d4cf] transition text-right group"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-xs text-[#f6f5f0] group-hover:text-[#44d4cf] transition">
                    ۱. فایل AutoCAD .DXF (برش لیزری)
                  </span>
                  <FileCode className="w-4 h-4 text-[#44d4cf]" />
                </div>
                <p className="text-[11px] text-[#8a8a92]">{current.dxfFilename}</p>
              </button>

              <button
                onClick={() => handleDownloadFile('step')}
                className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-[#e8a44f] transition text-right group"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-xs text-[#f6f5f0] group-hover:text-[#e8a44f] transition">
                    ۲. مدل ۳D استاندارد .STEP
                  </span>
                  <Box className="w-4 h-4 text-[#e8a44f]" />
                </div>
                <p className="text-[11px] text-[#8a8a92]">{current.stepFilename}</p>
              </button>

              <button
                onClick={() => handleDownloadFile('gerber')}
                className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-[#e88598] transition text-right group"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-xs text-[#f6f5f0] group-hover:text-[#e88598] transition">
                    ۳. فایل چاپ برد Gerber PCB
                  </span>
                  <Layers className="w-4 h-4 text-[#e88598]" />
                </div>
                <p className="text-[11px] text-[#8a8a92]">PCB_Gerber_{activeDevice}_Universal.gbr</p>
              </button>

              <button
                onClick={() => handleDownloadFile('bom')}
                className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-[#e8bf82] transition text-right group"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-xs text-[#f6f5f0] group-hover:text-[#e8bf82] transition">
                    ۴. جدول BOM قطعات و آدرس بازار
                  </span>
                  <Download className="w-4 h-4 text-[#e8bf82]" />
                </div>
                <p className="text-[11px] text-[#8a8a92]">BOM_Suppliers_Tehran_{activeDevice}.csv</p>
              </button>
            </div>

            {/* Modal Footer */}
            <div className="pt-4 border-t border-white/[0.06] flex justify-end">
              <button
                onClick={() => setIsOpen(false)}
                className="px-5 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-xs font-bold text-[#8a8a92] hover:text-[#f6f5f0] transition"
              >
                بستن پنجره
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
