const team = [
  {
    name: 'Bowen Kang',
    initials: 'BK',
    role: 'CPO',
    roleLabel: 'Chief Product Officer',
    bio: '主导新品调研与产品创新策略，深耕消费品市场洞察与爆款产品定义。',
    color: 'from-cyan-400/30 to-cyan-600/20',
    accent: 'text-cyan-300',
  },
  {
    name: 'Burney Jin',
    initials: 'BJ',
    role: 'CPO',
    roleLabel: 'Chief Product Officer',
    bio: '负责产品上市全链路策略设计，擅长将数据洞察转化为可执行的上市方案。',
    color: 'from-blue-400/30 to-blue-600/20',
    accent: 'text-blue-300',
  },
  {
    name: 'Diana Kang',
    initials: 'DK',
    role: 'CXO',
    roleLabel: 'Chief Experience Officer',
    bio: '聚焦消费者体验与品牌叙事，驱动产品与用户之间的深层连接与共鸣。',
    color: 'from-indigo-400/30 to-purple-600/20',
    accent: 'text-indigo-300',
  },
  {
    name: 'Rustin Zhao',
    initials: 'RZ',
    role: 'CTO',
    roleLabel: 'Chief Technology Officer',
    bio: '构建 AI 驱动的市场分析引擎，将零售情报与消费者数据转化为实时增长洞察。',
    color: 'from-teal-400/30 to-emerald-600/20',
    accent: 'text-teal-300',
  },
];

export default function TeamSection() {
  return (
    <section id="team" className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <div className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300">核心团队</div>
          <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
            NIQ WTF Lab 创始团队
          </h2>
          <p className="mt-3 text-slate-300 max-w-xl mx-auto">
            跨职能领导力，驱动新品调研与产品上市策略的全链路交付。
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member) => (
            <div
              key={member.name}
              className="group rounded-[24px] border border-white/10 bg-slate-900/70 p-6 transition hover:-translate-y-1 hover:border-cyan-300/30 hover:bg-slate-900"
            >
              {/* Avatar */}
              <div className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${member.color} border border-white/10 text-xl font-black text-white tracking-tight`}>
                {member.initials}
              </div>

              {/* Role badge */}
              <div className="mt-4 inline-flex items-center gap-1.5">
                <span className={`text-2xl font-black ${member.accent} leading-none`}>
                  {member.role}
                </span>
              </div>
              <div className="text-xs text-slate-400 mt-0.5">{member.roleLabel}</div>

              {/* Name */}
              <div className="mt-3 text-lg font-semibold text-white">{member.name}</div>

              {/* Bio */}
              <p className="mt-2 text-sm leading-6 text-slate-400">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
