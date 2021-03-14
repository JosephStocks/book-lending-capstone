import React from "react";
import { Button, Card } from "react-bootstrap";
import capitalize from "../helper-functions/capitalize";
import {
  sendFriendRequest,
  acceptFriendRequest,
  fetchPendingFriendRequestsANDDispatchToRedux
} from "../api-calls/friends-api";
import { useSelector } from "react-redux";

const PotentialFriendCard = ({ user }) => {

  const allFriendRelationsIDs = useSelector(
    (state) => state.allFriendRelationsIDs
  );
  console.log(allFriendRelationsIDs);

  // check friendship status
  let friendshipState = "notfriends";
  if (allFriendRelationsIDs.allFriendsIDs.includes(user.id)) {
    friendshipState = "alreadyfriends"
  }
  else if (allFriendRelationsIDs.sentFriendRequestIDs.includes(user.id)) {
    friendshipState = "friendRequestSent"
  }
  else if (allFriendRelationsIDs.receivedFriendRequestsIDs.includes(user.id)) {
    friendshipState = "friendRequestReceived"
  }

  // render based on friendship status
  let showFriendshipStatus = '';
  if (friendshipState === "alreadyfriends") {
    showFriendshipStatus = <p>Already friends</p>
  }
  else if (friendshipState === "friendRequestSent") {
    showFriendshipStatus = <p>Friend request sent</p>
  }
  else if (friendshipState === "receivedFriendRequest") {
    showFriendshipStatus = <div>
      <Button
        onClick={async () => {
          await acceptFriendRequest(user.id);
          fetchPendingFriendRequestsANDDispatchToRedux();
        }}
        className="mr-3"
        variant="outline-success"
        type="button"
      >
        Accept
      </Button>
      <Button variant="outline-danger" type="button">
        Decline
      </Button>
    </div>
  }
  else if (friendshipState === "notfriends") {
    showFriendshipStatus = <Button
      variant="primary"
      onClick={async () => {
        await sendFriendRequest(user.id);
        // research the query and update state search results
      }}
    >
      Send Friend Request
</Button>

  }
  return (
    <>
      <Card className="text-center">
        <Card.Header>
          {capitalize(user.firstName)} {capitalize(user.lastName)}
        </Card.Header>
        <Card.Header>{user.email}</Card.Header>
        <Card.Body className="p-2">
          {showFriendshipStatus}
        </Card.Body>
      </Card>
    </>
  );
};

export default PotentialFriendCard;
