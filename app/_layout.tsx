import { Stack } from 'expo-router';

export default function Layout() {
  return <Stack
  screenOptions={{
    headerShown: true,
    title: 'Mapa',
    headerStyle: {
      backgroundColor: '#f4511e',
    },

  }}>
    <Stack.Screen name='index'>
    </Stack.Screen>
  </Stack>;
}