import { Stack } from "expo-router";
import { useEffect } from "react";
import { router } from "expo-router";

function RootLayoutNav() {
  function useAuth() {
    return {
      isAuthenticated: true,
      // other properties and methods
    };
  }
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/(tabs)/home");
    } else {
      router.push("/");
    }
  }, [isAuthenticated]);

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#ffffff',
        },
        headerTintColor: '#333333',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 20,
        },
        headerTitleAlign: 'center',
        headerShadowVisible: false,
        headerBackTitle: '',
        headerLeft: () => null,
        gestureEnabled: false
      }}
    >
      <Stack.Screen 
        name="index" 
        options={{ 
          headerShown: false 
        }}
      />
      <Stack.Screen 
        name="(tabs)" 
        options={{ 
          headerShown: false 
        }}
      />
    </Stack>
  );
}
