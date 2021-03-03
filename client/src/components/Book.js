import React, { useState, useEffect, useRef } from "react";
import styled, { css } from "styled-components";
// import { css } from 'styled-components';
import { default as UnstyledButtonGroup } from "react-bootstrap/ButtonGroup";
import { default as UnstyledButton } from "react-bootstrap/Button";

import { useDispatch } from "react-redux";

const PlaceholderDivImg = styled.div`
  width: 128px;
  height: 192px;
  background: center / contain no-repeat url(${(props) => props.bgImage});
  border-right: solid gray 1px;
  flex-shrink: 0;
`;
const ButtonGroup = styled.div`
  position: absolute;
  bottom: 0px;
  right: 0px;
  display: none;

  margin-right: 0.75rem;
  margin-bottom: 0.75rem;
`;

const Button = styled(UnstyledButton)`
  margin-left: 0.5rem;
`;

const CardContent = styled.div`
  padding: 0.25rem 1rem; // [y] [x]
  display: flex;
  flex-direction: column;
`;

const Card = styled.div`
  display: flex;
  height: 192px;
  flex-direction: row;
  overflow: hidden;
  border-radius: ${(props) => props.bRadius ?? "5px"};
  background-color: white;
  position: relative;

  &:hover {
    transform: scale(1.02);
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
      rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
      rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;

    ${CardContent} {
      /* filter: blur(1px); */
      filter: opacity(50%);
    }

    ${ButtonGroup} {
      display: block;
    }
  }
`;

const CardTitle = styled.h5`
  flex-shrink: 0;
  padding: 0;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: ${(props) => props.lines}; /* number of lines to show */
  --line-height: 1.3;
  line-height: var(--line-height); /* fallback */
  max-height: calc(
    var(--line-height) * ${(props) => props.lines}
  ); /* fallback */
`;

const CardText = styled.p`
  padding: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
  margin-bottom: 0.25rem;

  ${({ fontSize }) =>
    fontSize
      ? css`
          font-size: ${fontSize};
        `
      : ""}

  ${({ fontWeight }) =>
    fontWeight
      ? css`
          font-weight: ${fontWeight};
        `
      : ""}

${({ mt }) =>
    mt
      ? css`
          margin-top: ${mt};
        `
      : ""}

  // line clamping
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: ${(props) => props.lines}; /* number of lines to show */
  --line-height: 1.5;
  line-height: var(--line-height); /* fallback */
  max-height: calc(
    var(--line-height) * ${(props) => props.lines}
  ); /* fallback */
`;

export default function Book({ book }) {
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
  } = book;

  const PLACEHOLDER_IMAGE =
    "https://tacm.com/wp-content/uploads/2018/01/no-image-available.jpeg";

  const dispatch = useDispatch();
  const [height, setHeight] = useState(0);
  const [descriptionLines, setDescriptionLines] = useState(0);
  const elementRef = useRef(null);

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
      <Card key={id}>
        {imageLinks?.thumbnail ? (
          <img
            height="192px"
            key={`Media-${id}`}
            src={imageLinks?.thumbnail}
            alt={title}
          />
        ) : (
          <PlaceholderDivImg
            key={`Media-${id}`}
            bgImage={PLACEHOLDER_IMAGE}
          ></PlaceholderDivImg>
        )}
        <CardContent>
          {title && (
            <CardTitle lines={2} key={`title-${id}`}>
              {title}
            </CardTitle>
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
            <CardText
              lines={descriptionLines}
              mt="auto"
              fontSize="1rem"
              fontWeight={500}
              key={`text-${id}`}
            >
              {description}
            </CardText>
          )}
        </CardContent>
        <ButtonGroup key={`buttons-${id}`}>
          <Button key={`button1-${id}`} size="sm">
            Add To Already Read
          </Button>
          <Button key={`button2-${id}`} size="sm">
            Add To Want to Read
          </Button>
        </ButtonGroup>
      </Card>
    </>
  );
}
