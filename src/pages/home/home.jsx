import { useState } from 'react';
import Marquee from 'react-fast-marquee';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import "./home.css"
import Header from '../../components/header/header';
import Hero from '../../components/hero/hero';
import Footer from '../../components/footer/footer';
import cargo_trucking from "../../assets/images/scaled/loading-shipping-container-onto-truck - 2000x1333.webp";
import cargo_clearing from "../../assets/images/scaled/cargo_clearing_1 - 2000x850.webp";
import cargo_on_truck_2000_850 from "../../assets/images/scaled/cargo_on_truck_1 - 2000x850.webp";
import cargo_ship_enroute from "../../assets/images/scaled/cargo_ship_enroute - 2000x1333.webp";
import { StatisticsCard, TestimonialCard } from "../../components/cards/cards";
import { ServiceAccordion } from '../../components/accordions/accordion';
import { HelmetSEO } from "../../components/SEO/helmet_seo";


export default function HomePage(
    { navData=[], services=[], milestones=[], phone_numbers=[], emails=[], socials=[], clients=[] }
) {
    const [serviceImage, setServiceImage] = useState(services[0].image_src);
    
    const settings = {
        autoplay_speed: 6000,
        transition_speed: 2000,
    }

    const slides_data = [
        { 
            image_src: cargo_ship_enroute, 
            alt_text: "Cargo Clearing", 
            heading: "Global Freight Delivered With Confidence", 
            sub_heading: "Reliable sea freight, customs clearance, and end-to-end logistics — moving your cargo safely across borders." 
        },
        { 
            image_src: cargo_clearing, 
            alt_text: "Cargo Clearing", 
            heading: "Let's handle the cargo clearing", 
            sub_heading: "" 
        },
        { 
            image_src: cargo_trucking, 
            alt_text: "Cargo Clearing", 
            heading: "Let's handle the cargo clearing", 
            sub_heading: "" 
        },
        { 
            image_src: cargo_on_truck_2000_850, 
            alt_text: "Cargo Clearing", 
            heading: "Let's handle the cargo clearing", 
            sub_heading: "" 
        },
    ];
    
    const testemonials_data = [
    {
        message: "Mirf Logistics has excellent customer service. I am very impressed.", 
        job_info: "Procurement Officer, XYZ Industries",
        name: "Dee", 
        // image_src: cargo_clearing,
    },
    {
        message: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quod, molestiae quas doloribus praesentium repellendus incidunt?", 
        job_info: "CTO, ABC Enterprises",
        name: "Client 2", 
        image_src: cargo_clearing,
    },
    {
        message: "Mirf Logistics has excellent customer service. I am very impressed.", 
        job_info: "Procurement Officer, XYZ Industries",
        name: "Dee", 
        // image_src: cargo_clearing,
    },
    {
        message: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quod, molestiae quas doloribus praesentium repellendus incidunt?", 
        job_info: "CTO, ABC Enterprises",
        name: "Client 2", 
        image_src: cargo_clearing,
    },
    {
        message: "Mirf Logistics has excellent customer service. I am very impressed.", 
        job_info: "Procurement Officer, XYZ Industries",
        name: "Dee", 
        // image_src: cargo_clearing,
    },
    {
        message: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quod, molestiae quas doloribus praesentium repellendus incidunt?", 
        job_info: "CTO, ABC Enterprises",
        name: "Client 2", 
        image_src: cargo_clearing,
    },
    ];

    const home_schema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Mirf Logistics",
        "url": "https://mirflogistics.com",
        "areaServed": "GH"
    };
    
    return (
        <>
            <HelmetSEO 
                title="Mirf Logistics | Shipping & Logistics Services in Ghana and Beyond"
                description="Mirf Logistics provides nationwide shipping, freight, warehousing, and customs clearance services across Ghana."
                canonical="https://mirflogistics.com/"
                schema={home_schema}
            />
            <div id="home-page" className="page">
                <Header navData={navData} />
                <div className="main-container">
                    <Hero slides_data={slides_data} settings={settings} />
                    <main className="main-content">
                        <div className="trust-reasons">
                            <h2 className="section-heading">
                                We are trusted because we are
                            </h2>
                            <Marquee speed={50} pauseOnHover>
                                <p style={{padding: "5px 50px"}}>
                                    Reliable
                                </p>
                                <p style={{padding: "5px 50px"}}>
                                    Trustworthy
                                </p>
                                <p style={{padding: "5px 50px"}}>
                                    Transparent
                                </p>
                                <p style={{padding: "5px 50px"}}>
                                    Quality-4
                                </p>
                            </Marquee>
                        </div>
                        <section className="md-message">
                            <div className="md-img-x-text">
                                <img src={cargo_on_truck_2000_850} alt="xxx" width="500" height="500" className="md-img" />
                                <div className="md-text-container">
                                    <h2 className="section-heading"> Words From Our MD</h2>
                                    <p className="md-text"> At Mirf Logistics, You Are More Than Just Business. Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat consequatur veniam dolores maiores ad earum quibusdam qui eligendi hic deleniti exercitationem ea harum quis mollitia, dolorum minus libero odit perspiciatis!</p>
                                </div>
                            </div>
                        </section>
                        <section id="brief-service">
                            <h2 className="section-heading">Our Services at a Glance</h2>
                            <div className="ic-x-slc">
                                <img src={serviceImage} alt="xxx" width="500" height="500" className="ic" />
                                <div className="slc">
                                    <ServiceAccordion accordion_data={services} image_setter={setServiceImage} />
                                </div>
                            </div>
                            <div className="cta-container">
                                <a href="/services" className="cta hyperlink">View All Services</a>
                                <a href="/contact#request-quote" className="cta hyperlink">Request Free Quote</a>
                            </div>
                        </section>
                        <section className="milestones">
                            <h2 className="section-heading">Our Milestones</h2>
                            <p className="section-sub-heading">We are reaching new milestones, thanks to you!</p>
                            <section id="statistics">
                                {milestones.map(({text1, text2}, idx) => (
                                    <StatisticsCard 
                                        key={idx} text1={text1} text2={text2}
                                    />
                                ))}
                            </section>
                        </section>
                        <section id="clients">
                            <h2 className="section-heading">Our Clients</h2>
                            <Marquee speed={50} pauseOnHover>
                                {[...clients, ...clients, ...clients].map((client_data, idx) => (
                                    <img key={idx} src={client_data.img_src} alt={client_data.alt_text} className="client-img" />
                                ))}
                            </Marquee>
                        </section>
                        <section id="testimonials-section">
                            <h3>Hear From Our Clients</h3>
                            <Swiper
                                modules={[Navigation, Autoplay]}
                                spaceBetween={50}
                                slidesPerView={1}
                                centeredSlides={true}
                                navigation
                                loop
                                autoplay={{
                                    delay: 3500,
                                    disableOnInteraction: false,
                                    pauseOnMouseEnter: true,
                                }}
                                scrollbar={{ draggable: true }}
                            >
                                {testemonials_data.map((testimonial, idx) => (
                                    <SwiperSlide key={idx}>
                                        <TestimonialCard testimonial={testimonial} />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </section>
                        <div className="cta-container">
                            <a href="/about" className="cta hyperlink">Get To Know Us</a>
                        </div>
                        <section className="map-section">
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.2220202329577!2d-0.06821452495488307!3d5.681016194300582!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf81aa35d081bb%3A0x7c91f876c518a8c0!2sMirf%20Logistics!5e0!3m2!1sen!2sgh!4v1765979204968!5m2!1sen!2sgh" width="600" height="540" style={{border: 0}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title='Mirf Logistics Location On Map' ></iframe>
                        </section>
                    </main>
                </div>
                <Footer nav_data={navData} phone_numbers={phone_numbers} emails={emails} socials={socials} />
            </div>
        </>
    )
}
