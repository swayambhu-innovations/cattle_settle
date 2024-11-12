import { Stack } from "expo-router";

export default function HomeLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTitle: "Cattle Settle",
      }}
    >
      <Stack.Screen 
        name="index"
        options={{ headerTitle: "Report issues" }}
      />
      <Stack.Screen 
        name="Casualty"
        options={{ headerTitle: "Report Casualty" }}
      />
      <Stack.Screen 
        name="Flocking"
        options={{ headerTitle: "Report Stray Flocking" }}
      />
      <Stack.Screen 
        name="Garbage"
        options={{ headerTitle: "Report Garbage Grazing" }}
      />
      <Stack.Screen 
        name="Donate"
        options={{ headerTitle: "Donate Food" }}
      />
      <Stack.Screen 
        name="Adopt"
        options={{ headerTitle: "Adopt a Stray" }}
      />
    </Stack>
  );
}