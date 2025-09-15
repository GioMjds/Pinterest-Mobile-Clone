import '../globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Tabs } from 'expo-router';
import { View, Text, Pressable } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
});

function PinterestTabBar({ state, descriptors, navigation }: any) {
	return (
		<View className="flex-row bg-black-theme shadow-lg rounded-full mx-4 my-2 p-2 justify-between items-center border border-black-theme" style={{ elevation: 4 }}>
			{state.routes.map((route: any, index: any) => {
				const { options } = descriptors[route.key];
				const label =
					options.tabBarLabel !== undefined
						? options.tabBarLabel
						: options.title !== undefined
						? options.title
						: route.name;
				const isFocused = state.index === index;

				let icon;
				if (route.name === 'search') {
					icon = <Feather name="search" size={28} color={isFocused ? '#E60023' : '#888'} />;
				} else if (route.name === 'home') {
					icon = <MaterialCommunityIcons name="home-variant" size={28} color={isFocused ? '#E60023' : '#888'} />;
				} else if (route.name === 'profile') {
					icon = <Feather name="user" size={28} color={isFocused ? '#E60023' : '#888'} />;
				} else {
					icon = <Feather name="circle" size={28} color={isFocused ? '#E60023' : '#888'} />;
				}

				return (
					<Pressable
						key={route.key}
						onPress={() => navigation.navigate(route.name)}
						className={`flex-1 items-center justify-center ${isFocused ? 'bg-[#E60023]/20 rounded-full' : ''}`}
						accessibilityRole="button"
						accessibilityState={isFocused ? { selected: true } : {}}
						accessibilityLabel={options.tabBarAccessibilityLabel}
						>
						{icon}
						<Text className={`text-xs mt-1 ${isFocused ? 'text-[#E60023] font-bold' : 'text-gray-400'}`}>{label}</Text>
					</Pressable>
				);
			})}
		</View>
	);
}

export default function RootLayout() {
	return (
		<View className="flex-1 bg-black">
			<QueryClientProvider client={queryClient}>
				<Tabs
					screenOptions={{
						headerShown: false,
						tabBarStyle: { backgroundColor: 'transparent' }
					}}
					tabBar={props => <PinterestTabBar {...props} />}
				>
					<Tabs.Screen
						name="home"
						options={{ tabBarLabel: 'Home' }}
					/>
					<Tabs.Screen
						name="search"
						options={{ tabBarLabel: 'Search' }}
					/>
					<Tabs.Screen
						name="profile"
						options={{ tabBarLabel: 'Profile' }}
					/>
				</Tabs>
			</QueryClientProvider>
		</View>
	);
}
