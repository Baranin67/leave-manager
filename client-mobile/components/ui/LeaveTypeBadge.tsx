import { LeaveType } from '@/types/leaves';
import { StyleSheet, View } from 'react-native';

import { ColorScheme, useColorScheme } from '@/hooks/useColorScheme.web';
import { Colors } from '@/constants/Colors';
import { Design } from '@/constants/Design';
import Text from './Text';

type LeaveTypeBadgeProps = {
	leaveType: LeaveType;
};

export default function LeaveTypeBadge({ leaveType }: LeaveTypeBadgeProps) {
	const colorScheme = useColorScheme();

	return (
		<View
			style={[
				styles(colorScheme).wrapper.common,
				styles(colorScheme).wrapper[leaveType],
			]}
		>
			<Text
				variant="label"
				size="small"
				color={styles(colorScheme).label[leaveType].color}
				transform="uppercase"
			>
				{leaveType}
			</Text>
		</View>
	);
}

const styles = (scheme: ColorScheme) => ({
	wrapper: StyleSheet.create({
		common: {
			display: 'flex',
			alignItems: 'center',
			width: 70,
			borderRadius: Design.radius.medium,
		},
		casual: { backgroundColor: Colors[scheme].red[20] },
		vacation: { backgroundColor: Colors[scheme].blue[20] },
	}),
	label: {
		casual: { color: Colors[scheme].red[100] },
		vacation: { color: Colors[scheme].blue[100] },
	} as const satisfies {
		[_ in LeaveType]: {
			color: string;
		};
	},
});
