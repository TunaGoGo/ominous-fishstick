import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from 'recharts';
import {
  ArrowLeft,
  ArrowUpRight,
  BarChart2,
  BarChart3,
  Globe,
  Leaf,
  Layers,
  PieChart as PieChartIcon,
  Radar as RadarIcon,
  Sparkles,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react';

/* ─── palette ─── */
const C = {
  cyan: '#22d3ee',
  blue: '#38bdf8',
  indigo: '#818cf8',
  teal: '#2dd4bf',
  green: '#4ade80',
  amber: '#f59e0b',
  purple: '#c084fc',
  rose: '#fb7185',
};

/* ─── counter animation ─── */
function useCountUp(target, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const numericTarget = parseFloat(String(target).replace(/[^0-9.]/g, ''));
    const raf = (ts) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * numericTarget));
      if (progress < 1) requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }, [start, target, duration]);
  return count;
}

/* ─── intersection observer hook ─── */
function useInView(threshold = 0.25) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setInView(true);
    }, { threshold });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, inView];
}

/* ─── KPI card with count-up ─── */
function KpiCard({ label, value, suffix = '', prefix = '', color = C.cyan, delay = 0 }) {
  const [ref, inView] = useInView(0.3);
  const [started, setStarted] = useState(false);
  useEffect(() => {
    if (inView) {
      const t = setTimeout(() => setStarted(true), delay);
      return () => clearTimeout(t);
    }
  }, [inView, delay]);
  const numericPart = parseFloat(String(value).replace(/[^0-9.]/g, '')) || 0;
  const hasDecimal = String(value).includes('.');
  const count = useCountUp(numericPart, 1600, started);
  const displayValue = started
    ? `${prefix}${hasDecimal ? (count / 10).toFixed(1) : count}${suffix}`
    : `${prefix}0${suffix}`;

  return (
    <div ref={ref} className="rounded-2xl border border-white/10 bg-slate-900/80 p-5 flex flex-col gap-1">
      <div className="text-xs font-medium uppercase tracking-widest" style={{ color }}>{label}</div>
      <div className="text-3xl font-bold text-white leading-none mt-1" style={{ color }}>{displayValue}</div>
    </div>
  );
}

/* ─── section wrapper ─── */
function Section({ id, children, className = '' }) {
  const [ref, inView] = useInView(0.1);
  return (
    <section
      id={id}
      ref={ref}
      className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
    >
      {children}
    </section>
  );
}

/* ─── chart card ─── */
function ChartCard({ title, icon, children, className = '' }) {
  return (
    <div className={`rounded-2xl border border-white/10 bg-slate-950/60 p-5 ${className}`}>
      <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-200">
        {icon}
        {title}
      </div>
      <div className="h-64">{children}</div>
    </div>
  );
}

/* ─── module header ─── */
function ModuleHeader({ tag, title, subtitle, icon }) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-3">
        <div className="rounded-xl p-2 bg-cyan-400/10 border border-cyan-300/20">{icon}</div>
        <span className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-300">{tag}</span>
      </div>
      <h2 className="text-2xl font-semibold text-white sm:text-3xl">{title}</h2>
      {subtitle && <p className="mt-2 text-slate-300 max-w-2xl">{subtitle}</p>}
    </div>
  );
}

/* ─── insight badge ─── */
function InsightBadge({ text }) {
  return (
    <div className="rounded-xl border border-cyan-300/30 bg-cyan-400/10 px-4 py-3 text-sm text-cyan-100 flex items-start gap-2">
      <Zap className="h-4 w-4 text-cyan-300 shrink-0 mt-0.5" />
      <span><span className="font-semibold text-cyan-300">关键发现：</span>{text}</span>
    </div>
  );
}

/* ════════════════════════════════════════════════
   DATA
════════════════════════════════════════════════ */

const marketSizeData = [
  { year: '2020', total: 198, herbal: 18 },
  { year: '2021', total: 228, herbal: 29 },
  { year: '2022', total: 264, herbal: 47 },
  { year: '2023', total: 301, herbal: 73 },
  { year: '2024', total: 346, herbal: 112 },
  { year: '2025E', total: 398, herbal: 162 },
];

const marketShareData = [
  { name: '补水保湿类', value: 34, color: C.blue },
  { name: '修护舒缓类', value: 28, color: C.cyan },
  { name: '控油祛痘类', value: 19, color: C.teal },
  { name: '东方草本功效类', value: 12, color: C.green },
  { name: '其他', value: 7, color: '#475569' },
];

const channelData = [
  { channel: '天猫/淘宝', value: 42 },
  { channel: '抖音直播', value: 31 },
  { channel: '线下CS店', value: 14 },
  { channel: '私域/小程序', value: 8 },
  { channel: '其他', value: 5 },
];

const categoryGrowthData = [
  { name: '东方草本', growth: 48, size: 112 },
  { name: '修护舒缓', growth: 32, size: 98 },
  { name: '控油祛痘', growth: 21, size: 67 },
  { name: '补水保湿', growth: 9, size: 120 },
  { name: '美白淡斑', growth: 15, size: 55 },
  { name: '抗衰老', growth: 27, size: 43 },
];

const consumerRadarData = [
  { subject: '修护能力', value: 92 },
  { subject: '天然植物成分', value: 88 },
  { subject: '温和低刺激', value: 85 },
  { subject: '国风养生理念', value: 79 },
  { subject: '性价比', value: 68 },
  { subject: '品牌信任', value: 74 },
];

const ageData = [
  { age: '18-24岁', pct: 22, color: C.teal },
  { age: '25-29岁', pct: 34, color: C.cyan },
  { age: '30-35岁', pct: 28, color: C.blue },
  { age: '36-40岁', pct: 11, color: C.indigo },
  { age: '40岁以上', pct: 5, color: '#475569' },
];

