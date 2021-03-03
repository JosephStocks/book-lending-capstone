import React from 'react';
import {Link} from 'react-router-dom';
import { Navbar, NavDropdown, Nav, Form, FormControl, Button } from 'react-bootstrap';

import Avatar from '../../styles/images/avatar.png'

const Header = () => {
    return (
        <> 
            <Navbar bg="warning" expand="lg" sticky="top">
                <Navbar.Brand href="#home">Book Swap</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    {/* <Form className="ml-auto" inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-info">Search</Button>
                    </Form> */}
                    <Nav.Link className="ml-auto" href="#link">Search</Nav.Link>
                    <Nav.Link href="#link">Login</Nav.Link>
                    <NavDropdown className="mr-5" eventKey={1} 
                            title={
                                <div className="pull-left">
                                    <img className="thumbnail-image" 
                                        src={Avatar} 
                                        alt="user pic"
                                        height="50px"
                                    />
                                </div>
                            } id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">My Books</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">My Friends</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">My Account</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.4">Logout</NavDropdown.Item>
                    </NavDropdown>
                </Navbar.Collapse>
            </Navbar>
        </>
    )
}

export default Header;
