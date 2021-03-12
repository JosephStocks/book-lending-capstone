import { faBookReader } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import {Button, Row, Col, Container, Card} from "react-bootstrap";
import * as S from '../styles/Styles';

const FriendsResults = () => {
    return (
        <> 
        <Container>
            <S.Grid>
                <Card className="text-center mt-5 mb-5">
                    <Card.Header>Name of Friend</Card.Header>
                    <Card.Body>
                        <FontAwesomeIcon icon={faBookReader} size="3x" color="teal"/>
                    </Card.Body>
                    <Card.Body>
                        <Button variant="primary">Send Friend Request</Button>
                    </Card.Body>
                    {/* <Card.Footer className="text-muted">2 days ago</Card.Footer> */}
                </Card>
            </S.Grid>
        </Container>
        </>
    )
}

export default FriendsResults
