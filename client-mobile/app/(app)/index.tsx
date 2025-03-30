import { StyleSheet, View } from 'react-native';

import { Colors } from '@/constants/Colors';
import { Design } from '@/constants/Design';
import { Routes } from '@/constants/Routes';
import { ColorScheme, useColorScheme } from '@/hooks/useColorScheme.web';
import { useUserState } from '@/contexts/user';
import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icons';
import ProfileDetailsView from '@/components/ui/ProfileDetailsView';

export default function MainDashboard() {
	const colorScheme = useColorScheme();
	const { user } = useUserState();

	return (
		<View style={styles(colorScheme).mainWrapper.common}>
			<View style={styles(colorScheme).profileWrapper.common}>
				{user === null ? null : <ProfileDetailsView user={user} />}
				<Icon
					name="tweaks"
					size={Design.icon.small}
					color={Colors[colorScheme].primary[40]}
				/>
			</View>
			<View style={styles(colorScheme).buttonsWrapper.common}>
				<View style={styles(colorScheme).buttonsRow.common}>
					<Button
						variant="panelLight"
						icon="chat-cloud"
						style={[
							styles(colorScheme).button.common,
							{
								backgroundColor: Colors[colorScheme].red[40],
								borderBottomRightRadius: Design.radius.small,
							},
						]}
					>
						Chats
					</Button>
					<Button
						variant="panelLight"
						icon="door-open"
						style={[
							styles(colorScheme).button.common,
							{
								backgroundColor: Colors[colorScheme].green[40],
								borderBottomLeftRadius: Design.radius.small,
							},
						]}
						url={Routes.screens.leavesDashboard}
					>
						Leaves
					</Button>
				</View>
				<View style={styles(colorScheme).buttonsRow.common}>
					<Button
						variant="panelLight"
						icon="megaphone"
						style={[
							styles(colorScheme).button.common,
							{
								backgroundColor: Colors[colorScheme].blue[40],
								borderTopRightRadius: Design.radius.small,
							},
						]}
					>
						Announcements
					</Button>
					<Button
						variant="panelLight"
						icon="users-group"
						style={[
							styles(colorScheme).button.common,
							{
								backgroundColor: Colors[colorScheme].yellow[40],
								borderTopLeftRadius: Design.radius.small,
							},
						]}
					>
						Staff
					</Button>
				</View>
			</View>
		</View>
	);
}

const styles = (scheme: ColorScheme) => ({
	mainWrapper: StyleSheet.create({
		common: {
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			gap: Design.space.large,
			padding: Design.space.small,
			height: '100%',
		},
	}),
	profileWrapper: StyleSheet.create({
		common: {
			display: 'flex',
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
			paddingHorizontal: Design.space.small,
			width: '100%',
		},
	}),
	buttonsWrapper: StyleSheet.create({
		common: {
			display: 'flex',
			flexDirection: 'column',
			gap: Design.space.xxsmall,
		},
	}),
	buttonsRow: StyleSheet.create({
		common: {
			display: 'flex',
			flexDirection: 'row',
			gap: Design.space.xxsmall,
			width: '100%',
			height: 150,
		},
	}),
	button: StyleSheet.create({
		common: {
			flex: 1,
		},
	}),
});
