import {
    OPEN_MODAL,
    CLEAR_MODALS
} from 'actions/ui';

const initialState = {
    modal: null,
};

function ui( state = initialState, action ) {
    switch( action.type ) {
        case OPEN_MODAL:
            return {
                ...state,
                modal: action.modalType
            };
        case CLEAR_MODALS:
            return {
                ...state,
                modal: null
            }
        default:
            return state;
    }
}

export default ui;