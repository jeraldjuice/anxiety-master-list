import React from 'react';
import classNames from 'classnames';

const getWeight = ({ solid, light }) => {
    if ( solid ) {
        return 's';
    }

    if ( light ) {
        return 'l';
    }

    return 'r';
};

const Icon = ({ className, icon, iconString = false, ...props }) => {
    return (
        <i className={ classNames( iconString || `fa${getWeight(props)} fa-${ icon }`, className ) }></i>
    );
};

export const LabeledIcon = ({ label, ...props }) => {
    return <>
        <Icon { ...props } />{ label }
    </>;
};

export const IconButton = ( { onClick, className, label, ...props } ) => {
    return (
        <div className={ classNames( 'icon-button', className, { labeled: label } ) } onClick={ onClick }>
            {
                label ? <LabeledIcon label={ label } { ...props } /> : <Icon { ...props } />
            }
        </div>
    );
};

export default Icon;