import React, { useState } from "react";
import FriendCard from "./FriendCard";
import * as S from "../styles/Styles";
import { Button, Form, Container, Card } from "react-bootstrap";
import FriendsResults from "./FriendsResults";
import { fetchUserSearchResults } from "../api-calls/friends";

const Friends = () => {
  const [searchText, setSearchText] = useState("");
  const [searchFriends, setSearchFriends] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response = await fetchUserSearchResults(searchText);
      console.log(response);
    } catch (err) {
      console.error(err);
    }
    setSearchFriends(true);
  };

  const handleClear = () => {
    setSearchFriends(false);
    setSearchText("");
  };

  let searchResults;

  if (searchFriends === true) {
    searchResults = <FriendsResults />;
  } else {
    searchResults = null;
  }

  return (
    <>
      <Container>
        <S.Grid>
          <Card style={{ width: 300 }} className="text-center mt-5 mb-5">
            <Card.Header>
              <S.Grid></S.Grid>
              <S.H5>Friend Request From "Name"</S.H5>
              <Button className="mr-3" variant="outline-success" type="button">
                Accept
              </Button>
              <Button variant="outline-danger" type="button">
                Decline
              </Button>
            </Card.Header>
          </Card>
        </S.Grid>

        <S.H4>Find New Friends</S.H4>
        <Form className="justify-content-center" onSubmit={handleSubmit} inline>
          <S.Grid>
            <input
              value={searchText}
              type="text"
              id="search"
              placeholder="Search"
              onChange={(e) => setSearchText(e.target.value)}
            />
            <Button variant="outline-info" type="submit">
              Search
            </Button>
            <Button onClick={handleClear} variant="outline-info" type="button">
              Clear
            </Button>
          </S.Grid>
        </Form>
        {searchResults}
        <S.H2 className="mt-5 mb-5">Your Friends</S.H2>
        <Container>
          <S.Grid>
            <FriendCard />
            <FriendCard />
            <FriendCard />
            <FriendCard />
            <FriendCard />
            <FriendCard />
          </S.Grid>
        </Container>
      </Container>
    </>
  );
};

export default Friends;
