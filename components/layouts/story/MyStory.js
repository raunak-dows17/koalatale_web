"use client";

import SkeletonLoader from "@/components/modules/loader/SkeletonLoader";
import LinearLoader from "@/components/modules/loader/linearLoader";
import StoryCard from "@/components/modules/story/StoryCard";
import { usePersonalData } from "@/utils/hooks/userData";
import { useRouter } from "next/navigation";
import React from "react";
import { FaCircleExclamation } from "react-icons/fa6";

const MyStory = () => {
  const { userData, error, loading } = usePersonalData();
  const router = useRouter();

  return (
    <main className="flex flex-col size-full p-5 space-y-5">
      <div className="Title font-bold text-primaryColor md:text-4xl text-3xl">
        My Stories
      </div>
      {loading ? (
        <div className="size-full rounded overflow-hidden">
          <LinearLoader />
        </div>
      ) : (
        userData?.stories?.length === 0 && (
          <div className="flex flex-col gap-5 size-full items-center justify-center">
            <div className="text-red-600 flex items-center gap-1 font-semibold">
              <span>
                <FaCircleExclamation />
              </span>{" "}
              No Stories Uploaded Yet
            </div>
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
        )
      )}
      <div className="grid 2xl:grid-cols-4 lg:grid-cols-3 gap-4 sm:grid-cols-2 grid-cols-1 justify-center items-center">
        {userData?.stories?.map((story, index) =>
          loading ? (
            <SkeletonLoader key={index} />
          ) : (
            <StoryCard {...story} key={index} />
          )
        )}
      </div>
    </main>
  );
};

export default MyStory;
