import React, { useState } from 'react';

const DropdownField = ( { options, value, onChange } ) => {
    const [ isOpen, setIsOpen ] = useState( false );

    const handleOptionClick = value => {
        onChange( value );
        setIsOpen( false );
    };

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

export default DropdownField;