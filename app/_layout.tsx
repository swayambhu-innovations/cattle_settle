import { Stack } from 'expo-router';
import { VolunteerProvider } from '../hooks/volunteer';

export default function RootLayout() {
  return (
    <VolunteerProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </VolunteerProvider>
  );
}
