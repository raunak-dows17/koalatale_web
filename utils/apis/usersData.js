import { TokenDetails } from "../tokendetails/tokeDetails";
import { instance } from "./axiosInstance";

export const UserData = {
  getPersonalInfo: async () => {
    try {
      if (TokenDetails.getToken()) {
        const response = await instance.get("/auth/user", {
          headers: {
            token: TokenDetails.getToken(),
          },
        });

        return Promise.resolve(response.data);
      } else {
        return null;
      }
    } catch (error) {
      return Promise.reject(error.response?.data);
    }
  },

  getUsersData: async (username) => {
    try {
      if (TokenDetails.getToken() && username) {
        const response = await instance.get(`/auth/user/${username}`, {
          headers: {
            token: TokenDetails.getToken(),
          },
        });

        return Promise.resolve(response.data);
      } else {
        return null;
      }
    } catch (error) {
      return Promise.reject(error.response?.data);
    }
  },

  updateUserInfo: async (editedData) => {
    try {
      if (!TokenDetails.getToken()) {
        return null;
      }
      const response = await instance.put(`/auth/user`, editedData, {
        headers: {
          "Content-Type": "multipart/form-data",
          token: TokenDetails.getToken(),
        },
      });

      return Promise.resolve(response.data);
    } catch (error) {
      return Promise.reject(error?.response?.data);
    }
  },
};
