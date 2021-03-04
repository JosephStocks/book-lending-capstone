import React, { useEffect, useState } from "react";
import {
  bookSearchByISBN,
  bookSearch,
  bookSearchByTitle,
  bookSearchByAuthor,
} from "../api-calls/3rd-party-apis";
import styled from "styled-components";
import Book from "./Book";

const Form = styled.form`
  margin-left: auto;
  margin-right: auto;
  display: block;
  width: fit-content;
`;

const H2 = styled.h2`
  margin-left: auto;
  margin-right: auto;
  display: block;
  width: fit-content;
  margin-top: 1rem;
`;

const Grid = styled.div`
  display: grid;
  row-gap: 0.5rem;
  column-gap: 1rem;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  margin: 0.5rem;

  @media (min-width: 576px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  // Medium devices (tablets, 768px and up)
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  // Large devices (desktops, 992px and up)
  @media (min-width: 992px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  // Extra large devices (large desktops, 1200px and up)
  @media (min-width: 1200px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

export default function App() {
  const [searchText, setSearchText] = useState("");
  const [books, setBooks] = useState([]);

  const search = () => {
    (async () => {
      try {
        let result = await bookSearchByTitle(searchText);
        console.log(result);
        setBooks(result.items);
      } catch (error) {
        setBooks([]);
        console.log("There must not be any results for that!");
      }
    })();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    search();
  };

  return (
    <div style={{ padding: 0, margin: 0 }}>
      <H2>Search for a book!</H2>
      <Form onSubmit={handleSubmit}>
        <input
          value={searchText}
          type="text"
          id="search"
          placeholder="Search for a book!"
          onChange={(e) => setSearchText(e.target.value)}
        />

        <button type="submit">Submit</button>
      </Form>
      <div>
        <Grid>
          {books.map((book) => (
            <Book book={book} />
          ))}
        </Grid>
      </div>
    </div>
  );
}
