import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, Pressable, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const trendingTopics = [
    { id: 1, name: 'Interior Design', image: 'https://picsum.photos/100/100?random=7' },
    { id: 2, name: 'Travel', image: 'https://picsum.photos/100/100?random=8' },
    { id: 3, name: 'Food & Recipes', image: 'https://picsum.photos/100/100?random=9' },
    { id: 4, name: 'Fashion', image: 'https://picsum.photos/100/100?random=10' },
  ];

  const recentSearches = ['Minimalist decor', 'Beach vacations', 'Healthy recipes', 'Street style'];

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Search Header */}
      <View className="px-4 py-3">
        <View className="flex-row items-center bg-gray-100 rounded-full px-4 py-3">
          <Feather name="search" size={20} color="#666" />
          <TextInput
            className="flex-1 ml-3 text-gray-900"
            placeholder="Search for ideas"
            placeholderTextColor="#666"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <Pressable onPress={() => setSearchQuery('')}>
              <Feather name="x" size={20} color="#666" />
            </Pressable>
          )}
        </View>
      </View>

      <ScrollView className="flex-1 px-4">
        {/* Recent Searches */}
        <View className="mb-6">
          <Text className="text-lg font-semibold text-gray-900 mb-3">Recent searches</Text>
          {recentSearches.map((search, index) => (
            <Pressable
              key={index}
              className="flex-row items-center justify-between py-3 border-b border-gray-100"
            >
              <View className="flex-row items-center">
                <Feather name="clock" size={16} color="#666" />
                <Text className="text-gray-700 ml-3">{search}</Text>
              </View>
              <Feather name="arrow-up-left" size={16} color="#666" />
            </Pressable>
          ))}
        </View>

        {/* Trending Topics */}
        <View>
          <Text className="text-lg font-semibold text-gray-900 mb-3">Trending topics</Text>
          <View className="flex-row flex-wrap">
            {trendingTopics.map((topic) => (
              <Pressable
                key={topic.id}
                className="bg-gray-100 rounded-xl p-3 mr-3 mb-3 items-center"
                style={{ width: 100 }}
              >
                <Image
                  source={{ uri: topic.image }}
                  className="w-16 h-16 rounded-lg mb-2"
                  resizeMode="cover"
                />
                <Text className="text-xs text-gray-700 text-center font-medium">{topic.name}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Popular Searches */}
        <View className="mt-6">
          <Text className="text-lg font-semibold text-gray-900 mb-3">Popular right now</Text>
          <View className="space-y-3">
            {['Home decor', 'DIY crafts', 'Photography tips', 'Fitness motivation'].map((item, index) => (
              <Pressable
                key={index}
                className="flex-row items-center py-2"
              >
                <MaterialCommunityIcons name="fire" size={20} color="#E60023" />
                <Text className="text-gray-700 ml-3 font-medium">{item}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SearchScreen;