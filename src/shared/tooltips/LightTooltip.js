import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';

const LightTooltip = styled(({ className, ...props }) => (
	<Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
	[`& .${tooltipClasses.tooltip}`]: {
		background:'linear-gradient(90deg, #4b6cb7 0%, #182848 100%)', // Dark blue gradien
	  fontSize: 11,
	},
	[`& .${tooltipClasses.arrow}`]: {
		color: '#182850'
	},
  }));

  export default LightTooltip;