const funnelData = [
  { stage: '品牌认知', value: 100, fill: C.cyan },
  { stage: '产品兴趣', value: 72, fill: C.blue },
  { stage: '加购意向', value: 51, fill: C.teal },
  { stage: '完成购买', value: 38, fill: C.green },
  { stage: '复购行为', value: 22, fill: C.amber },
];

const ingredientTrendData = [
  { year: '2021', coriander: 18, houttuynia: 12, centella: 55, niacinamide: 88 },
  { year: '2022', coriander: 29, houttuynia: 21, centella: 68, niacinamide: 92 },
  { year: '2023', coriander: 47, houttuynia: 39, centella: 79, niacinamide: 88 },
  { year: '2024', coriander: 68, houttuynia: 61, centella: 84, niacinamide: 82 },
  { year: '2025E', coriander: 89, houttuynia: 82, centella: 88, niacinamide: 78 },
];

const trendMigrationData = [
  { x: 20, y: 30, z: 40, label: '中式养生饮品' },
  { x: 45, y: 55, z: 60, label: '草本食品趋势' },
  { x: 65, y: 40, z: 50, label: '植物饮品' },
  { x: 80, y: 70, z: 80, label: '功效护肤' },
  { x: 70, y: 85, z: 90, label: '草本面膜机会' },
];

const innovationMatrixData = [
  { x: 30, y: 25, z: 30, label: '传统补水面膜' },
  { x: 20, y: 75, z: 45, label: '医美修护面膜' },
  { x: 75, y: 30, z: 40, label: '果酸焕肤面膜' },
  { x: 80, y: 80, z: 90, label: '香菜鱼腥草面膜', highlight: true },
  { x: 60, y: 65, z: 60, label: '积雪草面膜' },
  { x: 45, y: 50, z: 50, label: '玻色因面膜' },
];

const priceBandData = [
  { band: '0-29元', share: 8, label: '大众低端' },
  { band: '30-59元', share: 24, label: '大众主流' },
  { band: '60-98元', share: 31, label: '中端主力' },
  { band: '99-129元', share: 26, label: '中高端★', highlight: true },
  { band: '130-199元', share: 8, label: '高端' },
  { band: '200元以上', share: 3, label: '超高端' },
];

const competitorPriceData = [
  { brand: '某品牌A', price: 49, quality: 62 },
  { brand: '某品牌B', price: 89, quality: 74 },
  { brand: '某品牌C', price: 119, quality: 81 },
  { brand: '目标产品', price: 109, quality: 89, highlight: true },
  { brand: '某品牌D', price: 159, quality: 83 },
  { brand: '某品牌E', price: 69, quality: 68 },
];

const priceElasticityData = [
  { price: 69, demand: 100 },
  { price: 79, demand: 95 },
  { price: 89, demand: 88 },
  { price: 99, demand: 82 },
  { price: 109, demand: 76 },
  { price: 119, demand: 68 },
  { price: 129, demand: 58 },
  { price: 139, demand: 44 },
  { price: 149, demand: 31 },
];

const brandPositioningData = [
  { x: 20, y: 30, z: 40, label: '某品牌A' },
  { x: 55, y: 25, z: 50, label: '某品牌B' },
  { x: 30, y: 70, z: 45, label: '某品牌C' },
  { x: 70, y: 60, z: 55, label: '某品牌D' },
  { x: 85, y: 85, z: 90, label: '香菜鱼腥草面膜', highlight: true },
  { x: 60, y: 40, z: 40, label: '某品牌E' },
];

const globalMarketsData = [
  { market: '新加坡', score: 88, size: 12, threshold: 65 },
  { market: '马来西亚', score: 82, size: 28, threshold: 55 },
  { market: '泰国', score: 79, size: 35, threshold: 60 },
  { market: '韩国', score: 71, size: 48, threshold: 75 },
  { market: '日本', score: 64, size: 62, threshold: 80 },
  { market: '越南', score: 75, size: 22, threshold: 45 },
];

const salesGrowthData = [
  { month: 'M1', sales: 8, share: 0.8 },
  { month: 'M2', sales: 15, share: 1.2 },
  { month: 'M3', sales: 28, share: 2.1 },
  { month: 'M4', sales: 46, share: 3.4 },
  { month: 'M5', sales: 69, share: 5.2 },
  { month: 'M6', sales: 100, share: 6.8 },
  { month: 'M7', sales: 124, share: 7.9 },
  { month: 'M8', sales: 148, share: 8.1 },
  { month: 'M9', sales: 168, share: 8.4 },
  { month: 'M10', sales: 182, share: 8.5 },
  { month: 'M11', sales: 191, share: 8.5 },
  { month: 'M12', sales: 200, share: 8.6 },
];

