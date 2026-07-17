import { useMemo, useState } from 'react';
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
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { ArrowUpRight, BarChart3, ExternalLink, PieChart as PieChartIcon, Radar as RadarIcon } from 'lucide-react';

const cases = [
  {
    id: 'pepsi-green-pepper',
    label: '案例1',
    name: 'Pepsi 青椒风味气泡水创新上市项目',
    goal: '帮助百事可乐寻找年轻消费者喜爱的差异化新品机会，并验证非常规风味产品的市场可行性。',
    flow: [
      {
        title: '案例背景',
        content: '在传统碳酸饮料增速放缓背景下，团队希望通过“反差感口味”切入社交化新品赛道。',
      },
      {
        title: '市场洞察',
        content: '中国风味饮料市场持续扩容，Z世代猎奇消费需求上升，区域化口味探索明显增强。',
      },
      {
        title: '消费者洞察',
        content: '社媒舆情、电商评论与问卷研究显示：年轻用户更愿意尝试具有话题性的地域特色口味。',
      },
      {
        title: '产品创新策略',
        content: '建议推出“Pepsi Green Pepper Sparkling”，搭配挑战式短视频营销与城市快闪试饮。',
      },
      {
        title: '上市执行',
        content: '采用电商首发+限量发售+线下潮流渠道联动，首月聚焦华东与华南重点城市。',
      },
      {
        title: '最终成果',
        content: '上市3个月销量120万瓶，品牌年轻化指数提升18%，新客占比达到46%。',
      },
    ],
    kpis: [
      { name: '上市3个月销量', value: '120万瓶' },
      { name: '社媒曝光量', value: '2.8亿次' },
      { name: '品牌年轻化指数', value: '+18%' },
      { name: '新客占比', value: '46%' },
      { name: '上市ROI', value: '2.6x' },
      { name: '电商转化率', value: '8.9%' },
    ],
    charts: {
      marketSize: [
        { period: '2021', value: 420 },
        { period: '2022', value: 465 },
        { period: '2023', value: 518 },
        { period: '2024', value: 592 },
        { period: '2025', value: 668 },
      ],
      channelSales: [
        { channel: '电商', sales: 52 },
        { channel: '便利店', sales: 28 },
        { channel: '商超', sales: 16 },
        { channel: '校园渠道', sales: 24 },
      ],
      consumerRadar: [
        { subject: '猎奇偏好', value: 86 },
        { subject: '社交分享', value: 91 },
        { subject: '地域风味接受', value: 79 },
        { subject: '价格敏感', value: 62 },
        { subject: '复购意愿', value: 74 },
      ],
      penetration: [
        { month: 'M1', value: 3.2 },
        { month: 'M2', value: 4.7 },
        { month: 'M3', value: 6.4 },
        { month: 'M4', value: 7.1 },
      ],
      brandAwareness: [
        { stage: '上市前', value: 22 },
        { stage: '上市后1月', value: 31 },
        { stage: '上市后2月', value: 37 },
        { stage: '上市后3月', value: 43 },
      ],
      salesGrowth: [
        { month: '1月', sales: 24, roi: 1.3 },
        { month: '2月', sales: 38, roi: 2.1 },
        { month: '3月', sales: 58, roi: 2.6 },
      ],
    },
  },
  {
    id: 'coke-lgm',
    label: '案例2',
    name: '可口可乐 × 老干妈跨界联名项目',
    goal: '探索中国本土文化IP与国际饮料品牌联合创新的商业机会。',
    flow: [
      {
        title: '案例背景',
        content: '联名产品热度持续提升，品牌希望构建“文化认同+口味反差”双驱动创新。',
      },
      {
        title: '市场洞察',
        content: '联名产品市场年增速保持高位，国潮消费指数持续走高，节庆节点爆发明显。',
      },
      {
        title: '消费者洞察',
        content: '消费者对地域文化、国潮元素和反差联名兴趣显著提升，购买动因以“尝鲜+分享”为主。',
      },
      {
        title: '产品创新策略',
        content: '整合辣味零食、调味品与碳酸饮料三类数据，定义“甜+辣”限定口味的创新边界。',
      },
      {
        title: '上市执行',
        content: '围绕城市地标快闪、联名礼盒、KOL挑战赛进行分阶段传播。',
      },
      {
        title: '最终成果',
        content: '上市6个月限定版销售额突破8000万元，品牌社交声量增长210%。',
      },
    ],
    kpis: [
      { name: '上市6个月销售额', value: '8000万元+' },
      { name: '复购率', value: '28%' },
      { name: '品牌社交声量', value: '+210%' },
      { name: '年轻消费者占比', value: '+22%' },
      { name: '联名渗透率', value: '11.5%' },
      { name: '投放ROI', value: '2.9x' },
    ],
    charts: {
      marketSize: [
        { period: '2021', value: 130 },
        { period: '2022', value: 168 },
        { period: '2023', value: 209 },
        { period: '2024', value: 258 },
        { period: '2025', value: 312 },
      ],
      channelSales: [
        { channel: '电商', sales: 40 },
        { channel: '便利店', sales: 34 },
        { channel: '商超', sales: 21 },
        { channel: '餐饮联名', sales: 27 },
      ],
      consumerRadar: [
        { subject: '国潮偏好', value: 88 },
        { subject: '地域文化认同', value: 83 },
        { subject: '反差联名兴趣', value: 90 },
        { subject: '价格敏感', value: 58 },
        { subject: '分享意愿', value: 92 },
      ],
      penetration: [
        { month: 'M1', value: 4.1 },
        { month: 'M2', value: 6.3 },
        { month: 'M3', value: 8.9 },
        { month: 'M4', value: 11.5 },
      ],
      brandAwareness: [
        { stage: '联名前', value: 39 },
        { stage: '联名后2月', value: 48 },
        { stage: '联名后4月', value: 55 },
        { stage: '联名后6月', value: 63 },
      ],
      salesGrowth: [
        { month: '1-2月', sales: 10, roi: 1.7 },
        { month: '3-4月', sales: 26, roi: 2.4 },
        { month: '5-6月', sales: 44, roi: 2.9 },
      ],
    },
  },
  {
    id: 'herbal-mask',
    label: '案例3（推荐）',
    name: '草本功效面膜创新项目',
    goal: '帮助国产护肤品牌开发符合18-35岁人群需求的新一代功能型面膜。',
    flow: [
      {
        title: '案例背景',
        content: '功效护肤与国风养生趋势叠加，品牌希望构建“东方草本+科技验证”的产品新叙事。',
      },
      {
        title: '市场洞察',
        content: '功能型面膜赛道保持双位数增长，修护类与舒缓类需求增长最为明显。',
      },
      {
        title: '消费者洞察',
        content: '18-35岁消费者对熬夜修复、成分安全、东方草本认同度显著提升。',
      },
      {
        title: '产品创新策略',
        content: '基于鱼腥草、积雪草、灵芝多糖等成分关注度，联合生物科技伙伴共创东方修护系列。',
      },
      {
        title: '上市执行',
        content: '以直播内容种草+达人测评+医研共创背书推动天猫与私域同步增长。',
      },
      {
        title: '最终成果',
        content: '上市12个月销售额增长380%，进入天猫类目TOP10，复购率提升45%。',
      },
    ],
    kpis: [
      { name: '销售额增长', value: '+380%' },
      { name: '天猫类目排名', value: 'TOP10' },
      { name: '复购率提升', value: '+45%' },
      { name: '品牌认知度', value: '+32%' },
      { name: 'NPS提升', value: '+19分' },
      { name: '12月ROI', value: '3.4x' },
    ],
    charts: {
      marketSize: [
        { period: '2021', value: 88 },
        { period: '2022', value: 103 },
        { period: '2023', value: 126 },
        { period: '2024', value: 156 },
        { period: '2025', value: 193 },
      ],
      channelSales: [
        { channel: '天猫', sales: 48 },
        { channel: '抖音', sales: 29 },
        { channel: '线下CS', sales: 19 },
        { channel: '私域', sales: 24 },
      ],
      consumerRadar: [
        { subject: '功效诉求', value: 87 },
        { subject: '熬夜修复', value: 81 },
        { subject: '草本偏好', value: 76 },
        { subject: '品牌信任', value: 72 },
        { subject: '价格敏感', value: 55 },
      ],
      penetration: [
        { month: 'Q1', value: 5.8 },
        { month: 'Q2', value: 8.4 },
        { month: 'Q3', value: 11.7 },
        { month: 'Q4', value: 14.3 },
      ],
      brandAwareness: [
        { stage: '上市前', value: 28 },
        { stage: '上市后3月', value: 35 },
        { stage: '上市后6月', value: 46 },
        { stage: '上市后12月', value: 60 },
      ],
      salesGrowth: [
        { month: 'Q1', sales: 18, roi: 1.8 },
        { month: 'Q2', sales: 32, roi: 2.5 },
        { month: 'Q3', sales: 46, roi: 3.0 },
        { month: 'Q4', sales: 61, roi: 3.4 },
      ],
    },
  },
];

