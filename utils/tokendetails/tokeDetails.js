export const TokenDetails = {
  getToken: () => {
    return localStorage.getItem("kt_token");
  },

  setToken: (token) => {
    return localStorage.setItem("kt_token", token);
  },

  removeToken: () => {
    return localStorage.removeItem("kt_token");
  },

  hasToken: () => {
    if (TokenDetails.getToken() === null) {
      return false;
    } else {
      return true;
    }
  },
};
