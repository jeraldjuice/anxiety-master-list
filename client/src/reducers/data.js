import {
    START_FETCH,
    RECEIVE_NOTES,
    REMOVE_NOTE
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
                notes: additive ? [ ...notes, ...state.notes ] : notes
            };
        case REMOVE_NOTE:
            const { noteId } = action;
            return {
                ...state,
                notes: state.notes.filter( note => note._id !== noteId )
            };
        default:
            return state;
    }
}

export default data;