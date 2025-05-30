import { LogOutIcon } from "lucide-react";
import { useLogout } from "../features/login/useLogout";
import { Avatar } from "./Avatar";

export const MenuFooter = () => {
  const { mutate: logout } = useLogout();

  return (
    <div className="mt-12 leading-5 font-medium transition duration-500">
      <Avatar />
      <div
        onClick={() => logout()}
        className="flex cursor-pointer items-center justify-center gap-2 transition duration-500 hover:text-purple-900 lg:justify-start lg:px-2 lg:py-3 dark:hover:text-purple-400"
      >
        <LogOutIcon size={20} />
        <span className="hidden lg:block">Log out</span>
      </div>
    </div>
  );
};
