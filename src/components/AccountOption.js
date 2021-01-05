import React, { useEffect, useState } from 'react';
import '../css/AccountOption.css';

import { auth } from '../firebase';
import { useStateValue } from '../StateProvider';

function AccountOption({ title, value, style }) {
    const [{ user }, dispatch] = useStateValue();
    const [update, setUpdate] = useState(false);
    const [input, setInput] = useState(value);

    const inputRef = React.createRef();

    useEffect(() => {
        if (update) {
            inputRef.current.focus();
        }
    }, [update])

    const updateItem = () => {
        switch (title) {
            case "Name":
                if (input) {
                    auth.currentUser.updateProfile({
                        displayName: input
                    }).then(() => {
                        dispatch({
                            type: 'SET_USER',
                            user: auth.currentUser
                        })
                        setUpdate(false);

                        alert("Successfully updated Name");
                    })
                } else {
                    alert("Please insert Name value");
                }

            case "Email":
                if (input) {
                    auth.currentUser.updateEmail(input)
                        .then(() => {
                            dispatch({
                                type: 'SET_USER',
                                user: auth.currentUser
                            })
                            setUpdate(false);

                            alert("Successfully updated Email");
                        })
                } else {
                    alert("Please insert valid Email")
                }

            case "Phone Number":
                if (input) {
                    auth.currentUser.updatePhoneNumber(input)
                        .then(() => {
                            dispatch({
                                type: 'SET_USER',
                                user: auth.currentUser
                            })
                            setUpdate(false);

                            alert("Successfully updated Phone Number");

                        })
                } else {
                    alert("Please insert valid Phone Number")
                }

            default:
                break;
        }


    }

    return (
        <div className="accountOption" style={style}>
            <div className="accountOption__container">
                <div className="accountOption__info">
                    <h3>{title}:</h3>
                    {!update ?
                        <p>{value}</p>
                        :
                        <input type="text" value={input} className="accountOption__input" onChange={(e) => { setInput(e.target.value) }} ref={inputRef} />
                    }
                </div>

                {!update ?
                    <button className="accountOption__edit" onClick={() => { setUpdate(true) }}>Edit</button>

                    :

                    <button className="accountOption__update" onClick={updateItem}>Update</button>
                }
            </div>
        </div>
    )
}

export default AccountOption;
