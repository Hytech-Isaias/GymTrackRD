import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Twitter,
  Facebook,
  Send,
  Clock,
  MessageCircle,
} from "lucide-react";
import { staggerContainer, fadeInUp } from "../../lib/animations/variants";

export const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log("Form submitted:", formData);
    setSubmitSuccess(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
    setIsSubmitting(false);
    
    setTimeout(() => setSubmitSuccess(false), 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="relative py-32 bg-background">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
            backgroundSize: "40px 40px",
            color: "var(--color-text-tertiary)",
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <motion.h2
            variants={fadeInUp}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6"
          >
            Let's Start
            <br />
            <span className="text-gradient bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
              Your Journey
            </span>
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="font-body text-xl text-text-secondary max-w-2xl mx-auto"
          >
            Have questions? Want to learn more? We're here to help you succeed.
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
            <motion.div variants={fadeInUp}>
              <h3 className="font-display text-2xl font-bold text-text-primary mb-6">
                Contact Information
              </h3>

              <div className="space-y-4">
                {[
                  {
                    icon: Mail,
                    label: "Email",
                    value: "hello@gymtrackrd.com",
                    link: "mailto:hello@gymtrackrd.com"
                  },
                  { 
                    icon: Phone, 
                    label: "Phone", 
                    value: "+1 (555) 123-4567",
                    link: "tel:+15551234567"
                  },
                  {
                    icon: MapPin,
                    label: "Location",
                    value: "123 Fitness Ave, San Francisco, CA 94102",
                  },
                  {
                    icon: Clock,
                    label: "Support Hours",
                    value: "Mon-Fri: 9AM-6PM PST",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    custom={index}
                    className="flex items-start gap-4 p-4 rounded-xl bg-surface-primary/5 border border-surface-border hover:border-primary/30 transition-colors"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                      <item.icon className="text-primary" size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-text-tertiary mb-1">
                        {item.label}
                      </p>
                      {item.link ? (
                        <a href={item.link} className="text-text-primary font-medium hover:text-primary transition-colors">
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-text-primary font-medium">
                          {item.value}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={fadeInUp}>
              <h4 className="font-bold text-text-primary mb-4">Follow Us</h4>
              <div className="flex gap-4">
                {[
                  { icon: Instagram, href: "https://instagram.com/gymtrackrd", label: "Instagram" },
                  { icon: Twitter, href: "https://twitter.com/gymtrackrd", label: "Twitter" },
                  { icon: Facebook, href: "https://facebook.com/gymtrackrd", label: "Facebook" },
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 rounded-full bg-surface-primary/5 border border-surface-border flex items-center justify-center text-text-primary hover:border-primary hover:text-primary transition-colors"
                    aria-label={`Follow us on ${social.label}`}
                  >
                    <social.icon size={20} />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Additional Info */}
            <motion.div variants={fadeInUp} className="glass-panel p-6 rounded-xl border border-surface-border">
              <MessageCircle className="w-8 h-8 text-primary mb-3" />
              <h4 className="font-bold text-text-primary mb-2">Quick Response</h4>
              <p className="text-text-secondary text-sm">
                We typically respond to all inquiries within 24 hours. For urgent matters, 
                please call our support line during business hours.
              </p>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <form
              onSubmit={handleSubmit}
              className="glass-panel p-8 rounded-2xl border border-surface-border space-y-6"
            >
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-text-secondary mb-2"
                >
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-surface-primary/5 border border-surface-border rounded-lg text-text-primary placeholder-text-tertiary focus:outline-none focus:border-primary/50 transition-colors"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-text-secondary mb-2"
                >
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-surface-primary/5 border border-surface-border rounded-lg text-text-primary placeholder-text-tertiary focus:outline-none focus:border-primary/50 transition-colors"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-text-secondary mb-2"
                >
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-surface-primary/5 border border-surface-border rounded-lg text-text-primary placeholder-text-tertiary focus:outline-none focus:border-primary/50 transition-colors"
                  placeholder="How can we help?"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-text-secondary mb-2"
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-surface-primary/5 border border-surface-border rounded-lg text-text-primary placeholder-text-tertiary focus:outline-none focus:border-primary/50 transition-colors resize-none"
                  placeholder="Tell us more about your inquiry..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-4 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    <Send size={18} />
                    Send Message
                  </>
                )}
              </button>

              {submitSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-success/10 border border-success/30 rounded-lg text-success text-center"
                >
                  ✓ Message sent successfully! We'll be in touch soon.
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};