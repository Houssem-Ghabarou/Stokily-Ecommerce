'use client';

import { ArrowRight, Play } from 'lucide-react';

export function LandingHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-blue-50 to-indigo-50 pt-20 pb-32 px-4 md:px-8">
      {/* Background decorative element */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animation-delay-2000 animate-blob"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
              <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
              Trusted by 10,000+ store owners
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
              Build Your Empire with <span className="text-blue-600">Stokily</span>
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
              The all-in-one e-commerce platform designed for ambitious store owners. Inventory, POS, analytics, and beautiful online storefronts - all in one place.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="btn btn-primary gap-2">
                Start Free Trial
                <ArrowRight className="w-4 h-4" />
              </button>
              <button className="btn btn-outline gap-2">
                <Play className="w-4 h-4" />
                Watch Demo
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-gray-200">
              <div>
                <div className="text-2xl font-bold text-gray-900">10K+</div>
                <p className="text-sm text-gray-600">Active Stores</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">$500M</div>
                <p className="text-sm text-gray-600">GMV Processed</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">99%</div>
                <p className="text-sm text-gray-600">Uptime</p>
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-400 to-indigo-600 rounded-2xl p-8 text-white shadow-2xl">
              <div className="space-y-6">
                <div className="bg-white/20 backdrop-blur-md rounded-xl p-6 space-y-3">
                  <div className="h-4 bg-white/30 rounded w-32"></div>
                  <div className="h-3 bg-white/20 rounded w-full"></div>
                  <div className="h-3 bg-white/20 rounded w-5/6"></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/20 backdrop-blur-md rounded-xl p-6 h-28"></div>
                  <div className="bg-white/20 backdrop-blur-md rounded-xl p-6 h-28"></div>
                </div>
                <div className="bg-white/20 backdrop-blur-md rounded-xl p-6 flex items-center justify-between">
                  <div className="space-y-2">
                    <div className="h-3 bg-white/30 rounded w-24"></div>
                    <div className="h-2 bg-white/20 rounded w-16"></div>
                  </div>
                  <div className="w-12 h-12 bg-white/30 rounded-lg"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
