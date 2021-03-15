import React from 'react'
import { toggleWhoOwnsModal } from "../redux/actions/baseActions";
import { Modal, Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import PotentialFriendCard from './PotentialFriendCard'

const WhoOwnsModal = () => {
    const individBook = useSelector((state) => state.whoownsit.book);
    const bookOwners = useSelector((state) => state.whoownsit.allOwners);
    const modalState = useSelector((state) => state.whoOwnsModalShow);
    const dispatch = useDispatch();
    return (
        <>
            <Modal
                key={individBook.id}
                onHide={() => dispatch(toggleWhoOwnsModal())}
                show={modalState}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header style={{ backgroundColor: "lightgray" }} closeButton>
                    <Modal.Title>Owners of {individBook.title}:</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: "lightgray", overflow: "scroll" }}>
                    {
                        bookOwners.map((friend, index) => (
                            <>
                                <PotentialFriendCard key={index} user={friend} />
                                <hr />
                            </>
                        ))
                    }
                </Modal.Body>
                {/* <Modal.Footer>{saveButtons}</Modal.Footer> */}
            </Modal>
        </>
    )
}

export default WhoOwnsModal
