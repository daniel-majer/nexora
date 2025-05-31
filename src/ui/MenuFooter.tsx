import { LogOutIcon } from "lucide-react";
import { useLogout } from "../features/login/useLogout";
import { Avatar } from "./Avatar";
import toast from "react-hot-toast";

export const MenuFooter = () => {
  const { mutate: logout } = useLogout();

  return (
    <div className="mt-12 mb-10 leading-5 font-medium transition duration-500 sm:mb-0">
      <Avatar />
      <div
        onClick={() => {
          toast.promise(
            () =>
              new Promise<void>((resolve, reject) => {
                logout(undefined, {
                  onSuccess: () => resolve(),
                  onError: () => reject(),
                });
              }),
            {
              loading: "Logout..",
            },
          );
        }}
        className="flex cursor-pointer items-center justify-center gap-2 transition duration-500 hover:text-purple-900 lg:justify-start lg:px-2 lg:py-3 dark:hover:text-purple-400"
      >
        <LogOutIcon size={20} />
        <span className="hidden lg:block">Log out</span>
      </div>
    </div>
  );
};
