import React from 'react';
import { compose, lifecycle } from 'recompose';
import { useSelector, useDispatch } from 'react-redux';
import { Page } from 'components/layout';
import { Card, CardLink, CardTitle, CardIconCorner, CardStatus, CardContainer, AddCard } from 'components/ui';
import { fetchData, createData } from 'actions/data';
import { getIsFetching, getAllCategories } from 'selectors/data';

const CategoryPage = () => {
    const dispatch = useDispatch();
    const fetching = useSelector( getIsFetching );
    const categories = useSelector( getAllCategories );

    const fields = [
        { name: 'name', type: 'text', placeholder: 'Name' },
        { name: 'icon', type: 'text', placeholder: 'Icon' },
        { name: 'Add', type: 'button', onClick: fields => dispatch( createData( fields, 'categories' ) ) },
    ];
    
    return (
        <Page id="main-content" header="Categories">
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
                                    { category.name }
                                </CardTitle>
                                <CardIconCorner icon={ { icon: 'thumbs-up' } } />
                                <CardStatus>
                                    NEXT TASK: Some task name
                                </CardStatus>
                            </CardLink>
                        );
                    })
                }
            </CardContainer>
        </Page>
    );
};

const enhance = compose(
    lifecycle({
        componentDidMount() {
            const dispatch = useDispatch();

            dispatch( fetchData( 'categories' ) );
        },
    })
);

export default enhance(CategoryPage);