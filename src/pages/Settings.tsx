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
import { useUser } from "../features/login/useUser";
import { FileUpload } from "../ui/InputFile";

type UserForm = {
  fullname: string;
  email: string;
  password: string;
  repeatpassword: string;
};

export const Settings = () => {
  const { user } = useUser();
  const { mutate, isPending } = useCreateUser();
  const methods: UseFormReturn<UserForm> = useForm<UserForm>({
    mode: "onChange",
  });

  console.log(user);

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
      <div className="border-b border-b-zinc-200 pb-8">
        <Heading level="h1">Settings</Heading>
        <Heading level="h3" className="mt-2 font-extralight text-zinc-500">
          Fill in the details below to create a new user account.
        </Heading>
      </div>

      <div className="m-auto mt-10 max-w-[768px] space-y-16 divide-y divide-zinc-200">
        <FormProvider {...methods}>
          <div className="rounded-xl bg-zinc-50 p-6">
            <Heading level="h2">Update user data</Heading>

            <form
              onSubmit={handleSubmit(onSubmit, onError)}
              className="space-y-6 rounded-xl pt-6 font-medium"
            >
              <Input
                className="bg-white"
                name="fullname"
                label="Full name"
                validation={{ required: "This field is required" }}
              />

              <Input
                className="bg-white"
                name="email"
                label="Email address"
                validation={{
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Incorrect email format.",
                  },
                }}
              />

              <FileUpload
                name="imageUrl"
                label="Avatar"
                validation={{ required: "Image is required" }}
              />

              <div className="ml-auto w-fit space-x-4">
                <Button variant="secondary" type="reset">
                  Reset form
                </Button>
                <Button disabled={isPending}>Create user</Button>
              </div>
            </form>
          </div>

          <div className="rounded-xl bg-zinc-50 p-6">
            <Heading level="h2">Update password</Heading>

            <form
              onSubmit={handleSubmit(onSubmit, onError)}
              className="space-y-6 rounded-xl pt-6 font-medium"
            >
              <Input
                className="bg-white"
                name="fullname"
                label="Full name"
                validation={{ required: "This field is required" }}
              />

              <Input
                className="bg-white"
                name="email"
                label="Email address"
                validation={{
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Incorrect email format.",
                  },
                }}
              />

              <div className="ml-auto w-fit space-x-4">
                <Button variant="secondary" type="reset">
                  Reset form
                </Button>
                <Button disabled={isPending}>Create user</Button>
              </div>
            </form>
          </div>
        </FormProvider>
      </div>
    </div>
  );
};
