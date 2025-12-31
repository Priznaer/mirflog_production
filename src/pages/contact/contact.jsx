import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faPhone, faEnvelope, faTrashCan, faCirclePlus
} from '@fortawesome/free-solid-svg-icons';

import "./contact.css";
import customer_care from "../../assets/images/scaled/customer-care-1 - 439x300.webp";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import { NotificationModal } from '../../components/modals/modals';
import { MiniHero } from '../../components/hero/hero';


export default function ContactPage({ navData, phone_numbers=[], emails=[], socials=[], working_hours=[] }) {
    const today = (new Date().getDay() + 6) % 7;
    const [notifySubmitSuccess, setNotifySubmitSuccess] = useState(false);
    const payload_ref = useRef({});
    const form_ref = useRef("");
    const final_view = 3;
    const [currentView, setCurrentView] = useState(1);
    const view_headings = {
        1: "Personal Information",
        2: "Service Information",
        3: "Cargo Information"
    };    
    // View 1 - Personal Information Data
    const [lastName, setLastName] = useState({value: "", error_msg: ""});
    const [otherNames, setOtherNames] = useState({value: "", error_msg: ""});
    const [phoneNumber, setPhoneNumber] = useState({value: "", error_msg: ""});
    const [email, setEmail] = useState({value: "", error_msg: ""});
    const [contactMedium, setContactMedium] = useState({value: "Any", error_msg: ""});
    // View 2 - Service information
    const [service, setService] = useState({value: "Any Freight", error_msg: ""});
    const [commodity, setCommodity] = useState({value: "General Goods", error_msg: ""});
    const [origin, setOrigin] = useState({value: "", error_msg: ""});
    const [destination, setDestination] = useState({value: "", error_msg: ""});
    const require_address = ["Any Freight", "Air Freight", "Sea Freight", "Trucking"];
    // View 3 - Cargo Information
    const [cargoRows, setCargoRows] = useState([{
        id: `cargo-${Date.now()}`, 
        name: {value: "", error_msg: ""}, 
        quantity: {value: "", error_msg: ""}, 
        weight: {value: "", error_msg: ""}, 
        dimensions: {value: {L: "", W: "", H: ""}, error_msg: ""
    }}]);
    const [comment, setComment] = useState("");
    const add_btn_ref = useRef();
    const del_btn_ref = useRef();
    const submit_btn_ref = useRef();
    // Multi-View
    const [generalNotice, setGeneralNotice] = useState("");
    const prev_btn_ref = useRef();
    const next_btn_ref = useRef();

    const isValidCargoDataNumber = (value) => {
        if (isNaN(value) || Number(value) <= 0 ) {
            return false;
        }
        return true;
    }
    
    const checkErrors = () => {
        let errors = false;
        let email2_error = false;
        const view_payload = {};
        switch (currentView) {
            case 1:
                if (!lastName.value.trim()) {
                    setLastName(data => ({...data, error_msg:"Last name is required"}));
                    errors = true;
                } else {
                    setLastName(data => ({...data, error_msg:""}))
                }

                if (!phoneNumber.value.trim() && !email.value.trim()) {
                    setPhoneNumber(data => ({...data, error_msg:"Phone number or email is required."}))
                    setEmail(data => ({...data, error_msg:"Phone number or email is required."}))
                    return false;
                } else {
                    setPhoneNumber(data => ({...data, error_msg:""}))
                    setEmail(data => ({...data, error_msg:""}))
                }

                // if preferred contact is email and there's no email
                if (contactMedium.value.trim() === "Email" && !email.value.trim()) {
                    setContactMedium(data => ({...data, error_msg: "Provide an email address to receive emails"}));
                    errors = true;
                    email2_error = true;
                } else {
                    setContactMedium(data => ({...data, error_msg: ""}))
                }

                // if preferred contact is call and there's no phone number
                if (contactMedium.value.trim() === "Call" && !phoneNumber.value.trim()) {
                    setContactMedium(data => ({...data, error_msg: "Provide a phone number to receive calls"}));
                    errors = true;
                } else {
                    if (!email2_error) {
                        setContactMedium(data => ({...data, error_msg: ""}))
                    }
                }

                if (!errors) {
                    view_payload.last_name = lastName.value.trim();
                    view_payload.other_names = otherNames.value.trim();
                    phoneNumber.value.trim() && (view_payload.phone_number = phoneNumber.value.trim());
                    email.value.trim() && (view_payload.email = email.value.trim());
                    view_payload.contact_medium = contactMedium.value.trim();
                }
                
                break;
            case 2:
                if (require_address.includes(service.value)) {
                    if (!origin.value) {
                        setOrigin(data => ({...data, error_msg: "Field is required"}));
                        errors = true;
                    } else {
                        setOrigin(data => ({...data, error_msg: ""}));
                    }
                    
                    if (!destination.value) {
                        setDestination(data => ({...data, error_msg: "Field is required"}));
                        errors = true;
                    } else {
                        setDestination(data => ({...data, error_msg: ""}));
                    }
                }

                if (!errors) {
                    view_payload.service = service.value.trim();
                    view_payload.commodity_type = commodity.value.trim();
                    origin.value.trim() && (view_payload.origin_address = origin.value.trim());
                    destination.value.trim() && (view_payload.destination_address = origin.value.trim());
                }
                
                break;
            case 3: {
                const rows_copy = [...cargoRows];
                cargoRows.map((row, idx) => {
                    if (!row.name.value) {
                        rows_copy[idx].name.error_msg = "Field Required";
                        errors = true;
                    } else {
                        rows_copy[idx].name.error_msg = "";
                    }

                    if (!row.quantity.value.trim()) {
                        rows_copy[idx].quantity.error_msg = "Field Required";
                        errors = true;
                    } else {
                        if (!isValidCargoDataNumber(row.quantity.value)) {
                            rows_copy[idx].quantity.error_msg = "Invalid value";
                            errors = true;
                        } else {
                            rows_copy[idx].quantity.error_msg = "";
                        }
                    }

                    if (!row.weight.value.trim()) {
                        rows_copy[idx].weight.error_msg = "Field Required";
                        errors = true;
                    } else {
                        if (!isValidCargoDataNumber(row.weight.value)) {
                            rows_copy[idx].weight.error_msg = "Invalid value";
                            errors = true;
                        } else {
                            rows_copy[idx].weight.error_msg = "";
                        }
                    }

                    if (!row.dimensions.value["L"].trim() || !row.dimensions.value["W"].trim() || !row.dimensions.value["H"].trim()) {
                        rows_copy[idx].dimensions.error_msg = "L, W, and H fields are Required";
                        errors = true;
                    } else {
                        const LxWxB = row.dimensions.value;
                        if ( 
                            !isValidCargoDataNumber(LxWxB.L.trim()) || 
                            !isValidCargoDataNumber(LxWxB.W.trim()) || 
                            !isValidCargoDataNumber(LxWxB.H.trim())
                        ) {
                            rows_copy[idx].dimensions.error_msg = "Invalid value for L, W, or H";
                            errors = true;
                        } else {
                            rows_copy[idx].dimensions.error_msg = "";
                        }
                    }

                    if (errors) {
                        setCargoRows(rows_copy);
                    }
                })

                if (!errors) {
                    view_payload.cargo_details = [];
                    cargoRows.map((row) => {
                        const LxWxB = row.dimensions.value;
                        const dimensions = `${LxWxB["L"].trim()} x ${LxWxB["W"].trim()} x ${LxWxB["H"].trim()}`;
                        view_payload.cargo_details.push(
                            {
                                name: row.name.value.trim(), 
                                quantity: row.quantity.value.trim(), 
                                weight: row.weight.value.trim(), 
                                dimensions
                            }
                        )
                    })
                    comment.trim() && (view_payload.comment = comment.trim());
                    view_payload.website = form_ref.current.website.value;
                }
                break;
            }
        }
        if (errors) {
            setGeneralNotice("Invalid or missing data in the form");
            return false;
        }
        payload_ref.current = {...payload_ref.current, ...view_payload};
        setGeneralNotice("");
        return true;
    }
    
    const handlePrevButton = (e) => {
        e.preventDefault();
        if (currentView !== 1) {
            setCurrentView(prev => prev - 1);
        }
        if (prev_btn_ref.current) {
            prev_btn_ref.current.blur();
        }
    }

    const handleNextButton = (e) => {
        e.preventDefault();
        if (checkErrors()) {
            setCurrentView(prev => prev + 1);
        }
        if (next_btn_ref.current) {
            next_btn_ref.current.blur();
        }
    }

    const sendFormData = async () => {
        try {
            await axios.post("https://api.mirflogistics.com/send-email", payload_ref.current);
            return true;
        }catch {
            return false;
        }
    }

    const resetForm = () => {
        setLastName({value: "", error_msg: ""});
        setOtherNames({value: "", error_msg: ""});
        setPhoneNumber({value: "", error_msg: ""});
        setEmail({value: "", error_msg: ""});
        setContactMedium({value: "Any", error_msg: ""});
        setService({value: "Any Freight", error_msg: ""});
        setCommodity({value: "General Goods", error_msg: ""});
        setOrigin({value: "", error_msg: ""});
        setDestination({value: "", error_msg: ""});
        setCargoRows([{
            id: `cargo-${Date.now()}`, 
            name: {value: "", error_msg: ""}, 
            quantity: {value: "", error_msg: ""}, 
            weight: {value: "", error_msg: ""}, 
            dimensions: {value: {L: "", W: "", H: ""}, error_msg: ""
        }}]);
        setComment("");
        setCurrentView(1);
        form_ref.current.reset();
    }
    
    const handleSubmitButton = (e) => {
        e.preventDefault();

        if (submit_btn_ref.current) {
            submit_btn_ref.current.blur();
        }

        if (!checkErrors()) {
            return;
        }

        setGeneralNotice("Sending Request Data ... ")
        if (!sendFormData()) {
            setGeneralNotice("Error Sending Your Request - Please Try Again")
            setNotifySubmitSuccess(false);
        } else {
            setNotifySubmitSuccess(true);
            setGeneralNotice("")
            resetForm();
        }
    }

    const handleAddRow = () => {
        setCargoRows(rows => ([...rows, {id: `cargo-${Date.now() + cargoRows.length}`, name: {value: "", error_msg: ""}, quantity: {value: "", error_msg: ""}, weight: {value: "", error_msg: ""}, dimensions: {value: {L: "", W: "", H: ""}, error_msg: ""}}]));
        if (add_btn_ref.current) {
            add_btn_ref.current.blur();
        }
    }

    const handleRemoveRow = (id) => {
        if (cargoRows.length > 1) {
            setCargoRows(cargoRows.filter(row => row.id !== id));
        }
        if (del_btn_ref.current) {
            del_btn_ref.current.blur();
        }
    }

    const handleRowUpdate = (id, key, new_value) => {
        if (key === "dimensions-L") {
            setCargoRows(prevRows => prevRows.map(row => (
            row.id === id ? 
            {
                ...row, dimensions: {
                    ...row.dimensions, value: {...row.dimensions.value, L: new_value}
                }
            } : row
        )));
            return;
        } else if (key === "dimensions-W") {
            setCargoRows(prevRows => prevRows.map(row => (
            row.id === id ? 
            {
                ...row, dimensions: {
                    ...row.dimensions, value: {...row.dimensions.value, W: new_value}
                }
            } : row
        )));
            return;
        } else if (key === "dimensions-H") {
            setCargoRows(prevRows => prevRows.map(row => (
            row.id === id ? 
            {
                ...row, dimensions: {
                    ...row.dimensions, value: {...row.dimensions.value, H: new_value}
                }
            } : row
        )));
            return;
        }

        setCargoRows(prevRows => prevRows.map(row => (
            row.id === id ? 
            {
                ...row, [key]: {
                    ...row[key], value: new_value
                }
            } : row
        )));
    };

  return (
        <div id="contact-page" className="page">
            <Header navData={navData} />
            <div className="main-container">
              <MiniHero img_SRC={customer_care} alt="Customer Support Agent" >
                    <h1> Get In Touch </h1>
                    <p>We're available to answer your questions and support your business growth</p>
                </MiniHero>
                <main className="main-content">
                    <div className="contact-group">
                        <div className="contact-channels">
                            <h2 className="section-heading"> Contact Us </h2>
                            <div className="phones-x-emails-container">
                                <div className="phone-numbers">
                                    <div className="icon-x-info">
                                        <FontAwesomeIcon icon={faPhone} className='contact-icon' />
                                        <div className="info-container">
                                            <p className="info-heading"> Phone/Mobile </p>
                                            {phone_numbers.map((number, idx) => (
                                                <p key={idx} className="number">{number}</p>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="emails">
                                    <div className="icon-x-info">
                                        <FontAwesomeIcon icon={faEnvelope} className='contact-icon' />
                                        <div className="info-container">
                                            <p className="info-heading"> Email </p>
                                            {emails.map((number, idx) => (
                                                <p key={idx} className="email">{number}</p>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                          <div className="social-container">
                              <h2 className='section-heading'>Let's Get Social</h2>
                              <div className="socials">
                                  {socials.map((social, idx) => (
                                      <Link to={social.url} target="_blank" rel="noopener noreferrer" key={idx} className="icon-x-info">
                                          <FontAwesomeIcon icon={social.icon} className='contact-icon' />
                                          <div className="info-container">
                                              <p className="info-heading"> {social.heading} </p>
                                          </div>
                                      </Link>
                                  ))}
                              </div>
                          </div>
                      </div>
                        <div className="office-hours-section">
                            <h2 className="section-heading">Office Hours</h2>
                            <div className="office-hours-container">
                                {working_hours.map((data, idx) => {
                                    return (
                                        <div key={idx} className={`row${!data.opening ? " closed" : ""}${today === idx ? " today" : ""}`}>
                                            <p className="day"> {data.day} </p>
                                            {
                                                data.opening ? 
                                                <p className="hours"> 
                                                    <span className="opening"> {data.opening} </span>
                                                    <span className="divider"> - </span>
                                                    <span className="closing"> {data.closing} </span>
                                                </p> :
                                                <p className="hours"> Closed </p>
                                            }
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    <section id="quote-section">
                        <h2 className="section-heading">Request Free Quote</h2>
                        <p className='section-subheading'>Fill the form and we'll get back to you with a quote</p>
                        <form ref={form_ref} className="quote-form">
                            {currentView === 1 && (
                                <>
                                    <h2 className="view-heading">{ view_headings[currentView] }</h2>
                                    <div className="form-section personal-info">
                                        <div className="form-row names-section">
                                            <div className="label_x_input-x-error">
                                                <label htmlFor='last_name'>Last Name</label>
                                                <div className="input-x-error">
                                                    <input type="text" value={lastName.value} onChange={(e) => setLastName(data => ({...data, value: e.target.value}))} className='input-field' id="last_name" title='Last Name' placeholder='Last Name' />
                                                    <p className="error-field"> {lastName.error_msg} </p>
                                                </div>
                                            </div>
                                            <div className="label_x_input-x-error">
                                                <label htmlFor='other_names'>Other Names</label>
                                                <div className="input-x-error">
                                                    <input type="text" value={otherNames.value} onChange={(e) => setOtherNames(data => ({...data, value: e.target.value}))} className='input-field' id="other_names" title='Other Names' placeholder='Other Names' />
                                                    <p className="error-field"> {otherNames.error_msg} </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-row phone-x-email-section">
                                            <div className="label_x_input-x-error">
                                                <label htmlFor='phone-number'>Phone Number</label>
                                                <div className="input-x-error">
                                                    <input type="tel" value={phoneNumber.value} onChange={(e) => setPhoneNumber(data => ({...data, value: e.target.value}))} className='input-field' id="phone-number" title='Phone Number' placeholder='Phone Number' />
                                                    <p className="error-field">{ phoneNumber.error_msg }</p>
                                                </div>
                                            </div>
                                            <div className="label_x_input-x-error">
                                                <label htmlFor='email'>Email</label>
                                                <div className="input-x-error">
                                                    <input type="email" value={email.value} onChange={(e) => setEmail(data => ({...data, value: e.target.value}))} className='input-field' id="email" title='Email' placeholder='Email' autoComplete='true' />
                                                    <p className="error-field">{ email.error_msg }</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="choice-medium">
                                            <p>Preferred Method Of Contact</p>
                                            <div className="input-x-error">
                                                <div className="form-row radio-container">
                                                    <div className="radio-x-label">
                                                        <input type="radio" name="choice-medium" value="Call" id="call" className='radio-input' checked={contactMedium.value === "Call"} onChange={() => setContactMedium(data => ({...data, value:"Call"}))} />
                                                        <label htmlFor="call">Phone Call</label>
                                                    </div>
                                                    <div className="radio-x-label">
                                                        <input type="radio" name="choice-medium" value="Email" id="email-radio" className='radio-input' checked={contactMedium.value === "Email"} onChange={() => setContactMedium(data => ({...data, value:"Email"}))} />
                                                        <label htmlFor="email-radio">Email</label>
                                                    </div>
                                                    <div className="radio-x-label">
                                                        <input type="radio" name="choice-medium" value="Any" id="any" className='radio-input' checked={contactMedium.value === "Any"} onChange={() => setContactMedium(data => ({...data, value:"Any"}))} />
                                                        <label htmlFor="any">Any</label>
                                                    </div>
                                                </div>
                                                <p className="error-field">{ contactMedium.error_msg }</p>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                            {currentView === 2 && (
                                <>
                                    <h2 className="view-heading">{ view_headings[currentView] }</h2>
                                    <div className="form-section service-info">
                                        <div className="form-row select-menu">
                                            <label htmlFor="service-type">Service Needed: </label>
                                            <div className="custom-select">
                                                <select name="service-type" id="service-type" onChange={(e) => setService(data => ({...data, value: e.target.value}))} >
                                                    <option value="Any Freight">Any Freight</option>
                                                    <option value="Air Freight">Air Freight</option>
                                                    <option value="Sea Freight">Sea Freight</option>
                                                    <option value="Trucking">Trucking</option>
                                                    <option value="Customs & Clearance">Customs & Clearance</option>
                                                    <option value="Warehousing">Warehousing</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="form-row select-menu">
                                            <label htmlFor="commodity-type">Commodity Type: </label>
                                            <div className="custom-select">
                                                <select defaultValue={commodity.value} name="commodity-type" id="commodity-type" onChange={(e) => setCommodity(data => ({...data, value: e.target.value}))} >
                                                    <option value="General Goods">General Goods</option>
                                                    <option value="Fragile">Fragile</option>
                                                    <option value="Hazardous">Hazardous</option>
                                                    <option value="Temperature-controlled">Temperature-controlled</option>
                                                </select>
                                            </div>
                                        </div>
                                        {require_address.includes(service.value) && (
                                            <div className="address-section">
                                                <div className="input-x-error">
                                                    <div className="form-row">
                                                        <label htmlFor="origin" className='mx-cnt'>Origin: </label>
                                                        <input type="text" value={origin.value} onChange={(e) => setOrigin(data => ({...data, value: e.target.value}))} className='input-field' id="origin" title='Origin Address' placeholder='Origin Address' />
                                                    </div>
                                                    <p className="error-field">{ origin.error_msg }</p>
                                                </div>
                                                <div className="input-x-error">
                                                    <div className="form-row">
                                                        <label htmlFor="destination" className='mx-cnt'>Destination: </label>
                                                        <input type="text" value={destination.value} onChange={(e) => setDestination(data => ({...data, value: e.target.value}))} className='input-field' id="destination" title='Destination Address' placeholder='Destination Address' />
                                                    </div>
                                                    <p className="error-field">{ destination.error_msg }</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </>
                            )}
                            {currentView === 3 && (
                                <>
                                    <h2 className="view-heading">{ view_headings[currentView] }</h2>
                                    <div className="form-section cargo-info">
                                        {cargoRows.map((row, idx) => {
                                            return (
                                                <div key={idx} className="form-row cargo-form-row">
                                                    <div className="cargo-row">
                                                        <div className="label_x_input-x-error product_name">
                                                            <label htmlFor={`name-${row.id}`}>Product Name</label>
                                                            <div className="input-x-error">
                                                                <input type="text" className='input-field cargo-input-field' id={`name-${row.id}`} value={row.name.value} onChange={(e) => handleRowUpdate(row.id, "name", e.target.value)} placeholder='Product Name' />
                                                                <p className="error-field"> {row.name.error_msg} </p>
                                                            </div>
                                                        </div>
                                                        <div className="label_x_input-x-error">
                                                            <label htmlFor={`quantity-${row.id}`}>Quantity</label>
                                                            <div className="input-x-error">
                                                                <input type="text" className='input-field cargo-input-field' id={`quantity-${row.id}`} value={row.quantity.value} onChange={(e) => handleRowUpdate(row.id, "quantity", e.target.value)} placeholder='1' />
                                                                <p className="error-field"> {row.quantity.error_msg} </p>
                                                            </div>
                                                        </div>
                                                        <div className="label_x_input-x-error">
                                                            <label htmlFor={`weight-${row.id}`}>Weight Per Unit (lbs)</label>
                                                            <div className="input-x-error">
                                                                <input type="text" className='input-field cargo-input-field' id={`weight-${row.id}`} value={row.weight.value} onChange={(e) => handleRowUpdate(row.id, "weight", e.target.value)} placeholder='0.5' />
                                                                <p className="error-field"> {row.weight.error_msg} </p>
                                                            </div>
                                                        </div>
                                                        <div className="label_x_input-x-error dimensions-container">
                                                            <div className="dimension-labels">
                                                                <span>Dimensions (</span>
                                                                <label htmlFor={`dimensions-length-${row.id}`}>L x</label>
                                                                <label htmlFor={`dimensions-width-${row.id}`}> W x</label>
                                                                <label htmlFor={`dimensions-height-${row.id}`}> H) Inches</label>
                                                            </div>
                                                            <div className="input-x-error">
                                                                <div className="dimensions-inputs">
                                                                    <input type="text" className='input-field cargo-input-field' id={`dimensions-length-${row.id}`} value={row.dimensions.value.L} onChange={(e) => handleRowUpdate(row.id, "dimensions-L", e.target.value)} placeholder='L' />
                                                                    <input type="text" className='input-field cargo-input-field' id={`dimensions-width-${row.id}`} value={row.dimensions.value.W} onChange={(e) => handleRowUpdate(row.id, "dimensions-W", e.target.value)} placeholder='W' />
                                                                    <input type="text" className='input-field cargo-input-field' id={`dimensions-height-${row.id}`} value={row.dimensions.value.H} onChange={(e) => handleRowUpdate(row.id, "dimensions-H", e.target.value)} placeholder='H' />
                                                                </div>
                                                                <p className="error-field"> {row.dimensions.error_msg} </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                        <div className="add-x-del-cargo">
                                                            <button type='button' ref={add_btn_ref} className='cargo-icon add-cargo' onClick={() => handleAddRow() } title='Add Row' > <FontAwesomeIcon icon={faCirclePlus} /> </button>
                                                            {cargoRows.length > 1 && (
                                                                <button type='button' ref={del_btn_ref} className='cargo-icon del-cargo' onClick={() => handleRemoveRow(row.id) } title='Remove Row' > <FontAwesomeIcon icon={faTrashCan} /> </button>
                                                            )}
                                                        </div>
                                                </div>
                                            )
                                        })}
                                        <div className="label_x_input-x-error">
                                            <label htmlFor='comment'> Comment </label>
                                            <div className="input-x-error">
                                                <textarea name="comment" id="comment" placeholder='Comment Or Message' value={comment} onChange={(e) => setComment(e.target.value)} ></textarea>
                                                <p className="error-field"> {lastName.error_msg} </p>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                            <div className="general-error-container"> {generalNotice} </div>
                            <div className="form-cta-container cta-container">
                                {currentView > 1 && (
                                    <button ref={prev_btn_ref} type='button' className="cta" onClick={handlePrevButton}>Previous</button>
                                )}
                                {currentView !== final_view && (
                                    <button ref={next_btn_ref} type='button' className="cta" onClick={handleNextButton}>Next</button>
                                )}
                                {currentView === final_view && (
                                    <button ref={submit_btn_ref} type='button' className="cta" onClick={handleSubmitButton}>Submit</button>
                                )}
                            </div>
                            <input type="text" name="website" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />
                        </form>
                    </section>
                    <section className="map-section">
                      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.2220202329577!2d-0.06821452495488307!3d5.681016194300582!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf81aa35d081bb%3A0x7c91f876c518a8c0!2sMirf%20Logistics!5e0!3m2!1sen!2sgh!4v1765979204968!5m2!1sen!2sgh" width="600" height="540" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title='Mirf Logistics Location On Map' ></iframe>
                    </section>
                </main>
                {notifySubmitSuccess && 
                    <NotificationModal 
                        timeout={50000} okHandler={() => setNotifySubmitSuccess(false)}
                    >
                        <h2>Success!</h2>
                        <p className="notification-body-1">
                            Form Submitted Successfully. <br />
                            Our Staff will contact you with a quote. <br />
                            Have a nice day.
                        </p>
                    </NotificationModal>
                }
            </div>
            <Footer nav_data={navData} phone_numbers={phone_numbers} emails={emails} socials={socials} />
        </div>
  )
}
