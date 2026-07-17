import { motion } from 'framer-motion';
import {
  ArrowRight,
  BarChart3,
  BadgePercent,
  BrainCircuit,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const chartData = [
  { name: '1月', value: 41 },
  { name: '2月', value: 54 },
  { name: '3月', value: 49 },
  { name: '4月', value: 63 },
  { name: '5月', value: 70 },
  { name: '6月', value: 78 },
];

const metrics = [
  '50+ 创新项目',
  '覆盖30+市场',
  '95% 机会预测准确率',
];

export default function HeroSection() {
  return (
    <section id="home" className="relative overflow-hidden px-4 pb-16 pt-10 sm:px-6 lg:px-8 lg:pb-24 lg:pt-14">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(34,211,238,0.16),_transparent_30%),radial-gradient(circle_at_left,_rgba(124,58,237,0.12),_transparent_30%)]" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-100">
            <SparklesIcon />
            NIQ WTF Lab · What's The Future Lab
          </div>

          <div className="space-y-4">
            <h1 className="max-w-2xl text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
              Question What's Next.
              <span className="block text-transparent bg-gradient-to-r from-cyan-300 via-blue-300 to-indigo-400 bg-clip-text">
                Build What Works.
              </span>
            </h1>
            <p className="max-w-2xl text-lg text-slate-300">
              专注新品调研与产品上市策略，结合 NIQ 零售情报、消费者洞察与 AI 分析，帮助品牌发现机会、打造爆品并制胜市场。
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href="#solutions"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-cyan-100"
            >
              查看解决方案
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#stories"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 font-semibold text-white transition hover:-translate-y-0.5 hover:border-cyan-300/60 hover:bg-cyan-400/10"
            >
              浏览成功案例
            </a>
          </div>

          <div className="grid gap-3 pt-4 sm:grid-cols-3">
            {metrics.map((metric) => (
              <div key={metric} className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                <div className="text-lg font-semibold text-white">{metric}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="rounded-[28px] border border-white/10 bg-slate-900/70 p-5 shadow-2xl shadow-cyan-950/30 backdrop-blur-xl"
        >
          <div className="mb-4 flex items-center justify-between">
            <div>
              <div className="text-sm text-slate-400">机会快照</div>
              <div className="text-2xl font-semibold text-white">增长指挥中心</div>
            </div>
            <div className="rounded-full bg-emerald-500/15 px-3 py-1 text-sm font-semibold text-emerald-300">市场增长 +18.6%</div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <TrendingUp className="h-4 w-4 text-cyan-300" />
                消费者兴趣
              </div>
              <div className="mt-2 text-3xl font-semibold text-white">82</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <BrainCircuit className="h-4 w-4 text-violet-300" />
                机会评分
              </div>
              <div className="mt-2 text-3xl font-semibold text-white">91</div>
            </div>
          </div>

          <div className="mt-4 h-52 rounded-2xl border border-white/10 bg-slate-950/60 p-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid rgba(34,211,238,0.25)', borderRadius: '12px' }} />
                <Line type="monotone" dataKey="value" stroke="#22d3ee" strokeWidth={3} dot={{ r: 3, fill: '#67e8f9' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {['风味趋势', '价格机会', '市场潜力', '跨品类适配'].map((item) => (
              <span key={item} className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-100">
                {item}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function SparklesIcon() {
  return <Sparkles className="h-3.5 w-3.5 text-cyan-200" />;
}
