// useIntegrationCheck.js
import { useState, useEffect } from 'react';
import listIntegrations from './actions/listIntegrations';

const useIntegrationCheck = () => {
  const [isAnyIntegrationExist, setIsAnyIntegrationExist] = useState(false);
  const [integratedData, setIntegratedData] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkIntegrations = async () => {
    try {
      const { data } = await listIntegrations();
      console.log(data);
      if (data.cloud.id) {
        setIsAnyIntegrationExist(true);
        setIntegratedData(data);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkIntegrations();
  }, []);

  return { isAnyIntegrationExist, integratedData, loading};
};

export default useIntegrationCheck;
