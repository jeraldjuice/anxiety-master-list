import React from 'react';
import { useDispatch } from 'react-redux';
import { Card, CardBody, CardStatus, Icon, CardIconCorner } from 'components/ui';
import Form from 'components/form/Form';
import { updateItem } from 'actions/data';
import classNames from 'classnames';
import { itemUtils } from 'utils';

const { hasExpiredStatus, itemStatuses, statusIcons } = itemUtils;

// @TODO add 'repeat' support for item expiration

const itemStatusOpts = Object.keys( itemStatuses ).map( key => ({ value: key, label: itemStatuses[key] }) );

const getInitValues = item => {
    const initValues = {};

    if ( item.hasOwnProperty( 'status' ) && item.status.hasOwnProperty( 'id' ) ) {
        const { status } = item;
        initValues.status = status.id;

        if ( status.hasOwnProperty( 'expiration' ) ) {
            initValues.expiration = {};

            if ( status.expiration.hasOwnProperty( 'none' ) ) {
                initValues.expiration.date = status.expiration.date;
            }

            if ( status.expiration.hasOwnProperty( 'repeatType' ) ) {
                initValues.expiration.repeat = status.expiration.repeatType;
            }
        }
    }

    return initValues;
};

const CardOverlay = ( { closeOverlay, dispatch, item } ) => {
    // @TODO be able to remove expiration date
    const fields = [
        { name: 'status', type: 'dropdown', placeholder: 'Name', options: itemStatusOpts },
        { name: 'Expires on' , type: 'label' },
        { name: 'expiration', type: 'datePicker' },
        { name: 'Save', sm: true, invert: true, type: 'button', onClick: fields => { 
            dispatch( updateItem( fields, item._id ) );
            closeOverlay();
        } }
    ];

    return (
        <div className="card-overlay">
            <div onClick={ closeOverlay } className="card-overlay-close-btn">
                <Icon iconString="fas fa-times-circle" />
            </div>
            <div className="card-overlay-content confirm-delete">
                <div className="card-overlay-message">
                    Change status?
                    <Form fields={ fields } initValues={ getInitValues( item ) } />
                </div>
            </div>
        </div>
    );
}

const Status = ( { status, isExpired } ) => {
    if ( isExpired ) {
        return <CardIconCorner icon={ { iconString: 'fas fa-times-circle' } } />;
    }

    return <CardIconCorner icon={ { iconString: statusIcons[ status.id ] } } />;
};

const ItemCard = ( { item, showOverlay, toggleOverlay } ) => {
    const dispatch = useDispatch();
    const isExpired = hasExpiredStatus( item.status );

    const toolbarButtons = [
        // Change status
        {
            icon: { icon: 'toggle-on', solid: true },
            onClick: () => toggleOverlay()
        },
        // Edit -> which will include moving/deleting actions
        {
            icon: { icon: 'marker', solid: true },
            onClick: () => false
        },
    ];

    // @TODO card status should be child task status FIRST, or, if there is no pending task, show item status
    return (
        <Card key={ item._id } className={ classNames( 'item', `status-${item.status.id}`, { expired: isExpired } ) } icon={ { icon: 'sticky-note' } } toolbar={ toolbarButtons }>
            { showOverlay && <CardOverlay closeOverlay={ toggleOverlay } dispatch={ dispatch } item={ item } /> }
            <Status status={ item.status } isExpired={ isExpired } />
            <CardBody>
                { item.name } 
            </CardBody>
            <CardStatus>
                No upcoming tasks (@TODO: SHOW NEXT TASK)
            </CardStatus>
        </Card>
    );
};

const enhance = component => component;

export default enhance( ItemCard );