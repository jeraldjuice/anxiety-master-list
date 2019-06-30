import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Page } from 'components/layout';
import { Card, CardTitle, CardContainer, AddCard } from 'components/ui';
import NoteCard from 'components/notes/NoteCard';
import { fetchData, createData } from 'actions/data';
import { getAllNotes, getIsFetching } from 'selectors/data';

const NotesPage = () => {
    const dispatch = useDispatch();
    const notes = useSelector( getAllNotes );
    const fetching = useSelector( getIsFetching );

    useEffect( () => {
        dispatch( fetchData( 'notes' ) );
    }, [] );

    const fields = [
        { name: 'contents', type: 'textarea', placeholder: 'Whatcha thinking?' },
        { name: 'Add', type: 'button', onClick: fields => dispatch( createData( fields, 'notes' ) ) },
    ];

    return (
        <Page id="main-content" header="Notes">
            <CardContainer>
                <AddCard fields={ fields } />
                { fetching ? 
                    <Card>
                        <CardTitle icon={ { icon: 'spinner', solid: true } }>
                            Loading...
                        </CardTitle>
                    </Card>
                    : notes.map(note => <NoteCard key={ note._id } note={ note } />)
                }
            </CardContainer>
        </Page>
    );
};

export default NotesPage;