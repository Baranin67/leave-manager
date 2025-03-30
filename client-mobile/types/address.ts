import { Api } from './api';

export type Address = {
	id?: number;
	country?: string;
	postalCode?: string;
	state?: string;
	street?: string;
	city?: string;
	buildingNumber?: string;
	apartmentNumber?: string;
};

export namespace Address {
	export type Fields = Api.Resource.StandardFields<Address>;
	export type Where = Api.Resource.StandardWhere<Address>;
}
