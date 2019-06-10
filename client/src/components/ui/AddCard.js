import React from 'react';
import { connect } from 'react-redux';
import { withState, withHandlers, compose } from 'recompose';
import { Icon, Card } from 'components/ui';

//@TODO add validation in this

const FormButton = ( { onClick, name, ...additional } ) => {
    return (
        <button onClick={ onClick } { ...additional }>{ name }</button>
    );
};

const FormField = ( { type, name, ...additional } ) => {
    switch( type ) {
        case 'textarea':
            return <textarea { ...additional } />;
        case 'button':
            return <FormButton name={ name } { ...additional } />;
    }
};

const AddCard = ( { fields, getFieldValue, handleFieldChange, generateClickHandler } ) => {
    return (
        <Card>
            <div className="form">
                { fields.map( ( { onClick, ...field } )  => (
                        <FormField 
                            key={ field.name } 
                            onChange={ handleFieldChange( field.name ) } 
                            { ...generateClickHandler( onClick ) }
                            { ...getFieldValue( field.name ) } 
                            {...field} 
                        />
                    )
                ) }
            </div>
        </Card>
    );
};

const enhance = compose(
    connect(),
    withState( 'formFields', 'setFormFields', {} ),
    withState( 'dirty', 'setDirty', false ),
    withHandlers({
        getFieldValue: ( { formFields } ) => ( name ) => {
            return formFields.hasOwnProperty( name ) ? { value: formFields[name] } : {};
        },
        handleFieldChange: ( { formFields, setFormFields, dirty, setDirty } ) => name => ( { target: { value } } ) => {
            if ( ! dirty ) {
                setDirty( true );
            }

            setFormFields( {
                ...formFields,
                [ name ]: value
            } );
        },
        generateClickHandler: ( { formFields, setFormFields, setDirty } ) => ( onClick = false ) => {
            return onClick ? {
                onClick: () => {
                    onClick( formFields );
                    setFormFields({});
                    setDirty( false );
                }
            } : {};
        }
    })
);

export default enhance( AddCard );