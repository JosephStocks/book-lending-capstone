import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import {toggleModal} from '../redux/actions/templateActions';
    
    
    const BookModal = () => {
        const dispatch = useDispatch();
        const modalState = useSelector(state => state.modalShow);
        return (
            <>
            <Modal
                onHide={() => dispatch(toggleModal())}
                show={modalState}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header  closeButton>
                    <Modal.Title>Book title</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Book Description</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => dispatch(toggleModal())}>Close</Button>
                </Modal.Footer>
            </Modal>
            </>
        )
    }
    
    export default BookModal;
    