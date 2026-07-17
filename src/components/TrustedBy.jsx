const brands = ['Coca-Cola', 'PepsiCo', 'Nestlé', 'Unilever', 'P&G', 'Mondelez'];

export default function TrustedBy() {
  return (
    <section className="px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl rounded-[30px] border border-white/10 bg-white/5 p-6 backdrop-blur-sm sm:p-10">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-white sm:text-3xl">深受进取型快消品牌信赖</h2>
          <p className="mt-3 text-slate-300">以下品牌名称仅用于竞赛演示示例。</p>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {brands.map((brand) => (
            <div key={brand} className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-5 text-center text-sm font-semibold tracking-[0.15em] text-slate-200">
              {brand}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
