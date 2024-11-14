import { useState, useEffect } from 'react';
import { Text, View, TextInput, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import { router, Stack } from 'expo-router';
import { useAuth } from '../../hooks/auth';

export default function Login() {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signIn, verifyOTP, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/(tabs)/home');
    }
  }, [isAuthenticated]);

  const handleLogin = async () => {
    setLoading(true);
    try {
      if (!isVerifying) {
        await signIn(phone);
        setIsVerifying(true);
      } else {
        await verifyOTP(otp);
        router.replace('/(tabs)/home');
      }
    } catch (error: any) {
      alert(error.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
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
          title: isVerifying ? "Verify OTP" : "Phone Login",
          headerStyle: {
            backgroundColor: '#ffffff',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20,
            color: '#333333',
          },
          headerTitleAlign: 'center',
        }} 
      />
      <View style={styles.container}>
        <Text style={styles.title}>
          {isVerifying ? "Enter verification code" : "Enter your phone number"}
        </Text>
        
        <View style={styles.inputContainer}>
          {!isVerifying ? (
            <TextInput 
              style={styles.input}
              placeholder="Phone Number (+1234567890)"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              autoCapitalize="none"
            />
          ) : (
            <TextInput 
              style={styles.input}
              placeholder="Enter OTP"
              value={otp}
              onChangeText={setOtp}
              keyboardType="number-pad"
              maxLength={6}
            />
          )}
        </View>

        <Pressable 
          style={styles.button} 
          onPress={handleLogin}
        >
          <Text style={styles.buttonText}>
            {isVerifying ? "Verify OTP" : "Send Code"}
          </Text>
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
    fontSize: 28,
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
  linksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 30,
    paddingHorizontal: 20,
    gap: 10, // Add spacing between links
  },
  link: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    minWidth: 100,
  },
  linkText: {
    color: '#fff',
    textDecorationLine: 'underline',
    textDecorationColor: 'rgba(255, 255, 255, 0.5)',
  },
  linkWrapper: {
    padding: 10,
    borderRadius: 8,
    overflow: 'hidden',
  },
});