import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button } from '@mui/material';
import classes from './index.module.scss';
import {
    HEADER,
    TITLE,
    DESCRIPTION,
    BUTTON_TEXT,
    FORM_FIELDS,
    EMAIL_VALIDATION_ERROR,
    REQUIRED_VALIDATION_ERROR,
    MIN_LENGTH_VALIDATION_ERROR,
    MAX_LENGTH_VALIDATION_ERROR,
    FORM_LABELS,
    FORM_PLACEHOLDERS,
    FORGOT_PASSWORD_TEXT,
    FORGOT_PASSWORD_LINK
} from './const';

const LoginPanel = () => {
    const navigator = useNavigate();

    const handleSubmit = () => navigator('/dashboard');

    const SignInSchema = Yup.object().shape({
        email: Yup
            .string()
            .email(EMAIL_VALIDATION_ERROR)
            .required(REQUIRED_VALIDATION_ERROR),
        password: Yup
            .string()
            .min(5, MIN_LENGTH_VALIDATION_ERROR)
            .max(20, MAX_LENGTH_VALIDATION_ERROR)
            .required(REQUIRED_VALIDATION_ERROR)
    });

    const formik = useFormik({
        initialValues: {
            [FORM_FIELDS.EMAIL]: '',
            [FORM_FIELDS.PASSWORD]: ''
        },
        validationSchema: SignInSchema,
        onSubmit: handleSubmit
    });

    const handleError = (field) => {
        if (formik.errors[field] && formik.touched[field])
            return formik.errors[field]
    }

    return (
        <div className={classes.container}>
            <div className={classes.header}>{HEADER}</div>
            <div className={classes.titleContainer}>
                <div className={classes.title}>{TITLE}</div>
                <div className={classes.description}>{DESCRIPTION}</div>
            </div>
            <form onSubmit={formik.handleSubmit} className={classes.form}>
                <TextField
                    id={FORM_FIELDS.EMAIL}
                    name={FORM_FIELDS.EMAIL}
                    type={FORM_FIELDS.EMAIL}
                    size='small'
                    fullWidth
                    label={FORM_LABELS.EMAIL}
                    placeholder={FORM_PLACEHOLDERS.EMAIL}
                    classes={{ root: classes.textField }}
                    value={formik.values[FORM_FIELDS.EMAIL]}
                    error={!!handleError(FORM_FIELDS.EMAIL)}
                    helperText={handleError(FORM_FIELDS.EMAIL)}
                    onChange={formik.handleChange}
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                    id={FORM_FIELDS.PASSWORD}
                    name={FORM_FIELDS.PASSWORD}
                    type={FORM_FIELDS.PASSWORD}
                    size='small'
                    fullWidth
                    label={FORM_LABELS.PASSWORD}
                    placeholder={FORM_PLACEHOLDERS.PASSWORD}
                    classes={{ root: classes.textField }}
                    value={formik.values[FORM_FIELDS.PASSWORD]}
                    error={!!handleError(FORM_FIELDS.PASSWORD)}
                    helperText={handleError(FORM_FIELDS.PASSWORD)}
                    onChange={formik.handleChange}
                    InputLabelProps={{ shrink: true }}
                />
                <Button
                    type='submit'
                    variant='contained'
                    className={classes.button}
                >
                    {BUTTON_TEXT}
                </Button>
                <div className={classes.forgotPasswordContainer}>
                    <div className={classes.forgotPasswordText}>{FORGOT_PASSWORD_TEXT}</div>
                    <Link className={classes.forgotPasswordLink}>{FORGOT_PASSWORD_LINK}</Link>
                </div>
            </form>
        </div>
    );
}

export default LoginPanel;