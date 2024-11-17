import { Text, View,Image, StyleSheet, Pressable } from "react-native";
import { router, Href,Link } from 'expo-router';
import { Amplify } from 'aws-amplify';
import outputs from '../../amplify_outputs.json';

Amplify.configure(outputs);

export default function Index() {
  return (
    <View style={styles.container} >
       <Text style={styles.title}>Welcome to the App</Text>
    </View>
  );
}

const styles = StyleSheet.create({

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },

  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
