import React, { useState } from 'react';
import './header.css';
import Search from '../search/Search';
import { Link, useLocation } from "react-router-dom";
import Order from '../../data/Order';
import { subMenuItems, categories } from '../../data/Categories';

const Header = () => {
    const location = useLocation();
    const [navToggle, showMenu] = useState(false);
    const [showSubMenu, setShowSubMenu] = useState(false);
    const [showSubMenuMobile, setShowSubMenuMobile] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    // Function to toggle search
    const toggleSearch = () => {
        // Check if nav bar is not toggled
        if (!navToggle) {
            setIsOpen(!isOpen); // Toggle search
        }
    };

    return (
        <header className='header'>
            <a href="/index.html" className={navToggle ? "nav__logo-small-under" : "nav__logo-small"}>Mollywlove</a>
            <nav className='nav container'>
                <div className="nav__toggle" onClick={() => showMenu(!navToggle)}>
                    <i className='uil uil-bars'></i>
                </div>
                {/* Phone */}
                <div className="nav__phone grid">
                    <i className="nav__phone-icon uil uil-phone"></i>
                    <p className='nav__phone-number'>+7 123456789</p>
                </div>
                <div className={navToggle ? 'nav__overlay' : ''}>
                    {/* Nav left */}
                    <div className={navToggle ? "nav__menu show-menu" : "nav__menu"}>
                        {navToggle ? <i className="uil uil-times nav__close" onClick={() => { showMenu(!navToggle); setShowSubMenuMobile(false); }}></i>
                            : <></>}

                        <div className={`nav__menu-container ${!showSubMenuMobile ? "show-nav-menu" : ""}`}>
                            <div className='nav__list-first'>
                                <ul className='nav__list grid'>
                                    <li className="nav__item">
                                        <a href="/" className={`nav__link ${location.pathname === '/' || location.pathname === '/index.html'
                                            || location.pathname === '/home' ? 'active-link' : ''}`}>ГЛАВНАЯ</a>
                                    </li>
                                    <li className="nav__item">
                                        <a href="/all" className={`nav__link ${location.pathname === '/all' ? 'active-link' : ''}`}>ВСЕ</a>
                                    </li>
                                    <li className="nav__item">
                                        <a href="/new" className={`nav__link ${location.pathname === '/new' ? 'active-link' : ''}`}>НОВИНКИ</a>
                                    </li>
                                </ul>
                            </div>

                            {/* Logo */}
                            <Link to="/index.html" className='nav__logo-large'>Mollywlove</Link>

                            <div className='nav__list-second'>
                                {/* Nav right */}
                                <ul className='nav__list grid'>
                                    {/* Left-arrow for small device */}

                                    <li className='nav-parent__item grid'
                                        onMouseEnter={() => window.innerWidth > 992 && setShowSubMenu(true)}  // Hover effect only for large devices
                                        onMouseLeave={() => window.innerWidth > 992 && setShowSubMenu(false)}  // Hover effect only for large devices 
                                    >

                                        <li className="nav__item">
                                            <a href="/clothes" className={`nav__link ${location.pathname === '/clothes' ? 'active-link' : ''}`}>
                                                <div className='parent-item'>
                                                    <span className="category-text">ОДЕЖДА</span>
                                                    <i className="uil uil-angle-down down-icon"></i>

                                                </div>
                                            </a>
                                            {showSubMenu && window.innerWidth > 992 && (
                                                <ul className="sub-menu-desktop__category">
                                                    <div className='sub-menu-desktop__category-container'>
                                                        <div className='sub-menu-fashionable'>
                                                            <p className='sub-menu-property'>МОДНЫЙ</p>
                                                            {subMenuItems.slice(0, 4).map((item) => (
                                                                <li className='sub-menu__item' key={item.cateName}>
                                                                    <a href={item.url} className={`nav__link sub-menu__link  ${location.pathname === item.url ? 'active-link sub-menu__link' : 'sub-menu__link'}`}>
                                                                        {item.display}
                                                                    </a>
                                                                </li>
                                                            ))}
                                                        </div>
                                                        <div className='sub-menu-casual'>
                                                            <p className='sub-menu-property'>ПОВСЕДНЕВНЫЙ</p>
                                                            {subMenuItems.slice(4, 8).map((item) => (
                                                                <li className='sub-menu__item' key={item.cateName}>
                                                                    <a href={item.url} className={`nav__link sub-menu__link  ${location.pathname === item.url ? 'active-link sub-menu__link' : 'sub-menu__link'}`}>
                                                                        {item.display}
                                                                    </a>
                                                                </li>
                                                            ))}
                                                        </div>
                                                        <div className='sub-menu-comfortable'>
                                                            <p className='sub-menu-property'>КОМФОРТНЫЙ</p>
                                                            {subMenuItems.slice(8, 12).map((item) => (
                                                                <li className='sub-menu__item' key={item.cateName}>
                                                                    <a href={item.url} className={`nav__link sub-menu__link  ${location.pathname === item.url ? 'active-link sub-menu__link' : 'sub-menu__link'}`}>
                                                                        {item.display}
                                                                    </a>
                                                                </li>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </ul>
                                            )}
                                            <i className="uil uil uil-angle-right right-arrow-icon" onClick={() => window.innerWidth <= 992 && setShowSubMenuMobile(!showSubMenuMobile)}></i>
                                        </li>
                                    </li>

                                    <li className="nav__item">
                                        <a href="/accessories" className={`nav__link ${location.pathname === '/accessories' ? 'active-link' : ''}`}>АКСЕССУАРЫ</a>
                                    </li>

                                    <li className="nav__item">
                                        <a href="/bijouterie" className={`nav__link ${location.pathname === '/bijouterie' ? 'active-link' : ''}`}>БИЖУТЕРИЯ</a>
                                    </li>


                                </ul>

                            </div>

                        </div>

                        <ul className={`sub-menu__category ${showSubMenuMobile && window.innerWidth <= 992 ? "show-sub-menu" : ""}`}>
                            <div className='back__container grid'> <i className="uil uil uil-angle-left left-arrow-icon" onClick={() => setShowSubMenuMobile(!showSubMenuMobile)}></i>
                                {window.innerWidth <= 992 && ( // Check for mobile devices
                                    <a href="/clothes" className={`nav__link current-parent ${location.pathname === '/clothes' ? 'active-link' : ''}`}>
                                        ОДЕЖДА
                                    </a>
                                )}
                            </div>

                            <div className='sub-menu-fashionable-mobile'>
                                <p className='sub-menu-property-mobile'>МОДНЫЙ</p>
                                {subMenuItems.slice(0, 4).map((item) => (
                                    <li className='sub-menu__item' key={item.cateName}>
                                        <a href={item.url} className={`nav__link sub-menu__link  ${location.pathname === item.url ? 'active-link sub-menu__link' : 'sub-menu__link'}`}>
                                            {item.display}
                                        </a>
                                    </li>
                                ))}
                            </div>

                            <div className='sub-menu-casual-mobile'>
                                <p className='sub-menu-property-mobile'>ПОВСЕДНЕВНЫЙ</p>
                                {subMenuItems.slice(4, 8).map((item) => (
                                    <li className='sub-menu__item' key={item.cateName}>
                                        <a href={item.url} className={`nav__link sub-menu__link  ${location.pathname === item.url ? 'active-link sub-menu__link' : 'sub-menu__link'}`}>
                                            {item.display}
                                        </a>
                                    </li>
                                ))}
                            </div>

                            <div className='sub-menu-comfortable-mobile'>
                                <p className='sub-menu-property-mobile'>КОМФОРТНЫЙ</p>
                                {subMenuItems.slice(8, 12).map((item) => (
                                    <li className='sub-menu__item' key={item.cateName}>
                                        <a href={item.url} className={`nav__link sub-menu__link  ${location.pathname === item.url ? 'active-link sub-menu__link' : 'sub-menu__link'}`}>
                                            {item.display}
                                        </a>
                                    </li>
                                ))}
                            </div>
                        </ul>

                    </div>
                </div>


                <div className="icon__container">
                    <Search isOpen={isOpen} toggleSearch={toggleSearch} /> {/* Pass the custom toggleSearch function */}
                    {!isOpen && (
                        <a href='/cart' className="cart__icon">
                            <div className='uil uil-shopping-cart-alt cart-icon-icon'></div>
                            {parseInt(Order.numOrders) > 0 ? <span className='num-orders'>{Order.numOrders}</span> : <div></div>}
                        </a>
                    )}
                </div>
            </nav>
        </header>
    )

}

export default Header;
