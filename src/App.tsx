import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Cpu, 
  Settings2, 
  Zap, 
  Hammer,
  ChevronRight,
  Terminal,
  Globe,
  Brain,
  ScanLine,
  Waves,
  Package
} from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'دستگاه وکیوم فرمر هوشمند رومیزی',
    subtitle: 'AI Smart Desktop Thermoformer',
    icon: Waves,
    image: '/images/smart-vformer-render.jpg',
    tagline: 'الاینر شفاف · نایت‌گارد · پلاک بلیچینگ',
    description: 'کپی از Erkodent آلمان و Biostar (۱۸۰۰ دلاری). هوش مصنوعی با تشخیص نوع ورق (PETG)، دما و زمان مکش را خودش تنظیم می‌کند.',
    accentColor: '#2a8a87',
    accentLight: '#44d4cf',
  },
  {
    id: 2,
    title: 'اسکنر هوشمند کیفیت قالب (AI)',
    subtitle: 'AI Impression Quality Box',
    icon: ScanLine,
    image: '/images/ai-impression-scanner.jpg',
    tagline: 'تشخیص حباب، کشیدگی و پارگی',
    description: 'جایگزین اسکنرهای ۵۰۰۰ دلاری. پردازش تصویر در ۵ ثانیه ایرادات قالب را شناسایی کرده و به پزشک هشدار می‌دهد.',
    accentColor: '#e8a44f',
    accentLight: '#f0c878',
  },
  {
    id: 3,
    title: 'دستگاه دوخت هوشمند + QR استریل',
    subtitle: 'Smart AI Pouch Sealer',
    icon: Package,
    image: '/images/smart-pouch-sealer.jpg',
    tagline: 'مدیریت انقضای ابزارهای استریل',
    description: 'ثبت خودکار هر سیکل اتوکلاو و چاپ برچسب QR اختصاصی برای ردیابی ابزارها در مطب.',
    accentColor: '#d45d78',
    accentLight: '#e88598',
  },
  {
    id: 4,
    title: 'ابزار شبیه‌سازی و ارتباط دندانپزشکی',
    subtitle: 'AI Patient Comm & Simulation',
    icon: Brain,
    image: '/images/dental-comm-tool.jpg',
    tagline: 'نمایش نتیجه درمان + تطبیق رنگ',
    description: 'نرم‌افزار هوشمند برای کالیبراسیون رنگ دندان و نمایش لبخند آینده بیمار به صورت سه بعدی.',
    accentColor: '#c9a96e',
    accentLight: '#e8bf82',
  },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'همه پروژه‌ها', icon: Globe },
    { id: 'vformer', label: 'وکیوم فرمر (جزئیات)', icon: Settings2 },
    { id: 'electronics', label: 'الکترونیک', icon: Cpu },
    { id: 'bom', label: 'لیست قطعات', icon: Hammer },
  ];

  return (
    <div className="min-h-screen bg-[#0b0c15] text-[#f6f5f0] font-sans dir-rtl" dir="rtl">
      {/* Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#2a8a87]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#e8a44f]/5 rounded-full blur-[120px]" />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-white/5 bg-[#0b0c15]/80 backdrop-blur-md sticky top-0">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2a8a87] to-[#44d4cf] flex items-center justify-center shadow-lg">
              <Zap size={22} className="text-[#0b0c15]" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">پنل نوآوری تجهیزات دندانپزشکی</h1>
              <p className="text-xs text-[#8a8a92]">توسعه دستگاه‌های نسل ۴</p>
            </div>
          </div>
          <div className="hidden md:flex gap-4">
            {tabs.map(t => (
              <button key={t.id} onClick={() => setActiveTab(t.id)} className={`text-sm font-medium px-4 py-2 rounded-lg transition-colors ${activeTab === t.id ? 'bg-[#2a8a87] text-[#0b0c15]' : 'text-[#8a8a92] hover:bg-white/5'}`}>
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {activeTab === 'overview' && (
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        )}

        {activeTab === 'vformer' && <VFormerDetails />}
        {activeTab === 'electronics' && <ElectronicsTab />}
        {activeTab === 'bom' && <BomTab />}
      </main>
    </div>
  );
}

function ProjectCard({ project }: { project: any }) {
  const Icon = project.icon;
  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="group relative rounded-[2.5rem] glass-card overflow-hidden border border-white/5 hover:border-[#2a8a87]/30 transition-all duration-500">
      <div className="h-64 overflow-hidden relative">
        <img src={project.image} alt={project.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c15] via-transparent to-transparent" />
      </div>
      <div className="p-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/5 text-[#44d4cf]">
            <Icon size={24} />
          </div>
          <h3 className="text-2xl font-bold">{project.title}</h3>
        </div>
        <p className="text-sm text-[#8a8a92] leading-relaxed mb-6">{project.description}</p>
        <div className="flex justify-between items-center pt-6 border-t border-white/5">
          <span className="text-xs text-[#44d4cf] font-bold">{project.tagline}</span>
          <button className="text-xs flex items-center gap-1 text-[#8a8a92] hover:text-[#f6f5f0]">مشاهده مستندات <ChevronRight size={14} /></button>
        </div>
      </div>
    </motion.div>
  );
}

function VFormerDetails() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
      <div className="glass-card rounded-[3rem] p-10 border border-white/5">
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
            <img src="/images/smart-vformer-render.jpg" alt="Render" className="w-full h-full object-cover" />
          </div>
          <div className="space-y-6">
            <h2 className="text-4xl font-black text-[#44d4cf]">طراحی صنعتی Smart-V1</h2>
            <p className="text-lg text-[#8a8a92] leading-relaxed">این دستگاه با طراحی ارگونومیک ۳۰ درجه و بدنه منحنی پارامتریک، ۷۰٪ با مدل‌های کپی بازار تفاوت دارد. تمرکز اصلی روی پایداری حرارتی و کاربری آسان برای پزشک است.</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                <p className="text-xs text-[#8a8a92] mb-1">دقت حرارتی</p>
                <p className="font-bold">±1°C</p>
              </div>
              <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                <p className="text-xs text-[#8a8a92] mb-1">هوش مصنوعی</p>
                <p className="font-bold">Auto-Sag Detection</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ElectronicsTab() {
  const codeSnippet = `
void loop() {
  float currentTemp = mlx.readObjectTempC();
  float targetTemp = 235.0; // PETG Aligner
  
  if (currentTemp >= targetTemp) {
    digitalWrite(VACUUM_PUMP, HIGH);
    notifyApp("Vacuum Active");
  }
  
  updatePID(targetTemp, currentTemp);
  delay(100);
}`;

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <div className="glass-card p-8 rounded-3xl border border-white/5">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><Cpu className="text-[#44d4cf]" /> معماری الکترونیک</h3>
        <ul className="space-y-4 text-sm text-[#8a8a92]">
          <li className="flex justify-between p-3 bg-white/5 rounded-xl"><span>میکروکنترلر:</span> <span className="text-[#f6f5f0]">ESP32 DevKit</span></li>
          <li className="flex justify-between p-3 bg-white/5 rounded-xl"><span>سنسور دما:</span> <span className="text-[#f6f5f0]">MLX90614 (IR)</span></li>
          <li className="flex justify-between p-3 bg-white/5 rounded-xl"><span>درایور المنت:</span> <span className="text-[#f6f5f0]">SSR-40DA</span></li>
        </ul>
      </div>
      <div className="glass-card p-8 rounded-3xl border border-white/5 bg-[#16181f]">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-[#44d4cf]"><Terminal size={20} /> منطق برنامه</h3>
        <pre className="text-xs font-mono text-[#8a8a92] leading-relaxed"><code>{codeSnippet}</code></pre>
      </div>
    </div>
  );
}

function BomTab() {
  const items = [
    { n: 'ESP32 Dev Kit', p: '۱۸۰,۰۰۰ ت', img: 'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=200' },
    { n: 'MLX90614 Sensor', p: '۴۸۰,۰۰۰ ت', img: 'https://images.unsplash.com/photo-1591405351990-4726e331f141?w=200' },
    { n: 'Vacuum Pump', p: '۳,۸۰۰,۰۰۰ ت', img: 'https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=200' },
    { n: 'SSR Relay', p: '۳۵۰,۰۰۰ ت', img: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=200' },
  ];
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {items.map((item, i) => (
        <div key={i} className="glass-card p-4 rounded-2xl border border-white/5 text-center">
          <img src={item.img} className="w-full h-24 object-cover rounded-xl mb-4 opacity-70" />
          <h4 className="font-bold text-sm mb-1">{item.n}</h4>
          <p className="text-xs text-[#44d4cf]">{item.p}</p>
        </div>
      ))}
    </div>
  );
}
