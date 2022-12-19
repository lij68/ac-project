// third-party
import { FormattedMessage } from 'react-intl';

// assets
import CoronavirusIcon from '@mui/icons-material/Coronavirus';
import DirectionsIcon from '@mui/icons-material/Directions';

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const other = {
    id: 'sample-docs-roadmap',
    type: 'group',
    children: [
        {
            id: 'sample-page',
            title: <FormattedMessage id="코로나 현황" />,
            type: 'item',
            url: '/app/dashboard/covid19',
            icon: CoronavirusIcon,
            breadcrumbs: false
        },
        {
            id: 'documentation',
            title: <FormattedMessage id="찾아 오시는 길" />,
            type: 'item',
            url: '/app/dashboard/map',
            icon: DirectionsIcon,
            target: false
        }
    ]
};

export default other;
