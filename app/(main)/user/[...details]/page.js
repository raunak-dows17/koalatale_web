import UsersDetails from "@/components/layouts/usersDetails/usersDetails";
import React from "react";

const page = ({ params }) => {
  return <UsersDetails username={params.details[0]} _id={params.details[2]} />;
};

export default page;
