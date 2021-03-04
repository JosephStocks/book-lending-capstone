import styled, { css } from "styled-components";
import { default as UnstyledButton } from "react-bootstrap/Button";


export const Form = styled.form`
  margin-left: auto;
  margin-right: auto;
  display: block;
  width: fit-content;
`;

export const H2 = styled.h2`
  margin-left: auto;
  margin-right: auto;
  display: block;
  width: fit-content;
  margin-top: 1rem;
`;

export const Grid = styled.div`
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

export const Box = styled.div`
  border-style: solid;
  height: 300px;
`

export const PlaceholderDivImg = styled.div`
  width: 128px;
  height: 192px;
  background: center / contain no-repeat url(${(props) => props.bgImage});
  border-right: solid gray 1px;
  flex-shrink: 0;
`;
export const ButtonGroup = styled.div`
  position: absolute;
  bottom: 0px;
  right: 0px;
  display: none;

  margin-right: 0.75rem;
  margin-bottom: 0.75rem;
`;

export const Button = styled(UnstyledButton)`
  margin-left: 0.5rem;
`;

export const CardContent = styled.div`
  padding: 0.25rem 1rem; // [y] [x]
  display: flex;
  flex-direction: column;
`;

export const Card = styled.div`
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

export const CardTitle = styled.h5`
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

export const CardText = styled.p`
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
