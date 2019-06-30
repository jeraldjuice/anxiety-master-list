import React from 'react';
import moment from 'moment';
import { Icon } from 'components/ui';

const getLine = ( fullness, label ) => {
    return <>
        <Icon icon={ `battery-${ fullness }` } solid />
        { label }
    </>;
}

const ItemStatusLine = ( { dueDateClass, due } ) => {
    const dynamicTime = moment( due ).calendar(null, {
        sameDay: '[Today]',
        nextDay: '[Tomorrow]',
        nextWeek: 'dddd',
        lastDay: '[Overdue]',
        lastWeek: '[Overdue]',
        sameElse: function( now ) {
            const diffAmount = this.diff( now, 'days' );
            if ( diffAmount < 0 ) {
                return '[Overdue]';
            }

            if ( diffAmount <= 14 ) {
                return '[Next] dddd';
            }

            return 'MMMM Do';
          },
    });

    switch( dynamicTime.split(" ")[ 0 ] ) {
        case 'Today':
        case 'Overdue':
            return getLine( 'empty', dynamicTime );
        case 'Tomorrow':
            return getLine( 'quarter', dynamicTime );
        case 'Next':
        case 'Monday':
        case 'Tuesday':
        case 'Wednesday':
        case 'Thursday':
        case 'Friday':
        case 'Saturday':
        case 'Sunday':
            return getLine( 'half', dynamicTime );
        default:
            return getLine( 'three-quarters', dynamicTime );
    }
};

export default ItemStatusLine;