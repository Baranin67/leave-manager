import { Design } from '@/constants/Design';
import { Image } from 'expo-image';
import { StyleSheet } from 'react-native';
import { View, ViewProps } from 'react-native';

type ProfilePictureProps = {
	url: string;
};

const blurhash =
	'|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

export default function ProfilePicture({
	url,
	...props
}: ProfilePictureProps & ViewProps) {
	return (
		<View {...props} style={[styles.common.wrapper, props.style]}>
			<Image
				style={styles.common.image}
				source={url}
				placeholder={{ blurhash }}
			/>
		</View>
	);
}

const styles = {
	common: StyleSheet.create({
		wrapper: {
			borderRadius: Design.radius.full,
			overflow: 'hidden',
		},
		image: {
			objectFit: 'cover',
			aspectRatio: '1 / 1',
			width: '100%',
			height: '100%',
		},
	}),
};
