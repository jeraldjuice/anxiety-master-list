import React from 'react';
import moment from 'moment';
import { Modal, ModalHeader, ModalToolbar } from 'components/modals';
import { connect } from 'react-redux';
import { clearModals } from 'actions/ui';
import { Icon } from 'components/ui';
import { compose, withState, withHandlers } from 'recompose';
import { updateItem } from 'actions/data';
import Form from 'components/form/Form';
import { itemUtils } from 'utils';

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

const ItemDetailsModal = ( { dispatch, mode, setMode, renderView } ) => {
    
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
            { renderView() }
        </Modal>
    );
};

const mapStateToProps = ( { ui: { modalData: itemId }, data: { items } } ) => {
    return { 
        item: items.find( i => i._id === itemId ),
    } 
};

const enhance = compose(
    connect( mapStateToProps ),
    withState( 'mode', 'setMode', 'view' ),
    withHandlers({
        renderView: ( { mode, item, dispatch, setMode } ) => () => {
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

            switch( mode ) {
                case 'edit':
                    return (
                        <Form className="icon-form" fields={ editFields } initValues={ initValues } />
                    );
                case 'view':
                default:
                    return <>
                        <h1>
                            <Icon iconString={ item.icon } />
                            { item.name }
                        </h1>
                        { item && generateTaskInfo( item ) }
                    </>;
            }
        }
    })
);

export default enhance( ItemDetailsModal );