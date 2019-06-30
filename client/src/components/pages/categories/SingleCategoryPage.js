import React from 'react';
import moment from 'moment';
import { compose, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import { Page, PageSection } from 'components/layout';
import { CardContainer, AddCard } from 'components/ui';
import { fetchById, createData } from 'actions/data';
import ItemsSection from 'components/pages/sections/ItemsSection';
import withItems from 'components/hoc/withItems';

const SingleCategoryPage = ( { category, items, fetching, dispatch } ) => {
    if ( fetching ) {
        return <Page id="main-content" header="Loading..." icon={ { icon: 'spinner', solid: true } } />;
    }

    if ( ! category ) {
        return 'Error';
    }

    const fields = [
        { name: 'name', type: 'text', placeholder: 'Name' },
        { name: 'icon', type: 'iconPicker', placeholder: 'Icon' },
        { name: 'Add', type: 'button', onClick: fields => dispatch( createData( { ...fields, category: category._id }, 'items' ) ) },
    ];

    const dueWhen = items.reduce( ( acc, t ) => {
        const dayDiff = moment( t.status.due ).diff( moment(), 'days' );

        if ( dayDiff <=1 ) {
            return {
                ...acc,
                today: acc.today + 1,
            }
        }

        if ( dayDiff <=7 ) {
            return {
                ...acc,
                thisWeek: acc.thisWeek + 1,
            }
        }

        if ( dayDiff <=14 ) {
            return {
                ...acc,
                nextWeek: acc.nextWeek + 1,
            }
        }

        return acc;
        
    }, { today: 0, thisWeek: 0, nextWeek: 0 } );

    return (
        <Page id="main-content" header={ category.name } icon={ { iconString: category.icon } } bigHeader>
            <PageSection>
                <div className="circle-container">
                    <div className="circle today">
                        <div className="circle-header">
                            Today
                        </div>
                        <div className="circle-body">
                            { dueWhen.today }
                        </div>
                    </div>
                    <div className="circle this-week">
                        <div className="circle-header">
                            This Week
                        </div>
                        <div className="circle-body">
                            { dueWhen.thisWeek }
                        </div>
                    </div>
                    <div className="circle">
                        <div className="circle-header">
                            Next Week
                        </div>
                        <div className="circle-body">
                            { dueWhen.nextWeek }
                        </div>
                    </div>
                </div>
            </PageSection>
            <ItemsSection categoryId={ category._id } />
            <PageSection header="Add">
                <CardContainer>
                    <AddCard fields={ fields } />
                </CardContainer>
            </PageSection>
        </Page>
    );
};

const mapStateToProps = ( { data: { categories, fetching } }, { match } ) => {
    const category = categories.find( cat => cat._id === match.params.id );
    return {
        category,
        fetching,
    };
};

const enhance = compose(
    connect( mapStateToProps ),
    lifecycle({
        componentDidMount() {
            const { match, dispatch } = this.props;
            dispatch( fetchById( match.params.id, 'categories' ) );
        },
    }),
    withItems
);

export default enhance( SingleCategoryPage );

