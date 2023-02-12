import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { ButtonBase } from '@mui/material';

// project imports
import config from 'config';
import Logo from 'ui-component/Logo';
import { customizationSelector, menuOpen } from 'store/reducers/customization/reducer'

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => {
    const { defaultId } = useSelector(customizationSelector);
    const dispatch = useDispatch();
    return (
        <ButtonBase disableRipple onClick={() => dispatch(menuOpen(defaultId))} component={Link} to={config.defaultPath}>
            <Logo />
        </ButtonBase>
    );
};

export default LogoSection;
