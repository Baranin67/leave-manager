import { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
	Easing,
	useAnimatedStyle,
	useSharedValue,
	withRepeat,
	withTiming,
	WithTimingConfig,
} from 'react-native-reanimated';

import { Design } from '@/constants/Design';
import { Colors } from '@/constants/Colors';
import { ColorScheme, useColorScheme } from '@/hooks/useColorScheme.web';
import Icon from './Icons';
import Text from './Text';

type LoadingViewProps = {
	label?: string;
};

export default function LoadingView({ label }: LoadingViewProps) {
	const colorScheme = useColorScheme();

	const loadingIconRotation = useSharedValue(0);
	const loadingIconConfig: WithTimingConfig = {
		duration: 1000,
		easing: Easing.linear,
	};

	useEffect(() => {
		loadingIconRotation.value = withRepeat(
			withTiming(360, loadingIconConfig),
			-1,
			false
		);
	});

	const loadingIconStyle = useAnimatedStyle(() => ({
		transform: [
			{
				rotate: `${loadingIconRotation.value}deg`,
			},
		],
	}));

	return (
		<View style={styles(colorScheme).loadingWrapper.common}>
			<Animated.View
				style={[loadingIconStyle, styles(colorScheme).loadingIconStyle.common]}
			>
				<Icon
					name="loader"
					size={Design.icon.small}
					color={Colors[colorScheme].text[100]}
				/>
			</Animated.View>
			<Text align="center" color={Colors[colorScheme].text[100]}>
				{label ?? 'Loading...'}
			</Text>
		</View>
	);
}

const styles = (scheme: ColorScheme) => ({
	loadingWrapper: StyleSheet.create({
		common: {
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			height: '100%',
			gap: Design.space.xsmall,
		},
	}),
	loadingIconStyle: StyleSheet.create({
		common: {
			transform: [
				{
					rotate: '360deg',
				},
			],
		},
	}),
});
