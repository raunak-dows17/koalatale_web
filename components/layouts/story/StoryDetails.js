"use client";

import ContributionCard from "@/components/modules/contribution/contributionCard";
import LinearLoader from "@/components/modules/loader/linearLoader";
import StoryRight from "@/components/modules/story/StoryRight";
import { handleAddContribution } from "@/utils/apis/contributions";
import { StoryData } from "@/utils/apis/story";
import { useStory } from "@/utils/hooks/storyData";
import { usePersonalData } from "@/utils/hooks/userData";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";

const StoryDetails = ({ _id }) => {
  const { story, loading, error, fetchAgain } = useStory(_id);
  const { userData } = usePersonalData();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditiedTitle] = useState("");
  const [editedContent, setEditedContent] = useState([]);
  const [newContent, setNewContent] = useState("");
  const router = useRouter();

  const [contributionContent, setContributionContent] = useState({
    content: "",
  });

  useEffect(() => {
    setEditiedTitle(story?.title);
    setEditedContent(story?.content || []);
  }, [story]);

  const addNewContent = () => {
    if (newContent.trim() !== "") {
      setEditedContent([
        ...editedContent,
        { text: newContent, author: story?.author },
      ]);
      setNewContent("");
    }
  };

  const handleUpdate = () => {
    StoryData.updateStory(_id, editedTitle, editedContent)
      .then((data) => {
        Swal.fire({
          text: data?.message,
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        })
          .then(() => fetchAgain())
          .then(() => setIsEditing(false));
      })
      .catch((err) =>
        Swal.fire({
          text: err?.message || "Something went wrong",
          icon: "error",
          showConfirmButton: false,
          timer: 1500,
        })
      );
  };

  const handleStoryMerge = (contributionId) => {
    if (userData?._id !== story?.author?._id) {
      return;
    }

    Swal.fire({
      icon: "question",
      title: "Are you sure",
      text: story?.contributions.find(
        (contribution) => contribution._id === contributionId
      )?.isMerged
        ? "Are you sure you want to remove this contribution"
        : "Are you sure you want to merge this contribution",
      confirmButtonText: story?.contributions.find(
        (contribution) => contribution._id === contributionId
      )?.isMerged
        ? "Yes Remove"
        : "Yes Merge!",
      showCancelButton: true,
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        StoryData.mergeStory(_id, contributionId)
          .then((data) =>
            Swal.fire({
              title: data?.message,
              icon: "success",
              timer: 2000,
              showConfirmButton: false,
            }).then(() => fetchAgain())
          )
          .catch((err) =>
            Swal.fire({
              title: err?.message,
              icon: "error",
              timer: 2000,
              showConfirmButton: false,
            })
          );
      } else {
        Swal.close();
      }
    });
  };

  const handleContribution = () => {
    handleAddContribution(_id, contributionContent)
      .then((data) =>
        Swal.fire({
          icon: "success",
          text: data?.message,
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          fetchAgain();
          setContributionContent({ content: "" });
        })
      )
      .catch((err) =>
        Swal.fire({
          icon: "error",
          title: err?.message || "Something went wrong",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => setContributionContent({ content: "" }))
      );
  };

  const handleComplete = () => {
    Swal.fire({
      title: "Is your story is completed here?",
      icon: "question",
      text: story?.isCompleted
        ? "Are you sure you want to mark as uncompleted? Your Story will open for contributions"
        : "Are you sure you want to mark as completed? Your Story will closed for contributions",
      showCancelButton: true,
      confirmButtonText: story?.isCompleted
        ? "Yes Mark as UnCompleted"
        : "Yes Mark as Completed",
      cancelButtonText: "Not Now",
    }).then((result) =>
      result.isConfirmed
        ? StoryData.MarkAsCompleted(story?._id)
            .then((data) => {
              Swal.fire({
                title: data?.message,
                icon: "success",
                timer: 1500,
                showConfirmButton: false,
              }).then(() => fetchAgain());
            })
            .catch((err) => {
              Swal.fire({
                title: err?.message,
                icon: "error",
                timer: 1500,
                showConfirmButton: false,
              });
            })
        : Swal.close()
    );
  };

  const handleDeleteStory = () => {
    Swal.fire({
      title: "Are You sure?",
      text: `Are you sure you want to delete ${story?.title}`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes Delete",
      cancelButtonText: "Don't Delete",
    }).then((result) => {
      result.isConfirmed
        ? StoryData?.deleteStory(_id).then((data) => {
            Swal.fire({
              title: data?.message,
              timer: 1500,
              showConfirmButton: false,
              icon: "success",
            }).then(() => router.replace("/"));
          })
        : Swal.close();
    });
  };

  return loading ? (
    <LinearLoader />
  ) : (
    <main className="grid grid-cols-3 size-full">
      <div className="p-5 md:col-span-2 row-span-full col-span-full gap-y-5 flex flex-col">
        <div
          className={`size-full flex-grow rounded ${
            loading ? "overflow-hidden" : "overflow-auto"
          }`}
        >
          <div className="flex flex-col justify-center gap-3">
            <div className="flex items-center justify-between">
              {isEditing ? (
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={editedTitle}
                  onChange={(e) => setEditiedTitle(e.target.value)}
                  className="size-full px-3 py-1 text-2xl text-primaryColor font-medium rounded resize-none focus:outline-none"
                />
              ) : (
                <p className="title text-primaryColor font-semibold tracking-wider text-2xl uppercase">
                  {editedTitle}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              {editedContent?.map((cont, index) => (
                <div
                  key={index}
                  onClick={() => {
                    cont?.author?._id === story?.author?._id ||
                    story?.isCompleted ||
                    isEditing
                      ? null
                      : handleStoryMerge(cont?._id);
                  }}
                  className={`flex justify-end flex-col gap-2 ${
                    cont?.author?._id === story?.author?._id ||
                    story.isCompleted ||
                    isEditing
                      ? ""
                      : "p-2 rounded-2xl cursor-pointer hover:bg-secondaryColor/50 transition-all duration-300 ease-in-out"
                  }`}
                >
                  {isEditing ? (
                    <textarea
                      type="text"
                      name=""
                      id=""
                      value={cont?.text}
                      onChange={(e) => {
                        const updatedContent = [...editedContent];
                        updatedContent[index] = {
                          ...updatedContent[index],
                          text: e.target.value,
                        };
                        setEditedContent(updatedContent);
                      }}
                      className="size-full px-3 py-1 rounded resize-none focus:outline-none"
                    />
                  ) : (
                    <p>{cont?.text}</p>
                  )}
                  {cont?.author?._id !== story?.author?._id && (
                    <div className="flex flex-col justify-between h-full gap-1 items-end">
                      {!story?.isCompleted && (
                        <span className="text-red-500">
                          <MdDelete />
                        </span>
                      )}
                      <p>
                        ~by{" "}
                        <span className="font-bold text-primaryColor tracking-wide">
                          {cont?.author?.username}
                        </span>
                      </p>
                    </div>
                  )}
                </div>
              ))}
              {isEditing && (
                <textarea
                  type="text"
                  name=""
                  id=""
                  value={newContent}
                  onBlur={addNewContent}
                  placeholder="And then what happend..."
                  onChange={(e) => setNewContent(e.target.value)}
                  className="size-full px-3 py-1 rounded resize-none focus:outline-none"
                />
              )}
            </div>
          </div>
        </div>
        {story?.isCompleted ? null : (
          <div className={`rounded`}>
            <div className="grid grid-cols-1 gap-2">
              {story?.contributions
                ?.filter((contribution) => !contribution?.isMerged)
                ?.map((contribution, index) => (
                  <ContributionCard
                    key={index}
                    {...contribution}
                    onClick={() => handleStoryMerge(contribution?._id)}
                  />
                ))}
              {story?.author?._id === userData?._id ? (
                story?.contributions?.length === 0 && (
                  <div className="size-full flex items-center justify-center text-red-500">
                    No Contributions Yet
                  </div>
                )
              ) : (
                <div className="flex flex-col bg-white rounded p-3 size-full gap-2 items-end justify-end">
                  <textarea
                    name=""
                    id=""
                    value={contributionContent?.content}
                    onChange={(e) =>
                      setContributionContent({ content: e.target.value })
                    }
                    placeholder={`Add your contribution to ${story?.title}`}
                    className="resize-none focus:outline-none size-full"
                  />
                  <button
                    disabled={!contributionContent?.content}
                    type="submit"
                    onClick={handleContribution}
                    className="bg-primaryColor rounded px-5 py-2 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Contribute
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="md:col-span-1 col-span-full md:sticky top-16 md:p-0 px-5">
        <StoryRight
          {...story}
          userData={userData}
          isCompleted={story?.isCompleted}
          handleComplete={handleComplete}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          fetchAgain={fetchAgain}
          handleUpdate={handleUpdate}
          handleDeleteStory={handleDeleteStory}
        />
      </div>
    </main>
  );
};

export default StoryDetails;
