import { View, StyleSheet } from 'react-native';

import type { LeaveType } from '@/types/leaves';
import { Design } from '@/constants/Design';
import { Colors } from '@/constants/Colors';
import { ColorScheme, useColorScheme } from '@/hooks/useColorScheme.web';
import Text from './Text';

type LeaveTypeStatBadgeProps = {
	type: LeaveType;
	current: number;
	max: number;
};

export default function LeaveTypeStatBadge({
	type,
	current,
	max,
}: LeaveTypeStatBadgeProps) {
	const colorScheme = useColorScheme();

	return (
		<View style={styles(colorScheme).leaveInfoWrapper.common}>
			{/* LEAVE TYPE */}
			<View style={styles(colorScheme).leaveTypeWrapper.common}>
				<Text
					variant="heading"
					size="medium"
					weight="regular"
					transform="capitalize"
					color={styles(colorScheme).leaveTypeText[type].color}
				>
					{type}
				</Text>
			</View>
			<View style={styles(colorScheme).requestsCountWrapper.common}>
				{/* REQUESTS COUNT */}
				<Text
					variant="heading"
					size="large"
					weight="bold"
					transform="capitalize"
					color={styles(colorScheme).requestsCountText[type].color}
				>
					{current}
				</Text>
				{/* MAX REQUESTS */}
				<Text
					variant="body"
					size="large"
					weight="regular"
					transform="capitalize"
					color={styles(colorScheme).maxLeavesText[type].color}
				>
					/{max}
				</Text>
			</View>
		</View>
	);
}

const styles = (scheme: ColorScheme) => ({
	leaveInfoWrapper: StyleSheet.create({
		common: {
			display: 'flex',
			flexDirection: 'row',
		},
	}),
	leaveTypeWrapper: StyleSheet.create({
		common: {
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			flex: 1,
			padding: Design.space.small,
			borderTopLeftRadius: Design.radius.large,
			borderBottomLeftRadius: Design.radius.large,
			backgroundColor: Colors[scheme].backgroundLighter[100],
		},
	}),
	leaveTypeText: {
		casual: {
			color: Colors[scheme].red[100],
		},
		vacation: {
			color: Colors[scheme].blue[100],
		},
	},
	requestsCountWrapper: StyleSheet.create({
		common: {
			display: 'flex',
			flexDirection: 'row',
			alignItems: 'baseline',
			padding: Design.space.small,
			borderTopRightRadius: Design.radius.large,
			borderBottomRightRadius: Design.radius.large,
			backgroundColor: Colors[scheme].backgroundLighter[60],
		},
	}),
	requestsCountText: {
		casual: {
			color: Colors[scheme].red[100],
		},
		vacation: {
			color: Colors[scheme].blue[100],
		},
	},
	maxLeavesText: {
		casual: {
			color: Colors[scheme].red[100],
		},
		vacation: {
			color: Colors[scheme].blue[100],
		},
	},
});
