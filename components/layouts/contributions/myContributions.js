"use client";

import LinearLoader from "@/components/modules/loader/linearLoader";
import { usePersonalData } from "@/utils/hooks/userData";
import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import { MdEdit, MdDelete, MdSave, MdCancel } from "react-icons/md";
import {
  handleDeleteContribution,
  handleUpdateContribution,
} from "@/utils/apis/contributions";
import Swal from "sweetalert2";

const MyContributions = () => {
  const { userData, error, loading, fetchAgain } = usePersonalData();
  const [isEditing, setIsEditing] = useState(null);
  const [editedContent, setEditedContent] = useState({
    content: null,
  });

  const handleSetIsEditing = (index) => {
    if (isEditing === index) {
      setIsEditing(null);
      setEditedContent({ content: null });
    }
    setIsEditing(index);
    setEditedContent({ content: null });
  };

  const handleEdit = (contributionId) => {
    handleUpdateContribution(contributionId, editedContent)
      .then((data) =>
        Swal.fire({
          icon: "success",
          title: data?.message,
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          fetchAgain();
          handleSetIsEditing(null);
          setEditedContent({ content: null });
        })
      )
      .catch((err) =>
        Swal.fire({
          icon: "error",
          title: "Error",
          text: err?.message || "Something went wrong",
          showConfirmButton: false,
          timer: 1500,
        })
      );
  };

  const handleDelete = (contributionId) => {
    Swal.fire({
      icon: "question",
      title: "Are you sure?",
      text: "Are you sure you want to delete this contribution.",
      showCancelButton: true,
      confirmButtonText: "Yes Delete",
      cancelButtonText: "Not Now",
    }).then((result) =>
      result.isConfirmed
        ? handleDeleteContribution(contributionId)
            .then((data) =>
              Swal.fire({
                icon: "success",
                title: data?.message,
                showConfirmButton: false,
                timer: 1500,
              }).then(() => {
                fetchAgain();
              })
            )
            .catch((err) =>
              Swal.fire({
                icon: "error",
                title: "Error",
                text: err?.message || err?.error || "Something went wrong",
                showConfirmButton: false,
                timer: 1500,
              })
            )
        : Swal.close()
    );
  };

  return (
    <main className="p-5 size-full flex flex-col">
      {loading ? (
        <LinearLoader />
      ) : userData?.contributions.length === 0 ? (
        <div className="text-red-500 font-medium flex items-center justify-center size-full">
          No Contributions yet
        </div>
      ) : (
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
          {userData?.contributions?.map((contri, index) => (
            <div
              key={contri._id}
              className={`p-5 rounded-lg space-y-3 ${
                contri?.isMerged
                  ? "border border-primaryColor bg-primaryColor/25 "
                  : "bg-white"
              }`}
            >
              {isEditing === index ? (
                <textarea
                  type="text"
                  name="content"
                  minLength={50}
                  value={
                    editedContent?.content === null
                      ? contri?.content
                      : editedContent?.content
                  }
                  onChange={(e) =>
                    setEditedContent({ editedContent, content: e.target.value })
                  }
                  id="content"
                  className="w-full border-2 rounded px-2 border-primaryColor resize-none"
                />
              ) : (
                <p className={`text-lg`}>{contri?.content}</p>
              )}
              <Moment fromNow>{contri?.createdAt}</Moment>
              <hr />
              {contri?.isMerged ? null : (
                <div className="flex gap-3 items-center">
                  <button
                    type="button"
                    onClick={() =>
                      isEditing === index
                        ? handleEdit(contri?._id)
                        : handleSetIsEditing(index)
                    }
                    className="bg-primaryColor rounded px-5 py-2 text-white"
                  >
                    {isEditing === index ? <MdSave /> : <MdEdit />}
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      isEditing === index
                        ? handleSetIsEditing(null)
                        : handleDelete(contri?._id)
                    }
                    className="bg-red-500 rounded px-5 py-2 text-white"
                  >
                    {isEditing === index ? <MdCancel /> : <MdDelete />}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default MyContributions;
