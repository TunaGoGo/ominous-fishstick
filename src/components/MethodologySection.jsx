import { ArrowRight, BrainCircuit, ChartNoAxesCombined, Search, Sparkles, Target } from 'lucide-react';

const steps = [
  { title: '市场信号', description: '追踪品类增长、持续需求变化与新兴消费讨论。', icon: Search },
  { title: 'NIQ 数据', description: '融合零售商与消费者数据，构建实时市场情报底座。', icon: ChartNoAxesCombined },
  { title: 'AI 分析', description: '将碎片化信号转化为模式识别与机会评分。', icon: BrainCircuit },
  { title: '业务策略', description: '以可决策洞察优先排序产品、报价与上市路径。', icon: Target },
  { title: '增长落地', description: '支持上市执行、渠道规划与可量化商业成果。', icon: Sparkles },
];

export default function MethodologySection() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <div className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300">方法论</div>
          <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">从数据到决策</h2>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-5">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className="rounded-[24px] border border-white/10 bg-white/5 p-5 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-400/20 to-blue-500/20 text-cyan-200">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="mt-3 text-lg font-semibold text-white">{step.title}</div>
                <p className="mt-2 text-sm leading-6 text-slate-300">{step.description}</p>
                {index < steps.length - 1 && <ArrowRight className="mx-auto mt-4 h-4 w-4 text-cyan-300" />}
              </div>
            );
          })}
        </div>

        <p className="mt-8 text-center text-lg text-slate-200">
          我们不止提供数据，更把数据转化为品牌可以执行的决策。
        </p>
      </div>
    </section>
  );
}
