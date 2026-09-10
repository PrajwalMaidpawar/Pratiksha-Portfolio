/**
 * ContactForm Component (Phase 7)
 * High-craft editorial collaboration inquiry form.
 * Features:
 * - Minimal underline-based input styling with terracotta focus accents
 * - Client-side validation (Name, Email, Message)
 * - Real server-side submission to /api/contact
 * - Polished state handling (Default, Submitting, Success, Error)
 * - Accessible: aria-describedby, focus management, high contrast
 */

import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { ArrowRight, CheckCircle2, AlertCircle, RefreshCw, Send } from 'lucide-react';
import { editorialEase } from '../../styles/animations';

const PROJECT_TYPES = [
  'Brand Collaboration',
  'Street Interview',
  'Reels / Short-form Content',
  'Fashion / Modelling',
  'Events / Hosting',
  'Creative Campaign',
  'Other',
];

export default function ContactForm() {
  const shouldReduceMotion = useReducedMotion();

  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    email: '',
    projectType: 'Brand Collaboration',
    message: '',
    website: '', // Anti-bot honeypot
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // 'idle' | 'sending' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');

  const validate = () => {
    const nextErrors = {};

    if (!formData.name.trim()) {
      nextErrors.name = 'Please enter your name.';
    } else if (formData.name.trim().length > 100) {
      nextErrors.name = 'Name must be 100 characters or fewer.';
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!formData.email.trim()) {
      nextErrors.email = 'Please enter your email address.';
    } else if (!emailRegex.test(formData.email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    } else if (formData.email.trim().length > 120) {
      nextErrors.email = 'Email must be 120 characters or fewer.';
    }

    if (!formData.message.trim()) {
      nextErrors.message = 'Tell us a little about the project.';
    } else if (formData.message.trim().length < 5) {
      nextErrors.message = 'Message is too short. Please provide a few more details.';
    } else if (formData.message.trim().length > 3000) {
      nextErrors.message = 'Message must be 3,000 characters or fewer.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear inline error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setStatus('sending');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus('success');
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Something went wrong. Please try again or contact us directly.');
      }
    } catch (err) {
      console.error('Contact submission network error:', err);
      setStatus('error');
      setErrorMessage('Something went wrong. Please try again or contact us directly.');
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      brand: '',
      email: '',
      projectType: 'Brand Collaboration',
      message: '',
    });
    setErrors({});
    setStatus('idle');
    setErrorMessage('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, delay: 0.15, ease: editorialEase }}
      className="rounded-3xl bg-[#18171E] border border-[#2C2A35] p-6 sm:p-10 lg:p-12 shadow-2xl relative overflow-hidden"
    >
      {/* Top Editorial Ribbon */}
      <div className="flex items-center justify-between pb-8 border-b border-[#2C2A35] mb-8">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-[#C38A68] font-bold block">
            INQUIRY FORM
          </span>
          <h3 className="font-display text-2xl sm:text-3xl text-[#E6E2DE] tracking-wide uppercase leading-none mt-1 m-0">
            START A COLLABORATION
          </h3>
        </div>
        <div className="hidden sm:flex items-center gap-1 text-[11px] font-mono text-[#8E8A85]">
          <span>* REQUIRED FIELDS</span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {status === 'success' ? (
          /* SUCCESS STATE */
          <motion.div
            key="success-message"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: editorialEase }}
            className="py-12 sm:py-16 text-center space-y-6"
          >
            <div className="w-16 h-16 rounded-full bg-[#C38A68]/15 border border-[#C38A68] flex items-center justify-center text-[#C38A68] mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2 max-w-md mx-auto">
              <h4 className="font-display text-4xl sm:text-5xl text-[#E6E2DE] uppercase tracking-wide m-0">
                THANK YOU.
              </h4>
              <p className="font-body text-base sm:text-lg text-[#E6E2DE]/90 leading-relaxed">
                Your inquiry has been sent.
              </p>
              <p className="font-body text-sm text-[#8E8A85] leading-relaxed">
                We'll review your proposal and get back to you soon.
              </p>
            </div>

            <div className="pt-4">
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#151419] hover:bg-[#201F28] border border-[#2C2A35] text-xs font-mono text-[#E6E2DE] hover:text-[#C38A68] transition-all duration-300"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>SEND ANOTHER INQUIRY</span>
              </button>
            </div>
          </motion.div>
        ) : (
          /* FORM BODY */
          <motion.form
            key="inquiry-form"
            onSubmit={handleSubmit}
            noValidate
            className="space-y-8"
          >
            {/* Error banner if submission failed */}
            {status === 'error' && (
              <div
                role="alert"
                className="p-4 rounded-xl bg-red-950/40 border border-red-800/60 text-red-200 text-xs font-body flex items-start gap-3"
              >
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold">{errorMessage}</div>
                  <div className="text-[11px] text-red-300/80 mt-0.5">
                    Your details have been preserved. You can also email directly at officialpratiksha26@gmail.com
                  </div>
                </div>
              </div>
            )}

            {/* Anti-spam honeypot (hidden from human visitors) */}
            <div className="hidden" aria-hidden="true" style={{ display: 'none' }}>
              <label htmlFor="inquiry-website">Website</label>
              <input
                id="inquiry-website"
                name="website"
                type="text"
                value={formData.website}
                onChange={handleChange}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            {/* Field 1: Name */}
            <div className="space-y-2">
              <label
                htmlFor="contact-name"
                className="block font-mono text-xs uppercase tracking-widest text-[#8E8A85] font-semibold"
              >
                NAME <span className="text-[#C38A68]">*</span>
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                maxLength={100}
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
                aria-required="true"
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? 'name-error' : undefined}
                className={`w-full bg-transparent border-0 border-b-2 py-3 px-0 text-base sm:text-lg text-[#E6E2DE] placeholder-[#8E8A85]/40 focus:outline-none transition-colors duration-200 ${
                  errors.name
                    ? 'border-red-500 focus:border-red-400'
                    : 'border-[#2C2A35] focus:border-[#C38A68]'
                }`}
              />
              {errors.name && (
                <p id="name-error" className="font-mono text-xs text-red-400 pt-1">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Field 2: Brand / Company */}
            <div className="space-y-2">
              <label
                htmlFor="contact-brand"
                className="block font-mono text-xs uppercase tracking-widest text-[#8E8A85] font-semibold"
              >
                BRAND / COMPANY
              </label>
              <input
                id="contact-brand"
                name="brand"
                type="text"
                maxLength={100}
                value={formData.brand}
                onChange={handleChange}
                placeholder="Brand, agency, or production house (optional)"
                className="w-full bg-transparent border-0 border-b-2 border-[#2C2A35] focus:border-[#C38A68] py-3 px-0 text-base sm:text-lg text-[#E6E2DE] placeholder-[#8E8A85]/40 focus:outline-none transition-colors duration-200"
              />
            </div>

            {/* Field 3: Email */}
            <div className="space-y-2">
              <label
                htmlFor="contact-email"
                className="block font-mono text-xs uppercase tracking-widest text-[#8E8A85] font-semibold"
              >
                EMAIL <span className="text-[#C38A68]">*</span>
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                maxLength={120}
                value={formData.email}
                onChange={handleChange}
                placeholder="name@company.com"
                aria-required="true"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'email-error' : undefined}
                className={`w-full bg-transparent border-0 border-b-2 py-3 px-0 text-base sm:text-lg text-[#E6E2DE] placeholder-[#8E8A85]/40 focus:outline-none transition-colors duration-200 ${
                  errors.email
                    ? 'border-red-500 focus:border-red-400'
                    : 'border-[#2C2A35] focus:border-[#C38A68]'
                }`}
              />
              {errors.email && (
                <p id="email-error" className="font-mono text-xs text-red-400 pt-1">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Field 4: Project Type (Dropdown) */}
            <div className="space-y-2">
              <label
                htmlFor="contact-project-type"
                className="block font-mono text-xs uppercase tracking-widest text-[#8E8A85] font-semibold"
              >
                PROJECT TYPE
              </label>
              <div className="relative">
                <select
                  id="contact-project-type"
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  className="w-full bg-[#18171E] border-0 border-b-2 border-[#2C2A35] focus:border-[#C38A68] py-3 px-0 text-base text-[#E6E2DE] focus:outline-none cursor-pointer transition-colors duration-200"
                >
                  {PROJECT_TYPES.map((type) => (
                    <option key={type} value={type} className="bg-[#18171E] text-[#E6E2DE] py-2">
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Field 5: Message */}
            <div className="space-y-2">
              <label
                htmlFor="contact-message"
                className="block font-mono text-xs uppercase tracking-widest text-[#8E8A85] font-semibold"
              >
                TELL ME ABOUT THE PROJECT <span className="text-[#C38A68]">*</span>
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={4}
                maxLength={3000}
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about the campaign objectives, deliverables, timelines, or concept idea..."
                aria-required="true"
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? 'message-error' : undefined}
                className={`w-full bg-transparent border-0 border-b-2 py-3 px-0 text-base sm:text-lg text-[#E6E2DE] placeholder-[#8E8A85]/40 focus:outline-none transition-colors duration-200 resize-y min-h-[100px] ${
                  errors.message
                    ? 'border-red-500 focus:border-red-400'
                    : 'border-[#2C2A35] focus:border-[#C38A68]'
                }`}
              />
              {errors.message && (
                <p id="message-error" className="font-mono text-xs text-red-400 pt-1">
                  {errors.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <p className="font-body text-xs text-[#8E8A85] order-2 sm:order-1">
                Submissions routed to creator management desk.
              </p>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="order-1 sm:order-2 group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#C38A68] hover:bg-[#d49977] text-[#151419] font-body font-bold text-sm tracking-wider uppercase transition-all duration-300 shadow-xl disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
              >
                {status === 'sending' ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>SENDING...</span>
                  </>
                ) : (
                  <>
                    <span>SEND INQUIRY</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </>
                )}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
