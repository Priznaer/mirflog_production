import "./hero.css"


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
