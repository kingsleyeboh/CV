import { useState } from 'react';
import { Mail, MessageSquare, MapPin, Send, CheckCircle2, Copy } from 'lucide-react';
import { CV_DATA } from '../data/projects';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    employerName: '',
    companyName: '',
    email: '',
    positionOffered: 'Cabinet Maker',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const cleanPhone = CV_DATA.phone.replace(/[^0-9]/g, '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.employerName || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(CV_DATA.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const mailtoUrl = `mailto:${CV_DATA.email}?subject=${encodeURIComponent(
    `Employment / Sponsorship Inquiry: ${formData.positionOffered} - ${formData.companyName || 'Employer'}`
  )}&body=${encodeURIComponent(
    `Dear Kingsley Uzoma,\n\nEmployer Name: ${formData.employerName}\nCompany: ${formData.companyName}\nEmail: ${formData.email}\nPosition Offered: ${formData.positionOffered}\n\nMessage:\n${formData.message}`
  )}`;

  const whatsAppUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    `Hello Kingsley Uzoma, I saw your Cabinet Maker portfolio and would like to discuss a ${formData.positionOffered || 'cabinet making'} opportunity.`
  )}`;

  return (
    <section id="contact" className="py-14 sm:py-18 bg-zinc-950 text-zinc-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Direct Channels */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-2">
              <p className="text-xs font-medium text-amber-400">
                Contact
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Employer & Sponsorship Inquiries
              </h2>
              <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
                Reach out directly regarding workshop roles, trade assessments, or international sponsorship opportunities.
              </p>
            </div>

            <div className="space-y-5 pt-4 border-t border-zinc-800/80 text-sm">
              <div className="space-y-1">
                <span className="text-xs text-zinc-400 block">Email</span>
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={`mailto:${CV_DATA.email}`}
                    className="font-semibold text-white hover:text-amber-400 transition-colors"
                  >
                    {CV_DATA.email}
                  </a>
                  <button
                    onClick={handleCopyEmail}
                    className="inline-flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 font-medium"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedEmail ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-xs text-zinc-400 block">Phone & WhatsApp</span>
                <a
                  href={whatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-semibold text-emerald-400 hover:underline"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{CV_DATA.phone}</span>
                </a>
              </div>

              <div className="space-y-1">
                <span className="text-xs text-zinc-400 block">Location</span>
                <p className="inline-flex items-center gap-1.5 font-medium text-zinc-200">
                  <MapPin className="w-4 h-4 text-amber-500" />
                  <span>{CV_DATA.location} · Willing to relocate</span>
                </p>
              </div>
            </div>
          </div>

          {/* Right: Clean Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-xl bg-zinc-900/60 border border-zinc-800">
              {submitted ? (
                <div className="py-8 text-center space-y-4">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                  <h3 className="text-xl font-semibold text-white">
                    Ready to send, {formData.employerName}
                  </h3>
                  <p className="text-sm text-zinc-300 max-w-md mx-auto">
                    Your inquiry for <strong className="text-amber-400">{formData.positionOffered}</strong> is prepared. Launch your email client to send it directly:
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                    <a
                      href={mailtoUrl}
                      className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-zinc-950 bg-amber-500 hover:bg-amber-400 rounded-lg transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Open Email Client</span>
                    </a>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-4 py-2.5 text-sm font-medium text-zinc-300 hover:text-white"
                    >
                      Edit Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-sm">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="font-medium text-zinc-300 block text-xs">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Hiring Manager"
                        value={formData.employerName}
                        onChange={(e) => setFormData({ ...formData, employerName: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="font-medium text-zinc-300 block text-xs">
                        Company / Workshop
                      </label>
                      <input
                        type="text"
                        placeholder="Joinery Workshop Pty Ltd"
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="font-medium text-zinc-300 block text-xs">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="employer@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="font-medium text-zinc-300 block text-xs">
                        Role
                      </label>
                      <select
                        value={formData.positionOffered}
                        onChange={(e) => setFormData({ ...formData, positionOffered: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-amber-500"
                      >
                        {CV_DATA.targetRoles.map((role) => (
                          <option key={role} value={role}>{role}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-medium text-zinc-300 block text-xs">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Position details, location, or interview availability..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-amber-500 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 py-3 px-6 text-sm font-semibold text-zinc-950 bg-amber-500 hover:bg-amber-400 rounded-lg transition-colors"
                  >
                    <Send className="w-4 h-4" />
                    <span>Prepare Email Inquiry</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
