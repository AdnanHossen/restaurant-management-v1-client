import { toast } from "react-toastify";

const getToast = (severity, message) => {
  return toast[severity](message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

export default getToast;
