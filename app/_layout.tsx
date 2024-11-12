import { Stack } from "expo-router";
import { useEffect } from "react";
import { router } from "expo-router";
import { AuthProvider, useAuth } from "../hooks/auth";

function RootLayoutNav() {
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
        name="(auth)/Login" 
        options={{ 
          headerShown: false 
        }}
      />
      <Stack.Screen 
        name="(auth)/Reset" 
        options={{ 
          headerShown: false 
        }}
      />
      <Stack.Screen 
        name="(auth)/Signin" 
        options={{ 
          headerShown: false 
        }}
      />
      <Stack.Screen 
        name="(auth)/Signout" 
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

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}