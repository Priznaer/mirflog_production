import { Navigate, useParams } from "react-router-dom";

import "./services.css"
import service_img from "../../assets/images/scaled/services - 889x500.webp";
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
    console.log(schema);
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
          <MiniHero img_SRC={service_img} alt="xxx" >
            { !target_service ? <h1>Our Services</h1> : <h2>Our Services</h2> }
            <p>We Provide A Range Of Services To Support Your business Growth</p>
          </MiniHero>
          <main className="main-content">
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
            </div>
          </Modal>}
            
          {target_service === "distribution-and-supply-chain-management" && <Modal close_destination="/services">
            <HelmetSEO
              title={`${target_service_data.heading} | Mirf Logistics`}
              description="xxx"
              canonical={`https://mirflogistics.com/services/${target_service}`}
              schema={getServiceSchema(`${target_service_data.heading}`)}
            />
            <div id="distribution-and-supply-chain-management-modal" className="modal-content">
              <img src={target_service_data.image_src} alt={target_service_data.alt_text} width="500" height="300" className="modal-content-img img-fit" />
              <h1 className="modal-content-heading"> {target_service_data.heading} </h1>
                <p>{ target_service_data.body }</p>
              </div>
          </Modal>}
            
          {target_service === "digitization" && <Modal close_destination="/services">
            <HelmetSEO
              title={`${target_service_data.heading} | Mirf Logistics`}
              description="xxx"
              canonical={`https://mirflogistics.com/services/${target_service}`}
              schema={getServiceSchema(`${target_service_data.heading}`)}
            />
            <div id="digitization-modal" className="modal-content">
              <img src={target_service_data.image_src} alt={target_service_data.alt_text} width="500" height="300" className="modal-content-img img-fit" />
              <h1 className="modal-content-heading"> {target_service_data.heading} </h1>
                <p>{ target_service_data.body }</p>
              </div>
          </Modal>}
            
          {target_service === "freight-forwarding-and-transportation" && <Modal close_destination="/services">
            <HelmetSEO
              title={`${target_service_data.heading} | Mirf Logistics`}
              description="xxx"
              canonical={`https://mirflogistics.com/services/${target_service}`}
              schema={getServiceSchema(`${target_service_data.heading}`)}
            />
            <div id="freight-forwarding-and-transportation-modal" className="modal-content">
              <img src={target_service_data.image_src} alt={target_service_data.alt_text} width="500" height="300" className="modal-content-img img-fit" />
              <h1 className="modal-content-heading"> {target_service_data.heading} </h1>
                <p>{ target_service_data.body }</p>
              </div>
          </Modal>}
            
          {target_service === "packaging-and-rebranding" && <Modal close_destination="/services">
            <HelmetSEO
              title={`${target_service_data.heading} | Mirf Logistics`}
              description="xxx"
              canonical={`https://mirflogistics.com/services/${target_service}`}
              schema={getServiceSchema(`${target_service_data.heading}`)}
            />
            <div id="packaging-and-rebranding-modal" className="modal-content">
              <img src={target_service_data.image_src} alt={target_service_data.alt_text} width="500" height="300" className="modal-content-img img-fit" />
              <h1 className="modal-content-heading"> {target_service_data.heading} </h1>
                <p>{ target_service_data.body }</p>
              </div>
          </Modal>}
            
          {target_service === "warehousing-and-storage-solutions" && <Modal close_destination="/services">
            <HelmetSEO
              title={`${target_service_data.heading} | Mirf Logistics`}
              description="xxx"
              canonical={`https://mirflogistics.com/services/${target_service}`}
              schema={getServiceSchema(`${target_service_data.heading}`)}
            />
            <div id="warehousing-and-storage-solutions-modal" className="modal-content">
              <img src={target_service_data.image_src} alt={target_service_data.alt_text} width="500" height="300" className="modal-content-img img-fit" />
              <h1 className="modal-content-heading"> {target_service_data.heading} </h1>
                <p>{ target_service_data.body }</p>
              </div>
          </Modal>}
          </main>
      </div>
      <Footer nav_data={navData} phone_numbers={phone_numbers} emails={emails} socials={socials} />
    </div>
  )
}
