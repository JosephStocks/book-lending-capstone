import React from "react";
import { Link } from "react-router-dom";
import { Nav, NavDropdown } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { saveToken, saveGoogleImg } from "../../redux/actions/baseActions";

export default function LocalHeader() {
  const dispatch = useDispatch();
  const loggedUser = useSelector(state => state.loggedUser)
  const handleLogout = () => {
    dispatch(saveToken({ token: "", firstName: "", lastName: "" }));
    dispatch(saveGoogleImg(""));
  };

  return (
    <>
      <Nav.Link as={Link} to="/search">
        Search
      </Nav.Link>
      <Nav.Link as={Link} to="/about">
      About The App
      </Nav.Link>

      <NavDropdown title={loggedUser.firstName?.charAt(0).toUpperCase() + loggedUser.firstName?.slice(1)} id="basic-nav-dropdown">
        <NavDropdown.Item href="/">My Dashboard</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4" onClick={handleLogout}>
          Logout
        </NavDropdown.Item>
      </NavDropdown>
    </>
  );
}
