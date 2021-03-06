export const SIGN_IN = "SIGN_IN";

export const signInAction = (userState) => {
  return {
    type: "SIGN_IN",
    payload: {
      isSignIn: true,
      name: userState.name,
      id: userState.id,
      token: userState.token,
    },
  };
};

// export const GET_LOGIN_USER = "GET_LOGIN_USER";

// export const getUserAction = (userinfo) => {
//   return {
//     type: "GET_LOGIN_USER",
//     payload: {
//       isSignIn: true,
//       name: userinfo.name,
//       id: userinfo.id,
//       token: userinfo.token,
//     },
//   };
// };

export const SIGN_OUT = "SIGN_OUT";

export const signOutAction = () => {
  return {
    type: "SIGN_OUT",
    payload: {
      isSignIn: false,
      name: "",
      id: "",
      token: "",
    },
  };
};
