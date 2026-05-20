import React from "react";
import { FiBookmark, FiClock, FiMail, FiPhone } from "react-icons/fi";
import { IoLocationSharp } from "react-icons/io5";
import { SiInstagram, SiX, SiYoutube } from "react-icons/si";
import logo from "@/assets/logo.png";
import Image from "next/image";

const Foot = () => {
  return (
    <footer className="relative bg-surface border-t border-theme text-theme">
      <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-[#7fcf9e] to-[#146a44]" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 p-10 pt-14">
        <div className="lg:col-span-2 space-y-5">
          <div className="flex items-center gap-2">
            <Image src={logo} width={40} height={40} alt="logo" />
            <span className="text-xl font-black tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-[#7fcf9e] to-[#146a44]">
              SportNest
            </span>
          </div>

          <p className="text-sm muted-text max-w-sm leading-relaxed">
            Book top sports courts, facilities, and training arenas in seconds.
            Find your spot, reserve it, and start playing.
          </p>

          <div className="space-y-2">
            <span className="text-xs font-bold tracking-wider text-neutral-content/50 block">
              Social Links
            </span>
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-surface flex items-center justify-center text-theme hover:bg-[rgba(var(--color-primary-rgb),0.08)] hover:text-primary transition-all duration-300 shadow-sm transform hover:-translate-y-0.5"
                aria-label="Instagram"
              >
                <SiInstagram className="text-base" />
              </a>

              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-surface flex items-center justify-center text-theme hover:bg-[rgba(var(--color-primary-rgb),0.08)] hover:text-primary transition-all duration-300 shadow-sm transform hover:-translate-y-0.5"
                aria-label="Twitter"
              >
                <SiX className="text-base" />
              </a>

              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-surface flex items-center justify-center text-theme hover:bg-[rgb(var(--color-primary-rgb))] hover:text-white transition-all duration-300 shadow-sm transform hover:-translate-y-0.5"
                aria-label="YouTube"
              >
                <SiYoutube className="text-base" />
              </a>
            </div>
          </div>
        </div>

        <div>
          <h6 className="footer-title text-sm font-bold tracking-widest text-theme opacity-90 mb-4 capitalize">
            Contact Information
          </h6>
          <div className="flex flex-col gap-3 text-xs text-neutral-content/80">
            <p className="flex items-start gap-2">
              <span className="text-primary text-sm">
                {" "}
                <FiMail></FiMail>
              </span>
              <span>support@sportnest.com</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-primary text-sm">
                <FiPhone></FiPhone>
              </span>
              <span>+1 (123) 456-7890</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-primary text-sm">
                <IoLocationSharp />
              </span>
              <span className="line-clamp-2">
                345 Sports Ave, Suite 100, Cityville, ST 12345
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-theme bg-[rgba(var(--color-bg-rgb),0.08)] backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs muted-text">
          <div>
            © {new Date().getFullYear()} SportNest. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Foot;
