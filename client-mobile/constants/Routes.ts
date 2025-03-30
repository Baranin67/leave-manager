import { Api } from '@/types/api';

type Screen =
	| 'signUp'
	| 'signIn'
	| 'mainDashboard'
	| 'leavesDashboard'
	| 'leaveRequestCreate'
	| 'leaveRequestEdit'
	| 'leaveRequestView'
	| 'leaveRequestsList'
	| 'userProfile';

type Routes = {
	screens: {
		[_ in Screen]: string;
	};
	resources: {
		[R in keyof Api.Resource.NameToType]: {
			[_: string]: string;
		};
	};
	guarded: {
		onlySignedIn: string[];
		onlySignedOut: string[];
		onlySignedInFallback: string;
		onlySignedOutFallback: string;
	};
};

export const Routes: Routes = {
	screens: {
		signUp: '/signUp',
		signIn: '/signIn',
		mainDashboard: '/',
		leavesDashboard: '/leaves',
		leaveRequestView: '/leaves/requests/view/%s',
		leaveRequestsList: '/leaves/requests/list',
		leaveRequestCreate: '/leaves/requests/create',
		leaveRequestEdit: '/leaves/requests/edit/%s',
		userProfile: '/user/profile',
	},

	resources: {
		users: {
			view: '/users/view',
			create: '/users/create',
			update: '/users/update/%s',
			delete: '/users/delete/%s',
			login: '/users/login',
		},
		companies: {
			view: '/companies/view',
			create: '/companies/create',
			update: '/companies/update/%s',
			delete: '/companies/delete/%s',
		},
		addresses: {
			view: '/addresses/view',
			create: '/addresses/create',
			update: '/addresses/update/%s',
			delete: '/addresses/delete/%s',
		},
		leaveRequests: {
			view: '/leaveRequests/view',
			create: '/leaveRequests/create',
			update: '/leaveRequests/update/%s',
			delete: '/leaveRequests/delete/%s',
		},
	},
	guarded: {
		onlySignedIn: [
			'/',
			'/leaves',
			'/leaves/requests/view/%s',
			'/leaves/requests/list',
			'/leaves/requests/create',
			'/leaves/requests/edit/%s',
			'/user/profile',
		],
		onlySignedInFallback: '/signIn',
		onlySignedOut: ['/signIn', '/signUp'],
		onlySignedOutFallback: '/',
	},
} as const;
