import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SEOHead } from "../components/atoms/SEOHead";
import { Advertisement } from "../components/atoms/Advertisement";
import { Footer } from "../components/organisms/Footer";
import { Shield, FileText, Cookie } from "lucide-react";

const LegalPage = () => {
  const location = useLocation();
  const path = location.pathname.substring(1);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [path]);

  const renderContent = () => {
    switch (path) {
      case "privacy-policy":
        return <PrivacyPolicy />;
      case "terms-of-service":
        return <TermsOfService />;
      case "cookie-policy":
        return <CookiePolicy />;
      default:
        return <PrivacyPolicy />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-text-primary">
      {/* Top Ad */}
      <div className="container mx-auto px-4 pt-24 pb-4">
        <Advertisement position="top" className="max-w-4xl mx-auto" />
      </div>
      
      {renderContent()}
      
      {/* Mid-content square ad */}
      <div className="container mx-auto px-4 py-6 flex justify-center">
        <Advertisement position="square" className="max-w-md" />
      </div>
      
      {/* Bottom Ad before Footer */}
      <div className="container mx-auto px-4 py-8">
        <Advertisement position="bottom" className="max-w-4xl mx-auto" />
      </div>
      
      <Footer />
    </div>
  );
};

const PrivacyPolicy = () => (
  <div className="pt-24 pb-12 container mx-auto px-4 max-w-4xl">
    <SEOHead
      title="Privacy Policy | GymTrackRD"
      description="Learn how GymTrackRD collects, uses, and protects your personal information. Your privacy and data security are our top priorities."
    />
    <div className="flex items-center gap-3 mb-4">
      <Shield className="w-10 h-10 text-primary" />
      <h1 className="text-4xl font-bold text-gradient">Privacy Policy</h1>
    </div>
    <p className="text-text-tertiary mb-8">Last Updated: December 27, 2025</p>

    <div className="glass-panel p-8 rounded-2xl space-y-6 text-text-secondary leading-relaxed">
      <section>
        <p className="text-lg">
          At GymTrackRD, your privacy is paramount. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our fitness tracking and workout planning platform.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-text-primary mt-8 mb-4">1. Information We Collect</h2>
        <h3 className="text-xl font-semibold text-text-primary mt-4 mb-2">Personal Information</h3>
        <p>When you create an account, we collect:</p>
        <ul className="list-disc pl-6 mt-2 space-y-2">
          <li>Name and email address</li>
          <li>Age, gender, and fitness goals</li>
          <li>Height, weight, and body measurements</li>
          <li>Fitness level and workout preferences</li>
          <li>Payment information (processed securely through third-party providers)</li>
        </ul>

        <h3 className="text-xl font-semibold text-text-primary mt-4 mb-2">Usage Data</h3>
        <p>We automatically collect:</p>
        <ul className="list-disc pl-6 mt-2 space-y-2">
          <li>Workout completion data and progress metrics</li>
          <li>Exercise selections and preferences</li>
          <li>Device information and IP address</li>
          <li>Browser type and operating system</li>
          <li>Pages visited and time spent on our platform</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-text-primary mt-8 mb-4">2. How We Use Your Information</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Personalize workout plans using our AI algorithms</li>
          <li>Track your fitness progress and provide insights</li>
          <li>Send important updates about your account and workouts</li>
          <li>Improve our services and develop new features</li>
          <li>Respond to customer support requests</li>
          <li>Prevent fraud and ensure platform security</li>
          <li>Comply with legal obligations</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-text-primary mt-8 mb-4">3. Data Sharing and Disclosure</h2>
        <p>We do not sell your personal information. We may share data with:</p>
        <ul className="list-disc pl-6 mt-2 space-y-2">
          <li><strong className="text-text-primary">Service Providers:</strong> Third-party companies that help us operate our platform (payment processors, cloud hosting, analytics)</li>
          <li><strong className="text-text-primary">Legal Requirements:</strong> When required by law, court order, or to protect our rights</li>
          <li><strong className="text-text-primary">Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
          <li><strong className="text-text-primary">With Your Consent:</strong> When you explicitly agree to share data with third parties</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-text-primary mt-8 mb-4">4. Data Security</h2>
        <p>We implement industry-standard security measures including:</p>
        <ul className="list-disc pl-6 mt-2 space-y-2">
          <li>SSL/TLS encryption for data in transit</li>
          <li>Encrypted storage for sensitive information</li>
          <li>Regular security audits and vulnerability assessments</li>
          <li>Strict access controls and authentication protocols</li>
          <li>Regular backups and disaster recovery procedures</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-text-primary mt-8 mb-4">5. Your Privacy Rights</h2>
        <p>You have the right to:</p>
        <ul className="list-disc pl-6 mt-2 space-y-2">
          <li><strong className="text-text-primary">Access:</strong> Request a copy of your personal data</li>
          <li><strong className="text-text-primary">Correct:</strong> Update or correct inaccurate information</li>
          <li><strong className="text-text-primary">Delete:</strong> Request deletion of your account and data</li>
          <li><strong className="text-text-primary">Export:</strong> Download your workout data in a portable format</li>
          <li><strong className="text-text-primary">Opt-Out:</strong> Unsubscribe from marketing communications</li>
          <li><strong className="text-text-primary">Object:</strong> Object to certain data processing activities</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-text-primary mt-8 mb-4">6. Data Retention</h2>
        <p>
          We retain your personal information for as long as your account is active or as needed to provide services. 
          After account deletion, we may retain certain data for legal compliance, dispute resolution, and fraud prevention purposes, 
          typically for a period of 90 days to 7 years depending on the data type and legal requirements.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-text-primary mt-8 mb-4">7. Children's Privacy</h2>
        <p>
          Our services are not intended for users under 16 years of age. We do not knowingly collect personal information 
          from children. If we discover we have collected data from a child under 16, we will delete it immediately.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-text-primary mt-8 mb-4">8. International Data Transfers</h2>
        <p>
          Your information may be transferred to and processed in countries other than your country of residence. 
          We ensure appropriate safeguards are in place, including Standard Contractual Clauses and adherence to 
          data protection frameworks like GDPR and CCPA.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-text-primary mt-8 mb-4">9. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy periodically. We will notify you of significant changes via email or 
          through a prominent notice on our platform. Your continued use after changes constitutes acceptance.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-text-primary mt-8 mb-4">10. Contact Us</h2>
        <p>For privacy-related questions or to exercise your rights, contact us at:</p>
        <div className="mt-4 p-4 bg-surface-secondary/50 rounded-lg border border-surface-border">
          <p><strong className="text-text-primary">Email:</strong> privacy@gymtrackrd.com</p>
          <p><strong className="text-text-primary">Address:</strong> 123 Fitness Ave, San Francisco, CA 94102</p>
          <p><strong className="text-text-primary">Data Protection Officer:</strong> dpo@gymtrackrd.com</p>
        </div>
      </section>
    </div>
  </div>
);

