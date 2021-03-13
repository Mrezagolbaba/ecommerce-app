import React from 'react';
import {Button, Modal,} from "react-bootstrap";
import {Input} from "../Input";
import Layout from "../../Layout";

const NewModal = (props) => {
    return (
        <Modal size={props.size} show={props.show} onHide={props.handleClose}>
            <Modal.Header>
                <Button variant='outline-info' onClick={props.handleClose}> x</Button>
                <Modal.Title>{props.modalTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.children}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={props.handleClose}>
                    ذخیره
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default NewModal;
