"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const GetStarted = () => {
  const containerRef = useRef(null);

  const handleScroll = (e) => {
    const container = containerRef.current;
    if (!container) return;
    const delta = e.deltaY || e.detail || e.wheelDelta;
    const direction = delta > 0 ? "down" : "up";

    // Calculate scroll amount based on direction
    const scrollAmount =
      direction === "up" ? -container.offsetHeight : container.offsetHeight;

    // Perform smooth scroll
    container.scrollTo({
      top: container.scrollTop + scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <main
      ref={containerRef}
      onScroll={() =>
        scroll({
          behavior: "smooth",
        })
      }
      onWheel={handleScroll}
      onTouchStart={(e) => {
        // Record touch start position
        e.stopPropagation();
        e.currentTarget.startTouchY = e.touches[0].clientY;
      }}
      onTouchMove={(e) => {
        e.stopPropagation();
        const touchY = e.touches[0].clientY;
        const deltaY = e.currentTarget.startTouchY - touchY;
        const direction = deltaY > 0 ? "up" : "down";
        handleScroll({
          deltaY: Math.abs(deltaY) * (direction === "up" ? 1 : -1),
        });
        e.currentTarget.startTouchY = touchY;
      }}
      className="overflow-y-hidden fixed inset-0 bg-[#eceff0] max-h-screen"
    >
      <div className="flex h-screen justify-center overflow-hidden relative">
        <div
          id="gs1"
          key="gs1"
          className="md:flex-1 py-4 md:px-10 px-5 md:size-full h-fit size-5/6 rounded-3xl m-auto flex justify-between flex-col gap-4 md:bg-transparent bg-white/50"
        >
          {/* Headline */}
          <div className="space-y-4">
            <h1 className="text-primaryColor font-semibold text-center md:text-3xl text-2xl">
              Welcome to Koalatale
            </h1>
            <p className="text-secondaryColor lg:text-primaryColor/75 text-center md:text-xl">
              Unfold Stories, Create Connections
            </p>
          </div>
          <div className="bg-white md:p-10 p-3 rounded-3xl flex-grow space-y-2">
            <p className="text-center">
              Koalatale is a collaborative stroytelling platform. Write,
              contribute and vote on contributions of fellow writers!
            </p>
            <img
              loading="lazy"
              src={
                "https://cdn.www.wesleyan.org/wesleyanit/wp-content/uploads/whats-your-story-5026.jpg"
              }
              alt=""
              className="w-full aspect-video rounded-lg object-fill"
            />
          </div>
          <Link
            type="button"
            href={"/auth/signup"}
            className="bg-primaryColor text-white md:px-7 md:py-3 p-2 rounded self-center"
          >
            Start Writing Now!
          </Link>
          <p
            type="button"
            className="lg:text-primaryColor text-secondaryColor cursor-pointer text-pretty px-7 py-1 rounded self-center"
          >
            Scroll to know more
          </p>
        </div>
        <div className="flex-1 lg:static absolute inset-0 -z-10">
          <Image
            loading="lazy"
            src={require("@/public/images/gs5.jpg")}
            alt=""
            className="object-fill size-full"
            placeholder="blur"
          />
        </div>
      </div>
      <div className="flex h-screen justify-center overflow-hidden relative">
        <div
          id="gs2"
          key="gs2"
          className="md:flex-1 sm:py-12 md:px-10 px-5 md:size-full size-5/6 rounded-3xl m-auto flex justify-between flex-col gap-4 md:bg-transparent bg-white/50"
        >
          {/* Headline */}
          <div className="space-y-4">
            <h1 className="lg:text-primaryColor text-secondaryColor font-semibold text-center md:text-3xl text-xl">
              Benefits Here
            </h1>
          </div>
          <div className="bg-white sm:p-10 p-3 flex flex-col justify-between size-full items-center rounded-3xl gap-7 flex-grow">
            <div className="p-3 size-full space-y-2 bg-primaryColor/50 rounded-lg ">
              <h3 className="text-xl text-white font-semibold text-center">
                Co-create stories
              </h3>
              <p className="text-white text-center">
                Team up with other writers and weave fantasical tales together.
              </p>
            </div>
            <div className="p-3 size-full space-y-2 bg-primaryColor/50 rounded-lg ">
              <h3 className="text-xl text-white font-semibold text-center">
                Read and be inspired
              </h3>
              <p className="text-white text-center">
                Dive into a world of stories by passionate writers.
              </p>
            </div>
            <div className="p-3 size-full space-y-2 bg-primaryColor/50 rounded-lg ">
              <h3 className="text-xl text-white font-semibold text-center">
                Vote and influence
              </h3>
              <p className="text-white text-center">
                Your voice matters! <br /> Help shape the stories you love.
              </p>
            </div>
          </div>
          <p
            type="button"
            className="lg:text-primaryColor text-secondaryColor cursor-pointer text-pretty px-7 py-1 rounded self-center"
          >
            Scroll to know more
          </p>
        </div>
        <div className="flex-1 lg:static absolute inset-0 -z-10">
          <Image
            loading="lazy"
            src={require("@/public/images/gs8.jpg")}
            alt=""
            className="object-fill size-full"
            placeholder="blur"
          />
        </div>
      </div>
      <div className="flex h-screen justify-center overflow-hidden relative">
        <div
          id="gs3"
          key="gs3"
          className="md:flex-1 py-12 md:px-10 px-5 md:size-full size-5/6 rounded-3xl m-auto flex justify-between flex-col gap-4 sm:bg-transparent md:bg-white/50"
        >
          {/* Headline */}
          <div className="space-y-4">
            <h1 className="lg:text-primaryColor hidden md:block text-secondaryColor font-semibold text-center md:text-3xl text-xl">
              How it works?
            </h1>
          </div>
          <div className="bg-white hidden p-10 md:flex justify-between w-full h-fit items-center rounded-3xl gap-7">
            <div className="p-5 w-full h-60 space-y-2 bg-primaryColor/50 rounded-lg ">
              <p className="text-white text-center">
                Finds a story that sparks your imaginations and start
                contributiong your imagination and start contributing your own
                chapter.
              </p>
            </div>
            <div className="p-5 w-full h-60 space-y-2 bg-primaryColor/50 rounded-lg ">
              <p className="text-white text-center">
                Read and add your unique perspective to ongoing tales.
              </p>
            </div>
            <div className="p-5 w-full h-60 space-y-2 bg-primaryColor/50 rounded-lg ">
              <p className="text-white text-center">
                Vote on your favorite parts to influence the story&lsquo;s
                direction.
              </p>
            </div>
          </div>
          <Link
            type="button"
            href={"/auth/signup"}
            className="bg-primaryColor text-white sm:text-base text-[10px] md:px-7 md:py-3 p-2 rounded self-center"
          >
            Become a part of koalatale community
          </Link>
        </div>
        <div className="flex-1 lg:static absolute inset-0 -z-10">
          <Image
            loading="lazy"
            src={require("@/public/images/gs9.jpg")}
            alt=""
            className="object-fill size-full"
            placeholder="blur"
          />
        </div>
      </div>
    </main>
  );
};

export default GetStarted;
