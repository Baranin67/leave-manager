import { ReactNode } from 'react';
import {
	Text as ReactNativeText,
	TextProps as ReactNativeTextProps,
	TextStyle,
} from 'react-native';

import { Design } from '@/constants/Design';
import { Colors } from '@/constants/Colors';
import { ColorScheme, useColorScheme } from '@/hooks/useColorScheme.web';

type TextVariant = keyof typeof Design.font;
type TextSize = keyof (typeof Design.font)[TextVariant]['size'];
type TextWeight = keyof (typeof Design.font)[TextVariant]['weight'];

export type TextProps = {
	children?: ReactNode;
	variant?: TextVariant;
	size?: TextSize;
	weight?: TextWeight;
	color?: string;
	transform?: TextStyle['transform'];
	align?: TextStyle['textAlign'];
} & ReactNativeTextProps;

const DEFAULTS = (scheme: ColorScheme) =>
	({
		body: {
			size: 'medium',
			weight: 'regular',
			color: Colors[scheme].text[100],
		},
		label: {
			size: 'medium',
			weight: 'regular',
			color: Colors[scheme].text[100],
		},
		heading: {
			size: 'medium',
			weight: 'bold',
			color: Colors[scheme].primary[100],
		},
	} as const satisfies {
		[_ in TextVariant]: {
			size: TextSize;
			weight: TextWeight;
			color: string;
		};
	});

export default function Text({
	variant = 'body',
	size,
	weight,
	color,
	transform,
	align,
	...textProps
}: TextProps) {
	const colorScheme = useColorScheme();

	const fontSize = size
		? Design.font[variant]?.size[size]
		: Design.font[variant]?.size[DEFAULTS(colorScheme)[variant].size];

	const fontWeight = weight
		? Design.font[variant]?.weight[weight]
		: Design.font[variant]?.weight[DEFAULTS(colorScheme)[variant].weight];

	const fontColor = color ?? DEFAULTS(colorScheme)[variant].color;

	return (
		<ReactNativeText
			textBreakStrategy="balanced"
			style={{
				fontFamily: Design.font[variant]?.family,
				fontSize,
				fontWeight,
				lineHeight: fontSize * 1.4,
				color: fontColor,
				textTransform: transform,
				textAlign: align,
			}}
			{...textProps}
		/>
	);
}
