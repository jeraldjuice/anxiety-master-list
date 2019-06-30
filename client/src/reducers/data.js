import {
    START_FETCH,
    RECEIVE_DATA,
    RECEIVE_ONE,
    UPDATE_ONE,
    DELETE_BY_ID,
} from 'actions/data';

const initialState = {
    fetching: false,
    notes: [],
    categories: [],
    items: [],
};

// @ TODO -> this doesn't work. see: marking an item as completed
const addOrReplace = ( arr, item ) => {
    const idx = arr.findIndex( e => e._id === item._id );

    if (idx === -1) {
        arr.push( item );
    } else {
        arr[ idx ] = item;
    }

    return arr;
}

function data( state = initialState, action ) {
    switch( action.type ) {
        case START_FETCH:
            return {
                ...state,
                fetching: true,
            };
        case RECEIVE_DATA:
            const { deleted, ...actionData } = action.data;

            const newState = {
                ...state,
                fetching: false,
            };

            const dataTypes = Object.keys( actionData );

            for ( let x = 0; x < dataTypes.length; x++ ) {
                const type = dataTypes[ x ];

                newState[ type ] = actionData[ type ].reduce( ( acc, item ) => {
                    return addOrReplace( acc, item );
                }, state[ type ]);
            }

            if ( deleted ) {
                const deletedTypes = Object.keys( deleted );

                for ( let x = 0; x < deletedTypes.length; x++ ) {
                    const type = deletedTypes[ x ];
    
                    newState[ type ] = newState[ type ].filter( ( { _id } ) => ! deleted[ type ].some( i => i._id === _id ) );
                }
            }

            return newState;
        case RECEIVE_ONE:
            return {
                ...state,
                fetching: false,
                [ action.dataType ]: [ action.data, ...state[ action.dataType ] ],
            };
        case UPDATE_ONE:
            return {
                ...state,
                [ action.dataType ]: state[ action.dataType ].map( item => {
                    if ( item._id === action.data._id ) {
                        return action.data;
                    }

                    return item;
                } ),
            };
        case DELETE_BY_ID:
            return {
                ...state,
                [ action.dataType ]: state[ action.dataType ].filter( data => data._id !== action.id ),
            };
        default:
            return state;
    }
}

export default data;