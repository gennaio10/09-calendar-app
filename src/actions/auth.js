import Swal from "sweetalert2";
import { fetchConToken, fetchSinToken } from "../helpers/fetch";
import { types } from "../types/types";
import { eventLogout } from "./events";

export const startLogin = (email, password) => {
  return async (dispatch) => {
    try {
      const resp = await fetchSinToken("auth", { email, password }, "POST");
      const body = await resp.json();
      if (body.ok) {
        localStorage.setItem("token", body.token);
        localStorage.setItem("token-init-date", new Date().getTime());
        dispatch(
          login({
            uid: body.uid,
            name: body.name,
          })
        );
      } else {
        localStorage.clear();
        Swal.fire({
          icon: "error",
          title: "Error",
          text: body.msg,
          toast: true,
          timer: 5000,
          timerProgressBar: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const login = (user) => ({
  type: types.authLogin,
  payload: user,
});

export const startRegister = (email, password, name) => {
  return async (dispatch) => {
    try {
      const resp = await fetchSinToken(
        "auth/new",
        { email, password, name },
        "POST"
      );
      const body = await resp.json();
      if (body.ok) {
        localStorage.setItem("token", body.token);
        localStorage.setItem("token-init-date", new Date().getTime());
        dispatch(
          login({
            uid: body.uid,
            name: body.name,
          })
        );
      } else {
        localStorage.clear();
        Swal.fire({
          icon: "error",
          title: "Error",
          text: body.msg,
          toast: true,
          timer: 5000,
          timerProgressBar: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const startChecking = (email, password, name) => {
  return async (dispatch) => {
    try {
      const resp = await fetchConToken("auth/renew");
      const body = await resp.json();

      if (body.ok) {
        localStorage.setItem("token", body.token);
        localStorage.setItem("token-init-date", new Date().getTime());
        dispatch(
          login({
            uid: body.uid,
            name: body.name,
          })
        );
      } else {
        localStorage.clear();
        dispatch(checkingFinish());
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const checkingFinish = () => ({
  type: types.authCheckingFinish,
});

export const startLogout = () => {
  return (dispatch) => {
    try {
      dispatch(logout());
      dispatch(eventLogout());
      localStorage.clear();
    } catch (error) {
      console.log(error);
    }
  };
};

const logout = () => {
  return {
    type: types.authLogout,
  };
};
