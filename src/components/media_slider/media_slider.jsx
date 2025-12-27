import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faCircle, faCircleDot 
} from '@fortawesome/free-regular-svg-icons';

import "./media_slider.css";


export function MediaSlider({ slides_data=[], settings={}, slider_type="general" }) {
    const [current_index, setCurrentIndex] = useState(0);
    let slide_styles = {};
    let isActive = false;

    const current_settings = {
        autoplay_speed: 5000,
        transition_speed: 3000,
        ...settings
    };

    function handleNext() {
        setCurrentIndex(
            (prevIndex) => (prevIndex + 1) % slides_data.length
        );
    };

    // Auto-play slides
    useEffect(() => {
        const interval = setInterval(handleNext, current_settings.autoplay_speed);
        return () => clearInterval(interval);
    }, [current_settings.autoplay_speed, current_settings.transition_speed, current_index, slides_data.length]);
    
    if (slider_type.toLowerCase() === "general") {
        return (
            <div id="general-slider" className="slider-container">
            { slides_data.map((slide, idx) => {
                slide_styles = {};
                isActive = idx === current_index;
                slide_styles.transition = `opacity ${current_settings.transition_speed}ms ease-in-out`;
                slide_styles.opacity = isActive ? 1 : 0;
                slide_styles.pointerEvents = isActive ? 'auto' : 'none'; // prevent interaction on hidden slides
                return (
                    <div key={idx} className="slide-track" style={slide_styles} >
                        <div className="hero_img-x-overlay">
                            <div className="hero-overlay"></div>
                            <img src={slide.image_src} alt={slide.alt_text} width="500" height="500" className="hero_img img-fit" fetchpriority="high" />
                        </div>
                        <div className="hero-text">
                            { slide.heading && <p className="slide-heading">{ slide.heading }</p> }
                            { slide.sub_heading && <p className="slide-sub-heading">{ slide.sub_heading }</p> }
                            { slide.element && slide.element }
                        </div>
                    </div>
                )
            })}
              <div id="slider-nav-container">
                  <ul>
                  {
                      slides_data.map((slide_info, idx) => {
                          return (
                              idx === current_index ?
                              <li key={idx} className="slider-nav-item nav-item-active" onClick={() => setCurrentIndex(idx)} > 
                                <FontAwesomeIcon icon={faCircleDot} /> 
                              </li> :
                              <li key={idx} className="slider-nav-item" onClick={() => setCurrentIndex(idx)} > 
                                <FontAwesomeIcon icon={faCircle} />  
                              </li>
                          )
                      })
                  }
                  </ul>
              </div>
          </div>
        )
    }
}

