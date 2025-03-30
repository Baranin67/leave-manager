import { Address } from './address';
import { Api } from './api';
import { User } from './user';

export type Company = {
	id?: number;
	name?: string;
	address?: Address;
	employees?: User[];
};

export namespace Company {
	export type Fields = Api.Resource.StandardFields<Company> & {
		address?: Address.Fields;
		employees?: User.Fields;
	};

	export type Where = Api.Resource.StandardWhere<Company>;
}
