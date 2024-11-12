import { View, Text, StyleSheet, FlatList, Image, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

export type Contact = {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  lastMessageTime: string;
};

export default function Chat() {
  const router = useRouter();
  const contacts: Contact[] = [
    {
      id: '1',
      name: 'John Doe',
      avatar: 'https://via.placeholder.com/40',
      lastMessage: 'Hey, how are your cattle doing?',
      lastMessageTime: '2h ago',
    },
    {
      id: '2',
      name: 'Jane Smith',
      avatar: 'https://via.placeholder.com/40',
      lastMessage: 'The new feed supplement is working great!',
      lastMessageTime: '3h ago',
    },
    {
      id: '3',
      name: 'Mike Johnson',
      avatar: 'https://via.placeholder.com/40',
      lastMessage: 'Can we discuss about the livestock market?',
      lastMessageTime: '5h ago',
    },
  ];

  const renderContact = ({ item }: { item: Contact }) => (
    <Pressable 
      onPress={() => {
        const conversationPath = `/community/conversation/${item.id}`;
        console.log('Navigating to:', conversationPath); // For debugging
        router.push(conversationPath as any);
      }}
      style={styles.contactCard}
    >
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.contactInfo}>
        <Text style={styles.contactName}>{item.name}</Text>
        <Text style={styles.lastMessage} numberOfLines={1}>
          {item.lastMessage}
        </Text>
      </View>
      <Text style={styles.timeStamp}>{item.lastMessageTime}</Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={contacts}
        renderItem={renderContact}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContainer: {
    padding: 16,
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  contactInfo: {
    flex: 1,
    marginLeft: 12,
  },
  contactName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  lastMessage: {
    fontSize: 14,
    color: '#666',
  },
  timeStamp: {
    fontSize: 12,
    color: '#999',
    marginLeft: 8,
  },
});