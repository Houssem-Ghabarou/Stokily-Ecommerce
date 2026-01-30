'use client';

import { TrendingUp, Clock, DollarSign } from 'lucide-react';

export function LandingBenefits() {
  return (
    <section className="py-20 md:py-32 px-4 md:px-8 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Why Choose Stokily?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join thousands of successful store owners who trust Stokily to power their business.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {[
            {
              icon: TrendingUp,
              stat: '3x',
              title: 'Revenue Growth',
              description: 'Store owners see an average of 3x revenue growth within the first 6 months'
            },
            {
              icon: Clock,
              stat: '70%',
              title: 'Time Saved',
              description: 'Automate repetitive tasks and focus on growing your business'
            },
            {
              icon: DollarSign,
              stat: '$0',
              title: 'Setup Fees',
              description: 'No hidden costs. Pay only for what you use with transparent pricing'
            }
          ].map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div key={index} className="bg-white rounded-xl border border-gray-200 p-8 text-center hover:shadow-lg transition-all duration-300">
                <div className="bg-blue-100 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <Icon className="w-8 h-8 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {benefit.stat}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Testimonial */}
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <div className="mb-6">
            <div className="flex justify-center gap-1">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="text-yellow-400">★</div>
              ))}
            </div>
          </div>
          <p className="text-2xl font-semibold text-gray-900 mb-6 max-w-3xl mx-auto">
            "Stokily transformed how we run our business. The platform is intuitive, and the support team is always there when we need help. Best decision we made."
          </p>
          <div>
            <p className="font-semibold text-gray-900">Sarah Ahmed</p>
            <p className="text-gray-600">Founder of StyleHub Fashion Store</p>
          </div>
        </div>
      </div>
    </section>
  );
}
