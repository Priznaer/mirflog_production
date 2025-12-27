import "./hero.css"
import { MediaSlider } from "../media_slider/media_slider";


export default function Hero({ slides_data, settings={}, children, classes }) {
  return (
    <section id="hero-section" className={classes} >
      {slides_data && 
        <MediaSlider slides_data={slides_data} settings={settings} />
      }
      { children }
    </section>
  )
}


export function MiniHero({img_SRC, alt, children}) {
  return (
    <div className="mini-hero">
      <div className="hero_img-x-overlay">
        <div className="hero-overlay"></div>
        <img src={img_SRC} alt={alt} width="500" height="300" className="hero_img" fetchpriority="high" />
      </div>
      <div className="hero-text">
        { children } 
      </div>
    </div>
  )
}
