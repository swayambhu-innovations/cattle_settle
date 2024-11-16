import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface MenuCardProps {
  title: string;
  icon: string;
  href: string;
}

const MenuCard = ({ title, icon, href }: MenuCardProps) => (
  <Link href={href as any} asChild>
    <TouchableOpacity style={styles.card}>
      <View style={styles.cardContent}>
        <Ionicons name={icon as any} size={24} color="#333" />
        <Text style={styles.cardTitle}>{title}</Text>
      </View>
    </TouchableOpacity>
  </Link>
);

export default function Settings() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileCard}>
        <Image 
          source={{ uri: 'https://picsum.photos/800/400' }} 
          style={styles.profileImage}
          resizeMode="cover"
        />
      </View>
      
      <View style={styles.grid}>
        <MenuCard title="Profile" icon="person-outline" href="/settings/profile" />
        <MenuCard title="About Us" icon="information-circle-outline" href="/settings/About" />
        <MenuCard title="Contact Us" icon="mail-outline" href="/settings/Contact" />
        <MenuCard title="Terms & Conditions" icon="document-text-outline" href="/settings/Terms" />
        <MenuCard title="Privacy Policy" icon="shield-checkmark-outline" href="/settings/Policy" />
        <MenuCard title="Signout" icon="log-out-outline" href="/" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  grid: {
    padding: 16,
    paddingTop: 0,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  card: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    width: '96%',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  profileCard: {
    width: '100%',
    height: 250,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
});