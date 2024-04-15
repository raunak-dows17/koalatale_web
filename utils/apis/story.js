const { TokenDetails } = require("../tokendetails/tokeDetails");
const { instance } = require("./axiosInstance");

export const StoryDetails = {
  stories: async () => {
    try {
      if (TokenDetails.getToken) {
        const response = await instance.get("/story", {
          headers: {
            token: TokenDetails.getToken(),
          },
        });

        return Promise.resolve(response.data);
      } else {
        return null;
      }
    } catch (error) {
      return Promise.reject(error?.response?.data);
    }
  },

  getStoryById: async (id) => {
    try {
      if (TokenDetails.getToken) {
        const response = await instance.get(`/story/${id}`, {
          headers: {
            token: TokenDetails.getToken(),
          },
        });

        return Promise.resolve(response.data);
      } else {
        return null;
      }
    } catch (error) {
      return Promise.reject(error?.response?.data);
    }
  },
};
