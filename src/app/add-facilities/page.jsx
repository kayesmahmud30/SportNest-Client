"use client";

import { authClient } from "@/lib/auth-client";
import {
  FieldError,
  Input,
  Label,
  TextField,
  Select,
  ListBox,
  TextArea,
  Button,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import { HiCheck, HiChevronDown } from "react-icons/hi";
import { toast } from "react-toastify";
import { MapPin, DollarSign, Users, Clock, FileText } from "lucide-react";

const AddFacilities = () => {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const ownerEmail = session?.user?.email || "owner@sportnest.com";

  const onSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const facilityData = Object.fromEntries(data.entries());

    facilityData.ownerEmail = ownerEmail;

    const { data: tokenData } = await authClient.token();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/facility`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${tokenData?.token}`,
        },
        body: JSON.stringify(facilityData),
      },
    );

    if (res.ok) {
      toast.success("Facility added successfully!");
      router.push("/manage-facilities");
    } else {
      toast.error("Failed to add facility. Please try again.");
    }
  };

  const inputClass =
    "w-full rounded-2xl border border-white/10 bg-white/[0.05] backdrop-blur-2xl px-4 py-3 text-theme placeholder:text-slate-400 outline-none transition-all duration-300 hover:border-primary/40 focus:border-primary focus:bg-white/[0.08] focus:shadow-[0_0_25px_rgba(42,164,114,0.15)]";

  const labelClass =
    "mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400";

  const glassCard =
    "border border-white/10 bg-white/[0.04] backdrop-blur-3xl shadow-[0_10px_50px_rgba(0,0,0,0.45)]";

  const facilityTypes = [
    "Football Pitch",
    "Basketball Court",
    "Tennis Court",
    "Badminton Court",
    "Swimming Pool",
    "Cricket Ground",
    "Volleyball Court",
    "Gymnasium",
    "Multi-Purpose Arena",
    "Padel Court",
    "Boxing Ring",
    "Yoga Studio",
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#07110d] px-4 py-10">
      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute left-[-120px] top-[-120px] h-[320px] w-[320px] rounded-full bg-[#2aa472]/25 blur-[120px]" />

        <div className="absolute bottom-[-150px] right-[-100px] h-[350px] w-[350px] rounded-full bg-[#146a44]/30 blur-[120px]" />

        <div className="absolute left-1/2 top-1/2 h-[250px] w-[250px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7fcf9e]/10 blur-[100px]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.05),transparent_40%)]" />
      </div>

      {/* Main Card */}
      <div
        className={`relative mx-auto w-full max-w-5xl overflow-hidden rounded-[32px] ${glassCard}`}
      >
        {/* Top Border Glow */}
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#2aa472] to-transparent opacity-80" />

        {/* Header */}
        <div className="sticky top-0 z-20 border-b border-white/10 bg-black/10 backdrop-blur-3xl">
          <div className="flex flex-col gap-3 px-8 py-7 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="bg-gradient-to-r from-[#b9ffd5] via-[#61d9a2] to-[#1d9b68] bg-clip-text text-3xl font-black tracking-tight text-transparent">
                Add Facility
              </h1>

              <p className="mt-1 text-sm text-slate-400">
                Launch premium sports venues on SportNest
              </p>
            </div>

            <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-xs font-semibold tracking-widest text-emerald-300 backdrop-blur-xl">
              SPORTNEST PANEL
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} className="space-y-8 p-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Facility Name */}
            <div className="md:col-span-2">
              <TextField name="facilityName" isRequired>
                <Label className={labelClass}>Facility Title</Label>

                <Input
                  placeholder="e.g., Downtown Olympic Arena"
                  className={inputClass}
                />

                <FieldError className="mt-1 text-xs text-red-400" />
              </TextField>
            </div>

            {/* Select FIXED */}
            <div>
              <Label className={labelClass}>Category</Label>

              <Select name="facilityType" className="w-full">
                <Select.Trigger
                  className={`${inputClass} flex cursor-pointer items-center justify-between`}
                >
                  <Select.Value placeholder="Choose facility type" />

                  <Select.Indicator>
                    <HiChevronDown className="h-5 w-5 text-slate-400 transition-transform duration-300" />
                  </Select.Indicator>
                </Select.Trigger>

                <Select.Popover className="z-50 mt-2 w-[var(--trigger-width)]">
                  <ListBox className="max-h-64 overflow-y-auto rounded-2xl border border-white/10 bg-[#0b1511]/95 p-2 shadow-[0_20px_60px_rgba(0,0,0,0.6)] backdrop-blur-3xl">
                    {facilityTypes.map((item) => (
                      <ListBox.Item
                        key={item}
                        id={item}
                        textValue={item}
                        className="group flex cursor-pointer items-center justify-between rounded-xl px-4 py-3 text-sm text-slate-300 transition-all duration-200 hover:bg-white/[0.06] hover:text-white focus:bg-white/[0.06] focus:outline-none"
                      >
                        <span className="font-medium">{item}</span>

                        <ListBox.ItemIndicator>
                          <HiCheck className="h-4 w-4 text-emerald-400" />
                        </ListBox.ItemIndicator>
                      </ListBox.Item>
                    ))}
                  </ListBox>
                </Select.Popover>
              </Select>

              <FieldError className="mt-1 text-xs text-red-400" />
            </div>

            {/* Image */}
            <div>
              <TextField name="imageUrl" isRequired>
                <Label className={labelClass}>Image URL</Label>

                <Input
                  type="url"
                  placeholder="https://facility-image.jpg"
                  className={inputClass}
                />

                <FieldError className="mt-1 text-xs text-red-400" />
              </TextField>
            </div>

            {/* Location */}
            <div className="md:col-span-2">
              <TextField name="location" isRequired>
                <Label className={labelClass}>
                  <MapPin size={14} className="text-primary" />
                  Venue Location
                </Label>

                <Input placeholder="Address or area" className={inputClass} />

                <FieldError className="mt-1 text-xs text-red-400" />
              </TextField>
            </div>

            {/* Price */}
            <div>
              <TextField name="pricePerHour" isRequired>
                <Label className={labelClass}>
                  <DollarSign size={14} className="text-primary" />
                  Price Per Hour
                </Label>

                <Input type="number" placeholder="25" className={inputClass} />

                <FieldError className="mt-1 text-xs text-red-400" />
              </TextField>
            </div>

            {/* Capacity */}
            <div>
              <TextField name="capacity" isRequired>
                <Label className={labelClass}>
                  <Users size={14} className="text-primary" />
                  Maximum Capacity
                </Label>

                <Input type="number" placeholder="12" className={inputClass} />

                <FieldError className="mt-1 text-xs text-red-400" />
              </TextField>
            </div>

            {/* Time */}
            <div className="md:col-span-2">
              <TextField name="availableTimeSlots" isRequired>
                <Label className={labelClass}>
                  <Clock size={14} className="text-primary" />
                  Availability & Schedule
                </Label>

                <TextArea
                  placeholder={`Mon-Fri: 06:00 AM - 10:00 PM\nAvailable slots: 08:00 AM, 11:00 AM`}
                  className={`${inputClass} min-h-[120px] resize-none`}
                />

                <FieldError className="mt-1 text-xs text-red-400" />
              </TextField>
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <TextField name="description" isRequired>
                <Label className={labelClass}>
                  <FileText size={14} className="text-primary" />
                  Overview & Amenities
                </Label>

                <TextArea
                  placeholder="Describe turf quality, parking, locker rooms, lighting, seating, equipment rentals..."
                  className={`${inputClass} min-h-[140px] resize-none`}
                />

                <FieldError className="mt-1 text-xs text-red-400" />
              </TextField>
            </div>

            {/* Hidden */}
            <TextField
              name="ownerEmail"
              defaultValue={ownerEmail}
              className="hidden"
            >
              <Input type="hidden" />
            </TextField>
          </div>

          {/* Button */}
          <div className="pt-2">
            <Button
              type="submit"
              className="group relative w-full overflow-hidden rounded-full border border-emerald-400/20 bg-gradient-to-r from-[#1a8f61] via-[#2aa472] to-[#146a44] py-4 text-sm font-bold tracking-[0.15em] text-white shadow-[0_10px_40px_rgba(42,164,114,0.35)] transition-all duration-300 hover:scale-[1.01] active:scale-[0.99]"
            >
              <span className="absolute inset-0 bg-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <span className="relative z-10">Confirm Submission</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFacilities;
