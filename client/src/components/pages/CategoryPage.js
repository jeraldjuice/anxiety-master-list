import React from 'react';
import { compose, lifecycle, } from 'recompose';
import { connect } from 'react-redux';
import { Page } from 'components/layout';
import { Card, CardTitle, CardIconCorner, CardStatus, CardContainer } from 'components/ui';
import { fetchData, createData } from 'actions/data';

const categories = [
    {
        id: 1,
        name: 'Money',
        iconType: {
            icon: 'credit-card',
        },
        status: 'okay',
        upcoming: {
            nextWeek: 3
        }
    },
    {
        id: 2,
        name: 'Health',
        iconType: {
            icon: 'heartbeat',
            solid: true,
        },
        status: 'okay',
        upcoming: {
            nextWeek: 3
        }
    },
    {
        id: 3,
        name: 'Chores',
        iconType: {
            icon: 'spray-can',
            solid: true,
        },
        status: 'okay',
        upcoming: {
            nextWeek: 3
        }
    }
];

const CategoryPage = () => {
    return (
        <Page id="main-content" header="Categories">
            <CardContainer>
                { categories.map(category => {
                    return (
                        <Card key={ category.id }>
                            <CardTitle icon={ category.iconType }>
                                {category.name}
                            </CardTitle>
                            <CardIconCorner icon={{ icon: 'thumbs-up' }} />
                            <CardStatus>
                                {category.upcoming.nextWeek} tasks upcoming
                            </CardStatus>
                        </Card>
                    );
                }) }
            </CardContainer>
        </Page>
    );
};

const mapStateToProps = ( { data: { categories, fetching } } ) => {
    return {
        categories,
        fetching
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

export default enhance(CategoryPage);