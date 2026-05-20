import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoLocate } from "react-icons/io5";

const Cardfacility = ({ data, view }) => {
  const {
    facilityName,
    facilityType,
    imageUrl,
    location,
    pricePerHour,
    capacity,
    description,
    _id,
  } = data;

  const isList = view === "list";

  return (
    <div
      className={`group relative w-full mx-auto transition-all duration-500`}
    >
      <div className="absolute -inset-0.5 bg-linear-to-r from-[#05351754] to-[#146a44] rounded-2xl blur-lg opacity-0 group-hover:opacity-10 transition duration-500" />

      <div
        className={`card bg-[rgba(var(--color-bg-rgb),0.04)] backdrop-blur-md relative overflow-hidden rounded-2xl border border-theme shadow-xl transition-all duration-300 group-hover:border-[rgba(var(--color-primary-rgb),0.12)] 
        ${isList ? "flex-row h-64" : "flex-col"}`}
      >
        <div
          className={`${isList ? "w-1.5 h-full" : "h-1.5 w-full"} bg-linear-to-r from-[#7fcf9e] to-[#146a44]`}
        />

        <figure
          className={`relative overflow-hidden p-0 m-0 
          ${isList ? "w-1/3 h-full" : "h-48 w-full"}`}
        >
          {/* Need-to-change */}

          <Image
            width={400}
            height={400}
            src={
              imageUrl ||
              "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            }
            alt={facilityName}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute top-3 left-3 z-10">
            <span className="badge badge-sm bg-surface/80 text-theme border-none font-medium px-2.5 py-3 backdrop-blur-sm">
              {facilityType}
            </span>
          </div>
        </figure>

        <div
          className={`card-body p-5 flex-1 justify-between ${isList ? "text-left" : "items-stretch text-left"}`}
        >
          <div>
            <h2 className="card-title text-lg font-bold text-theme mb-0 transition-all duration-300 group-hover:bg-linear-to-r group-hover:from-[#7fcf9e] group-hover:to-[#146a44] group-hover:bg-clip-text group-hover:text-transparent">
              {facilityName}
            </h2>

            <p className="muted-text text-[11px] font-medium flex items-center gap-1 mb-1">
              <IoLocate></IoLocate> {location}
            </p>

            <p
              className={`muted-text text-xs leading-relaxed mb-3 ${isList ? "line-clamp-3" : "line-clamp-2"}`}
            >
              {description}
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-[#7fcf9e] to-[#146a44]">
                  ${pricePerHour}
                </span>
                <span className="muted-text text-xs"> / hour</span>
              </div>
              <div className="text-xs text-neutral-content/70 font-medium">
                Capacity:{" "}
                <span className="text-base-content font-bold">
                  {capacity} players
                </span>
              </div>
            </div>

            <div
              className={`flex items-center gap-3 ${isList ? "justify-start" : "flex-col"}`}
            >
              <Link
                href={`all-facilities/${_id}`}
                className={`btn min-h-0 h-11 rounded-full font-semibold text-sm border-none btn-primary ${isList ? "w-48" : "w-full"}`}
              >
                <span className="text-white">
                  Book Now
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cardfacility;
