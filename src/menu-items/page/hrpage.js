import {FormattedMessage} from "react-intl";

// assets
import {IconFriends} from '@tabler/icons';
// constant
const icons = {
	IconFriends
};

const hrpage = {
	id: 'humanresource',
	title: <FormattedMessage id="인사 업무"/>,
	type: 'collapse',
	icon: icons.IconFriends,
	children: []
}

export default hrpage;