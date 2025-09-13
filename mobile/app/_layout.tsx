import './globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		}
	}
});

export default function RootLayout() {
	return (
		<QueryClientProvider client={queryClient}>
			<Stack screenOptions={{ headerShown: false }} />
		</QueryClientProvider>
	);
}
