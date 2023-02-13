import { IconButton, Tooltip, tooltipClasses } from "@mui/material";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { styled } from '@mui/material/styles';
import Zoom from '@mui/material/Zoom';


const HelperToolkit = ({ title }) => {

  const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.white,
      color: 'rgba(0, 0, 0, 0.87)',
      boxShadow: '0 2px 14px 0 rgb(32 40 45 / 30%)',
      fontSize: 11,
      maxWidth: 150,
    },
  }));


  return (<>
    <LightTooltip
      title={title}
      placement="right-start"
      TransitionComponent={Zoom}
    >
      <Tooltip >
        <IconButton>
          <HelpOutlineIcon />
        </IconButton>
      </Tooltip>

    </LightTooltip>

  </>);
}

export default HelperToolkit;