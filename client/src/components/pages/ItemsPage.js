import React from 'react';
import { compose, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import { Page } from 'components/layout';
import { Card, CardLink, CardTitle, CardIconCorner, CardStatus, CardContainer, AddCard } from 'components/ui';
import { fetchData, createData } from 'actions/data';

const ItemsPage = ( { categories = [], fetching, dispatch } ) => {
    const fields = [
        { name: 'name', type: 'text', placeholder: 'Name' },
        { name: 'icon', type: 'text', placeholder: 'Icon' },
        { name: 'Add', type: 'button', onClick: fields => dispatch( createData( fields , 'categories' ) ) }
    ];
    
    return (
        <Page id="main-content" header="Tasks">
            <CardContainer>
                <AddCard fields={ fields } />
                { fetching ? 
                    <Card>
                        <CardTitle icon={ { icon: 'spinner', solid: true } }>
                            Loading...
                        </CardTitle>
                    </Card>
                    : categories.map( category => {
                        return (
                            <CardLink to={ `/categories/${ category._id }` } key={ category._id }>
                                <CardTitle icon={ { iconString: category.icon } }>
                                    {category.name}
                                </CardTitle>
                                <CardIconCorner icon={ { icon: 'thumbs-up' } } />
                                <CardStatus>
                                    { '3' } tasks upcoming
                                </CardStatus>
                            </CardLink>
                        );
                    })
                }
            </CardContainer>
        </Page>
    );
};

const mapStateToProps = ( { data: { categories, fetching } } ) => {
    return {
        categories,
        fetching,
    };
};

const enhance = compose(
    connect( mapStateToProps ),
    lifecycle({
        componentDidMount() {
            this.props.dispatch( fetchData( 'categories' ) );
        }
    })
);

export default enhance( ItemsPage );