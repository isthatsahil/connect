import * as z from "zod";

export const signUpValidationFormSchema = z.object({
  name: z.string().min(2, { message: "Name is too short!" }),
  /**
   * TODO :: using zod's refine make async api call to validate if username is already taken
   */
  username: z
    .string()
    .min(4, { message: "Username must be atleast 4 character long" }),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must consists of 8 character or more" }),
});

type SignupFormSchemaDefaultType = {
  name: string;
  username: string;
  email: string;
  password: string;
};
export const signUpValidationFormSchemaDefaultValues: SignupFormSchemaDefaultType =
  {
    name: "",
    username: "",
    email: "",
    password: "",
  };

export const signinValidationFormSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must consists of 8 character or more" }),
});

type SigninFormSchemaDefaultType = {
  email: string;
  password: string;
};
export const signinValidationFormSchemaDefaultValues: SigninFormSchemaDefaultType =
  {
    email: "",
    password: "",
  };
