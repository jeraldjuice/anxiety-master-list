import React from 'react';
import { withState, withHandlers, compose } from 'recompose';

const DropdownField = ( { handleOptionClick, isOpen, setIsOpen, options, value } ) => {
    const getLabel = () => {
        const possibleValue = options.find( opt => opt.value == value );

        if ( possibleValue ) {
            if ( possibleValue.hasOwnProperty( 'label' ) ) {
                return possibleValue.label;
            }
           
            return 'NO LABEL FOR OPTION';
        }

        return 'Select...';
    }

    return (
        <div className="dropdown-field" tabIndex={0} onBlur={ () => setIsOpen( false ) }>
            <div className="dropdown-label selected" onClick={ () => setIsOpen( ! isOpen ) }>
                { getLabel() }
            </div>
            {
                isOpen && (
                    <div className="dropdown-options">
                        {
                            options.map(opt => {
                                return (
                                    <div key={ opt.value } className={`dropdown-label${ opt.value === value ? ' selected' : '' }`} onClick={ () => handleOptionClick( opt.value ) }>
                                        { opt.label }
                                    </div>
                                );
                            })
                        }
                    </div>
                )
            }
        </div>
    );
};

const enhance = compose(
    withState( 'isOpen', 'setIsOpen', false ),
    withHandlers({
        handleOptionClick: ( { onChange, setIsOpen } ) => value => {
            onChange( value );
            setIsOpen( false );
        }
    })
);

export default enhance( DropdownField );