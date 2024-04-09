"use client";

import React, { useEffect, useState } from "react";
import SkeletonLoader from "../loader/SkeletonLoader";
import { generateRandomColor } from "@/utils/randomColor";
import { usePathname, useRouter } from "next/navigation";
import { IoArchive, IoBook, IoHome } from "react-icons/io5";
import { usePersonalData } from "@/utils/hooks/userData";

const SideNavbar = ({ showMenu, setShowMenu, hasToken }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { userData, loading, error } = usePersonalData();
  const [randomColor, setRandomColor] = useState(null);

  useEffect(() => {
    setRandomColor(generateRandomColor());
  }, []);

  return (
    <div
      className={`size-full sticky lg:top-16 inset-y-0 bg-white lg:rounded-none rounded-r-xl overflow-hidden`}
    >
      <button
        type="button"
        onClick={() =>
          router.push(
            `/user/${userData?.username}/${userData?.email}/${userData?._id}`
          )
        }
        className="relative flex h-1/3 w-full justify-end flex-col p-5 gap-2 bg-black/25"
      >
        <div className="-z-10 absolute inset-0 overflow-hidden">
          {loading ? (
            <SkeletonLoader />
          ) : (
            <img
              src={
                userData?.profileImage ||
                `https://dummyimage.com/100x100/${randomColor}/fff.png&text=${userData?.name?.charAt(
                  0
                )}`
              }
              alt=""
              className="size-full object-cover"
            />
          )}
        </div>
        <img
          src={
            userData?.profileImage ||
            `https://dummyimage.com/100x100/${randomColor}/fff.png&text=${userData?.name?.charAt(
              0
            )}`
          }
          className="rounded-full w-16 aspect-square object-cover"
        />
        <p className="text-white">{userData?.name || ""}</p>
        <p className="text-white">{userData?.username || ""}</p>
      </button>
      <ul>
        <li
          onClick={() => router.push("/")}
          className={`flex items-center gap-2 cursor-pointer ${
            pathname === "/" ? "bg-primaryColor/25" : "bg-transparent"
          } text-primaryColor px-5 py-3 rounded-lg hover:bg-primaryColor/25`}
        >
          <IoHome />
          HomePage
        </li>
        <li
          onClick={() => router.push("/story/my-stories")}
          className={`flex items-center gap-2 cursor-pointer ${
            pathname === "/story/my-stories"
              ? "bg-primaryColor/25"
              : "bg-transparent"
          } text-primaryColor px-5 py-3 rounded-lg hover:bg-primaryColor/25`}
        >
          <IoBook />
          My Stories
        </li>
        <li
          onClick={() => router.push("/contributions/my-contributions")}
          className={`flex items-center gap-2 cursor-pointer ${
            pathname === "/contributions/my-contributions"
              ? "bg-primaryColor/25"
              : "bg-transparent"
          } text-primaryColor px-5 py-3 rounded-lg hover:bg-primaryColor/25`}
        >
          <IoArchive />
          Contributions
        </li>
      </ul>
    </div>
  );
};

export default SideNavbar;
