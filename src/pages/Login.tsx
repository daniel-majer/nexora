import login from "../assets/login.svg";
import { Heading } from "../ui/Heading";
import { LoginFooter } from "../features/login/LoginFooter";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { FormProvider, useForm, type UseFormReturn } from "react-hook-form";
import { useLogin } from "../features/login/useLogin";
import { SpinnerMini } from "../ui/SpinnerMini";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

type LoginType = {
  email: string;
  password: string;
};

export const Login = () => {
  const { mutate, isPending } = useLogin();
  const navigate = useNavigate();

  const methods: UseFormReturn<LoginType> = useForm<LoginType>({
    defaultValues: { email: "nexoradotcom@gmail.com", password: "12345678" },
    mode: "onChange",
  });

  const { handleSubmit } = methods;

  const onSubmit = (formData: LoginType) => {
    mutate(formData, {
      onSuccess: () => {
        navigate("/", { replace: true });
      },
      onError: () => {
        toast.error("Incorrect email or password. Please try again.");
      },
    });
  };

  return (
    <div className="grid h-screen w-screen place-content-center place-items-center p-4 transition-opacity duration-500 ease-in-out sm:p-8 lg:grid-cols-2 dark:bg-gray-900">
      <div className="hidden lg:block">
        <img src={login} width={700} alt="Login animation" />
      </div>

      <div className="grid max-w-lg justify-center gap-8 self-start">
        <div className="rounded-2xl border-2 border-purple-800 bg-white p-6 shadow-lg sm:p-10 dark:bg-gray-900">
          <Heading
            level="h1"
            className="cursor-default pt-4 pb-3 text-center text-4xl! font-bold sm:pt-8 sm:pb-6 sm:text-5xl! dark:text-gray-400"
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
                name="password"
              />
              <a className="group text-blue-400 transition-all duration-100 ease-in-out">
                <span className="bg-gradient-to-r from-blue-400 to-blue-400 bg-[length:0%_2px] bg-left-bottom bg-no-repeat text-sm transition-all duration-500 ease-out group-hover:bg-[length:100%_2px]">
                  Forget your password?
                </span>
              </a>
              <Button
                disabled={isPending}
                className="mt-6 w-full rounded-lg bg-purple-500 py-2 text-white shadow-lg transition duration-300 ease-in-out hover:scale-105 hover:from-purple-500 hover:to-blue-500 dark:text-gray-300"
                type="submit"
              >
                {isPending ? <SpinnerMini /> : "LOG IN"}
              </Button>
            </form>
          </FormProvider>
          <div className="mt-4 flex flex-col items-center justify-center text-sm">
            <h3 className="dark:text-gray-300">
              Account creation is available only within the app.
            </h3>
          </div>
          <LoginFooter />
        </div>
      </div>
    </div>
  );
};
