import React, { useEffect, useState } from "react";
import "../assets/css/header.css";
import logo from "../assets/img/Netflix_Logo.png";

function Header() {
  const [show, handleShow] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else handleShow(false);
    });
    return () => {
      window.removeEventListener("scroll");
    };
  }, []);

  return (
    <div className={`header ${show && "active"}`}>
      <div className="container">
        <div className="navbar">
          <div className="logo">
            <img src={logo} alt="" />
          </div>
          <div className="login_btn">Login</div>
        </div>
      </div>
    </div>
  );
}

export default Header;
