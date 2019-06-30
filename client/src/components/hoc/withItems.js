import { connect } from 'react-redux';

// Get items from state, or from props, depending on if a categoryId is passed to component
const getItems = ( props, items, categories ) => {
    if ( props.category && props.category._id ) {
        const category = categories.find( cat => cat._id === props.category._id );
        return category ? items.filter( item => item.category === category._id ) : [];
    }

    return props.items || [];
}

const mapStateToProps = ( { data: { categories, items } }, props ) => {
    const childItems = getItems( props, items, categories );
    const sortedItems = childItems.sort( ( a, b ) => new Date( a.status.due ) <= new Date( b.status.due ) );

    return {
        items: sortedItems || [],
    };
};


const withItems = Component => connect( mapStateToProps )( Component );

export default withItems;