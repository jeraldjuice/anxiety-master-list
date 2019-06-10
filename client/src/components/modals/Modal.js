import React from 'react';
import { Icon } from 'components/ui';

export const ModalHeader = ({ children }) => {
    return (
        <div className="modal-header">
            { children }
        </div>
    );
};

export const ModalFooter = ({ children }) => {
    return (
        <div className="modal-footer">
            { children }
        </div>
    );
};

const CloseButton = ({ closeModal }) => {
    return (
        <div className="close-btn" onClick={ closeModal }>
            <Icon icon="window-close" solid />
        </div>
    );
}

const Modal = ({ children, closeModal }) => {
    return (
        <div className="modal-container">
            <div className="modal">
                <CloseButton closeModal={ closeModal } />
                { children }
            </div>
        </div>
    );
};

export default Modal;