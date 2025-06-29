import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Users, Database, Globe } from 'lucide-react';

export function Privacy() {
  const sections = [
    {
      icon: Database,
      title: 'Information We Collect',
      content: `
        <p>We collect information you provide directly to us, such as when you create an account, use our services, or contact us for support. This includes:</p>
        <ul>
          <li>Account information (name, email address, password)</li>
          <li>Travel preferences and history</li>
          <li>Payment information (processed securely by our payment partners)</li>
          <li>Communications with our support team</li>
        </ul>
        <p>We also automatically collect certain information about your device and usage of our services, including IP address, browser type, and usage patterns to improve our AI recommendations.</p>
      `,
    },
    {
      icon: Eye,
      title: 'How We Use Your Information',
      content: `
        <p>We use the information we collect to:</p>
        <ul>
          <li>Provide, maintain, and improve our AI travel planning services</li>
          <li>Create personalized travel recommendations</li>
          <li>Process transactions and send related information</li>
          <li>Send technical notices, updates, and support messages</li>
          <li>Respond to your comments and questions</li>
          <li>Analyze usage patterns to enhance user experience</li>
        </ul>
        <p>We use advanced AI algorithms to analyze your travel preferences and create personalized recommendations while maintaining your privacy.</p>
      `,
    },
    {
      icon: Users,
      title: 'Information Sharing',
      content: `
        <p>We do not sell, trade, or otherwise transfer your personal information to third parties except in the following circumstances:</p>
        <ul>
          <li>With your explicit consent</li>
          <li>To trusted service providers who assist in operating our services</li>
          <li>When required by law or to protect our rights</li>
          <li>In connection with a business transfer or acquisition</li>
        </ul>
        <p>Our service providers are contractually obligated to keep your information confidential and use it only for the services they provide to us.</p>
      `,
    },
    {
      icon: Lock,
      title: 'Data Security',
      content: `
        <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction:</p>
        <ul>
          <li>Encryption of data in transit and at rest</li>
          <li>Regular security assessments and updates</li>
          <li>Access controls and authentication measures</li>
          <li>Secure data centers with physical security controls</li>
        </ul>
        <p>While we strive to protect your personal information, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.</p>
      `,
    },
    {
      icon: Globe,
      title: 'International Data Transfers',
      content: `
        <p>Your information may be transferred to and processed in countries other than your own. We ensure that such transfers comply with applicable data protection laws:</p>
        <ul>
          <li>We use appropriate safeguards for international transfers</li>
          <li>We comply with GDPR, CCPA, and other applicable privacy regulations</li>
          <li>We maintain data processing agreements with our international partners</li>
        </ul>
        <p>By using our services, you consent to the transfer of your information to countries that may have different data protection laws than your country of residence.</p>
      `,
    },
    {
      icon: Shield,
      title: 'Your Rights and Choices',
      content: `
        <p>Depending on your location, you may have certain rights regarding your personal information:</p>
        <ul>
          <li>Access: Request a copy of the personal information we hold about you</li>
          <li>Correction: Request correction of inaccurate or incomplete information</li>
          <li>Deletion: Request deletion of your personal information</li>
          <li>Portability: Request transfer of your data to another service</li>
          <li>Objection: Object to certain processing of your information</li>
        </ul>
        <p>To exercise these rights, please contact us using the information provided in the "Contact Us" section below.</p>
      `,
    },
  ];

  return (
    <div className="min-h-screen pt-16 bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-gray-800 dark:to-gray-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-gray-900 dark:text-white mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              Your privacy is important to us. This policy explains how we collect, use, and protect your information when you use WanderWise AI.
            </p>
            <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
              Last updated: January 20, 2024
            </div>
          </motion.div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg mb-12"
          >
            <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-4">
              Introduction
            </h2>
            <div className="prose prose-lg max-w-none dark:prose-invert text-gray-600 dark:text-gray-300">
              <p>
                WanderWise AI ("we," "our," or "us") is committed to protecting your privacy and ensuring you have a positive experience on our platform. This Privacy Policy describes how we collect, use, disclose, and safeguard your information when you use our AI-powered travel planning services.
              </p>
              <p>
                By using our services, you agree to the collection and use of information in accordance with this policy. If you do not agree with our policies and practices, please do not use our services.
              </p>
            </div>
          </motion.div>

          {/* Privacy Sections */}
          <div className="space-y-8">
            {sections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <section.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                      {section.title}
                    </h3>
                    <div 
                      className="prose prose-lg max-w-none dark:prose-invert text-gray-600 dark:text-gray-300"
                      dangerouslySetInnerHTML={{ __html: section.content }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Additional Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-12 space-y-8"
          >
            {/* Cookies */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Cookies and Tracking Technologies
              </h3>
              <div className="prose prose-lg max-w-none dark:prose-invert text-gray-600 dark:text-gray-300">
                <p>
                  We use cookies and similar tracking technologies to enhance your experience on our platform. Cookies help us remember your preferences, analyze site traffic, and provide personalized recommendations.
                </p>
                <p>
                  You can control cookie settings through your browser preferences. However, disabling certain cookies may limit your ability to use some features of our services.
                </p>
              </div>
            </div>

            {/* Children's Privacy */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Children's Privacy
              </h3>
              <div className="prose prose-lg max-w-none dark:prose-invert text-gray-600 dark:text-gray-300">
                <p>
                  Our services are not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.
                </p>
              </div>
            </div>

            {/* Changes to Policy */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Changes to This Privacy Policy
              </h3>
              <div className="prose prose-lg max-w-none dark:prose-invert text-gray-600 dark:text-gray-300">
                <p>
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. We encourage you to review this Privacy Policy periodically for any changes.
                </p>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-8 text-white">
              <h3 className="text-xl font-semibold mb-4">
                Contact Us
              </h3>
              <div className="prose prose-lg max-w-none text-white/90">
                <p>
                  If you have any questions about this Privacy Policy or our privacy practices, please contact us:
                </p>
                <ul className="text-white/90">
                  <li>Email: privacy@wanderwise.ai</li>
                  <li>Phone: +1 (555) 123-4567</li>
                  <li>Address: 123 Travel Street, Suite 100, San Francisco, CA 94102</li>
                </ul>
                <p>
                  We will respond to your inquiry within 30 days of receipt.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}