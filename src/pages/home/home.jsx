import { useState } from 'react';
import Marquee from 'react-fast-marquee';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import "./home.css"
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import cargo_trucking from "../../assets/images/scaled/loading-shipping-container-onto-truck - 2000x1333.webp";
import cargo_clearing from "../../assets/images/scaled/cargo_clearing_1 - 2000x850.webp";
import cargo_on_truck_2000_850 from "../../assets/images/scaled/cargo_on_truck_1 - 2000x850.webp";
import cargo_ship_enroute from "../../assets/images/scaled/cargo_ship_enroute - 2000x1333.webp";
import offloading_cargo from "../../assets/images/scaled/offloading-cargo-at-destination - 2000x1125.webp";
import { StatisticsCard, TestimonialCard } from "../../components/cards/cards";
import { ServiceAccordion } from '../../components/accordions/accordion';
import { HelmetSEO } from "../../components/SEO/helmet_seo";


export default function HomePage(
    { navData=[], services=[], milestones=[], phone_numbers=[], emails=[], socials=[], clients=[] }
) {
    const [serviceImage, setServiceImage] = useState(services[0].image_src);

    const slides_data = [
        { 
            image_src: cargo_ship_enroute, 
            alt_text: "Cargo Being Transported Via Ship", 
            heading: "Global Freight Delivered With Confidence", 
            sub_heading: "Reliable sea freight, customs clearance, and end-to-end logistics — moving your cargo safely across borders." 
        },
        { 
            image_src: cargo_clearing, 
            alt_text: "Cargo Clearing At Port", 
            heading: "Expert Handling at the Port", 
            sub_heading: "Precise coordination to keep your supply chain moving" 
        },
        { 
            image_src: cargo_trucking, 
            alt_text: "Cargo Being Loaded Onto Truck", 
            heading: "Seamless Transition from Port to Road", 
            sub_heading: "Efficient loading processes that connect your cargo smoothly from port to transportation vehicles" 
        },
        { 
            image_src: cargo_on_truck_2000_850, 
            alt_text: "Cargo Being Transported By Truck", 
            heading: "Last-Mile Delivery", 
            sub_heading: "Reliable transportation to get your goods exactly where they need to be" 
        },
        { 
            image_src: offloading_cargo, 
            alt_text: "Offloading Cargo At Destination", 
            heading: "End-to-End Supply Chain Care", 
            sub_heading: "From securing your cargo to clearing customs and final delivery, we handle every step with care and precision" 
        },
    ];
    
    const testemonials_data = [
    {
        message: "We've relied on this company for our international shipments for the past three years, and they never fail to impress. Their on-time delivery rate is outstanding, and their team is always professional and responsive.", 
        job_info: "Supply Chain Manager",
        name: "Client 1", 
        // image_src: cargo_clearing,
    },
    {
        message: "Their logistics solutions have helped us reduce costs and expand into new markets. The team is proactive, innovative, and dedicated to customer success.", 
        job_info: "CFO, ABC Enterprises",
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
        message: "We’ve never experienced a single issue with cargo safety or delays. Their attention to detail and commitment to security is unmatched in the industry.", 
        job_info: "Operations Manager",
        name: "Client 4", 
        image_src: cargo_clearing,
    },
    {
        message: "Mirf Logistics has excellent customer service. I am very impressed.", 
        job_info: "Procurement Officer, XYZ Industries",
        name: "Dee", 
        // image_src: cargo_clearing,
    },
    {
        message: "Anytime we have a question or need assistance, their support team is quick to respond and resolve issues. It truly feels like they are an extension of our team.", 
        job_info: "CTO, ABC Enterprises",
        name: "Client 6", 
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
                    <div id="hero-section">
                        <Swiper
                            modules={[Navigation, Autoplay]}
                            spaceBetween={50}
                            slidesPerView={1}
                            centeredSlides={true}
                            navigation
                            loop
                            speed={1500}
                            autoplay={{
                                delay: 3500,
                                disableOnInteraction: false,
                                pauseOnMouseEnter: false,
                            }}
                            scrollbar={{ draggable: true }}
                        >
                            {slides_data.map((data, idx) => (
                                <SwiperSlide key={idx}>
                                    <div className="hero-slide" >
                                        <div className="hero_img-x-overlay">
                                            <div className="hero-overlay"></div>
                                            <img src={data.image_src} alt={data.alt_text} width="500" height="500" className="hero_img img-fit" fetchpriority="high" />
                                        </div>
                                        <div className="hero-text">
                                            { data.heading && <p className="slide-heading">{ data.heading }</p> }
                                            { data.sub_heading && <p className="slide-sub-heading">{ data.sub_heading }</p> }
                                            { data.element && data.element }
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                    <main className="main-content">
                        <div className="trust-reasons">
                            <h2 className="section-heading">
                                We are trusted because we are
                            </h2>
                            <Marquee speed={50}>
                                <p style={{padding: "5px 50px"}}> Reliable </p>
                                <p style={{padding: "5px 50px"}}> Trustworthy </p>
                                <p style={{padding: "5px 50px"}}> Transparent </p>
                                <p style={{padding: "5px 50px"}}> Innovative </p>
                                <p style={{padding: "5px 50px"}}> Experienced </p>
                            </Marquee>
                        </div>
                        <section className="md-message">
                            <div className="md-img-x-text">
                                <img src={cargo_on_truck_2000_850} alt="Managing Director's Image" width="500" height="500" className="md-img" />
                                <div className="md-text-container">
                                    <h2 className="section-heading"> A Word From Our MD</h2>
                                    <p className="md-text"> 
                                        At Mirf logistics, we believe that a successful supply chain is the backbone of every great business. 
                                        <em> Mirf Logistics is not just a business</em> - we are a reliable, and innovative logistics company that makes connecting your products with the world effortless.
                                    </p>
                                </div>
                            </div>
                        </section>
                        <section id="brief-service">
                            <h2 className="section-heading">Our Services at a Glance</h2>
                            <div className="ic-x-slc">
                                <img src={serviceImage} alt="Service Image" width="500" height="500" className="ic" />
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
                            <Marquee speed={50} pauseOnHover={false}>
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
                                speed={1500}
                                autoplay={{
                                    delay: 3500,
                                    disableOnInteraction: false,
                                    pauseOnMouseEnter: false,
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
