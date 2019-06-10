import { appier } from 'utils';

export const START_FETCH = 'DATA.START_FETCH';

export function startFetch() {
    return {
        type: START_FETCH,
    };
}

export const RECEIVE_NOTES = 'DATA.RECEIVE_NOTES';

export function receiveNotes(notes, additive = false) {
    return {
        type: RECEIVE_NOTES,
        notes,
        additive
    };
}

export function fetchNotes() {
    return dispatch => {
        dispatch(startFetch());

        return appier
            .get('notes')
            .then( notes =>  
                dispatch({
                    type: RECEIVE_NOTES,
                    notes
                })
            );
    }
}

export function createNote( contents ) {
    return dispatch => {
        return appier
            .post('notes/new', { contents })
            .then( note =>  
                dispatch({
                    type: RECEIVE_NOTES,
                    notes: [ note ],
                    additive: true
                })
            );
    }
}

export const REMOVE_NOTE = 'DATA.REMOVE_NOTE';

export function deleteNote( noteId ) {
    return dispatch => {
        return appier
            .post('notes/delete', { id: noteId })
            .then( () =>  
                dispatch({
                    type: REMOVE_NOTE,
                    noteId
                })
            );
    }
}