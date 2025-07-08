import type { Metadata } from 'next';
import Image from 'next/image';
import React from 'react';
import { FaStar, FaClock, FaUsers, FaShieldAlt, FaArrowRight } from 'react-icons/fa';

import CookiesPopup from '@/components/CookiesPopup';

export const metadata: Metadata = {
  title: 'Quietum Plus - Discover the Secret to Healthier Ears | Pre-Launch',
  description:
    'Discover how thousands of people are naturally recovering their hearing. Revolutionary method with 97% proven efficacy. Limited time offer.',
  keywords:
    'quietum plus, hearing, hearing health, natural supplement, tinnitus, hearing loss',
  openGraph: {
    title: 'Quietum Plus - Recover Your Hearing Naturally',
    description: 'Revolutionary method with 97% efficacy. Limited time offer.',
    type: 'website',
  },
};

export default function QuietumPlusPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">Q</span>
              </div>
              <span className="text-2xl font-bold text-gray-900">Quietum Plus</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-orange-600">
                <FaClock className="w-5 h-5" />
                <span className="font-semibold">Limited Offer</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center px-4 py-2 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                <span className="animate-pulse mr-2">🔥</span>
                SPECIAL OFFER - 50% DISCOUNT
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Discover the{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
                  Secret
                </span>{' '}
                to Healthier Ears
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed">
                Thousands of people have already discovered how to naturally recover their
                hearing with this revolutionary method. 97% proven efficacy in clinical
                studies.
              </p>

              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <span className="text-gray-600 font-medium">4.9/5</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <FaUsers className="w-5 h-5" />
                  <span className="font-medium">+15,847 satisfied customers</span>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Special Limited Time Offer
                  </h3>
                  <div className="text-2xl font-bold text-red-600">50% OFF</div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Original Price:</span>
                    <span className="text-gray-400 line-through">$297.00</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Discounted Price:</span>
                    <span className="text-2xl font-bold text-green-600">$147.00</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">You Save:</span>
                    <span className="text-lg font-semibold text-green-600">$150.00</span>
                  </div>
                </div>
              </div>

              <a
                href="https://quietumplus.com/text?hopId=17002c22-05f5-44ec-a4e7-83fef017c0d7&hop=ntnaraujo"
                className="inline-flex items-center justify-center w-full lg:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-green-600 text-white font-bold text-lg rounded-xl hover:from-blue-700 hover:to-green-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                I WANT TO RECOVER MY HEARING
                <FaArrowRight className="ml-2 w-5 h-5" />
              </a>

              <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                <FaShieldAlt className="w-4 h-4" />
                <span>100% Secure Purchase</span>
                <span>•</span>
                <span>30-Day Guarantee</span>
                <span>•</span>
                <span>Fast Delivery</span>
              </div>
            </div>

            <div className="relative">
              {/* Floating tags in front of the image */}
              <div className="absolute -top-4 -right-4 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold animate-bounce z-10">
                NATURAL
              </div>
              <div className="absolute -bottom-4 -left-4 bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold animate-pulse z-10">
                APROVADO
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-2xl">
                <div className="relative w-full h-96 rounded-xl overflow-hidden">
                  <Image
                    src="/quietumplus.png"
                    alt="Quietum Plus - Natural Supplement for Hearing Health"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why is Quietum Plus Different?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the exclusive benefits that make Quietum Plus the right choice for
              your hearing health
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: '🔬',
                title: 'Scientifically Proven',
                description:
                  '97% proven efficacy in clinical studies conducted with over 2,000 participants.',
              },
              {
                icon: '🌿',
                title: '100% Natural',
                description:
                  'Formulated with carefully selected natural ingredients, with no side effects.',
              },
              {
                icon: '⚡',
                title: 'Fast Results',
                description: 'First visible results in just 30 days of regular use.',
              },
              {
                icon: '🛡️',
                title: 'Safe and Approved',
                description:
                  'Approved by FDA and certified by international laboratories.',
              },
              {
                icon: '💰',
                title: 'Best Cost-Benefit',
                description:
                  'Single investment that can save thousands in future treatments.',
              },
              {
                icon: '🎯',
                title: 'Specific Focus',
                description: 'Developed specifically for hearing problems and tinnitus.',
              },
            ].map((benefit, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-8 hover:shadow-lg transition-all duration-300"
              >
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600">
              Real stories from people who transformed their lives with Quietum Plus
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: 'Maria Silva, 58 years old',
                location: 'New York, NY',
                rating: 5,
                comment:
                  "After 3 months of using Quietum Plus, I was able to hear my granddaughter for the first time in years. It's incredible!",
              },
              {
                name: 'John Santos, 65 years old',
                location: 'Los Angeles, CA',
                rating: 5,
                comment:
                  'The tinnitus that bothered me for 10 years completely disappeared. I recommend it to everyone!',
              },
              {
                name: 'Anna Costa, 52 years old',
                location: 'Chicago, IL',
                rating: 5,
                comment:
                  'Impressive results in just 2 months. My quality of life improved 100%.',
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">"{testimonial.comment}"</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-gray-500 text-sm">{testimonial.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Urgency Section */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">⚠️ ATTENTION: Limited Time Offer</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            This special 50% discount offer is available for a limited time only. Don't
            miss the opportunity to transform your hearing health.
          </p>

          <div className="bg-white/10 rounded-2xl p-8 mb-8 backdrop-blur-sm">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">24</div>
                <div className="text-lg">Hours</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">00</div>
                <div className="text-lg">Minutes</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">00</div>
                <div className="text-lg">Seconds</div>
              </div>
            </div>
          </div>

          <a
            href="https://quietumplus.com/text?hopId=17002c22-05f5-44ec-a4e7-83fef017c0d7&hop=ntnaraujo"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-red-600 font-bold text-lg rounded-xl hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            SECURE MY DISCOUNT NOW
            <FaArrowRight className="ml-2 w-5 h-5" />
          </a>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-6">
            {[
              {
                question: 'Is Quietum Plus safe to use?',
                answer:
                  'Yes, Quietum Plus is 100% safe. It is formulated with natural ingredients approved by the FDA and has no known side effects.',
              },
              {
                question: 'How long does it take to see results?',
                answer:
                  'Most users begin to notice improvements within 30-60 days of regular use. For best results, we recommend continuous use for 3-6 months.',
              },
              {
                question: 'Can I use it with other medications?',
                answer:
                  'Since Quietum Plus is a natural supplement, it is generally safe to use with other medications. However, we recommend consulting your doctor.',
              },
              {
                question: 'What is the product guarantee?',
                answer:
                  'We offer a 30-day guarantee. If you are not satisfied, we will refund 100% of your money, no questions asked.',
              },
              {
                question: 'How is delivery handled?',
                answer:
                  'Delivery is handled by USPS with tracking. Average delivery time is 5-10 business days for the entire United States.',
              },
            ].map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-green-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Don't Leave Your Hearing Health for Later
          </h2>
          <p className="text-xl mb-8">
            Join thousands of people who have already transformed their lives with Quietum
            Plus. Take advantage of the special 50% discount while it's still available.
          </p>

          <div className="bg-white/10 rounded-2xl p-8 mb-8 backdrop-blur-sm">
            <div className="text-3xl font-bold mb-4">Special Offer</div>
            <div className="text-6xl font-bold mb-4">$147.00</div>
            <div className="text-xl opacity-90">instead of $297.00</div>
          </div>

          <a
            href="https://quietumplus.com/text?hopId=17002c22-05f5-44ec-a4e7-83fef017c0d7&hop=ntnaraujo"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-bold text-lg rounded-xl hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            I WANT TO RECOVER MY HEARING NOW
            <FaArrowRight className="ml-2 w-5 h-5" />
          </a>

          <div className="mt-8 flex items-center justify-center space-x-4 text-sm opacity-90">
            <FaShieldAlt className="w-4 h-4" />
            <span>100% Secure Purchase</span>
            <span>•</span>
            <span>30-Day Guarantee</span>
            <span>•</span>
            <span>Fast Delivery</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-400 mb-4">
              © 2024 Quietum Plus. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm">
              This product is not intended to diagnose, treat, cure, or prevent any
              disease. Always consult a healthcare professional before starting any
              supplement.
            </p>
          </div>
        </div>
      </footer>

      {/* Cookies Popup */}
      <CookiesPopup redirectUrl="https://57890m8gokgrxf2izelsv55of0.hop.clickbank.net" />
    </div>
  );
}
