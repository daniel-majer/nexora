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
    <div className="mt-6 grid grid-cols-1 gap-2 sm:gap-6 lg:mt-10 sm:grid-cols-2 xl:grid-cols-4">
      {options.map((opt) => {
        const Icon = opt.icon;
        return (
          <div
            key={opt.label}
            className="flex items-center gap-2 rounded-md bg-zinc-100 p-2 transition duration-500 sm:p-4 dark:bg-zinc-900"
          >
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full sm:h-12 sm:w-12 ${opt.colors.bg}`}
            >
              <Icon className={`sm:h-6 h-4 w-4 sm:w-6 ${opt.colors.text}`} />
            </div>
            <div>
              <span className="block text-xs sm:text-sm font-bold text-zinc-500 transition duration-500 dark:text-zinc-200">
                {opt.label.toLocaleUpperCase()}
              </span>
              <span className="text-xl sm:text-2xl font-semibold wrap-anywhere text-zinc-900 transition duration-500 dark:text-white">
                {opt.value}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
