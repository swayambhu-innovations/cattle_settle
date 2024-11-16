import { View, FlatList, ActivityIndicator } from 'react-native';
import { useVolunteerData } from '@/hooks/volunteer';
import { VolunteerCard } from '@/components/volunteercard';

function VolunteerScreen() {
  const { data, loading, error } = useVolunteerData();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <VolunteerCard item={item} />}
      keyExtractor={(item) => `${item.type}-${item.data.id}`}
    />
  );
}

export default VolunteerScreen;
