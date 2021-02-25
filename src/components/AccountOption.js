import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../css/AccountOption.css';

import { auth } from '../firebase';
import { useStateValue } from '../StateProvider';

function AccountOption({ title, value, style }) {
    const [{ }, dispatch] = useStateValue();
    const [update, setUpdate] = useState(false);
    const [input, setInput] = useState(value);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const history = useHistory();

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
                break;

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
                break;

            case "Password":
                if (password === confirmPassword) {
                    auth.currentUser.updatePassword(password)
                        .then(() => {
                            setUpdate(false);

                            alert("Successfully updated Password");

                        }).catch(err => {
                            if (err.code === "auth/requires-recent-login") {
                                alert("Must sign in again to update password");
                                history.push('/login');
                            } else {
                                alert(err.message);
                            }
                        })
                } else {
                    alert("Passwords must match!")
                }
                break;

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
                        title === "Password" ?

                            <div>
                                <input type="password" value={password} className="accountOption__input" onChange={(e) => { setPassword(e.target.value) }} ref={inputRef} placeholder="New Password" />

                                <input type="password" value={confirmPassword} className="accountOption__input" onChange={(e) => { setConfirmPassword(e.target.value) }} placeholder="Confirm Password" />
                            </div>
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
