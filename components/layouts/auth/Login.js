"use client";

import React, { useState } from "react";
import Image from "next/image";
import { authenticateUser } from "@/utils/apis/auth";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { FaCheck } from "react-icons/fa6";
import { TokenDetails } from "@/utils/tokendetails/tokeDetails";
import swal from "sweetalert2";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [usernameValidationError, setUsernameValidationError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "username") {
      if (value?.includes(" ")) {
        setUsernameValidationError("Username cannot contains spaces");
      }
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();

    if (
      usernameValidationError !== null ||
      formData.username !== "" ||
      formData.password !== ""
    ) {
      authenticateUser
        .login(formData)
        .then((data) => {
          console.log(data);
          TokenDetails.setToken(data?.token);
          swal.fire({
            icon: "success",
            animation: true,
            title: "Login Successfully 🐨",
            text: data?.message,
            confirmButtonColor: "#3B719F",
            confirmButtonText: "Lets Go",
            allowEnterKey: true,
            allowEscapeKey: true,
          });
          router.replace("/");
        })
        .catch((error) => {
          console.error(error);
          swal.fire({
            title: "Cannot register you 🐨",
            animation: true,
            text:
              error?.message ||
              error ||
              "Something went wrong please try after sometime",
            icon: "error",
            confirmButtonColor: "#3B719F",
            confirmButtonText:
              error?.message === "User not found"
                ? "Signup"
                : "Okay will try again!!",
            allowEnterKey: true,
            allowEscapeKey: true,
          });
          if (error?.message === "User not found") {
            router.replace("/auth/signup");
          }
        });
    }
  }

  return (
    <main className="w-11/12 h-screen overflow-hidden flex justify-center items-center mx-auto">
      <div className="flex-1 size-full md:py-12 md:sticky md:top-0 fixed inset-0 -z-10">
        <Image
          src={require("@/public/images/loginImage.jpg")}
          alt=""
          priority
          placeholder="blur"
          className="size-full object-fill md:rounded-lg"
        />
      </div>
      <div className="md:flex-1 p-5 md:py-12 md:m-0 my-12 flex flex-col rounded-3xl w-full md:h-full justify-between items-center gap-10 md:bg-transparent bg-white/80 overflow-auto">
        <div className="w-full text-center space-y-5">
          <h1 className="text-3xl text-primaryColor">
            Welcome Back to Koalatale
          </h1>
          <p className="text-2xl text-primaryColor/90">
            Koala is hppy to see you again!!!
          </p>
        </div>
        <form
          action=""
          method="post"
          className="flex size-full flex-col gap-4 items-center justify-center"
          onSubmit={handleSubmit}
        >
          <div className="w-full flex flex-col gap-1">
            <label htmlFor="username" classUsername="text-primaryColor">
              Username
            </label>
            <div
              className={`p-3 rounded-xl flex items-center bg-white ${
                formData.username !== "" && usernameValidationError !== null
                  ? "border-red-500"
                  : "border-transparent"
              } border`}
            >
              <input
                type="text"
                name="username"
                id="username"
                className="w-full"
                value={formData.username}
                onChange={handleChange}
                placeholder="koala@2424"
              />
              {formData.username !== "" && usernameValidationError === null && (
                <FaCheck className="text-primaryColor text-base" />
              )}
            </div>
            {formData.username !== "" && usernameValidationError && (
              <div className="flex items-center text-red-500">
                <IoMdClose /> {usernameValidationError}
              </div>
            )}
          </div>
          <div className="w-full flex flex-col gap-1">
            <label htmlFor="password" className="text-primaryColor">
              Password
            </label>
            <div className="p-3 rounded-xl flex items-center bg-white">
              <input
                type={isPasswordVisible ? "text" : "password"}
                name="password"
                id="password"
                className="w-full"
                value={formData.password}
                onChange={handleChange}
                placeholder="Koala"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                className="text-primaryColor"
              >
                {isPasswordVisible ? <IoEyeOff /> : <IoEye />}
              </button>
            </div>
          </div>
          <button
            disabled={
              formData.username === "" ||
              formData.password === "" ||
              usernameValidationError === null
            }
            type="submit"
            className="text-white w-full flex justify-center items-center py-3 rounded-xl bg-primaryColor disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Login
          </button>
        </form>
        <p className="">
          Never Joinned Koalatale?{" "}
          <Link href={"/auth/signup"} className="text-primaryColor">
            Join Us
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
