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
  signinValidationFormSchema,
  signinValidationFormSchemaDefaultValues,
} from "@/lib/validation";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useSignInAccountMutation } from "@/lib/query/mutations";
import { useUserAuthContext } from "@/contexts/AuthContext";

const SigninForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
  const { checkAuthUser, isLoading: isUserLoading } = useUserAuthContext();
  const navigate = useNavigate();
  const { mutateAsync: signInAccount } = useSignInAccountMutation();

  const form = useForm<z.infer<typeof signinValidationFormSchema>>({
    resolver: zodResolver(signinValidationFormSchema),
    defaultValues: signinValidationFormSchemaDefaultValues,
  });

  async function onSubmit(values: z.infer<typeof signinValidationFormSchema>) {
    try {
      const session = await signInAccount({
        email: values.email,
        password: values.password,
      });
      if (session instanceof Error) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "Sign in failed. Please try again!",
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
          description: "Sign in failed. Please try again!",
        });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: error.message.slice(error.message.indexOf(":") + 1),
        });
      }
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
          <p className="text-light-3 small-medium md:base-regular mt-2">
            Be a member and <i>connect.</i>
          </p>

          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-5 w-full mt-4"
          >
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
              {isUserLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Sign In"
              )}
            </Button>
            <p className="text-small-regular text-light-3 text-center mt-2">
              New user ?
              <NavLink
                to="/sign-up"
                className="text-primary-500 text-sm font-semibold ml-1"
              >
                Sign Up
              </NavLink>
            </p>
          </form>
        </div>
      </Form>
    </>
  );
};

export default SigninForm;