const TermsOfService = () => (
  <div className="pt-24 pb-12 container mx-auto px-4 max-w-4xl">
    <SEOHead
      title="Terms of Service | GymTrackRD"
      description="Read GymTrackRD's Terms of Service to understand the rules, responsibilities, and guidelines for using our fitness platform."
    />
    <div className="flex items-center gap-3 mb-4">
      <FileText className="w-10 h-10 text-primary" />
      <h1 className="text-4xl font-bold text-gradient">Terms of Service</h1>
    </div>
    <p className="text-text-tertiary mb-8">Last Updated: December 27, 2025</p>

    <div className="glass-panel p-8 rounded-2xl space-y-6 text-text-secondary leading-relaxed">
      <section>
        <p className="text-lg">
          Welcome to GymTrackRD. By accessing or using our platform, you agree to be bound by these Terms of Service. 
          Please read them carefully before using our services.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-text-primary mt-8 mb-4">1. Acceptance of Terms</h2>
        <p>
          By creating an account, accessing our website, or using our mobile application, you agree to comply with and 
          be legally bound by these Terms of Service, our Privacy Policy, and all applicable laws and regulations. 
          If you do not agree with these terms, you must not use our services.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-text-primary mt-8 mb-4">2. Description of Services</h2>
        <p>GymTrackRD provides:</p>
        <ul className="list-disc pl-6 mt-2 space-y-2">
          <li>AI-powered personalized workout planning and recommendations</li>
          <li>Fitness progress tracking and analytics</li>
          <li>Exercise database with instructions and demonstrations</li>
          <li>Nutrition guidance and meal planning tools</li>
          <li>Community features and fitness challenges</li>
          <li>Premium subscription features and content</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-text-primary mt-8 mb-4">3. User Accounts</h2>
        <h3 className="text-xl font-semibold text-text-primary mt-4 mb-2">Account Creation</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>You must be at least 16 years old to create an account</li>
          <li>Provide accurate, current, and complete information</li>
          <li>Maintain the security of your password and account</li>
          <li>Notify us immediately of any unauthorized access</li>
        </ul>

        <h3 className="text-xl font-semibold text-text-primary mt-4 mb-2">Account Responsibilities</h3>
        <p>You are responsible for all activities that occur under your account. You agree not to:</p>
        <ul className="list-disc pl-6 mt-2 space-y-2">
          <li>Share your account credentials with others</li>
          <li>Use another user's account without permission</li>
          <li>Create multiple accounts for fraudulent purposes</li>
          <li>Impersonate others or provide false information</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-text-primary mt-8 mb-4">4. Subscription and Payment</h2>
        <h3 className="text-xl font-semibold text-text-primary mt-4 mb-2">Free and Premium Tiers</h3>
        <p>
          We offer both free and premium subscription plans. Premium features require a paid subscription 
          with automatic renewal unless canceled.
        </p>

        <h3 className="text-xl font-semibold text-text-primary mt-4 mb-2">Billing</h3>
        <ul className="list-disc pl-6 mt-2 space-y-2">
          <li>Subscriptions are billed in advance on a monthly or annual basis</li>
          <li>Payment is processed through secure third-party payment providers</li>
          <li>Prices are subject to change with 30 days notice</li>
          <li>No refunds for partial subscription periods</li>
          <li>You may cancel anytime before the next billing cycle</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-text-primary mt-8 mb-4">5. Acceptable Use Policy</h2>
        <p>You agree not to:</p>
        <ul className="list-disc pl-6 mt-2 space-y-2">
          <li>Violate any laws or regulations</li>
          <li>Infringe on intellectual property rights</li>
          <li>Upload malicious code, viruses, or harmful content</li>
          <li>Harass, abuse, or harm other users</li>
          <li>Spam, phish, or engage in fraudulent activities</li>
          <li>Scrape, copy, or reverse engineer our platform</li>
          <li>Use automated systems to access our services without permission</li>
          <li>Attempt to gain unauthorized access to our systems</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-text-primary mt-8 mb-4">6. Medical Disclaimer</h2>
        <div className="bg-warning/10 border border-warning/30 p-4 rounded-lg">
          <p className="font-semibold text-text-primary mb-2">IMPORTANT HEALTH NOTICE</p>
          <p>
            GymTrackRD is NOT a substitute for professional medical advice, diagnosis, or treatment. 
            Always consult with a qualified healthcare provider before starting any new fitness program, 
            especially if you have pre-existing health conditions. Our AI recommendations are for informational 
            purposes only and should not replace personalized medical guidance.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-text-primary mt-8 mb-4">7. Intellectual Property</h2>
        <p>
          All content, features, and functionality on GymTrackRD (including text, graphics, logos, videos, and software) 
          are owned by GymTrackRD or our licensors and are protected by copyright, trademark, and other intellectual property laws.
        </p>
        <h3 className="text-xl font-semibold text-text-primary mt-4 mb-2">License to Use</h3>
        <p>
          We grant you a limited, non-exclusive, non-transferable license to access and use our platform for personal, 
          non-commercial purposes in accordance with these Terms.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-text-primary mt-8 mb-4">8. User Content</h2>
        <p>
          By uploading or sharing content (progress photos, comments, reviews), you grant us a worldwide, 
          royalty-free license to use, display, and distribute your content in connection with our services. 
          You retain all ownership rights to your content.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-text-primary mt-8 mb-4">9. Limitation of Liability</h2>
        <p>
          TO THE MAXIMUM EXTENT PERMITTED BY LAW, GYMTRACKRD SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, 
          SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS, DATA, OR OTHER INTANGIBLE LOSSES 
          RESULTING FROM YOUR USE OF OUR SERVICES.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-text-primary mt-8 mb-4">10. Indemnification</h2>
        <p>
          You agree to indemnify and hold harmless GymTrackRD, its affiliates, and their respective officers, 
          directors, employees, and agents from any claims, damages, losses, or expenses arising from your use 
          of our services or violation of these Terms.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-text-primary mt-8 mb-4">11. Termination</h2>
        <p>
          We reserve the right to suspend or terminate your account at our discretion, with or without notice, 
          for violations of these Terms or for any other reason. Upon termination, your right to use our services 
          will immediately cease.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-text-primary mt-8 mb-4">12. Governing Law</h2>
        <p>
          These Terms shall be governed by and construed in accordance with the laws of the State of California, 
          United States, without regard to its conflict of law provisions. Any disputes shall be resolved in the 
          courts located in San Francisco County, California.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-text-primary mt-8 mb-4">13. Changes to Terms</h2>
        <p>
          We reserve the right to modify these Terms at any time. We will notify users of material changes via 
          email or platform notification. Your continued use after changes constitutes acceptance of the new Terms.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-text-primary mt-8 mb-4">14. Contact Information</h2>
        <p>For questions about these Terms, contact us at:</p>
        <div className="mt-4 p-4 bg-surface-secondary/50 rounded-lg border border-surface-border">
          <p><strong className="text-text-primary">Email:</strong> legal@gymtrackrd.com</p>
          <p><strong className="text-text-primary">Address:</strong> 123 Fitness Ave, San Francisco, CA 94102</p>
        </div>
      </section>
    </div>
  </div>
);

