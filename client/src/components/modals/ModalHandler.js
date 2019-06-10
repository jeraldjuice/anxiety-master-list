import React from 'react';
import NewTaskModal from './NewTaskModal';
import BatchAddModal from './BatchAddModal';
import AddNoteModal from './AddNoteModal';
import { connect } from 'react-redux';
import modalTypes from 'constants/modalTypes';

const ModalHandler = ( { modal } ) => {
    switch( modal ) {
        case modalTypes.newTask:
            return <NewTaskModal />;
        case modalTypes.batchAdd:
            return <BatchAddModal />;
        case modalTypes.noteAdd:
            return <AddNoteModal />;
        default:
            return null;
    }
};

const mapStateToProps = ( { ui: { modal } } ) => {
    return {
        modal,
    };
};

export default connect(mapStateToProps)(ModalHandler);