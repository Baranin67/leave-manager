import { createContext, useContext, useEffect, useState } from 'react';
import { useUserState } from './user';
import {
	router,
	useNavigation,
	usePathname,
	useRootNavigationState,
} from 'expo-router';
import { Routes } from '@/constants/Routes';
import { useNavigationHistory } from './navigationHistory';
import { StackActions, TabActions } from '@react-navigation/native';

const RouteGuardStateContext =
	createContext<RouteGuardStateContextValues | null>(null);

type RouteGuardProviderProps = {
	children: React.ReactNode;
};

type RouteGuardStateContextValues = {};

export function RouteGuardProvider({ children }: RouteGuardProviderProps) {
	const { user } = useUserState();
	const pathname = usePathname();
	const navHistory = useNavigationHistory();
	const nav = useNavigation();
	const [isNavReady, setNavReady] = useState(false);

	useEffect(() => {
		nav.addListener('focus', () => {
			setNavReady(true);
		});
	}, []);

	const [isGuardBusy, setGuardBusy] = useState(false);

	useEffect(() => {
		if (!isNavReady) return;

		console.log('New pathname', pathname);
		let fallback = '';

		console.log('Checking route...');

		if (Routes.guarded.onlySignedIn.includes(pathname) && user === null)
			fallback = Routes.guarded.onlySignedInFallback;
		else if (Routes.guarded.onlySignedOut.includes(pathname) && user !== null)
			fallback = Routes.guarded.onlySignedOutFallback;

		if (fallback !== '') {
			console.log('Fallback to:', fallback);

			router.push(fallback);
			navHistory.push(fallback);
		}
		setGuardBusy(false);
	}, [isNavReady, pathname]);

	const state: RouteGuardStateContextValues = {};
	return (
		<RouteGuardStateContext.Provider value={state}>
			{isGuardBusy ? null : children}
		</RouteGuardStateContext.Provider>
	);
}

export const useRouteGuardState = (): RouteGuardStateContextValues => {
	const state = useContext(RouteGuardStateContext);

	if (state === null)
		throw new Error(
			'useRouteGuardState must be used within a RouteGuardProvider'
		);

	return state;
};
