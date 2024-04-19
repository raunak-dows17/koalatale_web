"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { usePersonalData } from "@/utils/hooks/userData";

const StoryCard = ({ author, content, contributions, title, _id, votes }) => {
  const { userData, error, loading } = usePersonalData();
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/story/${title}/${author?.username}/${_id}`)}
      className="bg-white p-5 rounded-lg size-full cursor-pointer"
    >
      <div className="flex flex-col gap-3 justify-between size-full">
        <div className="flex justify-between items-center">
          <p className="title text-lg font-semibold tracking-wide text-primaryColor">
            {title || ""}
          </p>
          <Image
            src={require("@/public/images/storyBook.png")}
            alt=""
            priority
            className="w-4 aspect-square object-fill"
          />
        </div>
        <p className="flex-grow">{content[0]?.text?.slice(0, 100)}...</p>
        <p
          onClick={(e) => {
            e.stopPropagation();
            router.push(
              author?._id === userData?._id
                ? `/user/${userData?.username}/${userData?.email}/${userData?._id}`
                : `/user/${author.username}`
            );
          }}
          className="w-full text-end"
        >
          ~by <span>{author?.username}</span>
        </p>
        <hr />
        <div className="flex gap-3 justify-between items-center">
          <div className="contributions flex gap-1 items-center">
            <p>Contributions</p>
            <p>{contributions?.length}</p>
          </div>
          <div className="flex items-center">
            {contributions?.slice(0, 3)?.map((contribution) => (
              <img
                key={contribution?._id}
                src={contribution.author?.profileImage}
                alt=""
                className="bg-slate-500 w-6 aspect-square shrink-0 -ml-3 rounded-full object-cover"
              />
            ))}
            {contributions?.length > 3 && (
              <div className="bg-slate-500/50 p-1 text-xs shrink-0 aspect-square rounded-full object-cover">
                +{contributions?.length - 3}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryCard;
