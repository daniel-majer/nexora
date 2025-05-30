import { NavLink } from "react-router";
import logo from "../assets/logo1.svg";

export const MenuLogo = () => {
  return (
    <div className="w-fit cursor-pointer rounded-xl border-zinc-300 lg:w-full lg:border lg:p-3">
      <NavLink to="/" className={"flex items-center gap-2"}>
        <img src={logo} alt="Logo" className="size-10 rounded-lg lg:size-14" />
        <div className="hidden leading-4 lg:block">
          <span className="block text-2xl font-semibold">Nexora Inc.</span>
          <span className="ransition text-zinc-500 duration-500 dark:text-zinc-300">
            Free plan
          </span>
        </div>
      </NavLink>
    </div>
  );
};
