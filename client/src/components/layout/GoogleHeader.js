import React from "react";
import { Link } from "react-router-dom";
import { Nav, NavDropdown } from "react-bootstrap";
import * as S from "../../styles/Styles";
import Avatar from "../../styles/images/avatar.png";
import { useSelector, useDispatch } from "react-redux";
import {
  saveToken,
  saveGoogleImg,
  setGoogleAuth,
} from "../../redux/actions/baseActions";

export default function GoogleHeader() {
  const profileImage = useSelector((state) => state.profileImage);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(saveToken({ token: "", firstName: "", lastName: "" }));
    dispatch(saveGoogleImg(""));
    dispatch(setGoogleAuth(false));
  };

  return (
    <>
      <Nav.Link as={Link} to="/">
        Home
      </Nav.Link>
      <Nav.Link as={Link} to="/search">
        Search
      </Nav.Link>
      <NavDropdown
        eventkey={1} //Causing Error in Console//
        title={
          <div className="pull-left">
            <S.RoundImage
              className="thumbnail-image"
              src={profileImage || Avatar}
              alt="user pic"
              height="50px"
            />
          </div>
        }
        id="basic-nav-dropdown"
      >
        <NavDropdown.Item href="/personal">My Books</NavDropdown.Item>
        <NavDropdown.Item href="/friends">My Friends</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="/account">My Account</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.4" onClick={handleLogout}>
          Logout
        </NavDropdown.Item>
      </NavDropdown>
    </>
  );
}
