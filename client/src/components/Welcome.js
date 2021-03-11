import React from 'react';
import {Button, Row, Col, Container} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import BooksPhoto from '../styles/images/books.jpg';
import * as S from '../styles/Styles';

const Welcome = () => {

    return (
        <>
        <Container>
            <Row>
                <Col md={{ span: 4 }}>
                <S.H2>
                    Welcome To ReadMe BookSwap
                </S.H2>
                </Col>
            </Row>
            <Row>
                <Col xs={{span: 2}} md={{ span: 4, offset: 2 }}>
                <S.RoundImage
                    className="thumbnail-image"
                    src={BooksPhoto}
                    alt="user pic"
                    height="350px"
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                <Button className="mr-3" as={Link} to="/register">Register</Button>
                <Button as={Link} to="/login">Login</Button>
                </Col>
            </Row>
        </Container>
        </>
    )
}

export default Welcome
