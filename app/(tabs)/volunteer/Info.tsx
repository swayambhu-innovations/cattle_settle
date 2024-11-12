import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function Info() {
  const volunteerData = {
    name: "John Doe",
    status: "Active",
    joinedDate: "March 2024",
    totalHours: 48,
    completedTasks: 12,
    rating: 4.8,
    expertise: ["Animal Rescue", "Medical Support"],
    title: "Senior Animal Rescuer",
    description: "Experienced volunteer specializing in emergency animal rescue operations and medical assistance. Dedicated to helping stray cattle and providing immediate care when needed.Experienced volunteer specializing in emergency animal rescue operations and medical assistance. Dedicated to helping stray cattle and providing immediate care when needed.Experienced volunteer specializing in emergency animal rescue operations and medical assistance. Dedicated to helping stray cattle and providing immediate care when needed.Experienced volunteer specializing in emergency animal rescue operations and medical assistance. Dedicated to helping stray cattle and providing immediate care when needed."
  };

  const handleAcceptVolunteer = () => {
    // Add your logic here
    router.push('/volunteer');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{volunteerData.status}</Text>
        </View>
        <Text style={styles.name}>{volunteerData.name}</Text>
        <Text style={styles.joined}>Member since {volunteerData.joinedDate}</Text>
      </View>

      <View style={styles.titleSection}>
        <Text style={styles.titleText}>{volunteerData.title}</Text>
        <Text style={styles.descriptionText}>{volunteerData.description}</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Ionicons name="time" size={24} color="#007AFF" />
          <Text style={styles.statValue}>{volunteerData.totalHours}h</Text>
          <Text style={styles.statLabel}>Total Hours</Text>
        </View>
        <View style={styles.statItem}>
          <Ionicons name="checkmark-circle" size={24} color="#007AFF" />
          <Text style={styles.statValue}>{volunteerData.completedTasks}</Text>
          <Text style={styles.statLabel}>Tasks Done</Text>
        </View>
        <View style={styles.statItem}>
          <Ionicons name="star" size={24} color="#007AFF" />
          <Text style={styles.statValue}>{volunteerData.rating}</Text>
          <Text style={styles.statLabel}>Rating</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Expertise</Text>
        <View style={styles.tagContainer}>
          {volunteerData.expertise.map((skill, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{skill}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Pressable 
          style={styles.acceptButton}
          onPress={handleAcceptVolunteer}
        >
          <Ionicons name="checkmark-circle" size={24} color="#fff" />
          <Text style={styles.buttonText}>Accept as Volunteer</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  badge: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
  },
  badgeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  joined: {
    color: '#666',
  },
  titleSection: {
    padding: 20,
    backgroundColor: '#f8f9fa',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 4,
  },
  statLabel: {
    color: '#666',
    fontSize: 12,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  tagText: {
    color: '#007AFF',
    fontWeight: '500',
  },
  buttonContainer: {
    padding: 16,
    marginTop: 'auto',
  },
  acceptButton: {
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  }
});