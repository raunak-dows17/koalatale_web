"use client";

import { StoryData } from "@/utils/apis/story";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Swal from "sweetalert2";

const CreateStory = () => {
  const [storyData, setStoryData] = useState({
    title: "",
    content: "",
  });
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setStoryData({ ...storyData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (storyData?.title || storyData?.content) {
      Swal.fire({
        icon: "question",
        text: "Are you want to post this story",
        confirmButtonText: "Yes Post",
        cancelButtonText: "Edit More",
        showCancelButton: true,
      }).then((result) => {
        result.isConfirmed
          ? StoryData.postStory(storyData)
              .then((data) => {
                Swal.fire({
                  icon: "success",
                  title: data?.message,
                  text: "Wait for the community reponse on your story",
                  showConfirmButton: false,
                  timer: 1500,
                }).then(() => router.push("/story/my-stories"));
              })
              .catch((err) =>
                Swal.fire({
                  title: "Erro",
                  text: err.message || "Something went wrong",
                  icon: "error",
                  showConfirmButton: false,
                  timer: 1500,
                })
              )
          : Swal.close();
      });
    }
  };

  return (
    <div className="p-5">
      <form
        onSubmit={handleSubmit}
        action=""
        method="post"
        className="size-full flex flex-col gap-3"
      >
        <input
          type="text"
          name="title"
          id="title"
          value={storyData?.title}
          onChange={handleChange}
          placeholder="Enter the title of the story"
          className="title w-full px-3 py-3 rounded font-semibold text-xl text-primaryColor border-2 border-primaryColor focus:outline-none"
        />
        <textarea
          name="content"
          id="content"
          value={storyData?.content}
          onChange={handleChange}
          rows={19}
          placeholder="Enter the content of the story"
          className="title size-full px-3 py-3 flex-grow rounded border-2 border-primaryColor focus:outline-none"
        ></textarea>
        <button
          disabled={!storyData?.title || !storyData?.content}
          className="px-5 py-2 rounded size-full disabled:opacity-50 bg-primaryColor text-secondaryColor"
          type="submit"
        >
          Post Story
        </button>
      </form>
    </div>
  );
};

export default CreateStory;
