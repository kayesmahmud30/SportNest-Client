import FacilityDetailsCard from "@/app/components/FacilityDetailsCard/FacilityDetailsCard";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import React from "react";

const Details = async ({ params }) => {
  const { id } = await params;

  const { token } = await auth.api.getToken({
    headers: await headers(),
  });
  console.log(token);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/facility/${id}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  );
  const data = await res.json();
  console.log(data);
  return (
    <div>
      <FacilityDetailsCard key={data._id} data={data}></FacilityDetailsCard>
    </div>
  );
};

export default Details;
