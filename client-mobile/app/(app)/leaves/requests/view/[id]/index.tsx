import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Toast from 'react-native-toast-message';

import type { LeaveRequest } from '@/types/leaves';
import { User } from '@/types/user';
import { Company } from '@/types/company';
import { Design } from '@/constants/Design';
import { Routes } from '@/constants/Routes';
import {
	deleteLeaveRequest,
	getLeaveRequests,
	updateLeaveRequest,
} from '@/utils/leaves';
import { ColorScheme, useColorScheme } from '@/hooks/useColorScheme.web';
import { useUserState } from '@/contexts/user';
import LoadingView from '@/components/ui/LoadingView';
import NotFoundView from '@/components/ui/NotFoundView';
import LeaveTypeStatBadge from '@/components/ui/LeaveTypeAndStatBadge';
import LeaveRequestStatusBar from '@/components/ui/LeaveRequestStatusBar';
import LeaveRequestDateRangeView from '@/components/ui/LeaveRequestDateRangeView';
import TextFieldPreview from '@/components/ui/TextFieldPreview';
import Button from '@/components/ui/Button';
import ProfileDetailsView from '@/components/ui/ProfileDetailsView';

type LeaveRequestViewType = Pick<
	LeaveRequest,
	| 'id'
	| 'leaveType'
	| 'status'
	| 'startDate'
	| 'endDate'
	| 'userComment'
	| 'managerComment'
> & {
	user: Pick<
		User,
		'id' | 'firstName' | 'lastName' | 'companyRole' | 'avatarUrl'
	> & {
		company: Pick<Company, 'name'>;
	};
};

export default function LeaveRequestView() {
	const colorScheme = useColorScheme();
	const searchParams = useLocalSearchParams<{ id: string }>();
	const { user } = useUserState();

	const [isLoading, setLoading] = useState(true);
	const [leaveRequest, setLeaveRequest] = useState<LeaveRequestViewType | null>(
		null
	);

	function handleDelete() {
		if (leaveRequest?.id === undefined || typeof user?.authToken !== 'string')
			return;

		deleteLeaveRequest(
			leaveRequest.id,
			user.authToken,
			() => {
				Toast.show({
					type: 'success',
					text1: 'Leave request deleted successfully',
				});
				router.push(Routes.screens.leaveRequestsList);
			},
			err => {
				Toast.show({
					type: 'error',
					text1: err.message,
				});
			}
		);
	}

	function handleReject() {
		if (leaveRequest?.id === undefined || typeof user?.authToken !== 'string')
			return;

		updateLeaveRequest(
			leaveRequest.id,
			user.authToken,
			{
				status: 'rejected',
			},
			() => {
				Toast.show({
					type: 'success',
					text1: 'Leave request rejected successfully',
				});
				router.reload();
			},
			err => {
				Toast.show({
					type: 'error',
					text1: err.message,
				});
			}
		);
	}

	function handleApprove() {
		if (leaveRequest?.id === undefined || typeof user?.authToken !== 'string')
			return;

		updateLeaveRequest(
			leaveRequest.id,
			user.authToken,
			{
				status: 'approved',
			},
			() => {
				Toast.show({
					type: 'success',
					text1: 'Leave request approved successfully',
				});
				router.reload();
			},
			err => {
				Toast.show({
					type: 'error',
					text1: err.message,
				});
			}
		);
	}

	useEffect(() => {
		if (
			searchParams.id === undefined ||
			user?.authToken === undefined ||
			typeof searchParams.id !== 'string'
		)
			return;

		const leaveRequestId = parseInt(searchParams.id);

		if (isNaN(leaveRequestId)) return;

		getLeaveRequests(
			user.authToken,
			{
				id: true,
				leaveType: true,
				startDate: true,
				endDate: true,
				userComment: true,
				managerComment: true,
				status: true,
				user: {
					id: true,
					firstName: true,
					lastName: true,
					company: {
						name: true,
					},
					companyRole: true,
					avatarUrl: true,
				},
			},
			{
				id: leaveRequestId,
			},
			data => {
				setLoading(false);

				if (data.length === 0) {
					setLoading(false);
					Toast.show({
						type: 'error',
						text1: 'Leave request not found',
					});
					return;
				}

				setLeaveRequest(data[0]);
			},
			err => {
				setLoading(false);
				Toast.show({
					type: 'error',
					text1: err.message,
				});
			}
		);
	}, [searchParams.id]);

	return isLoading ? (
		<LoadingView />
	) : leaveRequest ? (
		<ScrollView contentContainerStyle={styles(colorScheme).mainWrapper.common}>
			{/* STATUS */}
			<LeaveRequestStatusBar status={leaveRequest.status} />

			{/* USER'S DETAILS */}
			{user?.role === 'manager' ? (
				<ProfileDetailsView user={leaveRequest.user} />
			) : null}

			{/* LEAVE TYPE */}
			<LeaveTypeStatBadge type={leaveRequest.leaveType} current={2} max={5} />

			{/* DATE RANGE */}
			<LeaveRequestDateRangeView
				startDate={leaveRequest.startDate}
				endDate={leaveRequest.endDate}
			/>

			{/* USER'S COMMENT */}
			<TextFieldPreview
				label={
					leaveRequest.user?.id === user?.id
						? 'Your comment'
						: "Employee's comment"
				}
				value={leaveRequest.userComment}
				icon="chat-cloud"
			/>

			{/* MANAGER'S COMMENT */}
			<TextFieldPreview
				label="Manager's comment"
				value={leaveRequest.managerComment}
				icon="chat-cloud"
			/>

			{/* ACTION BUTTONS */}
			<View style={styles(colorScheme).actionButtonsWrapper.common}>
				<Button
					variant="outline"
					icon={user?.role === 'manager' ? 'close' : 'trash'}
					style={styles(colorScheme).actionButton.common}
					onPress={user?.role === 'manager' ? handleReject : handleDelete}
				>
					{user?.role === 'manager' ? 'Reject' : 'Delete'}
				</Button>
				<Button
					variant="primary"
					icon={user?.role === 'manager' ? 'checkmark' : 'pen'}
					style={styles(colorScheme).actionButton.common}
					url={
						user?.role === 'manager'
							? undefined
							: Routes.screens.leaveRequestEdit
					}
					onPress={user?.role === 'manager' ? handleApprove : undefined}
				>
					{user?.role === 'manager' ? 'Approve' : 'Edit'}
				</Button>
			</View>
		</ScrollView>
	) : (
		<NotFoundView
			title="Leave request not found"
			message="This is most likely a server error. Contact our administrators for support."
		/>
	);
}

const styles = (_scheme: ColorScheme) => ({
	mainWrapper: StyleSheet.create({
		common: {
			display: 'flex',
			gap: Design.space.large,
			paddingHorizontal: Design.space.small,
			paddingBottom: Design.space.small,
		},
	}),
	actionButtonsWrapper: StyleSheet.create({
		common: {
			display: 'flex',
			flexDirection: 'row',
			gap: Design.space.small,
		},
	}),
	actionButton: StyleSheet.create({
		common: {
			flex: 1,
		},
	}),
});
