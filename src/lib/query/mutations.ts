import { useMutation } from "@tanstack/react-query";
import { createUserAccount, signInAccount, signOutAccount } from "../app/api";
import { INewUser, ISignInAccount } from "@/types";

export const useCreateUserAccountMutation = () => {
  return useMutation({
    mutationFn: (user: INewUser) => createUserAccount(user),
  });
};

export const useSignInAccountMutation = () => {
  return useMutation({
    mutationFn: (user: ISignInAccount) => signInAccount(user),
  });
};

export const useSignOutAccountMutation = () => {
  return useMutation({
    mutationFn: signOutAccount,
  });
};
