import React from 'react';
import classNames from 'classnames';
import { Icon } from 'components/ui';

const optional = (prop, key) => {
    if ( typeof prop === 'object' ) {
        return prop;
    }
    
    return prop ? { [ key ]: prop } : {};
}

const Page = ({ children, header, id, bigHeader = false, icon = false }) => {
    const optionalProperties = {
        ...optional(id, 'id'),
    };

    return (
        <div className="content-container" { ...optionalProperties }>
            {
                !!header && (
                    <div className={ classNames( 'page-header', { big: !!bigHeader } ) }>
                        { icon && <Icon { ...icon } /> }
                        { header }
                    </div>
                )
            }
            { children }
        </div>
    );
};

export default Page;