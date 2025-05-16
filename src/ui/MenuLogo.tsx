import React from "react";
import logo from "../assets/logo1.svg";
import { NavLink } from "react-router";

export const MenuLogo = () => {
  return (
    <div className="cursor-pointer rounded-xl border border-zinc-300 p-3">
      <NavLink to="/" className={"flex items-center gap-2"}>
        <img src={logo} alt="Logo" width={56} className="rounded-lg" />
        <div className="leading-4">
          <span className="block text-2xl font-semibold">Nexora Inc.</span>
          <span className="ransition text-zinc-500 duration-500 dark:text-zinc-300">
            Free plan
          </span>
        </div>
      </NavLink>
    </div>
  );
};
