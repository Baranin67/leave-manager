import { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

export function FiltersBox() {
	return <View style={}></View>;
}

type FilterButtonType = 'toggle' | 'select';

type FilterButtonProps = {
	icon: ReactNode;
	iconPos: 'left' | 'right';
	label: string;
	type: FilterButtonType;
};

function FilterButton({ icon, iconPos, label, type }: FilterButtonProps) {}

const styles = StyleSheet.create({
	wrapper: {
		backgroundColor: 'white',
		padding: 16,
		borderRadius: 16,
	},
});
