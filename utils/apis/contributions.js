import { TokenDetails } from "../tokendetails/tokeDetails";
import { instance } from "./axiosInstance";

export const handleAddContribution = async (storyId, contributionContent) => {
  try {
    if (!TokenDetails.getToken()) {
      return null;
    }
    const response = await instance.post(
      `/contribution/${storyId}`,
      contributionContent,
      {
        headers: {
          "Content-Type": "application/json",
          token: TokenDetails.getToken(),
        },
      }
    );

    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error?.response?.data);
  }
};

export const handleUpdateContribution = async (
  contributionId,
  editedContent
) => {
  try {
    if (!TokenDetails.getToken()) {
      return null;
    }
    const response = await instance.put(
      `/contribution/${contributionId}`,
      editedContent,
      {
        headers: {
          "Content-Type": "application/json",
          token: TokenDetails.getToken(),
        },
      }
    );

    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error?.response?.data);
  }
};

export const handleDeleteContribution = async (contributionId) => {
  try {
    if (!TokenDetails.getToken()) {
      return null;
    }
    const response = await instance.delete(`/contribution/${contributionId}`, {
      headers: {
        token: TokenDetails.getToken(),
      },
    });

    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error?.response?.data);
  }
};
