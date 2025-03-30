import { StyleSheet, View } from 'react-native';

import { ColorScheme, useColorScheme } from '@/hooks/useColorScheme.web';
import { Colors } from '@/constants/Colors';

type HeaderProps = {
	children: string;
};

export default function Header({ children }: HeaderProps) {
	const colorScheme = useColorScheme();

	return (
		<View
			style={[
				headerWrapperStyles.common._,
				headerWrapperStyles.themed(colorScheme)._,
			]}
		>
			<ThemedText>{children}</ThemedText>
		</View>
	);
}

const headerWrapperStyles = {
	common: StyleSheet.create({
		_: {
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
		},
	}),
	themed: scheme =>
		StyleSheet.create({
			_: {
				backgroundColor: Colors[scheme].primary[100],
			},
		}),
} as const satisfies {
	common: any;
	themed: (scheme: ColorScheme) => any;
};
