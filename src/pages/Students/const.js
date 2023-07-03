export const HEADERS = ['', 'Name', 'Email', 'Phone', 'Website', 'Company Name', '', ''];
export const REQUIRED_VALIDATION_ERROR = 'Required';
export const ROW_PER_PAGE_OPTIONS = [5, 10, 25, 50];
export const DIALOG_CANCEL_BUTTON = 'CANCEL';

export const ACTION_OPTIONS = {
    NONE: 'NONE',
    ADD: 'ADD',
    UPDATE: 'UPDATE'
}

export const UPPER_SIDE = {
    TITLE: 'Student List',
    BUTTON: 'ADD NEW STUDENT',
    SEARCH_PLACEHOLDER: 'Search...'
}

export const DIALOG_FIELDS = [
    {
        name: 'image',
        label: 'Image',
        type: 'text',
    },
    {
        name: 'name',
        label: 'Name',
        type: 'text',
    },
    {
        name: 'email',
        label: 'Email',
        type: 'email',
    },
    {
        name: 'phone',
        label: 'Phone',
        type: 'tel',
    },
    {
        name: 'domain',
        label: 'Website',
        type: 'text',
    },
    {
        name: 'company_name',
        label: 'Company Name',
        type: 'text',
    }
];

export const FORM_FIELDS = {
    IMAGE: 'image',
    NAME: 'name',
    EMAIL: 'email',
    PHONE: 'phone',
    WEBSITE: 'domain',
    COMPANY_NAME: 'company_name'
}

export const SNACKBAR_POSITIONS = {
    VERTICAL: 'top',
    HORIZONTAL: 'right'
}

export const ADD_USER_MESSAGES = {
    SUCCESS: 'User saved succesfully',
    ERROR: 'Something went wrong'
}

export const UPDATE_USER_MESSAGES = {
    SUCCESS: 'User updated succesfully',
    ERROR: 'Something went wrong'
}

export const DELETE_USER_MESSAGES = {
    SUCCESS: 'User deleted succesfully',
    ERROR: 'Something went wrong'
}

export const GET_USER_MESSAGES = {
    ERROR: 'Something went wrong'
}
