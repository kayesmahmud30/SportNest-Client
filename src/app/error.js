"use client";
import Link from "next/link";
import React from "react";

const error = ({ error, reset }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0B2321] text-white font-sans select-none overflow-hidden relative px-4">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 blur-[180px] rounded-full pointer-events-none" />

      <div className="relative flex flex-col items-center z-10 text-center max-w-md">
        {/* Sporty Error Messaging */}
        <div className="space-y-3">
          <h1 className="text-4xl font-black tracking-tight bg-linear-to-r from-white via-slate-100 to-amber-400 bg-clip-text text-transparent">
            <span className="text-red-500">Oops!</span>
            <br />
            Something went wrong.
          </h1>

          <h2 className="text-lg text-slate-300">Please try again later.</h2>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full justify-center">
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-linear-to-r from-lime-400 to-emerald-500 text-slate-950 font-black tracking-wider rounded-full text-sm hover:from-lime-300 hover:to-emerald-400 transition-all duration-200 shadow-[0_4px_20px_rgba(163,230,53,0.3)] hover:scale-105 active:scale-95 text-center cursor-pointer"
          >
            Try Again
          </button>

          <Link
            href="/"
            className="px-6 py-3 bg-slate-900 border-2 border-green-600 hover:bg-slate-800 text-slate-300 tracking-wider rounded-full
             text-sm transition-all duration-200 hover:text-white text-center"
          >
            Go to Home
          </Link>
        </div>
      </div>

      <div className="absolute top-0 inset-x-0 h-full opacity-[0.02] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
    </div>
  );
};

export default error;
