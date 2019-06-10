import {
    START_FETCH,
    RECEIVE_NOTES
} from 'actions/data';

const initialState = {
    fetching: false,
    notes: [],
};

function data( state = initialState, action ) {
    switch( action.type ) {
        case START_FETCH:
            return {
                ...state,
                fetching: true,
            };
        case RECEIVE_NOTES:
            const { notes, additive } = action;
            return {
                ...state,
                fetching: false,
                notes: additive ? [ ...state.notes, ...notes ] : notes
            };
        default:
            return state;
    }
}

export default data;