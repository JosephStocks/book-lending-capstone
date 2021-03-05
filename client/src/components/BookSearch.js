import React, { useEffect, useState } from "react";
import {
  bookSearchByISBN,
  bookSearch,
  bookSearchByTitle,
  bookSearchByAuthor,
} from "../api-calls/3rd-party-apis";
import Book from "./Book";
import * as S from "../styles/Styles";
import {Button} from 'react-bootstrap';

import BookModal from './BookModal';

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
        console.error(error);
        console.log("There must not be any results for that!");
      }
    })();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    search();
  };

  return (
    <>
    <div style={{ padding: 0, margin: 0 }}>
      <S.H2>Search for a book!</S.H2>
      <S.Form onSubmit={handleSubmit}>
        <input
          value={searchText}
          type="text"
          id="search"
          placeholder="Search for a book!"
          onChange={(e) => setSearchText(e.target.value)}
        />

        <button type="submit">Submit</button>
      </S.Form>
      <div>
        <S.Grid>
          {books.map((book) => (
            <Book book={book} />
          ))}
        </S.Grid>
      </div>
    </div>
    <BookModal/>
    </>
  );
}
