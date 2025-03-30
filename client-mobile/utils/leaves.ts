import type { LeaveRequest } from '@/types/leaves';
import type { Api } from '@/types/api';
import {
	createResource,
	deleteResource,
	getResources,
	updateResource,
} from './api';

export function getLeaveRequests(
	authToken: string,
	fields: LeaveRequest.Fields,
	where: LeaveRequest.Where,
	onSuccess?: (data: LeaveRequest.ResponseData<typeof fields>[]) => void,
	onError?: (error: Api.Error) => void
) {
	// onSuccess?.(
	// 	[
	// 		{
	// 			id: 1,
	// 			leaveType: 'casual',
	// 			startDate: new Date(),
	// 			endDate: new Date(),
	// 			status: 'pending',
	// 			userComment: 'This is a casual leave request.',
	// 			user: {
	// 				id: 2,
	// 				firstName: 'John',
	// 				lastName: 'Doe',
	// 				avatarUrl: 'https://example.com/avatar.jpg',
	// 				company: {
	// 					name: 'ForecastIT',
	// 				},
	// 				companyRole: 'IT Leader',
	// 			},
	// 		},
	// 		{
	// 			id: 2,
	// 			leaveType: 'vacation',
	// 			startDate: new Date(),
	// 			endDate: new Date(),
	// 			status: 'approved',
	// 			userComment: 'This is a vacation leave request.',
	// 			user: {
	// 				id: 2,
	// 				firstName: 'John',
	// 				lastName: 'Doe',
	// 				avatarUrl: 'https://example.com/avatar.jpg',
	// 				company: {
	// 					name: 'ForecastIT',
	// 				},
	// 				companyRole: 'IT Leader',
	// 			},
	// 		},
	// 	].filter(item => Object.keys(where).every(key => item[key] === where[key]))
	// );
	getResources<
		LeaveRequest.ResponseData<typeof fields>,
		typeof fields,
		typeof where
	>('leaveRequests', authToken, fields, where, onSuccess, onError);
}

export function createLeaveRequest(
	authToken: string,
	data: Partial<LeaveRequest>,
	onSuccess?: () => void,
	onError?: (error: Api.Error) => void
) {
	console.log(data);

	createResource<typeof data>(
		'leaveRequests',
		authToken,
		data,
		onSuccess,
		onError
	);
}

export function updateLeaveRequest(
	id: number,
	authToken: string,
	data: Partial<LeaveRequest>,
	onSuccess?: () => void,
	onError?: (error: Api.Error) => void
) {
	updateResource<typeof data>(
		id,
		'leaveRequests',
		authToken,
		data,
		onSuccess,
		onError
	);
}

export function deleteLeaveRequest(
	id: number,
	authToken: string,
	onSuccess?: () => void,
	onError?: (error: Api.Error) => void
) {
	deleteResource<LeaveRequest>(
		id,
		'leaveRequests',
		authToken,
		onSuccess,
		onError
	);
}
