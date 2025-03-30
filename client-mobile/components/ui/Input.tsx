import { useState } from 'react';
import { Platform, Pressable, StyleSheet, TextInput, View } from 'react-native';
import { Controller, UseFormReturn } from 'react-hook-form';
import DateTimePicker from '@react-native-community/datetimepicker';

import { Design } from '@/constants/Design';
import { Colors } from '@/constants/Colors';
import { ColorScheme, useColorScheme } from '@/hooks/useColorScheme.web';
import { getInputFriendlyDate } from '@/utils/date';
import Icon, { IconProps } from './Icons';
import Text from './Text';
import Separator from './Separator';

type BaseInputVariant =
	| 'text'
	| 'password'
	| 'email'
	| 'number'
	| 'tel'
	| 'textarea';

type DateTimeInputVariant = 'date' | 'time' | 'datetime';

type BaseInputProps = {
	name: string;
	label: string;
	variant?: BaseInputVariant;
	placeholder?: string;
	icon?: IconProps['name'];
	formState?: UseFormReturn<any>;
	min?: number;
	max?: number;
	defaultValue?: string;
};

type DateTimeInputProps = {
	name: string;
	label: string;
	variant?: DateTimeInputVariant;
	placeholder?: string;
	icon?: IconProps['name'];
	formState?: UseFormReturn<any>;
	min?: Date;
	max?: Date;
};

type InputProps = BaseInputProps | DateTimeInputProps;

export default function Input({
	name,
	label,
	variant = 'text',
	placeholder,
	icon,
	formState,
	min,
	max,
}: InputProps) {
	const colorScheme = useColorScheme();
	const [showDatePicker, setShowDatePicker] = useState(false);
	const [showTimePicker, setShowTimePicker] = useState(false);
	const [selectedDate, setSelectedDate] = useState(new Date());
	const [selectedTime, setSelectedTime] = useState(new Date());

	return (
		<>
			<View>
				{/* LABEL WRAPPER */}
				<View style={styles(colorScheme).labelWrapper.common}>
					{/* LABEL */}
					<Text variant="label" size="medium">
						{label}
					</Text>
				</View>

				{/* INPUT WRAPPER */}
				<View
					style={[
						styles(colorScheme).inputWrapper.common,
						styles(colorScheme).inputWrapper[variant],
						formState?.formState.errors[name]
							? styles(colorScheme).inputWrapper.withError
							: {},
					]}
				>
					{/* ICON */}
					{icon ? (
						<Icon
							name={icon}
							size={Design.icon.small}
							color={Colors[colorScheme].primary[40]}
						/>
					) : null}

					{/* INPUT */}
					<Controller
						name={name}
						control={formState?.control}
						render={({ field: { onChange, onBlur, value } }) =>
							variant === 'date' ||
							variant === 'time' ||
							variant === 'datetime' ? (
								<>
									{/* DATE PICKER */}
									{showDatePicker ? (
										<DateTimePicker
											value={selectedDate}
											onChange={(_e, newDate) => {
												newDate && setSelectedDate(newDate);
												newDate &&
													onChange(
														new Date(
															newDate.getFullYear(),
															newDate.getMonth(),
															newDate.getDate(),
															0,
															0
														)
													);
												setShowDatePicker(false);
												setShowTimePicker(true);
											}}
											minimumDate={min as Date | undefined}
											maximumDate={max as Date | undefined}
											mode="date"
										/>
									) : null}

									{/* TIME PICKER */}
									{showTimePicker ? (
										<DateTimePicker
											value={selectedTime}
											onChange={(_e, newDate) => {
												newDate && setSelectedTime(newDate);
												newDate &&
													onChange(
														new Date(
															selectedDate.getFullYear(),
															selectedDate.getMonth(),
															selectedDate.getDate(),
															newDate.getHours(),
															newDate.getMinutes()
														)
													);
												setShowTimePicker(false);
											}}
											minimumDate={min as Date | undefined}
											maximumDate={max as Date | undefined}
											mode="time"
										/>
									) : null}

									{/* DATETIME INPUT */}
									<Pressable
										onPress={() => setShowDatePicker(() => true)}
										style={styles(colorScheme).input.common}
									>
										{value === undefined ? (
											<Text
												variant="label"
												size="large"
												color={Colors[colorScheme].text[20]}
											>
												00.00.0000 00:00:00
											</Text>
										) : (
											<Text>{getInputFriendlyDate(value as Date)}</Text>
										)}
									</Pressable>
								</>
							) : (
								<>
									{/* TEXT INPUT */}
									<TextInput
										multiline={variant === 'textarea'}
										numberOfLines={variant === 'textarea' ? 4 : 1}
										placeholder={placeholder}
										placeholderTextColor={Colors[colorScheme].text[20]}
										onBlur={onBlur}
										onChangeText={text => onChange(text)}
										value={value}
										secureTextEntry={variant === 'password'}
										style={[
											styles(colorScheme).input.common,
											styles(colorScheme).input[variant],
										]}
									/>
									<Separator />
									{variant === 'textarea' && max !== undefined ? (
										<View
											style={[
												styles(colorScheme).inputCounter.common,
												styles(colorScheme).inputCounter[variant],
											]}
										>
											<Text
												variant="body"
												size="small"
												color={Colors[colorScheme].primary[40]}
											>
												{value?.length ?? 0}/{max}
											</Text>
										</View>
									) : null}
								</>
							)
						}
					/>
				</View>

				{/* ERROR */}
				{formState?.formState.errors[name] && (
					<Text
						variant="label"
						size="small"
						style={styles(colorScheme).errorText.common}
					>
						{formState?.formState.errors[name].message}
					</Text>
				)}
			</View>
		</>
	);
}

const styles = (scheme: ColorScheme) => ({
	labelWrapper: StyleSheet.create({
		common: {
			display: 'flex',
			flexDirection: 'row',
			alignItems: 'center',
			marginLeft: Design.space.small,
		},
	}),
	inputWrapper: StyleSheet.create({
		common: {
			display: 'flex',
			flexDirection: 'row',
			alignItems: 'center',
			gap: Design.space.xsmall,
			paddingHorizontal: Design.space.medium,
			borderRadius: Design.radius.large,
			backgroundColor: Colors[scheme].primary[10],
		},
		withError: {
			borderColor: Colors[scheme].red[100],
			borderWidth: 1,
		},
		textarea: {
			flexDirection: 'column',
			alignItems: 'flex-start',
			gap: 0,
			paddingTop: Design.space.small,
		},
	}),
	input: StyleSheet.create({
		common: {
			flex: 1,
			paddingVertical: Design.space.small,
			fontSize: Design.font.label.size.large,
			color: Colors[scheme].text[100],
		},
		textarea: {
			width: '100%',
			textAlignVertical: 'top',
		},
	}),
	inputCounter: StyleSheet.create({
		common: {
			alignItems: 'flex-end',
			paddingVertical: Design.space.xsmall,
			width: '100%',
		},
	}),
	errorText: StyleSheet.create({
		common: {
			paddingHorizontal: Design.space.small,
			color: Colors[scheme].red[100],
		},
	}),
});
