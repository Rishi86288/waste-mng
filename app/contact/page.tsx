"use client";
import React, { useState } from 'react';
import HCaptcha from '@hcaptcha/react-hcaptcha';

export default function ContactPage() {
  // States
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [result, setResult] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  
  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_CONTACT_ACCESS_KEY || "";

 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 1. फॉर्म को यहाँ एक वेरिएबल में सेव कर लो
    const form = e.currentTarget;

    if (!accessKey) {
      setResult("Error: API Key is missing in .env file.");
      setIsSuccess(false);
      return;
    }

    setIsSubmitting(true);
    setResult("Sending Message...");
    setIsSuccess(false);

    // 2. सेव किये हुए 'form' वेरिएबल का इस्तेमाल करो
    const formData = new FormData(form);
    const object = Object.fromEntries(formData.entries());
    const json = JSON.stringify(object);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: json,
      });
      
      const jsonResponse = await response.json();
      
      if (jsonResponse.success) {
        setResult(jsonResponse.message || "Message sent successfully!");
        setIsSuccess(true);
        
        // 3. यहाँ 'e.currentTarget' की जगह सेव किये गए 'form' को रिसेट करो
        form.reset(); 
        
        setCaptchaToken(null);
      } else {
        console.error(jsonResponse);
        setResult(jsonResponse.message || "Something went wrong!");
        setIsSuccess(false);
      }
    } catch (error) {
      console.error(error);
      setResult("Something went wrong!");
      setIsSuccess(false);
    } finally {
      setIsSubmitting(false);
      setTimeout(() => {
        setResult('');
        setIsSuccess(false);
      }, 5000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mb-20">
      
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl mb-4">
          Get In Touch
        </h1>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
          Have questions, suggestions, or want to collaborate? We'd love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        {/* Left Side: Contact Info */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <div className="inline-block px-3 py-1 bg-green-50 text-green-700 text-sm font-semibold rounded-full mb-6">
            Contact Info
          </div>
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Let's Connect</h3>
          <p className="text-gray-600 mb-8">
            Whether you're a student, educator, or industry professional — reach out and let's make Duvision even better!.
          </p>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="shrink-0 w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                ✉️
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-900">Email Us</h4>
                <p className="text-gray-600 mt-1">support@cipethub.in</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="shrink-0 w-10 h-10 bg-teal-50 text-teal-600 rounded-lg flex items-center justify-center">
                🌐
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-900">Website</h4>
                <a href="https://waste-mng.cipethub.in" className="text-teal-600 hover:underline mt-1 block">waste-mng.cipethub.in</a>
              </div>
            </div>

           
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <h3 className="text-center text-2xl font-bold text-gray-900 mb-2">Send a Message</h3>
          <p className="text-gray-500 text-center mb-6">We'll get back to you within 24 hours.</p>
      {isSuccess ? (
            <div className="flex flex-col items-center justify-center py-10">
              <div className="w-24 h-24 rounded-full border-4 border-green-500 flex items-center justify-center mb-6">
                  <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                  </svg>
              </div>
              <h2 className="text-3xl font-bold text-green-600 mb-4">Success</h2>
              <p className="text-center text-gray-700 text-lg font-medium max-w-xl leading-relaxed mb-8">
              Thank you for connecting with us we will get back to you soon
                            </p>
              <button onClick={() => setIsSuccess(false)} className="text-blue-600 hover:text-blue-800 text-lg font-semibold hover:underline">
                  Go back
              </button>
            </div>
          ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* डायनामिक वेरिएबल इस्तेमाल किया है */}
            <input type="hidden" name="access_key" value={accessKey} />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                <input 
                  type="text" 
                  name="name" 
                  required 
                  className="text-black w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors" 
                  placeholder="Full name" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input 
                  type="email" 
                  name="email" 
                  required 
                  className=" text-black w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors" 
                  placeholder="your@email.com" 
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
              <select 
                name="options" 
                defaultValue="General Inquiry"
                className=" text-black w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors bg-white"
              >
                <option value="General Inquiry">General Inquiry</option>
                <option value="Bug Report">Bug Report</option>
                <option value="Feature Request">Feature Request</option>
                <option value="Collaboration">Collaboration</option>
                
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
              <textarea 
                name="message" 
                required 
                rows={4}
                className=" text-black w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors resize-none" 
                placeholder="Write your message here..."
              ></textarea>
            </div>

            {/* Web3Forms Honeypot */}
            <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} />
             
            <div className="mt-4 border-t pt-4 flex justify-center">
              <HCaptcha
                sitekey="50b2fe65-b00b-4b9e-ad62-3ba471098be2"
                onVerify={(token) => setCaptchaToken(token)} 
                reCaptchaCompat={false}
                onExpire={() => setCaptchaToken(null)}
              />
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting || !captchaToken} 
              className="w-full mt-6 py-3 px-4 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold rounded-lg shadow-md transition-colors duration-200"
            >
              {!captchaToken ? "Please Solve Captcha to Submit" : (isSubmitting ? "Submitting..." : "Submit Hub Request")}
            </button>
             
            {/* Result Message (Success / Error) */}
            {result && (
              <p className={`text-center mt-4 text-sm font-semibold ${isSuccess ? 'text-green-600' : 'text-red-600'}`}>
                {result}
              </p>
            )}
          </form>
          )}
            </div>
      </div>

      {/* Map Section */}
      <div className="mt-12 rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3673.2635548388985!2d72.63356937772329!3d22.977333979205635!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e8604665b43c1%3A0x62f0be4b9767c4a0!2sCIPET%3AIPT%20Ahmedabad!5e0!3m2!1sen!2sin!4v1772916419555!5m2!1sen!2sin" 
          width="100%" 
          height="400" 
          style={{ border: 0 }} 
          allowFullScreen 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      
    </div>
  );
}