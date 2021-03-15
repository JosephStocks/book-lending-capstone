import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addLargerImageLinks } from "../api-calls/3rd-party-apis";
import {
  bookAddPost,
  bookDeleteRequestByDatabaseID,
  bookDeleteRequestByGoogleBookID,
} from "../api-calls/internal-api";
import {
  toggleModal,
  addIndividBook,
  searchFunction,
} from "../redux/actions/baseActions";

import * as S from "../styles/Styles";

export default function Book({ book, onPersonalPage }, props) {
  let {
    id,
    selfLink,
    title,
    authors,
    categories,
    description,
    imageLinks,
    industryIndentifiers,
    infoLink,
    pageCount,
    previewLink,
    publishedDate,
    publisher,
    textSnippet,
    index,
  } = book;

  const PLACEHOLDER_IMAGE =
    "https://tacm.com/wp-content/uploads/2018/01/no-image-available.jpeg";

  const dispatch = useDispatch();
  const [height, setHeight] = useState(0);
  const [descriptionLines, setDescriptionLines] = useState(0);
  const elementRef = useRef(null);

  const toggleFunction = () => dispatch(toggleModal(true));
  const addBookFunction = () => dispatch(addIndividBook(book));
  let searchResults = useSelector((state) => state.searchResults);

  const handleClick = async () => {
    if (onPersonalPage === undefined || onPersonalPage === false) {
      book = await addLargerImageLinks(book);
      searchResults[book.index] = book;
    }
    dispatch(searchFunction(searchResults));
    toggleFunction();
    addBookFunction();
  };

  useEffect(() => {
    setHeight(elementRef.current.clientHeight);
    if (height < 25) {
      setDescriptionLines(4);
    } else {
      setDescriptionLines(3);
    }
  }, [height]); //empty dependency array so it only runs once at render

  // if not description, show textSnippet
  return (
    <>
      <S.Card key={id}>
        {imageLinks?.thumbnail ? (
          <img
            height="192px"
            key={`Media-${id}`}
            src={imageLinks?.thumbnail}
            alt={title}
          />
        ) : (
          <S.PlaceholderDivImg
            key={`Media-${id}`}
            bgImage={PLACEHOLDER_IMAGE}
          ></S.PlaceholderDivImg>
        )}
        <S.CardContent>
          {title && (
            <S.CardTitle lines={2} key={`title-${id}`}>
              {title}
            </S.CardTitle>
          )}
          <div ref={elementRef}>
            {categories && (
              <span
                style={{
                  color: "blue",
                  marginRight: "0.25rem",
                  fontWeight: 400,
                }}
                key={`category-${id}`}
              >
                {categories}
              </span>
            )}
            {authors &&
              authors
                .map((author, id2) => (
                  <span
                    style={{ color: "green", fontWeight: 400 }}
                    key={`author-${id}-${id2}`}
                  >
                    {author.trim()}
                  </span>
                ))
                .reduce((prev, curr) => [prev, ", ", curr])}
          </div>
          {description && (
            <S.CardText
              lines={descriptionLines}
              mt="auto"
              fontSize="1rem"
              fontWeight={500}
              key={`text-${id}`}
            >
              {description}
            </S.CardText>
          )}
        </S.CardContent>
        <S.ButtonGroup key={`buttons-${id}`}>
          {/* <S.Button
            key={`button1-${id}`}
            size="sm"
            onClick={() => {
              bookAddPost(book);
            }}
          >
            Add Book to Database
          </S.Button> */}
          <S.Button variant="info" key={`button2-${id}`} onClick={handleClick}>
            See More
          </S.Button>
          {/* <S.Button
            key={`button3-${id}`}
            size="sm"
            onClick={() => {
              bookDeleteRequestByGoogleBookID(5);
            }}
          >
            Delete book from database
          </S.Button> */}
        </S.ButtonGroup>
      </S.Card>
    </>
  );
}
