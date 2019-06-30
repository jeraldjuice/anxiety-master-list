import React from 'react';
import { compose, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import { Page } from 'components/layout';
import { Card, CardTitle, CardContainer, AddCard } from 'components/ui';
import NoteCard from 'components/notes/NoteCard';
import { fetchData, createData } from 'actions/data';

const NotesPage = ( { dispatch, notes = [], fetching } ) => {
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

const mapStateToProps = ( { data: { notes, fetching } } ) => {
    return {
        notes,
        fetching,
    };
};

const enhance = compose(
    connect( mapStateToProps ),
    lifecycle({
        componentDidMount() {
            this.props.dispatch( fetchData( 'notes' ) );
        },
    })
);

export default enhance(NotesPage);