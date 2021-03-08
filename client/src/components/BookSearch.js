import React, { useEffect, useState } from "react";
import {
  bookSearchByISBN,
  bookSearch,
  bookSearchByTitle,
  bookSearchByAuthor,
} from "../api-calls/3rd-party-apis";
import * as S from "../styles/Styles";
import {Button} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import Book from "./Book";
import BookModal from './BookModal';
import {searchFunction} from '../redux/actions/templateActions';

export default function App() {
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();
  const searchResults = useSelector(state => state.searchResults)

  const search = () => {
    (async () => {
      try {
        let result = await bookSearchByTitle(searchText);
        console.log(result);
        dispatch(searchFunction(result.items));
      } catch (error) {
        dispatch(searchFunction([]));
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
          {searchResults?.map((book) => (
            <Book book={book}/>
          ))}
        </S.Grid>
      </div>
    </div>
    <BookModal />
    </>
  );
}
