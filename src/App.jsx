import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import './index.css'
import { Auth, Home, Navbar, Logout, Settings, CreateArticle, Article, } from "./pages";
import Profile from "./pages/Profile";
import Test from "./pages/Test";
import Chat from "./pages/Chat";
import UserProfile from "./pages/UserProfile";


const App = () => {

  return (
    <Router>
      <div className="">
        <header><Navbar /></header>
        
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Auth />} />
              <Route path="/login" element={<Auth />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/create" element={<CreateArticle />} />
              <Route path="/article/:slug" element={<Article />} />
              <Route path="/profile/:username" element={<Profile />} />
              <Route path="/@:username" element={<Profile />} />
              <Route path="/test" element={<Test />} />
              <Route path="/chat" element={<Chat />} />
              <Route path='/user/:id' element={<UserProfile/>}/>
              <Route path="*" element={<h1>404 not found</h1>} />
            </Routes>
          </main>
        
      </div>
    </Router>
  );
};

export default App;
