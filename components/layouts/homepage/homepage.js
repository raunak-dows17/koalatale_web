"use client";

import LinearLoader from "@/components/modules/loader/linearLoader";
import StoryCard from "@/components/modules/story/StoryCard";
import { useStories } from "@/utils/hooks/storyData";
import { useRouter } from "next/navigation";
import React from "react";

const Homepage = () => {
  const { stories, error, loading } = useStories();
  const router = useRouter();

  return (
    <main className="size-full p-5 space-y-5">
      <div className="title font-bold text-primaryColor md:text-4xl text-3xl">
        All Stories
      </div>
      {loading ? (
        <div className="size-full">
          <LinearLoader />
        </div>
      ) : stories ? (
        <div className="grid 2xl:grid-cols-3 xl:grid-cols-2 w-full gap-4 grid-cols-1 justify-center items-center">
          {stories?.map((story) => (
            <StoryCard {...story} key={story._id} />
          ))}
        </div>
      ) : error ? (
        <div className="flex justify-center items-center size-full text-red-600 text-lg">
          {error?.message || error || "Something went wrong"}
        </div>
      ) : (
        <div className="flex flex-col justify-center gap-5 items-center size-full text-primaryColor text-lg">
          No Stroies Yet as the koalatale is new. Be the first to upload your
          thoughts here.
          <button
            type="button"
            onClick={() => {
              router.push("/story/addstory");
            }}
            className="bg-primaryColor text-secondaryColor px-7 py-2 rounded"
          >
            Add your imagination
          </button>
        </div>
      )}
    </main>
  );
};

export default Homepage;
