import { IconProps } from '@/components/ui/Icons';

type TabSettings = {
	label: string;
	icon?: IconProps['name'];
};

type Screen = {
	name: string;
	title: string;
	canGoBack?: boolean;
	tabSettings?: TabSettings;
};

export const Screens: Screen[] = [
	// NOT FOUND
	{
		name: '+not-found',
		title: 'Oops!',
	},

	// SIGN UP
	{
		name: 'signUp/index',
		title: 'Sign up',
	},

	// SIGN IN
	{
		name: 'signIn/index',
		title: 'Sign in',
	},

	// MAIN DASHBOARD
	{
		name: 'index',
		title: 'Main Dashboard',
		tabSettings: {
			label: 'Dashboard',
			icon: 'user',
		},
	},

	// LEAVES DASHBOARD
	{
		name: 'leaves/index',
		title: 'Leaves Dashboard',
		canGoBack: true,
		tabSettings: {
			label: 'Leaves',
			icon: 'door-open',
		},
	},

	// VIEW LEAVE REQUEST
	{
		name: 'leaves/requests/view/[id]/index',
		title: 'Leave request view',
		canGoBack: true,
	},

	// VIEW LEAVE REQUESTS LIST
	{
		name: 'leaves/requests/list/index',
		title: 'Your leave requests',
		canGoBack: true,
	},

	// CREATE LEAVE REQUEST
	{
		name: 'leaves/requests/create/index',
		title: 'New leave request',
		canGoBack: true,
	},

	// PROFILE
	{
		name: 'user/profile/index',
		title: 'Your Profile',
		canGoBack: true,
		tabSettings: {
			label: 'Profile',
			icon: 'user',
		},
	},
];
