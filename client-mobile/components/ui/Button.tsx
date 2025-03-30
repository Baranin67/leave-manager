import {
	StyleSheet,
	View,
	Pressable,
	PressableProps,
	StyleProp,
	ViewStyle,
} from 'react-native';
import { Link, router } from 'expo-router';
import { ViewProps } from 'react-native-svg/lib/typescript/fabric/utils';

import { Colors } from '@/constants/Colors';
import { Design } from '@/constants/Design';
import { ColorScheme, useColorScheme } from '@/hooks/useColorScheme.web';
import Icon, { IconProps } from './Icons';
import Text from './Text';
import { useNavigationHistory } from '@/contexts/navigationHistory';
import { Routes } from '@/constants/Routes';

type ButtonVariant =
	| 'primary'
	| 'secondary'
	| 'outline'
	| 'ghost'
	| 'delete'
	| 'navbar'
	| 'navbarActive'
	| 'filter'
	| 'filterActive'
	| 'panel'
	| 'panelLight'
	| 'icon';

export type ButtonProps = {
	children?: string;
	icon?: IconProps['name'];
	iconPos?: 'left' | 'right';
	onPress?: PressableProps['onPress'];
	variant?: ButtonVariant;
	url?: string;
	shouldGoBack?: boolean;
} & ViewProps;

export default function Button({
	children,
	icon,
	iconPos = 'left',
	onPress = () => {},
	variant = 'primary',
	shouldGoBack = false,
	url,
	...props
}: ButtonProps) {
	const colorScheme = useColorScheme();
	const navHistory = useNavigationHistory();

	const getPressableButton = (style: StyleProp<ViewStyle> = {}) => (
		<Pressable
			{...props}
			style={style}
			onPress={e => {
				onPress?.(e);

				if (shouldGoBack) navHistory.goBack(Routes.screens.mainDashboard);
			}}
		>
			{/* LEFT ICON */}
			{icon && iconPos === 'left' ? (
				<Icon
					name={icon}
					size={styles(colorScheme).icon[variant].size}
					color={styles(colorScheme).icon[variant].color}
				/>
			) : null}

			{/* LABEL */}
			<Text variant="label" color={styles(colorScheme).label[variant].color}>
				{children}
			</Text>

			{/* RIGHT ICON */}
			{icon && iconPos === 'right' ? (
				<Icon
					name={icon}
					size={styles(colorScheme).icon[variant].size}
					color={styles(colorScheme).icon[variant].color}
				/>
			) : null}
		</Pressable>
	);

	return (
		<View
			{...props}
			style={[
				styles(colorScheme).mainWrapper.common,
				styles(colorScheme).mainWrapper[variant],
				props.style,
			]}
		>
			{url === undefined ? (
				getPressableButton([
					styles(colorScheme).pressable.common,
					styles(colorScheme).pressable[variant],
				])
			) : (
				<Link
					href={url}
					onPress={() => navHistory.push(url)}
					asChild
					style={[
						styles(colorScheme).pressable.common,
						styles(colorScheme).pressable[variant],
					]}
				>
					{getPressableButton()}
					{/* <PressableButton
					icon={icon}
					iconPos={iconPos}
					variant={variant}
					shouldGoBack={shouldGoBack}
					onPress={onPress}
				>
					{children}
				</PressableButton> */}
				</Link>
			)}
		</View>
	);
}

const styles = (scheme: ColorScheme) => ({
	mainWrapper: StyleSheet.create({
		common: {
			display: 'flex',
			width: '100%',
			height: 'auto',
			borderRadius: Design.radius.large,
		},
		primary: {
			backgroundColor: Colors[scheme].primary[100],
		},
		secondary: {},
		outline: {
			borderWidth: Design.border.medium,
			borderColor: Colors[scheme].primary[100],
		},
		ghost: {},
		delete: {},
		navbar: {},
		navbarActive: {},
		filter: {},
		filterActive: {},
		panel: {
			backgroundColor: Colors[scheme].primary[100],
		},
		panelLight: {
			backgroundColor: Colors[scheme].textInverted[100],
		},
		icon: {
			width: 'auto',
		},
	}),
	pressable: StyleSheet.create({
		common: {
			display: 'flex',
			flexDirection: 'row',
			justifyContent: 'center',
			alignItems: 'center',
			gap: Design.space.xsmall,
			paddingHorizontal: Design.space.large,
			paddingVertical: Design.space.small,
			width: '100%',
		},
		primary: {},
		secondary: {},
		outline: {
			paddingVertical: Design.space.small - Design.border.medium,
		},
		ghost: {},
		delete: {},
		navbar: {},
		navbarActive: {},
		filter: {},
		filterActive: {},
		panel: {
			flexDirection: 'column',
			height: '100%',
		},
		panelLight: {
			flexDirection: 'column',
			height: '100%',
		},
		icon: {
			paddingHorizontal: Design.space.small,
			paddingVertical: Design.space.small,
		},
	}),
	icon: {
		primary: {
			size: Design.icon.small,
			color: Colors[scheme].textInverted[100],
		},
		secondary: {
			size: Design.icon.small,
			color: Colors[scheme].text[100],
		},
		outline: {
			size: Design.icon.small,
			color: Colors[scheme].primary[100],
		},
		ghost: {
			size: Design.icon.small,
			color: Colors[scheme].primary[100],
		},
		delete: {
			size: Design.icon.small,
			color: Colors[scheme].textInverted[100],
		},
		navbar: {
			size: Design.icon.small,
			color: Colors[scheme].text[100],
		},
		navbarActive: {
			size: Design.icon.small,
			color: Colors[scheme].primary[100],
		},
		filter: {
			size: Design.icon.small,
			color: Colors[scheme].background[100],
		},
		filterActive: {
			size: Design.icon.small,
			color: Colors[scheme].primary[100],
		},
		panel: {
			size: Design.icon.medium,
			color: Colors[scheme].textInverted[100],
		},
		panelLight: {
			size: Design.icon.medium,
			color: Colors[scheme].text[100],
		},
		icon: {
			size: Design.icon.small,
			color: Colors[scheme].textInverted[100],
		},
	} as const satisfies {
		[_ in ButtonProps['variant'] as string]: {
			size: number;
			color: string;
		};
	},
	label: {
		primary: {
			color: Colors[scheme].textInverted[100],
		},
		secondary: {
			color: Colors[scheme].text[100],
		},
		outline: {
			color: Colors[scheme].primary[100],
		},
		ghost: {
			color: Colors[scheme].primary[100],
		},
		delete: {
			color: Colors[scheme].textInverted[100],
		},
		navbar: {
			color: Colors[scheme].text[100],
		},
		navbarActive: {
			color: Colors[scheme].primary[100],
		},
		filter: {
			color: Colors[scheme].background[100],
		},
		filterActive: {
			color: Colors[scheme].primary[100],
		},
		panel: {
			color: Colors[scheme].textInverted[100],
		},
		panelLight: {
			color: Colors[scheme].text[100],
		},
		icon: {
			color: Colors[scheme].textInverted[100],
		},
	} as const satisfies {
		[_ in ButtonProps['variant'] as string]: {
			color: string;
		};
	},
});
