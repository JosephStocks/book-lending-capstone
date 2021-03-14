import React from "react";
import { Card, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookReader } from "@fortawesome/free-solid-svg-icons";
import capitalize from "../helper-functions/capitalize";

const FriendCard = (props) => {
  // let { firstName, lastName } = friend;
  return (
    <>
      <Card className="text-center mt-5 mb-5">
        <Card.Header>
          {/* {capitalize(firstName)} {capitalize(lastName)} */}
        </Card.Header>
        <Card.Body>
          <Card.Title>"Your Friend's" Books</Card.Title>
          <Card.Text>Book Thumbnails Here</Card.Text>
        </Card.Body>
        <Card.Body>
          <Card.Title>Books They Are Loaning Out</Card.Title>
          <Card.Text>Book Thumbnails Here</Card.Text>
          <Button variant="primary">See More From "Friend's Name"</Button>
        </Card.Body>
        {/* <Card.Footer className="text-muted">2 days ago</Card.Footer> */}
      </Card>
    </>
  );
};

export default FriendCard;
