import LeaveRequestListItem from '@/components/ui/LeaveRequestListItem';
import { Design } from '@/constants/Design';
import { useUserState } from '@/contexts/user';
import { ColorScheme, useColorScheme } from '@/hooks/useColorScheme.web';
import { LeaveRequest } from '@/types/leaves';
import { getLeaveRequests } from '@/utils/leaves';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

type LeaveRequestItem = Pick<
	LeaveRequest,
	'id' | 'leaveType' | 'startDate' | 'endDate' | 'status'
>;

export default function LeaveRequestsList() {
	const { user } = useUserState();
	const colorScheme = useColorScheme();

	const [leaveRequests, setLeaveRequests] = useState<LeaveRequestItem[]>([]);

	useEffect(() => {
		if (user?.authToken === undefined) return;

		getLeaveRequests(
			user.authToken,
			{
				id: true,
				leaveType: true,
				startDate: true,
				endDate: true,
				status: true,
			},
			{},
			data => {
				setLeaveRequests(data);
			},
			err => console.error(err)
		);
	}, []);

	return (
		<View style={styles(colorScheme).mainWrapper}>
			<View style={styles(colorScheme).requestsListWrapper}>
				{leaveRequests.map((req, idx) => (
					<LeaveRequestListItem
						key={idx}
						id={req.id}
						leaveType={req.leaveType}
						startDate={req.startDate}
						endDate={req.endDate}
						status={req.status}
						position={0}
					/>
				))}
			</View>
		</View>
	);
}

const styles = (_scheme: ColorScheme) =>
	StyleSheet.create({
		mainWrapper: {
			display: 'flex',
			flexDirection: 'column',
		},
		requestsListWrapper: {
			display: 'flex',
			flexDirection: 'column',
			paddingHorizontal: Design.space.small,
		},
	});
