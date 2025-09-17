import '../globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack, SplashScreen } from 'expo-router';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useEffect } from 'react';
import { useFonts } from 'expo-font';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
});

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [loaded, error] = useFonts({
		'Onest': require('../assets/fonts/Onest-Regular.ttf'),
		'Onest-Bold': require('../assets/fonts/Onest-Bold.ttf'),
		'Onest-SemiBold': require('../assets/fonts/Onest-SemiBold.ttf'),
		'Onest-Medium': require('../assets/fonts/Onest-Medium.ttf'),
		'Onest-Light': require('../assets/fonts/Onest-Light.ttf'),
		'Onest-Thin': require('../assets/fonts/Onest-Thin.ttf'),
	});

	useEffect(() => {
		if (loaded || error) {
			SplashScreen.hideAsync();
		}
	}, [loaded, error]);

	return (
		<SafeAreaProvider>
			<QueryClientProvider client={queryClient}>
					<View className="flex-1 bg-black">
						<Stack screenOptions={{ headerShown: false }}>
							<Stack.Screen
								name="(tabs)"
								options={{ headerShown: false }}
							/>
							<Stack.Screen
								name="(auth)"
								options={{ headerShown: false }}
							/>
						</Stack>
					</View>
			</QueryClientProvider>
		</SafeAreaProvider>
	);
}
