import { useEffect, useState } from 'react';
import { Text, View, TextInput, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import { Stack, router } from 'expo-router';
import { useAuth } from '../../hooks/auth';
import { Ionicons } from '@expo/vector-icons';

export default function Signin() {
  const [phone, setPhone] = useState('');
  const { signIn, isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/(tabs)/home');
    }
  }, [isAuthenticated]);

  const handleSignin = async () => {
    try {
      await signIn(phone);
      router.replace('/Login');
    } catch (error: any) {
      alert(error.message || 'Sign in failed');
    }
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <>
      <Stack.Screen 
        options={{
          title: "Sign In",
          headerStyle: {
            backgroundColor: '#ffffff',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20,
            color: '#333333',
          },
          headerTitleAlign: 'center',
          headerLeft: () => (
            <Pressable 
              onPress={() => router.back()}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
                marginLeft: 16
              })}
            >
              <Ionicons name="arrow-back" size={24} color="#333333" />
            </Pressable>
          ),
        }}
      />
      <View style={styles.container}>
        <Text style={styles.title}>Sign In with Phone</Text>
        
        <View style={styles.inputContainer}>
          <TextInput 
            style={styles.input}
            placeholder="Phone Number (+1234567890)"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            autoCapitalize="none"
          />
        </View>

        <Pressable 
          style={styles.button}
          onPress={handleSignin}
        >
          <Text style={styles.buttonText}>Continue with Phone</Text>
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});