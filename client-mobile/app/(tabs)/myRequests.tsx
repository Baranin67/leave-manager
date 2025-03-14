import { StyleSheet, View } from 'react-native';

import Button from '@/components/ui/Button';
import { DesignSystem as Design } from '@/constants/DesignSystem';

export default function MyRequestsScreen() {
	return (
		<View
			style={{
				padding: Design.space.small,
				gap: Design.space.xsmall,
			}}
		>
			<Button
				label="Primary button"
				url={'/'}
				variant="primary"
				icon="chevron-top"
			/>
			<Button
				label="Outlined button"
				url={'/'}
				variant="outline"
				icon="chevron-top"
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	headerImage: {
		color: '#808080',
		bottom: -90,
		left: -35,
		position: 'absolute',
	},
	titleContainer: {
		flexDirection: 'row',
		gap: 8,
	},
});
