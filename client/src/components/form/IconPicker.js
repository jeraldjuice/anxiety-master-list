import React from 'react';
import { withState, withHandlers, compose } from 'recompose';
import { Icon } from 'components/ui';
import { iconList } from 'utils';

const iconCat = Object.keys( iconList );
const allIcons = iconCat.reduce( ( acc, cat ) => [ ...acc, ...iconList[ cat ] ], [] );

const IconPicker = ( { open, setOpen, value, generateIconButton, search, updateSearch, filteredItems } ) => {
    return (
        <div className="icon-picker">
            <div className="picker-toggle" onClick={ () => setOpen( true ) }>
                { value ? <Icon iconString={ value } /> : <Icon iconString="fas fa-icons" /> }
            </div>
            {
                open && (
                    <div className="picker">
                        <div onClick={ () => setOpen( false ) } className="card-overlay-close-btn">
                            <Icon iconString="fas fa-times-circle" />
                        </div>
                        <div className="picker-search">
                            <input type="text" value={ search } onChange={ ( { target: { value } } ) => updateSearch( value ) } />
                        </div>
                        <div className="picker-body">
                            {   search.length > 0 ?
                                <>
                                    <div className="icon-cat-label">
                                        { search }
                                    </div>
                                    { filteredItems().map( generateIconButton ) }
                                </>
                                : 
                                iconCat.map( category => {
                                    return <>
                                        <div className="icon-cat-label">
                                            { category }
                                        </div>
                                        { iconList[ category ].map( generateIconButton ) }
                                    </>;
                                } )
                            }
                        </div>
                    </div>
                )
            }
        </div>
    );
}

const enhance = compose(
    withState( 'open', 'setOpen', false ),
    withState( 'search', 'setSearch', '' ),
    withHandlers({
        generateIconButton: ( { onChange, setOpen } ) => ( iconClass, idx ) => {
            return (
                <div key={ iconClass + idx } className="icon-btn" onClick={ () => {
                    onChange( iconClass );
                    setOpen( false );
                } }>
                    <Icon iconString={ `fa-fw ${ iconClass }` } />
                </div>
            );
        },
        updateSearch: ( { setSearch } ) => term => {
            setSearch( term.trim() );
        },
        filteredItems: ( { search } ) => () => {
            return allIcons.filter( ico => ico.indexOf( search ) !== -1);
        },
    })
);

export default enhance( IconPicker );