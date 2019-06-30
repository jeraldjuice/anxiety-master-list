import React from 'react';
import { useDispatch } from 'react-redux';
import { Icon } from 'components/ui';
import classNames from 'classnames';
import { markComplete } from 'actions/data';
import { itemUtils } from 'utils';
import ItemStatusLine from './ItemStatusLine';

const ItemBlock = ( { item, onClick } ) => {
    const dispatch = useDispatch();
    
    if ( !!item.status.due ) {
        const dueDateClass = itemUtils.dueDateClass( item );
        return (
            <div className={ classNames( 'block', 'item', dueDateClass ) } onClick={ onClick }>
                <div className="block-tab" onClick={ e => {
                    e.stopPropagation();
                    dispatch( markComplete( item._id ) );
                } }>
                    { 
                        true ? <Icon iconString="fas fa-check" /> : <Icon iconString="fas fa-ban" />
                    }
                </div>
                <Icon iconString={ item.icon } />
                { item.name }
                <div className="when-tab">
                    <ItemStatusLine due={ item.status.due } />
                </div>
            </div>
        );
    }
    
    return (
        <div className={ classNames( 'block', 'item', 'no-task' ) } onClick={ onClick }>
            <Icon iconString={ item.icon } />
            { item.name }
        </div>
    );
};

export default ItemBlock;
