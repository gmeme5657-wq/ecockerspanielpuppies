/**
 * EmailJS Mock Library for Local Testing
 * This simulates EmailJS functionality when the CDN is not available
 * On your live server, the real EmailJS library will load from CDN
 */

window.emailjs = {
  init: function(publicKey) {
    console.log('✓ EmailJS (Mock) initialized with public key:', publicKey);
    this._publicKey = publicKey;
    return this;
  },
  
  send: async function(serviceId, templateId, data) {
    console.log('📧 EmailJS (Mock) sending email...');
    console.log('Service ID:', serviceId);
    console.log('Template ID:', templateId);
    console.log('Email Data:', data);
    
    // Simulate network delay
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('✓ EmailJS (Mock) - Email sent successfully!');
        resolve({
          status: 200,
          text: 'Mock email sent - this is local testing'
        });
      }, 1500);
    });
  }
};

console.log('✓ EmailJS Mock library loaded for local testing');
