import { StyleSheet } from 'react-native';
import {
	DefaultTheme,
	DarkTheme,
	ThemeProvider,
} from '@react-navigation/native';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { useFonts } from 'expo-font';
import { Slot, Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import Toast from 'react-native-toast-message';

import { ColorScheme, useColorScheme } from '@/hooks/useColorScheme.web';
import { UserProvider } from '@/contexts/user';
import { NavigationHistoryProvider } from '@/contexts/navigationHistory';
import { RouteGuardProvider } from '@/contexts/routeGuard';
import Text from '@/components/ui/Text';
import { Colors } from '@/constants/Colors';
import { HapticTab } from '@/components/HapticTab';
import { Screens } from '@/constants/Screens';
import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icons';
import { Design } from '@/constants/Design';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function AppLayout() {
	const colorScheme = useColorScheme();

	return (
		<>
			<ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
				<NavigationHistoryProvider>
					<UserProvider>
						<RouteGuardProvider>
							<StatusBar style="auto" />
							<Tabs
								screenOptions={{
									headerShown: true,
									headerTitle: ({ children }) => (
										<Text
											variant="heading"
											size="small"
											color={Colors[colorScheme].textInverted[100]}
										>
											{children}
										</Text>
									),
									headerStyle: {
										backgroundColor: Colors[colorScheme].primary[100],
									},
									headerTitleAlign: 'center',
									headerTitleStyle: {
										color: Colors[colorScheme].textInverted[100],
									},
									tabBarButton: props => (
										<HapticTab
											{...props}
											style={styles(colorScheme).tabBarButton.common}
										/>
									),
									tabBarLabelStyle: {
										color: Colors[colorScheme].textInverted[60],
									},
									tabBarStyle: {
										backgroundColor: Colors[colorScheme].primary[100],
									},
								}}
							>
								{Screens.map(({ name, title, canGoBack, tabSettings }, idx) => (
									<Tabs.Screen
										key={idx}
										name={name}
										options={{
											href: tabSettings === undefined ? null : undefined,
											title,
											headerLeft: () =>
												!canGoBack ? null : (
													<Button
														shouldGoBack={canGoBack}
														variant="icon"
														icon="chevron-left"
													/>
												),
											tabBarLabel: tabSettings?.label ?? '',
											tabBarIcon: ({ focused }) =>
												tabSettings?.icon && (
													<Icon
														name={tabSettings.icon}
														color={
															focused
																? Colors.light.textInverted[100]
																: Colors.light.textInverted[60]
														}
														size={Design.icon.small}
													/>
												),
										}}
									/>
								))}
							</Tabs>
						</RouteGuardProvider>
					</UserProvider>
				</NavigationHistoryProvider>
			</ThemeProvider>
			<Toast />
		</>
	);
}

const styles = (_scheme: ColorScheme) => ({
	tabBarButton: StyleSheet.create({
		common: {
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			alignItems: 'center',
		},
	}),
});
