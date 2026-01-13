import "./gallery.css";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import about_us from "../../assets/images/scaled/about-us-2.webp";
import { HelmetSEO } from '../../components/SEO/helmet_seo';
import { MiniHero } from '../../components/hero/hero';


export default function GalleryPage({ navData=[], phone_numbers=[], emails=[], socials=[] }) {
    return (
        <>
            <HelmetSEO
                title="Mirf Logistics Gallery | Trusted Logistics Company in Ghana"
                description="Explore our gallery - media highlights showcasing our solutions and our contributions to society."
                canonical="https://mirflogistics.com/gallery"
            />
            <div id="about-page" className="page">
                <Header navData={navData} />
                <div className="main-container">
                    <MiniHero img_SRC={about_us} alt="Our Gallery" >
                        <h1>Our Gallery</h1>
                        <p>Explore our gallery - media highlights showcasing our solutions and our contributions to society </p>
                    </MiniHero>
                    <main className="main-content">
                        <h2 style={{textAlign: "center", color: "var(--primary-color)", fontWeight: "bolder", fontSize: "60px"}}>Work In Progress ......</h2>
                    </main>
                </div>
                <Footer nav_data={navData} phone_numbers={phone_numbers} emails={emails} socials={socials} />
            </div>
        </>
    )
}
