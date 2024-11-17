import { Stack } from "expo-router";
import { VolunteerProvider } from '../../../hooks/volunteer';

export default function VolunteerLayout() {
  return (
    <VolunteerProvider>
      <Stack
        screenOptions={{
          headerShown: true,
          headerTitle: "Cattle Settle",
        }}
      >
        <Stack.Screen 
          name="Index"
          options={{
            headerTitle: "Volunteer"
          }}
        />
        <Stack.Screen 
          name="Info"
          options={{
            headerTitle: "Volunteer Information"
          }}
        />
      </Stack>
    </VolunteerProvider>
  );
}