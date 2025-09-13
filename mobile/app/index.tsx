import { auth } from '@/services/Auth';
import { useQuery } from '@tanstack/react-query';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Index() {
	const { data } = useQuery({
		queryKey: ['hello'],
		queryFn: auth.login
	});
	
	return (
		<SafeAreaView className='flex-1 items-center justify-center bg-black'>
			<Text className='text-3xl text-white'>Hello, World!</Text>
			<Text className='text-3xl text-white'>{data?.message}</Text>
		</SafeAreaView>
	);
}
