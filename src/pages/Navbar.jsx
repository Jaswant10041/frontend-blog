import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks";
import axios from "axios";
import { CiSearch } from "react-icons/ci";
import useStore from "../hooks/useStore";
import { IoMenu } from "react-icons/io5";
import { VscChromeClose } from "react-icons/vsc";
import { useRef } from "react";
const Navbar = () => {

  const { isAuth, authUser, logout } = useAuth();
  const navigate = useNavigate();
  const timerVarRef=useRef(null);
  // console.log(authUser)

  const searchKeyword=useStore((state)=>state.searchKeyword);
  const setSearchKeyword=useStore((state)=>state.setSearchKeyword);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);

  const setFilterPosts=useStore((state)=>state.setFilterPosts);
  const setSuggestions=useStore((state)=>state.setSuggestions);

  const handleKeyDown = (e) => {
    const suggestions = useStore.getState().suggestions;
    
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedSuggestionIndex(prev => 
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedSuggestionIndex(prev => prev > -1 ? prev - 1 : -1);
    } else if (e.key === 'Enter' && selectedSuggestionIndex > -1) {
      e.preventDefault();
      const selectedSuggestion = suggestions[selectedSuggestionIndex];
      setSearchKeyword(selectedSuggestion.title);
      setFilterPosts([selectedSuggestion]);
      setSuggestions([]);
      setSelectedSuggestionIndex(-1);
    } else if (e.key === 'Escape') {
      setSuggestions([]);
      setSelectedSuggestionIndex(-1);
    }
  };

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
  const handleSuggestion = async (e) => {
    setSearchKeyword(e.target.value);
    // console.log(searchKeyword)
    
    if (searchKeyword.trim() === "") {
      setSuggestions([])
      setFilterPosts(posts); // Reset to original posts if search is empty
      return;
    }
    if(timerVarRef.current){
      clearTimeout(timerVarRef.current)
    }
    try { //debouncing
      //j
      //ja
      timerVarRef.current=setTimeout(async()=>{
          const response = await axios.get(`http://localhost:3000/api/articles/search/${searchKeyword}`);
          console.log(response);
          if (response?.data?.posts) {
            setSuggestions(response.data.posts);
          } else {
            setFilterPosts([]); // Show empty state if no results
          }
      },300);
    } catch (error) {
      console.error('Search error:', error);
      setFilterPosts([]); // Show empty state on error
    }
  }
  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchKeyword.trim() === "") {
      setSuggestions([])
      setFilterPosts(posts); // Reset to original posts if search is empty
      return;
    }
    
    try {
      const response = await axios.get(`http://localhost:3000/api/articles/search/${searchKeyword}`);
      console.log(response);
      if (response?.data?.posts) {
        setFilterPosts(response.data.posts);
        setSuggestions([])
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
    setSuggestions([])
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
          <div className="relative">
            <form onSubmit={handleSearch} className="flex">
              <input 
                type="text" 
                placeholder="Search..." 
                value={searchKeyword}
                onChange={handleSuggestion}
                onKeyDown={handleKeyDown}
                className="border border-black w-32 sm:w-40 md:w-64 rounded-l-lg px-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" 
              />
              <button 
                type="submit"
                className="text-black border border-black px-2 rounded-r-lg transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <CiSearch size={25} />
              </button>
            </form>

            {/* Suggestions Dropdown */}
            {searchKeyword && (
              <div className="absolute mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-200 max-h-80 overflow-y-auto z-50">
                {useStore.getState().suggestions.map((suggestion, index) => (
                  <div
                    key={suggestion._id}
                    className={`px-4 py-2 hover:bg-gray-100 cursor-pointer flex flex-col border-b border-gray-100 last:border-b-0 ${
                      index === selectedSuggestionIndex ? 'bg-gray-100' : ''
                    }`}
                    onClick={() => {
                      setSearchKeyword(suggestion.title);
                      setFilterPosts([suggestion]);
                      setSuggestions([]);
                    }}
                  >
                    <span className="font-medium text-gray-900">{suggestion.title}</span>
                    <span className="text-sm text-gray-500 truncate">
                      {suggestion.body?.substring(0, 60)}...
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

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