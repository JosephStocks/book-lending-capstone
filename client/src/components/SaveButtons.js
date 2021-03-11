import React from 'react';
import { useSelector } from "react-redux";
import * as S from "../styles/Styles";
import {
  addBookToPersonalLists,
} from "../api-calls/internal-api";

export default function SaveButtons() {

  const individBook = useSelector((state) => state.individBook); 
  const tokenFromState = useSelector((state) => state.token);



  

  return (
    <>
            <S.Button
              key={`button1-${individBook.id}`}
              size="sm"
              onClick={() => {
                addBookToPersonalLists(individBook, "owned", tokenFromState);
              }}
            >
              I Own This Book
            </S.Button>
            <S.Button
              key={`button2-${individBook.id}`}
              size="sm"
              onClick={() => {
                addBookToPersonalLists(individBook, "read", tokenFromState);
              }}
            >
              I've Read This Book
            </S.Button>
            <S.Button
              key={`button3-${individBook.id}`}
              size="sm"
              onClick={() => {
                addBookToPersonalLists(individBook, "want", tokenFromState);
              }}
            >
              I Want To Read
            </S.Button>
    </>
  );
}
