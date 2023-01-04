import { useEffect, useState } from 'react'
import './header.css'
import Image from '../images/KPW_logo.png'


export default function Header(props) {
    const [navMenu, setNavMenu] = useState(false)

    const handleNavMenu = () => {
        if (navMenu) {
            setNavMenu(false)
        } else {
            setNavMenu(true)
        }
    }

    useEffect(() => {
        const menu = document.querySelector('.header-nav-menu')
        const menuBtn = document.querySelector('.header-nav-btn')
        const menuBtnBurger = document.querySelector('.header-nav-btn-burger')
        const menuBtnBurgerActive = document.querySelector('.header-nav-btn-burger-active')
        window.addEventListener('mouseup', (e) => {
            if (e.target !== menu && e.target.parentNode !== menu && e.target !== menuBtn && e.target !== menuBtnBurger && e.target !== menuBtnBurgerActive) {
                setNavMenu(false)
            }
        })
    })
    return (
        <div className="header-wrapper">
            <div className="header">
                <div className="header-nav-btn"></div>
                <div className="header-logo-wrapper">
                    <a href="/">
                        <img className="header-logo" src={Image} alt="Koerner Pressure Washing Logo" />
                    </a>
                </div>
                <div className="header-nav-btn" onClick={handleNavMenu}>
                    <div className={navMenu ? "header-nav-btn-burger-active" : "header-nav-btn-burger"}></div>
                </div>
                <div className={navMenu ? "header-nav-menu" : "header-nav-menu-hidden"}>
                    <div className="header-nav-menu-btn-wrapper">
                        <a href="/" className={props.page === "home" ? "header-nav-menu-btn-active" : "header-nav-menu-btn"}>Home</a>
                    </div>
                    <div className="header-nav-menu-btn-wrapper">
                        <a href="/getquote" className={props.page === "getquote" ? "header-nav-menu-btn-active" : "header-nav-menu-btn"}>Get a Quote</a>
                    </div>
                    <div className="header-nav-menu-btn-wrapper">
                        <a href="/contact" className={props.page === "contact" ? "header-nav-menu-btn-active" : "header-nav-menu-btn"}>Contact</a>
                    </div>
                    <div className="header-nav-menu-btn-wrapper">
                        <a href="/reviews" className={props.page === "reviews" ? "header-nav-menu-btn-active" : "header-nav-menu-btn"}>Reviews</a>
                    </div>
                </div>
            </div>
        </div>
    )
}