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
        data
    };
}

export function fetchData( dataType ) {
    return dispatch => {
        dispatch( startFetch() );

        return appier
            .get( dataType )
            .then( data =>  
                dispatch({
                    type: RECEIVE_DATA,
                    data: { [ dataType ] : data }
                })
            );
    }
}

export const RECEIVE_ONE = 'DATA.RECEIVE_ONE';

export function receiveOne( data, dataType ) {
    return {
        type: RECEIVE_ONE,
        data,
        dataType
    };
}

export function createData( properties, dataType ) {
    return dispatch => {
        return appier
            .post( `${ dataType }/new`, properties )
            .then( data => dispatch( receiveOne( data, dataType ) ) );
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
                    dataType
                })
            );
    }
}