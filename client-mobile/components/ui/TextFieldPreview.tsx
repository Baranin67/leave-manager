import { StyleSheet, View } from 'react-native';

import { Design } from '@/constants/Design';
import { Colors } from '@/constants/Colors';
import Icon, { IconProps } from './Icons';
import { ColorScheme, useColorScheme } from '@/hooks/useColorScheme.web';
import Text from './Text';

type TextFieldPreviewProps = {
	label: string;
	value: string;
	icon?: IconProps['name'];
};

export default function TextFieldPreview({
	label,
	value,
	icon,
}: TextFieldPreviewProps) {
	const colorScheme = useColorScheme();

	return (
		<View style={styles(colorScheme).mainWrapper.common}>
			<View style={styles(colorScheme).labelWrapper.common}>
				{icon === undefined ? null : (
					<Icon
						name={icon}
						size={Design.icon.small}
						color={Colors[colorScheme].text[20]}
					/>
				)}
				<Text
					variant="label"
					weight="bold"
					color={Colors[colorScheme].text[60]}
				>
					{label}
				</Text>
			</View>
			<View style={styles(colorScheme).valueWrapper.common}>
				{value === undefined ? (
					<Text color={Colors[colorScheme].text[20]}>Nothing here...</Text>
				) : (
					<Text color={Colors[colorScheme].text[80]}>{value}</Text>
				)}
			</View>
		</View>
	);
}

const styles = (scheme: ColorScheme) => ({
	mainWrapper: StyleSheet.create({
		common: {
			alignItems: 'flex-start',
		},
	}),
	labelWrapper: StyleSheet.create({
		common: {
			display: 'flex',
			flexDirection: 'row',
			alignItems: 'center',
			gap: Design.space.xsmall,
			paddingHorizontal: Design.space.small,
			paddingVertical: Design.space.xsmall,
			borderTopLeftRadius: Design.radius.large,
			borderTopRightRadius: Design.radius.large,
			backgroundColor: Colors[scheme].backgroundLighter[60],
		},
	}),
	valueWrapper: StyleSheet.create({
		common: {
			width: '100%',
			paddingHorizontal: Design.space.small * 2 + Design.space.xsmall,
			paddingVertical: Design.space.small,
			borderBottomLeftRadius: Design.radius.large,
			borderBottomRightRadius: Design.radius.large,
			borderTopRightRadius: Design.radius.large,
			backgroundColor: Colors[scheme].backgroundLighter[100],
		},
	}),
});
