"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { Button } from "@heroui/react";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

import { MapPin, Users } from "lucide-react";
import Manage_button from "../components/manage-facility/Manage_button";

const MyFacilities = () => {
  const { data: session, isPending } = authClient.useSession();
  const [facilities, setFacilities] = useState([]);

  useEffect(() => {
    const email = session?.user?.email;

    if (isPending || !email) return;

    const fetchFacilities = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/facility?ownerEmail=${encodeURIComponent(email)}`,
        );

        const data = await res.json();
        setFacilities(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load facilities");
      }
    };

    fetchFacilities();
  }, [session, isPending]);

  // DELETE
  const handleDelete = async (id) => {
    const { data: tokenData } = await authClient.token();
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/facility/${id}`,
        {
          method: "DELETE",
          authorization: `Bearer ${tokenData?.token}`,
        },
      );

      const data = await res.json();

      if (data.deletedCount > 0) {
        toast.success("Deleted Successfully");

        setFacilities((prev) => prev.filter((item) => item._id !== id));
      } else {
        toast.error("Delete failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Server error while deleting");
    }
  };

  // LOADING UI
  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-theme text-theme">
        <p className="animate-pulse">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-theme p-8 text-theme">
      <div className="container mx-auto max-w-5xl">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-8 border-b border-theme pb-5">
          <div>
            <h1 className="text-3xl font-bold">My Facilities</h1>
            <p className="muted-text text-sm mt-1">Manage your listings</p>
          </div>

          <Link href="/add-facilities">
            <Button
              color="primary"
              className="btn-primary border-none p-0 min-w-0 h-auto shadow-none hover:opacity-95 rounded-lg px-2 hover:scale-95 duration-300 cursor-pointer font-medium transition-colors"
            >
              Add Facility
            </Button>
          </Link>
        </div>

        {/* EMPTY */}
        {facilities.length === 0 ? (
          <p className="muted-text text-center mt-10">No facilities found.</p>
        ) : (
          <div className="space-y-6">
            {facilities.map((facility) => (
              <div
                key={facility._id}
                className="bg-surface rounded-xl overflow-hidden flex flex-col md:flex-row border border-theme"
              >
                {/* IMAGE */}
                <div className="md:w-[300px] h-[220px] relative">
                  <Image
                    src={
                      facility.imageUrl ||
                      "https://images.unsplash.com/photo-1508098682722-e99c43a406b2"
                    }
                    alt={facility.facilityName}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* CONTENT */}
                <div className="flex-1 p-5 flex flex-col justify-between">
                  <div>
                    <h2 className="text-xl font-semibold">
                      {facility.facilityName}
                    </h2>

                    <div className="flex items-center gap-2 muted-text mt-2">
                      <MapPin size={16} />
                      <p>{facility.location}</p>
                    </div>

                    <p className="muted-text mt-3 text-sm">
                      {facility.description}
                    </p>

                    <div className="flex gap-5 mt-4 text-sm">
                      <p className="text-primary font-semibold">
                        ${facility.pricePerHour}/hr
                      </p>

                      <div className="flex items-center gap-1 muted-text">
                        <Users size={16} />
                        <p>{facility.capacity} Players</p>
                      </div>
                    </div>
                  </div>

                  {/* ACTIONS */}
                  <Manage_button
                    facility={facility}
                    onDelete={handleDelete}
                    setFacilities={setFacilities}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyFacilities;
