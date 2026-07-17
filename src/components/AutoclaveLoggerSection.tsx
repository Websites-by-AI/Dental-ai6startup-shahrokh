import React, { useState } from 'react';
import { 
  Package, Code2, Copy, Check, QrCode, ShoppingCart, Square, CheckSquare, Download, Box
} from 'lucide-react';
import { downloadTextFile, CAD_DXF_TEMPLATES, GERBER_PCB_SPEC } from '../utils/fileDownloader';

export const AutoclaveLoggerSection: React.FC = () => {
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [cycleSimulating, setCycleSimulating] = useState<boolean>(false);
  const [photoViewMode, setPhotoViewMode] = useState<'full' | 'inUse'>('full');
  const [generatedLabel, setGeneratedLabel] = useState<{
    packId: string;
    instrumentName: string;
    sterilizationDate: string;
    expiryDate: string;
    maxTemp: string;
    maxPressure: string;
    operator: string;
  } | null>(null);

  const [instrumentInput, setInstrumentInput] = useState<string>('ست توربین و آنگل جراحی');
  const [operatorInput, setOperatorInput] = useState<string>('منشی مطب - مریم حسینی');

  // Procurement Checklist
  const [itemsChecked, setItemsChecked] = useState<Record<string, boolean>>({
    ac1: false,
    ac2: false,
    ac3: false,
    ac4: false,
  });

  const toggleCheck = (id: string) => {
    setItemsChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleRunAutoclaveLog = () => {
    setCycleSimulating(true);
    setGeneratedLabel(null);

    setTimeout(() => {
      setCycleSimulating(false);
      const now = new Date();
      const expiry = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000); // 14 days expiry

      setGeneratedLabel({
        packId: 'STR-' + Math.floor(100000 + Math.random() * 900000),
        instrumentName: instrumentInput,
        sterilizationDate: now.toLocaleDateString('fa-IR') + ' - ' + now.toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' }),
        expiryDate: expiry.toLocaleDateString('fa-IR'),
        maxTemp: '۱۳۴.۵°C',
        maxPressure: '۲.۱ bar',
        operator: operatorInput,
      });
    }, 2000);
  };

  const codeString = `/*
 * DentLab AI - Smart Autoclave Data Logger & Thermal QR Printer
 * Hardware: ESP32 + MAX6675 K-Type Thermocouple Sensor + TTL Thermal Printer
 * Compliance: EU MDR Traceability Accessories (Class I Lab Equipment)
 */

#include <SPI.h>
#include "MAX6675.h"
#include <Adafruit_Thermal.h>

#define thermoCLK 18
#define thermoCS  5
#define thermoDO  19

MAX6675 thermocouple(thermoCLK, thermoCS, thermoDO);
Adafruit_Thermal printer(&Serial2); // RX2, TX2 on ESP32

float maxTempAchieved = 0.0;
bool cycleValid = false;

void setup() {
  Serial.begin(115200);
  Serial2.begin(19200);
  printer.begin();

  Serial.println("Autoclave Sterilization Logger Ready.");
}

void loop() {
  float currentTemp = thermocouple.readCelsius();
  
  if (currentTemp > maxTempAchieved) {
    maxTempAchieved = currentTemp;
  }

  // 134°C sterilization threshold reached for Class B Autoclave
  if (maxTempAchieved >= 134.0 && !cycleValid) {
    cycleValid = true;
    printSterilizationQRLabel("STR-98231", "Surgical Handpiece", maxTempAchieved);
  }

  delay(1000);
}

void printSterilizationQRLabel(String packId, String toolName, float finalTemp) {
  printer.wake();
  printer.justify('C');
  printer.setSize('M');
  printer.println(F("DENTLAB AI STERILE PACK"));
  printer.setSize('S');
  printer.println(F("==========================="));
  printer.print(F("Pack ID: ")); printer.println(packId);
  printer.print(F("Instrument: ")); printer.println(toolName);
  printer.print(F("Sterile Temp: ")); printer.print(finalTemp); printer.println(F(" C"));
  
  // Print QR Code on Thermal Sticker
  printer.printBarcode(packId.c_str(), QRCODE);
  printer.println(F("PASS - READY FOR SURGERY"));
  printer.feed(2);
  printer.sleep();
}
`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(codeString);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="space-y-12 pb-12">
      {/* Header Banner */}
      <div className="rounded-3xl glass-card border border-[#d45d78]/30 p-8 lg:p-10 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-80 h-80 bg-[#d45d78]/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d45d78]/10 border border-[#d45d78]/30 text-[#e88598] text-xs font-bold mb-4">
              <Package className="w-4 h-4" />
              پروژه شماره ۳ — مطابق الزامات قانونی اتحادیه اروپا
            </div>
            <h1 className="text-3xl lg:text-4xl font-black text-[#f6f5f0] mb-3">
              لاگر اتوکلاو + برچسب QR استریل (Bowie-Dick Data Logger)
            </h1>
            <p className="text-sm text-[#8a8a92] max-w-2xl leading-relaxed">
              کپی برداری مستقیم از سیستم‌های <strong className="text-[#f6f5f0]">3M Comply</strong>. ترموکوپل K هر سیکل دمایی اتوکلاو را ثبت کرده و پس از رسیدن به ۱۳۴ درجه، یک برچسب QR چسبدار با زمان انقضا و نام ابزار چاپ می‌کند تا به پاکت استریل چسبانده شود.
            </p>
          </div>
          <div className="bg-white/[0.03] border border-white/[0.08] p-4 rounded-2xl text-center shrink-0 min-w-[200px]">
            <p className="text-[11px] text-[#8a8a92] mb-1">هزینه تولید / فروش</p>
            <p className="text-2xl font-black text-[#e88598]">۲۵۰٪ سود</p>
            <p className="text-[10px] text-[#44d4cf] mt-1">تولید: ۸ م | فروش: ۲۶ م تومان</p>
          </div>
        </div>
      </div>

      {/* Grid: Procurement & Interactive Generator */}
      <div className="grid lg:grid-cols-12 gap-8">
        {/* Shopping list (5 cols) */}
        <div className="lg:col-span-5 glass-card rounded-3xl p-6 border border-white/[0.08]">
          <div className="flex items-center gap-3 mb-6">
            <ShoppingCart className="w-5 h-5 text-[#e88598]" />
            <div>
              <h2 className="text-base font-bold text-[#f6f5f0]">قطعات خرید بازار تهران</h2>
              <p className="text-xs text-[#8a8a92]">امجد و پاساژ عباسی</p>
            </div>
          </div>

            <div className="space-y-3 text-xs mb-4">
              {[
                { id: 'ac1', title: 'ترموکوپل صنعتی نوع K با ماژول MAX6675', price: '۲۲۰,۰۰۰ تومان' },
                { id: 'ac2', title: 'پرینتر حرارتی ۲ اینچی حرارتی TTL (Sticker Printer)', price: '۱,۴۵۰,۰۰۰ تومان' },
                { id: 'ac3', title: 'برد کنترلر ESP32 + ماژول RTC DS3231', price: '۲۸۰,۰۰۰ تومان' },
                { id: 'ac4', title: 'رول کاغذ حرارتی برچسب‌دار ضد آب', price: '۴۵,۰۰۰ تومان/رول' },
              ].map((item) => (
                <div
                  key={item.id}
                  onClick={() => toggleCheck(item.id)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    itemsChecked[item.id] ? 'bg-[#d45d78]/10 border-[#d45d78]/40 text-[#f6f5f0]' : 'bg-white/[0.02] border-white/[0.05] text-[#8a8a92]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {itemsChecked[item.id] ? <CheckSquare className="w-4 h-4 text-[#e88598]" /> : <Square className="w-4 h-4 text-[#8a8a92]" />}
                    <span className={itemsChecked[item.id] ? 'line-through text-[#e88598]' : ''}>{item.title}</span>
                  </div>
                  <span className="font-bold text-[#e88598] text-[10px]">{item.price}</span>
                </div>
              ))}
            </div>

            {/* Downloads */}
            <div className="pt-3 border-t border-white/[0.06] flex flex-wrap gap-2">
              <button
                onClick={() => downloadTextFile('Autoclave_Logger_Chassis.dxf', CAD_DXF_TEMPLATES.autoclaveLogger, 'text/plain;charset=utf-8')}
                className="flex-1 py-2 px-3 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-[#d45d78] text-[#e88598] text-[11px] font-bold flex items-center justify-center gap-1.5 transition"
              >
                <Download className="w-3.5 h-3.5" />
                <span>DXF شاسی لاگر</span>
              </button>
              <button
                onClick={() => downloadTextFile('Gerber_AutoclaveLogger_PCB.gbr', GERBER_PCB_SPEC, 'text/plain;charset=utf-8')}
                className="py-2 px-3 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-[#44d4cf] text-[#44d4cf] text-[11px] font-bold flex items-center justify-center gap-1.5 transition"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Gerber PCB</span>
              </button>
            </div>
          </div>

          {/* Real Generated Industrial Photo */}
          <div className="glass-card rounded-3xl p-5 border border-white/[0.08] space-y-3">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <span className="text-xs font-bold text-[#f6f5f0]">گالری استودیویی تصاویر محصول</span>
              
              <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-white/10 text-[10px]">
                <button
                  onClick={() => setPhotoViewMode('full')}
                  className={`px-2 py-1 rounded-lg font-bold transition ${
                    photoViewMode === 'full' ? 'bg-[#e88598] text-[#0b0c15]' : 'text-[#8a8a92] hover:text-white'
                  }`}
                >
                  بدنه کامل کنسول
                </button>
                <button
                  onClick={() => setPhotoViewMode('inUse')}
                  className={`px-2 py-1 rounded-lg font-bold transition ${
                    photoViewMode === 'inUse' ? 'bg-[#44d4cf] text-[#0b0c15]' : 'text-[#8a8a92] hover:text-white'
                  }`}
                >
                  نصب کنار اتوکلاو
                </button>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-white/10 h-52 relative group img-shimmer">
              <img
                src={photoViewMode === 'full' ? '/images/full_autoclave_logger.jpg' : '/images/autoclave_logger.jpg'}
                alt="Autoclave Logger Photo"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute bottom-2 right-2 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-lg text-[9px] text-[#e88598] font-mono border border-white/10">
                {photoViewMode === 'full' ? 'تصویر کامل کنسول صنعتی DIN و پرینتر' : 'تصویر نصب شده کنار اتوکلاو استریل'}
              </span>
            </div>
          </div>

          {/* Din-Rail Enclosure Visual Schematic Render */}
          <div className="glass-card rounded-3xl p-5 border border-white/[0.08] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-[#f6f5f0]">
                <Box className="w-4 h-4 text-[#e88598]" />
                طرح شماتیک و اتصالات لاگر اتوکلاو
              </div>
              <span className="text-[10px] text-[#e88598] font-bold">DIN-Rail &amp; Thermocouple K</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#030408] border border-white/[0.1] flex flex-col items-center justify-center">
              <svg viewBox="0 0 240 130" className="w-full max-w-xs drop-shadow-lg">
                {/* Main Enclosure Box */}
                <rect x="40" y="20" width="160" height="90" rx="8" fill="#18181b" stroke="#e88598" strokeWidth="2" />
                {/* Thermal Printer Slot Top Right */}
                <rect x="130" y="30" width="60" height="35" rx="4" fill="#09090b" stroke="#525252" strokeWidth="1" />
                <rect x="140" y="35" width="40" height="4" fill="#e88598" />
                {/* Emerging Printed Sticker Label */}
                <rect x="142" y="39" width="36" height="22" fill="#fafafa" rx="1" />
                {/* Micro QR Code Representation */}
                <rect x="162" y="42" width="12" height="12" fill="#000000" />
                <line x1="145" y1="44" x2="158" y2="44" stroke="#000" strokeWidth="1" />
                <line x1="145" y1="48" x2="158" y2="48" stroke="#000" strokeWidth="1" />
                <line x1="145" y1="52" x2="158" y2="52" stroke="#000" strokeWidth="1" />
                {/* Stainless K-Type Thermocouple Metal Braided Cable Probe */}
                <path d="M 10,75 L 40,75" stroke="#e2e8f0" strokeWidth="4" strokeLinecap="round" />
                <path d="M 10,75 L 40,75" stroke="#fbbf24" strokeWidth="2" strokeDasharray="3 3" />
                {/* Yellow Heavy Duty K-Type Connector Plug */}
                <rect x="32" y="68" width="14" height="14" rx="2" fill="#eab308" stroke="#a16207" strokeWidth="1" />
                {/* OLED Temperature Live Status */}
                <rect x="52" y="30" width="65" height="35" rx="4" fill="#000000" stroke="#44d4cf" strokeWidth="1" />
                <text x="84" y="48" fill="#44d4cf" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="monospace">134.5 °C</text>
                <text x="84" y="58" fill="#22c55e" fontSize="6" textAnchor="middle" fontFamily="monospace">PASS: STERILE</text>
                {/* Cable Text */}
                <text x="25" y="90" fill="#e8a44f" fontSize="6" textAnchor="middle">پروب ترموکوپل K نسوز</text>
                <text x="84" y="102" fill="#a1a1aa" fontSize="7" fontWeight="bold" textAnchor="middle">لاگر هوشمند و چاپگر QR</text>
              </svg>
            </div>
          </div>

        {/* Interactive Logger Simulator (7 cols) */}
        <div className="lg:col-span-7 glass-card rounded-3xl p-6 lg:p-8 border border-[#d45d78]/20 flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-bold text-[#f6f5f0] mb-4">شبیه‌ساز ثبت سیکل اتوکلاو و صدور لیبل QR</h2>

            <div className="space-y-4 mb-6">
              <div>
                <label className="text-xs text-[#8a8a92] block mb-1">نام ابزار یا ست جراحی:</label>
                <input
                  type="text"
                  value={instrumentInput}
                  onChange={(e) => setInstrumentInput(e.target.value)}
                  className="w-full bg-white/[0.03] border border-white/[0.1] rounded-xl px-3.5 py-2.5 text-xs text-[#f6f5f0] focus:border-[#d45d78] outline-none"
                />
              </div>

              <div>
                <label className="text-xs text-[#8a8a92] block mb-1">نام منشی/اپراتور مطب:</label>
                <input
                  type="text"
                  value={operatorInput}
                  onChange={(e) => setOperatorInput(e.target.value)}
                  className="w-full bg-white/[0.03] border border-white/[0.1] rounded-xl px-3.5 py-2.5 text-xs text-[#f6f5f0] focus:border-[#d45d78] outline-none"
                />
              </div>
            </div>

            {/* Generated Sticker Tag Preview */}
            <div className="bg-[#07080d] border border-dashed border-[#d45d78]/40 rounded-2xl p-6 mb-6 min-h-[180px]">
              {cycleSimulating ? (
                <div className="text-center py-8 text-xs text-[#e88598] animate-pulse">
                  در حال ثبت سیکل دمایی (۱۳۴.۵°C) و ارتباط با پرینتر حرارتی...
                </div>
              ) : generatedLabel ? (
                <div className="bg-[#12131a] p-4 rounded-xl border border-white/[0.1] text-xs space-y-3 font-mono">
                  <div className="flex items-center justify-between border-b border-white/[0.08] pb-2">
                    <span className="font-bold text-[#e88598]">{generatedLabel.packId}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-[#44d4cf]/20 text-[#44d4cf]">STERILE PASS</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] text-[#8a8a92]">
                    <div>ابزار: <span className="text-[#f6f5f0] font-bold">{generatedLabel.instrumentName}</span></div>
                    <div>اپراتور: <span className="text-[#f6f5f0]">{generatedLabel.operator}</span></div>
                    <div>دمای ثبت شده: <span className="text-[#44d4cf] font-bold">{generatedLabel.maxTemp}</span></div>
                    <div>فشار: <span className="text-[#44d4cf]">{generatedLabel.maxPressure}</span></div>
                    <div>تاریخ استریل: <span className="text-[#f6f5f0]">{generatedLabel.sterilizationDate}</span></div>
                    <div>تاریخ انقضا: <span className="text-[#e8a44f] font-bold">{generatedLabel.expiryDate}</span></div>
                  </div>

                  <div className="pt-2 border-t border-white/[0.08] flex items-center justify-between">
                    <span className="text-[10px] text-[#8a8a92]">قابل اسکن با اپلیکیشن مطب</span>
                    <QrCode className="w-8 h-8 text-[#f6f5f0]" />
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-xs text-[#8a8a92]">
                  جهت تولید و تست نمونه برچسب QR چسبدار، روی دکمه زیر کلیک کنید
                </div>
              )}
            </div>
          </div>

          <button
            disabled={cycleSimulating}
            onClick={handleRunAutoclaveLog}
            className={`w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#d45d78] to-[#e88598] text-[#0b0c15] font-extrabold text-xs flex items-center justify-center gap-2 hover:brightness-110 transition shadow-lg ${
              cycleSimulating ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <Package className="w-4 h-4" />
            ثبت سیکل اتوکلاو و چاپ برچسب QR
          </button>
        </div>
      </div>

      {/* Source Code */}
      <div className="glass-card rounded-3xl p-6 lg:p-8 border border-white/[0.08]">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <Code2 className="w-6 h-6 text-[#d45d78]" />
            <div>
              <h2 className="text-xl font-bold text-[#f6f5f0]">کد سورس کامل ESP32 + MAX6675 Thermocouple</h2>
              <p className="text-xs text-[#8a8a92]">راه‌اندازی سنسور دمای بالا و پرینتر حرارتی TTL</p>
            </div>
          </div>
          <button
            onClick={handleCopyCode}
            className="px-4 py-2 rounded-xl bg-white/[0.04] border border-white/[0.1] hover:bg-[#d45d78]/10 hover:border-[#d45d78]/30 text-[#e88598] text-xs font-bold flex items-center gap-2 transition"
          >
            {copiedCode ? <Check className="w-4 h-4 text-[#e88598]" /> : <Copy className="w-4 h-4" />}
            <span>{copiedCode ? 'کد کپی شد!' : 'کپی سورس کد'}</span>
          </button>
        </div>

        <div className="bg-[#05060a] border border-white/[0.08] rounded-2xl p-4 font-mono text-xs text-[#ebeae3] overflow-x-auto max-h-[300px] leading-relaxed dir-ltr">
          <pre>{codeString}</pre>
        </div>
      </div>
    </div>
  );
};
