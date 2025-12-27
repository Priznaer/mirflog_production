import { Link } from 'react-router-dom';

import './navbar.css';


/* Internal sub-components */
function ImageAndText({ 
        containerClasses="default-card", 
        imgSRC=null, 
        imgClasses=null, 
        imgALT=null, 
        text=null, 
        textClasses=null, 
        onClick=null 
    }) {
    return (
        <div className={containerClasses} onClick={onClick}>
            {imgSRC && <img src={imgSRC} alt={imgALT} className={imgClasses} /> }
            <p className={textClasses}>{ text }</p>
        </div>
    )
}


export default function Navbar({ navData, mainNavClasses, handleToggleMenu }) {
    return (
        <nav id="main-nav" className={mainNavClasses}>
            {navData.map((navItem, idx) => {
                return (
                    <Link className={`hyperlink nav-link ${navItem.linkClasses}`} key={idx}  to={navItem.destination} >
                        <ImageAndText 
                            containerClasses={`nav-item ${navItem.containerClasses}`} 
                            text={navItem.text} 
                            textClasses={`nav-item-text ${navItem.textClasses}`}
                            onClick={handleToggleMenu} 
                        />
                    </Link>
                )
            })}            
        </nav>
    )
}

