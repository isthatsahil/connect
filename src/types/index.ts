export type INewUser = {
  name: string;
  email: string;
  username: string;
  password: string;
};

export type IUser = {
  id?: string;
  name: string;
  email: string;
  username?: string;
  imageUrl: URL | string;
  bio?: string;
};

export type ISaveUser = {
  accountId: string;
  name: string;
  email: string;
  username?: string;
  imageUrl: URL;
};
export type ISignInAccount = {
  email: string;
  password: string;
};

export type IAuthContextType = {
  user: IUser;
  isLoading: boolean;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  checkAuthUser: () => Promise<boolean>;
};

export type IChildrenNodeType = {
  children: React.ReactNode;
};
