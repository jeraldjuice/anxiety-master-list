import React from 'react';
import { Route } from "react-router-dom";
import { DashboardPage, CategoryPage, NotesPage } from 'components/pages';
import { SingleCategoryPage } from 'components/pages/categories';
import { AddButton } from 'components/ui';

const PageContainer = () => {
    return (
        <div className="container" id="main">
            <AddButton />
            <Route path="/" exact component={DashboardPage} />
            <Route path="/categories/" exact component={CategoryPage} />
            <Route path="/categories/:id" component={SingleCategoryPage} />
            <Route path="/notes/" exact component={NotesPage} />
        </div>
    );
};

export default PageContainer;