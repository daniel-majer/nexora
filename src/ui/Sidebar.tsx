import { MenuContent } from "./MenuContent";
import { MenuFooter } from "./MenuFooter";
import { MenuLogo } from "./MenuLogo";

export const Sidebar = () => {
  return (
    <div className="scrollbar-thin scrollbar-thumb-zinc-400 dark:scrollbar-thumb-zinc-700 scrollbar-track-zinc-200 dark:scrollbar-track-zinc-600 flex h-screen w-fit flex-col justify-between overflow-auto p-2 transition duration-500 lg:w-fit lg:min-w-80 lg:px-4 lg:py-10 dark:text-white">
      <div>
        <MenuLogo />
        <MenuContent />
      </div>
      <MenuFooter />
    </div>
  );
};
