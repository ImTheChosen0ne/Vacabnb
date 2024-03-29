import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      {/* <div> */}
      {/* <div className="about"> */}
      <h3>
        <i className="fa-regular fa-copyright"></i>2023 Vacabnb inspired by
        Airbnb
      </h3>
      {/* </div> */}
      <div className="footer-links">
        <p>Matthew Almeida</p>
        <a href="https://github.com/ImTheChosen0ne/API-project">
          <i className="fa-brands fa-github"></i>
        </a>
        <a href="https://www.linkedin.com/in/matthew-almeida-103425183/">
          <i className="fa-brands fa-linkedin"></i>
        </a>
      </div>
      {/* </div> */}
      {/* <div> */}
      <div>
        {/* <div> */}
        <div className="made-with">
          Made with:
          {/* <div className="madeIcons"> */}
          <i className="fa-brands fa-react"></i>
          <i className="fa-brands fa-html5"></i>
          <i className="fa-brands fa-css3-alt"></i>
          <i className="fa-brands fa-square-js"></i>
          {/* <i className="fa-brands fa-python"></i> */}
        </div>
        {/* </div> */}
        {/* </div> */}
      </div>
      {/* </div> */}
    </div>
  );
};

export default Footer;
