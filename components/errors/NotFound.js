"use client";

import { useRouter } from "next/navigation";
import React from "react";
import Image from "next/image";

function BackButton({ children }) {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="justify-center px-8 py-3.5 mt-12 text-lg leading-5 text-secondaryColor capitalize whitespace-nowrap bg-primaryColor rounded font-[450] max-md:px-5 max-md:mt-10"
    >
      {children}
    </button>
  );
}

function NotFound() {
  return (
    <main className="flex flex-col justify-center h-screen gap-2 w-full items-center pb-12 bg-white">
      <header>
        <Image
          src={require("@/public/erros/404.jpg")}
          alt="Not Found"
          decoding="auto"
          className="size-full aspect-square max-w-[390px] rounded-xl"
        />
      </header>
      <section>
        <h1 className="text-5xl whitespace-nowrap text-center text-slate-800 max-md:text-4xl">
          Oh No! 404
        </h1>
        <p className="mt-1 text-2xl font-light text-center text-gray-400 max-w-[538px]">
          Oops! That page seems to have taken a detour. Let us guide you back to
          your destination.
        </p>
      </section>
      <footer>
        <BackButton>Back</BackButton>
      </footer>
    </main>
  );
}

export default NotFound;
