import {lazy} from 'react';

// project imports
import AuthGuard from 'utils/route-guard/AuthGuard';
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

import ComponyMap from '../views/pages/dashboard/componyMap'

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/pages/dashboard/covid19')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
	path: '/',
	element: (
		<AuthGuard>
			<MainLayout/>
		</AuthGuard>
	),
	children: [
		{
			path: '/app/dashboard/covid19',
			element: <covid19/>
		},
		{
			path: '/app/dashboard/map',
			element: <ComponyMap/>
		}
	]
};

export default MainRoutes;
