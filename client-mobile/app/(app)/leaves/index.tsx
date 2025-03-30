import Button from '@/components/ui/Button';
import LeaveRequestListItem from '@/components/ui/LeaveRequestListItem';
import SectionHeader from '@/components/ui/SectionHeader';
import Separator from '@/components/ui/Separator';
import StatBadge from '@/components/ui/StatBadge';
import { Colors } from '@/constants/Colors';
import { Design } from '@/constants/Design';
import { Routes } from '@/constants/Routes';
import { ColorScheme, useColorScheme } from '@/hooks/useColorScheme.web';
import { ScrollView, StyleSheet, View } from 'react-native';

export default function LeavesDashboard() {
	const colorScheme = useColorScheme();

	return (
		<ScrollView contentContainerStyle={styles(colorScheme).mainWrapper}>
			<View style={styles(colorScheme).statsWrapper}>
				<SectionHeader>Statistics</SectionHeader>
				<View style={styles(colorScheme).statsRow}>
					<StatBadge
						style={styles(colorScheme).statBadge}
						statName="vacation"
						currentAmount={2}
						totalAmount={5}
						backgroundColor={Colors[colorScheme].red[20]}
						nameColor={Colors[colorScheme].red[100]}
					/>
					<StatBadge
						style={styles(colorScheme).statBadge}
						statName="casual"
						currentAmount={6}
						totalAmount={10}
						backgroundColor={Colors[colorScheme].blue[20]}
						nameColor={Colors[colorScheme].blue[100]}
					/>
				</View>
				<Button
					variant="outline"
					icon="plus"
					url={Routes.screens.leaveRequestCreate}
				>
					Request a leave
				</Button>
			</View>
			<View style={styles(colorScheme).recentRequestsWrapper}>
				<SectionHeader>Recent requests</SectionHeader>
				<View style={styles(colorScheme).requestsList}>
					<LeaveRequestListItem
						id={1}
						leaveType={'casual'}
						startDate={new Date()}
						endDate={new Date()}
						status={'pending'}
						position={0}
					/>
					<Separator />
					<LeaveRequestListItem
						id={2}
						leaveType={'vacation'}
						startDate={new Date()}
						endDate={new Date()}
						status={'rejected'}
						position={0}
					/>
					<Separator />
				</View>
				<Button variant="ghost" url={Routes.screens.leaveRequestsList}>
					See more...
				</Button>
			</View>
		</ScrollView>
	);
}

const styles = (scheme: ColorScheme) =>
	StyleSheet.create({
		mainWrapper: {
			display: 'flex',
			alignItems: 'center',
			gap: Design.space.large,
			padding: Design.space.small,
			height: '100%',
		},
		statsWrapper: {
			display: 'flex',
			gap: Design.space.small,
			width: '100%',
		},
		statsRow: {
			display: 'flex',
			flexDirection: 'row',
			justifyContent: 'center',
			gap: Design.space.xsmall,
		},
		statBadge: {
			flex: 1,
		},
		recentRequestsWrapper: {
			display: 'flex',
			gap: Design.space.small,
			padding: Design.space.small,
			width: '100%',
			borderRadius: Design.radius.large,
			backgroundColor: Colors[scheme].backgroundLighter[100],
		},
		requestsList: {
			display: 'flex',
		},
	});
