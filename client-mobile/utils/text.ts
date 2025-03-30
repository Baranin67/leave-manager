import qs from 'qs';

export function replace(text: string, ...args: string[]): string {
	return args.reduce((newText, arg) => newText.replace('%s', arg), text);
}

export function buildUrl(url: string, queryObject: any): string {
	return (
		url + qs.stringify(queryObject, { addQueryPrefix: true, encode: false })
	);
}
