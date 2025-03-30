import { ColorScheme, useColorScheme } from '@/hooks/useColorScheme.web';
import { StyleSheet, View } from 'react-native';

import { Colors } from '@/constants/Colors';
import { Design } from '@/constants/Design';
import Text from './Text';

type SectionHeaderProps = {
	children: string;
};

export default function SectionHeader({ children }: SectionHeaderProps) {
	const colorScheme = useColorScheme();
	return (
		<View style={styles(colorScheme).wrapper.common}>
			<View style={styles(colorScheme).separator.common}></View>
			<Text variant="body" size="medium">
				{children}
			</Text>
			<View style={styles(colorScheme).separator.common}></View>
		</View>
	);
}

const styles = (scheme: ColorScheme) => ({
	wrapper: StyleSheet.create({
		common: {
			display: 'flex',
			flexDirection: 'row',
			justifyContent: 'center',
			alignItems: 'center',
			gap: Design.space.small,
		},
	}),
	separator: StyleSheet.create({
		common: {
			flex: 1,
			height: 1,
			backgroundColor: Colors[scheme].text[10],
		},
	}),
});
