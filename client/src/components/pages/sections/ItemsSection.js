import React from 'react';
import { connect } from 'react-redux';
import { PageSection } from 'components/layout';
import { Card, CardTitle } from 'components/ui';
import ItemBlock from 'components/items/ItemBlock';
import { openModal } from 'actions/ui';
import modalTypes from 'constants/modalTypes';

const ItemsSection = ( { fetching, items, dispatch } ) => {
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

// Get items from state, or from props, depending on if a categoryId is passed to component
const getItems = ( props, items, categories ) => {
    if ( props.categoryId ) {
        const category = categories.find( cat => cat._id === props.categoryId );
        return category ? items.filter( item => item.category === category._id ) : [];
    }
    
    if ( props.items === 'all' ) {
        return items;
    }

    return props.items || [];
}

const mapStateToProps = ( { data: { categories, items, fetching } }, props ) => {
    const childItems = getItems( props, items, categories );
    const sortedItems = childItems.sort( ( a, b ) => new Date( a.status.due ) - new Date( b.status.due ) );

    return {
        items: sortedItems,
        fetching,
    };
};


export default connect( mapStateToProps )( ItemsSection );