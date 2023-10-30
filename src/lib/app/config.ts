import { Client, Account, Databases, Storage, Avatars } from "appwrite";

export const appwriteConfig = {
  projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
  url: import.meta.env.VITE_APPWRITE_URL,
  databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
  storageId: import.meta.env.VITE_APPWRITE_STORAGE_ID,
  usersCollectionsId: import.meta.env.VITE_APPWRITE_COLLECTIONS_USERS_ID,
  postsCollectionId: import.meta.env.VITE_APPWRITE_COLLECTIONS_POSTS_ID,
  savesCollectionId: import.meta.env.VITE_APPWRITE_COLLECTIONS_SAVES_ID,
};

export const client = new Client()
  .setEndpoint(appwriteConfig.url)
  .setProject(appwriteConfig.projectId);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);
