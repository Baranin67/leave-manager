import { Routes } from '@/constants/Routes';
import { router } from 'expo-router';
import { createContext, useContext, useEffect, useState } from 'react';

type Route = {
	path: string;
};

type NavigationHistoryContextValues = {
	routes: Route[];
	push: (path: string) => void;
	goBack: (fallbackPath?: string) => void;
};

type NavigationHistoryProps = { children: React.ReactNode };

const UserStateContext = createContext<NavigationHistoryContextValues | null>(
	null
);

export function NavigationHistoryProvider({
	children,
}: NavigationHistoryProps) {
	const [routes, setRoutes] = useState<Route[]>([]);

	useEffect(() => push(Routes.screens.mainDashboard), []);

	function push(path: string) {
		setRoutes(p => [...p, { path }]);
	}

	function goBack(fallbackPath?: string) {
		let path = fallbackPath ?? Routes.screens.mainDashboard;

		const prevPath = routes.at(-2)?.path;
		if (prevPath !== undefined) {
			path = prevPath;
			setRoutes(p => p.slice(0, -1));
		}

		router.push(path);
	}

	const state: NavigationHistoryContextValues = {
		routes,
		push,
		goBack,
	};
	return (
		<UserStateContext.Provider value={state}>
			{children}
		</UserStateContext.Provider>
	);
}

export function useNavigationHistory(): NavigationHistoryContextValues {
	const state = useContext(UserStateContext);

	if (state === null)
		throw new Error(
			'useNavigationHistory must be used within a NavigationHistoryProvider'
		);

	return state;
}
