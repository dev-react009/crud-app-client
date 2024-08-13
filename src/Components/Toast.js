import React from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';

const ToastNotification = ({ show, message, onClose }) => {
    return (
        <ToastContainer position="top-center" className="p-3">
            <Toast show={show} onClose={onClose} delay={3000} autohide>
                <Toast.Body>{message}</Toast.Body>
            </Toast>
        </ToastContainer>
    );
};

export default ToastNotification;
