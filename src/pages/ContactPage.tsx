import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { FAQ_ITEMS } from '../data/mockData';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  ChevronDown,
  CheckCircle2,
  HelpCircle
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { showToast } = useStore();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Order & Harvest Inquiries');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      showToast('Please complete all required fields (Name, Email, Message).');
      return;
    }

    setSubmitted(true);
    showToast('Your message has reached our patron concierge.');
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(prev => (prev === index ? null : index));
  };

  return (
    <div className="bg-[#FAF7F2] min-h-screen">
      {/* Hero */}
      <section className="bg-[#F3EDE2] border-b border-[#E3D9C9] py-16 sm:py-20 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-3">
          <span className="text-[10px] tracking-[0.25em] text-earth uppercase font-semibold block">
            PATRON CONCIERGE & INQUIRIES
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-botanical font-normal">
            Let’s Stay Connected
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-light max-w-xl mx-auto leading-relaxed">
            Whether you have questions regarding our high-altitude harvest cycles, bulk collective inquiries, or botanical sourcing, our concierge is at your service.
          </p>
        </div>
      </section>

      {/* Two-Column Contact Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Contact Details */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-[10px] tracking-[0.2em] uppercase text-earth font-semibold block mb-1">
                COMMUNICATION CHANNELS
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-botanical font-normal">
                Direct Touchpoints
              </h2>
            </div>

            <div className="space-y-6 text-xs text-charcoal">
              <div className="flex items-start gap-4 p-5 bg-[#F6F1E7] border border-[#E5DAC8]">
                <div className="p-2.5 bg-botanical text-ivory-50 rounded-none shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <strong className="block text-sm font-serif text-botanical mb-0.5">
                    Written Dispatches
                  </strong>
                  <p className="text-charcoal-light mb-1">General Inquiries & Orders:</p>
                  <a
                    href="mailto:purejona@gmail.com"
                    className="font-semibold text-earth hover:underline font-mono"
                  >
                    purejona@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 bg-[#F6F1E7] border border-[#E5DAC8]">
                <div className="p-2.5 bg-botanical text-ivory-50 rounded-none shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <strong className="block text-sm font-serif text-botanical mb-0.5">
                    Voice Concierge
                  </strong>
                  <p className="text-charcoal-light mb-1">Direct Line:</p>
                  <a
                    href="tel:+917206451203"
                    className="font-mono text-earth font-semibold hover:underline"
                  >
                    +91 72064 51203
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 bg-[#F6F1E7] border border-[#E5DAC8]">
                <div className="p-2.5 bg-botanical text-ivory-50 rounded-none shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <strong className="block text-sm font-serif text-botanical mb-0.5">
                    Registered Headquarters & Estate
                  </strong>
                  <p className="text-charcoal-light mb-1">Botanical Archives:</p>
                  <p className="font-mono text-earth">
                    [Insert Company Address]
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 bg-[#F6F1E7] border border-[#E5DAC8]">
                <div className="p-2.5 bg-botanical text-ivory-50 rounded-none shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <strong className="block text-sm font-serif text-botanical mb-0.5">
                    Concierge Hours
                  </strong>
                  <p className="text-charcoal-light">
                    Monday – Friday: 9:00 AM – 6:00 PM IST<br />
                    Saturday: 10:00 AM – 2:00 PM IST
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 bg-[#F7F2E8] border border-[#E2D6C4] p-8 sm:p-12 shadow-sm">
            <h3 className="font-serif text-2xl text-botanical font-bold mb-2">
              Send an Inquiry to the Collective
            </h3>
            <p className="text-xs text-charcoal-light mb-8">
              Fill out the form below. Our botanical team typically responds within 24 business hours.
            </p>

            {submitted ? (
              <div className="p-8 bg-white border border-botanical/30 text-center space-y-4 animate-fade-in">
                <CheckCircle2 className="w-12 h-12 text-botanical mx-auto" />
                <h4 className="font-serif text-2xl text-botanical">Message Received</h4>
                <p className="text-xs text-charcoal-light max-w-sm mx-auto">
                  Thank you for reaching out. A dedicated concierge steward has received your transmission and will respond promptly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2 bg-botanical text-ivory-50 text-xs uppercase tracking-widest font-semibold"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-charcoal font-semibold mb-1 uppercase tracking-wider text-[11px]">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="e.g. Lord Julian Davies"
                      className="w-full px-3.5 py-2.5 bg-white border border-[#D5C9B7] focus:outline-none focus:border-botanical"
                    />
                  </div>
                  <div>
                    <label className="block text-charcoal font-semibold mb-1 uppercase tracking-wider text-[11px]">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="julian@davies.com"
                      className="w-full px-3.5 py-2.5 bg-white border border-[#D5C9B7] focus:outline-none focus:border-botanical"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-charcoal font-semibold mb-1 uppercase tracking-wider text-[11px]">
                      Phone (Optional)
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      placeholder="+1 (555) 234-5678"
                      className="w-full px-3.5 py-2.5 bg-white border border-[#D5C9B7] focus:outline-none focus:border-botanical"
                    />
                  </div>
                  <div>
                    <label className="block text-charcoal font-semibold mb-1 uppercase tracking-wider text-[11px]">
                      Subject *
                    </label>
                    <select
                      value={subject}
                      onChange={e => setSubject(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-[#D5C9B7] focus:outline-none focus:border-botanical font-medium"
                    >
                      <option value="Order & Harvest Inquiries">Order & Harvest Inquiries</option>
                      <option value="Cold-Chain Shipping">Cold-Chain Shipping</option>
                      <option value="Wholesale & Private Estates">Wholesale & Private Estates</option>
                      <option value="Farm Sourcing & Testing">Farm Sourcing & Testing</option>
                      <option value="General Conversation">General Conversation</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-charcoal font-semibold mb-1 uppercase tracking-wider text-[11px]">
                    Inquiry Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="Describe your inquiry or question..."
                    className="w-full px-3.5 py-2.5 bg-white border border-[#D5C9B7] focus:outline-none focus:border-botanical leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-botanical hover:bg-botanical-dark text-ivory-50 uppercase tracking-[0.2em] text-xs font-semibold transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Transmit Inquiry to Concierge</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Regional Terroir / Origin Map Notice */}
      <section className="py-16 bg-[#F4EDE0] border-t border-[#E3D9C9]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <span className="text-[10px] tracking-[0.25em] text-earth uppercase font-semibold block">
            TERROIR DISPATCHES
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl text-botanical font-normal">
            Visiting the High Valleys
          </h3>
          <p className="text-xs sm:text-sm text-charcoal-light max-w-xl mx-auto leading-relaxed">
            Due to the fragility of mountain micro-ecosystems and traditional herd movements, farm visits are arranged exclusively for accredited researchers, herbalists, and botanists by prior invitation.
          </p>
          <div className="p-4 bg-white border border-[#DDD0BC] inline-block text-xs text-earth font-mono">
            Estate Coordinator: [Insert Company Address]
          </div>
        </div>
      </section>

      {/* Interactive FAQ Accordion */}
      <section className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-[10px] tracking-[0.25em] text-earth uppercase font-semibold block mb-2 flex items-center justify-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>KNOWLEDGE BASE</span>
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-botanical font-normal">
            Frequently Asked Inquiries
          </h2>
        </div>

        <div className="space-y-4">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={index}
                className="bg-white border border-[#E3D9C9] overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className="font-serif text-base sm:text-lg text-charcoal font-semibold">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-botanical shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 text-xs text-charcoal-light leading-relaxed border-t border-[#F2EBE0] pt-4 animate-fade-in">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
