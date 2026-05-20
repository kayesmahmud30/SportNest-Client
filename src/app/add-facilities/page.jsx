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
import {
  ShieldCheck,
  MapPin,
  DollarSign,
  Users,
  Clock,
  FileText,
} from "lucide-react";

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

  // Modern Dark-themed Glassmorphism inputs
  const inputClass =
    "w-full px-4 py-3 bg-surface text-theme rounded-xl border border-theme placeholder:muted-text transition-all duration-300 outline-none";

  const labelClass =
    "text-xs font-semibold tracking-wider muted-text uppercase flex items-center gap-2 mb-1.5";

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
    <div className="min-h-screen w-full flex items-center justify-center bg-theme p-4 md:p-8">
      <div className="w-full max-w-4xl bg-surface-80 backdrop-blur-md shadow-2xl rounded-2xl border border-theme max-h-[92vh] overflow-y-auto custom-scrollbar">
        {/* Sticky Header */}
        <div className="px-8 py-6 border-b border-theme sticky top-0 bg-surface-80 backdrop-blur-md z-10 flex flex-col justify-center sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black uppercase tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-[#7fcf9e] via-[#2aa472] to-[#146a44]">
              Add New Space
            </h2>
            <p className="text-xs muted-text mt-1">
              Publish and list premium sports spaces onto the marketplace
            </p>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={onSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Facility Name */}
            <div className="md:col-span-2">
              <TextField name="facilityName" isRequired>
                <Label className={labelClass}>Facility Title</Label>
                <Input
                  placeholder="e.g., Downtown Olympic Arena"
                  className={inputClass}
                />
                <FieldError className="text-red-400 text-xs mt-1" />
              </TextField>
            </div>

            {/* Facility Type Selector */}
            <div className="flex flex-col">
              <Label className={labelClass}>Arena Category</Label>
              <Select name="facilityType" className="w-full">
                <Select.Trigger className="w-full px-4 py-3 bg-surface text-theme rounded-xl border border-theme flex justify-between items-center transition-all duration-300 outline-none text-sm cursor-pointer">
                  <Select.Value placeholder="Select type" />
                  <Select.Indicator>
                    <HiChevronDown className="h-5 w-5 text-slate-400" />
                  </Select.Indicator>
                </Select.Trigger>
                <Select.Popover className="z-50 w-full md:w-[380px] mt-1">
                  <ListBox className="bg-surface border border-theme rounded-xl shadow-2xl max-h-60 overflow-y-auto p-1 focus:outline-none custom-scrollbar">
                    {facilityTypes.map((item) => (
                      <ListBox.Item
                        key={item}
                        id={item}
                        textValue={item}
                        className="px-4 py-2.5 rounded-lg cursor-pointer flex justify-between items-center text-sm muted-text hover:bg-[rgba(var(--color-surface-rgb),0.6)] hover:text-primary focus:bg-[rgba(var(--color-surface-rgb),0.6)] focus:outline-none transition-all duration-200"
                      >
                        <span className="font-medium">{item}</span>
                        <ListBox.ItemIndicator>
                          <HiCheck className="h-4 text-primary" />
                        </ListBox.ItemIndicator>
                      </ListBox.Item>
                    ))}
                  </ListBox>
                </Select.Popover>
              </Select>
              <FieldError className="text-red-400 text-xs mt-1" />
            </div>

            {/* Image URL */}
            <div>
              <TextField name="imageUrl" isRequired>
                <Label className={labelClass}>Showcase Image URL</Label>
                <Input
                  type="url"
                  placeholder="https://images.unsplash.com/your-image.jpg"
                  className={inputClass}
                />
                <FieldError className="text-red-400 text-xs mt-1" />
              </TextField>
            </div>

            {/* Location */}
            <div className="md:col-span-2">
              <TextField name="location" isRequired>
                <Label className={labelClass}>
                  <MapPin size={14} className="text-primary" /> Street Address &
                  Venue Location
                </Label>
                <Input
                  placeholder="Street, District, Stadium Complex / Block Number"
                  className={inputClass}
                />
                <FieldError className="text-red-400 text-xs mt-1" />
              </TextField>
            </div>

            {/* Price Per Hour */}
            <div>
              <TextField name="pricePerHour" isRequired>
                <Label className={labelClass}>
                  <DollarSign size={14} className="text-primary" /> Hourly Rate
                  (USD)
                </Label>
                <Input
                  type="number"
                  placeholder="85"
                  step="1"
                  min="0"
                  className={inputClass}
                />
                <FieldError className="text-red-400 text-xs mt-1" />
              </TextField>
            </div>

            {/* Capacity */}
            <div>
              <TextField name="capacity" isRequired>
                <Label className={labelClass}>
                  <Users size={14} className="text-primary" /> Max Operational
                  Capacity
                </Label>
                <Input
                  type="number"
                  placeholder="16 Players"
                  min="1"
                  className={inputClass}
                />
                <FieldError className="text-red-400 text-xs mt-1" />
              </TextField>
            </div>

            {/* Available Time Slots (FIXED: Hydration-safe Placeholder string format) */}
            <div className="md:col-span-2">
              <TextField name="availableTimeSlots" isRequired>
                <Label className={labelClass}>
                  <Clock size={14} className="text-primary" /> Availability &
                  Operational Windows
                </Label>
                <TextArea
                  placeholder={`e.g., Mon-Fri: 06:00 AM - 10:00 PM\nAvailable slots: 08:00 AM, 11:00 AM, 04:00 PM`}
                  className={`${inputClass} min-h-[90px] py-3 resize-none`}
                />
                <FieldError className="text-red-400 text-xs mt-1" />
              </TextField>
            </div>

            {/* Description (FIXED: Hydration-safe Placeholder string format) */}
            <div className="md:col-span-2">
              <TextField name="description" isRequired>
                <Label className={labelClass}>
                  <FileText size={14} className="text-primary" /> Field Overview
                  & Amenities
                </Label>
                <TextArea
                  placeholder={`Highlight features like floodlighting, hardwood/turf configurations, parking allocations, changing rooms, or equipment rentals included...`}
                  className={`${inputClass} min-h-30 py-3 resize-none`}
                />
                <FieldError className="text-red-400 text-xs mt-1" />
              </TextField>
            </div>

            {/* Hidden Field Block */}
            <TextField
              name="ownerEmail"
              defaultValue={ownerEmail}
              className="hidden"
            >
              <Input type="hidden" />
            </TextField>
          </div>

          {/* Action Row Button */}
          <div className="pt-4">
            <Button
              type="submit"
              className="w-full btn-primary font-bold py-3.5 rounded-xl transition-all duration-300 transform active:scale-[0.99] cursor-pointer text-sm tracking-wider uppercase"
            >
              Confirm & Launch Venue
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFacilities;
