import React from 'react';

export function renderField({
                input,
                label,
                type,
                value,
                defaultValue,
                meta: { touched, error, warning }
                }){
     return(
<div className="form-group">
    <label className="control-label col-xs-2">{label}</label>
    <div className="col-xs-9">
            <input {...input} placeholder={label} type={type}
                className="form-control" />
            {touched &&
            ((error && <span style={{color: 'red'}}>{error}</span>)||(warning && <span>{warning}</span>))}
    </div>
</div>
    );
};