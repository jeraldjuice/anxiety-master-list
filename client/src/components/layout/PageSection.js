import React from 'react';

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