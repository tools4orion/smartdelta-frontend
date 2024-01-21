import { useState, useRef } from "react";
import authenticate from "./actions/authenticate";
import { useNavigate } from "react-router-dom";
import useSnackbar from "hooks/useSnackbar";

const useAuthentication = () => {
  const [loading, setLoading] = useState(false);
  const inputRefUsername = useRef();
  const inputRefPassword = useRef();
  const inputRefCloudId = useRef();
  const navigate = useNavigate();
  const snackbar = useSnackbar();

  const handleAuthentication = async () => {
    setLoading(true);

    try {
      const { isAuthenticated } = await authenticate(
        {
          cloud: {
            id: inputRefCloudId.current.value,
          },
          auth: {
            username: inputRefUsername.current.value,
            password: inputRefPassword.current.value,
          },
        },
        snackbar
      );

      if (isAuthenticated) {
        setTimeout(() => {
          navigate("/elastic-dashboard");
        }, 1000);
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    inputRefUsername,
    inputRefPassword,
    inputRefCloudId,
    handleAuthentication,
	snackbar
  };
};

export default useAuthentication;
