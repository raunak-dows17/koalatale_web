"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const StoryCard = ({ author, content, contributions, title, _id, votes }) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/story/${title}/${author?.username}/${_id}`)}
      className="bg-white p-5 rounded-lg size-full cursor-pointer"
    >
      <div className="flex flex-col gap-3 justify-between size-full">
        <div className="flex justify-between items-center">
          <p className="title">{title || ""}</p>
          <Image
            src={require("@/public/images/storyBook.png")}
            alt=""
            priority
            className="w-4 aspect-square object-fill"
          />
        </div>
        <p className="flex-grow">{content[0]?.text.slice(0, 100)}...</p>
        <p
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/user/${author.username}`);
          }}
          className="w-full text-end"
        >
          ~by <span>{author?.username}</span>
        </p>
        <hr />
        <div className="flex gap-2 justify-between items-center">
          <div className="contributions flex gap-2 items-center">
            <p>Contributions</p>
            <p>{contributions?.length}</p>
          </div>
          <div className="flex items-center">
            {contributions?.slice(0, 4)?.map((contribution) => (
              <img
                key={contribution?._id}
                src={contribution.author?.profileImage}
                alt=""
                className="bg-slate-500 w-4 aspect-square -ml-2 rounded-full object-cover"
              />
            ))}
            {contributions.length > 3 && (
              <div className="bg-slate-500 w-4 aspect-square -ml-2 rounded-full object-cover">
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
