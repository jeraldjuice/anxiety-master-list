import React from 'react';

const getWeight = ({ solid, light }) => {
    if ( solid ) {
        return 's';
    }

    if ( light ) {
        return 'l';
    }

    return 'r';
};

const Icon = ({ icon, iconString = false, ...props }) => {
    return (
        <i className={ iconString || `fa${getWeight(props)} fa-${ icon }`}></i>
    );
};

export default Icon;