"use client";

import SkeletonLoader from "@/components/modules/loader/SkeletonLoader";
import StoryCard from "@/components/modules/story/StoryCard";
import { usePersonalData, userDetail } from "@/utils/hooks/userData";
import { generateRandomColor } from "@/utils/randomColor";
import React, { useEffect, useState } from "react";
import { FaCircleExclamation, FaExclamation } from "react-icons/fa6";

const UsersDetails = ({ username, _id }) => {
  const { userData, loading, error } = usePersonalData();
  const { usersData } = userDetail(_id ? null : username);
  const [randomColor, setRandomColor] = useState(null);

  useEffect(() => {
    setRandomColor(generateRandomColor());
  }, []);

  return (
    <div className="grid grid-cols-2 gap-7 size-full">
      <div className="col-span-2 row-span-2 size-full bg-primaryColor/20 rounded-2xl overflow-hidden">
        {loading ? (
          <SkeletonLoader />
        ) : (
          <div className="flex flex-col gap-3 p-5">
            <div className="flex-wrap flex gap-2">
              {!_id && (
                <img
                  src={
                    usersData?.profileImage ||
                    `https://dummyimage.com/100x100/${randomColor}/fff.png&text=${userData?.name?.charAt(
                      0
                    )}`
                  }
                  alt=""
                  className="w-12 aspect-square rounded-full object-cover"
                />
              )}
            </div>
          </div>
        )}
      </div>
      <div className="size-full sm:col-span-1 col-span-2 bg-primaryColor/20 rounded-2xl overflow-hidden">
        {loading ? (
          <SkeletonLoader />
        ) : (
          <div className="flex flex-col gap-3 p-5">
            <h3 className="text-2xl">
              {_id ? "My " : `${username}'s `}Stories
            </h3>
            <div className="grid size-full grid-cols-1 overflow-y-auto overflow-x-hidden">
              {_id ? (
                userData?.stories.length === 0 ? (
                  <div className="flex size-full justify-center items-center gap-2 text-red-500 text-base text-pretty">
                    <FaCircleExclamation /> <span> No Stories By You</span>
                  </div>
                ) : (
                  userData?.stories.map((story) => (
                    <StoryCard {...story} key={story._id} />
                  ))
                )
              ) : usersData?.stories.length === 0 ? (
                <div className="flex size-full justify-center items-center gap-2 text-red-500 text-base text-pretty">
                  <FaCircleExclamation /> <span> No Stories By {username}</span>
                </div>
              ) : (
                usersData?.stories.map((story) => (
                  <StoryCard {...story} key={story._id} />
                ))
              )}
            </div>
          </div>
        )}
      </div>
      <div className="size-full sm:col-span-1 col-span-2 bg-primaryColor/20 rounded-2xl overflow-hidden">
        {loading ? (
          <SkeletonLoader />
        ) : (
          <div className="flex flex-col gap-3 p-5">
            <h3 className="text-2xl">
              {_id ? "My " : `${username}'s `}Contribution
            </h3>
            <div className="grid size-full grid-cols-1 overflow-y-auto overflow-x-hidden">
              {_id ? (
                userData?.contributions.length === 0 ? (
                  <div className="flex size-full justify-center items-center gap-2 text-red-500 text-base text-pretty">
                    <FaCircleExclamation />{" "}
                    <span> No Contributions By You</span>
                  </div>
                ) : (
                  userData?.contributions.map((story) => (
                    <StoryCard {...story} key={story._id} />
                  ))
                )
              ) : usersData?.contributions.length === 0 ? (
                <div className="flex size-full justify-center items-center gap-2 text-red-500 text-base text-pretty">
                  <FaCircleExclamation />{" "}
                  <span> No Contributions By {username}</span>
                </div>
              ) : (
                usersData?.contributions.map((story) => (
                  <StoryCard {...story} key={story._id} />
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersDetails;
