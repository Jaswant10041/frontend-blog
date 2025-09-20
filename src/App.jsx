import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import './index.css'
import { Auth, Home, Navbar, Logout, Settings, CreateArticle, Article, } from "./pages";
import Profile from "./pages/Profile";


const App = () => {

  return (
    <Router>
      <div className="m-2">
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
              <Route path="*" element={<h1>404 not found</h1>} />
            </Routes>
          </main>
        
      </div>
    </Router>
  );
};

export default App;
