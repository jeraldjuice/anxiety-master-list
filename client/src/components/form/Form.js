import React from 'react';
import { connect } from 'react-redux';
import { withState, withHandlers, compose } from 'recompose';
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

const Form = ( { className, fields, getFieldValue, removeFieldValue, handleFieldChange, generateClickHandler } ) => {
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

const enhance = compose(
    connect(),
    withState( 'formFields', 'setFormFields', ( { initValues = {} } ) => initValues ),
    withState( 'dirty', 'setDirty', false ),
    withHandlers({
        getFieldValue: ( { formFields } ) => ( name ) => {
            return formFields.hasOwnProperty( name ) ? formFields[ name ] : '';
        },
        handleFieldChange: ( { formFields, setFormFields, dirty, setDirty } ) => name => value => {
            if ( ! dirty ) {
                setDirty( true );
            }

            setFormFields( {
                ...formFields,
                [ name ]: value,
            } );
        },
        generateClickHandler: ( { formFields, setFormFields, setDirty } ) => ( onClick = false ) => {
            return onClick ? {
                onClick: () => {
                    onClick( formFields );
                    setFormFields({});
                    setDirty( false );
                },
            } : {};
        },
        removeFieldValue: ( { formFields, setFormFields } ) => name => {
            if ( formFields.hasOwnProperty( name ) ) {
                setFormFields( {
                    ...formFields,
                    [ name ]: 'remove',
                } );
            }
        },
    })
);

export default enhance( Form );