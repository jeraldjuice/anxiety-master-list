import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PageSection } from 'components/layout';
import { Card, CardTitle } from 'components/ui';
import ItemBlock from 'components/items/ItemBlock';
import { openModal } from 'actions/ui';
import modalTypes from 'constants/modalTypes';
import { getIsFetching, getAllItems, getItemsByParent } from 'selectors/data';

const ItemsSection = props => {
    const dispatch = useDispatch();
    const fetching = useSelector( getIsFetching );

    const items = props.categoryId ? useSelector( getItemsByParent( props.categoryId ) ) 
            : props.items ? props.items 
                : useSelector( getAllItems );

    if ( ! items || items.length < 1 ) {
        return (
            <PageSection>
                No items found.
            </PageSection>
        );
    }

    return (
        <PageSection header="Items">
            <div className="block-container">
                { fetching ? 
                    <Card>
                        <CardTitle icon={ { icon: 'spinner', solid: true } }>
                            Loading...
                        </CardTitle>
                    </Card>
                    : items.map( item => <ItemBlock key={ item._id } onClick={ () => dispatch( openModal( modalTypes.item, item._id ) ) } item={ item } /> )
                }
            </div>
        </PageSection>
    );
};

export default ItemsSection;