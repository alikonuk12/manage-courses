import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TablePagination,
    TableFooter,
    TextField,
    InputAdornment,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Snackbar,
    Alert
} from '@mui/material';
import { Search } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { getUsers, addUser, updateUser, deleteUser } from '../../api/User';
import { Page } from '../../components';
import {
    HEADERS,
    DIALOG_FIELDS,
    FORM_FIELDS,
    REQUIRED_VALIDATION_ERROR,
    SNACKBAR_POSITIONS,
    ADD_USER_MESSAGES,
    DELETE_USER_MESSAGES,
    UPDATE_USER_MESSAGES,
    ROW_PER_PAGE_OPTIONS,
    ACTION_OPTIONS,
    DIALOG_CANCEL_BUTTON,
    UPPER_SIDE,
    GET_USER_MESSAGES
} from './const';
import classes from './index.module.scss';

const Students = () => {
    const [limit, setLimit] = useState(5);
    const [page, setPage] = useState(0);
    const [total, setTotal] = useState(0);
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [action, setAction] = useState('');
    const [isOnRequest, setIsOnRequest] = useState(false);
    const [snackbarText, setSnackbarText] = useState('');
    const [updatedUserID, setUpdatedUserID] = useState(undefined);

    const UserSchema = Yup.object().shape({
        image: Yup
            .string()
            .required(REQUIRED_VALIDATION_ERROR),
        name: Yup
            .string()
            .required(REQUIRED_VALIDATION_ERROR),
        email: Yup
            .string()
            .required(REQUIRED_VALIDATION_ERROR),
        phone: Yup
            .string()
            .required(REQUIRED_VALIDATION_ERROR),
        domain: Yup
            .string()
            .required(REQUIRED_VALIDATION_ERROR),
        company_name: Yup
            .string()
            .required(REQUIRED_VALIDATION_ERROR),
    });

    const handleGetUsers = async (page, limit) => {
        try {
            if (isOnRequest) return;
            setIsOnRequest(true);
            const skip = page * limit;
            const result = await getUsers(limit, skip, search);
            const pageValue = Math.floor(result.skip / result.limit);

            setPage(isNaN(pageValue) ? 0 : pageValue);
            setTotal(result.total);
            setUsers(result.users);
        } catch (error) {
            setSnackbarText(GET_USER_MESSAGES.ERROR);
        } finally {
            setIsOnRequest(false);
        }
    }

    const handleChangePage = (_, page) => setPage(page);
    const handleChangeRowsPerPage = ({ target }) => {
        setPage(0);
        setLimit(target.value);
    }
    const handleChangeSearch = ({ target }) => setSearch(target.value);

    const handleClickAdd = () => {
        formik.resetForm();
        setAction(ACTION_OPTIONS.ADD);
        setIsDialogOpen(true);
    }

    const handleClickUpdate = (user) => {
        setUpdatedUserID(user.id);
        formik.setValues({
            [FORM_FIELDS.IMAGE]: user.image,
            [FORM_FIELDS.NAME]: user.firstName + " " + user.lastName,
            [FORM_FIELDS.EMAIL]: user.email,
            [FORM_FIELDS.PHONE]: user.phone,
            [FORM_FIELDS.WEBSITE]: user.domain,
            [FORM_FIELDS.COMPANY_NAME]: user.company.name
        });
        setAction(ACTION_OPTIONS.UPDATE);
        setIsDialogOpen(true);
    }

    const handleClickDelete = async (id) => {
        try {
            const isDeleted = await deleteUser(id);
            isDeleted && setPage(0);
            setSnackbarText(DELETE_USER_MESSAGES.SUCCESS);
        } catch (error) {
            setSnackbarText(DELETE_USER_MESSAGES.ERROR);
        }
    }

    const handleClickCancel = () => {
        setAction(ACTION_OPTIONS.NONE);
        setIsDialogOpen(false);
    }

    const handleSubmit = async ({ image, name, email, phone, domain, company_name }) => {
        const nameArr = name.split(' ');
        const lastName = nameArr.pop();
        const firstName = nameArr.join(' ');

        const data = {
            firstName,
            lastName,
            image,
            email,
            phone,
            domain,
            company: { name: company_name }
        }

        if (action === ACTION_OPTIONS.ADD) {
            try {
                const status = await addUser(data);
                status === 200 && setPage(0);
                setIsDialogOpen(false);
                setSnackbarText(ADD_USER_MESSAGES.SUCCESS);
            } catch (error) {
                setSnackbarText(ADD_USER_MESSAGES.ERROR);
            }
        } else if (action === ACTION_OPTIONS.UPDATE) {
            try {
                const status = await updateUser(updatedUserID, data);
                status === 200 && setPage(0);
                setIsDialogOpen(false);
                setSnackbarText(UPDATE_USER_MESSAGES.SUCCESS);
            } catch (error) {
                setSnackbarText(UPDATE_USER_MESSAGES.ERROR);
            }
        }
    }

    const handleError = (field) => {
        if (formik.errors[field] && formik.touched[field])
            return formik.errors[field]
    }

    const handleCloseSnackbar = () => setSnackbarText('');

    const formik = useFormik({
        initialValues: {
            [FORM_FIELDS.IMAGE]: undefined,
            [FORM_FIELDS.NAME]: '',
            [FORM_FIELDS.EMAIL]: '',
            [FORM_FIELDS.PHONE]: '',
            [FORM_FIELDS.WEBSITE]: '',
            [FORM_FIELDS.COMPANY_NAME]: '',
        },
        validationSchema: UserSchema,
        onSubmit: handleSubmit
    });

    useEffect(() => {
        handleGetUsers(page, limit);
    }, [page, limit]);

    useEffect(() => {
        setPage(0);
        setLimit(5);
        handleGetUsers(0, 5);
    }, [search])

    return (
        <Page>
            <div className={classes.upperSide}>
                <div className={classes.title}>{UPPER_SIDE.TITLE}</div>
                <div className={classes.action}>
                    <TextField
                        size='small'
                        placeholder={UPPER_SIDE.SEARCH_PLACEHOLDER}
                        value={search}
                        onChange={handleChangeSearch}
                        InputProps={{
                            endAdornment: <InputAdornment position="end"><Search /></InputAdornment>
                        }}
                    />
                    <Button className={classes.add} onClick={handleClickAdd}>{UPPER_SIDE.BUTTON}</Button>
                </div>
            </div>
            <TableContainer className={classes.container} component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {HEADERS.map(value => <TableCell>{value}</TableCell>)}
                        </TableRow>
                    </TableHead>
                    <TableBody className={classes.body}>
                        {users.map(user => (
                            <TableRow key={user.id}>
                                <TableCell><img src={user.image} alt='user_image' width={50} /></TableCell>
                                <TableCell component="th" scope="row">
                                    {`${user.firstName} ${user.lastName}`}
                                </TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.phone}</TableCell>
                                <TableCell>{user.domain}</TableCell>
                                <TableCell>{user.company.name}</TableCell>
                                <TableCell><img src='/edit.svg' alt='edit' className={classes.rowButton} onClick={() => handleClickUpdate(user)} /></TableCell>
                                <TableCell><img src='/delete.svg' alt='delete' className={classes.rowButton} onClick={() => handleClickDelete(user.id)} /></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                page={page}
                                count={total}
                                rowsPerPage={limit}
                                rowsPerPageOptions={ROW_PER_PAGE_OPTIONS}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                backIconButtonProps={{ disabled: isOnRequest }}
                                nextIconButtonProps={{ disabled: isOnRequest || total <= (page + 1) * limit }}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
            <Dialog open={isDialogOpen} onClose={handleClickCancel}>
                <form onSubmit={formik.handleSubmit}>
                    <DialogTitle>
                        {action === ACTION_OPTIONS.ADD
                            ? 'ADD A USER'
                            : action === ACTION_OPTIONS.UPDATE
                                ? 'UPDATE SELECTED USER'
                                : ''
                        }
                    </DialogTitle>
                    <DialogContent>
                        <div className={classes.dialogContent}>
                            {DIALOG_FIELDS.map(({ label, name, type }) =>
                                <TextField
                                    id={name}
                                    name={name}
                                    label={label}
                                    type={type}
                                    size='small'
                                    fullWidth
                                    value={formik.values[name]}
                                    error={!!handleError(name)}
                                    helperText={handleError(name)}
                                    onChange={formik.handleChange}
                                    InputLabelProps={{ shrink: true }}
                                />
                            )}
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClickCancel} className={classes.cancelButton}>{DIALOG_CANCEL_BUTTON}</Button>
                        <Button type='submit' className={classes.actionButton}>{action}</Button>
                    </DialogActions>
                </form>
            </Dialog>
            <Snackbar
                anchorOrigin={{ vertical: SNACKBAR_POSITIONS.VERTICAL, horizontal: SNACKBAR_POSITIONS.HORIZONTAL }}
                open={!!snackbarText}
                autoHideDuration={2000}
                onClose={handleCloseSnackbar}
            >
                <Alert severity='success' variant='filled'>{snackbarText}</Alert>
            </Snackbar>
        </Page>
    );
}

export default Students;