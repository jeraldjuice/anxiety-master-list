export const getIsFetching = ( { data: { fetching } } ) => fetching;

// ======= Items

const sortByDueDate = items => items.sort( ( a, b ) => new Date( a.status.due ) - new Date( b.status.due ) );

export const getItem = itemId => ( { data: { items } } ) => items.find( item => item._id === itemId );

export const getAllItems = ( { data: { items } } ) => sortByDueDate( items );

export const getItemsByParent = parentId => ( { data: { items, categories } } ) => {
    const category = categories.find( cat => cat._id === parentId );
    return category ? sortByDueDate( items.filter( item => item.category === category._id ) ) : [];
}

// ======= Notes

export const getAllNotes = ( { data: { notes } } ) => notes;

// ======= Categories

export const getAllCategories = ( { data: { categories } } ) => categories;

export const getCategory = categoryId => ( { data: { categories } } ) => categories.find( cat => cat._id === categoryId );