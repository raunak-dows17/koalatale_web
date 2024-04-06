"use client";

import React, { useState } from "react";
import Image from "next/image";
import { authenticateUser } from "@/utils/apis/auth";
import { HiCamera } from "react-icons/hi2";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { FaCheck } from "react-icons/fa6";
import { TokenDetails } from "@/utils/tokendetails/tokeDetails";
import swal from "sweetalert2";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Signup = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    profilePicture: null,
    name: "",
    username: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [usernameValidationError, setUsernameValidationError] = useState(null);
  const [emailValidationError, setEmailValidationError] = useState(null);

  const createImageUrl = (file) => {
    if (!file) return;
    return URL.createObjectURL(file);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "username") {
      if (value?.includes(" ")) {
        setUsernameValidationError("Username cannot contains spaces");
      }
      authenticateUser
        .checkUserName(value)
        .then((data) => setUsernameValidationError(data))
        .catch((err) => console.error(err));
    }
    if (name === "email") {
      authenticateUser
        .checkEmail(value)
        .then((data) => setEmailValidationError(data))
        .catch((err) => console.error(err));
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();

    if (
      !usernameValidationError !== null ||
      usernameValidationError === "Username validated" ||
      emailValidationError !== "Email validated" ||
      !emailValidationError !== null ||
      formData.name !== "" ||
      formData.username !== "" ||
      formData.email !== "" ||
      formData.password !== "" ||
      formData.phoneNumber !== ""
    ) {
      authenticateUser
        .signUp(formData)
        .then((data) => {
          console.log(data);
          TokenDetails.setToken(data?.token);
          swal.fire({
            icon: "success",
            animation: true,
            title: "Registration Completed 🐨",
            text: data?.message,
            confirmButtonColor: "#3B719F",
            confirmButtonText: "Lets Go",
            allowEnterKey,
            allowEscapeKey,
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
              error === "User already exists"
                ? "Login"
                : "Okay will try again!!",
            allowEnterKey,
            allowEscapeKey,
          });
          if (error === "User already exists") {
            router.replace("/auth/login");
          }
        });
    }
  }

  return (
    <main className="w-11/12 h-screen overflow-hidden flex justify-center items-center mx-auto">
      <div className="flex-1 size-full md:py-12 md:sticky md:top-0 fixed inset-0 -z-10">
        <Image
          src={require("@/public/images/signupImage.jpg")}
          alt=""
          priority
          placeholder="blur"
          className="size-full object-fill md:rounded-lg"
        />
      </div>
      <div className="md:flex-1 shrink-0 p-5 md:py-12 flex flex-col rounded-3xl size-full justify-between md:items-center gap-10 space-y-10 md:bg-transparent bg-white/60 overflow-auto">
        <div className="w-full text-center space-y-5">
          <h1 className="text-3xl text-primaryColor">Welcome to Koalatale</h1>
          <p className="text-2xl text-primaryColor/90">
            Start your Koalatale story!!!
          </p>
        </div>
        <form
          action=""
          method="post"
          className="flex size-full flex-col gap-4 items-center justify-center"
          onSubmit={handleSubmit}
        >
          <div className="w-fit relative flex items-center justify-center">
            <Image
              src={
                createImageUrl(formData.profilePicture) ||
                require("@/public/images/gs6.jpg")
              }
              width={150}
              height={150}
              priority
              alt=""
              className="size-32 aspect-square rounded-full"
            />
            <label
              htmlFor="profilePicture"
              className="absolute p-1 rounded-full bottom-0.5 right-0.5 bg-white/50 cursor-pointer"
            >
              <HiCamera className="text-primaryColor" />
              <input
                type="file"
                name="profilePicture"
                accept="image/*"
                id="profilePicture"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    profilePicture: e.target.files[0],
                  })
                }
                className="hidden"
              />
            </label>
          </div>
          <div className="w-full flex flex-col gap-1">
            <label htmlFor="name" className="text-primaryColor">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="p-3 rounded-xl"
              value={formData.name}
              onChange={handleChange}
              placeholder="Koala"
            />
          </div>
          <div className="w-full flex flex-col gap-1">
            <label htmlFor="username" classUsername="text-primaryColor">
              Username
            </label>
            <div
              className={`p-3 rounded-xl flex items-center bg-white ${
                formData.username !== "" &&
                usernameValidationError !== null &&
                usernameValidationError !== "Username validated"
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
              {formData.username !== "" &&
                usernameValidationError !== null &&
                usernameValidationError === "Username validated" && (
                  <FaCheck className="text-primaryColor text-base" />
                )}
            </div>
            {formData.username !== "" &&
              usernameValidationError &&
              usernameValidationError !== "Username validated" && (
                <div className="flex items-center text-red-500">
                  <IoMdClose /> {usernameValidationError}
                </div>
              )}
          </div>
          <div className="w-full flex flex-col gap-1">
            <label htmlFor="email" className="text-primaryColor">
              Email
            </label>
            <div
              className={`p-3 rounded-xl flex items-center bg-white ${
                formData.email !== "" &&
                emailValidationError !== null &&
                emailValidationError !== "Email validated"
                  ? "border-red-500"
                  : "border-transparent"
              } border`}
            >
              <input
                type="email"
                name="email"
                id="email"
                className="w-full"
                value={formData.email}
                onChange={handleChange}
                placeholder="koala2424@email.com"
              />
              {formData.email !== "" &&
                emailValidationError !== null &&
                emailValidationError === "Email validated" && (
                  <FaCheck className="text-primaryColor text-base" />
                )}
            </div>
            {formData.email !== "" &&
              emailValidationError &&
              emailValidationError !== "Email validated" && (
                <div className="flex items-center text-red-500">
                  <IoMdClose /> {emailValidationError}
                </div>
              )}
          </div>
          <div className="w-full flex flex-col gap-1">
            <label htmlFor="phoneNumber" className="text-primaryColor">
              Phone Number
            </label>
            <input
              type="number"
              name="phoneNumber"
              id="phoneNumber"
              className="p-3 rounded-xl"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="1234567890"
            />
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
              usernameValidationError === null ||
              usernameValidationError !== "Username validated" ||
              emailValidationError !== "Email validated" ||
              emailValidationError === null ||
              formData.name === "" ||
              formData.username === "" ||
              formData.email === "" ||
              formData.password === "" ||
              formData.phoneNumber === ""
            }
            type="submit"
            className="text-white w-full flex justify-center items-center py-3 rounded-xl bg-primaryColor disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Join Us
          </button>
        </form>
        <p className="">
          Already Joinned Koalatale?{" "}
          <Link href={"/auth/login"} className="text-primaryColor">
            Login
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Signup;