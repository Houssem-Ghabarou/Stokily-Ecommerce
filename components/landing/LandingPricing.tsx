'use client';

import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Starter',
    price: '$29',
    period: '/month',
    description: 'Perfect for new store owners',
    features: [
      'Up to 500 products',
      'Basic analytics',
      'Email support',
      'Manual inventory tracking',
      'Single user account'
    ],
    highlighted: false
  },
  {
    name: 'Professional',
    price: '$99',
    period: '/month',
    description: 'For growing businesses',
    features: [
      'Unlimited products',
      'Advanced analytics',
      'Priority email & chat support',
      'Smart inventory management',
      'Up to 5 user accounts',
      'Customer loyalty program',
      'Multi-channel selling'
    ],
    highlighted: true
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'pricing',
    description: 'For large-scale operations',
    features: [
      'Everything in Professional',
      'Dedicated account manager',
      'Phone support',
      'Custom integrations',
      'Unlimited user accounts',
      'Advanced security features',
      'White-label solution'
    ],
    highlighted: false
  }
];

export function LandingPricing() {
  return (
    <section className="py-20 md:py-32 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the plan that fits your business. No hidden fees, cancel anytime.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-xl border transition-all duration-300 ${
                plan.highlighted
                  ? 'border-blue-300 shadow-xl ring-1 ring-blue-600 scale-105'
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-lg'
              } p-8 relative`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </div>
              )}
              
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {plan.name}
              </h3>
              <p className="text-gray-600 mb-6">
                {plan.description}
              </p>
              
              <div className="mb-6">
                <span className="text-5xl font-bold text-gray-900">
                  {plan.price}
                </span>
                <span className="text-gray-600 ml-2">
                  {plan.period}
                </span>
              </div>

              <button
                className={`w-full py-3 rounded-lg font-semibold transition-all duration-200 mb-8 ${
                  plan.highlighted
                    ? 'btn btn-primary'
                    : 'btn btn-outline'
                }`}
              >
                Get Started
              </button>

              <ul className="space-y-4">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* FAQ Teaser */}
        <div className="text-center">
          <p className="text-gray-600">
            Have questions?{' '}
            <a href="#faq" className="text-blue-600 font-semibold hover:text-blue-700">
              Check our FAQs
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
