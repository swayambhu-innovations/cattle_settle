import { View, StyleSheet, TouchableOpacity, ScrollView, Image, Text } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import AboutComponent from '../../components/AboutComponent';
import ContactComponent from '../../components/ContactComponent';
import ProfileComponent from '../../components/ProfileComponent';
import TermsComponent from '../../components/TermsComponent';

interface MenuCardProps {
  title: string;
  icon: string;
  onPress: () => void;
}

const MenuCard = ({ title, icon, onPress }: MenuCardProps) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <View style={styles.cardContent}>
      <Ionicons name={icon as any} size={24} color="#333" />
      <Text style={styles.cardTitle}>{title}</Text>
    </View>
  </TouchableOpacity>
);

export default function Settings() {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const renderSection = () => {
    switch (activeSection) {
      case 'profile':
        return <ProfileComponent onBack={() => setActiveSection(null)} />;
      case 'about':
        return <AboutComponent onBack={() => setActiveSection(null)} />;
      case 'contact':
        return <ContactComponent onBack={() => setActiveSection(null)} />;
      case 'terms':
        return <TermsComponent onBack={() => setActiveSection(null)} />;
      default:
        return (
          <>
            <View style={styles.profileCard}>
              <Image 
                source={{ uri: 'https://picsum.photos/800/400' }} 
                style={styles.profileImage}
                resizeMode="cover"
              />
            </View>
            <View style={styles.grid}>
              <MenuCard title="Profile" icon="person-outline" onPress={() => setActiveSection('profile')} />
              <MenuCard title="About Us" icon="information-circle-outline" onPress={() => setActiveSection('about')} />
              <MenuCard title="Contact Us" icon="mail-outline" onPress={() => setActiveSection('contact')} />
              <MenuCard title="Terms & Conditions" icon="document-text-outline" onPress={() => setActiveSection('terms')} />
              <MenuCard title="Signout" icon="log-out-outline" onPress={() => {/* handle signout */}} />
            </View>
          </>
        );
    }
  };

  return (
    <ScrollView style={styles.container}>
      {renderSection()}
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