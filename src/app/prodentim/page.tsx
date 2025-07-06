import React from 'react';
import type { Metadata } from 'next';
import { FaCheckCircle, FaStar, FaShieldAlt, FaTruck, FaClock } from 'react-icons/fa';
import CookiesPopup from '../../components/CookiesPopup';

export const metadata: Metadata = {
  title:
    'ProDentim - Revolutionary Probiotics for Oral Health | 3.5 Billion Good Bacteria',
  description:
    'Discover ProDentim: the only formula with 3.5 billion probiotics specifically developed for the health of your teeth and gums. Based on 2022 scientific research.',
  keywords:
    'ProDentim, probiotics, oral health, dental health, good bacteria, gums, teeth',
  openGraph: {
    title: 'ProDentim - Revolutionary Probiotics for Oral Health',
    description: '3.5 billion probiotics for healthy teeth and gums',
    type: 'website',
  },
};

export default function ProDentimPage() {
  return (
    <div className="min-h-screen bg-white">
      <CookiesPopup />

      {/* Header */}
      <header className="bg-white shadow-lg border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-green-700 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">P</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-800">ProDentim</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1 text-yellow-500">
                <FaStar className="w-5 h-5 fill-current" />
                <FaStar className="w-5 h-5 fill-current" />
                <FaStar className="w-5 h-5 fill-current" />
                <FaStar className="w-5 h-5 fill-current" />
                <FaStar className="w-5 h-5 fill-current" />
                <span className="text-gray-600 ml-2">4.9/5</span>
              </div>
              <span className="text-sm text-gray-500">95,000+ Reviews</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <span className="inline-block bg-gradient-to-r from-green-600 to-green-700 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  🔬 Scientific Discovery of 2022
                </span>
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-700">
                    ProDentim
                  </span>
                  <br />
                  Revolutionary Probiotics
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  <strong>3.5 billion probiotics</strong> specifically developed for the
                  health of your teeth and gums. Based on scientific research that
                  revolutionized modern dentistry.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  🧬 Revolutionary Discovery
                </h3>
                <p className="text-gray-600">
                  <strong>Research published in Springer Nature</strong> revealed that
                  people with healthy teeth have a high population of good bacteria in
                  their mouths.
                  <br />
                  <br />
                  <em>Tip: No toothpaste or mouthwash involved!</em>
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-2 text-green-600">
                  <FaCheckCircle className="w-5 h-5" />
                  <span className="font-semibold">Natural Formula</span>
                </div>
                <div className="flex items-center space-x-2 text-green-600">
                  <FaCheckCircle className="w-5 h-5" />
                  <span className="font-semibold">No Side Effects</span>
                </div>
                <div className="flex items-center space-x-2 text-green-600">
                  <FaCheckCircle className="w-5 h-5" />
                  <span className="font-semibold">60-Day Guarantee</span>
                </div>
              </div>
            </div>

            <div className="relative flex justify-center items-center">
              {/* Product Image */}
              <img
                src="/image.png"
                alt="ProDentim Bottle"
                className="w-full max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg drop-shadow-2xl rounded-3xl border border-green-100 bg-white z-0"
                style={{ zIndex: 1 }}
              />
              {/* Floating elements - moved after image for stacking */}
              <div className="absolute -top-4 -right-4 bg-yellow-400 text-yellow-900 px-4 py-2 rounded-full font-bold text-sm z-10">
                NEW!
              </div>
              <div className="absolute -bottom-4 -left-4 bg-green-500 text-white px-4 py-2 rounded-full font-bold text-sm z-10">
                CLINICALLY TESTED
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">
            Why Do Teeth Deteriorate?
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-red-50 rounded-2xl p-8 border border-red-100">
              <h3 className="text-2xl font-bold text-red-600 mb-4">❌ The Problem</h3>
              <p className="text-gray-700">
                Common dental products (toothpaste and mouthwash) contain toxic
                ingredients that destroy the mouth&apos;s microbiome. This explains why
                teeth can survive for hundreds of years outside the mouth (in fossils),
                but deteriorate with something as simple as chocolate.
              </p>
            </div>
            <div className="bg-green-50 rounded-2xl p-8 border border-green-100">
              <h3 className="text-2xl font-bold text-green-600 mb-4">✅ The Solution</h3>
              <p className="text-gray-700">
                ProDentim repopulates your mouth with good bacteria and provides a healthy
                environment for these strains to grow. It is the only formula in the world
                with 3.5 billion probiotics specifically developed for oral health.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ingredients Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Inside Every ProDentim
            </h2>
            <p className="text-xl text-gray-600">
              <strong>3.5 billion probiotics</strong> along with{' '}
              <strong>3 unique ingredients</strong> clinically proven to support the
              health of your teeth and gums
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <span className="text-2xl">🦠</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Lactobacillus Paracasei
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start space-x-2">
                  <FaCheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Supports gum health</span>
                </li>
                <li className="flex items-start space-x-2">
                  <FaCheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Helps keep sinuses free and open</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <span className="text-2xl">🦠</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">B.lactis BL-04®</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start space-x-2">
                  <FaCheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Supports the balance of mouth bacteria</span>
                </li>
                <li className="flex items-start space-x-2">
                  <FaCheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Supports the respiratory tract</span>
                </li>
                <li className="flex items-start space-x-2">
                  <FaCheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Maintains a healthy immune system</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <span className="text-2xl">🦠</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Lactobacillus Reuteri
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start space-x-2">
                  <FaCheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Helps with inflammation</span>
                </li>
                <li className="flex items-start space-x-2">
                  <FaCheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Supports a healthy oral environment</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              🌿 Proprietary Blend of 4 Plants and Minerals
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Inulin</h4>
                    <p className="text-gray-600">Supports good bacteria</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Malic Acid</h4>
                    <p className="text-gray-600">Helps maintain teeth whitening</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Tricalcium Phosphate</h4>
                    <p className="text-gray-600">Supports dental health</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">4</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Mint</h4>
                    <p className="text-gray-600">Natural anti-inflammatory</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">ProDentim Benefits</h2>
            <p className="text-xl text-gray-600">
              Why thousands of people choose ProDentim for their oral health
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: '🌿',
                title: 'Natural Formula',
                desc: '100% natural and safe ingredients',
              },
              {
                icon: '⚡',
                title: 'Easy to Use',
                desc: 'Just chew one tablet a day',
              },
              {
                icon: '🧬',
                title: 'Non-GMO',
                desc: 'No genetically modified organisms',
              },
              {
                icon: '🚫',
                title: 'Stimulant-Free',
                desc: 'Does not cause dependence or side effects',
              },
              {
                icon: '🔒',
                title: 'Non-Habit Forming',
                desc: 'Safe for long-term use',
              },
              {
                icon: '🌾',
                title: 'Gluten-Free',
                desc: 'Suitable for people with gluten sensitivity',
              },
            ].map((benefit, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 text-center border border-green-100"
              >
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 text-sm">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Real Users. Real Results.
            </h2>
            <p className="text-xl text-gray-600">
              See what our customers are saying about ProDentim
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sam Perkin',
                location: 'Dallas, USA',
                text: "I have always taken great care of my teeth, but always felt I wasn't doing enough. Now, for the first time in decades, my teeth feel amazing.",
                rating: 5,
              },
              {
                name: 'Portia Thompson',
                location: 'Florida, USA',
                text: "It's simply unbelievable how much I like ProDentim. I'm so happy my dentist recommended it!",
                rating: 5,
              },
              {
                name: 'Theo Franklin',
                location: 'Chicago, USA',
                text: "My gums have never looked better. It's so good not to have to worry about my teeth. I just love it!",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                  </div>
                  <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                    Verified Purchase
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Package</h2>
            <p className="text-xl text-gray-600">
              Order <strong>6 Bottles</strong> and get <strong>2 FREE Bonuses!</strong>
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* 1 Bottle */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 relative border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">1 Bottle</h3>
              <div className="text-4xl font-bold text-gray-900 mb-2">
                $<span className="text-3xl">69</span>
              </div>
              <p className="text-gray-600 mb-6">30 days supply</p>
              <button className="w-full bg-gray-500 text-white py-3 px-6 rounded-xl font-semibold hover:bg-gray-600 transition-colors">
                Buy Now
              </button>
            </div>

            {/* 6 Bottles - Recommended */}
            <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-2xl p-8 relative transform scale-105">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-yellow-900 px-4 py-2 rounded-full font-bold text-sm">
                MOST POPULAR
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">6 Bottles</h3>
              <div className="text-4xl font-bold text-white mb-2">
                $<span className="text-3xl">294</span>
              </div>
              <p className="text-green-100 mb-6">180 days supply</p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-2 text-white">
                  <FaCheckCircle className="w-5 h-5" />
                  <span>FREE Shipping</span>
                </div>
                <div className="flex items-center space-x-2 text-white">
                  <FaCheckCircle className="w-5 h-5" />
                  <span>2 FREE Bonuses</span>
                </div>
                <div className="flex items-center space-x-2 text-white">
                  <FaCheckCircle className="w-5 h-5" />
                  <span>97% of customers choose</span>
                </div>
              </div>
              <button className="w-full bg-white text-green-600 py-3 px-6 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
                Buy Now
              </button>
            </div>

            {/* 3 Bottles */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 relative border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">3 Bottles</h3>
              <div className="text-4xl font-bold text-gray-900 mb-2">
                $<span className="text-3xl">177</span>
              </div>
              <p className="text-gray-600 mb-6">90 days supply</p>
              <button className="w-full bg-gray-500 text-white py-3 px-6 rounded-xl font-semibold hover:bg-gray-600 transition-colors">
                Buy Now
              </button>
            </div>
          </div>

          {/* Bonuses */}
          <div className="mt-12 grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-100">
              <h3 className="text-2xl font-bold text-green-700 mb-4">
                🎁 Bonus #1 - Bad Breath Gone. One Day Detox
              </h3>
              <p className="text-gray-600 mb-4">
                <span className="line-through text-gray-400">RRP - $109</span> Today:{' '}
                <strong className="text-green-600">FREE</strong>
              </p>
              <p className="text-gray-600">
                Start your ProDentim journey and enjoy naturally fresh breath with 7
                unexpected spice and herb blends from your kitchen that can work wonders.
              </p>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-100">
              <h3 className="text-2xl font-bold text-green-700 mb-4">
                🎁 Bonus #2 - Hollywood White Teeth at Home
              </h3>
              <p className="text-gray-600 mb-4">
                <span className="line-through text-gray-400">RRP - $109</span> Today:{' '}
                <strong className="text-green-600">FREE</strong>
              </p>
              <p className="text-gray-600">
                Discover everything about the simple 10-second &ldquo;Bright Teeth&rdquo;
                method you can do now. You will also discover a little-known brushing
                trick that is very popular among celebrities and much more!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="bg-white rounded-3xl p-12 shadow-2xl border border-gray-100">
            <div className="w-20 h-20 bg-green-500 rounded-full mx-auto mb-8 flex items-center justify-center">
              <FaShieldAlt className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              100% Satisfaction Guaranteed
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              <strong>60-day money-back guarantee</strong>
            </p>
            <p className="text-gray-600 leading-relaxed">
              Your order today is covered by our 60-day money-back guarantee. If you are
              not impressed by the transformation of your gums and teeth or do not admire
              your Hollywood star smile, then at any time in the next 60 days write to us
              and we will refund every penny.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-6">
            {[
              {
                question: 'How and why does ProDentim work?',
                answer:
                  'ProDentim works by repopulating your mouth with good bacteria and providing a healthy environment for these strains to grow. It is a doctor-formulated blend that brings together 3 scientifically proven and potent strains, combining a total of 3.5 billion good bacteria in a revolutionary dissolvable candy.',
              },
              {
                question: 'Are there any side effects?',
                answer:
                  'ProDentim was developed for all ages and medical conditions. All ingredients have generally been considered safe and are constantly tested for purity. ProDentim is manufactured in an FDA-approved facility, under sterile, strict, and precise standards.',
              },
              {
                question: 'When and how should I take ProDentim?',
                answer:
                  'We recommend slowly chewing one tablet every morning to support the health of your whole body, gums, and teeth.',
              },
              {
                question: 'Can you tell me about the guarantee again?',
                answer:
                  'Each bottle of ProDentim comes with a 60-day money-back guarantee. If, for any reason, you are not completely satisfied with the results, you can simply return what you have not used for a full refund, no questions asked.',
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl p-6 border border-gray-100"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-green-600 to-green-700">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Transform Your Oral Health Today
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Join over 95,000 people who have already experienced the benefits of ProDentim
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-white text-green-600 py-4 px-8 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors">
              Buy ProDentim Now
            </button>
            <div className="flex items-center space-x-4 text-white">
              <div className="flex items-center space-x-1">
                <FaTruck className="w-5 h-5" />
                <span>Free Shipping</span>
              </div>
              <div className="flex items-center space-x-1">
                <FaClock className="w-5 h-5" />
                <span>Delivery 5-7 days</span>
              </div>
              <div className="flex items-center space-x-1">
                <FaShieldAlt className="w-5 h-5" />
                <span>60-day guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">ProDentim</h3>
              <p className="text-gray-400">
                The revolution in oral health with 3.5 billion probiotics.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Ingredients</li>
                <li>How It Works</li>
                <li>Results</li>
                <li>FAQ</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Contact</li>
                <li>Return Policy</li>
                <li>Privacy Policy</li>
                <li>Terms of Use</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Reviews</h4>
              <div className="flex items-center space-x-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-400 text-sm">Based on 95,000+ reviews</p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>
              © 2024 ProDentim. All rights reserved. The statements on this site have not
              been evaluated by the FDA. This product is not intended to diagnose, treat,
              cure, or prevent any disease.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
