"use client";

import Image from "next/image";
import React, { useState } from "react";
import Marquee from "react-fast-marquee";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

const FacilityDetailsCard = ({ data }) => {
  const router = useRouter();
  const {
    _id,
    facilityName,
    facilityType,
    imageUrl,
    location,
    pricePerHour,
    capacity,
    availableTimeSlots,
    description,
    ownerEmail,
  } = data;

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const slots = [
    "07:00 AM",
    "09:00 AM",
    "11:00 AM",
    "01:00 PM",
    "04:00 PM",
    "06:00 PM",
  ];

  const [bookingDate, setBookingDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [hours, setHours] = useState(1);

  const totalPrice = Number(pricePerHour) * hours;

  const handleBookingSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please login first");
      return;
    }
    if (!selectedSlot) {
      toast.error("Please select a time slot");
      return;
    }
    if (!bookingDate) {
      toast.error("Please select Date");
      return;
    }

    const bookingData = {
      user_name: user?.name,
      user_image: user?.image,
      user_id: user?.id,
      user_email: user?.email,
      facility_id: _id,
      facility_name: facilityName,
      facility_img: imageUrl,

      booking_date: bookingDate,
      time_slot: selectedSlot,
      hours,
      total_price: totalPrice,
      status: "pending",
    };

    try {
      const { data: tokenData } = await authClient.token();
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/bookings`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${tokenData?.token}`,
          },
          body: JSON.stringify(bookingData),
        },
      );

      const result = await res.json();

      if (result?.acknowledged) {
        toast.success("Booking successful!");
        router.push("/my-bookings");
      } else {
        toast.error("Booking failed!");
      }
    } catch (error) {
      toast.error("Server error! Try again.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 my-6 bg-surface text-theme rounded-2xl border border-theme shadow-2xl">
      {/* HEADER */}
      <div className="mb-6">
        <p className="text-sm text-primary font-medium">{facilityType}</p>

        <h1 className="text-3xl font-extrabold mt-1">{facilityName}</h1>

        <p className="text-sm muted-text mt-2">{location}</p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* IMAGE */}
        <div>
          <div className="relative h-64 rounded-xl overflow-hidden bg-surface border border-theme">
            {imageUrl && (
              <Image
                src={imageUrl}
                alt={facilityName}
                fill
                className="object-cover"
              />
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="bg-surface p-4 rounded-xl border border-theme">
              <p className="text-xs muted-text uppercase">Price</p>
              <h3 className="text-xl font-bold">${pricePerHour}/hr</h3>
            </div>

            <div className="bg-surface p-4 rounded-xl border border-theme">
              <p className="text-xs muted-text uppercase">Capacity</p>
              <h3 className="text-xl font-bold">{capacity}</h3>
            </div>
          </div>
        </div>

        {/* DETAILS */}
        <div className="flex flex-col gap-4">
          <div className="bg-surface p-4 rounded-xl border border-theme">
            <h3 className="text-sm font-semibold mb-2">Description</h3>
            <p className="text-sm muted-text">{description}</p>
          </div>

          <div className="bg-surface p-4 rounded-xl border border-theme">
            <h3 className="text-sm font-semibold mb-2">Available Time</h3>
            <p className="text-sm muted-text">{availableTimeSlots}</p>
          </div>

          <div className="bg-surface p-4 rounded-xl border border-theme">
            <p className="text-xs muted-text uppercase">Owner</p>
            <p className="text-sm muted-text">{ownerEmail}</p>
          </div>
        </div>

        {/* BOOKING */}
        <div>
          <form
            onSubmit={handleBookingSubmit}
            className="bg-surface p-5 rounded-xl border border-theme"
          >
            <h2 className="text-xl font-bold mb-5">Booking</h2>

            {/* DATE */}
            <input
              type="date"
              value={bookingDate}
              onChange={(e) => setBookingDate(e.target.value)}
              className="w-full bg-surface border border-theme rounded-lg px-3 py-2 mb-4"
            />

            {/* SLOTS */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              {slots.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setSelectedSlot(slot)}
                  className={`py-2 rounded-lg border text-xs ${
                    selectedSlot === slot
                      ? "bg-[rgb(var(--color-primary-rgb))] text-[#052218]"
                      : "border-theme muted-text"
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>

            {/* HOURS */}
            <div className="flex items-center justify-between bg-surface border border-theme rounded-lg p-2 mb-4">
              <button
                type="button"
                onClick={() => setHours((p) => Math.max(1, p - 1))}
                className="px-3 py-1 bg-surface-80 rounded"
              >
                -
              </button>

              <span>{hours} Hour</span>

              <button
                type="button"
                onClick={() => setHours((p) => p + 1)}
                className="px-3 py-1 bg-surface-80 rounded"
              >
                +
              </button>
            </div>

            {/* TOTAL */}
            <div className="mb-4 text-sm">
              <div className="flex justify-between text-slate-400">
                <span>Price per hour</span>
                <span>${pricePerHour}</span>
              </div>

              <div className="flex justify-between mt-2 font-bold text-lg">
                <span>Total</span>
                <span className="text-primary">${totalPrice}</span>
              </div>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="w-full cursor-pointer btn-primary font-bold py-3 rounded-full active:scale-[0.98] transition "
            >
              <p className="text-white">Confirm Booking</p>
            </button>
          </form>
        </div>
      </div>

    </div>
  );
};

export default FacilityDetailsCard;
