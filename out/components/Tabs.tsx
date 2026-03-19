interface Tab {
  id: string;
  label: string;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (id: string) => void;
}

export default function Tabs({ tabs, activeTab, onTabChange }: TabsProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="inline-flex items-center gap-2 bg-white rounded-xl p-1 border border-[var(--border)] shadow-[0_2px_12px_rgba(7,17,43,0.06)] mx-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`py-3 px-6 rounded-lg font-display font-bold text-sm transition-all duration-200 ${
              activeTab === tab.id
                ? "bg-primary text-white shadow-[0_4px_16px_rgba(211,116,66,0.35)]"
                : "text-muted hover:text-navy hover:bg-gray-50"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
