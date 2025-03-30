import { View } from 'react-native';

import Text from './Text';

type LeaveRequestListItemDateProps = {
	date: Date;
};

export default function LeaveRequestListItemDate({
	date,
}: LeaveRequestListItemDateProps) {
	return (
		<View>
			{/* day */}
			<Text weight="bold">{date.getDate()}</Text>

			{/* month */}
			<Text>
				{date.toLocaleDateString(process.env.EXPO_PUBLIC_LOCALE, {
					month: 'short',
				})}
			</Text>

			{/* year */}
			<Text variant="label" size="small">
				{date.getFullYear()}
			</Text>
		</View>
	);
}
