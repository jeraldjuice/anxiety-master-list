import React from 'react';
import { compose, lifecycle, } from 'recompose';
import { connect } from 'react-redux';
import { Page } from 'components/layout';
import { Card, CardTitle, CardContainer } from 'components/ui';
import NoteCard from 'components/notes/NoteCard';
import { fetchNotes } from 'actions/data';

const NotesPage = ( { notes = [], fetching } ) => {
    return (
        <Page id="main-content" header="Notes">
            <CardContainer>
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
        fetching
    };
};

const enhance = compose(
    connect(mapStateToProps),
    lifecycle({
        componentDidMount() {
            this.props.dispatch(fetchNotes());
        }
    })
);

export default enhance(NotesPage);