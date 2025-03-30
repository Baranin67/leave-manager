import { StyleSheet, View } from 'react-native';

import type { LeaveStatus } from '@/types/leaves';
import { Design } from '@/constants/Design';
import { Colors } from '@/constants/Colors';
import { ColorScheme, useColorScheme } from '@/hooks/useColorScheme.web';
import Text from './Text';

type LeaveStatusBarProps = {
	status: LeaveStatus;
};

export default function LeaveRequestStatusBar({ status }: LeaveStatusBarProps) {
	const colorScheme = useColorScheme();

	return (
		<View
			style={[
				styles(colorScheme).wrapper.common,
				styles(colorScheme).wrapper[status],
			]}
		>
			<Text
				transform="uppercase"
				variant="label"
				size="medium"
				weight="semiBold"
				align="center"
				color={styles(colorScheme).status[status].color}
			>
				{status}
			</Text>
		</View>
	);
}

const styles = (scheme: ColorScheme) => ({
	wrapper: StyleSheet.create({
		common: {
			display: 'flex',
			justifyContent: 'center',
			borderBottomLeftRadius: Design.radius.large,
			borderBottomRightRadius: Design.radius.large,
			paddingVertical: Design.space.xsmall,
		},
		pending: { backgroundColor: Colors[scheme].yellow[20] },
		approved: { backgroundColor: Colors[scheme].green[20] },
		rejected: { backgroundColor: Colors[scheme].red[20] },
	}),
	status: {
		pending: { color: Colors[scheme].yellow[100] },
		approved: { color: Colors[scheme].green[100] },
		rejected: { color: Colors[scheme].red[100] },
	},
});
