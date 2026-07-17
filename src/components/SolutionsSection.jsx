import { ArrowUpRight, BarChart3, Brain, Boxes, Globe, Megaphone, Sparkles } from 'lucide-react';

const services = [
  {
    title: '新品机会调研',
    description: '扫描市场白空间，识别高增速细分赛道，为新品方向提供数据支撑。',
    icon: BarChart3,
  },
  {
    title: '消费者洞察',
    description: '精准定位目标人群，挖掘真实购买动机、痛点与潜在需求。',
    icon: Brain,
  },
  {
    title: '产品概念测试',
    description: '在上市前验证产品概念吸引力、成分认知与功效诉求的市场接受度。',
    icon: Sparkles,
  },
  {
    title: '上市定价策略',
    description: '建模最优价格带与竞品定位，平衡销量目标与利润空间。',
    icon: BadgePercentIcon,
  },
  {
    title: '上市渠道规划',
    description: '基于渠道数据制定电商、线下与私域的差异化铺货与推广策略。',
    icon: Megaphone,
  },
  {
    title: '全球上市评估',
    description: '评估海外市场成熟度与进入壁垒，规划新品国际化扩张路径。',
    icon: Globe,
  },
];

export default function SolutionsSection() {
  return (
    <section id="solutions" className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 max-w-3xl">
          <div className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300">解决方案</div>
          <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">新品调研 · 产品上市策略</h2>
          <p className="mt-3 text-slate-300">从市场机会识别到产品成功上市，NIQ WTF Lab 提供全链路数据驱动解决方案。</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="group rounded-[24px] border border-white/10 bg-slate-900/70 p-5 transition hover:-translate-y-1 hover:border-cyan-300/40 hover:bg-slate-900"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400/20 to-indigo-500/20 text-cyan-200">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-white">{service.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">{service.description}</p>
                <a href="#contact" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 transition group-hover:text-cyan-100">
                  了解更多
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function BadgePercentIcon() {
  return <Boxes className="h-5 w-5" />;
}
