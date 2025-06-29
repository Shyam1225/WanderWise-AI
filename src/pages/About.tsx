import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Users, Globe, Sparkles, Heart, Award, Target, Lightbulb } from 'lucide-react';

export function About() {
  const values = [
    {
      icon: Heart,
      title: 'Passion for Travel',
      description: 'We believe travel transforms lives and creates lasting memories. Every journey should be extraordinary.',
    },
    {
      icon: Globe,
      title: 'Global Expertise',
      description: 'Our AI has been trained on cultural insights and local knowledge from every corner of the world.',
    },
    {
      icon: Users,
      title: 'Community First',
      description: 'We build for travelers, by travelers. Your experiences and feedback shape our evolution.',
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'We constantly push boundaries to make travel planning more intelligent and intuitive.',
    },
  ];

  const team = [
    {
      name: 'Alex Chen',
      role: 'CEO & Co-Founder',
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
      description: 'Former Google product manager with 50+ countries visited.',
    },
    {
      name: 'Sarah Rodriguez',
      role: 'CTO & Co-Founder',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
      description: 'AI researcher and digital nomad who lived in 15 countries.',
    },
    {
      name: 'Marcus Thompson',
      role: 'Head of AI',
      image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
      description: 'PhD in Machine Learning with expertise in travel behavior.',
    },
  ];

  return (
    <div className="min-h-screen pt-16 bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-gray-800 dark:to-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-gray-900 dark:text-white mb-6">
              Redefining Travel Planning with{' '}
              <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                Artificial Intelligence
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              We're on a mission to make travel planning as exciting as the journey itself. 
              WanderWise AI combines cutting-edge technology with deep cultural understanding 
              to create personalized travel experiences that inspire and delight.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white">
                    Our Mission
                  </h2>
                </div>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  To democratize expert travel knowledge and make world-class trip planning 
                  accessible to everyone. We believe that with the right guidance, anyone can 
                  experience the transformative power of thoughtful travel.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  Our AI doesn't just suggest places to visit—it understands your travel style, 
                  respects local cultures, and crafts experiences that resonate with your personal 
                  journey of discovery.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative">
                <img
                  src="https://images.pexels.com/photos/1051075/pexels-photo-1051075.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2"
                  alt="Travel planning"
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-2xl" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 dark:text-white mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              The principles that guide everything we do and shape the experiences we create.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-white dark:bg-gray-700 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2 h-full">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <value.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 dark:text-white mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Passionate travelers and technologists working together to revolutionize trip planning.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2 text-center">
                  <div className="relative mb-6">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-24 h-24 rounded-full object-cover mx-auto shadow-lg"
                    />
                    <div className="absolute inset-0 w-24 h-24 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-full mx-auto" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                    {member.name}
                  </h3>
                  <p className="text-primary-600 dark:text-primary-400 font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    {member.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4">
              WanderWise AI by the Numbers
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Our impact on the travel planning community continues to grow every day.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: '50K+', label: 'Trips Planned' },
              { value: '195', label: 'Countries Covered' },
              { value: '98%', label: 'Satisfaction Rate' },
              { value: '3min', label: 'Average Planning Time' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl sm:text-5xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-white/80 text-lg">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}