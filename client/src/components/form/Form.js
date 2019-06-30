import React, { useState } from 'react';
import classNames from 'classnames';
import DropdownField from './DropdownField';
import DueDatePicker from './DueDatePicker';
import IconPicker from './IconPicker';

const FormButton = ( { onClick, name, sm, invert, ...additional } ) => {
    return (
        <button className={ classNames( 'form-btn', { invert, sm } ) } onClick={ onClick } { ...additional }>{ name }</button>
    );
};

const FormField = ( { type, name, value, onChange, removeSelf, ...additional } ) => {
    const domOnChange = ( { target: { value } } ) => onChange( value );

    switch( type ) {
        case 'textarea':
            return <textarea value={ value } onChange={ domOnChange } { ...additional } />;
        case 'text':
            return <input type="text" value={ value } onChange={ domOnChange } { ...additional } />;
        case 'dropdown':
            return <DropdownField value={ value } onChange={ onChange } { ...additional } />;
        case 'datePicker':
            return <DueDatePicker value={ value } onChange={ onChange } removeSelf={ removeSelf } { ...additional } />;
        case 'iconPicker':
            return <IconPicker value={ value } onChange={ onChange } { ...additional } />;
        case 'button':
            return <FormButton name={ name } { ...additional } />;
        case 'label':
            return <div className="field-label">{ name }</div>;
        default:
            return <div>UNHANDLED FORM FIELD TYPE</div>;
    }
};

const Form = ( { initValues = {}, className, fields  } ) => {
    const [ formFields, setFormFields ] = useState( initValues );
    const [ dirty, setDirty ] = useState( false );

    const getFieldValue = name => {
        return formFields.hasOwnProperty( name ) ? formFields[ name ] : '';
    };

    const handleFieldChange = name => value => {
        if ( ! dirty ) {
            setDirty( true );
        }

        setFormFields( {
            ...formFields,
            [ name ]: value,
        } );
    };

    const generateClickHandler = ( onClick = false ) => {
        return onClick ? {
            onClick: () => {
                onClick( formFields );
                setFormFields({});
                setDirty( false );
            },
        } : {};
    };

    const removeFieldValue = name => {
        if ( formFields.hasOwnProperty( name ) ) {
            setFormFields( {
                ...formFields,
                [ name ]: 'remove',
            } );
        }
    };

    return (
        <div className={ classNames( "form", className ) }>
            { fields.map( ( { onClick, ...field } )  => (
                    <FormField 
                        key={ field.name } 
                        onChange={ handleFieldChange( field.name ) }
                        value={ getFieldValue( field.name ) }
                        removeSelf={ () => removeFieldValue( field.name ) }
                        { ...generateClickHandler( onClick ) }
                        {...field} 
                    />
                )
            ) }
        </div>
    );
};

export default Form;