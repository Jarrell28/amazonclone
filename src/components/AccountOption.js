import React from 'react';

function AccountOption({ title, value }) {

    return (
        <div className="accountOption">
            <div className="accountOption__container">
                <div className="accountInfo">
                    <h3>{title}</h3>
                    <p>{value}</p>
                </div>
                <button className="accountEdit">Edit</button>
            </div>
        </div>
    )
}

export default AccountOption;
