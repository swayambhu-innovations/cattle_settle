import { View, Text, StyleSheet,ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ProfileComponentProps {
  onBack: () => void;
}

export default function ProfileComponent({ onBack }: ProfileComponentProps) {
    return (
        <ScrollView style={styles.container}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Ionicons name="arrow-back" size={24} color="#333" />
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
          <View style={styles.content}>
            <Text style={styles.title}>About Cattle Settle</Text>
            <Text style={styles.text}>
             xnydrxnydrxnydnyxdnyrxdnyrxdnyxrbdnyxdrnyxdrnyxdrnydrxnyxrnyrnyxdrn
            </Text>
            <Text style={styles.subtitle}>Our Mission</Text>
            <Text style={styles.text}>
    xfhdnydrxnxydrxnydrnydxyndnyxdrnyrxbnyrxbtnxyrbnyrnyrnyrnrynyryrnnyr
            </Text>
          </View>
        </ScrollView>
      );
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
      },
      content: {
        padding: 20,
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
      },
      subtitle: {
        fontSize: 18,
        fontWeight: '600',
        marginTop: 16,
        marginBottom: 8,
        color: '#444',
      },
      text: {
        fontSize: 16,
        lineHeight: 24,
        color: '#666',
        marginBottom: 16,
      },
      backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        gap: 8,
      },
      backText: {
        fontSize: 16,
        color: '#333',
      },
    });