import { useAuth } from '@clerk/clerk-expo';
import { Redirect } from 'expo-router';
import { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';

export default function Index() {
    const { isSignedIn, isLoaded } = useAuth();

    useEffect(() => {
        if (isLoaded && isSignedIn) {
            // User is signed in, redirect to tabs
        } else if (isLoaded && !isSignedIn) {
            // User is not signed in, redirect to auth
        }
    }, [isLoaded, isSignedIn]);

    if (!isLoaded) {
        return (
            <View className="flex-1 bg-black items-center justify-center">
                <ActivityIndicator size="large" color="#E60023" />
            </View>
        );
    }

    if (isSignedIn) {
        return <Redirect href="/(tabs)/home" />;
    }

    return <Redirect href="/(auth)/sign-in" />;
}