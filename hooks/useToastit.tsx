import { toast } from "react-toastify";

const useToastit = () => {
  function success(message: string) {
    toast.success(message, {
      style: {
        background: "rgba(39, 148, 39, 1)",
        color: "white",
      },
    });
  }

  function error(message: string) {
    toast.error(message);
  }

  function warning(message: string) {
    toast.warning(message);
  }

  function info(message: string) {
    toast.info(message);
  }

  return { success, error, warning, info };
};

export default useToastit;
