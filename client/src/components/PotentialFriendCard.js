import React from "react";
import { Button, Card } from "react-bootstrap";
import capitalize from "../helper-functions/capitalize";
import { sendFriendRequest } from "../api-calls/friends-api";

const PotentialFriendCard = ({ user }) => {
  return (
    <>
      <Card className="text-center">
        <Card.Header>
          {capitalize(user.firstName)} {capitalize(user.lastName)}
        </Card.Header>
        <Card.Header>{user.email}</Card.Header>
        <Card.Body className="p-2">
          <Button
            variant="primary"
            onClick={async () => {
              await sendFriendRequest(user.id);
              // research the query and update state search results
            }}
          >
            Send Friend Request
          </Button>
        </Card.Body>
      </Card>
    </>
  );
};

export default PotentialFriendCard;
