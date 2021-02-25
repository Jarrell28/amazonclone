import React, { useEffect, useState } from 'react';
import '../css/Header.css';
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';

import { Link } from "react-router-dom";
import { useStateValue } from "../StateProvider";
import { auth } from '../firebase';

function Header() {
    const [{ basket, user }] = useStateValue();
    const [toggleMenu, setToggleMenu] = useState(false);

    useEffect(() => {
        // console.log(toggleMenu);
    }, [toggleMenu])

    const signOut = () => {
        auth.signOut();
    }

    const toggle = () => {
        toggleMenu ? setToggleMenu(false) : setToggleMenu(true);
    }

    const closeSubMenu = (e) => {
        if (toggleMenu) {
            setToggleMenu(false);
        }
    }

    return (
        <div className='header'>
            <Link to="/">
                <img className='header__logo' src="http://pngimg.com/uploads/amazon/amazon_PNG11.png" alt="amazon logo" />
            </Link>
            <div className="header__search">

                <input className="header__searchInput" type="text" autoComplete="off" />
                <SearchIcon className='header__searchIcon' />
            </div>

            <div className="header__nav">
                {/* Toggle Account Dropdown when user signed in */}
                {!user ?

                    <Link to={!user && "/login"}>
                        <div className='header__option'>
                            <span className='header__optionLineOne'>Hello {user ? user.email : "Guest"}</span>
                            {/* <span className='header__optionLineTwo' onClick={user ? signOut : ""} >{user ? 'Sign out' : 'Sign In'}</span> */}
                            <span className='header__optionLineTwo' >Your Account</span>

                        </div>
                    </Link>

                    :

                    <div className='header__option' >
                        <div className="header__optionAccount" onClick={toggle} >
                            <span className='header__optionLineOne'>Hello {user.email}</span>
                            <span className='header__optionLineTwo' >Your Account</span>
                        </div>

                        <div className={toggleMenu ? "header__dropdown active" : "header__dropdown"} onMouseLeave={closeSubMenu} >
                            <ul>
                                <li><Link to="/account">Your Account</Link></li>
                                <li onClick={signOut}><a className="header__signout" href="#">Sign out</a></li>
                            </ul>
                        </div>
                    </div>

                }

                <Link to="/orders">
                    <div className='header__option'>
                        <span className='header__optionLineOne'>Returns</span>
                        <span className='header__optionLineTwo'>& Orders</span>
                    </div>
                </Link>
                {/* <div className='header__option'>
                    <span className='header__optionLineOne'>Your</span>
                    <span className='header__optionLineTwo'>Prime</span>
                </div> */}


                <Link to="/checkout">
                    <div className='header__optionBasket'>
                        <ShoppingBasketIcon />
                        <span className='header__optionLineTwo header__basketCount'>{basket?.length}</span>
                    </div>
                </Link>
            </div>
        </div >
    )
}

export default Header;
