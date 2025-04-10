import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import './index.css'
import { Auth, Home, Navbar,Logout,Settings, CreateArticle, Article,  } from "./pages";


const App = () => {
  
  return (
    <Router>
      <div className="m-3">
        <header><Navbar/></header>
        <main>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/register" element={<Auth />}>
              <Route path="/register" element={<h1>Register</h1>} />
            </Route>
            <Route path="/login" element={<Auth />}>
            </Route>
            <Route path="/logout" element={<Logout/>}></Route>
            <Route path="/settings" element={<Settings/>} />
            <Route path="/editor" element={<CreateArticle/>} />
            <Route path="/editor/:id" element={<h1>Editor page</h1>} />
            <Route path="/article/:slug" element={<Article/>} />
            <Route path="/profile/:username" element={<h1>Profile page</h1>} />
            <Route path="/@:username" element={<h1>Profile page</h1>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
