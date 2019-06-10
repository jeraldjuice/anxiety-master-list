import React from 'react';
import { Icon } from 'components/ui';

export const CardTitle = ({ children, icon = false }) => {
    return (
        <div className="category-title">
            { icon && <Icon { ...icon } /> }
            { children }
        </div>
    );
}

export const CardBody = ({ children }) => {
    return (
        <div className="card-body">
            { children }
        </div>
    );
}

export const CardStatus = ({ children }) => {
    return (
        <div className="card-status-bar">
            { children }
        </div>
    );
}

export const CardCorner = ({ children }) => {
    return (
        <div className="status-icon">
            { children }
        </div>
    );
}

export const CardIconCorner = ({ icon }) => {
    return (
        <CardCorner>
            <Icon {...icon} />
        </CardCorner>
    );
}

export const CardToolbar = ({ buttons }) => {
    return (
        <div className="card-toolbar">
            {
                buttons && buttons.length && buttons.map(( btn, idx ) => {
                    return(
                        <div key={ idx } onClick={ btn.onClick } className="action-button">
                            <Icon { ...btn.icon } />
                        </div>
                    );
                })
            }
        </div>
    );
}

export const CardContainer = ({ children }) => {
    return (
        <div className="card-container">
            { children }
        </div>
    );
}

const Card = ({ children, icon = false, className = '', toolbar = false, withHover = false }) => {
    return (
        <div className={ `card${withHover ? ' with-hover' : ''}` + ( className.length > 0 ? ' ' : '' ) + className }>
            { toolbar && <CardToolbar buttons={ toolbar } /> }
            { icon && <Icon { ...icon } /> }
            { children }
        </div>
    );
}

export default Card;