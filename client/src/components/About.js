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
                <div><h1>ReadMe Book Swap</h1><h5>is an app for book lovers and new readers alike! RMBS provides a space for connecting with other readers. Offer up a book you love and share it with others through our book swap feature.
                    Wherever you are in your reading journey, ReadMe Book Swap is here to help you share and explore new literary adventures.</h5>
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