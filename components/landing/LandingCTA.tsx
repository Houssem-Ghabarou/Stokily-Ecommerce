'use client';

import { ArrowRight } from 'lucide-react';

export function LandingCTA() {
  return (
    <section className="py-20 md:py-32 px-4 md:px-8 bg-gradient-to-r from-blue-600 to-indigo-600">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
          Ready to Transform Your Business?
        </h2>
        
        <p className="text-xl text-blue-100">
          Join thousands of store owners who are already using Stokily to grow their businesses. Start free today, no credit card required.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <button className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8 py-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2">
            Start Your Free Trial
            <ArrowRight className="w-5 h-5" />
          </button>
          <button className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-200">
            Schedule Demo
          </button>
        </div>

        <p className="text-blue-100 text-sm">
          14-day free trial. No credit card required. Cancel anytime.
        </p>
      </div>
    </section>
  );
}
