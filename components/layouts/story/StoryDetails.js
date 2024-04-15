"use client";

import ContributionCard from "@/components/modules/contribution/contributionCard";
import SkeletonLoader from "@/components/modules/loader/SkeletonLoader";
import StoryRight from "@/components/modules/story/StoryRight";
import { useStory } from "@/utils/hooks/storyData";
import React from "react";

const StoryDetails = ({ _id }) => {
  const { story, loading, error } = useStory(_id);

  console.log(story);

  return (
    <main className="flex lg:flex-row flex-col overflow-auto gap-y-5 size-full">
      <div className="p-5 size-full flex flex-col gap-5">
        <div className="size-full rounded overflow-hidden">
          {loading ? (
            <SkeletonLoader />
          ) : (
            <div className="flex flex-col justify-center gap-3">
              <div className="title text-primaryColor font-semibold tracking-wider text-3xl uppercase">
                {story?.title}
              </div>

              <div>
                {story?.content?.map((cont, index) => (
                  <div key="index" className="flex justify-center flex-col">
                    {cont?.text}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="size-full rounded overflow-hidden">
          {loading ? (
            <SkeletonLoader />
          ) : (
            <div className="grid grid-cols-1 gap-2">
              {story?.contributions?.map((contribution, index) => (
                <ContributionCard key={index} {...contribution} />
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="lg:w-1/2 lg:size-full">
        {loading ? <SkeletonLoader /> : <StoryRight {...story} />}
      </div>
    </main>
  );
};

export default StoryDetails;
