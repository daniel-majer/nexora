import React from "react";
import { Heading } from "../ui/Heading";
import { Input } from "../ui/Input";
import {
  FormProvider,
  useForm,
  type FieldErrors,
  type UseFormReturn,
} from "react-hook-form";
import { Button } from "../ui/Button";
import pug from "../assets/pug2.png";
import { useCreateUser } from "../features/login/useCreateUser";
import toast from "react-hot-toast";

type UserForm = {
  fullname: string;
  email: string;
  password: string;
  repeatpassword: string;
};

export const Users = () => {
  const { mutate, isPending } = useCreateUser();
  const methods: UseFormReturn<UserForm> = useForm<UserForm>({
    mode: "onChange",
  });

  const { handleSubmit, getValues, reset } = methods;

  function onSubmit(formData: UserForm) {
    console.log(formData);
    const data = {
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          fullName: formData.fullname,
          avatar: "",
        },
      },
    };
    mutate(data, {
      onSuccess: () => {
        toast.success("User created successfully!");
        reset();
      },
    });
  }

  function onError(err: FieldErrors) {
    console.log("validation errors", err);
  }

  return (
    <div>
      <Heading level="h1">Create new user</Heading>
      <Heading
        level="h3"
        className="mt-2 mb-6 font-extralight text-zinc-500 transition duration-500 dark:text-zinc-300"
      >
        Fill out the form below to create a new user account. Enter the required
        details and submit to add a user to the system.
      </Heading>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr]">
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit, onError)}
            className="mt-2 flex w-full flex-col gap-2 rounded-xl py-4 font-medium sm:gap-4"
          >
            <div className="flex items-center justify-between">
              <Input
                name="fullname"
                label="Full name"
                validation={{ required: "This field is required" }}
              />
            </div>

            <div className="flex items-center">
              <Input
                name="email"
                label="Email address"
                validation={{
                  required: "This field is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Incorrect email format.",
                  },
                }}
              />
            </div>

            <div className="flex items-center justify-between">
              <Input
                type="password"
                name="password"
                label="Password (min. 8 characters)"
                validation={{
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                  required: "This field is required.",
                }}
              />
            </div>

            <div className="flex items-center">
              <Input
                type="password"
                name="repeatpassword"
                label="Repeat password"
                validation={{
                  validate: (value: string) =>
                    value === getValues("password") || "Passwords do not match",
                }}
              />
            </div>

            <div className="ml-auto flex flex-nowrap space-x-4">
              <Button variant="secondary" size="md" type="reset">
                Reset form
              </Button>
              <Button size="md" disabled={isPending}>
                Create user
              </Button>
            </div>
          </form>
        </FormProvider>
        <img className="" src={pug} alt="Mike the Pug" />
      </div>
    </div>
  );
};
