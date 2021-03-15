import React, { useState } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookReader } from "@fortawesome/free-solid-svg-icons";
import capitalize from "../helper-functions/capitalize";
import * as S from "../styles/Styles";

const FriendCard = ({ friend }) => {
  const [showOwnedBooks, setShowOwnedBooks] = useState(false)
  const [showReadBooks, setShowReadBooks] = useState(false)
  const [showWantBooks, setShowWantBooks] = useState(false)
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
                setShowOwnedBooks(true);
              }
              }>Owned Books</S.ClickP>
            </Col>
            <Col className="d-flex justify-content-center align-items-center" xs={2}>
              <S.ClickP onClick={(e) => {
                setShowReadBooks(true);
              }
              }>Read Books</S.ClickP>
            </Col>
            <Col className="d-flex justify-content-center align-items-center" xs={2}>
              <S.ClickP onClick={(e) => {
                setShowWantBooks(true);
              }
              }>Looking for</S.ClickP>
            </Col>
          </Row>



        </Card.Header>
        <Row>
          <Col>
            <S.Grid>

            </S.Grid>
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default FriendCard;
