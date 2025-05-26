import { LogOutIcon, UserIcon } from "lucide-react";
import { useLogout } from "../features/login/useLogout";
import { useUser } from "../features/login/useUser";
import { Avatar } from "./Avatar";

export const MenuFooter = () => {
  const { mutate: logout } = useLogout();

  return (
    <div className="mt-12 px-5 leading-5 font-medium transition duration-500">
      <Avatar />
      <div
        onClick={() => logout()}
        className="flex cursor-pointer items-center gap-2 p-2 py-3 transition duration-500 hover:text-purple-900 dark:hover:text-purple-400"
      >
        <LogOutIcon size={20} />
        <span>Log out</span>
      </div>
    </div>
  );
};
