import elasticApmEndpoints from "network/endpoints/elasticApm";

const authenticate = async (credentials, snackbar) => {
  try {
    const logData = await elasticApmEndpoints.authenticate(credentials);
    
    if (logData.status === 200) {
      return { isAuthenticated: true };
    } 

    return { isAuthenticated: true };

  } catch (error) {
    const { data } = error.response;
    const { info } = data;
    snackbar.openSnackbar('Integration failed', 'error', info);
    return { isAuthenticated: false };
  }
};

export default authenticate;
