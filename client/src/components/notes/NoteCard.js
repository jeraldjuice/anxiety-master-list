import React from 'react';
import { compose, withState, withHandlers } from 'recompose';
import moment from 'moment';
import { Card, CardBody, CardStatus } from 'components/ui';

const CardOverlay = () => {
    return (
        <div className="card-overlay">
            <div className="card-overlay-content confirm-delete">
                <div className="card-overlay-message">
                    Are you sure you want to delete?
                </div>
                <div className="card-overlay-toolbar">
                    <button className="danger">I'm sure</button>
                    <button className="outline">Cancel</button>
                </div>
            </div>
        </div>
    );
}

const NoteCard = ( { note, showOverlay, toggleOverlay } ) => {
    const optional = showOverlay ? { overlay: CardOverlay } : {};

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
        <Card className="note" icon={ { icon: 'sticky-note' } } toolbar={ toolbarButtons } { ...optional } >
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
    withState( 'showOverlay', 'toggleOverlay', false ),
    withHandlers({
        toggleOverlay: ( { showOverlay, toggleOverlay } ) => () => {
            toggleOverlay( !showOverlay );
        }
    })
);

export default enhance( NoteCard );