import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'

export const ConnectWalletButton = styled(Button)(() => ({
    minHeight: '40px',
    // color: appTheme.palette.colors.light2,
    borderRadius: '32px',
    // backgroundColor: appTheme.palette.colors.dark4,
    paddingRight: '1rem',
    paddingLeft: '1rem',
    textTransform: 'none',
    //   fontFamily: `${FontsEnum.HelveticaNeue}, ${FontsEnum.Helvetica}`,
    border: '0.5px solid #1B1C1D',
    letterSpacing: '0.3px',
    fontWeight: 700,
    //   '&:hover': {
    //     backgroundColor: appTheme.palette.colors.dark4,
    //     borderColor: appTheme.palette.colors.dark4
    //   },
    //   '&:MuiTouchRipple-child': {
    //     backgroundColor: appTheme.palette.colors.dark4
    //   },
    //   '&:MuiTouchRipple-rippleVisible': {
    //     opacity: '0.5',
    //     animationDuration: '550ms'
    //   }
}))