import moment from 'moment';

export const dueDateClass = item => {
    const daysFromToday = moment( item.status.due ).diff( moment(), 'days' );

    const dynamicTime = moment( item.status.due ).calendar(null, {
        sameDay: '[today]',
        nextDay: '[tomorrow]',
        nextWeek: '[soon]',
        lastDay: '[danger]',
        lastWeek: '[danger]',
        sameElse: function( now ) {
            const diffAmount = this.diff( now, 'days' );
            if ( diffAmount < 0 ) {
                return '[danger]';
            }

            if ( diffAmount <= 14 ) {
                return '[future]';
            }

            return '[future]';
          },
    });

    return dynamicTime;
}

export const itemStatuses = {
    1: 'Okay',
    2: 'Needs Action',
    3: 'Waiting on Response',
};

export const statusIcons = {
    1: 'far fa-thumbs-up',
    2: 'fas fa-exclamation-triangle',
    3: 'fas fa-pause-circle',
};

export const needsToBeDone = status => {
    const { repeatEntity, multiplier } = status;

    if ( repeatEntity === 'none' ) {
        return 'once';
    }

    if ( multiplier > 1 ) {
        return `every ${ multiplier } ${ repeatEntity }`;
    }

    return `every ${ repeatEntity.substring(0, repeatEntity.length - 1) }`;
};