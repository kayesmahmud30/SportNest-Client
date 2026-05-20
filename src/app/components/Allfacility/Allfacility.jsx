/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useEffect, useState } from "react";
import { FiSearch, FiSliders, FiGrid, FiList } from "react-icons/fi";
import Cardfacility from "../Header/Card.jsx/Cardfacility";

const Allfacility = () => {
  const [search, setSearch] = useState("");

  const [sport, setSport] = useState("All Facilities");

  const [facilities, setFacilities] = useState([]);

  const [view, setView] = useState("grid");

  const fetchFacilities = async () => {
    let url = `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/facility?`;

    if (search) {
      url += `search=${search}&`;
    }

    // Sport query
    if (sport !== "All Facilities") {
      url += `sport=${sport}`;
    }

    const res = await fetch(url);
    const data = await res.json();

    setFacilities(data);
  };

  useEffect(() => {
    fetchFacilities();
  }, [search, sport]);

  return (
    <div className="min-h-screen bg-theme p-6 lg:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Search & Filter Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Search */}
          <div className="relative flex-1 group">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 muted-text group-focus-within:text-primary transition-colors z-10" />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search facility..."
              className="w-full bg-surface border border-theme text-theme pl-11 pr-4 py-3 rounded-xl focus:outline-none transition-all"
            />
          </div>

          {/* Filter */}
          <div className="flex items-center gap-3">
            <select
              value={sport}
              onChange={(e) => setSport(e.target.value)}
              className="bg-surface border hover:scale-95 duration-300 cursor-pointer border-theme text-theme px-4 py-3 rounded-xl focus:outline-none appearance-none min-w-[140px]"
            >
              <option>All Facilities</option>
              <option>Football Field</option>
              <option>Table Tennis</option>
              <option>Swimming Pool</option>
              <option>Boxing Ring</option>
              <option>Yoga Studio</option>
              <option>Volleyball Court</option>
              <option>Cricket Pitch</option>
              <option>Tennis Court</option>
              <option>Basketball Court</option>
              <option>Multi-Purpose Arena</option>
              <option>Gymnasium</option>
              <option>Badminton Court</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between border-b border-theme pb-4">
          <h1 className="text-3xl font-bold text-theme tracking-tight">
            All Facilities
          </h1>

          <div className="flex bg-surface p-1 rounded-lg border border-theme">
            <button
              onClick={() => setView("grid")}
              className={`p-2 rounded-md transition-all duration-300 ${
                view === "grid"
                  ? "bg-surface text-primary shadow-md"
                  : "muted-text hover:text-theme"
              }`}
            >
              <FiGrid size={20} />
            </button>

            <button
              onClick={() => setView("list")}
              className={`p-2 rounded-md transition-all duration-300 ${
                view === "list"
                  ? "bg-surface text-primary shadow-md"
                  : "muted-text hover:text-theme"
              }`}
            >
              <FiList size={20} />
            </button>
          </div>
        </div>

        {/* Facility Cards */}
        <div
          className={`grid transition-all duration-500 ease-in-out ${
            view === "grid"
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              : "grid-cols-1 gap-6"
          }`}
        >
          {facilities?.map((item) => (
            <Cardfacility key={item._id} data={item} view={view} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Allfacility;
