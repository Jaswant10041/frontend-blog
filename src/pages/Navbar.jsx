import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks";
import axios from "axios";
import { CiSearch } from "react-icons/ci";
import useStore from "../hooks/useStore";
import { IoMenu } from "react-icons/io5";
import { VscChromeClose } from "react-icons/vsc";
const Navbar = () => {
  const { isAuth, authUser, logout } = useAuth();
  // console.log(authUser)
  const [searchKeyword, setSearchKeyword] = useState('');
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userName, setUserName] = useState('');

  const setFilterPosts=useStore((state)=>state.setFilterPosts);

  const posts=useStore((state)=>state.posts);
  const setPosts=useStore((state)=>state.setPosts);
  const getPostsData=async()=>{
      try {
        const response = await axios.get(
          "http://localhost:3000/api/articles/posts"
        );

        console.log(response?.data);
        setPosts(response?.data);
      } catch (err) {
        console.log(err);
        return err;
      }
  }
  // console.log(setFilterPosts)
  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchKeyword.trim() === "") {
      setFilterPosts(posts); // Reset to original posts if search is empty
      return;
    }
    
    try {
      const response = await axios.get(`http://localhost:3000/api/articles/search/${searchKeyword}`);
      if (response?.data?.posts) {
        setFilterPosts(response.data.posts);
      } else {
        setFilterPosts([]); // Show empty state if no results
      }
    } catch (error) {
      console.error('Search error:', error);
      setFilterPosts([]); // Show empty state on error
    }
  }
  const handleHomeClick=()=>{
    setFilterPosts(posts);
    setIsMobileMenuOpen(false);
  }
  const handleLogout = () => {
    logout();
    navigate("/login");
    setIsMobileMenuOpen(false); // Close menu after logout
  };
  useEffect(() => {
    authUser.then((userDetails) => {
      // console.log(userDetails);
      setUserName(userDetails.name);
    })
      .catch((err) => {
        console.log(err);
      })
    getPostsData();
  }, [])
  return (
    <nav className="pt-2 bg-white shadow-md fixed top-0 w-full z-30">
      <div className=" px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between pb-3 items-center">
          {/* Left: Logo */}
          <div className="flex items-center">
            <Link
              to="/"
              className="text-green-500 font-bold text-xl md:text-3xl hover:text-green-400 transition-colors"
              onClick={handleHomeClick}
            >
              ConceptHub
            </Link>
          </div>
          <form onSubmit={handleSearch} className="flex">
            <input 
              type="text" 
              placeholder="Search..." 
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="border border-black w-32 sm:w-40 md:w-64 rounded-l-lg px-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" 
            />
            <button 
              type="submit"
              className="text-black border border-black px-2 rounded-r-lg transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <CiSearch size={25} />
            </button>
          </form>

          <div className="hidden md:hidden lg:block md:ml-6 md:flex md:items-center md:space-x-6">
            <Link
              to="/"
              className="text-black border border-green-600 px-2 py-0.5 pb-1 rounded-3xl text-md font-medium hover:bg-green-500 hover:text-white  transition-colors"
            >
              Home
            </Link>

            {!isAuth ? (
              <>
                
                <Link
                  to="/login"
                  className="text-black border border-green-600 px-2 py-0.5 pb-1 rounded-2xl text-md font-medium hover:bg-green-500 hover:text-white transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="text-black border border-green-600 px-2 py-0.5 pb-1 rounded-2xl text-md font-medium hover:bg-green-500 hover:text-white transition-colors"
                >
                 Sign Up
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/create"
                  className="text-black border border-green-600 px-2 py-0.5 pb-1 rounded-3xl text-md font-medium hover:bg-green-500 hover:text-white  transition-colors"
                >
                  Create
                </Link>
                <Link
                  to="/settings"
                  className="text-black border border-green-600 px-2 py-0.5 pb-1 rounded-3xl text-md font-medium hover:bg-green-500 hover:text-white  transition-colors"
                >
                  Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-black border border-green-600 px-2 py-0.5 pb-1 rounded-3xl text-md font-medium hover:bg-green-500 hover:text-white  transition-colors"
                >
                  Logout
                </button>
                <Link
                  to={`/@${userName}`}
                  className="text-black border border-green-600 px-2 py-0.5 pb-1 rounded-3xl text-md font-medium hover:bg-green-500 hover:text-white  transition-colors"
                >
                  <span className="font-medium">{userName}</span>
                  {/* {authUser?.avatar && (
                    <img
                      src={authUser.avatar}
                      alt={authUser.name}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                  )} */}
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-green-700 hover:text-green-900 focus:outline-none transition-colors"
              
            >
              {isMobileMenuOpen ? ( <VscChromeClose size={22}/>) : (<IoMenu size={25}/>)}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`lg:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`} id="mobile-menu">
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
                to="/create"
                className="block px-3 py-2 rounded-md text-base font-medium text-green-700 hover:text-green-900 hover:bg-green-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Create a Post
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