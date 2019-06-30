import React from 'react';
import { useSelector } from 'react-redux';
import { getActiveModal } from 'selectors/ui';
import BatchAddModal from './BatchAddModal';
import AddNoteModal from './AddNoteModal';
import ItemDetailsModal from './ItemDetailsModal';
import modalTypes from 'constants/modalTypes';

const ModalHandler = () => {
    const modal = useSelector( getActiveModal );

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

export default ModalHandler;