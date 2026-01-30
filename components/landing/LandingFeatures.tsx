'use client';

import { ShoppingCart, BarChart3, Users, Zap, Lock, Globe } from 'lucide-react';

const features = [
  {
    icon: ShoppingCart,
    title: 'Smart Inventory Management',
    description: 'Real-time stock tracking, low-stock alerts, and automated reordering to keep your business running smoothly.',
    color: 'bg-blue-100'
  },
  {
    icon: BarChart3,
    title: 'Advanced Analytics',
    description: 'Comprehensive sales reports, customer insights, and business metrics to make data-driven decisions.',
    color: 'bg-indigo-100'
  },
  {
    icon: Users,
    title: 'Customer Management',
    description: 'Build lasting relationships with detailed customer profiles, purchase history, and loyalty programs.',
    color: 'bg-purple-100'
  },
  {
    icon: Zap,
    title: 'Lightning Fast Performance',
    description: 'Optimized for speed with zero downtime. Your store is always ready to serve customers 24/7.',
    color: 'bg-yellow-100'
  },
  {
    icon: Lock,
    title: 'Enterprise Security',
    description: 'Bank-level encryption, PCI compliance, and regular security audits to protect your data.',
    color: 'bg-green-100'
  },
  {
    icon: Globe,
    title: 'Global Reach',
    description: 'Multi-currency support, international shipping integration, and localization features.',
    color: 'bg-pink-100'
  }
];

export function LandingFeatures() {
  return (
    <section className="py-20 md:py-32 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Powerful Features, Simple to Use
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to run a successful e-commerce business is built right in.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="group">
                <div className="h-full bg-white rounded-xl border border-gray-200 p-8 hover:border-blue-300 hover:shadow-lg transition-all duration-300">
                  <div className={`${feature.color} w-12 h-12 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6 text-gray-800" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
