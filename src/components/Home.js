import React from 'react';
import '../css/Home.css';

import Product from './Product';

function Home() {
    return (
        <div className="home">
            <div className="home__container">
                <img className="home__image" src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg" alt="" />


                <div className="home__row">
                    <Product id={1} title="A Promised Land" price={23.99} image="https://images-na.ssl-images-amazon.com/images/I/41L5qgUW2fL._SX327_BO1,204,203,200_.jpg" rating={5} />
                    <Product id={2} title="Kids Against Maturity: Card Game for Kids and Families, Super Fun Hilarious for Family Party Game Night" price={29.99} image="https://images-na.ssl-images-amazon.com/images/I/71-G22YUeHL._AC_SL1500_.jpg" rating={3} />

                </div>

                <div className="home__row">
                    <Product id={3} title="Beat That! - The Bonkers Battle of Wacky Challenges [Family Party Game for Kids & Adults]" price={24.99} image="https://images-na.ssl-images-amazon.com/images/I/91SppbW97cL._AC_SL1500_.jpg" rating={4} />
                    <Product id={4} title="LET'S GO! Binocular for Kids, Compact High Resolution Shockproof Binoculars" price={29.99} image="https://images-na.ssl-images-amazon.com/images/I/61k7Nu0BhHL._AC_SL1500_.jpg" rating={3} />
                    <Product id={5} title="Gskyer Telescope, 70mm Aperture 400mm AZ Mount Astronomical Refracting Telescope for Kids Beginners - Travel Telescope with Carry Bag, Phone Adapter and Wireless Remote" price={139.99} image="https://images-na.ssl-images-amazon.com/images/I/81nUym12AOL._AC_SL1500_.jpg" rating={5} />
                </div>

                <div className="home__row">
                    <Product title="YI Security Home Camera Baby Monitor, 1080p WiFi Smart Wireless Indoor Nanny IP Cam with Night Vision, 2-Way Audio, Motion Detection, Phone App, Pet Cat Dog Cam - Works with Alexa and Google" price={17.99} image="https://images-na.ssl-images-amazon.com/images/I/518Ngm46uuL._AC_SL1500_.jpg" rating={5} />

                </div>
            </div>
        </div>
    )
}

export default Home;