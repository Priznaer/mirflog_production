import { Link } from 'react-router-dom'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faBars, faXmark
} from '@fortawesome/free-solid-svg-icons';

import './header.css'
import Navbar from '../navbar/navbar'
import mirf_logo from "/mirf_logo - cropped_text - 500x428.webp"


export default function Header({ navData }) {
    const [menuActive, setMenuActive] = useState(false)
    
    function handleToggleMenu() {
        const nav = document.getElementById("main-nav")
        nav.classList.toggle("menu-active")
        setMenuActive(!menuActive)
    }

    return (
        <header id="main-header">
            <Link to="/" className="hyperlink">
                <div className="logo">
                    <img src={mirf_logo} alt='Mirf Logistics Logo' width="50" height="50" className="logo-image" />
                    <span className="logo-text"> Mirf Logistics </span>
                </div>
            </Link>

            <Navbar navData={navData} handleToggleMenu={handleToggleMenu} />

            {
                menuActive ? 
                <FontAwesomeIcon icon={faXmark} id='menu-icon' onClick={handleToggleMenu} /> :
                <FontAwesomeIcon icon={faBars} id='menu-icon' onClick={handleToggleMenu} />
            }
        </header>
    )
}
