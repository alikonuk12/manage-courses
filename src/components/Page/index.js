import React from 'react';
import { Header, SidePanel } from '../';
import classes from './index.module.scss';

const Page = ({ children }) => {
    return (
        <div className={classes.container}>
            <SidePanel />
            <div className={classes.rightSide}>
                <Header />
                {children}
            </div>
        </div>
    );
}

export default Page;