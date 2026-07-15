import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Github, Linkedin, Send, MapPin, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { PERSONAL_INFO } from '../data';
import { ContactFormInput } from '../types';

export default function Contact() {
  const [formData, setFormData] = useState<ContactFormInput>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<Partial<ContactFormInput>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactFormInput> = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Please provide your name.';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Please provide an email address.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!formData.subject.trim()) {
      newErrors.subject = 'Please add a subject.';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Please type a message.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactFormInput]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  const shakeVariants = {
    shake: {
      x: [0, -10, 10, -10, 10, -5, 5, 0],
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="contact" className="py-24 bg-[#05040a] relative overflow-hidden">
      {/* Background radial spotlight */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[550px] h-[550px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header with reveal animation */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col mb-16 space-y-3"
        >
          <div className="inline-flex items-center space-x-2 text-amber-400 font-mono text-xs uppercase tracking-widest">
            <span>[ SECTION 04 ]</span>
            <span className="h-px w-8 bg-amber-500/30"></span>
            <span>GET IN TOUCH</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white flex items-center">
            Let's Collaborate
            <Sparkles size={20} className="text-amber-400 ml-2 animate-pulse" />
          </h2>
          <p className="text-gray-400 font-sans max-w-xl text-sm sm:text-base">
            Have an open opportunity, a research pipeline, or a trading strategy you want to discuss? Send a message.
          </p>
        </motion.div>

        {/* Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Social details & info cards */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', damping: 20 }}
            className="lg:col-span-5 space-y-6"
          >
            <h3 className="font-display font-bold text-xl text-white">Contact Info</h3>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm font-sans">
              I am open to summer internships, research assistanceships, or freelance quantitative scripting. Reach out through the form or my social networks.
            </p>

            <div className="space-y-4 pt-4">
              {/* Email Card with spring physics on hover */}
              <motion.a
                whileHover={{ y: -4, scale: 1.02 }}
                href={`mailto:${PERSONAL_INFO.email}`}
                className="flex items-center space-x-4 bg-[#0e0a1b]/60 border border-white/5 p-4 rounded-xl hover:border-white/10 hover:bg-[#0e0a1b]/80 hover:shadow-glow-amber transition-all duration-300 group"
              >
                <div className="p-3 bg-amber-500/10 text-amber-400 rounded-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                  <Mail size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-mono font-medium text-gray-400 uppercase tracking-wide">Email Me</h4>
                  <p className="text-sm font-semibold text-white group-hover:text-amber-300 transition-colors font-mono">
                    {PERSONAL_INFO.email}
                  </p>
                </div>
              </motion.a>

              {/* Location Card */}
              <motion.div 
                whileHover={{ y: -4, scale: 1.02 }}
                className="flex items-center space-x-4 bg-[#0e0a1b]/60 border border-white/5 p-4 rounded-xl hover:border-white/10 hover:bg-[#0e0a1b]/80 hover:shadow-glow-violet transition-all duration-300 cursor-default"
              >
                <div className="p-3 bg-violet-500/10 text-violet-400 rounded-lg">
                  <MapPin size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-mono font-medium text-gray-400 uppercase tracking-wide">Based In</h4>
                  <p className="text-sm font-semibold text-white font-sans">
                    {PERSONAL_INFO.location}
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Social icons block with hover scales */}
            <div className="space-y-3 pt-6">
              <h4 className="text-xs font-mono font-semibold text-gray-500 uppercase tracking-widest">
                Find Me Around The Web
              </h4>
              <div className="flex items-center space-x-4">
                <motion.a
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/3 border border-white/5 hover:border-amber-500/30 hover:bg-amber-500/10 flex items-center justify-center text-gray-300 hover:text-amber-400 transition-all duration-300"
                  title="GitHub Profile"
                >
                  <Github size={18} />
                </motion.a>
                
                <motion.a
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/3 border border-white/5 hover:border-violet-500/30 hover:bg-violet-500/10 flex items-center justify-center text-gray-300 hover:text-violet-400 transition-all duration-300"
                  title="LinkedIn Profile"
                >
                  <Linkedin size={18} />
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Active Form panel with glow borders */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', damping: 20 }}
            className="lg:col-span-7 bg-[#0e0a1b]/60 border border-white/5 p-6 sm:p-8 rounded-2xl shadow-xl relative overflow-hidden"
          >
            <AnimatePresence mode="wait">
              {!submitSuccess ? (
                <motion.form
                  key="contact-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label htmlFor="name" className="text-xs font-mono text-gray-400 font-medium">Your Name</label>
                      <motion.input
                        variants={shakeVariants}
                        animate={errors.name ? "shake" : "default"}
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className={`w-full bg-[#05040a] border rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-amber-500 transition-all duration-300 ${
                          errors.name ? 'border-red-500/50 shadow-sm shadow-red-500/10' : 'border-white/5 focus:shadow-glow-amber'
                        }`}
                      />
                      {errors.name && (
                        <p className="text-[11px] font-mono text-red-400 flex items-center">
                          <AlertCircle size={10} className="mr-1" /> {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label htmlFor="email" className="text-xs font-mono text-gray-400 font-medium">Email Address</label>
                      <motion.input
                        variants={shakeVariants}
                        animate={errors.email ? "shake" : "default"}
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@example.com"
                        className={`w-full bg-[#05040a] border rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-amber-500 transition-all duration-300 ${
                          errors.email ? 'border-red-500/50 shadow-sm shadow-red-500/10' : 'border-white/5 focus:shadow-glow-amber'
                        }`}
                      />
                      {errors.email && (
                        <p className="text-[11px] font-mono text-red-400 flex items-center">
                          <AlertCircle size={10} className="mr-1" /> {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="space-y-1.5">
                    <label htmlFor="subject" className="text-xs font-mono text-gray-400 font-medium">Subject</label>
                    <motion.input
                      variants={shakeVariants}
                      animate={errors.subject ? "shake" : "default"}
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="Opportunity / Inquiry details"
                      className={`w-full bg-[#05040a] border rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-amber-500 transition-all duration-300 ${
                        errors.subject ? 'border-red-500/50 shadow-sm shadow-red-500/10' : 'border-white/5 focus:shadow-glow-amber'
                      }`}
                    />
                    {errors.subject && (
                      <p className="text-[11px] font-mono text-red-400 flex items-center">
                        <AlertCircle size={10} className="mr-1" /> {errors.subject}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label htmlFor="message" className="text-xs font-mono text-gray-400 font-medium">Your Message</label>
                    <motion.textarea
                      variants={shakeVariants}
                      animate={errors.message ? "shake" : "default"}
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell me about your project, timelines, or role..."
                      className={`w-full bg-[#05040a] border rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-amber-500 transition-all duration-300 resize-none ${
                        errors.message ? 'border-red-500/50 shadow-sm shadow-red-500/10' : 'border-white/5 focus:shadow-glow-amber'
                      }`}
                    />
                    {errors.message && (
                      <p className="text-[11px] font-mono text-red-400 flex items-center">
                        <AlertCircle size={10} className="mr-1" /> {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button with interactive state */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-violet-600 hover:from-amber-600 hover:to-violet-700 text-white font-sans font-semibold text-sm rounded-xl shadow-glow-amber transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Transmitting Data...</span>
                      </>
                    ) : (
                      <>
                        <Send size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        <span>Send Message</span>
                      </>
                    )}
                  </motion.button>
                </motion.form>
              ) : (
                <motion.div
                  key="success-message"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: 'spring', damping: 15 }}
                  className="flex flex-col items-center justify-center text-center py-12 space-y-4"
                >
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.2, 1] }}
                    transition={{ delay: 0.15, duration: 0.5 }}
                    className="w-16 h-16 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center shadow-glow-amber"
                  >
                    <CheckCircle2 size={32} />
                  </motion.div>
                  <div className="space-y-1.5">
                    <h3 className="font-display font-bold text-xl text-white">Transmission Successful</h3>
                    <p className="text-sm text-gray-400 font-sans max-w-sm">
                      Thank you for reaching out! Your message was sent safely. Kaushik will get back to you as soon as possible.
                    </p>
                  </div>
                  <button
                    onClick={() => setSubmitSuccess(false)}
                    className="text-xs font-mono font-semibold text-amber-400 hover:text-amber-300 transition-colors pt-2 cursor-pointer"
                  >
                    Send another message
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

        </div>

      </div>
    </section>
  );
}

