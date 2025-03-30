import { ColorScheme } from '@/hooks/useColorScheme.web';

type Colors = {
	primary: [100, 60, 40, 20, 10, 5];
	secondary: [100];
	secondaryDark: [100];
	inputPlaceholder: [100];
	inputIcon: [100];
	inputLabel: [100];
	green: [100, 40, 20, 10];
	red: [100, 60, 40, 20, 10];
	yellow: [100, 40, 20, 10];
	blue: [100, 40, 20, 10];
	text: [100, 80, 60, 20, 10];
	textInverted: [100, 60];
	background: [100];
	backgroundLighter: [100, 60];
};

type Shades<Color extends keyof Colors> = Colors[Color][number];

type Scheme = {
	[Color in keyof Colors]: {
		[Shade in Shades<Color>]: string;
	};
};

type Schemes = {
	[_ in ColorScheme]: Scheme;
};

export const Colors = {
	light: {
		primary: {
			100: 'hsla(251, 52%, 13%, 1)',
			60: 'hsla(251, 52%, 13%, .6)',
			40: 'hsla(251, 52%, 13%, .4)',
			20: 'hsla(251, 52%, 13%, .2)',
			10: 'hsla(251, 52%, 13%, .1)',
			5: 'hsla(251, 52%, 13%, .05)',
		},
		secondary: {
			100: 'hsla(251, 43%, 92%, 1)',
		},
		secondaryDark: {
			100: 'hsla(251, 35%, 81%, 1)',
		},
		inputPlaceholder: {
			100: 'hsla(251, 31%, 79%, 1)',
		},
		inputIcon: {
			100: 'hsla(251, 25%, 47%, 1)',
		},
		inputLabel: {
			100: 'hsla(251, 25%, 47%, 1)',
		},
		green: {
			100: 'hsla(145, 63%, 49%, 1)',
			40: 'hsla(145, 63%, 49%, .4)',
			20: 'hsla(145, 63%, 49%, .2)',
			10: 'hsla(145, 63%, 49%, .1)',
		},
		red: {
			100: 'hsla(6, 78%, 57%, 1)',
			60: 'hsla(6, 78%, 57%, .6)',
			40: 'hsla(6, 78%, 57%, .4)',
			20: 'hsla(6, 78%, 57%, .2)',
			10: 'hsla(6, 78%, 57%, .1)',
		},
		yellow: {
			100: 'hsla(48, 89%, 50%, 1)',
			40: 'hsla(48, 89%, 50%, .4)',
			20: 'hsla(48, 89%, 50%, .2)',
			10: 'hsla(48, 89%, 50%, .1)',
		},
		blue: {
			100: 'hsla(197, 63%, 49%, 1)',
			40: 'hsla(197, 63%, 49%, .4)',
			20: 'hsla(197, 63%, 49%, .2)',
			10: 'hsla(197, 63%, 49%, .1)',
		},
		text: {
			100: 'hsla(0, 0%, 7%, 1)',
			80: 'hsla(0, 0%, 7%, .8)',
			60: 'hsla(0, 0%, 7%, .6)',
			20: 'hsla(0, 0%, 7%, .2)',
			10: 'hsla(0, 0%, 7%, .1)',
		},
		textInverted: {
			100: 'hsla(0, 0%, 93%, 1)',
			60: 'hsla(0, 0%, 93%, .6)',
		},
		background: {
			100: 'hsla(0, 0%, 93%, 1)',
		},
		backgroundLighter: {
			100: 'hsla(0, 0%, 100%, 1)',
			60: 'hsla(0, 0%, 100%, .6)',
		},
	},
	dark: {
		primary: {
			100: 'hsla(251, 52%, 13%, 1)',
			60: 'hsla(251, 52%, 13%, .6)',
			40: 'hsla(251, 52%, 13%, .4)',
			20: 'hsla(251, 52%, 13%, .2)',
			10: 'hsla(251, 52%, 13%, .1)',
			5: 'hsla(251, 52%, 13%, .05)',
		},
		secondary: {
			100: 'hsla(251, 43%, 92%, 1)',
		},
		secondaryDark: {
			100: 'hsla(251, 35%, 81%, 1)',
		},
		inputPlaceholder: {
			100: 'hsla(251, 31%, 79%, 1)',
		},
		inputIcon: {
			100: 'hsla(251, 25%, 47%, 1)',
		},
		inputLabel: {
			100: 'hsla(251, 25%, 47%, 1)',
		},
		green: {
			100: 'hsla(145, 63%, 49%, 1)',
			40: 'hsla(145, 63%, 49%, .4)',
			20: 'hsla(145, 63%, 49%, .2)',
			10: 'hsla(145, 63%, 49%, .1)',
		},
		red: {
			100: 'hsla(6, 78%, 57%, 1)',
			60: 'hsla(6, 78%, 57%, .6)',
			40: 'hsla(6, 78%, 57%, .4)',
			20: 'hsla(6, 78%, 57%, .2)',
			10: 'hsla(6, 78%, 57%, .1)',
		},
		yellow: {
			100: 'hsla(48, 89%, 50%, 1)',
			40: 'hsla(48, 89%, 50%, .4)',
			20: 'hsla(48, 89%, 50%, .2)',
			10: 'hsla(48, 89%, 50%, .1)',
		},
		blue: {
			100: 'hsla(197, 63%, 49%, 1)',
			40: 'hsla(197, 63%, 49%, .4)',
			20: 'hsla(197, 63%, 49%, .2)',
			10: 'hsla(197, 63%, 49%, .1)',
		},
		text: {
			100: 'hsla(0, 0%, 7%, 1)',
			80: 'hsla(0, 0%, 7%, .8)',
			60: 'hsla(0, 0%, 7%, .6)',
			20: 'hsla(0, 0%, 7%, .2)',
			10: 'hsla(0, 0%, 7%, .1)',
		},
		textInverted: {
			100: 'hsla(0, 0%, 93%, 1)',
			60: 'hsla(0, 0%, 93%, .6)',
		},
		background: {
			100: 'hsla(0, 0%, 93%, 1)',
		},
		backgroundLighter: {
			100: 'hsla(0, 0%, 100%, 1)',
			60: 'hsla(0, 0%, 100%, .6)',
		},
	},
} as const satisfies Schemes;
