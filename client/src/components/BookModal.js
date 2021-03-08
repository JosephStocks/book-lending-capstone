import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import {toggleModal} from '../redux/actions/templateActions';
import * as S from "../styles/Styles";
    
    const BookModal = (props) => {
        const dispatch = useDispatch();
        const modalState = useSelector(state => state.modalShow);
        const individBook = useSelector(state => state.individBook);
        console.log(individBook)
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
                <Modal.Header  closeButton>
                    <Modal.Title>{individBook.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                {individBook.imageLinks?.thumbnail ? (
                    <img
                        height="192px"
                        key={`Media-${individBook.id}`}
                        src={individBook.imageLinks?.thumbnail}
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
                    <Button onClick={() => dispatch(toggleModal())}>Close</Button>
                </Modal.Footer>
            </Modal>
            </>
        )
    }
    
    export default BookModal;
    