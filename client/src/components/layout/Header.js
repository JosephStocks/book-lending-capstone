import React from 'react';
import {Link} from 'react-router-dom';
import { Navbar, NavDropdown, Nav } from 'react-bootstrap';
import * as S from "../../styles/Styles";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';

import Avatar from '../../styles/images/avatar.png'

const Header = () => {
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
                                        src={Avatar} 
                                        alt="user pic"
                                        height="50px"
                                    />
                                </div>
                            } id="basic-nav-dropdown">
                        <NavDropdown.Item href="/personal">My Books</NavDropdown.Item>
                        <NavDropdown.Item href="/friends">My Friends</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="/account">My Account</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.4">Logout</NavDropdown.Item>
                    </NavDropdown>
                </Navbar>
            </Navbar>
        </>
    )
}

export default Header;
