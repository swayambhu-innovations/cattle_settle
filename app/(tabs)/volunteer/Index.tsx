import { View, Text, StyleSheet, Switch } from 'react-native';
import { useVolunteer } from '../../../hooks/volunteer';
import { VolunteerCard } from '../../../components/volunteercard';

export default function Volunteer() {
  const { isVolunteer, setVolunteerStatus } = useVolunteer();

  return (
    <View style={styles.container}>
      <View style={styles.toggleContainer}>
        <Text style={styles.toggleText}>Be a Volunteer</Text>
        <Switch
          value={isVolunteer}
          onValueChange={setVolunteerStatus}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isVolunteer ? '#007AFF' : '#f4f3f4'}
        />
      </View>
      
      {isVolunteer && (
        <View style={styles.cardsContainer}>
          <VolunteerCard
            title="Animal Rescuer"
            description="Help rescue injured cattle from roads and dangerous situations"
            route="/volunteer/Info"
            duration="2 hours"
            location="City Center"
            spotsLeft={5}
          />
          <VolunteerCard
            title="Food Provider"
            description="Distribute food to stray cattle in designated areas"
            route="/volunteer/Info"
            duration="3 hours"
            location="North Park"
            spotsLeft={3}
          />
          <VolunteerCard
            title="Medical Assistant"
            description="Assist veterinarians in treating injured cattle"
            route="/volunteer/Info"
            duration="4 hours"
            location="Animal Hospital"
            spotsLeft={2}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  toggleText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardsContainer: {
    marginTop: 20,
    gap: 16,
  }
});