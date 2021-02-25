import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import "../css/Login.css";

import { auth } from "../firebase";

function Login() {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // useEffect(() => {

    //     if (auth.currentUser) {
    //         history.push("/");
    //     }
    // }, [history])

    const signIn = e => {
        e.preventDefault();

        //firebase login functionality
        auth.signInWithEmailAndPassword(email, password).then((auth) => {
            if (auth) {
                history.push("/")
            }
        }).catch(error => alert(error.message));

    }

    const register = e => {
        e.preventDefault();

        //firebase register functionality
        auth.createUserWithEmailAndPassword(email, password).then((auth) => {
            //created user successfully
            console.log(auth);
            if (auth) {
                history.push("/");
            }
        }).catch(error => alert(error.message));
    }

    return (
        <div className="login">
            <Link to="/">
                <img className="login__logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png" alt="Amazon logo" />
            </Link>

            <div className="login__container">
                <h1>Sign-In</h1>
                <form action="">
                    <h5>E-Mail</h5>
                    <input type="text" value={email} onChange={e => setEmail(e.target.value)} />

                    <h5>Password</h5>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} />

                    <button type="submit" className="login__signInButton" onClick={signIn}>Sign In</button>
                </form>

                <p>By signing-in, you agree to Clone Amazon's Conditions of Use & Sale. Please see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.</p>

                <button className="login__registerButton" onClick={register}>Create your Amazon account</button>
            </div>
        </div>
    )
}

export default Login;