import { Tabs } from 'expo-router';
import React from 'react';

import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { DesignSystem } from '@/constants/DesignSystem';
import { HapticTab } from '@/components/HapticTab';
import Icon from '@/components/ui/Icons';
import { StyleSheet, Text } from 'react-native';

export default function TabLayout() {
	const colorScheme = useColorScheme();

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: Colors[colorScheme].tabButtonActive,
				headerShown: true,
				headerStyle: {
					backgroundColor: Colors[colorScheme].primary[100],
				},
				headerTitleAlign: 'center',
				headerTitleStyle: {
					color: Colors[colorScheme].textInverted[100],
				},
				tabBarButton: HapticTab,
				tabBarLabelStyle: {
					color: Colors[colorScheme].textInverted[60],
				},
				tabBarLabel: ({ focused, children, ...props }) => {
					// FIXME HUH? It says 'dark'...
					console.log(colorScheme);
					return (
						<Text
							{...props}
							style={
								focused
									? labelStyles.focused[colorScheme ?? 'light']
									: labelStyles.default[colorScheme ?? 'light']
							}
						>
							BRUH
						</Text>
					);
				},
				tabBarStyle: {
					backgroundColor: Colors[colorScheme].primary[100],
				},
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: 'Dashboard',
					tabBarIcon: ({ color }) => (
						<Icon name="user" size={DesignSystem.icon.small} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="myRequests"
				options={{
					title: 'My requests',
					tabBarIcon: ({ color }) => (
						<Icon name="user" size={DesignSystem.icon.small} color={color} />
					),
				}}
			/>
		</Tabs>
	);
}

const labelStyles = {
	default: StyleSheet.create({
		light: {
			color: Colors.light.textInverted[60],
		},
		dark: {},
	}),
	focused: StyleSheet.create({
		light: {
			color: Colors.light.textInverted[100],
		},
		dark: {},
	}),
};
