import React from "react";
import toast from "react-hot-toast";
import { SUPABASE_URL } from "../../types/constants";
import { removeDiacritics } from "../../utils/helper";
import { useQueryClient } from "@tanstack/react-query";
import { useUpdateData } from "./useUpdateData";
import { FormProvider, useForm, type UseFormReturn } from "react-hook-form";
import { useUser } from "./useUser";
import { FileUpload } from "../../ui/InputFile";
import { Button } from "../../ui/Button";
import { Input } from "../../ui/Input";
import { Heading } from "../../ui/Heading";
type UserForm = {
  fullname: string;
  email: string;
  avatar: FileList;
};

export const UpdateDataForm = () => {
  const [successBanner, setSuccessBanner] = React.useState(false);
  const { user } = useUser();
  const { mutate: updateData, isPending } = useUpdateData();
  const queryClient = useQueryClient();
  const methodsUserData: UseFormReturn<UserForm> = useForm<UserForm>({
    mode: "onChange",
    defaultValues: {
      fullname: user?.user_metadata.fullName,
      email: user?.email,
    },
  });
  const { handleSubmit } = methodsUserData;
  function handleDataSubmit(formData: UserForm) {
    const isImg = formData.avatar[0]?.name;
    const imgName = `${Math.random()}-${removeDiacritics(formData.avatar[0]?.name)}`;
    const imgPath = isImg
      ? `${SUPABASE_URL}/avatars/${imgName}`
      : user?.user_metadata.avatar;

    const data = {
      email: formData.email,
      data: {
        fullName: formData.fullname,
        avatar: imgPath,
      },
    };

    updateData(
      { formData: data, imgFile: formData.avatar, imgName },
      {
        onSuccess: (data) => {
          if (data?.user.new_email) setSuccessBanner(true);

          queryClient.invalidateQueries({ queryKey: ["user"] });
          toast.success("User updated successfully!");
        },
        onError: (e) => {
          toast.error(e.message);
        },
      },
    );
  }
  return (
    <FormProvider {...methodsUserData}>
      {successBanner ? (
        <div className="mb-6 flex items-center rounded-lg bg-green-100 p-4 font-medium text-green-800 transition duration-500 dark:bg-green-800/20 dark:text-green-300">
          <span>
            ✅ Your changes were successful! Please check your new email address
            and confirm it using the link we sent you.
          </span>
        </div>
      ) : (
        <div className="mb-6 rounded-lg bg-yellow-100 p-4 font-medium text-yellow-800 transition duration-500 dark:bg-yellow-800/20 dark:text-yellow-300">
          ⚠️ After changing your email, you will need to confirm it via a link
          sent to your new email address.
        </div>
      )}
      <div className="rounded-xl bg-zinc-50 p-6 transition duration-500 dark:bg-zinc-900">
        <Heading level="h2">Update user data</Heading>

        <form
          onSubmit={handleSubmit(handleDataSubmit)}
          className="space-y-6 rounded-xl pt-6 font-medium"
        >
          <Input
            className="bg-white"
            name="fullname"
            label="Full name"
            validation={{
              required: "This field is required",
            }}
          />
          <Input
            className="bg-white"
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
          <FileUpload name="avatar" label="Avatar" />

          <div className="ml-auto w-fit space-x-4">
            <Button variant="secondary" type="reset">
              Reset form
            </Button>
            <Button disabled={isPending}>Update user</Button>
          </div>
        </form>
      </div>
    </FormProvider>
  );
};