/* ════════════════════════════════════════════════
   MAIN PAGE
════════════════════════════════════════════════ */
export default function Case3Page() {
  /* sticky nav active section */
  const sections = [
    { id: 'market', label: '市场洞察' },
    { id: 'consumer', label: '消费者洞察' },
    { id: 'innovation', label: '产品创新' },
    { id: 'pricing', label: '价格策略' },
    { id: 'positioning', label: '品牌定位' },
    { id: 'global', label: '全球扩张' },
    { id: 'results', label: '最终成果' },
  ];
  const [activeSection, setActiveSection] = useState('market');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* ── background gradient ── */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0" style={{
          background: `radial-gradient(circle at 15% 10%, rgba(34,211,238,0.12), transparent 30%),
                       radial-gradient(circle at 85% 5%, rgba(99,102,241,0.14), transparent 28%),
                       radial-gradient(circle at 50% 80%, rgba(45,212,191,0.08), transparent 35%),
                       #020617`
        }} />
      </div>

      <div className="relative z-10">
        {/* ── top nav bar ── */}
        <nav className="sticky top-0 z-50 border-b border-white/8 bg-slate-950/90 backdrop-blur-lg">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
            <Link
              to="/"
              className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-cyan-300 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              返回主页
            </Link>
            <div className="flex items-center gap-1">
              <span className="rounded-full bg-cyan-400/15 border border-cyan-300/25 px-3 py-1 text-xs font-semibold text-cyan-300">
                案例3（推荐）
              </span>
            </div>
          </div>
        </nav>

        {/* ── section nav ── */}
        <div className="sticky top-[49px] z-40 border-b border-white/8 bg-slate-950/80 backdrop-blur-md overflow-x-auto">
          <div className="mx-auto flex max-w-7xl items-center gap-1 px-4 py-2 sm:px-6 lg:px-8">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                  activeSection === s.id
                    ? 'bg-cyan-400 text-slate-950'
                    : 'text-slate-400 hover:text-cyan-200'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── hero ── */}
        <header className="px-4 pt-16 pb-12 sm:px-6 lg:px-8 lg:pt-24">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="rounded-full border border-cyan-300/25 bg-cyan-400/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-cyan-300">
                Case Study
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-400">
                护肤品 · 面膜
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-400">
                市场创新
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-400">
                全球扩张
              </span>
            </div>
            <h1 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl leading-tight">
              香菜鱼腥草修护面膜
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-teal-300">
                从数据洞察到市场增长
              </span>
            </h1>
            <p className="mt-4 max-w-3xl text-slate-300 text-base sm:text-lg leading-relaxed">
              某国货护肤品牌如何借助市场数据洞察与消费者研究，实现产品成功上市、市场增长及海外拓展。
              以数据证明商业增长，以科技验证东方草本价值。
            </p>

            {/* hero KPIs */}
            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
              {[
                { label: '销售额增长', value: '185', suffix: '%', prefix: '+', color: C.cyan },
                { label: '市场份额增长', value: '8.6', suffix: '%', prefix: '+', color: C.teal },
                { label: '6个月销量', value: '100', suffix: '万片', color: C.green },
                { label: '品牌认知度提升', value: '62', suffix: '%', prefix: '+', color: C.blue },
                { label: '社媒声量增长', value: '230', suffix: '%', prefix: '+', color: C.indigo },
                { label: '海外市场数量', value: '4', suffix: '个', color: C.amber },
              ].map((k, i) => (
                <KpiCard key={k.label} {...k} delay={i * 120} />
              ))}
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-7xl space-y-24 px-4 pb-24 sm:px-6 lg:px-8">

          {/* ══════════════════════════════════════
              1. MARKET INTELLIGENCE
          ══════════════════════════════════════ */}
          <Section id="market">
            <ModuleHeader
              tag="01 · Market Intelligence"
              title="市场洞察：发现草本功效蓝海"
              subtitle="深度扫描面膜市场规模、增长趋势、品类结构与渠道表现，精准识别东方草本功效面膜的高速增长窗口。"
              icon={<BarChart3 className="h-5 w-5 text-cyan-300" />}
            />

            <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-4 mb-5">
              {[
                { label: '面膜市场规模（2024）', value: '346亿元', sub: '预计2025年达398亿' },
                { label: '市场年均增速（CAGR）', value: '12.4%', sub: '近5年持续高速增长' },
                { label: '草本功效类增速', value: '+48%', sub: '显著高于市场平均' },
                { label: '电商渠道占比', value: '73%', sub: '直播+平台双引擎' },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-white/10 bg-slate-900/70 p-5">
                  <div className="text-xs text-slate-400 uppercase tracking-wider">{item.label}</div>
                  <div className="mt-2 text-2xl font-bold text-cyan-300">{item.value}</div>
                  <div className="mt-1 text-xs text-slate-500">{item.sub}</div>
                </div>
              ))}
            </div>

            <div className="grid gap-5 lg:grid-cols-2">
              <ChartCard title="市场规模趋势（亿元）" icon={<TrendingUp className="h-4 w-4 text-cyan-300" />}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={marketSizeData}>
                    <defs>
                      <linearGradient id="totalGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={C.blue} stopOpacity={0.3} />
                        <stop offset="100%" stopColor={C.blue} stopOpacity={0.02} />
                      </linearGradient>
                      <linearGradient id="herbalGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={C.cyan} stopOpacity={0.5} />
                        <stop offset="100%" stopColor={C.cyan} stopOpacity={0.05} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.15)" />
                    <XAxis dataKey="year" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                    <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                    <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12 }} />
                    <Legend wrapperStyle={{ fontSize: 12 }} />
                    <Area type="monotone" dataKey="total" name="市场总规模" stroke={C.blue} fill="url(#totalGrad)" strokeWidth={2} />
                    <Area type="monotone" dataKey="herbal" name="草本功效类" stroke={C.cyan} fill="url(#herbalGrad)" strokeWidth={2.5} />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartCard>

              <ChartCard title="面膜市场份额构成（%）" icon={<PieChartIcon className="h-4 w-4 text-cyan-300" />}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={marketShareData}
                      dataKey="value"
                      nameKey="name"
                      cx="45%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={90}
                      label={({ name, value }) => `${value}%`}
                      labelLine={false}
                    >
                      {marketShareData.map((item) => (
                        <Cell key={item.name} fill={item.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12 }} />
                    <Legend layout="vertical" align="right" verticalAlign="middle" wrapperStyle={{ fontSize: 11 }} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartCard>

              <ChartCard title="渠道销售占比（%）" icon={<BarChart2 className="h-4 w-4 text-cyan-300" />}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={channelData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.15)" horizontal={false} />
                    <XAxis type="number" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                    <YAxis type="category" dataKey="channel" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} width={90} />
                    <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12 }} />
                    <Bar dataKey="value" name="占比%" radius={[0, 6, 6, 0]}>
                      {channelData.map((_, i) => (
                        <Cell key={i} fill={i === 0 ? C.cyan : i === 1 ? C.teal : C.blue} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>

              <ChartCard title="品类增长热力矩阵（增速 vs 规模）" icon={<Sparkles className="h-4 w-4 text-cyan-300" />}>
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.15)" />
                    <XAxis dataKey="size" name="市场规模" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 10 }} label={{ value: '市场规模(亿)', position: 'insideBottom', offset: -2, fill: '#64748b', fontSize: 10 }} />
                    <YAxis dataKey="growth" name="增速" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 10 }} label={{ value: '增速%', angle: -90, position: 'insideLeft', fill: '#64748b', fontSize: 10 }} />
                    <ZAxis dataKey="size" range={[200, 800]} />
                    <Tooltip
                      contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12 }}
                      formatter={(value, name, props) => [props.payload.name, '']}
                    />
                    <Scatter data={categoryGrowthData} name="品类">
                      {categoryGrowthData.map((item, i) => (
                        <Cell key={i} fill={item.name === '东方草本' ? C.cyan : C.indigo} opacity={item.name === '东方草本' ? 1 : 0.6} />
                      ))}
                    </Scatter>
                  </ScatterChart>
                </ResponsiveContainer>
              </ChartCard>
            </div>

            <InsightBadge text="东方草本功效面膜年增速高达48%，显著超越市场平均12.4%的增速，是整个面膜赛道中增速最快的细分品类。" />
          </Section>

          {/* ══════════════════════════════════════
              2. CONSUMER INSIGHTS
          ══════════════════════════════════════ */}
          <Section id="consumer">
            <ModuleHeader
              tag="02 · Consumer Insights"
              title="消费者洞察：精准识别核心人群"
              subtitle="通过多维度消费者研究，识别核心目标用户的需求偏好、购买动机与决策路径。"
              icon={<Users className="h-5 w-5 text-cyan-300" />}
            />

            {/* Persona cards */}
            <div className="grid gap-4 sm:grid-cols-3 mb-6">
              {[
                {
                  title: '都市白领 · 敏感肌',
                  age: '25-32岁',
                  tags: ['修护优先', '成分党', '国货拥护'],
                  pain: '长期熬夜，肌肤暗沉敏感，需要安全温和的修护产品',
                  motivation: '78%愿意尝试中草本功效护肤品',
                  color: C.cyan,
                },
                {
                  title: '养生新中式 · Z世代',
                  age: '22-28岁',
                  tags: ['国风养生', '社媒种草', '话题驱动'],
                  pain: '追求"内调外养"的整体健康生活方式，对国风成分认同感强',
                  motivation: '65%因社媒内容种草而首次购买',
                  color: C.teal,
                },
                {
                  title: '精致妈妈 · 功效型',
                  age: '30-38岁',
                  tags: ['功效驱证', '品牌信任', '复购稳定'],
                  pain: '注重成分安全与功效验证，愿意为有科学背书的产品付高价',
                  motivation: '复购率高达52%，NPS评分居行业前列',
                  color: C.blue,
                },
              ].map((persona) => (
                <div key={persona.title} className="rounded-2xl border border-white/10 bg-slate-900/70 p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="font-semibold text-white text-sm">{persona.title}</div>
                      <div className="text-xs text-slate-400 mt-0.5">{persona.age}</div>
                    </div>
                    <div className="rounded-full p-1.5 bg-slate-800 border border-white/10">
                      <Users className="h-3.5 w-3.5" style={{ color: persona.color }} />
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {persona.tags.map((t) => (
                      <span key={t} className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-slate-300">{t}</span>
                    ))}
                  </div>
                  <p className="text-xs text-slate-400 leading-5 mb-3">{persona.pain}</p>
                  <div className="rounded-lg border px-3 py-2 text-xs" style={{ borderColor: `${persona.color}40`, background: `${persona.color}10`, color: persona.color }}>
                    {persona.motivation}
                  </div>
                </div>
              ))}
            </div>

            <div className="grid gap-5 lg:grid-cols-2">
              <ChartCard title="消费者核心需求雷达图" icon={<RadarIcon className="h-4 w-4 text-cyan-300" />}>
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={consumerRadarData} outerRadius="68%">
                    <PolarGrid stroke="rgba(148,163,184,0.2)" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#cbd5e1', fontSize: 11 }} />
                    <PolarRadiusAxis domain={[0, 100]} tick={{ fill: '#64748b', fontSize: 9 }} />
                    <Radar name="重要度" dataKey="value" stroke={C.cyan} fill={C.cyan} fillOpacity={0.35} strokeWidth={2} />
                    <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12 }} />
                    <Legend wrapperStyle={{ fontSize: 11 }} />
                  </RadarChart>
                </ResponsiveContainer>
              </ChartCard>

              <ChartCard title="目标用户年龄结构（%）" icon={<PieChartIcon className="h-4 w-4 text-cyan-300" />}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={ageData}
                      dataKey="pct"
                      nameKey="age"
                      cx="45%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={88}
                      label={({ age, pct }) => `${pct}%`}
                      labelLine={false}
                    >
                      {ageData.map((item) => (
                        <Cell key={item.age} fill={item.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12 }} />
                    <Legend layout="vertical" align="right" verticalAlign="middle" wrapperStyle={{ fontSize: 11 }} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartCard>

              {/* Purchase funnel */}
              <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-5 lg:col-span-2">
                <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-200">
                  <TrendingUp className="h-4 w-4 text-cyan-300" />
                  购买决策漏斗（每100名潜在消费者）
                </div>
                <div className="flex flex-col items-center gap-2">
                  {funnelData.map((item, i) => (
                    <div key={item.stage} className="w-full flex items-center gap-4">
                      <div className="w-24 text-right text-xs text-slate-400 shrink-0">{item.stage}</div>
                      <div className="flex-1 relative">
                        <div
                          className="h-9 rounded-lg flex items-center justify-center text-sm font-semibold text-slate-900 transition-all duration-500"
                          style={{
                            width: `${item.value}%`,
                            background: `linear-gradient(90deg, ${item.fill}, ${item.fill}cc)`,
                            minWidth: 48,
                          }}
                        >
                          {item.value}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <InsightBadge text="78%的核心目标用户（25-35岁都市女性）明确表示愿意尝试具有中草本成分背景的新型功效护肤品，国风养生认同度持续攀升。" />
          </Section>

          {/* ══════════════════════════════════════
              3. PRODUCT INNOVATION
          ══════════════════════════════════════ */}
          <Section id="innovation">
            <ModuleHeader
              tag="03 · Product Innovation"
              title="产品创新：把握跨品类趋势机遇"
              subtitle="通过系统性趋势迁移分析，识别从草本食品到功效护肤的成分迁移机会，发现香菜与鱼腥草的蓝海赛道。"
              icon={<Sparkles className="h-5 w-5 text-cyan-300" />}
            />

            {/* Ingredient cards */}
            <div className="grid gap-4 sm:grid-cols-2 mb-6">
              <div className="rounded-2xl border border-cyan-300/20 bg-cyan-400/5 p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Leaf className="h-5 w-5 text-cyan-300" />
                  <div>
                    <div className="font-semibold text-white">香菜（Coriander Extract）</div>
                    <div className="text-xs text-slate-400">搜索热度连续3年增长 · 成分认知快速普及</div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['舒缓肌肤', '抗氧化', '改善敏感', '天然萃取'].map((tag) => (
                    <span key={tag} className="rounded-full border border-cyan-300/25 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-200">{tag}</span>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-teal-300/20 bg-teal-400/5 p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Leaf className="h-5 w-5 text-teal-300" />
                  <div>
                    <div className="font-semibold text-white">鱼腥草（Houttuynia Cordata）</div>
                    <div className="text-xs text-slate-400">东方传统草本 · 现代生物提取技术验证</div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['镇静修护', '控油净肤', '强化屏障', '科学验证'].map((tag) => (
                    <span key={tag} className="rounded-full border border-teal-300/25 bg-teal-400/10 px-3 py-1 text-xs text-teal-200">{tag}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid gap-5 lg:grid-cols-2">
              <ChartCard title="热门成分搜索热度趋势（指数）" icon={<TrendingUp className="h-4 w-4 text-cyan-300" />}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={ingredientTrendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.15)" />
                    <XAxis dataKey="year" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                    <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                    <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12 }} />
                    <Legend wrapperStyle={{ fontSize: 11 }} />
                    <Line type="monotone" dataKey="coriander" name="香菜提取物" stroke={C.cyan} strokeWidth={2.5} dot={{ r: 3 }} />
                    <Line type="monotone" dataKey="houttuynia" name="鱼腥草" stroke={C.teal} strokeWidth={2.5} dot={{ r: 3 }} />
                    <Line type="monotone" dataKey="centella" name="积雪草" stroke={C.indigo} strokeWidth={1.5} strokeDasharray="4 2" dot={false} />
                    <Line type="monotone" dataKey="niacinamide" name="烟酰胺" stroke="#475569" strokeWidth={1.5} strokeDasharray="4 2" dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartCard>

              <ChartCard title="趋势迁移路径（跨品类机会）" icon={<Layers className="h-4 w-4 text-cyan-300" />}>
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.15)" />
                    <XAxis dataKey="x" name="趋势成熟度" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 10 }} label={{ value: '趋势成熟度', position: 'insideBottom', offset: -2, fill: '#64748b', fontSize: 10 }} />
                    <YAxis dataKey="y" name="市场机会" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 10 }} label={{ value: '市场机会', angle: -90, position: 'insideLeft', fill: '#64748b', fontSize: 10 }} />
                    <ZAxis dataKey="z" range={[100, 600]} />
                    <Tooltip
                      contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12 }}
                      formatter={(v, name, props) => [props.payload.label, '机会节点']}
                    />
                    <Scatter data={trendMigrationData} name="趋势节点">
                      {trendMigrationData.map((item, i) => (
                        <Cell key={i} fill={i === trendMigrationData.length - 1 ? C.cyan : C.indigo} opacity={i === trendMigrationData.length - 1 ? 1 : 0.6} />
                      ))}
                    </Scatter>
                  </ScatterChart>
                </ResponsiveContainer>
              </ChartCard>

              <ChartCard title="创新机会矩阵（新颖度 vs 市场接受度）" icon={<Sparkles className="h-4 w-4 text-cyan-300" />} className="lg:col-span-2">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.15)" />
                    <XAxis dataKey="x" name="新颖度" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} label={{ value: '新颖度 →', position: 'insideBottom', offset: -2, fill: '#94a3b8', fontSize: 11 }} />
                    <YAxis dataKey="y" name="市场接受度" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} label={{ value: '↑ 市场接受度', angle: -90, position: 'insideLeft', fill: '#94a3b8', fontSize: 11 }} />
                    <ZAxis dataKey="z" range={[200, 1000]} />
                    <Tooltip
                      contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12 }}
                      formatter={(v, name, props) => [props.payload.label, '产品']}
                    />
                    <Scatter data={innovationMatrixData} name="产品">
                      {innovationMatrixData.map((item, i) => (
                        <Cell key={i} fill={item.highlight ? C.cyan : C.indigo} opacity={item.highlight ? 1 : 0.55} />
                      ))}
                    </Scatter>
                  </ScatterChart>
                </ResponsiveContainer>
              </ChartCard>
            </div>

            <InsightBadge text="香菜和鱼腥草相关搜索热度连续三年持续增长，两者复合增速均超35%，成功从草本食品赛道向功效护肤领域迁移，形成独特的蓝海机会窗口。" />
          </Section>

          {/* ══════════════════════════════════════
              4. PRICING STRATEGY
          ══════════════════════════════════════ */}
          <Section id="pricing">
            <ModuleHeader
              tag="04 · Pricing Strategy"
              title="价格策略：锚定最优利润区间"
              subtitle="基于市场价格带分布、消费者价格敏感度与竞品价格定位，寻找销量与利润的最佳平衡点。"
              icon={<BarChart2 className="h-5 w-5 text-cyan-300" />}
            />

            <div className="grid gap-5 lg:grid-cols-3 mb-5">
              {[
                { label: '推荐价格区间', value: '99-129元', sub: '中高端价格带，最优ROI', color: C.cyan },
                { label: '价格弹性拐点', value: '¥109', sub: '需求量开始显著下滑前最高价', color: C.teal },
                { label: '目标价格定位', value: '¥109/片', sub: '定价超竞品均价18%', color: C.green },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-white/10 bg-slate-900/70 p-5">
                  <div className="text-xs text-slate-400 uppercase tracking-wider">{item.label}</div>
                  <div className="mt-2 text-2xl font-bold" style={{ color: item.color }}>{item.value}</div>
                  <div className="mt-1 text-xs text-slate-500">{item.sub}</div>
                </div>
              ))}
            </div>

            <div className="grid gap-5 lg:grid-cols-2">
              <ChartCard title="面膜市场价格带分布（%）" icon={<BarChart3 className="h-4 w-4 text-cyan-300" />}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={priceBandData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.15)" />
                    <XAxis dataKey="band" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                    <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                    <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12 }} />
                    <Bar dataKey="share" name="市场份额%" radius={[6, 6, 0, 0]}>
                      {priceBandData.map((item, i) => (
                        <Cell key={i} fill={item.highlight ? C.cyan : C.indigo} opacity={item.highlight ? 1 : 0.6} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>

              <ChartCard title="价格弹性曲线（需求量指数）" icon={<TrendingUp className="h-4 w-4 text-cyan-300" />}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={priceElasticityData}>
                    <defs>
                      <linearGradient id="elastGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={C.teal} stopOpacity={0.4} />
                        <stop offset="100%" stopColor={C.teal} stopOpacity={0.02} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.15)" />
                    <XAxis dataKey="price" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} label={{ value: '定价（元）', position: 'insideBottom', offset: -2, fill: '#64748b', fontSize: 10 }} />
                    <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                    <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12 }} />
                    <Area type="monotone" dataKey="demand" name="需求指数" stroke={C.teal} fill="url(#elastGrad)" strokeWidth={2.5} />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartCard>

              <ChartCard title="竞品价格 vs 产品品质感知图" icon={<Sparkles className="h-4 w-4 text-cyan-300" />} className="lg:col-span-2">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.15)" />
                    <XAxis dataKey="price" name="价格（元）" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} label={{ value: '定价（元）→', position: 'insideBottom', offset: -2, fill: '#94a3b8', fontSize: 11 }} />
                    <YAxis dataKey="quality" name="品质感知" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} label={{ value: '↑ 品质感知', angle: -90, position: 'insideLeft', fill: '#94a3b8', fontSize: 11 }} />
                    <ZAxis range={[200, 500]} />
                    <Tooltip
                      contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12 }}
                      formatter={(v, name, props) => [props.payload.brand, '品牌']}
                    />
                    <Scatter data={competitorPriceData} name="品牌">
                      {competitorPriceData.map((item, i) => (
                        <Cell key={i} fill={item.highlight ? C.cyan : C.indigo} opacity={item.highlight ? 1 : 0.55} />
                      ))}
                    </Scatter>
                  </ScatterChart>
                </ResponsiveContainer>
              </ChartCard>
            </div>

            <InsightBadge text="中高端价格带（99-129元）拥有最佳销量与利润平衡，消费者对该区间产品品质期待高、对品牌溢价接受度强，是推荐定价区间。" />
          </Section>

          {/* ══════════════════════════════════════
              5. BRAND POSITIONING
          ══════════════════════════════════════ */}
          <Section id="positioning">
            <ModuleHeader
              tag="05 · Brand Positioning"
              title="品牌定位：构建差异化竞争护城河"
              subtitle={'精准锚定\u201c新中式草本科技面膜\u201d的独特赛道，在天然草本与科学验证的交叉点建立品牌认知壁垒。'}
              icon={<Zap className="h-5 w-5 text-cyan-300" />}
            />

            {/* Core value pillars */}
            <div className="grid gap-4 sm:grid-cols-4 mb-6">
              {[
                { icon: '🌿', title: '天然草本', desc: '香菜+鱼腥草双效成分，传承东方植物智慧' },
                { icon: '🔬', title: '科学验证', desc: '联合生物科技实验室，临床数据背书功效' },
                { icon: '✨', title: '修护功效', desc: '镇静舒缓+屏障修护，可见可感知改善' },
                { icon: '🏮', title: '国风养生', desc: '"内调外养"理念，新中式生活方式认同' },
              ].map((p) => (
                <div key={p.title} className="rounded-2xl border border-white/10 bg-slate-900/70 p-5 text-center">
                  <div className="text-3xl mb-2">{p.icon}</div>
                  <div className="font-semibold text-white text-sm mb-1">{p.title}</div>
                  <p className="text-xs text-slate-400 leading-5">{p.desc}</p>
                </div>
              ))}
            </div>

            <div className="grid gap-5 lg:grid-cols-2">
              <ChartCard title="品牌定位坐标图（草本属性 vs 科技属性）" icon={<Sparkles className="h-4 w-4 text-cyan-300" />}>
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.15)" />
                    <XAxis dataKey="x" name="草本属性" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 10 }} label={{ value: '草本天然属性 →', position: 'insideBottom', offset: -2, fill: '#94a3b8', fontSize: 10 }} />
                    <YAxis dataKey="y" name="科技属性" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 10 }} label={{ value: '↑ 科技验证属性', angle: -90, position: 'insideLeft', fill: '#94a3b8', fontSize: 10 }} />
                    <ZAxis dataKey="z" range={[200, 600]} />
                    <Tooltip
                      contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12 }}
                      formatter={(v, name, props) => [props.payload.label, '品牌']}
                    />
                    <Scatter data={brandPositioningData} name="品牌">
                      {brandPositioningData.map((item, i) => (
                        <Cell key={i} fill={item.highlight ? C.cyan : C.indigo} opacity={item.highlight ? 1 : 0.55} />
                      ))}
                    </Scatter>
                  </ScatterChart>
                </ResponsiveContainer>
              </ChartCard>

              <ChartCard title="品牌认知维度雷达对比" icon={<RadarIcon className="h-4 w-4 text-cyan-300" />}>
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart
                    data={[
                      { subject: '天然成分', ours: 95, avg: 62 },
                      { subject: '功效验证', ours: 88, avg: 55 },
                      { subject: '品牌故事', ours: 82, avg: 64 },
                      { subject: '价格感知', ours: 74, avg: 70 },
                      { subject: '包装设计', ours: 85, avg: 68 },
                      { subject: '口碑传播', ours: 90, avg: 58 },
                    ]}
                    outerRadius="68%"
                  >
                    <PolarGrid stroke="rgba(148,163,184,0.2)" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#cbd5e1', fontSize: 11 }} />
                    <PolarRadiusAxis domain={[0, 100]} tick={{ fill: '#64748b', fontSize: 9 }} />
                    <Radar name="香菜鱼腥草面膜" dataKey="ours" stroke={C.cyan} fill={C.cyan} fillOpacity={0.35} strokeWidth={2} />
                    <Radar name="竞品平均" dataKey="avg" stroke={C.indigo} fill={C.indigo} fillOpacity={0.15} strokeWidth={1.5} strokeDasharray="4 2" />
                    <Legend wrapperStyle={{ fontSize: 11 }} />
                    <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12 }} />
                  </RadarChart>
                </ResponsiveContainer>
              </ChartCard>
            </div>

            <InsightBadge text={'通过精准定位\u201c新中式草本科技\u201d赛道，成功绕开传统补水面膜的红海竞争，在天然草本×科技验证的价值坐标中形成品类差异化，最终实现品类领导地位。'} />
          </Section>

          {/* ══════════════════════════════════════
              6. GLOBAL EXPANSION
          ══════════════════════════════════════ */}
          <Section id="global">
            <ModuleHeader
              tag="06 · Global Expansion"
              title="全球扩张：东南亚市场开拓"
              subtitle="系统评估海外市场机会，锁定对东方草本护肤接受度最高的核心增长市场。"
              icon={<Globe className="h-5 w-5 text-cyan-300" />}
            />

            {/* Global KPIs */}
            <div className="grid gap-4 sm:grid-cols-4 mb-6">
              {[
                { label: '进入海外市场', value: '4', suffix: '个', color: C.cyan },
                { label: '海外销售贡献', value: '18', suffix: '%', color: C.teal },
                { label: '最高机会评分', value: '88', suffix: '分', color: C.green },
                { label: '东南亚接受度', value: '76', suffix: '%', color: C.blue },
              ].map((k, i) => (
                <KpiCard key={k.label} {...k} delay={i * 100} />
              ))}
            </div>

            {/* World map placeholder + market heatmap */}
            <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-6 mb-5">
              <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-200">
                <Globe className="h-4 w-4 text-cyan-300" />
                目标市场机会热力图
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
                {globalMarketsData.map((m) => {
                  const intensity = m.score / 100;
                  return (
                    <div
                      key={m.market}
                      className="rounded-xl border p-4 text-center transition-all"
                      style={{
                        borderColor: `rgba(34,211,238,${0.2 + intensity * 0.5})`,
                        background: `rgba(34,211,238,${0.04 + intensity * 0.14})`,
                      }}
                    >
                      <div className="text-base font-semibold text-white mb-1">{m.market}</div>
                      <div className="text-2xl font-bold mb-1" style={{ color: C.cyan }}>{m.score}</div>
                      <div className="text-xs text-slate-400">机会评分</div>
                      <div className="mt-2 h-1.5 rounded-full bg-slate-800">
                        <div className="h-1.5 rounded-full" style={{ width: `${m.score}%`, background: `linear-gradient(90deg, ${C.teal}, ${C.cyan})` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="grid gap-5 lg:grid-cols-2">
              <ChartCard title="国家市场吸引力评分" icon={<BarChart3 className="h-4 w-4 text-cyan-300" />}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={globalMarketsData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.15)" horizontal={false} />
                    <XAxis type="number" domain={[0, 100]} stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                    <YAxis type="category" dataKey="market" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} width={70} />
                    <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12 }} />
                    <Bar dataKey="score" name="机会评分" radius={[0, 6, 6, 0]}>
                      {globalMarketsData.map((item, i) => (
                        <Cell key={i} fill={item.score >= 80 ? C.cyan : item.score >= 70 ? C.teal : C.blue} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>

              <ChartCard title="市场规模 vs 进入门槛分析" icon={<Layers className="h-4 w-4 text-cyan-300" />}>
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.15)" />
                    <XAxis dataKey="threshold" name="进入门槛" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 10 }} label={{ value: '进入门槛 →', position: 'insideBottom', offset: -2, fill: '#94a3b8', fontSize: 10 }} />
                    <YAxis dataKey="size" name="市场规模" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 10 }} label={{ value: '↑ 市场规模(亿)', angle: -90, position: 'insideLeft', fill: '#94a3b8', fontSize: 10 }} />
                    <ZAxis dataKey="score" range={[100, 600]} />
                    <Tooltip
                      contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12 }}
                      formatter={(v, name, props) => [props.payload.market, '市场']}
                    />
                    <Scatter data={globalMarketsData} name="市场">
                      {globalMarketsData.map((item, i) => (
                        <Cell key={i} fill={item.score >= 80 ? C.cyan : C.indigo} opacity={item.score >= 80 ? 1 : 0.65} />
                      ))}
                    </Scatter>
                  </ScatterChart>
                </ResponsiveContainer>
              </ChartCard>
            </div>

            <InsightBadge text="新加坡（88分）、马来西亚（82分）与泰国（79分）成为首批进入市场，东南亚消费者对东方草本护肤具有文化认同与天然的接受度优势，是品牌全球化的最优跳板。" />
          </Section>

          {/* ══════════════════════════════════════
              7. RESULTS
          ══════════════════════════════════════ */}
          <Section id="results">
            <ModuleHeader
              tag="07 · Business Results"
              title="最终商业成果：数据证明增长"
              subtitle="12个月全周期成果复盘，以数据大屏形式呈现市场表现、品牌表现与国际拓展三大维度。"
              icon={<TrendingUp className="h-5 w-5 text-cyan-300" />}
            />

            {/* Results dashboard */}
            <div className="rounded-[28px] border border-cyan-300/20 bg-gradient-to-br from-slate-900/90 to-slate-950/90 p-6 sm:p-8 mb-6">
              <div className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-300 mb-6">商业成果数据大屏</div>

              <div className="grid gap-6 lg:grid-cols-3">
                {/* Market */}
                <div>
                  <div className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">市场表现</div>
                  <div className="space-y-3">
                    <KpiCard label="销售额增长" value="185" suffix="%" prefix="+" color={C.cyan} delay={0} />
                    <KpiCard label="市场份额增长" value="86" suffix="%" prefix="+8." color={C.teal} delay={150} />
                    <KpiCard label="6个月累计销量" value="100" suffix="万片" color={C.green} delay={300} />
                  </div>
                </div>

                {/* Brand */}
                <div>
                  <div className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">品牌表现</div>
                  <div className="space-y-3">
                    <KpiCard label="品牌认知度提升" value="62" suffix="%" prefix="+" color={C.blue} delay={100} />
                    <KpiCard label="社交媒体声量增长" value="230" suffix="%" prefix="+" color={C.indigo} delay={250} />
                    <KpiCard label="用户复购率提升" value="37" suffix="%" prefix="+" color={C.purple} delay={400} />
                  </div>
                </div>

                {/* Global */}
                <div>
                  <div className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">国际拓展</div>
                  <div className="space-y-3">
                    <KpiCard label="进入海外市场" value="4" suffix="个" color={C.amber} delay={200} />
                    <KpiCard label="海外销售贡献占比" value="18" suffix="%" color={C.rose} delay={350} />
                    <KpiCard label="海外用户NPS" value="72" suffix="分" color={C.cyan} delay={500} />
                  </div>
                </div>
              </div>
            </div>

            {/* Sales growth chart */}
            <div className="grid gap-5 lg:grid-cols-2">
              <ChartCard title="月度销售额增长曲线（百万元）" icon={<TrendingUp className="h-4 w-4 text-cyan-300" />}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={salesGrowthData}>
                    <defs>
                      <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={C.cyan} stopOpacity={0.45} />
                        <stop offset="100%" stopColor={C.cyan} stopOpacity={0.03} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.15)" />
                    <XAxis dataKey="month" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                    <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                    <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12 }} />
                    <Area type="monotone" dataKey="sales" name="销售额(百万)" stroke={C.cyan} fill="url(#salesGrad)" strokeWidth={2.5} dot={{ r: 3, fill: C.cyan }} />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartCard>

              <ChartCard title="市场份额爬升趋势（%）" icon={<ArrowUpRight className="h-4 w-4 text-cyan-300" />}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={salesGrowthData}>
                    <defs>
                      <linearGradient id="shareGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={C.teal} stopOpacity={0.45} />
                        <stop offset="100%" stopColor={C.teal} stopOpacity={0.03} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.15)" />
                    <XAxis dataKey="month" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                    <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                    <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12 }} />
                    <Area type="monotone" dataKey="share" name="市场份额%" stroke={C.teal} fill="url(#shareGrad)" strokeWidth={2.5} dot={{ r: 3, fill: C.teal }} />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartCard>
            </div>

            {/* Closing narrative */}
            <div className="mt-8 rounded-2xl border border-white/10 bg-slate-900/60 p-6 sm:p-8">
              <div className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-300 mb-4">案例总结</div>
              <div className="grid gap-4 sm:grid-cols-3 text-sm text-slate-300 leading-relaxed">
                <div>
                  <div className="font-semibold text-white mb-2">📊 数据驱动决策</div>
                  <p>通过系统性市场数据分析，在面膜赛道竞争最激烈的时间窗口，精准识别出东方草本功效细分赛道的高速增长机会，为产品方向提供了可信的数据支撑。</p>
                </div>
                <div>
                  <div className="font-semibold text-white mb-2">🌿 创新产品定义</div>
                  <p>跨品类趋势迁移分析发现香菜与鱼腥草从食品向护肤的迁移路径，联合生物科技实验室完成临床验证，打造出"新中式草本科技面膜"的创新品类概念。</p>
                </div>
                <div>
                  <div className="font-semibold text-white mb-2">🌏 全球增长路径</div>
                  <p>以东南亚文化认同为切入点，构建海外扩张路径，首批进入4个市场，海外销售贡献迅速增至18%，验证了东方草本护肤的跨文化商业价值。</p>
                </div>
              </div>
            </div>
          </Section>
        </div>

        {/* ── footer ── */}
        <footer className="border-t border-white/8 px-4 py-8 text-center sm:px-6 lg:px-8">
          <p className="text-xs text-slate-500">
            © NIQ WTF Lab · 数据驱动增长，洞察成就未来。
          </p>
          <Link
            to="/"
            className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 hover:border-cyan-300/40 hover:text-cyan-200 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            返回主页
          </Link>
        </footer>
      </div>
    </div>
  );
}
