import { toast, Slide } from "react-toastify";

export const ErrorToast = (message:string) => {
    toast.error(message, {
        className: "styled-notifications-error",
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Slide,
    });
}

export const SuccesToast = (message:string) => {
    toast.success(message, {
        className: "styled-notifications-success",
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Slide,
    });
}