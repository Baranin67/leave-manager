import axios from 'axios';

import type { Api } from '@/types/api';
import { Routes } from '@/constants/Routes';
import { buildUrl, replace } from './text';
import messages from '@/configs/messages.json';

export function request<BodySchema, R>(
	method: Api.Method,
	url: string,
	authToken?: string,
	body?: BodySchema,
	onSuccess?: (res: Api.Success<R>) => void,
	onError?: (error: Api.Error) => void
) {
	axios
		.request({
			method,
			url,
			baseURL: `${process.env.EXPO_PUBLIC_API_URL}/api/v1`,
			data: body,
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				...(authToken && { Authorization: `Bearer ${authToken}` }),
			},
			timeout: 10000, // 10 seconds timeout
		})
		.then(res => onSuccess?.(res.data))
		.catch(onError);
}

export function getResources<
	R extends object,
	F = Api.Resource.StandardFields<R>,
	W = Api.Resource.StandardWhere<R>
>(
	resource: keyof Api.Resource.NameToType,
	authToken: string,
	fields: F,
	where: W,
	onSuccess?: (data: R[]) => void,
	onError?: (error: Api.Error) => void
) {
	return request<Api.Request.Get<R>, R[]>(
		'GET',
		buildUrl(Routes.resources[resource].view, { fields, where }),
		authToken,
		{},
		res => {
			const data = res.data;

			if (data === undefined || data.length === 0) {
				onSuccess?.([]);
				return;
			}

			const parsedData: R[] = data.map(item =>
				Object.keys(item).reduce((acc, key) => {
					if (typeof item[key] === 'number') {
						acc[key] = item[key];
						return acc;
					}

					const possibleDate = new Date(item[key]);

					acc[key] =
						String(possibleDate) === 'Invalid Date' ? item[key] : possibleDate;

					return acc;
				}, {} as R)
			);

			onSuccess?.(parsedData);
		},
		onError
	);
}

export function createResource<R>(
	resource: keyof Api.Resource.NameToType,
	authToken: string,
	data: R,
	onSuccess?: () => void,
	onError?: (error: Api.Error) => void
) {
	return request<Api.Request.Put<R>, R>(
		'PUT',
		Routes.resources[resource].create,
		authToken,
		{
			data,
		},
		onSuccess,
		onError
	);
}

export function updateResource<R>(
	name: string | number,
	resource: keyof Api.Resource.NameToType,
	authToken: string,
	data: R,
	onSuccess?: () => void,
	onError?: (error: Api.Error) => void
) {
	return request<Api.Request.Patch<R>, R>(
		'PATCH',
		replace(Routes.resources[resource].update, String(name)),
		authToken,
		{
			data,
		},
		onSuccess,
		onError
	);
}

export function deleteResource<R>(
	name: string | number,
	resource: keyof Api.Resource.NameToType,
	authToken: string,
	onSuccess?: () => void,
	onError?: (error: Api.Error) => void
) {
	return request<Api.Request.Delete<R>, never>(
		'DELETE',
		replace(Routes.resources[resource].delete, String(name)),
		authToken,
		{},
		onSuccess,
		onError
	);
}
