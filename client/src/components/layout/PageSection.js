import React from 'react';

export const PageRow = ({ children }) => {
    return (
        <div className="section-row">
            { children }
        </div>
    );
}

const PageSection = ({ header, children }) => {
    return (
        <section>
            { header && 
                (<div className="section-header">
                    { header }
                </div>)
            }
            { children }
        </section>
    )
};

export default PageSection;