import React from 'react';
import { Modal, ModalHeader } from 'components/modals';
import { connect } from 'react-redux';
import { clearModals } from 'actions/ui';

const NewTaskModal = ( { dispatch } ) => {
    return (
        <Modal closeModal={() => dispatch(clearModals())}>
            <ModalHeader>
              Create a new task
            </ModalHeader>
            <div className="form question-form">
              <input type="text" placeholder="What needs doin'?" />
              <button className="primary">Submit</button>
            </div>
        </Modal>
    );
};

export default connect()(NewTaskModal);