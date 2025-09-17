import React, { useState, useEffect } from 'react';
import { 
    ScrollView, 
    View, 
    Image, 
    Text, 
    Pressable, 
    RefreshControl, 
    ActivityIndicator,
    Dimensions 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { imageService, type PinImage } from '@/configs/unsplash';
import { useQuery, useInfiniteQuery } from '@tanstack/react-query';

const { width } = Dimensions.get('window');
const COLUMN_WIDTH = (width - 24) / 2; // 2 columns with padding

const CATEGORIES = [
    'All',
    'Architecture',
    'Nature',
    'Food',
    'Travel',
    'Fashion',
    'Art',
    'Animals',
    'Technology',
    'People',
    'Sports',
    'Business',
    'Music',
    'Cars',
];

export default function HomeScreen() {
    const [selectedCategory, setSelectedCategory] = useState('All');

    // Fetch pins with infinite query
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        refetch,
        isRefetching,
        isLoading,
        error,
    } = useInfiniteQuery({
        queryKey: ['pins', selectedCategory],
        queryFn: ({ pageParam = 1 }) => 
            selectedCategory === 'All' 
                ? imageService.getFeedImages(pageParam)
                : imageService.getPhotosByCategory(selectedCategory, pageParam),
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) => {
            // Assuming we always have more content to load
            // In a real app, you might check if lastPage has any items
            return allPages.length + 1;
        },
		refetchOnWindowFocus: false,
		refetchOnReconnect: false,
		refetchOnMount: false,
    });

    const pins = data?.pages.flat() || [];

    const onRefresh = () => {
        refetch();
    };

    const loadMorePins = () => {
        if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    };

    const calculateImageHeight = (originalWidth: number, originalHeight: number): number => {
        const aspectRatio = originalHeight / originalWidth;
        const minHeight = 150;
        const maxHeight = 400;
        const calculatedHeight = COLUMN_WIDTH * aspectRatio;
        
        return Math.max(minHeight, Math.min(maxHeight, calculatedHeight));
    };

    const renderPin = (pin: PinImage, index: number) => {
        const imageHeight = calculateImageHeight(pin.width, pin.height);
        const isLeftColumn = index % 2 === 0;
        
        return (
            <Pressable
                key={pin.id}
                className={`bg-white rounded-xl overflow-hidden mb-3 shadow-sm ${
                    isLeftColumn ? 'mr-1.5' : 'ml-1.5'
                }`}
                style={{ width: COLUMN_WIDTH }}
            >
                <Image
                    source={{ uri: pin.url }}
                    style={{ 
                        width: '100%', 
                        height: imageHeight,
                        backgroundColor: pin.dominant_color || '#f0f0f0'
                    }}
                    resizeMode="cover"
                />
                
                {/* Overlay with heart icon */}
                <View className="absolute top-2 right-2">
                    <Pressable className="bg-white/80 p-2 rounded-full">
                        <Feather name="heart" size={16} color="#E60023" />
                    </Pressable>
                </View>
                
                {/* Pin info */}
                <View className="p-3">
                    <Text 
                        className="text-sm font-medium text-gray-900 mb-1" 
                        numberOfLines={2}
                    >
                        {pin.title}
                    </Text>
                    
                    {pin.user && (
                        <View className="flex-row items-center">
                            {pin.user.profile_image && (
                                <Image
                                    source={{ uri: pin.user.profile_image }}
                                    className="w-4 h-4 rounded-full mr-2"
                                />
                            )}
                            <Text className="text-xs text-gray-600 flex-1">
                                {pin.user.name}
                            </Text>
                            <View className="flex-row items-center">
                                <Feather name="heart" size={12} color="#666" />
                                <Text className="text-xs text-gray-600 ml-1">
                                    {pin.likes}
                                </Text>
                            </View>
                        </View>
                    )}
                </View>
            </Pressable>
        );
    };

    const renderPinsGrid = () => {
        const leftColumnPins = pins.filter((_, index) => index % 2 === 0);
        const rightColumnPins = pins.filter((_, index) => index % 2 === 1);

        return (
            <View className="flex-row px-3">
                <View className="flex-1">
                    {leftColumnPins.map((pin, index) => renderPin(pin, index * 2))}
                </View>
                <View className="flex-1">
                    {rightColumnPins.map((pin, index) => renderPin(pin, index * 2 + 1))}
                </View>
            </View>
        );
    };

    if (isLoading) {
        return (
            <SafeAreaView className="flex-1 bg-white">
                <View className="flex-1 items-center justify-center">
                    <ActivityIndicator size="large" color="#E60023" />
                    <Text className="text-gray-600 mt-2">Loading beautiful pins...</Text>
                </View>
            </SafeAreaView>
        );
    }

    if (error) {
        return (
            <SafeAreaView className="flex-1 bg-white">
                <View className="flex-1 items-center justify-center p-4">
                    <Feather name="wifi-off" size={48} color="#ccc" />
                    <Text className="text-lg font-medium text-gray-700 mt-4 text-center">
                        Failed to load pins
                    </Text>
                    <Text className="text-gray-500 mt-2 text-center">
                        Please check your connection and try again
                    </Text>
                    <Pressable 
                        className="bg-red px-6 py-3 rounded-full mt-4"
                        onPress={() => refetch()}
                    >
                        <Text className="text-white font-medium">Try Again</Text>
                    </Pressable>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-white font-onest">
            {/* Header */}
            <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-100">
                <Text className="text-2xl font-bold text-red">Pinterest</Text>
                <View className="flex-row items-center space-x-3">
                    <Pressable className="p-2">
                        <Feather name="search" size={24} color="#333" />
                    </Pressable>
                    <Pressable className="p-2">
                        <Feather name="bell" size={24} color="#333" />
                    </Pressable>
                    <Pressable className="p-2">
                        <Feather name="message-circle" size={24} color="#333" />
                    </Pressable>
                </View>
            </View>

            {/* Category Filter */}
            <View className="py-3 bg-white border-b border-gray-100">
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    className="px-3"
                    contentContainerStyle={{ 
                        alignItems: 'center',
                        paddingRight: 16
                    }}
                >
                    {CATEGORIES.map((category) => {
                        const isSelected = selectedCategory === category;
                        return (
                            <Pressable
                                key={category}
                                className={`flex items-center justify-center px-5 py-2.5 mr-3 rounded-full ${
                                    isSelected ? 'bg-red' : 'bg-gray-100'
                                } active:opacity-80`}
                                onPress={() => {
                                    if (!isSelected) {
                                        setSelectedCategory(category);
                                    }
                                }}
                                android_ripple={{
                                    color: isSelected ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)',
                                    radius: 20
                                }}
                            >
                                <Text className={`text-sm font-semibold ${
                                    isSelected ? 'text-white' : 'text-gray-700'
                                }`}>
                                    {category}
                                </Text>
                            </Pressable>
                        );
                    })}
                </ScrollView>
            </View>

            {/* Pins Grid */}
            <ScrollView
                className="flex-1"
                refreshControl={
                    <RefreshControl
                        refreshing={isRefetching}
                        onRefresh={onRefresh}
                        colors={['#E60023']}
                        tintColor="#E60023"
                    />
                }
                onMomentumScrollEnd={(event) => {
                    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
                    const paddingToBottom = 20;
                    
                    if (layoutMeasurement.height + contentOffset.y >= 
                        contentSize.height - paddingToBottom) {
                        loadMorePins();
                    }
                }}
                showsVerticalScrollIndicator={false}
            >
                {renderPinsGrid()}
                
                {/* Load More Indicator */}
                {isFetchingNextPage && (
                    <View className="py-4 items-center">
                        <ActivityIndicator size="small" color="#E60023" />
                        <Text className="text-gray-600 text-sm mt-2">Loading more pins...</Text>
                    </View>
                )}
                
                {/* Bottom padding */}
                <View className="h-20" />
            </ScrollView>
        </SafeAreaView>
    );
}