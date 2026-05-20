"use client";

import React from "react";
// Importing specific icons from React Icons library
import { HiOutlineMail, HiOutlineUser, HiOutlineLink } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaGoogle } from "react-icons/fa";
import { BsArrowRight, BsArrowRightShort } from "react-icons/bs";
import Link from "next/link";

import { authClient } from "@/lib/auth-client";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "@/assets/logo.png";

const Signup = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { name, email, password, img } = data;

    const { data: res, error } = await authClient.signUp.email({
      email: email,
      password: password,
      name: name,
      image: img,
      callbackURL: "/login",
    });

    if (res) {
      await authClient.signOut();
      toast.success("Signup Successfully!");
      router.push("/login");
    } else if (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-theme p-4 md:p-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-cyan-950/20 via-[rgba(var(--color-surface-rgb),0.6)] to-transparent z-0" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f29370a_1px,transparent_1px),linear-gradient(to_bottom,#1f29370a_1px,transparent_1px)] bg-size-[4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] z-0" />
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-125 h-125 rounded-full bg-cyan-500/10 blur-[160px] pointer-events-none" />
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

            <p className="muted-text mt-2 text-xs font-semibold tracking-wide ">
              Create your account
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold ml-1">
                Full Name
              </label>
              <div className="relative group/input">
                <HiOutlineUser className="absolute left-4 top-1/2 -translate-y-1/2 muted-text group-focus-within/input:text-primary text-xl transition-all duration-300" />
                <input
                  type="text"
                  placeholder="John Doe"
                  {...register("name", { required: true })}
                  className="w-full bg-surface-80 text-sm text-theme border border-theme rounded-xl pl-12 pr-4 py-3.5 placeholder:muted-text outline-none transition-all duration-300"
                />
              </div>
              {errors.name && (
                <p className="text-red-400 text-[11px] font-medium mt-1 ml-1">
                  Name is required
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold ml-1">
                Email
              </label>
              <div className="relative group/input">
                <HiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 muted-text group-focus-within/input:text-primary text-xl transition-all duration-300" />
                <input
                  type="email"
                  placeholder="your@mail.com"
                  {...register("email", { required: true })}
                  className="w-full bg-surface-80 text-sm text-theme border border-theme rounded-xl pl-12 pr-4 py-3.5 placeholder:muted-text outline-none transition-all duration-300"
                />
              </div>
              {errors.email && (
                <p className="text-red-400 text-[11px] font-medium mt-1 ml-1">
                  Email is required
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold ml-1">
                Password
              </label>
              <div className="relative group/input">
                <RiLockPasswordLine className="absolute left-4 top-1/2 -translate-y-1/2 muted-text group-focus-within/input:text-primary text-xl transition-all duration-300" />
                <input
                  type="password"
                  placeholder="••••••••"
                  {...register("password", {
                    required: "Password is required",

                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },

                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])/,
                      message:
                        "Password must contain at least one uppercase and one lowercase letter",
                    },
                  })}
                  className="w-full bg-surface-80 text-sm text-theme border border-theme rounded-xl pl-12 pr-4 py-3.5 placeholder:muted-text outline-none transition-all duration-300"
                />
              </div>
              {errors.password && (
                <p className="text-red-400 text-[11px] font-medium mt-1 ml-1">
                  Password required
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold ml-1">
                Profile Image URL
              </label>
              <div className="relative group/input">
                <HiOutlineLink className="absolute left-4 top-1/2 -translate-y-1/2 muted-text group-focus-within/input:text-primary text-xl transition-all duration-300" />
                <input
                  type="url"
                  placeholder="https://images.com/avatar.jpg"
                  {...register("img", { required: false })}
                  className="w-full bg-surface-80 text-sm text-theme border border-theme rounded-xl pl-12 pr-4 py-3.5 placeholder:muted-text outline-none transition-all duration-300"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 btn-primary font-black tracking-[0.15em] rounded-full flex items-center justify-center gap-1 transition-all duration-300 transform active:scale-[0.99] group cursor-pointer text-xs"
            >
              <p className="text-white">Create Account</p>
              <BsArrowRight className="text-xl group-hover:translate-x-1 transition-transform duration-300 text-white" />
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-theme" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-surface rounded-full border border-theme px-4 py-0.5 text-[9px] uppercase tracking-[0.25em] muted-text font-bold">
                Or{" "}
              </span>
            </div>
          </div>

          <button
            onClick={handleGoogleSignIn}
            className="w-full border-2 border-theme muted-surface muted-surface-hover rounded-full py-3.5 flex items-center justify-center gap-3 text-theme text-sm font-semibold transition-all duration-300 group cursor-pointer"
          >
            <FaGoogle className="group-hover:text-primary text-xs transition-colors duration-300" />
            Sign in with Google
          </button>

          <p className="text-center muted-text text-xs mt-8">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-primary font-black tracking-wide hover:opacity-90 hover:underline transition-all ml-1"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
