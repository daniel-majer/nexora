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
import { useCreateUser } from "../features/signup/useCreateUser";
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
      <Heading level="h3" className="mt-2 font-extralight text-zinc-500">
        Fill in the details below to create a new user account.
      </Heading>

      <div className="flex flex-col md:flex md:flex-row md:items-start">
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit, onError)}
            className="mt-2 flex w-full flex-col gap-8 rounded-xl px-10 py-8 font-medium md:w-1/2"
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

            <div className="ml-auto space-x-4">
              <Button variant="secondary" type="reset">
                Reset form
              </Button>
              <Button disabled={isPending}>Create user</Button>
            </div>
          </form>
        </FormProvider>
        <img className="md:w-1/2" src={pug} alt="Mike the Pug" />
      </div>
    </div>
  );
};
