import React from 'react';
import '../css/AccountOption.css';

function AccountOption({ title, value, style }) {

    return (
        <div className="accountOption" style={style}>
            <div className="accountOption__container">
                <div className="accountInfo">
                    <h3>{title}:</h3>
                    <p>{value}</p>
                </div>
                <button className="accountEdit">Edit</button>
            </div>
        </div>
    )
}

export default AccountOption;
