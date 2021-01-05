import React from 'react';
import AccountOption from './AccountOption';
import '../css/Account.css';

function Account() {

    return (
        <div className="account">
            <h1>Your Account</h1>

            <div className="account__container">
                <AccountOption title={"Name"} value={"Jarrell Houston"} />
            </div>

        </div>
    )
}

export default Account;