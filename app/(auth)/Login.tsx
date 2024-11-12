import { Text, View, TextInput, StyleSheet, Pressable } from 'react-native';
import { router, Href, Link, Stack } from 'expo-router';

export default function Login() {
  const handleLogin = () => {
    const href: Href<string> = '/(tabs)/home';
    router.replace(href);
  };
  return (
    <>
      <Stack.Screen 
        options={{
          title: "Login", // Change header text
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
        <Text style={styles.title}>welcome human</Text>
        
        <View style={styles.inputContainer}>
          <TextInput 
            style={styles.input}
            placeholder="Phone Number"
            placeholderTextColor="#999"
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <TextInput 
            style={styles.input}
            placeholder="One time password"
            placeholderTextColor="#999"
            secureTextEntry
          />
        </View>

        <Pressable 
          style={styles.button} 
          onPress={handleLogin}
        >
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>
        <View style={styles.linksContainer}>
          <Link href="/(auth)/Reset" asChild>
            <Pressable
              style={({ pressed }) => [
                styles.linkWrapper,
                { opacity: pressed ? 0.7 : 1 }
              ]}
            >
              <Text style={styles.link}>Reset Password</Text>
            </Pressable>
          </Link>

          <Link href="/(auth)/Signin" asChild>
            <Pressable
              style={({ pressed }) => [
                styles.linkWrapper,
                { opacity: pressed ? 0.7 : 1 }
              ]}
            >
              <Text style={styles.link}>Sign In</Text>
            </Pressable>
          </Link>

          <Link href="/(auth)/Signout" asChild>
            <Pressable
              style={({ pressed }) => [
                styles.linkWrapper,
                { opacity: pressed ? 0.7 : 1 }
              ]}
            >
              <Text style={styles.link}>Sign Out</Text>
            </Pressable>
          </Link>
        </View>
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