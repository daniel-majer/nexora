import React from "react";
import type { LucideIcon } from "lucide-react";
type ColorsProps = { bg: string; text: string };

type TabOption = {
  label: string;
  value: string;
  icon: LucideIcon;
  colors: ColorsProps;
};

type TabsProps = {
  options: TabOption[];
};

export const Tabs: React.FC<TabsProps> = ({ options }) => {
  return (
    <div
      className={`mt-10 grid gap-6`}
      style={{
        gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))`,
      }}
    >
      {options.map((opt) => {
        const Icon = opt.icon;
        return (
          <div
            key={opt.label}
            className="flex items-center gap-2 rounded-md bg-zinc-100 p-4 dark:bg-zinc-800"
          >
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-full ${opt.colors.bg}`}
            >
              <Icon className={`h-6 w-6 ${opt.colors.text}`} />
            </div>
            <div>
              <span className="block text-sm font-bold text-zinc-500 dark:text-zinc-200">
                {opt.label.toLocaleUpperCase()}
              </span>
              <span className="text-2xl font-semibold text-zinc-900 dark:text-white">
                {opt.value}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
