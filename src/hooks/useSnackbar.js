import { useState } from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';

const useSnackbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [type, setType] = useState('info'); // Default type
  const [title, setTitle] = useState(''); // Default title
  const [icon, setIcon] = useState(null); // Default icon
  const iconMap = {
	success: <CheckCircleIcon />,
	error: <ErrorIcon color='white' />,
	info: <InfoIcon />,
  };
  

  const updateIcon = (newType) => {
    setIcon(iconMap[newType] || null);
  };
  const openSnackbar = (newMessage, newType='info',newTitle) => {
    setMessage(newMessage);
    setType(newType);
	updateIcon(newType);
    setIsOpen(true);
	setTitle(newTitle);
  };

  const closeSnackbar = () => {
    setMessage('');
    setType('');
    setIsOpen(false);
	setTitle('');
	setIcon(null);
  };

  return {
    isOpen,
    message,
    type,
    openSnackbar,
    closeSnackbar,
	title,
	icon
  };
};

export default useSnackbar;
