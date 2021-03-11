import React from 'react';
import { Link } from 'react-router-dom';
import {Navbar, Nav, NavDropdown} from 'react-bootstrap';
import * as S from "../../styles/Styles";
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import LogInButton from '../layout/LogInButton'
import GoogleHeader from '../layout/GoogleHeader'
import LocalHeader from '../layout/LocalHeader'


const Header = () => {
    const token = useSelector(state => state.token)
    const googleAuth = useSelector(state => state.googleAuth)



    let whichButtons;
    if (token !== "" && googleAuth === true) {
        whichButtons = <GoogleHeader />
    }
    else if (token !== "" && googleAuth === false) {
        whichButtons = <LocalHeader />
    }
    else {
        whichButtons = <LogInButton />
    }

    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="info" variant="dark">
            <Navbar.Brand as={Link} to="/"><S.Font><FontAwesomeIcon className="mr-1" icon={faBook} size="1x" color="black" />ReadMe Book Swap<FontAwesomeIcon className="ml-1" icon={faBook} size="1x" color="black" flip={"horizontal"} /></S.Font></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ml-auto">
                    {whichButtons}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            
        </>
    )
}

export default Header;
