import { Stack } from 'expo-router';

export default function Layout() {
  return <Stack
  screenOptions={{
    headerShown: true,
    title: 'Mapa',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#FFF',

  }}>
    <Stack.Screen name='index'>
    </Stack.Screen>
  </Stack>;
}