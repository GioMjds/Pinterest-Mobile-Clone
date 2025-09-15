import React from 'react';
import { View, Text, ScrollView, Image, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

const HomeScreen = () => {
	const pins = [
		{
			id: 1,
			image: 'https://picsum.photos/200/300?random=1',
			title: 'Beautiful Landscape',
		},
		{
			id: 2,
			image: 'https://picsum.photos/200/300?random=2',
			title: 'Modern Architecture',
		},
		{
			id: 3,
			image: 'https://picsum.photos/200/300?random=3',
			title: 'Delicious Food',
		},
		{
			id: 4,
			image: 'https://picsum.photos/200/300?random=4',
			title: 'Fashion Style',
		},
		{
			id: 5,
			image: 'https://picsum.photos/200/300?random=5',
			title: 'Travel Adventure',
		},
		{
			id: 6,
			image: 'https://picsum.photos/200/300?random=6',
			title: 'Art & Design',
		},
	];

	return (
		<SafeAreaView className="flex-1 bg-white">
			{/* Header */}
			<View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-200">
				<Text className="text-2xl font-bold text-gray-900">
					Pinterest
				</Text>
				<View className="flex-row space-x-4">
					<Pressable className="p-2">
						<Feather name="bell" size={24} color="#666" />
					</Pressable>
					<Pressable className="p-2">
						<Feather name="message-circle" size={24} color="#666" />
					</Pressable>
				</View>
			</View>

			{/* Content */}
			<ScrollView className="flex-1 px-2">
				<View className="flex-row flex-wrap justify-between">
					{pins.map((pin, index) => (
						<Pressable
							key={pin.id}
							className={`bg-white rounded-xl shadow-sm mb-4 overflow-hidden ${
								index % 2 === 0 ? 'mr-1' : 'ml-1'
							}`}
							style={{ width: '48%' }}
						>
							<Image
								source={{ uri: pin.image }}
								className="w-full h-48"
								resizeMode="cover"
							/>
							<View className="p-3">
								<Text className="text-sm font-medium text-gray-900 mb-1">
									{pin.title}
								</Text>
								<View className="flex-row items-center justify-between">
									<View className="flex-row items-center">
										<MaterialCommunityIcons
											name="heart-outline"
											size={16}
											color="#666"
										/>
										<Text className="text-xs text-gray-500 ml-1">
											1.2k
										</Text>
									</View>
									<Pressable className="p-1">
										<Feather
											name="more-horizontal"
											size={16}
											color="#666"
										/>
									</Pressable>
								</View>
							</View>
						</Pressable>
					))}
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default HomeScreen;
