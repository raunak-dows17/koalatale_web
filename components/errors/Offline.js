import React from "react";
import Image from "next/image";

const Offline = () => {
  return (
    <section className="flex flex-col items-center gap-2 justify-center h-screen max-w-[538px] max-h-screen py-24 mx-auto px-5">
      <Image
        src={require("@/public/erros/offline.jpg")}
        alt="Connection lost"
        width={100}
        height={100}
        decoding="auto"
        className="size-full aspect-square max-w-[390px] rounded-xl"
      />
      <h1 className="text-5xl whitespace-nowrap text-slate-800 md:text-4xl">
        {" "}
        Connection Lost!{" "}
      </h1>
      <p className="self-stretch mt-1 w-full text-2xl font-light text-center text-slate-800 text-opacity-50">
        {" "}
        Oops! Looks like our connection got lost. Sorry, it looks like
        you&apos;re off the grid.{" "}
      </p>
      <button
        onClick={() => window.location.reload()}
        className="justify-center px-8 py-3.5 text-lg leading-5 text-secondaryColor capitalize whitespace-nowrap bg-primaryColor rounded font-[450] md:px-5 md:mt-10"
        tabIndex="0"
      >
        {" "}
        Reload{" "}
      </button>
    </section>
  );
};

export default Offline;
