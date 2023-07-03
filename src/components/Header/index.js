import React from 'react';
import classes from './index.module.scss';
import { ArrowLeftOutlined, NotificationsOutlined } from '@mui/icons-material';

const Header = () => {
    return (
        <div className={classes.container}>
            <ArrowLeftOutlined htmlColor='#C4C4C4' />
            <NotificationsOutlined htmlColor='#C4C4C4' />
        </div>
    );
}

export default Header;