import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { NavLink, useHistory } from "react-router-dom";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const history = useHistory();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push("/");
    closeMenu();
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : "-hidden");

  return (
    <>
      <button className="menuButton" onClick={openMenu}>
        {/* <div> */}
        <i className="fa-solid fa-bars" style={{ color: "#000000" }}></i>
        {/* </div> */}
        <i className="fas fa-user-circle" />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
          <p className="user-info">
            <li>
              Hello {user.firstName}!
            </li>
            <li>{user.email}</li>
          </p>
            <li className="manage-spots">
              <NavLink exact to="/spots/current">
                Manage Homes
              </NavLink>
            </li>
            <li className="manage-spots">
              <NavLink exact to="/bookings/current">
                Manage Bookings
              </NavLink>
            </li>
            <li className="logout">
              <button onClick={logout}>Log Out</button>
            </li>
          </>
        ) : (
          <div className='login-signup'>
            <OpenModalMenuItem
              itemText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />
            <OpenModalMenuItem
              itemText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </div>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
