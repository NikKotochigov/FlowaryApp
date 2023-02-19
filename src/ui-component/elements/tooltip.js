import * as React from 'react';
import Tooltip from '@mui/material/Tooltip';
import { useTheme, tooltipClasses } from '@mui/material';
import { styled } from '@mui/material/styles';

const Toolkit = ({children, title}) => {

    const LightTooltip = styled(({ className, ...props }) => (
        <Tooltip arrow {...props} classes={{ popper: className }} />
      ))(({ theme }) => ({
        [`& .${tooltipClasses.tooltip}`]: {
          backgroundColor: theme.palette.common.white,
          color: 'rgba(0, 0, 0, 0.87)',
          boxShadow: theme.shadows[5],
          fontSize: 14,
        },
      }));

  return (<>
  <LightTooltip title={title}
  placement="top"
  >
    {children}
  </LightTooltip>
  </>

  );
}
export default Toolkit;