import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import DevCards from './DevCards'


const Account = () => {
    return (
        <>
        <Container>
            <Row className="mt-5">
            <Col>
                <div><h1>ReadMe Book Swap</h1><h5>is a social media site for book lovers and new readers alike! Read Me provides a space for literary discussion and connecting with other readers. Write your own review or story about how a book changed your life and share it with others through our book swap feature.
                    Wherever you are in your reading journey, ReadMe Book Swap is here to help you document, share, and explore new literary adventures.</h5>
                </div>
            </Col>
            </Row>
            <Row className="mt-3">
            </Row>
            <Row className="mt-5">
            <Col>
                <DevCards/>
            </Col>
            </Row>
        </Container>
        </>
    )
}

export default Account;