import { useEffect, useState } from "react";
import "./accordion.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowRight } from "@fortawesome/free-solid-svg-icons";


export function ServiceAccordion({accordion_data, image_setter}) {
    const [accordionOpen, setAccordionOpen] = useState(true);
    const [activeAccordion, setActiveAccordion] = useState(0);

    const updateMaxHeight = (idx, height) => {
        const accordion_item = document.getElementById(`accordion-body-${idx}`);
        if (height === 0) {
            accordion_item.style.maxHeight = "0px";
        } else {
            accordion_item.style.maxHeight = accordion_item.scrollHeight + "px";
        }
    };

    useEffect(() => {
        updateMaxHeight(0, null);
    }, []);

    const handleAccordionToggle = (idx, image_src) => {
        if (accordionOpen && activeAccordion === idx) {
            updateMaxHeight(idx, 0);
            setAccordionOpen(false);
            setActiveAccordion(null);
        } else if (accordionOpen && activeAccordion !== idx) {
            updateMaxHeight(activeAccordion, 0);
            updateMaxHeight(idx, null);
            setActiveAccordion(idx);
            setAccordionOpen(true);
        } else {
            updateMaxHeight(idx, null);
            setActiveAccordion(idx);
            setAccordionOpen(true);
        }
        image_setter(image_src);
    };

    return (
        <div className="service-accordion">
            {accordion_data.map((service_data, idx) => (                
                <div key={idx} className="accordion-item">
                    <div className="accordion-header" onClick={() => handleAccordionToggle(idx, service_data.image_src)}>
                        {
                            activeAccordion === idx && accordionOpen ? 
                            <FontAwesomeIcon icon={faArrowDown} className="accordion-icon" /> : 
                            <FontAwesomeIcon icon={faArrowRight} className="accordion-icon" />
                        }
                        <p className="service-heading">{service_data.heading}</p>
                    </div>
                    <div id={`accordion-body-${idx}`} className={`accordion-body${activeAccordion === idx && accordionOpen ? " visible" : ""}`}>
                        <p className="service-description">{service_data.body}</p>
                        <Link to={service_data.url} className="accordion-cta">Read More</Link>
                    </div>
                </div>
            ))}
        </div>
    )
}
