import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoLogoGithub, IoLogoInstagram, IoLogoLinkedin } from "react-icons/io5";

const Footer = () => {
  return (
    <footer className="border-t-2 bg-gray-100 border-primaryColor">
      <div className="w-11/12 mx-auto py-4 flex justify-between md:items-center gap-2 md:flex-row flex-col">
        <div className="flex gap-1 items-end whitespace-nowrap">
          Welcome to
          <Link href={"/"}>
            <Image
              src={require("@/public/logo/text-logo.png")}
              alt=""
              className="aspect-[4/1] w-40 object-fill"
            />
          </Link>
        </div>
        <p>
          Designed and Developed By{" "}
          <Link
            href={"https://raunak-pandey-portfolio.vercel.app/"}
            target="_blank"
            className="text-primaryColor whitespace-nowrap underline underline-offset-4"
          >
            Raunak Pandey
          </Link>{" "}
          with ❤️
        </p>
        <div className="profiles flex items-center gap-2">
          <Link
            href={"https://www.linkedin.com/in/raunak-pandey-93b92a224/"}
            target="_blank"
            className="border-4 border-primaryColor/50 text-primaryColor p-1.5 text-xl rounded-full"
          >
            <IoLogoLinkedin />
          </Link>
          <Link
            href={"https://github.com/raunak-dows17"}
            target="_blank"
            className="border-4 border-primaryColor/50 text-primaryColor p-1.5 text-xl rounded-full"
          >
            <IoLogoGithub />
          </Link>
          <Link
            href={"https://www.instagram.com/raunak_pandey_1710/"}
            target="_blank"
            className="border-4 border-primaryColor/50 text-primaryColor p-1.5 text-xl rounded-full"
          >
            <IoLogoInstagram />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
