import React from 'react';
import classNames from 'classnames';
import moment from 'moment';
import { compose, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import { Page, PageSection, PageRow } from 'components/layout';
import { CardContainer, IconButton } from 'components/ui';
import ItemsSection from 'components/pages/sections/ItemsSection';
import { fetchAll } from 'actions/data';

const days = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];

const ThisWeek = ( { items } ) => {
    const today = moment().day();
    const thisWeek = moment().week();

    const itemsThisWeek = items.filter( item => item.status.due && moment( item.status.due ).week() === thisWeek );
    const sortedItems = itemsThisWeek.reduce( ( acc, item ) => {
        const dayKey = moment( item.status.due ).day();
        return {
            ...acc,
            [ dayKey ]: [ item, ...( acc.hasOwnProperty( dayKey ) ? acc[ dayKey ] : [] ) ],
        }
    }, {} );

    return (
        <div className="week-container">
            {
                days.map( ( day, idx ) => {
                    return (
                        <div key={ day + idx } className={ classNames( 'day-container', { today: today === idx } ) }>
                            <div className="day-label">
                                { day }
                            </div>
                            <div className="task-dots">
                                {
                                    sortedItems.hasOwnProperty( idx ) && sortedItems[ idx ].map( i => {
                                        return (
                                            <div key={ `dot${i._id}` } className="task-dot"></div>
                                        )
                                    } )
                                }
                            </div>
                        </div>
                    );
                } )
            }
        </div>
    );
};

const DashboardPage = ( { categories, items } ) => {
    return (
        <Page id="main-content" noHeader>
            <div className="planner-header">
                <IconButton icon="angle-left" solid />
                <div className="planner-day">
                    { moment().format("MMMM Do") }
                </div>
                <IconButton icon="angle-right" solid />
            </div>
            <ThisWeek items={ items } />
            <PageRow>
                <PageSection header="Notes">
                    
                </PageSection>
                <PageSection header="One-Offs">
                    
                </PageSection>
            </PageRow>
            <ItemsSection items={ items } />
        </Page>
    );
};

const mapStateToProps = ( { data: { categories, items, fetching } } ) => {
    return {
        fetching,
        categories,
        items,
    };
};

const enhance = compose(
    connect( mapStateToProps ),
    lifecycle({
        componentDidMount() {
            const { dispatch } = this.props;
            dispatch( fetchAll() );
        },
    }),
);

export default enhance( DashboardPage );