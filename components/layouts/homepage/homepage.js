"use client";

import LinearLoader from "@/components/modules/loader/linearLoader";
import StoryCard from "@/components/modules/story/StoryCard";
import { useStories } from "@/utils/hooks/storyData";
import React from "react";

const Homepage = () => {
  const { stories, error, loading } = useStories();

  return loading ? (
    <div className="size-full">
      <LinearLoader />
    </div>
  ) : stories ? (
    <div className="grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 justify-center items-center">
      {stories?.map((story) => (
        <StoryCard {...story} key={story._id} />
      ))}
    </div>
  ) : error ? (
    <div className="flex justify-center items-center size-full text-red-600 text-lg">
      {error?.message || error || "Something went wrong"}
    </div>
  ) : (
    <div className="flex justify-center items-center size-full text-primaryColor text-lg">
      No Stroies Yet as the koalatale is new. Be the firstr to upload you
      thoughts
    </div>
  );
};

export default Homepage;
