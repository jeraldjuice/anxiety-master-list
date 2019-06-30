import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
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
                    <button onClick={ deleteNote } className="danger">{ 'I\'m sure' }</button>
                    <button onClick={ closeOverlay } className="outline">Cancel</button>
                </div>
            </div>
        </div>
    );
}

const NoteCard = ( { note } ) => {
    const dispatch = useDispatch();
    const [ showOverlay, toggleOverlay ] = useState( false );

    const deleteNote = () => {
        dispatch( deleteById( note._id, 'notes' ) );
        toggleOverlay( false );
    };

    const toolbarButtons = [
        {
            icon: { icon: 'folder-open', solid: true },
            onClick: () => false,
        },
        {
            icon: { icon: 'marker', solid: true },
            onClick: () => false,
        },
        {
            icon: { icon: 'trash-alt', solid: true },
            onClick: () => toggleOverlay( true ),
        },
    ];

    return (
        <Card className="note" icon={ { icon: 'sticky-note' } } toolbar={ toolbarButtons } smallText>
            { showOverlay && <CardOverlay closeOverlay={ () => toggleOverlay( false ) } deleteNote={ deleteNote } /> }
            <CardBody>
                { note.contents } 
            </CardBody>
            <CardStatus>
                { moment(note.created).format("dddd, MMMM Do YYYY") } 
            </CardStatus>
        </Card>
    );
};

export default NoteCard;