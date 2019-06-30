import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { withState, withHandlers, compose } from 'recompose';
import { Icon, IconButton } from 'components/ui';
import { itemUtils } from 'utils';
import DropdownField from './DropdownField';
import classNames from 'classnames';

// @TODO add year support for this

const today = moment();

const months = [ "January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December" ]
    .map( ( label, idx ) => ( { label, value: idx } ) )
    .filter( mnth => mnth.value >= today.month());

const isToday = ( day, dateVal ) => {
    return today.date() === day && today.month() === dateVal.month();
}

const DayButton = ( { dayNo, selectedDate, onClick } ) => {
    return (
        <div 
            className={ classNames( 'day', { selected: dayNo === selectedDate.date(), today: isToday( dayNo, selectedDate ) } ) }
            onClick={ onClick }
        >
            { dayNo }
        </div>
    );
}

const DisabledDay = ( { dayNo } ) => {
    return (
        <div className="day disabled">
            { dayNo }
        </div>
    );
}

const DatePicker = ( { onDateChange, onMonthChange, due, close } ) => {

    const generateMonth = () => {
        const days = due.daysInMonth();

        const genDay = ( dayNo, acc ) => {
            if ( dayNo <= days ) {
                if ( dayNo < today.date() && due.month() === today.month() ) {
                    const day = (
                        <DisabledDay key={ dayNo } dayNo={ dayNo } />
                    );
                    return genDay( dayNo + 1, [ ...acc, day ] )
                }
                const day = (
                    <DayButton key={ dayNo } dayNo={ dayNo } selectedDate={ due } onClick={ () => onDateChange( due.date( dayNo ) ) } />
                );
                return genDay( dayNo + 1, [ ...acc, day ] )
            }

            return acc;
        };

        return genDay( 1, [] );
    }

    return (
        <div className="picker date-picker">
            <div onClick={ close } className="card-overlay-close-btn">
                <Icon iconString="fas fa-times-circle" />
            </div>
            <div className="month-picker">
                <DropdownField value={ due.month() } options={ months } onChange={ val => onMonthChange( due.month( val ) ) } />
            </div>
            <div className="month">
                { generateMonth() }
            </div>
        </div>
    );
}

const repeatTypes = [ 'none', 'days', 'weeks', 'months', 'quarters', 'years' ];

const RepeatPicker = ( { close, onChange, repeatEntity, handleMultiplierChange, multiplier } ) => {
    return (
        <div className="picker repeat-picker">
            <div onClick={ close } className="card-overlay-close-btn">
                <Icon iconString="fas fa-times-circle" />
            </div>
            <div className="repeat-type-container">
                {
                    repeatTypes.map( type => {
                        return (
                            <div key={ type } onClick={ () => onChange( type ) } className={ classNames( 'repeat-type', { selected: type === repeatEntity } ) }>
                                { type }
                            </div>
                        );
                    } )
                }
                <div className="multiplier">
                    <Icon iconString="fas fa-times" /><input onChange={ handleMultiplierChange } value={ multiplier } type="number" />
                </div>
            </div>
        </div>
    );
};

const RemovableButton = ( { onClick, removed } ) => {
    return (
        <div className="button-row">
            <IconButton onClick={ onClick } iconString={ removed ? 'fas fa-plus-circle' : 'fas fa-minus-circle' } label={ removed ? 'Add due date' : 'Remove due date' } />
        </div>
    );
};

const DueDatePicker = ( { handleMultiplierChange, handleMonthChange, handleDateChange, handleRepeatChange, openDialog, setDialog, value, removable, removed, handleRemove } ) => {
    const due = value.hasOwnProperty( 'due' ) ? moment( value.due ) : moment();
    const repeatEntity = value.hasOwnProperty( 'repeatEntity' ) ? value.repeatEntity : 'none';
    const multiplier = value.hasOwnProperty( 'multiplier' ) ? value.multiplier : 1;

    // onBlur={ () => setDialog( false ) }
    // @TODO figure out onBlur losing focus to child input problem

    return <>
        {
            removable && <RemovableButton removed={ removed } onClick={ handleRemove } />
        }
        {
            ( ( removable && !removed ) || ( ! removable ) ) && (
                <div className="date-picker-field" tabIndex={0}>
                    <div className="date-picker-bubbles">
                        <div className="bubble" onClick={ () => setDialog( 'date-picker' ) }>
                            { due.format("dddd, MMMM Do") }
                        </div>
                        <div className="inline-label">
                            { itemUtils.needsToBeDone( { due, repeatEntity, multiplier } ) }
                        </div>
                        <div className="bubble repeat-bubble" onClick={ () => setDialog( 'repeat-picker' ) }>
                            <Icon iconString="fas fa-redo-alt" />
                        </div>
                    </div>
                    { openDialog === 'date-picker' ?
                        <DatePicker close={ () => setDialog( false ) } due={ due } onDateChange={ handleDateChange } onMonthChange={ handleMonthChange } /> 
                    : openDialog === 'repeat-picker' ?
                        <RepeatPicker close={ () => setDialog( false ) } onChange={ handleRepeatChange } repeatEntity={ repeatEntity } multiplier={ multiplier } handleMultiplierChange={ handleMultiplierChange } />
                    : null }
                </div>
            )
        }
    </>;
};

const enhance = compose(
    connect(),
    withState( 'removed', 'setRemoved', ( { removable, beginRemoved, value } ) => removable && beginRemoved && !value.hasOwnProperty( 'due' ) ),
    withState( 'openDialog', 'setDialog', false ),
    withHandlers({
        handleDateChange: ( { onChange, value, setDialog } ) => due => {
            onChange( { ...value, due } );
            setDialog( false );
        },
        handleMonthChange: ( { onChange, value } ) => due => {
            onChange( { ...value, due } );
        },
        handleRepeatChange: ( { onChange, value, setDialog } ) => repeatEntity => {
            onChange( { ...value, repeatEntity } );
            setDialog( false );
        },
        handleMultiplierChange: ( { onChange, value } ) => ( { target } ) => {
            onChange( { ...value, multiplier: target.value } );
        },
        handleRemove: ( { removed, setRemoved, removeSelf } ) => () =>  {
            if ( removed ) {
                setRemoved( false );
            } else {
                removeSelf();
                setRemoved( true );
            }
        },
    })
);

export default enhance( DueDatePicker );
