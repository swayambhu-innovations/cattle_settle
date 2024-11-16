import { View, FlatList, ActivityIndicator } from 'react-native';
import { useVolunteerData } from '@/hooks/volunteer';
import { VolunteerCard } from '@/components/volunteercard';
import { useMemo } from 'react';

export default function Page() {
  const { data, loading, error } = useVolunteerData();
  
  // Sort data by creation time to show newest first
  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => {
      return new Date(b.data.createdAt).getTime() - new Date(a.data.createdAt).getTime();
    });
  }, [data]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <FlatList
      data={sortedData}
      renderItem={({ item }) => <VolunteerCard item={item} />}
      keyExtractor={(item) => `${item.type}-${item.data.id}`}
      extraData={sortedData.length} // Force refresh when new items are added
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      windowSize={5}
      removeClippedSubviews={true}
    />
  );
}
