import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./slick_slider.css"


export function SlickSlider({ settings, slides }) {
    const default_settings = {
        dots: true,
        arrows: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 3000,
        fade: true,
        appendDots: dots => (
            <ul style={{ display: "flex", justifyContent: "center", gap: 8 }}>{dots}</ul>
        ),
        customPaging: () => (
            <a> <li className="slider-disc"></li> </a>
        ),
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    dot: false
                },
            },
        ],
    };

    const merged_settings = { ...default_settings, ...settings };
    return (
        <Slider { ...merged_settings }>
            {slides.map((slide, idx) => (
                <div key={idx} className="slide-container">
                    {slide}
                </div>                    
            ))}
        </Slider>
    )
}