const CookiePolicy = () => (
  <div className="pt-24 pb-12 container mx-auto px-4 max-w-4xl">
    <SEOHead
      title="Cookie Policy | GymTrackRD"
      description="Understand how GymTrackRD uses cookies and similar technologies to enhance your experience and improve our services."
    />
    <div className="flex items-center gap-3 mb-4">
      <Cookie className="w-10 h-10 text-primary" />
      <h1 className="text-4xl font-bold text-gradient">Cookie Policy</h1>
    </div>
    <p className="text-text-tertiary mb-8">Last Updated: December 27, 2025</p>

    <div className="glass-panel p-8 rounded-2xl space-y-6 text-text-secondary leading-relaxed">
      <section>
        <p className="text-lg">
          This Cookie Policy explains how GymTrackRD uses cookies and similar tracking technologies to enhance 
          your experience, analyze usage, and improve our services.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-text-primary mt-8 mb-4">1. What Are Cookies?</h2>
        <p>
          Cookies are small text files stored on your device when you visit our website. They help us remember 
          your preferences, authenticate your session, and understand how you use our platform. Cookies can be 
          "session" cookies (deleted when you close your browser) or "persistent" cookies (remain until deleted 
          or expired).
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-text-primary mt-8 mb-4">2. Types of Cookies We Use</h2>
        
        <div className="space-y-4">
          <div className="bg-surface-secondary/50 p-4 rounded-lg border border-surface-border">
            <h3 className="text-xl font-semibold text-text-primary mb-2">Essential Cookies (Required)</h3>
            <p>
              These cookies are necessary for the website to function properly. They enable core functionality 
              such as security, network management, and accessibility. You cannot opt-out of these cookies.
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Authentication and session management</li>
              <li>Security and fraud prevention</li>
              <li>Load balancing and performance optimization</li>
            </ul>
          </div>

          <div className="bg-surface-secondary/50 p-4 rounded-lg border border-surface-border">
            <h3 className="text-xl font-semibold text-text-primary mb-2">Functional Cookies</h3>
            <p>
              These cookies enable enhanced functionality and personalization, such as remembering your preferences, 
              language settings, and workout history.
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>User preferences and settings</li>
              <li>Dark mode theme selection</li>
              <li>Recently viewed workouts</li>
              <li>Saved workout favorites</li>
            </ul>
          </div>

          <div className="bg-surface-secondary/50 p-4 rounded-lg border border-surface-border">
            <h3 className="text-xl font-semibold text-text-primary mb-2">Analytics Cookies</h3>
            <p>
              These cookies help us understand how visitors interact with our platform by collecting and reporting 
              information anonymously. We use Google Analytics and similar tools.
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Page views and navigation patterns</li>
              <li>Time spent on pages</li>
              <li>Traffic sources and referrals</li>
              <li>Device and browser information</li>
              <li>Anonymized user behavior data</li>
            </ul>
          </div>

          <div className="bg-surface-secondary/50 p-4 rounded-lg border border-surface-border">
            <h3 className="text-xl font-semibold text-text-primary mb-2">Marketing Cookies</h3>
            <p>
              These cookies track your activity across websites to deliver targeted advertisements and measure 
              campaign effectiveness.
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Retargeting and remarketing campaigns</li>
              <li>Social media integration (Facebook Pixel, etc.)</li>
              <li>Conversion tracking</li>
              <li>Ad performance measurement</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-text-primary mt-8 mb-4">3. Third-Party Cookies</h2>
        <p>We use services from trusted third parties that may set their own cookies:</p>
        <ul className="list-disc pl-6 mt-2 space-y-2">
          <li><strong className="text-text-primary">Google Analytics:</strong> Website traffic and user behavior analysis</li>
          <li><strong className="text-text-primary">Stripe:</strong> Payment processing and fraud prevention</li>
          <li><strong className="text-text-primary">Facebook Pixel:</strong> Ad targeting and conversion tracking</li>
          <li><strong className="text-text-primary">Hotjar:</strong> User experience and heatmap analytics</li>
          <li><strong className="text-text-primary">YouTube:</strong> Video content embedding</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-text-primary mt-8 mb-4">4. How to Manage Cookies</h2>
        <p>You have several options to control or delete cookies:</p>

        <h3 className="text-xl font-semibold text-text-primary mt-4 mb-2">Browser Settings</h3>
        <p>
          Most web browsers allow you to control cookies through their settings. You can typically find these 
          settings in the "options" or "preferences" menu. Here are links to cookie settings for popular browsers:
        </p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>Chrome: Settings → Privacy and Security → Cookies</li>
          <li>Firefox: Options → Privacy & Security → Cookies</li>
          <li>Safari: Preferences → Privacy → Cookies</li>
          <li>Edge: Settings → Cookies and site permissions</li>
        </ul>

        <h3 className="text-xl font-semibold text-text-primary mt-4 mb-2">Cookie Preference Center</h3>
        <p>
          You can manage your cookie preferences directly on our website through our Cookie Preference Center 
          (accessible in the footer). This allows you to enable or disable specific cookie categories.
        </p>

        <h3 className="text-xl font-semibold text-text-primary mt-4 mb-2">Opt-Out Tools</h3>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>Google Analytics Opt-out: Install the Google Analytics Opt-out Browser Add-on</li>
          <li>NAI Consumer Opt-out: Visit networkadvertising.org/choices</li>
          <li>DAA WebChoices: Visit optout.aboutads.info</li>
        </ul>

        <div className="bg-warning/10 border border-warning/30 p-4 rounded-lg mt-4">
          <p className="font-semibold text-text-primary mb-2">Important Note</p>
          <p>
            Disabling cookies may affect the functionality of our platform. Some features may not work properly 
            if you block all cookies.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-text-primary mt-8 mb-4">5. Local Storage and Similar Technologies</h2>
        <p>
          In addition to cookies, we may use local storage, session storage, and similar technologies to store 
          data on your device. These technologies serve similar purposes to cookies but can store larger amounts 
          of data and persist longer.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-text-primary mt-8 mb-4">6. Do Not Track Signals</h2>
        <p>
          Some browsers offer a "Do Not Track" (DNT) feature. Currently, there is no industry standard for 
          responding to DNT signals. We do not respond to DNT browser signals at this time, but you can use 
          our Cookie Preference Center to manage your preferences.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-text-primary mt-8 mb-4">7. Updates to This Policy</h2>
        <p>
          We may update this Cookie Policy from time to time to reflect changes in our practices or for other 
          operational, legal, or regulatory reasons. We will notify you of any material changes by posting the 
          new policy on this page with an updated "Last Updated" date.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-text-primary mt-8 mb-4">8. Contact Us</h2>
        <p>If you have questions about our use of cookies, contact us at:</p>
        <div className="mt-4 p-4 bg-surface-secondary/50 rounded-lg border border-surface-border">
          <p><strong className="text-text-primary">Email:</strong> privacy@gymtrackrd.com</p>
          <p><strong className="text-text-primary">Address:</strong> 123 Fitness Ave, San Francisco, CA 94102</p>
        </div>
      </section>
    </div>
  </div>
);

export default LegalPage;
