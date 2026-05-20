"use client";

import React from "react";
import {
  FiActivity,
  FiTarget,
  FiTrendingUp,
  FiHeart,
  FiGlobe,
  FiAward,
} from "react-icons/fi";

const features = [
  {
    icon: <FiActivity />,
    title: "Boost Your Performance",
    desc: "Improve strength, stamina, and agility through consistent sports activities.",
  },
  {
    icon: <FiTarget />,
    title: "Sharpen Your Skills",
    desc: "Train with precision-focused practice sessions designed for real improvement.",
  },
  {
    icon: <FiTrendingUp />,
    title: "Level Up Faster",
    desc: "Track your progress and continuously push your limits with every game.",
  },
  {
    icon: <FiHeart />,
    title: "Healthy Lifestyle",
    desc: "Stay active, reduce stress, and build long-term physical and mental wellness.",
  },
  {
    icon: <FiGlobe />,
    title: "Play Anywhere",
    desc: "Discover and access sports facilities easily across multiple locations.",
  },
  {
    icon: <FiAward />,
    title: "Earn Recognition",
    desc: "Compete, improve, and stand out through achievements and performance.",
  },
];

const WhyChooseUs = () => {
  return (
    <div className="bg-theme text-theme px-6 pt-30 pb-50">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold">
          Why <span className="text-primary">SportNest</span>
        </h1>

        <p className="muted-text mt-4">
          A complete sports experience designed to help you train better, play
          smarter, and grow stronger every day.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((item, index) => (
          <div
            key={index}
            className="group bg-surface border border-theme rounded-2xl p-6 hover:border-theme transition-all duration-300 hover:scale-[1.03] soft-shadow"
          >
            <div className="text-3xl text-primary mb-4 group-hover:scale-110 transition-transform">
              {item.icon}
            </div>

            <h2 className="text-xl font-semibold mb-2">{item.title}</h2>

            <p className="muted-text text-sm leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyChooseUs;
