import { StyleSheet, View } from 'react-native';
import { ViewProps } from 'react-native-svg/lib/typescript/fabric/utils';

import { Design } from '@/constants/Design';
import { Colors } from '@/constants/Colors';
import { ColorScheme, useColorScheme } from '@/hooks/useColorScheme.web';
import Text from './Text';

type BadgeProps = {
	children: string;
} & ViewProps;

export default function Badge({ children, ...wrapperProps }: BadgeProps) {
	const colorScheme = useColorScheme();

	return (
		<View
			{...wrapperProps}
			style={[styles(colorScheme).wrapper.common, wrapperProps.style]}
		>
			<Text
				variant="label"
				size="small"
				color={Colors[colorScheme].textInverted[100]}
				weight="regular"
			>
				{children}
			</Text>
		</View>
	);
}

const styles = (scheme: ColorScheme) => ({
	wrapper: StyleSheet.create({
		common: {
			alignSelf: 'flex-start',
			paddingHorizontal: Design.space.xsmall,
			width: 'auto',
			borderRadius: Design.radius.medium,
			backgroundColor: Colors[scheme].primary[100],
		},
	}),
});
