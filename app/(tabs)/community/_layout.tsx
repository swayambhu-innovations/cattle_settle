import { Stack } from "expo-router";

export default function CommunityLayout() {
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
          title: "Community"
        }}
      />
      <Stack.Screen 
        name="Feed"
        options={{
          title: "Feed"
        }}
      />
      <Stack.Screen 
        name="Chat"
        options={{
          title: "Chat"
        }}
      />
      <Stack.Screen 
        name="conversation/[id]"
        options={{
          title: "Chat",
          headerBackTitle: "Back",
          headerShown: true,
          presentation: 'card'
        }}
      />
    </Stack>
  );
}