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

const Icon = ({ icon, ...props }) => {
    return (
        <i className={`fa${getWeight(props)} fa-${ icon }`}></i>
    );
};

export default Icon;