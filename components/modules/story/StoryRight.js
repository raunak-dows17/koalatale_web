import { generateRandomColor } from "@/utils/randomColor";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const StoryRight = ({
  author,
  isCompleted,
  contributions,
  userData,
  handleComplete,
  isEditing,
  setIsEditing,
  fetchAgain,
  handleUpdate,
  handleDeleteStory,
}) => {
  const uniqueAuthors = new Set();
  const [randomColor, setRandomColor] = useState(null);

  useEffect(() => {
    setRandomColor(generateRandomColor());
  }, []);

  return (
    <div className="bg-white p-5 min-h-full space-y-5 flex flex-col md:rounded-none rounded">
      {userData?._id === author?._id && (
        <div className="flex justify-center items-center size-full gap-2">
          {!isCompleted && (
            <button
              type="button"
              onClick={() => (isEditing ? handleUpdate() : setIsEditing(true))}
              className="px-5 py-1 rounded bg-primaryColor size-full text-secondaryColor"
            >
              {isEditing ? "Save" : "Edit"}
            </button>
          )}
          <button
            type="button"
            onClick={() => {
              if (isEditing) {
                setIsEditing(false);
                fetchAgain();
              } else {
                handleDeleteStory();
              }
            }}
            className="px-5 py-1 rounded bg-red-500 size-full text-secondaryColor"
          >
            {isEditing ? "Dismiss" : "Delete"}
          </button>
        </div>
      )}
      <div className="author">
        Written By
        <Link
          href={
            author?.username === userData?.username
              ? `/user/${userData?.username}/${userData?.email}/${userData?._id}`
              : `/user/${author?.username}`
          }
          className="text-primaryColor font-semibold tracking-wide uppercase"
        >
          ~ {author?.username}
        </Link>
      </div>
      <div className="contributedBy max-h-[400px] overflow-auto">
        Contributors
        <div className="text-primaryColor flex flex-col tracking-wide space-y-1">
          {contributions
            ?.filter((contri) => {
              if (!uniqueAuthors.has(contri?.author?._id)) {
                uniqueAuthors.add(contri?.author?._id);
                return true;
              }
              return false;
            })
            ?.map((contri, index) => (
              <Link
                href={
                  contri?.author?.username === userData?.username
                    ? `/user/${userData?.username}/${userData?.email}/${userData?._id}`
                    : `/user/${contri?.author?.username}`
                }
                key={index}
                className="flex items-center gap-2"
              >
                {" "}
                ~{" "}
                <img
                  src={
                    contri?.author?.profileImage ||
                    `https://dummyimage.com/100x100/${randomColor}/fff.png&text=${contri?.author?.name?.charAt(
                      0
                    )}`
                  }
                  alt=""
                  className="size-5 rounded-full object-cover"
                />{" "}
                {contri?.author?.username}
              </Link>
            ))}
        </div>
      </div>
      {userData?._id === author?._id && (
        <button
          onClick={() => handleComplete()}
          className="px-5 py-1.5 size-full border-primaryColor border-2 rounded"
          type="button"
        >
          {isCompleted ? "Mark as Uncomplete" : "Mark As Complete"}
        </button>
      )}
    </div>
  );
};

export default StoryRight;
