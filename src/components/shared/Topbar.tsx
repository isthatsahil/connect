import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useSignOutAccountMutation } from "@/lib/query/mutations";
import { useEffect } from "react";
import { useUserAuthContext } from "@/contexts/AuthContext";

const Topbar = () => {
  const navigate = useNavigate();
  const { mutate: handleSignOut, isSuccess } = useSignOutAccountMutation();
  const { user } = useUserAuthContext();

  useEffect(() => {
    isSuccess && navigate(0);
  }, [isSuccess]);

  return (
    <section className="topbar">
      <div className="flex-between py-4 px-5">
        <NavLink to="/" className="flex gap-3 items-center">
          <img
            src="/assets/images/logo.svg"
            alt="logo"
            width={130}
            height={325}
          />
        </NavLink>
        <div className="flex gap-4">
          <Button
            variant="ghost"
            className="shad-button_ghost"
            onClick={() => handleSignOut()}
          >
            <img src="/assets/icons/logout.svg" alt="logout" />
          </Button>
          <NavLink to={`/profile/${user?.id}`} className="flex-center gap-3 ">
            <img
              src={
                user.imageUrl.toString() ||
                "/assets/images/profile-placeholder.svg"
              }
              alt="profile"
              className="h-8 w-8 rounded-full"
            />
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default Topbar;
