"use client";
import Link from "next/link";
import React from "react";

const notfound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate text-white font-sans select-none overflow-hidden relative px-4">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-red-500/10 blur-[180px] rounded-full pointer-events-none" />

      <div className="relative flex flex-col items-center z-10 text-center max-w-md">
        <h1 className="text-9xl font-black italic tracking-tighter text-slate uppercase select-none opacity-40">
          404
        </h1>

        {/*   
        <div className="relative mb-6">
       
        
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-600 text-white font-black uppercase italic px-4 py-1 text-sm tracking-widest rounded skew-x-12 shadow-lg border border-red-400 animate-pulse">
            Out of Bounds
          </div> 
        </div> */}

        <div className="space-y-3">
          <h2 className="text-3xl font-black">
            Oops! Not Found
          </h2>
          <p className={newFunction()}>
            The page you are looking for has been benched, traded, or never made
            the roster. Let&lsquo;s get you back in the game.
          </p>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-linear-to-r from-lime-400 to-emerald-500 text-slate-950 font-black tracking-wider rounded-full text-sm hover:from-lime-300 hover:to-emerald-400 transition-all duration-200 shadow-[0_4px_20px_rgba(163,230,53,0.3)] hover:scale-105 active:scale-95 text-center"
          >
            Go to Home
          </Link>

          <button
            onClick={() => {
              if (typeof window !== "undefined") window.history.back();
            }}
            className="px-6 py-3 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 font-bold tracking-wider rounded-full text-sm transition-all duration-200 hover:text-white text-center"
          >
            Go Back
          </button>
        </div>
      </div>

      <div className="absolute bottom-0 inset-x-0 h-32 bg-[linear-gradient(to_bottom,transparent,rgba(16,185,129,0.05))] pointer-events-none flex items-end justify-center">
        <div className="w-full max-w-4xl h-[1px] bg-slate-800 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 border border-slate-800/40 rounded-full -translate-y-1/2" />
        </div>
      </div>
    </div>
  );

  function newFunction() {
    return "text-slate-400 font-medium text-sm leading-relaxed";
  }
};

export default notfound;
