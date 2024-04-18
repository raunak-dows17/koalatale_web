import { TokenDetails } from "../tokendetails/tokeDetails";
import { instance } from "./axiosInstance";

export const authenticateUser = {
  signUp: async (formData) => {
    try {
      const response = await instance.post(`/auth/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return Promise.resolve(response.data);
    } catch (error) {
      return Promise.reject(error.response.data);
    }
  },

  login: async (formData) => {
    try {
      const response = await instance.post(`/auth/login`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return Promise.resolve(response.data);
    } catch (error) {
      return Promise.reject(error.response.data);
    }
  },

  checkUserName: async (username) => {
    try {
      const response = await instance(
        `/auth/checkUsername?username=${username}`,
        {
          method: "GET",
        }
      );

      return Promise.resolve(response?.data?.message);
    } catch (error) {
      return Promise.reject(error.response.data);
    }
  },

  checkEmail: async (email) => {
    try {
      const response = await instance(`/auth/checkEmail?email=${email}`, {
        method: "GET",
      });

      return Promise.resolve(response?.data?.message);
    } catch (error) {
      return Promise.reject(error.response.data);
    }
  },

  changePassword: async (changedPassword) => {
    try {
      if (!TokenDetails.getToken()) {
        return null;
      }
      const response = await instance.put(
        "/auth/updatePassword",
        changedPassword,
        {
          headers: {
            token: TokenDetails.getToken(),
          },
        }
      );

      return Promise.resolve(response.data);
    } catch (error) {
      return Promise.reject(error?.response?.data);
    }
  },
};
