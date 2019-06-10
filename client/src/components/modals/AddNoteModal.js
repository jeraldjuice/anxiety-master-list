import React from 'react';
import { Modal, ModalHeader } from 'components/modals';
import { connect } from 'react-redux';
import { clearModals } from 'actions/ui';
import { createNote } from 'actions/data';
import { compose, withState, withHandlers } from 'recompose';

const AddNoteModal = ( { dispatch, handleField, noteContent, submitForm } ) => {
    return (
        <Modal closeModal={() => dispatch(clearModals())}>
            <ModalHeader>
              Add a new note
            </ModalHeader>
            <div className="form">
                <textarea placeholder="What're you thinking?" value={ noteContent } onChange={ handleField } />
              <button className="primary" onClick={ submitForm }>Submit</button>
            </div>
        </Modal>
    );
};

const enhance = compose(
    connect(),
    withState( 'noteContent', 'setContents', '' ),
    withHandlers({
        submitForm: ( { noteContent, dispatch } ) => () => {
            dispatch( createNote( noteContent ) );
            dispatch( clearModals() );
        },
        handleField: ( { setContents } ) => ( { target: { value } } ) => setContents( value )
    })
);

export default enhance(AddNoteModal);