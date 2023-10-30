import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  signUpValidationFormSchema,
  signUpValidationFormSchemaDefaultValues,
} from "@/lib/validation";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  useCreateUserAccountMutation,
  useSignInAccountMutation,
} from "@/lib/query/mutations";
import { useUserAuthContext } from "@/contexts/AuthContext";

const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
  const { checkAuthUser, isLoading: isUserLoading } = useUserAuthContext();
  const navigate = useNavigate();
  const { mutateAsync: createUserAccount, isPending: isCreatingUser } =
    useCreateUserAccountMutation();
  const { mutateAsync: signInAccount, isPending: isSigningIn } =
    useSignInAccountMutation();

  const form = useForm<z.infer<typeof signUpValidationFormSchema>>({
    resolver: zodResolver(signUpValidationFormSchema),
    defaultValues: signUpValidationFormSchemaDefaultValues,
  });

  async function onSubmit(values: z.infer<typeof signUpValidationFormSchema>) {
    const response = await createUserAccount(values);
    if (response instanceof Error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem while creating user.",
      });
    }
    const session = await signInAccount({
      email: values.email,
      password: values.password,
    });
    if (session instanceof Error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Sign up failed. Please try again!",
      });
    }
    const isLoggedIn = await checkAuthUser();
    if (isLoggedIn) {
      form.reset();
      navigate("/");
    } else {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Sign up failed. Please try again!",
      });
    }
  }

  const togglePasswordView = (): void => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <>
      <Form {...form}>
        <div className="sm:w-420 flex-center flex-col">
          <img src="/assets/images/logo.svg" alt="logo" />
          <h2 className="text-xl md:text-2xl pt-5 sm:pt-12">
            Create a new account
          </h2>
          <p className="text-light-3 small-medium md:base-regular mt-2">
            Be a member and <i>connect.</i>
          </p>

          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-5 w-full mt-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Full Name"
                      type="text"
                      className="shad-input"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Username"
                      type="text"
                      className="shad-input"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Email"
                      type="email"
                      className="shad-input"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red" />
                </FormItem>
              )}
            />
            <div className="flex relative items-center">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="flex-grow">
                    <FormControl>
                      <Input
                        placeholder="Password"
                        type={showPassword ? "text" : "password"}
                        className="shad-input flex-grow"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage className="text-red" />
                  </FormItem>
                )}
              />
              <div
                className="absolute right-3 cursor-pointer text-sm"
                onClick={togglePasswordView}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </div>
            </div>

            <Button type="submit" className="shad-button_primary">
              {isCreatingUser ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Sign up!"
              )}
            </Button>
            <p className="text-small-regular text-light-3 text-center mt-2">
              Already have an account ?
              <NavLink
                to="/sign-in"
                className="text-primary-500 text-sm font-semibold ml-1"
              >
                Log in
              </NavLink>
            </p>
          </form>
        </div>
      </Form>
    </>
  );
};

export default SignupForm;
