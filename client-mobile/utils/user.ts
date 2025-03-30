import type { User } from '@/types/user';
import type { Api } from '@/types/api';
import {
	createResource,
	deleteResource,
	getResources,
	request,
	updateResource,
} from './api';
import messages from '@/configs/messages.json';
import { Routes } from '@/constants/Routes';

export function getUsers(
	authToken: string,
	fields: User.Fields,
	where: User.Where,
	onSuccess?: (data: User.ResponseData<typeof fields>[]) => void,
	onError?: (error: Api.Error) => void
) {
	getResources<User.ResponseData<typeof fields>, typeof fields, typeof where>(
		'users',
		authToken,
		fields,
		where,
		onSuccess,
		onError
	);
}

export function createUser(
	authToken: string,
	data: Partial<User>,
	onSuccess?: () => void,
	onError?: (error: Api.Error) => void
) {
	createResource<typeof data>('users', authToken, data, onSuccess, onError);
}

export function updateUser(
	id: number,
	authToken: string,
	data: Partial<User>,
	onSuccess?: () => void,
	onError?: (error: Api.Error) => void
) {
	updateResource<typeof data>(id, 'users', authToken, data, onSuccess, onError);
}

export function deleteUser(
	id: number,
	authToken: string,
	onSuccess?: () => void,
	onError?: (error: Api.Error) => void
) {
	deleteResource<User>(id, 'users', authToken, onSuccess, onError);
}

export function loginUser(
	email: string,
	password: string,
	onSuccess?: (data: User) => void,
	onError?: (error: Api.Error) => void
) {
	request(
		'PATCH',
		Routes.resources.users.login,
		process.env.EXPO_PUBLIC_PUBLIC_AUTH_TOKEN,
		{ email, password },
		res => {
			if (!res.data) {
				onError?.({ code: 404, message: messages.responseNoResourceErr });
				return;
			}
			onSuccess?.(res.data);
		},
		onError
	);
}
