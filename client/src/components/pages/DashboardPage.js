import React from 'react';
import { Page, PageSection } from 'components/layout';
import { Card, CardTitle, CardIconCorner, CardStatus, CardContainer } from 'components/ui';
import moment from 'moment';

let id = 4;

const categories = [
    {
        id: 1,
        name: 'Money',
        iconType: {
            icon: 'credit-card',
        },
        status: 'okay',
        upcoming: {
            nextWeek: 3
        }
    },
    {
        id: 2,
        name: 'Health',
        iconType: {
            icon: 'heartbeat',
            solid: true,
        },
        status: 'okay',
        upcoming: {
            nextWeek: 3
        }
    },
    {
        id: 3,
        name: 'Chores',
        iconType: {
            icon: 'spray-can',
            solid: true,
        },
        status: 'okay',
        upcoming: {
            nextWeek: 3
        }
    }
];

const newItem = (name, cat) => {
    return {
        name,
        id: id++,
        cat
    };
};

const items = [
    newItem('Dental Health', 2)
];

const getItem = id => items.find( item => item.id === id );

const conditionTypes = {
    date: 'date',
    monthly: 'monthly',
    weekly: 'weekly',
    yearly: 'yearly',
};

const newDueCondition = {
    [conditionTypes.date]: date => {
        return {
            date
        };
    },
    [conditionTypes.monthly]: (dayOfMonth, multiplier = 1) => {
        return {
            dayOfMonth,
            multiplier
        };
    },
    [conditionTypes.weekly]: (dayOfWeek, multiplier = 1) => {
        return {
            dayOfWeek,
            multiplier
        };
    },
    [conditionTypes.yearly]: (dayOfMonth, monthNumber, multiplier = 1) => {
        return {
            dayOfMonth,
            monthNumber,
            multiplier
        };
    },
};

/*
    DUE DATE CONDIITONS:

    date
        if date is equal to date
    repeat monthly (can repeat by a number of months, ie every 3 months)
        if day number is equal
    repeat weekly (can repeat by a number of weeks, ie every 3 months)
        if weekday is equal
    repeat yearly 
        if date is equal to date, minus year
*/

const newTask = (name, item, type, condition) => {
    return {
        id: id++,
        name,
        parent: item,
        due: {
            type,
            condition
        }
    };
}

const tasks = [
    newTask('Make regular dental checkup', 4, conditionTypes.date, newDueCondition.date(moment()))
];

const DashboardPage = () => {
    return (
        <Page id="main-content" header="Dashboard">
            <PageSection header="Unsorted Tasks">
                <CardContainer>
                    { tasks.map(task => {
                        return (
                            <div className="task-row" key={task.id}>
                                <div className="task-name">
                                    { task.name }
                                </div>
                                <div className="task-parent">
                                    { getItem( task.parent ).name }
                                </div>
                                <div className="task-due">
                                    { task.due.condition.date.format("dddd, MMMM Do YYYY, h:mm:ss a") }
                                </div>
                            </div>
                        );
                    }) }
                </CardContainer>
            </PageSection>
            <PageSection header="Tasks">
                <CardContainer>
                    { tasks.map(task => {
                        return (
                            <div className="task-row" key={task.id}>
                                <div className="task-name">
                                    { task.name }
                                </div>
                                <div className="task-parent">
                                    { getItem( task.parent ).name }
                                </div>
                                <div className="task-due">
                                    { task.due.condition.date.format("dddd, MMMM Do YYYY, h:mm:ss a") }
                                </div>
                            </div>
                        );
                    }) }
                </CardContainer>
            </PageSection>
            <PageSection header="Categories">
                <CardContainer>
                    { categories.map(category => {
                        return (
                            <Card key={ category.id } withHover>
                                <CardTitle icon={ category.iconType }>
                                    {category.name}
                                </CardTitle>
                                <CardIconCorner icon={{ icon: 'thumbs-up' }} />
                                <CardStatus>
                                    {category.upcoming.nextWeek} tasks upcoming
                                </CardStatus>
                            </Card>
                        );
                    }) }
                </CardContainer>
            </PageSection>
        </Page>
    );
};

export default DashboardPage;