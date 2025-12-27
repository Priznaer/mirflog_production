import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
    faPhone, faEnvelope
} from '@fortawesome/free-solid-svg-icons';

import "./footer.css"
import mirf_logo from "../../assets/images/scaled/mirf_logo-no_bg-compact.webp";


export default function Footer({nav_data=[], emails=[], phone_numbers=[], socials=[]}) {
  return (
    <div id="footer">
      <div className="company">
        <img src={mirf_logo} alt="Mirf Logistics Logo" width="120" height="120" className="logo" />
        <p className="company-text">
          Logistics is more than business to us, it's the link to great customer service
        </p>
      </div>
      <div className="sitemap">
        <h2 className="footer-heading">Sitemap</h2>
        {nav_data.map((data, idx) => (
          <Link key={idx} to={data.destination} className="sitemap-link" > {data.text} </Link>
        ))}
      </div>
      <div className="get-in-touch">
        <h2 className="footer-heading">Get In Touch</h2>
        <div className="phone-container">
          <FontAwesomeIcon icon={faPhone} className="icon" />
          <div className="phone-numbers">
            {phone_numbers.map((number, idx) => (
              <p key={idx} className="number">{number}</p>
            ))}
          </div>
        </div>
        <div className="email-container">
          <FontAwesomeIcon icon={faEnvelope} className="icon" />
          <div className="emails">
            {emails.map((email, idx) => (
              <p key={idx} className="number">{email}</p>
            ))}
          </div>
        </div>
        <div className="socials-container">
          {socials.map((social, idx) => (
            <Link key={idx} to={social.url} title={social.heading} target="_blank" rel="noopener noreferrer" >
              <FontAwesomeIcon icon={social.icon} className="icon" />
            </Link>
          ))}
        </div>
      </div>
      {/* <div className="working-hours">
        <h2 className="footer-heading">Office Hours</h2>
        <div className="working-hours-entry">
          <span>Monday - Friday</span>
          <FontAwesomeIcon icon={faArrowRight} />
          <span>7:00am to 5:00pm</span>
        </div>
      </div> */}
    </div>
  )
}
