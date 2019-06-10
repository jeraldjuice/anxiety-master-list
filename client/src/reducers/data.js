import {
    START_FETCH,
    RECEIVE_DATA,
    RECEIVE_ONE,
    DELETE_BY_ID
} from 'actions/data';

const initialState = {
    fetching: false,
    notes: [],
    categories: []
};

function data( state = initialState, action ) {
    switch( action.type ) {
        case START_FETCH:
            return {
                ...state,
                fetching: true,
            };
        case RECEIVE_DATA:
            return {
                ...state,
                fetching: false,
                ...action.data
            };
        case RECEIVE_ONE:
            return {
                ...state,
                fetching: false,
                [ action.dataType ]: [ action.data, ...state[ action.dataType ] ]
            };
        case DELETE_BY_ID:
            return {
                ...state,
                [ action.dataType ]: state[ action.dataType ].filter( data => data._id !== action.id )
            };
        default:
            return state;
    }
}

export default data;