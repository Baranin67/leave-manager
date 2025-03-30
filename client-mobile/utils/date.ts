export function getInputFriendlyDate(date: Date): string {
	return date.toLocaleDateString('pt-PT', {
		day: 'numeric',
		month: 'short',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
	});
}
