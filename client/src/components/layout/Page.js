import React from 'react';
import { Icon } from 'components/ui';

const optional = (prop, key) => {
    if ( typeof prop === 'object' ) {
        return prop;
    }
    
    return prop ? { [ key ]: prop } : {};
}

const Page = ({ children, header, id, icon = false }) => {
    const optionalProperties = {
        ...optional(id, 'id')
    };

    return (
        <div className="content-container" { ...optionalProperties }>
            <div className="page-header">
                { icon && <Icon { ...icon } /> }
                { header }
            </div>
            { children }
        </div>
    );
};

export default Page;