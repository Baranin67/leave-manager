/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { ColorSchemeName } from 'react-native';

type ShadedColor = {
	[key: number]: string;
};

type Color = string;

type ColorsType = {
	[Scheme in ColorSchemeName]: {
		primary: ShadedColor;
		secondary: ShadedColor;
		secondaryDark: ShadedColor;
		inputPlaceholder: Color;
		inputIcon: Color;
		inputLabel: Color;
		green: ShadedColor;
		red: ShadedColor;
		yellow: ShadedColor;
		blue: ShadedColor;
		text: ShadedColor;
		textInverted: ShadedColor;
		background: Color;
		backgroundLighter: Color;
	};
};

export const Colors = {
	light: {
		primary: {
			100: 'hsla(251, 52%, 13%, 1)',
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
		inputPlaceholder: 'hsla(251, 31%, 79%, 1)',
		inputIcon: 'hsla(251, 25%, 47%, 1)',
		inputLabel: 'hsla(251, 25%, 47%, 1)',
		green: {
			100: 'hsla(145, 63%, 49%, 1)',
			40: 'hsla(145, 63%, 49%, .4)',
			20: 'hsla(145, 63%, 49%, .2)',
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
		},
		blue: {
			100: 'hsla(197, 63%, 49%, 1)',
			40: 'hsla(197, 63%, 49%, .4)',
		},
		text: {
			100: 'hsla(0, 0%, 7%, 1)',
		},
		textInverted: {
			100: 'hsla(0, 0%, 93%, 1)',
			60: 'hsla(0, 0%, 93%, .6)',
		},
		background: 'hsla(0, 0%, 93%, 1)',
		backgroundLighter: 'hsla(0, 0%, 100%, 1)',
	},
	dark: {
		// TODO
		primary: {
			100: 'hsla(251, 52%, 13%, 1)',
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
		inputPlaceholder: 'hsla(251, 31%, 79%, 1)',
		inputIcon: 'hsla(251, 25%, 47%, 1)',
		inputLabel: 'hsla(251, 25%, 47%, 1)',
		green: {
			100: 'hsla(145, 63%, 49%, 1)',
			40: 'hsla(145, 63%, 49%, .4)',
			20: 'hsla(145, 63%, 49%, .2)',
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
		},
		blue: {
			100: 'hsla(197, 63%, 49%, 1)',
			40: 'hsla(197, 63%, 49%, .4)',
		},
		text: {
			100: 'hsla(0, 0%, 7%, 1)',
		},
		textInverted: {
			100: 'hsla(0, 0%, 93%, 1)',
			60: 'hsla(0, 0%, 93%, .6)',
			10: 'hsla(0, 0%, 93%, .1)',
		},
		background: 'hsla(0, 0%, 93%, 1)',
		backgroundLighter: 'hsla(0, 0%, 100%, 1)',
	},
} as const satisfies ColorsType;
