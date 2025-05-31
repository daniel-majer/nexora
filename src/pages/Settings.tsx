import React from "react";
import { UpdateDataForm } from "../features/login/UpdateDataForm";
import { UpdatePasswordForm } from "../features/login/UpdatePasswordForm";
import { Heading } from "../ui/Heading";

const SettingsComponent = () => {
  return (
    <div>
      <div className="border-b border-b-zinc-200 pb-8 transition duration-500 dark:border-b-zinc-700">
        <Heading level="h1">Settings</Heading>
        <Heading level="h3" className="mt-2 font-extralight text-zinc-500">
          Update your account information or change your password below.
        </Heading>
      </div>

      <div className="m-auto mt-10 max-w-[768px] space-y-16">
        <UpdateDataForm />
        <UpdatePasswordForm />
      </div>
    </div>
  );
};

export const Settings = React.memo(SettingsComponent);
