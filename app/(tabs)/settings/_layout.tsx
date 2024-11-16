import { Stack } from "expo-router";

export default function SettingsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTitle: "Cattle Settle",
   
      }}
    >
      <Stack.Screen 
        name="Index"
        options={{
          title: "Settings"
        }}
      />
      <Stack.Screen 
        name="About"
        options={{
          title: "About Us"
        }}
      />
      <Stack.Screen 
        name="Contact"
        options={{
          title: "Contact Us"
        }}
      />
      <Stack.Screen 
        name="Terms"
        options={{
          title: "Terms & Conditions"
        }}
      />
      <Stack.Screen 
        name="Policy"
        options={{
          title: "Privacy Policy"
        }}
      />
          <Stack.Screen 
        name="profile"
        options={{
          title: "Profile Settings"
        }}
      />
    </Stack>
  );
}