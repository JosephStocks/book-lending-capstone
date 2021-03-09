import React from 'react';
import {Box} from '../styles/Styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import {Container, Row, Col} from 'react-bootstrap'

const HomePageBooks = () => {
    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <a href="https://github.com/jacoblakedeel" target="_blank">
                            <FontAwesomeIcon icon={faGithub} size="4x"/>
                            <h3>GitHub</h3>
                        </a>
                    </Col>
                </Row>
            </Container>
            
            
        </>
    )
}

export default HomePageBooks
