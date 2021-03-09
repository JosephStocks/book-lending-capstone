import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Tab from "react-bootstrap/Tab";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import { fetchOwnedBooks } from "../api-calls/internal-api";
import { saveOwnedBooks } from "../redux/actions/templateActions";
import { bookSearchByAuthor } from "../api-calls/3rd-party-apis";
import Book from "./Book";
import * as S from "../styles/Styles";

export default function TabbedSections() {
  const [tabShowing, setTabShowing] = useState("My Books");
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();
  const ownedBooks = useSelector((state) => state.ownedBooks);

  const handleClick = (tabState) => {
    setTabShowing(tabState);
  };

  useEffect(() => {
    (async () => {
      try {
        let books = await fetchOwnedBooks(token);
        // book.authors: "["Wise Publications"]"
        // book.categories: "["Music"]"
        // book.createdAt: "2021-03-09T20:46:44.038Z"
        // book.description: "A modern day music theatre phenomenon, Matilda: The Musical is the multiple Olivier Award-winning adaptation of Roald Dahl’s classic children’s novel, newly adapted for the stage with music and lyrics by Tim Minchin. This official songbook presents all the songs from the show arranged for Voice and Piano, with full lyrics and Guitar chord boxes. An eight-page colour photo section and exclusive foreword by Tim Minchin round off this beautiful folio, the perfect way to relive a perfect stage performance."
        // book.googleBookID: "4H7HDgAAQBAJ"
        // book.id: 24
        // book.imageLinks: "{"smallThumbnail":"http://books.google.com/books/publisher/content?id=4H7HDgAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&imgtk=AFLRE70JmXjCvXR253bUFnmIpTH-hF2TWBBHEYNQAdTWwpbFSob-Gzl_KxN290Lr0zBUKwXs0VAPIsnat6Pvw0PQ-6aAkijXPkG4E_T_nWl_YzC2fnQS1X-ILr2Y7JIoxxpDcoIHS_0_&source=gbs_api","thumbnail":"http://books.google.com/books/publisher/content?id=4H7HDgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE71H0UTPr15VPJATrinvcXAXLw6V85y-fFicWOlASXab0yvLegi5jrHZMiO7TKlL74O-qyc3gyLgWbI6fjeBXi6L_YMFhRbVy8tL3HVetDokmRGeFoKQyjh0zNpJ6GU9SQ98gSN6&source=gbs_api","small":"http://books.google.com/books/publisher/content?id=4H7HDgAAQBAJ&printsec=frontcover&img=1&zoom=2&edge=curl&imgtk=AFLRE7262asZ47J-poCYJDDiRRAWfTyVmKaGwGoviDqouCz_-mk5VQhGgxfp2eyFhV5IWnObdjPkQq-h_M90TteK5JIKXmhkdI5dmKIbQAW3KCyVkOKkhFvXqC2IxhrdZyq_Xf9AF7BT&source=gbs_api","medium":"http://books.google.com/books/publisher/content?id=4H7HDgAAQBAJ&printsec=frontcover&img=1&zoom=3&edge=curl&imgtk=AFLRE72OEJSJ8YafiIo0vJWhWPzei4RLzGv6bZMzHdNCFZMf37aNJZEmQkVAyWYXs9xHLiX5-IvX6DppvAxITriv3ip_jF2cBifR_w9cQu44JvxaA2xxTjFApWDHKt7oD8Z1E0492zgS&source=gbs_api","large":"http://books.google.com/books/publisher/content?id=4H7HDgAAQBAJ&printsec=frontcover&img=1&zoom=4&edge=curl&imgtk=AFLRE71kNTV_Svh9QMc5y8WxAolQItbzVVOQ_g2Q69ZKRO78mW4iFDT864srMxDnJ8md3A_3IQTxSlgnkL8BEgTw7J8qQ2vJ7sPfp-_bXnFUL-xOPmjAufKAvQ6KuGaxjONugBIca5Wn&source=gbs_api","extraLarge":"http://books.google.com/books/publisher/content?id=4H7HDgAAQBAJ&printsec=frontcover&img=1&zoom=6&edge=curl&imgtk=AFLRE70oceEHRs1IRZQRVhC_F6saY4gmss-GJyAwOdCe0kbGdZHPYkUBg49X_g2801-nDEHS3sTcZ32rWUnS5C1W_3MWPfwhtMcjcVFkehGZKuRpS5A-XtD5Oyap_14wI_CdNEqrZr1I&source=gbs_api"}"
        // book.isbn: "[{"type":"ISBN_13","identifier":"9781783230075"},{"type":"ISBN_10","identifier":"178323007X"}]"
        // book.publishedDate: "2012-12-07"
        // book.publisher: "Wise Publications"
        // book.title: "Matilda: The Musical (PVG)"
        // book.updatedAt: "2021-03-09T20:46:44.038Z"
        // bookID: 24
        // createdAt: "2021-03-09T20:46:44.168Z"
        // id: 7
        // lendToID: null
        // updatedAt: "2021-03-09T20:46:44.168Z"
        // userID: 28

        let cleanedBooks = await books.map((book) => {
          let {
            "book.title": title,
            "book.authors": authors,
            "book.categories": categories,
            "book.description": description,
            "book.imageLinks": imageLinks,
            "book.isbn": isbn,
            "book.publishedDate": publishedDate,
            "book.publisher": publisher,
            "book.googleBookID": googleBookID,
            bookID,
            id,
            userID,
            lendToID,
          } = book;
          return {
            title,
            description,
            publisher,
            publishedDate,
            googleBookID,
            isbn: JSON.parse(isbn),
            authors: JSON.parse(authors),
            categories: JSON.parse(categories),
            imageLinks: JSON.parse(imageLinks),
            bookID,
            id,
            userID,
            lendToID,
          };
        });
        console.log(cleanedBooks);
        dispatch(saveOwnedBooks(cleanedBooks));
      } catch (error) {
        console.error(error);
        console.log("There must not be any results for that!");
      }
    })();
  }, [token]);

  if (tabShowing === "My Books") {
    return (
      <>
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row>
            <Col>
              <Nav variant="tabs" className="flex-row">
                <Nav.Item>
                  <Nav.Link
                    onClick={() => handleClick("My Books")}
                    eventKey="first"
                  >
                    My Books
                  </Nav.Link>
                </Nav.Item>

                <Nav.Item>
                  <Nav.Link
                    onClick={() => handleClick("Read")}
                    eventKey="second"
                  >
                    Books I've Read
                  </Nav.Link>
                </Nav.Item>

                <Nav.Item>
                  <Nav.Link
                    onClick={() => handleClick("To Read")}
                    eventKey="third"
                  >
                    Books To Read
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
          </Row>
        </Tab.Container>
        <div>My Books</div>
        <S.Grid>
          {ownedBooks !== undefined && ownedBooks.length !== 0
            ? ownedBooks.map((book, index) => (
                <Book book={{ ...book, index }} />
              ))
            : null}
        </S.Grid>
      </>
    );
  } else if (tabShowing === "Read") {
    return (
      <>
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row>
            <Col>
              <Nav variant="tabs" className="flex-row">
                <Nav.Item>
                  <Nav.Link
                    onClick={() => handleClick("My Books")}
                    eventKey="first"
                  >
                    My Books
                  </Nav.Link>
                </Nav.Item>

                <Nav.Item>
                  <Nav.Link
                    onClick={() => handleClick("Read")}
                    eventKey="second"
                  >
                    Books I've Read
                  </Nav.Link>
                </Nav.Item>

                <Nav.Item>
                  <Nav.Link
                    onClick={() => handleClick("To Read")}
                    eventKey="third"
                  >
                    Books To Read
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
          </Row>
        </Tab.Container>
        <div>Books I've Read</div>
      </>
    );
  } else if (tabShowing === "To Read") {
    return (
      <>
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row>
            <Col>
              <Nav variant="tabs" className="flex-row">
                <Nav.Item>
                  <Nav.Link
                    onClick={() => handleClick("My Books")}
                    eventKey="first"
                  >
                    My Books
                  </Nav.Link>
                </Nav.Item>

                <Nav.Item>
                  <Nav.Link
                    onClick={() => handleClick("Read")}
                    eventKey="second"
                  >
                    Books I've Read
                  </Nav.Link>
                </Nav.Item>

                <Nav.Item>
                  <Nav.Link
                    onClick={() => handleClick("To Read")}
                    eventKey="third"
                  >
                    Books To Read
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
          </Row>
        </Tab.Container>
        <div>Books I Want to Read</div>
      </>
    );
  }
}
