import React from 'react';
import { Alert } from '@material-ui/lab';

const AlertForm = ({ message, status }) => {
    return (
        <Alert severity={status} variant="outlined">
            {message}
        </Alert>
    )
}

export default AlertForm;
