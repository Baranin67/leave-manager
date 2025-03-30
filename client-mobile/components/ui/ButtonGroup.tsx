import { StyleSheet, View } from 'react-native';
import { Controller, UseFormReturn } from 'react-hook-form';

import { Colors } from '@/constants/Colors';
import { ColorScheme, useColorScheme } from '@/hooks/useColorScheme.web';
import Button, { ButtonProps } from './Button';

type ButtonGroupProps = {
	name: string;
	buttons: (Pick<ButtonProps, 'icon' | 'onPress' | 'children'> & {
		name: string;
	})[];
	formState?: UseFormReturn<any>;
};

export default function ButtonGroup({
	name,
	buttons,
	formState,
}: ButtonGroupProps) {
	const colorScheme = useColorScheme();

	return (
		<Controller
			name={name}
			control={formState?.control}
			render={({ field: { onChange, value } }) => (
				<View style={styles(colorScheme).wrapper}>
					{buttons.map(({ name: buttonName, ...buttonProps }, idx) => (
						<Button
							{...buttonProps}
							key={idx}
							variant="primary"
							style={[
								styles(colorScheme).button,
								value !== buttonName && styles(colorScheme).inactiveButton,
								idx === 0 && styles(colorScheme).firstButton,
								idx === buttons.length - 1 && styles(colorScheme).lastButton,
								idx !== 0 &&
									idx !== buttons.length - 1 &&
									styles(colorScheme).middleButton,
							]}
							onPress={() => {
								onChange(buttonName); // Update form state
							}}
						/>
					))}
				</View>
			)}
		/>
	);
}

const styles = (scheme: ColorScheme) =>
	StyleSheet.create({
		wrapper: {
			display: 'flex',
			flexDirection: 'row',
			gap: 1,
		},
		button: {
			flex: 1,
		},
		firstButton: {
			borderTopRightRadius: 0,
			borderBottomRightRadius: 0,
		},
		middleButton: {
			borderRadius: 0,
		},
		lastButton: {
			borderTopLeftRadius: 0,
			borderBottomLeftRadius: 0,
		},
		inactiveButton: {
			backgroundColor: Colors[scheme].primary[60],
		},
	});
