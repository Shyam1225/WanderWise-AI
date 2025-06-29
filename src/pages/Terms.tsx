import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Scale, Shield, AlertTriangle, Users, Globe } from 'lucide-react';

export function Terms() {
  const sections = [
    {
      icon: Users,
      title: 'Acceptance of Terms',
      content: `
        <p>By accessing and using WanderWise AI's services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.</p>
        <p>These Terms of Service ("Terms") govern your use of our AI-powered travel planning platform and services. These Terms apply to all visitors, users, and others who access or use our services.</p>
      `,
    },
    {
      icon: Globe,
      title: 'Description of Service',
      content: `
        <p>WanderWise AI provides an AI-powered travel planning platform that helps users create personalized travel itineraries. Our services include:</p>
        <ul>
          <li>AI-generated travel itineraries and recommendations</li>
          <li>Destination guides and cultural insights</li>
          <li>Travel planning tools and collaboration features</li>
          <li>Customer support and assistance</li>
        </ul>
        <p>We reserve the right to modify, suspend, or discontinue any aspect of our services at any time without notice.</p>
      `,
    },
    {
      icon: Shield,
      title: 'User Accounts and Responsibilities',
      content: `
        <p>To access certain features of our services, you must create an account. You are responsible for:</p>
        <ul>
          <li>Providing accurate and complete information</li>
          <li>Maintaining the security of your account credentials</li>
          <li>All activities that occur under your account</li>
          <li>Notifying us immediately of any unauthorized use</li>
        </ul>
        <p>You must be at least 13 years old to create an account. If you are under 18, you must have parental consent to use our services.</p>
      `,
    },
    {
      icon: Scale,
      title: 'Acceptable Use Policy',
      content: `
        <p>You agree not to use our services to:</p>
        <ul>
          <li>Violate any applicable laws or regulations</li>
          <li>Infringe on intellectual property rights</li>
          <li>Transmit harmful, offensive, or inappropriate content</li>
          <li>Attempt to gain unauthorized access to our systems</li>
          <li>Interfere with or disrupt our services</li>
          <li>Use our services for commercial purposes without permission</li>
        </ul>
        <p>We reserve the right to suspend or terminate accounts that violate these terms.</p>
      `,
    },
    {
      icon: FileText,
      title: 'Intellectual Property Rights',
      content: `
        <p>Our services and content are protected by copyright, trademark, and other intellectual property laws. You acknowledge that:</p>
        <ul>
          <li>We own all rights to our platform, AI algorithms, and content</li>
          <li>You retain ownership of content you submit to our platform</li>
          <li>You grant us a license to use your content to provide our services</li>
          <li>You may not copy, modify, or distribute our proprietary content</li>
        </ul>
        <p>Any feedback or suggestions you provide may be used by us without compensation.</p>
      `,
    },
    {
      icon: AlertTriangle,
      title: 'Disclaimers and Limitations',
      content: `
        <p>Our services are provided "as is" without warranties of any kind. We disclaim all warranties, including:</p>
        <ul>
          <li>Accuracy of travel information and recommendations</li>
          <li>Availability of destinations or services</li>
          <li>Uninterrupted or error-free operation</li>
          <li>Fitness for a particular purpose</li>
        </ul>
        <p>We are not responsible for travel arrangements, bookings, or experiences. You are responsible for verifying all travel information and making your own arrangements.</p>
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
              <FileText className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-gray-900 dark:text-white mb-6">
              Terms of Service
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              These terms govern your use of WanderWise AI's services. Please read them carefully before using our platform.
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
              Agreement Overview
            </h2>
            <div className="prose prose-lg max-w-none dark:prose-invert text-gray-600 dark:text-gray-300">
              <p>
                Welcome to WanderWise AI. These Terms of Service ("Terms") create a legally binding agreement between you and WanderWise AI regarding your use of our AI-powered travel planning services.
              </p>
              <p>
                By using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you do not agree to these Terms, you may not access or use our services.
              </p>
            </div>
          </motion.div>

          {/* Terms Sections */}
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

          {/* Additional Terms */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-12 space-y-8"
          >
            {/* Payment Terms */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Payment and Billing Terms
              </h3>
              <div className="prose prose-lg max-w-none dark:prose-invert text-gray-600 dark:text-gray-300">
                <p>
                  Paid services are billed in advance on a monthly or annual basis. You agree to pay all charges associated with your account. We reserve the right to change our pricing with 30 days' notice.
                </p>
                <p>
                  Refunds are provided according to our refund policy. Failure to pay may result in suspension or termination of your account.
                </p>
              </div>
            </div>

            {/* Privacy and Data */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Privacy and Data Protection
              </h3>
              <div className="prose prose-lg max-w-none dark:prose-invert text-gray-600 dark:text-gray-300">
                <p>
                  Your privacy is important to us. Our collection and use of personal information is governed by our Privacy Policy, which is incorporated into these Terms by reference.
                </p>
                <p>
                  By using our services, you consent to the collection, use, and sharing of your information as described in our Privacy Policy.
                </p>
              </div>
            </div>

            {/* Termination */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Termination
              </h3>
              <div className="prose prose-lg max-w-none dark:prose-invert text-gray-600 dark:text-gray-300">
                <p>
                  You may terminate your account at any time by contacting us or using the account settings. We may terminate or suspend your account immediately if you violate these Terms.
                </p>
                <p>
                  Upon termination, your right to use our services will cease immediately, but these Terms will remain in effect regarding your prior use of our services.
                </p>
              </div>
            </div>

            {/* Governing Law */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Governing Law and Disputes
              </h3>
              <div className="prose prose-lg max-w-none dark:prose-invert text-gray-600 dark:text-gray-300">
                <p>
                  These Terms are governed by the laws of the State of California, without regard to conflict of law principles. Any disputes will be resolved through binding arbitration in San Francisco, California.
                </p>
                <p>
                  If any provision of these Terms is found to be unenforceable, the remaining provisions will remain in full force and effect.
                </p>
              </div>
            </div>

            {/* Changes to Terms */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Changes to These Terms
              </h3>
              <div className="prose prose-lg max-w-none dark:prose-invert text-gray-600 dark:text-gray-300">
                <p>
                  We reserve the right to modify these Terms at any time. We will notify you of any changes by posting the new Terms on our website and updating the "Last updated" date.
                </p>
                <p>
                  Your continued use of our services after any changes constitutes acceptance of the new Terms.
                </p>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-8 text-white">
              <h3 className="text-xl font-semibold mb-4">
                Contact Information
              </h3>
              <div className="prose prose-lg max-w-none text-white/90">
                <p>
                  If you have any questions about these Terms of Service, please contact us:
                </p>
                <ul className="text-white/90">
                  <li>Email: legal@wanderwise.ai</li>
                  <li>Phone: +1 (555) 123-4567</li>
                  <li>Address: 123 Travel Street, Suite 100, San Francisco, CA 94102</li>
                </ul>
                <p>
                  We will respond to your inquiry within 5 business days.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}