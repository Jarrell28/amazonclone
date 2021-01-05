import React, { useEffect } from 'react';
import AccountOption from './AccountOption';
import '../css/Account.css';

import { useStateValue } from '../StateProvider';
import { Link } from 'react-router-dom';

function Account() {
    const [{ user }, dispatch] = useStateValue();

    useEffect(() => {
        console.log(user);
    }, [])

    return (
        <div className="account">
            <div className="account__container">
                <h1>Your Account</h1>

                <div className="account__info">
                    <AccountOption title={"Name"} value={user?.displayName ? user?.displayName : "Name not set"} style={{ borderTopLeftRadius: "7px", borderTopRightRadius: "7px", borderTop: "1px solid lightgray" }} />
                    <AccountOption title={"Email"} value={user.email ? user.email : "Email not set"} />
                    <AccountOption title={"Phone Number"} value={user?.phoneNumber ? user?.phoneNumber : "Phone Number not set"} />
                    <AccountOption title={"Password"} value={"*********"} style={{ borderBottomLeftRadius: "7px", borderBottomRightRadius: "7px" }} />
                </div>

                <Link to="/"><button className="account__doneButton">Done</button></Link>
            </div>

        </div>
    )
}

export default Account;