import { Link, useRouter } from 'expo-router';
import { Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm, Controller } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { auth } from '@/services/Auth';

interface SignInForm {
    email: string;
    password: string;
}

export default function Page() {
    const router = useRouter();
    
    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<SignInForm>({
        mode: 'onBlur',
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const loginMutation = useMutation({
        mutationFn: ({ email, password }: SignInForm) => auth.login(email, password),
        onSuccess: () => {
            Alert.alert('Success', 'Login successful!');
            router.replace('/(tabs)/home');
        },
        onError: (error: any) => {
            Alert.alert('Login Failed', error?.message || 'Invalid credentials');
        },
    });

    const onSubmit = (data: SignInForm) => {
        loginMutation.mutate(data);
    };

    return (
        <SafeAreaView className="flex-1 justify-center bg-white px-6">
            <View className="w-full max-w-md mx-auto">
                <Text className="text-2xl font-bold text-center text-red mb-8">
                    Sign in
                </Text>
                
                {/* Email Field */}
                <View className="mb-4">
                    <Text className="mb-2 text-base text-gray-700">Email</Text>
                    <Controller
                        control={control}
                        name="email"
                        rules={{
                            required: 'Email is required',
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'Please enter a valid email address',
                            },
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                className={`border rounded-lg px-4 py-3 bg-gray-50 text-base ${
                                    errors.email ? 'border-red-500' : 'border-gray-300'
                                }`}
                                autoCapitalize="none"
                                value={value}
                                placeholder="Enter email"
                                onChangeText={onChange}
                                onBlur={onBlur}
                                keyboardType="email-address"
                                autoComplete="email"
                                textContentType="emailAddress"
                            />
                        )}
                    />
                    {errors.email && (
                        <Text className="text-red-500 text-sm mt-1">
                            {errors.email.message}
                        </Text>
                    )}
                </View>

                {/* Password Field */}
                <View className="mb-6">
                    <Text className="mb-2 text-base text-gray-700">Password</Text>
                    <Controller
                        control={control}
                        name="password"
                        rules={{
                            required: 'Password is required',
                            minLength: {
                                value: 6,
                                message: 'Password must be at least 6 characters',
                            },
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                className={`border rounded-lg px-4 py-3 bg-gray-50 text-base ${
                                    errors.password ? 'border-red-500' : 'border-gray-300'
                                }`}
                                value={value}
                                placeholder="Enter password"
                                secureTextEntry={true}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                autoComplete="current-password"
                                textContentType="password"
                            />
                        )}
                    />
                    {errors.password && (
                        <Text className="text-red-500 text-sm mt-1">
                            {errors.password.message}
                        </Text>
                    )}
                </View>

                {/* Submit Button */}
                <TouchableOpacity
                    className={`rounded-lg py-3 ${
                        !isValid || loginMutation.isPending
                            ? 'bg-gray-400 opacity-50'
                            : 'bg-blue-600'
                    }`}
                    onPress={handleSubmit(onSubmit)}
                    disabled={!isValid || loginMutation.isPending}
                >
                    <Text className="text-white text-center text-base font-semibold">
                        {loginMutation.isPending ? 'Signing in...' : 'Continue'}
                    </Text>
                </TouchableOpacity>

                <View className="flex-row justify-center mt-6">
                    <Text className="text-gray-600">
                        Don't have an account?{' '}
                    </Text>
                    <Link href="/sign-up" asChild>
                        <Text className="text-blue-600 font-semibold">
                            Sign up
                        </Text>
                    </Link>
                </View>
            </View>
        </SafeAreaView>
    );
}