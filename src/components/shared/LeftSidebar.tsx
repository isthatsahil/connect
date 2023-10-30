import { sidebarLinks } from "@/constants";
import { useUserAuthContext } from "@/contexts/AuthContext";
import { useSignOutAccountMutation } from "@/lib/query/mutations";
import { useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

const LeftSidebar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { mutate: handleSignOut, isSuccess } = useSignOutAccountMutation();
  const { user } = useUserAuthContext();

  useEffect(() => {
    isSuccess && navigate(0);
  }, [isSuccess]);

  return (
    <nav className="leftsidebar">
      <div className="flex flex-col gap-11">
        <NavLink to="/" className="flex gap-3 items-center">
          <img
            src="/assets/images/logo.svg"
            alt="logo"
            width={130}
            height={36}
          />
        </NavLink>
        <NavLink
          to={`/profile/${user?.id}`}
          className="flex items-center gap-3"
        >
          <img
            src={
              user.imageUrl.toString() ||
              "/assets/icons/profile-placeholder.svg"
            }
            alt="profile"
            className="h-14 w-14 rounded-full"
          />
          <div className="flex flex-col">
            <p className="body-bold">{user?.name}</p>
            <p className="small-regular text-light-3">@{user?.username}</p>
          </div>
        </NavLink>
        <ul className="flex flex-col gap-6">
          {sidebarLinks?.map((link) => {
            const isActive = pathname === link?.route;
            return (
              <li
                key={link?.label}
                className={`leftsidebar-link group ${
                  isActive && "bg-primary-500"
                }`}
              >
                <NavLink
                  to={link?.route}
                  className="flex items-center gap-4 p-4"
                >
                  <img
                    src={link?.imgURL}
                    alt={link?.label}
                    className={`group-hover:invert-white  ${
                      isActive && "invert-white"
                    }`}
                  />
                  {link?.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
      <Button
        variant="ghost"
        className="shad-button_ghost"
        onClick={() => handleSignOut()}
      >
        <img src="/assets/icons/logout.svg" alt="logout" />
        <p className="small-medium lg:base-medium">Logout</p>
      </Button>
    </nav>
  );
};

export default LeftSidebar;
