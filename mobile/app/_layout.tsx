import '../globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { View } from 'react-native';
import { ClerkProvider } from '@clerk/clerk-expo';
import { tokenCache } from '@clerk/clerk-expo/token-cache';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
});

export default function RootLayout() {
	const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

	if (!publishableKey) throw new Error('Missing Clerk publishable key');

	return (
		<SafeAreaProvider>
			<View className="flex-1 bg-black">
				<QueryClientProvider client={queryClient}>
					<ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
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
					</ClerkProvider>
				</QueryClientProvider>
			</View>
		</SafeAreaProvider>
	);
}
