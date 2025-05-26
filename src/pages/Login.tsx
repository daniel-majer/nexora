import React from "react";
import login from "../assets/login.svg";
import { Heading } from "../ui/Heading";
import { LoginFooter } from "../features/login/LoginFooter";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { FormProvider, useForm, type UseFormReturn } from "react-hook-form";

type LoginType = {
  email: string;
  password: string;
};

export const Login = () => {
  const [visible, setVisible] = React.useState(false);
  const methods: UseFormReturn<LoginType> = useForm<LoginType>({
    defaultValues: { email: "example@nexora.com", password: "qwertz123" },
    mode: "onChange",
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = (formData: LoginType) => {
    console.log(formData);
  };

  React.useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`flex h-screen w-screen items-center justify-center gap-60 transition-opacity duration-700 ease-in-out dark:bg-gray-900 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="">
        <img src={login} width={700} alt="" />
      </div>

      <div className="grid gap-8">
        <div className="m-2 rounded-[20px] border-2 border-purple-800 bg-white shadow-lg sm:p-2 md:p-10 lg:p-10 xl:p-10 2xl:p-10 dark:bg-gray-900">
          <Heading
            level="h1"
            className="cursor-default pt-8 pb-6 text-center text-5xl font-bold dark:text-gray-400"
          >
            Log in
          </Heading>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Input
                placeholder="Email"
                label="Email"
                className="w-full rounded-lg border border-gray-300 p-3 py-3 shadow-md duration-300 ease-in-out placeholder:text-base focus:scale-105 dark:border-gray-700 dark:bg-purple-700 dark:text-gray-300"
                name="email"
              />
              <Input
                type="password"
                placeholder="Password"
                label="Password"
                className="w-full rounded-lg border border-gray-300 p-3 py-3 shadow-md duration-300 ease-in-out placeholder:text-base focus:scale-105 dark:border-gray-700 dark:bg-purple-700 dark:text-gray-300"
                name="email"
              />
              <a className="group text-blue-400 transition-all duration-100 ease-in-out">
                <span className="bg-gradient-to-r from-blue-400 to-blue-400 bg-[length:0%_2px] bg-left-bottom bg-no-repeat text-sm transition-all duration-500 ease-out group-hover:bg-[length:100%_2px]">
                  Forget your password?
                </span>
              </a>
              <Button
                className="mt-6 w-full rounded-lg bg-purple-500 p-2 text-white shadow-lg transition duration-300 ease-in-out hover:scale-105 hover:from-purple-500 hover:to-blue-500 dark:text-gray-300"
                type="submit"
              >
                LOG IN
              </Button>
            </form>
          </FormProvider>
          <div className="mt-4 flex flex-col items-center justify-center text-sm">
            <h3 className="dark:text-gray-300">
              Account creation is available only within the app.
            </h3>
          </div>
          {/*  <!-- Third Party Authentication Options --> */}
          <LoginFooter />
        </div>
      </div>
    </div>
  );
};
