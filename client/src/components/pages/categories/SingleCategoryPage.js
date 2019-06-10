import React from 'react';
import { Page, PageSection } from 'components/layout';
import { Icon } from 'components/ui';
import moment from 'moment';

let id = 4;

const category = {
    id: 1,
    name: 'Money',
    iconType: {
        icon: 'credit-card',
    },
    status: 'okay',
    upcoming: {
        nextWeek: 3
    }
};

const Card = ({ children }) => {
    return (
        <div className="card">
            { children }
        </div>
    );
}

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

const CategoryPage = ({ match }) => {
    return (
        <Page id="main-content" header={category.name} icon={ category.iconType }>
            <PageSection>
                <div className="category-info">
                    <div className="row">
                        <div className="cell cell-stacked">
                            <div className="stacked-header">Status</div>
                            <div className="stacked">Okay!</div>
                        </div>
                        <div className="cell cell-stacked">
                            <div className="stacked-header">Items</div>
                            <div className="stacked">{ items.length }</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="cell">
                            <span className="inline-header">Upcoming Tasks</span>
                            <div className="upcoming-container">
                                <div className="row">
                                    <div className="cell">
                                        Today: 0
                                    </div>
                                    <div className="cell">
                                        This Week: 1
                                    </div>
                                    <div className="cell">
                                        Next Week: 1
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </PageSection>
            <PageSection header="Items">
                Hi
            </PageSection>
        </Page>
    );
};

export default CategoryPage;

