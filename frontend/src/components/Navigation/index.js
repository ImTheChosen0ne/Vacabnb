import React, {useState, useEffect, useRef} from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const spots = useSelector((state) => Object.values(state.spots.allSpots));

  const [searchValue, setSearchValue] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const searchRef = useRef(null);

  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    setShowDropdown(value.length > 0);
    performSearch(value);
  };

  const performSearch = (value) => {
    const filteredPosts = spots.filter((spot) =>
      spot.name.toLowerCase().includes(value.toLowerCase()) ||
      spot.state.toLowerCase().includes(value.toLowerCase())
    );

    const results = [...filteredPosts];
    setSearchResults(results);
  };

  const renderSearchResults = () => {
    let spotsList = null;
    const filteredSpots = searchResults.filter(
      (result) => result.name && result.id !== sessionUser?.id
    );

    if (filteredSpots.length > 0) {
      spotsList = (
        <div className="search-spots">
          <h4>Spots</h4>
          <ul>
            {filteredSpots.map((result) => (
              <li key={result.id}>
                <NavLink to={`/spots/${result.id}`} className="search-spot">
                  <p>{result.name}</p>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      );
    }

    return (
      <ul>
          <i className="fa-solid fa-magnifying-glass"></i>
          <p>{searchValue}</p>
        {spotsList}
      </ul>
    );
  };

  const handleClickOutside = (e) => {
    if (searchRef.current && !searchRef.current.contains(e.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

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
      <li className="nav-search">
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              placeholder="Search"
              value={searchValue}
              onChange={handleSearchInputChange}
              ref={searchRef}
            />
            <button type="submit">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>
          {showDropdown && (
            <ul className="dropdown">{renderSearchResults()}</ul>
          )}
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
