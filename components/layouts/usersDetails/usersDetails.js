"use client";

import ContributionCard from "@/components/modules/contribution/contributionCard";
import SkeletonLoader from "@/components/modules/loader/SkeletonLoader";
import StoryCard from "@/components/modules/story/StoryCard";
import { usePersonalData, userDetail } from "@/utils/hooks/userData";
import { generateRandomColor } from "@/utils/randomColor";
import React, { useEffect, useState } from "react";
import { FaCircleExclamation, FaExclamation } from "react-icons/fa6";
import { IoCamera } from "react-icons/io5";

const UsersDetails = ({ username, _id }) => {
  const { userData, loading, error } = usePersonalData();
  const { usersData } = userDetail(_id ? null : username);
  const [randomColor, setRandomColor] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setRandomColor(generateRandomColor());
  }, []);

  return (
    <div className="grid grid-row-2 gap-7 size-full p-5">
      <div className="col-span-2 size-full bg-primaryColor/20 rounded-2xl overflow-hidden">
        {loading ? (
          <SkeletonLoader />
        ) : (
          <div className="flex flex-col justify-between gap-3 p-5">
            <div className="flex-wrap flex gap-2">
              {_id ? (
                <div className="relative">
                  <img
                    src={
                      userData?.profileImage ||
                      `https://dummyimage.com/100x100/${randomColor}/fff.png&text=${userData?.name?.charAt(
                        0
                      )}`
                    }
                    alt=""
                    className="w-12 aspect-square rounded-full object-cover"
                  />
                  {isEditing && (
                    <label htmlFor="profileImage absolute">
                      <IoCamera />
                    </label>
                  )}
                </div>
              ) : (
                <img
                  src={
                    usersData?.profileImage ||
                    `https://dummyimage.com/100x100/${randomColor}/fff.png&text=${usersData?.name?.charAt(
                      0
                    )}`
                  }
                  alt=""
                  className="w-12 aspect-square rounded-full object-cover"
                />
              )}
              {_id ? (
                <div>
                  <p className="text-pretty">{userData?.username}</p>{" "}
                  <p className="text-primaryColor text-pretty font-semibold">
                    {userData?.name}
                  </p>
                </div>
              ) : (
                <div className="">
                  <p className="text-pretty">{usersData?.username}</p>{" "}
                  <p className="text-primaryColor text-pretty font-semibold">
                    {usersData?.name}
                  </p>
                </div>
              )}
            </div>
            {_id ? (
              <div>
                <p className="text-pretty">Contact Number</p>{" "}
                <p className="text-primaryColor text-pretty font-semibold">
                  {userData?.phoneNumber}
                </p>
              </div>
            ) : (
              <div className="">
                <p className="text-pretty">Contact Number</p>{" "}
                <p className="text-primaryColor text-pretty font-semibold">
                  {usersData?.phoneNumber}
                </p>
              </div>
            )}
            <div className="size-full">
              {_id && (
                <button
                  type="button"
                  className="bg-primaryColor text-secondaryColor px-7 py-2 rounded"
                >
                  Edit Profile Info
                </button>
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
            <h3 className="text-2xl flex items-center justify-between">
              {_id ? "My " : `${username}'s `}Stories
              <span className="text-primaryColor font-bold">
                {_id ? userData?.stories?.length : usersData?.stories?.length}
              </span>
            </h3>
            <div className="grid size-full grid-cols-1 gap-2 overflow-y-auto overflow-x-hidden">
              {_id ? (
                userData?.stories?.length === 0 ? (
                  <div className="flex size-full justify-center items-center gap-2 text-red-500 text-base text-pretty">
                    <FaCircleExclamation /> <span> No Stories By You</span>
                  </div>
                ) : (
                  userData?.stories?.map((story) => (
                    <StoryCard {...story} key={story._id} />
                  ))
                )
              ) : usersData?.stories?.length === 0 ? (
                <div className="flex size-full justify-center items-center gap-2 text-red-500 text-base text-pretty">
                  <FaCircleExclamation /> <span> No Stories By {username}</span>
                </div>
              ) : (
                usersData?.stories?.map((story) => (
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
            <h3 className="text-2xl flex items-center justify-between">
              {_id ? "My " : `${username}'s `}Contributions
              <span className="text-primaryColor font-bold">
                {_id
                  ? userData?.contributions?.length
                  : usersData?.contributions?.length}
              </span>
            </h3>
            <div className="grid size-full grid-cols-1 gap-2 overflow-y-auto overflow-x-hidden">
              {_id ? (
                userData?.contributions.length === 0 ? (
                  <div className="flex size-full justify-center items-center gap-2 text-red-500 text-base text-pretty">
                    <FaCircleExclamation />{" "}
                    <span> No Contributions By You</span>
                  </div>
                ) : (
                  userData?.contributions?.map((contribution) => (
                    <ContributionCard
                      {...contribution}
                      key={contribution._id}
                    />
                  ))
                )
              ) : usersData?.contributions?.length === 0 ? (
                <div className="flex size-full justify-center items-center gap-2 text-red-500 text-base text-pretty">
                  <FaCircleExclamation />{" "}
                  <span> No Contributions By {username}</span>
                </div>
              ) : (
                usersData?.contributions?.map((contribution) => (
                  <ContributionCard {...contribution} key={contribution._id} />
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
