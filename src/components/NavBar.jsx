import { ArrowRight, Sparkles } from 'lucide-react';

const navItems = [
  { label: '首页', href: '#home' },
  { label: '解决方案', href: '#solutions' },
  { label: '成功案例', href: '#stories' },
  { label: 'AI机会实验室', href: '#lab' },
  { label: '团队', href: '#team' },
  { label: '联系我们', href: '#contact' },
];

export default function NavBar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <a href="#home" className="flex items-center gap-3 text-white">
          <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-cyan-400/40 bg-gradient-to-br from-cyan-400 to-indigo-500 shadow-lg shadow-cyan-500/20">
            <span className="text-xs font-black text-slate-950 tracking-tight leading-none">WTF</span>
          </div>
          <div>
            <div className="text-sm font-bold tracking-[0.18em] text-cyan-200">NIQ WTF LAB</div>
            <div className="text-xs text-slate-400">What's The Future Lab</div>
          </div>
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-slate-300 transition hover:text-cyan-300"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-4 py-2 text-sm font-semibold text-slate-950 transition duration-200 hover:scale-[1.03] hover:shadow-lg hover:shadow-cyan-500/30"
        >
          预约演示
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </header>
  );
}
