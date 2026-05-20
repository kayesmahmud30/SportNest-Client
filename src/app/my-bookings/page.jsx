import { auth } from "@/lib/auth";
import { Calendar, Tag } from "lucide-react";
import { headers } from "next/headers";
import Image from "next/image";
import React from "react";
import BookingButtons from "../components/my-booking/BookingButtons";
import { authClient } from "@/lib/auth-client";

const Mybookings = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  if (!user) {
    return (
      <div className="pt-40 text-center text-slate-400">
        Please login to view your bookings.
      </div>
    );
  }
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  console.log(token);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/bookings/${user.id}`,
    {
      cache: "no-store",
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  );

  const data = await res.json();

  return (
    <div className="bg-theme text-theme px-6 py-10">
      {/* HEADER */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight">
          My Facility Bookings
        </h1>
        <p className="text-slate-400 mt-2">
          Manage your sports reservations in one place
        </p>
      </div>

      {/* GRID LIST */}
      <div className="space-y-6 max-w-6xl mx-auto">
        {data?.map((booking) => (
          <div
            key={booking._id}
            className="
              flex flex-col md:flex-row
              bg-surface
              border border-theme
              rounded-3xl overflow-hidden
              shadow-xl
              transition-all duration-500
              hover:scale-[1.015]
              hover:border-theme
              hover:soft-shadow
              backdrop-blur-md
            "
          >
            {/* IMAGE */}
            <div className="relative w-full md:w-80 h-72">
              <Image
                fill
                src={booking.facility_img}
                alt={booking.facility_name}
                className="object-cover transition-transform duration-700 hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>

            {/* DETAILS */}
            <div className="flex-1 p-7 flex flex-col justify-between">
              <div>
                {/* STATUS */}
                <span
                  className="
                  inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold
                  bg-[rgba(var(--green-600),0.08)] text-primary
                  border border-[rgba(var(--green-600),0.12)]
                "
                >
                  <span className="w-2 h-2 mr-2 rounded-full bg-[rgb(var(--color-primary-rgb))] animate-pulse"></span>
                  {booking.status}
                </span>

                {/* TITLE */}
                <h3 className="text-3xl font-bold mt-4 mb-5 tracking-tight">
                  {booking.facility_name}
                </h3>

                {/* INFO GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2 muted-text">
                    <Calendar className="w-4 h-4 muted-text" />
                    <span className="muted-text">Date:</span>
                    <span className="text-theme">
                      {new Date(booking.booking_date).toLocaleDateString(
                        "en-US",
                        { month: "short", day: "numeric", year: "numeric" },
                      )}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 muted-text">
                    <Tag className="w-4 h-4 muted-text" />
                    <span className="muted-text">Slot:</span>
                    <span className="text-theme">{booking.time_slot}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="muted-text">Hours:</span>
                    <span className="text-theme font-medium">
                      {booking.hours} hr
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="muted-text">Total:</span>
                    <span className="text-primary font-bold text-lg">
                      ${booking.total_price}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 col-span-full">
                    <span className="muted-text">ID:</span>
                    <span className="muted-text font-mono text-xs">
                      #{booking._id.slice(-8)}
                    </span>
                  </div>
                </div>
              </div>

              {/* ACTION */}
              <div className="mt-6">
                <BookingButtons booking={booking} />
              </div>
            </div>
          </div>
        ))}

        {/* EMPTY */}
        {data?.length === 0 && (
          <div className="text-center py-24 bg-surface border border-theme rounded-3xl">
            <p className="muted-text text-lg">No bookings found yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Mybookings;
