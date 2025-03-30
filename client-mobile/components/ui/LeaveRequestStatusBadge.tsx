import { LeaveStatus, LeaveType } from '@/types/leaves';
import { StyleSheet, View } from 'react-native';

import { ColorScheme, useColorScheme } from '@/hooks/useColorScheme.web';
import { Colors } from '@/constants/Colors';
import { Design } from '@/constants/Design';
import Text from './Text';

type LeaveStatusBadgeProps = {
	leaveStatus: LeaveStatus;
};

export default function LeaveRequestStatusBadge({
	leaveStatus,
}: LeaveStatusBadgeProps) {
	const colorScheme = useColorScheme();

	return (
		<View
			style={[
				styles(colorScheme).wrapper.common,
				styles(colorScheme).wrapper[leaveStatus],
			]}
		>
			<Text
				variant="label"
				size="small"
				transform="uppercase"
				color={styles(colorScheme).text[leaveStatus].color}
			>
				{leaveStatus}
			</Text>
		</View>
	);
}

const styles = (scheme: ColorScheme) => ({
	wrapper: StyleSheet.create({
		common: {
			display: 'flex',
			alignItems: 'center',
			width: 75,
			borderRadius: Design.radius.medium,
		},
		pending: {
			backgroundColor: Colors[scheme].yellow[100],
		},
		approved: {
			backgroundColor: Colors[scheme].green[100],
		},
		rejected: {
			backgroundColor: Colors[scheme].red[100],
		},
	}),
	text: {
		pending: {
			color: Colors[scheme].text[100],
		},
		approved: {
			color: Colors[scheme].text[100],
		},
		rejected: {
			color: Colors[scheme].textInverted[100],
		},
	} as const satisfies {
		[_ in LeaveStatus]: {
			color: string;
		};
	},
});
