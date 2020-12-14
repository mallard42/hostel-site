import React from 'react';
import { Alert } from '@material-ui/lab';

const AlertForm = ({ message, status }) => {
    return (
        <Alert className="margin-bottom" severity={status} variant="outlined">
            {message}
        </Alert>
    )
}

export default AlertForm;
