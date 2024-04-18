const { TokenDetails } = require("../tokendetails/tokeDetails");
const { instance } = require("./axiosInstance");

export const StoryData = {
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

  postStory: async (storyData) => {
    try {
      if (!TokenDetails.getToken()) {
        return null;
      }

      const response = await instance.post("/story", storyData, {
        headers: {
          token: TokenDetails.getToken(),
        },
      });

      return Promise.resolve(response.data);
    } catch (error) {
      return Promise.reject(error?.response?.data);
    }
  },

  updateStory: async (storyId, title, content) => {
    try {
      if (!TokenDetails.getToken()) {
        return null;
      }
      const response = await instance.put(
        `/story/${storyId}`,
        {
          title: title,
          content: content,
        },
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

  mergeStory: async (storyId, contributionId) => {
    try {
      if (!TokenDetails.getToken()) {
        return null;
      }
      const response = await instance.put(
        `/story/${storyId}/contribution/${contributionId}/merge`,
        {},
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

  MarkAsCompleted: async (storyId) => {
    try {
      if (!TokenDetails?.getToken()) {
        return null;
      }

      const response = await instance.put(
        `story/markascomplete/${storyId}`,
        {},
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

  deleteStory: async (storyId) => {
    try {
      if (!TokenDetails.getToken()) {
        return null;
      }

      const response = await instance.delete(`/story/${storyId}`, {
        headers: {
          token: TokenDetails.getToken(),
        },
      });

      return Promise.resolve(response.data);
    } catch (error) {
      return Promise.reject(error?.response?.data);
    }
  },
};
