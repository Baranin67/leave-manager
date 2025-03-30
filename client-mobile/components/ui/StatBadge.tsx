import { View, ViewProps } from 'react-native';
import { StyleSheet } from 'react-native';

import { Design } from '@/constants/Design';
import { Colors } from '@/constants/Colors';
import { ColorScheme, useColorScheme } from '@/hooks/useColorScheme.web';
import Text from './Text';

type StatBadgeProps = {
	statName: string;
	currentAmount: number;
	totalAmount: number;
	backgroundColor: string;
	nameColor: string;
};

export default function StatBadge({
	statName,
	currentAmount,
	totalAmount,
	backgroundColor,
	nameColor,
	...props
}: StatBadgeProps & ViewProps) {
	const colorScheme = useColorScheme();

	return (
		<View
			{...props}
			style={[
				styles(colorScheme).mainWrapper.common,
				{ backgroundColor },
				props.style,
			]}
		>
			<Text
				variant="label"
				size="small"
				weight="bold"
				color={nameColor}
				transform="uppercase"
			>
				{statName}
			</Text>
			<View style={styles(colorScheme).amountWrapper.common}>
				<Text
					variant="heading"
					size="large"
					weight="bold"
					color={Colors[colorScheme].text[100]}
				>
					{currentAmount}
				</Text>
				<Text variant="label" size="medium">
					/{totalAmount}
				</Text>
			</View>
		</View>
	);
}

const styles = (scheme: ColorScheme) => ({
	mainWrapper: StyleSheet.create({
		common: {
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			gap: Design.space.xsmall,
			paddingHorizontal: Design.space.small,
			paddingVertical: Design.space.small,
			borderRadius: Design.radius.large,
		},
	}),
	amountWrapper: StyleSheet.create({
		common: {
			display: 'flex',
			flexDirection: 'row',
			alignItems: 'baseline',
		},
	}),
});
