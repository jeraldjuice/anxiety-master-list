import React from 'react';
import { Link } from 'react-router-dom';
import classNames from  'classnames';
import { Icon } from 'components/ui';

export const CardTitle = ({ children, icon = false }) => {
    return (
        <div className="card-title">
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

export const CardLink = ( { to, ...props } ) => {
    return (
        <Link className="card with-hover" to={ to }>
            <Card removeCardClass { ...props } />
        </Link>
    );
};

const Card = ({ children, icon, className, toolbar, withHover, removeCardClass, smallText }) => {
    return (
        <div className={ classNames( { card: !removeCardClass, 'with-hover': withHover, 'top-icon-card': icon, className, 'small-text': smallText } ) }>
            { toolbar && <CardToolbar buttons={ toolbar } /> }
            { icon && <Icon className="top-icon" { ...icon } /> }
            { children }
        </div>
    );
}

export default Card;