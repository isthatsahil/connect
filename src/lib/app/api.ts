import { INewUser, ISaveUser, ISignInAccount } from "@/types";
import { ID, Query } from "appwrite";
import { account, appwriteConfig, avatars, databases } from "./config";

export async function createUserAccount(user: INewUser) {
  try {
    const newAccount = await account.create(
      ID?.unique(),
      user.email,
      user.password,
      user.name
    );

    if (!newAccount) throw new Error("Error while creating user ");

    const avatarUrl = avatars.getInitials(user.name);

    const newUser = await saveUserToDB({
      accountId: newAccount?.$id,
      name: newAccount?.name,
      email: newAccount?.email,
      username: user?.username,
      imageUrl: avatarUrl,
    });
    return newUser;
  } catch (error) {
    throw new Error(`Error while creating user, ${error}`);
  }
}

export async function saveUserToDB(user: ISaveUser) {
  try {
    const registeredUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionsId,
      ID.unique(),
      user
    );
    return registeredUser;
  } catch (error) {
    throw new Error(`${error}`);
  }
}

export async function signInAccount(user: ISignInAccount) {
  try {
    const session = await account.createEmailSession(user.email, user.password);
    return session;
  } catch (error) {
    throw new Error(`${error}`);
  }
}

export async function getCurrentUser() {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionsId,
      [Query.equal("accountId", currentAccount?.$id)]
    );
    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    throw new Error(`${error}`);
  }
}

export async function signOutAccount() {
  try {
    const session = await account.deleteSession("current");
    return session;
  } catch (error) {
    throw new Error(`${error}`);
  }
}
