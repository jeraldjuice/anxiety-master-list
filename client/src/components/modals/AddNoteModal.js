import React from 'react';
import { Modal, ModalHeader } from 'components/modals';
import { useDispatch } from 'react-redux';
import { clearModals } from 'actions/ui';
import { createData } from 'actions/data';
import { compose, withState, withHandlers } from 'recompose';

const AddNoteModal = ( { handleField, noteContent, submitForm } ) => {
    const dispatch = useDispatch();
    return (
        <Modal closeModal={() => dispatch( clearModals() )}>
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
    withState( 'noteContent', 'setContents', '' ),
    withHandlers({
        submitForm: ( { noteContent, dispatch } ) => () => {
            dispatch( createData( { contents: noteContent }, 'notes' ) );
            dispatch( clearModals() );
        },
        handleField: ( { setContents } ) => ( { target: { value } } ) => setContents( value ),
    })
);

export default enhance(AddNoteModal);