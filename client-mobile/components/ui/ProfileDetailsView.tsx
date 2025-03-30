import { StyleSheet, View } from 'react-native';

import type { User } from '@/types/user';
import type { Company } from '@/types/company';
import { Colors } from '@/constants/Colors';
import { Design } from '@/constants/Design';
import { ColorScheme, useColorScheme } from '@/hooks/useColorScheme.web';
import ProfilePicture from './ProfilePicture';
import Icon from './Icons';
import Text from './Text';
import Badge from './Badge';

type ProfileDetailsViewProps = {
	user: Pick<User, 'avatarUrl' | 'firstName' | 'lastName' | 'companyRole'> & {
		company?: Pick<Company, 'name'>;
	};
};

export default function ProfileDetailsView({ user }: ProfileDetailsViewProps) {
	const colorScheme = useColorScheme();

	return (
		<View style={styles(colorScheme).mainWrapper.common}>
			{user?.avatarUrl ? (
				<ProfilePicture
					style={styles(colorScheme).avatar.common}
					url={user.avatarUrl}
				/>
			) : (
				<View style={styles(colorScheme).avatar.common}>
					<Icon
						name="user"
						color={Colors[colorScheme].primary[40]}
						size={Design.icon.large}
					/>
				</View>
			)}
			<View>
				<Text variant="body" size="large">
					{user?.firstName ?? '(no data)'} {user?.lastName ?? '(no data)'}
				</Text>
				<Text variant="label" size="medium">
					{user?.company?.name ?? '(no data)'}
				</Text>
				<Badge style={styles(colorScheme).detailsBadge.common}>
					{user?.companyRole ?? '(no data)'}
				</Badge>
			</View>
		</View>
	);
}

const styles = (scheme: ColorScheme) => ({
	mainWrapper: StyleSheet.create({
		common: {
			display: 'flex',
			flexDirection: 'row',
			justifyContent: 'center',
			alignItems: 'center',
			gap: Design.space.small,
		},
	}),
	avatar: StyleSheet.create({
		common: {
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			borderRadius: Design.radius.full,
			width: Design.profile.large,
			height: Design.profile.large,
			backgroundColor: Colors[scheme].primary[5],
		},
	}),
	detailsBadge: StyleSheet.create({
		common: {
			marginTop: Design.space.xsmall,
		},
	}),
});
