import { Text, View,Image, StyleSheet, Pressable } from "react-native";
import { router, Href,Link } from 'expo-router';

export default function Index() {
  const getStarted = () => {
    const href: Href<string> = '/(auth)/Login';  // Remove parentheses from path
    router.replace(href);
  };
  return (
    <View style={styles.container} >
            <Image
        style={styles.logo}
        source={require('../assets/images/logo.png')}  
      />
      <Text style={styles.title}>Welcome to Cattle Settle</Text>
      <Text style={styles.description}>A App built for social conscience</Text>

      <View style={styles.buttonContainer}>
            <Pressable 
        style={styles.primaryButton} 
        onPress={getStarted}
      >
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#666",
    marginBottom: 30,
    textAlign: "center",
  },
  buttonContainer: {
    width: "100%",
  },
  primaryButton: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  },
  secondaryButton: {
    backgroundColor: "#6c757d",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
