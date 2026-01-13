import { Navigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";

import "./services.css"
import service_hero_img from "../../assets/images/scaled/services - 889x500.webp";
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import { ServicesCard } from "../../components/cards/cards";
import { Modal } from "../../components/modals/modals";
import { HelmetSEO } from "../../components/SEO/helmet_seo";
import { MiniHero } from "../../components/hero/hero";


export default function ServicesPage({ navData=[], services=[], phone_numbers=[], emails=[], socials=[] }) {
  const { target_service } = useParams();
  const target_service_data = services.find(service_data => service_data.url.includes(target_service));

  if (target_service && !target_service_data) {
    return <Navigate to="/not-found" replace />;
  }

  const getServiceSchema = (service_name) => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": service_name,
      "provider": {
        "@type": "Organization",
        "name": "Mirf Logistics"
      },
      "areaServed": {
        "@type": "Country",
        "name": "Ghana"
      }
    }
    return schema;
  }
  
  return (
    <div id="services-page" className="page">
      {!target_service && <HelmetSEO
          title="Our Services | Mirf Logistics Ghana"
          description="Explore services offered by Mirf Logistics including freight, warehousing, customs clearance, and nationwide logistics services."
          canonical="https://mirflogistics.com/services"
      />}
      <Header navData={navData} />
      <div className="main-container">
          {!target_service && <MiniHero img_SRC={service_hero_img} alt="Service Hero Image" >
            { !target_service ? <h1>Our Services</h1> : <h2>Our Services</h2> }
            <p>We Provide Comprehensive Logistics Solutions</p>
          </MiniHero>}
          <main className="main-content">
            <div className="introduction-container">
              <p className="intro-hype"> Reliable Solutions That Drive Growth </p>
              <div className="separator"></div>
              <p className="intro-paragraph">
                We are here to help make your business run smoother. Whether it’s packaging, rebranding, storage, or other services, we have you covered. Our team is all about providing practical solutions that fit your needs and help your business grow. Let’s work together to take your operations to the next level — easy, reliable, and hassle-free.
              </p>
            </div>
            <div className="services-container">
              {services.map((service, idx) => (
                <ServicesCard key={idx} service_data={service} />
              ))}
            </div>
          {target_service === "customs-brokerage-and-clearance" && <Modal close_destination="/services">
            <HelmetSEO
              title={`${target_service_data.heading} | Mirf Logistics`}
              description="Reliable customs brokerage and clearance services across Ghana. Mirf Logistics has years of experience navigating customs processes."
              canonical={`https://mirflogistics.com/services/${target_service}`}
              schema={getServiceSchema(`${target_service_data.heading}`)}
            />
            <div id="customs-brokerage-and-clearance-modal" className="modal-content">
              <img src={target_service_data.image_src} alt={target_service_data.alt_text} width="500" height="300" className="modal-content-img img-fit" />
              <h1 className="modal-content-heading"> {target_service_data.heading} </h1>
                <p>{ target_service_data.body }</p>
                <div className="service-benefits-container">
                  <p>Key Service Benefits: </p>
                  <ul className="service-benefits">
                    {[
                      "Expert Handling of Customs Documentation: Ensuring all paperwork is accurate and complete.", 
                      "Regulatory Compliance: Keeping your shipments aligned with local and international laws.", 
                      "Duty & Tax Management: Calculating and managing applicable duties, taxes, and tariffs.", 
                      "Minimized Delays: Streamlining procedures for quick and efficient clearance.", 
                      "Risk Reduction: Avoiding penalties through thorough compliance checks.", 
                      "Real-Time Updates: Keeping you informed throughout the process.", 
                    ].map((benefit, idx) => (
                      <li key={idx} className="service-benefit-item">
                        <FontAwesomeIcon icon={faCircleCheck} />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
                <p>
                  Partner with us for a hassle-free customs clearance process, allowing you to focus on growing your business.
                </p>
            </div>
          </Modal>}
            
          {target_service === "distribution-and-supply-chain-management" && <Modal close_destination="/services">
            <HelmetSEO
              title={`${target_service_data.heading} | Mirf Logistics`}
              description={`${target_service.body}`}
              canonical={`https://mirflogistics.com/services/${target_service}`}
              schema={getServiceSchema(`${target_service_data.heading}`)}
            />
            <div id="distribution-and-supply-chain-management-modal" className="modal-content">
              <img src={target_service_data.image_src} alt={target_service_data.alt_text} width="500" height="300" className="modal-content-img img-fit" />
              <h1 className="modal-content-heading"> {target_service_data.heading} </h1>
                <p>{ target_service_data.body }</p>
                <div className="service-benefits-container">
                  <p>Key Service Benefits: </p>
                  <ul className="service-benefits">
                    {[
                      "End-to-End Supply Chain Optimization: Seamlessly coordinate every stage from source onboarding to final delivery.", 
                      "Real-Time Tracking and Visibility: Monitor shipments and inventory status at every step with advanced tracking tools.", 
                      "Cost Reduction: Identify and eliminate inefficiencies to lower transportation and storage costs.", 
                      "Risk Management: Mitigate disruptions through proactive planning and contingency strategies.", 
                    ].map((benefit, idx) => (
                      <li key={idx} className="service-benefit-item">
                        <FontAwesomeIcon icon={faCircleCheck} />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
                <p>
                  Our comprehensive solutions are designed to optimize your entire supply chain - from procurement to delivery - ensuring your products reach the right place, at the right time, and in perfect condition.
                </p>
              </div>
          </Modal>}
            
          {target_service === "digitization" && <Modal close_destination="/services">
            <HelmetSEO
              title={`${target_service_data.heading} | Mirf Logistics`}
              description={`${target_service.body}`}
              canonical={`https://mirflogistics.com/services/${target_service}`}
              schema={getServiceSchema(`${target_service_data.heading}`)}
            />
            <div id="digitization-modal" className="modal-content">
              <img src={target_service_data.image_src} alt={target_service_data.alt_text} width="500" height="300" className="modal-content-img img-fit" />
              <h1 className="modal-content-heading"> {target_service_data.heading} </h1>
                <p>{ target_service_data.body }</p>
                <div className="service-benefits-container">
                  <p>Key Service Benefits: </p>
                  <ul className="service-benefits">
                    {[
                      "Real-Time Tracking: Monitor shipments and inventory status instantly, providing full visibility and improved decision-making.", 
                      "Cost Savings: Lower operational costs by reducing paperwork, manual labor, and processing times.", 
                      "Competitive Advantage: Stay ahead of the market with innovative, technology-driven supply chain solutions.", 
                      "Paperless Documentation: Eliminate paperwork delays and errors through digital documentation, ensuring faster processing and compliance.", 
                      "Data-Driven Insights: Utilize advanced analytics for better forecasting, planning, and strategic decisions.", 
                      "Enhanced Speed & Efficiency: Accelerate operations by automating routine tasks and reducing manual interventions.", 
                      "Automated Inventory Management: Reduce errors and save time with intelligent inventory systems that automatically update stock levels and reorder points.", 
                    ].map((benefit, idx) => (
                      <li key={idx} className="service-benefit-item">
                        <FontAwesomeIcon icon={faCircleCheck} />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
                <p>
                  Partner with us to unlock the full potential of your supply chain through smart digitization. Experience faster, more accurate, and more efficient operations that empower your business to thrive in a digital world.
                </p>
              </div>
          </Modal>}
            
          {target_service === "freight-forwarding-and-transportation" && <Modal close_destination="/services">
            <HelmetSEO
              title={`${target_service_data.heading} | Mirf Logistics`}
              description={`${target_service.body}`}
              canonical={`https://mirflogistics.com/services/${target_service}`}
              schema={getServiceSchema(`${target_service_data.heading}`)}
            />
            <div id="freight-forwarding-and-transportation-modal" className="modal-content">
              <img src={target_service_data.image_src} alt={target_service_data.alt_text} width="500" height="300" className="modal-content-img img-fit" />
              <h1 className="modal-content-heading"> {target_service_data.heading} </h1>
                <p>{ target_service_data.body }</p>
                <div className="service-benefits-container">
                  <p>Key Service Benefits: </p>
                  <ul className="service-benefits">
                    {[
                      "Comprehensive Freight Solutions: Covering air, sea, and road, transportation to suit your timeline and budget.", 
                      "End-to-End Logistics Management: From booking and documentation to customs clearance and delivery, we handle every step.", 
                      "Cargo Consolidation: Reduce costs through efficient consolidation of shipments, minimizing handling and storage.", 
                      "Secure Transportation: The safety and security of your goods with proper handling, packaging, and insurance options is assured.", 
                      "Regulatory Compliance: We navigate complex international regulations and customs procedures effortlessly.", 
                      "Flexible Scheduling: Adapt to your supply chain demands with reliable scheduling and timely pickups/deliveries.", 
                    ].map((benefit, idx) => (
                      <li key={idx} className="service-benefit-item">
                        <FontAwesomeIcon icon={faCircleCheck} />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
                <p>
                  Partner with us for freight forwarding and transportation services that deliver reliability, efficiency, and peace of mind. We are committed to transporting your cargo securely and promptly, helping your business grow globally.
                </p>
              </div>
          </Modal>}
            
          {target_service === "packaging-and-rebranding" && <Modal close_destination="/services">
            <HelmetSEO
              title={`${target_service_data.heading} | Mirf Logistics`}
              description={`${target_service.body}`}
              canonical={`https://mirflogistics.com/services/${target_service}`}
              schema={getServiceSchema(`${target_service_data.heading}`)}
            />
            <div id="packaging-and-rebranding-modal" className="modal-content">
              <img src={target_service_data.image_src} alt={target_service_data.alt_text} width="500" height="300" className="modal-content-img img-fit" />
              <h1 className="modal-content-heading"> {target_service_data.heading} </h1>
                <p>{ target_service_data.body }</p>
                <div className="service-benefits-container">
                  <p>Key Service Benefits: </p>
                  <ul className="service-benefits">
                    {[
                      "Cost-Effective Solutions: Optimize packaging costs without compromising quality or brand impact.", 
                      "Enhanced Shelf Appeal: Create eye-catching packaging that attracts consumers and boosts sales.", 
                      "Custom Packaging Design: Creative, functional, and attractive packaging tailored to your brand and product specifications.", 
                      "Brand Identity Enhancement: Reimagine your packaging to reflect your evolving brand image and market positioning.", 
                      "Product Protection: Secure packaging solutions designed to safeguard your products during transit and handling.", 
                      "Regulatory Compliance: Ensure packaging meets industry standards and legal requirements across different markets.", 
                      "Fast Turnaround: Efficient design, production, and implementation processes to meet your deadlines.", 
                      "Rebranding Strategy: Comprehensive support to update your packaging, labels, and branding elements for a cohesive market presence.", 
                    ].map((benefit, idx) => (
                      <li key={idx} className="service-benefit-item">
                        <FontAwesomeIcon icon={faCircleCheck} />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
                <p>
                  Partner with us to transform your product presentation and reinforce your brand’s market position. Our Packaging and Rebranding services are designed to make your products memorable and your brand unmistakable.
                </p>
              </div>
          </Modal>}
            
          {target_service === "warehousing-and-storage-solutions" && <Modal close_destination="/services">
            <HelmetSEO
              title={`${target_service_data.heading} | Mirf Logistics`}
              description={`${target_service.body}`}
              canonical={`https://mirflogistics.com/services/${target_service}`}
              schema={getServiceSchema(`${target_service_data.heading}`)}
            />
            <div id="warehousing-and-storage-solutions-modal" className="modal-content">
              <img src={target_service_data.image_src} alt={target_service_data.alt_text} width="500" height="300" className="modal-content-img img-fit" />
              <h1 className="modal-content-heading"> {target_service_data.heading} </h1>
                <p>{ target_service_data.body }</p>
                <div className="service-benefits-container">
                  <p>Key Service Benefits: </p>
                  <ul className="service-benefits">
                    {[
                      "Cost-Effective Storage: Competitive rates and flexible leasing options to fit your budget.", 
                      "Flexible Space Options: From small-scale storage to large-scale warehousing, tailored to your volume and growth needs.", 
                      "Scalable Solutions: Easily adjust storage capacity as your business grows or seasonal demands fluctuate.", 
                      "Inventory Security & Loss Prevention: Robust security protocols, surveillance, and regular audits to prevent theft or loss.", 
                      "Order Fulfillment Support: Efficient picking, packing, and dispatch services to streamline your order processing.", 
                      "Climate-Controlled Storage: Temperature and humidity-controlled environments for sensitive or perishable goods.", 
                      "Inventory Management: Real-time tracking and management systems to keep you updated on stock levels and movement.", 
                    ].map((benefit, idx) => (
                      <li key={idx} className="service-benefit-item">
                        <FontAwesomeIcon icon={faCircleCheck} />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
                <p>
                  Partner with us for Warehousing and Storage Solutions that support your operational efficiency, reduce costs, and enhance your supply chain flexibility. Trust us to safeguard your inventory while providing the agility needed to meet market demands.
                </p>
              </div>
          </Modal>}
          </main>
      </div>
      <Footer nav_data={navData} phone_numbers={phone_numbers} emails={emails} socials={socials} />
    </div>
  )
}
