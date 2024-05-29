import { Tooltip } from "@mui/material";
import useHover from "hooks/useHover";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import useSnackbar from "hooks/useSnackbar";
import { useState } from "react";
import MDSnackbar from "components/MDSnackbar";

const CopyIconOnHover = ({ text, command, children}) => {
	const [isCopied, setIsCopied] = useState(false);
	const {isHovered, handleMouseEnter, handleMouseLeave} = useHover();
	const snackbar = useSnackbar();
	const { isOpen, closeSnackbar, message, icon, title, type } = snackbar
	const handleCopyToClipboard = () => {
	  setIsCopied(true);
	  snackbar.openSnackbar('Use it to trace the error', 'success', 'Copied to clipboard');
	};
	return (
	  <div style={{ position: 'relative' }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
	  {children}
		   {isHovered && (
        <CopyToClipboard onCopy={handleCopyToClipboard} text={text}>
          <Tooltip title={command} enterDelay={500} leaveDelay={200}>
            <ContentCopyIcon color="white" className="copyIcon" />
          </Tooltip>
        </CopyToClipboard>
      )}
	  <MDSnackbar
        open={isOpen}
        autoHideDuration={3000}
        onClose={closeSnackbar}
        message={message}
        icon={icon}
        close={closeSnackbar}
        title={title}
        color={type}
      >
        <p>{snackbar.message}</p>
      </MDSnackbar>
	  </div>
	);
  };

  export default CopyIconOnHover;