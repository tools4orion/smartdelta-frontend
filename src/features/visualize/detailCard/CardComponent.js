import { Box, Card, Tabs, styled } from '@mui/material';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export const AnimatedDashedLine = ({ color }) => (
  <svg width="100%" height="3" viewBox="0 0 100 3" xmlns="http://www.w3.org/2000/svg">
    <line
      x1="0"
      y1="1.5"
      x2="100"
      y2="1.5"
      stroke={color}
      strokeWidth="3"
      strokeDasharray="7"
    >
      <animate
        attributeName="stroke-dashoffset"
        from="0"
        to="-30"
        dur="2s"
        repeatCount="indefinite"
      />
    </line>
  </svg>
);

export const CustomTabs = styled(Tabs)(({ theme }) => ({
  '& .MuiTabs-indicator': {
    backgroundColor: theme.palette.info.dark,
    height: 3,
    borderRadius: 5,
  },
  position: 'sticky',
  top: 0,
  zIndex: 99,
}));

export const RotateIcon = styled(ExpandMoreIcon)(({ theme, hovered, expanded }) => ({
  position: 'absolute',
  top: theme.spacing(1),
  right: theme.spacing(1),
  cursor: 'pointer',
  color: 'white',
  display: hovered ? 'block' : 'none',
  transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
  transition: 'transform 0.3s ease-in-out',
}));
export const MoreIcon = styled(MoreVertIcon)(({ theme, hovered, expanded }) => ({
	  position: 'absolute',
	  bottom: theme.spacing(1),
	  left: theme.spacing(1),
	  cursor: 'pointer',
	  color: 'white',
	  display: hovered ? 'block' : 'none',
	   transition: 'transform 0.3s ease-in-out',
	}));


export const DetailIcon = styled(ManageSearchIcon)(({ theme, hovered, expanded }) => ({
  position: 'absolute',
  top: theme.spacing(4),
  right: theme.spacing(2),
  cursor: 'pointer',
  color: 'white',
  display: expanded ? 'block' : 'none',
  '&:hover': {
    transform: 'scale(1.08)',
  },
  transition: 'transform 0.3s ease-in-out',
}));

export const CardContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'wrap',
  maxWidth: '18.438rem'
});

export const CardItem = styled(Card)(({ theme, borderColor, isExpanded }) => ({
  margin: theme.spacing(1),
  minWidth: '16.875rem',
  maxWidth: '18.438rem',
  height: isExpanded ? 260 : 90,
  border: `2px solid ${borderColor}`,
  borderRadius: theme.spacing(1),
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.2s ease-in-out, height 0.3s ease-in-out',
  '&.expanded': {
    height: '13.125rem',
  },
  '&:hover': {
    transform: 'scale(1.04)',
  },
}));
