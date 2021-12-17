import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";


const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true")
  }, []);
  return (
    <>
      <nav className="navbar">
        <Link to="/">
          <h1>Movie Critic</h1>
        </Link>

        <div className="links" style={{overflow: "hidden"}}>
        {isLoggedIn ?(
          <Link to="/login">Account</Link>
        ):(<Link to="/login">Login</Link>)}
        </div>
      </nav>
      
    </>
  );
};

export default Navbar;
