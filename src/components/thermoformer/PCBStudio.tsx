import React, { useState } from 'react';
import { 
  Cpu, Zap, ShieldCheck, Download,
  Activity, Info, AlertTriangle, Radio
} from 'lucide-react';

interface ComponentBOM {
  ref: string;
  name: string;
  specs: string;
  marketLocation: string;
  pinout: string;
  approxCost: string;
}

export const PCBStudio: React.FC = () => {
  const [selectedComponent, setSelectedComponent] = useState<string>('esp32');
  const [copiedBOM, setCopiedBOM] = useState<boolean>(false);

  const bomList: ComponentBOM[] = [
    {
      ref: 'U1',
      name: 'برد توسعه میکروکنترلر ESP32 WROOM 32D',
      specs: '30 Pins, Dual Core 240MHz, Wi-Fi & BLE 4.2, 4MB Flash',
      marketLocation: 'پاساژ امجد - طبقه همکف / آفتاب رایانه',
      pinout: 'SDA=GPIO21, SCL=GPIO22, SSR_HEAT=GPIO23, VAC_RELAY=GPIO19, BUZZER=GPIO18, ENC_CLK=GPIO32, ENC_DT=GPIO33, ENC_SW=GPIO25',
      approxCost: '۲۱۰,۰۰۰ تومان',
    },
    {
      ref: 'S1',
      name: 'سنسور غیرتماسی مادون قرمز MLX90614ESF-BCC',
      specs: 'I2C Interface, 3.3V, Target Temp: -70°C to +380°C, FOV 35° Gradient Calibrated',
      marketLocation: 'پاساژ امجد - فروشگاه نادکو / جوان الکترونیک',
      pinout: 'VCC=3.3V, GND=GND, SDA=GPIO21, SCL=GPIO22 (Requires 4.7kΩ Pull-up Resistors)',
      approxCost: '۱۶۰,۰۰۰ تومان',
    },
    {
      ref: 'SSR1',
      name: 'رله حالت جامد SSR 40A AC (FOTEK SSR-40DA)',
      specs: 'Input: 3-32V DC, Output: 240V 40A AC, Zero-Cross Switching Trigger',
      marketLocation: 'لاله‌زار جنوبی - پاساژ الکتریک / عباسی',
      pinout: 'Input Pin 3 (+ Pin GPIO23), Pin 4 (GND), Output Pin 1, 2 in series with 1000W Heater',
      approxCost: '۱۴۰,۰۰۰ تومان',
    },
    {
      ref: 'RELAY1',
      name: 'ماژول رله ایزوله ۵V ۱۰A (برای موتور وکیوم)',
      specs: 'Optocoupler Isolated, 5V Coil, 250VAC 10A Switch',
      marketLocation: 'پاساژ امجد / پاساژ توکل',
      pinout: 'IN=GPIO19, VCC=5V, GND=GND, NO/COM connected to Vacuum Motor AC line',
      approxCost: '۴۵,۰۰۰ تومان',
    },
    {
      ref: 'OLED1',
      name: 'نمایشگر OLED 0.96 inch SSD1306',
      specs: '128x64 Pixels, Blue/Yellow I2C Display Module, 3.3V',
      marketLocation: 'پاساژ امجد / آفتاب رایانه',
      pinout: 'VCC=3.3V, GND=GND, SDA=GPIO21, SCL=GPIO22 (Shared I2C Bus Address 0x3C)',
      approxCost: '۱۱۰,۰۰۰ تومان',
    },
    {
      ref: 'PS1',
      name: 'منبع تغذیه سوئیچینگ ۲۲۰V به ۱۲V ۲A صنعتی',
      specs: 'MeanWell APV-25-12 / صنعتی کوچک، بازدهی ۹۰٪',
      marketLocation: 'لاله‌زار - پاساژ عباسی',
      pinout: 'AC L/N -> 220V Input, DC 12V Output -> Step-down to 5V & 3.3V for logic board',
      approxCost: '۱۹۰,۰۰۰ تومان',
    },
  ];

  const currentBOM = bomList.find((b) => b.ref.toLowerCase().includes(selectedComponent) || b.name.toLowerCase().includes(selectedComponent)) || bomList[0];

  const handleCopyBOM = () => {
    const bomText = bomList.map((b) => `${b.ref}: ${b.name} | Specs: ${b.specs} | Pinout: ${b.pinout} | Price: ${b.approxCost}`).join('\n');
    navigator.clipboard.writeText(bomText);
    setCopiedBOM(true);
    setTimeout(() => setCopiedBOM(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white/[0.02] border border-white/[0.08] p-5 rounded-3xl">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#44d4cf] mb-1">
            <Cpu className="w-4 h-4" />
            طراحی مدار الکترونیک و نقشه سیم‌کشی (Schematic & PCB Hardware Studio)
          </div>
          <h2 className="text-xl font-bold text-[#f6f5f0]">شماتیک الکترونیک و جدول اتصالات پین‌های ESP32</h2>
          <p className="text-xs text-[#8a8a92]">ایزولاسیون کامل بخش AC فشار قوی ۲۲۰V از بخش میکروکنترلر ۵V/۳.۳V</p>
        </div>

        <button
          onClick={handleCopyBOM}
          className="px-4 py-2 rounded-2xl bg-white/[0.04] border border-white/[0.1] hover:bg-[#44d4cf]/10 hover:border-[#44d4cf]/30 text-[#44d4cf] text-xs font-bold flex items-center gap-2 transition"
        >
          {copiedBOM ? <ShieldCheck className="w-4 h-4 text-[#44d4cf]" /> : <Download className="w-4 h-4" />}
          <span>{copiedBOM ? 'جدول قطعات کپی شد' : 'دانلود لیست BOM الکترونیک'}</span>
        </button>
      </div>

      {/* Schematic Interfacing Map & Pins Table */}
      <div className="grid lg:grid-cols-12 gap-8">
        {/* Schematic Circuit Display (7 cols) */}
        <div className="lg:col-span-7 glass-card rounded-3xl p-6 lg:p-8 border border-[#2a8a87]/30 flex flex-col justify-between relative overflow-hidden bg-[#05060b]">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2 text-xs font-bold text-[#f6f5f0]">
                <Activity className="w-4 h-4 text-[#44d4cf]" />
                شماتیک بلوکی ارتباط قطعات برد اصلی (Click component to view details)
              </div>
              <span className="text-[10px] px-2.5 py-1 rounded-full bg-[#44d4cf]/10 text-[#44d4cf] font-mono border border-[#44d4cf]/30">
                Bus: I2C & GPIO PWM
              </span>
            </div>

            {/* Circuit Block Diagram */}
            <div className="my-6 relative p-6 rounded-2xl bg-[#080911] border border-white/[0.08] space-y-6">
              {/* Top Sensor Bus Row */}
              <div className="flex items-center justify-between">
                {/* MLX90614 Sensor */}
                <div
                  onClick={() => setSelectedComponent('S1')}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer text-center ${
                    selectedComponent === 'S1' ? 'bg-[#e8a44f]/20 border-[#e8a44f]' : 'bg-white/[0.03] border-white/[0.08]'
                  }`}
                >
                  <p className="text-[10px] text-[#e8a44f] font-bold">S1: MLX90614 IR</p>
                  <p className="text-[9px] text-[#8a8a92]">I2C (0x5A)</p>
                </div>

                {/* I2C Pullup & Bus Lines */}
                <div className="flex-1 border-t-2 border-dashed border-[#44d4cf]/40 mx-4 relative flex items-center justify-center">
                  <span className="text-[8px] bg-[#080911] px-2 text-[#44d4cf] font-mono">I2C (SDA 21 / SCL 22)</span>
                </div>

                {/* OLED Display */}
                <div
                  onClick={() => setSelectedComponent('OLED1')}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer text-center ${
                    selectedComponent === 'OLED1' ? 'bg-[#44d4cf]/20 border-[#44d4cf]' : 'bg-white/[0.03] border-white/[0.08]'
                  }`}
                >
                  <p className="text-[10px] text-[#44d4cf] font-bold">OLED 0.96" UI</p>
                  <p className="text-[9px] text-[#8a8a92]">I2C (0x3C)</p>
                </div>
              </div>

              {/* Central Processor Block */}
              <div
                onClick={() => setSelectedComponent('esp32')}
                className={`p-5 rounded-2xl border-2 text-center transition-all cursor-pointer shadow-lg ${
                  selectedComponent === 'esp32'
                    ? 'bg-[#2a8a87]/30 border-[#44d4cf] shadow-[0_0_20px_rgba(68,212,207,0.2)]'
                    : 'bg-[#121420] border-white/[0.15]'
                }`}
              >
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Cpu className="w-5 h-5 text-[#44d4cf]" />
                  <span className="font-extrabold text-sm text-[#f6f5f0]">U1: ESP32-WROOM-32 Main Logic Controller</span>
                </div>
                <p className="text-[10px] text-[#8a8a92]">Bluetooth BLE Telemetry + Temperature PID Control Engine</p>
              </div>

              {/* High Voltage AC Power Control Drivers Row */}
              <div className="grid grid-cols-2 gap-4">
                {/* SSR Heater Driver */}
                <div
                  onClick={() => setSelectedComponent('SSR1')}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer text-right ${
                    selectedComponent === 'SSR1' ? 'bg-[#d45d78]/20 border-[#d45d78]' : 'bg-white/[0.03] border-white/[0.08]'
                  }`}
                >
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#e88598] mb-1">
                    <Zap className="w-3.5 h-3.5" />
                    SSR1: 40A SSR
                  </div>
                  <p className="text-[10px] text-[#8a8a92]">GPIO23 - کنترل المنت حرارتی ۱۰۰۰W AC</p>
                </div>

                {/* Vacuum Motor Driver */}
                <div
                  onClick={() => setSelectedComponent('RELAY1')}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer text-right ${
                    selectedComponent === 'RELAY1' ? 'bg-[#44d4cf]/20 border-[#44d4cf]' : 'bg-white/[0.03] border-white/[0.08]'
                  }`}
                >
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#44d4cf] mb-1">
                    <Radio className="w-3.5 h-3.5" />
                    RELAY1: Vacuum Relay
                  </div>
                  <p className="text-[10px] text-[#8a8a92]">GPIO19 - راه اندازی موتور خلاء ۱۲۰W AC</p>
                </div>
              </div>
            </div>

            <div className="bg-[#12131c] p-3 rounded-xl border border-white/[0.06] flex items-center justify-between text-[11px] text-[#8a8a92]">
              <span className="flex items-center gap-1.5 text-[#e8a44f]">
                <AlertTriangle className="w-3.5 h-3.5" />
                توصیه ایمنی:
              </span>
              <span>حتماً خط خروجی AC المنت دارای فیوز مینیاتوری ۶A و کلید محافظ جان باشد.</span>
            </div>
          </div>

          {/* Detailed Component Inspector Panel (5 cols) */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-[#f6f5f0] flex items-center gap-2">
              <Info className="w-4 h-4 text-[#44d4cf]" />
              مشخصات فنی قطعه انتخاب شده:
            </h3>

            <div className="glass-card rounded-3xl p-6 border border-white/[0.08] space-y-4">
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                <div>
                  <span className="text-[10px] font-mono text-[#44d4cf] font-bold">{currentBOM.ref}</span>
                  <h4 className="font-bold text-sm text-[#f6f5f0]">{currentBOM.name}</h4>
                </div>
                <span className="text-xs font-black text-[#e8a44f] bg-[#e8a44f]/10 px-3 py-1 rounded-full border border-[#e8a44f]/20">
                  {currentBOM.approxCost}
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <p className="text-[10px] text-[#8a8a92] mb-0.5">مشخصات الکترونیکی:</p>
                  <p className="font-semibold text-[#ebeae3] bg-white/[0.02] p-2.5 rounded-xl border border-white/[0.04]">
                    {currentBOM.specs}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] text-[#44d4cf] mb-0.5 font-bold">نقشه سیم‌کشی پین‌ها (Pinout Connections):</p>
                  <p className="font-mono text-[11px] text-[#44d4cf] bg-[#44d4cf]/5 p-2.5 rounded-xl border border-[#44d4cf]/20 leading-relaxed dir-ltr">
                    {currentBOM.pinout}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] text-[#8a8a92] mb-0.5">محل دقیق خرید در بورس الکترونیک تهران:</p>
                  <p className="text-[#e8a44f] font-semibold flex items-center gap-1">
                    <span>📍</span>
                    {currentBOM.marketLocation}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Complete Pinout Interfacing Table */}
      <div className="glass-card rounded-3xl p-6 lg:p-8 border border-white/[0.08]">
        <h3 className="text-lg font-bold text-[#f6f5f0] mb-4">جدول کامل سیم‌کشی تمام پایه (ESP32 Pinout Mapping Table)</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-right border-collapse">
            <thead>
              <tr className="border-b border-white/[0.08] text-[#8a8a92]">
                <th className="py-3 px-4 font-bold">پایه ESP32</th>
                <th className="py-3 px-4 font-bold">نوع سیگنال</th>
                <th className="py-3 px-4 font-bold">قطعه متصل شده</th>
                <th className="py-3 px-4 font-bold">سطح ولتاژ</th>
                <th className="py-3 px-4 font-bold">عملکرد در برنامه C++</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              <tr className="hover:bg-white/[0.02]">
                <td className="py-3 px-4 font-mono font-bold text-[#44d4cf]">GPIO 21</td>
                <td className="py-3 px-4 text-[#8a8a92]">I2C SDA (Data)</td>
                <td className="py-3 px-4 text-[#f6f5f0] font-bold">سنسور MLX90614 + نمایشگر OLED</td>
                <td className="py-3 px-4 text-[#ebeae3]">3.3V Logic</td>
                <td className="py-3 px-4 text-[#8a8a92]">دریافت دمای مادون قرمز ورق و ارسال فریم به OLED</td>
              </tr>
              <tr className="hover:bg-white/[0.02]">
                <td className="py-3 px-4 font-mono font-bold text-[#44d4cf]">GPIO 22</td>
                <td className="py-3 px-4 text-[#8a8a92]">I2C SCL (Clock)</td>
                <td className="py-3 px-4 text-[#f6f5f0] font-bold">سنسور MLX90614 + نمایشگر OLED</td>
                <td className="py-3 px-4 text-[#ebeae3]">3.3V Logic</td>
                <td className="py-3 px-4 text-[#8a8a92]">پالس کلاک گذرگاه I2C (سرعت 100kHz)</td>
              </tr>
              <tr className="hover:bg-white/[0.02]">
                <td className="py-3 px-4 font-mono font-bold text-[#e88598]">GPIO 23</td>
                <td className="py-3 px-4 text-[#8a8a92]">Digital Out (PWM)</td>
                <td className="py-3 px-4 text-[#f6f5f0] font-bold">رله حالت جامد SSR 40A</td>
                <td className="py-3 px-4 text-[#e88598] font-bold">3.3V High &rarr; 220V AC Out</td>
                <td className="py-3 px-4 text-[#8a8a92]">سوئیچینگ پالس حرارتی المنت ۱۰۰۰W جهت کنترل PID دما</td>
              </tr>
              <tr className="hover:bg-white/[0.02]">
                <td className="py-3 px-4 font-mono font-bold text-[#e8a44f]">GPIO 19</td>
                <td className="py-3 px-4 text-[#8a8a92]">Digital Out</td>
                <td className="py-3 px-4 text-[#f6f5f0] font-bold">ماژول رله موتور مکش وکیوم</td>
                <td className="py-3 px-4 text-[#ebeae3]">5V Optocoupler Trigger</td>
                <td className="py-3 px-4 text-[#8a8a92]">روشن کردن اتوماتیک موتور وکیوم در صدم ثانیه رسیدن به نقطه ذوب</td>
              </tr>
              <tr className="hover:bg-white/[0.02]">
                <td className="py-3 px-4 font-mono font-bold text-[#ebeae3]">GPIO 18</td>
                <td className="py-3 px-4 text-[#8a8a92]">PWM Tone Out</td>
                <td className="py-3 px-4 text-[#f6f5f0] font-bold">بازر پیزو (Buzzer)</td>
                <td className="py-3 px-4 text-[#ebeae3]">3.3V Audio Tone</td>
                <td className="py-3 px-4 text-[#8a8a92]">هشدار صوتی به کاربر هنگام شروع مکش و اتمام خنک‌سازی</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
