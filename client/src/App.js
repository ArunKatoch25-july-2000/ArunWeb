import React from "react";
import Navbar from "./components/Navbar";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Errorpage from "./components/Errorpage";
import Logout from "./components/Logout";

const App = () => {
  return (
    <>
      <Navbar />
    <Routes>
      <Route exact path="/" element={<Home/>}/>
      <Route exact path="/about" element={<About/>}/>
      <Route exact path="/contact" element={<Contact/>}/>
      <Route exact path="/signup" element={<Signup/>}/>
      <Route exact path="/login" element={<Login/>}/>
      <Route exact path="/logout" element={<Logout/>}/>
      <Route exact path="*" element={<Errorpage/>}/>
    </Routes>
    </>
  );
};

export default App;
