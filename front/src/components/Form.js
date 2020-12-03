import React from 'react'

const Form = ({ type, name, value, onChange, label, required, className }) => {
    return (
        <div className="form-group">
            <label>{label}:</label>
            <input type={type}
                name={name}
                className={className}
                value={value}
                onChange={onChange}
                required={required}
            />
        </div>
    )
}

export default Form