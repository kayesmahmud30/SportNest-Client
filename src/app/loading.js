"use client";
import React from "react";

const loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate text-white font-sans ">
      <span className="loading loading-spinner text-success w-25 mb-12"></span>

      <div className="text-center mb-20 space-y-1">
        <h2 className="text-3xl font-black tracking-tighter  bg-linear-to-r from-white via-slate-200 to-lime-400 bg-clip-text text-transparent drop-shadow-sm">
          Loading...
        </h2>

        <p className="text-[10px] font-bold tracking-[0.3em] text-emerald-400">
          Please wait...
        </p>
      </div>
    </div>
  );
};

export default loading;
