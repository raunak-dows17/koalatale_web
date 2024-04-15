"use client";

import { useVotes } from "@/utils/hooks/useVote";
import { usePersonalData } from "@/utils/hooks/userData";
import { generateRandomColor } from "@/utils/randomColor";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { IoCheckmark, IoHeart, IoHeartOutline } from "react-icons/io5";
import Moment from "react-moment";
import Swal from "sweetalert2";

const ContributionCard = ({
  author,
  content,
  isMerged,
  storyFor,
  voteCount,
  votes,
  _id,
  updatedAt,
  onClick,
}) => {
  const router = useRouter();
  const { vote, error, handleVote } = useVotes();
  const { userData } = usePersonalData();
  const [randomColor, setRandomColor] = useState(null);

  useEffect(() => {
    setRandomColor(generateRandomColor());
  }, []);

  error &&
    Swal.fire({
      title: "Error",
      text: error?.message || "Something went wrong",
      color: "#3B719F",
    });

  return (
    <div
      onDoubleClick={() => {
        handleVote(_id);
      }}
      onClick={onClick}
      className={`size-full p-5 ${
        isMerged ? "bg-[#d2daec] border-2 border-[#2d4785]" : "bg-white"
      } rounded-md cursor-pointer`}
    >
      <div className="flex justify-between items-center">
        {content} {isMerged && <IoCheckmark />}
      </div>
      <div className="w-full flex justify-between items-center gap-1">
        <Moment fromNow>{updatedAt}</Moment>
        {author?.profileImage || author?.username ? (
          <div className="flex items-center gap-1">
            <span>~by</span>
            <img
              src={
                author?.profileImage ||
                `https://dummyimage.com/100x100/${randomColor}/fff.png&text=${author?.name?.charAt(
                  0
                )}`
              }
              alt=""
              className="size-5 rounded-full object-cover"
            />
            <p>{author?.username}</p>
          </div>
        ) : null}
      </div>
      <hr />
      <div className="flex justify-between items-center">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleVote(_id);
          }}
          className="voteCount flex items-center gap-1"
        >
          <span className="font-semibold text-lg">
            {votes?.some((vote) => vote._id === userData?._id) ||
            vote?.message === "vote removed successfully" ? (
              <IoHeart className="text-red-500 text-xl" />
            ) : (
              <IoHeartOutline className=" text-xl" />
            )}
          </span>{" "}
          {voteCount || vote?.voteCount || 0}
        </button>
        <div className="flex items-center">
          {votes?.map((vote, index) => (
            <img
              key={index}
              src={vote}
              alt=""
              className="flex justify-center items-center -mx-4 w-8 rounded-full aspect-square"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContributionCard;
