import { ArrowRight, BrainCircuit, CircleDollarSign, Layers3, MapPinned } from 'lucide-react';

export default function OpportunityLab() {
  return (
    <section id="lab" className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-6 rounded-[30px] border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 p-8 lg:grid-cols-[1.1fr_0.9fr] lg:p-12">
        <div>
          <div className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300">AI 机会实验室</div>
          <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">为下一波增长构建情景模型</h2>
          <p className="mt-4 max-w-2xl text-slate-300">
            在投资前测试产品、定价、渠道和市场进入策略。我们的 AI 引擎可模拟需求变化、机会评分与商业匹配度，服务快消团队。
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center gap-2 text-sm text-slate-400"><BrainCircuit className="h-4 w-4 text-cyan-300" /> AI 评分</div>
              <div className="mt-2 text-2xl font-semibold text-white">91</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center gap-2 text-sm text-slate-400"><CircleDollarSign className="h-4 w-4 text-cyan-300" /> 价格窗口</div>
              <div className="mt-2 text-2xl font-semibold text-white">¥18–28</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center gap-2 text-sm text-slate-400"><MapPinned className="h-4 w-4 text-cyan-300" /> 进入市场</div>
              <div className="mt-2 text-2xl font-semibold text-white">8</div>
            </div>
          </div>
        </div>

        <div className="rounded-[24px] border border-cyan-400/20 bg-slate-900/80 p-5">
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-400">机会能力栈</div>
            <Layers3 className="h-5 w-5 text-cyan-300" />
          </div>
          <div className="mt-4 space-y-3">
            {[
              '新品概念可行性评估',
              '价格弹性模拟',
              '区域渠道匹配',
              '品牌再定位支持',
            ].map((item) => (
              <div key={item} className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3 text-sm text-slate-200">
                <span>{item}</span>
                <ArrowRight className="h-4 w-4 text-cyan-300" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
