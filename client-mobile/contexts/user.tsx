import { createContext, useContext, useEffect, useState } from 'react';
import uuid from 'uuid';
import Cookies from 'js-cookie';

import type {
	User,
	UserCookieData,
	UserProviderProps,
	UserStateContextValues,
} from '@/types/user';
import type { Api } from '@/types/api';
import messages from '@/configs/messages.json';
import { getUsers, loginUser, updateUser } from '@/utils/user';

const UserStateContext = createContext<UserStateContextValues | null>(null);

const testUser = {
	id: 1,
	email: 'admin@example.com',
	firstName: 'John',
	lastName: 'Doe',
	authToken: 'kfehifehiffhei',
	role: 'manager',
	avatarUrl: '/static/images/user.png',
	phoneNumber: '+01234567890',
	company: {
		id: 1,
		name: 'ForecastIT',
		address: {
			id: 1,
			country: 'Portugal',
			city: 'Lisbon',
			street: 'Rua Guilherme de Anjos',
			postalCode: '12-345',
			buildingNumber: '123',
			apartmentNumber: '5',
		},
	},
	companyRole: 'IT Leader',
	address: {
		id: 2,
		country: 'Portugal',
		city: 'Lisbon',
		street: 'Rua Guilherme de Anjos',
		postalCode: '12-345',
		buildingNumber: '123',
		apartmentNumber: '5',
	},
	isActive: true,
};

export function UserProvider({ children }: UserProviderProps) {
	const [user, setUser] = useState<UserStateContextValues['user']>(testUser);

	useEffect(() => {
		if (user === null) fetch();
	}, []);

	function fetch(
		onSuccess?: (data: Partial<User>) => void,
		onError?: (error: Api.Error) => void
	) {
		const userDataCookie = Cookies.get('userData');

		if (typeof userDataCookie !== 'string') return;

		const userData: UserCookieData = JSON.parse(userDataCookie);

		getUsers(
			userData.token,
			{
				email: true,
				firstName: true,
				lastName: true,
				middleName: true,
				role: true,
				avatarUrl: true,
				phoneNumber: true,
				company: {
					name: true,
				},
				companyRole: true,
			},
			{
				id: userData.id,
				authToken: userData.token,
			},
			data => {
				if (data.length === 0) {
					onError?.({ code: 404, message: 'User not found' });
					return;
				}
				refreshToken(() => onSuccess?.(data[0]), onError);
			},
			() => setUser(userData)
		);
	}

	function update(
		data: Partial<User>,
		onSuccess?: () => void,
		onError?: (error: Api.Error) => void
	) {
		if (user?.id === undefined || user?.authToken === undefined) {
			onError?.({ code: 400, message: messages.requestResourceNotComplete });
			return;
		}

		updateUser(user.id, user.authToken, data, onSuccess, onError);
	}

	function refreshToken(
		onSuccess?: () => void,
		onError?: (error: Api.Error) => void
	) {
		if (!user?.id || !user?.authToken) return;

		updateUser(
			user.id,
			user.authToken,
			{
				authToken: uuid.v4(),
			},
			onSuccess,
			onError
		);
	}

	function login(
		email: string,
		password: string,
		onSuccess?: () => void,
		onError?: (error: Api.Error) => void
	) {
		loginUser(
			email,
			password,
			data => {
				setUser(data);

				if (data.id === undefined || data.authToken === undefined) {
					onError?.({ code: 500, message: messages.badResponse });
					return;
				}
				Cookies.set(
					'userData',
					JSON.stringify({ id: data.id, token: data.authToken })
				);

				onSuccess?.();
			},
			onError
		);
	}

	function logout(
		onSuccess?: () => void,
		onError?: (error: Api.Error) => void
	) {
		setUser(null);
		// TODO logout logic
	}

	const state: UserStateContextValues = {
		user,
		fetch,
		update,
		refreshToken,
		login,
		logout,
	};
	return (
		<UserStateContext.Provider value={state}>
			{children}
		</UserStateContext.Provider>
	);
}

export const useUserState = (): UserStateContextValues => {
	const state = useContext(UserStateContext);

	if (state === null)
		throw new Error('useUserState must be used within a UserProvider');

	return state;
};
