"use client";

import { authClient } from "@/lib/auth-client";
import { AlertDialog, Button } from "@heroui/react";
import { EyeIcon, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { FaTriangleExclamation } from "react-icons/fa6";
import { toast } from "react-toastify";

const BookingButtons = ({ booking }) => {
  const route = useRouter();

  const handlebooking_del = async () => {
    const { data: tokenData } = await authClient.token();

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/bookings/${booking._id}`,
        {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${tokenData?.token}`,
          },
        },
      );

      if (res.ok) {
        route.refresh();
        toast.success(`${booking.facility_name} is successfully removed`);
      }
    } catch (error) {
      console.error("Error canceling booking:", error);
    }
  };

  return (
    <div className="mt-6 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-3 w-full sm:w-auto">
        {/* Delete Modal */}
        <AlertDialog>
          {/* Trigger */}
          <Button
            variant="light"
            className="group relative overflow-hidden border border-red-500/20 bg-red-500/5 backdrop-blur-xl hover:bg-red-500/10 text-red-400 rounded-2xl px-5 py-2.5 h-auto min-w-0 shadow-lg shadow-red-500/5 transition-all duration-300 hover:scale-[0.97]"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-red-500/0 via-red-500/10 to-red-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative flex items-center gap-2 font-medium">
              <Trash2 size={16} />
              Cancel
            </div>
          </Button>

          {/* Modal */}
          <AlertDialog.Backdrop className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md px-4">
            <AlertDialog.Container>
              <AlertDialog.Dialog className="w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-2xl shadow-black/40 text-white">
                {/* Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-transparent to-cyan-500/10 pointer-events-none" />

                <div className="relative p-7">
                  <AlertDialog.Header className="text-center">
                    <div className="mx-auto flex items-center justify-center w-18 h-18 rounded-full bg-red-500/10 border border-red-500/20 backdrop-blur-xl">
                      <FaTriangleExclamation className="text-red-500 text-4xl" />
                    </div>

                    <AlertDialog.Heading className="text-2xl font-bold mt-5">
                      Cancel Booking?
                    </AlertDialog.Heading>
                  </AlertDialog.Header>

                  <AlertDialog.Body className="text-center mt-3 text-slate-300 text-sm leading-relaxed">
                    This action cannot be undone. Your reserved slot will be
                    removed permanently.
                  </AlertDialog.Body>

                  <div className="mt-5 text-center">
                    <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white backdrop-blur-lg">
                      {booking.des_name || booking.facility_name}
                    </div>
                  </div>

                  <AlertDialog.Footer className="flex flex-col gap-3 mt-8">
                    <Button
                      color="danger"
                      onPress={handlebooking_del}
                      className="h-12 rounded-full border border-red-500/20 bg-red-500/10 backdrop-blur-xl text-red-400 font-semibold hover:bg-red-500 hover:text-white transition-all duration-300 hover:scale-[0.98] shadow-lg shadow-red-500/10"
                    >
                      Yes, Cancel Booking
                    </Button>

                    <Button
                      variant="light"
                      slot="close"
                      className="h-12 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl text-white font-medium hover:bg-white/10 transition-all duration-300 hover:scale-[0.98]"
                    >
                      Keep Booking
                    </Button>
                  </AlertDialog.Footer>
                </div>
              </AlertDialog.Dialog>
            </AlertDialog.Container>
          </AlertDialog.Backdrop>
        </AlertDialog>

        {/* View Button */}
        <Link
          href={`/all-facilities/${booking.facility_id}`}
          className="group relative overflow-hidden flex items-center justify-center gap-2 px-6 py-2.5 rounded-2xl border border-cyan-400/20 bg-cyan-500/10 backdrop-blur-xl text-cyan-300 font-semibold shadow-lg shadow-cyan-500/10 hover:bg-cyan-500 hover:text-white transition-all duration-300 hover:scale-[0.97]"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-400/10 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative flex items-center gap-2">
            <EyeIcon size={16} />
            View
          </div>
        </Link>
      </div>
    </div>
  );
};

export default BookingButtons;
