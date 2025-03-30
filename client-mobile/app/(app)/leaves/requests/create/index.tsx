import { useForm } from 'react-hook-form';
import { ScrollView, StyleSheet } from 'react-native';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { LeaveRequest, LeaveType } from '@/types/leaves';
import { ColorScheme, useColorScheme } from '@/hooks/useColorScheme.web';
import { Design } from '@/constants/Design';
import { LEAVE_TYPES } from '@/constants/Leaves';
import { createLeaveRequest } from '@/utils/leaves';
import { useUserState } from '@/contexts/user';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import ButtonGroup from '@/components/ui/ButtonGroup';
import SectionHeader from '@/components/ui/SectionHeader';

const minStartDate = new Date();
minStartDate.setHours(0, 0, 0, 0);

const maxCommentLength = 200;

const formSchema = z.object({
	leaveType: z.enum(LEAVE_TYPES as [string, ...string[]]),
	startDate: z.date().min(minStartDate, 'Start date must be in the future'),
	endDate: z.date(),
	comment: z
		.string()
		.max(maxCommentLength, 'Comment cannot be longer than 200 characters'),
});

type FormSchema = z.infer<typeof formSchema>;

export default function LeaveRequestCreator() {
	const colorScheme = useColorScheme();
	const { user } = useUserState();

	const formState = useForm<FormSchema>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			leaveType: LEAVE_TYPES[0],
			startDate: new Date(),
		},
	});

	function onSubmit(data: FormSchema) {
		// TODO remove in production
		console.log('SUBMITTED', data);

		const newLeaveRequest: LeaveRequest = {
			leaveType: data.leaveType as LeaveType,
			startDate: data.startDate,
			endDate: data.endDate,
			userComment: data.comment,
		};

		if (user?.authToken)
			createLeaveRequest(
				user?.authToken,
				newLeaveRequest,
				() => console.log('[DEBUG] Leave request created successfully.'),
				err => console.error(err)
			);
		else console.error('[DEBUG ERR] Auth token not found.');
	}
	// TODO add reset logic

	return (
		<ScrollView contentContainerStyle={styles(colorScheme).mainWrapper.common}>
			<SectionHeader>New leave request</SectionHeader>

			<ButtonGroup
				name="leaveType"
				formState={formState}
				buttons={[
					{
						name: 'casual',
						children: 'Casual',
					},
					{
						name: 'vacation',
						children: 'Vacation',
					},
				]}
			/>

			<Input
				name="startDate"
				label="Start date"
				variant="datetime"
				icon="calendar"
				formState={formState}
			/>
			<Input
				name="endDate"
				label="End date"
				variant="datetime"
				icon="calendar"
				formState={formState}
			/>
			<Input
				name="comment"
				label="Comment"
				placeholder='e.g. "I need to take a day off to attend a family event"'
				variant="textarea"
				icon="chat-cloud"
				max={maxCommentLength}
				formState={formState}
			/>

			<Button icon="checkmark" onPress={formState.handleSubmit(onSubmit)}>
				Submit
			</Button>
		</ScrollView>
	);
}

const styles = (scheme: ColorScheme) => ({
	mainWrapper: StyleSheet.create({
		common: {
			display: 'flex',
			gap: Design.space.small,
			padding: Design.space.small,
		},
	}),
});