const pieColors = ['#22d3ee', '#38bdf8', '#818cf8', '#2dd4bf'];

function ChartCard({ title, icon, children }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-4">
      <div className="mb-3 flex items-center gap-2 text-sm font-medium text-slate-200">
        {icon}
        {title}
      </div>
      <div className="h-60">{children}</div>
    </div>
  );
}

export default function SuccessStories() {
  const [activeId, setActiveId] = useState(cases[2].id);

  const activeCase = useMemo(
    () => cases.find((item) => item.id === activeId) ?? cases[0],
    [activeId]
  );

  return (
    <section id="stories" className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-4xl">
          <div className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300">成功案例</div>
          <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">案例展示：从洞察到增长结果</h2>
          <p className="mt-3 text-slate-300">
            模块聚焦数据驱动决策、市场洞察、消费者研究、产品创新与商业增长。
          </p>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          {cases.map((item) => {
            const isActive = item.id === activeCase.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveId(item.id)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  isActive
                    ? 'bg-cyan-400 text-slate-950'
                    : 'border border-white/15 bg-white/5 text-slate-200 hover:border-cyan-300/60 hover:text-cyan-100'
                }`}
              >
                {item.label} · {item.name}
              </button>
            );
          })}
        </div>

        <article className="mt-6 rounded-[28px] border border-white/10 bg-slate-900/70 p-6 sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <h3 className="text-2xl font-semibold text-white">{activeCase.name}</h3>
              <p className="mt-3 text-slate-300">{activeCase.goal}</p>

              <div className="mt-6 space-y-3">
                {activeCase.flow.map((step) => (
                  <div key={step.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="text-sm font-semibold text-cyan-300">{step.title}</div>
                    <p className="mt-1 text-sm leading-6 text-slate-200">{step.content}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="rounded-2xl border border-cyan-300/20 bg-cyan-400/10 p-4 text-sm text-cyan-100">
                关键数据指标
              </div>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {activeCase.kpis.map((kpi) => (
                  <div key={kpi.name} className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                    <div className="text-xs text-slate-400">{kpi.name}</div>
                    <div className="mt-1 text-xl font-semibold text-white">{kpi.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            <ChartCard title="市场规模图表（亿元）" icon={<BarChart3 className="h-4 w-4 text-cyan-300" />}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={activeCase.charts.marketSize}>
                  <defs>
                    <linearGradient id="marketGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.45} />
                      <stop offset="100%" stopColor="#22d3ee" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.2)" />
                  <XAxis dataKey="period" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip />
                  <Area type="monotone" dataKey="value" stroke="#22d3ee" fill="url(#marketGradient)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="消费者画像图表" icon={<RadarIcon className="h-4 w-4 text-cyan-300" />}>
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={activeCase.charts.consumerRadar} outerRadius="70%">
                  <PolarGrid stroke="rgba(148,163,184,0.25)" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#cbd5e1', fontSize: 12 }} />
                  <PolarRadiusAxis domain={[0, 100]} tick={{ fill: '#64748b' }} />
                  <Radar name="指数" dataKey="value" stroke="#38bdf8" fill="#38bdf8" fillOpacity={0.4} />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="渠道销售趋势（万件）" icon={<BarChart3 className="h-4 w-4 text-cyan-300" />}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={activeCase.charts.channelSales}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.2)" />
                  <XAxis dataKey="channel" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip />
                  <Bar dataKey="sales" fill="#22d3ee" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="产品渗透率与品牌认知度（%）" icon={<ArrowUpRight className="h-4 w-4 text-cyan-300" />}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={activeCase.charts.penetration.map((item, index) => ({
                  ...item,
                  awareness: activeCase.charts.brandAwareness[index]?.value ?? null,
                }))}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.2)" />
                  <XAxis dataKey="month" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="value" name="渗透率" stroke="#22d3ee" strokeWidth={2} />
                  <Line type="monotone" dataKey="awareness" name="认知度" stroke="#818cf8" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="销售增长曲线（百万）与ROI" icon={<ArrowUpRight className="h-4 w-4 text-cyan-300" />}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={activeCase.charts.salesGrowth}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.2)" />
                  <XAxis dataKey="month" stroke="#94a3b8" />
                  <YAxis yAxisId="left" stroke="#94a3b8" />
                  <YAxis yAxisId="right" orientation="right" stroke="#94a3b8" />
                  <Tooltip />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="sales" name="销售额" stroke="#2dd4bf" strokeWidth={2.5} />
                  <Line yAxisId="right" type="monotone" dataKey="roi" name="ROI" stroke="#f59e0b" strokeWidth={2.5} />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="消费者动机构成（%）" icon={<PieChartIcon className="h-4 w-4 text-cyan-300" />}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={activeCase.charts.consumerRadar.map((item) => ({
                      name: item.subject,
                      value: item.value,
                    }))}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                  >
                    {activeCase.charts.consumerRadar.map((item, index) => (
                      <Cell key={`${item.subject}-${index}`} fill={pieColors[index % pieColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>
          {activeCase.id === 'herbal-mask' && (
            <div className="mt-6 flex justify-center">
              <Link
                to="/case/herbal-mask"
                className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-400/20 transition hover:bg-cyan-300 active:scale-95"
              >
                <ExternalLink className="h-4 w-4" />
                查看完整深度案例分析
              </Link>
            </div>
          )}
          <p className="mt-5 text-xs text-slate-400">

          </p>
        </article>
      </div>
    </section>
  );
}
