import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import {Container, Row, Col, Card, Button} from 'react-bootstrap';
import * as S from "../styles/Styles";
import Claude from '../styles/images/claude.jpeg'
import Ian from '../styles/images/ian.jpeg'
import Joe from '../styles/images/joe.jpeg'
import Jacob from '../styles/images/jacob2.jpeg'

const HomePageBooks = () => {
    return (
        <>  <S.GridAbout>
            <Card style={{ width: '12rem' }}>
                <Card.Img variant="top" src={Joe} />
                <Card.Body>
                <Container>
                            <Row>
                                <S.CardTitle className="mb-2" lines={2} key={1}>
                                    <S.H4>Joseph Stocks</S.H4>
                                </S.CardTitle>
                            </Row>
                            <Row>
                                <Col>
                                    <S.CardText
                                    mt="auto"
                                    fontSize="1rem"
                                    fontWeight={500}
                                    key={2}
                                    >
                                    <S.LinkStyle href="https://www.linkedin.com/in/joseph-stocks/" target="_blank">
                                        <FontAwesomeIcon icon={faLinkedin} size="1x" color="black"/>
                                        <h5>Linkedin</h5>
                                    </S.LinkStyle>
                                    </S.CardText>
                                </Col>
                                <Col>
                                    <S.LinkStyle href="https://github.com/josephStocks" target="_blank">
                                        <FontAwesomeIcon icon={faGithub} size="1x" color="black"/>
                                        <h5>GitHub</h5>
                                    </S.LinkStyle>
                                </Col>
                            </Row>
                        </Container>
                </Card.Body>
            </Card>
            <Card style={{ width: '12rem' }}>
                <Card.Img variant="top" src={Claude} />
                <Card.Body>
                <Container>
                            <Row>
                                <S.CardTitle className="mb-2" lines={2} key={1}>
                                    <S.H4>Claude Major</S.H4>
                                </S.CardTitle>
                            </Row>
                            <Row>
                                <Col>
                                    <S.CardText
                                    mt="auto"
                                    fontSize="1rem"
                                    fontWeight={500}
                                    key={2}
                                    >
                                    <S.LinkStyle href="https://www.linkedin.com/in/claumaj/" target="_blank">
                                        <FontAwesomeIcon icon={faLinkedin} size="1x" color="black"/>
                                        <h5>Linkedin</h5>
                                    </S.LinkStyle>
                                    </S.CardText>
                                </Col>
                                <Col>
                                    <S.LinkStyle href="https://github.com/ClauMaj" target="_blank">
                                        <FontAwesomeIcon icon={faGithub} size="1x" color="black"/>
                                        <h5>GitHub</h5>
                                    </S.LinkStyle>
                                </Col>
                            </Row>
                        </Container>
                </Card.Body>
            </Card>
            <Card style={{ width: '12rem' }}>
                <Card.Img variant="top" src={Ian} />
                <Card.Body>
                <Container>
                            <Row>
                                <S.CardTitle className="mb-2" lines={2} key={1}>
                                    <S.H4>Ian Haddock</S.H4>
                                </S.CardTitle>
                            </Row>
                            <Row>
                                <Col>
                                    <S.CardText
                                    mt="auto"
                                    fontSize="1rem"
                                    fontWeight={500}
                                    key={2}
                                    >
                                    <S.LinkStyle href="https://www.linkedin.com/in/ianhaddock99/" target="_blank">
                                        <FontAwesomeIcon icon={faLinkedin} size="1x" color="black"/>
                                        <h5>Linkedin</h5>
                                    </S.LinkStyle>
                                    </S.CardText>
                                </Col>
                                <Col>
                                    <S.LinkStyle href="https://github.com/ianhaddock99" target="_blank">
                                        <FontAwesomeIcon icon={faGithub} size="1x" color="black"/>
                                        <h5>GitHub</h5>
                                    </S.LinkStyle>
                                </Col>
                            </Row>
                        </Container>
                </Card.Body>
            </Card>
            <Card style={{ width: '12rem' }}>
                <Card.Img variant="top" src={Jacob} />
                <Card.Body>
                <Container>
                            <Row>
                                <S.CardTitle className="mb-2" lines={2} key={1}>
                                    <S.H4>Jacob Deel</S.H4>
                                </S.CardTitle>
                            </Row>
                            <Row>
                                <Col>
                                    <S.CardText
                                    mt="auto"
                                    fontSize="1rem"
                                    fontWeight={500}
                                    key={2}
                                    >
                                    <S.LinkStyle href="https://www.linkedin.com/in/jacob-deel-093b401b9/" target="_blank">
                                        <FontAwesomeIcon icon={faLinkedin} size="1x" color="black"/>
                                        <h5>Linkedin</h5>
                                    </S.LinkStyle>
                                    </S.CardText>
                                </Col>
                                <Col>
                                    <S.LinkStyle href="https://github.com/jacoblakedeel" target="_blank">
                                        <FontAwesomeIcon icon={faGithub} size="1x" color="black"/>
                                        <h5>GitHub</h5>
                                    </S.LinkStyle>
                                </Col>
                            </Row>
                        </Container>
                </Card.Body>
            </Card>
        </S.GridAbout>
            
        </>
    )
}

export default HomePageBooks
