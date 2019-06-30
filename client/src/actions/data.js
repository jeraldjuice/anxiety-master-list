import { appier } from 'utils';

export const START_FETCH = 'DATA.START_FETCH';

export function startFetch() {
    return {
        type: START_FETCH,
    };
}

export const RECEIVE_DATA = 'DATA.RECEIVE';

export function receiveData( data ) {
    return {
        type: RECEIVE_DATA,
        data,
    };
}

export function fetchData( dataType ) {
    return dispatch => {
        dispatch( startFetch() );

        return appier
            .get( dataType )
            .then( data => dispatch( receiveData( data ) ) );
    }
}

export function fetchAll() {
    return dispatch => {
        dispatch( startFetch() );

        return appier
            .get( 'categories/all' )
            .then( data => dispatch( receiveData( data ) ) );
    }
}

export const RECEIVE_ONE = 'DATA.RECEIVE_ONE';

export function receiveOne( data, dataType ) {
    return {
        type: RECEIVE_ONE,
        data,
        dataType,
    };
}

export const UPDATE_ONE = 'DATA.UPDATE_ONE';

export function updateOne( data, dataType ) {
    return {
        type: UPDATE_ONE,
        data,
        dataType,
    };
}

export function fetchById( id, dataType ) {
    return dispatch => {
        dispatch( startFetch() );

        return appier
            .get( `${ dataType }/${ id }` )
            .then( data => dispatch( receiveData( data ) ) );
    }
}

export function createData( properties, dataType ) {
    return dispatch => {
        return appier
            .post( `${ dataType }/new`, properties )
            .then( data => dispatch( receiveData( data ) ) );
    }
}

export function updateItem( properties, itemId ) {
    return dispatch => {
        return appier
            .post( `items/${ itemId }`, properties )
            .then( data => dispatch( receiveData( data ) ) );
    }
}

export function markComplete( itemId ) {
    return dispatch => {
        return appier
            .post( `items/${ itemId }`, { status: 'completed' } )
            .then( data => dispatch( receiveData( data ) ) );
    }
}

export const DELETE_BY_ID = 'DATA.DELETE_BY_ID';

export function deleteById( id, dataType ) {
    return dispatch => {
        return appier
            .post( `${ dataType }/delete`, { id } )
            .then( () =>  
                dispatch({
                    type: DELETE_BY_ID,
                    id,
                    dataType,
                })
            );
    }
}