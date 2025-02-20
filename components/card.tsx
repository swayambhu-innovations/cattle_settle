// components/Card.tsx
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { Link, Href } from 'expo-router';

type CardProps = {
  title: string;
  image: any;
  route?: Href<string>;
  onPress?: () => void;
};

export const Card = ({ title, image, route, onPress }: CardProps) => (
  <Pressable style={styles.card} onPress={onPress}>
    <Image source={image} style={styles.cardImage} resizeMode="cover" />
    <View style={styles.titleContainer}>
      <Text style={styles.cardTitle}>{title}</Text>
    </View>
  </Pressable>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 20,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  titleContainer: {
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'left',
  },
});