import React, { useState } from 'react';
import { Modal, ModalHeader } from 'components/modals';
import { useDispatch } from 'react-redux';
import { clearModals } from 'actions/ui';
import { createData } from 'actions/data';

const AddNoteModal = ( ) => {
    const dispatch = useDispatch();
    const [ noteContent, setContents ] = useState( '' );

    const handleField = ( { target: { value } } ) => setContents( value );

    const submitForm = () => {
        dispatch( createData( { contents: noteContent }, 'notes' ) );
        dispatch( clearModals() );
    };

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

export default AddNoteModal;