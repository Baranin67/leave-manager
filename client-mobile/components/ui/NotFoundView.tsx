import { StyleSheet, View } from 'react-native';

import { Design } from '@/constants/Design';
import { Routes } from '@/constants/Routes';
import { ColorScheme, useColorScheme } from '@/hooks/useColorScheme.web';
import Button from '@/components/ui/Button';
import Text from '@/components/ui/Text';

type NotFoundScreenProps = {
	title: string;
	message?: string;
};

export default function NotFoundView({ title, message }: NotFoundScreenProps) {
	const colorScheme = useColorScheme();

	return (
		<>
			<View style={styles(colorScheme).mainWrapper.common}>
				<View style={styles(colorScheme).messagesWrapper.common}>
					<Text variant="heading" align="center">
						{title}
					</Text>
					{message === undefined ? null : (
						<Text variant="body" align="center">
							{message}
						</Text>
					)}
				</View>
				<Button icon="chevron-left" url={Routes.screens.mainDashboard}>
					Go to home page
				</Button>
			</View>
		</>
	);
}

const styles = (_scheme: ColorScheme) => ({
	mainWrapper: StyleSheet.create({
		common: {
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			gap: Design.space.xxlarge,
			height: '100%',
			padding: Design.space.small,
		},
	}),
	messagesWrapper: StyleSheet.create({
		common: {
			display: 'flex',
			gap: Design.space.small,
		},
	}),
});
