import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faHandshake, faLightbulb, faUserCheck, faPeopleGroup
} from '@fortawesome/free-solid-svg-icons';
import { 
    faPagelines
} from '@fortawesome/free-brands-svg-icons';

import "./about.css";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import cargo_clearing from "../../assets/images/cargo_clearing_1.jpg"
import compass_img from "../../assets/images/scaled/compass-1 - 750x500.webp";
import about_us from "../../assets/images/scaled/about-us-2.webp";
import { StatisticsCard } from "../../components/cards/cards";
import { HelmetSEO } from '../../components/SEO/helmet_seo';
import { MiniHero } from '../../components/hero/hero';


export default function AboutPage({ navData=[], milestones=[], phone_numbers=[], emails=[], socials=[] }) {
    return (
        <>
            <HelmetSEO
                title="About Mirf Logistics | Trusted Logistics Company in Ghana"
                description="Learn about Mirf Logistics, our mission, and our commitment to reliable logistics services across Ghana."
                canonical="https://mirflogistics.com/about"
            />
            <div id="about-page" className="page">
                <Header navData={navData} />
                <div className="main-container">
                    <MiniHero img_SRC={about_us} alt="About Us" >
                        <h1>About Us</h1>
                        <p>Get to know us</p>
                    </MiniHero>
                    <main className="main-content">
                        <div className="story-to-goals">
                            <div className="our-story">
                                <h2 className="heading">Our Story</h2>
                                <div className="body">
                                    <p>
                                        <span>
                                            Our journey began with a simple idea - to make logistics smarter, faster, and more dependable.
                                        </span> <span>
                                            From our humble beginnings, <span className="emphasize-mirf"> MIRF</span> has grown into a recognized name in the logistics industry, serving clients across industries with precision, integrity, and dedication.
                                        </span> <span>
                                            We have built our reputation on a foundation of trust, continuous improvement and customer focus. Our team's passion for logistics is what drives us to exceed expectations and make a positive impact across every supply chain we touch.
                                        </span>
                                    </p>
                                </div>
                            </div>
                            <div className="our-compass">
                                <img src={compass_img} alt="Image Of A Compass" className="guidance-img" />
                                <div className="mission-x-vision">
                                    <div className="our-vision">
                                        <h2 className="heading">Our Vision</h2>
                                        <div className="body">
                                            <p>
                                                To be the leading logistics provider, delivering exceptional services and value to our clients worldwide and connecting the work, one shipment at a time.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="our-mission">
                                        <h2 className="heading">Our Mission</h2>
                                        <div className="body">
                                            <p>
                                                To deliver personalized, efficient, and reliable logistics solution that meet the evolving needs of our clients, while building long-term relationships and driving business growth.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="our-goal">
                                        <h2 className="heading">Our Goal</h2>
                                        <div className="body">
                                            <p>
                                                Our goal is to become a leading force in logistics by delivering exceptional, reliable and efficient services to our valued clients. 
                                                With a deep commitment to customer satisfaction, we tailor each solution to meet the specific needs and challenges of our clients, fostering long-term partnerships built on trust and performance.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="core-values">
                            <h2 className="heading">Our Core Values</h2>
                            <p className="sub-heading">
                                Our values define who we are, how we operate, and what we stand for.
                            </p>
                            <div className="core-values-list">
                                <div className="core-value-item">
                                    <div className="core-value-icon-container">
                                        <FontAwesomeIcon icon={faUserCheck} className='core-value-icon' />
                                    </div>
                                    <h3 className="heading">Customer-Centric</h3>
                                    <div className="body">
                                        <p>
                                            We listen, we care, and we deliver. Our customers are our top priority, as such, every service is built around their specific needs, expectation and satisfaction.
                                        </p>
                                    </div>
                                </div>
                                <div className="core-value-item">
                                    <div className="core-value-icon-container">
                                        <FontAwesomeIcon icon={faHandshake} className='core-value-icon' />
                                    </div>
                                    <h3 className="heading">Integrity</h3>
                                    <div className="body">
                                        <p>
                                            We uphold what is right at all time - seen or unseen. Every decision is grounded in honesty, transparency, and unwavering accountability.
                                        </p>
                                    </div>
                                </div>
                                <div className="core-value-item">
                                    <div className="core-value-icon-container">
                                        <FontAwesomeIcon icon={faLightbulb} className='core-value-icon' />
                                    </div>
                                    <h3 className="heading">Innovation</h3>
                                    <div className="body">
                                        <p>
                                            We enhance change and technology to stay ahead of the curve. We are constantly exploring new ways to deliver smarter logistics.
                                        </p>
                                    </div>
                                </div>
                                <div className="core-value-item">
                                    <div className="core-value-icon-container">
                                        <FontAwesomeIcon icon={faPeopleGroup} className='core-value-icon' />
                                    </div>
                                    <h3 className="heading">Teamwork</h3>
                                    <div className="body">
                                        <p>
                                            Collaboration is the key to our success. We work together across departments and with clients to achieve shared goals.
                                        </p>
                                    </div>
                                </div>
                                <div className="core-value-item">
                                    <div className="core-value-icon-container">
                                        <FontAwesomeIcon icon={faPagelines} className='core-value-icon' />
                                    </div>
                                    <h3 className="heading">Sustainability</h3>
                                    <div className="body">
                                        <p>
                                            We are committed to green logistics practices that reduce our environmental impact anf support future generations.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="milestones">
                            <h2 className="section-heading">Our Milestones</h2>
                            <p className="section-sub-heading">We are reaching new milestones, thanks to you!</p>
                            <section id="statistics">
                                {milestones.map(({text1, text2}, idx) => (
                                    <StatisticsCard 
                                        key={idx} text1={text1} text2={text2}
                                    />
                                ))}
                            </section>
                        </div>
                    </main>
                </div>
                <Footer nav_data={navData} phone_numbers={phone_numbers} emails={emails} socials={socials} />
            </div>
        </>
    )
}
