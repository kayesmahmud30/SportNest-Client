"use client";

import React from "react";
import Link from "next/link";

import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { authClient } from "@/lib/auth-client";

import { HiOutlineMail, HiOutlineLockClosed } from "react-icons/hi";
import { FaGoogle } from "react-icons/fa";
import { BsArrowRight, BsArrowRightShort } from "react-icons/bs";
import { RiShieldKeyholeLine } from "react-icons/ri";
import Image from "next/image";
import logo from "@/assets/logo.png";

const login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Email login
  const onSubmit = async (data) => {
    try {
      const { email, pass } = data;

      const result = await authClient.signIn.email({
        email,
        password: pass,
        callbackURL: "/",
      });

      console.log("EMAIL LOGIN:", result);

      if (result.data) {
        toast.success("Welcome Back!");
      }

      if (result.error) {
        toast.error(result.error.message);
      }
    } catch (err) {
      console.error("EMAIL LOGIN ERROR:", err);
      toast.error("Something went wrong");
    }
  };

  // Google login
  const handleGoogleSignIn = async () => {
    try {
      const result = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });

      console.log("GOOGLE LOGIN:", result);
    } catch (err) {
      console.error("GOOGLE LOGIN ERROR:", err);
      toast.error("Google sign in failed");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-theme p-4 md:p-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-cyan-950/20 via-[rgba(var(--color-surface-rgb),0.6)] to-transparent z-0" />

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f29370a_1px,transparent_1px),linear-gradient(to_bottom,#1f29370a_1px,transparent_1px)] bg-size-[4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] z-0" />

      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-125 h-125 rounded-full bg-cyan-500/10 blur-[160px] pointer-events-none animation-pulse" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-150 h-150 rounded-full bg-blue-600/10 blur-[180px] pointer-events-none" />

      <div className="relative w-full max-w-115 z-10 group/card">
        <div className="absolute -inset-px rounded-3xl bg-linear-to-r from-cyan-500 via-blue-500 to-emerald-500 opacity-20 blur-xl group-hover/card:opacity-40 group-hover/card:blur-2xl transition-all duration-700" />
        <div className="absolute -inset-px rounded-3xl bg-linear-to-r from-cyan-500/30 via-transparent to-blue-500/20 opacity-100" />

        <div className="relative bg-surface-80 backdrop-blur-xl rounded-3xl border border-theme soft-shadow px-6 py-10 sm:p-10 transition-all duration-500">
          <div className="text-center flex flex-col items-center justify-center mb-8">
            <Image
              src={logo}
              width={40}
              height={40}
              alt="logo"
              className="mb-3"
            />

            <h1 className="text-3xl font-black tracking-wider text-theme">
              Sport
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#7fcf9e] via-[#2aa472] to-[#146a44]">
                Nest
              </span>
            </h1>

            <p className="muted-text mt-2 text-xs font-semibold tracking-wide">
              Log in to your account
            </p>
          </div>

          {/* Form Element */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-2">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold ml-1">
                Email
              </label>

              <div className="relative group/input">
                <HiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 muted-text group-focus-within/input:text-primary text-xl transition-all duration-300" />

                <input
                  type="email"
                  placeholder="your@mail.com"
                  {...register("email", { required: true })}
                  className="w-full bg-surface-80 text-sm text-theme border border-theme rounded-full pl-12 pr-4 py-3.5 placeholder:muted-text outline-none transition-all duration-300"
                />
              </div>

              {errors.email && (
                <p className="text-red-400 text-xs font-medium mt-1 ml-1">
                  Email is required
                </p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between ml-1">
                <label className="block text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold">
                  Password
                </label>
              </div>

              <div className="relative group/input">
                <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 muted-text group-focus-within/input:text-primary text-xl transition-all duration-300" />

                <input
                  type="password"
                  placeholder="••••••••"
                  {...register("pass", {
                    required: "Password is required",

                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },

                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])/,
                      message:
                        "Must include at least one uppercase and one lowercase letter",
                    },
                  })}
                  className="w-full bg-surface-80 text-sm text-theme border border-theme rounded-full pl-12 pr-4 py-3.5 placeholder:muted-text outline-none transition-all duration-300"
                />
              </div>

              {errors.pass && (
                <p className="text-red-400 text-xs font-medium mt-1 ml-1">
                  Password is required
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full mt-2 btn-primary font-black tracking-[0.15em] py-3.5 rounded-full flex items-center justify-center gap-1 transition-all duration-300 transform active:scale-[0.99] group cursor-pointer text-xs"
            >
              <p className="text-white">Log In</p>

              <BsArrowRight className="text-white text-xl group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-theme" />
            </div>

            <div className="relative flex justify-center">
              <span className="bg-surface rounded-full border border-theme px-4 py-0.5 text-[9px] uppercase tracking-[0.25em] muted-text font-bold">
                Or
              </span>
            </div>
          </div>

          <button
            onClick={handleGoogleSignIn}
            className="w-full border-2 border-theme muted-surface muted-surface-hover rounded-full py-3.5 flex items-center justify-center gap-3 text-theme text-sm font-semibold transition-all duration-300 group cursor-pointer"
          >
            <FaGoogle className="group-hover:text-primary text-xs transition-colors duration-300" />
            Continue with Google
          </button>

          {/* Authentication Redirection Footer */}
          <p className="text-center muted-text text-xs mt-8">
            {`Don\'t have an account?`}{" "}
            <Link
              href="signup"
              className="text-primary font-black tracking-wide hover:opacity-90 hover:underline transition-all ml-1"
            >
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default login;
