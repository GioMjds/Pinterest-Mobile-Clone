import { Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { httpClient } from '@/configs/axios';
import { auth } from '@/services/Auth';

export default function SignUpScreen() {
    const router = useRouter();

    const [emailAddress, setEmailAddress] = useState('');
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [pendingVerification, setPendingVerification] = useState(false);
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);

    const onSignUpPress = async () => {
        setLoading(true);
        try {
            const res = await httpClient.post('/auth/register', {
                email: emailAddress,
                username,
                first_name: firstName,
                last_name: lastName,
                password,
                confirm_password: confirmPassword,
            });
            if (res?.message) {
                setPendingVerification(true);
                Alert.alert('OTP sent', 'Check your email for the OTP code.');
            }
        } catch (err: any) {
            Alert.alert('Sign up failed', err?.message || 'Error');
        } finally {
            setLoading(false);
        }
    };

    const onVerifyPress = async () => {
        setLoading(true);
        try {
            await auth.verifyRegisterOtp(emailAddress, username, firstName, lastName, password, otp);
            router.replace('/sign-in');
        } catch (err: any) {
            Alert.alert('Verification failed', err?.message || 'Error');
        } finally {
            setLoading(false);
        }
    };

    if (pendingVerification) {
        return (
            <SafeAreaView className="flex-1 justify-center items-center bg-white px-6">
                <View className="w-full max-w-md">
                    <Text className="text-2xl font-bold text-center mb-6">Verify your email</Text>
                    <TextInput
                        className="border border-gray-300 rounded-lg px-4 py-3 text-base bg-gray-50"
                        value={otp}
                        placeholder="Enter OTP"
                        onChangeText={setOtp}
                    />
                    <TouchableOpacity
                        onPress={onVerifyPress}
                        className="bg-blue-600 rounded-lg py-3 mt-2"
                        disabled={loading}
                    >
                        <Text className="text-white text-center font-semibold text-base">
                            {loading ? 'Verifying...' : 'Verify'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="flex-1 justify-center items-center bg-white px-6">
            <View className="w-full max-w-md">
                <Text className="text-2xl font-bold text-center mb-6">Sign up</Text>
                <View className="space-y-4 gap-8">
                    <TextInput
                        className="border border-gray-300 rounded-lg px-4 py-3 text-base bg-gray-50"
                        autoCapitalize="none"
                        value={emailAddress}
                        placeholder="Enter email"
                        onChangeText={setEmailAddress}
                    />
                    <TextInput
                        className="border border-gray-300 rounded-lg px-4 py-3 text-base bg-gray-50"
                        value={username}
                        placeholder="Enter username"
                        onChangeText={setUsername}
                    />
                    <TextInput
                        className="border border-gray-300 rounded-lg px-4 py-3 text-base bg-gray-50"
                        value={firstName}
                        placeholder="Enter first name"
                        onChangeText={setFirstName}
                    />
                    <TextInput
                        className="border border-gray-300 rounded-lg px-4 py-3 text-base bg-gray-50"
                        value={lastName}
                        placeholder="Enter last name"
                        onChangeText={setLastName}
                    />
                    <TextInput
                        className="border border-gray-300 rounded-lg px-4 py-3 text-base bg-gray-50"
                        value={password}
                        placeholder="Enter password"
                        secureTextEntry={true}
                        onChangeText={setPassword}
                    />
                    <TextInput
                        className="border border-gray-300 rounded-lg px-4 py-3 text-base bg-gray-50"
                        value={confirmPassword}
                        placeholder="Confirm password"
                        secureTextEntry={true}
                        onChangeText={setConfirmPassword}
                    />
                    <TouchableOpacity
                        onPress={onSignUpPress}
                        className="bg-blue-600 rounded-lg py-3 mt-2"
                        disabled={loading}
                    >
                        <Text className="text-white text-center font-semibold text-base">
                            {loading ? 'Sending OTP...' : 'Continue'}
                        </Text>
                    </TouchableOpacity>
                </View>
                <View className="flex-row justify-center items-center mt-6 space-x-2">
                    <Text className="text-gray-500">Already have an account?</Text>
                    <Link href="/sign-in" asChild>
                        <Text className="text-blue-600 font-semibold">Sign in</Text>
                    </Link>
                </View>
            </View>
        </SafeAreaView>
    );
}