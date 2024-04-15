"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { usePersonalData } from "@/utils/hooks/userData";
import { IoIosMenu } from "react-icons/io";
import SideNavbar from "../sidenavbar/SideNavbar";
import Loader from "../loader/Loader";
import { generateRandomColor } from "@/utils/randomColor";

const Navbar = ({ hasToken }) => {
  const { loading, error, userData } = usePersonalData();
  const [randomColor, setRandomColor] = useState(null);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    setRandomColor(generateRandomColor());
  }, []);

  return (
    <nav
      className={`w-full ${hasToken ? "block" : "hidden"}
       py-2 rounded-b-lg bg-primaryColor/35`}
    >
      <div className="flex justify-between items-center w-11/12 mx-auto">
        <div className="flex justify-center items-center gap-5">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="text-2xl lg:hidden block"
            type="button"
          >
            <IoIosMenu />
          </button>
          <Image
            src={require("@/public/logo/text-logo.png")}
            alt=""
            priority
            className="object-fill w-48 aspect-[4/1]"
          />
        </div>
        <div className="flex aspect-square w-12 justify-center items-center overflow-hidden rounded-full">
          {loading ? (
            <Loader />
          ) : (
            <img
              src={
                userData?.profileImage ||
                `https://dummyimage.com/100x100/${randomColor}/fff.png&text=${userData?.name.charAt(
                  0
                )}`
              }
              alt=""
              className="size-full object-cover"
            />
          )}
        </div>
      </div>
      <div
        onClick={() => setShowMenu(!showMenu)}
        className={`lg:hidden block ${
          showMenu ? "scale-x-100" : "scale-x-0 -translate-x-full"
        } transform transition-all duration-300 ease-in-out fixed inset-0 size-full`}
      >
        <div
          className="h-full md:w-1/3 sm:w-1/2 w-5/6"
          onClick={(e) => e.stopPropagation()}
        >
          <SideNavbar
            hasToken={hasToken}
            showMenu={showMenu}
            setShowMenu={setShowMenu}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
