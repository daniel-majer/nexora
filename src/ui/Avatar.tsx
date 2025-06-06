import React from "react";
import { useUser } from "../features/login/useUser";

const AvatarComponent = () => {
  const { user } = useUser();

  return (
    <div className="mb-4 flex items-center gap-2 wrap-anywhere">
      <div className="flex w-fit shrink-0 items-center justify-center rounded-full bg-zinc-200 lg:w-12">
        <img
          src={user?.user_metadata.avatar}
          alt="Avatar"
          className="h-10 w-10 rounded-full object-cover lg:h-12 lg:w-12"
        />
      </div>
      <div className="hidden lg:block">
        <span className="block font-bold text-purple-950 transition duration-500 dark:text-purple-400">
          {user?.email}
        </span>
        <span className="font-light text-zinc-500 transition duration-500 dark:text-zinc-200">
          {user?.user_metadata.fullName}
        </span>
      </div>
    </div>
  );
};

export const Avatar = React.memo(AvatarComponent);
