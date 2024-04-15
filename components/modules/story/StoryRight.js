import { usePersonalData } from "@/utils/hooks/userData";
import Link from "next/link";
import React from "react";

const StoryRight = ({ author, contributions }) => {
  const { userData } = usePersonalData();

  const uniqueAuthors = new Set();

  return (
    <div className="bg-white size-full p-5 min-h-full space-y-5">
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
          ~{author?.username}
        </Link>
      </div>
      <div className="contributedBy">
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
                ~
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
    </div>
  );
};

export default StoryRight;
