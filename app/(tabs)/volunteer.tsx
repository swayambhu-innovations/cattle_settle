import { View, FlatList, ActivityIndicator, Modal } from 'react-native';
import { useVolunteerData } from '@/hooks/volunteer';
import { VolunteerCard } from '@/components/volunteercard';
import { VolunteerInfo } from '@/components/volunteerinfo';
import { useMemo, useState } from 'react';

export default function Page() {
  const { data, loading, error } = useVolunteerData();
  const [selectedItem, setSelectedItem] = useState<{ type: string; id: string } | null>(null);
  
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
    <>
      <FlatList
        data={sortedData}
        renderItem={({ item }) => (
          <VolunteerCard 
            item={item} 
            onPress={() => setSelectedItem({ type: item.type, id: item.data.id })}
          />
        )}
        keyExtractor={(item) => `${item.type}-${item.data.id}`}
        extraData={sortedData.length}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
        removeClippedSubviews={true}
      />

      <Modal
        visible={!!selectedItem}
        animationType="slide"
        onRequestClose={() => setSelectedItem(null)}
      >
        {selectedItem && (
          <VolunteerInfo
            type={selectedItem.type}
            id={selectedItem.id}
            onClose={() => setSelectedItem(null)}
          />
        )}
      </Modal>
    </>
  );
}
