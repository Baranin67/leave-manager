import { Address } from './address';
import { Api } from './api';
import { Company } from './company';
import { Role } from './role';

export type User = {
	id: number;
	email: string;
	authToken: string;
	password: string;
	firstName: string;
	lastName: string;
	role: Role;
	isActive: boolean;
	avatarUrl: string | null;
	middleName: string | null;
	phoneNumber: string | null;
	address: Address | null;
	company: Company | null;
	companyRole: string | null;
};

export namespace User {
	export type Fields =
		| Omit<Api.Resource.StandardFields<User>, 'address' | 'company'>
		| {
				address?: Address.Fields | boolean;
				company?: Company.Fields | boolean;
		  };

	export type Where = Api.Resource.StandardWhere<User>;

	export type Action = Api.Resource.StandardActions | 'login';

	export type ResponseData<F extends User.Fields> = {
		[P in keyof F as keyof User]: User[P];
	};
}

export type UserCookieData = {
	id: number;
	token: string;
};

export type UserStateContextValues = {
	user: Partial<User> | null;
	fetch: (
		onSuccess?: (data: Partial<User>) => void,
		onError?: (error: Api.Error) => void
	) => void;
	update: (
		data: Partial<User>,
		onSuccess?: () => void,
		onError?: (error: Api.Error) => void
	) => void;
	refreshToken: (
		onSuccess: () => void,
		onError: (error: Api.Error) => void
	) => void;
	login: (
		email: string,
		password: string,
		onSuccess?: () => void,
		onError?: (error: Api.Error) => void
	) => void;
	logout: (
		onSuccess?: () => void,
		onError?: (error: Api.Error) => void
	) => void;
};

export type UserProviderProps = {
	children: React.ReactNode;
};
