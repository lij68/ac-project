import {Link as RouterLink} from 'react-router-dom';

// material-ui
import {Link} from '@mui/material';

// project imports
import Logo from 'ui-component/Logo';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => (
    <Link component={RouterLink} to='/'>
        <Logo />
    </Link>
);

export default LogoSection;
