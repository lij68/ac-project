import {lazy} from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MainLayout from "../layout/MainLayout";
import AuthGuard from "../utils/route-guard/AuthGuard";

// maintenance routing
const Main = Loadable(lazy(() => import('views/pages/Main')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
	path: '/',
	element: (
		<AuthGuard>
			<MainLayout/>
		</AuthGuard>
	),
	children: [
		{
			path: '/app/Main',
			element: <Main/>
		}
	]
};

export default AuthenticationRoutes;
