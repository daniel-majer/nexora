import { FormProvider, useForm, type FieldErrors } from "react-hook-form";
import toast from "react-hot-toast";
import { Button } from "../../ui/Button";
import { Heading } from "../../ui/Heading";
import { Input } from "../../ui/Input";
import { useUpdateData } from "./useUpdateData";

type PasswordForm = {
  password: string;
  confirmpassword: string;
};

export const UpdatePasswordForm = () => {
  const { mutate: updateData, isPending } = useUpdateData();
  const methodsPassword = useForm<PasswordForm>({
    mode: "onChange",
  });
  const { handleSubmit: handlePassSubmit, getValues, reset } = methodsPassword;

  function handlePasswordSubmit(formData: PasswordForm) {
    const data = {
      password: formData.password,
    };
    updateData(
      { formData: data },
      {
        onSuccess: () => {
          toast.success("Password changed successfully!");
          reset();
        },
      },
    );
  }

  function onError(err: FieldErrors) {
    console.log("validation errors", err);
  }
  return (
    <FormProvider {...methodsPassword}>
      <div className="rounded-xl bg-zinc-50 p-6">
        <Heading level="h2">Update password</Heading>
        <form
          onSubmit={handlePassSubmit(handlePasswordSubmit, onError)}
          className="space-y-6 rounded-xl pt-6 font-medium"
        >
          <Input
            type="password"
            placeholder="Password"
            className="bg-white"
            name="password"
            label="Password"
            validation={{
              required: "This field is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            }}
          />

          <Input
            type="password"
            placeholder="Confirm password"
            className="bg-white"
            name="confirmpassword"
            label="Confirm password"
            validation={{
              required: "This field is required",
              validate: (value: string) =>
                value === getValues("password") || "Password do not match",
            }}
          />

          <div className="ml-auto w-fit space-x-4">
            <Button variant="secondary" type="reset">
              Reset form
            </Button>
            <Button disabled={isPending}>Change password</Button>
          </div>
        </form>
      </div>
    </FormProvider>
  );
};
