import React from 'react';
import classes from './index.module.scss';
import { LoginPanel } from '../../components';

const SignIn = () => {
    return (
        <div className={classes.container}>
            <LoginPanel />
        </div>
    );
}

export default SignIn;