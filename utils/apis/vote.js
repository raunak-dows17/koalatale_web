const { TokenDetails } = require("../tokendetails/tokeDetails");
const { instance } = require("./axiosInstance");

export const VoteACon = async (id) => {
  try {
    if (!TokenDetails.getToken() || !id) return null;

    const response = await instance.post(
      `/contribution/${id}/vote`,
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
};
