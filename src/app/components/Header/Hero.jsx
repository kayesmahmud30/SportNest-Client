"use client";

import Image from "next/image";
import React from "react";
import Lottie from "lottie-react";
import { motion } from "framer-motion";
import hero from "../../../assets/Hero.png";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative w-full min-h-[calc(100vh-4rem)] overflow-hidden flex items-center justify-center bg-theme">
      <div className="absolute inset-0 z-0">
        <Image
          src={hero}
          alt="Hero Background"
          fill
          priority
          className="object-cover object-center scale-105 opacity-75"
        />

        <div className="absolute inset-0 overlay-theme"></div>

        <div className="absolute inset-0 overlay-gradient"></div>
      </div>

      <div className="relative z-20 container  mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center px-6 lg:px-12">
        <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase leading-tight text-theme"
          >
            Book perfect <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#7fcf9e] via-[#2aa472] to-[#146a44]">
              Spaces build
            </span>
            <br />
            for champion
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="text-gray-300 max-w-md mx-auto lg:mx-0"
          >
            Train harder and play smarter with SportNest - your ultimate
            destination for booking premium sports facilities and courts.
            Reserve top-tier venues for your next game.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Link
              href="all-facilities"
              className="inline-flex items-center justify-center px-8 py-3 h-12 rounded-full btn-primary font-bold transition duration-300 hover:scale-95 border-3 border-green-300"
            >
              <p className="text-white">Explore Facilities</p>
            </Link>
          </motion.div>
        </div>

        {/* <div className="lg:col-span-5 relative flex justify-center">
          <div
            className="relative w-[80%] aspect-4/3 rounded-2xl overflow-hidden  shadow-2xl transition-transform duration-500 ease-out hover:scale-[1.02] will-change-transform"
            style={{ transform: "rotate(-40deg)" }}
          >
            <div className="absolute inset-0  mix-blend-overlay"></div>
            <div className="absolute inset-0 backdrop-brightness-75 backdrop-contrast-125"></div>

            <div className="absolute inset-0 s pointer-events-none"></div>

            <div className="absolute bottom-[5%] right-[0%] md:right-[5%] w-80 z-10">
              <Lottie animationData={playerAnimation} loop />
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default Hero;
