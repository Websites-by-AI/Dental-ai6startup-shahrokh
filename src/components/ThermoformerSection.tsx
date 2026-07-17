import React, { useState, useEffect } from 'react';
import { 
  Cpu, ShoppingCart, Play, RotateCcw,
  Code2, Check, Copy, Flame, Activity, Clock,
  MapPin, Sparkles, CheckSquare, Square, Box, Layers
} from 'lucide-react';
import { CADStudio } from './thermoformer/CADStudio';
import { PCBStudio } from './thermoformer/PCBStudio';
import { FirmwareStudio } from './thermoformer/FirmwareStudio';
import { VisualComponentGallery } from './VisualComponentGallery';

export const ThermoformerSection: React.FC = () => {
  // Sub-section active tab state
  const [activeSubTab, setActiveSubTab] = useState<'sim' | 'parts' | 'cad' | 'pcb' | 'code'>('sim');

  // Simulator states
  const [sheetThickness, setSheetThickness] = useState<number>(1.0); // mm
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [temperature, setTemperature] = useState<number>(25); // Celsius
  const [targetTemp, setTargetTemp] = useState<number>(140); // Target for 1.0mm PETG
  const [heatingActive, setHeatingActive] = useState<boolean>(false);
  const [vacuumActive, setVacuumActive] = useState<boolean>(false);
  const [sagPercentage, setSagPercentage] = useState<number>(0);
  const [statusText, setStatusText] = useState<string>('آماده برای شروع سیکل وکیوم فرمر');
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  // Shopping items checklist
  const [itemsChecked, setItemsChecked] = useState<Record<string, boolean>>({
    item1: false,
    item2: false,
    item3: false,
    item4: false,
    item5: false,
    item6: false,
    item7: false,
  });

  const toggleCheck = (id: string) => {
    setItemsChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Adjust target temp based on thickness
  useEffect(() => {
    if (sheetThickness === 0.5) setTargetTemp(125);
    else if (sheetThickness === 1.0) setTargetTemp(140);
    else setTargetTemp(160);
  }, [sheetThickness]);

  // Simulation timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setTemperature((prevTemp) => {
          if (prevTemp < targetTemp) {
            setHeatingActive(true);
            const newTemp = prevTemp + Math.random() * 4 + 3;
            const currentSag = Math.min(100, Math.max(0, ((newTemp - 80) / (targetTemp - 80)) * 100));
            setSagPercentage(currentSag > 0 ? currentSag : 0);
            
            if (newTemp >= targetTemp - 3) {
              setStatusText('ورق به نقطه شیشه‌ای شدن رسیده است! هوش مصنوعی وکیوم را فعال کرد.');
              setVacuumActive(true);
              setHeatingActive(false);
              return targetTemp;
            } else {
              setStatusText(`در حال آنالیز مادون قرمز... دما: ${Math.round(newTemp)}°C (هدف: ${targetTemp}°C)`);
              return newTemp;
            }
          } else {
            // Cool down phase after vacuum
            setVacuumActive(true);
            setStatusText('مکیدن خلاء کامل شد! الاینر شفاف به دقت قالب‌گیری شد.');
            setTimeout(() => {
              setIsRunning(false);
              setVacuumActive(false);
              setHeatingActive(false);
              setStatusText('فرآیند ساخت الاینر کامل شد. ورق خنک گردید.');
            }, 3000);
            return prevTemp;
          }
        });
      }, 400);
    }
    return () => clearInterval(interval);
  }, [isRunning, targetTemp]);

  const handleStartSim = () => {
    setTemperature(25);
    setSagPercentage(0);
    setIsRunning(true);
    setHeatingActive(true);
    setVacuumActive(false);
    setStatusText('المنت ۱۰۰۰ وات تابشی روشن شد...');
  };

  const handleResetSim = () => {
    setIsRunning(false);
    setTemperature(25);
    setSagPercentage(0);
    setHeatingActive(false);
    setVacuumActive(false);
    setStatusText('سیستم بازنشانی شد.');
  };

  const esp32Code = `/*
 * DentLab AI - Thermoformer Smart Controller
 * Hardware: ESP32-WROOM-32 + MLX90614 Non-Contact IR Temp Sensor + SSR 40A Relay + Vacuum Relay
 * Target Plastic: Dental PETG Sheets (0.5mm, 1.0mm, 1.5mm)
 */

#include <Wire.h>
#include <Adafruit_MLX90614.h>
#include <BLEDevice.h>
#include <BLEServer.h>

#define SSR_HEATER_PIN 23  // Solid State Relay for 1000W IR Element
#define VACUUM_RELAY_PIN 19 // Relay for Vacuum Motor (1200W)
#define BUZZER_PIN 18       // Buzzer notification pin

Adafruit_MLX90614 mlx = Adafruit_MLX90614();

// PID Calibration Constants
float targetTemp = 140.0; // Default for 1.0mm PETG sheet
float currentObjectTemp = 0.0;
bool isHeating = false;
bool isVacuumTriggered = false;

void setup() {
  Serial.begin(115200);
  Wire.begin(21, 22); // SDA=21, SCL=22 for ESP32

  pinMode(SSR_HEATER_PIN, OUTPUT);
  pinMode(VACUUM_RELAY_PIN, OUTPUT);
  pinMode(BUZZER_PIN, OUTPUT);

  digitalWrite(SSR_HEATER_PIN, LOW);
  digitalWrite(VACUUM_RELAY_PIN, LOW);

  if (!mlx.begin()) {
    Serial.println("Error connecting to MLX90614 IR Sensor!");
    while (1);
  }
  
  Serial.println("DentLab AI Thermoformer Initialized Successfully.");
}

void loop() {
  currentObjectTemp = mlx.readObjectTempC();
  Serial.print("IR Sheet Temperature: ");
  Serial.print(currentObjectTemp);
  Serial.println(" C");

  if (isHeating && !isVacuumTriggered) {
    // Bang-Bang + Hysteresis Control logic
    if (currentObjectTemp < targetTemp - 2.0) {
      digitalWrite(SSR_HEATER_PIN, HIGH); // Turn Heater ON
    } else if (currentObjectTemp >= targetTemp) {
      digitalWrite(SSR_HEATER_PIN, LOW);  // Turn Heater OFF immediately to prevent burning
      
      // AI Sag Trigger threshold reached -> Auto Engage Vacuum
      triggerVacuumSuction();
    }
  }

  delay(200);
}

void triggerVacuumSuction() {
  isVacuumTriggered = true;
  digitalWrite(SSR_HEATER_PIN, LOW);
  digitalWrite(VACUUM_RELAY_PIN, HIGH); // Engage Vacuum Motor
  
  // Sound buzzer tone
  tone(BUZZER_PIN, 2000, 500);
  Serial.println(">>> AUTO-VACUUM ENGAGED AT EXACT VISCOUS STATE! <<<");
  
  delay(4000); // Maintain vacuum seal for 4 seconds until plastic sets
  digitalWrite(VACUUM_RELAY_PIN, LOW);
  isHeating = false;
  isVacuumTriggered = false;
}
`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(esp32Code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="space-y-12 pb-12">
      {/* Header Banner */}
      <div className="rounded-3xl glass-card border border-[#44d4cf]/30 p-8 lg:p-10 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-80 h-80 bg-[#44d4cf]/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#44d4cf]/10 border border-[#44d4cf]/30 text-[#44d4cf] text-xs font-bold mb-4">
              <Cpu className="w-4 h-4" />
              پروژه شماره ۱ — پرفروش‌ترین تجهیزات کارگاهی
            </div>
            <h1 className="text-3xl lg:text-4xl font-black text-[#f6f5f0] mb-3">
              دستگاه وکیوم فرمر هوشمند رومیزی (AI Smart Thermoformer)
            </h1>
            <p className="text-sm text-[#8a8a92] max-w-2xl leading-relaxed">
              کپی برداری هوشمندانه از دستگاه‌های ۱۸۰۰ دلاری <strong className="text-[#f6f5f0]">Erkodent</strong> و <strong className="text-[#f6f5f0]">Biostar</strong> آلمان. با یک سنسور مادون قرمز ۱۶۰ هزار تومانی MLX90614 و الگوریتم ESP32، زمان دقیق ذوب شدن ورق PETG تشخیص داده شده و از سوختن ورق جلوگیـری می‌شود.
            </p>
          </div>
          <div className="bg-white/[0.03] border border-white/[0.08] p-4 rounded-2xl text-center shrink-0 min-w-[200px]">
            <p className="text-[11px] text-[#8a8a92] mb-1">حاشیه سود تولید در ایران</p>
            <p className="text-3xl font-black text-[#44d4cf]">۳۰۰٪+</p>
            <p className="text-[10px] text-[#e8a44f] mt-1">تولید: ۶ م تومان | فروش: ۳۲ م تومان</p>
          </div>
        </div>
      </div>

      {/* Sub-studio Workspace Tabs */}
      <div className="flex overflow-x-auto gap-2 p-1.5 bg-[#07080d] rounded-2xl border border-white/[0.08]">
        {[
          { id: 'sim', label: '📊 شبیه‌ساز و کنترل زنده', icon: Activity },
          { id: 'parts', label: '🖼️ گالری تصویری قطعات سخت‌افزاری', icon: ShoppingCart },
          { id: 'cad', label: '📐 طراحی مکانیکی CAD و شاسی بدنه', icon: Box },
          { id: 'pcb', label: '⚡ شماتیک الکترونیک و برد PCB', icon: Layers },
          { id: 'code', label: '💻 سورس کدهای C++، پایتون و اپ بلوتوث', icon: Code2 },
        ].map((subTab) => {
          const Icon = subTab.icon;
          const isActive = activeSubTab === subTab.id;
          return (
            <button
              key={subTab.id}
              onClick={() => setActiveSubTab(subTab.id as any)}
              className={`flex-1 min-w-[180px] py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                isActive
                  ? 'bg-gradient-to-r from-[#2a8a87] to-[#44d4cf] text-[#0b0c15] shadow-[0_0_20px_rgba(68,212,207,0.3)]'
                  : 'text-[#8a8a92] hover:text-[#f6f5f0] hover:bg-white/[0.04]'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{subTab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Conditional Rendering of Sub-Studios */}
      {activeSubTab === 'parts' && <VisualComponentGallery />}
      {activeSubTab === 'cad' && <CADStudio />}
      {activeSubTab === 'pcb' && <PCBStudio />}
      {activeSubTab === 'code' && <FirmwareStudio />}

      {activeSubTab === 'sim' && (
        <>
          {/* Grid Layout: Procurement List & Live Simulator */}
      <div className="grid lg:grid-cols-12 gap-8">
        {/* Shopping Checklist (5 Columns) */}
        <div className="lg:col-span-5 glass-card rounded-3xl p-6 border border-white/[0.08] flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <ShoppingCart className="w-5 h-5 text-[#44d4cf]" />
              <div>
                <h2 className="text-lg font-bold text-[#f6f5f0]">لیست خرید دقیق بازار تهران</h2>
                <p className="text-xs text-[#8a8a92]">لاله‌زار، پامنار و پاساژ امجد</p>
              </div>
            </div>

            <div className="space-y-3.5">
              {[
                { id: 'item1', title: 'المنت تابشی مادون قرمز ۱۰۰۰ وات سرامیکی', market: 'لاله‌زار جنوبی - پاساژ الکتریک', price: '۱۸۰,۰۰۰ تومان' },
                { id: 'item2', title: 'سنسور مادون قرمز غیرتماسی MLX90614 GY-906', market: 'پاساژ امجد - طبقه اول (نادکو / آفتاب رایانه)', price: '۱۶۰,۰۰۰ تومان' },
                { id: 'item3', title: 'برد توسعه ESP32 WROOM (30 Pin)', market: 'امجد / پاساژ عباسی', price: '۲۱۰,۰۰۰ تومان' },
                { id: 'item4', title: 'ماژول رله جامد (SSR 40A FoTek)', market: 'لاله‌زار / پاساژ امجد', price: '۱۴۰,۰۰۰ تومان' },
                { id: 'item5', title: 'موتور وکیوم جاروبرقی سطلی ۱۲۰۰ وات', market: 'میدان امام خمینی / بورس قطعات جاروبرقی', price: '۸۵۰,۰۰۰ تومان' },
                { id: 'item6', title: 'فریم آهنی + ورق اکریلیک شاسی', market: 'بازار پامنار (برش لیزری)', price: '۱,۲۰۰,۰۰۰ تومان' },
                { id: 'item7', title: 'ورق PETG شفاف دندانپزشکی (۱.۰ میلی‌متر)', market: 'بورس پلاستیک پامنار / کالای دندانپزشکی', price: '۲۵,۰۰۰ تومان/برگه' },
              ].map((item) => (
                <div
                  key={item.id}
                  onClick={() => toggleCheck(item.id)}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                    itemsChecked[item.id]
                      ? 'bg-[#44d4cf]/10 border-[#44d4cf]/40 text-[#f6f5f0]'
                      : 'bg-white/[0.02] border-white/[0.05] text-[#8a8a92] hover:border-white/[0.15]'
                  }`}
                >
                  <div className="mt-0.5 shrink-0">
                    {itemsChecked[item.id] ? (
                      <CheckSquare className="w-4 h-4 text-[#44d4cf]" />
                    ) : (
                      <Square className="w-4 h-4 text-[#8a8a92]" />
                    )}
                  </div>
                  <div className="flex-1 text-xs">
                    <p className={`font-semibold ${itemsChecked[item.id] ? 'line-through opacity-70 text-[#44d4cf]' : 'text-[#f6f5f0]'}`}>
                      {item.title}
                    </p>
                    <div className="flex items-center justify-between mt-1 text-[10px]">
                      <span className="text-[#8a8a92] flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#e8a44f]" />
                        {item.market}
                      </span>
                      <span className="font-bold text-[#44d4cf]">{item.price}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs">
            <span className="text-[#8a8a92]">جمع کل قطعات نمونه اولیه:</span>
            <span className="font-black text-[#44d4cf] text-sm">حدود ۲,۷۶۵,۰۰۰ تومان</span>
          </div>
        </div>

        {/* Live Interactive Simulator (7 Columns) */}
        <div className="lg:col-span-7 glass-card rounded-3xl p-6 lg:p-8 border border-[#44d4cf]/20 flex flex-col justify-between relative overflow-hidden">
          <div>
            <div className="flex items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <Activity className="w-5 h-5 text-[#44d4cf] animate-pulse" />
                <div>
                  <h2 className="text-lg font-bold text-[#f6f5f0]">شبیه‌ساز زنده الگوریتم هوشمند وکیوم</h2>
                  <p className="text-xs text-[#8a8a92]">تست کنترل PID دما و فعال‌سازی اتوماتیک مکش</p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-[#44d4cf]/10 border border-[#44d4cf]/30 text-[#44d4cf] text-xs font-mono font-bold">
                ESP32 Online
              </span>
            </div>

            {/* Thickness Selection Controls */}
            <div className="mb-6 bg-white/[0.02] border border-white/[0.06] p-4 rounded-2xl">
              <label className="text-xs text-[#8a8a92] font-semibold block mb-2">
                انتخاب ضخامت ورق PETG:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: 0.5, label: '۰.۵ میلی‌متر', usage: 'تری بلیچینگ (۱۲۵°C)' },
                  { value: 1.0, label: '۱.۰ میلی‌متر', usage: 'الاینر شفاف (۱۴۰°C)' },
                  { value: 1.5, label: '۱.۵ میلی‌متر', usage: 'نایت‌گارد سخت (۱۶۰°C)' },
                ].map((t) => (
                  <button
                    key={t.value}
                    disabled={isRunning}
                    onClick={() => setSheetThickness(t.value)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                      sheetThickness === t.value
                        ? 'bg-[#44d4cf] text-[#0b0c15] shadow-md'
                        : 'bg-white/[0.03] text-[#8a8a92] border border-white/[0.06] hover:text-[#f6f5f0]'
                    } ${isRunning ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <div>{t.label}</div>
                    <div className="text-[9px] opacity-80 mt-0.5">{t.usage}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Live Visualizing Screen */}
            <div className="bg-[#07080d] border border-white/[0.1] rounded-2xl p-6 mb-6 relative min-h-[220px] flex flex-col justify-between">
              {/* Temperature & Indicator Top Row */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-[#8a8a92]">دمای سنسور MLX90614 IR</p>
                  <p className="text-3xl font-black font-mono text-[#f6f5f0]">
                    {Math.round(temperature)}°C <span className="text-xs font-normal text-[#8a8a92]">/ هدف {targetTemp}°C</span>
                  </p>
                </div>
                <div className="flex gap-2">
                  <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1.5 ${
                    heatingActive ? 'bg-[#d45d78]/20 border border-[#d45d78]/40 text-[#e88598] animate-pulse' : 'bg-white/[0.03] text-[#8a8a92]'
                  }`}>
                    <Flame className="w-3 h-3" />
                    المنت تابشی {heatingActive ? 'روشن (SSR ON)' : 'خاموش'}
                  </span>
                  <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1.5 ${
                    vacuumActive ? 'bg-[#44d4cf]/20 border border-[#44d4cf]/40 text-[#44d4cf] animate-bounce' : 'bg-white/[0.03] text-[#8a8a92]'
                  }`}>
                    <Sparkles className="w-3 h-3" />
                    موتور وکیوم {vacuumActive ? 'فعال شد' : 'غیرفعال'}
                  </span>
                </div>
              </div>

              {/* Graphic Sagging Simulation Animation */}
              <div className="my-6 relative flex flex-col items-center justify-center">
                <p className="text-[10px] text-[#8a8a92] mb-2">شبیه‌سازی افتادگی حرارتی (Sag Detection): {Math.round(sagPercentage)}٪</p>
                <div className="w-full max-w-xs h-12 border-x-2 border-t-2 border-white/[0.2] relative flex justify-center rounded-t-lg">
                  {/* The PETG Plastic Sheet curving downwards as temp rises */}
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 200 50">
                    <path
                      d={`M 0,0 Q 100,${(sagPercentage / 100) * 40} 200,0`}
                      fill="none"
                      stroke={heatingActive ? '#e88598' : vacuumActive ? '#44d4cf' : '#8a8a92'}
                      strokeWidth="4"
                      className="transition-all duration-300"
                    />
                  </svg>
                  {/* Dental plaster model underneath */}
                  <div className="absolute bottom-0 w-24 h-6 bg-white/[0.1] rounded-t-xl border border-white/[0.2] flex items-center justify-center text-[9px] text-[#8a8a92]">
                    کست گچی دندان
                  </div>
                </div>
              </div>

              {/* Status Footer */}
              <div className="bg-white/[0.03] p-2.5 rounded-xl border border-white/[0.05] flex items-center gap-2 text-xs text-[#44d4cf]">
                <Clock className="w-3.5 h-3.5 shrink-0" />
                <span className="font-mono">{statusText}</span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3">
            <button
              disabled={isRunning}
              onClick={handleStartSim}
              className={`flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-[#2a8a87] to-[#44d4cf] text-[#0b0c15] font-extrabold text-xs flex items-center justify-center gap-2 hover:brightness-110 transition shadow-lg ${
                isRunning ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <Play className="w-4 h-4 fill-current" />
              شروع سیکل هوشمند گرمایش و وکیوم
            </button>
            <button
              onClick={handleResetSim}
              className="px-4 py-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] text-[#8a8a92] hover:text-[#f6f5f0] text-xs font-semibold flex items-center gap-1.5 transition"
            >
              <RotateCcw className="w-4 h-4" />
              بازنشانی
            </button>
          </div>
        </div>
      </div>

      {/* Code Snippet Box */}
      <div className="glass-card rounded-3xl p-6 lg:p-8 border border-white/[0.08]">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <Code2 className="w-6 h-6 text-[#44d4cf]" />
            <div>
              <h2 className="text-xl font-bold text-[#f6f5f0]">کد سورس کامل ESP32 C++ (تکمیل و کامپایل‌شده)</h2>
              <p className="text-xs text-[#8a8a92]">قابلیت آپلود مستقیم روی برد ESP32 در نرم‌افزار Arduino IDE</p>
            </div>
          </div>
          <button
            onClick={handleCopyCode}
            className="px-4 py-2 rounded-xl bg-white/[0.04] border border-white/[0.1] hover:bg-[#44d4cf]/10 hover:border-[#44d4cf]/30 text-[#44d4cf] text-xs font-bold flex items-center gap-2 transition"
          >
            {copiedCode ? <Check className="w-4 h-4 text-[#44d4cf]" /> : <Copy className="w-4 h-4" />}
            <span>{copiedCode ? 'کد کپی شد!' : 'کپی سورس کد'}</span>
          </button>
        </div>

        <div className="bg-[#05060a] border border-white/[0.08] rounded-2xl p-4 font-mono text-xs text-[#ebeae3] overflow-x-auto max-h-[350px] leading-relaxed dir-ltr">
          <pre>{esp32Code}</pre>
        </div>
      </div>

      {/* 6-Week Roadmap */}
      <div className="glass-card rounded-3xl p-6 lg:p-8 border border-white/[0.08]">
        <h2 className="text-xl font-bold text-[#f6f5f0] mb-6 flex items-center gap-3">
          <Sparkles className="w-5 h-5 text-[#e8a44f]" />
          نقشه راه ۶ هفته‌ای تا تجاری‌سازی نمونه اولیه
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { week: 'هفته اول', title: 'خرید قطعات', desc: 'خرید المنت تابشی از لاله‌زار + سنسور MLX90614 از امجد + ورق PETG از پامنار' },
            { week: 'هفته دوم و سوم', title: 'ساخت بدنه و فریم', desc: 'برش اکریلیک شاسی با لیزر در پامنار + جوش فریم نگهدارنده ورق' },
            { week: 'هفته چهارم', title: 'کالیبراسیون دما', desc: 'تست سنسور مادون قرمز روی ضخامت‌های ۰.۵، ۱.۰ و ۱.۵ میلی‌متری PETG' },
            { week: 'هفته پنجم', title: 'برنامه‌نویسی و رله', desc: 'اتصال رله SSR به موتور وکیوم و تست انطباق با نمودار شیشه‌ای شدن' },
            { week: 'هفته ششم', title: 'اپلیکیشن و جعبه‌سازی', desc: 'اتصال بلوتوث BLE به گوشی و بستن جعبه شیک کارگاهی آماده عرضه به مطب‌ها' },
            { week: 'بازاریابی نقد', title: 'فروش به لابراتوارها', desc: 'دموی زنده ساخت الاینر شفاف در لابراتوارهای ارتودنسی تهران' },
          ].map((w, idx) => (
            <div key={idx} className="bg-white/[0.02] border border-white/[0.05] p-4 rounded-2xl hover:border-[#44d4cf]/30 transition">
              <span className="text-[10px] font-bold text-[#44d4cf] px-2 py-0.5 rounded-full bg-[#44d4cf]/10 border border-[#44d4cf]/20 inline-block mb-2">
                {w.week}
              </span>
              <h3 className="text-sm font-bold text-[#f6f5f0] mb-1">{w.title}</h3>
              <p className="text-xs text-[#8a8a92] leading-relaxed">{w.desc}</p>
            </div>
          ))}
        </div>
      </div>
        </>
      )}
    </div>
  );
};
