import React from 'react';
import { View, Text, ScrollView, Image, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

const ProfileScreen = () => {
	const userPins = [
		{ id: 1, image: 'https://picsum.photos/150/200?random=11' },
		{ id: 2, image: 'https://picsum.photos/150/200?random=12' },
		{ id: 3, image: 'https://picsum.photos/150/200?random=13' },
		{ id: 4, image: 'https://picsum.photos/150/200?random=14' },
		{ id: 5, image: 'https://picsum.photos/150/200?random=15' },
		{ id: 6, image: 'https://picsum.photos/150/200?random=16' },
		{ id: 7, image: 'https://picsum.photos/150/200?random=17' },
		{ id: 8, image: 'https://picsum.photos/150/200?random=18' },
	];

	return (
		<SafeAreaView className="flex-1 bg-white">
			<ScrollView className="flex-1">
				{/* Profile Header */}
				<View className="items-center px-4 py-6 bg-gradient-to-r from-pink-500 to-red-500">
					<Image
						source={{
							uri: 'https://picsum.photos/120/120?random=19',
						}}
						className="w-24 h-24 rounded-full border-4 border-white mb-4"
					/>
					<Text className="text-xl font-bold text-black mb-1">
						John Doe
					</Text>
					<Text className="text-black/80 text-center mb-4">
						@johndoe_design
					</Text>

					{/* Stats */}
					<View className="flex-row justify-around w-full max-w-xs">
						<View className="items-center">
							<Text className="text-2xl font-bold text-black">
								2.1k
							</Text>
							<Text className="text-black/80 text-sm">
								Followers
							</Text>
						</View>
						<View className="items-center">
							<Text className="text-2xl font-bold text-black">
								156
							</Text>
							<Text className="text-black/80 text-sm">
								Following
							</Text>
						</View>
						<View className="items-center">
							<Text className="text-2xl font-bold text-black">
								89
							</Text>
							<Text className="text-black/80 text-sm">Pins</Text>
						</View>
					</View>
				</View>

				{/* Action Buttons */}
				<View className="flex-row px-4 py-4 space-x-3">
					<Pressable className="flex-1 bg-red-500 py-3 rounded-full items-center">
						<Text className="text-white font-semibold">Follow</Text>
					</Pressable>
					<Pressable className="p-3 border border-gray-300 rounded-full">
						<Feather name="share" size={20} color="#666" />
					</Pressable>
					<Pressable className="p-3 border border-gray-300 rounded-full">
						<Feather
							name="more-horizontal"
							size={20}
							color="#666"
						/>
					</Pressable>
				</View>

				{/* Tabs */}
				<View className="flex-row px-4 mb-4">
					<Pressable className="flex-1 items-center py-2 border-b-2 border-red-500">
						<Text className="text-red-500 font-semibold">
							Created
						</Text>
					</Pressable>
					<Pressable className="flex-1 items-center py-2">
						<Text className="text-gray-500">Saved</Text>
					</Pressable>
				</View>

				{/* Pins Grid */}
				<View className="px-2 pb-6">
					<View className="flex-row flex-wrap justify-between">
						{userPins.map((pin, index) => (
							<Pressable
								key={pin.id}
								className={`bg-white rounded-lg shadow-sm mb-3 overflow-hidden ${
									index % 2 === 0 ? 'mr-1' : 'ml-1'
								}`}
								style={{ width: '48%' }}
							>
								<Image
									source={{ uri: pin.image }}
									className="w-full h-32"
									resizeMode="cover"
								/>
								<View className="p-2">
									<View className="flex-row items-center justify-between">
										<View className="flex-row items-center">
											<MaterialCommunityIcons
												name="heart-outline"
												size={14}
												color="#666"
											/>
											<Text className="text-xs text-gray-500 ml-1">
												245
											</Text>
										</View>
										<Pressable className="p-1">
											<Feather
												name="more-horizontal"
												size={14}
												color="#666"
											/>
										</Pressable>
									</View>
								</View>
							</Pressable>
						))}
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default ProfileScreen;
