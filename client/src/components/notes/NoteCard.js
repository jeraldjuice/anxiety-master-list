import React from 'react';
import { connect } from 'react-redux';
import { compose, withState, withHandlers } from 'recompose';
import moment from 'moment';
import { Card, CardBody, CardStatus } from 'components/ui';
import { deleteById } from 'actions/data';

const CardOverlay = ( { deleteNote, closeOverlay } ) => {
    return (
        <div className="card-overlay">
            <div className="card-overlay-content confirm-delete">
                <div className="card-overlay-message">
                    Are you sure you want to delete?
                </div>
                <div className="card-overlay-toolbar">
                    <button onClick={ deleteNote } className="danger">I'm sure</button>
                    <button onClick={ closeOverlay } className="outline">Cancel</button>
                </div>
            </div>
        </div>
    );
}

const NoteCard = ( { note, showOverlay, toggleOverlay, deleteNote } ) => {
    const toolbarButtons = [
        {
            icon: { icon: 'folder-open', solid: true },
            onClick: () => false
        },
        {
            icon: { icon: 'marker', solid: true },
            onClick: () => false
        },
        {
            icon: { icon: 'trash-alt', solid: true },
            onClick: () => toggleOverlay()
        },
    ];

    return (
        <Card className="note" icon={ { icon: 'sticky-note' } } toolbar={ toolbarButtons }>
            { showOverlay && <CardOverlay closeOverlay={ toggleOverlay } deleteNote={ () => deleteNote( note._id ) } /> }
            <CardBody>
                { note.contents } 
            </CardBody>
            <CardStatus>
                { moment(note.created).format("dddd, MMMM Do YYYY") } 
            </CardStatus>
        </Card>
    );
};

const enhance = compose(
    connect(),
    withState( 'showOverlay', 'toggleOverlay', false ),
    withHandlers({
        toggleOverlay: ( { showOverlay, toggleOverlay } ) => () => {
            toggleOverlay( !showOverlay );
        },
        deleteNote: ( { dispatch, toggleOverlay } ) => noteId => {
            dispatch( deleteById( noteId, 'notes' ) );
            toggleOverlay( false );
        }
    })
);

export default enhance( NoteCard );