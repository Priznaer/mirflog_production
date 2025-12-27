import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
    faQuoteLeft, faQuoteRight
} from "@fortawesome/free-solid-svg-icons";

import "./cards.css"


export function StatisticsCard({ text1, text2 }) {
    return (
        <div className="stat-card">
            <p className="stat-heading"> { text1 } </p>
            <p className="stat-body"> {text2} </p>
        </div>
    )
}

export function TestimonialCard({testimonial}) {
    return (
        <div className="testimonial-card">
            <div className="left-quote-container">
                <FontAwesomeIcon icon={faQuoteLeft} />
            </div>
            <div className="message-x-testifier">
                <div className="message-container">
                    <p className="message">{ testimonial.message }</p>
                </div>
                <div className="testifier-container">
                    {testimonial.image_src && 
                        <img src={testimonial.image_src} alt="Client Company Logo" className="company-logo" />
                    }
                    <div className="testifier-info">
                        <p className={`testifier-name ${!testimonial.image_src && "tac"}`} >{ testimonial.name }</p>
                        <p className="testifier-position">{ testimonial.job_info }</p>
                    </div>
                </div>
            </div>
            <div className="right-quote-container">
                <FontAwesomeIcon icon={faQuoteRight} />
            </div>
        </div>
    )
}


export function ServicesCard({service_data}) {
    const card_id = service_data.url.split("/")[2];
    
    return (
        <div id={card_id} className="service-card">
            <img src={service_data.image_src} alt={service_data.alt_text} width="450" height="250" className="service-img img-fit" />
            <div className="service-text">
                <h2 className="service-heading truncated-text-2">{ service_data.heading }</h2>
                <div className="service-body truncated-text-3">{ service_data.body }</div>
                <div className="service-cta cta-container">
                    <Link to={service_data.url} className="cta hyperlink">Read More</Link>
                </div>
            </div>
        </div>
    )
}
