import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks";

const Navbar = () => {
  const { isAuth, authUser, logout } = useAuth();
  // console.log(authUser)
  
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userName,setUserName]=useState('');
  const handleLogout = () => {
    logout();
    navigate("/login");
    setIsMobileMenuOpen(false); // Close menu after logout
  };
  useEffect(()=>{
    authUser.then((userDetails)=>{
      console.log(userDetails);
      setUserName(userDetails.name);
    })
    .catch((err)=>{
      console.log(err);
    })

  },[])
  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left: Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link 
              to="/" 
              className="text-green-600 font-bold text-2xl md:text-3xl hover:text-green-700 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              BlogVerse
            </Link>
          </div>

          
          <div className="hidden md:ml-6 md:flex md:items-center md:space-x-6">
            <Link 
              to="/" 
              className="bg-green-600 text-white px-4 py-2 rounded-md text-lg font-medium hover:bg-green-700 transition-colors"
            >
              Home
            </Link>

            {!isAuth ? (
              <>
                <Link 
                  to="/register" 
                  className="bg-green-600 text-white px-4 py-2 rounded-md text-lg font-medium hover:bg-green-700 transition-colors"
                >
                  Sign Up
                </Link>
                <Link 
                  to="/login" 
                  className="bg-green-600 text-white px-4 py-2 rounded-md text-lg font-medium hover:bg-green-700 transition-colors"
                >
                  Sign In
                </Link>
              </>
            ) : (
              <>
                <Link 
                  to="/editor" 
                  className="bg-green-600 text-white px-4 py-2 rounded-md text-lg font-medium hover:bg-green-700 transition-colors"
                >
                  New Post
                </Link>
                <Link 
                  to="/settings" 
                  className="bg-green-600 text-white px-4 py-2 rounded-md text-lg font-medium hover:bg-green-700 transition-colors"
                >
                  Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-green-600 text-white px-4 py-2 rounded-md text-lg font-medium hover:bg-green-700 transition-colors"
                >
                  Logout
                </button>
                <Link
                  to={`/@${userName}`}
                  className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-md text-lg font-medium hover:bg-green-700 transition-colors"
                >
                  <span className="font-medium">{userName}</span>
                  {authUser?.avatar && (
                    <img 
                      src={authUser.avatar} 
                      alt={authUser.name} 
                      className="h-8 w-8 rounded-full object-cover"
                    />
                  )}
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 flex items-center md:hidden">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-green-700 hover:text-green-900 hover:bg-green-100 focus:outline-none transition-colors"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`} id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            to="/"
            className="block px-3 py-2 rounded-md text-base font-medium text-green-700 hover:text-green-900 hover:bg-green-50"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>

          {!isAuth ? (
            <>
              <Link
                to="/register"
                className="block px-3 py-2 rounded-md text-base font-medium text-green-700 hover:text-green-900 hover:bg-green-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign Up
              </Link>
              <Link
                to="/login"
                className="block px-3 py-2 rounded-md text-base font-medium text-green-700 hover:text-green-900 hover:bg-green-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign In
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/editor"
                className="block px-3 py-2 rounded-md text-base font-medium text-green-700 hover:text-green-900 hover:bg-green-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                New Post
              </Link>
              <Link
                to="/settings"
                className="block px-3 py-2 rounded-md text-base font-medium text-green-700 hover:text-green-900 hover:bg-green-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Settings
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-green-700 hover:text-green-900 hover:bg-green-50"
              >
                Logout
              </button>
              <Link
                to={`/@${userName}`}
                className="block px-3 py-2 rounded-md text-base font-medium text-green-800 bg-green-100 hover:bg-green-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {userName}
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;