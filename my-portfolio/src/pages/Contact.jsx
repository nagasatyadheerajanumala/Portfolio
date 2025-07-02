import { useState } from 'react';
import './Contact.css';

export default function Contact() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    // Example endpoint for Formspree
    const FORMSPREE_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID"; // Replace this with your real Formspree URL

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();

        try {
            const res = await fetch(FORMSPREE_ENDPOINT, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setSubmitted(true);
                setFormData({ name: '', email: '', message: '' });
            } else {
                alert('There was an error sending your message. Please try again later.');
            }
        } catch (error) {
            alert('There was an error sending your message. Please try again later.');
        }
    };

    return (
        <div className="contact-page">
            <h1>Get in Touch</h1>
            <p className="contact-intro">
                I'd love to hear from you. Fill out the form below, or email me directly at
                <a className="contact-email" href="mailto:dheerajanumala2688@gmail.com"> dheerajanumala2688@gmail.com</a>
            </p>

            {submitted ? (
                <div className="contact-success">
                    <h2>Thank you!</h2>
                    <p>Your message has been sent. I'll get back to you soon.</p>
                </div>
            ) : (
                <form className="contact-form" onSubmit={handleSubmit}>
                    <label>
                        Name
                        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                    </label>
                    <label>
                        Email
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                    </label>
                    <label>
                        Message
                        <textarea name="message" value={formData.message} onChange={handleChange} required />
                    </label>
                    <button type="submit">Send Message</button>
                </form>
            )}

            <div className="contact-alt">
                <h3>Connect with me</h3>
                <p>
                    <a href="https://www.linkedin.com/in/naga-satya-dheerajanumala/" target="_blank" rel="noreferrer">LinkedIn</a> |
                    <a href="https://github.com/nagasatyadheerajanumala" target="_blank" rel="noreferrer"> GitHub</a>
                </p>
            </div>
        </div>
    );
}