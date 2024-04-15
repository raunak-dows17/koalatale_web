import StoryDetails from "@/components/layouts/story/StoryDetails";
import React from "react";

const page = ({ params }) => {
  return <StoryDetails _id={params.details[2]} />;
};

export default page;
