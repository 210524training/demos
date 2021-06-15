import React, { Component } from 'react';

const ContainerWrapper = <P extends object>(Component: React.ComponentType<P>): React.ComponentType<P> => {
    return (props) => (
        <div className="container">
            <Component {...props} />
        </div>
        );
    }
export default ContainerWrapper;
     