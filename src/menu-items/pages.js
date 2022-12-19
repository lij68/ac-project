import accpage from './page/accpage'
import hrpage from './page/hrpage'
import logipage from './page/logipage'
// third-party
import {FormattedMessage} from 'react-intl';

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
	id: 'pages',
	title: <FormattedMessage id="72nd React Project"/>,
	caption: <FormattedMessage id="with MUI"/>,
	type: 'group',
	children: [
		accpage,
		hrpage,
		logipage
	]
}

export default pages;
