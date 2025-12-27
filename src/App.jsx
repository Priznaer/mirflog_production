import { lazy, useEffect, useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { 
  faFacebook, faXTwitter, faSquareInstagram, faTiktok, 
  faSquareLinkedin
} from '@fortawesome/free-brands-svg-icons';

import './App.css';
import cargo_clearing from "./assets/images/scaled/cargo_clearing_1 - 2000x850.webp";
import cargo_ship_enroute from "./assets/images/scaled/cargo_ship_enroute - 2000x1333.webp";
import cargo_trucking from "./assets/images/scaled/loading-shipping-container-onto-truck - 2000x1333.webp";


const HomePage = lazy(() => import('./pages/home/home'));
const ServicesPage = lazy(() => import('./pages/services/services'));
const AboutPage = lazy(() => import('./pages/about/about'));
const ContactPage = lazy(() => import('./pages/contact/contact'));
const Page404 = lazy(() => import('./pages/page404/page404'));

export default function App() {
  const location = useLocation();
  const prevLocationRef = useRef();
  const currentLocationRef = useRef(location);
  
  useEffect(() => {
    prevLocationRef.current = currentLocationRef.current;
    currentLocationRef.current = location;
    let section = "";
    let paths = [];
    switch (true) {
      case (location.hash):
        section = document.querySelector(location.hash);
        break;
      case (!location.hash): {
        paths = location.pathname.split("/");
        if (paths.length > 2) {
          section = document.getElementById(paths[paths.length - 1]);
        }
      }
    }

    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    } else {
      if (location.pathname === "/" || (!prevLocationRef.current.pathname.includes(currentLocationRef.current.pathname))) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }, [location]);

  const navData = [
    {imgSRC: "", text:"Home", destination:"/"},
    {imgSRC: "", text:"Services", destination:"/services"},
    {imgSRC: "", text:"About Us", destination:"/about"},
    {imgSRC: "", text:"Contact Us", destination:"/contact"}, 
    {imgSRC: "", text:"Get Free Quote", destination:"/contact#quote-section", textClasses:"nav-item-quote", containerClasses:"quote-container", linkClasses:"quote-link"}
  ];

  const milestones = [
    {text1:"10+", text2:"Years of Logistics Excellence"},
    {text1:"30+", text2:"Network of Global Countries"},
    {text1:"100%", text2:"Real Time Shipment Tracking"},
    {text1:"98%", text2:"On-Time Delivery Rate"},
    {text1:"100%", text2:"Dedicated Customer Support"},
    {text1:"50+", text2:"Countries"},
  ];

  const phone_numbers = [
    "+233 50 313 3397",
    "+233 24 330 6524"
  ];

  const emails = [
    "info@mirflogistics.com"
  ];

  const socials = [
    {
      heading:"X.com", handle: "mirflogistics", icon: faXTwitter, url: "https://x.com/mirflogistics"
    },
    {
      heading:"Facebook", handle: "mirf_logistics", icon: faFacebook, url: "#"
    },
    {
      heading:"Instagram", handle: "mirf.logistics", icon: faSquareInstagram, url: "https://www.instagram.com/mirf.logistics/"
    },
    {
      heading:"TikTok", handle: "mirf_logistics", icon: faTiktok, url: "https://www.tiktok.com/@mirf.logistics"
    },
    {
      heading:"LinkedIn", handle: "mirf_logistics", icon: faSquareLinkedin, url: "https://www.linkedin.com/company/mirf-logistics-limited"
    },
  ];

  const services = [
    {
      heading: "Customs Brokerage & Clearance", 
      body: "Expert support in navigating the complexities of customs procedures. We ensure all documentation is in order for fast, hassle-free import/export process.",
      url: "/services/customs-brokerage-and-clearance",
      image_src: cargo_trucking,
      alt_text: "xxx"
    },
    {
      heading: "Distribution & Supply Chain Management", 
      body: "Streamlined distribution networks and end-to-end supply chain support that optimize cost and improve delivery timeliness for your business.",
      url: "/services/distribution-and-supply-chain-management",
      image_src: cargo_ship_enroute,
      alt_text: "xxx"
    },
    {
      heading: "Digitization", 
      body: "MIRF simplifies logistics through smart digitization - offering real-time tracking, automated inventory, and paperless documentation to boost speed, accuracy, and efficiency across the supply chain.",
      url: "/services/digitization",
      image_src: cargo_clearing,
      alt_text: "xxx"
    },
    {
      heading: "Freight Forwarding & Transportation", 
      body: "Efficient transport services by air, sea, and land, ensuring your shipments reach their destination safely and on time, whether domestic or international.",
      url: "/services/freight-forwarding-and-transportation",
      image_src: cargo_ship_enroute,
      alt_text: "xxx"
    },
    {
      heading: "Packaging & Rebranding", 
      body: "High-quality packaging services that protect your goods and enhance brand visibility. We also offer rebranding services to meet market-specific requirements.",
      url: "/services/packaging-and-rebranding",
      image_src: cargo_clearing,
      alt_text: "xxx"
    },
    {
      heading: "Warehousing & Storage Solutions", 
      body: "Flexible, secure, and climate-controlled storage options to meet short-term or long-term inventory needs. Our warehousing solutions are designed for scalability and accessibility.",
      url: "/services/warehousing-and-storage-solutions",
      image_src: cargo_ship_enroute,
      alt_text: "xxx"
    }
  ];

  const working_hours = [
    {
      day: "Monday", opening: "7:00 AM", closing: "5:00 PM"
    },
    {
      day: "Tuesday", opening: "7:00 AM", closing: "5:00 PM"
    },
    {
      day: "Wednesday", opening: "7:00 AM", closing: "5:00 PM"
    },
    {
      day: "Thursday", opening: "7:00 AM", closing: "5:00 PM"
    },
    {
      day: "Friday", opening: "7:00 AM", closing: "5:00 PM"
    },
    {
      day: "Saturday", opening: null, closing: null
    },
    {
      day: "Sunday", opening: null, closing: null
    },
  ];

  const clients = [
    {
      name: "xxx", 
      img_src: cargo_clearing, 
      alt_text: "xxx", 
    },
    {
      name: "xxx", 
      img_src: cargo_clearing, 
      alt_text: "xxx", 
    },
    {
      name: "xxx", 
      img_src: cargo_clearing, 
      alt_text: "xxx", 
    },
    {
      name: "xxx", 
      img_src: cargo_clearing, 
      alt_text: "xxx", 
    },
    {
      name: "xxx", 
      img_src: cargo_clearing, 
      alt_text: "xxx", 
    },
  ]

  return (
    <Routes>
      <Route path='/' 
        element={<HomePage navData={navData} milestones={milestones} 
        services={services} phone_numbers={phone_numbers} emails={emails} socials={socials} clients={clients} />} 
      />
      <Route path='/services' 
        element={<ServicesPage navData={navData} phone_numbers={phone_numbers} emails={emails} socials={socials} services={services} />} 
      />
      <Route path='/services/:target_service' 
        element={<ServicesPage navData={navData} phone_numbers={phone_numbers} emails={emails} socials={socials} services={services} />} 
      />
      <Route path='/contact' 
        element={<ContactPage navData={navData} phone_numbers={phone_numbers} emails={emails} socials={socials} 
        working_hours={working_hours} />}
      />
      <Route path='/about' 
        element={<AboutPage navData={navData} milestones={milestones} phone_numbers={phone_numbers} emails={emails} socials={socials} />} 
      />
      <Route path='/not-found' 
        element={<Page404 navData={navData} phone_numbers={phone_numbers} emails={emails} socials={socials} />} 
      />
      <Route path='*' 
        element={<Page404 nav_data={navData} phone_numbers={phone_numbers} emails={emails} socials={socials} />} 
      />
    </Routes>
  )
}
