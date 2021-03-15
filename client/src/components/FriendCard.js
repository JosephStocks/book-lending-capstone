import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookReader } from "@fortawesome/free-solid-svg-icons";
import capitalize from "../helper-functions/capitalize";
import * as S from "../styles/Styles";

const FriendCard = ({ friend }) => {

  let { user } = friend;
  return (
    <>
      <Card className="text-center mt-2 mb-3">
        <Card.Header>

          <Row>
            <Col className="d-flex justify-content-center align-items-center" xs={3}>
              {capitalize(user.firstName)} {capitalize(user.lastName)}
            </Col >
            <Col className="d-flex justify-content-center align-items-center" xs={3}>
              {user.email || user.googleAuth}
            </Col>
            <Col className="d-flex justify-content-center align-items-center" xs={2} >
              <S.ClickP onClick={(e) => {
                console.log("click");
              }
              }>Owned Books</S.ClickP>
            </Col>
            <Col className="d-flex justify-content-center align-items-center" xs={2}>
              Read Books
            </Col>
            <Col className="d-flex justify-content-center align-items-center" xs={2}>
              Looking for
            </Col>
          </Row>



        </Card.Header>
        {/* <Card.Body>
          <Card.Title>"Your Friend's" Books</Card.Title>
          <Card.Text>Book Thumbnails Here</Card.Text>
        </Card.Body>
        <Card.Body>
          <Card.Title>Books They Are Loaning Out</Card.Title>
          <Card.Text>Book Thumbnails Here</Card.Text>
          <Button variant="primary">See More From "Friend's Name"</Button>
        </Card.Body> */}
        {/* <Card.Footer className="text-muted">2 days ago</Card.Footer> */}
      </Card>
    </>
  );
};

export default FriendCard;
