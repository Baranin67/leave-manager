import { Api } from './api';
import { User } from './user';

export type LeaveType = 'vacation' | 'casual';
export type LeaveStatus = 'pending' | 'approved' | 'rejected';

export type LeaveRequest = {
	id: number;
	user: User;
	leaveType: LeaveType;
	startDate: Date;
	endDate: Date;
	status: LeaveStatus;
	userComment: string;
	managerComment: string;
	createdAt: Date;
	updatedAt: Date;
};

export namespace LeaveRequest {
	export type Fields = Omit<
		Api.Resource.StandardFields<LeaveRequest>,
		'user'
	> & {
		user?: User.Fields;
	};

	export type Where = Api.Resource.StandardWhere<LeaveRequest>;

	export type ResponseData<F extends LeaveRequest.Fields> = {
		[P in keyof F]: LeaveRequest[P];
	};
}

export type ViewLeaveRequest = {
	leaveRequestId: number;
};

export type CreateLeaveRequest = {
	userId: number;
	leaveType: LeaveType;
	startDate: string;
	endDate: string;
	status: LeaveStatus;
	userComment: string | null;
};

export type UpdateLeaveRequest = {
	leaveRequestId: number;
	leaveType?: LeaveType;
	startDate?: string;
	endDate?: string;
	status?: LeaveStatus;
	userComment?: string | null;
	managerComment?: string | null;
};

export type DeleteLeaveRequest = {
	leaveRequestId: number;
};
