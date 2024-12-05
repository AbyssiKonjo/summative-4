import { useState } from 'react';
import axios from 'axios'; 

const formEndpoint = import.meta.env.VITE_APP_WP_API_FORM_ENDPOINT;

const DonationForm = () => {
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [consistency, setConsistency] = useState('');
    const [currency, setCurrency] = useState('');
    const [amount, setAmount] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
    
        const donationForm = new FormData();
        donationForm.append('your-first-name', firstName);
        donationForm.append('your-last-name', lastName);
        donationForm.append('your-email', email);
        donationForm.append('your-phone', phone);
        donationForm.append('your-address', address);
        donationForm.append('consistency', consistency);
        donationForm.append('currency', currency);
        donationForm.append('amount', amount);
    
        axios.post(formEndpoint, donationForm)
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
                    <h3>Thank You For your Donation!</h3>
                </div>
            </>
        );
    }

    return (
        <form onSubmit={handleSubmit} method="POST">
            <p>Help us improve the livelihood of marginalised rangatahi in Aotearoa by giving them the tools they need to transform their mental health and wellbeing, and that of those around them.</p>

            <div className='form-container'>
                <div className="form-wrapper">
                    <label htmlFor="consistency">Consistency:</label>
                    <select 
                        name="consistency" 
                        required 
                        value={consistency}
                        onChange={(event) => setConsistency(event.target.value)}
                    >
                        <option value="" disabled>Select an option</option>
                        <option value="One Time">One Time</option>
                        <option value="Weekly">Weekly</option>
                        <option value="Biweekly (Fortnight)">Biweekly (Fortnight)</option>
                        <option value="Monthly">Monthly</option>
                    </select>
                </div>
                
                <div className='form-wrapper'>
                    <label htmlFor="currency">Currency:</label>
                    <select 
                        name="currency" 
                        required 
                        value={currency}
                        onChange={(event) => setCurrency(event.target.value)}
                    >
                        <option value="" disabled>Select a currency</option>
                        <option value="NZD">New Zealand Dollars (NZD)</option>
                        <option value="AUD">Australian Dollar (AUD)</option>
                        <option value="GBP">British Pound Sterling (GBP)</option>
                    </select>
                </div>                
            </div>
            
            <div className='form-container'>
                <div className='form-wrapper'>
                    <label htmlFor="amount">Amount:</label>
                    <input 
                        type="number" 
                        name="amount" 
                        onChange={(event) => setAmount(event.target.value)}
                        value={amount}
                        required 
                        min="1" 
                        step="0.01" 
                    />
                </div>
            </div>

            <div className='form-container'>
                <div className='form-wrapper'>
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

                <div className='form-wrapper'>
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

            <div className='form-container'>
                <div className='form-wrapper'>
                    <label htmlFor="email">Your Email:</label>
                    <input 
                        type="email"
                        name="email" 
                        autoComplete="email" 
                        onChange={(event) => setEmail(event.target.value)}
                        value={email}
                        required 
                    />
                </div>

                <div className='form-wrapper'>
                    <label htmlFor="phone">Phone:</label>
                    <input 
                        type="tel" 
                        name="phone" 
                        placeholder="+64 000 0000" 
                        onChange={(event) => setPhone(event.target.value)}
                        value={phone}
                        required
                    />
                </div>
            </div>

            <div className='form-container'>
                <div className='form-wrapper'>
                    <label htmlFor="address">Address:</label>
                    <input 
                        type="text" 
                        name="address" 
                        onChange={(event) => setAddress(event.target.value)}
                        value={address}
                        autoComplete="address-line1" 
                        required
                    />
                </div>
            </div>            

            <button id='submitButton' type="submit">Submit</button>

            {error && <p>There was an error submitting the form. Please try again.</p>}
        </form>
    )
}

export default DonationForm;
