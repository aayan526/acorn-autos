import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle, Clock, ChevronDown, MessageSquare } from 'lucide-react';
import { GARAGE_INFO, FREQUENT_QUESTIONS } from '../data/garageData';

export const ContactSection: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [contactForm, setContactForm] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name.trim() || !contactForm.phone.trim()) return;
    setFormSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 bg-slate-900/40 border-t border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-400">
            Get in Touch
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Speak Directly with our Wortley Technicians
          </h2>
          <p className="text-slate-300 text-base leading-relaxed">
            Need an estimate, advice on an MOT failure advisory, or looking to schedule commercial fleet maintenance? Contact us below or give us a call during workshop hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Contact Form */}
          <div className="lg:col-span-6 bg-slate-950 border border-slate-800 rounded-xl p-6 sm:p-8 shadow-xl">
            <h3 className="text-xl font-bold text-white mb-2">
              Send an Online Message / Callback Request
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Leave your vehicle query and contact details. We reply or call back same-day during opening hours.
            </p>

            {formSubmitted ? (
              <div className="p-6 rounded-lg bg-emerald-950/40 border border-emerald-500/40 text-center space-y-3">
                <CheckCircle className="w-10 h-10 text-emerald-400 mx-auto" />
                <h4 className="text-base font-bold text-white">Thank You for Getting in Touch!</h4>
                <p className="text-xs text-slate-300 max-w-sm mx-auto">
                  Your message has been received by our reception desk. We will call you back on <strong>{contactForm.phone}</strong> shortly.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setFormSubmitted(false);
                    setContactForm({ name: '', phone: '', email: '', message: '' });
                  }}
                  className="mt-3 px-4 py-2 rounded bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                      Full Name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      placeholder="e.g. John Smith"
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-phone" className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                      Phone Number *
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      required
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                      placeholder="e.g. 07700 900123"
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                    Email Address
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    placeholder="e.g. john@example.com"
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                    Your Vehicle Query / Symptoms *
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    placeholder="Tell us what you need help with (e.g. clutch quote, air conditioning check, MOT date availability)..."
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-md bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message to Reception</span>
                </button>
              </form>
            )}

            {/* Quick Direct Call Notice */}
            <div className="mt-6 pt-4 border-t border-slate-900 flex items-center justify-between text-xs text-slate-400">
              <span>Urgent breakdown or same-day MOT?</span>
              <a href={GARAGE_INFO.phoneHref} className="text-amber-400 font-bold hover:underline flex items-center gap-1">
                <Phone className="w-3.5 h-3.5" />
                <span>0113 279 9404</span>
              </a>
            </div>
          </div>

          {/* Right Column: Frequently Asked Questions Accordion */}
          <div className="lg:col-span-6 space-y-4">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">
                Frequently Asked Motorist Questions
              </h3>
              <p className="text-xs text-slate-400 mb-6">
                Common questions regarding MOT testing requirements, warranty protection, and vehicle drop-offs.
              </p>
            </div>

            <div className="space-y-3">
              {FREQUENT_QUESTIONS.map((item, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={item.q}
                    className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden transition-all duration-200"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full p-4 text-left flex items-center justify-between gap-3 text-sm font-bold text-white hover:text-amber-400 transition-colors cursor-pointer"
                    >
                      <span>{item.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ${
                          isOpen ? 'rotate-180 text-amber-400' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 text-xs text-slate-300 leading-relaxed border-t border-slate-900/80 pt-3 animate-in fade-in duration-200">
                        {item.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
