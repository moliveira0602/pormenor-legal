interface Stat {
  icon: string;
  value: string;
  label: string;
}

const stats: Stat[] = [
  { icon: "emoji_events", value: "4.575", label: "Veículos legalizados" },
  { icon: "home_repair_service", value: "17", label: "Serviços disponíveis" },
  { icon: "groups", value: "4.478", label: "Clientes satisfeitos" },
  { icon: "location_on", value: "Fafe", label: "Atendimento presencial" },
];

export default function StatsBar() {
  return (
    <div className="bg-white border-b border-[var(--border)]">
      <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <div
            key={i}
            className={`flex items-center gap-4 py-7 px-4 ${
              i < stats.length - 1 ? "border-r border-[var(--border)]" : ""
            }`}
          >
            <div className="w-11 h-11 rounded-[10px] bg-primary/10 flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-primary text-xl">
                {s.icon}
              </span>
            </div>
            <div>
              <strong className="font-display font-extrabold text-navy text-[1.3rem] block leading-none">
                {s.value}
              </strong>
              <span className="text-muted text-xs mt-0.5 block">{s.label}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
