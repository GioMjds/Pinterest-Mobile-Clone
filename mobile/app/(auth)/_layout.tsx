import '../globals.css';
import { Stack } from 'expo-router';
import { View } from 'react-native';

export default function RootLayout() {
	return (
		<View className="flex-1 bg-black">
			<Stack screenOptions={{ headerShown: false }} />
		</View>
	);
}
