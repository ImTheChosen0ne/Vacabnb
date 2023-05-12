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
        <NavLink exact to="/" className="home">
          <i
            className="fa-brands fa-airbnb fa-rotate-180 fa-2xl"
            style={{ color: "#ff0000" }}
          ></i>
          acabnb
        </NavLink>
      </li>
      <div className="create-profile">
        <li className="new-spot">
          {sessionUser && (
            <NavLink exact to="/spots/new">
              Create a New Spot
            </NavLink>
          )}
        </li>
        {isLoaded && (
          <li className="profilebutton">
            <ProfileButton user={sessionUser} />
          </li>
        )}
      </div>
    </ul>
  );
}

export default Navigation;
