import React from 'react';
import { Icon } from 'components/ui';
import { connect } from 'react-redux';
import { openModal } from 'actions/ui';
import modalTypes from 'constants/modalTypes';

const AddButton = ( { dispatch } ) => {
    return (
        <div id="add-button" onClick={ () => dispatch(openModal(modalTypes.noteAdd)) }>
            <Icon icon="plus" solid />
        </div>
    );
}

export default connect()(AddButton);