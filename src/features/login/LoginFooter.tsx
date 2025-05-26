import { socials } from "../../data/socials";

export const LoginFooter = () => {
  return (
    <div>
      <div
        id="third-party-auth"
        className="mt-5 flex flex-wrap items-center justify-center"
      >
        {socials.map((s) => {
          return (
            <button
              key={s.link}
              className="m-1 rounded-lg p-2 shadow-lg duration-300 ease-in-out hover:scale-105"
            >
              <img className="max-w-[25px]" src={s.link} alt={s.name} />
            </button>
          );
        })}
      </div>
      <div className="mt-4 flex flex-col items-center text-center text-sm text-gray-500">
        <p className="cursor-default">
          By signing in, you agree to our{" "}
          <a className="group text-blue-400 transition-all duration-100 ease-in-out">
            <span className="cursor-pointer bg-gradient-to-r from-blue-400 to-blue-400 bg-[length:0%_2px] bg-left-bottom bg-no-repeat transition-all duration-500 ease-out group-hover:bg-[length:100%_2px]">
              Terms
            </span>{" "}
          </a>
          and{" "}
          <a className="group text-blue-400 transition-all duration-100 ease-in-out">
            <span className="cursor-pointer bg-gradient-to-r from-blue-400 to-blue-400 bg-[length:0%_2px] bg-left-bottom bg-no-repeat transition-all duration-500 ease-out group-hover:bg-[length:100%_2px]">
              Privacy Policy
            </span>
          </a>
        </p>
      </div>
    </div>
  );
};
