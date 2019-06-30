import React, { useState } from 'react';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, ModalHeader, ModalToolbar } from 'components/modals';
import { Icon } from 'components/ui';
import Form from 'components/form/Form';
import { clearModals } from 'actions/ui';
import { updateItem } from 'actions/data';
import { itemUtils } from 'utils';
import { getModalData } from 'selectors/ui';
import { getItem } from 'selectors/data';

const getInitValues = task => {
    if ( !task || !task.status.due ) {
        return {};
    }

    return { rootTask: task.status };
};

const generateTaskInfo = ( { status } ) => {
    return <>
        { status.hasOwnProperty( 'due' ) && !!status.due &&
            <div className="info-row">
                <span className="accent">Next due on</span> { moment( status.due ).format("dddd, MMMM Do") }
            </div>
        }
        <div className="info-row">
            <span className="accent">Needs to be done</span> { itemUtils.needsToBeDone( status ) }
        </div>
        { status.hasOwnProperty( 'lastCompleted' ) &&
            <div className="info-row">
                <span className="accent">Last completed</span> { moment( status.lastCompleted ).format("dddd, MMMM Do") }
            </div> 
        }
    </>;
}

// @TODO this needs to mark when it's due, if needed

const ItemDetailsModal = () => {
    const dispatch = useDispatch();
    const [ mode, setMode ] = useState( 'view' );

    const itemId = useSelector( getModalData );
    const item = itemId && useSelector( getItem( itemId ) );

    const editFields = [
        { name: 'icon', type: 'iconPicker', placeholder: 'Item icon' },
        { name: 'name', type: 'text', placeholder: 'Item name' },
        { name: 'status', type: 'datePicker', removable: true, beginRemoved: true },
        { name: 'Save', type: 'button', onClick: fields => {
            dispatch( updateItem( fields, item._id ) );
            setMode( 'view' );
        }},
    ];

    const initValues = {
        name: item.name,
        icon: item.icon,
        ...getInitValues( item ),
    };
    
    return (
        <Modal closeModal={() => dispatch( clearModals() )}>
            <ModalToolbar>
                {
                    mode === 'edit' ? (
                        <div className="action-button" onClick={ () => setMode( 'view' ) }>
                            <Icon iconString="fas fa-eye" />
                        </div>
                    )
                    : (
                        <div className="action-button" onClick={ () => setMode( 'edit' ) }>
                            <Icon iconString="fas fa-marker" />
                        </div>
                    )
                }
            </ModalToolbar>
            <ModalHeader>
                Item Details
            </ModalHeader>
            {
                mode === 'edit' ? <Form className="icon-form" fields={ editFields } initValues={ initValues } />
                :
                    <>
                        <h1>
                            <Icon iconString={ item.icon } />
                            { item.name }
                        </h1>
                        { item && generateTaskInfo( item ) }
                    </>
            }
        </Modal>
    );
};

export default ItemDetailsModal;