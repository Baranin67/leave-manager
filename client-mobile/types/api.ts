import type { Address } from './address';
import type { Company } from './company';
import type { LeaveRequest } from './leaves';
import type { User } from './user';

export namespace Api {
	export type Method = 'GET' | 'PUT' | 'PATCH' | 'POST' | 'DELETE';

	export type Success<R> = {
		code: number;
		message?: string;
		data?: R;
	};

	export type Error = {
		code: number;
		message?: string;
	};

	export namespace Resource {
		export type Types = User | Company | Address | LeaveRequest;

		export type NameToType = {
			users: User;
			companies: Company;
			addresses: Address;
			leaveRequests: LeaveRequest;
		};

		export type StandardActions = 'view' | 'create' | 'update' | 'delete';

		export type StandardFields<R> = {
			[P in keyof R]?: boolean;
		};

		export type StandardWhere<R> = Partial<R>;
	}

	export namespace Request {
		export type Get<_R> = {};

		export type Put<R> = {
			data: R;
		};

		export type Post<R> = {
			data: R;
		};

		export type Patch<R> = {
			data: R;
		};

		export type Delete<_R> = {};
	}
}
