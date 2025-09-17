import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AuthRoutesLayout() {
	return (
		<SafeAreaView className="flex-1 bg-black">
			<Stack screenOptions={{ headerShown: false }} />
		</SafeAreaView>
	);
}
