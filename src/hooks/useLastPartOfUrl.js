import { useLocation } from 'react-router-dom';

// Custom hook to get the last part of the URL
const  useLastPartOfUrl = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const parts = pathname.split('/').filter(part => part !== ''); // Split pathname by '/' and remove empty parts
  const lastPartOfUrl = parts.pop();
  return lastPartOfUrl;
}

export default useLastPartOfUrl;