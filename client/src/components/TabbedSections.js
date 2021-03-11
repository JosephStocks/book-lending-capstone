import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Friends from './Friends';
import {
  fetchOwnedBooks,
  fetchReadBooks,
  fetchWantBooks,
  cleanFetchedBooks,
} from "../api-calls/internal-api";
import {
  saveOwnedBooks,
  saveReadBooks,
  saveWantBooks,
} from "../redux/actions/baseActions";
import { bookSearchByAuthor } from "../api-calls/3rd-party-apis";
import Book from "./Book";
import * as S from "../styles/Styles";

export default function TabbedSections() {
  const [key, setKey] = useState("myBooks");
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();
  const ownedBooks = useSelector((state) => state.ownedBooks);
  const readBooks = useSelector((state) => state.readBooks);
  const wantBooks = useSelector((state) => state.wantBooks);

  useEffect(() => {
    (async () => {
      try {
        let ownedBooks = await cleanFetchedBooks(await fetchOwnedBooks(token));
        dispatch(saveOwnedBooks(ownedBooks));
        let readBooks = await cleanFetchedBooks(await fetchReadBooks(token));
        let wantBooks = await cleanFetchedBooks(await fetchWantBooks(token));
        dispatch(saveReadBooks(readBooks));
        dispatch(saveWantBooks(wantBooks));
      } catch (error) {
        console.error(error);
        console.log("There must not be any results for that!");
      }
    })();
  }, [token, dispatch]);

  return (
    <>
      <hr/>
      <S.H2 className="mb-5">Dashboard</S.H2>
      <hr/>
      <Tabs
        className="mb-5"
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
      >
        <Tab eventKey="myBooks" title="My Books">
          <S.Grid>
            {ownedBooks !== undefined && ownedBooks.length !== 0
              ? ownedBooks.map((book, index) => (
                  <Book book={{ ...book, index }} />
                ))
              : null}
          </S.Grid>
        </Tab>
        <Tab eventKey="readBooks" title="Books I've Read">
          <S.Grid>
            {readBooks !== undefined && readBooks.length !== 0
              ? readBooks.map((book, index) => (
                  <Book book={{ ...book, index }} />
                ))
              : null}
          </S.Grid>
        </Tab>
        <Tab eventKey="wantBooks" title="Books To Read">
          <S.Grid>
            {wantBooks !== undefined && wantBooks.length !== 0
              ? wantBooks.map((book, index) => (
                  <Book book={{ ...book, index }} />
                ))
              : null}
          </S.Grid>
        </Tab>
        <Tab eventKey="friends" title="Friends">
            <Friends/>
        </Tab>
      </Tabs>
    </>
  );
}
