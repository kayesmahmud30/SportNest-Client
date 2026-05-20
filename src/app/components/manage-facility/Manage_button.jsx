"use client";

import { useState } from "react";
import { AlertDialog, Button } from "@heroui/react";
import { Edit, Trash2, X } from "lucide-react";
import { FaTriangleExclamation } from "react-icons/fa6";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

const Manage_button = ({ facility, onDelete, setFacilities }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [formData, setFormData] = useState({
    facilityName: facility?.facilityName || "",
    location: facility?.location || "",
    description: facility?.description || "",
    pricePerHour: facility?.pricePerHour || "",
    capacity: facility?.capacity || "",
  });

  const handleDeleteClick = async () => {
    try {
      const { data: tokenData } = await authClient.token();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/facility/${facility._id}`,
        {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${tokenData?.token}`,
          },
        },
      );

      const data = await res.json();

      if (res.ok) {
        toast.success("Deleted successfully!");

        setFacilities((prev) =>
          prev.filter((item) => item._id !== facility._id),
        );
      } else {
        toast.error(data.message || "Delete failed");
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };

  const handleUpdate = async () => {
    const { data: tokenData } = await authClient.token();

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/facility/${facility._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${tokenData?.token}`,
          },
          body: JSON.stringify(formData),
        },
      );

      const data = await res.json();

      if (data.modifiedCount > 0) {
        toast.success("Facility updated successfully!");

        setFacilities((prev) =>
          prev.map((item) =>
            item._id === facility._id ? { ...item, ...formData } : item,
          ),
        );

        setIsEditOpen(false);
      } else {
        toast.info("No changes made");
      }
    } catch (error) {
      console.log(error);
      toast.error("Update failed");
    }
  };

  return (
    <div className="mt-6 pt-6 border-t border-white/10 flex gap-4 items-center flex-wrap">
      {/* DELETE */}
      <AlertDialog>
        <Button
          variant="light"
          className="group relative overflow-hidden border border-red-500/20 bg-red-500/5 backdrop-blur-xl hover:bg-red-500/10 text-red-400 rounded-2xl px-5 py-2.5 h-auto min-w-0 shadow-lg shadow-red-500/5 transition-all duration-300 hover:scale-[0.97]"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-red-500/0 via-red-500/10 to-red-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative flex items-center gap-2 font-medium">
            <Trash2 size={16} />
            Delete
          </div>
        </Button>

        <AlertDialog.Backdrop className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md px-4">
          <AlertDialog.Container>
            <AlertDialog.Dialog className="w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-2xl shadow-black/40 text-white relative">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-transparent to-cyan-500/10 pointer-events-none" />

              <div className="relative p-7">
                <AlertDialog.Header className="text-center">
                  <div className="mx-auto flex items-center justify-center w-18 h-18 rounded-full bg-red-500/10 border border-red-500/20 backdrop-blur-xl">
                    <FaTriangleExclamation className="text-red-500 text-4xl" />
                  </div>

                  <AlertDialog.Heading className="text-2xl font-bold mt-5">
                    Delete Facility?
                  </AlertDialog.Heading>
                </AlertDialog.Header>

                <AlertDialog.Body className="text-center mt-3 text-slate-300 text-sm leading-relaxed">
                  This action cannot be undone. Your facility listing will be
                  removed permanently.
                </AlertDialog.Body>

                <div className="mt-5 text-center">
                  <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white backdrop-blur-lg">
                    {facility.facilityName}
                  </div>
                </div>

                <AlertDialog.Footer className="flex flex-col gap-3 mt-8">
                  <Button
                    color="danger"
                    onPress={handleDeleteClick}
                    className="h-12 rounded-2xl border border-red-500/20 bg-red-500/10 backdrop-blur-xl text-red-400 font-semibold hover:bg-red-500 hover:text-white transition-all duration-300 hover:scale-[0.98] shadow-lg shadow-red-500/10"
                  >
                    Yes, Delete Listing
                  </Button>

                  <Button
                    variant="light"
                    slot="close"
                    className="h-12 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl text-white font-medium hover:bg-white/10 transition-all duration-300 hover:scale-[0.98]"
                  >
                    Keep Listing
                  </Button>
                </AlertDialog.Footer>
              </div>
            </AlertDialog.Dialog>
          </AlertDialog.Container>
        </AlertDialog.Backdrop>
      </AlertDialog>

      {/* EDIT BUTTON */}
      <Button
        onPress={() => setIsEditOpen(true)}
        className="group relative overflow-hidden border border-cyan-400/20 bg-cyan-500/10 backdrop-blur-xl text-cyan-300 rounded-2xl px-5 py-2.5 h-auto min-w-0 shadow-lg shadow-cyan-500/10 transition-all duration-300 hover:scale-[0.97] hover:bg-cyan-500 hover:text-white"
      >
        <span className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-400/10 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative flex items-center gap-2 font-medium">
          <Edit size={16} />
          Edit Space
        </div>
      </Button>

      {/* EDIT MODAL */}
      {isEditOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-2xl shadow-black/40 text-white">
            {/* Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-500/10 pointer-events-none" />

            <div className="relative p-7">
              {/* CLOSE */}
              <button
                onClick={() => setIsEditOpen(false)}
                className="absolute top-5 right-5 flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl text-slate-300 hover:text-white hover:bg-white/10 transition-all duration-300"
              >
                <X size={18} />
              </button>

              {/* HEADER */}
              <div className="mb-7">
                <h2 className="text-3xl font-bold">Modify Details</h2>

                <p className="text-sm text-slate-400 mt-2">
                  Update your facility information and keep everything fresh.
                </p>
              </div>

              {/* INPUTS */}
              <div className="space-y-4">
                <input
                  className="w-full h-12 px-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl outline-none focus:border-cyan-400/40 transition-all placeholder:text-slate-500"
                  value={formData.facilityName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      facilityName: e.target.value,
                    })
                  }
                  placeholder="Facility Name"
                />

                <input
                  className="w-full h-12 px-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl outline-none focus:border-cyan-400/40 transition-all placeholder:text-slate-500"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      location: e.target.value,
                    })
                  }
                  placeholder="Location"
                />

                <div className="grid grid-cols-2 gap-4">
                  <input
                    className="w-full h-12 px-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl outline-none focus:border-cyan-400/40 transition-all placeholder:text-slate-500"
                    value={formData.pricePerHour}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        pricePerHour: e.target.value,
                      })
                    }
                    placeholder="Price"
                  />

                  <input
                    className="w-full h-12 px-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl outline-none focus:border-cyan-400/40 transition-all placeholder:text-slate-500"
                    value={formData.capacity}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        capacity: e.target.value,
                      })
                    }
                    placeholder="Capacity"
                  />
                </div>

                <textarea
                  rows={4}
                  className="w-full p-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl outline-none focus:border-cyan-400/40 transition-all placeholder:text-slate-500 resize-none"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      description: e.target.value,
                    })
                  }
                  placeholder="Description"
                />
              </div>

              {/* BUTTONS */}
              <div className="flex gap-3 mt-7">
                <Button
                  color="primary"
                  onPress={handleUpdate}
                  className="flex-1 h-12 rounded-2xl border border-cyan-400/20 bg-cyan-500/10 backdrop-blur-xl text-cyan-300 font-semibold hover:bg-cyan-500 hover:text-white transition-all duration-300 hover:scale-[0.98] shadow-lg shadow-cyan-500/10"
                >
                  Save Changes
                </Button>

                <Button
                  variant="light"
                  onPress={() => setIsEditOpen(false)}
                  className="flex-1 h-12 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl text-white font-medium hover:bg-white/10 transition-all duration-300 hover:scale-[0.98]"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Manage_button;
