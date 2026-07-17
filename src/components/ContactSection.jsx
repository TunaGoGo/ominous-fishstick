import { Mail, MapPin, Phone } from 'lucide-react';

export default function ContactSection() {
  return (
    <section id="contact" className="px-4 pb-16 pt-8 sm:px-6 lg:px-8 lg:pb-24">
      <div className="mx-auto grid max-w-7xl gap-6 rounded-[30px] border border-white/10 bg-slate-900/80 p-8 lg:grid-cols-[0.95fr_1.05fr] lg:p-10">
        <div>
          <div className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300">联系我们</div>
          <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">让市场信号成为你的下一步增长行动</h2>
          <p className="mt-4 text-slate-300">
            预约一次沟通，共同评估你的品类现状、创新机会与扩张策略。
          </p>

          <div className="mt-6 space-y-3">
            <div className="flex items-center gap-3 text-slate-200"><Mail className="h-4 w-4 text-cyan-300" />hello@insightforge.ai</div>
            <div className="flex items-center gap-3 text-slate-200"><Phone className="h-4 w-4 text-cyan-300" />+86 21 5555 8801</div>
            <div className="flex items-center gap-3 text-slate-200"><MapPin className="h-4 w-4 text-cyan-300" />Shanghai · Beijing · Singapore</div>
          </div>
        </div>

        <div className="rounded-[24px] border border-white/10 bg-white/5 p-5">
          <form className="space-y-3">
            <div className="grid gap-3 sm:grid-cols-2">
              <input className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none" placeholder="姓名" />
              <input className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none" placeholder="公司" />
            </div>
            <input className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none" placeholder="邮箱" />
            <textarea className="min-h-[124px] w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none" placeholder="请告诉我们你的增长挑战" />
            <button type="button" className="w-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-5 py-3 font-semibold text-slate-950 transition hover:scale-[1.01] hover:shadow-lg hover:shadow-cyan-500/30">
              提交咨询
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
