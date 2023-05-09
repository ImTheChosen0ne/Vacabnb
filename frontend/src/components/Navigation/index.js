import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <ul className="wrapper">
      <li>
        <NavLink exact to="/" className='home'>
          {" "}
          <i
            className="fa-brands fa-airbnb fa-rotate-180 fa-2xl"
            style={{ color: "#ff0000" }}
          ></i>
          acabnb
        </NavLink>
      </li>
      <li>
        {sessionUser && (
        <NavLink exact to="/spots/new">
          Create a New Spot
        </NavLink>
        )}
      </li>
      {isLoaded && (
        <li>
          <ProfileButton user={sessionUser} />
        </li>
      )}
    </ul>
  );
}

export default Navigation;
