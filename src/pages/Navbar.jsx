import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks";
const Navbar = () => {
  const { isAuth, authUser } = useAuth();
  console.log(authUser.name);
  return (
    <div className="mt-4">
      <div className=" flex justify-evenly ">
        <div className="font-medium text-green-600 text-2xl">
          <Link to={"/"}>Blogging App</Link>
        </div>

        <div className="flex">
          <div className="font-medium text-green-600 text-2xl mx-4">
            <Link to={"/"}>Home</Link>
          </div>
          {!isAuth && (
            <>
              <div className="font-medium text-green-600 text-2xl mx-4">
                <Link to={"/register"}>Sign up</Link>
              </div>
              <div className="font-medium text-green-600 text-2xl mx-4">
                <Link to={"/login"}>Sign in</Link>
              </div>
            </>
          )}
          {isAuth && (
            <>
              <div className="font-medium text-green-600 text-2xl mx-4">
                <Link to={"/editor"}>New Post</Link>
              </div>
              <div className="font-medium text-green-600 text-2xl mx-4">
                <Link to={"/settings"}>Settings</Link>
              </div>
              <div className="font-medium text-green-600 text-2xl mx-4">
                <Link to={"/logout"}>Logout</Link>
              </div>
              <div className="font-medium text-green-600 text-2xl mx-4">
                <Link to={`/@${authUser?.name}`}>{authUser?.name}</Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
