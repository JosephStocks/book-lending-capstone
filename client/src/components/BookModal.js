import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toggleModal } from '../redux/actions/templateActions';
import * as S from "../styles/Styles";
import {
    bookAddPost,
    bookDeleteRequestByDatabaseID,
    bookDeleteRequestByGoogleBookID,
} from "../api-calls/internal-api";

const BookModal = (props) => {
    const dispatch = useDispatch();
    const modalState = useSelector(state => state.modalShow);
    const individBook = useSelector(state => state.individBook); //change to make sure not coming back as undefined in search const individBook = useSelector(state => state.individBook !== undefined && state.individBook || {});
    const tokenFromState = useSelector(state => state.token)
    
    // const modalRef = React.useRef(null)
    const PLACEHOLDER_IMAGE =
        "https://tacm.com/wp-content/uploads/2018/01/no-image-available.jpeg";
    const NO_DATE = "N/A"
    
    return (
        <>
            <Modal key={individBook.id}
                // ref={modalRef}
                // animation={false}
                onHide={() => dispatch(toggleModal())}
                show={modalState}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>{individBook.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {individBook.imageLinks?.small ? (
                        <img
                            // height="292px"
                            key={`Media-${individBook.id}`}
                            src={individBook.imageLinks?.small}
                            alt={individBook.title}
                        />
                    ) : (
                        <S.PlaceholderDivImg
                            key={`Media-${individBook.id}`}
                            bgImage={PLACEHOLDER_IMAGE}
                        ></S.PlaceholderDivImg>
                    )}
                    <p>{individBook.description}</p>
                    {individBook.publisher ? (
                        <p>Published By: {individBook.publisher}</p>
                    ) : (
                        <p>Published By: {NO_DATE}</p>
                    )}
                    {individBook.publishedDate ? (
                        <p>Publish Date: {individBook.publishedDate}</p>
                    ) : (
                        <p>Publish Date: {NO_DATE}</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <S.Button
                        key={`button1-${individBook.id}`}
                        size="sm"
                        onClick={() => {
                            bookAddPost(individBook, tokenFromState);
                        }}
                    >
                        I Own This Book
                        </S.Button>
                    <S.Button
                        key={`button2-${individBook.id}`}
                        size="sm"
                        onClick={() => {
                            bookAddPost(individBook, tokenFromState);
                        }}
                    >
                        I've Read This Book
                        </S.Button>
                    <S.Button
                        key={`button3-${individBook.id}`}
                        size="sm"
                        onClick={() => {
                            bookAddPost(individBook, tokenFromState);
                        }}
                    >
                        I Want To Read
                        </S.Button>

                </Modal.Footer>
            </Modal>
        </>
    )
}

export default BookModal;
