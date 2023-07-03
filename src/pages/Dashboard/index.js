import React from "react";
import { Card, CardActions, CardContent } from "@mui/material";
import { Page } from '../../components';
import classes from './index.module.scss';
import { CARD_LIST } from "./const";

const Dashboard = () => {
    return (
        <Page>
            <div className={classes.container}>
                {CARD_LIST.map(({ icon, text, amount, background }) =>
                    <Card classes={{ root: classes.card }} style={{ background }}>
                        <CardContent classes={{ root: classes.content }}>
                            <div>{icon}</div>
                            <div className={classes.cardText}>{text}</div>
                        </CardContent>
                        <CardActions classes={{ root: classes.action }}>
                            <div className={classes.cardAmount}>{amount}</div>
                        </CardActions>
                    </Card>
                )}
            </div>
        </Page>
    );
}

export default Dashboard;