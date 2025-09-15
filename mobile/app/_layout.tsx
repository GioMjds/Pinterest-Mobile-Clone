import './globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { View } from 'react-native';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		}
	}
});

export default function RootLayout() {
	return (
		<View className="flex-1 bg-black">
			<QueryClientProvider client={queryClient}>
				<Stack screenOptions={{ headerShown: false }} >
					<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
					<Stack.Screen name="(auth)" options={{ headerShown: false }} />
				</Stack>
			</QueryClientProvider>
		</View>
	);
}
