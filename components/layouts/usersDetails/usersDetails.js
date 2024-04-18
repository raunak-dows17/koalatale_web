"use client";

import ContributionCard from "@/components/modules/contribution/contributionCard";
import SkeletonLoader from "@/components/modules/loader/SkeletonLoader";
import StoryCard from "@/components/modules/story/StoryCard";
import { authenticateUser } from "@/utils/apis/auth";
import { UserData } from "@/utils/apis/usersData";
import { usePersonalData, userDetail } from "@/utils/hooks/userData";
import { generateRandomColor } from "@/utils/randomColor";
import { TokenDetails } from "@/utils/tokendetails/tokeDetails";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaCircleExclamation } from "react-icons/fa6";
import { IoCamera, IoEye, IoEyeOff } from "react-icons/io5";
import Swal from "sweetalert2";

const UsersDetails = ({ username, _id }) => {
  const { userData, loading, error } = usePersonalData();
  const { usersData } = userDetail(_id ? null : username);
  const [randomColor, setRandomColor] = useState(null);
  const router = useRouter();

  // Editing
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    profilePicture: null,
    name: "",
    phoneNumber: "",
  });
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState({
    oldPassword: false,
    newPassword: false,
  });
  const [changedPassword, setChangedPassword] = useState({
    oldPassword: "",
    newPassword: "",
  });

  useEffect(() => {
    setRandomColor(generateRandomColor());
  }, []);

  // Update UserProfile =================================================================

  useEffect(() => {
    setEditedData({
      ...editedData,
      name: userData?.name,
      phoneNumber: userData?.phoneNumber,
    });
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData({ ...editedData, [name]: value });
  };

  const handleImagechange = (e) => {
    setEditedData({ ...editedData, profilePicture: e.target.files[0] });
  };

  const fileToURL = (file) => {
    return URL.createObjectURL(file);
  };

  const handleUpadteProfile = () => {
    UserData.updateUserInfo(editedData)
      .then((data) => {
        Swal.fire({
          icon: "success",
          title: data?.message,
        });
      })
      .catch((err) => {
        Swal.fire({
          title: "Error",
          icon: "error",
          text: err?.message || "Something went wrong",
          confirmButtonText: "Close",
        });
      })
      .finally(() => window.location.reload());
  };

  // Update User Profile =================================================================

  // Update Password =================================================================

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setChangedPassword({
      ...changedPassword,
      [name]: value,
    });
  };

  const handlePassWordSubmit = () => {
    authenticateUser
      .changePassword(changedPassword)
      .then((data) => {
        Swal.fire({
          icon: "success",
          title: data?.message,
          timer: 2000,
        });
      })
      .catch((err) =>
        Swal.fire({
          title: "Error",
          icon: "error",
          text: err?.message || "Something went wrong",
          timer: 2000,
        })
      );
  };

  // Update Password =================================================================

  return (
    <div className="grid grid-row-2 gap-7 size-full p-5">
      <div className="col-span-2 size-full bg-primaryColor/20 rounded-2xl overflow-hidden transition-all duration-300">
        {loading ? (
          <SkeletonLoader />
        ) : (
          <div className="flex md:flex-row flex-col p-5 gap-5">
            <div className="flex flex-col justify-between gap-3 flex-1">
              <div className="flex-wrap flex gap-2">
                {_id ? (
                  <div className="relative">
                    <img
                      src={
                        editedData?.profilePicture
                          ? fileToURL(editedData?.profilePicture)
                          : userData?.profileImage ||
                            `https://dummyimage.com/100x100/${randomColor}/fff.png&text=${userData?.name?.charAt(
                              0
                            )}`
                      }
                      alt=""
                      className={`${
                        isEditing ? "w-16" : "w-12"
                      } transition-all ease-in-out duration-300 aspect-square rounded-full object-cover`}
                    />
                    {isEditing && (
                      <label
                        htmlFor="profilePicture"
                        className="absolute right-0.5 cursor-pointer bottom-0.5 p-0.5 bg-white/50 text-primaryColor rounded-full"
                      >
                        <IoCamera />
                        <input
                          type="file"
                          name="profilePicture"
                          id="profilePicture"
                          onChange={handleImagechange}
                          className="hidden"
                          accept="image/*"
                        />
                      </label>
                    )}
                  </div>
                ) : (
                  <img
                    src={
                      usersData?.profileImage ||
                      `https://dummyimage.com/100x100/${randomColor}/fff.png&text=${usersData?.name?.charAt(
                        0
                      )}`
                    }
                    alt=""
                    className="w-12 aspect-square rounded-full object-cover -z-10"
                  />
                )}
                {_id ? (
                  <div>
                    <p className="text-pretty">{userData?.username}</p>{" "}
                    {isEditing ? (
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={editedData?.name}
                        onChange={handleChange}
                        className="text-primaryColor text-pretty px-2 py-1 font-semibold border-b-2 border-b-primaryColor bg-transparent focus:outline-none"
                      />
                    ) : (
                      <p className="text-primaryColor text-pretty font-semibold">
                        {userData?.name}
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="">
                    <p className="text-pretty">{usersData?.username}</p>{" "}
                    <p className="text-primaryColor text-pretty font-semibold">
                      {usersData?.name}
                    </p>
                  </div>
                )}
              </div>
              {_id ? (
                <div>
                  <p className="text-pretty">Contact Details</p>{" "}
                  {isEditing ? (
                    <input
                      type="number"
                      name="phoneNumber"
                      id="phoneNumber"
                      value={editedData?.phoneNumber}
                      onChange={handleChange}
                      className="text-primaryColor text-pretty px-2 py-1 font-semibold border-b-2 border-b-primaryColor bg-transparent focus:outline-none"
                    />
                  ) : (
                    <p className="text-primaryColor text-pretty font-medium">
                      {userData?.phoneNumber}
                    </p>
                  )}
                  <p className="text-primaryColor text-pretty font-medium">
                    {userData?.email}
                  </p>
                </div>
              ) : (
                <div className="">
                  <p className="text-pretty">Email</p>{" "}
                  <p className="text-primaryColor text-pretty font-semibold">
                    {usersData?.email}
                  </p>
                </div>
              )}
              {_id && (
                <div className="size-full flex items-end gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      isEditing ? handleUpadteProfile() : setIsEditing(true);
                    }}
                    className="bg-primaryColor text-secondaryColor flex-grow px-7 h-fit py-2 rounded"
                  >
                    {isEditing ? "Save Information" : "Edit Profile Info"}
                  </button>
                  {isEditing && (
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="border-primaryColor rounded px-5 py-2 h-fit border"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              )}
            </div>
            {_id ? (
              <div className="security flex-1 flex flex-col justify-between gap-3 transition-all duration-300">
                <div className="flex flex-col gap-3">
                  <div className="title text-primaryColor font-semibold text-xl">
                    Security
                  </div>
                  {_id && (
                    <div className="size-full space-y-4 transition-all duration-300">
                      <div
                        className={`transform ${
                          isChangingPassword
                            ? "translate-y-0 scale-y-100 h-[55%]"
                            : "-translate-y-1/2 scale-y-0 h-0"
                        } transition-all duration-300 ease-in-out passwords space-y-3`}
                      >
                        <div className="text-primaryColor flex text-pretty px-2 py-1 font-semibold border-b-2 border-b-primaryColor">
                          <input
                            type={
                              isPasswordVisible.oldPassword
                                ? "text"
                                : "password"
                            }
                            name="oldPassword"
                            id="oldPassword"
                            value={changedPassword.oldPassword}
                            onChange={handlePasswordChange}
                            placeholder="Old Password"
                            className="flex-grow bg-transparent focus:outline-none"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setIsPasswordVisible({
                                ...isPasswordVisible,
                                oldPassword: !isPasswordVisible.oldPassword,
                              })
                            }
                            className="text-primaryColor"
                          >
                            {isPasswordVisible.oldPassword ? (
                              <IoEyeOff />
                            ) : (
                              <IoEye />
                            )}
                          </button>
                        </div>
                        <div className="text-primaryColor flex text-pretty px-2 py-1 font-semibold border-b-2 border-b-primaryColor">
                          <input
                            type={
                              isPasswordVisible.newPassword
                                ? "text"
                                : "password"
                            }
                            name="newPassword"
                            id="newPassword"
                            value={changedPassword.newPassword}
                            onChange={handlePasswordChange}
                            placeholder="New Password"
                            className="flex-grow bg-transparent focus:outline-none"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setIsPasswordVisible({
                                ...isPasswordVisible,
                                newPassword: !isPasswordVisible.newPassword,
                              })
                            }
                            className="text-primaryColor"
                          >
                            {isPasswordVisible.newPassword ? (
                              <IoEyeOff />
                            ) : (
                              <IoEye />
                            )}
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          disabled={
                            isChangingPassword &&
                            (!changedPassword.newPassword ||
                              !changedPassword.oldPassword)
                          }
                          onClick={() => {
                            isChangingPassword
                              ? handlePassWordSubmit()
                              : setIsChangingPassword(true);
                          }}
                          className="bg-primaryColor text-secondaryColor flex-grow disabled:opacity-50 disabled:cursor-not-allowed px-7 py-2 rounded"
                        >
                          Change Password
                        </button>
                        {isChangingPassword && (
                          <button
                            type="button"
                            onClick={() => setIsChangingPassword(false)}
                            className="border-primaryColor rounded px-5 py-2 border"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    Swal.fire({
                      icon: "question",
                      title: "Are you sure?",
                      text: "Are you sure you want to logout?",
                      showCancelButton: true,
                      confirmButtonText: "Logout",
                      confirmButtonColor: "red",
                      cancelButtonText: "Close",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        TokenDetails.removeToken();
                        window.location.replace("/auth/login");
                      } else {
                        Swal.close();
                      }
                    });
                  }}
                  className="bg-red-500 px-7 py-2 rounded logout text-secondaryColor"
                >
                  Logout
                </button>
              </div>
            ) : null}
          </div>
        )}
      </div>
      <div className="size-full sm:col-span-1 col-span-2 bg-primaryColor/20 rounded-2xl overflow-hidden">
        {loading ? (
          <SkeletonLoader />
        ) : (
          <div className="flex flex-col gap-3 p-5">
            <h3 className="text-2xl flex items-center justify-between">
              {_id ? "My " : `${username}'s `}Stories
              <span className="text-primaryColor font-bold">
                {_id ? userData?.stories?.length : usersData?.stories?.length}
              </span>
            </h3>
            <div className="grid size-full grid-cols-1 gap-2 overflow-y-auto overflow-x-hidden">
              {_id ? (
                userData?.stories?.length === 0 ? (
                  <div className="flex size-full justify-center items-center gap-2 text-red-500 text-base text-pretty">
                    <FaCircleExclamation /> <span> No Stories By You</span>
                  </div>
                ) : (
                  userData?.stories?.map((story) => (
                    <StoryCard {...story} key={story._id} />
                  ))
                )
              ) : usersData?.stories?.length === 0 ? (
                <div className="flex size-full justify-center items-center gap-2 text-red-500 text-base text-pretty">
                  <FaCircleExclamation /> <span> No Stories By {username}</span>
                </div>
              ) : (
                usersData?.stories?.map((story) => (
                  <StoryCard {...story} key={story._id} />
                ))
              )}
            </div>
          </div>
        )}
      </div>
      <div className="size-full sm:col-span-1 col-span-2 bg-primaryColor/20 rounded-2xl overflow-hidden">
        {loading ? (
          <SkeletonLoader />
        ) : (
          <div className="flex flex-col gap-3 p-5">
            <h3 className="text-2xl flex items-center justify-between">
              {_id ? "My " : `${username}'s `}Contributions
              <span className="text-primaryColor font-bold">
                {_id
                  ? userData?.contributions?.length
                  : usersData?.contributions?.length}
              </span>
            </h3>
            <div className="grid size-full grid-cols-1 gap-2 overflow-y-auto overflow-x-hidden">
              {_id ? (
                userData?.contributions.length === 0 ? (
                  <div className="flex size-full justify-center items-center gap-2 text-red-500 text-base text-pretty">
                    <FaCircleExclamation />{" "}
                    <span> No Contributions By You</span>
                  </div>
                ) : (
                  userData?.contributions?.map((contribution) => (
                    <ContributionCard
                      {...contribution}
                      key={contribution._id}
                    />
                  ))
                )
              ) : usersData?.contributions?.length === 0 ? (
                <div className="flex size-full justify-center items-center gap-2 text-red-500 text-base text-pretty">
                  <FaCircleExclamation />{" "}
                  <span> No Contributions By {username}</span>
                </div>
              ) : (
                usersData?.contributions?.map((contribution) => (
                  <ContributionCard {...contribution} key={contribution._id} />
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersDetails;
