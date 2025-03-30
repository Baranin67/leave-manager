import { LeaveStatus, LeaveType } from '@/types/leaves';
import {
	Pressable,
	PressableProps,
	StyleSheet,
	View,
	ViewProps,
} from 'react-native';

import { ColorScheme, useColorScheme } from '@/hooks/useColorScheme.web';
import { Design } from '@/constants/Design';
import { Colors } from '@/constants/Colors';
import LeaveTypeBadge from './LeaveTypeBadge';
import LeaveRequestStatusBadge from './LeaveRequestStatusBadge';
import LeaveRequestListItemDate from './LeaveRequestListItemDate';
import Text from './Text';
import { router } from 'expo-router';
import { Routes } from '@/constants/Routes';
import { replace } from '@/utils/text';

type LeaveRequestListItemProps = {
	id: number;
	leaveType: LeaveType;
	startDate: Date;
	endDate: Date;
	status: LeaveStatus;
	position: number;
};

export default function LeaveRequestListItem({
	id,
	leaveType,
	startDate,
	endDate,
	status,
	position,
}: LeaveRequestListItemProps) {
	const colorScheme = useColorScheme();

	function handleClick() {
		router.push(replace(Routes.screens.leaveRequestView, String(id)));
	}

	return (
		<Pressable onPress={handleClick}>
			<View style={styles(colorScheme).wrapper}>
				{/* LEAVE TYPE */}
				<LeaveTypeBadge leaveType={leaveType} />

				{/* START DATE */}
				<LeaveRequestListItemDate date={startDate} />

				{/* END DATE */}
				<LeaveRequestListItemDate date={endDate} />

				{/* STATUS */}
				<LeaveRequestStatusBadge leaveStatus={status} />

				{/* POSITION */}
				<View style={styles(colorScheme).positionWrapper}>
					<Text variant="label">#{position}</Text>
				</View>
			</View>
		</Pressable>
	);
}

const styles = (scheme: ColorScheme) =>
	StyleSheet.create({
		wrapper: {
			display: 'flex',
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
			paddingVertical: Design.space.small,
		},
		positionWrapper: {
			display: 'flex',
			flexDirection: 'row',
			justifyContent: 'flex-end',
			width: 30,
		},
	});
