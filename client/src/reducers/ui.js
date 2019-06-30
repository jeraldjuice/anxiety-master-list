import {
    OPEN_MODAL,
    CLEAR_MODALS,
} from 'actions/ui';

const initialState = {
    modal: null,
    modalData: {},
};

function ui( state = initialState, action ) {
    switch( action.type ) {
        case OPEN_MODAL:
            return {
                ...state,
                modal: action.modalType,
                modalData: action.modalData,
            };
        case CLEAR_MODALS:
            return {
                ...state,
                modal: null,
                modalData: {},
            }
        default:
            return state;
    }
}

export default ui;