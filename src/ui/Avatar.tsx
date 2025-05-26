import { UserIcon } from "lucide-react";
import { useUser } from "../features/login/useUser";
import React from "react";

const AvatarComponent = () => {
  const { user } = useUser();

  return (
    <div className="mb-4 flex items-center gap-2">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-200">
        <UserIcon className="dark:text-purple-950" />
      </div>
      <div>
        <span className="block font-bold text-purple-950 transition duration-500 dark:text-purple-400">
          {user?.email}
        </span>
        <span className="font-light text-zinc-500 transition duration-500 dark:text-zinc-200">
          Admin
        </span>
      </div>
    </div>
  );
};

export const Avatar = React.memo(AvatarComponent);
