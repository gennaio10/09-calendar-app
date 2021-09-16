import Swal from "sweetalert2";
import { types } from "../types/types";

export const uiOpenModal = () => ({
  type: types.uiOpenModal,
});

export const uiCloseModal = () => ({
  type: types.uiCloseModal,
});

export const showError = (err) => {
    return () => {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err,
        toast: true,
        timer: 5000,
        timerProgressBar: true,
      });
    };
  };
