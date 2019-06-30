import React from 'react';
import BatchAddModal from './BatchAddModal';
import AddNoteModal from './AddNoteModal';
import ItemDetailsModal from './ItemDetailsModal';
import { connect } from 'react-redux';
import modalTypes from 'constants/modalTypes';

const ModalHandler = ( { modal } ) => {
    switch( modal ) {
        case modalTypes.batchAdd:
            return <BatchAddModal />;
        case modalTypes.noteAdd:
            return <AddNoteModal />;
        case modalTypes.item:
            return <ItemDetailsModal />;
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