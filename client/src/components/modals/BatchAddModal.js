import React from 'react';
import { Modal, ModalHeader } from 'components/modals';
import { connect } from 'react-redux';
import { clearModals } from 'actions/ui';

const BatchAddModal = ( { dispatch } ) => {
    return (
        <Modal closeModal={() => dispatch(clearModals())}>
            <ModalHeader>
              Add a lot of tasks
            </ModalHeader>
            <div className="form question-form">
                <label>Write each task on a new line and sort them later!</label>
                <textarea placeholder="What needs doin'?">

                </textarea>
              <button className="primary">Submit</button>
            </div>
        </Modal>
    );
};

export default connect()(BatchAddModal);