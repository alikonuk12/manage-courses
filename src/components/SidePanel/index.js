import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Avatar, Tabs, Tab, Button } from '@mui/material';
import { LogoutOutlined } from '@mui/icons-material';
import { HEADER, LOGOUT_TEXT, NAME, ROLE, TABS } from './const';
import classes from './index.module.scss';

const SidePanel = () => {
    const navigator = useNavigate();
    const location = useLocation();

    const handleChangeTab = (_, value) => navigator(value);
    const handleClickLogout = () => navigator('/');

    return (
        <div className={classes.container}>
            <div className={classes.header}>{HEADER}</div>
            <div className={classes.info}>
                <Avatar
                    src='/avatar.svg'
                    sx={{ width: 125, height: 125 }}
                />
                <div className={classes.name}>{NAME}</div>
                <div className={classes.role}>{ROLE}</div>
            </div>
            <Tabs
                orientation='vertical'
                value={location.pathname}
                classes={{ indicator: classes.indicator }}
                onChange={handleChangeTab}
            >
                {TABS.map(({ label, icon, value }) =>
                    <Tab
                        value={value}
                        key={label}
                        label={label}
                        icon={icon}
                        classes={{ root: classes.tab, selected: classes.selectedTab }}
                    />
                )}
            </Tabs>
            <Button
                classes={{ root: classes.logout }}
                onClick={handleClickLogout}
            >
                {LOGOUT_TEXT}
                <LogoutOutlined />
            </Button>
        </div>
    );
}

export default SidePanel;