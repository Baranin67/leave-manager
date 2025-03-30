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

export default function RootLayout() {
	const [loaded] = useFonts({
		NotoSans: require('../assets/fonts/NotoSans.ttf'),
	});

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!loaded) {
		return null;
	}

	return <Slot />;
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
