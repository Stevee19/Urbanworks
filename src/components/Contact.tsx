import { Send, Phone, Mail, Globe } from 'lucide-react';
import { useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const Contact = () => {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Form submitted:', formData);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
      
      // Reset success message after 3 seconds
      setTimeout(() => setSubmitStatus('idle'), 3000);
    } catch (error) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-12 sm:py-16 md:py-20 bg-white">
      <div ref={sectionRef} className="max-w-container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className={`text-center mb-6 sm:mb-8 md:mb-12 transition-all duration-700 ${sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

          <h2 className="section-title">Contact Us</h2>
          <span className="section-subtitle">Ready to Build Your Dream?</span>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Fill out the form below and we'll get back to you shortly.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Left: Contact Form */}
          <div className={`transition-all duration-700 delay-200 ${sectionVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            {submitStatus === 'success' && (
              <div className="mb-4 p-3 bg-green-50 border border-green-400 rounded-lg text-green-700 text-sm">
                ✓ Message sent successfully! We'll contact you soon.
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mb-4 p-3 bg-red-50 border border-red-400 rounded-lg text-red-700 text-sm">
                ✗ Failed to send message. Please try again.
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:gap-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name *"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm rounded-lg bg-gray-50 border border-gray-200 text-primary placeholder-gray-400 focus:outline-none focus:border-accent focus:bg-white transition-all duration-200"
              />
              
              <input
                type="email"
                name="email"
                placeholder="Email Address *"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm rounded-lg bg-gray-50 border border-gray-200 text-primary placeholder-gray-400 focus:outline-none focus:border-accent focus:bg-white transition-all duration-200"
              />
              
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm rounded-lg bg-gray-50 border border-gray-200 text-primary placeholder-gray-400 focus:outline-none focus:border-accent focus:bg-white transition-all duration-200"
              />
              
              <textarea
                name="message"
                placeholder="Tell us about your project..."
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm rounded-lg bg-gray-50 border border-gray-200 text-primary placeholder-gray-400 focus:outline-none focus:border-accent focus:bg-white transition-all duration-200 resize-none"
              />
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm font-semibold rounded-lg bg-accent text-white transition-all duration-300 hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 uppercase tracking-wider"
              >
                {isSubmitting ? (
                  <span className="animate-spin">⏳</span>
                ) : (
                  <Send size={16} />
                )}
                {isSubmitting ? 'Sending...' : 'Send'}
              </button>
            </form>
          </div>

          {/* Right: Google Map */}
          <div className={`transition-all duration-700 delay-400 ${sectionVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <div className="rounded-xl overflow-hidden shadow-lg h-full min-h-[300px] sm:min-h-[400px] md:min-h-[450px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3861.257754860415!2d121.04660889805587!3d14.584383202836095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c83945d54a7b%3A0x189d2337a9b68b0b!2sAmaia%20Skies%20Shaw%20North%20Tower!5e0!3m2!1sen!2sph!4v1776926492486!5m2!1sen!2sph"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Urbanworks Location"
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Contact Info Cards */}
        <div className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-12 transition-all duration-700 delay-600 ${sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-lg">
            <div className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 flex items-center justify-center bg-accent/10 rounded-lg">
              <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
            </div>
            <div>
              <p className="text-xs font-semibold text-primary uppercase tracking-wide">Phone</p>
              <p className="text-xs sm:text-sm text-gray">+63 912 345 6789</p>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-lg">
            <div className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 flex items-center justify-center bg-accent/10 rounded-lg">
              <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
            </div>
            <div>
              <p className="text-xs font-semibold text-primary uppercase tracking-wide">Email</p>
              <p className="text-xs sm:text-sm text-gray">urban.worksservice@gmail.com</p>
            </div>
          </div>

          <a 
            href="https://www.facebook.com/urbanworksservice"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200 sm:col-span-2 lg:col-span-1"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 flex items-center justify-center bg-accent/10 rounded-lg">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                className="w-4 h-4 sm:w-5 sm:h-5 text-accent"
              >
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </div>
            <div>
              <p className="text-xs font-semibold text-primary uppercase tracking-wide">Facebook</p>
              <p className="text-xs sm:text-sm text-gray">Urbanworks Construction and Development</p>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
