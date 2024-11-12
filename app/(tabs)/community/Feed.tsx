import { View, Text, StyleSheet, FlatList, Image } from 'react-native';

export default function Feed() {
  const posts = [
    {
      id: '1',
      author: 'John Doe',
      content: 'Looking for advice on cattle feed supplements...',
      time: '2h ago',
      image: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?w=800'
    },
    {
      id: '2',
      author: 'Jane Smith',
      content: 'Sharing my experience with rotational grazing...',
      time: '4h ago',
      image: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=800'
    },
  ];

  const renderPost = ({ item }: { item: { id: string; author: string; content: string; time: string, image: string } }) => (
    <View style={styles.postCard}>
      <View style={styles.postHeader}>
        <Image
          source={{ uri: 'https://via.placeholder.com/40' }}
          style={styles.avatar}
        />
        <View>
          <Text style={styles.author}>{item.author}</Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>
      </View>
      {item.image && (
        <Image
          source={{ uri: item.image }}
          style={styles.postImage}
          resizeMode="cover"
        />
      )}
      <Text style={styles.content}>{item.content}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.feedContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  feedContainer: {
    padding: 16,
  },
  postCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden', // This ensures the image respects border radius
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  author: {
    fontSize: 16,
    fontWeight: '600',
  },
  time: {
    fontSize: 12,
    color: '#666',
  },
  postImage: {
    width: '100%',
    height: 200,
    marginBottom: 12,
  },
  content: {
    fontSize: 14,
    lineHeight: 20,
    padding: 16,
    paddingTop: 0,
  },
});