import { StyleSheet, View } from 'react-native';
import Text, { TextProps } from './Text';
import { ColorScheme, useColorScheme } from '@/hooks/useColorScheme.web';
import { Design } from '@/constants/Design';
import { Colors } from '@/constants/Colors';

type LeaveRequestDateRangeViewProps = {
	startDate: Date;
	endDate: Date;
};

type DateViewProps = {
	date: Date;
	align?: TextProps['align'];
	showYear?: boolean;
};

export default function LeaveRequestDateRangeView({
	startDate,
	endDate,
}: LeaveRequestDateRangeViewProps) {
	const colorScheme = useColorScheme();
	const showYear = startDate.getFullYear() !== endDate.getFullYear();

	return (
		<View style={styles(colorScheme).mainWrapper.common}>
			<DateView date={startDate} align="right" showYear={showYear} />
			<View style={styles(colorScheme).timelineWrapper.common}>
				<View
					style={[
						styles(colorScheme).timelineDot.common,
						styles(colorScheme).timelineDot.left,
					]}
				/>
				<View style={styles(colorScheme).timelineStroke.common} />
				<View
					style={[
						styles(colorScheme).timelineDot.common,
						styles(colorScheme).timelineDot.right,
					]}
				/>
			</View>
			<DateView date={endDate} showYear={showYear} />
		</View>
	);
}

function DateView({ date, align, showYear = false }: DateViewProps) {
	const colorScheme = useColorScheme();

	return (
		<View style={styles(colorScheme).dateWrapper.common}>
			<Text variant="body" weight="bold" size="large" align={align}>
				{date.getDate()}{' '}
				{date.toLocaleDateString(process.env.EXPO_PUBLIC_LOCALE, {
					month: 'short',
				})}
			</Text>
			{!showYear ? null : (
				<Text variant="body" size="large" align={align}>
					{date.getFullYear()}
				</Text>
			)}
			<Text
				variant="body"
				size="small"
				color={Colors[colorScheme].text[60]}
				align={align}
			>
				{date.toLocaleTimeString(process.env.EXPO_PUBLIC_LOCALE, {
					hour: '2-digit',
					minute: '2-digit',
				})}
			</Text>
		</View>
	);
}

const styles = (scheme: ColorScheme) => ({
	mainWrapper: StyleSheet.create({
		common: {
			display: 'flex',
			flexDirection: 'row',
			gap: Design.space.small,
			paddingHorizontal: Design.space.small,
		},
	}),
	dateWrapper: StyleSheet.create({
		common: {
			flex: 1,
		},
	}),
	timelineWrapper: StyleSheet.create({
		common: {
			position: 'relative',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			flex: 1,
		},
	}),
	timelineStroke: StyleSheet.create({
		common: {
			position: 'absolute',
			left: 4,
			right: 4,
			height: 4,
			backgroundColor: Colors[scheme].primary[100],
		},
	}),
	timelineDot: StyleSheet.create({
		common: {
			position: 'absolute',
			top: '50%',
			width: 8,
			height: 8,
			transform: [{ translateY: '-50%' }],
			borderRadius: Design.radius.full,
			backgroundColor: Colors[scheme].primary[100],
		},
		left: {
			left: 0,
		},
		right: {
			right: 0,
		},
	}),
});
