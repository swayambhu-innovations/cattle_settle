import { Text, View, TextInput, StyleSheet, Pressable } from 'react-native';
import { Stack,Href, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Signin() {
  const handleSignin = () => {
    const href: Href<string> = '/(tabs)/home';
    router.replace(href);
  };
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
        <Text style={styles.title}>Sign In with OTP</Text>
        
        <View style={styles.inputContainer}>
          <TextInput 
            style={styles.input}
            placeholder="Phone Number"
            placeholderTextColor="#999"
            keyboardType="phone-pad"
            autoCapitalize="none"
          />
          <TextInput 
            style={styles.input}
            placeholder="Enter OTP"
            placeholderTextColor="#999"
            keyboardType="number-pad"
            maxLength={6}
          />
                  
        <View style={styles.inputContainer}>
          <TextInput 
            style={styles.input}
            placeholder="Enter Password"
            placeholderTextColor="#999"
            secureTextEntry
          />
          <TextInput 
            style={styles.input}
            placeholder="Retype Password"
            placeholderTextColor="#999"
            secureTextEntry
          />
        </View>
        </View>

        <Pressable 
          style={styles.button}
          onPress={handleSignin}
        >
          <Text style={styles.buttonText}>Verify & Sign In</Text>
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