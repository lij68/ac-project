import {FormattedMessage} from "react-intl";

// assets
import {IconTruck} from '@tabler/icons';
// constant
const icons = {
	IconTruck
};

const logipage = {
	id: 'logistics',
		title: <FormattedMessage id="물류 업무"/>,
	type: 'collapse',
	icon: icons.IconTruck,
	children: []
}

export default logipage;