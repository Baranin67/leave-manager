import { Api } from './api';
import { Company } from './company';
import { User } from './user';

export type Employee = {
	id?: number;
	user?: User;
	company?: Company;
};

export namespace Employee {
	export type Fields = Api.Resource.Filters<Employee> & {
		user?: User.Fields;
	};
}
