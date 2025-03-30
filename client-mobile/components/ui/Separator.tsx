import { Colors } from '@/constants/Colors';
import { ColorScheme, useColorScheme } from '@/hooks/useColorScheme.web';
import { StyleSheet, View } from 'react-native';

export default function Separator() {
	const colorScheme = useColorScheme();

	return <View style={styles(colorScheme).wrapper} />;
}

const styles = (scheme: ColorScheme) =>
	StyleSheet.create({
		wrapper: {
			width: '100%',
			height: 1,
			backgroundColor: Colors[scheme].text[10],
		},
	});
