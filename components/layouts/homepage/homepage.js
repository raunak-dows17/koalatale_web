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
  ) : stories || !error ? (
    <div className="grid grid-cols-4 justify-center items-center">
      {stories?.map((story) => (
        <StoryCard {...story} key={story._id} />
      ))}
    </div>
  ) : (
    <div className=""></div>
  );
};

export default Homepage;
