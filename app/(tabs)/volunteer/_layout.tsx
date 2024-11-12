import { Stack } from "expo-router";

export default function VolunteerLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTitle: "Cattle Settle",

      }}
    >
      <Stack.Screen 
        name="index"
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
  );
}