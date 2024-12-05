import { useState } from 'react';
import axios from 'axios';

const formEndpoint = import.meta.env.VITE_APP_WP_API_FORM_ENDPOINT;

const ContactForm = () => {
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [enquiry, setEnquiry] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
    
        const contactForm = new FormData();
        contactForm.append('your-first-name', firstName);
        contactForm.append('your-last-name', lastName);
        contactForm.append('your-phone', phone);
        contactForm.append('your-email', email);
        contactForm.append('your-enquiry', enquiry);
        contactForm.append('your-message', message);
    
        axios.post(formEndpoint, contactForm)
        .then((response) => {
            console.log(response);
            setSubmitted(true);
        })
        .catch((error) => {
            console.log(error);
            setError(true);
        });
    };

    if (submitted) {
        return (
            <>
                <div id='success'>
                    <h3>Thank You!</h3>
                    <p>We'll be in touch soon.</p>
                </div>
            </>
        );
    }
    
    if (error) {
        return (
            <>
                <h3>Error!</h3>
                <p>Sorry, we were unable to send your message.</p>
            </>
        );
    }

    return (
        <form onSubmit={handleSubmit} method="POST">
            <h3>Get In Touch</h3>

            <div className="form-container">
                <div className="form-wrapper">
                    <label htmlFor="first-name">First Name:</label>
                    <input 
                        type="text" 
                        name="first-name" 
                        onChange={(event) => setFirstName(event.target.value)}
                        value={firstName}
                        autoComplete="given-name" 
                        required 
                    />
                </div>

                <div className="form-wrapper">
                    <label htmlFor="last-name">Last Name:</label>
                    <input 
                        type="text" 
                        name="last-name" 
                        onChange={(event) => setLastName(event.target.value)}
                        value={lastName}
                        autoComplete="family-name" 
                        required 
                    />
                </div>
            </div>

            <div className="form-container">
                <div className="form-wrapper">
                    <label htmlFor="email">Your Email:</label>
                    <input 
                        type="email" 
                        name="email" 
                        onChange={(event) => setEmail(event.target.value)}
                        value={email}
                        autoComplete="email" 
                        required 
                    />
                </div>

                <div className="form-wrapper">
                    <label htmlFor="phone">Phone:</label>
                    <input 
                        type="tel" 
                        name="phone" 
                        onChange={(event) => setPhone(event.target.value)}
                        value={phone}
                        placeholder="+64 000 0000" 
                        required
                    />
                </div>
            </div>

            <div className="form-container">
                <div className="form-wrapper">
                    <label htmlFor="enquire-type">Enquire Type:</label>
                    <select
                        name="enquire-type"
                        onChange={(event) => setEnquiry(event.target.value)}
                        value={enquiry}
                        required
                    >
                        <option value="General Enquire">General Enquire</option>
                        <option value="Donations">Donations</option>
                        <option value="Atawhai Programme">Atawhai Programme</option>
                        <option value="Mauri Tau Programme">Mauri Tau Programme</option>
                        <option value="Tuakana Programme">Tuakana Programme</option>
                    </select>
                </div>
            </div>

            <div className="form-container">
                <div className="form-wrapper">
                    <label htmlFor="message">Your message (optional):</label>
                    <textarea
                        name="message"
                        id="message"
                        onChange={(event) => setMessage(event.target.value)}
                        value={message}
                    />
                </div>
            </div>

            <button id="submitButton" type="submit">Submit</button>
        </form>
    );
};

export default ContactForm;
