import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, NavDropdown, Nav } from 'react-bootstrap';
import * as S from "../../styles/Styles";
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import Avatar from '../../styles/images/avatar.png'
import { useDispatch } from 'react-redux';
import { saveToken, saveGoogleImg } from '../../redux/actions/templateActions'

const Header = () => {
    const profileImage = useSelector(state => state.profileImage)
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(saveToken(''));
        dispatch(saveGoogleImg(''));
    }
    return (
        <>
            <Navbar bg="info" expand="lg" sticky="top">
                <Navbar.Brand as={Link} to="/"><S.Font><FontAwesomeIcon className="mr-1" icon={faBook} size="1x" color="black"/>ReadMe Book Swap<FontAwesomeIcon className="ml-1" icon={faBook} size="1x" color="black" flip={"horizontal"}/></S.Font></Navbar.Brand>
                <Navbar className="ml-auto" id="basic-navbar-nav">
                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                    <Nav.Link as={Link} to="/search">Search</Nav.Link>
                    <Nav.Link as={Link} to="/login">Login</Nav.Link>
                    <NavDropdown eventKey={1} //Causing Error in Console//
                        title={
                            <div className="pull-left">
                                <img className="thumbnail-image"
                                    src={profileImage || Avatar}
                                    alt="user pic"
                                    height="50px"
                                />
                            </div>
                        } id="basic-nav-dropdown">
                        <NavDropdown.Item href="/personal">My Books</NavDropdown.Item>
                        <NavDropdown.Item href="/friends">My Friends</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="/account">My Account</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.4" onClick={handleLogout}>Logout</NavDropdown.Item>
                    </NavDropdown>
                </Navbar>
            </Navbar>
        </>
    )
}

export default Header;
