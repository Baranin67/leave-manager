import { ReactNode } from 'react';
import { StyleSheet, View, Pressable, PressableProps } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme.web';
import { ThemedText } from '../ThemedText';
import { Colors } from '@/constants/Colors';
import { DesignSystem } from '@/constants/DesignSystem';
import { LinkProps, router } from 'expo-router';
import Icon, { IconProps } from './Icons';

type Props = {
	label: string;
	icon?: IconProps['name'];
	iconPos?: 'left' | 'right';
	onClick?: PressableProps['onPress'];
	variant?:
		| 'primary'
		| 'secondary'
		| 'outline'
		| 'delete'
		| 'navbar'
		| 'navbarActive';
	url?: LinkProps['href'];
};

export default function Button({
	label,
	icon,
	iconPos = 'left',
	onClick = () => {},
	variant = 'primary',
	url,
}: Props) {
	const colorScheme = useColorScheme();

	return (
		<View
			style={{
				...buttonWrapperStyles.common._,
				...buttonWrapperStyles[colorScheme][variant],
			}}
		>
			<Pressable
				style={{
					...pressableStyles.common._,
					...pressableStyles[colorScheme][variant],
				}}
				onPress={e => {
					onClick?.(e);
					if (url) router.push('/', { relativeToDirectory: true });
				}}
			>
				{icon && iconPos === 'left' ? (
					<Icon
						name={icon}
						size={DesignSystem.icon.small}
						color={iconColor[colorScheme][variant]}
					/>
				) : null}
				<ThemedText
					style={{
						...labelStyles.common._,
						...labelStyles[colorScheme][variant],
					}}
				>
					{label}
				</ThemedText>
				{icon && iconPos === 'right' ? (
					<Icon
						name={icon}
						size={DesignSystem.icon.small}
						color={iconColor[colorScheme][variant]}
					/>
				) : null}
			</Pressable>
		</View>
	);
}

const iconColor = {
	light: {
		primary: Colors.light.textInverted[100],
		secondary: Colors.light.text[100],
		outline: Colors.light.primary[100],
		delete: Colors.light.textInverted[100],
		navbar: Colors.light.text[100],
		navbarActive: Colors.light.primary[100],
	},
	dark: {
		primary: Colors.light.textInverted[100],
		secondary: Colors.light.text[100],
		outline: Colors.light.primary[100],
		delete: Colors.light.textInverted[100],
		navbar: Colors.light.text[100],
		navbarActive: Colors.light.primary[100],
	},
};

const buttonWrapperStyles = {
	common: StyleSheet.create({
		_: {},
	}),
	light: StyleSheet.create({
		primary: {},
		secondary: {},
		outline: {},
		delete: {},
		navbar: {},
		navbarActive: {},
	}),
	dark: StyleSheet.create({
		primary: {},
		secondary: {},
		outline: {},
		delete: {},
		navbar: {},
		navbarActive: {},
	}),
};

const pressableStyles = {
	common: StyleSheet.create({
		_: {
			position: 'relative',
			display: 'flex',
			flexDirection: 'row',
			justifyContent: 'center',
			alignItems: 'center',
			gap: DesignSystem.space.xsmall,
			paddingHorizontal: DesignSystem.space.large,
			paddingVertical: DesignSystem.space.small,
			width: '100%',
			borderRadius: DesignSystem.radius.large,
			fontWeight: 'bold',
		},
	}),
	light: StyleSheet.create({
		primary: {
			backgroundColor: Colors.light.primary[100],
		},
		secondary: {},
		outline: {
			paddingVertical: DesignSystem.space.small - DesignSystem.border.medium,
			borderWidth: DesignSystem.border.medium,
			borderColor: Colors.light.primary[100],
		},
		delete: {},
		navbar: {},
		navbarActive: {},
	}),
	dark: StyleSheet.create({
		primary: {},
		secondary: {},
		outline: {},
		delete: {},
		navbar: {},
		navbarActive: {},
	}),
};

const labelStyles = {
	common: StyleSheet.create({
		_: {
			fontWeight: 500,
			fontSize: DesignSystem.font.size.labelLarge,
		},
	}),
	light: StyleSheet.create({
		primary: {
			color: Colors.light.textInverted[100],
		},
		secondary: {},
		outline: {},
		delete: {},
		navbar: {},
		navbarActive: {},
	}),
	dark: StyleSheet.create({
		primary: {},
		secondary: {},
		outline: {},
		delete: {},
		navbar: {},
		navbarActive: {},
	}),
};
