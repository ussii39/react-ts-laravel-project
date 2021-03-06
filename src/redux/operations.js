import { getUserAction, signInAction, signOutAction } from "./actions";
import { push } from "connected-react-router";
import axios from "axios";

export const signIn = (email, password) => {
  return async (dispatch) => {
    if (email === "" || password === "") {
      return false;
    }
    const data = { email: email, password: password };
    axios
      .post("/api/login", data, {
        headers: { "Content-Type": "application/json" },
      })

      .then((res) => {
        console.log(res.data);
        const data = res.data;

        dispatch(
          signInAction({
            isSignIn: true,
            id: data.user.id,
            name: data.user.name,
            token: data.user.token,
          })
        );
      });
  };
};

// export const GetloginUser = () => {
//   return async (dispatch, getState) => {
//     const GetUser = getState().users.token;
//     console.log(GetUser);
//     if (GetUser === "") {
//       return;
//     }
//     axios.get("/api/login", { params: { token: GetUser } }).then((res) => {
//       const data = res.data;
//       console.log(data);
//       dispatch(
//         getUserAction({
//           isSignIn: true,
//           id: data.user.id,
//           name: data.user.name,
//           token: data.user.token,
//         })
//       );
//     });
//   };
// };

export const signout = () => {
  return async (dispatch, getState) => {
    const token = getState().users.token;
    axios
      .post("/api/logout", "", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        dispatch(signOutAction());
        console.log(res.data, "ログアウトしました");
      });
  };
};
