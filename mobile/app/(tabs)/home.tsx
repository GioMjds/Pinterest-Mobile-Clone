import { Text, View } from 'react-native';
import { Link } from 'expo-router';
import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo';
import { SignOutButton } from '@/components/SignOutButton';

export default function Page() {
	const { user } = useUser();

	return (
		<View className='flex items-center justify-center flex-1 bg-white'>
			<SignedIn>
				<Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
				<SignOutButton />
			</SignedIn>
			<SignedOut>
				<Link href="/(auth)/sign-in" className='mb-4 p-4 border text-white text-3xl border-black rounded-full bg-red-600'>
					<Text>Sign in</Text>
				</Link>
				<Link href="/(auth)/sign-up" className='mb-4 p-4 border text-white text-3xl border-black rounded-full bg-red-600'>
					<Text>Sign up</Text>
				</Link>
			</SignedOut>
		</View>
	);
}
